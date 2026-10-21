# Vera Hub CNX — Vera Hub with Concentrix colours

Vera Hub's console structure (shell frame, raised cards on sunken wells, radius ladder) in the Concentrix palette:
**CNX Dark** (night `#060D18` canvas, teal `#25E2CC` accent) and **CNX Light** (`#F2F5F8` canvas, navy `#003D5B`
accent), gold `#FBCA18` for the one primary action per view, one navy panel for the decision.

Concentrix type (revised 2026-10-21): **Montserrat** for titles, headings, numbers (tabular) and labels, the
**Calibri** stack (Carlito fallback, SIL OFL) for reading text, **Michroma** only for the hollow outlined numerals.
Inter and JetBrains Mono are retired; Calibri and Helvetica are named in the stacks, never bundled.

See [DESIGN.md](./DESIGN.md) for tokens, contrast, components and rules. Web apps import
[`theme-cnx.css`](./theme-cnx.css) (token names map 1:1 onto Vera AI and AutoAlchemy Hub). Build stand-alone pages
from [`kit/`](./kit/README.md).
