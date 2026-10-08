/* ══ FRAMER — Northwind operations analytics, real behaviour for showcase.html ══
   Registers window.OWN_LAYOUTS['framer'].init(root). Wires the mobile nav drawer,
   the pricing billing-cycle toggle, and in-layout smooth scrolling. All queries are
   scoped to `root`; init returns a cleanup that aborts every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['framer'] = {
    init: function (root) {
      if (!root) return function () {};

      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* ── nav drawer ─────────────────────────────────────────────────── */
      var toggle = $('[data-nav-toggle]');
      var drawer = $('[data-nav-drawer]');
      on(toggle, 'click', function () {
        if (!drawer) return;
        var open = drawer.hidden;
        drawer.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
      });

      /* ── pricing billing-cycle toggle ───────────────────────────────── */
      var tabs = $$('[data-cycle]');
      var amounts = $$('.tier-amt');
      function setCycle(cycle) {
        tabs.forEach(function (t) {
          var on = t.dataset.cycle === cycle;
          t.classList.toggle('on', on);
          t.setAttribute('aria-selected', String(on));
        });
        amounts.forEach(function (p) {
          if (p.dataset.custom) return;
          var val = p.dataset[cycle];
          if (val == null) return;
          p.textContent = '$' + val;
        });
      }
      tabs.forEach(function (t) {
        on(t, 'click', function () { setCycle(t.dataset.cycle); });
      });

      /* ── in-layout smooth scroll + close drawer ─────────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          if (drawer && !drawer.hidden) {
            drawer.hidden = true;
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
          }
        });
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
