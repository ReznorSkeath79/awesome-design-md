---
version: alpha
name: Futura-design-analysis
description: "A Swiss-brutalist 'future data' poster language built on a cool light-gray canvas (#e6e8e9), pure black ink and panels (#000000), white blocks, and a single fluorescent volt accent (#dcfc52) sampled directly from the artwork. Composition is an asymmetric information grid: oversized neo-grotesque display words, dictionary-style definition entries with phonetics, mono data strings (coordinates, hex IDs, dates), wireframe polyhedra and globes, barcodes, checkerboards, halftone dot fields, waveforms, and chunky volt arrows. Depth comes from layering and outline-vs-fill contrast, never shadows. Corners are sharp; circles exist only as graphic geometry. Despite the name, the display voice is a Helvetica-style neo-grotesque, not the Futura typeface."

colors:
  primary: "#dcfc52"
  on-primary: "#000000"
  primary-dim: "#b8d944"
  canvas: "#e6e8e9"
  ink: "#000000"
  ink-inverse: "#e6e8e9"
  surface-white: "#ffffff"
  panel-black: "#000000"
  hairline: "#000000"
  hairline-soft: "#9aa19a"
  ramp-1: "#dce6dd"
  ramp-2: "#c6cfc6"
  ramp-3: "#b0b8b0"
  ramp-4: "#9aa19a"
  ramp-5: "#848a84"
  ramp-6: "#6e736e"
  ramp-7: "#585c58"
  ramp-8: "#424542"
  ramp-9: "#2c2e2c"
  ramp-10: "#161716"
  ramp-11: "#000000"
  cal-pink: "#cf4a6e"
  cal-rose: "#e3a8ab"
  cal-cream: "#f0e2c8"
  cal-sage: "#bcc5a4"
  cal-teal: "#8daa9f"

typography:
  display-giant:
    fontFamily: Futura Grotesk Display
    fontSize: 220px
    fontWeight: 700
    lineHeight: 0.90
    letterSpacing: -4.0px
  display-xl:
    fontFamily: Futura Grotesk Display
    fontSize: 144px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -2.9px
  display-lg:
    fontFamily: Futura Grotesk Display
    fontSize: 96px
    fontWeight: 700
    lineHeight: 1.00
    letterSpacing: -1.9px
  display-md:
    fontFamily: Futura Grotesk Display
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -1.3px
  headline:
    fontFamily: Futura Grotesk Display
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.10
    letterSpacing: -0.8px
  title:
    fontFamily: Futura Grotesk Text
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.4px
  phonetic:
    fontFamily: Futura Grotesk Text
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.30
    letterSpacing: 0
  body:
    fontFamily: Futura Grotesk Text
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  data:
    fontFamily: Futura Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0.5px
  caption:
    fontFamily: Futura Grotesk Text
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0.3px
  micro:
    fontFamily: Futura Grotesk Text
    fontSize: 9px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0.2px
  button:
    fontFamily: Futura Mono
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: 1.5px
  eyebrow:
    fontFamily: Futura Mono
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: 2.0px

rounded:
  none: 0px
  xs: 2px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  hero-word-block:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 16px 32px
  hero-word-inverse:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.primary}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 16px 32px
  mega-glyph:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.display-giant}"
    rounded: "{rounded.none}"
  dictionary-entry:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: 8px 0
  data-strip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: 8px 0
  bracket-id:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
  black-panel:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 32px
  white-block:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 32px
  button-primary:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 12px 24px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 12px 24px
  chip-barcode:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.primary}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: 8px 12px
  chip-checker:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.surface-white}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: 8px
  tag-coordinates:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: 4px 10px
  eyebrow-label:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.none}"
  swatch-ramp:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: 4px 0
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    height: 48px
  footer:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.primary}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: 48px 32px
---

## Overview

Futura is a **Swiss-brutalist "future data" poster language** distilled from NoSpoon Design's *FUTURE DATA LAYOUTS — Poster Bundle* artwork. The canvas is a cool light gray `{colors.canvas}` (#e6e8e9) — never pure white as the page base, never dark mode. On it sit three working surfaces: the gray canvas itself, solid **black panels** `{colors.panel-black}` (#000000), and **white blocks** `{colors.surface-white}` (#ffffff). The single chromatic force is **volt** `{colors.primary}` (#dcfc52), a fluorescent yellow-green sampled directly from the artwork's large accent fields.

