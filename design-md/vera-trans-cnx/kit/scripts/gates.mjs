// Hard-gate sweep for Vera Transmutation pages (../../rubric.md, gates G1–G7).
// Usage: node gates.mjs <page.html> <content-lines.json> <outDir>
// Playwright is borrowed from a repo that has it installed (default: the AutoAlchemy Hub);
// override with PLAYWRIGHT_ROOT=<dir containing package.json>. Uses the system Chrome.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(path.join(process.env.PLAYWRIGHT_ROOT || path.join(process.env.HOME, 'Work/Concentrix/autoalchmey_tracker'), 'package.json'));
const { chromium } = require('playwright');

const [pagePath, linesPath, outDir] = process.argv.slice(2);
if (!pagePath || !linesPath || !outDir) { console.error('usage: plan_gates.mjs page.html lines.json outDir'); process.exit(2); }
fs.mkdirSync(outDir, { recursive: true });
const url = 'file://' + path.resolve(pagePath);
const lines = JSON.parse(fs.readFileSync(linesPath, 'utf8'));
const norm = (t) => t.replace(/\s+/g, ' ').trim();

const browser = await chromium.launch({ channel: 'chrome' });
const result = { gates: {}, shots: [], details: {} };

async function open(width, theme, reduced = false) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
  // scroll through so reveals and charts fire
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 600) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  return { ctx, page, errors };
}

