/* ══ NORTHWIND — Apple-language gallery for showcase.html ══════════════════
   Registers window.OWN_LAYOUTS['apple'].init(root). Renders the store grid and
   the configurator chips, keeps the running plan price in sync, and returns a
   cleanup that detaches every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var BOARDS = [
    { name: 'Throughput', sub: '6 lines · Luzon', price: 'Live', val: '412k', ink: '#0066cc', bg: '#eef4fc' },
    { name: 'Line yield', sub: '14 lines · all regions', price: '94.6%', val: '94.6', ink: '#1d7a4b', bg: '#e9f5ef' },
    { name: 'Port ops', sub: '3 berths · Busan', price: '98.1%', val: '98.1', ink: '#b4502a', bg: '#fbeee7' },
    { name: 'Cost per unit', sub: '12 regions', price: '$2.41', val: '2.41', ink: '#6b4ea8', bg: '#f1ecfa' }
  ];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { return '$' + Number(n).toLocaleString('en-US'); }

  var BASE = 4700, PER_REGION = 180, INCLUDED = 1;

  OWN['apple'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }
      function $(s) { return root.querySelector(s); }

      var grid = $('#apStoreGrid');
      if (grid) {
        grid.innerHTML = BOARDS.map(function (b) {
          return '<article class="ap-card">'
            + '<div class="ap-card-photo" style="--ph:' + b.bg + ';--ph-ink:' + b.ink + '"><span>' + esc(b.val) + '</span></div>'
            + '<span class="ap-card-name">' + esc(b.name) + '</span>'
            + '<span class="ap-card-sub">' + esc(b.sub) + '</span>'
            + '<span class="ap-card-price">' + esc(b.price) + '</span>'
            + '<a class="ap-card-link" href="#">Learn more ›</a>'
            + '</article>';
        }).join('');
      }

      var chips = $('#apConfigChips');
      var regions = 3;
      if (chips) {
        chips.innerHTML = [1, 3, 6, 12].map(function (n) {
          return '<button class="ap-chip" type="button" role="radio" data-n="' + n + '" aria-checked="' + (n === regions) + '">'
            + '<b>' + n + ' region' + (n > 1 ? 's' : '') + '</b><span>' + (n === 1 ? 'included' : '+' + money((n - INCLUDED) * PER_REGION) + '/mo') + '</span></button>';
        }).join('');
      }
      function renderPrice() {
        var amt = $('#apAmount');
        if (amt) amt.textContent = money(BASE + Math.max(0, regions - INCLUDED) * PER_REGION);
        if (chips) Array.prototype.forEach.call(chips.children, function (c) {
          c.setAttribute('aria-checked', String(Number(c.dataset.n) === regions));
        });
      }
      on(chips, 'click', function (e) {
        var c = e.target.closest('[data-n]'); if (!c) return;
        regions = Number(c.dataset.n); renderPrice();
      });
      renderPrice();

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
