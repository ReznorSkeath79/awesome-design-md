---
version: 1.0
name: Vera-trans-cnx
description: "Vera Trans CNX is the Vera Transmutation leadership-page art direction recoloured in Concentrix colours (Vera Hub CNX) and re-themed from glass crystals to an engineering blueprint ('Schematic'). Night canvas #060D18 with a fine blueprint grid, teal #25E2CC linework and accent, one navy #003D5B decision panel, gold #FBCA18 for the single primary action and single chart markers. The hero is an animated blueprint dial; renders are teal line-art exploded technical views; charts are instrument scales, compare bars and an uptime strip. Page anatomy, motion restraint, content-verbatim gate and the ≥ 85 rubric are inherited from vera-transmutation. First built for the Mac Studio use-cases brief to Kris and Max (2026-10-17, critic 75 → 83 → 88)."

extends: [vera-transmutation, vera-hub-cnx]
theme: cnx-dark              # dark only for presentation pages
motif: schematic             # chosen 2026-10-17 over Contour and Signal (options page in LocalETL docs/reviews)

colors:
  canvas: "#060D18"
  bar: "#0A1424"
  shell: "#0B1626"
  card: "#0D1829"
  card-hi: "#15273E"
  text-0: "#F2F6FA"
  text-1: "#BAC7D4"
  text-2: "#A1AFBF"
  text-3: "#8799AD"
  accent: "#25E2CC"          # teal: linework, accent, active states
  accent-2: "#7DEDE0"
  on-accent: "#022320"
  navy: "#003D5B"            # the one navy panel per page (finale / decisions)
  gold: "#FBCA18"            # ONE primary action per page + single chart/hero markers; never text on dark
  on-gold: "#0D1A24"
  grad: "linear-gradient(120deg, #25E2CC 0%, #7DEDE0 55%, #B8F5EE 100%)"   # teal-only; replaces ice→lavender
  num-stroke: "rgba(37,226,204,.30)"
  grid-minor: "rgba(37,226,204,.045) 1px, every 24px"
  grid-major: "rgba(37,226,204,.07) 1px, every 120px"
  status: "ok #4CD98A · warn #FF9F5A · crit #FF6F6F (from vera-hub-cnx)"

typography: "unchanged from vera-transmutation: Michroma display + hollow numerals, Inter prose, JetBrains Mono for every number/label; fonts inlined (no Google Fonts)"
kit: "./kit"
rubric: "../vera-transmutation/rubric.md (dimension 2 reads 'Vera Hub CNX navy/teal/gold' instead of 'ice-to-lavender')"
reference: "~/Work/Concentrix/LocalETL/docs/reviews/src/2026-10-17-mac-studio-use-cases.src.html"
---

# Vera Trans CNX

## 1. What it is

**Vera Transmutation's page, in Concentrix colours, with blueprints instead of crystals.** Use it when a leadership
page goes to Concentrix stakeholders (Kris, Max, ops leadership) and should look like a Concentrix artefact, not a Vera
or AutoAlchemy one. Everything structural (page anatomy, argument order, motion restraint, gates G1–G7, rubric ≥ 85)
comes from `../vera-transmutation/DESIGN.md`. This file only records what changes.

The idea in one line: **engineered, documented, dependable.** The transmutation metaphor (chaos → engine → order)
becomes a blueprint: systems drawn precisely, data paths traced, one gold point marking what matters.

## 2. What changes from Vera Transmutation