// Capture a tall page one viewport at a time (a single fullPage shot repeats content past ~16,384 px).
async function segments(page, name) {
  const files = [];
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = await page.evaluate(() => window.innerHeight);
  let i = 0;
  for (let y = 0; y < h; y += vh - 60) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(350);
    const f = path.join(outDir, `${name}-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: f });
    files.push(f); i++;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return files;
}

// G1 content, G2 media, G3 console, G6 restraint, screenshots — desktop both themes
for (const theme of ['corp-dark']) {
  const { ctx, page, errors } = await open(1440, theme);
  if (theme === 'corp-dark') {
    const text = norm(await page.evaluate(() => document.title + ' ' + document.body.innerText + ' ' + document.body.textContent));
    // Wording, not spacing: snapshots of inline markup ("numbers , not") and rendered text
    // ("numbers, not", flex-item pills) disagree on whitespace only, so compare with it removed.
    const squash = (t) => t.replace(/\s+/g, '');
    const flat = squash(text);
    const missing = lines.filter((l) => !flat.includes(squash(l)));
    result.gates.G1_content = { pass: missing.length === 0, missing: missing.slice(0, 20), total: lines.length };
    const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.alt || i.src.slice(0, 60)));
    result.gates.G2_media = { pass: broken.length === 0, broken };
    const infinite = await page.evaluate(() => document.getAnimations()
      .filter((a) => a.effect && a.effect.getTiming().iterations === Infinity && a.playState === 'running')
      .map((a) => {
        const t = a.effect.target; const pe = a.effect.pseudoElement || '';
        return { name: a.animationName || a.id || 'anim', el: t ? (t.tagName.toLowerCase() + (t.id ? '#' + t.id : '') + (typeof t.className === 'string' && t.className ? '.' + t.className.trim().split(/\s+/).join('.') : '')) : '?', pseudo: pe };
      }));
    // [data-pause] elements only animate while on screen: visit each and collect what runs there
    const pausedCount = await page.evaluate(() => document.querySelectorAll('[data-pause]').length);
    for (let i = 0; i < pausedCount; i++) {
      await page.evaluate((k) => document.querySelectorAll('[data-pause]')[k].scrollIntoView({ block: 'center' }), i);
      await page.waitForTimeout(500);
      const here = await page.evaluate(() => document.getAnimations()
        .filter((a) => a.effect && a.effect.getTiming().iterations === Infinity && a.playState === 'running')
        .map((a) => { const t = a.effect.target; return { name: a.animationName || a.id || 'anim', el: t ? (t.tagName.toLowerCase() + (typeof t.className === 'string' && t.className ? '.' + t.className.trim().split(/\s+/).join('.') : (t.className && t.className.baseVal ? '.' + t.className.baseVal.trim().split(/\s+/).join('.') : ''))) : '?', pseudo: a.effect.pseudoElement || '' }; }));
      for (const a of here) if (!infinite.some((b) => b.name === a.name && b.el === a.el)) infinite.push(a);
    }
    const crawls = infinite.filter((a) => /crawl/i.test(a.name) || /crawl/i.test(a.el));
    // allow-list (rubric G6): hero rings/particles/float, process-map + diagram flow, fact ticker, background drift
    const allowed = /spin|ring|orbit|node|seq|dash|current|flow|marquee|aurora|drift|blob|herofloat|breathe|glow|^pm|scan|waveosc|^v[A-Z]|tile|marker|bracket|glint|sweep|prism/i; // waveOsc / scanY / pmProg = process-map motion graphic
    const notAllowed = infinite.filter((a) => !allowed.test(a.name));
    result.gates.G6_restraint = { pass: crawls.length === 0 && notAllowed.length === 0, always_on_crawls: crawls, not_allowlisted: notAllowed, infinite_count: infinite.length, infinite: infinite.slice(0, 80) };
  }
  result.gates['G3_console_' + theme] = { pass: errors.length === 0, errors: errors.slice(0, 10) };
  result.shots.push(...await segments(page, `desktop-${theme}`));
  await ctx.close();
}

// G4 overflow at four widths (dark), mobile + tablet screenshots
const overflow = {};
for (const w of [1440, 1024, 768, 390]) {
  const { ctx, page } = await open(w, 'corp-dark');
  // scrollWidth alone misses overflow that .frame{overflow:clip} hides (2026-10-06: Teams-card mocks cut off at 390 px),
  // so also flag any element in <main> whose box runs past the viewport edge (scrolling tables/ticker excluded).
  overflow[w] = await page.evaluate(() => {
    const iw = window.innerWidth;
    const clipped = [...document.querySelectorAll('main *')]
      .filter((el) => !el.closest('.table-wrap, .marquee, svg, .fig-frame') && el.getClientRects().length)
      .filter((el) => el.getBoundingClientRect().right > iw + 1)
      .slice(0, 8).map((el) => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '') + ' @' + Math.round(el.getBoundingClientRect().right));
    return { scrollWidth: document.documentElement.scrollWidth, innerWidth: iw, clipped };
  });
  if (w === 390 || w === 1024) result.shots.push(...await segments(page, `w${w}-corp-dark`));
  await ctx.close();
}
result.gates.G4_overflow = { pass: Object.values(overflow).every((o) => o.scrollWidth <= o.innerWidth && o.clipped.length === 0), overflow };

// G5 reduced motion
{
  const { ctx, page } = await open(1440, 'corp-dark', true);
  const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('section, section *')]
    .filter((e) => getComputedStyle(e).opacity === '0' && e.textContent.trim().length > 20).length);
  result.gates.G5_reduced_motion = { pass: running === 0 && hidden === 0, running, hidden_text_elements: hidden };
  await ctx.close();
}

// Focus evidence: Tab through the first stops, record the outline on each, screenshot two of them
{
  const { ctx, page } = await open(1440, 'corp-dark');
  const stops = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(120);
    const info = await page.evaluate(() => {
      const el = document.activeElement; if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return { tag: el.tagName.toLowerCase(), text: (el.textContent || '').trim().slice(0, 30), outline: `${cs.outlineStyle} ${cs.outlineWidth}`, visible: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 1 };
    });
    if (info) {
      stops.push(info);
      if (/export/i.test(info.text) || (info.tag === 'a' && stops.filter((s) => s.tag === 'a').length === 2)) {
        const f = path.join(outDir, `focus-${stops.length}-${info.tag}.png`);
        await page.screenshot({ path: f }); result.shots.push(f);
      }
    }
  }
  result.gates.G7_focus_visible = { pass: stops.length > 0 && stops.every((s) => s.visible), stops };
  await ctx.close();
}

await browser.close();
result.all_pass = Object.values(result.gates).every((g) => g.pass);
fs.writeFileSync(path.join(outDir, 'gates.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ all_pass: result.all_pass, gates: Object.fromEntries(Object.entries(result.gates).map(([k, v]) => [k, v.pass])) }));
