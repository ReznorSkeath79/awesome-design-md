#!/usr/bin/env python3
"""Extract the visible text fragments of a markdown or HTML file into a JSON array.

Usage: python3 snapshot.py <content.md|page.html> <lines.json>

Fragments are split on block boundaries, have markdown syntax and HTML tags/
scripts/styles stripped, whitespace collapsed, and are kept only when at least
25 characters long. Standard library only; the same array feeds the G1 content
gate (gates.mjs) so the approved copy can be checked against the built page.
"""
import html
import json
import re
import sys

MIN_LEN = 25

BLOCK_TAGS = (
    "p|div|section|header|footer|nav|main|article|aside|h[1-6]|li|ul|ol|"
    "tr|td|th|table|thead|tbody|tfoot|caption|figure|figcaption|blockquote|"
    "pre|br|hr|dt|dd|dl|form|label|fieldset|details|summary|address"
)


def strip_html(text):
    """Remove script/style/comments, turn block tags into breaks, drop the rest."""
    text = re.sub(r"<!--.*?-->", " ", text, flags=re.S)
    text = re.sub(r"<script\b.*?</script\s*>", " ", text, flags=re.S | re.I)
    text = re.sub(r"<style\b.*?</style\s*>", " ", text, flags=re.S | re.I)
    text = re.sub(r"</?(?:" + BLOCK_TAGS + r")\b[^>]*>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    return html.unescape(text)


def strip_markdown(text):
    """Remove front matter and common markdown syntax, keeping the words."""
    text = re.sub(r"\A---\s*\n.*?\n---\s*\n", "", text, flags=re.S)
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"^\s{0,3}#{1,6}\s*", "", text, flags=re.M)
    text = re.sub(r"^\s{0,3}>\s?", "", text, flags=re.M)
    text = re.sub(r"^\s{0,3}[-*+]\s+", "", text, flags=re.M)
    text = re.sub(r"^\s{0,3}\d+[.)]\s+", "", text, flags=re.M)
    text = re.sub(r"^\s{0,3}(?:[-*_]\s*){3,}$", "", text, flags=re.M)
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.replace("|", " ")
    text = re.sub(r"[*~`]", "", text)
    # underscores only as emphasis markers; keep intraword ones (Activity IDs, table names)
    text = re.sub(r"(?<![A-Za-z0-9])_+|_+(?![A-Za-z0-9])", "", text)
    return text


def fragments(text):
    """Collapse whitespace, split on line/block boundaries, keep long enough lines."""
    out, seen = [], set()
    for raw in re.split(r"\n+", text):
        line = re.sub(r"\s+", " ", raw).strip()
        if len(line) < MIN_LEN or line in seen:
            continue
        seen.add(line)
        out.append(line)
    return out


def main():
    if len(sys.argv) != 3:
        sys.exit("usage: snapshot.py <content.md|page.html> <lines.json>")
    src = open(sys.argv[1], encoding="utf-8").read()
    is_html = bool(re.search(r"<[a-z][\s/>]", src, re.I)) or "<!doctype" in src.lower()
    text = strip_html(src) if is_html else src
    lines = fragments(strip_markdown(text))
    with open(sys.argv[2], "w", encoding="utf-8") as fh:
        json.dump(lines, fh, ensure_ascii=False, indent=2)
    print(f"wrote {len(lines)} fragments to {sys.argv[2]}")


if __name__ == "__main__":
    main()
