/* ══ NORTHWIND — BMW corporate-language operations site for showcase.html ══
   Registers window.OWN_LAYOUTS['bmw'].init(root). Renders the model cards and
   dealer inventory, wires filter chips and the configurator tiles, keeps the
   plan price in sync, and returns a cleanup that detaches every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var MODELS = [
    { name: 'Throughput board', tag: 'Live units per day, every line', seed: 1 },
    { name: 'Yield board', tag: 'Passing grade across all lines', seed: 2 },
    { name: 'Cost board', tag: 'Cost per unit, indexed by region', seed: 3 },
    { name: 'Fulfilment board', tag: 'First-touch and on-time, per hub', seed: 4 }
  ];
  var INVENTORY = [
    { name: 'Luzon', variant: 'Assembly cluster', price: '$412k/day', kind: 'live' },
    { name: 'Busan', variant: 'Port operations', price: '$287k/day', kind: 'live' },
    { name: 'Singapore', variant: 'Distribution centre', price: '$344k/day', kind: 'live' },
    { name: 'Visayas', variant: 'Logistics hub', price: '$198k/day', kind: 'planned' },
    { name: 'Mindanao', variant: 'Agri ops cluster', price: '$176k/day', kind: 'planned' },
    { name: 'Rotterdam', variant: 'Recycling lines', price: '$133k/day', kind: 'live' }
  ];
  var FILTERS = [['all', 'All'], ['live', 'Live'], ['planned', 'Planned']];
  var BASE = 4700, PER_REGION = 180, INCLUDED = 1;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { return '$' + Number(n).toLocaleString('en-US'); }

  /* a simple abstract "vehicle"/region silhouette, built from divs + SVG */
  function silhouette(seed) {
    var bars = [38, 54, 46, 68, 60, 82].map(function (h, i) {
      return '<rect x="' + (10 + i * 24) + '" y="' + (74 - h) + '" width="14" height="' + h + '" rx="2" fill="#1c69d4" opacity="' + (0.45 + ((i + seed) % 3) * 0.2) + '"/>';
    }).join('');
    return '<svg viewBox="0 0 160 80" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + bars + '</svg>';
  }

  OWN['bmw'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }
      function $(s) { return root.querySelector(s); }

      var models = $('#bwModelGrid');
      if (models) {
        models.innerHTML = MODELS.map(function (m) {
          return '<article class="bw-model">'
            + '<div class="bw-model-photo">' + silhouette(m.seed) + '</div>'
            + '<h3 class="bw-model-name">' + esc(m.name) + '</h3>'
            + '<p class="bw-model-tag">' + esc(m.tag) + '</p>'
            + '<a class="bw-textlink" href="#">Learn more <span aria-hidden="true">›</span></a>'
            + '</article>';
        }).join('');
      }

      var filters = $('#bwFilters');
      var filter = 'all';
      var invList = $('#bwInvList');
      function renderInv() {
        var list = INVENTORY.filter(function (v) { return filter === 'all' || v.kind === filter; });
        invList.innerHTML = list.length ? list.map(function (v) {
          return '<article class="bw-inv">'
            + '<div class="bw-inv-photo">' + silhouette(v.name.length) + '</div>'
            + '<h3 class="bw-inv-name">' + esc(v.name) + '</h3>'
            + '<p class="bw-inv-meta">' + esc(v.variant) + '</p>'
            + '<p class="bw-inv-price">' + esc(v.price) + '</p>'
            + '<a class="bw-textlink" href="#">View <span aria-hidden="true">›</span></a>'
            + '</article>';
        }).join('') : '<p class="bw-inv-empty">No regions match this filter.</p>';
      }
      if (filters) filters.innerHTML = FILTERS.map(function (f) {
        return '<button class="bw-chip' + (f[0] === filter ? ' on' : '') + '" type="button" data-f="' + f[0] + '" aria-pressed="' + (f[0] === filter) + '">' + f[1] + '</button>';
      }).join('');
      on(filters, 'click', function (e) {
        var c = e.target.closest('[data-f]'); if (!c) return;
        filter = c.dataset.f;
        Array.prototype.forEach.call(filters.children, function (x) { x.classList.toggle('on', x === c); x.setAttribute('aria-pressed', String(x === c)); });
        renderInv();
      });
      renderInv();

      var tiles = $('#bwConfigTiles');
      var regions = 3;
      var COUNT = [1, 3, 6, 12];
      function renderTiles() {
        tiles.innerHTML = COUNT.map(function (n) {
          return '<button class="bw-tile" type="button" role="radio" data-n="' + n + '" aria-checked="' + (n === regions) + '">'
            + '<b>' + n + ' region' + (n > 1 ? 's' : '') + '</b><span>' + (n === 1 ? 'included' : '+' + money((n - INCLUDED) * PER_REGION) + '/mo') + '</span></button>';
        }).join('');
        var amt = $('#bwAmount');
        if (amt) amt.textContent = money(BASE + Math.max(0, regions - INCLUDED) * PER_REGION);
      }
      on(tiles, 'click', function (e) {
        var t = e.target.closest('[data-n]'); if (!t) return;
        regions = Number(t.dataset.n); renderTiles();
      });
      renderTiles();

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
