---
version: alpha
name: Aurora-design-analysis
description: "A light, glassy 'floating-pill' design language that applies the Fluxara brand palette (five colours: electric yellow, mint, pale blue, slate, deep slate) to the layout grammar of a modern crypto-dashboard reference — an oversized 200-weight uppercase hero, a floating pill navbar with the brand lockup sitting outside it, a blurred multi-radial aurora mesh bleeding across a near-white canvas, glass cards with backdrop-filter, and a folder-tab component that merges the active tab seamlessly into the panel below via an outward flare technique. The three bright brand colours (yellow, mint, pale blue) are fill-only — none clears 1.3:1 contrast on white — so every numeral and label instead uses same-hue derived inks. A fixed external brand mark (the Vera AI soundwave logo) sits on a dark tile and is deliberately excluded from the theme's colour ramp."

colors:
  # The five brand colours, verbatim (Fluxara palette)
  yellow: "#FFFF7F"
  mint: "#9BF1B4"
  pale-blue: "#98C5D1"
  slate: "#748C96"
  deep-slate: "#425459"
  # Derived inks — same-hue, darkened until AA-legible on white/card surfaces
  mint-ink: "#1C7A4B"
  amber-ink: "#8A6A08"
  coral: "#E0714A"
  coral-ink: "#B4502A"
  # Text-on-fill ink — darker still, for text sitting directly ON a bright fill
  # (delta pill, QRT-1 badge) rather than on white/card
  on-mint-fill: "#12351F"
  # Secondary greens that appear only as fills, never promoted to a named
  # root token in the source — document verbatim, do not collapse into `mint`
  bar-fill-green: "#4FD08A"
  accent-dot-green: "#3FBF7A"
  # Secondary amber — a second, slightly different yellow used for progress
  # bars / city rows; pairs with the same amber-ink text
  amber-bar-fill: "#F2D93B"
  # heatmap mid-tier amber (chart gradient + KPI cells) — distinct hex from
  # amber-bar-fill above, also pairs with amber-ink
  heatmap-amber: "#FFE24A"
  # Canvas + surfaces
  canvas: "#F6FAF8"
  card: "rgba(255,255,255,.82)"
  card-2: "#FFFFFF"
  line: "rgba(66,84,89,.13)"
  line-2: "rgba(66,84,89,.07)"
  progress-track: "rgba(66,84,89,.09)"
  # Text ramp
  t0: "#2B393D"
  t1: "#425459"
  t2: "#65787E"
  t3: "#748C96"
  # Shadow
  shadow: "0 1px 2px rgba(66,84,89,.05), 0 12px 32px -12px rgba(66,84,89,.16)"
  # Fixed brand-mark colours (Vera AI soundwave logo) — NOT part of the Aurora
  # ramp, never re-tinted per theme
  mark-tile-bg: "#0E2230"
  mark-cyan: "#7FD4FF"
  mark-red: "#E8434A"

typography:
  hero:
    fontFamily: Inter
    fontSize: 58px
    fontWeight: 200
    lineHeight: 1.03
    letterSpacing: -0.028em
    textTransform: uppercase
  hero-accent-span:
    fontFamily: Inter
    fontSize: 58px
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: -0.028em
  big-metric:
    fontFamily: Inter
    fontSize: 84px
    fontWeight: 200
    lineHeight: 1.0
    letterSpacing: -0.04em
  big-metric-unit:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: 300
    lineHeight: 1.0
  eyebrow:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.2em
    textTransform: uppercase
  brand-subtitle:
    fontFamily: Inter
    fontSize: 10.5px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.19em
    textTransform: uppercase
  brand-name:
    fontFamily: Inter
    fontSize: 25px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.035em
  card-title:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.015em
  nav-item:
    fontFamily: Inter
    fontSize: 13.5px
    fontWeight: 500
    lineHeight: 1.2
  body-brief:
    fontFamily: Inter
    fontSize: 14.5px
    fontWeight: 400
    lineHeight: 1.65
  button:
    fontFamily: Inter
    fontSize: 13.5px
    fontWeight: 600
    lineHeight: 1.2
  chip:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.07em
    textTransform: uppercase
  identity-name:
    fontFamily: Inter
    fontSize: 12.5px
    fontWeight: 600
    lineHeight: 1.25
  identity-role:
    fontFamily: Inter
    fontSize: 9.5px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.11em
    textTransform: uppercase
  menu-label:
    fontFamily: Inter
    fontSize: 9.5px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.16em
    textTransform: uppercase
  menu-item:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
  tab-label:
    fontFamily: Inter
    fontSize: 14.5px
    fontWeight: 500
    lineHeight: 1.2
  tab-label-active:
    fontFamily: Inter
    fontSize: 14.5px
    fontWeight: 600
    lineHeight: 1.2
  table-header:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.14em
    textTransform: uppercase
  kpi-row-label:
    fontFamily: Inter
    fontSize: 13.5px
    fontWeight: 500
    lineHeight: 1.2
  kpi-row-sublabel:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.06em
    textTransform: uppercase
  kpi-current-value:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.2
  legend-key:
    fontFamily: Inter
    fontSize: 10.5px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.1em
    textTransform: uppercase
  row-name:
    fontFamily: Inter
    fontSize: 12.5px
    fontWeight: 500
    lineHeight: 1.2
  row-value:
    fontFamily: Inter
    fontSize: 12.5px
    fontWeight: 600
    lineHeight: 1.2
  badge:
    fontFamily: Inter
    fontSize: 9.5px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.06em
  footnote:
    fontFamily: Inter
    fontSize: 12.5px
    fontWeight: 400
    lineHeight: 1.75

