/* ══ NORTHWIND M — own-layout behaviour for showcase.html ════════════════
   The configurator resolves a plan from the active tab; the burger toggles
   the phone menu. Query only inside root, remove listeners on cleanup. */
(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var PLANS = {
    core: { price: 1200, regions: '4', throughput: '800k/min', retention: '13 months', support: 'Business hours', meter: 30 },
    grid: { price: 3400, regions: '18', throughput: '2.4M/min', retention: '25 months', support: '24/7 follow-the-sun', meter: 62 },
    fastlane: { price: 6800, regions: '41', throughput: '6M/min', retention: '36 months', support: 'Dedicated crew', meter: 92 }
  };

  window.OWN_LAYOUTS['bmw-m'] = {
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
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      function render(plan) {
        var p = PLANS[plan] || PLANS.core;
        var price = $('#cfgPrice');
        if (price) price.textContent = '$' + p.price.toLocaleString('en-US');
        if ($('#cfgRegions')) $('#cfgRegions').textContent = p.regions;
        if ($('#cfgThroughput')) $('#cfgThroughput').textContent = p.throughput;
        if ($('#cfgRetention')) $('#cfgRetention').textContent = p.retention;
        if ($('#cfgSupport')) $('#cfgSupport').textContent = p.support;
        if ($('#cfgMeter')) $('#cfgMeter').style.width = p.meter + '%';
      }

      on($('.config-tabs'), 'click', function (e) {
        var b = e.target.closest('[data-plan]');
        if (!b) return;
        $$('.config .tab').forEach(function (t) { t.setAttribute('aria-selected', String(t === b)); });
        render(b.dataset.plan);
      });

      var burger = $('.nav-burger');
      var links = $('.nav-links');
      on(burger, 'click', function () {
        var open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!open));
        if (links) {
          links.style.display = !open ? 'flex' : '';
          if (!open) {
            links.style.position = 'absolute';
            links.style.top = '100%';
            links.style.left = '0';
            links.style.right = '0';
            links.style.flexDirection = 'column';
            links.style.alignItems = 'flex-start';
            links.style.gap = '4px';
            links.style.padding = '16px var(--gut) 20px';
            links.style.background = 'rgba(0,0,0,.97)';
            links.style.borderBottom = '1px solid var(--hairline)';
          } else {
            links.removeAttribute('style');
          }
        }
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        if (links) links.removeAttribute('style');
        if (burger) burger.setAttribute('aria-expanded', 'false');
        void disposed;
      };
    }
  };
})();
