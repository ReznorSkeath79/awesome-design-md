---
version: alpha
name: AutoAlchemy-design-analysis
description: "A warm-paper, hard-shadow 'brutalist sticker' design language for long-form technical/leadership briefs rendered as a single self-contained HTML file. Off-white paper background (#FBF9F4) with a faint dot-grid texture, near-flat 2-3px radii, and every card/button/KPI tile casting a solid offset shadow (4px 4px 0 0 ink) instead of a blurred drop shadow. One loud accent — orange (#FF6B1A) — carries every 'this matters' signal: hero pills, KPI values, card-head bullets, active sidebar nav. Numeric data renders in Doto (a pixel/mono display face) while all prose renders in Outfit — an instant visual split between 'reading' and 'data'. A persistent left sidebar gives numbered section navigation (01, 02, 03...) with IntersectionObserver scroll-spy, making an 8-section report feel like a navigable document instead of a wall of scroll. Light and dark themes are both first-class via [data-theme] CSS variable overrides."

colors:
  # Light paper (default :root)
  accent: "#FF6B1A"
  accent-2: "#E85B10"
  accent-ink: "#B0470C"
  accent-soft: "rgba(255,107,26,0.12)"
  accent-tint: "rgba(255,107,26,0.07)"
  paper-0: "#FBF9F4"
  paper-1: "#F2EFE8"
  paper-2: "#E8E3D8"
  paper-3: "#DED8CB"
  ink: "#1C1A16"
  ink-2: "#57534A"
  ink-3: "#8B8678"
  line: "#DED8CB"
  line-2: "#E9E4D9"
  status-ok: "#5B7A3F"
  status-warn: "#B8801F"
  status-crit: "#C0432C"
  status-info: "#4A6B7A"
  ok-tint: "rgba(91,122,63,0.12)"
  warn-tint: "rgba(184,128,31,0.12)"
  crit-tint: "rgba(192,67,44,0.12)"
  info-tint: "rgba(74,107,122,0.12)"
  # Dark theme override ([data-theme="dark"])
  dark-bg: "#1C1A16"
  dark-surface: "#242118"
  dark-well: "#2C2820"
  dark-surface-3: "#38342A"
  dark-text-0: "#F2EFE8"
  dark-text-1: "#C2BCAE"
  dark-text-2: "#8E8A7C"
  dark-accent: "#FF6B1A"
  dark-accent-2: "#FF8038"
  dark-accent-text: "#FF8A45"
  dark-status-ok: "#7FA85C"
  dark-status-warn: "#D6A03E"
  dark-status-crit: "#DB5C44"
  dark-status-info: "#6E97A8"

typography:
  page-head:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.015em
  section-title:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.01em
  eyebrow:
    fontFamily: Outfit
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: 0.22em
  mono-label:
    fontFamily: Outfit
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0.16em
  body-sm:
    fontFamily: Outfit
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  button:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: 0.01em
  kpi-value:
    fontFamily: Doto
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 0
  kpi-hero-value:
    fontFamily: Doto
    fontSize: 52px
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: 0
  td-num:
    fontFamily: Doto
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0
  nav-num:
    fontFamily: Doto
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 0.06em

rounded:
  sm: 2px
  md: 2px
  lg: 3px

spacing:
  pad-card: 20px
  gap-tight: 10px
  gap-default: 12px
  gap-section: 48px
  sidebar-width: 218px
  topbar-height: 56px
  content-max-width: 1160px