rounded:
  xs: 4px
  sm: 5px
  md: 16px
  lg: 18px
  xl: 22px
  pill: 9999px
  flare: 20px

spacing:
  content-max-width: 1320px
  page-pad: 18px 22px 60px
  hero-pad: 64px 8px 44px
  hero-gap: 40px
  card-pad: 22px 24px
  panel-pad: 24px 26px
  navbar-pad: 8px 9px
  nav-item-pad: 9px 17px
  grid2-gap: 16px
  wall-columns: 170px 1fr 92px 118px
  leaderboard-row-columns: 26px minmax(120px, 1fr) 1.1fr 58px 54px
  city-row-columns: 1fr 1.1fr 52px 44px

components:
  navbar-pill:
    backgroundColor: "rgba(255,255,255,.62)"
    border: "1px solid rgba(255,255,255,.7)"
    rounded: "{rounded.pill}"
    padding: "{spacing.navbar-pad}"
    shadow: "{colors.shadow}"
    note: "backdrop-filter: blur(18px). Starts at the nav items — the brand lockup sits outside it, not inside."
  nav-item:
    textColor: "{colors.t2}"
    typography: "{typography.nav-item}"
    rounded: "{rounded.pill}"
    padding: "{spacing.nav-item-pad}"
    note: "dot marker uses {colors.pale-blue} when inactive."
  nav-item-active:
    backgroundColor: "{colors.deep-slate}"
    textColor: "#FFFFFF"
    typography: "{typography.nav-item}"
    rounded: "{rounded.pill}"
    padding: "{spacing.nav-item-pad}"
    note: "dot marker switches to {colors.yellow} when active."
  chip:
    backgroundColor: "rgba(255,255,255,.6)"
    textColor: "{colors.t2}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
    border: "1px solid {colors.line}"
  chip-fill:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.on-mint-fill}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
    border: "transparent"
  button-dark:
    backgroundColor: "{colors.deep-slate}"
    textColor: "#FFFFFF"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "9px 19px (navbar) / 12px 26px (hero CTA)"
  button-ghost:
    backgroundColor: "rgba(255,255,255,.7)"
    textColor: "{colors.t1}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
    border: "1px solid {colors.line}"
  identity-chip:
    backgroundColor: "rgba(255,255,255,.7)"
    typography: "{typography.identity-name}"
    rounded: "{rounded.pill}"
    padding: "4px 13px 4px 4px"
    border: "1px solid {colors.line}"
    note: "hover: background #fff, border rgba(66,84,89,.22). Avatar chip 30x30 circle, {colors.deep-slate} bg, white initials."
  account-menu:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 6px
    width: 264px
    border: "1px solid {colors.line}"
    shadow: "0 2px 4px rgba(66,84,89,.06), 0 24px 48px -16px rgba(66,84,89,.28)"
    note: "Anchored to the identity chip, not the navbar — theme selection lives here because theme is an account preference, not a filter."
  menu-item:
    textColor: "{colors.t1}"
    typography: "{typography.menu-item}"
    rounded: "9px"
    padding: "8px 12px"
    note: "hover background rgba(66,84,89,.06)."
  menu-item-active:
    backgroundColor: "rgba(155,241,180,.22)"
    textColor: "{colors.t0}"
    typography: "{typography.menu-item}"
    fontWeight: 600
    rounded: "9px"
    padding: "8px 12px"
    note: "tick glyph colored {colors.mint-ink}."
  menu-item-danger:
    textColor: "{colors.coral-ink}"
    typography: "{typography.menu-item}"
    rounded: "9px"
    padding: "8px 12px"
    note: "hover background rgba(224,113,74,.1)."
  brand-mark-tile:
    backgroundColor: "{colors.mark-tile-bg}"
    rounded: "{rounded.md}"
    size: "54px (navbar) / 84px (footer, rounded {rounded.xl})"
    shadow: "0 6px 18px -8px rgba(14,34,48,.55)"
    note: "Houses the fixed vera-logo.svg soundwave mark. Never re-tinted."
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
    border: "1px solid rgba(255,255,255,.8)"
    shadow: "{colors.shadow}"
    note: "backdrop-filter: blur(18px)."
  card-nested:
    backgroundColor: "rgba(246,250,248,.7)"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-pad}"
    note: "Used for Leaderboard and Team PTG by City cards nested inside the folder-tab panel."
  panel:
    backgroundColor: "{colors.card-2}"
    rounded: "{rounded.xl}"
    padding: "{spacing.panel-pad}"
    shadow: "{colors.shadow}"
    note: "The surface the active folder tab merges into; z-index 1, sits below the tab's z-index 2."
  tab-strip:
    backgroundColor: "rgba(66,84,89,.16)"
    rounded: "{rounded.md} 0 0 0"
    padding: "0 {rounded.flare} 0 10px"
    note: "Recessed strip holding inactive tabs. Must sit with ZERO gap against the active tab — see Components: Folder Tabs."
  tab-inactive:
    textColor: "{colors.t2}"
    typography: "{typography.tab-label}"
    padding: "13px 24px"
    note: "dot marker {colors.slate}. hover color {colors.t0}."
  tab-active:
    backgroundColor: "{colors.card-2}"
    textColor: "{colors.t0}"
    typography: "{typography.tab-label-active}"
    rounded: "{rounded.md} {rounded.md} 0 0"
    padding: "21px 32px"
    note: "Taller than inactive tabs; margin-bottom -1px; flares outward on both sides. Dot marker {colors.accent-dot-green} with a 3.5px rgba(63,191,122,.2) ring."
  heatmap-cell:
    rounded: "{rounded.sm}"
    height: "30px"
    note: "Four fill states — below-goal {colors.coral} at 62% alpha, mid-tier {colors.heatmap-amber} at 70% alpha, at/above-goal {colors.mint} at 90% alpha, no-data {colors.line-2}."
  progress-bar:
    backgroundColor: "{colors.progress-track}"
    rounded: "{rounded.sm}"
    height: 7px
    note: "Fill color {colors.coral} (below goal) or {colors.bar-fill-green}/{colors.amber-bar-fill} depending on context. Bars scale to 140% of value, so the goal tick sits at 100/140 ≈ 71% from the left."
  progress-bar-tick:
    backgroundColor: "{colors.slate}"
    width: 1.5px
    note: "Positioned left:71%, spans -3px beyond the bar's top/bottom edge."
  delta-pill:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.on-mint-fill}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  quartile-badge-q1:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.on-mint-fill}"
    typography: "{typography.badge}"
    rounded: "6px"
    padding: "4px 0"
  quartile-badge-q2-q3:
    backgroundColor: "rgba(66,84,89,.07)"
    textColor: "{colors.t2}"
    typography: "{typography.badge}"
    rounded: "6px"
    padding: "4px 0"
  quartile-badge-q4:
    backgroundColor: "rgba(224,113,74,.16)"
    textColor: "{colors.coral-ink}"
    typography: "{typography.badge}"
    rounded: "6px"
    padding: "4px 0"
  theme-selector-row:
    backgroundColor: "rgba(255,255,255,.7)"
    textColor: "{colors.t1}"
    typography: "{typography.menu-item}"
    rounded: "{rounded.pill}"
    padding: "7px 13px"
    border: "1px solid {colors.line}"
    note: "Selected-state row: border #4FD08A, background rgba(155,241,180,.28), text {colors.t0} font-weight 600."
