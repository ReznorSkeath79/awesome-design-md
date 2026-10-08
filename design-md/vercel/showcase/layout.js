/* ══ VERCEL — Northwind operations analytics ════════════════════════════════════
   Registers window.OWN_LAYOUTS['vercel'].init(root). Renders the 3-up feature row,
   template grid, dark-band stats and pricing tiers from sample data; wires the
   mobile drawer. Returns a cleanup that removes every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var ICONS = {
    deploy: 'M12 3v12M7 8l5-5 5 5M5 21h14',
    chart: 'M4 19V9M10 19V5M16 19v-7M3 19h18',
    shield: 'M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6zM9 12l2 2 4-4'
  };

  var FEATURES = [
    { icon: 'deploy', title: 'Deploy in seconds', body: 'Push a metric from your pipeline and Northwind renders a live board before the next standup.', link: 'Start deploying' },
    { icon: 'chart', title: 'Scale to any region', body: 'One ledger for six regions today, sixty tomorrow. Capacity scales with your operations, not your headcount.', link: 'See the platform' },
    { icon: 'shield', title: 'Secure by default', body: 'SOC 2 Type II, per-region data residency, and an audit log on every query. Compliance out of the box.', link: 'Read the trust page' }
  ];

  var TEMPLATES = [
    { name: 'Throughput board', meta: 'ops', c: '#007cf0', c2: '#00dfd8' },
    { name: 'Revenue pulse', meta: 'finance', c: '#7928ca', c2: '#ff0080' },
    { name: 'Region compare', meta: 'ops', c: '#ff4d4d', c2: '#f9cb28' },
    { name: 'Support health', meta: 'service', c: '#00dfd8', c2: '#007cf0' },
    { name: 'Capacity plan', meta: 'teams', c: '#ff0080', c2: '#7928ca' }
  ];

  var STATS = [
    { num: '99.99%', lab: 'Platform uptime' },
    { num: '40 ms', lab: 'Median query' },
    { num: '6', lab: 'Regions live' },
    { num: '12B', lab: 'Events / month' }
  ];

  var TIERS = [
    { name: 'Hobby', price: '$0', per: '/mo', feats: ['1 region', '10 dashboards', 'Community support'], cta: 'Start free', featured: false },
    { name: 'Pro', price: '$20', per: '/seat / mo', feats: ['Unlimited regions', 'Alerts & workflows', 'Priority support'], cta: 'Start free', featured: true },
    { name: 'Enterprise', price: 'Custom', per: '', feats: ['SSO & audit log', 'Data residency', 'Dedicated engineer'], cta: 'Talk to sales', featured: false }
  ];

  OWN['vercel'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var $ = function (s) { return root.querySelector(s); };
      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }

      var f3 = $('#vcFeature3');
      if (f3) {
        f3.innerHTML = FEATURES.map(function (f) {
          return '<article class="vc-feature">'
            + '<span class="vc-feature-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + esc(ICONS[f.icon]) + '"/></svg></span>'
            + '<h3>' + esc(f.title) + '</h3>'
            + '<p>' + esc(f.body) + '</p>'
            + '<a class="vc-link" href="#">' + esc(f.link) + ' <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></article>';
        }).join('');
      }

      var tpl = $('#vcTplGrid');
      if (tpl) {
        tpl.innerHTML = TEMPLATES.map(function (t) {
          return '<a class="vc-tpl" href="#">'
            + '<span class="vc-tpl-thumb" style="--c:' + esc(t.c) + ';--c2:' + esc(t.c2) + '" aria-hidden="true"></span>'
            + '<span class="vc-tpl-name">' + esc(t.name) + '</span>'
            + '<span class="vc-tpl-meta">' + esc(t.meta) + '</span></a>';
        }).join('');
      }

      var stats = $('#vcStats');
      if (stats) {
        stats.innerHTML = STATS.map(function (s) {
          return '<div class="vc-stat"><span class="vc-stat-num">' + esc(s.num) + '</span>'
            + '<span class="vc-stat-lab">' + esc(s.lab) + '</span></div>';
        }).join('');
      }

      var pricing = $('#vcPricingGrid');
      if (pricing) {
        pricing.innerHTML = TIERS.map(function (t) {
          return '<div class="vc-tier' + (t.featured ? ' vc-tier-featured' : '') + '">'
            + '<span class="vc-tier-name">' + esc(t.name) + '</span>'
            + '<span class="vc-tier-price">' + esc(t.price) + ' <small>' + esc(t.per) + '</small></span>'
            + '<ul>' + t.feats.map(function (f) {
              return '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>' + esc(f) + '</li>';
            }).join('') + '</ul>'
            + '<a class="vc-btn vc-btn-primary" href="#">' + esc(t.cta) + '</a></div>';
        }).join('');
      }

      var burger = $('[data-vc-menu]');
      var drawer = $('[data-vc-drawer]');
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
