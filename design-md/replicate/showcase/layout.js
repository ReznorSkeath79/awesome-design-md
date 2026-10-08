/* ══ NORTHWIND — Replicate-language chrome for showcase.html ════════════════
   Registers window.OWN_LAYOUTS['replicate'].init(root). Wires the filter pills
   and code tabs; returns a cleanup that aborts every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['replicate'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }

      on(root, 'click', function (e) {
        var p = e.target.closest ? e.target.closest('.rp-pill') : null;
        if (p) {
          Array.prototype.forEach.call(root.querySelectorAll('.rp-pill'), function (x) { x.classList.remove('on'); });
          p.classList.add('on');
          return;
        }
        var t = e.target.closest ? e.target.closest('.rp-code-tab') : null;
        if (t) {
          Array.prototype.forEach.call(root.querySelectorAll('.rp-code-tab'), function (x) { x.classList.remove('on'); });
          t.classList.add('on');
        }
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
