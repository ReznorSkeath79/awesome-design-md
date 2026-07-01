---
version: alpha
name: AI-Navigator-design-analysis
description: "A dark-cosmic enterprise AI cockpit — near-black violet backgrounds (#05060A / #0A0C14), electric lime (#D4FF00) as the single chromatic accent, and JetBrains Mono for every KPI value, label, and timestamp. The system reads as a live ops console: dense, data-first, purposefully sci-fi. Agent surfaces sit on glassmorphic panels with 60% backdrop-blur, ambient radial gradients pulse lime top-left and violet bottom-right at 6% opacity, and card borders glow hot (#D4FF00 at 30%) on the focus card. Headlines run in Inter at 600 with -0.02em tracking. Four named themes ship in one CSS file — the default dark-cosmic is the brand identity; light-cosmic, cnx-light, and cnx-dark are alternates. The lime accent remaps per-theme so every component class works across all four surfaces."

colors:
  # Dark-cosmic (default :root)
  primary: "#D4FF00"
  primary-2: "#E4FF4D"
  primary-soft: "rgba(212,255,0,0.15)"
  primary-glow: "rgba(212,255,0,0.35)"
  bg-0: "#05060A"
  bg-1: "#0A0C14"
  shell: "#0E1120"
  card: "#141728"
  card-hi: "#1A1E34"
  text-0: "#F4F6FB"
  text-1: "#B6BCCC"
  text-2: "#8A92A6"
  text-dark: "#0A0C14"
  border: "rgba(255,255,255,0.06)"
  border-hot: "rgba(212,255,0,0.3)"
  red: "#FF4D5E"
  amber: "#FFB020"
  green: "#38E1A1"
  info: "#4FC3F7"
  info-bg: "rgba(79,195,247,0.08)"
  info-border: "rgba(79,195,247,0.35)"
  ok-tint: "rgba(56,225,161,0.08)"
  warn-tint: "rgba(255,176,32,0.10)"
  crit-tint: "rgba(255,77,94,0.12)"
  # Light-cosmic override
  light-primary: "#7FB000"
  light-primary-2: "#8FC400"
  light-bg-0: "#EDF0F7"
  light-bg-1: "#FFFFFF"
  light-card: "#FFFFFF"
  # Violet ambient
  violet-ambient: "rgba(139,123,255,0.06)"

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
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
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
  kpi-value:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: 0
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: 1.5px
  mono-body:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0.06em
  eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: 2.2px
  logo:
    fontFamily: Michroma
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.20
    letterSpacing: 0.06em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 8px
  md: 10px
  lg: 14px
  xl: 16px
  xxl: 20px
  shell: 28px
  pill: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 10px
  md: 14px
  lg: 16px
  xl: 20px
  xxl: 24px
  section: 32px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-primary-hover:
    backgroundColor: "{colors.primary-2}"
    textColor: "{colors.text-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-0}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-sm:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 5px 10px
  pill:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-1}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
  pill-hot:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
  pill-ok:
    backgroundColor: "{colors.card}"
    textColor: "{colors.green}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
  pill-warn:
    backgroundColor: "{colors.card}"
    textColor: "{colors.amber}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
  pill-crit:
    backgroundColor: "{colors.card}"
    textColor: "{colors.red}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
  focus-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 16px
  briefing-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 16px
  hero-kpi:
    backgroundColor: "{colors.bg-0}"
    textColor: "{colors.text-0}"
    typography: "{typography.kpi-value}"
    rounded: "{rounded.lg}"
    padding: 20px
  kpi-compact:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.kpi-value}"
    rounded: "{rounded.lg}"
    padding: 16px
  alert-card-ok:
    backgroundColor: "{colors.ok-tint}"
    textColor: "{colors.green}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  alert-card-warn:
    backgroundColor: "{colors.warn-tint}"
    textColor: "{colors.amber}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  alert-card-crit:
    backgroundColor: "{colors.crit-tint}"
    textColor: "{colors.red}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  topbar:
    backgroundColor: "{colors.bg-1}"
    textColor: "{colors.text-0}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    height: 56px
  agent-drawer:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.text-0}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: 24px
  text-input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-0}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  suggestion-chip:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.text-1}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: 7px 12px
---

## Overview

