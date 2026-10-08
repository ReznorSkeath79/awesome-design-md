/* ══ NORTHWIND — behaviour for the hashicorp own layout ═══════════════════════
   Registers window.OWN_LAYOUTS['hashicorp'].init(root). Wires the mobile menu
   and the reveal-on-scroll observer, all scoped to `root`. Returns a cleanup
   function that disconnects the observer, aborts listeners and clears timers. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['hashicorp'] = {
    init: function (root) {
      if (!root) return function () {};

      var reduced = false;
      try {
        reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var observers = [];
      var timeouts = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function later(fn, ms) {
        var id = window.setTimeout(fn, ms);
        timeouts.push(id);
        return id;
      }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* ── mobile menu ─────────────────────────────────────────────────── */
      var menuBtn = $('[data-menu]');
      var navLinks = $('#nw-navlinks');
      function closeMenu() {
        if (navLinks) navLinks.classList.remove('open');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      }
      on(menuBtn, 'click', function () {
        if (!navLinks) return;
        var open = navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
      });
      $$('#nw-navlinks a').forEach(function (a) { on(a, 'click', closeMenu); });
      on(document, 'click', function (e) {
        if (!navLinks || !menuBtn) return;
        if (!navLinks.classList.contains('open')) return;
        if (root.contains(e.target) && (menuBtn.contains(e.target) || navLinks.contains(e.target))) return;
        closeMenu();
      });

      /* ── reveal on scroll ────────────────────────────────────────────── */
      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              io.unobserve(en.target);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        observers.push(io);
      }
      $$('[data-rv]').forEach(function (el) {
        if (io) io.observe(el);
        else el.classList.add('in');
      });

      /* ── in-layout smooth anchor scroll ──────────────────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          if (history.replaceState) {
            try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
          }
        });
      });

      /* nothing else to animate; reveal class is applied above */
      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        timeouts.forEach(function (id) { clearTimeout(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
        closeMenu();
      };
    }
  };
})();
