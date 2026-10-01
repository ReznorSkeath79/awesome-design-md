---
version: alpha
name: Futura-corp-design-analysis
description: "Futura Corp is the AutoAlchemy Hub's production design system: the Futura Swiss-brutalist instrument-panel structure (0px corners, 1px hairlines, no shadows, Inter Tight for human text and Space Mono for machine data, bracket IDs, data strips, symbol-first status) wearing the Vera dashboards' corporate navy palette. Corp Dark is the default: deep navy canvas (#010D16), navy panels and cards (#04141F), ice-blue accent (#7FD4FF) used as a fill that means exactly one thing — 'this needs you' — and real amber/red semantics that always travel with a symbol and a word. Corp Light is the paired day palette. The radial navy mesh replaces Futura's halftone dot field. Source of truth: autoalchmey_tracker docs/design/DESIGN-CONCEPT.md §7 and app/src/kit.css [data-theme=\"corp-dark\"|\"corp-light\"]."

colors:
  # Corp Dark (default)
  canvas: "#010D16"
  panel: "#04141F"
  on-panel: "#DCEEF9"
  card: "#04141F"
  on-card: "#DCEEF9"
  surface-slab: "#DCEEF9"
  on-surface-slab: "#01141F"
  field: "#010D16"
  inset: "#0A2231"
  ink: "#DCEEF9"
  text-2: "#7FA3B8"
  text-3: "#5F8299"
  primary: "#7FD4FF"
  primary-dim: "#4FA3D0"
  on-primary: "#01141F"
  accent-ink: "#7FD4FF"
  warn: "#E8B54D"
  crit: "#E8434A"
  hairline: "rgba(255,255,255,.35)"
  hairline-control: "rgba(255,255,255,.55)"
  hairline-soft: "rgba(255,255,255,.12)"
  disabled: "#486A80"
  ramp-1: "#DCEEF9"
  ramp-2: "#B9D2E0"
  ramp-3: "#9FC2D6"
  ramp-4: "#7FA3B8"
  ramp-5: "#5F8299"
  ramp-6: "#486A80"
  ramp-7: "#33536A"
  ramp-8: "#12303F"
  ramp-9: "#0A2231"
  ramp-10: "#04141F"
  ramp-11: "#010D16"
  mesh-1: "rgba(127,212,255,.10)"
  mesh-2: "rgba(127,212,255,.06)"
  mesh-3: "rgba(232,181,77,.04)"
  # Corp Light (paired)
  light-canvas: "#E8F0F6"
  light-panel: "#0B2A3C"
  light-on-panel: "#E8F0F6"
  light-card: "#FFFFFF"
  light-ink: "#0B2A3C"
  light-text-2: "#3E5D71"
  light-text-3: "#4E6A7D"
  light-primary: "#1878AE"
  light-on-primary: "#FFFFFF"
  light-accent-ink: "#136189"
  light-on-panel-accent: "#7FD4FF"
  light-warn: "#A8761A"
  light-warn-ink: "#8A6113"
  light-crit: "#C4333B"
  light-crit-ink: "#A02830"
  light-hairline: "rgba(4,38,59,.40)"
  light-hairline-control: "rgba(4,38,59,.55)"
  light-hairline-soft: "rgba(4,38,59,.14)"

typography:
  poster-h1:
    fontFamily: Inter Tight
    fontSize: 96px
    fontWeight: 700
    lineHeight: 1.00
    letterSpacing: -1.9px
  page-title:
    fontFamily: Inter Tight
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.10
    letterSpacing: -0.8px
  record-title:
    fontFamily: Inter Tight
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.4px
  panel-title:
    fontFamily: Inter Tight
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.3px
  rail-item:
    fontFamily: Inter Tight
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.1px
  body:
    fontFamily: Inter Tight
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  prose:
    fontFamily: Inter Tight
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.60
    letterSpacing: 0
  data:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0.5px
  button:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: 1.5px
  eyebrow:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: 2.0px
  label:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: 1.5px
  kpi:
    fontFamily: Space Mono
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.00
    letterSpacing: -1px
  caption:
    fontFamily: Inter Tight
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0.3px

rounded:
  none: 0px

spacing:
  topnav-height: 48px
  rail-width: 220px
  rail-collapsed: 56px
  control-min: 36px
  control-min-touch: 44px
  prose-max: 68ch

