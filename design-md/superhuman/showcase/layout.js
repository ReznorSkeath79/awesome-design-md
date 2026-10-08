/* ══ SUPERHUMAN — behaviour for showcase.html ═══════════════════════════════
   Registers window.OWN_LAYOUTS['superhuman'].init(root). Wires the feature
   category tabs and a soft reveal on the mock and plan cards. Listeners are
   bound to an AbortController; the observer is disconnected on cleanup. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['superhuman'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var io = null;

      var tabs = root.querySelectorAll('.sh-tab');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) {
            var on = t === tab;
            t.classList.toggle('on', on);
            t.setAttribute('aria-selected', on ? 'true' : 'false');
          });
        }, signal ? { signal: signal } : undefined);
      });

      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        var targets = root.querySelectorAll('.sh-mock, .sh-plan, .sh-device');
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
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        if (io) { try { io.disconnect(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
