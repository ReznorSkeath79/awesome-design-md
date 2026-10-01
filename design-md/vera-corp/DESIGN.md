---
version: alpha
name: Vera-corp-design-analysis
description: "Vera Corp is the corporate navy design system shared by the Vera AI apps and, since the 2026-10-01 redesign, the AutoAlchemy Hub. Two palettes: Corp Dark (deep navy #010D16 canvas, #04141F cards, ice-blue #7FD4FF accent) and Corp Light (#E8F0F6 canvas, white cards, #1878AE accent). Premium console feel: the app floats in a 28px-radius shell frame on a fixed ambient dual radial glow; raised cards (radius 14, soft drop shadow, top-lit gradient) sit on sunken wells (inset shadow); one accent that glows; hairline borders only; a consistent radius ladder (controls 10, tiles 12, cards 14, heroes 18, shell 28, chips 999). Inter for prose, JetBrains Mono for every number, label, pill and eyebrow, Michroma for the brand. Source of truth: autoalchmey_tracker app/src/theme-corp.css and docs/design/VERA-DESIGN-BRIEF.md (Vera AI Assist globals.css primary, Vera dashboard shading layer as the upgrade)."

colors:
  # Corp Dark
  canvas: "#010D16"
  bar: "#04141F"
  shell: "#03121C"
  card: "#04141F"
  card-hi: "#0A2233"
  text-0: "#DCEEF9"
  text-1: "#B9D2E0"
  text-2: "#9FC2D6"
  text-3: "#7FA3B8"
  primary: "#7FD4FF"
  primary-2: "#A5E2FF"
  on-primary: "#01141F"
  primary-soft: "rgba(127,212,255,.12)"
  primary-glow: "rgba(127,212,255,.30)"
  border: "rgba(255,255,255,.09)"
  line-2: "rgba(255,255,255,.05)"
  border-hot: "rgba(127,212,255,.40)"
  well-line: "rgba(0,0,0,.35)"
  ok: "#7FD4FF"
  warn: "#E8B54D"
  crit: "#E8434A"
  ok-fill: "rgba(127,212,255,.25)"
  warn-fill: "rgba(232,181,77,.40)"
  crit-fill: "rgba(232,67,74,.45)"
  info-bg: "rgba(127,212,255,.08)"
  info-border: "rgba(127,212,255,.30)"
  brand-tile: "#0E2230"
  # Corp Light
  light-canvas: "#E8F0F6"
  light-bar: "#FFFFFF"
  light-shell: "#F3F8FB"
  light-card: "#FFFFFF"
  light-card-hi: "#EDF3F9"
  light-text-0: "#0B2A3C"
  light-text-1: "#28465A"
  light-text-2: "#3E5D71"
  light-text-3: "#4A6478"
  light-primary: "#1878AE"
  light-primary-2: "#2B8CC4"
  light-on-primary: "#FFFFFF"
  light-accent-ink: "#136189"
  light-border: "rgba(4,38,59,.14)"
  light-border-hot: "rgba(24,120,174,.40)"
  light-well-line: "rgba(4,38,59,.16)"
  light-ok: "#1878AE"
  light-warn: "#A8761A"
  light-warn-ink: "#8A6113"
  light-crit: "#C4333B"
  light-crit-ink: "#A02830"

typography:
  page-head:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.02em
  section-title:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: -0.01em
  card-title:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.60
    letterSpacing: 0
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  button:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: 0
  eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 1.5px
  label:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 1.5px
  kpi-value:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.00
    letterSpacing: -0.01em
  table-head:
    fontFamily: JetBrains Mono
    fontSize: 10.5px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 1px
  data:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0.02em
  brand:
    fontFamily: Michroma
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.10
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 8px
  ctl: 10px
  sub: 12px
  card: 14px
  modal: 16px
  hero: 18px
  shell: 28px
  pill: 999px

spacing:
  card-pad: 24px
  section-gap: 32px
  table-row: 48px
  control-h: 38px
  rail-width: 240px
  rail-collapsed: 68px
  shell-max: 1520px

