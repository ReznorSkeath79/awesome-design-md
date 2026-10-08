/* ══ LINEAR.APP — behaviour for the Northwind own layout ═══════════════════
   Renders the sample issue list, wires the billing tabs, the count-up KPIs,
   the sticky nav, the mobile drawer, in-page smooth scroll and scroll reveals.
   init(root) queries only inside root and returns a cleanup fn. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};
  var ISSUES = [
    { id: 'NW-482', title: 'Re-route Iberia lane through Lisbon hub', tag: 'Logistics', pri: 'high', status: 'In progress', who: 'MK' },
    { id: 'NW-479', title: 'Q4 revenue forecast sign-off', tag: 'Revenue', pri: 'high', status: 'In review', who: 'DO' },
    { id: 'NW-471', title: 'Cut average dock cycle to 42 min', tag: 'Logistics', pri: 'med', status: 'In progress', who: 'LS' },
    { id: 'NW-468', title: 'Automate SLA breach escalation', tag: 'Support', pri: 'med', status: 'Todo', who: 'AL' },
    { id: 'NW-460', title: 'Reconcile APAC currency feed', tag: 'Revenue', pri: 'low', status: 'Done', who: 'DO' },
    { id: 'NW-455', title: 'Vendor scorecard refresh', tag: 'Support', pri: 'low', status: 'Done', who: 'MK' }
  ];
  var STATUS_CLASS = { 'In progress': 'progress', 'Done': 'done' };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.OWN_LAYOUTS['linear.app'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var rafs = [];
      var observers = [];
      var seen = null;
      try { seen = new WeakSet(); } catch (e) { seen = null; }

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* ── issue list ────────────────────────────────────────────────── */
      var list = $('#issueList');
      if (list) {
        list.innerHTML = ISSUES.map(function (it) {
          var sc = STATUS_CLASS[it.status] || '';
          return '<li class="issue">'
            + '<span class="pri ' + it.pri + '" aria-label="' + esc(it.pri) + ' priority">' + esc(it.pri[0].toUpperCase()) + '</span>'
            + '<span class="issue-title"><span class="issue-id">' + esc(it.id) + '</span> ' + esc(it.title)
            + '<em class="tag">' + esc(it.tag) + '</em></span>'
            + '<span class="issue-status"><i class="' + sc + '"></i>' + esc(it.status) + '</span>'
            + '<span class="issue-av">' + esc(it.who) + '</span>'
            + '</li>';
        }).join('');
      }

      /* ── billing tabs ──────────────────────────────────────────────── */
      var MONTH = { '0': 0, '12': 12, '28': 28 };
      var ANNUAL = { '0': 0, '12': 10, '28': 22 };
      $$('[data-cycle]').forEach(function (tab) {
        on(tab, 'click', function () {
          var cycle = tab.dataset.cycle;
          $$('[data-cycle]').forEach(function (t) {
            var on2 = t === tab;
            t.classList.toggle('on', on2);
            t.setAttribute('aria-selected', String(on2));
          });
          $$('[data-price]').forEach(function (el) {
            var base = el.dataset.price;
            var v = (cycle === 'annual' ? ANNUAL : MONTH)[base];
            el.textContent = '$' + v;
          });
        });
      });

      /* ── count-up KPIs ─────────────────────────────────────────────── */
      function countTo(el, to, ms, prefix, suffix) {
        var dec = Number(el.dataset.decimals != null ? el.dataset.decimals : (to % 1 !== 0 ? 1 : 0));
        function fmt(v) { return prefix + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix; }
        if (reduced) { el.textContent = fmt(to); return; }
        var from = Number(el.dataset.v || 0), t0 = null;
        function step(t) {
          if (disposed) return;
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 4);
          el.textContent = fmt(from + (to - from) * e);
          if (k < 1) raf(step); else el.dataset.v = to;
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
              if (en.target.dataset.count) {
                countTo(en.target, Number(en.target.dataset.count), 1200,
                  en.target.dataset.prefix || '', en.target.dataset.suffix || '');
              }
              io.unobserve(en.target);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
        observers.push(io);
      }
      $$('[data-reveal]').forEach(function (el) {
        if (seen && seen.has(el)) return;
        if (seen) seen.add(el);
        if (io) io.observe(el); else el.classList.add('in');
      });
      $$('[data-count]').forEach(function (el) {
        if (seen && seen.has(el)) return;
        if (seen) seen.add(el);
        if (io) io.observe(el);
        else el.textContent = (el.dataset.prefix || '') + Number(el.dataset.count).toLocaleString('en-US') + (el.dataset.suffix || '');
      });

      /* ── sticky nav + drawer ───────────────────────────────────────── */
      var nav = $('#linearNav');
      function onScroll() {
        if (disposed || !nav) return;
        nav.classList.toggle('is-stuck', root.getBoundingClientRect().top < -8);
      }
      on(window, 'scroll', onScroll, { passive: true });
      onScroll();

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
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