| Element | Vera Transmutation | Vera Trans CNX |
|---|---|---|
| Palette | Vera Hub Corp Dark, ice #7FD4FF, lavender gradient | Vera Hub CNX dark: night #060D18, teal #25E2CC, navy #003D5B panel, gold #FBCA18 single action |
| Gradient | ice → cyan → lavender | teal → light teal (`--grad`); no second hue |
| Hero | Transmutation circle (rings, pentagon of nodes, hex core) | **Blueprint dial**: dashed outer ring, 60-tick ring, solid ring, crosshair, dimension arc, square core with one gold dot, three labelled node chips on circuit traces with flowing dashes and one SMIL pulse dot |
| Background | `bg-aurora.jpg` render + blobs | CSS blueprint grid (24 px minor / 120 px major) + teal radial glow + recoloured blobs; no image |
| Renders | Glass objects, prisms, crystals, volumetric light | Teal line-art exploded technical views on a faint grid; one gold element; matte, no glass, no fog |
| Charts | Glass donut gauges, tier bars, waffle | Instrument scales (ticks, dotted leaders), compare bars (each pair on its own scale), shared-axis cost bars, **uptime strip** (segments + continuous waveform) |
| Primary action | Gradient button | Gold `Export PDF` (the one gold action) |
| Finale | Card + glass gate render | The one **navy panel** + blueprint steps-to-doorway render |

## 3. Render recipe (Codex image generation; keep every clause, swap the subject)

> Premium technical blueprint illustration for a corporate web page about **[subject]**. On a deep night-navy
> background (#060D18) with a faint fine blueprint grid, precise isometric line-art drawn in thin glowing teal
> (#25E2CC) strokes: **[objects, shown as an exploded technical view, connected by circuit-trace data paths with small
> square nodes]**, dimension lines and callout leader lines with empty ends. **[One element]** glows warm gold
> (#FBCA18). Flat vector-like linework, matte, crisp, no glass, no crystals, no prisms, no fog, no volumetric light.
> Generous empty negative space on the left third for overlaid text. Cinematic, like a flagship engineering launch
> page. Palette strictly night navy, deep navy (#003D5B) and teal, gold only as one accent. No text, no letters, no
> numbers, no logos, no people, no faces.

1672×941 figures; downscale to JPEG ≈ 100–200 KB (`sips -s format jpeg -s formatOptions 72 -Z 1400`). Kit assets:
`kit/assets/fig-two-machines.jpg` (desktop + laptop linked) and `kit/assets/finale-blueprint.jpg` (steps to a doorway)
are reusable; topic figures are generated per page. Overlays register to the render's own viewBox, as in the parent.

## 4. Motion

Same allow-list discipline as the parent (gate G6). Infinite animations only: dial rings/ticks (`spin`/`ring`),
trace dashes (`flow`/`dash`), the SMIL pulse dot (paused off-screen), the fact ticker (`marquee`), background drift.
Everything else runs once: reveals, count-ups, bars and the uptime strip growing to their final values.

## 5. Build

Use the parent's skill workflow (`~/.claude/skills/vera-transmutation`) with this entry's kit:
- `kit/scripts/build_page.py <src> <out> <assets>` inlines the images **and** the fonts (`__FONTS_CSS__`).
- `kit/scripts/gates.mjs` = the parent's G1–G7 sweep (allow-list unchanged).
- G1 line lists: generate from the *values* in the content file (the parent's `snapshot.py` keeps "Label:" prefixes
  and " · " table rows that never appear verbatim on the page).

## 6. Alternatives considered (2026-10-17)

Options page: `~/Work/Concentrix/LocalETL/docs/reviews/2026-10-17-vera-trans-cnx-options.html`.
- **Contour**: topographic teal contours and light streams; calmer, for strategy and portfolio briefs.
- **Signal**: light trails into a steady waveform; for reliability and SLA stories. Its uptime strip is part of
  this entry's chart set.

## 7. Worked example and lessons (2026-10-17, 75 → 83 → 88)

`kit/template.src.html` = the Mac Studio use-cases brief. What each round fixed, which is also what to get right first time:
- **Phone:** stack `.shead` (numeral above the text) at ≤ 600 px and keep the top bar on one row. Never position axis
  ticks with inline `style="left:…"`, because media queries can't override them. Bar-end value chips sit outside the
  track (`overflow:visible`), and inside the bar for values above ~90 %.
- **Uptime strip:** compare lanes (MacBook vs Studio), not one bar; gold is a single cut marker, not a segment.
- **Finale render:** keep it to the top-right of the navy panel, give the decision cards solid backgrounds, hide the
  render between 769 and 1099 px and below 768 px, and make card 3 span the row at 1024.
- **Hero dial labels:** ~15 SVG units at ≤ 1100 px and ~11.5 above.
