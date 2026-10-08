# Lessons

## [2026-10-08] Invalid YAML front matter silently demoted 4 entries to prose guesses
**What:** vera-hub (unescaped `"` in a double-quoted description), elevenlabs and supabase (unquoted descriptions
containing `: `) and raycast (a corrupted duplicate `属于:` key) failed `yaml.safe_load`. `build_catalog.parse_entry`
caught the error and fell back to regex prose parsing without a word, so the catalog and the new showcase showed
guessed colours — Vera Hub rendered a light canvas with the dark palette's accent. Nobody noticed for weeks; it
surfaced only because the showcase rendered a whole page from the tokens.
**Root cause:** a graceful fallback whose output looks like success (silent-fallback pattern). The token/prose counts
in the build summary were the only signal, and nobody compares them run to run.
**Rule:** a parse fallback must say so. `build_catalog.py` now prints `warning: <folder>/DESIGN.md front matter is
invalid YAML (line, col)` on stderr. When writing front matter, quote long descriptions with `json.dumps`-style
escaping (or a `|` block) — never hand-type inner `"` or `: ` into a plain scalar.
**Verification pattern:** the build prints no `warning:` lines; the summary reads `74 token, 10 prose` (or more
token). A deliberately broken test entry produces the warning (checked 2026-10-08).
**Cost:** wrong colours for 4 systems in the catalog since at least 2026-10-02; ~20 min to trace once visible.

## [2026-10-08] A token picker that guesses by key name needs unambiguous names
**What:** the-drop named its text-on-yellow ink `ink` and its stage `stage`; the picker reads `ink` as page text and
only knows `canvas/background/bg…`, so The Drop rendered dark text on a dark stage on a white fallback canvas.
**Rule:** in token files, `canvas` = page background, `ink`/`text` = body text on the canvas, `primary` =
the accent. Name special-purpose colours by role (`ink-dark`, `on-yellow`, `text-muted`).
**Verification pattern:** open `showcase.html#d=<folder>` (Generic) after adding an entry; text must be readable.
