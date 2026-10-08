/* ══ STRIPE — behaviour for showcase.html ═══════════════════════════════════
   Registers window.OWN_LAYOUTS['stripe'].init(root). Adds a soft reveal to the
   composited mockup and feature/pricing cards as they enter the frame. The mesh
   is static SVG; nothing is time-based, so the reduced-motion path skips it and
   the returned cleanup removes every listener/style. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['stripe'] = {
    init: function (root) {
      var io = null;
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var targets = root.querySelectorAll('.st-panel, .st-ccard, .st-pcard, .st-code');

      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'none';
              io.unobserve(entry.target);
            }
          });
        }, { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

        targets.forEach(function (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(16px)';
          el.style.transition = 'opacity .55s ease, transform .55s ease';
          io.observe(el);
        });
      }

      return function cleanup() {
        if (io) { try { io.disconnect(); } catch (e) { /* ignore */ } }
        targets.forEach(function (el) {
          el.style.opacity = '';
          el.style.transform = '';
          el.style.transition = '';
        });
      };
    }
  };
})();
