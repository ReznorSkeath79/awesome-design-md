# Vera Transmutation kit

Starter skeleton and pipeline for a Vera Transmutation leadership page (see
`../DESIGN.md`, `../rubric.md`). Run every command from the **Vera
Transmutation package root** (the folder that holds `DESIGN.md`, one level above
this `kit/` directory).

## Quick start

**1. Freeze the content first.** Write the page text, get it approved, and save
it as `content.md` (or the approved HTML). Snapshot it to the line list the gate
uses:

```bash
python3 kit/scripts/snapshot.py content.md lines.json
```

**2. Copy the skeleton** and replace the sample content block by block. Keep
every class name and id hook — the CSS/JS *is* the design. `kit/template.src.html`
demonstrates every block in DESIGN.md §3 in order.

```bash
cp kit/template.src.html my-page.src.html
```

**3. Generate the renders.** Write `items.json` from the prompt recipe in
DESIGN.md §5 (swap only the subject) and run the image generator; drop the
downscaled JPEGs into your assets folder. Reference them in the source as
`__IMG_<name>__`. `kit/assets/bg-aurora.jpg` and `kit/assets/finale-gate.jpg` are generic and can
be reused as-is; `kit/assets/process-map.jpg` is a **sample** from the worked
example (interview-specific objects) — generate your own topic figure.

**4. Build** — inline the images into one self-contained HTML file:

```bash
python3 kit/scripts/build_page.py my-page.src.html my-page.html kit/assets
```

**5. Gates** — G1–G7 must pass (Playwright is borrowed from the configured repo;
set `PLAYWRIGHT_ROOT` if needed):

```bash
node kit/scripts/gates.mjs my-page.html lines.json gates/
```

**6. Rubric round** — an independent critic scores `../rubric.md` from the gate
screenshots; fix the top five and repeat until **≥ 85** (target 90), with no
dimension below 7. Keep each pass as `rounds/round-N.md`.

## Layout

- `template.src.html` — the starter skeleton (head + script are fixed; rewrite
  only the body sample content).
- `scripts/build_page.py` — replaces `__IMG_<name>__` with JPEG data URIs.
- `scripts/snapshot.py` — extracts the visible text fragments (≥ 25 chars) to JSON.
- `scripts/gates.mjs` — the G1–G7 hard-gate sweep.
- `assets/` — generic renders referenced by the skeleton.

## Chart values live in CSS

The sample charts are driven by custom properties in the `<style>` block — change them with the text:
`.g-off{--off:…}` (gauge: `--off = 339.29 × (1 − value)`), `.tf-top{--w:.801}` / `.tf-bot{--w:.757}` (tier bars, 0–1),
and the `.tier-gap` padding formula that positions the gap bracket. The sample numbers (79.3 %, 80.1 % / 75.7 %, 1 of 306) are
placeholders — every number on the finished page must come from its own text (gate G1 checks the text, the rubric checks the charts).
The sidebar readout counts `section[id]` elements in `.content`, so adding or removing sections needs no script change.
