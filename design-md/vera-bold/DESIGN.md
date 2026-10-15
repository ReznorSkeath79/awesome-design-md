---
version: alpha
name: Vera-bold-design-analysis
description: "Vera Bold is the OVAI (Concentrix AI Interviewer) web app's look, live 2026-10-15: The Drop's bold ad-campaign energy translated into Concentrix colours and laid on Vera Hub's numbered-section structure. Navy #003D5B, teal #25E2CC and gold #FBCA18 on a near-black navy night #060D18 (dark, default) or white with navy ink (light). Anton heavy condensed CAPS for every headline and big number, always two-tone (ink line + teal line in dark; in light the second line is navy on a painted teal brush mark); Barlow Condensed caps for labels, nav, pills and eyebrows; Inter for reading; JetBrains Mono for numbers, ids and meta. Whole-surface colour blocks (navy, night, teal, gold), pill buttons with a gold primary, round pill chips, glass stat pills on the hero, high-contrast photography wrapped in teal/gold/navy paint-brush splashes, a brush-stroke underline on the active nav item and a giant outline wordmark in the footer. Radius ladder 8/14/22/32 + pill. Source of truth: Work/Concentrix/ovcc/ovai/web/app/src/styles/ (tokens.css, base.css, components.css, shells.css, motion.css, pages/scoring.css); approved mock docs/design/mocks/ovai-web/direction-d.src.html + MOCK-CONTRACT-D.md."

colors:
  canvas: "#060d18"
  primary: "#25e2cc"
  on-primary: "#022320"
  navy: "#003d5b"
  teal: "#25e2cc"
  gold: "#fbca18"
  on-gold: "#0d1a24"
  night: "#060d18"
  night-2: "#0b1626"
  night-3: "#101b2c"
  navy-deep: "#062033"
  teal-deep: "#002536"
  bg-2: "#0a1424"
  surface: "#0d1829"
  surface-2: "#122136"
  raised: "#15273e"
  text: "#f2f6fa"
  text-2: "#bac7d4"
  text-muted: "#8799ad"
  line: "rgba(190,215,235,.10)"
  line-2: "rgba(190,215,235,.19)"
  accent-soft: "rgba(37,226,204,.12)"
  accent-line: "rgba(37,226,204,.42)"
  ok: "#4cd98a"
  warn: "#ff9f5a"
  danger: "#ff6f6f"
  info: "#9cc3dd"
  paper: "#ffffff"
  paper-2: "#f5f7fa"
  paper-ink: "#07192a"
  paper-ink-2: "#34495d"
  paper-ink-3: "#566779"
  light-ok: "#11743a"
  light-warn: "#a34e00"
  light-danger: "#c0262d"
  light-info: "#2f5d7c"
  white: "#ffffff"

typography:
  hero-title:
    fontFamily: Anton
    fontSize: 124px
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: 0.005em
  display-l:
    fontFamily: Anton
    fontSize: 88px
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: 0.005em
  section-title:
    fontFamily: Anton
    fontSize: 54px
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: 0.005em
  card-title:
    fontFamily: Anton
    fontSize: 30px
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: 0.01em
  kpi-number:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: 400
    lineHeight: 0.90
    letterSpacing: 0.01em
  wordmark:
    fontFamily: Anton
    fontSize: 27px
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: 0.04em
  card-head:
    fontFamily: Barlow Condensed
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.10
    letterSpacing: 0.08em
  nav:
    fontFamily: Barlow Condensed
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.00
    letterSpacing: 0.09em
  button:
    fontFamily: Barlow Condensed
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.00
    letterSpacing: 0.09em
  eyebrow:
    fontFamily: Barlow Condensed
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: 0.14em
  label:
    fontFamily: Barlow Condensed
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: 0.12em
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  lede:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.60
    letterSpacing: 0
  mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.00
    letterSpacing: 0

rounded:
  sm: 8px
  md: 14px
  lg: 22px
  xl: 32px
  pill: 999px

spacing:
  s1: 4px
  s2: 8px
  s3: 12px
  s4: 16px
  s5: 24px
  s6: 32px
  s7: 48px
  s8: 72px
  page-max: 1360px
  gutter: 40px
  gutter-phone: 16px
  header-height: 70px
  section-gap: 64px

