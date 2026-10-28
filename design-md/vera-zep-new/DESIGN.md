---
version: alpha
name: Vera-zep-new
description: "Vera Zep New is a quiet, native-feeling web-app system distilled from the Zephium browser's chrome (ReznorSkeath79/Zephium, frame/src/styles @ 175300d8, 2026-10-28). Graphite tonal ladder with no accent hue by default: luminance carries every state and the 'on' thing is simply the brightest thing in the frame (the lit rung). Optional one-attribute tint (sky, sage, rose, amber, teal, lavender, orchid). The app is a chrome frame (sidebar + assistant column on the window ground) holding one solid page sheet inset 8px with a 12px corner. Fill, not outline: controls are translucent fills with one top-edge 'shine' line, elevation only on what genuinely floats, one blur (menus/launcher). Role-named radii (row 12, control 10/14, card 18, panel 22). System font stack, 13px body. Motion named by purpose (70/120/200/300/400ms) with sampled-spring linear() curves, transform + opacity only, reduced motion respected. Drop-in stylesheet: theme.css."

colors:
  # Dark (base)
  canvas: "#1A1A1D"
  chrome: "#1F1F22"
  page: "#1A1A1D"
  surface: "#26262A"
  raised: "#2C2C30"
  float: "#3D3D44"
  text: "#F4F4F6"
  label-secondary: "#D8D8DB"
  muted: "rgba(244,244,246,.68)"
  faint: "rgba(244,244,246,.44)"
  fill: "rgba(255,255,255,.05)"
  fill-hover: "rgba(255,255,255,.08)"
  row-active: "rgba(255,255,255,.075)"
  border: "rgba(255,255,255,.07)"
  border-strong: "rgba(255,255,255,.13)"
  lit: "#EDEDF0"
  on-lit: "#161619"
  danger: "#EF8A8E"
  success: "#7FCAA1"
  warning: "#DCB977"
  info: "#8FBCF7"
  # Light
  light-canvas: "#F1F1F3"
  light-chrome: "#E6E6E9"
  light-page: "#F1F1F3"
  light-surface: "#FFFFFF"
  light-float: "#FFFFFF"
  light-text: "#1C1C1F"
  light-label-secondary: "#55555C"
  light-muted: "rgba(28,28,31,.62)"
  light-lit: "#222226"
  light-on-lit: "#FFFFFF"
  light-danger: "#C0474F"
  light-success: "#2F7F5A"
  # Tints (dark / light)
  tint-sky: "#7FB3F5 / #3B82E6"
  tint-sage: "#86C9A4 / #2F8A5E"
  tint-rose: "#EE8F95 / #D2545E"
  tint-amber: "#E9B872 / #A5680F"
  tint-teal: "#6FC6C1 / #188A84"
  tint-lavender: "#B3A4F2 / #6E5BD6"
  tint-orchid: "#DC9AD8 / #B14FA9"
  # Chart ladder (dark) — fixed order, never cycled
  chart: "#6193DB #B37046 #2DA58F #A47D00 #B77094 #679936 #7E68AB #C6685B"

typography:
  display:      { fontFamily: system-ui, fontSize: 36px, fontWeight: 300, lineHeight: 1.1, letterSpacing: -0.02em }
  headline:     { fontFamily: system-ui, fontSize: 26px, fontWeight: 600, lineHeight: 1.2, letterSpacing: -0.02em }
  title:        { fontFamily: system-ui, fontSize: 22px, fontWeight: 600, lineHeight: 1.25, letterSpacing: -0.01em }
  object-title: { fontFamily: system-ui, fontSize: 18px, fontWeight: 600, lineHeight: 1.3 }
  reading:      { fontFamily: system-ui, fontSize: 15px, fontWeight: 400, lineHeight: 1.6 }
  page-title:   { fontFamily: system-ui, fontSize: 14px, fontWeight: 600, lineHeight: 1.35 }
  body:         { fontFamily: system-ui, fontSize: 13px, fontWeight: 400, lineHeight: 1.4 }
  row:          { fontFamily: system-ui, fontSize: 13px, fontWeight: 500, currentWeight: 550 }
  label:        { fontFamily: system-ui, fontSize: 12px, fontWeight: 500 }
  caption:      { fontFamily: system-ui, fontSize: 11px, fontWeight: 600 }
  code:         { fontFamily: ui-monospace, fontSize: 12px, fontWeight: 400 }

