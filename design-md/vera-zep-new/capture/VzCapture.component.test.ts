// TEMPORARY: renders the real Shell and dumps its DOM + CSS for the vera-zep-new template.
import { afterEach, test, vi } from "vitest";
import { commands, page } from "vitest/browser";
import { render } from "vitest-browser-svelte";
import "$styles/global.css";
import type { SidebarNodeView, TabView } from "$shared/ipc/bindings";
import { emitNativeEvent } from "$shared/testing/native-events";
import { revision, spaceFixture, tabFixture } from "$shared/testing/fixtures";
import { favicons } from "$domain/favicons";
import { surface } from "$domain/surface";
import { tabs } from "$domain/tabs";
import { preferences } from "$domain/preferences";
import * as launch from "$session/motion.svelte";
import Shell from "../Shell.svelte";

vi.mock("$shared/ipc/bindings", async () => {
  const { mockBindings } = await import("$shared/testing/bindings");
  return mockBindings({
    pagePermissionCardHost: async () => {},
    tabsBootstrap: async () => {},
    sidebarSetWidth: async () => {},
    sidebarResize: async () => false,
    sidebarResizeGuide: async () => true,
    settingSet: async () => ({ accepted: true, operation_id: null }),
  });
});

afterEach(() => {
  favicons.dispose();
  surface.dispose();
  tabs.dispose();
  preferences.dispose();
});

type Mark = (c: CanvasRenderingContext2D) => void;
function raster(draw: Mark): string {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 32;
  const c = canvas.getContext("2d")!;
  draw(c);
  let binary = "";
  for (const byte of c.getImageData(0, 0, 32, 32).data) binary += String.fromCharCode(byte);
  return btoa(binary);
}
const plate =
  (fill: string, glyph?: { text: string; color: string; font?: string }): Mark =>
  (c) => {
    c.fillStyle = fill;
    c.beginPath();
    c.roundRect(0, 0, 32, 32, 7);
    c.fill();
    if (!glyph) return;
    c.fillStyle = glyph.color;
    c.font = glyph.font ?? "bold 20px -apple-system";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(glyph.text, 16, 17);
  };
const disc =
  (fill: string, glyph?: { text: string; color: string }): Mark =>
  (c) => {
    c.fillStyle = fill;
    c.beginPath();
    c.arc(16, 16, 15, 0, Math.PI * 2);
    c.fill();
    if (!glyph) return;
    c.fillStyle = glyph.color;
    c.font = "bold 18px -apple-system";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(glyph.text, 16, 17);
  };

const SITES: Record<string, { title: string; url: string; mark?: Mark }> = {
  youtube: { title: "(57) YouTube", url: "https://youtube.example/", mark: plate("#ff0033", { text: "▶", color: "#fff", font: "16px -apple-system" }) },
  whatsapp: { title: "WhatsApp", url: "https://whatsapp.example/", mark: disc("#25d366", { text: "✆", color: "#fff" }) },
  newtab: { title: "New Tab", url: "" },
  google: { title: "Google", url: "https://google.example/", mark: disc("#fff", { text: "G", color: "#4285f4" }) },
  claude: { title: "Claude", url: "https://claude.example/", mark: disc("#d97757", { text: "✳", color: "#fff" }) },
  chatgpt: { title: "ChatGPT", url: "https://chatgpt.example/", mark: disc("#fff", { text: "◎", color: "#111" }) },
  github: { title: "GitHub", url: "https://github.example/", mark: disc("#1f2328", { text: "●", color: "#fff" }) },
};

function tab(key: string): TabView {
  const site = SITES[key]!;
  return tabFixture({
    id: key,
    title: site.title,
    url: site.url,
    icon: site.mark ? { origin: site.url.replace(/\/$/u, ""), revision: "a" } : null,
  });
}

let projection = 10;
async function paint(active: string) {
  launch.dispose();
  await preferences.init();
  await surface.init();
  await tabs.init();
  await favicons.init();
  const kept = ["claude", "chatgpt", "github"].map(tab);
  const open = ["youtube", "whatsapp", "newtab", "google"].map(tab);
  const node = (id: string, section: "favorites" | "today"): SidebarNodeView => ({
    id,
    parent_id: null,
    section,
    kind: { type: "tab", tab_id: id },
  });
  emitNativeEvent("favicons", {
    surface: "chrome",
    profile_id: "p",
    entries: Object.entries(SITES)
      .filter(([, site]) => site.mark)
      .map(([, site]) => ({
        origin: site.url.replace(/\/$/u, ""),
        revision: "a",
        rgba: raster(site.mark!),
      })),
  });
  emitNativeEvent("itemsChanged", {
    projection_revision: revision((projection += 1)),
    profile: { id: "p", name: "Personal", kind: "default" },
    spaces: [spaceFixture("s", "Space", { tabs: 4 })],
    active_space_id: "s",
    nodes: [
      ...kept.map((entry) => node(entry.id, "favorites")),
      ...open.map((entry) => node(entry.id, "today")),
    ],
    tabs: [...kept, ...open],
    active: active,
    split_group: null,
  });
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 900));
const OUT = "../../../../../target/look/vzn";

/** Make the snapshot self-contained: canvases and blob/asset images become data URIs. */
async function freeze() {
  for (const canvas of document.querySelectorAll("canvas")) {
    const img = document.createElement("img");
    img.src = canvas.toDataURL();
    img.className = canvas.className;
    img.setAttribute("style", canvas.getAttribute("style") ?? "");
    img.width = canvas.clientWidth || canvas.width;
    img.height = canvas.clientHeight || canvas.height;
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
  for (const img of document.querySelectorAll("img")) {
    if (img.src && !img.src.startsWith("data:")) img.src = await toData(img.src);
  }
  for (const el of document.querySelectorAll<HTMLElement>("[style*='url(']")) {
    const style = el.getAttribute("style")!;
    const match = /url\(["']?([^"')]+)["']?\)/u.exec(style);
    if (match && !match[1]!.startsWith("data:"))
      el.setAttribute("style", style.replace(match[1]!, await toData(match[1]!)));
  }
}

function css(): string {
  const out: string[] = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) out.push(rule.cssText);
    } catch {
      /* cross-origin */
    }
  }
  return out.join("\n");
}

async function capture(name: string, active: string) {
  await page.viewport(1440, 900);
  document.documentElement.dataset.theme = "light";
  document.documentElement.dataset.material = "liquid_glass";
  document.body.style.background = "#878787";
  await paint(active);
  const screen = await render(Shell);
  await settle();
  const side = document.querySelector<HTMLElement>(".browser-sidebar")!.getBoundingClientRect();
  const sheet = document.createElement("div");
  sheet.id = "vzn-page";
  sheet.style.cssText = `position:fixed;z-index:-1;inset:8px 8px 8px ${Math.round(side.right) + 8}px;border-radius:12px;background:#fff;`;
  document.body.prepend(sheet);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await freeze();
  await commands.writeFile(`.vzn/${name}.html`, document.documentElement.outerHTML);
  await commands.writeFile(`.vzn/${name}.css`, css());
  screen.unmount();
}

test("capture page", { timeout: 120_000 }, async () => {
  await capture("page", "youtube");
});
