# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

**Awesome DESIGN.md** is a curated content collection, not an application. It contains ready-to-use
`DESIGN.md` files — plain-text design-system documents (a format introduced by Google Stitch) that
AI agents read to generate UI consistent with a real website's design language. Each file captures
an analyzed site's colors, typography, components, layout rules, and design guardrails.

There is no runtime, no server, no package manifest (`package.json`, `pyproject.toml`, etc.), and
no CI pipeline. The repository is almost entirely Markdown plus one Python build script.

## Repository Layout

- `design-md/<site>/` — one folder per website (79 entries at time of writing). Folder names are
  lowercase, hyphenated slugs (`bmw-m`, `linear.app`, `dell-1996`).
  - `DESIGN.md` — the design system document (the actual product of this repo).
  - `README.md` — a short stub pointing readers to `https://getdesign.md/<slug>/design-md`.
    A few folders (`ai-navigator`, `aurora`, `autoalchemy`, `palawan`, `slack`) have only
    `DESIGN.md`; `futura/` additionally has a `mockup.html`.
- `scripts/build_catalog.py` — the only code in the repo. Generates `catalog.html`.
- `catalog.html` — generated, single-file visual index of all entries (committed to git).
  Regenerate it after adding or changing any `DESIGN.md`; do not hand-edit it.
- `README.md` — human-facing collection index, organized by category (AI & LLM Platforms,
  Developer Tools, Fintech, Automotive, Retro Web, etc.). When an entry is added or removed,
  the category list and the "DESIGN.md count" badge must be updated by hand (note: the badge
  currently says 73 while 79 folders exist — counts drift easily here).
- `CONTRIBUTING.md` — contribution rules (see below).
- `.github/` — only `FUNDING.yml` and `ISSUE_TEMPLATE/design-md-request.yml`. No workflows.

## DESIGN.md Formats

Two formats coexist, and `scripts/build_catalog.py` handles both:

1. **Token format (majority, 66 files)** — YAML front matter delimited by `---` followed by prose
   sections. Front-matter keys: `version`, `name`, `description`, `colors` (flat map of semantic
   name → hex), `typography` (map of role → `{fontFamily, fontSize, fontWeight, lineHeight,
   letterSpacing}`), `rounded`, and `components`. Component values may reference tokens with
   `{colors.<key>}` / `{typography.<key>}` / `{rounded.<key>}` syntax. The catalog script resolves
   token names tolerantly (case-insensitive, `-`/`_` ignored), so keep keys simple and consistent.
2. **Prose format (13 files, e.g. `tesla`, `kraken`, `spotify`)** — no front matter; a `# Title`
   followed by nine numbered sections (Visual Theme & Atmosphere, Color Palette & Roles,
   Typography Rules, Component Stylings, Layout Principles, Depth & Elevation, Do's and Don'ts,
   Responsive Behavior, Agent Prompt Guide) with hex codes inline.

When editing a token-format file, keep the YAML valid and the front matter at the very top of the
file — the build script falls back to prose parsing if it can't parse the header.

## Build Commands

The only build step is regenerating the catalog. Requires Python 3 and PyYAML (sole dependency):

```bash
python3 -m venv .venv && .venv/bin/pip install pyyaml
.venv/bin/python scripts/build_catalog.py   # writes catalog.html at repo root
```

Expected output: `catalog.html written: N designs (X token, Y prose), Z KB`. The script globs
`design-md/*/DESIGN.md`, so new folders are picked up automatically. The output is deterministic —
a run with no content changes produces a byte-identical `catalog.html`.

Open `catalog.html` directly in a browser to visually check an entry's swatches, type scale, and
component previews; deep-link to an entry with `catalog.html#d=<folder>`.

## Testing

There is no test suite. Verification is:

1. `scripts/build_catalog.py` runs without errors and reports the expected token/prose counts.
2. `catalog.html` renders the changed entry correctly in a browser.
3. For token-format edits, the YAML front matter still parses (a parse failure silently demotes
   the entry to the prose fallback — check the reported token/prose counts before and after).

## Code Style and Conventions

- Content and docs are in English; tone is descriptive and editorial, matching existing files.
- Hex colors in token files are quoted lowercase strings (`"#533afd"`).
- `build_catalog.py` is stdlib-only except for PyYAML; keep it that way. It is formatted with
  4-space indents, snake_case, and section banner comments.
- `catalog.html` is generated — never edit it by hand; change the `TEMPLATE` in
  `scripts/build_catalog.py` instead.
- Keep changes minimal and scoped: this repo's value is content accuracy, so a fix to one site's
  tokens should touch only that site's `DESIGN.md` (plus regenerated `catalog.html`).

## Contribution Rules (from CONTRIBUTING.md)

- **Open an issue before a PR** to discuss changes with maintainers.
- Contributions are limited to **improving existing files** (wrong hex values, missing tokens,
  weak descriptions); PRs adding new DESIGN.md files are not accepted.
- Compare against the live site before changing values, and include before/after rationale in PRs.
- CONTRIBUTING.md mentions updating `preview.html` / `preview-dark.html`, but no such files exist
  in the repo currently — that instruction is stale; `catalog.html` is the actual preview artifact.

## Security Considerations

- No secrets, credentials, or environment configuration exist in this repo; do not add any.
- `catalog.html` inlines extracted design tokens as JSON into a static page and escapes values
  before injecting them into HTML — preserve that escaping when modifying the template.
- The license is MIT; DESIGN.md files document publicly visible CSS values of third-party sites
  and the repo does not claim ownership of any site's visual identity — keep that framing intact.
