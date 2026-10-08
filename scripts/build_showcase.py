#!/usr/bin/env python3
"""
build_showcase.py — generate showcase.html, a single self-contained page that
renders a realistic B2B product site ("Northwind — operations analytics") in the
design language of every design-md entry, switchable at runtime.

It reuses the parsers in build_catalog.py (parse_entry, pick, hex_lum,
contrast_text, px, is_chromatic), derives a richer theme object per entry
(colours, accents, semantics, typography, resolved components, light/dark
variant), and inlines everything as JSON next to the CSS + JS. The only external
resource is Google Fonts, loaded at runtime per family.

Usage:
    .venv/bin/python scripts/build_showcase.py   # writes showcase.html at repo root
"""

import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import yaml  # noqa: E402
import build_catalog as bc  # noqa: E402

ROOT = bc.ROOT
OUT = os.path.join(ROOT, "showcase.html")

# canvas keys (must match build_catalog's parse_entry aliases)
CANVAS_KEYS = ("canvas", "background", "bg", "bg-0", "page-bg", "body-bg", "paper-0", "paper")

GENERIC_FAMILIES = {
    "inherit", "initial", "unset", "revert",
    "ui-sans-serif", "ui-serif", "ui-monospace", "ui-rounded",
    "system-ui", "sans-serif", "serif", "monospace", "cursive", "fantasy",
    "-apple-system", "blinkmacsystemfont", "segoe ui", "roboto",
    "helvetica", "helvetica neue", "arial", "arial black", "arial narrow",
    "verdana", "tahoma", "times new roman", "times", "georgia", "garamond",
    "menlo", "monaco", "consolas", "courier", "courier new", "sf mono",
    "sf pro", "sf pro display", "sf pro text", "sf pro rounded",
    "apple color emoji", "segoe ui emoji",
}


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------

def clean_family(value):
    """First family name from a (possibly stacked) font list, or '' if generic."""
    if not isinstance(value, str):
        return ""
    first = value.split(",")[0].strip().strip("\"'").strip()
    if not first:
        return ""
    if first.lower() in GENERIC_FAMILIES:
        return ""
    if first.lower().startswith("sf pro"):
        return ""
    return first


def raw_front_matter(path):
    """Return (colors, typography, rounded, components) dicts, or None for prose."""
    try:
        text = open(path, encoding="utf-8").read()
    except OSError:
        return None
    if not text.startswith("---"):
        return None
    end = text.find("\n---", 3)
    if end == -1:
        return None
    try:
        fm = yaml.safe_load(text[3:end])
    except yaml.YAMLError:
        return None
    if not isinstance(fm, dict):
        return None
    colors = fm.get("colors") if isinstance(fm.get("colors"), dict) else {}
    typo = fm.get("typography") if isinstance(fm.get("typography"), dict) else {}
    rounded = fm.get("rounded") if isinstance(fm.get("rounded"), dict) else {}
    comps = fm.get("components") if isinstance(fm.get("components"), dict) else {}
    return colors, typo, rounded, comps


def resolve_val(v, colors, rounded):
    """Resolve {colors.x}/{rounded.x}/{typography.x} refs inside a component field."""
    if v is None or isinstance(v, bool):
        return None
    if isinstance(v, (int, float)):
        return str(v)
    if not isinstance(v, str):
        return None

    def repl(m):
        scope, key = m.group(1), m.group(2)
        table = {"colors": colors, "rounded": rounded}.get(scope)
        if table is None:
            return m.group(0)
        r = bc.pick(table, key)
        if r is None:
            return m.group(0)
        return str(r)

    s = re.sub(r"\{(\w+)\.([^}]+)\}", repl, v)
    s = re.sub(r'"(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))"', r"\1", s)
    return s.strip()


def find_comp(comps, targets):
    """Case-insensitive, -/_ tolerant component lookup by target names."""
    if not isinstance(comps, dict) or not comps:
        return None
    norm = lambda s: re.sub(r"[-_]", "", s.lower())  # noqa: E731
    ntargets = [norm(t) for t in targets]
    # 1) exact normalized name
    for name in comps:
        if norm(name) in ntargets:
            return comps[name]
    # 2) token membership (feature-card -> card, top-nav -> nav)
    for t in targets:
        tl = t.lower()
        tn = norm(t)
        for name in comps:
            toks = [x for x in re.split(r"[-_]", name.lower()) if x]
            if tl in toks or tn in [norm(x) for x in toks]:
                return comps[name]
    # 3) prefix
    for t in targets:
        tn = norm(t)
        for name in comps:
            if norm(name).startswith(tn):
                return comps[name]
    return None


def resolve_comp(c, colors, rounded):
    if not isinstance(c, dict):
        return None
    out = {}
    mapping = {
        "backgroundColor": "bg", "background": "bg",
        "textColor": "fg", "color": "fg",
        "rounded": "radius", "padding": "padding",
        "border": "border", "shadow": "shadow", "boxShadow": "shadow",
    }
    for src, dst in mapping.items():
        if src in c and c[src] is not None:
            v = resolve_val(c[src], colors, rounded)
            if v is not None and dst not in out:
                out[dst] = v
    return out or None


def build_components(comps, colors, rounded):
    def comp(targets):
        return resolve_comp(find_comp(comps, targets), colors, rounded)
    return {
        "btn": comp(["button-primary", "button", "button-pill", "button-primary-pill"]),
        "btn2": comp(["button-secondary", "button-outline", "button-ghost", "button-soft"]),
        "card": comp(["card", "feature-card", "pricing-card", "panel"]),
        "input": comp(["input", "text-input", "field", "textarea"]),
        "chip": comp(["chip", "badge", "pill", "tag"]),
        "nav": comp(["nav", "top-nav", "nav-bar", "navbar", "global-nav"]),
    }


def accent_list(colors, primary):
    out = []
    pn = str(primary).strip().lower()
    for k, v in colors.items():
        if not isinstance(v, str) or not bc.is_chromatic(v):
            continue
        if v.strip().lower() == pn:
            continue
        if v not in out:
            out.append(v)
        if len(out) >= 4:
            break
    return out


def pick_status(colors, keys):
    return bc.pick(colors, *keys)


def mono_family(typo):
    for _, t in typo.items():
        if isinstance(t, dict):
            fam = t.get("fontFamily")
            if isinstance(fam, str) and re.search(r"mono|code|courier", fam, re.I):
                fam = clean_family(fam)
                if fam:
                    return fam
    return ""


def readable_primary(colors, primary, canvas, fallback=None):
    """If primary is nearly invisible on the canvas, pick the most legible chromatic colour."""
    pl = bc.hex_lum(primary)
    cl = bc.hex_lum(canvas)
    if pl is not None and cl is not None and abs(pl - cl) >= 0.12:
        return primary, None
    best, bestd = None, 0.15
    for v in colors.values():
        if not (isinstance(v, str) and bc.is_chromatic(v)):
            continue
        vl = bc.hex_lum(v)
        if vl is None:
            continue
        d = abs(vl - (cl if cl is not None else 0.0))
        if d > bestd:
            best, bestd = v, d
    if best:
        return best, bc.contrast_text(best)
    if fallback:
        return fallback, bc.contrast_text(fallback)
    return primary, None


def full_round(rounded):
    for k, v in (rounded or {}).items():
        if re.sub(r"[-_]", "", k.lower()) in ("pill", "full", "round", "circle"):
            return True
        p = bc.px(v)
        if p is not None and p >= 500:
            return True
    return False


def norm_hex(v):
    return str(v).strip().lower() if v is not None else ""


# ---------------------------------------------------------------------------
# theme extraction
# ---------------------------------------------------------------------------