components:
  header:
    backgroundColor: "rgba(6,13,24,.90)"
    textColor: "{colors.text-muted}"
    typography: "{typography.nav}"
    height: 70px
    border: "1px solid rgba(190,215,235,.10)"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 0 26px
    height: 48px
  button-accent:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 0 26px
    height: 48px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    border: "2px solid rgba(190,215,235,.19)"
    padding: 0 26px
    height: 48px
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    border: "1.5px solid rgba(190,215,235,.19)"
    padding: 0 10px
    height: 26px
  glass-stat:
    backgroundColor: "rgba(6,13,24,.62)"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    border: "1px solid rgba(255,255,255,.14)"
    padding: 10px 16px 10px 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    border: "1px solid rgba(190,215,235,.10)"
    padding: 24px
  block-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.text}"
    typography: "{typography.section-title}"
    rounded: "{rounded.xl}"
    padding: 40px 44px
  block-teal:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.teal-deep}"
    typography: "{typography.card-title}"
    rounded: "{rounded.lg}"
    padding: 26px
  kpi-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.kpi-number}"
    rounded: "{rounded.lg}"
    padding: 20px
  flow-node:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.card-head}"
    rounded: "{rounded.md}"
    border: "1.5px solid rgba(190,215,235,.19)"
    padding: 16px 14px 18px
  hero-banner:
    backgroundColor: "{colors.night}"
    textColor: "{colors.text}"
    typography: "{typography.hero-title}"
    rounded: "{rounded.xl}"
    padding: 46px 52px 44px
---

## Overview

**Vera Bold** is the look of **OVAI**, the Concentrix AI Interviewer web app (staff + candidate surfaces), live
2026-10-15. The worked example is the staff page **How scoring works** (`/staff/scoring`, deployed on
`green-glacier-0cb4b1600.4.azurestaticapps.net`): a photo banner hero, a chip table of contents, a navy "in one
screen" poster block, then numbered sections — flow diagram, rubric cards, level cards, five seat cards, a live
simulator, KPI tiles and a FAQ — every one of them in this language.

Lineage, so nobody re-derives it:
- **The Drop** ([`the-drop`](../the-drop/DESIGN.md)) proved the "bold ad campaign" language in the Hub Marketplace
  (Anton caps, whole colour blocks, paint powder around high-contrast photography, pill buttons).
- OVAI's mock round picked **Direction D — "Bold campaign"** (`MOCK-CONTRACT-D.md`, owner reference: a creative-agency
  campaign site with huge two-tone condensed headlines, a short coloured rule above them, paint-brush splashes around
  photography and colour-block tiles) and translated it into **Concentrix colours**: navy `#003D5B`, teal `#25E2CC`,
  gold `#FBCA18` (purple → navy/teal, yellow → gold), near-black navy `#060D18` for dark blocks.
- The page skeleton — sticky top bar, numbered section heads with a mono index, eyebrow, big title and lede,
  hairline-separated sections — is **Vera Hub**'s structure ([`vera-hub`](../vera-hub/DESIGN.md)). Hence the name:
  Vera structure, campaign energy.

Energy is graded by surface: heroes, summary blocks, candidate and celebration screens carry the full poster look;
dense tools (tables, transcripts, admin) keep the type, colour blocks and accents but stay disciplined and scannable —
"premium, not noisy".

**Source of truth** (repo `Work/Concentrix/ovcc`, folder `ovai/web/app/src/`):
- `styles/tokens.css` — every colour, font, radius, spacing and motion token, both themes, the block scopes
- `styles/base.css` — type classes (`.dx`, `.tone`, `.eyebrow`, `.rule`, `.lede`, `.lbl`), reduced motion
- `styles/components.css` — pills, chips, hero, tiles, poster, cards, KPI, table, tags, glass, banners
- `styles/shells.css` — brand lockup, staff/candidate/public headers, footer with the giant outline wordmark
- `styles/motion.css` — motion API (`.hero-enter`, `data-reveal`, `data-reveal-stagger`, keyframes)
- `styles/pages/scoring.css` + `pages/staff/ScoringPage.tsx` — the worked example's section head, TOC, summary
  block, flow diagram, seat cards, level cards, KPI tiles
- `art.ts` + `assets/art/` — the art set (dark/light pairs) and the two alpha brush-splash WebPs
- Approved mock: `docs/design/mocks/ovai-web/direction-d.src.html`, contract `MOCK-CONTRACT.md` + `MOCK-CONTRACT-D.md`

**Kit:** `kit/template.html` is a self-contained plan / brief page in this language (fonts and brush art inlined,
dark + light, reveal motion). Start every stand-alone HTML page from it — see `kit/README.md`.