components:
  shell-frame:
    backgroundColor: "{colors.shell}"
    rounded: "{rounded.shell}"
    border: "1px solid {colors.border}"
    shadow: "0 40px 100px rgba(0,0,0,.6)"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.body}"
    rounded: "{rounded.card}"
    padding: 24px
    border: "1px solid {colors.border}"
    shadow: "0 10px 26px rgba(0,0,0,.45)"
  well:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.card}"
    padding: 14px
    border: "1px solid {colors.well-line}"
    shadow: "inset 0 2px 6px rgba(0,0,0,.55), inset 0 -1px 0 rgba(255,255,255,.03)"
  kpi-tile:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.kpi-value}"
    rounded: "{rounded.sub}"
    padding: 16px
    border: "1px solid {colors.border}"
    shadow: "0 6px 16px rgba(0,0,0,.40)"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.ctl}"
    padding: 0 14px
    shadow: "0 0 24px {colors.primary-glow}"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.button}"
    rounded: "{rounded.ctl}"
    padding: 0 14px
    border: "1px solid {colors.border}"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
    border: "1px solid {colors.border}"
  chip-hot:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
    border: "1px solid {colors.border-hot}"
    shadow: "0 0 14px {colors.primary-glow}"
  rail-item-active:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.text-0}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sub}"
    padding: 8px 10px
  table-head:
    backgroundColor: "{colors.card-hi}"
    textColor: "{colors.text-3}"
    typography: "{typography.table-head}"
---

## Overview

**Vera Corp** is the corporate navy design system of the Vera AI apps (Vera AI Assist, the Vera dashboard) and, since the **2026-10-01 hub redesign**, of the **AutoAlchemy Hub** too. Refer to it as **Vera Corp**, with two palettes: **Corp Dark** (`data-theme="corp-dark"`) and **Corp Light** (`data-theme="corp-light"`). The hub ships Corp Light as its default and Corp Dark as the paired mode.

It reads as a premium console: the whole app floats inside a large rounded shell frame on a softly glowing navy canvas; content cards are raised with a soft drop shadow and a top-lit gradient; numbers sit "pressed into" sunken wells; one ice-blue (dark) or corporate-blue (light) accent carries every active and primary signal and glows where it is filled. Borders are hairlines only. Corners follow a fixed ladder, never ad hoc.

