#!/usr/bin/env python3
"""
build_catalog.py — generate catalog.html, a Futura-themed visual index of every
design-md entry in this repo.

Each entry is rendered as a live UI specimen built from its own DESIGN.md
front-matter tokens (canvas, ink, primary, type, radius, components). Entries in
the older prose format (no YAML front matter) fall back to regex-extracted hex
swatches.

Usage:
    python3 scripts/build_catalog.py            # writes catalog.html at repo root

Requires PyYAML (e.g. `python3 -m venv .venv && .venv/bin/pip install pyyaml`).
"""

import glob
import json
import os
import re

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "catalog.html")

# ---------------------------------------------------------------------------
# Token helpers
# ---------------------------------------------------------------------------

def pick(d, *keys):
    """First present key (case-insensitive, -/_ tolerant) from a flat dict."""
    if not isinstance(d, dict):
        return None
    norm = {re.sub(r"[-_]", "", k.lower()): v for k, v in d.items()}
    for k in keys:
        v = norm.get(re.sub(r"[-_]", "", k.lower()))
        if v is not None:
            return v
    return None


def hex_lum(c):
    """Relative luminance 0..1 for #rgb/#rrggbb; None if unparseable."""
    if not isinstance(c, str):
        return None
    m = re.match(r"^#([0-9a-fA-F]{6})$", c.strip())
    if not m:
        m3 = re.match(r"^#([0-9a-fA-F]{3})$", c.strip())
        if not m3:
            return None
        h = "".join(ch * 2 for ch in m3.group(1))
    else:
        h = m.group(1)
    r, g, b = (int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_text(bg):
    lum = hex_lum(bg)
    if lum is None:
        return "#000000"
    return "#000000" if lum > 0.45 else "#ffffff"


def px(v, default=None):
    """'80px' -> 80 ; 80 -> 80 ; else default."""
    if isinstance(v, (int, float)):
        return v
    if isinstance(v, str):
        m = re.match(r"^(-?\d+(?:\.\d+)?)px$", v.strip())
        if m:
            return float(m.group(1))
    return default


def is_chromatic(c):
    """True if hex has meaningful saturation (not a gray/black/white)."""
    if not isinstance(c, str):
        return False
    m = re.match(r"^#([0-9a-fA-F]{6})$", c.strip())
    if not m:
        return False
    h = m.group(1)
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    return (max(r, g, b) - min(r, g, b)) > 40


# ---------------------------------------------------------------------------
# Entry parsing
# ---------------------------------------------------------------------------

def parse_entry(path):
    folder = os.path.basename(os.path.dirname(path))
    text = open(path, encoding="utf-8").read()

    if not text.startswith("---"):
        return parse_prose_entry(folder, text)

    end = text.find("\n---", 3)
    if end == -1:
        return parse_prose_entry(folder, text)
    try:
        fm = yaml.safe_load(text[3:end])
    except yaml.YAMLError:
        return parse_prose_entry(folder, text)
    if not isinstance(fm, dict):
        return parse_prose_entry(folder, text)

    colors = fm.get("colors") if isinstance(fm.get("colors"), dict) else {}
    typo = fm.get("typography") if isinstance(fm.get("typography"), dict) else {}
    rounded = fm.get("rounded") if isinstance(fm.get("rounded"), dict) else {}
    comps = fm.get("components") if isinstance(fm.get("components"), dict) else {}

    # canvas / ink / surface
    canvas = pick(colors, "canvas", "background", "bg", "page-bg", "body-bg") or "#ffffff"
    ink = pick(colors, "ink", "text", "foreground", "text-primary", "on-canvas") or contrast_text(canvas)
    ink_mut = pick(colors, "ink-muted", "text-muted", "text-secondary", "muted") or ink
    surface = pick(colors, "surface-1", "surface", "card", "panel", "surface1") or canvas
    hairline = pick(colors, "hairline", "border", "line", "divider") or None

    # primary: explicit token, else first chromatic color
    primary = pick(colors, "primary", "accent", "brand", "brand-primary")
    if not primary:
        primary = next((v for v in colors.values() if is_chromatic(v)), None)
    if not primary:
        primary = ink
    on_primary = pick(colors, "on-primary", "onprimary", "primary-foreground") or contrast_text(primary)

    # typography: display = largest fontSize, body/button by name
    def type_entry(*names):
        for n in names:
            t = pick(typo, n)
            if isinstance(t, dict):
                return t
        return None

    display = None
    best = -1
    for t in typo.values():
        if isinstance(t, dict):
            s = px(t.get("fontSize"), 0) or 0
            if s > best:
                best, display = s, t
    body = type_entry("body", "body-md", "body-lg", "text") or {}
    button_t = type_entry("button", "button-label", "btn") or body

    def tsum(t):
        if not isinstance(t, dict):
            return {}
        return {
            "family": t.get("fontFamily", "inherit"),
            "size": px(t.get("fontSize"), 16),
            "weight": t.get("fontWeight", 400),
            "spacing": t.get("letterSpacing", "0"),
            "line": t.get("lineHeight", 1.4),
        }

    radius = pick(rounded, "md", "default", "m", "base")
    radius = px(radius, 0) if radius is not None else 0

    # components: resolve token refs for the detail view
    comp_list = []
    for name, c in comps.items():
        if not isinstance(c, dict):
            continue

        def resolve(ref, table):
            if isinstance(ref, str):
                m = re.match(r"^\{(\w+)\.(.+)\}$", ref.strip())
                if m:
                    scope = {"colors": colors, "typography": typo, "rounded": rounded}.get(m.group(1), {})
                    v = pick(scope, m.group(2))
                    if v is not None:
                        return v
            return ref

        bg = resolve(c.get("backgroundColor"), colors)
        fg = resolve(c.get("textColor"), colors)
        tref = c.get("typography")
        tname = ""
        if isinstance(tref, str):
            m = re.match(r"^\{typography\.(.+)\}$", tref.strip())
            tname = m.group(1) if m else tref
        comp_list.append(
            {
                "name": name,
                "bg": bg if isinstance(bg, str) else None,
                "fg": fg if isinstance(fg, str) else None,
                "type": tname,
                "radius": resolve(c.get("rounded"), rounded),
                "padding": c.get("padding"),
            }
        )

    return {
        "folder": folder,
        "name": fm.get("name") or folder,
        "desc": (fm.get("description") or "").strip(),
        "format": "tokens",
        "canvas": canvas,
        "ink": ink,
        "inkMuted": ink_mut,
        "surface": surface,
        "hairline": hairline,
        "primary": primary,
        "onPrimary": on_primary,
        "radius": radius,
        "display": tsum(display),
        "body": tsum(body),
        "buttonType": tsum(button_t),
        "colors": [{"k": k, "v": v} for k, v in colors.items() if isinstance(v, str)],
        "typography": [
            {"name": k, **tsum(v)} for k, v in typo.items() if isinstance(v, dict)
        ],
        "components": comp_list,
        "dark": (hex_lum(canvas) or 1) < 0.45,
    }


def parse_prose_entry(folder, text):
    """Older prose-only DESIGN.md — extract title, intro, hex swatches."""
    m = re.search(r"^#\s+(.+)$", text, re.M)
    name = m.group(1).strip() if m else folder
    name = re.sub(r"^Design System Inspired by\s+", "", name, flags=re.I)
    paras = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip() and not p.strip().startswith("#")]
    desc = paras[0][:600] if paras else ""
    hexes = []
    for h in re.findall(r"#[0-9a-fA-F]{6}\b", text):
        h = h.lower()
        if h not in hexes:
            hexes.append(h)
        if len(hexes) >= 16:
            break
    primary = next((h for h in hexes if is_chromatic(h)), (hexes[0] if hexes else "#000000"))
    canvas = next((h for h in hexes if (hex_lum(h) or 0) > 0.9), "#ffffff")
    ink = next((h for h in hexes if (hex_lum(h) or 1) < 0.15), contrast_text(canvas))
    return {
        "folder": folder,
        "name": name,
        "desc": desc,
        "format": "prose",
        "canvas": canvas,
        "ink": ink,
        "inkMuted": ink,
        "surface": canvas,
        "hairline": None,
        "primary": primary,
        "onPrimary": contrast_text(primary),
        "radius": 8,
        "display": {"family": "inherit", "size": 32, "weight": 700, "spacing": "0", "line": 1.1},
        "body": {"family": "inherit", "size": 15, "weight": 400, "spacing": "0", "line": 1.5},
        "buttonType": {"family": "inherit", "size": 14, "weight": 600, "spacing": "0", "line": 1.2},
        "colors": [{"k": f"hex-{i+1:02d}", "v": h} for i, h in enumerate(hexes)],
        "typography": [],
        "components": [],
        "dark": False,
    }


