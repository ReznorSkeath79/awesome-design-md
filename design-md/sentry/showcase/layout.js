/* ══ SENTRY — own layout behaviour for showcase.html ═════════════════════
   Registers window.OWN_LAYOUTS['sentry'].init(root). Renders the feature
   grid and pricing tiers from data. Returns a cleanup fn. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var FEATURES = [
    {
      title: 'Issue grouping',
      body: 'Northwind clusters throughput regressions by cause, region, and pipeline so one alert stands in for a thousand.',
      art: '<svg viewBox="0 0 280 60" fill="none" aria-hidden="true"><path d="M4 46 40 30l34 10 40-24 36 16 44-22 46 18 36-12" stroke="#c2ef4e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="154" cy="32" r="5" fill="#fa7faa"/></svg>'
    },
    {
      title: 'Live dashboards',
      body: 'Pin the metrics your floor cares about — throughput, yield, cost per case — and share a board with one link.',
      art: '<svg viewBox="0 0 280 60" fill="none" aria-hidden="true"><rect x="6" y="14" width="70" height="36" rx="4" stroke="#79628c"/><rect x="88" y="14" width="70" height="36" rx="4" stroke="#79628c"/><rect x="170" y="14" width="70" height="36" rx="4" stroke="#c2ef4e"/></svg>'
    },
    {
      title: 'Deploy tracking',
      body: 'Every change is stamped to the release that shipped it, so you can trace a regression back to a commit.',
      art: '<svg viewBox="0 0 280 60" fill="none" aria-hidden="true"><circle cx="24" cy="30" r="8" stroke="#79628c"/><circle cx="110" cy="30" r="8" stroke="#c2ef4e"/><circle cx="196" cy="30" r="8" stroke="#79628c"/><circle cx="262" cy="30" r="6" stroke="#79628c"/><path d="M32 30h70M118 30h70M204 30h50" stroke="#79628c"/></svg>'
    },
    {
      title: 'Alert routing',
      body: 'Send the right alert to the right on-call, with rules that match the region and severity of the miss.',
      art: '<svg viewBox="0 0 280 60" fill="none" aria-hidden="true"><path d="M20 30h60l40-16 40 32 40-16 60 0" stroke="#fa7faa" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>'
    }
  ];

  var TIERS = [
    {
      name: 'Developer', price: '$0', unit: '/mo',
      feats: ['5k events / month', '30-day retention', 'Community support'],
      cta: 'Start free', feat: false
    },
    {
      name: 'Team', price: '$29', unit: '/mo',
      feats: ['100k events / month', '90-day retention', 'Forecasting alerts'],
      cta: 'Start trial', feat: false
    },
    {
      name: 'Business', price: '$89', unit: '/mo', badge: 'Most popular',
      feats: ['2M events / month', '1-year retention', 'SSO + audit log', 'Priority support'],
      cta: 'Get started', feat: true
    },
    {
      name: 'Enterprise', price: "Let's talk", unit: '',
      feats: ['Volume pricing', 'On-prem option', 'Dedicated engineer'],
      cta: 'Contact sales', feat: false
    }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  OWN['sentry'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var observers = [];
      var rafs = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }

      var grid = $('#syFeatureGrid');
      if (grid) grid.innerHTML = FEATURES.map(function (f) {
        return '<article class="sy-card"><h3>' + esc(f.title) + '</h3><p>' + esc(f.body) + '</p>'
          + '<div class="sy-card-art">' + f.art + '</div></article>';
      }).join('');

      var tiers = $('#syTierGrid');
      if (tiers) tiers.innerHTML = TIERS.map(function (t) {
        return '<div class="sy-tier' + (t.feat ? ' sy-tier-feat' : '') + '">'
          + (t.badge ? '<span class="sy-tier-badge">' + esc(t.badge) + '</span>' : '')
          + '<span class="sy-tier-name">' + esc(t.name) + '</span>'
          + '<span class="sy-tier-price">' + esc(t.price) + (t.unit ? ' <small>' + esc(t.unit) + '</small>' : '') + '</span>'
          + '<ul class="sy-tier-list">' + t.feats.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
          + '<a class="sy-btn ' + (t.feat ? 'sy-btn-primary' : 'sy-btn-primary') + '" href="#">' + esc(t.cta) + '</a>'
          + '</div>';
      }).join('');

      function animateSpark() {
        var bars = Array.prototype.slice.call(root.querySelectorAll('.sy-spark span'));
        if (!bars.length || reduced) return;
        bars.forEach(function (b, i) {
          var target = b.style.getPropertyValue('--h') || '50%';
          b.style.height = '8%';
          b.style.transition = 'height .6s cubic-bezier(.16,1,.3,1)';
          setTimeout(function () { if (!disposed) b.style.height = target; }, 80 + i * 70);
        });
      }

      var io = null;
      if (typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { animateSpark(); io.unobserve(en.target); }
          });
        }, { threshold: 0.2 });
        var spark = $('.sy-spark');
        if (spark) { observers.push(io); io.observe(spark); }
      } else {
        animateSpark();
      }

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
