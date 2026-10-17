# Vera Trans CNX kit

- `template.src.html`: the worked example (the Mac Studio use-cases brief to Kris and Max, 2026-10-17; critic 88/100), used as
  the starting skeleton. It is an internal Concentrix infrastructure brief with no client or person data. Replace its content
  block by block and keep every class/id hook.
- `scripts/build_page.py <src> <out> <assets>`: inlines `__IMG_<name>__` JPEGs and `__FONTS_CSS__`, and fails on any external URL.
- `scripts/gates.mjs <page.html> <lines.json> <outDir>`: the parent's G1–G7 sweep.
- `assets/fig-two-machines.jpg`, `assets/finale-blueprint.jpg`: reusable Schematic renders.

Workflow, rubric and guardrails: `../../vera-transmutation/` and `~/.claude/skills/vera-transmutation`.