components:
  card:
    backgroundColor: "{colors.paper-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.pad-card}"
    border: "1.5px solid {colors.ink}"
    shadow: "3px 3px 0 0 {colors.ink}"
  card-flat:
    backgroundColor: "{colors.paper-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.pad-card}"
    border: "1px solid {colors.line}"
    shadow: none
  kpi-hero:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.kpi-hero-value}"
    rounded: "{rounded.lg}"
    padding: "{spacing.pad-card}"
  alert-ok:
    backgroundColor: "{colors.ok-tint}"
    textColor: "{colors.status-ok}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 14px 16px
    border: "1.5px solid {colors.status-ok}"
  alert-warn:
    backgroundColor: "{colors.warn-tint}"
    textColor: "{colors.status-warn}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 14px 16px
    border: "1.5px solid {colors.status-warn}"
  alert-crit:
    backgroundColor: "{colors.crit-tint}"
    textColor: "{colors.status-crit}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 14px 16px
    border: "1.5px solid {colors.status-crit}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 9px 15px
  button-hard:
    backgroundColor: "{colors.paper-1}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 9px 15px
    shadow: "3px 3px 0 0 {colors.ink}"
  pill:
    backgroundColor: transparent
    textColor: "{colors.ink-2}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.sm}"
    padding: 3px 8px
    border: "1px solid {colors.ink}"
  pill-hot:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.sm}"
    padding: 3px 8px
    border: "1px solid {colors.accent}"
  sidebar-nav-item:
    backgroundColor: transparent
    textColor: "{colors.ink-2}"
    typography: "{typography.body-sm}"
    padding: 9px 20px
  sidebar-nav-item-active:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: 9px 20px
    border-left: "3px solid {colors.accent}"
---

## Overview

AutoAlchemy is not a product UI theme — it's a **document design system** for turning a plan, model readout, or leadership brief into a polished, scrollable, printable single-file HTML deliverable. Where most design systems answer "what does the app look like," this one answers "what does the *report* look like."

The base surface is warm paper (`{colors.paper-0}` `#FBF9F4`), never a cold SaaS white — a faint dot-grid texture (`radial-gradient` dots at 6px spacing, 55% opacity) sits behind everything via a fixed `body::before` layer, and a soft orange glow washes the top of the page via `body::after`. Every card, KPI tile, table, and button casts a **hard, solid offset shadow** (`3px 3px 0 0 var(--ink)`, `4px 4px 0 0` on hover) rather than a blurred drop-shadow — this is the system's signature: a "sticker/stamp" feel, deliberately unpolished in a way that reads as confident rather than sloppy. Corners are nearly flat (2-3px radius) by design; this is not accidental under-styling, it's the visual grammar that makes the hard shadows read correctly (soft corners + hard shadows look broken; flat corners + hard shadows look intentional).

A **single accent, used loudly**: orange (`{colors.accent}` `#FF6B1A`). It never shares the stage with a second bright color — every "this matters" signal (hero pills, KPI hero values, the card-head accent square, active sidebar nav state) is the same orange. Numeric data gets its own typeface entirely: `Doto`, a pixel/mono display face, applied to every KPI value, table number, and pill count — while all prose runs in `Outfit`. This typeface split is the fastest way to scan a dense document: numbers *look* different from words at a glance.

**Key Characteristics:**
- Warm paper canvas with a fixed dot-grid texture overlay + top orange glow wash — never a flat, textureless background.
- Hard offset shadows on every raised surface (`3px 3px 0 0 ink` default, `4px 4px 0 0` hover/emphasis, `6px 6px 0 0` for hero-level cards) instead of blurred drop-shadows.
- Near-flat corner radii (2-3px) throughout — a deliberate pairing with the hard-shadow language, not an oversight.
- `Doto` (pixel/mono) exclusively for numbers; `Outfit` exclusively for prose. Never mixed.
- Persistent left sidebar with numbered nav (`01, 02, 03...`) + `IntersectionObserver` scroll-spy — makes long documents feel navigable.
- One chromatic accent (orange) carrying every emphasis signal; status colors (green/amber/red/blue) reserved strictly for ok/warn/crit/info semantics, never as decoration.
- Light and dark both first-class via `[data-theme="dark"]` — same component classes, tokens swap underneath.
- Zero build step: plain HTML + CSS custom properties + ~30 lines of vanilla JS (scroll-spy + theme toggle). `window.print()` gives a clean PDF export for free.

## Colors

> **Source:** `leadership-brief-autoalchemy.html`, KPI Predictive Model Leadership Brief, Concentrix PH Performance Intelligence.

### Accent

