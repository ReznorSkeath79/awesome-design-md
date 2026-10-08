/* ══ LAMBORGHINI — behaviour for the Northwind own layout ═══════════════════
   Renders the console rows, wires the menu drawer, count-ups, sticky nav and
   reveals. The hero is a static black stage with a decorative progress line. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  var ROWS = [
    { name: 'Shipments', val: '48,200' },
    { name: 'Revenue cleared', val: '$4.9M' },
    { name: 'Exceptions', val: '38' },
    { name: 'On-time', val: '96%' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.OWN_LAYOUTS['lamborghini'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var rafs = [];
      var observers = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* ── console rows ──────────────────────────────────────────────── */
      var rows = $('#lamboRows');
      if (rows) {
        rows.innerHTML = ROWS.map(function (r) {
          return '<li class="vr"><span>' + esc(r.name) + '</span><span class="vr-val">' + esc(r.val) + '</span></li>';
        }).join('');
      }

      /* ── menu drawer ───────────────────────────────────────────────── */
      var menu = $('[data-menu]');
      var drawer = $('[data-drawer]');
      on(menu, 'click', function () {
        if (!drawer) return;
        var next = drawer.hidden;
        drawer.hidden = !next;
        menu.setAttribute('aria-expanded', String(next));
      });

      /* ── count-up ──────────────────────────────────────────────────── */
      function countTo(el, to, ms, suffix) {
        var dec = Number(el.dataset.decimals != null ? el.dataset.decimals : (to % 1 !== 0 ? 1 : 0));
        function fmt(v) { return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix; }
        if (reduced) { el.textContent = fmt(to); return; }
        var from = 0, t0 = null;
        function step(t) {
          if (disposed) return;
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 4);
          el.textContent = fmt(from + (to - from) * e);
          if (k < 1) raf(step);
        }
        raf(step);
      }

      /* ── reveals ───────────────────────────────────────────────────── */
      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              if (en.target.dataset.count) countTo(en.target, Number(en.target.dataset.count), 1100, en.target.dataset.suffix || '');
              io.unobserve(en.target);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
        observers.push(io);
      }
      $$('[data-reveal]').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });
      $$('[data-count]').forEach(function (el) {
        if (io) io.observe(el);
        else el.textContent = Number(el.dataset.count).toLocaleString('en-US') + (el.dataset.suffix || '');
      });

      /* ── sticky nav ────────────────────────────────────────────────── */
      var nav = $('#lamboNav');
      function onScroll() {
        if (disposed || !nav) return;
        nav.classList.toggle('is-stuck', root.getBoundingClientRect().top < -8);
      }
      on(window, 'scroll', onScroll, { passive: true });
      onScroll();

      /* ── smooth scroll ─────────────────────────────────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          if (drawer && !drawer.hidden) { drawer.hidden = true; menu.setAttribute('aria-expanded', 'false'); }
        });
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
