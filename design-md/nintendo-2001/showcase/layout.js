/* ══ NINTENDO.COM (2001) — behaviour for the Northwind own layout ═══════════
   A mostly-static console faceplate: the poll radios and in-page smooth scroll
   are the only live bits. init(root) queries only inside root and returns a
   cleanup fn. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  window.OWN_LAYOUTS['nintendo-2001'] = {
    init: function (root) {
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
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* in-layout smooth scroll */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        });
      });

      /* the poll is a plain radio group — nothing to script, but keep focus tidy */
      $$('input[type="radio"]').forEach(function (r) {
        on(r, 'change', function () {
          var name = r.getAttribute('name');
          $$('input[type="radio"]').forEach(function (o) {
            if (o.getAttribute('name') === name) o.setAttribute('aria-checked', String(o === r));
          });
        });
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
