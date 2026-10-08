/* ══ SHOPIFY — own layout behaviour for showcase.html ═════════════════════
   Registers window.OWN_LAYOUTS['shopify'].init(root). Renders feature rows,
   the region roll-up list and the pricing tiers from data. Cleanup fn. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var FEATURES = [
    { num: '01', title: 'Live dashboards', body: 'Every site streams throughput, yield, and cost into one board that refreshes as the shift runs.' },
    { num: '02', title: 'Regional roll-ups', body: 'Aggregate site metrics into a regional view with a single query, converted to your reporting units.' },
    { num: '03', title: 'Forecasting', body: 'Model next quarter per region with confidence intervals tuned to your seasonality.' },
    { num: '04', title: 'Alerting', body: 'Route misses to the right on-call with rules matched to region and severity.' }
  ];

  var REGIONS = [
    ['Luzon', 4180], ['Visayas', 2260], ['Mindanao', 1610],
    ['Singapore', 3020], ['Sydney', 2870], ['Auckland', 1240],
    ['Osaka', 2450], ['Busan', 1980], ['Jakarta', 1760], ['Rotterdam', 2140]
  ];

  var TIERS = [
    { name: 'Starter', price: '$0', unit: '/mo', feats: ['1 region', '3 dashboards', '7-day history'], cta: 'Start free', feat: false },
    { name: 'Team', price: '$39', unit: '/mo', feats: ['5 regions', 'Unlimited dashboards', '90-day history'], cta: 'Start free trial', feat: false },
    { name: 'Business', price: '$129', unit: '/mo', feats: ['25 regions', 'Forecasting add-on', 'SSO + audit log'], cta: 'Start free trial', feat: true },
    { name: 'Enterprise', price: "Let's talk", unit: '', feats: ['Unlimited regions', 'Dedicated engineer', 'On-prem option'], cta: 'Contact sales', feat: false }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  OWN['shopify'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var observers = [];
      var rafs = [];
      var timeouts = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }

      var grid = $('#shFeatureGrid');
      if (grid) grid.innerHTML = FEATURES.map(function (f) {
        return '<div class="sh-feature"><span class="sh-feature-num">' + f.num + '</span>'
          + '<h3>' + esc(f.title) + '</h3><p>' + esc(f.body) + '</p></div>';
      }).join('');

      var regions = $('#shRegionList');
      if (regions) regions.innerHTML = REGIONS.map(function (r) {
        return '<li><span class="sh-region-name">' + esc(r[0]) + '</span>'
          + '<span class="sh-region-val">' + r[1].toLocaleString('en-US') + '/hr</span></li>';
      }).join('');

      var tiers = $('#shTierGrid');
      if (tiers) tiers.innerHTML = TIERS.map(function (t) {
        return '<div class="sh-tier' + (t.feat ? ' sh-tier-feat' : '') + '">'
          + '<span class="sh-tier-name">' + esc(t.name) + '</span>'
          + '<span class="sh-tier-price">' + esc(t.price) + (t.unit ? ' <small>' + esc(t.unit) + '</small>' : '') + '</span>'
          + '<ul class="sh-tier-list">' + t.feats.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
          + '<a class="sh-pill ' + (t.feat ? 'sh-pill-dark' : (t.price === '$0' ? 'sh-pill-mint' : 'sh-pill-dark')) + '" href="#">' + esc(t.cta) + '</a>'
          + '</div>';
      }).join('');

      function countUp() {
        Array.prototype.slice.call(root.querySelectorAll('.sh-region-val')).forEach(function (el) {
          var raw = (el.dataset.to || el.textContent).replace(/[^0-9]/g, '');
          var to = Number(raw) || 0;
          if (reduced) return;
          var from = Math.round(to * 0.6), start = performance.now(), dur = 900;
          el.textContent = '0/hr';
          function step(t) {
            if (disposed) return;
            var k = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - k, 3);
            el.textContent = Math.round(from + (to - from) * e).toLocaleString('en-US') + '/hr';
            if (k < 1) raf(step);
          }
          raf(step);
        });
      }
      Array.prototype.slice.call(root.querySelectorAll('.sh-region-val')).forEach(function (el) {
        el.dataset.to = (el.textContent.match(/[0-9,]+/) || ['0'])[0];
      });

      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { countUp(); io.unobserve(en.target); }
          });
        }, { threshold: 0.25 });
        var list = $('#shRegionList');
        if (list) { observers.push(io); io.observe(list); }
      }

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        timeouts.forEach(function (id) { clearTimeout(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