rounded:
  swatch: 3px
  inset: 8px
  row: 12px
  control-compact: 10px
  control: 14px
  control-large: 18px
  card: 18px
  panel: 22px
  content: 12px
  capsule: 999px

spacing:
  rhythm: "8px, 4px subdivisions"
  frame-gap: 8px
  control: "24 compact · 30 regular · 34 large · 40 xl"
  row-sidebar: 36px
  row-page: 58px
  menu-row: 34px
  sidebar: "264px (rail 52px)"
  assist: 336px

components:
  - vz-app / vz-sidebar / vz-page / vz-assist
  - vz-row + vz-plate (gliding selection)
  - vz-btn (secondary · primary · ghost · danger; compact · regular · large; aria-busy)
  - vz-icon-btn
  - vz-field (regular · page 48px)
  - vz-segment + vz-segment-thumb
  - vz-switch · vz-check
  - vz-card · vz-group / vz-group-row · KPI
  - vz-badge · vz-tag (soft colours) · kbd · vz-avatar · vz-orb
  - vz-menu / vz-menu-item / vz-menu-sep · vz-launcher
  - vz-toast · vz-dots · vz-skeleton
  - vz-arrive · vz-cascade
---

# Vera Zep New

## Overview

A web-app system that feels like a well-made native app rather than a website. Source: the Zephium
browser's chrome, whose design rules are stated at length in its own stylesheets
(`frame/src/styles/tokens.css`, `docs/design/system.md`, `docs/design/interface.md`). This entry
keeps the rules and the numbers and drops what only a browser needs (native window materials,
traffic-light insets, WebView boundaries).

Three ideas carry the whole system:

1. **Tonal, not coloured.** Surfaces step by luminance. There is no brand hue: the selected tab, the
   on switch and the primary button are all the *lit rung*, the brightest thing on screen. A tint is
   one attribute (`data-tint`) and recolours only the accent.
2. **Fill, not outline.** Controls are translucent fills on the ground they sit on, with a single
   top-edge light line (`--shine-top`). A hairline appears only where a fill cannot separate two
   things (light-theme cards, menus).
3. **Frame and sheet.** The app is a *chrome frame* (sidebar, assistant column) on the window ground,
   holding one *solid page sheet*. You look through the chrome and at the page.

Files in this entry:
- `theme.css`: tokens, axes and every component class. Drop it into any app.
- `mockup.html`: a self-contained demo web app built only from `theme.css`.

## Colors

- **Ladder (dark):** canvas `#1A1A1D` → chrome `#1F1F22` → surface `#26262A` → raised `#2C2C30` →
  float `#3D3D44`. Each step is a perceptible luminance change, not three hex points. The page sheet
  is canvas-dark (`#1A1A1D`), one step *below* the chrome, so the frame reads as glass around it.
- **Ladder (light):** the same ladder read the other way: page `#F1F1F3`, chrome `#E6E6E9`, and
  surface, raised and float all white. Elevation still means brighter. The lit rung inverts to ink
  (`#222226`), so a primary button becomes near-black.
- **Text:** text, label-secondary, muted (68%), faint (44%). Inactive rows are muted, the current row
  is full text at weight 550.
- **State fills** are white (dark) or ink (light) at fixed alphas: fill 5%, hover 8%, active 12%,
  pressed 16%, strong 22%. Rows are quieter: hover 4%, active 7.5% plus a 1px inner rim (6%).
- **Status:** danger, success, warning and info are pastel in dark and deep in light. Status always
  carries text; colour is never the only signal. A destructive menu row keeps its red in the
  highlight, which is the only state fill allowed a hue.
- **Soft colours** (sky, mint, lemon, peach, rose, lilac) are for what a *person* marks: tags, note
  grounds, labels. Each is a 15% wash plus an ink mixed toward the text colour.
- **Charts:** eight categorical tones in a fixed order, never cycled, chosen to be CVD-safe on the
  surface. Use `--chart-1…8`, never tints, for data.
- **The one gradient:** the assistant's orb (`--color-lead-orb` → `--color-lead-orb-to`). No other
  gradient on content, no glow anywhere.

## Typography

The platform face (`-apple-system, system-ui, Segoe UI Variable…`), with `font-optical-sizing:auto`
and antialiasing on. No webfont, because native menus and dialogs render in the system face and a
webfont would change typeface under the cursor. This also means the pages need no font files.
Optional: swap `--font-sans` to Geist for a branded marketing surface.

