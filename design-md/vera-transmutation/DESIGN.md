---
version: 1.0
name: Vera-transmutation
description: "Vera Transmutation is the leadership-page art direction built on the Vera Hub design system (Corp Dark only). It turns a plan, design proposal or brief into a cinematic single page that makes an executive stop scrolling: an animated SVG transmutation-circle hero, hollow outlined section numerals, feathered dark 3D renders with registered SVG motion overlays, charts built only from figures on the page, a slow fact ticker, an aurora background and a finale band that ends on the decisions. One signature motion per area, everything else calm. Ships as one self-contained HTML file (images inlined) gated by a measured rubric (pass ≥ 85/100). First built for the OVCC in-house AI interviewer design (2026-10-02, rubric 86)."

extends: vera-hub
theme: corp-dark            # dark only — the renders are dark; no theme switch

colors:
  # Inherited from vera-hub Corp Dark (do not redefine; listed for quick reference)
  canvas: "#010D16"
  card: "#04141F"
  card-hi: "#0A2233"
  text-0: "#DCEEF9"
  text-1: "#B9D2E0"
  text-2: "#9FC2D6"
  text-3: "#7FA3B8"
  accent: "#7FD4FF"
  accent-2: "#A5E2FF"
  warn: "#E8B54D"
  crit: "#E8434A"
  # Transmutation additions
  grad-1: "#7FD4FF"          # ice
  grad-3: "#6CDCFF"          # cyan
  grad-2: "#AAA6FF"          # lavender — the one non-Vera hue, used only inside the signature gradient
  grad: "linear-gradient(120deg, #7FD4FF 0%, #6CDCFF 45%, #AAA6FF 100%)"
  num-stroke: "rgba(127,212,255,.28)"     # hollow numerals
  glass: "linear-gradient(180deg, rgba(12,38,56,.72), rgba(4,20,31,.52))"
  glass-stroke: "rgba(255,255,255,.10)"
  grid-line: "rgba(127,212,255,.05)"

typography:
  display: "Michroma 400 — h1 clamp(34px,4.6vw,56px)/1.04, -0.02em; section numerals 88px hollow"
  heading: "Inter 600 — h2 clamp(26px,2.3vw,34px)/1.28; h3 16px/1.35"
  body: "Inter 400 15px/1.6, ≤ 72ch"
  data: "JetBrains Mono — every number, label, pill, eyebrow, caption, table header; tabular-nums"

spacing: "4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 96 px (--s1…--s9); section gap 96 px"
motion-ease: "cubic-bezier(.22,1,.36,1)"

kit: "./kit"                 # starter skeleton, build + gate scripts, generic renders
reference: "~/Work/Concentrix/ovcc/docs/reviews/src/2026-10-02-ovcc-ai-interviewer-design.src.html"
rubric: "./rubric.md"
---

# Vera Transmutation

## 1. What it is, and when to use it

**Vera Hub** (`design-md/vera-hub`) is the design system — tokens, cards, type, the Hub's look.
**Vera Transmutation** is an *art direction on top of it* for one kind of artefact: a **leadership-facing
single page** — a plan, design proposal, decision brief, programme review — that has to impress before it
informs, and then inform without friction.

The idea in one line: *raw inputs go in, an ordered result comes out.* The AutoAlchemy "transmutation" —
chaos → engine → order — is visible in the hero circle, the renders (shards becoming tiles, a waveform
becoming a scorecard) and the page arc itself (problem → design → evidence → decision). It must read as
engineered, never as fantasy: no runes, no gold, no smoke.

Use it for: executive plan pages, design proposals sent for sign-off, programme/portfolio briefs, launch
one-pagers that live as HTML. Do **not** use it for: working dashboards, app UI, dense audit reports, docs
people come back to daily (use plain Vera Hub), or anything that must ship in Corp Light.

## 2. Non-negotiables (owner calls, 2026-10-02)

1. **Dark only** (`data-theme="corp-dark"`, no theme toggle). The 3D art is dark.
2. **One signature motion per area; nothing crawls by default.** No always-on crawling/comet borders.
   A crawl is allowed only on hover of a content card. (Owner corrected this three times.)
3. **Hollow outlined section numerals** (`.snum`, Michroma, 1 px stroke `--num-stroke`, transparent fill).
4. **The hero is the animated SVG transmutation circle**, not a 3D render.
5. **Images blend — no hard rectangles.** Floating renders get feathered edges (mask on all four sides).
   A frame is used only where the frame itself means something.
6. **Static renders are brought to life** with registered SVG overlays (flow dashes, particles, scan lines,
   markers) aligned to objects in the picture — never generic sparkle on top.
7. **Charts use only numbers that appear in the page text.** No invented data, no decorative charts.
8. **Content is verbatim.** The approved content snapshot must survive every visual round (gate G1).

## 3. Page anatomy (top to bottom)

