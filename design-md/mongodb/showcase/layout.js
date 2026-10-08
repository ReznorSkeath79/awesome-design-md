/* ══ MONGODB — behaviour for the Northwind own layout ══════════════════════
   Wires the pricing plan tabs, sticky-nav drawer, scroll reveals and in-page
   smooth scroll. init(root) queries only inside root and returns a cleanup fn. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  window.OWN_LAYOUTS['mongodb'] = {
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

      /* ── deployment tabs (Atlas / Enterprise) ───────────────────────── */
      var FLEX = { atlas: '$57', enterprise: '$89' };
      var tabs = $$('[data-plan]');
      tabs.forEach(function (tab) {
        on(tab, 'click', function () {
          var plan = tab.dataset.plan;
          tabs.forEach(function (t) {
            var isOn = t === tab;
            t.classList.toggle('on', isOn);
            t.setAttribute('aria-selected', String(isOn));
          });
          var flex = $('[data-price="57"]');
          if (flex) flex.textContent = FLEX[plan] || FLEX.atlas;
        });
      });

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

      /* ── mobile drawer ─────────────────────────────────────────────── */
      var toggle = $('[data-nav-toggle]');
      var drawer = $('[data-nav-drawer]');
      on(toggle, 'click', function () {
        if (!drawer) return;
        var next = drawer.hidden;
        drawer.hidden = !next;
        toggle.setAttribute('aria-expanded', String(next));
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
