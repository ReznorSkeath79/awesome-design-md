/* ══ NORTHWIND (Expo design language) — own showcase layout behaviour ══════
   Registers window.OWN_LAYOUTS['expo'].init(root). Everything is queried inside
   `root`; `init` returns a cleanup function so unmounting leaves no listener,
   rAF, observer or timer behind. The page is largely static — the JS only fills
   the mock dashboard log, animates the KPI counters, and toggles the mobile nav. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Fictional operations events — no real Expo product surface or brand copy. */
  var LOG = [
    { t: '14:02', msg: 'APAC · throughput +6.4% vs plan', warn: false },
    { t: '13:58', msg: 'EU-West · queue depth normalized', warn: true },
    { t: '13:41', msg: 'US-East · alert resolved in 3m 12s', warn: false },
    { t: '13:30', msg: 'LATAM · cost per unit $0.021', warn: false }
  ];

  OWN['expo'] = {
    init: function (root) {
      if (!root) return function () {};

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

      /* ── mock dashboard log ──────────────────────────────────────────── */
      var logEl = $('#expoLog');
      if (logEl) {
        logEl.innerHTML = LOG.map(function (row) {
          return '<span class="log-line"><i class="log-dot' + (row.warn ? ' warn' : '') + '"></i>'
            + '<b>' + esc(row.t) + '</b><span>' + esc(row.msg) + '</span></span>';
        }).join('');
      }

      /* ── KPI count-up (respects reduced motion) ──────────────────────── */
      function countTo(el) {
        var to = Number(el.getAttribute('data-count') || 0);
        var suffix = el.getAttribute('data-suffix') || '';
        var fmt = el.getAttribute('data-fmt');
        function render(v) {
          if (fmt === 'k') return Math.round(v).toLocaleString('en-US');
          return String(Math.round(v)) + suffix;
        }
        if (reduced) { el.textContent = render(to); return; }
        var t0 = performance.now();
        function step(t) {
          if (disposed) return;
          var k = Math.min(1, (t - t0) / 900);
          var e = 1 - Math.pow(1 - k, 4);
          el.textContent = render(to * e);
          if (k < 1) raf(step);
        }
        raf(step);
      }
      $$('.kpi-num').forEach(countTo);

      /* ── mobile nav toggle ───────────────────────────────────────────── */
      var nav = $('#expoNav');
      var burger = $('[data-burger]');
      function closeMenu() {
        if (!nav) return;
        nav.classList.remove('menu-open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      }
      on(burger, 'click', function () {
        if (!nav) return;
        var open = nav.classList.toggle('menu-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      on(document, 'keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

      /* ── in-layout smooth scroll for same-page links ─────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          closeMenu();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
        });
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        timeouts.forEach(function (id) { clearTimeout(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
        closeMenu();
      };
    }
  };
})();
