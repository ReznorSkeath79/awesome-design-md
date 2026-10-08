/* ══ NORTHWIND — in Dell 1996's design language, for showcase.html ══════════
   Registers window.OWN_LAYOUTS['dell-1996'].init(root). A 1996 page carried no
   script; the layout is static, so this only wires the sample search widget and
   returns a cleanup that detaches the one listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['dell-1996'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $(s) { return root.querySelector(s); }

      var input = $('#dlSearch');
      var buttons = root.querySelectorAll('.dl-btn');
      on(buttons[1], 'click', function () {
        if (input) { input.value = ''; input.placeholder = 'Sample search — showcase only'; }
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