**Key characteristics**
- Dark default: night `#060D18`, surfaces `#0D1829` / `#122136`, raised `#15273E`; ink `#F2F6FA / #BAC7D4 / #8799AD`.
  Light: white / `#F2F5F8`, ink `#07192A / #34495D / #566779`, accent switches from teal to **navy**.
- **Two-tone Anton headlines everywhere** — ink line + accent line. In dark the accent line is teal text; in light it
  is navy text sitting on a **painted teal brush mark** (`.tone::before` masked by the `--brush` SVG).
- **Whole colour blocks**, never stripes or tints: navy poster blocks (`.nv`), night blocks (`.nt`), teal (`.tl`) and
  gold (`.gd`) tiles, a gold KPI. Each block re-scopes its own ink and accent.
- **Pills for everything you press or scan**: gold primary pill, teal accent pill, ghost outline pill, round chips,
  frosted glass stat pills on photographs.
- **Paint brush** is the signature mark: splashes around photography, a brush underline on the active nav item, the
  brush highlight behind light-mode accent words, a faint splash in the corner of navy blocks.
- Rounding ladder **8 / 14 / 22 / 32 / pill** — controls 8, nodes and small cards 14, cards and tiles 22, heroes and
  poster blocks 32.

## Colors

### Brand (both themes)

| Token | Value | Use |
|---|---|---|
| `--navy` | `#003D5B` | navy blocks, light-mode accent, avatar fill, knockout tags, arrow buttons on teal/gold |
| `--teal` | `#25E2CC` | dark-mode accent, accent headline line, active states, brush marks, focus ring (dark) |
| `--gold` | `#FBCA18` | the **primary** pill (one per view), gold KPI, gold tiles, skip link, arbiter tint |
| `--night` | `#060D18` | dark page, footer band, `.nt` blocks |
| `--night-2 / -3` | `#0B1626 / #101B2C` | dark block variants, art ground panels |
| `--navy-deep` | `#062033` | ink on gold tiles |
| `--teal-deep` | `#002536` | ink on teal tiles, `--accent-ink` inside dark blocks |
| `--gold-ink` | `#0D1A24` | text on gold |

### Theme tokens

| Token | Dark (`data-theme="dark"`, default) | Light (`data-theme="light"`) |
|---|---|---|
| `--bg` / `--bg-2` | `#060D18` / `#0A1424` | `#FFFFFF` / `#F2F5F8` |
| `--surface` / `--surface-2` | `#0D1829` / `#122136` | `#FFFFFF` / `#F5F7FA` |
| `--raised` | `#15273E` | `#FFFFFF` |
| `--line` / `--line-2` | `rgba(190,215,235,.10)` / `.19` | `rgba(0,40,70,.11)` / `.20` |
| `--ink` / `--ink-2` / `--ink-3` | `#F2F6FA` / `#BAC7D4` / `#8799AD` | `#07192A` / `#34495D` / `#566779` |
| `--accent` | `#25E2CC` teal | `#003D5B` navy |
| `--accent-ink` | `#022320` | `#FFFFFF` |
| `--accent-soft` / `--accent-line` | `rgba(37,226,204,.12)` / `.42` | `rgba(0,61,91,.07)` / `.35` |
| `--tone` / `--tone-bg` | teal / transparent | navy / **teal brush** |
| `--ok` | `#4CD98A` | `#11743A` |
| `--warn` | `#FF9F5A` | `#A34E00` |
| `--danger` | `#FF6F6F` | `#C0262D` |
| `--info` | `#9CC3DD` | `#2F5D7C` |
| `--mark-bg` / `--mark-ink` | `#FBCA18` / `#0D1A24` (text highlight) | same |
| `--shadow` | `0 30px 70px -30px rgba(0,0,0,.75)` | `0 30px 70px -34px rgba(0,40,70,.35)` |
| `--shadow-sm` | `0 8px 24px -12px rgba(0,0,0,.6)` | `0 8px 22px -14px rgba(0,40,70,.35)` |

Status chips use the status colour as text + a 45 % border + a soft fill (`--ok-soft` etc. at .14 dark / .09 light).

### Block scopes

A block class sets its own background **and** re-scopes ink, accent and lines so any component inside it just works:

| Class | Ground | Ink / accent inside |
|---|---|---|
| `.nv` | navy `#003D5B` | poster ink `#F2F6FA / #C3D0DC / #97A9BC`, teal accent (pair with `.dk`) |
| `.nt` | night `#0B1626` (dark block in either theme) | poster ink, teal accent (pair with `.dk`) |
| `.dk` | — (a scope) | forces dark-block ink + teal accent + `rgba(255,255,255,.05)` surfaces |
| `.tl` | teal `#25E2CC` | teal-deep ink, navy accent; chips become solid navy |
| `.gd` | gold `#FBCA18` | gold-deep ink, navy accent; chips become solid navy |
| `.lw` | white | paper ink, navy accent, teal brush behind tone words |

### Contrast (measured)

| Pair | Ratio |
|---|---|
| teal `#25E2CC` on night `#060D18` / on surface `#0D1829` | 11.9 / 10.9 |
| ink-3 `#8799AD` on surface `#0D1829` (smallest dark text) | 6.1 |
| navy `#003D5B` on white · white on navy | 11.6 |
| ink-3 `#566779` on white (smallest light text) | 5.8 |
| `#0D1A24` on gold · navy on teal · `#022320` on teal | 11.4 · 7.1 · 10.2 |
| status dark (`ok / warn / danger` on surface) | 9.8 / 8.8 / 6.6 |
| status light (`#11743A / #A34E00 / #C0262D` on white) | 5.9 / 5.8 / 5.9 |

Every text pair clears WCAG AA; keep it that way — never put teal text on white or gold text on white.

## Typography

| Role | Font | Spec |
|---|---|---|
| Display (`.dx`) | **Anton** 400, UPPERCASE | `letter-spacing:.005em; line-height:1`; each line a `<span>` block, `+.07em` between lines |
| `.dx-xl` hero | Anton | `clamp(64px, 8.4vw, 132px)` (hero banner `clamp(64px, 7.6vw, 124px)`) |
| `.dx-l` | Anton | `clamp(48px, 5.6vw, 88px)` |
| `.dx-m` | Anton | `clamp(36px, 3.8vw, 58px)`; section titles `clamp(36px, 3.6vw, 54px)` |
| `.dx-s` / `.dx-xs` | Anton | 30px / 22px — card and tile titles |
| Big numbers | Anton | KPI 64px/.9 (small unit 26px), section KPI 56px, glass stat 22–24px, float stat 30px |
| Eyebrow | **Barlow Condensed** 600 | 13px, `.14em`, uppercase, accent colour |
| Label / table head | Barlow Condensed 600 | 12px (`.lbl`) / 11.5px (`th`), `.12em`, uppercase, ink-3 |
| Nav / pill / chip | Barlow Condensed 600–700 | nav 15px `.09em`; pill 15px 700 `.09em`; chip 12px `.08em`; all uppercase |
| Card head | Barlow Condensed 700 | 18px `.08em` uppercase; node/step titles 15px `.06em` |
| Body | **Inter** 400 | 15px/1.55; lede 17px/1.6, `max-width:56ch`, ink-2 |
| Numbers, ids, meta | **JetBrains Mono** | 11–13px, `tabular-nums`; section index `500 13px`, source lines `500 11.5px` |

**The two-tone headline** is the signature: 2–3 short lines, the last one (or the last phrase) in `.tone`.

```html
<h1 class="dx dx-xl"><span>How scoring</span><span class="tone">works.</span></h1>
<h2 class="dx sc-h2"><span>From answer</span> <span class="tone">to decision.</span></h2>
```

`.tone` = accent colour; in light mode `.tone::before` paints a teal brush stroke behind the words
(`left:-.12em; right:-.16em; top:.16em; bottom:-.02em`, masked by `--brush`). Section titles keep both phrases on
one line (`> span{display:inline}`); hero titles stack them. End the accent line with a full stop.

Fonts are **self-hosted woff2** (Latin subset): Anton 400, Barlow Condensed 400/600/700, Inter variable 100–900,
JetBrains Mono variable 100–800 — all OFL. No Google Fonts at runtime. The kit inlines them as base64.

## Layout

- Page `max-width:1360px`, side padding 40px (16px ≤ 760px). Body `overflow-x:hidden`.
- **Sticky header** 70px, `color-mix(in srgb, var(--bg) 90%, transparent)` + `backdrop-filter:blur(14px)`, hairline
  bottom border. Left: brand lockup (34px mark, Anton wordmark 27px `.04em`, "CONCENTRIX" in Barlow Condensed 11px
  `.16em` after a 1px divider). Middle: uppercase nav; the active item gets a **5px brush-stroke underline** in the
  accent (mask `--brush`). Right: theme toggle (round icon button), the gold or accent CTA pill, the avatar (navy disc
  with a 2px bg gap + teal ring).
