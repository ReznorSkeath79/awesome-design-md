/* ══ NORTHWIND — Revolut-language chrome for showcase.html ══════════════════
   Registers window.OWN_LAYOUTS['revolut'].init(root). Wires the FAQ accordion
   (single-open) and returns a cleanup that aborts every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['revolut'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }

      on(root, 'click', function (e) {
        var s = e.target.closest ? e.target.closest('.rv-faq-item summary') : null;
        if (!s) return;
        var item = s.parentNode;
        if (!item.hasAttribute('open')) {
          Array.prototype.forEach.call(root.querySelectorAll('.rv-faq-item[open]'), function (d) {
            if (d !== item) d.removeAttribute('open');
          });
        }
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
