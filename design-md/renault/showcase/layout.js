/* ══ NORTHWIND — Renault-language chrome for showcase.html ══════════════════
   Registers window.OWN_LAYOUTS['renault'].init(root). Wires the configurator
   chips and colour swatches; returns a cleanup that aborts every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['renault'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }
      function all(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      on(root, 'click', function (e) {
        var chip = e.target.closest ? e.target.closest('.rn-chip') : null;
        if (chip) {
          var group = chip.parentNode;
          Array.prototype.forEach.call(group.querySelectorAll('.rn-chip'), function (c) { c.classList.remove('rn-chip-on'); });
          chip.classList.add('rn-chip-on');
          return;
        }
        var sw = e.target.closest ? e.target.closest('.rn-swatch') : null;
        if (sw) {
          all('.rn-swatch').forEach(function (s) { s.classList.remove('rn-sw-on'); });
          sw.classList.add('rn-sw-on');
        }
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
