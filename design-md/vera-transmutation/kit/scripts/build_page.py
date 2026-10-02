"""Vera Transmutation build: replace __IMG_<name>__ placeholders in a source HTML with JPEG data URIs.

Usage: python3 build_page.py <page.src.html> <page.html> <assets-dir>
Every placeholder needs <assets-dir>/<name>.jpg; the output is one self-contained file."""
import base64, re, sys
from pathlib import Path
src, out, img_dir = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
html = src.read_text(encoding="utf-8")
names = sorted(set(re.findall(r"__IMG_([a-z0-9-]+)__", html)))
missing = [n for n in names if not (img_dir / f"{n}.jpg").exists()]
if missing:
    sys.exit(f"no image for placeholders: {missing}")
for n in names:
    uri = "data:image/jpeg;base64," + base64.b64encode((img_dir / f"{n}.jpg").read_bytes()).decode()
    html = html.replace(f"__IMG_{n}__", uri)
out.write_text(html, encoding="utf-8")
print(f"injected {len(names)} images: {names}; {out} = {out.stat().st_size // 1024} KB")
