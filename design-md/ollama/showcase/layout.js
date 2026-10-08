/* ══ OLLAMA — own layout behaviour for showcase.html ═══════════════════════
   Registers window.OWN_LAYOUTS['ollama'].init(root). Wires the mobile menu
   drawer and the install-snippet copy button. init returns a cleanup function
   so unmounting removes every listener and timer. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['ollama'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var timers = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $sel(s) { return root.querySelector(s); }

      var burger = $sel('[data-oll-burger]');
      var drawer = $sel('[data-oll-drawer]');
      if (burger && drawer) {
        on(burger, 'click', function () {
          var open = drawer.hasAttribute('hidden');
          if (open) drawer.removeAttribute('hidden');
          else drawer.setAttribute('hidden', '');
          burger.setAttribute('aria-expanded', String(open));
        });
        on(drawer, 'click', function (e) {
          if (e.target.closest('a')) { drawer.setAttribute('hidden', ''); burger.setAttribute('aria-expanded', 'false'); }
        });
      }

      var copy = $sel('[data-oll-copy]');
      var copyCode = $sel('.oll-install code');
      var copyLabel = $sel('[data-oll-copy-label]');
      if (copy && copyCode) {
        on(copy, 'click', function () {
          var text = copyCode.textContent || '';
          function done() {
            if (disposed) return;
            copy.classList.add('done');
            if (copyLabel) copyLabel.textContent = 'Copied';
            timers.push(window.setTimeout(function () {
              if (disposed) return;
              copy.classList.remove('done');
              if (copyLabel) copyLabel.textContent = 'Copy';
            }, 1600));
          }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, done);
          } else {
            done();
          }
        });
      }

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        timers.forEach(function (id) { clearTimeout(id); });
      };
    }
  };
})();
