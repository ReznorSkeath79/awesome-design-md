/* ══ NOTION — behaviour for the Northwind own layout ═══════════════════════
   Renders the sample kanban board, wires the billing tabs, count-up KPIs, the
   sticky-nav drawer, scroll reveals and in-page smooth scroll. init(root)
   queries only inside root and returns a cleanup fn. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  var COLUMNS = [
    { name: 'Blocked', cards: [
      { tag: 'Logistics', tint: 'tag-orange', title: 'Dock capacity at Lisbon hub', who: 'MK', due: 'Today' },
      { tag: 'Revenue', tint: 'tag-rose', title: 'APAC feed mismatch', who: 'DO', due: 'Oct 04' }
    ] },
    { name: 'In progress', cards: [
      { tag: 'Logistics', tint: 'tag-blue', title: 'Re-route Iberia lane', who: 'LS', due: 'Oct 06' },
      { tag: 'Support', tint: 'tag-orange', title: 'SLA escalation rules', who: 'AL', due: 'Oct 09' },
      { tag: 'Revenue', tint: 'tag-green', title: 'Q4 forecast sign-off', who: 'DO', due: 'Oct 12' }
    ] },
    { name: 'Done', cards: [
      { tag: 'Revenue', tint: 'tag-green', title: 'Currency feed reconciled', who: 'DO', due: 'Oct 01' },
      { tag: 'Support', tint: 'tag-blue', title: 'Vendor scorecard refresh', who: 'MK', due: 'Sep 28' }
    ] }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.OWN_LAYOUTS['notion'] = {
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

      /* ── kanban board ──────────────────────────────────────────────── */
      var board = $('#notionBoard');
      if (board) {
        board.innerHTML = COLUMNS.map(function (col) {
          return '<div class="bcol">'
            + '<div class="bcol-head">' + esc(col.name) + '<span class="bcol-count">' + col.cards.length + '</span></div>'
            + col.cards.map(function (c) {
              return '<div class="bcard">'
                + '<span class="bcard-tag ' + esc(c.tint) + '">' + esc(c.tag) + '</span>'
                + '<span class="bcard-title">' + esc(c.title) + '</span>'
                + '<span class="bcard-foot"><span class="bcard-av">' + esc(c.who) + '</span><span class="bcard-due">' + esc(c.due) + '</span></span>'
                + '</div>';
            }).join('')
            + '</div>';
        }).join('');
      }

      /* ── billing tabs ──────────────────────────────────────────────── */
      var MONTH = { '0': 0, '10': 10, '18': 18 };
      var ANNUAL = { '0': 0, '10': 8, '18': 15 };
      var tabs = $$('[data-cycle]');
      tabs.forEach(function (tab) {
        on(tab, 'click', function () {
          var cycle = tab.dataset.cycle;
          tabs.forEach(function (t) {
            var isOn = t === tab;
            t.classList.toggle('on', isOn);
            t.setAttribute('aria-selected', String(isOn));
          });
          $$('[data-price]').forEach(function (el) {
            var base = el.dataset.price;
            if (base === 'custom') return;
            var v = (cycle === 'annual' ? ANNUAL : MONTH)[base];
            el.textContent = '$' + v;
          });
        });
      });

      /* ── count-up KPIs ─────────────────────────────────────────────── */
      function countTo(el, to, ms, suffix) {
        if (reduced) { el.textContent = to + suffix; return; }
        var from = Number(el.dataset.v || 0), t0 = null;
        function step(t) {
          if (disposed) return;
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 4);
          el.textContent = Math.round(from + (to - from) * e) + suffix;
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
              var counters = en.target.querySelectorAll('[data-count]');
              Array.prototype.forEach.call(counters, function (counter) {
                countTo(counter, Number(counter.dataset.count), 1100, counter.dataset.suffix || '');
              });
              io.unobserve(en.target);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
        observers.push(io);
      }
      $$('[data-reveal]').forEach(function (el) {
        if (seen && seen.has(el)) return;
        if (seen) seen.add(el);
        if (io) io.observe(el); else el.classList.add('in');
      });
      if (!io) {
        $$('[data-count]').forEach(function (el) {
          el.textContent = Number(el.dataset.count) + (el.dataset.suffix || '');
        });
      }

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
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
