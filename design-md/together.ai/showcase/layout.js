/* ══ TOGETHER.AI — behaviour for showcase.html ═════════════════════════════
   Registers window.OWN_LAYOUTS['together.ai'].init(root). Wires in-layout
   anchor scrolling; returns a cleanup that aborts its listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['together.ai'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }

      Array.prototype.forEach.call(root.querySelectorAll('a[href^="#"]'), function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
        });
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
