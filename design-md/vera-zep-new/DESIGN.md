---
version: beta
name: Vera-zep-new
description: "Vera Zep New is the Zephium browser's own design system, lifted out for web apps (ReznorSkeath79/Zephium, frame/ @ 175300d8, 2026-10-28). Not a reinterpretation: theme.css is generated from Zephium's real token, axis and component CSS by build-theme.py; reference.html is a static render of the real Shell.svelte sidebar and New Tab captured from Zephium's own component-test harness; mockup.html makes that render clickable. The look, in the light theme the live app runs: a grey Liquid-Glass window ground (#878787 as seen live) with white-at-30% 'lifts' for every plate on it (Browse/Work switch, address pill, current tab row, dock tiles), a solid page sheet inset 8px with a 12px corner, 13px system type, favicon plates, and the New Tab: a baked day sky that dissolves into dots, the ZEPHIUM wordmark, time · date, a search field hanging from the top edge in a notch, and three stat chips at the foot. Graphite tonal ladder, no accent hue by default, role-named radii, motion named by purpose with sampled-spring linear() curves."

colors:
  window-ground: "#878787"       # live Liquid Glass over the desktop (sampled); var(--vzn-window-ground)
  lift: "rgba(255,255,255,.30)"  # every plate on the glass: switch track, address, current tab, dock tile
  lift-pressed: "rgba(255,255,255,.40)"
  segment-thumb: "rgba(255,255,255,.42)"
  page: "#F1F1F3"                # light --color-page; a live site paints its own (usually white)
  surface: "#FFFFFF"
  chrome-light: "#E6E6E9"        # opaque fallback when there is no material
  text: "#1C1C1F"
  label-secondary: "#55555C"
  muted: "rgba(28,28,31,.62)"
  faint: "rgba(28,28,31,.42)"
  lit: "#222226"                 # the 'on' rung in light: primary button, on switch, checked box
  danger: "#C0474F"
  success: "#2F7F5A"
  sky-paper-day: "#F7F7F8"       # what the New Tab sky dissolves into
  dark-canvas: "#1A1A1D"         # dark theme: canvas/page; chrome #1F1F22; surface #26262A; float #3D3D44

typography:
  family: "-apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI Variable Text', 'Segoe UI', sans-serif"
  caption: 11px
  label: 12px
  body: 13px
  address: 13.5px
  page-title: 14px
  reading: 15px
  title: 22px
  headline: 26px
  display: 36px
  sidebar-row: "13px / 500, current 550"

rounded:
  inset: 8px
  row: 12px          # tab rows, address field
  control-compact: 10px
  control: 14px
  control-large: 18px
  card: 18px
  panel: 22px        # menus, popovers
  content: 12px      # the page sheet
  capsule: 999px

spacing:
  window-padding: 8px
  sidebar: 240px (resizable)
  titlebar: 32px
  address-field: 34px tall
  row-sidebar: 36px
  dock-tile: 44px
  menu-row: 34px

files:
  theme.css: "generated — tokens, axes, base chrome CSS, shared/ui materials, component styles (unscoped)"
  utilities.css: "captured — Tailwind preflight + the utilities the chrome markup uses"
  reference.html: "captured — exact static render (sidebar + New Tab); the visual truth"
  mockup.html: "reference.html + a small script: clickable tabs, Browse/Work switch, live clock, a sample app page"
  build-theme.py: "regenerates theme.css from a Zephium checkout"
---

# Vera Zep New

## What this is

Zephium's interface, taken from Zephium's source rather than redrawn. An earlier draft of this
entry re-derived the system from the token files and came out as a generic dark dashboard that did
not look like the app. This version renders and copies the real thing:

| File | How it was made | Use it for |
|---|---|---|
| `reference.html` | Zephium's own component-test harness (`frame/src/app/browser/tests`, vitest + Playwright WebKit) rendered the real `Shell.svelte` and `features/newtab` in the light theme. The live DOM and compiled CSS were dumped, then composed the way `Shell.svelte` composes them for a new tab. Favicons and the sky are inlined as data URIs. | The visual truth. Compare any build against it. |
| `mockup.html` | `reference.html` plus a small script: switch tabs, toggle Browse/Work, live clock, and a sample app page on the solid sheet for any tab other than New Tab. | Demo and starting point for an app shell. |
| `theme.css` | `build-theme.py` concatenates Zephium's `styles/tokens*`, `styles/axes/*`, `controls.css`, `favicon.css`, `browser.css`, `shared/ui/**/*.css` and the `<style>` blocks of `shared/ui/*` plus the sidebar components, unscoped. | The stylesheet for your app. |
| `utilities.css` | The Tailwind `base`, `properties` and `utilities` layers from the frame's compiled CSS. | Load after `theme.css` if you copy the chrome markup verbatim. |

Regenerate after Zephium changes with `python3 build-theme.py ~/Work/ZepBrowser`. Recapture
`reference.html` by re-running the capture tests. The procedure is in "Recapturing" below.

## The look (light theme, as the live app runs)

- **Window:** one grey sheet of Liquid Glass. It reads as `#878787` over a typical desktop. A web
  app can't get real glass behind the page, so `--vzn-window-ground` stands in for it.
- **Lifts, not fills:** everything that sits on the glass is a breath of white at 30% (`--lift`).
  That covers the Browse/Work track, the address pill, the current tab row and the dock tiles.
  Pressed is 40%, and the Browse/Work thumb is 42% with a 0.5px hairline. Nothing on the glass is
  an opaque white plate.
- **Page sheet:** solid, inset 8px from every window edge, corner 12px, no outline. The chrome is
  what you look through; the page is what you look at.
