# Vera Bold — page kit

A **self-contained, offline HTML page kit** in the Vera Bold language (the OVAI / OVCC bold-campaign look): a
leadership plan / brief page you can ship as one file. The worked page is **"Northwind Assist — pilot plan"** — a
fictional twelve-week, three-site pilot brief — and doubles as the copy-paste starting point for any plan,
proposal or explainer. One `<style>`, one `<script>`, no external requests: the build inlines the fonts and the art
as base64 data URIs, so the page opens from `file://` with the network off.

Both themes ship: **dark is the default**, the round header toggle flips to light and remembers the choice.

## Quick start

1. **Copy the template.** `cp kit/template.src.html my-page.src.html` (work on the `.src.html`, never the built file).
2. **Replace content block by block, keeping the class names.** The page is a stack of blocks; each block's markup is
   commented at the top of the file and its classes are reused verbatim from the OVAI stylesheets — keep them, don't
   rename them, and the ported CSS keeps working. Keep the two-tone headline pattern (`<span>` ink lines +
   `<span class="tone">` accent line, ending in a full stop).
3. **Swap the hero art** with a Codex render made from the `DESIGN.md` **§ Imagery** recipe (high-contrast advertising
   photography or a glossy 3D object, wrapped in teal `#25E2CC`, gold `#FBCA18` and navy `#003D5B` paint strokes, on
   a near-black navy `#060D18` ground for `hero-dark.webp` and clean white for `hero-light.webp`, subject on the right
   third, empty negative space on the left, no text or logos). Overwrite `kit/assets/hero-dark.webp` and
   `kit/assets/hero-light.webp` (square, ~1024px). Refresh the swaps only if you change the filenames.
4. **Build:**
   ```bash
   python3 kit/scripts/build_page.py my-page.src.html my-page.html kit/assets
   ```
   It replaces every `__PLACEHOLDER__` with a data URI, prints the output size in KB, and exits 1 if a file is
   missing or any `__[A-Z0-9_]+__` placeholder is left. Open `my-page.html` in a browser (no server needed).

## Files

| Path | What it is |
|---|---|
| `kit/template.src.html` | The source page: all CSS in one `<style>`, all JS in one `<script>`. Edit this. |
| `kit/template.html` | The built page (fonts + art inlined). Generated — do not edit. |
| `kit/scripts/build_page.py` | The build. Python 3 stdlib only. Usage above. |
| `kit/README.md` | This file. |
| `kit/assets/fonts/*.woff2` | Self-hosted Latin woff2 (OFL): Anton 400, Barlow Condensed 400/600/700, Inter variable, JetBrains Mono variable. |
| `kit/assets/brush-dark.webp`, `brush-light.webp` | The alpha paint-brush splashes (corner of the navy summary/decision blocks). |
| `kit/assets/hero-dark.webp`, `hero-light.webp` | The hero art pair (dark-ground / light-ground). |

The build's fixed map: `FONT_ANTON`, `FONT_BARLOW400/600/700`, `FONT_INTER`, `FONT_JBMONO`,
`IMG_BRUSH_DARK/LIGHT`, `IMG_HERO_DARK/LIGHT`. Any other `__IMG_<NAME>__` resolves to
`kit/assets/<name lowercased, _ -> ->.{webp,jpg,png}` if present.

## Rules

- **One gold pill per view.** Gold is the single primary action — here the "Approve" CTA in the header and again at
  the decision. Everything else is accent, ghost or act.
- **Two-tone headlines everywhere.** Ink line + `.tone` accent line, short lines, end the accent line with a full
  stop. In light mode `.tone` is navy on a painted teal brush mark — check it on every headline.
- **Numbers only from the content.** Every glass stat, KPI and count-up must trace to a real figure on the page
  (the glass stats, the summary and the section text all agree). Never invent a figure to fill a tile.
- **Both themes.** Design and check dark (default) and light; use the block scopes (`.nv .nt .tl .gd .lw`) so ink and
  accent follow the ground, and keep text pairs at WCAG AA.
- **Dashed = not live, solid accent = live.** Dashed borders mark the measured/not-yet-decided; the accent border
  marks the live one.
- Keep the `.src.html` self-contained: no Google Fonts, no CDN, no frameworks, no build-time font/CDN references.

See [`../DESIGN.md`](../DESIGN.md) for tokens, components, motion and the full do's and don'ts.
