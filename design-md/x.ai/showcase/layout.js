/* ══ X.AI — own layout behaviour for showcase.html ═════════════════════════
   Registers window.OWN_LAYOUTS['x.ai'].init(root). Counts the metric figures
   up on first reveal. init returns a cleanup that cancels rAF and disconnects
   observers. Query only inside `root`. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['x.ai'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var rafs = [];
      var observers = [];

      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function fmt(n) { return Math.round(n).toLocaleString('en-US'); }

      function countTo(el) {
        var target = Number(el.getAttribute('data-xa-count'));
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

      var nums = root.querySelectorAll('[data-xa-count]');
      if (reduced || typeof IntersectionObserver === 'undefined') {
        nums.forEach(function (el) { var t = Number(el.getAttribute('data-xa-count')); if (isFinite(t)) el.textContent = fmt(t); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { countTo(en.target); io.unobserve(en.target); } });
        }, { threshold: .4 });
        nums.forEach(function (el) { io.observe(el); });
        observers.push(io);
      }

      return function cleanup() {
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