Scale: caption 11 · label 12 · body 13 · page-title 14 · reading 15 · object-title 18 · title 22 ·
headline 26 · display 36 (light weight, used for a home-screen clock or a hero number). Numbers in
tables and KPIs use `tabular-nums`. Section labels are 11px/600 in faint, sentence case, never
letter-spaced caps.

## Layout

```
┌ chrome (window ground) ───────────────────────────────────────────────┐
│ ┌ sidebar 264 ┐ ┌ page sheet (radius 12, solid) ─────┐ ┌ assist 336 ┐ │
│ │ brand  ⌘K   │ │ header: title · segment · actions  │ │ orb · title │ │
│ │ search      │ │                                     │ │ thread      │ │
│ │ ─ Space ─   │ │ content (scrolls)                   │ │             │ │
│ │ rows ▸      │ │                                     │ │ composer    │ │
│ │ profile ⌄   │ └─────────────────────────────────────┘ └─────────────┘ │
└───────────────────────────────────────────────────────────────────────┘
          8px padding and 8px gaps everywhere around the sheet
```

- Only the lists scroll; headers and footers stay pinned. A label sits **above** what it governs.
- The sidebar collapses to a 52px icon rail (`data-sidebar="rail"`). It never hover-expands.
- The assistant column is optional and replaces content, never overlays it.
- Below 900px the sidebar becomes the rail. Below 640px the assistant becomes a full-height sheet.

## Elevation & Depth

Elevation only for what genuinely floats. Everything else separates by fill.

| Level | Token | Use |
|---|---|---|
| flat | `--shine-top` only | buttons, fields, plates on a surface |
| raised | `--shadow-raised` | a dragged row, a selected card |
| float | `--shadow-float` | toast, popover |
| overlay | `--shadow-overlay` | launcher / command palette |
| menu | `--shadow-menu` + shine | dropdown menus: a rim plus one wide soft drop |

Each shadow is one soft drop plus a hairline rim, never a stack. The **one blur** (24px backdrop)
belongs to menus and the launcher, the only things that float over other UI. Light-theme cards get a
0.5px hairline (`--shadow-card`) because white on pale grey needs one.

## Components

All in `theme.css`, prefixed `vz-`:

- **Row** (`.vz-row`): 36px, radius 12, muted at rest, whisper on hover. The current row is the plate
  (`row-active` plus a rim) at weight 550. In a list with `data-glide-host`, one `.vz-plate` *travels*
  to the selection on `--ease-spring` (300ms) instead of each row painting its own fill.
- **Button** (`.vz-btn`): 30px, radius 10, 12px/500. Variants: secondary (control fill + shine),
  `primary` (accent, which is the lit rung unless tinted), `ghost`, `danger` (16% red wash). Every
  button in a row has the same height; only the fill varies. Press shrinks to 0.97 at 70ms. A busy
  button shows a spinner and keeps its width.
- **Icon button** (`.vz-icon-btn`): 28px square, 16px glyph, muted until hover. Press 0.94.
- **Field** (`.vz-field`): same height as a button, field fill + shine. Focus deepens the fill and
  adds a 1px inner ring, never a coloured glow. Page size is 48px / radius 18 for hero search.
- **Segmented control** (`.vz-segment`): fill track. The thumb travels on `--ease-snap` (240ms) and is
  white with a hairline in light mode. It is the single presentation for a mutually exclusive choice.
- **Switch** (`.vz-switch`): 32×20 capsule, white 16px thumb with `--shadow-thumb`, which springs.
  The on-track is `--color-track-on` and follows the tint.
- **Checkbox** (`.vz-check`): 16px, radius 5. Checked fills with the accent and the tick *draws*
  (stroke-dashoffset, 200ms).
- **Card / Group** (`.vz-card`, `.vz-group`): surface, radius 18. A group stacks rows with inset
  hairlines (the settings pattern: label and description left, control right).
- **Badge / Tag** (`.vz-badge`, `.vz-tag`): 20px capsule with a status dot and a tone wash. A tag uses
  a soft colour.
- **Menu** (`.vz-menu`): radius 22, padding 6, 34px rows whose radius is 22 − 6 = 16, which keeps
  them concentric with the panel. Opens with scale 0.96 → 1 and −4px → 0 in 200ms, and closes in
  70ms.
- **Launcher** (`.vz-launcher`): a ⌘K command palette. Menu material, a 48px field, result rows,
  keyboard navigation.
- **Toast** (`.vz-toast`): float pill at the bottom centre. It rises in 400ms on the emphasized curve
  and leaves in 120ms.