---

## Overview

Aurora takes the **Fluxara** brand palette — five colours, all light, none of them black — and expresses it in the layout language of a modern crypto-dashboard reference: a floating pill navbar, an oversized 200-weight uppercase hero, a floating glass chart card, and dot-tabs that fold seamlessly into the panel beneath them. It is a **light-only** system: the reference's near-black canvas was explicitly rejected in an earlier pass and corrected to a near-white one, because Fluxara is a light brand (mint, yellow and pale blue bleeding across near-white ground, not glowing on black).

The defining constraint of the whole system: **the three bright brand colours are fill-only.** On a white surface, `#9BF1B4` (mint) measures roughly 1.3:1 contrast and `#FFFF7F` (electric yellow) roughly 1.1:1 — neither clears any legibility threshold for text. So they never carry a label or a number. They fill bars, heatmap cells, chips and pills; every numeral and label that needs to read as "good" or "on-brand" uses a same-hue **derived ink** instead (`#1C7A4B` for mint, `#8A6A08` for amber). The source palette also ships with no alert/error colour at all, so Aurora derives one: a warm coral `#E0714A` (ink `#B4502A`) for anything below goal.

Behind the hero sits Aurora's signature: a blurred multi-radial-gradient **mesh** — mint, yellow and pale blue bleeding into a white bloom, `filter: blur(28px)` — the only place in the system where the brand's bright colours appear at scale rather than as small fills.