components:
  topnav:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow}"
    height: 48px
    border-bottom: "1px solid {colors.hairline}"
  rail-item:
    backgroundColor: transparent
    textColor: "{colors.text-2}"
    typography: "{typography.rail-item}"
    padding: 10px 16px
  rail-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.rail-item}"
    padding: 10px 16px
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.on-card}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 20px
    border: "1px solid {colors.hairline}"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-panel}"
    rounded: "{rounded.none}"
    padding: 24px
    border: "1px solid {colors.hairline-soft}"
  slab:
    backgroundColor: "{colors.surface-slab}"
    textColor: "{colors.on-surface-slab}"
    rounded: "{rounded.none}"
    padding: 24px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 10px 16px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 10px 16px
    border: "1px solid {colors.hairline-control}"
  chip:
    backgroundColor: transparent
    textColor: "{colors.text-2}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: 3px 8px
    border: "1px solid {colors.hairline}"
  chip-accent:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: 3px 8px
  kpi:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.kpi}"
    rounded: "{rounded.none}"
    padding: 20px
    border: "1px solid {colors.hairline}"
  table-head:
    backgroundColor: "{colors.inset}"
    textColor: "{colors.text-2}"
    typography: "{typography.label}"
    border-bottom: "1px solid {colors.hairline}"
  alert-warn:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 14px 16px
    border-left: "3px solid {colors.warn}"
  alert-crit:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 14px 16px
    border-left: "3px solid {colors.crit}"
---

## Overview

**Futura Corp** is the design system the AutoAlchemy Hub (hub.autoalchemy.org) runs in production. It is the [Futura](../futura/DESIGN.md) instrument-panel structure — 0px corners, 1px hairlines, no shadows, grotesque for human text and mono for machine data — wearing the corporate navy palette of the Vera AI dashboards, so a person moving from a Vera scorecard to a hub review page sees one family, not a brand break.

Refer to it by name: **Futura Corp** for the system, **Corp Dark** (`data-theme="corp-dark"`) and **Corp Light** (`data-theme="corp-light"`) for its two palettes. Corp Dark is the default for internal review pages, plans and dashboards.

The idea underneath is Futura's, made literal: the mono "data decoration" of the poster language becomes true data. A bracket ID is the record. A data strip is the object's real provenance. A timestamp is the frame a comment is nailed to. Nothing on screen is there to look technical; everything on screen is a measurement. Boldness is spent once per screen, and the accent means exactly one thing anywhere it appears: *this is the thing that needs you*.

**Key characteristics**
- Deep navy canvas `#010D16`; panels and cards one step up at `#04141F`; an inset well at `#0A2231` for table heads and tracks.
- One accent, ice blue `#7FD4FF`, used as a **fill** for active nav, the primary button, and "needs you" items — not sprinkled as decoration.
- Real amber `#E8B54D` and red `#E8434A` semantics, always paired with a symbol and a word.
- 0px corners everywhere; the radio ring is the only circle, because it is geometry, not a corner.
- No `box-shadow`, no glow, no blur. Hover lift is a drawn rectangle, not a shadow.
- Inter Tight for anything a human wrote; Space Mono for IDs, timestamps, sizes, counts, buttons, eyebrows and table heads. Never crossed.
- A radial navy mesh backdrop at ≤ .10 alpha replaces Futura's halftone dots. It must never read as a shape.
- Status vocabulary: `○` open · `◐` in progress · `●` done · `✕` blocked or declined · `⚠` needs attention · `▲ ▼` moved. Symbol plus word, always.

## Colors

All page CSS uses tokens, never literal hex. The hub names them `--ft-*`; a standalone page can declare the same names in a `[data-theme="corp-dark"]` block and switch to `corp-light` by restating the block.