# ---------------------------------------------------------------------------
# HTML template
# ---------------------------------------------------------------------------

TEMPLATE = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DESIGN INDEX — awesome-design-md catalog [CAT-01]</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{
  --volt:#dcfc52; --volt-dim:#b8d944; --canvas:#e6e8e9; --ink:#000;
  --ink-inverse:#e6e8e9; --white:#fff; --black:#000;
  --ramp-3:#b0b8b0; --ramp-4:#9aa19a; --ramp-6:#6e736e; --ramp-8:#424542; --ramp-10:#161716;
  --grot:'Inter Tight',Helvetica,Arial,sans-serif;
  --mono:'Space Mono',ui-monospace,Menlo,monospace;
}
*{margin:0;padding:0;box-sizing:border-box;border-radius:0}
html,body{overflow-x:hidden}
body{background:var(--canvas);color:var(--ink);font-family:var(--grot);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
::selection{background:var(--volt);color:var(--ink)}
.mono{font-family:var(--mono)}
.data{font-family:var(--mono);font-size:13px;letter-spacing:.5px}
.eyebrow{font-family:var(--mono);font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase}
.micro{font-size:9px;letter-spacing:.2px;line-height:1.35}

/* nav */
nav{height:48px;display:flex;align-items:center;justify-content:space-between;gap:24px;
  padding:0 32px;border-bottom:1px solid var(--ink);position:sticky;top:0;background:var(--canvas);z-index:100}
.nav-logo{font-weight:700;font-size:20px;letter-spacing:-.4px}
.nav-logo sup{font-family:var(--mono);font-size:9px;font-weight:400;letter-spacing:1px}
.nav-search{flex:1;max-width:420px;display:flex}
.nav-search input{
  width:100%;background:var(--white);border:1px solid var(--ink);outline:none;
  font-family:var(--mono);font-size:13px;letter-spacing:.5px;padding:8px 12px;
}
.nav-search input:focus{background:var(--volt)}
.nav-count{font-family:var(--mono);font-size:11px;letter-spacing:.5px;white-space:nowrap}

/* hero */
.hero{padding:40px 32px 32px;border-bottom:1px solid var(--ink);position:relative;overflow:hidden}
.hero h1{font-weight:700;text-transform:uppercase;font-size:clamp(48px,7vw,110px);line-height:.9;letter-spacing:-.03em}
.hero h1 .band{background:var(--volt);padding:0 20px 4px}
.hero h1 .out{color:transparent;-webkit-text-stroke:2px var(--ink)}
.hero-sub{display:flex;gap:32px;align-items:baseline;margin-top:20px;flex-wrap:wrap}
.hero-mega{position:absolute;top:-40px;right:-30px;font-weight:700;font-size:300px;line-height:.8;color:var(--volt);
  pointer-events:none;user-select:none;z-index:0}
.hero h1,.hero-sub{position:relative;z-index:1}

/* filter chips */
.controls{display:flex;gap:0;border-bottom:1px solid var(--ink);position:sticky;top:48px;background:var(--canvas);z-index:90}
.chip{
  font-family:var(--mono);font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  padding:12px 20px;border-right:1px solid var(--ink);cursor:pointer;background:var(--canvas);user-select:none;
}
.chip:hover{background:var(--white)}
.chip.on{background:var(--ink);color:var(--volt)}
.chip .n{opacity:.6;font-weight:400}

/* grid */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1px;background:var(--ink);border-bottom:1px solid var(--ink)}
.card{background:var(--canvas);cursor:pointer;display:flex;flex-direction:column}
.card:hover .card-name{background:var(--volt)}
.card:hover .spec{outline:2px solid var(--ink);outline-offset:-2px}
.spec{height:220px;position:relative;overflow:hidden;border-bottom:1px solid var(--ink)}
.spec-nav{position:absolute;top:0;left:0;right:0;height:22px;display:flex;align-items:center;gap:6px;padding:0 10px;font-size:8px}
.spec-dot{width:7px;height:7px;flex:none}
.spec-hero{position:absolute;top:34px;left:14px;right:14px}
.spec-card{position:absolute;left:14px;bottom:14px;width:46%;padding:10px}
.spec-btn{position:absolute;right:14px;bottom:14px;padding:7px 14px;font-weight:600;white-space:nowrap}
.spec-swatch{position:absolute;right:14px;top:34px;display:flex;flex-direction:column;gap:4px}
.spec-swatch span{width:34px;height:10px;display:block}
.card-meta{padding:14px 16px;display:flex;justify-content:space-between;align-items:baseline;gap:12px}
.card-name{font-weight:700;font-size:17px;letter-spacing:-.3px;padding:0 4px;margin:0 -4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.card-idx{font-family:var(--mono);font-size:11px;color:var(--ramp-6);flex:none}
.card-strip{display:flex;height:8px}
.card-strip span{flex:1;display:block}

/* detail overlay */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:200;display:none;align-items:flex-start;justify-content:center;overflow-y:auto}
.overlay.open{display:flex}
.detail{
  background:var(--canvas);width:min(1080px,94vw);margin:5vh 0;border:1px solid var(--ink);
  box-shadow:8px 8px 0 var(--volt);position:relative;
}
.detail-head{background:var(--black);color:var(--volt);padding:28px 32px;display:flex;justify-content:space-between;gap:24px;align-items:flex-start}
.detail-head h2{font-weight:700;font-size:clamp(28px,4vw,44px);letter-spacing:-.02em;line-height:1;color:var(--volt);word-break:break-word}
.detail-head .folder{color:var(--ramp-4);margin-top:8px}
.detail-close{
  background:var(--volt);color:var(--ink);border:0;font-family:var(--mono);font-weight:700;font-size:13px;
  letter-spacing:1.5px;padding:10px 18px;cursor:pointer;flex:none;
}
.detail-close:hover{background:var(--white)}
.detail-body{padding:32px;display:grid;grid-template-columns:1fr 1fr;gap:40px}
.detail-desc{grid-column:1/-1;font-size:14px;line-height:1.55;max-width:100%;color:#222;border-left:6px solid var(--volt);padding-left:16px}
.d-section>h3{font-family:var(--mono);font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  border-bottom:1px solid var(--ink);padding-bottom:8px;margin-bottom:16px}
.pal{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:1px;background:var(--ink);border:1px solid var(--ink)}
.pal-item{background:var(--white);cursor:pointer}
.pal-item:hover .pal-hex{background:var(--volt)}
.pal-swatch{height:40px}
.pal-label{padding:6px 8px}
.pal-key{font-family:var(--mono);font-size:9px;color:var(--ramp-6);word-break:break-all}
.pal-hex{font-family:var(--mono);font-size:11px;padding:0 0}
.type-row{display:flex;align-items:baseline;gap:14px;padding:8px 0;border-bottom:1px solid var(--ramp-3)}
.type-row:last-child{border-bottom:0}
.type-name{font-family:var(--mono);font-size:10px;color:var(--ramp-6);width:120px;flex:none}
.type-spec{font-family:var(--mono);font-size:9px;color:var(--ramp-4);margin-left:auto;flex:none;text-align:right}
.type-sample{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.comp-grid{display:flex;flex-wrap:wrap;gap:10px}
.comp{border:1px solid var(--ink);background:var(--white);min-width:120px;max-width:200px}
.comp-view{padding:14px 12px;font-size:13px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.comp-name{font-family:var(--mono);font-size:9px;color:var(--ramp-6);border-top:1px solid var(--ramp-3);padding:5px 8px;word-break:break-all}
.detail-foot{grid-column:1/-1;display:flex;justify-content:space-between;border-top:1px solid var(--ink);padding-top:16px;flex-wrap:wrap;gap:12px}
.detail-nav{display:flex;gap:8px}
.dbtn{background:var(--black);color:var(--volt);border:1px solid var(--black);font-family:var(--mono);font-weight:700;
  font-size:12px;letter-spacing:1.5px;padding:10px 18px;cursor:pointer;text-transform:uppercase}
.dbtn:hover{background:var(--volt);color:var(--ink)}

/* footer */
footer{background:var(--black);color:var(--volt);padding:24px 32px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
footer .dim{color:var(--ramp-6)}

.empty{padding:96px 32px;text-align:center;display:none}
.empty.show{display:block}

@media(max-width:900px){
  .detail-body{grid-template-columns:1fr}
  nav{padding:0 16px}
  .hero{padding:32px 16px}
  .hero-mega{font-size:180px;top:-10px;right:-16px}
  .nav-count{display:none}
  .grid{grid-template-columns:1fr}
}
</style>
</head>
<body>

<nav>
  <div class="nav-logo">DESIGN INDEX<sup> [CAT-01]</sup></div>
  <div class="nav-search"><input id="q" type="text" placeholder="SEARCH SYSTEMS…  ( / )" aria-label="Search"></div>
  <div class="nav-count" id="count">— SYSTEMS</div>
</nav>

<header class="hero">
  <div class="hero-mega">i</div>
  <h1><span class="band">Every</span> <span class="out">Design</span><br>System, Indexed</h1>
  <div class="hero-sub">
    <span class="eyebrow">awesome-design-md — Visual Catalog</span>
    <span class="data">cat·a·log |ˈkadlˌôɡ| — a complete index of design systems, rendered live from their own tokens</span>
  </div>
</header>

<div class="controls" id="controls">
  <div class="chip on" data-f="all">All <span class="n" id="n-all"></span></div>
  <div class="chip" data-f="dark">Dark Canvas <span class="n" id="n-dark"></span></div>
  <div class="chip" data-f="light">Light Canvas <span class="n" id="n-light"></span></div>
  <div class="chip" data-f="tokens">Full Tokens <span class="n" id="n-tokens"></span></div>
  <div class="chip" data-f="prose">Prose Format <span class="n" id="n-prose"></span></div>
</div>

<main class="grid" id="grid"></main>
<div class="empty" id="empty">
  <div class="eyebrow" style="margin-bottom:16px">[Ø] — No Match</div>
  <p class="data">ZERO SYSTEMS MATCH THE QUERY. RESET THE FILTER OR LOOSEN THE STRING.</p>
</div>

<footer>
  <span class="data">DESIGN INDEX [CAT-01] — RENDERED FROM LIVE TOKENS</span>
  <span class="data dim">% ‰ ↑↗→↘↓↙←↖ ↔↕ ◊ @ &amp;</span>
  <span class="data dim" id="foot-count"></span>
</footer>

<div class="overlay" id="overlay">
  <div class="detail" id="detail"></div>
</div>

<script>
const DESIGNS = __DATA__;

const grid = document.getElementById('grid');
const overlay = document.getElementById('overlay');
const detail = document.getElementById('detail');
const q = document.getElementById('q');
let filter = 'all';
let visible = [];
let cur = -1;

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad = n => String(n+1).padStart(2,'0');

function typeStyle(t, scale=1, extra=''){
  if(!t || !t.size) return extra;
  const sp = typeof t.spacing === 'string' ? t.spacing : (t.spacing + 'px');
  return `font-family:${esc(t.family)},Helvetica,Arial,sans-serif;font-size:${Math.round(t.size*scale)}px;`+
         `font-weight:${t.weight};letter-spacing:${sp};line-height:${t.line};${extra}`;
}

function cardHTML(d, i){
  const swatches = d.colors.filter(c=>/^#[0-9a-fA-F]{3,6}$/.test(c.v)).slice(0,5);
  const strip = d.colors.filter(c=>/^#[0-9a-fA-F]{3,6}$/.test(c.v)).slice(0,10);
  const dispScale = Math.min(1, 30 / (d.display.size || 30));
  const hair = d.hairline ? `1px solid ${esc(d.hairline)}` : 'none';
  return `<div class="card" data-i="${i}" tabindex="0" role="button" aria-label="${esc(d.name)}">
    <div class="spec" style="background:${esc(d.canvas)}">
      <div class="spec-nav" style="color:${esc(d.ink)}">
        <span class="spec-dot" style="background:${esc(d.primary)};border-radius:${d.radius>6?'9999px':'0'}"></span>
        <span style="font-family:'Space Mono',monospace;letter-spacing:.5px">${esc(d.folder.toUpperCase())}</span>
      </div>
      <div class="spec-hero">
        <div style="${typeStyle(d.display, dispScale)}color:${esc(d.ink)};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">AaBbGg</div>
        <div style="${typeStyle(d.body, 0.8)}color:${esc(d.inkMuted)};margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">The quick brown fox /57 — 0124</div>
      </div>
      <div class="spec-card" style="background:${esc(d.surface)};border:${hair};border-radius:${d.radius}px">
        <div style="${typeStyle(d.body, 0.75)}color:${esc(d.ink)}">Surface</div>
      </div>
      <div class="spec-btn" style="${typeStyle(d.buttonType, 0.8)}background:${esc(d.primary)};color:${esc(d.onPrimary)};border-radius:${d.radius}px">Button</div>
      <div class="spec-swatch">${swatches.map(s=>`<span style="background:${esc(s.v)}"></span>`).join('')}</div>
    </div>
    <div class="card-meta">
      <span class="card-name">${esc(d.name)}</span>
      <span class="card-idx">[${pad(i)}] ${d.format==='prose'?'PR':''}</span>
    </div>
    <div class="card-strip">${strip.map(s=>`<span style="background:${esc(s.v)}"></span>`).join('')}</div>
  </div>`;
}

function siteHTML(d){
  // resolve real button components when the design defines them
  const rad = v => typeof v==='string' ? (parseFloat(v)||0) : (v||0);
  const lum = h => {const m=/^#([0-9a-fA-F]{6})$/.exec(h||''); if(!m) return 1;
    const n=parseInt(m[1],16); return (0.2126*((n>>16)&255)+0.7152*((n>>8)&255)+0.0722*(n&255))/255;};
  const btns = (d.components||[]).filter(c=>/button/i.test(c.name));
  const pBtn = btns.find(c=>/primary/i.test(c.name)) || {bg:d.primary, fg:d.onPrimary, radius:d.radius, type:'button'};
  const sBtn = btns.find(c=>/secondary/i.test(c.name)) || {bg:d.surface, fg:d.ink, radius:d.radius, type:'button'};
  const hair = d.hairline ? `1px solid ${esc(d.hairline)}` : '1px solid transparent';
  const hairSoft = d.hairline ? `1px solid ${esc(d.hairline)}` : 'none';
  const dScale = Math.min(1, 52/(d.display.size||52));
  const titleT = d.typography.find(t=>/card-title|^title$|headline/i.test(t.name)) || d.display;
  const btnT = d.typography.find(t=>/^button/i.test(t.name)) || d.body;
  const dots = d.colors.filter(c=>/^#[0-9a-fA-F]{3,6}$/.test(c.v)).slice(0,3);
  const marker = Math.abs(lum(d.primary)-lum(d.surface)) < 0.35 ? d.ink : d.primary;
  const btn = (b,label,border) => `<span style="${typeStyle(btnT,0.9)}display:inline-block;background:${esc(b.bg||d.primary)};color:${esc(b.fg||d.onPrimary)};border-radius:${rad(b.radius)}px;padding:10px 22px;${border||''}">${label}</span>`;
  return `<div class="d-section" style="grid-column:1/-1">
    <h3>Sample Site — live preview</h3>
    <div style="border:1px solid var(--ink);background:var(--white)">
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-bottom:1px solid var(--ink);background:var(--canvas)">
        ${dots.map(c=>`<span style="width:10px;height:10px;background:${esc(c.v)};display:block"></span>`).join('')}
        <span class="data" style="font-size:11px;color:var(--ramp-6);margin-left:8px">https://${esc(d.folder)}/</span>
        <span class="data" style="font-size:11px;color:var(--ramp-6);margin-left:auto">PREVIEW 1:1</span>
      </div>
      <div style="background:${esc(d.canvas)};overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 28px;border-bottom:${hairSoft}">
          <span style="display:flex;align-items:center;gap:8px">
            <span style="width:10px;height:10px;background:${esc(d.primary)};display:block;border-radius:${d.radius>6?'9999px':'0'}"></span>
            <span style="${typeStyle(d.body,0.85)}font-weight:700;color:${esc(d.ink)}">${esc(d.folder)}</span>
          </span>
          <span style="display:flex;gap:22px;${typeStyle(d.body,0.75)}color:${esc(d.inkMuted)}">
            <span>Product</span><span>Pricing</span><span>Docs</span>
          </span>
        </div>
        <div style="padding:40px 28px 36px">
          <div style="${typeStyle(d.display,dScale)}color:${esc(d.ink)};max-width:70%">The quick brown fox jumps over /57</div>
          <div style="${typeStyle(d.body,0.95)}color:${esc(d.inkMuted)};max-width:52%;margin-top:14px">Body copy set in this system's text face, size, weight and rhythm — exactly as the tokens specify.</div>
          <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">
            ${btn(pBtn,'Get started')}
            ${btn(sBtn,'Learn more', hairSoft==='none'?'':'border:'+hairSoft)}
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0 28px 32px">
          ${['/01','/02','/03'].map(n=>`
          <div style="background:${esc(d.surface)};border:${hairSoft};border-radius:${d.radius}px;padding:18px">
            <div style="${typeStyle(d.body,0.7)}color:${esc(marker)};margin-bottom:8px">${n}</div>
            <div style="${typeStyle(titleT,Math.min(1,20/(titleT.size||20)))}color:${esc(d.ink)}">Feature card</div>
            <div style="${typeStyle(d.body,0.8)}color:${esc(d.inkMuted)};margin-top:6px">Surface + hairline, this system's radius.</div>
          </div>`).join('')}
        </div>
        <div style="background:${esc(d.ink)};color:${esc(d.canvas)};padding:14px 28px;display:flex;justify-content:space-between;${typeStyle(d.body,0.7)}">
          <span>© 0024 ${esc(d.folder)}</span><span>FOOTER — INK ON CANVAS, INVERTED</span>
        </div>
      </div>
    </div>
  </div>`;
}

function detailHTML(d, i){
  const hexes = d.colors.filter(c=>/^#[0-9a-fA-F]{3,6}$/.test(c.v));
  const types = [...d.typography].sort((a,b)=>(b.size||0)-(a.size||0));
  const comps = d.components.slice(0,12);
  return `
  <div class="detail-head">
    <div>
      <h2>${esc(d.name)}</h2>
      <div class="folder data">design-md/${esc(d.folder)}/DESIGN.md — [${pad(i)}] ${d.format==='tokens'?'FULL TOKENS':'PROSE FORMAT'}</div>
    </div>
    <button class="detail-close" onclick="closeDetail()">CLOSE ✕</button>
  </div>
  <div class="detail-body">
    ${d.desc ? `<p class="detail-desc">${esc(d.desc)}</p>` : ''}
    ${siteHTML(d)}
    <div class="d-section">
      <h3>Palette — ${hexes.length} tokens</h3>
      <div class="pal">${hexes.map(c=>`
        <div class="pal-item" onclick="copyHex('${esc(c.v)}',this)" title="Copy ${esc(c.v)}">
          <div class="pal-swatch" style="background:${esc(c.v)}"></div>
          <div class="pal-label"><div class="pal-hex">${esc(c.v)}</div><div class="pal-key">${esc(c.k)}</div></div>
        </div>`).join('') || '<div class="data" style="padding:16px">NO HEX TOKENS</div>'}
      </div>
    </div>
    <div class="d-section">
      <h3>Type Scale — ${types.length} tokens</h3>
      <div>${types.map(t=>`
        <div class="type-row">
          <span class="type-name">${esc(t.name)}</span>
          <span class="type-sample" style="${typeStyle(t, Math.min(1, 64/(t.size||64)))}">Ag</span>
          <span class="type-spec">${t.size}px / ${t.weight}<br>${esc(String(t.spacing))}</span>
        </div>`).join('') || '<div class="data">PROSE FORMAT — NO TYPE TOKENS</div>'}
      </div>
    </div>
    ${comps.length ? `<div class="d-section" style="grid-column:1/-1">
      <h3>Components — ${comps.length}${d.components.length>12?' of '+d.components.length:''}</h3>
      <div class="comp-grid">${comps.map(c=>{
        const rad = typeof c.radius==='string' ? (parseFloat(c.radius)||0) : (c.radius||0);
        return `<div class="comp">
          <div class="comp-view" style="background:${esc(c.bg||'#fff')};color:${esc(c.fg||'#000')};border-radius:${rad}px">${esc(c.type||'Aa')}</div>
          <div class="comp-name">${esc(c.name)}</div>
        </div>`}).join('')}
      </div>
    </div>`:''}
    <div class="detail-foot">
      <div class="detail-nav">
        <button class="dbtn" onclick="step(-1)">← Prev</button>
        <button class="dbtn" onclick="step(1)">Next →</button>
      </div>
      <span class="data" style="align-self:center">PRIMARY ${esc(d.primary.toUpperCase?d.primary.toUpperCase():d.primary)} · CANVAS ${esc(String(d.canvas).toUpperCase())} · RADIUS ${d.radius}px</span>
    </div>
  </div>`;
}

function render(){
  const needle = q.value.trim().toLowerCase();
  visible = DESIGNS.map((d,i)=>({d,i})).filter(({d})=>{
    if(filter==='dark' && !d.dark) return false;
    if(filter==='light' && d.dark) return false;
    if(filter==='tokens' && d.format!=='tokens') return false;
    if(filter==='prose' && d.format!=='prose') return false;
    if(needle && !(d.name+' '+d.folder+' '+d.desc).toLowerCase().includes(needle)) return false;
    return true;
  });
  grid.innerHTML = visible.map(({d,i})=>cardHTML(d,i)).join('');
  document.getElementById('empty').classList.toggle('show', !visible.length);
  document.getElementById('count').textContent = visible.length + ' / ' + DESIGNS.length + ' SYSTEMS';
  grid.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('click',()=>openDetail(+c.dataset.i));
    c.addEventListener('keydown',e=>{if(e.key==='Enter')openDetail(+c.dataset.i)});
  });
}

function openDetail(i){ cur=i; detail.innerHTML=detailHTML(DESIGNS[i],i); overlay.classList.add('open'); document.body.style.overflow='hidden'; }
function closeDetail(){ overlay.classList.remove('open'); document.body.style.overflow=''; cur=-1; }
function step(dir){
  if(cur<0) return;
  const pos = visible.findIndex(v=>v.i===cur);
  const next = visible[(pos+dir+visible.length)%visible.length];
  if(next) openDetail(next.i);
}
function copyHex(hex, el){
  navigator.clipboard && navigator.clipboard.writeText(hex);
  const h = el.querySelector('.pal-hex'); const old = h.textContent;
  h.textContent = 'COPIED'; setTimeout(()=>h.textContent=old, 800);
}

document.getElementById('controls').addEventListener('click', e=>{
  const chip = e.target.closest('.chip'); if(!chip) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));
  chip.classList.add('on'); filter = chip.dataset.f; render();
});
q.addEventListener('input', render);
overlay.addEventListener('click', e=>{ if(e.target===overlay) closeDetail(); });
document.addEventListener('keydown', e=>{
  if(e.key==='Escape') closeDetail();
  if(e.key==='/' && document.activeElement!==q){ e.preventDefault(); q.focus(); }
  if(cur>=0 && e.key==='ArrowRight') step(1);
  if(cur>=0 && e.key==='ArrowLeft') step(-1);
});

// counts
const n = f => DESIGNS.filter(f).length;
document.getElementById('n-all').textContent = DESIGNS.length;
document.getElementById('n-dark').textContent = n(d=>d.dark);
document.getElementById('n-light').textContent = n(d=>!d.dark);
document.getElementById('n-tokens').textContent = n(d=>d.format==='tokens');
document.getElementById('n-prose').textContent = n(d=>d.format==='prose');
document.getElementById('foot-count').textContent = DESIGNS.length + ' SYSTEMS INDEXED — GENERATED BY scripts/build_catalog.py';

render();

// deep link: catalog.html#d=<folder>
const m = location.hash.match(/^#d=(.+)$/);
if(m){
  const i = DESIGNS.findIndex(d=>d.folder===decodeURIComponent(m[1]));
  if(i>=0) openDetail(i);
}
</script>
</body>
</html>
"""


def main():
    paths = sorted(glob.glob(os.path.join(ROOT, "design-md", "*", "DESIGN.md")))
    designs = [parse_entry(p) for p in paths]
    data = json.dumps(designs, ensure_ascii=False, separators=(",", ":"))
    html = TEMPLATE.replace("__DATA__", data)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html)
    n_tok = sum(1 for d in designs if d["format"] == "tokens")
    print(f"catalog.html written: {len(designs)} designs ({n_tok} token, {len(designs)-n_tok} prose), {len(html)//1024} KB")


if __name__ == "__main__":
    main()