**Key characteristics:**
- Near-white canvas (`{colors.canvas}` `#F6FAF8`) with a blurred four-stop radial mesh behind the hero — never the layout reference's dark canvas.
- Glass cards: `rgba(255,255,255,.82)` background + `backdrop-filter: blur(18px)`, distinct from fully-opaque white (`{colors.card-2}`) used for the folder-tab panel and account menu.
- Bright brand colours (`{colors.yellow}`, `{colors.mint}`, `{colors.pale-blue}`) are fill-only; text/numerals use derived inks (`{colors.mint-ink}`, `{colors.amber-ink}`) or, when text sits directly on a bright fill, an even darker text-on-fill ink (`{colors.on-mint-fill}` `#12351F`).
- No native alert colour in the source palette — below-goal states use a derived coral, not a repurposed brand colour.
- Inter throughout, spanning an unusually wide weight range: 200 (hero, big metric) to 700 (brand wordmark).
- Folder-tab component: inactive tabs sit on a recessed strip, the active tab is a taller white surface that merges into the panel with an outward-flaring quarter-circle instead of a square seam.
- A fixed external brand mark (Vera AI soundwave logo) with colours locked outside the theme system entirely.
- Brand lockup lives **outside** the navbar pill; the pill itself begins at the nav items.

## Colors

> **Source:** `2026-07-28-aurora-theme-preview.html`, Vera AI — Performance Insights, applied to the Amazon CS / Team Cruz dashboard.

### The five brand colours (verbatim)

- **Electric Yellow** (`{colors.yellow}` — `#FFFF7F`): fill-only. Used in the aurora mesh, the theme swatch gradient, and the SVG chart-line gradient's midpoint (as `#FFE24A`, a closely related heatmap amber — see below).
- **Mint** (`{colors.mint}` — `#9BF1B4`): fill-only. Delta pill background, chip-fill background, Q1 quartile badge background, top-tier heatmap cells (at 90% alpha), area-fill under the trend line (at 55% alpha fading to 0), aurora mesh, theme swatch.
- **Pale Blue** (`{colors.pale-blue}` — `#98C5D1`): aurora mesh, theme swatch gradient, and the inactive-nav-item dot marker (`.nav a .dot`).
- **Slate** (`{colors.slate}` — `#748C96`): identical hex to text token `{colors.t3}` — the palette reuses this value both as a brand colour and as the tertiary text/label colour. Also the progress-bar goal-tick color and the inactive tab dot.
- **Deep Slate** (`{colors.deep-slate}` — `#425459`): identical hex to text token `{colors.t1}`. Carries the active-nav-item background, the identity avatar background, the brand-mark-adjacent "Filters" button, and all primary CTA buttons — the system's de facto "ink" for solid dark fills.

### Derived inks

The rule that makes the fills legible: **darken to the same hue until it clears AA on white, then use that for text.**

- **Mint Ink** (`{colors.mint-ink}` — `#1C7A4B`): every "good" numeral — KPI current values, leaderboard PTG scores, the menu's active-theme checkmark.
- **Amber Ink** (`{colors.amber-ink}` — `#8A6A08`): the mid-tier numeral color, e.g. city rows in the 90-93% PTG band.
- **Coral** (`{colors.coral}` — `#E0714A`) / **Coral Ink** (`{colors.coral-ink}` — `#B4502A`): the derived alert colour — fill and ink respectively — for anything below goal. The source Fluxara palette has no alert colour of its own.
- **On-Mint-Fill Ink** (`{colors.on-mint-fill}` — `#12351F`): a *third*, even darker green, distinct from `mint-ink`. Used only where text sits directly on top of the bright mint fill itself (the delta pill "▲ 9.9 vs yesterday", the Q1 quartile badge) — a fill-on-fill contrast problem that plain `mint-ink` doesn't solve as cleanly as this darker value.

### Secondary fill greens and ambers (present in the source, not named in the brand's five colours)

The heatmap/progress system actually runs on more green and amber granularity than the five-colour brand palette implies — document all of it rather than collapsing it into "mint":

