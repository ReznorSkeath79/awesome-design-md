/* ══ UBER — Northwind operations analytics ══════════════════════════════════════
   Registers window.OWN_LAYOUTS['uber'].init(root). Renders the quick-start chips
   and FAQ accordion, wires the hero tab toggle and mobile drawer. Returns a
   cleanup that removes every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var ICONS = {
    pin: 'M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Z',
    route: 'M4 12h16M14 6l6 6-6 6',
    clock: 'M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16M12 8v4l3 2',
    truck: 'M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 7 19ZM17 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 17 19Z',
    chart: 'M4 19V9M10 19V5M16 19v-7M3 19h18'
  };

  var CHIPS = [
    { icon: 'pin', label: 'Track a region' },
    { icon: 'route', label: 'Compare routes' },
    { icon: 'clock', label: 'Plan a quarter' },
    { icon: 'truck', label: 'Ship throughput' },
    { icon: 'chart', label: 'Forecast revenue' }
  ];

  var FAQ = [
    { q: 'What is Northwind?', a: 'Northwind is an operations analytics platform. It unifies regions, throughput, and revenue on one ledger so every team reads the same numbers.' },
    { q: 'How is it priced?', a: 'Plans are usage-based. The free tier covers a single region; paid tiers scale by region count and data volume, with no per-seat charge.' },
    { q: 'Can I self-host it?', a: 'Yes. Northwind ships as an open-source core you can run on your own infrastructure, with a managed cloud option when you would rather not.' },
    { q: 'Does it replace our BI tool?', a: 'It sits alongside it. Northwind handles live operations data; your BI stack stays for the long-horizon reporting it already does well.' },
    { q: 'Which regions are supported?', a: 'Six regions today, with new ones added as operations expand. Data residency is configurable per region.' }
  ];

  OWN['uber'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var $ = function (s) { return root.querySelector(s); };
      var $$ = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };
      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }

      /* chips */
      var chips = $('#ubChips');
      if (chips) {
        chips.innerHTML = CHIPS.map(function (c) {
          return '<a class="ub-chip" href="#">'
            + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + esc(ICONS[c.icon]) + '"/></svg>'
            + esc(c.label) + '</a>';
        }).join('');
      }

      /* FAQ */
      var faq = $('#ubFaq');
      if (faq) {
        faq.innerHTML = FAQ.map(function (f, i) {
          return '<div class="ub-faq-item' + (i === 0 ? ' open' : '') + '">'
            + '<button class="ub-faq-q" type="button" aria-expanded="' + (i === 0) + '">'
            + esc(f.q)
            + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>'
            + '<div class="ub-faq-a">' + esc(f.a) + '</div></div>';
        }).join('');
        on(faq, 'click', function (e) {
          var q = e.target.closest('.ub-faq-q');
          if (!q) return;
          var item = q.parentElement;
          var open = item.classList.toggle('open');
          q.setAttribute('aria-expanded', String(open));
        });
      }

      /* hero tabs */
      $$('.ub-tab').forEach(function (t) {
        on(t, 'click', function () {
          $$('.ub-tab').forEach(function (x) {
            var sel = x === t;
            x.classList.toggle('on', sel);
            x.setAttribute('aria-selected', String(sel));
          });
        });
      });

      /* mobile drawer */
      var burger = $('[data-ub-menu]');
      var drawer = $('[data-ub-drawer]');
      on(burger, 'click', function () {
        if (!drawer) return;
        var open = drawer.hidden;
        drawer.hidden = !open;
        burger.setAttribute('aria-expanded', String(open));
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) {} }
      };
    }
  };
})();