- **Sidebar, top to bottom:**
  1. A 32px titlebar band: compact-mode, back, forward and reload icon buttons, all 28px.
  2. The `.segmented` Browse/Work switch, full width.
  3. The `.address-field` (34px, `rounded-row`, centred host text at 13.5px, site-info button on the right).
  4. The `.space-bar` (Space name with a chevron, and + on the right).
  5. The tab rows (`.browse-tab` > `button.tab-open`, 36px, 16px favicon on a plate, 13px/500 text).
  6. The `footer.dock`: a 44px profile disc, a hairline rule, then wide essentials tiles.
- **Current tab:** `.browse-tab[data-selected="true"]` gets `--row-active` plus `--row-rim` and
  weight 550, and its favicon plate becomes `favicon-plate-lit`. Other rows have no fill and a
  whisper of `--row-hover` on hover. Inactive favicons are desaturated (85%) and dimmed (82%).
- **New Tab** (`section.newtab`):
  - The baked day sky (`sky-day.avif`) dissolves through a dot screen into `--sky-day-paper`.
  - The white ZEPHIUM wordmark sits centred, with `time · date` beneath it.
  - The search field hangs from the top edge inside a notch cut into the page (an 18px-radius
    `clip-path`).
  - A settings disc sits top-right.
  - The foot holds three capsule stat chips: ads blocked, focused time with a meter, and tasks due
    with the overdue count in danger red.
- **Type:** the platform face only. Body 13, labels 12, captions 11, address 13.5. There is no
  webfont, so the page needs no font files.

## Using it in a web app

```html
<html lang="en" data-theme="light" data-material="liquid_glass">
<head>
  <link rel="stylesheet" href="theme.css">
  <link rel="stylesheet" href="utilities.css">
</head>
<body>
  <div class="shell flex h-screen w-screen p-2">
    <aside class="browser-sidebar relative flex shrink-0 flex-col text-text select-none"
           style="width:240px;--sidebar-width:240px"> … copy from mockup.html … </aside>
    <div class="stage-column">
      <main class="min-w-0 flex-1 ps-2">
        <div class="content-pane h-full w-full overflow-auto" style="background:#fff">
          … your app …
        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

- Copy the sidebar subtree from `mockup.html` and rename the rows to your app's sections. The
  mockup's script shows the selection contract: toggle `data-selected`, `aria-current` and
  `favicon-plate-lit`.
- Inside the page, build with the kit in `theme.css`: `.ui-shine` / `.ui-shine-press` /
  `.ui-shine-field` (the pressable material), `.ui-control` (every button and trigger),
  `.icon-button`, `.ui-menu` / `.ui-menu-item` (menus, the one blur), `.segmented`, plus the
  `shared/ui` component classes (Switch, Checkbox, Field, SearchField, ListRow, Badge, Chip,
  Progress, SettingsGroup and SettingsRow, EmptyState). Read each component's section in
  `theme.css` for its markup contract.
- Use the semantic tokens only (`--color-*`, `--row-*`, `--radius-*`, `--motion-*`, `--ease-*`),
  never the `--gray-*` primitives.
- Dark theme: `data-theme="dark"`. Accent tints: `data-tint="sky|sage|rose|amber|teal|lavender|orchid"`.
  Density: `data-density="compact"`. Reduced motion: `data-reduce-motion="true"`. These are all
  Zephium's own axes.
- Opaque fallback (no glass): `data-material="none"`, which puts the chrome on `--color-chrome`
  `#E6E6E9`.

## Rules the source states (and the template keeps)

- Luminance carries state. The "on" thing is the lit rung (ink `#222226` in light), not a brand
  hue. A tint recolours only the accent.
- Fill, not outline: controls are fills, with at most a top-edge `--shine-top`. Elevation
  (`--shadow-float`, `--shadow-menu`) only on what genuinely floats.
- One blur: menus and popovers (`backdrop-filter: blur(24px)` on `--color-menu`).
- Radii are named by job (`--radius-row`, `--radius-card`, `--radius-panel`). There is no size scale.
- Motion is named by purpose: instant 70, fast 120, base 200, slow 300, page 400 ms. Arrivals use
  `--ease-emphasized`, small moving parts `--ease-spring`, and what answers a click `--ease-snap`.
  Leaving is quicker than arriving. Animate only transform and opacity, and honour reduced motion.
- Scrollbars are off unless opted in with `.scrolls`, which shows a 4px capsule on hover with no
  track.
- Clipped labels fade at their end (`--mask-fade-end`) instead of ending in an ellipsis.

## Recapturing `reference.html`

The capture tests are harness files based on Zephium's own `ShellLook` and `NewTabLook`. They are
kept in `capture/` here, not in Zephium:
1. `pnpm install` in the Zephium checkout, then
   `npx playwright install webkit`.
2. Put `VzCapture.component.test.ts` (Shell with the tab set) and `VzNewTab.component.test.ts` (New
   Tab at 1176×884) in `frame/src/app/browser/tests/`. Run them with
   `npx vitest run --project component <files>`. They write `frame/.vzn/{page,newtab}.{html,css}`.
3. Compose: put the New Tab `section.newtab` inside
   `.stage-column > main > .content-pane[data-ground=own]` of the Shell DOM, concatenate both CSS
   dumps whole (never line-dedupe them), and set the ground override.
4. Delete the harness files from the Zephium checkout.

## Relationship to other entries

- **vera-hub:** a branded navy console with a glowing accent and mono labels. Vera Zep New is
  native-quiet graphite on glass. Use Zep for tools that should feel like a native Mac app.