- **Bar-fill Green** (`{colors.bar-fill-green}` — `#4FD08A`): the saturation used for progress-bar *fills* specifically (leaderboard bars, KPI wall bars) — brighter/more saturated than the brand mint so a thin 7px bar reads clearly against its track.
- **Accent-dot Green** (`{colors.accent-dot-green}` — `#3FBF7A`): the active-tab dot marker, its glow ring (`rgba(63,191,122,.2)`), and the endpoint stop of the chart-line gradient.
- **Heatmap Amber** (`{colors.heatmap-amber}` — `#FFE24A`): the mid-tier (90–100%) heatmap cell fill and the midpoint stop of the SVG chart-line gradient.
- **Amber Bar-fill** (`{colors.amber-bar-fill}` — `#F2D93B`): a second, slightly different amber used specifically for the "Team PTG by City" progress-bar fills. Both ambers pair with the same `{colors.amber-ink}` text — the source file never reconciled them into one token.

### Canvas & surfaces

- **Canvas** (`{colors.canvas}` — `#F6FAF8`): page background.
- **Card** (`{colors.card}` — `rgba(255,255,255,.82)`, `backdrop-filter: blur(18px)`): the glass hero/chart card and top-level cards.
- **Card-2** (`{colors.card-2}` — `#FFFFFF`, fully opaque): the folder-tab panel, active tab, and account menu — surfaces that must read as solid, not glass.
- **Line** (`{colors.line}` — `rgba(66,84,89,.13)`) / **Line-2** (`{colors.line-2}` — `rgba(66,84,89,.07)`) / **Progress Track** (`{colors.progress-track}` — `rgba(66,84,89,.09)`): three distinct alpha steps of deep-slate used for borders, hairlines, and the progress-bar track respectively. `line-2` and the heatmap's "no data" cell fill are the same value.

### Text ramp

`{colors.t0}` `#2B393D` (headings) → `{colors.t1}` `#425459` (body/primary, = deep-slate) → `{colors.t2}` `#65787E` (secondary) → `{colors.t3}` `#748C96` (tertiary/labels, = slate).

### Shadow

One shadow token system-wide: `{colors.shadow}` = `0 1px 2px rgba(66,84,89,.05), 0 12px 32px -12px rgba(66,84,89,.16)` — a soft, deep-slate-tinted ambient shadow (not a hard offset shadow — Aurora is a glass system, not a sticker system).

### Fixed brand-mark colours

`{colors.mark-cyan}` `#7FD4FF` and `{colors.mark-red}` `#E8434A` belong to the Vera AI logo asset itself and are **not part of the Aurora ramp** — see Components: Brand Mark.

## Typography

Inter is the only typeface, but it spans an unusually wide weight range (200–700) to do double duty as both a "hero display face" and a normal UI face.

### Hierarchy

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `{typography.big-metric}` | 84px | 200 | -0.04em | The hero PTG number |
| `{typography.hero}` | 58px | 200 | -0.028em | Hero headline, uppercase; `.accent` span switches to 400 weight |
| `{typography.card-title}` | 17px | 600 | -0.015em | Card headings ("Daily Team PTG", "Leaderboard") |
| `{typography.brand-name}` | 25px | 700 | -0.035em | "Vera AI" wordmark |
| `{typography.body-brief}` | 14.5px | 400 | 0 | Hero supporting sentence (max-width 46ch) |
| `{typography.tab-label}` / `-active` | 14.5px | 500 / 600 | 0 | Folder-tab labels |
| `{typography.nav-item}` | 13.5px | 500 | 0 | Pill-nav items |
| `{typography.button}` | 13–13.5px | 600 | 0 | All buttons, delta pill |
| `{typography.kpi-current-value}` | 15px | 600 | 0 | "Today" value in the KPI wall |
| `{typography.row-name}` / `{typography.row-value}` | 12.5px | 500 / 600 | 0 | Leaderboard/city row text and numbers |
| `{typography.eyebrow}` | 11px | 600 | 0.2em | Hero eyebrow date/rank line, uppercase |
| `{typography.brand-subtitle}` | 10.5px | 600 | 0.19em | "Performance Insights" under wordmark, uppercase |
| `{typography.identity-role}` | 9.5px | 600 | 0.11em | "Team Leader · 28 Agents", uppercase |
| `{typography.menu-label}` | 9.5px | 700 | 0.16em | Account-menu section labels ("Theme"), uppercase |
| `{typography.table-header}` | 10px | 600 | 0.14em | KPI wall column headers, uppercase |
| `{typography.legend-key}` | 10.5px | 600 | 0.1em | Heatmap legend, uppercase |
| `{typography.footnote}` | 12.5px | 400 | 0 | Page-level annotation text |