- Main: `padding-top:36px; padding-bottom:96px`.
- **Section rhythm** — `section{margin-bottom:64px; scroll-margin-top:96px}`. Section head is a 3-column grid
  `auto | 1fr | .9fr`: mono index (`01`), then eyebrow + two-tone title, then the lede aligned to the bottom; a
  hairline under the whole head, 18px below it.
- **Grids**: 12-column `.g-12` with 20px gaps; two-up `.sc-two`; KPI rows 4–5 up with 14–16px gaps; seat / option
  rows 5 up with 12px gaps.

## Elevation & Depth

- Depth comes from **colour blocks and photography first**, a long soft shadow second. Only heroes, poster blocks,
  menus, flow nodes and dialogs carry `--shadow` / `--shadow-sm`; flat cards use a hairline border instead.
- Surfaces: page → `surface` cards (1px `--line` border) → `surface-2` wells/rows → `raised` menus/dialogs.
- **Dashed = not live / shadow mode**: dashed borders (1.5px `--line-2`) mark things that exist but aren't shown or
  decided yet (shadow nodes, shadow band, optional seats, quiet chips). Solid accent borders mark the live one.
- Glass appears **only on photographs**: stat pills and badges floating on a hero (`rgba(6,13,24,.62)`, blur 12px,
  1px `rgba(255,255,255,.14)`). Never glass on flat grounds.
- Grain is allowed at `.05` dark / `.035` light on poster grounds; no grid backgrounds.

## Components

**Pill buttons** (`.pill`) — 48px tall, `0 26px`, fully round, 2px border, Barlow Condensed 700 15px `.09em` caps,
18px icon gap 10px. Variants: `.gold` (primary — gold fill, gold glow `0 10px 30px -12px`), `.accent` (accent fill),
`.ghost` (transparent, `--line-2` border → accent on hover), `.act` (accent-soft fill + accent-line border, fills on
hover), `.danger` (outline in danger). Hover: lift `-1px` + a glow in the button's own colour. **One gold pill per
view.**

**Chips** (`.chip`) — 26px, round, 1.5px `--line-2` border, Barlow Condensed 600 12px caps. Tones `.ok .warn .danger
.acc`, `.quiet` (dashed, ink-3), `.solid` (ink fill). Used for statuses, filters, the section TOC (32px tall, 700 12px,
hover → accent-soft) and knockout/sample markers.

**Tags** (`.tag`) — 20px mini pills (700 10.5px `.1em`); `.ko` = solid navy "KNOCKOUT", `.fu` = accent soft.

**Glass stat pills** (`.glass`) on photos — round, frosted, Barlow Condensed label + Anton number 22–24px:
`18 RUBRIC ITEMS · 5·3·1 LEVELS · 5 PANEL SEATS`. A row of them sits under the hero lede (`.pb-stats`).

