/* ══ AI NAVIGATOR — ops-console behaviour for showcase.html ═══════════════
   Registers window.OWN_LAYOUTS['ai-navigator'].init(root). Reproduces the app's
   My Dashboard interactions: the tab bar (switching panels), the KPI count-up,
   the region-bar fill animation, the tooltip chips, and the light/dark theme
   toggle (token override on the root, remembered per layout). init returns a
   cleanup fn so unmounting leaves no listener, observer, rAF or timer behind. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['ai-navigator'] = {
    init: function (root) {
      var STORE = 'own-ai-navigator-theme';

      var $ = function (sel) { return root.querySelector(sel); };
      var $$ = function (sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };

      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var observers = [];
      var rafs = [];
      var timeouts = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        var o = Object.assign({}, opt || {});
        if (signal) o.signal = signal;
        el.addEventListener(type, fn, o);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timeouts.push(id); return id; }

      /* ── theme toggle ──────────────────────────────────────────────────── */
      function setTheme(light) {
        root.classList.toggle('an-light', light);
        try { localStorage.setItem(STORE, light ? 'light' : 'dark'); } catch (e) { /* ignore */ }
      }
      var saved = null;
      try { saved = localStorage.getItem(STORE); } catch (e) { /* ignore */ }
      if (saved === 'light') setTheme(true);
      on($('[data-an-theme]'), 'click', function () {
        setTheme(!root.classList.contains('an-light'));
      });

      /* ── tooltips (data-an-tip → data-tip consumed by shared CSS not present
             inside the frame, so render a tiny inline label instead) ───────── */
      $$('.an-icon[data-an-tip]').forEach(function (btn) {
        var tip = btn.getAttribute('data-an-tip');
        if (tip) btn.setAttribute('title', tip);
      });

      /* ── section nav: scroll-spy + smooth in-layout scroll ──────────────── */
      function selectTab(id) {
        $$('.an-tab').forEach(function (t) {
          var on = t.getAttribute('data-an-tab') === id;
          t.classList.toggle('on', on);
          if (on) t.setAttribute('aria-current', 'true');
          else t.removeAttribute('aria-current');
        });
        if (id === 'an-overview') runCounts();
      }
      var SECTIONS = ['an-overview', 'an-throughput', 'an-regions', 'an-pricing'];
      if (typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(function (entries) {
          if (disposed) return;
          var visible = entries.filter(function (en) { return en.isIntersecting; });
          if (!visible.length) return;
          visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
          selectTab(visible[0].target.id);
        }, { rootMargin: '-150px 0px -65% 0px', threshold: 0 });
        SECTIONS.forEach(function (id) {
          var el = root.querySelector('#' + id);
          if (el) io.observe(el);
        });
        observers.push(io);
      }
      $$('.an-tab').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          var target = href && root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          selectTab(target.id);
        });
      });
      if (location.hash && SECTIONS.indexOf(location.hash.replace('#', '')) !== -1) {
        selectTab(location.hash.replace('#', ''));
      }

      /* ── KPI count-up ───────────────────────────────────────────────────── */
      function fmtFor(el, v) {
        var fmt = el.getAttribute('data-an-fmt');
        if (fmt === 'k') return Math.round(v / 1000) + 'K';
        if (fmt === 'pct') return v.toFixed(1) + '%';
        return String(Math.round(v));
      }
      function countTo(el) {
        var to = Number(el.getAttribute('data-an-count') || 0);
        if (reduced) { el.textContent = fmtFor(el, to); return; }
        var from = Number(el.dataset.v || 0), t0 = performance.now(), ms = 900;
        function step(t) {
          if (disposed) return;
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 4);
          el.textContent = fmtFor(el, from + (to - from) * e);
          if (k < 1) raf(step); else el.dataset.v = to;
        }
        raf(step);
      }
      function runCounts() { $$('[data-an-count]').forEach(countTo); }

      /* ── region bars: animate fill in when scrolled into view ───────────── */
      function primeBars(bars) {
        Array.prototype.forEach.call(bars.querySelectorAll('.an-bar i'), function (bar) {
          if (!bar.dataset.w) bar.dataset.w = bar.style.width || '0%';
          bar.style.width = '0%';
        });
      }
      function fillBars(bars) {
        Array.prototype.forEach.call(bars.querySelectorAll('.an-bar i'), function (bar) {
          bar.style.width = bar.dataset.w || bar.style.width;
        });
      }
      var barEls = $$('.an-bars');
      if (reduced) {
        /* leave the authored widths in place */
      } else {
        barEls.forEach(primeBars);
        if (typeof IntersectionObserver !== 'undefined') {
          var bio = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) { fillBars(en.target); bio.unobserve(en.target); }
            });
          }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });
          barEls.forEach(function (b) { bio.observe(b); });
          observers.push(bio);
        } else {
          barEls.forEach(fillBars);
        }
      }

      /* ── boot ───────────────────────────────────────────────────────────── */
      runCounts();

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        timeouts.forEach(function (id) { clearTimeout(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
