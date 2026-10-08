/* ══ HP — behaviour for the Northwind own layout ══════════════════════════
   Renders the FAQ, wires the burger drawer, KPI count-ups and scroll reveals.
   Chevrons are decorative CSS; the hero and page are otherwise static. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  var FAQ = [
    { q: 'Do I need to migrate my data to get started?', a: 'No. Connect your existing trackers and warehouses, map the fields once, and Northwind keeps them in sync. You can run both side by side before cutting over.' },
    { q: 'What does a dashboard actually connect to?', a: 'Every panel reads from the governed ledger, so a change in logistics or revenue flows through automatically — no separate export step.' },
    { q: 'Is there a free plan?', a: 'Yes. Starter is free for up to 3 seats with core dashboards and a single region. Upgrade when you add regions or teammates.' },
    { q: 'How is access controlled?', a: 'Role-based access, SSO, and an immutable audit log ship with the Team and Enterprise plans. Data residency is available on Enterprise.' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.OWN_LAYOUTS['hp'] = {
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

      /* ── FAQ ───────────────────────────────────────────────────────── */
      var faq = $('#hpFaqList');
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
