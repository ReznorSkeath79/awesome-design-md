/* ══ VERA TRANSMUTATION — leadership plan page for showcase.html ═══════════
Ported from the kit's template.src.html. Registers
window.OWN_LAYOUTS['vera-transmutation'].init(root). Everything is queried
inside root; init returns a cleanup that removes listeners, cancels rAF /
timers, disconnects observers and resets any transforms. */
(function () {
var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});
OWN['vera-transmutation'] = {
init: function (root) {
var win = window;
var reduce = false, coarse = false, fine = false;
try {
reduce = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
coarse = win.matchMedia('(pointer: coarse)').matches;
fine = !reduce && !coarse && win.matchMedia('(hover: hover)').matches;
} catch (e) { /* ignore */ }
root.classList.add('vt-js');
var AC = win.AbortController ? new AbortController() : null;
var signal = AC ? AC.signal : undefined;
var disposed = false;
var rafs = [], timers = [], intervals = [], observers = [];
var seen = null;
try { seen = new WeakSet(); } catch (e) { seen = null; }
function on(el, type, fn, opt) {
if (!el) return;
opt = Object.assign({}, opt || {});
if (signal) opt.signal = signal;
el.addEventListener(type, fn, opt);
}
function raf(fn) { var id = win.requestAnimationFrame(fn); rafs.push(id); return id; }
function every(fn, ms) { var id = win.setInterval(fn, ms); intervals.push(id); return id; }
function later(fn, ms) { var id = win.setTimeout(fn, ms); timers.push(id); return id; }
function $(sel) { return root.querySelector(sel); }
function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
/* ── nav + readout ─────────────────────────────────────────────────── */
var sections = $$('.content section[id]');
var SECTION_IDS = sections.map(function (x) { return x.id; });
var links = $$('.nav a');
var readout = $('#readout');
if ('IntersectionObserver' in win && sections.length) {
var io = new IntersectionObserver(function (es) {
es.forEach(function (e) {
if (!e.isIntersecting) return;
var id = e.target.id;
links.forEach(function (a) { a.classList.toggle('active', a.dataset.section === id); });
var i = SECTION_IDS.indexOf(id);
if (i >= 0 && readout) {
readout.textContent = 'SECTION ' + String(i + 1).padStart(2, '0') + ' / ' + String(SECTION_IDS.length).padStart(2, '0');
}
});
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(function (el) { io.observe(el); });
observers.push(io);
}
/* ── count-up ──────────────────────────────────────────────────────── */
function animateCount(el) {
if (reduce) return;
var target = parseFloat(el.dataset.count);
if (isNaN(target)) return;
var dec = parseInt(el.dataset.dec || '0', 10);
var fin = el.textContent, t0 = null, dur = 1200;
function tick(t) {
if (disposed) { el.textContent = fin; return; }
if (!t0) t0 = t;
var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
el.textContent = (target * e).toFixed(dec);
if (p < 1) raf(tick); else el.textContent = fin;
}
raf(tick);
}
function countKpi(el) {
if (reduce) return;
var txt = el.textContent, m = txt.match(/(\d+(?:\.\d+)?)/);
if (!m) return;
var idx = m.index, raw = m[0], after = txt.slice(idx + raw.length);
if (/^[–\-—]/.test(after)) return;
var dec = raw.indexOf('.') >= 0 ? raw.split('.')[1].length : 0;
var pre = txt.slice(0, idx), suf = after, target = parseFloat(raw), t0 = null, dur = 1100;
function tick(t) {
if (disposed) { el.textContent = txt; return; }
if (!t0) t0 = t;
var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
el.textContent = pre + (target * e).toFixed(dec) + suf;
if (p < 1) raf(tick); else el.textContent = txt;
}
raf(tick);
}
/* ── hero tick ring ────────────────────────────────────────────────── */
var heroTicks = $('#heroTicks');
if (heroTicks) {
var SVNS = 'http://www.w3.org/2000/svg';
for (var ti = 0; ti < 60; ti++) {
var tang = ti * 6 * Math.PI / 180, tr2 = (ti % 5 === 0) ? 164 : 157;
var line = document.createElementNS(SVNS, 'line');
line.setAttribute('x1', (200 + 150 * Math.cos(tang)).toFixed(2));
line.setAttribute('y1', (200 + 150 * Math.sin(tang)).toFixed(2));
line.setAttribute('x2', (200 + tr2 * Math.cos(tang)).toFixed(2));
line.setAttribute('y2', (200 + tr2 * Math.sin(tang)).toFixed(2));
line.setAttribute('stroke', 'var(--border)');
line.setAttribute('stroke-width', (ti % 5 === 0) ? '1.4' : '0.9');
heroTicks.appendChild(line);
}
}
/* ── table scroll hints ────────────────────────────────────────────── */
function updateTableHints() {
$$('.table-wrap').forEach(function (w) { w.classList.toggle('is-scrollable', w.scrollWidth - 1 > w.clientWidth); });
}
on(win, 'load', updateTableHints);
on(win, 'resize', updateTableHints);
updateTableHints();
/* ── channel dots ──────────────────────────────────────────────────── */
var dotWrap = $('#chanDots'), dots = [];
if (dotWrap) {
for (var di = 0; di < 306; di++) {
var d = document.createElement('span');
d.className = 'dot';
dotWrap.appendChild(d);
dots.push(d);
}
if (reduce) dots[0].classList.add('lit');
}
function sweepDots() {
if (reduce || !dots.length || disposed) return;
var i = 0;
var iv = every(function () {
if (i < dots.length) { dots[i].classList.add('lit'); i++; }
else { clearInterval(iv); dots.forEach(function (x) { x.classList.remove('lit'); }); dots[0].classList.add('lit'); }
}, 2);
}
function onReveal(el) {
Array.prototype.slice.call(el.querySelectorAll('[data-count]')).forEach(animateCount);
Array.prototype.slice.call(el.querySelectorAll('.kpi .v')).forEach(countKpi);
if (el.querySelector && el.querySelector('#chanDots')) sweepDots();
}
/* ── reveals ───────────────────────────────────────────────────────── */
var reveals = $$('.reveal');
function showAll() { reveals.forEach(function (el) { el.classList.add('in'); onReveal(el); }); }
if (!('IntersectionObserver' in win)) { showAll(); }
else {
var rio = new IntersectionObserver(function (es) {
es.forEach(function (e) {
if (e.isIntersecting) { e.target.classList.add('in'); onReveal(e.target); rio.unobserve(e.target); }
});
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
reveals.forEach(function (el) { rio.observe(el); });
observers.push(rio);
}
var steps = $$('.steps');
if ('IntersectionObserver' in win) {
var sio = new IntersectionObserver(function (es) {
es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); sio.unobserve(e.target); } });
}, { threshold: 0.25 });
steps.forEach(function (el) { sio.observe(el); });
observers.push(sio);
}
/* ── scroll progress ───────────────────────────────────────────────── */
var bar = $('#progress');
function onScroll() {
if (disposed) return;
var r = root.getBoundingClientRect();
var total = root.offsetHeight - win.innerHeight;
var p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
}
on(win, 'scroll', onScroll, { passive: true });
on(win, 'resize', onScroll);
onScroll();
/* ── process map stage sequence ────────────────────────────────────── */
var pmap = $('#pmap');
var pmBlooms = $$('#pmap .pm-bloom'), pmLabels = $$('#pmap .pm-label');
var pmStage = 0, pmTimer = null, pmVisible = false;
function pmSet(s) {
pmBlooms.forEach(function (b) { b.classList.toggle('active', +b.dataset.stage === s); });
pmLabels.forEach(function (l) { l.classList.toggle('active', +l.dataset.stage === s); });
}
function pmStart() {
if (reduce || pmTimer || !pmVisible) return;
pmSet(0);
pmTimer = every(function () { pmStage = (pmStage + 1) % 4; pmSet(pmStage); }, 1500);
}
function pmStop() { if (pmTimer) { clearInterval(pmTimer); pmTimer = null; } }
pmSet(0);
/* ── pause CSS/SMIL while off-screen ───────────────────────────────── */
var pauseEls = $$('[data-pause]');
if ('IntersectionObserver' in win) {
var pio = new IntersectionObserver(function (es) {
es.forEach(function (e) {
var inv = e.isIntersecting;
e.target.classList.toggle('paused', !inv);
Array.prototype.slice.call(e.target.querySelectorAll('svg[data-smil]')).forEach(function (s) {
try { if (reduce) s.pauseAnimations(); else { inv ? s.unpauseAnimations() : s.pauseAnimations(); } } catch (err) { /* ignore */ }
});
if (e.target === pmap) { pmVisible = inv; inv ? pmStart() : pmStop(); }
});
}, { rootMargin: '120px' });
pauseEls.forEach(function (el) { pio.observe(el); });
observers.push(pio);
}
if (reduce) {
$$('svg[data-smil]').forEach(function (s) { try { s.pauseAnimations(); } catch (err) { /* ignore */ } });
}
/* ── single rAF parallax loop, only while a figure is on screen ─────── */
var par = $$('.fig-frame, .hero-stage').filter(function (el) { return !(el.closest && el.closest('.vision-fig')); });
var parVisible = [], parRunning = false;
function parFrame() {
if (disposed || !parVisible.length) { parRunning = false; return; }
var vh = win.innerHeight;
parVisible.forEach(function (el) {
var r = el.getBoundingClientRect();
var c = r.top + r.height / 2;
var t = (c - vh / 2) / (vh / 2);
t = Math.max(-1, Math.min(1, t));
el.style.transform = 'translateY(' + (t * 10).toFixed(2) + 'px)';
});
raf(parFrame);
}
function parStart() { if (reduce || parRunning || disposed) return; parRunning = true; raf(parFrame); }
if ('IntersectionObserver' in win) {
var parIO = new IntersectionObserver(function (es) {
es.forEach(function (e) {
var i = parVisible.indexOf(e.target);
if (e.isIntersecting) { if (i < 0) parVisible.push(e.target); }
else if (i >= 0) { parVisible.splice(i, 1); }
});
parStart();
}, { rootMargin: '60px' });
par.forEach(function (el) { parIO.observe(el); });
observers.push(parIO);
}
/* ── pointer spotlight (fine pointers only) ────────────────────────── */
var moveQE = null, moveEl = null, moveEvt = null;
function applyMove() {
moveQE = null;
var el = moveEl, e = moveEvt;
if (!el || !e) return;
var r = el.getBoundingClientRect();
el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
}
if (fine) {
on(root, 'pointermove', function (e) {
var el = e.target.closest ? e.target.closest('.card,.kpi,.decision') : null;
if (!el) return;
moveEl = el; moveEvt = e;
if (moveQE) return;
moveQE = raf(applyMove);
}, { passive: true });
}
      /* ── export (print) ────────────────────────────────────────────────── */
      on($('#vtPrint'), 'click', function () { try { win.print(); } catch (e) { /* ignore */ } });

      /* ── smooth in-layout anchor scroll ────────────────────────────────── */
$$('a[href^="#"]').forEach(function (a) {
on(a, 'click', function (e) {
var href = a.getAttribute('href');
if (!href || href.length < 2) return;
var target = root.querySelector(href);
if (!target || target === root) return;
e.preventDefault();
target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
});
});
return function cleanup() {
disposed = true;
root.classList.remove('vt-js');
if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
rafs.forEach(function (id) { cancelAnimationFrame(id); });
timers.forEach(function (id) { clearTimeout(id); });
intervals.forEach(function (id) { clearInterval(id); });
observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
if (bar) bar.style.transform = '';
par.forEach(function (el) { el.style.transform = ''; });
};
}
};
})();