- **Orange** (`{colors.accent}` — `#FF6B1A`): The system's single chromatic accent. Fills `.ds-btn--primary`, colors every KPI hero value, the card-head accent square (`.ds-card__head::before`), active sidebar nav state, `.ds-pill--hot`.
- **Orange Hover** (`{colors.accent-2}` — `#E85B10`): Hover/pressed state of the accent.
- **Orange Ink** (`{colors.accent-ink}` — `#B0470C`): Darker, AA-safe orange for text-on-paper contexts (`.td-accent`, pill/alert text) where the raw accent would fail contrast on light paper.
- **Orange Soft** (`{colors.accent-soft}` — `rgba(255,107,26,.12)`): Tinted pill/badge backgrounds.
- **Orange Tint** (`{colors.accent-tint}` — `rgba(255,107,26,.07)`): Large-area wash — the hero glow, `body::after`, active sidebar nav background.

### Paper Surfaces

- **Page Canvas** (`{colors.paper-0}` — `#FBF9F4`): Page background.
- **Surface** (`{colors.paper-1}` — `#F2EFE8`): Cards, topbar, sidebar background.
- **Well** (`{colors.paper-2}` — `#E8E3D8`): Recessed content — progress-bar tracks, code blocks, hero card background.
- **Surface-3** (`{colors.paper-3}` — `#DED8CB`): Hover state on table rows.

### Ink (Text)

- **Ink** (`{colors.ink}` — `#1C1A16`): Primary text; also the shadow color for every hard shadow in light theme.
- **Ink-2** (`{colors.ink-2}` — `#57534A`): Muted/body text.
- **Ink-3** (`{colors.ink-3}` — `#8B8678`): Subtle text — labels, eyebrows, table header text.

### Status

- **OK** (`{colors.status-ok}` — `#5B7A3F`), **Warn** (`{colors.status-warn}` — `#B8801F`), **Crit** (`{colors.status-crit}` — `#C0432C`), **Info** (`{colors.status-info}` — `#4A6B7A`). Each pairs with a 12%-alpha `*-tint` background for alert boxes. Dark theme brightens all four (`#7FA85C / #D6A03E / #DB5C44 / #6E97A8`) for contrast against the dark surface.

## Typography

### Font Families

- **Outfit** — Every prose element: headings, body copy, labels, button text, pill text. Google Font, weights 300-900.
- **Doto** — Every number, exclusively: KPI values, table numeric columns, pill counts, sidebar nav numbers. Google Font, weights 400-900. Never used for prose.

**The rule:** if a human reads it as a sentence or label → Outfit. If it's a quantity, a metric, or a sequence number → Doto. This split is the system's fastest scanning aid.

### Hierarchy

| Token | Size | Weight | Family | Tracking | Use |
|---|---|---|---|---|---|
| `{typography.page-head}` | 28px | 800 | Outfit | -0.015em | Hero H1 (`.t-page`) |
| `{typography.section-title}` | 20px | 700 | Outfit | -0.01em | Section H2 (`.t-section`) |
| `{typography.eyebrow}` | 11px | 700 | Outfit | 0.22em | Section kicker, hero eyebrow |
| `{typography.mono-label}` | 11px | 600 | Outfit | 0.16em | Card-head labels, table headers |
| `{typography.body-sm}` | 13px | 400 | Outfit | 0 | Card body copy |
| `{typography.button}` | 12px | 600 | Outfit | 0.01em | All button labels |
| `{typography.kpi-value}` | 28px | 700 | Doto | 0 | Standard KPI tile value |
| `{typography.kpi-hero-value}` | 52px | 900 | Doto | 0 | Hero KPI tile value (`.ds-kpi--hero`) |
| `{typography.td-num}` | 13px | 600 | Doto | 0 | Numeric table cells |
| `{typography.nav-num}` | 10px | 700 | Doto | 0.06em | Sidebar nav item number, section number |

## Layout

### Spacing System

- **Card padding**: `{spacing.pad-card}` 20px standard, uniform across all card variants.
- **Section gap**: `{spacing.gap-section}` 48px vertical between stacked `<section>` elements in `.content`.
- **Grid gaps**: 10-14px between cards in any multi-column grid (`kpi-rail`, `two-col`, `rec-grid`, `feat-grid`, etc).

### Grid & Container

