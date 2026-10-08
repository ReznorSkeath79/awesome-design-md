/* ══ AUTOALCHEMY — review-document behaviour for showcase.html ════════════
   Registers window.OWN_LAYOUTS['autoalchemy'].init(root). Reproduces the source
   template's three bits of JS: the light/dark theme toggle (token override on the
   root, remembered per layout), the IntersectionObserver scroll-spy that lights
   the numbered sidebar, and the print/export button. init returns a cleanup fn so
   unmounting removes the observer, listeners and any in-flight frame. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['autoalchemy'] = {
    init: function (root) {
      var SECTIONS = ['aa-s01', 'aa-s02', 'aa-s03', 'aa-s04', 'aa-s05', 'aa-s06', 'aa-s07', 'aa-s08', 'aa-s09'];
      var STORE = 'own-autoalchemy-theme';

      var $ = function (sel) { return root.querySelector(sel); };
      var $$ = function (sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var observers = [];
      var rafs = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        var o = Object.assign({}, opt || {});
        if (signal) o.signal = signal;
        el.addEventListener(type, fn, o);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }

      /* ── theme toggle ──────────────────────────────────────────────────── */
      function setTheme(t) {
        root.classList.toggle('aa-dark', t === 'dark');
        $$('[data-aa-theme]').forEach(function (b) {
          b.classList.toggle('on', b.getAttribute('data-aa-theme') === t);
        });
        try { localStorage.setItem(STORE, t); } catch (e) { /* ignore */ }
      }
      var saved = null;
      try { saved = localStorage.getItem(STORE); } catch (e) { /* ignore */ }
      if (saved === 'dark') setTheme('dark');

      var toggle = $('.aa-theme-toggle');
      on(toggle, 'click', function (e) {
        var b = e.target.closest('[data-aa-theme]');
        if (!b) return;
        setTheme(b.getAttribute('data-aa-theme'));
      });

      /* ── print / export ─────────────────────────────────────────────────── */
      on($('[data-aa-print]'), 'click', function () {
        try { window.print(); } catch (e) { /* ignore */ }
      });

      /* ── scroll-spy ────────────────────────────────────────────────────── */
      function setActive(id) {
        $$('[data-aa-nav]').forEach(function (a) {
          a.classList.toggle('on', a.getAttribute('data-aa-nav') === id);
        });
      }
      if (typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(function (entries) {
          if (disposed) return;
          var visible = entries.filter(function (en) { return en.isIntersecting; });
          if (!visible.length) return;
          visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
          setActive(visible[0].target.id);
        }, { root: null, rootMargin: '-140px 0px -70% 0px', threshold: 0 });
        SECTIONS.forEach(function (id) {
          var el = root.querySelector('#' + id);
          if (el) io.observe(el);
        });
        observers.push(io);
      }

      /* Deep-link support: honour a hash that points at one of our sections. */
      if (location.hash) {
        var id0 = location.hash.replace('#', '');
        if (SECTIONS.indexOf(id0) !== -1) setActive(id0);
      }

      /* ── in-layout smooth scroll for the sidebar links ──────────────────── */
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }
      $$('a[href^="#aa-s"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          var target = href && root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        });
      });

      /* Re-run the spy once fonts settle so the initial active item is right. */
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { if (!disposed) raf(function () {}); });
      }

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
