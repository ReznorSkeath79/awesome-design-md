/* ══ WEBFLOW — own layout behaviour for showcase.html ══════════════════════
   Registers window.OWN_LAYOUTS['webflow'].init(root). Counts the KPI numbers
   up on first reveal and does nothing else; init returns a cleanup that
   cancels every rAF / observer it started. Query only inside `root`. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['webflow'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var rafs = [];
      var observers = [];

      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }

      function countTo(el) {
        var target = Number(el.getAttribute('data-cwf'));
        if (!isFinite(target)) return;
        var suffix = /\D+$/.exec(el.textContent);
        var tail = suffix ? suffix[0] : '';
        var dur = 900;
        var start = 0;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + tail;
          if (p < 1) raf(step);
        }
        raf(step);
      }

      var nums = root.querySelectorAll('[data-cwf]');
      if (reduced || typeof IntersectionObserver === 'undefined') {
        nums.forEach(function (el) {
          var t = Number(el.getAttribute('data-cwf'));
          if (isFinite(t)) {
            var tail = (/\D+$/.exec(el.textContent) || [''])[0];
            el.textContent = t.toLocaleString() + tail;
          }
        });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { countTo(en.target); io.unobserve(en.target); }
          });
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
