// TEMPORARY: vera-zep-new capture of the real New Tab.
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { commands, page } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import "$styles/global.css";
import { emitNativeEvent } from "$shared/testing/native-events";
import { resourceTestServer } from "$shared/testing/resources/server";
import type { SearchResult } from "$shared/ipc/bindings";
import { preferences } from "$domain/preferences";
import { taskSession } from "$domain/resources";
import NewTabLook from "./NewTabLook.svelte";
import { themed } from "./look-bench";

const native = vi.hoisted(() => ({
  call: vi.fn(),
  search: vi.fn(async (_query: string, _context: unknown) => true),
  settings: {} as Record<string, string>,
  profile: "00000000000000000000000501",
}));
vi.mock("$shared/ipc/bindings", async () => {
  const { mockBindings } = await import("$shared/testing/bindings");
  return mockBindings({
    resourceCall: native.call,
    settingGet: async (key: string) => native.settings[key] ?? null,
    newtabSearchContext: async () => ({
      window_id: "window",
      profile_id: native.profile,
      space_id: "space",
      session_id: "newtab:tab:1",
      request_id: "",
    }),
    newtabSearch: native.search,
    newtabRun: async () => ({ accepted: true, operation_id: null }),
    newtabCancel: async () => true,
    timeCall: async () => ({
      kind: "focus_days" as const,
      days: [{ day: 0, seconds: 134 * 60, sessions: 3, completed: 2 }],
    }),
    blockerStats: async () => ({
      status: "ok" as const,
      data: { today: 1284, last7Days: 9120, days: [1100, 1250, 1400, 1310, 1380, 1396, 1284] },
    }),
  });
});
vi.mock("$domain/tabs", () => ({
  tabs: { profile: () => ({ id: native.profile, name: "Alex Rivera", kind: "default" }) },
}));
const ontasks = vi.fn();

// Mid-afternoon on a Monday.
const NOW = new Date(2026, 8, 28, 14, 32);
const day = (offset: number) => {
  const at = new Date(NOW);
  at.setDate(at.getDate() + offset);
  return `${at.getFullYear()}-${String(at.getMonth() + 1).padStart(2, "0")}-${String(at.getDate()).padStart(2, "0")}`;
};

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
});
afterEach(() => {
  vi.useRealTimers();
  preferences.dispose();
  delete document.documentElement.dataset.theme;
  delete document.documentElement.dataset.material;
});

async function setup(settings: Record<string, string> = {}, due = 3) {
  native.profile = String(BigInt(native.profile) + 1n).padStart(26, "0");
  native.settings = settings;
  native.call.mockImplementation(resourceTestServer(native.profile).call);
  await preferences.init();
  const tasks = taskSession(native.profile, "seed");
  for (let index = 0; index < due; index++)
    await tasks.create({ title: `Task ${index}`, dueDate: day(index === 0 ? -1 : 0) });
  await tasks.create({ title: "Later", dueDate: day(3) });
  await page.viewport(1320, 860);
  const screen = await render(NewTabLook, { ontasks });
  screen.container.style.cssText = "inline-size:1200px;block-size:780px;padding:6px";
  return screen;
}


const OUT = "../../../../../target/look/vzn";
async function dump(name: string) {
  for (const canvas of document.querySelectorAll("canvas")) {
    const img = document.createElement("img");
    img.src = canvas.toDataURL();
    img.className = canvas.className;
    img.setAttribute("style", canvas.getAttribute("style") ?? "");
    canvas.replaceWith(img);
  }
  const toData = async (url: string) => {
    const blob = await (await fetch(url)).blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };
  for (const img of document.querySelectorAll("img"))
    if (img.src && !img.src.startsWith("data:")) img.src = await toData(img.src);
  for (const el of document.querySelectorAll<HTMLElement>("[style*='url(']")) {
    const style = el.getAttribute("style")!;
    for (const match of style.matchAll(/url\(["']?([^"')]+)["']?\)/gu))
      if (!match[1]!.startsWith("data:"))
        el.setAttribute("style", el.getAttribute("style")!.replace(match[1]!, await toData(match[1]!)));
  }
  const rules: string[] = [];
  for (const sheet of document.styleSheets) {
    try { for (const rule of sheet.cssRules) rules.push(rule.cssText); } catch { /* skip */ }
  }
  await commands.writeFile(`.vzn/${name}.html`, document.documentElement.outerHTML);
  await commands.writeFile(`.vzn/${name}.css`, rules.join("\n"));
}

test("vzn capture new tab (light)", { timeout: 120_000 }, async () => {
  const screen = await setup({ "ui.newtab-clock-format": "12h" });
  await page.viewport(1440, 900);
  // Pane = 1400 - 2*8 padding - 200 aside - 8 gap = 1176 x 884, the live pane at 1440x900.
  screen.container.style.cssText = "inline-size:1400px;block-size:900px;padding:8px";
  document.documentElement.dataset.theme = "light";
  screen.container.style.background = "var(--color-canvas)";
  await expect
    .poll(() => screen.container.querySelector('.newtab[data-ready="true"]'), { timeout: 8000 })
    .toBeTruthy();
  await new Promise((r) => setTimeout(r, 1200));
  await page.elementLocator(screen.container).screenshot({ path: `${OUT}/newtab-real.png` });
  await dump("newtab");
});