- Topbar: `{spacing.topbar-height}` 56px, sticky, `z-index: 100`.
- Sidebar: `{spacing.sidebar-width}` 218px, sticky at `top: 56px`, own scroll, hidden scrollbar.
- Content: `flex: 1`, `max-width: {spacing.content-max-width}` 1160px, `padding: 36px 32px 80px`.
- KPI rail: `1.25fr 1fr 1fr 1fr 1fr` (hero tile wider than the rest) — collapses to 2-col under 900px.
- Two-column content: `1fr 1fr` default, with `--6040` (`1.5fr 1fr`) and `--7030` (`2fr 1fr`) variants for asymmetric content/aside pairing.

### Whitespace Philosophy

Sections breathe via the 48px inter-section gap, not via oversized card padding — card interiors stay a tight, information-dense 20px. The dot-grid texture and orange top-glow prevent the paper from ever feeling sterile, even in sparse sections.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (texture) | Fixed `body::before` dot-grid + `body::after` top-glow wash | Always present behind all content |
| 1 (card default) | 1.5px `{colors.ink}` border + `box-shadow: 3px 3px 0 0 {colors.ink}` | `.ds-card`, `.ds-kpi`, `.rec-card`, `.use-card` |
| 1-flat (no shadow) | 1px `{colors.line}` border, no shadow | `.ds-card--flat` — used when a card sits inside another card's padding |
| 2 (hover/press) | Shadow grows to `4px 4px 0 0`, element translates `-1px,-1px`; on active, shadow shrinks to `1px 1px 0 0` and element translates `+1px,+1px` | `.ds-btn--hard` press interaction |
| 3 (hero/pop) | `box-shadow: 6px 6px 0 0 {colors.ink}` | `.hero`, `.ds-card--pop` |

This is the system's core visual metaphor: shadows behave like **physical paper stacked on paper**, not soft ambient light. Hover lifts the "sheet" up-left; press pushes it down-right into the shadow.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` / `{rounded.md}` | 2px | Pills, buttons, badges, inputs — near-flat by design |
| `{rounded.lg}` | 3px | Cards, KPI tiles, tables, code blocks |

**Note:** there is no pill/capsule radius in this system. `.ds-pill` uses the same 2px flat radius as everything else — a deliberate departure from typical rounded-pill UI conventions, consistent with the "sticker" language.

## Components

### Cards
**`card`** — Default raised card. `{colors.paper-1}` bg, 1.5px ink border, 3px radius, `3px 3px 0 0 {colors.ink}` shadow, 20px padding. `.ds-card__head` is an uppercase label row with an 8px accent-orange square bullet before it.

**`card-flat`** — No shadow, thin 1px line border. Used for cards nested inside another card's padding, or de-emphasized supporting content.

**`card-pop`** — Bigger shadow (`6px 6px 0 0`). Reserved for the hero card and any single "most important thing on the page" card.

### KPI Tiles
**`kpi-hero`** — 52px/900 Doto value on a recessed `{colors.paper-2}` well, no shadow. The single most important number on the page.

**`kpi` (standard)** — 28px/700 Doto value, standard card shadow. Used in a `kpi-rail` grid alongside the hero tile.

### Alerts
**`alert-ok / warn / crit / info`** — Tinted background (12% alpha) + 1.5px border in the matching status color + uppercase title row. Never decorative — reserved strictly for genuine ok/warn/crit/info signal, since the rest of the system spends its color budget entirely on orange.

### Buttons
**`button-primary`** — Filled orange, white text, 2px radius. The one place pure white text appears.

**`button-hard`** — Paper-surface button with the signature hard shadow; press animation moves the button into its own shadow.

### Pills
**`pill`** — 1px solid ink border, transparent bg, uppercase Outfit 11px/600 at 0.16em tracking, 2px flat radius (not rounded).

**`pill-hot`** — Orange-soft bg, orange-ink text, orange border. The "this is the headline stat" pill variant.

### Tables
Header row sits on `{colors.paper-2}` (the "well" token), 1.5px bottom border under the header. Numeric columns (`.td-num`, `.td-accent`) switch to Doto; text columns stay Outfit.

### Sidebar Navigation
Numbered nav items (`01, 02, 03...` in Doto), 3px left border appears on the active item in orange, background tints to `{colors.accent-tint}`. Driven by `IntersectionObserver` scroll-spy — active state follows scroll position, not just click state.

