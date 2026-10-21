---
version: alpha
name: Vera-hub-cnx-design-analysis
description: "Vera Hub CNX is Vera Hub with Concentrix colours: the same premium console structure (28px shell frame on an ambient dual glow, raised cards on sunken wells, radius ladder 10/12/14/18/28/999, hairlines, one glowing accent) re-coloured from the vera-bold palette, set in Concentrix type since 2026-10-21: Montserrat for titles, headings, numbers (tabular) and labels, Pulse Sans (the machine's own Calibri, else Carlito, at one fixed size-adjust) for reading text, Michroma kept only for the hollow outlined numerals. CNX Dark: night #060D18 canvas, #0D1829 cards, teal #25E2CC accent. CNX Light: #F2F5F8 canvas, white cards, navy #003D5B accent. Gold #FBCA18 is the single primary action per view (plus an optional headline KPI); one navy #003D5B panel per view carries the summary or decision. Status is green / orange / red with per-theme inks, all text pairs WCAG AA. Ships theme-cnx.css, a drop-in token layer (colour and font tokens) whose names map 1:1 onto Vera AI and AutoAlchemy Hub tokens, and a kit/ plan-page template that inlines Montserrat + Carlito as Pulse Sans (SIL OFL, kit/fonts) and Michroma. Worked example: the Cluster Cherry plan page, 2026-10-16."

colors:
  # Brand (both themes)
  navy: "#003d5b"
  teal: "#25e2cc"
  gold: "#fbca18"
  on-gold: "#0d1a24"
  # CNX Dark
  canvas: "#060d18"
  bar: "#0a1424"
  shell: "#0b1626"
  card: "#0d1829"
  card-2: "#122136"
  card-hi: "#15273e"
  text-0: "#f2f6fa"
  text-1: "#bac7d4"
  text-2: "#a1afbf"
  text-3: "#8799ad"
  primary: "#25e2cc"
  primary-2: "#7dede0"
  on-primary: "#022320"
  primary-soft: "rgba(37,226,204,.12)"
  primary-glow: "rgba(37,226,204,.30)"
  border: "rgba(190,215,235,.11)"
  line-2: "rgba(190,215,235,.07)"
  border-hot: "rgba(37,226,204,.42)"
  well-line: "rgba(0,0,0,.42)"
  ok: "#4cd98a"
  warn: "#ff9f5a"
  crit: "#ff6f6f"
  info: "#9cc3dd"
  ok-fill: "rgba(76,217,138,.25)"
  warn-fill: "rgba(255,159,90,.40)"
  crit-fill: "rgba(255,111,111,.45)"
  info-bg: "rgba(156,195,221,.09)"
  info-border: "rgba(156,195,221,.36)"
  gold-glow: "rgba(251,202,24,.38)"
  brand-tile: "#003d5b"
  # CNX Light
  light-canvas: "#f2f5f8"
  light-bar: "#ffffff"
  light-shell: "#f8fafc"
  light-card: "#ffffff"
  light-card-2: "#f5f7fa"
  light-card-hi: "#eef2f6"
  light-text-0: "#07192a"
  light-text-1: "#34495d"
  light-text-2: "#45586b"
  light-text-3: "#566779"
  light-primary: "#003d5b"
  light-primary-2: "#0b5a82"
  light-on-primary: "#ffffff"
  light-primary-soft: "rgba(0,61,91,.07)"
  light-primary-glow: "rgba(0,61,91,.16)"
  light-border: "rgba(0,40,70,.12)"
  light-line-2: "rgba(0,40,70,.07)"
  light-border-hot: "rgba(0,61,91,.35)"
  light-well-line: "rgba(0,40,70,.14)"
  light-ok: "#11743a"
  light-warn: "#a34e00"
  light-crit: "#c0262d"
  light-info: "#2f5d7c"
  light-gold-glow: "rgba(251,202,24,.45)"
  # Navy panel scope (both themes)
  panel: "#003d5b"
  panel-text-0: "#f2f6fa"
  panel-text-1: "#cad6e1"
  panel-text-2: "#b8c6d3"
  panel-accent: "#25e2cc"
  panel-ok: "#5fe39a"
  panel-warn: "#ffbc80"
  panel-crit: "#ffadad"

typography:
  # Revised 2026-10-21 (Concentrix asked for Montserrat / Helvetica / Calibri). Stacks, roles and rules: § Typography.
  # Montserrat = "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif (theme-cnx.css --font-display / -num / -label)
  # Pulse Sans = "Pulse Sans", "Helvetica Neue", Helvetica, Arial, sans-serif (--font-sans). Pulse Sans is one @font-face
  #              family: local Calibri, else Carlito, fixed size-adjust 111% / 109.5% (§ Typography). Same name Vera AI
  #              Pulse uses. No font-size-adjust anywhere.
  # Michroma   = hollow outlined numerals only (--font-hollow, see below); ui-monospace = code only (--font-code, system)
  page-title:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.015em
  page-head:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.015em
  section-title:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.015em
  card-title:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: -0.015em
  body:
    fontFamily: Pulse Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.60
    letterSpacing: 0
  body-sm:
    fontFamily: Pulse Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  button:
    fontFamily: Montserrat
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: 0
  eyebrow:
    fontFamily: Montserrat
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0.06em
  label:
    fontFamily: Montserrat
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0.06em
  kpi-value:
    fontFamily: Montserrat
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.00
    letterSpacing: 0
  table-head:
    fontFamily: Montserrat
    fontSize: 10.5px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0.06em
  data:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0
  brand:
    fontFamily: Montserrat
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.10
    letterSpacing: -0.015em
  # The hollow numeral (Michroma 400, 56px / 0.9, outline only: --font-hollow) is deliberately not a token here:
  # registry tools take the largest fontSize as the display face, and Michroma is not this system's display face.
  code:
    fontFamily: ui-monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
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
  cta-h: 44px
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
    backgroundColor: "{colors.card-hi}"
    textColor: "{colors.text-0}"
    typography: "{typography.kpi-value}"
    rounded: "{rounded.sub}"
    padding: 16px
    border: "1px solid {colors.border}"
    shadow: "0 6px 16px rgba(0,0,0,.40)"
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.button}"
    rounded: "{rounded.ctl}"
    padding: 0 18px
    shadow: "0 0 24px {colors.gold-glow}"
  button-accent:
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
  navy-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.panel-text-0}"
    typography: "{typography.body}"
    rounded: "{rounded.hero}"
    padding: 28px
    border: "1px solid rgba(255,255,255,.14)"
