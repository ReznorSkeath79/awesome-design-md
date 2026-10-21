#!/usr/bin/env python3
"""Build a self-contained Vera Hub · CNX page from a kit template.

Usage:
    python3 kit/scripts/build_page.py kit/template.src.html kit/template.html [assets_dir]

Replaces, in one pass:
    __FONTS_CSS__        @font-face rules, woff2 inlined as base64: Montserrat (variable 100-900), "Pulse Sans" 400 +
                         700 (local Calibri first, else the inlined Carlito, one fixed size-adjust per weight, the
                         same as Vera AI Pulse) and Michroma 400 (hollow numerals only)
    __THEME_CNX_CSS__    the entry's token layer, ../../theme-cnx.css (relative to this script)
    __FONT_SOURCE__      where the fonts came from (for the page footer)
    __IMG_<NAME>__       optional: <assets_dir>/<name lowercased, _ -> ->.{webp,png,jpg,jpeg} as a data URI

Montserrat and Carlito come from kit/fonts/ (SIL OFL 1.1, licences beside them; byte for byte the files the Vera AI
Pulse app ships). Michroma comes from the AutoAlchemy Hub's origin/main (app/public/fonts/Michroma.woff2, read with `git show`,
so the working tree may be on any branch), else from the AI Navigator repo's app/fonts. Override with the
environment variables VHC_KIT_FONTS (Montserrat + Carlito folder), VHC_HUB_REPO and VHC_FONT_DIR (Michroma).
Calibri and Helvetica are proprietary system fonts: Calibri is reached through local() only, Helvetica through the
stacks only, and the build never bundles either.

Exits 1 if the template, the token layer or a font is missing or not woff2, if a placeholder is left unresolved, if
the output would make any request (network URLs, @import, or a url() / src= that is not a data: URI or a #fragment),
or if it uses font-size-adjust or a `font:` shorthand with !important (the first rescales each face to a target
x-height, so Windows Calibri and Mac Carlito end up 2.5% apart; the second resets the tabular figures). CSS and HTML
comments are ignored. Prints the output size in KB. Python 3 standard library only.
"""
import base64
import os
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ENTRY = HERE.parents[1]                                    # design-md/vera-hub-cnx
THEME = ENTRY / "theme-cnx.css"
KIT_FONTS = Path(os.environ.get("VHC_KIT_FONTS", HERE.parent / "fonts"))
HUB = Path(os.environ.get("VHC_HUB_REPO", Path.home() / "Work/Concentrix/autoalchmey_tracker"))
FONT_DIR = Path(os.environ.get("VHC_FONT_DIR", Path.home() / "Work/AINavigatorProject/ai-navigator/app/fonts"))

# (CSS family, file, weight, where it comes from, local() names tried before the file, size-adjust)
# "Pulse Sans" is the reading face, exactly as Vera AI Pulse (src/global.css) declares it: the machine's own Calibri
# first, else Carlito, one fixed size-adjust per weight. Calibri and Carlito share advance widths, so the same number
# on both keeps every device's layout identical. 111% / 109.5% are what font-size-adjust:.53 resolved to on Carlito
# Regular / Bold (x1.110 / x1.093), so the layout the kit was drawn with carries over. Montserrat resolved to
# x0.985-1.009 (neutral) and Michroma is a drawn outline, so neither takes a size-adjust.
FACES = (("Montserrat", "Montserrat.woff2", "100 900", "kit", (), None),
         ("Pulse Sans", "Carlito-Regular.woff2", "400", "kit", ("Calibri",), "111%"),
         ("Pulse Sans", "Carlito-Bold.woff2", "700", "kit", ("Calibri Bold", "Calibri-Bold"), "109.5%"),
         ("Michroma", "Michroma.woff2", "400", "hub", (), None))
FOOTER_NAME = {"Pulse Sans": "Pulse Sans (Carlito)"}    # what the page footer calls a family
IMG_MIME = {".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg"}
PLACEHOLDER = re.compile(r"__([A-Z0-9_]+)__")
COMMENTS = re.compile(r"<!--.*?-->|/\*.*?\*/", re.S)
EXTERNAL = (re.compile(r"""(?:src|href)\s*=\s*["'](?:https?:)?//""", re.I),
            re.compile(r"""url\(\s*['"]?(?:https?:)?//""", re.I),
            re.compile(r"@import\b", re.I),
            re.compile(r"""url\(\s*(?!['"]?(?:data:|#))""", re.I),             # relative url(): a file request
            re.compile(r"""\ssrc\s*=\s*["'](?!data:)""", re.I))                # relative src=: a file request
# type rules the page must not break (the same two Vera AI Pulse's typography.spec.ts enforces)
BANNED = ((re.compile(r"font-size-adjust\s*:", re.I), "font-size-adjust (scale the face with size-adjust on its @font-face)"),
          (re.compile(r"(?<![\w-])font\s*:[^;{}]*!important", re.I), "a `font:` shorthand with !important (it resets tabular figures)"))