def build_theme(path):
    d = bc.parse_entry(path)
    raw = raw_front_matter(path)
    token = d["format"] == "tokens" and raw is not None

    colors, typo, rounded, comps = raw if raw else ({}, {}, {}, {})

    surface2 = bc.pick(colors, "surface-2", "card-hi", "panel-2", "surface-raised",
                       "elevated", "surface-elevated") if token else None

    primary, on_primary = d["primary"], d["onPrimary"]
    if token:
        primary2, on_primary2 = readable_primary(colors, primary, d["canvas"], d["ink"])
        primary, on_primary = primary2, (on_primary2 or on_primary)
    accents = accent_list(colors, primary) if token else []
    ok = pick_status(colors, ("success", "status-success", "ok", "status-ok", "positive", "green", "trading-up")) if token else None
    warn = pick_status(colors, ("warning", "status-warning", "warn", "status-warn", "amber", "yellow")) if token else None
    crit = pick_status(colors, ("error", "danger", "status-error", "status-crit", "crit", "critical", "red")) if token else None

    comps_res = build_components(comps, colors, rounded) if token else {
        "btn": None, "btn2": None, "card": None, "input": None, "chip": None, "nav": None,
    }

    # radii
    def comp_radius(name):
        c = comps_res.get(name)
        if c and c.get("radius") is not None:
            return bc.px(c["radius"])
        return None

    r_btn = comp_radius("btn")
    if r_btn is None:
        rr = bc.pick(rounded, "sm", "md", "default")
        r_btn = bc.px(rr) if rr is not None else None
    if r_btn is None:
        r_btn = d["radius"]

    r_card = comp_radius("card")
    if r_card is None:
        rr = bc.pick(rounded, "lg", "md", "default")
        r_card = bc.px(rr) if rr is not None else None
    if r_card is None:
        r_card = d["radius"]

    r_pill = 999 if (token and full_round(rounded)) else r_btn

    # typography with cleaned family names
    def tsum(t):
        t = t if isinstance(t, dict) else {}
        return {
            "family": clean_family(t.get("family")),
            "size": t.get("size"),
            "weight": t.get("weight"),
            "spacing": t.get("spacing"),
            "line": t.get("line"),
        }

    display = tsum(d["display"])
    body = tsum(d["body"])
    button_t = tsum(d["buttonType"])
    mono = mono_family(typo) if token else ""

    # font families used
    fonts = []
    for f in (display["family"], body["family"], button_t["family"], mono):
        if f and f not in fonts:
            fonts.append(f)

    # a design with its own real layout (design-md/<folder>/showcase/layout.html)
    # loads every family its typography names, not just display/body/button/mono.
    own_layout = os.path.isfile(os.path.join(
        ROOT, "design-md", d["folder"], "showcase", "layout.html"))
    if own_layout:
        for t in typo.values():
            if isinstance(t, dict):
                fam = clean_family(t.get("fontFamily") or t.get("family"))
                if fam and fam not in fonts:
                    fonts.append(fam)

    dark = is_dark(d["canvas"], d["dark"])
    theme = {
        "folder": d["folder"],
        "name": d["name"],
        "desc": d["desc"],
        "format": d["format"],
        "approx": d["format"] != "tokens",
        "dark": dark,
        "canvas": d["canvas"],
        "surface": d["surface"],
        "surface2": surface2,
        "ink": d["ink"],
        "muted": d["inkMuted"],
        "line": d["hairline"],
        "primary": primary,
        "onPrimary": on_primary,
        "accents": accents,
        "ok": ok,
        "warn": warn,
        "crit": crit,
        "rBtn": round(r_btn) if r_btn is not None else 0,
        "rCard": round(r_card) if r_card is not None else 0,
        "rPill": round(r_pill) if r_pill is not None else 0,
        "display": display,
        "body": body,
        "buttonType": button_t,
        "mono": mono,
        "fonts": fonts,
        "comps": comps_res,
        "dots": [d["canvas"], d["primary"], d["ink"]],
        "alt": None,
        "ownLayout": own_layout,
    }

    if token:
        theme["alt"] = build_alt(colors, rounded, d, theme)
    return theme


def is_dark(canvas, fallback=False):
    l = bc.hex_lum(canvas)
    if l is None:
        return fallback
    return l < 0.45


def variant_overlays(colors):
    ov = {"light": {}, "dark": {}}
    for k, v in colors.items():
        if not isinstance(v, str):
            continue
        kl = k.lower()
        if kl.startswith("light-"):
            ov["light"][k[6:]] = v
        elif kl.startswith("dark-"):
            ov["dark"][k[5:]] = v
        elif kl.endswith("-light"):
            ov["light"][k[:-6]] = v
        elif kl.endswith("-night"):
            ov["dark"][k[:-6]] = v
        elif kl.endswith("-dark"):
            ov["dark"][k[:-5]] = v
        elif "-dark-" in kl:
            ov["dark"][re.sub(r"-dark-", "-", k, flags=re.I)] = v
        elif "-night-" in kl:
            ov["dark"][re.sub(r"-night-", "-", k, flags=re.I)] = v
        elif "-light-" in kl:
            ov["light"][re.sub(r"-light-", "-", k, flags=re.I)] = v
    return ov


def build_alt(colors, rounded, d, base):
    ov = variant_overlays(colors)
    if not (ov["light"] or ov["dark"]):
        return None
    base_dark = base["dark"]

    def candidate(name):
        overlay = ov[name]
        if not overlay:
            return None
        merged = dict(colors)
        merged.update(overlay)
        canvas = bc.pick(merged, *CANVAS_KEYS) or d["canvas"]
        cand_dark = is_dark(canvas, base_dark)
        flipped = cand_dark != base_dark
        changed = norm_hex(canvas) != norm_hex(d["canvas"]) or flipped
        if not changed:
            return None

        ink = bc.pick(overlay, "ink", "text", "foreground", "fg", "text-0", "text-1")
        if ink is None:
            ink = bc.contrast_text(canvas) if flipped else d["ink"]

        surface = bc.pick(overlay, "surface-1", "surface", "card", "panel", "well") or d["surface"]
        sl = bc.hex_lum(surface)
        if sl is not None and (sl < 0.45) != cand_dark and norm_hex(surface) != norm_hex(canvas):
            surface = "color-mix(in srgb, var(--canvas) 92%, var(--ink))"
        s2 = bc.pick(overlay, "surface-2", "card-hi", "panel-2", "surface-raised",
                     "elevated", "surface-elevated")
        if s2 is None and not flipped:
            s2 = base["surface2"]
        muted = bc.pick(overlay, "ink-muted", "text-muted", "text-secondary", "muted",
                        "text-1", "text-2")
        if muted is None and not flipped:
            muted = base["muted"]
        line = bc.pick(overlay, "hairline", "border", "line", "divider", "hairline-on")
        if line is None and not flipped:
            line = base["line"]

        primary = bc.pick(overlay, "primary", "accent", "brand", "brand-primary") or d["primary"]
        primary, _op = readable_primary(merged, primary, canvas, base["ink"])
        on_primary = bc.pick(overlay, "on-primary", "onprimary", "primary-foreground") \
            or _op or bc.contrast_text(primary)
        accents = accent_list(merged, primary) or base["accents"]
        ok = pick_status(merged, ("success", "status-success", "ok", "status-ok", "positive", "green", "trading-up")) \
            or base["ok"]
        warn = pick_status(merged, ("warning", "status-warning", "warn", "status-warn", "amber", "yellow")) \
            or base["warn"]
        crit = pick_status(merged, ("error", "danger", "status-error", "status-crit", "crit", "critical", "red")) \
            or base["crit"]
        # rebuild components against the merged palette (raw component table lives on disk)
        comps_res = base["comps"]
        raw = raw_front_matter(os.path.join(ROOT, "design-md", d["folder"], "DESIGN.md"))
        if raw:
            comps_res = build_components(raw[3], merged, rounded)
        r_btn = base["rBtn"]
        if raw:
            c = comps_res.get("btn")
            r_btn_raw = bc.px(c["radius"]) if (c and c.get("radius") is not None) else None
            if r_btn_raw is None:
                rr = bc.pick(rounded, "sm", "md", "default")
                r_btn_raw = bc.px(rr) if rr is not None else None
            if r_btn_raw is None:
                r_btn_raw = d["radius"]
            if r_btn_raw is not None:
                r_btn = round(r_btn_raw)

        return {
            "label": "Dark" if cand_dark else "Light",
            "dark": cand_dark,
            "canvas": canvas,
            "surface": surface,
            "surface2": s2,
            "ink": ink,
            "muted": muted,
            "line": line,
            "primary": primary,
            "onPrimary": on_primary,
            "accents": accents,
            "ok": ok,
            "warn": warn,
            "crit": crit,
            "rBtn": r_btn,
            "comps": comps_res,
        }

    order = ["light", "dark"] if base_dark else ["dark", "light"]
    for name in order:
        c = candidate(name)
        if c:
            return c
    return None


# ---------------------------------------------------------------------------
# HTML template
# ---------------------------------------------------------------------------

TEMPLATE = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Design Showcase — awesome-design-md</title>
<style>
:root{
  --chrome-bg:#111214; --chrome-fg:#e8e8ea; --chrome-line:rgba(255,255,255,.10);
  --chrome-dim:#9a9ba0; --chrome-raise:#1a1b1e; --chrome-on:#e8e8ea; --chrome-onfg:#111214;
  --stage:#1b1c1f; --volt:#dcfc52;
}
*{margin:0;padding:0;box-sizing:border-box}
html{overflow-x:hidden}
body{background:var(--stage);color:var(--chrome-fg);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:13px;overflow-x:hidden}
/* own mode: clip (not hidden) so overflow does not turn html/body into scroll containers,
   which would stop the real layout's in-frame position:sticky bar from sticking */
html.own-mode,html.own-mode body{overflow-x:clip}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
a{text-decoration:none;color:inherit}

/* ---------- chrome ---------- */
.bar{position:sticky;top:0;z-index:40;height:56px;display:flex;align-items:center;gap:14px;
  padding:0 14px;background:var(--chrome-bg);border-bottom:1px solid var(--chrome-line);overflow-x:auto;scrollbar-width:none}
.bar::-webkit-scrollbar{display:none}
.bar-left,.bar-right{display:flex;align-items:center;gap:10px;flex:none}
.bar-right{margin-left:auto}
.tb{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;min-width:32px;padding:0 10px;
  border:1px solid var(--chrome-line);border-radius:7px;background:var(--chrome-raise);color:var(--chrome-fg);
  font-size:12px;white-space:nowrap;transition:background .12s,border-color .12s}