| # | Block | Kit class / id | Notes |
|---|---|---|---|
| — | Atmosphere | `.bg-aurora` (img), `.blobs`, `.atmos` | Fixed aurora render drifting 40 s; three blurred gradient blobs at 9 % opacity; 48 px grid + film grain overlay. |
| — | Shell | `.frame` | Vera Hub floating shell: max 1520 px, radius 28, shell shadow. Goes edge-to-edge ≤ 768 px. |
| 0 | Top bar | `.topbar`, `.brand`, `.progress` | Monogram tile + Michroma name + mono sub; Export PDF as `.btn.primary`; 2 px gradient scroll-progress line along the bottom. |
| — | Sidebar | `.sidebar`, `.nav`, `.readout` | Sticky 240 px rail: grouped section links with mono counters, glowing active bar, a live readout (current section · % read). Collapses to 68 px icons ≤ 1024, hidden ≤ 768. |
| 1 | Hero | `.hero`, `.hero-copy`, `.hero-stage`, `.transmuter` | Left: mono eyebrow, Michroma h1 with one `.grad` phrase, lede, `.pills` (one `.hot`). Right: the transmutation circle — two counter-rotating rings, 60-tick ring (every 5th long), orbiting nodes with labels, a core. |
| 2 | KPI rail | `.rail`, `.kpi` | Four raised tiles: mono label, 32 px count-up value with accent glow, one-line sub, 2 px glowing base bar. First tile `.kpi-lead`. |
| 3 | Fact ticker | `.marquee`, `.marquee-track` | Mono uppercase facts, 72 s loop, edge-faded, pauses on hover. The only text that moves. |
| 4… | Sections | `section#sN` › `header.shead` (`.snum` + `.shead-txt`) | 96 px apart with a gradient hairline divider. Header = hollow numeral + mono eyebrow + h2 (one `.sec-grad` word allowed) + one-paragraph lede. |
| — | Section bodies | `.card`, `.grid2`, `.alert(.warn)`, `.table-wrap`, `.steps`, `.diagram`/`.lane`/`.conn`, `.timeline` | Vera Hub components; glass (`--glass`) for chips, lanes and decision cards. |
| — | Figures | `.fig` › `.fig-frame` + overlay SVG + `.figcap` | Feathered render + registered overlay + mono caption. See §5. |
| — | Charts | `.chart` (`.ctitle`, `.csub`), `.charts2`, `.gauges`, `.tier`, … | See §6. |
| n | Finale | `.finale`, `.decisions`, `.decision`, `.needs` | Border-hot panel with outer glow; the finale render on the left third; decisions as numbered glass cards with hollow `.dnum`; one "⚠ NEEDS YOU" chip. |
| — | Closing band | `.closing` | Quiet sign-off line + owner/date in mono. |

Section order follows the argument, not the template: **thesis → architecture → how it works → evidence →
plan/phases → cost → risks → alternatives → decisions.** Every page ends on what the reader must decide.

## 4. Motion system

**Allow-list (the only infinite animations permitted, gate G6):** hero rings / ticks / orbits / node pulse;
figure overlays (flow dashes, particles, scan, progress arcs) *only while on screen*; diagram connector
dashes; the fact ticker; the background aurora/blob drift (≥ 38 s periods). Everything else animates **once**:

- `.reveal` → fade + 14 px rise, 0.5 s, staggered 60 ms per sibling.
- KPI and gauge values count up once on reveal; bars and arcs draw once to their real final value.
- Hover: cards lift 2 px; nav items shift 4 px; content cards may run a 2.4 s gradient crawl on hover only.
- An `IntersectionObserver` pauses every off-screen CSS/SMIL animation; one rAF parallax loop runs only
  while a figure is visible.
- `prefers-reduced-motion: reduce` → zero running animations, everything visible, final values shown.

## 5. Imagery

**Generator:** Codex image generation (EP standard since 2026-09-27; fal `openai/gpt-image-2` as fallback) — `~/Brain/scripts/codex_imagegen.py --items items.json` (1672×941
figures, 1920×1080 background). Downscale to JPEG (≈ 120–190 KB each) before inlining.

**Prompt recipe** (keep every clause; swap only the subject):

