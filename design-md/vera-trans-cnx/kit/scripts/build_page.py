"""Vera Trans CNX build: inline __IMG_<name>__ JPEGs and __FONTS_CSS__ (Inter, JetBrains Mono, Michroma woff2).

Usage: python3 build_page.py <page.src.html> <page.html> <assets-dir>
Fonts come from the Hub repo's origin/main (app/public/fonts) or VTC_FONT_DIR. Exits 1 on a missing image/font or
any external URL left in the output (w3.org namespaces excepted)."""
import base64, os, re, subprocess, sys
from pathlib import Path

src, out, img_dir = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
html = src.read_text(encoding="utf-8")

def font(name):
    d = os.environ.get("VTC_FONT_DIR")
    if d and (Path(d) / f"{name}.woff2").exists():
        return (Path(d) / f"{name}.woff2").read_bytes()
    repo = os.environ.get("VTC_HUB_REPO", str(Path.home() / "Work/Concentrix/autoalchmey_tracker"))
    return subprocess.run(["git", "-C", repo, "show", f"origin/main:app/public/fonts/{name}.woff2"],
                          check=True, capture_output=True).stdout

if "__FONTS_CSS__" in html:
    faces = []
    for fam, f, w in [("Inter", "Inter", "100 900"), ("JetBrains Mono", "JetBrainsMono", "100 800"), ("Michroma", "Michroma", "400")]:
        b64 = base64.b64encode(font(f)).decode()
        faces.append(f'@font-face{{font-family:"{fam}";src:url(data:font/woff2;base64,{b64}) format("woff2");font-weight:{w};font-display:swap}}')
    html = html.replace("__FONTS_CSS__", "".join(faces))

names = sorted(set(re.findall(r"__IMG_([a-z0-9-]+)__", html)))
missing = [n for n in names if not (img_dir / f"{n}.jpg").exists()]
if missing:
    sys.exit(f"no image for placeholders: {missing}")
for n in names:
    html = html.replace(f"__IMG_{n}__", "data:image/jpeg;base64," + base64.b64encode((img_dir / f"{n}.jpg").read_bytes()).decode())

ext = [u for u in re.findall(r"https?://[^\"') >]+", html) if "www.w3.org" not in u]
if ext:
    sys.exit(f"external URLs left: {sorted(set(ext))[:5]}")
out.write_text(html, encoding="utf-8")
print(f"injected {len(names)} images {names} + fonts; {out} = {out.stat().st_size // 1024} KB")