.tb:hover{background:#232428;border-color:rgba(255,255,255,.2)}
.tb:focus-visible,.tlink:focus-visible,.seg button:focus-visible,.search:focus-visible,.dd-row:focus-visible{outline:2px solid var(--volt);outline-offset:1px}
.counter{font-variant-numeric:tabular-nums;color:var(--chrome-dim);font-size:12px;white-space:nowrap;min-width:64px;text-align:center}
.seg{display:inline-flex;border:1px solid var(--chrome-line);border-radius:7px;overflow:hidden;background:var(--chrome-raise)}
.seg button{height:30px;padding:0 10px;font-size:12px;color:var(--chrome-dim);border-right:1px solid var(--chrome-line)}
.seg button:last-child{border-right:0}
.seg button.on{background:var(--chrome-on);color:var(--chrome-onfg)}
.seg button:not(.on):hover{color:var(--chrome-fg);background:#232428}
.picker{position:relative;flex:none}
.search{width:220px;height:32px;padding:0 12px;border-radius:7px;background:var(--chrome-raise);
  border:1px solid var(--chrome-line);color:var(--chrome-fg);font-size:12px}
.search::placeholder{color:#71737a}
.dropdown{position:absolute;top:38px;left:0;width:340px;max-height:340px;overflow-y:auto;background:var(--chrome-raise);
  border:1px solid var(--chrome-line);border-radius:9px;box-shadow:0 18px 44px rgba(0,0,0,.55);display:none;z-index:60}
.dropdown.open{display:block}
.dd-row{display:flex;align-items:center;gap:10px;padding:8px 10px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.05)}
.dd-row:last-child{border-bottom:0}
.dd-row.active,.dd-row:hover{background:#24252a}
.dd-dots{display:inline-flex;gap:3px;flex:none}
.dd-dots i{width:9px;height:9px;border-radius:2px;display:block;border:1px solid rgba(255,255,255,.18)}
.dd-name{font-size:12.5px;color:var(--chrome-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dd-folder{margin-left:auto;font-size:11px;color:var(--chrome-dim);flex:none}
.dd-empty{padding:14px;color:var(--chrome-dim);font-size:12px}
.badge{font-size:10px;letter-spacing:1.2px;text-transform:uppercase;font-weight:700;padding:5px 8px;border-radius:6px;
  border:1px solid var(--chrome-line);color:var(--volt);white-space:nowrap}
.tlink{font-size:12px;padding:7px 8px;border-radius:6px;color:var(--chrome-dim);white-space:nowrap}
.tlink:hover{color:var(--chrome-fg);background:var(--chrome-raise)}
@media(max-width:1180px){.bar-right .badge{display:none}}
.infostrip{position:sticky;top:56px;z-index:39;background:#17181b;border-bottom:1px solid var(--chrome-line);padding:14px 18px}
.info-inner{display:flex;gap:28px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap}
.info-name{font-size:15px;font-weight:700;letter-spacing:-.2px;margin-bottom:4px}
.info-desc{font-size:12.5px;line-height:1.5;color:var(--chrome-dim);max-width:820px;
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.chips{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.fchip{font-size:11px;padding:4px 8px;border-radius:999px;border:1px solid var(--chrome-line);background:var(--chrome-raise);color:var(--chrome-dim);white-space:nowrap}
.fchip.ok{color:#8ff0b5;border-color:rgba(80,220,140,.35)}
.fchip.fail{color:#f0a3a3;border-color:rgba(240,120,120,.3)}
.fchip.pend{color:#e8d38a}

/* ---------- stage ---------- */
.stage{padding:26px 16px 60px;display:flex;justify-content:center;align-items:flex-start;min-height:calc(100vh - 56px)}
.frame{width:100%;max-width:100%;border-radius:13px;overflow:visible;outline:1px solid rgba(255,255,255,.09);
  box-shadow:0 24px 70px rgba(0,0,0,.5);background:#fff;transition:width .2s ease}
#own{display:none;width:100%;container-type:inline-size;container-name:frame;background:#0a0a0f;border-radius:13px}

/* ---------- the sample site ---------- */
.site{
  --canvas:#ffffff;--surface:#ffffff;--surface2:#f4f4f5;--ink:#111113;--muted:#6b6b72;--line:rgba(0,0,0,.12);
  --primary:#3b5bfd;--on-primary:#ffffff;--accent1:#3b5bfd;--accent2:#3b5bfd;--accent3:#3b5bfd;--accent4:#3b5bfd;
  --ok:#16a34a;--warn:#d97706;--crit:#dc2626;
  --r-btn:8px;--r-card:12px;--r-pill:999px;
  --f-display:system-ui,sans-serif;--f-body:system-ui,sans-serif;--f-mono:ui-monospace,monospace;
  --display-weight:700;--display-spacing:0px;--display-line:1.08;--display-size:48px;--body-size:16px;
  --btn-bg:var(--primary);--btn-fg:var(--on-primary);--btn-border:transparent;--btn-shadow:none;
  --btn2-bg:transparent;--btn2-fg:var(--ink);--btn2-border:1px solid var(--line);
  --card-bg:var(--surface);--card-border:1px solid var(--line);--card-shadow:none;
  --input-bg:var(--surface);--input-border:1px solid var(--line);
  --chip-bg:color-mix(in srgb,var(--primary) 14%,transparent);--chip-fg:var(--primary);--chip-border:transparent;
  --nav-bg:transparent;--nav-fg:var(--ink);
  background:var(--canvas);color:var(--ink);font-family:var(--f-body);font-size:var(--body-size);line-height:1.6;
  container-type:inline-size;overflow-x:hidden;border-radius:13px;
}
.site *{box-sizing:border-box}
.site p{margin:0}
.site a{color:inherit}
.site h1,.site h2,.site h3,.site h4{margin:0;font-family:var(--f-display);font-weight:var(--display-weight);
  letter-spacing:var(--display-spacing);line-height:var(--display-line)}
.site .wrap{max-width:1120px;margin:0 auto;padding:0 32px}
.site .sec{padding:70px 0}
.site .sec-sm{padding:44px 0}
.site :focus-visible{outline:2px solid var(--primary);outline-offset:2px;border-radius:4px}
.site .mono{font-family:var(--f-mono)}
.site .muted{color:var(--muted)}
.site .eyebrow{font-family:var(--f-mono);font-size:11.5px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--primary)}
.site .sec-title{font-size:clamp(26px,3.4cqi,40px)}
.site .sec-lead{color:var(--muted);max-width:62ch;margin-top:12px}

/* buttons */
.site .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:var(--f-body);
  font-size:14px;font-weight:600;padding:11px 18px;border-radius:var(--r-btn);border:1px solid transparent;
  cursor:pointer;white-space:nowrap;transition:filter .15s,background .15s,border-color .15s,color .15s;letter-spacing:0}
.site .btn-primary{background:var(--btn-bg);color:var(--btn-fg);border-color:var(--btn-border);box-shadow:var(--btn-shadow)}
.site .btn-primary:hover{filter:brightness(1.08)}
.site .btn-secondary{background:var(--btn2-bg);color:var(--btn2-fg);border:var(--btn2-border)}
.site .btn-secondary:hover{filter:brightness(.97);border-color:var(--primary)}
.site .btn-ghost{background:transparent;color:var(--ink);border-color:transparent;font-weight:500}
.site .btn-ghost:hover{color:var(--primary)}
.site .btn-lg{padding:13px 24px;font-size:15px}
.site .tlink{color:var(--primary);font-weight:600;font-size:14px}

/* nav */
.site .nav{display:flex;align-items:center;gap:26px;padding:16px 0;background:var(--nav-bg);color:var(--nav-fg);border-radius:var(--r-btn)}
.site .brand{display:flex;align-items:center;gap:10px;font-family:var(--f-display);font-weight:700;font-size:20px;letter-spacing:var(--display-spacing)}
.site .brand .mark{width:27px;height:27px;border-radius:calc(var(--r-btn) * .7);background:var(--primary);color:var(--on-primary);
  display:grid;place-items:center;font-size:15px;font-family:var(--f-display);font-weight:800}
.site .nav-links{display:flex;gap:24px;font-size:14px;color:var(--muted);margin-left:6px}
.site .navlink:hover{color:var(--ink)}
.site .nav-actions{margin-left:auto;display:flex;align-items:center;gap:10px}
.site .menu-btn{display:none;width:36px;height:36px;border:1px solid var(--line);border-radius:calc(var(--r-btn)*.8);
  color:var(--ink);align-items:center;justify-content:center}
.site .menu-btn svg{width:18px;height:18px}

/* hero */
.site .hero{padding:56px 0 60px}
.site .hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:52px;align-items:center}
.site .eyebrow-chip{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;padding:5px 12px;
  border-radius:var(--r-pill);background:var(--chip-bg);color:var(--chip-fg);border:1px solid var(--chip-border);margin-bottom:20px}
.site .hero h1{font-size:clamp(36px,6cqi,min(var(--display-size),88px))}
.site .hero .lead{font-size:calc(var(--body-size) * 1.12);line-height:1.6;color:var(--muted);max-width:56ch;margin-top:20px}
.site .hero-cta{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap}
.site .trust{font-size:12.5px;color:var(--muted);margin-top:16px;font-family:var(--f-mono)}
.site .product-card{background:var(--surface2);border:var(--card-border);box-shadow:var(--card-shadow);
  border-radius:var(--r-card);padding:20px}
.site .pc-head{display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:var(--muted);font-family:var(--f-mono)}
.site .pc-num{font-size:34px;font-weight:700;margin-top:8px;font-family:var(--f-mono);font-variant-numeric:tabular-nums;letter-spacing:-1px}
.site .delta{font-size:11.5px;font-weight:700;padding:2px 7px;border-radius:999px;font-family:var(--f-mono)}
.site .delta.ok{color:var(--ok);background:color-mix(in srgb,var(--ok) 14%,transparent)}
.site .delta.crit{color:var(--crit);background:color-mix(in srgb,var(--crit) 14%,transparent)}
.site .bars{width:100%;height:96px;margin:14px 0 6px;display:block}
.site .bars .bar-a{fill:var(--primary)}
.site .bars .bar-b{fill:var(--accent1)}
.site .pc-row{display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-top:1px solid var(--line);font-size:13px}
.site .pc-row .k{color:var(--muted)}
.site .pc-row .v{font-family:var(--f-mono);font-variant-numeric:tabular-nums}

/* logo strip */
.site .logos{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:26px;color:var(--muted)}
.site .logos .lg{font-family:var(--f-display);font-weight:700;font-size:17px;letter-spacing:-.3px;opacity:.75}

/* features */
.site .features{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:36px}
.site .feature{background:var(--card-bg);border:var(--card-border);box-shadow:var(--card-shadow);border-radius:var(--r-card);padding:24px}
.site .ficon{width:40px;height:40px;border-radius:calc(var(--r-card)*.7);display:grid;place-items:center;
  background:color-mix(in srgb,var(--primary) 14%,transparent);color:var(--primary);margin-bottom:16px}
.site .ficon svg{width:20px;height:20px}
.site .feature h3{font-size:18px;margin-bottom:8px}
.site .feature p{color:var(--muted);font-size:14px;line-height:1.6}
.site .feature .tlink{display:inline-block;margin-top:12px}

/* dashboard */
.site .kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin:34px 0 20px}
.site .kpi{background:var(--card-bg);border:var(--card-border);box-shadow:var(--card-shadow);border-radius:var(--r-card);padding:18px}
.site .kpi .lab{font-size:12px;color:var(--muted);font-family:var(--f-mono);text-transform:uppercase;letter-spacing:.6px}
.site .kpi .big{font-size:28px;font-family:var(--f-mono);font-variant-numeric:tabular-nums;margin-top:10px;letter-spacing:-.5px}
.site .kpi .row{display:flex;align-items:center;gap:8px;margin-top:10px}
.site .dash-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:20px}
.site .card{background:var(--card-bg);border:var(--card-border);box-shadow:var(--card-shadow);border-radius:var(--r-card);padding:20px}
.site .card h3{font-size:16px;margin-bottom:4px}
.site .card .subt{font-size:12.5px;color:var(--muted);margin-bottom:14px}
.site .table-scroll{overflow-x:auto;min-width:0;max-width:100%}
.site .hero-grid>*,.site .features>*,.site .pricing>*,.site .form-grid>*,
.site .kpis>*,.site .dash-grid>*,.site .card{min-width:0}
.site table{width:100%;min-width:560px;border-collapse:collapse;font-size:13.5px}
.site th{text-align:left;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);
  font-weight:600;padding:8px 10px;border-bottom:1px solid var(--line)}
.site td{padding:11px 10px;border-bottom:1px solid var(--line)}
.site tr:last-child td{border-bottom:0}
.site .num{font-family:var(--f-mono);font-variant-numeric:tabular-nums;text-align:right}
.site .badge2{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;padding:3px 9px;border-radius:999px}
.site .badge2::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.site .badge2.ok{color:var(--ok);background:color-mix(in srgb,var(--ok) 14%,transparent)}
.site .badge2.warn{color:var(--warn);background:color-mix(in srgb,var(--warn) 16%,transparent)}
.site .badge2.crit{color:var(--crit);background:color-mix(in srgb,var(--crit) 14%,transparent)}
.site .spark{width:66px;height:22px;display:block}
.site .chart{width:100%;height:210px;display:block;margin-top:6px}
.site .chart .area{fill:var(--accent1);opacity:.16}
.site .chart .stroke{fill:none;stroke:var(--primary);stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round}
.site .chart .grid{stroke:var(--line);stroke-width:1}
.site .legend{display:flex;gap:18px;font-size:12px;color:var(--muted);margin-top:10px}
.site .legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:middle}

/* pricing */
.site .pricing{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:36px;align-items:start}
.site .tier{background:var(--card-bg);border:var(--card-border);box-shadow:var(--card-shadow);border-radius:var(--r-card);padding:26px}
.site .tier.feat{border:2px solid var(--primary)}
.site .tier .tname{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;font-family:var(--f-mono);color:var(--muted)}
.site .tier .price{font-size:40px;font-family:var(--f-mono);font-variant-numeric:tabular-nums;margin:14px 0 2px;letter-spacing:-1.5px}
.site .tier .per{font-size:12.5px;color:var(--muted);margin-bottom:18px}
.site .tier ul{list-style:none;display:flex;flex-direction:column;gap:10px;margin:18px 0 22px}
.site .tier li{display:flex;align-items:center;gap:9px;font-size:13.5px;color:var(--ink)}
.site .tier li svg{width:16px;height:16px;color:var(--primary);flex:none}
.site .popular{display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;
  padding:4px 10px;border-radius:999px;background:var(--primary);color:var(--on-primary);margin-bottom:6px}
.site .tier.feat .btn{width:100%}
.site .tier .btn{width:100%}

/* forms */
.site .form-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:24px}
.site .field{margin-bottom:14px}
.site .field label{display:block;font-size:12.5px;font-weight:600;margin-bottom:6px}
.site .field input[type=text],.site .field input[type=email],.site .field select,.site .field textarea{
  width:100%;padding:10px 12px;border-radius:var(--r-btn);background:var(--input-bg);border:var(--input-border);
  color:var(--ink);font-family:var(--f-body);font-size:14px;outline:none}
.site .field textarea{min-height:74px;resize:vertical}
.site .field input:focus,.site .field select:focus,.site .field textarea:focus{border-color:var(--primary)}
.site .check{display:flex;align-items:center;gap:9px;font-size:13.5px;margin:6px 0}
.site .radio-row{display:flex;gap:18px;margin:6px 0 14px}
.site .form-actions{display:flex;gap:10px;margin-top:6px}
.site .switch{display:inline-flex;align-items:center;gap:10px;font-size:13.5px}
.site .toggle{width:40px;height:22px;border-radius:999px;background:var(--primary);position:relative;display:inline-block;flex:none}
.site .toggle::after{content:"";position:absolute;top:2px;right:2px;width:18px;height:18px;border-radius:50%;background:var(--on-primary)}
.site .alert{display:flex;gap:11px;align-items:flex-start;padding:12px 14px;border-radius:var(--r-card);font-size:13px;margin-bottom:12px;border:1px solid}
.site .alert .adot{width:9px;height:9px;border-radius:50%;margin-top:5px;flex:none}
.site .alert.info{background:color-mix(in srgb,var(--primary) 12%,transparent);border-color:color-mix(in srgb,var(--primary) 35%,transparent)}
.site .alert.ok{background:color-mix(in srgb,var(--ok) 12%,transparent);border-color:color-mix(in srgb,var(--ok) 35%,transparent)}
.site .alert.warn{background:color-mix(in srgb,var(--warn) 12%,transparent);border-color:color-mix(in srgb,var(--warn) 35%,transparent)}
.site .alert.crit{background:color-mix(in srgb,var(--crit) 12%,transparent);border-color:color-mix(in srgb,var(--crit) 35%,transparent)}
.site .alert.info .adot{background:var(--primary)}.site .alert.ok .adot{background:var(--ok)}
.site .alert.warn .adot{background:var(--warn)}.site .alert.crit .adot{background:var(--crit)}
.site .alert b{display:block;font-size:13px}
.site .alert p{font-size:12px;color:var(--muted);margin-top:2px}
.site .chips-row{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 18px}
.site .tagchip{font-size:12px;padding:5px 11px;border-radius:var(--r-pill);background:var(--chip-bg);color:var(--chip-fg);border:1px solid var(--chip-border)}
.site .progress{height:8px;border-radius:999px;background:color-mix(in srgb,var(--ink) 12%,transparent);overflow:hidden}
.site .progress>i{display:block;height:100%;width:68%;background:var(--primary);border-radius:999px}

/* testimonial */
.site .quote{font-family:var(--f-display);font-size:clamp(22px,2.6cqi,32px);line-height:1.35;letter-spacing:var(--display-spacing);max-width:24ch}
.site .who{display:flex;align-items:center;gap:14px;margin-top:26px}
.site .avatar{width:48px;height:48px;border-radius:50%;background:var(--primary);color:var(--on-primary);
  display:grid;place-items:center;font-weight:700;font-family:var(--f-display);font-size:16px;flex:none}
.site .who .nm{font-weight:700}
.site .who .rl{font-size:12.5px;color:var(--muted)}

/* cta + footer */
.site .cta{background:var(--primary);color:var(--on-primary);border-radius:var(--r-card);padding:52px 44px;
  display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap}
.site .cta h2{font-size:clamp(24px,3.2cqi,38px);color:var(--on-primary)}
.site .cta p{color:var(--on-primary);opacity:.82;margin-top:10px;max-width:46ch}
.site .btn-invert{background:var(--on-primary);color:var(--primary);border-color:transparent}
.site .btn-invert:hover{filter:brightness(.94)}
.site .footer{background:color-mix(in srgb,var(--ink) 92%,var(--canvas));color:var(--canvas);margin-top:0}
.site .footer .cols{display:grid;grid-template-columns:minmax(0,1.4fr) repeat(4,minmax(0,1fr));gap:26px;padding:54px 0 34px}
.site .footer .fw{font-family:var(--f-display);font-weight:700;font-size:18px;letter-spacing:var(--display-spacing)}
.site .footer h4{font-size:12px;text-transform:uppercase;letter-spacing:1.2px;font-family:var(--f-mono);margin-bottom:14px;opacity:.7;font-weight:700}
.site .footer a{display:block;font-size:13px;margin-bottom:9px;color:color-mix(in srgb,var(--canvas) 76%,var(--ink))}
.site .footer a:hover{color:var(--canvas)}
.site .footer .fdesc{font-size:13px;color:color-mix(in srgb,var(--canvas) 70%,var(--ink));margin-top:12px;max-width:32ch}
.site .footer .bottom{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:18px 0 40px;
  border-top:1px solid color-mix(in srgb,var(--canvas) 22%,transparent);font-size:12px;color:color-mix(in srgb,var(--canvas) 70%,var(--ink))}

/* container queries */
@container (max-width:900px){
  .site .hero-grid{grid-template-columns:minmax(0,1fr);gap:34px}
  .site .features{grid-template-columns:repeat(2,minmax(0,1fr))}
  .site .dash-grid{grid-template-columns:minmax(0,1fr)}
  .site .kpis{grid-template-columns:repeat(2,minmax(0,1fr))}
  .site .form-grid{grid-template-columns:minmax(0,1fr)}
  .site .footer .cols{grid-template-columns:repeat(3,minmax(0,1fr))}
}
@container (max-width:760px){
  .site .pricing{grid-template-columns:minmax(0,1fr)}
}
@container (max-width:700px){
  .site .wrap{padding:0 18px}
  .site .sec{padding:48px 0}
  .site .hero{padding:38px 0 44px}
  .site .nav-links{display:none}
  .site .menu-btn{display:inline-flex}
  .site .nav-actions .btn{display:none}
  .site .features{grid-template-columns:minmax(0,1fr)}
  .site .cta{padding:34px 22px}
  .site .footer .cols{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@container (max-width:430px){
  .site .kpis{grid-template-columns:repeat(2,minmax(0,1fr))}
  .site .footer .cols{grid-template-columns:minmax(0,1fr)}
}
</style>
__OWN_CSS__
</head>
<body>

<header class="bar">
  <div class="bar-left">
    <div class="picker">
      <input class="search" id="q" type="text" placeholder="Search designs  ( / )" autocomplete="off" spellcheck="false" aria-label="Search designs">
      <div class="dropdown" id="dropdown" role="listbox" aria-label="Design matches"></div>
    </div>
    <button class="tb" id="prev" aria-label="Previous design">&#8249;</button>
    <button class="tb" id="next" aria-label="Next design">&#8250;</button>
    <span class="counter" id="counter">1 / 1</span>
    <div class="seg" id="filter" role="group" aria-label="Filter by canvas">
      <button data-f="all" class="on">All</button>
      <button data-f="dark">Dark</button>
      <button data-f="light">Light</button>
    </div>
    <div class="seg" id="ownseg" role="group" aria-label="Layout" hidden>
      <button data-own="1">Own layout</button>
      <button data-own="0">Generic</button>
    </div>
    <div class="seg" id="variant" role="group" aria-label="Variant" hidden></div>
    <div class="seg" id="viewport" role="group" aria-label="Viewport">
      <button data-v="desktop" class="on">Desktop</button>
      <button data-v="tablet">Tablet</button>
      <button data-v="phone">Phone</button>
    </div>
  </div>
  <div class="bar-right">
    <span class="badge" id="fmt">TOKENS</span>
    <a class="tlink" id="lnk-source" href="#" target="_blank" rel="noopener">DESIGN.md</a>
    <a class="tlink" id="lnk-catalog" href="#">Catalog</a>
    <button class="tb" id="infoBtn" aria-label="Toggle design info" aria-expanded="false">&#9432;</button>
  </div>
</header>

<div class="infostrip" id="infostrip" hidden>
  <div class="info-inner">
    <div>
      <div class="info-name" id="info-name"></div>
      <p class="info-desc" id="info-desc"></p>
    </div>
    <div class="chips" id="fontchips"></div>
  </div>
</div>

<main class="stage">
  <div class="frame" id="frame">
    <div class="site" id="site">

      <!-- NAV -->
      <div class="wrap">
        <nav class="nav">
          <a class="brand" href="#"><span class="mark">N</span><span>Northwind</span></a>
          <div class="nav-links">
            <a class="navlink" href="#">Product</a>
            <a class="navlink" href="#">Solutions</a>
            <a class="navlink" href="#">Customers</a>
            <a class="navlink" href="#">Pricing</a>
          </div>
          <div class="nav-actions">
            <a class="btn btn-ghost" href="#">Sign in</a>
            <a class="btn btn-primary" href="#">Start free</a>
            <button class="menu-btn" type="button" aria-label="Open menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </nav>
      </div>

      <!-- HERO -->
      <section class="hero">
        <div class="wrap hero-grid">
          <div>
            <span class="eyebrow-chip">New &middot; Q4 release</span>
            <h1>Every metric your team runs on, in one place</h1>
            <p class="lead">Northwind unifies data from warehouses, stores, and finance into a single live operations board &mdash; so decisions stop waiting on stale spreadsheets.</p>
            <div class="hero-cta">
              <a class="btn btn-primary btn-lg" href="#">Start free</a>
              <a class="btn btn-secondary btn-lg" href="#">Book a demo</a>
            </div>
            <p class="trust">No credit card &middot; SOC 2 Type II &middot; 14-day trial</p>
          </div>
          <div class="product-card">
            <div class="pc-head"><span>Weekly throughput</span><span class="delta ok">+12.4%</span></div>
            <div class="pc-num">48,209</div>
            <svg class="bars" viewBox="0 0 300 96" preserveAspectRatio="none" role="img" aria-label="Weekly throughput, current versus previous period">
              <rect class="bar-a" x="4" y="48" width="9" height="40" rx="2"/>
              <rect class="bar-b" x="15" y="64" width="9" height="24" rx="2"/>
              <rect class="bar-a" x="34" y="36" width="9" height="52" rx="2"/>
              <rect class="bar-b" x="45" y="58" width="9" height="30" rx="2"/>
              <rect class="bar-a" x="64" y="54" width="9" height="34" rx="2"/>
              <rect class="bar-b" x="75" y="68" width="9" height="20" rx="2"/>
              <rect class="bar-a" x="94" y="28" width="9" height="60" rx="2"/>
              <rect class="bar-b" x="105" y="54" width="9" height="34" rx="2"/>
              <rect class="bar-a" x="124" y="40" width="9" height="48" rx="2"/>
              <rect class="bar-b" x="135" y="62" width="9" height="26" rx="2"/>
              <rect class="bar-a" x="154" y="22" width="9" height="66" rx="2"/>
              <rect class="bar-b" x="165" y="48" width="9" height="40" rx="2"/>
              <rect class="bar-a" x="184" y="33" width="9" height="55" rx="2"/>
              <rect class="bar-b" x="195" y="56" width="9" height="32" rx="2"/>
              <rect class="bar-a" x="214" y="16" width="9" height="72" rx="2"/>
              <rect class="bar-b" x="225" y="44" width="9" height="44" rx="2"/>
              <rect class="bar-a" x="244" y="25" width="9" height="63" rx="2"/>
              <rect class="bar-b" x="255" y="52" width="9" height="36" rx="2"/>
              <rect class="bar-a" x="274" y="8" width="9" height="80" rx="2"/>
              <rect class="bar-b" x="285" y="38" width="9" height="50" rx="2"/>
            </svg>
            <div class="pc-row"><span class="k">Orders processed</span><span class="v">18,442</span></div>
            <div class="pc-row"><span class="k">Avg. cycle time</span><span class="v">2.4h</span></div>
            <div class="pc-row"><span class="k">Fill accuracy</span><span class="v">99.1%</span></div>
          </div>
        </div>
      </section>

      <!-- LOGOS -->
      <section class="sec-sm">
        <div class="wrap logos">
          <span class="lg">Meridian</span><span class="lg">Halcyon</span><span class="lg">Vantor</span>
          <span class="lg">Bluepeak</span><span class="lg">Cobalt</span><span class="lg">Ironwood</span>
        </div>
      </section>

      <!-- FEATURES -->
      <section class="sec">
        <div class="wrap">
          <span class="eyebrow">Built for operators</span>
          <h2 class="sec-title">One system of record for the whole floor</h2>
          <p class="sec-lead">Connect the tools you already run and watch every order, shipment, and margin update in real time.</p>
          <div class="features">
            <div class="feature">
              <div class="ficon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg></div>
              <h3>Realtime pipeline</h3>
              <p>Stream events from every warehouse and store without a batch window. Fresh numbers in milliseconds.</p>
              <a class="tlink" href="#">Explore streaming &rarr;</a>
            </div>
            <div class="feature">
              <div class="ficon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6z"/></svg></div>
              <h3>Governed by default</h3>
              <p>Row-level access, full lineage, and audit trails ship with every board. Compliance teams stay calm.</p>
              <a class="tlink" href="#">See governance &rarr;</a>
            </div>
            <div class="feature">
              <div class="ficon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-3m4 3V6"/></svg></div>
              <h3>Forecasts you trust</h3>
              <p>Blend demand, capacity, and cost models into one plan that updates as the day unfolds.</p>
              <a class="tlink" href="#">Try forecasting &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- DASHBOARD -->
      <section class="sec">
        <div class="wrap">
          <span class="eyebrow">Live operations</span>
          <h2 class="sec-title">The board your morning starts with</h2>
          <div class="kpis">
            <div class="kpi"><div class="lab">Active accounts</div><div class="big">1,284</div><div class="row"><span class="delta ok">+4.2%</span><span class="muted" style="font-size:12px">vs last week</span></div></div>
            <div class="kpi"><div class="lab">Net revenue</div><div class="big">$3.9M</div><div class="row"><span class="delta ok">+8.1%</span><span class="muted" style="font-size:12px">vs last week</span></div></div>
            <div class="kpi"><div class="lab">Churn</div><div class="big">1.8%</div><div class="row"><span class="delta ok">&minus;0.3%</span><span class="muted" style="font-size:12px">improving</span></div></div>
            <div class="kpi"><div class="lab">NPS</div><div class="big">62</div><div class="row"><span class="delta ok">+5</span><span class="muted" style="font-size:12px">this quarter</span></div></div>
          </div>
          <div class="dash-grid">
            <div class="card">
              <h3>Regional performance</h3>
              <p class="subt">Revenue, owner, and delivery status across six regions</p>
              <div class="table-scroll">
                <table>
                  <thead><tr><th>Region</th><th>Owner</th><th>Status</th><th class="num">Revenue</th><th>Trend</th></tr></thead>
                  <tbody>
                    <tr><td>North America</td><td>A. Rivera</td><td><span class="badge2 ok">On track</span></td><td class="num">$412,880</td>
                      <td><svg class="spark" viewBox="0 0 66 22" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M1 17 12 12 23 14 34 8 45 10 56 4 65 6"/></svg></td></tr>
                    <tr><td>EMEA</td><td>J. Kwan</td><td><span class="badge2 warn">At risk</span></td><td class="num">$286,140</td>
                      <td><svg class="spark" viewBox="0 0 66 22" fill="none" stroke="var(--warn)" stroke-width="2"><path d="M1 8 12 10 23 7 34 12 45 11 56 15 65 13"/></svg></td></tr>
                    <tr><td>APAC</td><td>M. Okafor</td><td><span class="badge2 ok">On track</span></td><td class="num">$198,320</td>
                      <td><svg class="spark" viewBox="0 0 66 22" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M1 16 12 14 23 15 34 10 45 11 56 6 65 4"/></svg></td></tr>
                    <tr><td>LATAM</td><td>S. Duarte</td><td><span class="badge2 crit">Behind</span></td><td class="num">$74,510</td>
                      <td><svg class="spark" viewBox="0 0 66 22" fill="none" stroke="var(--crit)" stroke-width="2"><path d="M1 5 12 8 23 7 34 11 45 13 56 15 65 18"/></svg></td></tr>
                    <tr><td>Nordics</td><td>E. Lindqvist</td><td><span class="badge2 ok">On track</span></td><td class="num">$142,900</td>
                      <td><svg class="spark" viewBox="0 0 66 22" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M1 15 12 13 23 12 34 9 45 10 56 5 65 3"/></svg></td></tr>
                    <tr><td>DACH</td><td>T. Bauer</td><td><span class="badge2 warn">At risk</span></td><td class="num">$121,660</td>
                      <td><svg class="spark" viewBox="0 0 66 22" fill="none" stroke="var(--warn)" stroke-width="2"><path d="M1 9 12 11 23 10 34 13 45 12 56 14 65 12"/></svg></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card">
              <h3>Throughput &amp; capacity</h3>
              <p class="subt">Last 12 weeks, units per hour</p>
              <svg class="chart" viewBox="0 0 560 210" preserveAspectRatio="none" role="img" aria-label="Throughput versus capacity line chart">
                <line class="grid" x1="0" y1="52" x2="560" y2="52"/>
                <line class="grid" x1="0" y1="104" x2="560" y2="104"/>
                <line class="grid" x1="0" y1="156" x2="560" y2="156"/>
                <path class="area" d="M0 158 L56 138 L112 148 L168 108 L224 120 L280 80 L336 96 L392 62 L448 72 L504 40 L560 34 L560 210 L0 210 Z"/>
                <path class="stroke" d="M0 158 L56 138 L112 148 L168 108 L224 120 L280 80 L336 96 L392 62 L448 72 L504 40 L560 34"/>
              </svg>
              <div class="legend">
                <span><i style="background:var(--primary)"></i>Throughput</span>
                <span><i style="background:var(--accent1)"></i>Capacity plan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PRICING -->
      <section class="sec">
        <div class="wrap">
          <span class="eyebrow">Pricing</span>
          <h2 class="sec-title">Plans that scale with the floor</h2>
          <div class="pricing">
            <div class="tier">
              <div class="tname">Starter</div>
              <div class="price">$29</div>
              <div class="per">per seat / month</div>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>3 live boards</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>7-day history</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Email support</li>
              </ul>
              <a class="btn btn-secondary" href="#">Choose Starter</a>
            </div>
            <div class="tier feat">
              <span class="popular">Most popular</span>
              <div class="tname">Team</div>
              <div class="price">$79</div>
              <div class="per">per seat / month</div>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Unlimited boards</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Realtime sync</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Role-based access</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Priority support</li>
              </ul>
              <a class="btn btn-primary" href="#">Start free trial</a>
            </div>
            <div class="tier">
              <div class="tname">Enterprise</div>
              <div class="price">Custom</div>
              <div class="per">billed annually</div>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>SSO &amp; SCIM</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Dedicated capacity</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Solutions engineer</li>
              </ul>
              <a class="btn btn-secondary" href="#">Talk to sales</a>
            </div>
          </div>
        </div>
      </section>

      <!-- FORM + FEEDBACK -->
      <section class="sec">
        <div class="wrap form-grid">
          <div class="card">
            <h3>Request a walkthrough</h3>
            <p class="subt">We will show your data in Northwind within a day.</p>
            <form id="demo-form" novalidate>
              <div class="field"><label for="f-name">Full name</label><input id="f-name" type="text" placeholder="Alex Rivera"></div>
              <div class="field"><label for="f-email">Work email</label><input id="f-email" type="email" placeholder="alex@company.com"></div>
              <div class="field"><label for="f-team">Team size</label>
                <select id="f-team"><option>1&ndash;10 people</option><option>11&ndash;50 people</option><option>51&ndash;200 people</option><option>200+ people</option></select>
              </div>
              <div class="field"><label for="f-note">What do you want to measure?</label><textarea id="f-note" placeholder="Throughput, fill rate, cost per order&hellip;"></textarea></div>
              <label class="check"><input type="checkbox" checked> Send me the operations benchmark report</label>
              <div class="radio-row">
                <label class="check"><input type="radio" name="plan" checked> Monthly</label>
                <label class="check"><input type="radio" name="plan"> Annual (save 20%)</label>
              </div>
              <span class="switch"><span class="toggle"></span> Email me weekly highlights</span>
              <div class="form-actions">
                <button class="btn btn-primary" type="submit">Request demo</button>
                <button class="btn btn-secondary" type="button">Cancel</button>
              </div>
            </form>
          </div>
          <div>
            <div class="alert info"><span class="adot"></span><div><b>New: warehouse streaming</b><p>Connect Snowflake, BigQuery, or Postgres in under five minutes.</p></div></div>
            <div class="alert ok"><span class="adot"></span><div><b>Deployment succeeded</b><p>Board &ldquo;Fulfilment EMEA&rdquo; is live for 24 teammates.</p></div></div>
            <div class="alert warn"><span class="adot"></span><div><b>API usage at 82%</b><p>You are approaching this month&rsquo;s request limit.</p></div></div>
            <div class="alert crit"><span class="adot"></span><div><b>Sync failed for &ldquo;Orders&rdquo;</b><p>Credentials expired. Reconnect the source to resume.</p></div></div>
            <div class="chips-row">
              <span class="tagchip">Realtime</span><span class="tagchip">Warehouse sync</span><span class="tagchip">Forecasts</span>
              <span class="tagchip">Alerts</span><span class="tagchip">SSO</span>
            </div>
            <div class="progress"><i></i></div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIAL -->
      <section class="sec">
        <div class="wrap">
          <p class="quote">&ldquo;Northwind replaced four dashboards and a nightly export. Our Monday review now starts with answers, not a data pull.&rdquo;</p>
          <div class="who">
            <span class="avatar">AR</span>
            <div><div class="nm">Alex Rivera</div><div class="rl">VP Operations, Meridian Logistics</div></div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="sec-sm">
        <div class="wrap">
          <div class="cta">
            <div>
              <h2>Bring every metric into one place</h2>
              <p>Start free, connect a source, and see your first live board in minutes.</p>
            </div>
            <a class="btn btn-invert btn-lg" href="#">Start free</a>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="wrap">
          <div class="cols">
            <div>
              <div class="fw">Northwind</div>
              <p class="fdesc">Operations analytics for teams that run the floor.</p>
            </div>
            <div>
              <h4>Product</h4>
              <a href="#">Boards</a><a href="#">Streaming</a><a href="#">Forecasting</a><a href="#">Integrations</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#">About</a><a href="#">Careers</a><a href="#">Customers</a><a href="#">Blog</a>
            </div>
            <div>
              <h4>Resources</h4>
              <a href="#">Docs</a><a href="#">API</a><a href="#">Status</a><a href="#">Changelog</a>
            </div>
            <div>
              <h4>Legal</h4>
              <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a><a href="#">DPA</a>
            </div>
          </div>
          <div class="bottom">
            <span>&copy; 2026 Northwind Analytics, Inc.</span>
            <span>Rendered with the design language of <b id="foot-folder">design</b></span>
          </div>
        </div>
      </footer>

    </div>
    <div id="own" aria-label="Real storefront layout"></div>
  </div>
</main>

__OWN_HTML__

<script>
__OWN_JS__
</script>

<script>
const DESIGNS = __DATA__;

const site = document.getElementById('site');
const frame = document.getElementById('frame');
const q = document.getElementById('q');
const dropdown = document.getElementById('dropdown');
const counter = document.getElementById('counter');
const fmt = document.getElementById('fmt');
const lnkSource = document.getElementById('lnk-source');
const lnkCatalog = document.getElementById('lnk-catalog');
const infostrip = document.getElementById('infostrip');
const infoName = document.getElementById('info-name');
const infoDesc = document.getElementById('info-desc');
const fontchips = document.getElementById('fontchips');
const footFolder = document.getElementById('foot-folder');
const own = document.getElementById('own');
const ownSeg = document.getElementById('ownseg');
let ownFolder = null, ownCleanup = null;

const LS = 'awesome-design-md.showcase.v1';
let state = { i: 0, filter: 'all', viewport: 'desktop', variant: 0, own: true };
let ddActive = 0;
const fontStatus = {};
const fontsInjected = {};

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function loadState(){
  try { const s = JSON.parse(localStorage.getItem(LS) || '{}'); if (s && typeof s === 'object') Object.assign(state, s); } catch(e){}
}
function saveState(){
  try { localStorage.setItem(LS, JSON.stringify(state)); } catch(e){}
}

function spc(v){
  if (v == null || v === '') return '0';
  if (typeof v === 'number') return v + 'px';
  const s = String(v).trim();
  return /^-?\d*\.?\d+$/.test(s) ? s + 'px' : s;
}
/* display tracking is authored for the display size; express it in em so it
   scales correctly on sub-display headings (h2/h3) instead of crushing them */
function spacingEm(v, sizePx){
  if (v == null || v === '' || sizePx <= 0) return '0';
  if (typeof v === 'number') return (v / sizePx) + 'em';
  const s = String(v).trim();
  let m = /^(-?\d*\.?\d+)px$/.exec(s);
  if (m) return (parseFloat(m[1]) / sizePx) + 'em';
  m = /^(-?\d*\.?\d+)em$/.exec(s);
  if (m) return parseFloat(m[1]) + 'em';
  m = /^(-?\d*\.?\d+)%$/.exec(s);
  if (m) return (parseFloat(m[1]) / 100) + 'em';
  m = /^(-?\d*\.?\d+)$/.exec(s);
  if (m) return (parseFloat(m[1]) / sizePx) + 'em';
  return s;
}
function contrast(hex){
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return '#ffffff';
  const n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return l > 0.45 ? '#000000' : '#ffffff';
}

function currentTheme(){
  const base = DESIGNS[state.i];
  if (state.variant === 1 && base.alt) return Object.assign({}, base, base.alt);
  return base;
}

function applyTheme(){
  const c = currentTheme();
  const s = site.style;
  const set = (k, v) => { if (v != null && v !== '') s.setProperty(k, v); };
  set('--canvas', c.canvas);
  set('--surface', c.surface || c.canvas);
  set('--surface2', c.surface2 || 'color-mix(in srgb, var(--surface) 88%, var(--ink))');
  set('--ink', c.ink);
  set('--muted', c.muted || 'color-mix(in srgb, var(--ink) 65%, transparent)');
  set('--line', c.line || 'color-mix(in srgb, var(--ink) 12%, transparent)');
  set('--primary', c.primary);
  set('--on-primary', c.onPrimary || contrast(c.primary));
  const A = c.accents || [];
  for (let k = 0; k < 4; k++) set('--accent' + (k + 1), A[k] || c.primary);
  set('--ok', c.ok || '#16a34a');
  set('--warn', c.warn || '#d97706');
  set('--crit', c.crit || '#dc2626');
  set('--r-btn', Math.max(0, Number(c.rBtn) || 0) + 'px');
  set('--r-card', Math.max(0, Number(c.rCard) || 0) + 'px');
  set('--r-pill', Number(c.rPill) >= 500 ? '999px' : Math.max(0, Number(c.rPill) || 0) + 'px');

  const d = c.display || {}, b = c.body || {};
  set('--f-display', d.family ? '"' + d.family + '", system-ui, sans-serif' : 'system-ui, sans-serif');
  set('--f-body', b.family ? '"' + b.family + '", system-ui, sans-serif' : 'system-ui, sans-serif');
  set('--f-mono', c.mono ? '"' + c.mono + '", ui-monospace, monospace' : 'ui-monospace, SFMono-Regular, Menlo, monospace');
  set('--display-weight', d.weight || 700);
  const dispSize = Number(d.size) || 48;
  set('--display-spacing', spacingEm(d.spacing, dispSize));
  set('--display-line', Math.max(0.98, Number(d.line) || 1.08)); // sample copy is mixed-case; tighter leading only works in all caps
  set('--display-size', Math.min(dispSize, 88) + 'px');
  set('--body-size', Math.max(14, Math.min(18, Number(b.size) || 16)) + 'px');

  const cp = c.comps || {};
  const g = (o, k, skip) => (o && o[k] && o[k] !== skip) ? o[k] : null;
  set('--btn-bg', g(cp.btn, 'bg') || 'var(--primary)');
  set('--btn-fg', g(cp.btn, 'fg') || 'var(--on-primary)');
  set('--btn-border', g(cp.btn, 'border') || 'transparent');
  set('--btn-shadow', g(cp.btn, 'shadow') || 'none');
  set('--btn2-bg', g(cp.btn2, 'bg') || 'transparent');
  set('--btn2-fg', g(cp.btn2, 'fg') || 'var(--ink)');
  set('--btn2-border', g(cp.btn2, 'border') || '1px solid var(--line)');
  set('--card-bg', g(cp.card, 'bg', 'transparent') || 'var(--surface)');
  set('--card-border', g(cp.card, 'border') || '1px solid var(--line)');
  set('--card-shadow', g(cp.card, 'shadow') || 'none');
  set('--input-bg', g(cp.input, 'bg', 'transparent') || 'var(--surface)');
  set('--input-border', g(cp.input, 'border') || '1px solid var(--line)');
  set('--chip-bg', g(cp.chip, 'bg', 'transparent') || 'color-mix(in srgb, var(--primary) 14%, transparent)');
  set('--chip-fg', g(cp.chip, 'fg') || 'var(--primary)');
  set('--chip-border', g(cp.chip, 'border') || 'transparent');
  set('--nav-bg', g(cp.nav, 'bg') || 'transparent');
  set('--nav-fg', g(cp.nav, 'fg') || 'var(--ink)');
}

/* fonts */
function ensureFont(fam){
  if (fontStatus[fam] === 'ok' || fontStatus[fam] === 'fail') { updateChips(); return; }
  if (fontsInjected[fam]) { updateChips(); return; }
  fontsInjected[fam] = true;
  fontStatus[fam] = 'pend';
  const url = 'https://fonts.googleapis.com/css2?family=' +
    encodeURIComponent(fam).replace(/%20/g, '+') +
    ':wght@300;400;500;600;700;800;900&display=swap';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.onerror = () => { fontStatus[fam] = 'fail'; updateChips(); };
  document.head.appendChild(link);
  const timeout = new Promise(r => setTimeout(() => r('timeout'), 2500));
  const load = document.fonts && document.fonts.load
    ? document.fonts.load('16px "' + fam + '"').then(() => 'done').catch(() => 'fail')
    : Promise.resolve('fail');
  Promise.race([load, timeout]).then(outcome => {
    let ok = false;
    try { ok = !!(document.fonts && document.fonts.check && document.fonts.check('16px "' + fam + '"')); } catch(e){}
    fontStatus[fam] = (outcome !== 'timeout' && ok) ? 'ok' : (ok ? 'ok' : 'fail');
    updateChips();
  });
}
function updateChips(){
  const t = DESIGNS[state.i];
  if (!t.fonts || !t.fonts.length){ fontchips.innerHTML = '<span class="fchip">no external fonts</span>'; return; }
  fontchips.innerHTML = t.fonts.map(f => {
    const s = fontStatus[f];
    const mark = s === 'ok' ? '\u2713' : (s === 'fail' ? '\u2717' : '\u2026');
    const word = s === 'ok' ? 'loaded' : (s === 'fail' ? 'fallback' : 'loading');
    const cls = s === 'ok' ? 'ok' : (s === 'fail' ? 'fail' : 'pend');
    return '<span class="fchip ' + cls + '">' + esc(f) + ' ' + mark + ' ' + word + '</span>';
  }).join('');
}

/* list + chrome */
function listIndices(){
  const needle = q.value.trim().toLowerCase();
  return DESIGNS.map((d, i) => i).filter(i => {
    const d = DESIGNS[i];
    if (state.filter === 'dark' && !d.dark) return false;
    if (state.filter === 'light' && d.dark) return false;
    if (needle && !((d.name + ' ' + d.folder + ' ' + d.desc).toLowerCase().includes(needle))) return false;
    return true;
  });
}
function positionIn(list){
  const p = list.indexOf(state.i);
  return p < 0 ? 0 : p;
}
function renderDropdown(){
  const list = listIndices().slice(0, 60);
  if (!list.length){ dropdown.innerHTML = '<div class="dd-empty">No designs match.</div>'; dropdown.classList.add('open'); return; }
  if (ddActive >= list.length) ddActive = 0;
  dropdown.innerHTML = list.map((i, idx) => {
    const d = DESIGNS[i];
    const dots = (d.dots || []).map(c => '<i style="background:' + esc(c) + '"></i>').join('');
    return '<div class="dd-row' + (idx === ddActive ? ' active' : '') + '" data-i="' + i + '" role="option">' +
      '<span class="dd-dots">' + dots + '</span>' +
      '<span class="dd-name">' + esc(d.name) + '</span>' +
      '<span class="dd-folder">' + esc(d.folder) + '</span></div>';
  }).join('');
  dropdown.classList.add('open');
}
function closeDropdown(){ dropdown.classList.remove('open'); }

function renderVariant(){
  const t = DESIGNS[state.i];
  const seg = document.getElementById('variant');
  if (!t.alt){ seg.hidden = true; seg.innerHTML = ''; return; }
  seg.hidden = false;
  const baseLabel = t.dark ? 'Dark' : 'Light';
  seg.innerHTML =
    '<button data-vr="0" class="' + (state.variant === 0 ? 'on' : '') + '" aria-label="Palette: ' + baseLabel + '">' + baseLabel + ' palette</button>' +
    '<button data-vr="1" class="' + (state.variant === 1 ? 'on' : '') + '" aria-label="Palette: ' + esc(t.alt.label) + '">' + esc(t.alt.label) + ' palette</button>';
}
function renderInfo(){
  const t = DESIGNS[state.i];
  infoName.textContent = t.name;
  infoDesc.textContent = t.desc || 'No description in DESIGN.md.';
}
function renderLinks(){
  const t = DESIGNS[state.i];
  lnkSource.href = 'design-md/' + t.folder + '/DESIGN.md';
  lnkCatalog.href = 'catalog.html#d=' + encodeURIComponent(t.folder);
  fmt.textContent = t.format === 'tokens' ? 'TOKENS' : 'PROSE \u00b7 approx';
  footFolder.textContent = t.folder;
}
function renderCounter(){
  const list = listIndices();
  counter.textContent = (positionIn(list) + 1) + ' / ' + list.length;
}
function renderChrome(){
  renderVariant(); renderInfo(); renderLinks(); renderCounter();
  document.querySelectorAll('#filter button').forEach(b => b.classList.toggle('on', b.dataset.f === state.filter));
  document.querySelectorAll('#viewport button').forEach(b => b.classList.toggle('on', b.dataset.v === state.viewport));
}

/* designs that ship their own real layout (design-md/<folder>/showcase/) */
function unmountOwn(){
  if (ownCleanup){ try { ownCleanup(); } catch(e){} ownCleanup = null; }
  ownFolder = null;
  own.innerHTML = '';
}
function mountOwn(folder){
  unmountOwn();
  const tpl = document.getElementById('own-' + folder);
  if (!tpl) return;
  own.appendChild(tpl.content.cloneNode(true));
  ownFolder = folder;
  const root = own.firstElementChild;
  const def = (window.OWN_LAYOUTS || {})[folder];
  if (def && typeof def.init === 'function'){
    try { ownCleanup = def.init(root); } catch(e){ console.warn('own layout init failed:', e); }
  }
}
function applyOwn(){
  const t = DESIGNS[state.i];
  const hasOwn = !!t.ownLayout;
  const active = hasOwn && state.own;
  ownSeg.hidden = !hasOwn;
  document.documentElement.classList.toggle('own-mode', active);
  if (active){
    site.style.display = 'none';
    own.style.display = 'block';
    if (ownFolder !== t.folder) mountOwn(t.folder);
  } else {
    own.style.display = 'none';
    site.style.display = '';
    if (ownFolder !== null) unmountOwn();
  }
  if (active) document.getElementById('variant').hidden = true;
  document.querySelectorAll('#ownseg button').forEach(b => b.classList.toggle('on', (b.dataset.own === '1') === active));
}

function applyViewport(){
  frame.style.width = state.viewport === 'tablet' ? '820px' : (state.viewport === 'phone' ? '390px' : '100%');
}
function selectIndex(i){
  state.i = Math.max(0, Math.min(DESIGNS.length - 1, i));
  state.variant = 0;
  applyTheme();
  applyViewport();
  renderChrome();
  applyOwn();
  const t = DESIGNS[state.i];
  (t.fonts || []).forEach(ensureFont);
  updateChips();
  try { history.replaceState(null, '', '#d=' + encodeURIComponent(t.folder)); } catch(e){}
  saveState();
}

/* events */
q.addEventListener('input', () => { ddActive = 0; renderDropdown(); });
q.addEventListener('focus', renderDropdown);
q.addEventListener('keydown', e => {
  const list = listIndices().slice(0, 60);
  if (e.key === 'ArrowDown'){ e.preventDefault(); ddActive = Math.min(ddActive + 1, list.length - 1); renderDropdown(); }
  else if (e.key === 'ArrowUp'){ e.preventDefault(); ddActive = Math.max(ddActive - 1, 0); renderDropdown(); }
  else if (e.key === 'Enter'){ e.preventDefault(); if (list[ddActive] != null){ closeDropdown(); q.blur(); selectIndex(list[ddActive]); } }
  else if (e.key === 'Escape'){ closeDropdown(); q.blur(); }
});
dropdown.addEventListener('click', e => {
  const row = e.target.closest('.dd-row');
  if (row){ closeDropdown(); selectIndex(Number(row.dataset.i)); }
});
document.addEventListener('click', e => { if (!e.target.closest('.picker')) closeDropdown(); });
document.getElementById('prev').addEventListener('click', () => move(-1));
document.getElementById('next').addEventListener('click', () => move(1));
function move(dir){
  const list = listIndices();
  if (!list.length) return;
  let p = list.indexOf(state.i);
  if (p < 0) p = dir > 0 ? -1 : 0;
  selectIndex(list[(p + dir + list.length) % list.length]);
}
document.getElementById('filter').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  state.filter = b.dataset.f;
  const list = listIndices();
  renderChrome();
  if (list.indexOf(state.i) < 0 && list.length) selectIndex(list[0]);
  else saveState();
});
document.getElementById('variant').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  state.variant = Number(b.dataset.vr);
  applyTheme(); renderVariant(); saveState();
});
document.getElementById('viewport').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  state.viewport = b.dataset.v;
  applyViewport(); renderChrome(); saveState();
});
document.getElementById('ownseg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  state.own = b.dataset.own === '1';
  applyOwn(); saveState();
});
document.getElementById('infoBtn').addEventListener('click', () => {
  infostrip.hidden = !infostrip.hidden;
  document.getElementById('infoBtn').setAttribute('aria-expanded', String(!infostrip.hidden));
});
document.addEventListener('keydown', e => {
  const tag = (document.activeElement && document.activeElement.tagName) || '';
  const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if (e.key === '/' && !typing){ e.preventDefault(); q.focus(); }
  if (typing) return;
  if (e.key === 'ArrowRight') move(1);
  if (e.key === 'ArrowLeft') move(-1);
});
site.addEventListener('click', e => {
  const a = e.target.closest('a[href="#"]');
  if (a) e.preventDefault();
});
const demoForm = document.getElementById('demo-form');
if (demoForm) demoForm.addEventListener('submit', e => e.preventDefault());