AI Navigator reads like a live ops console that has been given a sci-fi skin. The home canvas (`{colors.bg-0}` `#05060A`) is deeper than near-black — it carries a faint blue-violet cast. A fixed ambient radial gradient on `body::before` breathes life into the otherwise flat dark: electric lime bleeds from the top-left corner at 6% opacity, and a soft violet mirrors it from the bottom-right. All page content sits above this layer at `z-index: 1`.

The single chromatic accent is **electric lime** (`{colors.primary}` `#D4FF00`). It appears as button fills, active nav borders, pill glows, KPI highlights, focus rings, and the crawling conic border that appears on `.briefing-card` hover. On the light-cosmic theme it shifts to dark olive (`#7FB000`) so it remains legible on white backgrounds. Two additional themes (`cnx-light` and `cnx-dark`) remap `--cnx-lime` to Concentrix's brand colors — the component classes remain unchanged, only the token value swaps.

Typography splits between two families: **Inter** for all prose, headings, and button labels; **JetBrains Mono** for every KPI value, data label, eyebrow cap, status pill, and timestamp. Michroma appears exclusively on the logo and intro display — never in product UI. The rule is precise: anything a human reads in prose gets Inter; anything system or metadata gets JetBrains Mono.

**Key Characteristics:**
- Deep cosmic canvas (`{colors.bg-0}` `#05060A`) with a fixed ambient lime × violet radial gradient overlay — the background is never truly static.
- Electric lime as the only chromatic accent — used scarcely on fills, borders, and glows; it dominates by contrast against the dark, not by frequency.
- JetBrains Mono as the data voice — all KPI values run at 22px / weight 500; all labels run at 10px uppercase / 1.5px tracking.
- Glassmorphic agent panels: `backdrop-filter: blur(12px)` + near-transparent fill over the ambient gradient.
- `.briefing-card` conic-gradient hover border — a `@property`-animated crawling lime ring that appears only on hover. A signature motion moment.
- Four-theme system in one CSS file — dark-cosmic (default), light-cosmic, cnx-light, cnx-dark. Lime remaps per-theme; all component classes are theme-agnostic.
- WCAG 2.1 AA across all themes — `{colors.text-2}` was bumped from `#6E7689` → `#8A92A6` on 2026-04-18 after a contrast audit; focus rings ≥ 3:1 on every surface.

## Colors

> **Source:** `E:\Work\AINavigatorProject\ai-navigator\app\globals.css` — extracted April 22, 2026. Four theme blocks: `:root` (dark-cosmic), `[data-theme="light-cosmic"]`, `[data-theme="cnx-light"]`, `[data-theme="cnx-dark"]`.

### Brand & Accent

- **Electric Lime** (`{colors.primary}` — `#D4FF00`): The system's single chromatic accent. Used as the fill for `.btn.primary`, the hot state of `.pill.hot`, the border on active nav items, the conic hover ring on `.briefing-card`, the scrollbar hover, and all focus rings. At 35% opacity it becomes `{colors.primary-glow}` — the glow shadow applied to every accent element.
- **Lime Lift** (`{colors.primary-2}` — `#E4FF4D`): The hover state of `.btn.primary`. Also appears in the conic briefing-card gradient arc.
- **Lime Soft** (`{colors.primary-soft}` — `rgba(212,255,0,0.15)`): Background tint for `.pill.hot` and active nav chips. Also used for the active state of `.tweak-segment-btn`.
- **Lime Glow** (`{colors.primary-glow}` — `rgba(212,255,0,0.35)`): The standard `box-shadow` accent for `.btn.primary`, `.pill.hot`, `.hero-kpi` values, `.briefing-card` hover shadow, and the Record Session pulse animation.
- **Violet Ambient** (`{colors.violet-ambient}` — `rgba(139,123,255,0.06)`): The body ambient bottom-right radial gradient. Never used as a fill or border — ambient only.

### Surface

- **Page Canvas** (`{colors.bg-0}` — `#05060A`): The deepest surface. Page background, scrollbar track, `.hero-kpi` well floor.
- **Topbar / Sidebar** (`{colors.bg-1}` — `#0A0C14`): One step above canvas — topbar background, sidebar panels.
- **Shell** (`{colors.shell}` — `#0E1120`): Agent drawer backgrounds and the page layout shell.
- **Card** (`{colors.card}` — `#141728`): Default card background — `.focus-card`, `.pill`, `.btn` default.
- **Card Hi** (`{colors.card-hi}` — `#1A1E34`): Hover and elevated card state — `.btn:hover`, scrollbar thumb.
- **Border Calm** (`{colors.border}` — `rgba(255,255,255,0.06)`): Default hairline border on all cards, buttons, and inputs.
- **Border Hot** (`{colors.border-hot}` — `rgba(212,255,0,0.3)`): Lime-accent border — applied to `.pill.hot`, focused inputs, and the `.tweak-pane-tab` open state.