| Token | Corp Dark | Corp Light | Role |
|---|---|---|---|
| `--ft-canvas` | `#010D16` | `#E8F0F6` | page ground |
| `--ft-panel` / `--ft-on-panel` | `#04141F` / `#DCEEF9` | `#0B2A3C` / `#E8F0F6` | the inverted module; dark in both palettes |
| `--ft-card-bg` / `--ft-on-card` | `#04141F` / `#DCEEF9` | `#FFFFFF` / `#0B2A3C` | record containers |
| `--ft-surface` / `--ft-on-surface` | `#DCEEF9` / `#01141F` | `#FFFFFF` / `#0B2A3C` | the loud opposite-value slab, one per zone |
| `--ft-inset` | `#0A2231` | `#D6E1E9` | table heads, tracks, recessed wells |
| `--ft-ink` | `#DCEEF9` | `#0B2A3C` | primary text |
| `--ft-text-2` | `#7FA3B8` | `#3E5D71` | secondary text |
| `--ft-text-3` | `#5F8299` | `#4E6A7D` | tertiary text, captions |
| `--ft-accent` / `--ft-on-accent` | `#7FD4FF` / `#01141F` | `#1878AE` / `#FFFFFF` | the fill |
| `--ft-accent-ink` | `#7FD4FF` | `#136189` | accent used as text |
| `--ft-on-panel-accent` | `#7FD4FF` | `#7FD4FF` | accent legible on the panel |
| `--ft-warn` / `--ft-warn-ink` | `#E8B54D` | `#A8761A` / `#8A6113` | warning, with `⚠` |
| `--ft-crit` / `--ft-crit-ink` | `#E8434A` | `#C4333B` / `#A02830` | critical, with `✕` or `⚠` |
| `--ft-hairline` | `rgba(255,255,255,.35)` | `rgba(4,38,59,.40)` | rules, card borders |
| `--ft-hairline-control` | `rgba(255,255,255,.55)` | `rgba(4,38,59,.55)` | control boundaries (≥ 3:1) |
| `--ft-hairline-soft` | `rgba(255,255,255,.12)` | `rgba(4,38,59,.14)` | decorative rules only |

**Accent as fill and accent as text are different tokens.** In Corp Light the accent `#1878AE` is only 4.20:1 as text on canvas and 1.72:1 on its own navy panel, so text uses `--ft-accent-ink` and panel text uses `--ft-on-panel-accent`. In Corp Dark all three resolve to `#7FD4FF`.

**What the accent means.** One rule everywhere: accent fill = *needs you* (overdue, blocked on you, unresolved and assigned), plus the active nav item and the primary button. A current phase is ink, not accent. Blocked is an outlined bar with `✕ BLOCKED`, never a fill.

## Typography

Two families. **Inter Tight** for anything a human wrote. **Space Mono** for anything a machine produced. That split is the system's core signal.

| Role | Family | Size / weight | Tracking |
|---|---|---|---|
| Poster H1 (landing only) | Inter Tight 700 | 96px | -1.9px |
| Page title | Inter Tight 700 | 40px | -0.8px |
| Record / card title | Inter Tight 700 | 28px | -0.4px |
| Panel title | Inter Tight 700 | 20px | -0.3px |
| Rail item, tab | Inter Tight 700 | 14px, sentence case | -0.1px |
| Body (dense UI) | Inter Tight 400 | 15px / 1.55 | 0 |
| Prose | Inter Tight 400 | 16px / 1.6, max 68ch | 0 |
| Data | Space Mono 400 | 13px, tabular | +0.5px |
| Button | Space Mono 700 | 13px, uppercase | +1.5px |
| Eyebrow | Space Mono 700 | 12px, uppercase | +2.0px |
| Label / table head | Space Mono 700 | 11px, uppercase | +1.5px |
| KPI number | Space Mono 700 | 48px | -1px |
| Caption | Inter Tight 400 | 11px | +0.3px |

Uppercase lives only in the mono machine layer. Prose is sentence case. Numbers in tables are Space Mono, `tabular-nums`, right-aligned.

## Layout

- **App shell:** 48px sticky top-nav (lockup left; instrumentation right — clock, counts, theme switch) plus a 220px left rail.
- **Rail:** mono index `/01 … /n`, label at 14px/700 sentence case, right-aligned mono count. Active item is an **accent fill with dark text**. No side-stripe accent. The rail foot may carry a 90°-rotated wordmark.
- **Work area:** max ~1160px, padding 32px; prose capped at 68ch.
- **Collapse:** 1024 → rail 56px (indices only); 768 → rail becomes a horizontal strip under the nav; 480 → padding 12px.
- **Page header:** breadcrumb, title with a bracket ID beside it, a data strip beneath, one bottom hairline.

## Elevation & Depth

Depth is layering and outline-versus-fill, never shadow.

| Level | Treatment |
|---|---|
| Canvas | `--ft-canvas` + the radial mesh at `z-index:-1` |
| Card / panel | `--ft-card-bg`, 1px `--ft-hairline` border |
| Inset | `--ft-inset` for wells, table heads, tracks |
| Slab | `--ft-surface`, the opposite-value plate, rationed to one per zone |
| Hover lift | a 1px outlined rectangle offset 4px behind the card (`::after`), never `box-shadow` |

## Shapes

0px everywhere — inputs, buttons, chips, cards, avatars, images. The radio ring is the single exception because a radio is geometry. Circles otherwise appear only as pure graphic geometry.

## Components

