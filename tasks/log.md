# awesome-design-md — work log

## 2026-10-15 — `vera-bold`: the OVAI campaign look as a registry entry + plan-page kit
- Ferdz wanted the OVAI staff page (`/staff/scoring`, "How scoring works") as a reusable design for HTML plans.
  Named **Vera Bold** (not `vera-ovcc`: "OVCC" already names the Transmutation plan page and Vera Hub's
  `data-skin="ovcc"` signature layer). Lineage: The Drop's campaign language → OVAI Direction D "Bold campaign" in
  Concentrix navy/teal/gold → Vera Hub section structure.
- `design-md/vera-bold/DESIGN.md`: token front matter + prose, every value from the live OVAI CSS
  (`ovcc/ovai/web/app/src/styles/`); contrast measured (all text pairs AA, lowest 5.8:1).
- `kit/`: `template.src.html` (CSS ported from production, fictional "Northwind Assist — pilot plan" content),
  `scripts/build_page.py` (inlines fonts + art as data URIs, fails on leftover placeholders), built
  `template.html` 956 KB, offline. Sample hero = OVAI's gold-rocket render (object, not the Jude persona).
- `showcase/` own layout (61 KB), gate 85/85; catalog 85 designs (75 token).
- Built by DeepSeek via oc-exec (two parallel tracks); fixed on review: hero art showed a hard edge (mask spanned
  a wider layer than the square image → art layer now `aspect-ratio:1` with its own left fade), two gold pills in
  one view (header pill → accent), a KPI caption whose maths didn't add up. Checked at 1440 and 390, both themes.

## 2026-10-13 — `nintendo-2001`: taller nav, pinned dual nav, narrower canvas
- Ferdz asked for the same header change as the codebench reports (which use this design): nav bar 28→40px
  (logo pill + nav words scaled up), nav bar + subnav strip wrapped in one `.topbar` (`position: sticky; top: 0`)
  with `scroll-margin-top` on anchors, console max-width 860→820px. DESIGN.md updated to match (nav-bar
  `height: 40px`, sticky dual nav, canvas ~780–820px). `showcase.html` + bundle rebuilt; checked live on
  `#d=nintendo-2001` — header holds at top 0 after scrolling, console 820px.

## 2026-10-08 — `the-drop` entry, the design showcase, own layouts for all 84
- **`the-drop` (55aaa4f):** DESIGN.md for the AutoAlchemy Hub Marketplace space ("The Drop", live in the Hub at
  4a91b9e) — tokens from the production CSS (drop.module.css, drop-skin.css, MarketplaceShell), components,
  motion, imagery (Mika Navarro hero), do's/don'ts from Ferdz's feedback. Contrast checked: `#E2248F` 4.59:1 on the
  stage but 4.34:1 on panels → small magenta text uses `#FF4FA8`. README lists it; stale Vera Corp link fixed.
- **`showcase.html` (8d5c7db):** Ferdz wanted to see how a site looks in each design when selected.
  `scripts/build_showcase.py` (DeepSeek via oc-exec, reviewed) renders a full sample site (Northwind) themed live
  from every entry's tokens: picker, ←/→, All/Dark/Light, palette variants, Desktop/Tablet/Phone frames on
  container queries, font-load chips, `#d=` deep links. Catalog links to it.
  Found on the way: 4 entries had invalid YAML front matter and had been silently demoted to prose guesses
  (vera-hub, elevenlabs, supabase, raycast) → fixed (74 token / 10 prose); picker aliases bg-0/paper-0/text-0/text-2;
  the-drop key names (`ink` meant text-on-yellow, read as page text).
- **Own layouts (56ba9d8, d9b3e8e):** Ferdz: "the drop looks different from the marketplace … just black" — the
  generic template can't express colour-block cards. Every entry now has `design-md/<folder>/showcase/layout.*`:
  first-party ones ported from real source (Hub shell, Transmutation kit, Futura mockup, AutoAlchemy review page,
  AI Navigator My Dashboard, Marketplace storefront), third-party ones built from their DESIGN.md (CSS/SVG,
  Northwind content, no brand assets). Loaded on demand from a generated `bundle.js` (showcase stays ~213 KB);
  Own layout | Generic toggle; hashchange switches design. `scripts/check_own_layout.py --all` gate: 84/84.
  Browser sweep 84/84: mounted, 0 console errors, no overflow at 1440 or 390. 18 parallel DeepSeek jobs, almost all on
  Ollama Cloud (paid balance $7.19 → $6.69; the Drop port alone was $0.39).
- **Loud failure:** `build_catalog.py` now warns on stderr when a DESIGN.md's front matter is invalid YAML.