**The rule:** labels and eyebrows are always uppercase, 600–700 weight, 0.16–0.2em tracking — this is the system's "quiet, dense metadata" register. The hero and big-metric are the opposite extreme: 200-weight and huge, the loudest thing on the page, both spent on the single "how are we doing" number.

`font-variant-numeric: tabular-nums` is set at the `body` level — every number in the system, from the 84px hero metric down to an 11px table cell, aligns on fixed-width digits.

## Layout

### Spacing

- Page container: `{spacing.content-max-width}` 1320px, padding `{spacing.page-pad}`.
- Hero: padding `{spacing.hero-pad}` `64px 8px 44px`, two-column grid (`1.02fr .98fr`) with `{spacing.hero-gap}` 40px gap, collapsing to one column under 1080px.
- Cards: padding `{spacing.card-pad}` `22px 24px`; the folder-tab panel uses `{spacing.panel-pad}` `24px 26px`.
- KPI wall grid: `{spacing.wall-columns}` — `170px 1fr 92px 118px` (KPI name / 14-day heatmap / today's value / vs-goal bar).
- Leaderboard rows: `{spacing.leaderboard-row-columns}` — `26px minmax(120px,1fr) 1.1fr 58px 54px` (rank / name / bar / value / badge).
- City rows: `{spacing.city-row-columns}` — `1fr 1.1fr 52px 44px` (no rank column).

### Structural rule: brand lockup outside the pill

`.topbar` is a flex row of two siblings: `.brand` (`flex: none`) and `.navbar` (`flex: 1`, the actual pill — `border-radius: 9999px`, glass background, starts exactly at the nav items). The Vera AI wordmark and logo tile are never inside the pill's border-radius or background — they sit beside it on the bare canvas.

### Structural rule: account menu holds the theme selector

The signed-in identity chip (`.idc`) is a menu trigger, not a static label. Its dropdown (`.menu`) contains, in order: identity header (avatar, name, email) → a "Theme" section with all five theme options as radio-style menu items → a separator → Preferences → Sign out. **Theme selection is scoped to the account menu, not exposed as a separate navbar control** — the design intent stated in the source is that theme is an account preference, not a filter.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (mesh) | Fixed, blurred, absolutely-positioned radial-gradient stack behind the hero, `pointer-events: none` | `.aurora` — see Signature Element below |
| 1 (glass card) | `rgba(255,255,255,.82)` + `backdrop-filter: blur(18px)` + `{colors.shadow}` | `.card`, `.navbar` pill |
| 1-solid (opaque) | `#FFFFFF`, same shadow, no blur needed since it's already opaque | `.panel`, `.tab.on`, `.menu` |
| 2 (nested/recessed) | Flat tint background, no shadow, smaller radius | `.card-nested` (leaderboard/city cards), `.strip` (recessed tab strip) |
| 3 (menu, floating) | Sharper, deeper shadow: `0 2px 4px rgba(66,84,89,.06), 0 24px 48px -16px rgba(66,84,89,.28)` | `.menu` — needs to visibly float above the page, not just above its card |

Unlike a hard-shadow "sticker" system, every raised surface in Aurora uses the same soft, low-contrast ambient shadow — depth comes from blur and opacity layering (glass vs. solid), not from shadow weight.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Theme swatch chip |
| `{rounded.sm}` | 5px | Heatmap cells, progress-bar track/fill, quartile-badge corners (6px, effectively this tier) |
| `{rounded.md}` | 16px | Folder tabs (`--r-tab`), account menu |
| `{rounded.lg}` | 18px | Nested cards (leaderboard, city) |
| `{rounded.xl}` | 22px | Primary cards, the folder-tab panel, the large footer brand tile |
| `{rounded.pill}` | 9999px | Navbar, nav items, chips, buttons, identity chip, theme-selector rows |
| `{rounded.flare}` | 20px | **Not a corner radius** — the radius of the outward negative-space arc used by the folder-tab flare technique. See Components: Folder Tabs. |

## Components

### Navbar Pill
`navbar-pill` — glass pill (`rgba(255,255,255,.62)`, `blur(18px)`, `9999px` radius) that starts at the nav items, not at the brand lockup. Contains the nav links (left, `margin-right: auto`), then a program chip, a dark "Filters" button, and the account menu trigger (right).

### Chips & Buttons
`chip` — outlined, `rgba(255,255,255,.6)` bg, uppercase 11px/600 label. `chip-fill` is the same shape filled with `{colors.mint}` and `{colors.on-mint-fill}` text, used for standout stats like "Peak 104.7". `button-dark` (`{colors.deep-slate}` fill, white text) is the primary CTA; `button-ghost` (translucent white, outlined) is secondary.

### Identity Chip & Account Menu
`identity-chip` — avatar circle + name/role two-line stack + chevron, all inside a pill. Clicking opens `account-menu`: a 264px white card anchored to the chip, containing the identity header, a labeled "Theme" section (five `menu-item` radio rows, each with a small gradient swatch and — on the active row — a mint-ink check tick), then Preferences and a coral-ink "Sign out" (`menu-item-danger`).

### Brand Mark (fixed, do not re-theme)
`brand-mark-tile` — a dark tile (`#0E2230`) housing the real `vera-logo.svg` asset (`AI_Nav_Center/src/assets/vera-logo.svg`): a 4-bar soundwave, bars 1/2/4 cyan `#7FD4FF`, bar 3 red `#E8434A`. **These colours are fixed by the asset itself and are deliberately not mapped onto the Aurora ramp** — the dark tile exists specifically so the cyan bars stay legible against Aurora's light canvas, where they would otherwise wash out. Two sizes appear in the source: 54px/16px-radius in the navbar, 84px/22px-radius in the footer brand block.

Motion is inherited verbatim from the leadership-brief `.eq` animation: `transform-box: fill-box; transform-origin: bottom; animation: eq 2.6s ease-in-out infinite`, with per-bar delays `0s / .35s / .7s / .15s` (bars 1–4 respectively) and `@keyframes eq { 0%,100% { scaleY(1) } 50% { scaleY(.55) } }`. A `@media (prefers-reduced-motion: reduce)` rule kills the animation entirely (`animation: none !important`).

### Cards & Panel
`card` — the glass surface for the hero and the trend-chart card. `card-nested` — a flatter, non-glass tint (`rgba(246,250,248,.7)`) used for the Leaderboard and Team PTG by City cards, which sit *inside* the folder-tab panel rather than floating independently. `panel` — the opaque white surface the active folder tab merges into.

### Folder Tabs — the least obvious component, document carefully

Tabs are **not detached pills**. Inactive tabs (`By City`, `Leaderboard`) sit on a recessed strip (`background: rgba(66,84,89,.16)`); the active tab (`Pulse Wall`) is a taller, fully opaque white surface that merges seamlessly into the panel below it, with **zero visual seam**.

The join is produced by a flare technique: each surface (the strip, and the active tab on both sides) paints itself everywhere *except* a quarter-circle of negative space at its base, via a `radial-gradient` on a pseudo-element positioned just outside the element's own box:

```css
background: radial-gradient(circle at <corner>, transparent var(--flare), <fill-color> calc(var(--flare) + .5px));
```

- The strip's `::before` flares outward-left, sweeping the recessed strip color down onto the bare page (`radial-gradient(circle at 0 0, transparent 20px, var(--strip) 20.5px)`).
- The active tab's `::before` (left side) flares into the strip, and its `::after` (right side) flares onto the panel — both painting `var(--card-2)` (white) outward from the tab's bottom corners.

**Critical rule — this was a real bug found and fixed during design:** the strip must sit against the active tab with **zero margin**. If a gap is introduced between `.strip` and `.tab.on`, the active tab's flare has nothing to paint over, and a bare notch of raw page background shows through where the S-curve should be. The technique only works because the tab's flare paints directly *on top of* the strip's edge — `margin-bottom: -1px` on the active tab is what closes that gap.

### Heatmap & Progress
`heatmap-cell` — 30px-tall rounded cells in the 14-day KPI wall, four fill states (below-goal coral, mid-tier amber, at/above-goal mint, no-data neutral). `progress-bar` — 7px track, fill color contextual, with a `progress-bar-tick` marking the 100%-of-goal point. Because bars are scaled to 140% of value (headroom for over-goal performance), the goal tick sits at **71% from the left** (100/140 ≈ 71.4%), not at the visual midpoint or the right edge.

### Quartile Badges
Four variants keyed to leaderboard quartile: `quartile-badge-q1` (mint fill, on-mint-fill text — "top quartile" reads as the brand's best color), `quartile-badge-q2-q3` (neutral grey), `quartile-badge-q4` (coral-tinted, coral-ink text). The same `.q` badge shape is reused generically for the city table's sample-size counts using the q2/neutral style — it is not exclusively a quartile indicator in practice.

### Delta Pill
`delta-pill` — mint-filled pill carrying the "▲ 9.9 vs yesterday" comparison next to the hero's big metric. Uses `{colors.on-mint-fill}`, not `{colors.mint-ink}`, because the text sits directly on the mint fill rather than on a white/card background.

### Trend Chart
The daily-PTG sparkline is inline SVG, not a component class: a smoothed path stroked with a left-to-right `linearGradient` (`#lg`: coral `#E0714A` → amber `#FFE24A` at 52% → green `#3FBF7A`) and filled beneath with a top-to-bottom `linearGradient` (`#ag`: mint at 55% alpha fading to transparent). The gradient runs spatially left-to-right across the whole 14-day line — it is a decorative sweep, not a per-point value-to-color mapping.

## Themes

Aurora is one of five entries in the account menu's theme list — Corp Light, Corp Dark, AutoAlchemy, AutoAlchemy Dark, and **Aurora**, with no dark counterpart shown. The source treats Aurora as light-only (see Known Gaps).

The theme swatch used to represent Aurora in menus and selector rows is a fixed 135deg gradient across all three bright brand colours: `linear-gradient(135deg, {colors.mint}, {colors.yellow} 55%, {colors.pale-blue})`.

## Accessibility

- **Contrast is the system's central design constraint, not an afterthought**: the source file explicitly measures `{colors.mint}` at ~1.3:1 and `{colors.yellow}` at ~1.1:1 on white, and structurally forbids using either for text — this is documented in a code comment in the source, not inferred.
- All numerals and labels route through a derived ink (`mint-ink`, `amber-ink`, `coral-ink`, or the fill-specific `on-mint-fill`) rather than a raw brand colour.
- `prefers-reduced-motion: reduce` is explicitly handled for the brand-mark's `.eq` animation — the only animated element in the source.
- No `:focus-visible` treatment is defined in the source file — treat this as a known gap before shipping to an interactive, non-preview audience (same gap noted in the AutoAlchemy sibling system).

## Do's and Don'ts

### Do
- Treat `{colors.yellow}`, `{colors.mint}`, and `{colors.pale-blue}` as fill-only. Never set them as a `color` (text) value.
- Route every "good" number through `{colors.mint-ink}` or `{colors.amber-ink}`; route every "bad" number through `{colors.coral-ink}`.
- Keep the brand-mark's cyan/red fixed — never remap `{colors.mark-cyan}` / `{colors.mark-red}` onto the Aurora ramp, even though they're both roughly in-gamut with the brand palette.
- Keep zero margin between the folder-tab strip and the active tab — the flare technique depends on it.
- Keep the brand lockup outside the navbar pill's border-radius and background.

### Don't
- Don't put label or numeral text directly on `{colors.mint}` or `{colors.yellow}` without swapping to a text-on-fill ink (`{colors.on-mint-fill}`) — `mint-ink` alone is tuned for white/card backgrounds, not for sitting on the fill itself.
- Don't introduce a margin or gap between `.strip` and `.tab.on` — it breaks the S-curve join and leaves a visible notch of bare canvas.
- Don't invent a dark Aurora variant without new design work — the source only ever shows one Aurora swatch, with no dark-mode token overrides.
- Don't move the theme selector into the navbar as a standalone control — it belongs inside the account menu by design.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop | 1080px+ | Full two-column hero, full nav visible, `grid2` two columns |
| Below 1080px | < 1080px | Hero collapses to one column (gap 28px); `h1` drops to 40px, big-metric drops to 60px; `.grid2` (leaderboard/city) collapses to one column; `.nav` (the pill-nav links) is hidden entirely; the tab row switches to `justify-content: flex-start` |

Only one breakpoint exists in the source. Below 1080px the nav links disappear with no documented replacement (no hamburger, no collapsed menu) — see Known Gaps.

## Known Gaps / Judgment Calls Made Writing This Doc

- **No dark Aurora variant.** The account menu lists Aurora once, with no "Aurora Dark" sibling the way AutoAlchemy has one. This doc presents Aurora as light-only rather than inventing dark tokens.
- **No mobile nav replacement.** `.nav{display:none}` below 1080px has no documented fallback (hamburger, drawer, etc.) in the source — flagged rather than invented.
- **Two ambers, two extra greens.** The source uses more color granularity than the five-colour brand brief implies: a second amber (`#F2D93B` alongside `#FFE24A`) and two extra greens beyond mint/mint-ink (`#4FD08A`, `#3FBF7A`). All four are documented verbatim above rather than collapsed into the nearest named brand color, since they appear as distinct literal values in the source CSS/SVG.
- **`progress-track` (`rgba(66,84,89,.09)`) is an inline value, not a root CSS variable** in the source — it sits between `{colors.line-2}` (.07) and `{colors.line}` (.13) as a third, untokenized alpha step. Documented here as its own token for completeness; the source itself never promoted it to `:root`.
- **`.q` quartile badge is reused as a generic small-count pill** (city sample sizes) beyond its literal quartile meaning — noted under Components: Quartile Badges rather than treated as a naming inconsistency to fix.