/* boot */
loadState();
(function(){
  const m = (location.hash || '').match(/^#d=(.+)$/);
  if (m){
    const folder = decodeURIComponent(m[1]);
    const idx = DESIGNS.findIndex(d => d.folder === folder);
    if (idx >= 0){ state.i = idx; state.variant = 0; }
  }
})();
if (state.filter !== 'dark' && state.filter !== 'light') state.filter = 'all';
if (state.viewport !== 'tablet' && state.viewport !== 'phone') state.viewport = 'desktop';
if (typeof state.own !== 'boolean') state.own = true;
state.i = Math.max(0, Math.min(DESIGNS.length - 1, state.i));
applyViewport();
selectIndex(state.i);
</script>
</body>
</html>
"""


def load_own_layout(folder):
    """Read a design's own storefront (showcase/layout.{html,css,js}), or None.

    Every ``./assets/`` reference is rewritten to the folder's real asset path
    (relative to showcase.html); images stay files, never base64."""
    base = os.path.join(ROOT, "design-md", folder, "showcase")
    if not os.path.isfile(os.path.join(base, "layout.html")):
        return None

    def read(name):
        try:
            with open(os.path.join(base, name), encoding="utf-8") as fh:
                return fh.read()
        except OSError:
            return ""

    prefix = "design-md/" + folder + "/showcase/assets/"

    def fix(s):
        return s.replace("./assets/", prefix)

    return {
        "folder": folder,
        "html": fix(read("layout.html")),
        "css": fix(read("layout.css")),
        "js": fix(read("layout.js")),
    }


def main():
    paths = sorted(glob.glob(os.path.join(ROOT, "design-md", "*", "DESIGN.md")))
    designs = [build_theme(p) for p in paths]
    data = json.dumps(designs, ensure_ascii=False, separators=(",", ":"))
    data = data.replace("</", "<\\/")

    own = []
    for d in designs:
        if d.get("ownLayout"):
            layout = load_own_layout(d["folder"])
            if layout:
                own.append(layout)

    own_html = "".join(
        '<template id="own-%s">%s</template>' % (o["folder"], o["html"]) for o in own)
    own_css = "".join("<style>\n%s\n</style>" % o["css"] for o in own if o["css"])
    own_js = "".join(o["js"] for o in own if o["js"])

    html = (TEMPLATE
            .replace("__OWN_CSS__", own_css)
            .replace("__OWN_HTML__", own_html)
            .replace("__OWN_JS__", own_js)
            .replace("__DATA__", data))
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html)
    n_tok = sum(1 for d in designs if d["format"] == "tokens")
    n_alt = sum(1 for d in designs if d["alt"])
    n_own = sum(1 for d in designs if d.get("ownLayout"))
    print(f"showcase.html written: {len(designs)} designs ({n_tok} token, "
          f"{len(designs) - n_tok} prose, {n_alt} with variants, {n_own} own layout), "
          f"{len(html) // 1024} KB")


if __name__ == "__main__":
    main()
