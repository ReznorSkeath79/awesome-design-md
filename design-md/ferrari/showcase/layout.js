/* ══ NORTHWIND — Ferrari own-layout behaviour for showcase.html ════════════
   Registers window.OWN_LAYOUTS['ferrari'].init(root). Adds reveal-on-scroll,
   a restrained spec counter, in-layout anchor scrolling and newsletter handling.
   init returns a cleanup function so unmounting leaves no rAF, listener or
   observer behind. Every query is scoped to `root`. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['ferrari'] = {
    init: function (root) {
      if (!root) return function () {};

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

      /* ── spec counters ─────────────────────────────────────────────────── */
      function countTo(el, to, ms) {
        if (reduced || !el) { if (el) el.textContent = String(to); return; }
        var from = 0, t0 = performance.now();
        function step(t) {
          if (disposed) return;
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
          el.textContent = String(Math.round(from + (to - from) * e));
          if (k < 1) raf(step);
        }
        raf(step);
      }

      /* ── reveal on scroll ──────────────────────────────────────────────── */
      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
        observers.push(io);
      }
      $$('[data-reveal]').forEach(function (el) {
        el.classList.add('reveal');
        if (io) io.observe(el); else el.classList.add('in');
      });

      /* ── in-layout anchor scrolling ────────────────────────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
        });
      });

      /* ── newsletter band ───────────────────────────────────────────────── */
      var form = $('.brief-form');
      on(form, 'submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('.input');
        var note = form.querySelector('.brief-note');
        if (!note) {
          note = document.createElement('p');
          note.className = 'brief-note';
          form.appendChild(note);
        }
        var value = input ? input.value.trim() : '';
        note.textContent = value
          ? 'Thanks \u2014 ' + value + ' is on the list.'
          : 'Enter a work email to subscribe.';
      });

      /* ── boot ───────────────────────────────────────────────────────────── */
      $$('[data-count]').forEach(function (el) {
        countTo(el, Number(el.getAttribute('data-count')) || 0, 1000);
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
        rafs = [];
        observers = [];
      };
    }
  };
})();
