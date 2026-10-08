/* ══ VODAFONE — behaviour for showcase.html ════════════════════════════════
   Registers window.OWN_LAYOUTS['vodafone'].init(root). Wires the mobile drawer
   and in-layout anchor scrolling; returns a cleanup that removes every
   listener, timeout and observer it created. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['vodafone'] = {
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

      var burger = $('[data-vf-burger]');
      var drawer = $('[data-vf-drawer]');
      on(burger, 'click', function () {
        if (!drawer) return;
        var open = drawer.hasAttribute('hidden');
        if (open) drawer.removeAttribute('hidden');
        else drawer.setAttribute('hidden', '');
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
