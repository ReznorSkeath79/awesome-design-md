/* ══ KRAKEN — behaviour for the Northwind own layout ═══════════════════════
   Renders the ledger rows, region roll-up and FAQ, wires the drawer, count-ups,
   sticky nav and reveals. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  var LEDGER = [
    { name: 'Shipments settled', val: '+12,480', up: true },
    { name: 'Revenue cleared', val: '$4.9M', up: true },
    { name: 'Exceptions open', val: '38', up: false },
    { name: 'On-time rate', val: '96%', up: true }
  ];
  var REGIONS = [
    { name: 'North America', val: '6,240', w: 92 },
    { name: 'Europe', val: '4,910', w: 74 },
    { name: 'APAC', val: '3,780', w: 58 },
    { name: 'LATAM', val: '2,140', w: 36 },
    { name: 'MEA', val: '1,350', w: 24 }
  ];
  var FAQ = [
    { q: 'How accurate are the totals?', a: 'Every figure is computed from the governed ledger and reconciled against its source — no cached aggregates, no stale exports. Totals match their drill-down to the unit.' },
    { q: 'Can I connect my existing warehouse?', a: 'Yes. Connect your warehouse or operational systems, map fields once, and Northwind keeps them in sync with full lineage on every field.' },
    { q: 'What happens to my data?', a: 'Your data is encrypted at rest and in transit, access is role-based, and every change is written to an immutable audit log. Residency options are available on Enterprise.' },
    { q: 'Is there a free tier?', a: 'Starter is free for up to 3 seats and one region. Upgrade to Growth when you add regions or teammates — no migration needed.' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.OWN_LAYOUTS['kraken'] = {
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

      /* ── ledger rows ───────────────────────────────────────────────── */
      var rows = $('#krakenRows');
      if (rows) {
        rows.innerHTML = LEDGER.map(function (r) {
          return '<li><span class="kr-name">' + esc(r.name) + '</span>'
            + '<span class="kr-val' + (r.up ? ' up' : '') + '">' + esc(r.val) + '</span></li>';
        }).join('');
      }

      /* ── region roll-up ────────────────────────────────────────────── */
      var reg = $('#krakenRegions');
      if (reg) {
        reg.innerHTML = REGIONS.map(function (r) {
          return '<li><span class="fr-name">' + esc(r.name) + '</span>'
            + '<span class="fr-val">' + esc(r.val) + '</span>'
            + '<span class="fr-bar"><i style="--w:' + r.w + '%"></i></span></li>';
        }).join('');
      }

      /* ── FAQ ───────────────────────────────────────────────────────── */
      var faq = $('#krakenFaqList');
      if (faq) {
        faq.innerHTML = FAQ.map(function (f, i) {
          return '<div class="faq-item' + (i === 0 ? ' open' : '') + '">'
            + '<button class="faq-q" type="button" aria-expanded="' + (i === 0) + '">' + esc(f.q)
            + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>'
            + '<div class="faq-a"><div><p>' + esc(f.a) + '</p></div></div>'
            + '</div>';
        }).join('');
      }
      on(faq, 'click', function (e) {
        var btn = e.target.closest('.faq-q');
        if (!btn) return;
        var item = btn.closest('.faq-item');
        var isOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });

      /* ── burger drawer ─────────────────────────────────────────────── */
      var burger = $('[data-burger]');
      var drawer = $('[data-drawer]');
      on(burger, 'click', function () {
        if (!drawer) return;
        var next = drawer.hidden;
        drawer.hidden = !next;
        burger.setAttribute('aria-expanded', String(next));
      });

      /* ── count-up ──────────────────────────────────────────────────── */
      function countTo(el, to, ms, suffix) {
        var dec = to % 1 !== 0 ? 1 : 0;
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
      var nav = $('#krakenNav');
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
