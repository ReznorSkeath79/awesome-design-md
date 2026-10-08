/* ══ NORTHWIND — own-layout behaviour for showcase.html ══════════════════
   Bugatti's surface is static; the menu button announces press state and
   closes on Escape. Query only inside root, clean up on unmount. */
(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  window.OWN_LAYOUTS['bugatti'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }

      var menu = root.querySelector('.nav-menu');
      on(menu, 'click', function () {
        var open = menu.getAttribute('aria-expanded') === 'true';
        menu.setAttribute('aria-expanded', String(!open));
        menu.style.letterSpacing = open ? '' : '3px';
      });
      on(document, 'keydown', function (e) {
        if (e.key === 'Escape' && menu) menu.setAttribute('aria-expanded', 'false');
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        if (menu) menu.setAttribute('aria-expanded', 'false');
      };
    }
  };
})();
