#!/usr/bin/env python3
"""Build a self-contained Vera Bold kit page from a template.

Usage:
    python3 kit/scripts/build_page.py kit/template.src.html kit/template.html kit/assets

Every __PLACEHOLDER__ in the template is replaced by a base64 data URI. Fonts and the
known images resolve through a fixed map; any other __IMG_<NAME>__ resolves to
<assets>/<name lowercased, _ -> ->.{webp,jpg,png} when that file exists. Exits 1 with a
clear message if a required file is missing or any placeholder is left unresolved.
Prints the output size in KB. Python 3 standard library only.
"""
import base64
import re
import sys
from pathlib import Path

# fixed placeholders -> (path relative to the assets folder, mime type)
FIXED = {
    "FONT_ANTON": ("fonts/anton-400.woff2", "font/woff2"),
    "FONT_BARLOW400": ("fonts/barlow-condensed-400.woff2", "font/woff2"),
    "FONT_BARLOW600": ("fonts/barlow-condensed-600.woff2", "font/woff2"),
    "FONT_BARLOW700": ("fonts/barlow-condensed-700.woff2", "font/woff2"),
    "FONT_INTER": ("fonts/inter-var.woff2", "font/woff2"),
    "FONT_JBMONO": ("fonts/jetbrains-mono-var.woff2", "font/woff2"),
    "IMG_BRUSH_DARK": ("brush-dark.webp", "image/webp"),
    "IMG_BRUSH_LIGHT": ("brush-light.webp", "image/webp"),
    "IMG_HERO_DARK": ("hero-dark.webp", "image/webp"),
    "IMG_HERO_LIGHT": ("hero-light.webp", "image/webp"),
}

EXT_MIME = {
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
}

PLACEHOLDER = re.compile(r"__([A-Z0-9_]+)__")


def data_uri(path: Path, mime: str) -> str:
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return "data:%s;base64,%s" % (mime, encoded)


def main(argv):
    if len(argv) != 4:
        print(__doc__.strip())
        return 2

    src, out, assets = Path(argv[1]), Path(argv[2]), Path(argv[3])
    if not src.is_file():
        print("error: template not found: %s" % src)
        return 1
    if not assets.is_dir():
        print("error: assets folder not found: %s" % assets)
        return 1

    tpl = src.read_text(encoding="utf-8")

    # 1. fixed fonts + images
    missing = []
    for key, (rel, mime) in FIXED.items():
        path = assets / rel
        if not path.is_file():
            missing.append(str(path))
            continue
        tpl = tpl.replace("__%s__" % key, data_uri(path, mime))
    if missing:
        print("error: missing asset file(s):")
        for m in missing:
            print("  " + m)
        return 1

    # 2. any extra __IMG_<NAME>__ -> <assets>/<name lowercased, _->- >.{webp,jpg,png}
    for name in sorted(set(PLACEHOLDER.findall(tpl)), key=len, reverse=True):
        stem = name.lower().replace("_", "-")
        hit = None
        for ext in (".webp", ".jpg", ".jpeg", ".png"):
            candidate = assets / (stem + ext)
            if candidate.is_file():
                hit = (candidate, EXT_MIME[ext])
                break
        if hit:
            tpl = tpl.replace("__%s__" % name, data_uri(*hit))

    # 3. nothing may be left over
    left = sorted(set(PLACEHOLDER.findall(tpl)))
    if left:
        print("error: unresolved placeholder(s):")
        for name in left:
            print("  __%s__" % name)
        print("  (extra images resolve to %s/<name lowercased, _ -> ->.{webp,jpg,png})" % assets)
        return 1

    out.write_text(tpl, encoding="utf-8")
    print("%s written: %.1f KB" % (out, out.stat().st_size / 1024.0))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
