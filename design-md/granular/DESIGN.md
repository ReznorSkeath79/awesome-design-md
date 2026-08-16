---
version: alpha
name: Granular-design-analysis
description: "A warm-charcoal agent-workstation UI: near-black brown-tinted canvas (#121110), softly raised panels (#1A1918), hairline borders (#262322), and a single warm orange accent (#E8632A) spent only on the active thing. Chrome is quiet and rounded (8-12px) so the content — conversation, terminal output, live previews — is the only thing with contrast. Layout is a three-column workstation: a narrow icon rail of workspaces, a session list, and a tabbed work surface with an optional split preview. Type pairs a neutral grotesk for prose with a mono used structurally — uppercase letterspaced micro-labels, paths, keyboard shortcuts, and git state. Depth is flat: one surface step and a hairline, never shadows or glow. Status is carried by small colored dots, never by color alone."

colors:
  primary: "#E8632A"
  on-primary: "#FFFFFF"
  primary-hover: "#F4753D"
  primary-dim: "#A8481F"
  primary-wash: "rgba(232,99,42,0.12)"
  canvas: "#121110"
  rail: "#0E0D0C"
  panel: "#1A1918"
  panel-raised: "#232120"
  well: "#0E0D0C"
  line: "#262322"
  line-strong: "#35312F"
  ink: "#E9E6E2"
  ink-2: "#A39C95"
  ink-3: "#726B65"
  ink-4: "#4E4844"
  ok: "#5DD98A"
  warn: "#E8B33A"
  err: "#E8574A"
  info: "#5B9BF8"

typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.6px
  display-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.4px
  title:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.1px
  body:
    fontFamily: Inter
    fontSize: 13.5px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0px
  body-sm:
    fontFamily: Inter
    fontSize: 12.5px
    fontWeight: 400
    lineHeight: 1.6
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: 500
    letterSpacing: 1.4px
    textTransform: uppercase
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 11.5px
    fontWeight: 400
    lineHeight: 1.6
  kbd:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: 500

radius:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 999px

spacing:
  base: 4px
  scale: [4, 8, 12, 16, 20, 24, 32, 40, 56]
---

## Overview

Granular is the design language of a **workstation you live in all day**, not a
poster. Everything in the chrome is deliberately low-contrast — warm charcoals
separated by hairlines — because the only things that should pull the eye are
the model's answer, the terminal's output, and the live preview. It is the
opposite instinct to a brutalist system like Futura: no oversized display type,
no fluorescent field, no hard edges.

