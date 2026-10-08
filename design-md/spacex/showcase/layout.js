/* ══ SPACEX — own layout behaviour for showcase.html ══════════════════════
   Registers window.OWN_LAYOUTS['spacex'].init(root). Renders the fleet list
   and shop product cards from data. The layout is otherwise static, so the
   returned cleanup is a no-op beyond removing listeners. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var FLEET = [
    { num: '01', title: 'Live dashboards', body: 'Every site streams throughput, yield, and cost into one board as the shift runs.' },
    { num: '02', title: 'Regional roll-up', body: 'Aggregate site metrics into a regional view with a single query, converted to your units.' },
    { num: '03', title: 'Forecasting', body: 'Model the next quarter per region with confidence intervals tuned to your seasonality.' },
    { num: '04', title: 'Alerting', body: 'Route misses to the right on-call with rules matched to region and severity.' }
  ];

  var PRODUCTS = [
    { name: 'Floor', price: '$0 / MONTH', feats: ['1 region', '3 dashboards', '7-day history'] },
    { name: 'Site', price: '$149 / MONTH', feats: ['5 regions', 'Unlimited dashboards', 'Forecast model'] }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  OWN['spacex'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $(sel) { return root.querySelector(sel); }

      var fleet = $('#sxFleetList');
      if (fleet) fleet.innerHTML = FLEET.map(function (f) {
        return '<div class="sx-fleet-item"><span class="sx-fleet-num">' + f.num + '</span>'
          + '<h3>' + esc(f.title) + '</h3><p>' + esc(f.body) + '</p></div>';
      }).join('');

      var shop = $('#sxShopGrid');
      if (shop) shop.innerHTML = PRODUCTS.map(function (p) {
        return '<div class="sx-product"><div class="sx-product-art" aria-hidden="true"></div>'
          + '<h3>' + esc(p.name) + '</h3><span class="sx-product-price">' + esc(p.price) + '</span>'
          + '<ul>' + p.feats.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
          + '<a class="sx-ghost" href="#">GET STARTED</a></div>';
      }).join('');

      /* smooth in-frame anchor scrolling */
      Array.prototype.slice.call(root.querySelectorAll('a[href^="#"]')).forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
