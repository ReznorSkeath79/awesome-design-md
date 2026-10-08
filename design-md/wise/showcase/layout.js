/* ══ WISE — own layout behaviour for showcase.html ═════════════════════════
   Registers window.OWN_LAYOUTS['wise'].init(root). Drives the hero throughput
   estimator (regions → estimated throughput) and counts the regional figures
   up on first reveal. init returns a cleanup that removes every listener,
   cancels rAF and disconnects observers. Query only inside `root`. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});
  var BASE = 6140;
  var RATE = 0.97;

  OWN['wise'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var cleanups = [];
      var rafs = [];
      var observers = [];

      function on(el, ev, fn) { el.addEventListener(ev, fn); cleanups.push(function () { el.removeEventListener(ev, fn); }); }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }

      /* ── throughput estimator ─────────────────────────────────────────── */
      var regionsInput = root.querySelector('[data-wi-regions]');
      var out = root.querySelector('[data-wi-out]');
      var rateEl = root.querySelector('[data-wi-rate]');
      function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
      function render() {
        var regions = regionsInput ? Math.max(1, Math.min(12, Number(regionsInput.value) || 1)) : 3;
        var value = BASE * regions;
        if (out) out.textContent = fmt(value);
        if (rateEl) rateEl.textContent = '= ' + RATE.toFixed(2) + ' on-time across ' + regions + ' region' + (regions === 1 ? '' : 's');
      }
      if (regionsInput) { on(regionsInput, 'input', render); on(regionsInput, 'change', render); render(); }

      /* ── regional figures count up ────────────────────────────────────── */
      function countTo(el) {
        var target = Number(el.getAttribute('data-wi-count'));
        if (!isFinite(target)) return;
        var start = 0;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / 900);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(target * eased);
          if (p < 1) raf(step);
        }
        raf(step);
      }
      var counts = root.querySelectorAll('[data-wi-count]');
      if (reduced || typeof IntersectionObserver === 'undefined') {
        counts.forEach(function (el) { var t = Number(el.getAttribute('data-wi-count')); if (isFinite(t)) el.textContent = fmt(t); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { countTo(en.target); io.unobserve(en.target); } });
        }, { threshold: .4 });
        counts.forEach(function (el) { io.observe(el); });
        observers.push(io);
      }

      return function cleanup() {
        cleanups.forEach(function (fn) { try { fn(); } catch (e) { /* ignore */ } });
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
