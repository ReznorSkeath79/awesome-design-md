# Vera Hub · CNX — page kit

A **self-contained, offline HTML page kit** in Vera Hub CNX (Vera Hub structure, Concentrix colours). The worked
page is **"Northwind Ops — rollout plan"**: fictional sample content for a twelve-week, three-site rollout, in every
section type the Cluster Cherry plan page used. One `<style>`, one `<script>`, no requests at all: the build
inlines the fonts and the token layer, so the page opens from `file://` with the network off.

Type (revised 2026-10-21): Montserrat for the title, headings, numbers and labels, **Pulse Sans** for reading text
(the machine's own Calibri first, else Carlito inlined as base64, both at one fixed `size-adjust`: Regular 111%, Bold
109.5%, the same `@font-face` rules Vera AI Pulse ships), Michroma only for the hollow numerals. No
`font-size-adjust`. See [`../DESIGN.md`](../DESIGN.md#typography).

Both themes ship. **CNX Dark is the default**; the tool-tray button flips to CNX Light and remembers the choice
(`localStorage` key `vera-hub-cnx-theme`).

## Quick start

1. **Copy the template.** `cp kit/template.src.html my-page.src.html` (edit the `.src.html`, never the built file).
2. **Replace content block by block, keeping the class names.** The block list is commented at the top of the
   template. Keep one accent phrase per title in `<em>`.
3. **Recount.** Every tile, rail count, chip and the ring core must trace to the rows under them (the template's
   numbers all do: 7 requests, 2/4 built, 3/8 ready, 2/5 gates, week 5 of 12). The ring core's comment shows the
   dash-offset arithmetic.
4. **Build:**
   ```bash
   python3 kit/scripts/build_page.py my-page.src.html my-page.html            # fonts + tokens
   python3 kit/scripts/build_page.py my-page.src.html my-page.html shots/     # + screenshots
   ```
   It prints the output size, exits 1 if a font or placeholder is missing or if the output would make a request
   (a network URL, `@import`, or a `url()` / `src=` that is not a `data:` URI) or if the page uses `font-size-adjust` or
   `font: … !important`. Open the result in Chrome (`open -a "Google Chrome" my-page.html`).

## How it is built

| Placeholder | Filled with |
|---|---|
| `__FONTS_CSS__` | `@font-face` rules, woff2 as base64: **Montserrat** (one variable file, 100–900, no `size-adjust`) and **Pulse Sans** 400 + 700 (`src: local("Calibri")` then the Carlito file from `kit/fonts/`, with `size-adjust` 111% / 109.5%; override the folder with `VHC_KIT_FONTS`); **Michroma** 400 for the hollow numerals from `git -C ~/Work/Concentrix/autoalchmey_tracker show origin/main:app/public/fonts/Michroma.woff2`, else `~/Work/AINavigatorProject/ai-navigator/app/fonts/` (override with `VHC_HUB_REPO` / `VHC_FONT_DIR`). Calibri (via `local()`) and Helvetica are never bundled. |
| `__THEME_CNX_CSS__` | `../theme-cnx.css` verbatim: the same token layer web apps import |
| `__FONT_SOURCE__` | where the fonts came from (footer) |
| `__IMG_<NAME>__` | optional: `<assets>/<name lowercased, _ → ->.{webp,png,jpg}` as a data URI, e.g. `__IMG_SHOT_WS1__` → `shots/shot-ws1.png` |

The template's own CSS reads **only** `theme-cnx.css` tokens (the names Vera AI and the Hub read), so a change to the
palette or the type is a change to `theme-cnx.css` and a rebuild, nothing else. Families come from `--font-display`,
`--font-num`, `--font-label`, `--font-sans`, `--font-hollow` and `--font-code`; weights and tracking from `--w-*` and
`--track-*`.

## Files

| Path | What it is |
|---|---|
| `kit/template.src.html` | The source page. Edit this. |
| `kit/template.html` | The built page (fonts + tokens inlined). Generated; do not edit. |
| `kit/scripts/build_page.py` | The build. Python 3 stdlib only. |
| `kit/fonts/` | `Montserrat.woff2` (variable, Latin, from `@fontsource-variable/montserrat`), `Carlito-Regular.woff2` and `Carlito-Bold.woff2` (Latin, from `@fontsource/carlito`), and their SIL OFL 1.1 licences, plus `LICENSE-Michroma-OFL.txt` (the build inlines Michroma for the hollow numerals; its font file stays in the Hub repo). Montserrat and Carlito are byte for byte the files the Vera AI Pulse dashboard ships. Keep each licence beside its font. |
| `../theme-cnx.css` | The token layer the build inlines. |

## Rules

- **One gold action per view.** Here it is "Copy the decision list" in the navy panel; the header tray has none.
  The everyday primary is the accent button (`.btn.primary`).
- **One navy panel per view**, marked `data-surface="navy"` so its contents re-scope; paint it with `--sh-navy`.
- **Both themes.** Check CNX Dark and CNX Light; in light the lead KPI value is ink, not gold, and teal or gold
  never become text.
- **Numbers only from the content.** Never invent a figure to fill a tile.
- **Dashed = not yet, solid = done, glowing accent = in progress**, in chips, steppers and the gantt.
- **Gantt:** bars use `grid-column: firstWeek / lastWeek+1` on a 12-week track; `--today` on `.gantt` is the
  as-of in weeks (4.5 = middle of week 5); keep the `sr-only` schedule in sync with the bars.
- **Type through the tokens.** Titles, figures and labels use `--font-display` / `--font-num` / `--font-label`
  (Montserrat). Reading text inherits `--font-sans` (Pulse Sans) from `body`. The scale lives on the Pulse Sans
  `@font-face`, so the `font` shorthand is fine, but **never `font: … !important`** (it resets the tabular figures) and
  **never `font-size-adjust`** (it makes Windows Calibri and Mac Carlito differ by 2.5%); `build_page.py` exits 1 on
  either. Hollow numerals use `--font-hollow` (Michroma) and nothing else does. `<code>` (system monospace) is for code
  only.
- Keep the `.src.html` self-contained: no Google Fonts, no CDN, no frameworks.

See [`../DESIGN.md`](../DESIGN.md) for tokens, contrast, components and the web-app adoption notes.