The compositional grammar is an **asymmetric information grid**: oversized neo-grotesque display words ("INTERSECTION", "CONNECTION", "REIMAGINE") set tight and often bleeding off the canvas edge; dictionary-style entries pairing a word with its phonetic spelling and a micro-type definition; mono data strings — coordinates (`35°N 136°E`), hex IDs (`0X00000001214815FF`), dates (`21 / 0024 / 33 /41 /57`), bracketed indices (`[978]`, `[A]`, `[538]`); and technical ornament — wireframe polyhedra and globes, barcodes, checkerboards, halftone dot fields, sine waveforms, equalizer bars, crop marks, circled letters (® © ℗), and chunky volt arrows.

> **Naming note:** "Futura" here is the concept name. The display voice in the source artwork is a **Helvetica-style neo-grotesque** (Neue Haas / Helvetica Now class), *not* the geometric Futura typeface. See "Note on Font Substitutes."

**Key Characteristics:**
- **Light-gray canvas system** — `{colors.canvas}` (#e6e8e9) is the anchor; the artwork itself documents a full 11-step gray ramp (`{colors.ramp-1}` → `{colors.ramp-11}`) printed as a calibration strip.
- **One volt accent** (`{colors.primary}` #dcfc52) — hero word bands, mega-glyphs, arrows, coordinate tags. Never a second bright hue on the main canvas.
- **Dictionary-entry typography** — word + phonetic + micro definition is the signature text block.
- **Data as decoration** — coordinates, hex strings, dates, and bracket IDs are compositional elements, not metadata.
- **Sharp corners everywhere** — `{rounded.none}` 0px on every panel, button, and chip. Circles exist only as graphic geometry (rings, globes, dot fields).
- **Flat, layered depth** — no shadows, no gradients; hierarchy comes from black/white/volt panel contrast, outline-vs-fill, and overlap.

## Colors

> Source: sampled directly from the bundle artwork (7 reference posters, ~2190×1544px each). The gray ramp values are printed in the artwork itself as a calibration strip.

### Brand & Accent
- **Volt** ({colors.primary}): The single fluorescent accent — #dcfc52. Hero word bands, mega-glyphs ("C", "X", "1"), block arrows, coordinate tags, ring graphics.
- **Volt Dim** ({colors.primary-dim}): A muted volt (#b8d944) for secondary accent repetition when #dcfc52 would over-fire — small arrows, secondary markers.

### Surface
- **Canvas** ({colors.canvas}): Page/poster base — #e6e8e9, a cool light gray with a faint blue-green cast.
- **Surface White** ({colors.surface-white}): Pure white blocks laid on the canvas as composition slabs — definition panels, data plates.
- **Panel Black** ({colors.panel-black}): Pure black modules — inverse text panels, barcode chips, footer bands.
- **Hairline** ({colors.hairline}): 1px black rules and wireframe strokes.
- **Hairline Soft** ({colors.hairline-soft}): 1px gray (#9aa19a) strokes for secondary wireframes on gray.

### Gray Ramp (documented in-artwork)
An 11-step neutral ramp printed in the artwork as a swatch strip: `{colors.ramp-1}` #dce6dd → `{colors.ramp-2}` #c6cfc6 → `{colors.ramp-3}` #b0b8b0 → `{colors.ramp-4}` #9aa19a → `{colors.ramp-5}` #848a84 → `{colors.ramp-6}` #6e736e → `{colors.ramp-7}` #585c58 → `{colors.ramp-8}` #424542 → `{colors.ramp-9}` #2c2e2c → `{colors.ramp-10}` #161716 → `{colors.ramp-11}` #000000. Use for tonal layering, halftone density, and secondary text steps — not for new surface colors.

### Calibration Pastels (minor)
Small test-strip pastels appear as tiny color-calibration chips in corners: `{colors.cal-pink}` #cf4a6e, `{colors.cal-rose}` #e3a8ab, `{colors.cal-cream}` #f0e2c8, `{colors.cal-sage}` #bcc5a4, `{colors.cal-teal}` #8daa9f. These live **only inside swatch strips** — they are print-calibration vocabulary, not UI color.

### Text
- **Ink** ({colors.ink}): Pure black — all primary type on canvas and on volt.
- **Ink Inverse** ({colors.ink-inverse}): Light gray (#e6e8e9) type on black panels when volt isn't used.

### Semantic
- No semantic palette. Status is communicated with **symbols** (⚠ triangles, ✕ marks, arrows) in black or volt, never with red/green fills.

## Typography

### Font Family

- **Futura Grotesk Display** — the token name for the display voice: a Helvetica-class neo-grotesque (Neue Haas Grotesk Display / Helvetica Now Display class). Carries display-giant through headline. Always weight 700, uppercase for poster words.
- **Futura Grotesk Text** — the same family at text sizes. Carries title, phonetic, body, caption, micro.
- **Futura Mono** — a technical mono for data strings, eyebrows, and button labels. Uppercase with positive tracking.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-giant}` | 220px | 700 | 0.90 | -4.0px | Mega-glyphs — single letters/numbers bleeding off canvas |
| `{typography.display-xl}` | 144px | 700 | 0.95 | -2.9px | Poster-scale hero words ("CONNECTION") |
| `{typography.display-lg}` | 96px | 700 | 1.00 | -1.9px | Hero word bands ("INTERSECTION"), section openers |
| `{typography.display-md}` | 64px | 700 | 1.05 | -1.3px | Sub-section display words |
| `{typography.headline}` | 40px | 700 | 1.10 | -0.8px | Panel titles, CTA headings |
| `{typography.title}` | 28px | 700 | 1.20 | -0.4px | Bracket IDs, card titles |
| `{typography.phonetic}` | 18px | 400 | 1.30 | 0 | Phonetic spellings — `\|prəˈtekSH(ə)n\|` |
| `{typography.body}` | 16px | 400 | 1.45 | 0 | Readable body (rare — this system prefers data type) |
| `{typography.data}` | 13px | 400 | 1.50 | 0.5px | Mono data strings — coordinates, hex, dates |
| `{typography.caption}` | 11px | 400 | 1.40 | 0.3px | Captions, axis labels |
| `{typography.micro}` | 9px | 400 | 1.35 | 0.2px | Dictionary definitions, fine print |
| `{typography.button}` | 13px | 700 | 1.20 | 1.5px | Button labels — mono, uppercase, tracked out |
| `{typography.eyebrow}` | 12px | 700 | 1.30 | 2.0px | Section eyebrows — mono, uppercase, wide tracking |

### Principles

- **Display is always 700 and usually uppercase.** Lowercase appears only in phonetics and micro definitions.
- **Tight negative tracking scales with size** — from -4.0px at 220px down to 0 at body. Mono eyebrows and buttons invert the logic with **positive** tracking (+1.5 to +2.0px), marking them as machine layer.
- **The dictionary entry is the signature block**: word (display) → phonetic (`{typography.phonetic}`, pipe-delimited) → definition (`{typography.micro}`, hyphenated, justified-left).
- **Data strings are display elements.** A line like `41.0514W 28.7895N` or `0X00000001214815FF` sits in the composition with the same status as a headline.
- **Type rotates.** Vertical settings (rotated 90°, e.g. "REIMAGINE" running down a margin) and circular-path settings (text on a ring) are first-class citizens.
- **Micro type is intentional.** 9px definition text is a texture — it should be present and legible-up-close, not enlarged for comfort.

### Note on Font Substitutes

The source artwork uses a Helvetica-class neo-grotesque. Recommended free substitutes: **Inter Tight** (700, tracking -2%) or **Archivo** / **Archivo Expanded** for the display voice; **Helvetica Neue** / **Arial** as system fallbacks. For the mono layer, **Space Mono**, **JetBrains Mono**, or **IBM Plex Mono** (400/700) match the technical character. Do **not** substitute the geometric Futura typeface — its circular forms contradict the artwork's grotesque voice.

## Layout

### Spacing System

- **Base unit**: 4px.
- **Tokens (front matter)**: `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- Panel interior padding: `{spacing.xl}` 32px on black/white modules; word bands pad 16px vertical · 32px horizontal.
- Buttons pad 12px vertical · 24px horizontal.
- Data strips separate with 1px `{colors.hairline}` rules and `{spacing.xs}` 8px gaps, not whitespace alone.

### Grid & Container

- Composition runs on a **visible Swiss grid** — asymmetric, with elements deliberately crossing column lines.
- Posters are landscape ≈1.42:1 (2190×1544). For web sections, treat the viewport as the poster: full-bleed compositions with content anchored to grid intersections.
- Elements **bleed off edges** — mega-glyphs, volt fields, and black panels crop at the canvas boundary.
- Layering order (back → front): dot fields / wireframes → volt fields and mega-glyphs → white/black panels → word bands → data strips and crop marks.

### Whitespace Philosophy

The gray canvas is the breathing room — large empty gray fields are part of the composition, not wasted space. Cluster information densely in 2–3 zones and leave the rest empty. Never distribute content evenly.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow, no border | Default — all type and graphics sit flat on canvas |
| 1 (block contrast) | `{colors.surface-white}` or `{colors.panel-black}` slab on canvas | Definition panels, data plates, footer bands |
| 2 (volt field) | `{colors.primary}` fill behind/through type | Hero word bands, mega-glyphs, arrows |
| 3 (overlap) | Element crossing panel boundaries, 1px outline over fill | Wireframes over volt fields, type crossing black/white seams |

Depth is **collage-flat**: overlap, scale contrast, and outline-vs-fill. No drop shadows, no blur, no gradients, no glass.

### Decorative Depth

- **Halftone dot fields** — regular and radial dot grids as background texture.
- **Wireframe geometry** — 1px-stroke polyhedra (icosahedron, dodecahedron, pyramids) and lat/long globes, black on canvas or volt on black.
- **Sine waveforms and equalizer bars** — horizontal rhythm elements between text blocks.
- **Crop/registration marks** — corner brackets and circle-in-square targets at composition edges.
- **Checkerboard chips** — small black-and-white checker squares as accents.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Everything — panels, buttons, chips, bands, inputs |
| `{rounded.xs}` | 2px | Almost never; only if a hairline-softened corner is unavoidable |
| `{rounded.full}` | 9999px | Only as pure geometry — rings, globes, dot fields, circled letters. Never as a component corner |

### Iconography & Graphic Geometry

- **Mega-glyphs**: single letters or numerals at `{typography.display-giant}` scale — volt fill or 1px black outline, cropped by the canvas edge ("C", "X", "1", "R").
- **Block arrows**: chunky geometric arrows in volt, 8–16px shaft weight, pointing across the composition to link zones.
- **Wireframe solids**: thin-stroke polyhedra and spheres — always 1px stroke, never filled.
- **Barcodes / QR chips**: black barcode strips and square code chips, often paired with a mono ID string.
- **Circled marks**: ® © ℗-style circled letters placed like annotations around display words.
- **Bracket IDs**: `[978]`, `[A]`, `[538]` — square-bracketed indices at `{typography.title}` scale.
- **Swatch ramps**: horizontal color strips with hex values labeled in `{typography.micro}` — the system's self-documentation motif.
- **Symbol strings**: runs like `% ‰ ↑↗→↘↓↙←↖ ↔↕ ◊ @ &` as decorative data noise.
- **Ring text**: type set on a circular path around a central figure.

## Components

### Word Bands & Glyphs

**`hero-word-block`** — The signature move: a volt band carrying a black uppercase display word.
- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.display-lg}`, padding 16px 32px, rounded `{rounded.none}`. The band hugs the word's cap height; it may run full-bleed.

**`hero-word-inverse`** — Black band with volt word. Used sparingly for contrast against a volt-heavy zone.
- Background `{colors.panel-black}`, text `{colors.primary}`.

**`mega-glyph`** — Oversized single character as pure graphic.
- Type `{typography.display-giant}` in volt fill or 1px `{colors.hairline}` outline on `{colors.canvas}`. Always crops at least one edge.

### Text Blocks

**`dictionary-entry`** — word + phonetic + definition.
- Structure: `{typography.headline}` word, `{typography.phonetic}` phonetic in pipes, `{typography.micro}` definition with manual hyphens. Separated from neighbors by 1px `{colors.hairline}` rules.

**`data-strip`** — a horizontal run of mono data.
- Type `{typography.data}`: coordinates, hex IDs, dates (`21 / 0024 / 33 /41 /57`), separated by generous gaps or thin rules. Sits at panel edges like instrumentation.

**`bracket-id`** — `[978]`-style index marker.
- Type `{typography.title}`, black, square brackets included literally in the text.

### Panels

**`black-panel`** — solid black module.
- Background `{colors.panel-black}`, text `{colors.primary}` (volt) or `{colors.ink-inverse}`, padding 32px, rounded `{rounded.none}`. Carries inverse type, white/volt wireframes, and barcode chips.

**`white-block`** — pure white slab on the gray canvas.
- Background `{colors.surface-white}`, text `{colors.ink}`, padding 32px. Used for definition plates and data readouts that need to lift off the gray without going black.

### Buttons

**`button-primary`** — black rectangle, volt label.
- Background `{colors.panel-black}`, text `{colors.primary}`, type `{typography.button}` (mono, uppercase, +1.5px tracking), padding 12px 24px, rounded `{rounded.none}`.

**`button-primary-hover`** — state inversion: volt fill, black label.

**`button-secondary`** — canvas-gray with 1px `{colors.hairline}` border, black label.

### Chips & Tags

**`chip-barcode`** — barcode strip with mono ID beneath, on black.
- Background `{colors.panel-black}`, text `{colors.primary}`, type `{typography.data}`, padding 8px 12px.

**`chip-checker`** — small checkerboard square, 8px padding, black ground.

**`tag-coordinates`** — volt chip carrying a mono coordinate or ID string.
- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.data}`, padding 4px 10px.

### Labels

**`eyebrow-label`** — mono uppercase eyebrow, +2.0px tracking, often prefixed with a bracket ID or index number.

**`swatch-ramp`** — horizontal strip of color chips with hex labels in `{typography.micro}`. Use the gray ramp tokens; pastels (`{colors.cal-*}`) allowed only inside this component.

### Navigation & Footer

**`top-nav`** — 48px bar on `{colors.canvas}`, mono `{typography.data}` links, bracket-ID logo lockup left, coordinates/clock string right.

**`footer`** — black band, volt mono type, dense data-strip layout: IDs, coordinates, hex strings, copyright line in `{typography.micro}`.

## Do's and Don'ts

### Do

- Anchor every composition on `{colors.canvas}` (#e6e8e9) — the cool gray is the system's identity.
- Use volt (#dcfc52) as the **only** bright accent, at large scale: bands, glyphs, arrows, rings.
- Set display type uppercase, weight 700, with aggressive negative tracking.
- Write real data into the design: coordinates, hex IDs, dates, bracket indices — invented but plausible.
- Keep every corner at 0px. Let circles exist only as geometry.
- Layer flat: overlap panels, cross wireframes over volt fields, crop glyphs at edges.
- Include at least one dictionary entry and one data strip per major section.
- Rotate one text element 90° in large compositions.

### Don't

- Don't ship a dark-mode page — the system is light-gray-first; black is a panel, not a canvas.
- Don't introduce a second bright hue (no cyan, magenta, or orange accents). Pastels stay inside swatch ramps.
- Don't round corners, add shadows, gradients, blur, or glassmorphism.
- Don't use the Futura typeface — the voice is a Helvetica-class grotesque.
- Don't enlarge micro type for comfort; 9px definitions are texture.
- Don't center everything — the grid is asymmetric by design.
- Don't fill wireframe geometry — 1px strokes only.
- Don't use pill buttons or rounded chips.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop-XL | 1440px | Full poster composition; mega-glyphs bleed edges |
| Desktop | 1280px | Grid holds; display-xl scales 144px → 112px |
| Tablet | 1024px | Layered zones stack into 2 columns; vertical text rotates back to horizontal |
| Mobile-Lg | 768px | Single column; word bands go full-bleed; data strips wrap to 2 lines |
| Mobile | 480px | Display-xl scales to ~56px; mega-glyph becomes a 40vw element; micro type holds at 9px |

### Touch Targets

- Buttons hold ≥44px tap height on touch viewports (grow padding, keep the sharp rectangle).
- Data-strip links pad to ≥36px on touch.

### Collapsing Strategy

- **Layered collage → stacked bands**: on narrow viewports, overlapping zones un-layer into sequential black / white / volt bands.
- **Rotated type → horizontal** below 1024px.
- **Wireframe figures** scale down proportionally; dot fields may drop below 768px to reduce noise.
- **Data strips** wrap; never truncate the strings — the data is the decoration.

### Image Behavior

- Mega-glyphs and volt fields always bleed to the viewport edge; never letterbox them inside a card.
- Wireframes keep 1px strokes at all sizes (use vector, not raster).

## Iteration Guide

1. Start every section by choosing its surface: canvas, `white-block`, or `black-panel`.
2. Place ONE dominant move per composition — a volt word band OR a mega-glyph OR a black panel cluster, not all three.
3. Write the data strings before laying out: coordinates, IDs, dates are structural.
4. Reference components by their `components:` token names.
5. Add at least one 1px hairline rule system per panel — instrumentation lines, not dividers for their own sake.
6. Run `npx @google/design.md lint DESIGN.md` after edits.
7. Keep volt scarce but bold: one large volt moment beats ten small ones.

## Known Gaps

- Volt (#dcfc52), canvas (#e6e8e9), black, and white were sampled programmatically from the artwork; the gray ramp values are printed in the artwork itself. The calibration pastels (`cal-*`) were read from small swatch strips at low resolution — treat them as ±5% approximations.
- The source is a static poster bundle; interactive states (focus rings, disabled, error) are extrapolated: use a 2px black outline for focus, `{colors.ramp-4}` text for disabled, and ⚠ symbol + black text for errors.
- The exact display typeface in the artwork is unidentified; the Helvetica-class substitute guidance is inferred from letterforms.
- No dark-mode variant exists in the source material; `black-panel` inversion is the documented "dark" expression.
- Motion is undocumented. If animated, match the print vocabulary: hard cuts, 1px stroke draws, and stepped (non-eased) data ticks.