> Premium [3D isometric / abstract 3D] illustration for a technical web page about **[subject]**. On a deep
> navy void (#010D16), **[the transformation: inputs → glass engine/prism/core → orderly tiles/stack]**.
> Ice-blue (#7FD4FF) light conduits [with soft lavender #AAA6FF accents], tiny particles flowing left to
> right, floating translucent glass objects. Soft volumetric light, subtle reflections, white highlights only,
> crisp edges, generous negative space [on the left third for overlaid text], cinematic, like a flagship
> launch page. Cool navy and ice-blue palette only. **No text, no letters, no numbers, no logos, no people,
> no faces.**

Generic renders shipped in `kit/assets/`: `bg-aurora.jpg` (background) and `finale-gate.jpg` (five glass
steps to a gateway of light — fits any decision finale). Topic figures (process map, mechanism, layer) are
generated per page.

**Blending:** `.fig-frame` masks all four edges (horizontal 9 %/91 %, vertical the same) so the render melts
into the canvas; no border, radius or shadow. **Overlays:** an absolutely positioned SVG with the render's
own `viewBox` (e.g. `0 0 1672 760`), so dashes, rings and labels stay registered at every width; labels are
mono chips (`.pm-label`) placed in percentages; on phones labels drop to numbered dots with a legend.

## 6. Data visualisation

- Only numbers stated in the page text; every chart has a mono `.ctitle` and a one-line `.csub` saying what
  to read from it.
- Encodings used so far: coverage **donut gauges** (`.gauge`, 12 px stroke on a hatched track, gradient
  progress), **tier bars** with a gap bracket (`.tier`), a **waffle** for "1 in 306"-type rarities
  (`.channel` dots), **range bars** for cost estimates on a shared axis (`.cost-row`), a **latency gauge**
  with p50/p95 marks, and **gate thresholds** as a dotted-leader list (not a chart when a list is clearer).
- Gradient fills (`--grad`) for the measured value; `--line-2` for tracks; `--warn` only for the one thing
  that should worry the reader.
- Animate once into the correct final state; the final state is also the no-JS and reduced-motion state.
- Chart values are CSS custom properties in the kit (`.g-off{--off}` = 339.29 × (1 − value), `.tf-*{--w}` 0–1);
  update them with the text — the skeleton's sample figures are placeholders.

## 7. Responsive and print

Designed and gated at **1440, 1024, 768, 390 px**. Hero stacks with the circle first (≤ 1100); KPI rail
4 → 2 → 1; steps lose their connector ≤ 1100; tables scroll inside `.table-wrap` with an edge hint; no page
overflow at any width (gate G4). Print: white background, ink text, all reveals shown, no shadows/blur.

## 8. Build pipeline

1. **Content first.** Write/approve the page text; freeze it as `content.md` (or the approved HTML). Snapshot
   it: `python3 kit/scripts/snapshot.py content.md lines.json`.
2. **Copy the skeleton** `kit/template.src.html` → `<page>.src.html`; replace the sample content block by
   block; keep class names (the CSS/JS hooks are the design).
3. **Renders.** Write `items.json` from the prompt recipe → Codex → JPEGs into `<assets>/`; reference them as
   `__IMG_<name>__` in the source.
4. **Build:** `python3 kit/scripts/build_page.py <page>.src.html <page>.html <assets>/` (inlines images as
   data URIs → one self-contained file, typically 0.8–1.3 MB).
5. **Gates:** `node kit/scripts/gates.mjs <page>.html lines.json <outDir>` — G1–G7 must PASS.
6. **Rubric round:** an independent critic scores `rubric.md` from the gate screenshots; fix the top five;
   repeat until **≥ 85** (target 90), no dimension < 7. Keep `rounds/round-N.md`.

Routing (Ferdz's stack): art direction, briefs and fix lists by Opus; implementation through `oc-exec`;
the orchestrator — never the executor — runs the browser gates.

## 9. Anti-patterns (each one cost a round)

- Always-on crawling borders "for impact" — one restrained signature beats many effects.
- A 3D render as the hero — the animated circle is the brand moment; renders support sections.
- Images in visible boxes; overlays that float near, not on, the object they annotate.
- Charts from numbers that aren't in the text; decorative charts.
- Executors self-verifying with headless screenshots (a 20-minute loop) — gates are the orchestrator's job.
- Counting animations without scrolling lazy elements into view (G6 false pass); full-page phone
  screenshots taller than ~16,384 px (Chromium repeats the header) — capture one viewport at a time.
- Duplicated headings (sidebar label + eyebrow + h2 saying the same thing); lines over 72ch.

## 10. Reference

Worked example (rubric 86, 2026-10-02): OVCC in-house AI interviewer design —
source `~/Work/Concentrix/ovcc/docs/reviews/src/2026-10-02-ovcc-ai-interviewer-design.src.html`, built
`…/docs/reviews/2026-10-02-ovcc-ai-interviewer-design.html`, rounds `…/docs/reviews/rounds/`. Client content —
read it for patterns, never copy its text.

## 11. App mode — use the Vera Hub signature layer

For a working app, do not apply this page spec. Use **`vera-hub` + its "Signature layer" section**
(`data-skin="ovcc"`), which is the tested adaptation of this language to an app — reference implementation Vera AI
Dashboards (2026-10-02). Differences from this page spec, by design: both themes (Corp Light has its own designed
gradient `#0A6FA8 → #1C9BD0 → #5B57D6`), section numerals 56px, the hero circle becomes a ring-gauge header core,
no 3D renders on working screens, and only the header core and the fact ticker move continuously.