- **Bracket ID** `[AA-014]`: mono, shown beside titles and in rows; `--volt` variant is an accent fill.
- **Data strip:** a wrapping mono run of real provenance over a hairline — `[AS-0421] · MP4 / H.264 · 1920×1080 · 00:06:42.120 · 184.6 MB`. Wraps, never truncates.
- **Eyebrow:** Space Mono 12px uppercase, often with an index (`/04 HOSTING`).
- **Card:** card ground, 1px hairline, head row in mono label caps, body in Inter Tight.
- **KPI:** 48px Space Mono number, mono label above, one-line Inter Tight note below; a 4-up seamed grid shares borders.
- **Buttons:** primary = accent fill + on-accent mono caps; secondary = transparent + control hairline; ghost = text only. 36px minimum height, 44px on touch.
- **Chip:** 1px hairline, mono 11px caps; accent-filled chip for the one headline fact.
- **Table:** inset head in mono label caps with a 1px hairline under it; body rows separated by soft hairlines; numeric cells mono and right-aligned.
- **Status:** `○ ◐ ● ✕ ⚠ ▲ ▼` plus the word. In Corp themes `⚠` items may carry amber and `✕` red, but never colour alone.
- **Alert:** transparent ground, 3px left rule in `--ft-warn` / `--ft-crit` / `--ft-accent`, title in mono caps led by its symbol.
- **Compare (before / after):** two outlined boxes; the old one with a dashed soft hairline and muted text, the new one with a solid hairline and an accent-filled `NOW` label. Never de-emphasise with `opacity`.
- **Focus:** 2px solid `--ft-focus` outline, 2px offset, `:focus-visible` only, never removed.

## Do's and Don'ts

**Do**
- Use tokens only; grep page CSS for `#` before calling it done.
- Spend the accent on one thing per screen that needs the reader.
- Put every ID, timestamp, size and count in Space Mono; keep every sentence in Inter Tight.
- Pair every status colour with its symbol and word.
- Keep the mesh faint enough that its outline cannot be described.

**Don't**
- No `border-radius`, `box-shadow`, `filter: blur`, `backdrop-filter`, glow or glassmorphism.
- No decorative gradients beyond the capped mesh.
- No second bright hue beyond ice blue and the amber/red semantics; no purple, no indigo.
- No `opacity` to de-emphasise — it breaks the measured contrast ratios.
- No emoji. No three identical feature cards in a row.
- Never use the geometric Futura typeface; the name refers to the poster language, not the font.

## Responsive Behavior

| Width | Change |
|---|---|
| ≥ 1024 | full shell: top-nav + 220px rail |
| < 1024 | rail collapses to 56px indices |
| < 768 | rail becomes a horizontal strip under the nav; grids go to one column |
| < 480 | work-area padding 12px |

`prefers-reduced-motion` stops tickers and transitions. All transitions are 120ms linear; nothing exceeds 150ms; only background, colour, border-colour, width and transform animate.

## Accessibility (measured, Corp Dark / Corp Light)

| Pair | Corp Dark | Corp Light |
|---|---|---|
| Ink on canvas | 16.5:1 | 12.9:1 |
| `--ft-text-2` on canvas | 7.3:1 | 6.1:1 |
| `--ft-text-3` on canvas | 4.8:1 | 5.0:1 |
| On-accent on accent fill | 11.4:1 | 4.8:1 |
| Accent-ink as text on canvas | 11.9:1 | 5.9:1 |
| Warn-ink on canvas | 10.4:1 | 4.8:1 |
| Crit-ink on canvas | 5.0:1 | 6.4:1 |
| Control hairline (non-text, needs 3:1) | 4.5:1 | 3.5:1 |

## Relationship to other entries

- [`futura`](../futura/DESIGN.md) / [`futura-dark`](../futura-dark/DESIGN.md): same structure, volt `#dcfc52` palette; the hub's other two themes.
- [`ai-navigator`](../ai-navigator/DESIGN.md): the Vera / AI Navigator app, whose `corp-dark` / `corp-light` palette Futura Corp adopts. Futura Corp keeps Futura structure (0px, no shadows) where the Vera app ships a `--shadow` token; that token is deliberately not adopted.
- [`autoalchemy`](../autoalchemy/DESIGN.md): the warm-paper, hard-shadow document system used for earlier review pages. Different language; do not mix.

## Known Gaps

- No icon set: typographic symbols and 1px wireframe SVGs only; a real glyph set must be 1px stroke, 0px corners, and proposed first.
- Data-viz beyond bars and hairline plots is not specified; one accent series maximum.
- Email templates are out of scope.
