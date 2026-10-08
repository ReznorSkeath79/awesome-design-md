/* ══ NORTHWIND (figma own-layout) ═══════════════════════════════════════════
   Registers window.OWN_LAYOUTS['figma'].init(root). Wires the top-nav menu,
   pricing billing toggle, marquee loop, number count-up and scroll reveal.
   All lookups are scoped to `root`; init returns a cleanup that aborts every
   listener, observer and rAF so unmounting leaves nothing behind. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['figma'] = {
    init: function (root) {
      if (!root) return function () {};

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var rafs = [];
      var observers = [];
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
      function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
      }

      /* progressive enhancement: only hide reveal targets once JS is running */
      root.classList.add('fn-js');

      /* ── marquee: duplicate the row so translateX(-50%) loops seamlessly ── */
      var track = $('[data-marquee]');
      if (track) {
        var html = track.innerHTML;
        track.innerHTML = html + html;
      }

      /* ── top-nav menu ─────────────────────────────────────────────────── */
      var toggle = $('[data-nav-toggle]');
      var menu = $('#fnMenu');
      if (toggle && menu) {
        on(toggle, 'click', function () {
          var open = menu.classList.toggle('is-open');
          menu.hidden = false;
          toggle.setAttribute('aria-expanded', String(open));
          toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
          if (!open) menu.hidden = true;
        });
        on(menu, 'click', function (e) {
          if (e.target.closest('a')) {
            menu.classList.remove('is-open');
            menu.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
          }
        });
      }

      /* ── pricing billing toggle ───────────────────────────────────────── */
      var tabs = $$('[data-bill]');
      var prices = $$('[data-price]');
      function setBilling(mode) {
        tabs.forEach(function (t) {
          var on_ = t.getAttribute('data-bill') === mode;
          t.classList.toggle('is-on', on_);
          t.setAttribute('aria-pressed', String(on_));
        });
        prices.forEach(function (p) {
          var v = mode === 'annual' ? p.getAttribute('data-a') : p.getAttribute('data-m');
          p.textContent = esc('$' + v);
        });
      }
      tabs.forEach(function (t) {
        on(t, 'click', function () { setBilling(t.getAttribute('data-bill')); });
      });

      /* ── count-up on the hero stats ───────────────────────────────────── */
      function countUp(el, to) {
        if (reduced || !el) { if (el) el.textContent = String(to); return; }
        var t0 = performance.now();
        function step(t) {
          if (disposed) return;
          var k = Math.min(1, (t - t0) / 1000);
          var e = 1 - Math.pow(1 - k, 4);
          el.textContent = String(Math.round(to * e));
          if (k < 1) raf(step);
        }
        raf(step);
      }

      /* ── reveal on scroll ─────────────────────────────────────────────── */
      var targets = $$('[data-rv]');
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
        observers.push(io);
        targets.forEach(function (el) { io.observe(el); });
      } else {
        targets.forEach(function (el) { el.classList.add('is-in'); });
      }

      /* ── boot animated numbers ────────────────────────────────────────── */
      $$('[data-count]').forEach(function (el) {
        countUp(el, Number(el.getAttribute('data-count')) || 0);
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
        root.classList.remove('fn-js');
      };
    }
  };
})();