---

## Overview

**Vera Hub CNX** (registry `vera-hub-cnx`; say "Vera Hub with Concentrix colours", "Vera Hub CNX" or "the
Cherry look") is [Vera Hub](../vera-hub/DESIGN.md) re-coloured in the Concentrix palette and, since 2026-10-21,
set in Concentrix type. Everything structural is Vera Hub's and stays Vera Hub's: the shell frame on an ambient glow,
the 72px bar and 240px rail, raised cards on sunken wells, the KPI well, hairline borders, the radius ladder, the
elevation scale, the type roles and scale, the reveal-once motion and the optional signature layer. Colour and the
typefaces change, both by **role** (colour tokens, `--font-*` tokens), so any component written against the tokens
reskins without touching its CSS.

**Typography revised 2026-10-21.** Concentrix stakeholders (a VP and team, on the Vera AI Pulse dashboard) found
Vera Hub's faces "futuristic" and asked for Montserrat / Helvetica / Calibri. The owner chose: Montserrat for
display, headings, KPI numbers and labels; Pulse Sans (the machine's Calibri, else Carlito) for reading text; Michroma
kept only for the hollow outlined numerals; JetBrains Mono and Inter retired. The reading face is scaled by a fixed
`size-adjust` on its `@font-face`, not by `font-size-adjust` (changed after the Pulse PR #36 review). § Typography has
the details.

Two palettes: **CNX Dark** (`data-theme="cnx-dark"`, night canvas, teal accent) and **CNX Light**
(`data-theme="cnx-light"`, white and paper, navy accent). The colours come from the
[`vera-bold`](../vera-bold/DESIGN.md) Colors section only (brand, theme inks, block-scope ink rules, measured
contrast). Nothing else of Vera Bold comes along: no Anton or Barlow, no brush marks, no photo heroes, no
pill-everything.

**Worked example:** the Cluster Cherry plan page built 2026-10-16
(`ai-navigator/docs/reviews/_build/cherry-bold/page-hub.src.html` + `build_cherry_hub.py`, output
`docs/reviews/2026-10-16-cherry-bold-plan.html`). This entry generalises its token values; two were adjusted
here (see the notes under Colors).

**Ships with**
- `theme-cnx.css`: the drop-in token layer for web apps (§ Web apps).
- `kit/`: a stand-alone plan-page template with neutral sample content (§ Pages).

**When to use which**

| Ask | Entry |
|---|---|
| Default for every HTML deliverable and for Vera AI / Hub screens | [`vera-hub`](../vera-hub/DESIGN.md) (navy + ice blue) |
| "Vera Hub with Concentrix colours", Concentrix-facing plan pages, a Vera app in the Concentrix palette | **`vera-hub-cnx`** |
| "Vera Bold", "the OVAI look", campaign energy: Anton caps, brushes, photography | [`vera-bold`](../vera-bold/DESIGN.md) |
| "Transmutation", leadership plan pages with the transmutation-circle hero and 3D renders | [`vera-transmutation`](../vera-transmutation/DESIGN.md) |

**Key characteristics**
- CNX Dark: canvas `#060D18`, bar `#0A1424`, card `#0D1829`, card hover `#15273E`, ink
  `#F2F6FA / #BAC7D4 / #A1AFBF / #8799AD`, accent teal `#25E2CC` (hover `#7DEDE0`), on-accent `#022320`.
- CNX Light: canvas `#F2F5F8`, bar and card `#FFFFFF`, card hover `#EEF2F6`, ink
  `#07192A / #34495D / #45586B / #566779`, accent navy `#003D5B` (hover `#0B5A82`), on-accent white.
- **Gold `#FBCA18` is spent once per view**: the single primary action, plus optionally the headline KPI.
- **One navy panel per view** (`data-surface="navy"`) for the summary or the decision; it looks the same in both
  themes and re-scopes its own ink, accent and status.
- Status is green / orange / red with an ink per theme (a deliberate break from Vera Hub's "OK is the accent": a
  teal OK would merge with the teal accent, and a navy OK reads as plain ink in light).
- **Type:** Montserrat (titles, headings, numbers, labels) + Pulse Sans = Calibri, else Carlito (reading text); Michroma only in the
  hollow numerals. Not Vera Hub's Inter + JetBrains Mono + Michroma.
- Radius ladder, elevation, type scale and motion: exactly Vera Hub's.

## Colors

### The mapping rule from Vera Hub

| Vera Hub role | Vera Hub value | CNX Dark | CNX Light |
|---|---|---|---|
| accent (`--cnx-lime`, legacy name) | ice blue `#7FD4FF` / `#1878AE` | **teal `#25E2CC`** | **navy `#003D5B`** |
| primary action | accent gradient | **gold `#FBCA18`**, once per view | **gold `#FBCA18`**, once per view |
| inverse / selected panel (`--sh-sel`) | steel `#B4CDDB` / `#2A4E66` | **navy panel** `#003D5B` | **navy panel** `#003D5B` |
| OK | the accent | green `#4CD98A` | green `#11743A` |
| warn | amber `#E8B54D` / `#A8761A` | orange `#FF9F5A` | `#A34E00` |
| crit | `#E8434A` / `#C4333B` | `#FF6F6F` | `#C0262D` |
| canvas / card | `#010D16` / `#04141F` | night `#060D18` / `#0D1829` | `#F2F5F8` / `#FFFFFF` |

### Brand (both themes)

| Token | Value | Use |
|---|---|---|
| `--navy` | `#003D5B` | the navy panel, light-theme accent, the brand tile |
| `--teal` | `#25E2CC` | dark-theme accent, accent inside the navy panel, the brand mark's bars |
| `--gold` | `#FBCA18` | the one primary action per view; the lead KPI's base bar (and its value, in dark) |
| `--on-gold` | `#0D1A24` | text on gold (11.4:1) |

### Theme tokens

Names are the ones Vera AI and the AutoAlchemy Hub already read (§ Web apps lists the aliases).

| Role | CNX Dark | CNX Light | Use |
|---|---|---|---|
| `--bg-0` canvas | `#060D18` | `#F2F5F8` | page, sunken wells |
| `--bg-1` bar | `#0A1424` | `#FFFFFF` | top bar, rail, sticky table head |
| `--shell` | `#0B1626` | `#F8FAFC` | the shell frame, drawers |
| `--card` | `#0D1829` | `#FFFFFF` | cards, chips, default buttons |
| `--card-2` | `#122136` | `#F5F7FA` | dialogs, a second card tone |
| `--card-hi` | `#15273E` | `#EEF2F6` | hover rows, table head, ghost hover |
| `--text-0` | `#F2F6FA` | `#07192A` | headings, values |
| `--text-1` | `#BAC7D4` | `#34495D` | body, table cells |
| `--text-2` | `#A1AFBF` | `#45586B` | eyebrows, labels, timestamps |
| `--text-3` | `#8799AD` | `#566779` | faint: axis, placeholders, table heads |
| `--accent` (`--cnx-lime`) | `#25E2CC` | `#003D5B` | primary signal: active, focus, links |
| `--accent-2` | `#7DEDE0` | `#0B5A82` | hover, gradient top stop |
| `--accent-ink` | `#25E2CC` | `#003D5B` | the accent used as text |
| `--on-accent` (`--text-dark`) | `#022320` | `#FFFFFF` | text on an accent fill |
| `--accent-soft` | `rgba(37,226,204,.12)` | `rgba(0,61,91,.07)` | active rail item, hot chip fill |
| `--accent-glow` | `rgba(37,226,204,.30)` | `rgba(0,61,91,.16)` | halos |
| `--border` | `rgba(190,215,235,.11)` | `rgba(0,40,70,.12)` | every hairline |
| `--line-2` | `rgba(190,215,235,.07)` | `rgba(0,40,70,.07)` | row dividers |
| `--border-hot` | `rgba(37,226,204,.42)` | `rgba(0,61,91,.35)` | hover / active borders |
| `--well-line` | `rgba(0,0,0,.42)` | `rgba(0,40,70,.14)` | well borders |
| ok / warn / crit | `#4CD98A` / `#FF9F5A` / `#FF6F6F` | `#11743A` / `#A34E00` / `#C0262D` | status text and marks |
| `--<status>-soft` / `-line` | `.12` / `.45` alpha | `.07–.08` / `.40` alpha | chip and banner fill / border |
| `--<status>-fill` | `.25` / `.40` / `.45` alpha | `.26` / `.45` / `.50` alpha | heatmap cells, strong tints |
| `--info-color` / `-bg` / `-border` | `#9CC3DD` / `.09` / `.36` | `#2F5D7C` / `.07` / `.30` | neutral banners, info chips |
| `--gold-ink` | `#FBCA18` | `#07192A` (ink) | gold as text: lead KPI value; never on white |
| `--gold-line` | transparent | `rgba(13,26,36,.22)` | edge on the gold fill (its edge on white is 1.5:1) |
| `--brand-tile` / `--brand-mark` | `#003D5B` / `#25E2CC` | same | the brand tile and its bars |

### The navy panel (`data-surface="navy"`)

One per view, for the summary or the decision. It is navy in **both** themes, painted with `--sh-navy`, and it
re-scopes the tokens inside it so any component works unchanged. "Worst case" is a 6 % glass tile under the
centre of the panel's teal glow on its lightest stop (`#11566F` composite); nothing in the panel sits on a lighter
ground.

| Token inside the panel | Value | On navy `#003D5B` / worst case |
|---|---|---|
| `--text-0 / -1 / -2` | `#F2F6FA / #CAD6E1 / #B8C6D3` | 10.6 / 7.8 / 6.6 · 7.5 / 5.5 / 4.7 |
| `--accent` | teal `#25E2CC` | 7.1 · 5.0 |
| ok / warn / crit / info | `#5FE39A / #FFBC80 / #FFADAD / #B6D4E8` | 7.1 / 7.0 / 6.5 / 7.5 · 5.0 / 4.9 / 4.6 / 5.3 |
| `--gold-ink`, gold fill edge | `#FBCA18` | 7.5 · 5.3 |
| `--card` / `--sh-tile` | white at 6 % / 6 → 4 % | glass tiles |
| status `-soft` fills | transparent | status is outline-only on navy |

**Adjusted from the reference page:** the Cherry page kept Vera Bold's statuses inside navy; its crit `#FF6F6F`
measures 4.26 on `#003D5B` and 3.7 on a glass tile (fails AA), and its text-2 `#A9B9C8` drops to 4.0 under the
glow. This entry softens the panel's glow (.12 → .06) and top stop (`#00476A` → `#00425F`), lifts the navy inks
above, and drops the status soft fills. Light `--text-2` is split to `#45586B` (the reference used `#566779` for
both text-2 and text-3) so the four-step ink ladder stays four steps.

## Contrast (measured)

WCAG 2.x ratios, alpha fills composited on their ground. Every text pair clears AA (4.5:1).

| Pair | CNX Dark | CNX Light |
|---|---|---|
| text-0 on canvas / card / card-hi | 17.9 / 16.4 / 13.9 | 16.2 / 17.8 / 15.8 |
| text-1 on canvas / card / card-hi | 11.3 / 10.4 / 8.8 | 8.5 / 9.3 / 8.3 |
| text-2 on canvas / card / card-hi | 8.7 / 8.0 / 6.8 | 6.7 / 7.3 / 6.5 |
| text-3 on canvas / card / card-hi (smallest text) | 6.7 / 6.1 / 5.2 | 5.3 / 5.8 / 5.2 |
| accent on canvas / card / card-hi | 11.9 / 10.9 / 9.2 | 10.6 / 11.6 / 10.3 |
| on-accent on accent | 10.2 | 11.6 |
| accent on accent-soft (active rail item) | 8.9 | 10.2 |
| on-gold on gold | 11.4 | 11.4 |
| gold text on card / card-hi (lead KPI) | 11.5 / 9.8 | not used: gold-ink is ink |
| ok / warn / crit on card | 9.8 / 8.8 / 6.6 | 5.9 / 5.8 / 5.9 |
| ok / warn / crit on card-hi | 8.3 / 7.4 / 5.6 | 5.2 / 5.1 / 5.3 |
| ok / warn / crit on their soft chip fill | 7.8 / 7.2 / 5.6 | 5.2 / 5.1 / 5.3 |
| info on card / card-hi | 9.6 / 8.1 | 7.1 / 6.3 |
| on-ok on the solid ok chip | 9.4 (`#04210F`) | 5.9 (white) |

**Never:** teal text on white (1.6), gold text on white (1.5). In light, the gold fill's edge against white is 1.5:1
too, so the gold button keeps its dark label (11.4) and gets the `--gold-line` hairline; on navy the gold edge is
7.5:1 and needs nothing.

## Gradients ("lit surfaces")

Same recipe as Vera Hub, Concentrix values. Tokens `--sh-*` in `theme-cnx.css`.

| Surface | CNX Dark | CNX Light |
|---|---|---|
| Canvas | radial `1200×700 at 12% -10%` teal `.10` + radial `900×600 at 95% 110%` navy `.55` + `#081120 → #04090F` | radial navy `.10` + radial teal `.16` + `#F2F5F8 → #E8EDF2` |
| Shell | radial `900×420 at 0 0` teal `.05` + `#0B1626 → #08111F` | radial navy `.05` + `#FFFFFF → #F5F7FA` |
| Bar | `#101B2C → #0B1626` | `#FFFFFF → #F8FAFC` |
| Card | `#122136 0%, #0F1C2F 55%, #0D1829 100%` | `#FFFFFF → #F8FAFC` |
| Tile | `#15273E → #122136` | `#FFFFFF → #F5F7FA` |
| Well | `#03070D 0%, #060D18 40%, #08111F 100%` | `#E6ECF1 0%, #EEF2F6 40%, #F2F5F8 100%` |
| Accent (`--sh-accent`) | `#7DEDE0 → #25E2CC` | `#0B5A82 → #003D5B` |
| Gold (`--sh-gold`) | `#FDD84D → #FBCA18` | same |
| Navy panel (`--sh-navy`, also `--sh-sel`) | radial `700×320 at 100% 0` teal `.06` + `160deg #00425F 0%, #003D5B 55%, #00344E 100%` | same |
| Muted (`--sh-muted`) | `#4E5F74 → #3A4A5E` | `#C5CFD9 → #AAB7C4` |

Paint the canvas on a fixed `body::before` layer, not with `background-attachment: fixed` on `<body>` (that
repaints the viewport on every scroll frame; Vera AI's skin learned this).

## Typography

**Typography revised 2026-10-21: why.** Concentrix stakeholders (a VP and team) disliked the "futuristic" faces on
the Vera AI Pulse dashboard (Michroma titles, JetBrains Mono numbers and labels, Inter prose) and asked for
Montserrat / Helvetica / Calibri. The owner chose option A: **Montserrat** for display, headings, KPI numbers and
labels; **Pulse Sans** (the machine's own Calibri, else Carlito) for reading text; **Michroma kept only for the hollow
outlined numerals**, where it is a drawn shape rather than text. JetBrains Mono and Inter are retired. The entry
carries the change so every new CNX page and app starts from it. The type *scale* and roles are still Vera Hub's
([table](../vera-hub/DESIGN.md#typography)); the faces, weights and tracking changed.

**Reading-face mechanism revised 2026-10-21 (Vera AI Pulse PR #36 review, merged `695db4b`).** The first version scaled
the sans with `font-size-adjust: .53` (`--fsa`). That is gone: it scaled each font to a target x-height, so Windows
Calibri drew about 2.5% larger than the Carlito the layout was checked on. The reading face is now one family,
**Pulse Sans**, with a fixed `size-adjust` on its `@font-face` (below). Pulse names it "Pulse Sans" too; this entry uses
the same name so CSS copied either way is identical.

### Families (`theme-cnx.css` § 6)

| Token | Stack | Used for |
|---|---|---|
| `--font-display` | `"Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif` | page title, brand, section / card / build-card headings, the decision heading |
| `--font-num` | `var(--font-display)`, **tabular figures** | every figure: KPI values, ring core, counts, stage stamps, scores, week labels, row ids |
| `--font-label` | `var(--font-display)` | eyebrows, chips, tags, legends, table heads, segmented control, buttons, rail items, avatars |
| `--font-sans` | `"Pulse Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`. Pulse Sans = the machine's own Calibri, else Carlito, at one fixed `size-adjust` ([below](#the-reading-face-pulse-sans)) | body, ledes, list and table text, banners, captions, metadata, source lines, footer |
| `--font-hollow` | `"Michroma", "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif` | **only** the hollow numerals (`color: transparent; -webkit-text-stroke: 1px var(--num-stroke)`): section-head numerals, gate numbers, decision-card numbers |
| `--font-code` | `ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` | code only: flag ids, file paths, DAX / SQL. System faces, nothing bundled |

Weight and tracking tokens sit beside them: `--w-display` 700, `--w-head` 700, `--w-num` 600, `--w-label` 600,
`--track-display` −0.015em, `--track-label` 0.06em, `--track-num` 0. The names are the Vera AI Pulse dashboard's (no
`--fsa`: it is gone there too).

### The reading face: Pulse Sans

`--font-sans` names one family, **Pulse Sans**, declared by two `@font-face` rules (Regular, Bold). Each tries the
machine's own Calibri through `local()` first, falls back to the self-hosted Carlito file, and carries a fixed
`size-adjust`. The numbers are the ones Vera AI Pulse ships (`src/global.css`):

| Face | `src` | Weight | `size-adjust` |
|---|---|---|---|
| Pulse Sans Regular | `local("Calibri")`, then `Carlito-Regular.woff2` | 400 | **111%** |
| Pulse Sans Bold | `local("Calibri Bold")`, `local("Calibri-Bold")`, then `Carlito-Bold.woff2` | 700 | **109.5%** |
| Montserrat | `Montserrat.woff2` | 100–900 | none |
| Michroma | `Michroma.woff2` | 400 | none |

**Why these numbers.** Calibri and Carlito have a small x-height next to Montserrat's 0.517: Carlito's is 0.4775
(Regular) and 0.4849 (Bold) of the em, Calibri's 0.466. The kit and Pulse were drawn and overflow-checked with
`font-size-adjust: .53`, which Chrome resolved to ×1.110 on Carlito Regular and ×1.093 on Carlito Bold; on Montserrat it
resolved to ×0.985–1.009 (its x-height moves with weight), which is neutral, so Montserrat and Michroma take no
`size-adjust`. The fixed values keep Carlito's checked layout identical, and the **same** number sits on the local
Calibri face, so a word takes the same box whichever font loaded. Bold is 109.5% as Pulse ships it (measured ×1.093).

**Why not `font-size-adjust`.** It equalises x-height per font, not width. Calibri and Carlito share advance widths, yet
`.53` made Calibri ×1.137 and Carlito ×1.110: reading text came out 2.5% larger on Windows, where `local("Calibri")` wins
and most Concentrix users are, than on the Mac everything had been checked on. A fixed `size-adjust` has no such drift.
It also leaves a `font-size: 0` glyph at zero (Pulse's account-menu chevron regrew under `font-size-adjust`).

**Not verified on a real Windows Calibri** by this entry or by Pulse: widths were checked on Carlito, whose metrics are
Calibri's, but Calibri's letter shapes differ. Look at one page on a Concentrix laptop before relying on it.

**Why a monospace survives at all.** JetBrains Mono was the number-and-label face; that job is Montserrat's now.
Code still needs fixed width (identifiers, aligned DAX or SQL), so `--font-code` names the system monospace and
bundles nothing. It is never used for numbers or labels, and a page with no code uses none (the kit's only uses are
the two feature-flag ids).

### Scale

| Role | Face | Size / line | Weight | Tracking |
|---|---|---|---|---|
| Page title | Montserrat | clamp(26px, 3vw, 40px) / 1.15 | 700 | −0.015em |
| Page head (apps) | Montserrat | 28 / 1.25 | 700 | −0.015em |
| Section title | Montserrat | 20–26 / 1.2 | 700 | −0.015em |
| Card title (build cards 19px) | Montserrat | 16 / 1.35 | 700 | −0.015em |
| Decision heading | Montserrat | clamp(22px, 2.3vw, 30px) / 1.2 | 700 | −0.015em |
| Brand | Montserrat | 15 / 1.1 | 700 | −0.015em |
| KPI value, ring core | Montserrat, tabular | 32 / 1 (kit; 28 under 600px), 22 in app tiles | 600 | 0 |
| Data figures: stamps, scores, counts, week labels | Montserrat, tabular | 9–12 | 500–600 | 0–0.02em |
| Eyebrow, label, chip, table head, legend | Montserrat caps | 9.5–11.5 | 600 (section eyebrow 700) | 0.06em |
| Button | Montserrat | 13 (gold 14) | 500; accent and gold 600 | 0 |
| Body (lede 16) | Pulse Sans | 15 / 1.6 | 400; bold 700 | 0 |
| Body-sm, metadata, captions | Pulse Sans | 12.5–13.5 / 1.45–1.55 | 400 | 0 |
| Hollow numeral | Michroma, outline only | 56 / 0.9 (40 under 768px); gates 26, decisions 28 | 400 | 0 |
| Code | system monospace | 0.9em | 400 | 0 |

### Pairing rules

- **Montserrat speaks, Pulse Sans explains.** Titles, figures and labels are Montserrat; sentences are Calibri. A
  sentence never sits in Montserrat caps, and a KPI never sits in Calibri.
- **Few weights.** Montserrat 700 for headings, 600 for figures and labels, 500 for buttons and small data.
  Pulse Sans has two weights, 400 and 700 (Carlito ships those two); 500 resolves to 400, and 600 and up to 700.
- **Labels are caps at 0.06em.** Montserrat is wide, and the old mono tracking (about 0.15em) makes labels sprawl.
  Never track sentence case.
- **Tabular figures on every number** (`font-variant-numeric: tabular-nums`): Montserrat's default digits are
  proportional, so a "1" is half the width of a "0" and columns drift. The `font` shorthand resets the property, so
  the kit sets it with `!important` on `*`, as the Pulse dashboard does (so no later rule may use `font:` with
  `!important`, which would reset it again).
- **Scale the sans on its `@font-face`, never with `font-size-adjust`.** Pulse Sans carries a fixed `size-adjust`
  (Regular 111%, Bold 109.5%) on both its Calibri and Carlito sources; Montserrat and Michroma carry none. Because the
  scale lives on the face, the `font` shorthand is safe for reading text. Never write `font:` with `!important`: it
  resets the tabular figures. The kit build fails on `font-size-adjust` and on `font: … !important`, as Pulse's
  `typography.spec.ts` does.
- **Michroma only as an outline.** Never a filled Michroma glyph, never a word, never a heading.
- **Family names only through the tokens.** No literal family names in component CSS; switching the type again is a
  change to `theme-cnx.css` § 6.

### Accessibility

- Body text is at least 15px (lede 16), metadata at least 12.5px; caps labels at least 9.5px, weight 600, and only
  for a few words. The smallest text uses `--text-2` / `--text-3`, which clear AA on every ground (§ Contrast).
- Hollow numerals are decorative: `aria-hidden="true"`, with the number repeated in text (the heading, the list
  order or a label). A 1px stroke at 40–60 % alpha does not meet text contrast, so it never carries information alone.
- Montserrat caps run wide. Labels that must not wrap get `white-space: nowrap` only inside a box with room; the kit
  is checked for clipped or escaping text at 1440 and 390px in both themes.
- **Missing glyphs.** The Latin subsets of Montserrat and Carlito (and Michroma) have no → ← ₱ ✓ ≥. Those fall to
  Helvetica Neue / Helvetica / Arial or the operating system's fallback, so they can look different from machine to
  machine. Draw arrows and ticks as inline SVG where they matter; ₱ renders from the system font.

### Loading and licensing

- **Montserrat** (one variable file, `wght` 100–900, Latin subset, from `@fontsource-variable/montserrat`) and
  **Carlito** (400 + 700, Latin, from `@fontsource/carlito`) are SIL OFL 1.1: they may be self-hosted, inlined as
  base64 and subset, as long as the licence travels with them. The files and licences are in `kit/fonts/`, byte for
  byte the files the Vera AI Pulse dashboard ships on main (`src/assets/fonts`, PR #36).
- **Michroma** (also SIL OFL) is loaded only by pages that show hollow numerals. The kit inlines the Hub's copy
  (`app/public/fonts/Michroma.woff2`); its licence text is `kit/fonts/LICENSE-Michroma-OFL.txt`.
- **Calibri** (Microsoft) and **Helvetica / Helvetica Neue** (Monotype) are proprietary system fonts: they are named in
  the stacks (Helvetica) or reached through `local()` (Calibri) and **never bundled, inlined, subset or uploaded**.
  `local("Calibri")` is tried first so Windows / Office machines use their own copy and never fetch Carlito; Mac,
  Android and Linux get Carlito, which is metric-compatible with Calibri, so line breaks match. Helvetica Neue /
  Helvetica / Arial close every stack for the glyphs the subsets lack.
- Never Google Fonts or a CDN: embedded hosts block them and pages must work offline.

```css
/* app: self-host next to the CSS (the kit inlines the same files as data: URIs) */
@font-face { font-family: "Montserrat"; src: url("./fonts/Montserrat.woff2") format("woff2");
             font-weight: 100 900; font-style: normal; font-display: swap; }
@font-face { font-family: "Pulse Sans";      /* the machine's Calibri, else Carlito; one fixed scale */
             src: local("Calibri"), url("./fonts/Carlito-Regular.woff2") format("woff2");
             font-weight: 400; font-style: normal; font-display: swap; size-adjust: 111%; }
@font-face { font-family: "Pulse Sans";
             src: local("Calibri Bold"), local("Calibri-Bold"), url("./fonts/Carlito-Bold.woff2") format("woff2");
             font-weight: 700; font-style: normal; font-display: swap; size-adjust: 109.5%; }
@font-face { font-family: "Michroma"; src: url("./fonts/Michroma.woff2") format("woff2");   /* hollow numerals only */
             font-weight: 400; font-style: normal; font-display: swap; }

body { font-family: var(--font-sans); }              /* no font-size-adjust: the scale is on the @font-face */
*, *::before, *::after { font-variant-numeric: tabular-nums !important; }
.section-num { font: 400 56px/.9 var(--font-hollow); color: transparent; -webkit-text-stroke: 1px var(--num-stroke); }
```

### Colour of type

The page title's key phrase and the section titles' key words take `--accent-ink` (solid teal in
dark with a soft glow, solid navy in light). The signature layer's `--grad` exists (teal → mint → steel in dark,
navy → `#0B5A82` → deep teal `#00706A` in light) for apps already using it, but plan pages use the solid accent.

## Layout

Vera Hub's, unchanged: shell frame `max-width:1520px; margin:20px auto; radius 28`, flattening under 768px; 72px
top bar with the brand tile and a sunken tool tray; 240px rail (active = accent-soft fill, semibold, 3px glowing
accent bar); main padding `28px 32px 44px`; section gap 32px (plan pages 44px with a gradient hairline); card padding
24px; KPI well 5 → 3 → 2 columns.

## Elevation & Depth

| Level | CNX Dark | CNX Light |
|---|---|---|
| Card (`--shadow`) | `0 10px 26px rgba(0,0,0,.45)` | `0 8px 22px rgba(0,40,70,.10)` |
| Tile in a well | `0 6px 16px rgba(0,0,0,.40)`; hover `0 12px 26px .50` + lift 2px | `.12`; hover `.18` |
| Well (`--inset-well`) | `inset 0 2px 6px rgba(0,0,0,.55), inset 0 -1px 0 rgba(255,255,255,.03)` | `inset 0 2px 6px rgba(0,40,70,.14), inset 0 -1px 0 rgba(255,255,255,.7)` |
| Menu / modal | `0 16px 48px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04)` | `0 16px 48px rgba(0,40,70,.22), 0 0 0 1px rgba(0,40,70,.06)` |
| Shell | `0 40px 100px rgba(0,0,0,.6)` | `0 40px 100px rgba(0,40,70,.16)` |
| Accent halo | `0 0 24px` accent glow on filled accent; `0 0 14px` on the active segment | same |
| Gold halo | `0 0 24px rgba(251,202,24,.38)`; hover `0 0 32px` + lift 1px | `.45` |

## Components

Every component is Vera Hub's ([list](../vera-hub/DESIGN.md#components)): card, KPI rail, table, buttons, chips,
alerts, inputs, segmented control, progress, status, focus, loading. Only these colour differences apply:

- **Buttons:** primary = **gold** (`--sh-gold`, `--on-gold`, 44px, gold halo), once per view. The accent button
  (teal / navy gradient + on-accent + accent halo) is the everyday "primary" for every other action. Secondary and
  ghost are unchanged.
- **KPI well:** tiles keep the 2px accent base bar; the **lead** tile's bar is gold, and in dark its value is gold
  (`--gold-ink`); in light the value stays ink.
- **Chips:** status chips are status text + 45 % (dark) / 40 % (light) border + soft fill; a solid "live" chip is
  `--ok` with `--on-ok`. Inside the navy panel chips are outline-only.
- **Navy panel:** radius 18 (hero rung), 28px padding, `--sh-navy`, a hairline `rgba(255,255,255,.14)`, the card
  shadow plus `inset 0 1px 0 rgba(255,255,255,.08)`. Holds a Montserrat heading, a lede, the gold action and a sunken
  well of glass tiles with hollow Michroma numerals.
- **Brand tile:** navy tile, teal bars. In Vera AI keep the Vera mark itself (`components/vera-mark.tsx`): its
  cyan + red bars are fixed brand colours, deliberately not tokenised.
- **Focus:** `outline: 2px solid var(--accent)` (teal in dark, navy in light); on the gold button the outline is
  `--text-0`.
- **Gantt** (kit): week grid on `--line-2`, done bars = ok soft fill + ok line, in-progress = accent gradient + glow,
  planned = dashed `--border-hot`, gates = diamonds (ok when cleared, accent when due, outline when later), today =
  a 2px accent line with a pill label.

## Motion

Vera Hub's: 150ms `cubic-bezier(.22,1,.36,1)` transitions, 280ms card lift, rail hover `translateX(4px)`, tiles lift
2px; reveal once (fade + 14px rise, 500ms, children stagger 60ms), section-numeral wipe, count-up, ring draw, gantt
bars grow from the left (600ms, 40ms stagger); the only continuous motion is the header ring's 36s orbit.
`prefers-reduced-motion: reduce` shows every final state with no animation. Nothing replays on refresh.

## Web apps

### Two ways to switch it on

**A. Overlay an existing Vera Hub app (Vera AI, AutoAlchemy Hub).** Keep `data-theme="corp-dark" | "corp-light"`
and add `data-palette="cnx"` to `<html>`. Every selector those apps key on `corp-*` keeps matching; only the values
change. This is the route for Vera AI, for two measured reasons:
- `lib/themes.ts` `normalizeThemeId()` treats `cnx-dark` / `cnx-light` as **legacy** ids and rewrites them to
  `corp-*`, so a stored `cnx-dark` would silently come back as corp.
- About ten component selectors (`app/vera-skin.css`, `components/hub/coaching-ring.css`,
  `components/coach/coach-landing.css`, `components/quest/completion-report.css`, `app/globals.css`) are keyed to
  `[data-theme="corp-*"]`, and the Hub keys its whole component layer on `[data-theme^='corp-']`.

The overlay selectors are `:root[data-palette="cnx"][data-theme="corp-*"]`, specificity (0,3,0): they beat Vera
AI's `[data-theme="corp-*"]` (0,1,0), its skin's `html[data-skin="ovcc"][data-theme="corp-*"]` (0,2,1) and the
Hub's `[data-theme='corp-*']` (0,1,0) **in either import order** (checked in Chrome against the real
`globals.css`, `vera-skin.css` and the Hub's `theme-corp.css`, 2026-10-16). Import it last anyway.

**B. A new app or stand-alone page.** `<html data-theme="cnx-dark">` (or `cnx-light`) and import
`theme-cnx.css`. Write component CSS against the token names below.

### Next.js steps

```tsx
// app/layout.tsx  (Vera AI: route A)
import "./globals.css";
import "./vera-skin.css";
import "./theme-cnx.css";            // copy of design-md/vera-hub-cnx/theme-cnx.css, imported LAST

<html data-theme={theme} data-skin="ovcc" data-palette="cnx" ...>

// app/layout.tsx  (new app: route B)
import "./theme-cnx.css";
<html data-theme="cnx-dark" ...>     // self-host Montserrat (variable) + Pulse Sans (Carlito 400/700 behind local Calibri),
                                     // and Michroma only if the app shows hollow numerals (kit/fonts); the @font-face
                                     // block is in § Typography
```

The navy panel is `<section data-surface="navy" style={{ background: "var(--sh-navy)" }}>` (or a class that
paints `--sh-navy`); the scope applies only while the palette is on.

### The token map (1:1 with Vera AI and the Hub)

`theme-cnx.css` defines the role tokens and then aliases every name the two apps read, so no component changes:

| Role (theme-cnx.css) | Vera AI (`globals.css`, `vera-skin.css`) | AutoAlchemy Hub (`theme-corp.css`) |
|---|---|---|
| `--bg-0 --bg-1 --shell --card --card-hi` | same names | same names; `--ft-canvas --ft-surface --ft-slab --ft-inset` |
| `--text-0 … --text-3` | same names | same; `--ft-ink --ft-text --ft-text-2 --ft-text-3` |
| `--accent --accent-2 --accent-soft --accent-glow` | `--cnx-lime --cnx-lime-2 --cnx-lime-soft --cnx-lime-glow` | same `--cnx-lime*`; `--ft-accent --ft-volt --ft-accent-fill` |
| `--accent-ink` | `--sig-accent-ink --md-em-color` | `--ft-accent-ink --ft-slab-accent-ink --kind-fact-ink` |
| `--on-accent` | `--text-dark` | `--text-dark --ft-on-accent --ft-btn-primary-fg` |
| `--ok --warn --warn-ink --crit` | `--green --amber --amber-text --red` | `--ok --ok-ink --warn-ink --crit-ink --ft-ok* --ft-warn* --ft-crit*` |
| `--info-color --info-bg --info-border` | same names | same; `--ft-info*` |
| `--border --line-2 --border-hot --well-line` | same names | same; `--ft-hairline --ft-hairline-soft --ft-edge*` |
| `--sh-canvas --sh-bar --sh-card --sh-tile --sh-well` | same names | same; `--ft-card-bg --ft-field-bg` |
| `--sh-accent` | `--acc-grad` | `--sh-accent --ft-btn-primary-bg` |
| `--shadow --shadow-tile(-hi) --inset-well` | `--sig-card-shadow --sig-tile-shadow(-hi) --sig-well-inset` | `--shadow --ft-sh-card --ft-sh-tile(-hi) --ft-well-inset` |
| `--glass --glass-line --sig-grid-line --sig-shell-glass` | `--sig-glass --sig-glass-line` + same | `--glass --glass-line --ft-grid-line --ft-shell-glass` |
| `--grad-1/2/3 --num-stroke` | same; `--grad` | — |
| `--sh-navy --sh-gold --gold --on-gold` | new | `--sh-sel --ft-panel --ft-on-panel*`; `--ft-btn-cta-bg/fg` (new, opt-in) |
| `--font-display --font-num --font-label --font-sans --font-hollow --font-code`, `--w-* --track-*` | not reached by the overlay: type comes from `next/font/local` + `@theme inline` (checklist). The Pulse dashboard uses these same names | `--ft-display --ft-grot --ft-mono` (§ 6 aliases; `--ft-mono` becomes the label face) |

Aliases are declared on `:root` **and** on every navy scope: a custom property resolves where it is declared, so an
alias set only on `<html>` would carry the page's accent into the navy panel.

### Adoption checklist

Verified for this entry: the token resolution above (both apps, both import orders, navy scope). Not yet done in
either app; check these when adopting:

- [ ] **Both themes on the five busiest screens**, plus one navy panel, at 1440 and 390, against § Contrast.
- [ ] **Gold count:** the Hub's `--ft-btn-primary-bg` stays the accent; move exactly one action per view to gold
      (`--ft-btn-cta-bg` / `--ft-btn-cta-fg` in the Hub, a `.btn.gold` equivalent in Vera AI). That is the only
      code change the palette asks for.
- [ ] **OK is now green.** Vera AI's `--green` was the accent (`#7FD4FF` / `#136189`); anything that used it for a
      chart series or a non-status highlight turns green. Search `var(--green)` and decide per use.
- [ ] **Warn is orange** `#FF9F5A` / `#A34E00`, not amber; check heatmaps that mixed amber with gold.
- [ ] **Hard-coded colours do not reskin.** Vera AI, 2026-10-16: 11 ice-blue / corp-blue literals outside the token
      blocks in 5 files (`components/vera-mark.tsx` 4 (fixed brand, keep), `lib/pdf/brand.ts` 3,
      `components/intro-player/index.tsx` 2, `app/globals.css` 1, `components/quest/quest.css` 1) and 52 legacy-lime
      literals in 27 files (already off-palette under corp). Grep:
      `grep -rniE '#7fd4ff|rgba\(127, *212, *255|#1878ae|rgba\(24, *120, *174|rgba\(212, *255, *0' app components lib`.
- [ ] **Theme picker copy:** `lib/themes.ts` swatches and blurbs still describe the corp palettes.
- [ ] **PDFs, emails, the intro video** carry their own colours (`lib/pdf/brand.ts`, the pre-rendered corp-dark
      MP4 letterbox); decide whether they follow.
- [ ] **Focus ring** is visible on every surface (teal on night, navy on white, `--text-0` on gold).
- [ ] **Type, Vera AI.** `app/globals.css` registers `--font-sans: var(--font-inter)` and
      `--font-mono: var(--font-jetbrains-mono)` in `@theme inline`, so Tailwind utilities read the `next/font`
      variables directly and the overlay's `--font-*` tokens never reach them. Swap the `localFont` imports in
      `app/layout.tsx` (Montserrat, Michroma for hollow numerals), declare Pulse Sans with the `@font-face` block in
      § Typography (it needs `local("Calibri")` and `size-adjust`), point `@theme`'s `--font-sans` at the Pulse Sans
      stack, move number and label classes off `font-mono` to `--font-num` / `--font-label`, and keep a monospace
      only where code is shown.
- [x] **Type, Hub: not applied (owner decision 2026-10-21).** The AutoAlchemy Hub keeps Vera Hub type (its own
      `--ft-display` / `--ft-grot` / `--ft-mono` and font subsets) with the CNX palette; the overlay does not re-point the
      Hub's families. The CNX typography is for Vera AI Pulse and new CNX pages built from this kit.
- [ ] **Glyphs:** the Montserrat and Carlito Latin subsets have no `₱`, arrows or `✓`; they fall to Helvetica /
      Arial / the system font (§ Typography). The Hub's own subsets carry them; Montserrat's do not.

## Pages (use `kit/`)

For stand-alone HTML (plan pages, briefs, status pages, review pages in this palette) start from
[`kit/`](./kit/README.md): `kit/template.src.html` is a complete plan page with neutral sample content
("Northwind Ops — rollout plan") in the section types the reference used (header with rail and ring core, KPI well,
numbered list, build cards with stepper / rubric bars / screenshot, gantt, filterable matrix table, gates, navy
decision panel with the one gold action). `kit/scripts/build_page.py` inlines Montserrat + Pulse Sans (Carlito, behind
local Calibri; `kit/fonts/`, with their OFL licences) and Michroma (hollow numerals only) as woff2, and `theme-cnx.css`, so the output is one
offline file that makes no request. The kit's own CSS reads only `theme-cnx.css` tokens, so it is also a live test of the
token layer.

## Do's and Don'ts

**Do**
- Keep everything structural exactly Vera Hub: radius ladder, raised-on-sunken, hairlines, type roles, motion.
- Set every family through the `--font-*` tokens: Montserrat for titles, figures and labels, Pulse Sans for sentences,
  tabular figures on every number, the scale as `size-adjust` on the Pulse Sans `@font-face`.
- Spend gold once per view; make it the action the page exists for.
- Put the summary or decision in the one navy panel, with `data-surface="navy"` so its contents re-scope.
- Use teal as the accent in dark and navy in light; let `--accent-ink` pick.
- Verify CNX Light separately: navy accent, ink-only lead KPI, gold button with its hairline.
- Trace every number on a page to the content under it.

**Don't**
- No teal or gold text on white or light surfaces (1.6 and 1.5:1).
- No second gold element in the same view, and no gold for status.
- No Vera Bold vocabulary here: no Anton / Barlow caps, no brush marks, no photo heroes, no pill-shaped cards.
- No Inter, no JetBrains Mono, no techno or "futuristic" display faces. Michroma appears only as the hollow outline
  numeral; no monospace for numbers or labels.
- Never bundle, inline or subset Calibri or Helvetica (proprietary); never load fonts from Google Fonts or a CDN.
- No `font-size-adjust` (it makes Windows Calibri and Mac Carlito differ by 2.5%), no `--fsa`, and no `font:` shorthand
  with `!important` (it resets the tabular figures). No `size-adjust` on Montserrat.
- No square cards or hard offset shadows (Futura / AutoAlchemy).
- No zebra striping, no generic spinners or shimmer.
- Don't set `data-theme="cnx-*"` inside Vera AI (legacy-id rewrite); use the `data-palette="cnx"` overlay.

## Responsive Behavior

| Width | Change |
|---|---|
| ≤ 1240 | KPI well to 3 columns; summary cards stack |
| ≤ 1099 | page-header ring core hides; gantt label column 170px |
| ≤ 1000 | rail becomes a sticky horizontal chip strip with an end fade; crumb hides |
| ≤ 900 | matrix table becomes stacked cards with inline labels; build-card columns stack |
| ≤ 768 | shell frame flattens (no margin, radius, border, shadow); 60px bar; tool labels hide |
| ≤ 600 | KPI well to 2 columns; gantt labels sit above their tracks and bar text moves to the screen-reader schedule |

## Relationship to other entries

- [`vera-hub`](../vera-hub/DESIGN.md): the parent. Structure, components, the type scale, motion and the signature
  layer are defined there; this entry changes colour and the typefaces. Vera Hub stays the default for HTML
  deliverables.
- [`vera-bold`](../vera-bold/DESIGN.md): source of the Concentrix palette (brand, inks, block-scope rule, contrast).
  Vera Bold is the loud campaign language; Vera Hub CNX is the quiet console in the same colours.
- [`vera-transmutation`](../vera-transmutation/DESIGN.md): leadership plan pages on Vera Hub Dark with the
  transmutation hero and 3D renders; its palette is Vera Hub's ice blue, not this one.
- [`ai-navigator`](../ai-navigator/DESIGN.md): the legacy lime spec; `--cnx-lime` keeps its name from there.
