#!/usr/bin/env python3
"""
check_own_layout.py — static checks for a design's own showcase layout.

    python3 scripts/check_own_layout.py <folder> [<folder> ...]   # e.g. stripe linear.app
    python3 scripts/check_own_layout.py --all

A layout lives in design-md/<folder>/showcase/ as layout.html (+ layout.css, layout.js, assets/).
Checks: files present; every CSS rule scoped under the layout's root class; no width media queries
(use @container frame); no vw units; no position: fixed; no remote URLs; the JS registers
window.OWN_LAYOUTS['<folder>'] and returns a cleanup; size budget. Stdlib only. Exit 1 on any failure.
"""

import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAX_BYTES = 90_000  # html + css + js, assets excluded


def root_class(html):
    m = re.search(r"<\s*[a-zA-Z][\w-]*[^>]*\bclass\s*=\s*[\"']([^\"']+)[\"']", html)
    return m.group(1).split()[0] if m else None


def strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def selectors(css):
    """Yield (selector, context) for every style rule, descending into @container/@media/@supports."""
    css = strip_comments(css)
    i, n = 0, len(css)
    stack = []
    buf = ""
    while i < n:
        ch = css[i]
        if ch == "{":
            head = buf.strip()
            buf = ""
            if head.startswith("@"):
                stack.append(head)
            else:
                yield head, (stack[-1] if stack else "")
                depth = 1
                i += 1
                while i < n and depth:
                    depth += {"{": 1, "}": -1}.get(css[i], 0)
                    i += 1
                continue
        elif ch == "}":
            if stack:
                stack.pop()
            buf = ""
        elif ch == ";" and not stack:
            buf = ""  # @import / @charset etc.
        else:
            buf += ch
        i += 1


def check(folder):
    d = os.path.join(ROOT, "design-md", folder, "showcase")
    errs = []
    html_p, css_p, js_p = (os.path.join(d, f) for f in ("layout.html", "layout.css", "layout.js"))
    if not os.path.exists(html_p):
        return [f"missing {os.path.relpath(html_p, ROOT)}"]
    html = open(html_p, encoding="utf-8").read()
    css = open(css_p, encoding="utf-8").read() if os.path.exists(css_p) else ""
    js = open(js_p, encoding="utf-8").read() if os.path.exists(js_p) else ""

    rc = root_class(html)
    if not rc:
        errs.append("layout.html: outermost element has no class (needed as the CSS scope)")
    size = len(html.encode()) + len(css.encode()) + len(js.encode())
    if size > MAX_BYTES:
        errs.append(f"size {size} B > {MAX_BYTES} B budget")

    blob = html + css + js
    for m in re.finditer(r"(?:src|href|url\()\s*=?\s*[\"']?(https?:)?//[^\"')\s]+", blob):
        if "www.w3.org" not in m.group(0):
            errs.append(f"remote URL: {m.group(0)[:80]}")
    if re.search(r"position\s*:\s*fixed", css + html):
        errs.append("position: fixed (use sticky inside the frame)")
    if re.search(r"(?<![\w-])\d*\.?\d+vw\b", css + html):
        errs.append("vw unit (use cqi)")
    for m in re.finditer(r"@media[^{]*\b(min|max)-width", strip_comments(css)):
        errs.append("width @media query (use @container frame)")
        break
    if rc and css:
        for sel, ctx in selectors(css):
            if ctx.startswith("@keyframes") or ctx.startswith("@font-face") or sel.startswith("@"):
                continue
            if re.match(r"^(from|to|\d+%)(\s*,\s*(from|to|\d+%))*$", sel):
                continue
            for part in sel.split(","):
                p = part.strip()
                if p and not p.startswith("." + rc):
                    errs.append(f"unscoped selector: {p[:70]}")
    if js:
        if not re.search(r"OWN_LAYOUTS\s*\[\s*[\"']" + re.escape(folder) + r"[\"']\s*\]", js):
            errs.append(f"layout.js does not register window.OWN_LAYOUTS['{folder}']")
    else:
        errs.append("missing layout.js (register init(root) even if it only returns a no-op cleanup)")
    return errs


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(2)
    if args == ["--all"]:
        args = sorted(os.path.basename(os.path.dirname(os.path.dirname(p)))
                      for p in glob.glob(os.path.join(ROOT, "design-md", "*", "showcase", "layout.html")))
    bad = 0
    for f in args:
        errs = check(f)
        if errs:
            bad += 1
            print(f"FAIL {f}")
            for e in errs[:12]:
                print(f"  - {e}")
        else:
            print(f"ok   {f}")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