### Text

- **Primary** (`{colors.text-0}` — `#F4F6FB`): All main body copy, headings, and active states.
- **Secondary** (`{colors.text-1}` — `#B6BCCC`): Card sublines, secondary labels, table cells.
- **Muted** (`{colors.text-2}` — `#8A92A6`): Eyebrow caps, timestamps, placeholder text. WCAG AA on `{colors.bg-0}` (bumped from `#6E7689` after April 18, 2026 audit).
- **On-Lime** (`{colors.text-dark}` — `#0A0C14`): Text rendered on `{colors.primary}` fills — `.btn.primary` labels and any primary action with a lime background.

### Status

- **Critical** (`{colors.red}` — `#FF4D5E`): `.pill.crit`, `.alert-card-crit`, status dots — critical KPI alerts.
- **Warning** (`{colors.amber}` — `#FFB020`): `.pill.warn`, `.alert-card-warn`, markdown `**strong**` in assistant bubbles.
- **OK** (`{colors.green}` — `#38E1A1`): `.pill.ok`, `.alert-card-ok`, status dots — healthy state.
- **Info** (`{colors.info}` — `#4FC3F7`): Parked session banners, progress states. `--md-em-color` in dark-cosmic — italic spans in assistant chat render in this cyan tint.

## Typography

### Font Families

- **Inter** — Body, headings, button labels, navigation. Google Font. The primary human-readable voice. All prose, all CTA labels, all card titles.
- **JetBrains Mono** — KPI values, data labels, pill text, timestamps, eyebrow caps, table headers, code snippets. Google Font. The system / data voice. Used exclusively in non-prose contexts.
- **Michroma** — Logo mark and intro display title only. Use sparingly — it signals brand entry, never repeated in UI.

**The rule:** Anything a human reads in continuous prose → Inter. Anything system, metadata, or numeric → JetBrains Mono.

### Hierarchy

| Token | Size | Weight | Family | Tracking | Use |
|---|---|---|---|---|---|
| `{typography.page-head}` | 28px | 600 | Inter | -0.02em | Page greeting / section opener |
| `{typography.section-title}` | 20px | 600 | Inter | -0.01em | Focus-card header, drawer title |
| `{typography.card-title}` | 15px | 600 | Inter | 0 | Card titles, agent panel heads |
| `{typography.body}` | 14px | 400 | Inter | 0 | Default body, chat prose |
| `{typography.body-sm}` | 13px | 400 | Inter | 0 | Secondary card body, sublines |
| `{typography.button}` | 13px | 500 | Inter | 0 | All button labels |
| `{typography.kpi-value}` | 22px | 500 | JetBrains Mono | 0 | The primary KPI number inside `.hero-kpi` / `.kpi-compact` |
| `{typography.mono-label}` | 10px | 500 | JetBrains Mono | 1.5px | All pill text, compact KPI labels, uppercase eyebrows |
| `{typography.mono-body}` | 11px | 400 | JetBrains Mono | 0.06em | Subline metadata, timestamps, table header cells |
| `{typography.eyebrow}` | 11px | 700 | JetBrains Mono | 2.2px | Section eyebrows — uppercase, all-caps, lime color |
| `{typography.logo}` | 16px | 400 | Michroma | 0.06em | Logo mark — intro / brand display only |
| `{typography.code-inline}` | 12px | 400 | JetBrains Mono | 0 | Inline code in `.md-body code` — lime text on subtle bg |

### Principles

- Negative tracking on Inter headings (`-0.02em` at 28px) gives the display copy its dense, console-like feel.
- Positive tracking on JetBrains Mono labels (`1.5px` at 10px) gives KPI labels their legible, authoritative cadence.
- **Never** use JetBrains Mono for continuous prose — only for values, labels, pills, and metadata.
- **Never** use Michroma in product UI. It belongs on the intro screen and the logo mark.
- Markdown chat uses a scoped `.md-body` class: `**bold**` renders in amber (`{colors.amber}`), `*italic*` renders in info-cyan (`{colors.info}`) with a faint bg tint — these choices are intentional and theme-aware via CSS variables.

