/* ══ THE VERGE — behaviour for showcase.html ════════════════════════════════
   Registers window.OWN_LAYOUTS['theverge'].init(root). The Verge is flat and
   colour-only, so the script just intercepts the sample subscribe form (no
   navigation away) and adds a soft reveal to the stream items. The form handler
   is bound to an AbortController and the observer disconnected on cleanup. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['theverge'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var io = null;

      var form = root.querySelector('.tv-form');
      var input = root.querySelector('.tv-input');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (input) {
            input.value = '';
            input.placeholder = 'Subscribed \u2014 check your inbox.';
          }
        }, signal ? { signal: signal } : undefined);
      }

      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        var targets = root.querySelectorAll('.tv-item, .tv-tile, .tv-feature');
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
          el.style.transition = 'opacity .5s ease, transform .5s ease';
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
