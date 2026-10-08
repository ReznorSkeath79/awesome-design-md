/* ══ NIKE — behaviour for the Northwind own layout ═════════════════════════
   Wires the sticky nav, mobile drawer, horizontal region rail, scroll reveals
   and in-page smooth scroll. init(root) queries only inside root and returns a
   cleanup fn. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  window.OWN_LAYOUTS['nike'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var observers = [];
      var seen = null;
      try { seen = new WeakSet(); } catch (e) { seen = null; }

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* ── scroll reveals ────────────────────────────────────────────── */
      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
        observers.push(io);
      }
      $$('[data-reveal]').forEach(function (el) {
        if (seen && seen.has(el)) return;
        if (seen) seen.add(el);
        if (io) io.observe(el); else el.classList.add('in');
      });

      /* ── sticky nav ────────────────────────────────────────────────── */
      var nav = $('#nikeNav');
      function onScroll() {
        if (disposed || !nav) return;
        nav.classList.toggle('is-stuck', root.getBoundingClientRect().top < -6);
      }
      on(window, 'scroll', onScroll, { passive: true });
      onScroll();

      /* ── mobile drawer ─────────────────────────────────────────────── */
      var toggle = $('[data-nav-toggle]');
      var drawer = $('[data-nav-drawer]');
      on(toggle, 'click', function () {
        if (!drawer) return;
        var next = drawer.hidden;
        drawer.hidden = !next;
        toggle.setAttribute('aria-expanded', String(next));
      });

      /* ── region rail ───────────────────────────────────────────────── */
      var rail = $('#regionRail');
      $$('[data-rail]').forEach(function (btn) {
        on(btn, 'click', function () {
          if (!rail) return;
          var dir = Number(btn.dataset.rail);
          var card = rail.querySelector('.tile');
          var step = card ? (card.offsetWidth + 8) * 2 : 480;
          rail.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' });
        });
      });

      /* ── in-layout smooth scroll ───────────────────────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          if (drawer && !drawer.hidden) { drawer.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
        });
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