## Layout

### Spacing System

- **Base unit**: 4px.
- **Density tokens** (`--density-*`): `--density-pad: 16px` (card interior), `--density-gap: 16px` (layout gap between components), `--density-kpi-pad: 20px` (KPI tile interior).
- **Card padding**: `{spacing.lg}` 16px standard; `{spacing.xxl}` 24px on agent drawers.
- **Button padding**: 8px vertical × 14px horizontal (default); 5px × 10px (`.btn.sm`).
- **Pill padding**: 5px vertical × 12px horizontal.

### Grid & Container

- Topbar height: 56px.
- Agent drawer width: 520px (slide-in from right edge).
- Sidebar defaults to collapsed; expanded width ~220px.
- KPI rail: 4-column grid at desktop, 2-column at tablet.
- Morning Brief: `grid-template-columns: minmax(0, 1.55fr) minmax(260px, 1fr)` — main prose + right action rail. Collapses to single column below 880px.

### Whitespace Philosophy

The deep canvas IS the whitespace. Sections breathe via the `{spacing.section}` 32px gap between stacked panels, not via large padding blocks. Within a card, `{spacing.lg}` 16px separation. The ambient gradient prevents the page from feeling "empty" even in sparse areas.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (ambient) | Fixed `body::before` radial gradient — lime 6% top-left, violet 6% bottom-right | Always present behind all content |
| 1 (card) | `{colors.card}` fill + 1px `{colors.border}` + `box-shadow: 0 8px 22px rgba(0,0,0,0.16)` | `.focus-card`, default panels |
| 2 (glassmorphic) | `backdrop-filter: blur(12px)` + `rgba(255,255,255,0.02)` fill + 1px `{colors.border}` | Agent chat panels, context panes |
| 3 (elevated hover) | `box-shadow: 0 18px 40px -20px rgba(0,0,0,0.55)` + lime outer glow | `.briefing-card:hover` |
| 4 (lime accent) | `box-shadow: 0 0 24px {colors.primary-glow}` | `.btn.primary`, `.pill.hot`, `.hero-kpi` active |
| 5 (focus ring) | `outline: 2px solid {colors.primary}` (dark) / `2px solid #7FB000` (light) via `:focus-visible` | All interactive elements — keyboard only |

### Decorative Depth
- **Briefing card conic ring** — `@property --briefing-angle` animates a crawling lime arc (conic-gradient from 270°–300°) around `.briefing-card` on hover. The arc is masked to a 1.5px ring via CSS mask-composite. Collapses to static on `prefers-reduced-motion`.
- **Record Session pulse** — When the mic is armed, a `@keyframes` loop alternates between a 0px and 18px lime halo box-shadow at 1.2s intervals.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Code inline chips, micro badges |
| `{rounded.sm}` | 8px | Inset sections, compact elements |
| `{rounded.md}` | 10px | Buttons, text inputs, action rows, theme chips |
| `{rounded.lg}` | 14px | All cards (`.focus-card`, `.briefing-card`, `.kpi-compact`), drawers |
| `{rounded.xl}` | 16px | Modals, large panels |
| `{rounded.xxl}` | 20px | Oversized containers |
| `{rounded.shell}` | 28px | App shell chrome |
| `{rounded.pill}` | 9999px | All `.pill` variants, `.suggestion-chip`, `.brief-action-chip`, scrollbar thumb |

## Components

### Buttons

**`button-primary`** — Electric lime CTA. The highest-hierarchy action on any surface.
- Background `{colors.primary}`, text `{colors.text-dark}`, rounded `{rounded.md}`, padding 8px 14px.
- `box-shadow: 0 0 24px {colors.primary-glow}` — lime halo always present.
- Hover lifts to `{colors.primary-2}` `#E4FF4D`.
- Font weight 600 (one step above the standard `{typography.button}` 500).

**`button-default`** — Secondary action. Card-surface button.
- Background `{colors.card}`, text `{colors.text-0}`, 1px `{colors.border}`, rounded `{rounded.md}`.
- Hover lifts background to `{colors.card-hi}`, border to `rgba(255,255,255,0.1)`.

**`button-ghost`** — Tertiary action. Transparent.
- Background transparent, text `{colors.text-0}`, 1px `{colors.border}`, rounded `{rounded.md}`.