### Pipeline / Process Steps
`.pipeline` renders a connected horizontal line (`::before`) behind a row of numbered step cards — used for "how it was built" narratives (4-step build pipelines, etc).

### Compare (VS) Boxes
`.compare-row` puts a rejected approach (`.cmp-box--bad`, red-tinted) against a chosen approach (`.cmp-box--good`, green-tinted) with a centered "VS" glyph between them — the system's dedicated pattern for "why we didn't do X, why we did Y instead."

## Themes

| Theme | `data-theme` value | Accent | Notes |
|---|---|---|---|
| Light (default) | *(unset / `light`)* | `#FF6B1A` | Warm paper, ink-colored shadows |
| Dark | `dark` | `#FF6B1A` (bg-adjusted to `#FF8038` where needed for contrast) | Shadows switch from ink-colored to pure black; surfaces darken through `{colors.dark-bg} → dark-surface-3}` |

Toggled via a single `toggleTheme()` function flipping `data-theme` on `<body id="app">` — every color cascades from CSS custom property overrides, zero per-component JS color logic.

## Accessibility

- All text tokens are chosen for AA contrast against their intended surface (ink-2/ink-3 on paper-0/1).
- No focus-ring override is defined in the source file — **known gap**, see below. Add a visible `:focus-visible` outline in the accent color before shipping this template for an interactive (non-print) audience.
- `scrollbar-width: thin` + accent-tinted thumb hover — visible on both themes.
- Print (`window.print()`) uses the light theme's hard shadows and paper background, which reproduce cleanly on paper/PDF without extra print-specific CSS.

## Do's and Don'ts

### Do
- Use the single orange accent for every "this matters" signal — resist introducing a second bright color.
- Keep every card, button, and KPI tile's shadow color tied to `{colors.ink}` (light) / pure black (dark) — never a soft blurred shadow.
- Reserve `Doto` strictly for numbers; reserve status colors (green/amber/red/blue) strictly for genuine ok/warn/crit/info semantics.
- Keep the sidebar's `SECTION_IDS` array and each section's `nav-item data-section` value in exact sync — the scroll-spy silently no-ops if they drift.
- Number every section (`01, 02, 03...`) in both the sidebar and the section's own eyebrow — this numbering is what makes the document feel like a structured report.

### Don't
- Don't round any radius above 3px — soft corners break the "hard shadow = sticker" visual logic.
- Don't add a second chromatic accent color; if a second brand color is required, replace orange entirely rather than running two accents side by side.
- Don't use `Doto` for prose or `Outfit` for numeric values — the split is the system's main scanning aid and gets diluted if mixed.
- Don't skip the sidebar on a short document — scroll-spy navigation reads as "polished" even on a 3-4 section brief.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop | 900px+ | Full layout — sidebar visible, all grids at full column count |
| Mobile/Tablet | < 900px | Sidebar hidden entirely; `kpi-rail` → 2-col; all `two-col*` variants → 1-col; `feat-grid`/`pipeline` → 2-col; `rec-grid`/`use-grid`/`stat-grid`/`compare-row` → 1-col; the compare-row's "VS" glyph is hidden |

There is only one breakpoint in the source file — a single hard cutover at 900px, not a graduated responsive scale. This is intentional for a document template (read on desktop or exported to PDF); revisit if this template is repurposed for a primarily-mobile audience.

## Known Gaps

- No documented `:focus-visible` treatment — add one before using this template for anything with real interactive controls beyond the theme toggle/export button.
- No `prefers-reduced-motion` query in the source — the template has almost no motion (only the button press transform), so the risk is low, but note it before adding any new animated element.
- Only one theme-neutral accent (orange) is defined; no worked example yet of re-skinning to a different brand accent while keeping the shadow/shape language — the CDM `DESIGN.md` (Concentrix "Tech Enabled Recognition" system) is a good reference for how this project's owner re-skins a template's accent while keeping structural rules intact.
- Source template has no build step / component library — every class is hand-authored CSS. Fine for one-off briefs; would need real componentization (React/Vue) to scale across many documents without copy-paste drift.
