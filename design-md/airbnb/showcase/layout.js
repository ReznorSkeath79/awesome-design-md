/* ══ NORTHWIND — Airbnb-language board cards for showcase.html ═════════════
   Registers window.OWN_LAYOUTS['airbnb'].init(root). Renders the board-card grid,
   wires the wishlist hearts, and returns a cleanup that removes every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var BOARDS = [
    { title: 'Line yield, Luzon', meta: 'Assembly · 6 lines', price: '$12.4M', unit: 'throughput', rating: '4.92', fav: true, ph: 'linear-gradient(135deg,#ffd1da,#ff385c 70%)' },
    { title: 'Port throughput, Busan', meta: 'Port ops · 3 berths', price: '98.1%', unit: 'on-time', rating: '4.88', fav: false, ph: 'linear-gradient(135deg,#cfe3ff,#1e5bff 75%)' },
    { title: 'Fulfilment, Sydney', meta: 'Fulfilment · 2 hubs', price: '$8.9M', unit: 'cost saved', rating: '4.75', fav: true, ph: 'linear-gradient(135deg,#ffe7c2,#ff8a3d 72%)' },
    { title: 'Agri ops, Mindanao', meta: 'Agri ops · 9 sites', price: '94.6%', unit: 'yield', rating: '4.81', fav: false, ph: 'linear-gradient(135deg,#c8f0d8,#0fa58c 74%)' },
    { title: 'Distribution, Singapore', meta: 'Distribution · 4 DCs', price: '$21.2M', unit: 'throughput', rating: '4.90', fav: false, ph: 'linear-gradient(135deg,#e6d8ff,#7b2cf0 74%)' },
    { title: 'Sourcing, Jakarta', meta: 'Sourcing · 11 vendors', price: '91.3%', unit: 'on-time', rating: '4.69', fav: true, ph: 'linear-gradient(135deg,#ffe0e0,#e22718 74%)' },
    { title: 'Recycling, Rotterdam', meta: 'Recycling · 5 lines', price: '$6.1M', unit: 'recovered', rating: '4.84', fav: false, ph: 'linear-gradient(135deg,#d6f5f0,#2dbdb6 74%)' },
    { title: 'Trade desk, Dubai', meta: 'Trade desk · 7 desks', price: '99.2%', unit: 'settled', rating: '4.95', fav: true, ph: 'linear-gradient(135deg,#fff2bf,#f0b90b 74%)' }
  ];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z"/></svg>';
  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.3 6.1 20.5l1.3-6.5L2.5 9.4l6.6-.8z"/></svg>';

  OWN['airbnb'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }
      function $(s) { return root.querySelector(s); }

      var grid = $('#abCardGrid');
      if (grid) {
        grid.innerHTML = BOARDS.map(function (b) {
          return '<article class="ab-card">'
            + '<a class="ab-card-photo" href="#" style="--ph:' + b.ph + '" aria-label="' + esc(b.title) + '">'
            + (b.fav ? '<span class="ab-fav">Guest favourite</span>' : '')
            + '<button class="ab-heart' + (b.fav ? ' on' : '') + '" type="button" aria-label="Save board" aria-pressed="' + b.fav + '">' + HEART + '</button>'
            + '</a>'
            + '<a class="ab-card-title" href="#">' + esc(b.title) + '</a>'
            + '<span class="ab-card-meta">' + esc(b.meta) + '</span>'
            + '<div class="ab-card-foot"><span class="ab-card-price">' + esc(b.price) + ' <small>' + esc(b.unit) + '</small></span>'
            + '<span class="ab-card-rating">' + STAR + esc(b.rating) + '</span></div>'
            + '</article>';
        }).join('');
      }

      on(grid, 'click', function (e) {
        var h = e.target.closest('.ab-heart');
        if (!h) return;
        e.preventDefault();
        var on = h.classList.toggle('on');
        h.setAttribute('aria-pressed', String(on));
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