- **Working dots / skeleton:** a three-dot pending pulse and a breathing fill. These are the only
  continuous animations, and only while something is genuinely in progress.
- **Orb** (`.vz-orb`): the assistant's avatar and the only gradient.

## Motion

Named by purpose, never by length:

| Token | ms | For |
|---|---|---|
| `--motion-instant` | 70 | the pointer is already there: hover fill, press, leaving |
| `--motion-fast` | 120 | colour and small in-place changes |
| `--motion-base` | 200 | menus opening, a tick drawing |
| `--motion-slow` | 300 | things that travel: plate, thumb |
| `--motion-page` | 400 | a surface arriving: page, toast, cascade |

Curves: `--ease-out` / `--ease-smooth` for feedback, `--ease-emphasized` for arrivals, `--ease-exit`
for leaving (always quicker than arriving), `--ease-spring` (sampled damped spring, 2% overshoot) for
small moving parts, `--ease-snap` (launched spring, 1.4%) for what answers a click.

Rules: animate `transform` and `opacity` only. Arrival rises 8px and fades in. A launch or page
change cascades children at 40ms steps (`.vz-cascade`). A completed list item holds for a moment,
then leaves. Nothing loops except an in-progress indicator. `prefers-reduced-motion` or
`data-reduce-motion="true"` collapses every duration to 0.01ms, so `transitionend` still fires.

## Do's and Don'ts

- **Do** let luminance carry state. **Don't** add a brand colour to make things "pop". Use a tint.
- **Do** use one height for every control in a row. **Don't** mix 15px and 16px icons in a cluster.
- **Do** name radii by job (`--radius-row`, `--radius-card`). **Don't** use `rounded-md`-style sizes.
- **Do** keep one blur (menus/launcher). **Don't** frost cards, sidebars or the page.
- **Don't** draw an outline around the page sheet or a ring around a highlighted menu row; the fill
  is already the edge.
- **Don't** use gradients (except the orb), glows, or letter-spaced uppercase labels.
- **Do** show a keyboard focus ring (2px, neutral, offset 2) on keyboard focus only.
- **Do** fade clipped labels (`.fade-end`) instead of using an ellipsis in rows.
- **Do** design both themes, reduced motion, and forced colours from the first component.

## Responsive Behavior

≥ 1200px: full frame (sidebar · page · assist). 900–1199px: assist closes by default.
640–899px: sidebar becomes the 52px rail. < 640px: frame padding stays 8px, the rail becomes a
bottom bar of icon buttons, and the assistant and launcher open as full-width sheets.

## Mockup brief (`mockup.html`)

A single self-contained file: `theme.css` inlined in `<style>`, no external requests, inline SVG
icons, vanilla JS. It demonstrates every component in a believable app called **"Zep Workspace"**,
with invented sample data labelled as such:

- **Frame:** sidebar (brand + ⌘K button, search field, "Workspace" section, nav rows Home / Dashboard
  / Tasks / Notes / Settings with gliding plate, a "Spaces" section with soft-colour dots, profile row
  with menu at the foot), page sheet, assistant column (toggle from the page header).
- **Home:** time in display type, muted date, one greeting line, 48px page search, a recent-items row
  of tiles.
- **Dashboard:** title + segmented range (7d / 30d / 90d, thumb springs, data changes), 4 KPI cards
  with deltas, a bar or line chart in inline SVG using `--chart-*`, a table with badges.
- **Tasks:** capture field shaped like a row, grouped list (Overdue / Today / Upcoming), checkboxes
  that draw the tick then let the row hold and leave, soft tags.
- **Settings:** groups with switches, theme segmented (Dark / Light / System), tint swatches (the 8
  tints, live), density, reduce motion. All of them switch the app live.
- **Overlays:** ⌘K launcher with keyboard navigation, a menu with a danger row, a toast with undo,
  working dots in the assistant while it "replies".
- Launch cascade on load, page arrival on navigation, rail collapse toggle.

## Relationship to other entries

- **vera-hub:** the corporate navy console (glowing accent, raised cards on sunken wells, mono
  labels). Vera Zep New is its opposite in temperament: neutral graphite, no glow, system type. Use
  Zep for tools that should feel like a native app. Use Vera Hub for branded dashboards and approval
  pages.
- **linear.app / raycast (reference):** close cousins in spirit. Zep's distinguishing marks are the
  lit rung instead of a brand accent, the frame-and-sheet shell, and the role-named radius ladder.