Source of truth: `autoalchmey_tracker/app/src/theme-corp.css` (the theme layer the hub runs) and `docs/design/VERA-DESIGN-BRIEF.md` (the brief it was built from, citing Vera AI Assist `app/globals.css` as primary and the Vera dashboard's shading layer as the upgrade). This supersedes the lime spec in [`ai-navigator`](../ai-navigator/DESIGN.md) for anything Vera or hub.

**Key characteristics**
- Corp Dark: canvas `#010D16`, bar/card `#04141F`, card hover `#0A2233`, text `#DCEEF9 / #B9D2E0 / #9FC2D6 / #7FA3B8`, accent `#7FD4FF` (hover `#A5E2FF`), on-accent `#01141F`.
- Corp Light: canvas `#E8F0F6`, bar/card `#FFFFFF`, shell `#F3F8FB`, text `#0B2A3C / #28465A / #3E5D71 / #4A6478`, accent `#1878AE` (hover `#2B8CC4`), accent as text `#136189`.
- Status: OK is the accent colour (navy-monochrome in light, ice-blue in dark), never green. Warn amber, crit red.
- **Radius ladder:** 4 tags · 8 tooltips/menu items · 10 controls · 12 tiles/sub-surfaces · 14 cards · 16 modals · 18 heroes · 28 shell · 999 pills. Cards are never pill-rounded.
- **Raised on sunken:** tiles with `0 6px 16px` shadow inside wells with `inset 0 2px 6px`.
- **One accent, glowing:** primary buttons and hot chips carry `0 0 24px` accent glow; the active segment `0 0 14px`.
- **Type:** Inter for prose and buttons; JetBrains Mono for every number, label, pill, eyebrow and table head; Michroma for the brand mark and agent names.
- **Ambient canvas:** a fixed dual radial glow behind everything (accent top-left, amber or ice bottom-right at 5–12 %).

## Colors

| Role | Corp Dark | Corp Light | Use |
|---|---|---|---|
| `--bg-0` canvas | `#010D16` | `#E8F0F6` | page, sunken wells |
| `--bg-1` bar | `#04141F` | `#FFFFFF` | top bar, rail, sticky table head |
| `--shell` | `#03121C` | `#F3F8FB` | the shell frame, drawers |
| `--card` | `#04141F` | `#FFFFFF` | cards, chips, default buttons |
| `--card-hi` | `#0A2233` | `#EDF3F9` | hover rows, table head, ghost hover |
| `--text-0` | `#DCEEF9` | `#0B2A3C` | headings, values |
| `--text-1` | `#B9D2E0` | `#28465A` | body, table cells |
| `--text-2` | `#9FC2D6` | `#3E5D71` | eyebrows, labels, timestamps |
| `--text-3` | `#7FA3B8` | `#4A6478` | faint: axis, placeholders, table heads |
| accent (`--cnx-lime`, legacy name) | `#7FD4FF` | `#1878AE` | primary, active, focus |
| accent 2 | `#A5E2FF` | `#2B8CC4` | hover, gradient top stop |
| accent soft | `rgba(127,212,255,.12)` | `rgba(24,120,174,.10)` | active rail item, hot chip fill |
| accent glow | `rgba(127,212,255,.30)` | `rgba(24,120,174,.22)` | halos |
| `--border` | `rgba(255,255,255,.09)` | `rgba(4,38,59,.14)` | every hairline |
| `--line-2` | `rgba(255,255,255,.05)` | `rgba(4,38,59,.08)` | row dividers |
| `--border-hot` | `rgba(127,212,255,.40)` | `rgba(24,120,174,.40)` | hover / active borders |
| `--well-line` | `rgba(0,0,0,.35)` | `rgba(4,38,59,.16)` | well borders |
| ok / warn / crit | `#7FD4FF` / `#E8B54D` / `#E8434A` | `#1878AE` / `#A8761A` / `#C4333B` | status text; light inks `#136189` / `#8A6113` / `#A02830` |
| ok / warn / crit fill | `.25` / `.40` / `.45` alpha | `.26` / `.45` / `.50` alpha | heatmap cells, strong tints |
| info bg / border | `rgba(127,212,255,.08)` / `.30` | `rgba(24,120,174,.06)` / `.20` | banners |
| brand tile | `#0E2230` | `#0E2230` | Vera mark tile, fixed in both |

The accent keeps the legacy token name `--cnx-lime` in the Vera codebase even though it is blue. Use the hub's `--ft-accent` alias in new work.

## Gradients ("lit surfaces")

Corp Dark values (Corp Light equivalents are in the source):
- **Canvas** `radial-gradient(1200px 700px at 12% -10%, rgba(127,212,255,.12), transparent 60%), radial-gradient(900px 600px at 95% 110%, rgba(232,181,77,.05), transparent 60%), linear-gradient(180deg,#021420 0%,#010A11 100%)`, `background-attachment: fixed`.
- **Shell** `radial-gradient(900px 420px at 0% 0%, rgba(127,212,255,.06), transparent 70%), linear-gradient(180deg,#05192A 0%,#03111B 100%)`.
- **Bar** `linear-gradient(180deg,#071D2C 0%,#04141F 100%)`.
- **Card** `linear-gradient(180deg,#0A2233 0%,#051826 55%,#04141F 100%)`.
- **Tile** `linear-gradient(180deg,#0C2638 0%,#061A28 100%)`.
- **Well** `linear-gradient(180deg,#00070D 0%,#010D16 40%,#021320 100%)`.
- **Accent** `linear-gradient(180deg,#A5E2FF 0%,#7FD4FF 100%)` for primary buttons.
- **Selected / inverse panel** `linear-gradient(160deg,#B4CDDB 0%,#9CB9CA 55%,#8AAABD 100%)` (dark); `linear-gradient(160deg,#2A4E66 0%,#1E3D52 55%,#173244 100%)` (light).
- **Progress fill** `linear-gradient(90deg, accent, accent-2)` + `0 0 10px` glow.

## Typography

| Role | Spec |
|---|---|
| Page head H1 | Inter 28 / 600 / -0.02em / 1.25 |
| Section title | Inter 20 / 600 / 1.3 |
| Card title | Inter 16 / 600 |
| Body | Inter 15 / 1.6 (dense UI 13–14) |
| Button | Inter 13 / 500 (primary 600) |
| Eyebrow / breadcrumb | JetBrains Mono 11 / 600, uppercase, 1.5px; accent-coloured for section eyebrows |
| Label / chip / KPI label | JetBrains Mono 10 / 600, uppercase, 1.5px |
| KPI value | JetBrains Mono 22 / 500, tabular |
| Table head | JetBrains Mono 10.5 / 600, uppercase, 1px |
| Data | JetBrains Mono 12, tabular |
| Brand / agent names | Michroma |

Prose capped near 68ch. `font-variant-numeric: tabular-nums` on all numeric spans.

## Layout

- **Shell frame:** `max-width:1520px; margin:20px auto; border-radius:28px; border:1px solid var(--border); box-shadow:0 40px 100px rgba(0,0,0,.6)` (light: `rgba(4,38,59,.18)`); flattens to edge-to-edge under 768px.
- **Top bar:** ~72px, `--sh-bar` gradient, hairline bottom, `backdrop-filter: blur(12px)`; brand tile 40px radius 12 left; tools right, often in a sunken icon tray (radius 14).
- **Left rail:** 240px (collapses to 68px), `--bg-1`, grouped with mono 10px uppercase group heads; items 13/500, radius 12, hover `--card-hi` + `translateX(4px)`; **active = accent-soft fill, semibold, accent icon, and a 3px glowing accent bar** at the rail's left edge.
- **Main:** padding `28px 32px 44px`; section gap 32px; card padding 24px.
- **Grids:** KPI rail 4 → 2 (≤1100) → 1 (≤600); two-up sections `1fr 1fr` gap 16.

## Elevation & Depth

| Level | Treatment |
|---|---|
| Card | `0 10px 26px rgba(0,0,0,.45)` dark / `0 8px 22px rgba(0,0,0,.16)` light |
| Tile in a well | `0 6px 16px rgba(0,0,0,.40)` dark / `.16` light; hover `0 12px 26px` + `translateY(-2px)` |
| Well (sunken) | `inset 0 2px 6px rgba(0,0,0,.55), inset 0 -1px 0 rgba(255,255,255,.03)`; light `inset 0 2px 6px rgba(4,38,59,.16), inset 0 -1px 0 rgba(255,255,255,.7)` |
| Menu / modal | `0 16px 48px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04)` |
| Accent halo | `0 0 24px` accent glow on filled accent; `0 0 14px` on the active segment |
| Shell | `0 40px 100px` |

## Components

- **Card:** `--sh-card`, 1px border, radius 14, padding 24, card shadow; head row with title 16/600 and mono count.
- **KPI rail:** a sunken well (radius 14, padding 14) holding raised tiles (radius 12, padding 16): mono label, 22px mono value, mono sub-line or sparkline.
- **Table:** wrapper radius 14 with card shadow; head on `--card-hi`, mono 10.5 uppercase `--text-3`; rows ≥ 48px, one `--line-2` hairline, no zebra; hover `--card-hi`; selected row accent-soft.
- **Buttons:** radius 10, height 38; secondary = `--card` + border, hover `--card-hi` + hot border; primary = accent gradient + on-accent text + glow; ghost = transparent, hover `--card-hi`.
- **Chips / pills:** radius 999, mono 10 uppercase 1.5px, `--card` + border; hot chip = accent-soft + hot border + glow.
- **Alerts / banners:** radius 12, tinted with `--info-bg` / warn / crit at low alpha, 1px matching border, mono uppercase title.
- **Inputs:** radius 10, `--bg-0` or `--sh-well`, `inset 0 1px 3px rgba(0,0,0,.18)`, focus hot border.
- **Segmented / tabs:** sunken pill track (radius 999) with chip segments; active = accent fill + on-accent text + `0 0 14px` glow.
- **Progress:** 6px pill track on `--card-hi`, accent gradient fill with glow.
- **Status:** SVG icon plus word, coloured ok / warn / crit ink.
- **Focus:** `outline: 2px solid` accent, offset 2, radius 4.
- **Loading:** the Vera mark animating as an equaliser; no spinners or skeletons.

## Motion

- Standard transitions 150ms `cubic-bezier(0.22,1,0.36,1)`; card lift 280ms.
- Rail item hover `translateX(4px)`; tiles lift 2px on hover.
- Optional hero flourishes: conic "crawling" border on hover (3.6s), spotlight dims siblings to `.35` opacity.
- `prefers-reduced-motion` collapses all animation and transition durations.

## Do's and Don'ts

**Do**
- Use the radius ladder exactly; pick the rung by component role.
- Put raised tiles inside sunken wells for KPI and summary rows.
- Spend glow only on filled accent elements.
- Keep every number, label, chip and eyebrow in JetBrains Mono.
- Verify Corp Light separately: no white-only rgba on light surfaces; use the light fills and inks.

**Don't**
- No square 0px cards and no hard offset shadows — that is Futura / AutoAlchemy, not Vera Corp.
- No green for OK; OK is the accent colour.
- No zebra striping in tables.
- No second accent hue; amber and red are status only.
- No generic spinners or skeleton shimmer.

## Responsive Behavior

| Width | Change |
|---|---|
| ≤ 1100 | KPI rail to 2 columns |
| ≤ 960 | top bar hides secondary text |
| ≤ 768 | shell frame flattens (no margin, radius, border, shadow); rail collapses or becomes a drawer |
| ≤ 600 | KPI rail to 1 column; phone chrome |

## Relationship to other entries

- [`ai-navigator`](../ai-navigator/DESIGN.md): the legacy lime "dark cosmic" Vera spec. Its radius and type scales still hold; its colours are superseded by Vera Corp.
- [`futura`](../futura/DESIGN.md) / [`futura-dark`](../futura-dark/DESIGN.md): the hub's original frozen kit (0px, no shadows). Still the class kit underneath the hub, but not its current look under the corp themes.
- [`autoalchemy`](../autoalchemy/DESIGN.md): warm paper with hard offset shadows; the hub's other theme pair. Different language; do not mix.
