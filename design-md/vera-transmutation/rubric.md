# Vera Transmutation rubric (owner, 2026-10-02)

For leadership-facing plan / design pages built in **Vera Hub** (Corp Dark default, Corp Light paired) with the AutoAlchemy "Transmutation" art direction. **Dark only** (owner, 2026-10-02): the 3D art is dark, so these pages ship in Corp Dark with no theme switch. First used on the OVCC AI interviewer design page (86/100). Art direction: `DESIGN.md` in this folder.

**Pass:** total **≥ 85 / 100**, target **90**, no dimension below **7**. Every hard gate must PASS or the round fails regardless of score.

## Hard gates (measured, not judged)
| Gate | Check |
|---|---|
| G1 Content verbatim | every text fragment (≥ 25 chars) of the approved content snapshot present in the rendered page |
| G2 No broken media | every `<img>` has `naturalWidth > 0`; no alt text visible as a broken image |
| G3 Clean console | 0 console errors on load and after scrolling to the end |
| G4 No page overflow | `document.documentElement.scrollWidth <= innerWidth` at 1440, 1024, 768 and 390 px |
| G5 Reduced motion | with `prefers-reduced-motion: reduce`, no running animations (`document.getAnimations().filter(a=>a.playState==='running').length === 0` after load) and all content visible |
| G7 Focus visible | tabbing through the first stops, every focused element shows an outline ≥ 1 px (evidence screenshots for a sidebar link and Export PDF) |
| G6 Motion restraint | **no always-on crawling borders anywhere**; at most a hover-only crawl on content cards; no element animates infinitely except the hero rings/particles and float, the process-map, voice-loop and vision figure overlays and the diagram flow, the slow fact ticker, and the slow background drift |

## Dimensions (10 points each)
| # | Dimension | 5 looks like | 10 looks like |
|---|---|---|---|
| 1 | **Leadership first impression** | Polished but generic; hero reads like a template | The first screen makes an executive stop scrolling: cinematic hero art, confident headline, instantly clear what the plan is |
| 2 | **Art direction and brand fit** | Nice parts that don't feel like one piece; drifts off Vera Hub | One coherent world: Vera Hub navy, the ice-to-lavender gradient used with intent, the Transmutation idea visible but never kitsch |
| 3 | **Motion: purposeful and calm** | Motion is everywhere or decorative; eye keeps getting pulled | Motion explains (flow, data, process) and settles; nothing competes with reading; owner would not ask to remove anything |
| 4 | **Readability and hierarchy** | Dense or repetitive; duplicate titles; long lines | Scannable in five seconds per section: clear titles, ledes, ≤ 72ch lines, mono only for data, no duplicated headings |
| 5 | **Spacing and rhythm** | Uneven gaps, cramped sections, stray margins | One spacing scale, generous section breaks (~96 px), consistent inner gaps, nothing touching or floating |
| 6 | **Data visualisation** | Charts decorative or hard to read | Every chart uses only page numbers, labels are readable, animates once into a correct final state, adds understanding a table doesn't |
| 7 | **Imagery integration** | Images pasted in; labels misaligned; crops awkward | Images feel art-directed for the page: framed, captioned, overlays aligned to the rendered objects, crops and scale right |
| 8 | **Images blend, no hard boxes** | Art sits in visible rectangles that clash with the page | Every image feels native: feathered or masked edges where it floats, framed only where a frame is intentional, glows and contrast consistent with the page |
| 9 | **Responsive** | Desktop fine, phone broken or cramped | 1440, 1024, 768 and 390 px all intentional: hero stacks, diagrams and tables scroll in place, nav adapts |
| 10 | **Craft and accessibility** | Small glitches, focus invisible, low-contrast text | Pixel-tidy edges and alignment, visible focus, AA contrast, alt text, print readable, smooth 60 fps |

## Evidence per round
`rounds/round-N.md` next to the page: the gate results, the ten scores with one-line reasons, the top five fixes, screenshot paths.
