/* ══ NORTHWIND — Raycast-language chrome for showcase.html ══════════════════
   Registers window.OWN_LAYOUTS['raycast'].init(root). Wires the store filter
   pills and the mobile menu; returns a cleanup that aborts every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['raycast'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }

      var pills = root.querySelectorAll ? root.querySelectorAll('.rc-pill') : [];
      on(root, 'click', function (e) {
        var p = e.target.closest ? e.target.closest('.rc-pill') : null;
        if (p) {
          Array.prototype.forEach.call(pills, function (x) { x.classList.remove('on'); });
          p.classList.add('on');
        }
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