The warmth matters. The greys are brown-tinted (#121110, not #101010), which
keeps long sessions comfortable and makes the single orange accent feel like it
belongs to the same family rather than sitting on top of a neutral UI.

**The accent is a spotlight, not a paint.** Orange marks exactly one thing per
region: the active tab, the primary action, the workspace you are in, the branch
that is dirty. If two orange things compete in one view, one of them is wrong.

## Colors

### Accent
- `#E8632A` — the only accent. Active tab pill (border + text), primary button
  fill, active workspace ring, unsaved/dirty markers.
- `#F4753D` — hover on filled accent surfaces.
- `rgba(232,99,42,0.12)` — accent wash, for the active-row background behind
  orange text. Never use full accent as a large background.

### Surfaces — exactly three steps, plus a well
- `#0E0D0C` **rail / well** — the icon rail, and sunken things: inputs, code
  blocks, terminal.
- `#121110` **canvas** — the app background.
- `#1A1918` **panel** — cards, sidebars, the composer.
- `#232120` **raised** — hover and active rows inside a panel.

Never stack more than one step. Depth is a surface change plus a hairline, and
that is the whole system.

### Lines
- `#262322` hairline — the default separator, panel borders.
- `#35312F` strong — only where a control must read as interactive (input
  borders, segmented-control dividers).

### Text ramp
- `#E9E6E2` primary — answers, headings, values.
- `#A39C95` secondary — supporting prose, inactive tabs.
- `#726B65` tertiary — micro-labels, timestamps, shortcut badges.
- `#4E4844` disabled.

### Semantic
- `#5DD98A` ok / running · `#E8B33A` warning · `#E8574A` error ·
  `#5B9BF8` informational (quota and usage bars).

Status is a **dot plus text**, never color alone.

## Typography

**Two families.** Inter for anything a human reads as prose. JetBrains Mono used
*structurally*, not decoratively — it signals "this is a machine fact": paths
(`~/htmlpub`), keyboard shortcuts (`⌘T`), git state (`MAIN +3 ↓0`), micro-labels
(`INSTRUCTIONS & CONTRACTS`), token counts, model ids.

### Hierarchy
- **Display** 32/24px, weight 600, tight tracking — page titles only.
- **Title** 16px 600 — panel and card headings.
- **Body** 13.5px/1.65 — the default. Answers and descriptions.
- **Mono label** 10px, +1.4px tracking, uppercase, `ink-3` — section markers.
- **Mono data** 11.5px — paths, ids, counts.
- **Kbd** 10px mono in a 4px-radius `panel-raised` chip.

Headings are **small and weighted**, never large and loud. A section marker at
10px uppercase mono does more work here than a 40px display word, because the
content below it is what deserves the size.

## Shapes

Rounded, consistently:
- 6px — chips, kbd badges, small buttons
- 8px — buttons, inputs, session rows, tab pills
- 12px — panels, cards, the composer
- 16px — modals, the outer window
- 999px — status dots, count badges, toggles

No sharp corners anywhere. This is the single most recognizable difference from
the Futura systems and should never be mixed with them.

## Components

### Workspace rail (far left, 56px)
Vertical stack of rounded-square (12px) workspace avatars, 36px, each a flat
color fill with a letter or glyph. The active one carries a 2px accent ring and
full opacity; the rest sit at ~55% opacity. A `+` tile at the bottom of the
stack adds one. Settings and docs pin to the bottom.

### Session list (240-280px panel)
- Header: workspace name in **mono uppercase**, path beneath in `ink-3` mono.
- `+ New session` row with a `⌘T` kbd chip right-aligned.
- Rows: 8px radius, status dot + title (truncated) + `⌘1..⌘8` chip. Active row
  is `panel-raised`; children indent with a 1px guide line on the left.
- Footer: git branch in mono (`MAIN ⑂ +3 ↓0`) with a dirty dot, then a
  `PREVIOUS  50` count, then `⌘1-8 switch   Σ 22.6m`.

### Tab pills (work surface header)
Segmented, pill-shaped, 8px radius. Active = 1px accent border + accent text +
transparent fill. Inactive = no border, `ink-2` text. Shortcut hint (`⌘J`) rides
inside the pill at `ink-3`. A small dot on a tab means unread output there.

### Composer (bottom of the work surface)
A `panel` block with 12px radius holding a borderless input ("Ask for
anything…"), and **beneath it a toolbar row of chips**: `+` attach, the model
chip with its provider glyph, permission mode, effort (`⚡ high`), and the
working folder. Chips are 6px radius, mono, `ink-2`, with a `▾` when they open a
menu. A context meter sits at the far right as a thin bar plus percentage.

### Panels & cards
`panel` fill, 1px `line` border, 12px radius, 16-20px padding. Card titles are
16px/600 with an optional uppercase mono type-tag beside them. Cards get a
hover state of `line-strong` border — no lift, no shadow.

### Buttons
- **Primary** — accent fill, white text, 8px radius, 13px/500. Hover lightens.
- **Secondary** — transparent, 1px `line-strong` border, `ink` text.
- **Ghost** — no border, `ink-2`, hover to `ink` on `panel-raised`.
- Height 32px standard, 26px compact.

### Menus
`panel` at 12px radius, 1px `line`, 6px padding. Items 8px radius, icon + label
+ right-aligned meta in `ink-3`. The selected item gets the accent wash plus a
1px accent border — the one place a border and a fill combine.

## Do's and Don'ts

### Do
- Keep the chrome quiet; let output be the brightest thing on screen.
- Spend the accent once per region.
- Use mono to mean "machine fact" and Inter to mean "prose".
- Pair every status color with a word or a dot.
- Round everything, consistently, on the scale above.

### Don't
- Don't use shadows, glows, or gradients for depth — one surface step and a
  hairline is the entire vocabulary.
- Don't scale headings up to create hierarchy; use weight, tracking, and the
  mono label instead.
- Don't tint the greys cool. The warmth is the identity.
- Don't fill large areas with accent.
- Don't mix in Futura's sharp corners or volt — these systems are incompatible.

## Responsive Behavior

- **< 1200px** — the right preview panel collapses to a tab beside Chat and
  Terminal rather than splitting the surface.
- **< 900px** — the session list collapses into the rail; sessions become a
  dropdown in the work-surface header.
- **< 640px** — single column; the composer toolbar wraps to two rows and drops
  the folder chip first, the context meter second.
- Touch targets never below 32px; kbd chips hide below 900px since there is no
  keyboard to hint at.

## Known Gaps

- No light theme is specified. The system is dark-native; a light variant would
  need a fresh surface ramp, not an inversion of this one.
- Data-visualization colors beyond the four semantics are undefined; use the
  `info` blue as the series-1 anchor and extend with warm hues.
