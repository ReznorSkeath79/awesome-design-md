/* ══ POSTHOG — Northwind operations analytics ═══════════════════════════════════
   Registers window.OWN_LAYOUTS['posthog'].init(root). Renders the feature tiles,
   pricing tiers and doc sidebar from sample data; highlights the active doc item
   on scroll. Returns a cleanup that disconnects the observer. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var ICONS = {
    chart: 'M4 19V9M10 19V5M16 19v-7M22 19H2',
    funnel: 'M4 5h16l-6 7v6l-4 2v-8z',
    pulse: 'M3 12h4l2-6 4 12 2-6h6',
    flag: 'M6 4v16M6 5h11l-2 4 2 4H6'
  };

  var TILES = [
    { icon: 'chart', title: 'Dashboards', body: 'Pin the metrics your team checks every morning, on one warm sheet.', link: 'Explore dashboards' },
    { icon: 'funnel', title: 'Funnels', body: 'See where throughput drops off across regions, step by step.', link: 'Build a funnel' },
    { icon: 'pulse', title: 'Alerts', body: 'Thresholds that page the on-call before the SLA ever slips.', link: 'Set an alert' },
    { icon: 'flag', title: 'Workflows', body: 'Automate the recurring report with a query, not a spreadsheet.', link: 'See workflows' }
  ];

  var TIERS = [
    { name: 'Free', price: '$0', per: 'forever', feats: ['1M events / mo', 'Unlimited dashboards', 'Community support'], cta: 'Start free', featured: false },
    { name: 'Scale', price: '$450', per: '/mo', feats: ['20M events / mo', 'Alerts & workflows', 'Priority support'], cta: 'Start free', featured: true },
    { name: 'Enterprise', price: 'Custom', per: '', feats: ['Unlimited events', 'SSO & audit log', 'Dedicated engineer'], cta: 'Talk to sales', featured: false }
  ];

  var DOCS = [
    { icon: 'chart', label: 'Dashboards', on: true },
    { icon: 'funnel', label: 'Funnels', on: false },
    { icon: 'pulse', label: 'Alerts', on: false },
    { icon: 'flag', label: 'Workflows', on: false },
    { icon: 'chart', label: 'Data sources', on: false },
    { icon: 'funnel', label: 'API reference', on: false }
  ];

  OWN['posthog'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var observers = [];
      var $ = function (s) { return root.querySelector(s); };
      var $$ = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };
      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }

      var tiles = $('#phTiles');
      if (tiles) {
        tiles.innerHTML = TILES.map(function (t) {
          return '<a class="ph-tile" href="#">'
            + '<span class="ph-hedge ph-hedge-sm" aria-hidden="true"></span>'
            + '<span class="ph-tile-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + esc(ICONS[t.icon]) + '"/></svg></span>'
            + '<span class="ph-tile-title">' + esc(t.title) + '</span>'
            + '<span class="ph-tile-body">' + esc(t.body) + '</span>'
            + '<span class="ph-tile-link">' + esc(t.link) + ' →</span></a>';
        }).join('');
      }

      var pricing = $('#phPricingGrid');
      if (pricing) {
        pricing.innerHTML = TIERS.map(function (t) {
          return '<div class="ph-tier' + (t.featured ? ' ph-tier-featured' : '') + '">'
            + '<span class="ph-tier-name">' + esc(t.name) + '</span>'
            + '<span class="ph-tier-price">' + esc(t.price) + ' <small>' + esc(t.per) + '</small></span>'
            + '<ul>' + t.feats.map(function (f) {
              return '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>' + esc(f) + '</li>';
            }).join('') + '</ul>'
            + '<a class="ph-btn ' + (t.featured ? 'ph-btn-primary' : 'ph-btn-secondary') + '" href="#">' + esc(t.cta) + '</a></div>';
        }).join('');
      }

      var docNav = $('#phDocNav');
      if (docNav) {
        docNav.innerHTML = DOCS.map(function (d) {
          return '<a href="#" class="' + (d.on ? 'on' : '') + '">'
            + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + esc(ICONS[d.icon]) + '"/></svg>'
            + esc(d.label) + '</a>';
        }).join('');
      }

      /* active doc item on click */
      on(docNav, 'click', function (e) {
        var a = e.target.closest('a');
        if (!a) return;
        e.preventDefault();
        $$('.ph-doc-nav a').forEach(function (x) { x.classList.toggle('on', x === a); });
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) {} }
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) {} });
      };
    }
  };
})();