**`button-sm`** — Compact variant. Same structure as `button-default`, padding 5px 10px, font-size 12px.

### Pills

**`pill`** — The system's status / label chip. JetBrains Mono uppercase at 10px / 1.5px tracking.
- Background `{colors.card}`, text `{colors.text-1}`, 1px `{colors.border}`, rounded `{rounded.pill}`, padding 5px 12px.

**`pill-hot`** — Active / lime-accented state.
- Background `{colors.primary-soft}`, text `{colors.primary}`, border `{colors.border-hot}`, `box-shadow: 0 0 24px {colors.primary-glow}`.

**`pill-ok` / `pill-warn` / `pill-crit`** — Status variants. Same structure as `pill` base; text color becomes `{colors.green}` / `{colors.amber}` / `{colors.red}` respectively.

**Status dots** — 8px circles companion to pills. `.status-dot.crit` adds `box-shadow: 0 0 8px rgba(255,77,94,0.6)` — the only non-lime glow in the system.

### Cards

**`focus-card`** — The default content card.
- Background `{colors.card}`, 1px `{colors.border}`, rounded `{rounded.lg}`, padding 16px. `box-shadow: 0 8px 22px rgba(0,0,0,0.16)`.

**`briefing-card`** — The hero action card with crawling lime border on hover.
- Same base as `focus-card`. On hover: elevates 1px, gains a `0 0 32px {colors.primary-glow}` outer glow, and the `::before` pseudo-element conic-gradient ring animates to life. The ring crawls at 3.6s per revolution. On `prefers-reduced-motion: reduce`, animation is suppressed and the transform is removed.

**`focus-card-head`** — The card header sub-component. JetBrains Mono uppercase label at 10px / 1.5px tracking + a 2px `{colors.primary}` left border accent.

### KPI Components

**`hero-kpi`** — The flagship KPI tile. Sunken inset well.
- Background `{colors.bg-0}` (one step deeper than the card surface), dual inset shadows for depth. KPI value at `{typography.kpi-value}` (22px JetBrains Mono / 500). Label in `{typography.mono-label}` below. Active/highlight state adds `{colors.primary}` text + `{colors.primary-glow}` shadow on the value.

**`kpi-compact`** — Compact KPI card in the 4-column rail.
- Background `{colors.card}`, rounded `{rounded.lg}`, padding 16px. Label in mono-label style, value in kpi-value, delta via `.pill` variant.

**`kpi-rail`** — 4-column grid container for `kpi-compact` tiles. The fundamental data-scanning surface of the agent hub.

### Alert Cards

**`alert-card-ok` / `alert-card-warn` / `alert-card-crit`** — Tinted insight rows. 
- Each carries a semantic tint fill (`{colors.ok-tint}` / `{colors.warn-tint}` / `{colors.crit-tint}`), a 2px left border in the matching status color, and text in the status color. Rounded `{rounded.lg}`, padding 16px.

### Navigation

**`topbar`** — Sticky 56px bar. Background `{colors.bg-1}`, 1px `{colors.border}` bottom edge. Logo left (Michroma), agent nav center, user controls right. The topbar background stays `{colors.bg-1}` in all four themes — it's the one surface that never flips to white, even in `cnx-light`.

**`agent-drawer`** — 520px slide-in panel from the right. Background `{colors.shell}`, rounded `{rounded.xl}` on the left edge, `backdrop-filter: blur(12px)`. Houses agent context pane or expanded detail.

### Inputs

**`text-input`** — Background `{colors.card}`, text `{colors.text-0}`, rounded `{rounded.md}`, padding 8px 12px, 1px `{colors.border}`. On focus: border lifts to `{colors.border-hot}`, focus-visible ring applies 2px `{colors.primary}` outline.

**`suggestion-chip`** — Pill-rounded inline chip for agent query suggestions.
- Background `rgba(255,255,255,0.04)`, text `{colors.text-1}`, 1px `{colors.border}`, rounded `{rounded.pill}`, padding 7px 12px. Hover: border `{colors.border-hot}`, text `{colors.text-0}`.

### Markdown Chat (`.md-body`)

