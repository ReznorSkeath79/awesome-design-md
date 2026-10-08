/* ══ IBM — behaviour for the Northwind own layout ═════════════════════════
   Renders the console rows and customer marquee, wires the burger drawer,
   the newsletter form, KPI count-ups and scroll reveals. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  var REGIONS = [
    { name: 'North America', region: 'us-east · us-west', val: '6,240', w: 92 },
    { name: 'Europe', region: 'eu-central', val: '4,910', w: 74 },
    { name: 'APAC', region: 'ap-south · ap-northeast', val: '3,780', w: 58 },
    { name: 'LATAM', region: 'sa-east', val: '2,140', w: 36 },
    { name: 'MEA', region: 'me-central', val: '1,350', w: 24 }
  ];
  var LOGOS = [
    'Aperture Foods', 'Vector Freight', 'Kestrel Bank', 'Halden Retail',
    'Northgate Health', 'Miro Labs', 'Lumen Energy', 'Orchard Systems'
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.OWN_LAYOUTS['ibm'] = {
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
      var rows = $('#ibmRows');
      if (rows) {
        rows.innerHTML = REGIONS.map(function (r) {
          return '<li class="prow">'
            + '<span>' + esc(r.name) + '</span>'
            + '<span class="prow-region">' + esc(r.region) + '</span>'
            + '<span class="prow-val">' + esc(r.val) + '</span>'
            + '<span class="prow-bar"><i style="--w:' + r.w + '%"></i></span>'
            + '</li>';
        }).join('');
      }

      /* ── logo marquee ──────────────────────────────────────────────── */
      var logo = $('#ibmLogos');
      if (logo) {
        var tile = LOGOS.map(function (n) { return '<span class="lg-tile">' + esc(n) + '</span>'; }).join('');
        logo.innerHTML = tile + tile;
      }

      /* ── burger drawer ─────────────────────────────────────────────── */
      var burger = $('[data-burger]');
      var drawer = $('[data-drawer]');
      on(burger, 'click', function () {
        if (!drawer) return;
        var next = drawer.hidden;
        drawer.hidden = !next;
        burger.setAttribute('aria-expanded', String(next));
      });

      /* ── newsletter form ───────────────────────────────────────────── */
      var form = $('[data-cta-form]');
      on(form, 'submit', function (e) {
        e.preventDefault();
        var ok = $('[data-cta-ok]');
        var input = form.querySelector('input');
        if (ok) ok.hidden = false;
        if (input) input.value = '';
      });

      /* ── count-up ──────────────────────────────────────────────────── */
      function countTo(el, to, ms, suffix) {
        if (reduced) { el.textContent = Math.round(to).toLocaleString('en-US') + suffix; return; }
        var from = 0, t0 = null;
        function step(t) {
          if (disposed) return;
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 4);
          el.textContent = Math.round(from + (to - from) * e).toLocaleString('en-US') + suffix;
          if (k < 1) raf(step);
        }
        raf(step);
      }

      /* ── scroll reveals ────────────────────────────────────────────── */
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

      /* ── in-layout smooth scroll ───────────────────────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          if (drawer && !drawer.hidden) { drawer.hidden = true; burger.setAttribute('aria-expanded', 'false'); }
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
