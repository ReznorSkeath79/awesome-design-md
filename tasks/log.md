# awesome-design-md — work log

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
