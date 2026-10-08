/* ══ SUPABASE — behaviour for showcase.html ═════════════════════════════════
   Registers window.OWN_LAYOUTS['supabase'].init(root). Wires the capability
   tabs (single-select, roving aria-selected) and a soft reveal on the mockup
   panes / cards. Everything is torn down in the returned cleanup: the tab
   listeners are bound to an AbortController and the observer is disconnected. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['supabase'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var io = null;

      var tabs = root.querySelectorAll('.sp-tab');
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
        var targets = root.querySelectorAll('.sp-dash, .sp-pcard, .sp-codeblock');
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
