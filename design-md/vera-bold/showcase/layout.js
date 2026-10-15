/* ══ VERA BOLD — behaviour for showcase.html ══════════════════════════════
   Registers window.OWN_LAYOUTS['vera-bold'].init(root). Wires the theme
   toggle, the reveal-once observer (viewport; falls back to showing every-
   thing when IntersectionObserver is missing), the KPI count-ups, the active
   section highlight in the sticky bar and the in-frame smooth scroll. init
   returns a cleanup so unmounting leaves no listener, observer, rAF or timer. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  window.OWN_LAYOUTS['vera-bold'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var rafs = [];
      var timeouts = [];
      var observers = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timeouts.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* ── theme toggle (flips the root data-theme, sun ↔ moon) ───────────── */
      var toggle = $('[data-theme-toggle]');
      function syncToggle() {
        if (!toggle) return;
        var light = root.getAttribute('data-theme') === 'light';
        toggle.setAttribute('aria-pressed', String(light));
        toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
      }
      on(toggle, 'click', function () {
        root.setAttribute('data-theme', root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
        syncToggle();
      });
      syncToggle();

      /* ── KPI count-up ──────────────────────────────────────────────────── */
      function finalText(el) {
        return (el.dataset.pre || '') + Number(el.dataset.count).toLocaleString('en-US') + (el.dataset.suf || '');
      }
      function countTo(el, ms) {
        var to = Number(el.dataset.count);
        if (reduced || !el) { el.textContent = finalText(el); el.dataset.v = to; return; }
        var from = Number(el.dataset.v || 0), t0 = performance.now();
        function step(t) {
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 4);
          el.textContent = (el.dataset.pre || '') + Math.round(from + (to - from) * e).toLocaleString('en-US') + (el.dataset.suf || '');
          if (k < 1) raf(step); else el.dataset.v = to;
        }
        raf(step);
      }

      /* ── reveal-once ───────────────────────────────────────────────────── */
      var io = null;
      if (typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            en.target.classList.add('is-in');
            var nums = en.target.hasAttribute('data-count')
              ? [en.target]
              : Array.prototype.slice.call(en.target.querySelectorAll('[data-count]'));
            nums.forEach(function (el) { countTo(el, 1100); });
            io.unobserve(en.target);
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        observers.push(io);
        $$('[data-rv]').forEach(function (el) { io.observe(el); });
      } else {
        $$('[data-rv]').forEach(function (el) { el.classList.add('is-in'); });
        $$('[data-count]').forEach(function (el) { el.textContent = finalText(el); });
      }

      /* ── sticky-bar active section ─────────────────────────────────────── */
      var navLinks = $$('.vb-nav a');
      var sections = navLinks.map(function (a) {
        var href = a.getAttribute('href');
        return href && href.charAt(0) === '#' && href.length > 1 ? root.querySelector(href) : null;
      }).filter(Boolean);
      var best = null;
      function onScroll() {
        if (disposed) return;
        var bestD = Infinity, pick = null;
        sections.forEach(function (el) {
          var top = el.getBoundingClientRect().top;
          if (top < 220) { var d = Math.abs(top - 130); if (d < bestD) { bestD = d; pick = el; } }
        });
        if (pick && pick !== best) {
          best = pick;
          navLinks.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + pick.id); });
        }
      }
      on(window, 'scroll', onScroll, { passive: true });
      later(onScroll, 60);

      /* ── in-frame smooth scroll ────────────────────────────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        });
      });

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
