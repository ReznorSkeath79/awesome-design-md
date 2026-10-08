/* ══ STARBUCKS — behaviour for showcase.html ════════════════════════════════
   Registers window.OWN_LAYOUTS['starbucks'].init(root). The layout is almost
   entirely static CSS; the only scripted motion is a gentle fade-in as cards and
   tiers enter the frame. init returns a cleanup that disconnects the observer. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['starbucks'] = {
    init: function (root) {
      var observer = null;
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var targets = root.querySelectorAll('.sb-card, .sb-tier, .sb-plogo');

      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'none';
              io.unobserve(entry.target);
            }
          });
        }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        targets.forEach(function (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(14px)';
          el.style.transition = 'opacity .5s ease, transform .5s ease';
          io.observe(el);
        });
        observer = io;
      }

      return function cleanup() {
        if (observer) { try { observer.disconnect(); } catch (e) { /* ignore */ } }
        targets.forEach(function (el) {
          el.style.opacity = '';
          el.style.transform = '';
          el.style.transition = '';
        });
      };
    }
  };
})();