**Hero banner** (`.pbanner`, staff) — radius 32, `min-height:340px`, `padding:46px 52px 44px`, art at the right
(`right 38% / 62% auto`), a left-to-right fade from the ground (`--ag`) at 0–38 % to transparent at 80 % so the copy
always sits on solid ground. Copy: 56×6px accent `.rule`, eyebrow (`STAFF ONLY · JUDE EXPLAINED · AS OF 2026-10-15`),
two-tone `.dx` (`clamp(54px, 5.6vw, 86px)`), lede, glass stat row; a ghost pill bottom-right ("Calibration status
→"). Public/candidate heroes (`.hero`) are taller (`min-height:660px`), with gold + ghost CTA pills and a frosted badge
bottom-right.

**Summary poster block** (`.sc-sum.nv.dk`) — the "in one screen" block right after the TOC: navy, radius 32,
`padding:40px 44px`, two columns (`1fr | 1.15fr`): eyebrow + a 3–4 line two-tone Anton statement on the left; a 2×2
grid of steps on the right (each a `rgba(255,255,255,.06)` cell with a 38px teal icon disc, a Barlow Condensed caps
title and one sentence). A brush splash fades in the bottom-right corner at 35 % opacity.

**Section head** (`.sc-sh`) — see Layout. Optional `.sc-src` under a section: mono 11.5px source line with a file icon
(e.g. `ovai/engine/plan.py:24`), the page's way of citing where a claim comes from.

**Flow diagram** (`.sc-flow`) — up to 6 nodes on one row with 34px connector gaps. Node: radius 14, `surface`, 1.5px
`--line-2` border, `--shadow-sm`, a 34px accent-soft icon tile, mono step number top-right, Barlow Condensed caps title,
one muted line. Hover lifts `-2px` with an accent border and glow. Nodes that run in shadow are **dashed** and sit in a
dashed, diagonally hatched band with a caps label (`SHADOW · STORED, NOT SHOWN`). A 2px accent **bypass** line runs
under the row with an arrowhead and a pill label (`TODAY: JUDE'S PROVISIONAL RESULT GOES STRAIGHT TO THE RECRUITER`).
A one-line lock note follows.

**Cards** (`.card`) — `surface`, 1px `--line`, radius 22, padding 24; `.card-h` = Barlow Condensed 700 18px caps title
+ muted 13px sub. Two-up pairs: a **navy block card** (big Anton numeral `3` + caps label, body, stacked knockout
rows) beside a **list card** (`15 COMPETENCIES` head, a segmented category bar in accent/teal/gold/info with a
legend, then a 2-column numbered list with hairlines and mono indices).

**Level / option cards** (`.sc-lvc`) — radius 22, `surface`, 1px `--line`, a **4px top border** in the meaning
colour (accent = best, `--line-2` = middle, danger = worst); a big number square, caps title, muted sub, a status chip
right, then a quoted descriptor in ink-2.

**Seat / option comparison** (`.sc-seats`) — 5 columns of radius-22 cards, dashed `--line-2` by default; the live one
(`.anchor`) gets a solid 2px accent border and an accent-soft top gradient + a `LIVE · SHOWN` chip; the arbiter/
escalation one (`.arb`) gets a gold-tinted top gradient. Inside: mono seat number, caps role, muted lens line, a
definition list (MODEL / DEPLOYMENT / EFFORT / ITEMS / DATA ZONE), and an optional warn-soft note at the bottom.

**KPI tiles** (`.kpi`, `.sc-kpi`) — radius 22, min-height 168–170, label top (caps, muted), Anton number bottom
(56–64px, small unit in ink-3), one detail line. Variants: bordered surface, navy/night blocks (teal label, teal
number on night), and **one gold tile** per row for the headline figure.

**Colour-block tiles** (`.tile`) — mini posters: radius 22, `min-height:350px`, eyebrow, 44px Anton title with one
tone word, 2-line copy, a round image bleeding off the bottom-right, and a 46px round arrow button that nudges
`translateX(4px) rotate(-12deg)` on hover. Grounds `.nv .nt .tl .gd .bord`.

**Simulator / interactive panel** (`.sc-sim`) — a bordered card with a teal-tinted border: Anton head
(`VOTES → AGREEMENT → ESCALATION`), a sample-data warning chip top-right, preset chips (the active one solid ink),
input rows with 5/3/1 segmented toggles (selected = accent fill, disagreeing = danger fill), and a result panel on the
right with an accent border, caps eyebrow, Anton verdict and a definition list.

**Table** (`.tbl`) — 14px Inter; heads Barlow Condensed 600 11.5px `.12em` caps ink-3 with a `--line-2` rule; rows
14px padding with `--line` hairlines; clickable rows tint accent-soft and show a 3px accent inset bar on the left.

**Status text** (`.st`) — Barlow Condensed 700 12.5px caps with a leading 8px dot: unused = accent, started = info,
finished = ok, expired = warn, revoked = danger.

**Footer** (`.h-foot`, public pages) — night band, 4-column link grid, then a **giant outline wordmark** (Anton
`clamp(110px, 21vw, 300px)`, transparent fill, 1.5px teal stroke at 35 %) with a two-tone Anton tagline at its right.

**Brand** — 34px gold rounded square (`rx 9`) holding a navy speech-bubble ring with a teal dot; Anton wordmark; "CONCENTRIX" after a hairline. The
AI persona (**Jude**) is shown as a round headshot with a 2px teal ring; `.live` adds a pulsing outer ring. His name is
always title case ("Jude"); `JUDE` in caps is the staff-only scoring brand.

## Motion

Tokens: `--dur-1..5` = 120 / 200 / 320 / 520 / 900ms; `--ease-out:cubic-bezier(.16,1,.3,1)`,
`--ease-in-out:cubic-bezier(.65,0,.35,1)`, `--ease-spring` (a `linear()` overshoot, `cubic-bezier(.34,1.4,.64,1)`
fallback); `--rise:14px`, `--lift:-2px`, `--lift-sm:-1px`, `--press:.98`, `--stagger:60ms`. Only transform, opacity,
filter, clip-path, box-shadow and colours animate.

| Moment | Behaviour |
|---|---|
| Route enter | opacity-only fade, 320ms (never a transform on the page wrapper — it breaks `position:fixed` children) |
| Hero mount (`.hero-enter`, ≤ 1.2s) | rule grows from the left → eyebrow rises (60ms) → each headline line slides up inside its own clip window (`m-line-up`, 720ms, 120/210/300ms) → lede (340ms) → CTA (440ms) with **one** glow ring on the gold pill (640ms) → meta / glass stats (540ms) → badge pops (600ms) → brush art wipes in left-to-right (`m-wipe-in`, 900ms, 240ms) |
| Scroll reveal | `data-reveal`: fade + rise 14px once when it enters; `fade`, `grow-x`, `grow-y`, `draw` (SVG stroke) variants. Never replays on refresh |
| Stagger | `data-reveal-stagger`: direct children 60ms apart (index capped at 8); bars 40ms (cap 24) |
| Hover | pills lift 1px + coloured glow; nodes and cards lift 2px + accent border; tile arrow nudges and rotates; TOC chips lift 1px |
| Count-up | KPI and stat numbers count up on reveal with tabular figures (no width jitter); the final value is in an `.sr-only` twin |
| Live persona | 2.4s pulsing ring on the live avatar |

`prefers-reduced-motion: reduce` → all distances zeroed, every animation and transition instant, reveals shown at
once; only short opacity fades (≤ 200ms) survive.

## Imagery

- **Codex image generation only** (`codex_imagegen.py`, see `ferdz-global-ops`). Every image ships as a **dark/light
  pair** (`-dark` on a near-black navy ground, `-light` on clean white), referenced through one CSS variable that the
  theme swaps (`--img-<role>`).
- **Subject:** high-contrast advertising photography of **Filipino professionals** (recruiters, team leads, agents —
  warm, confident, real office or studio light) **or** bold glossy 3D objects (padlock, hourglass, chain link,
  trophy, chart), each **wrapped in expressive paint-brush strokes and splashes in teal, gold and navy**. No scoring
  claims, numbers or text in any image.
- **Prompt recipe:** "high-contrast advertising photograph of <subject>, <pose/action>, wrapped in expressive
  paint-brush strokes and splashes in teal #25E2CC, gold #FBCA18 and navy #003D5B, on a near-black navy #060D18
  ground (light variant: on clean white), subject on the right third, empty negative space on the left for headline
  copy, premium campaign look, no text, no logos".
- **Placement:** art sits on the right of banners and heroes and **feathers into the ground** (`.feather-left`
  gradient mask, or the hero's left-to-right shade) so copy never sits on the photo. Light-mode art may use
  `mix-blend-mode:multiply` on white.
- **Brush splashes** (`kit/assets/brush-dark.webp` teal+gold, `brush-light.webp` navy+teal+gold, alpha) can be used on
  their own: corners of navy blocks (35 % opacity), behind a hero figure, flipped (`.brush-art.flip`).
- **Jude** (the OVAI interviewer persona) belongs to OVAI only. Do not reuse his likeness on other projects; create
  that project's own subject instead.
- Meaningful `alt` text on every image.

## Plan-page anatomy (stand-alone HTML plans, briefs, explainers)

The worked example doubles as the template for "explain how X works / here's the plan" pages:

1. **Top bar** — brand lockup, section nav (optional), theme toggle, one CTA pill.
2. **Hero banner** — rule, eyebrow (`AUDIENCE · TOPIC · AS OF <date>`), two-tone title (≤ 3 words per line), a
   2–3 sentence lede that says what the reader gets, a row of 3–4 glass stat pills with the page's own key numbers,
   art on the right.
3. **Chip TOC** — one chip per section, anchors to `#ids`.
4. **"In one screen" navy block** — the whole answer in one two-tone statement + 4 steps.
5. **Numbered sections** `01…NN` — each a section head + one strong component (flow diagram, two-up cards, level
   cards, option comparison, KPI row, table, FAQ). Cite sources with `.sc-src` lines.
6. **Decision / next-steps block** — navy or gold block listing what is being asked, with the gold pill.
7. **Footer** — source note, date, owner; giant outline wordmark optional on public pages.

Every number on the page comes from the content (counts, dates, costs) — never invent a figure to fill a KPI tile.

## Do's and Don'ts

**Do**
- Set every headline in Anton caps, two-tone, short lines; end the accent line with a full stop.
- Let each block be a whole colour surface and use the block scopes (`.nv.dk`, `.tl`, `.gd`) so ink follows the ground.
- Keep one gold pill per view; everything else is accent, ghost or act.
- Use dashed borders for "shadow / not shown / optional", solid accent for "live".
- Keep dense tools calm: the same type and colours, but hairline cards, tables and chips — no brush art behind data.
- Design both themes; check light mode's brush highlight on every `.tone`.
- Keep text pairs at AA (table above); use `--ink-3` as the smallest text colour.

**Don't**
- No Vera Hub chrome inside: no ice-blue `#7FD4FF`, no Michroma, no blueprint grid, no glowing left rail.
- No The Drop palette: no magenta/orange gradient, no violet/cobalt/coral blocks, no Caveat Brush script, no rotated
  stickers or marquees — Concentrix colours only.
- No gradient text, no rainbow accents, no accent stripes on card edges.
- No glass on flat grounds (glass only floats on photography).
- No teal or gold text on white; no navy text on night.
- No brush art behind tables, transcripts or forms.
- No icons as decoration in place of photography; no stock illustrations, no emoji.
- No invented numbers on KPI tiles or glass stats.

## Responsive Behavior

| Width | Change |
|---|---|
| ≤ 1440 | header hides the user name (avatar only), nav items tighten to `0 9px`, `.06em` |
| ≤ 1180 | seat / option rows 5 → 3 up, KPI rows 4 → 2 up, flow-node descriptions hidden |
| ≤ 1100 | footer columns 2-up, dashboard KPI row 5 → 3 up |
| ≤ 760 | side padding 16px; header 60px, desktop nav replaced by a swipeable chip strip under the bar (active chip = solid ink), faded at the right edge; `.dx-l` 48px, `.dx-m` 38px; hero copy padding shrinks; flow nodes, seats and KPI rows stack; dialogs fill the width with stacked full-width pills |

Phone checks at **390 × 844**; desktop at **1440 × 900**. No horizontal page scroll at either; every control fully
on screen (a `scrollWidth ≤ innerWidth` check alone is not enough — see AI Navigator lesson 2026-10-08).

## Agent Prompt Guide

"Build it in Vera Bold" / "like the OVAI scoring page" / "the OVCC bold look" means:
- Night `#060D18` page (dark default) with a white/navy light theme, Concentrix navy / teal / gold only.
- Anton uppercase two-tone headlines (ink + teal; light = navy on a teal brush mark), Barlow Condensed caps labels and
  pills, Inter body, JetBrains Mono numbers.
- A photo banner hero with a rule, eyebrow, glass stat pills and art feathered in from the right.
- A chip TOC, a navy "in one screen" poster block, then numbered sections with mono indices.
- Whole colour blocks, pill buttons with one gold primary, round chips, dashed = shadow / solid accent = live.
- Paint-brush splashes around photography and as the active-nav underline.
- For a stand-alone page start from `kit/template.html`; for an app start from the OVAI `styles/` folder (load order
  `fonts → tokens → base → components → shells → app → motion → pages/*`).

## Relationship to other entries

- [`vera-hub`](../vera-hub/DESIGN.md): the console system (Corp Dark / Corp Light) used by the AutoAlchemy Hub and
  Vera AI apps, and the **default** for Ferdz's HTML deliverables. Vera Bold borrows its page structure (sticky bar,
  numbered section heads) but none of its look. Use Vera Bold only when it is asked for by name or the work belongs to
  OVAI/OVCC. Note: Vera Hub's `data-skin="ovcc"` **signature layer** is the *Transmutation* typography (Michroma,
  hollow numerals) — a different thing despite the name.
- [`the-drop`](../the-drop/DESIGN.md): the parent language (bold ad campaign) in its own magenta/orange palette for the
  Hub Marketplace. Never mix the two palettes.
- [`vera-transmutation`](../vera-transmutation/DESIGN.md): leadership plan pages with a transmutation-circle hero and
  3D renders on Vera Hub Dark — quieter, more cinematic; Vera Bold is louder and photographic.
- [`autoalchemy`](../autoalchemy/DESIGN.md): retired warm-paper review look; unrelated.