def tilde(path):
    """A path for the footer without the home folder in it."""
    try:
        return "~/" + str(Path(path).resolve().relative_to(Path.home()))
    except ValueError:
        return str(path)


def woff2(raw, name):
    if raw[:4] != b"wOF2":
        raise SystemExit("error: %s is not a woff2 file" % name)
    return raw


def kit_font(name):
    path = KIT_FONTS / name
    if path.is_file() and path.stat().st_size:
        return woff2(path.read_bytes(), path), "kit/fonts"
    raise SystemExit("error: font %s not found in %s" % (name, KIT_FONTS))


def hub_font(name):
    """(bytes, source label) for Michroma: the Hub's origin/main first, then the local font folder."""
    try:
        raw = subprocess.run(["git", "-C", str(HUB), "show", "origin/main:app/public/fonts/%s" % name],
                             check=True, capture_output=True).stdout
        if raw:
            return woff2(raw, name), "AutoAlchemy Hub origin/main"
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    path = FONT_DIR / name
    if path.is_file() and path.stat().st_size:
        return woff2(path.read_bytes(), path), tilde(FONT_DIR)
    raise SystemExit("error: font %s not found in %s (origin/main) or %s" % (name, HUB, FONT_DIR))


def fonts_css():
    rules, sources = [], {}
    for family, name, weight, where, locals_, size_adjust in FACES:
        raw, src = kit_font(name) if where == "kit" else hub_font(name)
        sources.setdefault(src, [])
        if FOOTER_NAME.get(family, family) not in sources[src]:
            sources[src].append(FOOTER_NAME.get(family, family))
        srcs = ["local('%s')" % n for n in locals_]
        srcs.append("url(data:font/woff2;base64,%s) format('woff2')" % base64.b64encode(raw).decode("ascii"))
        rules.append("@font-face{font-family:'%s';src:%s;font-weight:%s;font-style:normal;font-display:swap%s}"
                     % (family, ",".join(srcs), weight, ";size-adjust:%s" % size_adjust if size_adjust else ""))
    label = " · ".join("%s: %s" % (" + ".join(fams), src) for src, fams in sources.items())
    return "\n".join(rules), label


def image_uri(assets, name):
    if assets is None:
        return None
    stem = name.lower().replace("_", "-")
    for ext, mime in IMG_MIME.items():
        path = assets / (stem + ext)
        if path.is_file():
            return "data:%s;base64,%s" % (mime, base64.b64encode(path.read_bytes()).decode("ascii"))
    return None


def main(argv):
    if len(argv) not in (3, 4):
        print(__doc__.strip())
        return 2
    src, out = Path(argv[1]), Path(argv[2])
    assets = Path(argv[3]) if len(argv) == 4 else None
    if not src.is_file():
        print("error: template not found: %s" % src)
        return 1
    if not THEME.is_file():
        print("error: token layer not found: %s" % THEME)
        return 1
    if assets is not None and not assets.is_dir():
        print("error: assets folder not found: %s" % assets)
        return 1

    tpl = src.read_text(encoding="utf-8")
    fonts, font_src = fonts_css()
    slots = {"FONTS_CSS": fonts, "THEME_CNX_CSS": THEME.read_text(encoding="utf-8").strip(), "FONT_SOURCE": font_src}

    missing = []
    for name in sorted(set(PLACEHOLDER.findall(tpl))):
        if name in slots:
            continue
        if name.startswith("IMG_"):
            uri = image_uri(assets, name[4:])
            if uri:
                slots[name] = uri
                continue
        missing.append(name)
    if missing:
        print("error: unresolved placeholder(s): %s" % ", ".join("__%s__" % m for m in missing))
        if any(m.startswith("IMG_") for m in missing):
            print("       images resolve from the assets folder (3rd argument): __IMG_SHOT_WS1__ -> shot-ws1.png|webp|jpg")
        return 1

    # one pass: replaced text is never scanned again, so inlined data cannot trigger a placeholder
    page = PLACEHOLDER.sub(lambda m: slots[m.group(1)], tpl)

    live = COMMENTS.sub("", page)
    hits = sum(len(rx.findall(live)) for rx in EXTERNAL)
    if hits:
        print("error: %d external or relative reference(s) in the output; the page must be self-contained" % hits)
        return 1

    banned = [why for rx, why in BANNED if rx.search(live)]
    if banned:
        print("error: the output uses %s" % "; ".join(banned))
        return 1

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page, encoding="utf-8")
    n_img = sum(1 for k in slots if k.startswith("IMG_"))
    print("wrote %s (%.0f KB) · fonts: %s · tokens: %s · %d image(s) inlined"
          % (out, out.stat().st_size / 1024.0, font_src, THEME.name, n_img))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
