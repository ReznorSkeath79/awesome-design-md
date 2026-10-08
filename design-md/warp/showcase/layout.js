/* ══ WARP — behaviour for showcase.html ════════════════════════════════════
   Registers window.OWN_LAYOUTS['warp'].init(root). Wires the mobile drawer and
   in-layout anchor scrolling. init returns a cleanup that aborts every
   listener it registered. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['warp'] = {
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
      function $(sel) { return root.querySelector(sel); }

      var burger = $('[data-wp-burger]');
      var drawer = $('[data-wp-drawer]');
      on(burger, 'click', function () {
        if (!drawer) return;
        var open = drawer.hasAttribute('hidden');
        if (open) drawer.removeAttribute('hidden'); else drawer.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', String(open));
      });

      Array.prototype.forEach.call(root.querySelectorAll('a[href^="#"]'), function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          if (drawer && !drawer.hasAttribute('hidden')) {
            drawer.setAttribute('hidden', '');
            if (burger) burger.setAttribute('aria-expanded', 'false');
          }
          try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
        });
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