Scoped to agent assistant bubbles. Key overrides:
- `**strong**` → color `{colors.amber}` — draws the reader's eye to key data.
- `*em*` → color `{colors.info}` + `{colors.info-bg}` tint + 3px radius — signals "this is what you say" script / dialogue.
- `code` → JetBrains Mono 12px + `{colors.primary}` text + subtle bg chip.
- `blockquote` → 2px `{colors.primary}` left border.
- All colors are CSS variables so they flip correctly on the light-cosmic theme without extra overrides.

## Themes

| Theme | `data-theme` value | Lime token | Use case |
|---|---|---|---|
| Dark Cosmic | `:root` (default) | `#D4FF00` | Default — AI Navigator brand identity |
| Light Cosmic | `light-cosmic` | `#7FB000` (olive) | Light-preference users; same component classes |
| CNX Light | `cnx-light` | `#003D5B` (Concentrix navy) | Concentrix corporate surface |
| CNX Dark | `cnx-dark` | `#25E2CC` (Concentrix teal) | Concentrix dark corporate surface |

Theme is toggled via `localStorage` + `data-theme` attribute on `<html>`. A no-flash blocking script in `<head>` reads localStorage and sets the attribute before first paint — no theme flash on page load.

## Accessibility

- All `{colors.text-*}` tokens meet WCAG 2.1 AA on their intended backgrounds (audit: 2026-04-18). `{colors.text-2}` was the failing token — bumped from `#6E7689` to `#8A92A6`.
- Focus rings: 2px solid `{colors.primary}` on dark-cosmic, 2px solid `#7FB000` on light-cosmic — both ≥ 3:1 contrast. Applied via `:focus-visible` only (keyboard-only, no mouse ring noise).
- `.skip-to-content` renders as a visible lime pill when keyboard-tabbed — WCAG 2.4.1.
- All icon-only buttons carry `aria-label`.
- `prefers-reduced-motion: reduce` collapses all `@keyframes` to 0.01ms — final visual state applies, motion is removed.

## Do's and Don'ts

### Do

- Use `{colors.primary}` `#D4FF00` for fills — buttons, active borders, glows. Reserve it as the strongest signal on the page.
- Use `{colors.primary-soft}` for background tints (chips, active nav, segment buttons) — never use the raw `#D4FF00` as a background on text-bearing elements in light theme.
- Use JetBrains Mono for every number, label, timestamp, and pill — Inter is for prose only.
- Apply `{colors.primary-glow}` `box-shadow` to every element that carries a lime fill — the glow is half the visual identity.
- Let the ambient `body::before` gradient do the work in empty sections — don't add atmospheric fills to individual cards.
- Remap `--cnx-lime` per-theme; never hardcode `#D4FF00` inside component CSS.

### Don't

- Don't use `#D4FF00` as a text color on light backgrounds — it fails contrast. Use the olive override `#7FB000` on light-cosmic.
- Don't introduce a second chromatic accent (pink, orange, purple) in product UI. The violet is ambient-only at 6% opacity.
- Don't use Michroma for any UI text — logo and intro only.
- Don't add drop shadows on dark cards beyond the standard `0 8px 22px rgba(0,0,0,0.16)` — depth is carried by surface color steps.
- Don't pill-round cards — `{rounded.lg}` 14px is the card shape. Pills are for chips and tags only.
- Don't hardcode a theme color that belongs in `--cnx-lime` — all four themes share component classes; the token does the work.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop | 1280px+ | Full layout — sidebar expanded optional, 4-col KPI rail |
| Tablet | 1024px | Sidebar collapses to icon rail; KPI rail 2-col |
| Mobile-Lg | 880px | Morning Brief collapses to single column; topbar nav condensed |
| Mobile | 768px | Agent drawer goes full-screen; filter FAB moves to bottom edge |

### Touch Targets

- All `.btn` and `.btn.sm` hold ≥ 40px tap height on touch viewports.
- `.pill` chips hold ≥ 36px tap height when interactive.
- Text inputs hold ≥ 44px tap target on touch.

## Known Gaps

- Component spacing tokens are inferred from computed CSS; no explicit design token file exists separate from `globals.css`.
- The filter FAB and filter drawer are not documented here — their token usage is consistent with the card spec above.
- Agent-specific accent overrides (e.g. COACH, PENN, ATLAS using `--agent-accent`) are not covered — these remap `--cnx-lime` equivalents per agent but follow the same glow + fill pattern.
- Print / PDF translation maps lime → navy `#1F3864`, glassmorphic cards → white, JetBrains Mono → Helvetica Bold.
