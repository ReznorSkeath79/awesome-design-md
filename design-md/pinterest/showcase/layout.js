/* ══ PINTEREST — Northwind operations analytics ═══════════════════════════════════
   Registers window.OWN_LAYOUTS['pinterest'].init(root). Renders the masonry pin
   grid, category tiles and quote cards from sample data. Returns a no-op cleanup
   (this layout is static — the cleanup exists so unmount stays safe). */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Sample pins — fictional ops boards. height = masonry aspect. */
  var PINS = [
    { art: 'metric', c: '#e60023', num: '$48.2k', lab: 'Revenue · weekly', h: 210, pill: 'Revenue' },
    { art: 'spark', c: '#7e238b', h: 260, pill: 'Trend' },
    { art: 'donut', c: '#262622', pct: 82, h: 190, pill: 'SLA' },
    { art: 'bars', c: '#0057b8', h: 240, pill: 'Regions' },
    { art: 'metric', c: '#2c8c66', num: '98.4%', lab: 'On-time throughput', h: 190, pill: 'Throughput' },
    { art: 'spark', c: '#d53b00', h: 230, pill: 'Volume' },
    { art: 'donut', c: '#7e238b', pct: 64, h: 210, pill: 'Capacity' },
    { art: 'bars', c: '#211922', h: 250, pill: 'Backlog' },
    { art: 'metric', c: '#0057b8', num: '6', lab: 'Regions live', h: 180, pill: 'Regions' },
    { art: 'spark', c: '#e60023', h: 220, pill: 'Cycle time' }
  ];

  var CATS = [
    { c: '#e60023', name: 'Revenue pulse', count: '28 pins', d: 'M4 14 L10 9 L15 12 L21 5' },
    { c: '#262622', name: 'Throughput', count: '41 pins', d: 'M4 12h16M14 7l5 5-5 5' },
    { c: '#7e238b', name: 'Regions', count: '19 pins', d: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18' },
    { c: '#0057b8', name: 'Support health', count: '33 pins', d: 'M12 4v16M4 12h16' },
    { c: '#2c8c66', name: 'Forecasting', count: '24 pins', d: 'M4 18 L10 12 L14 15 L20 6' },
    { c: '#d53b00', name: 'Inventory', count: '17 pins', d: 'M4 6h16v4H4zM4 14h16v4H4z' },
    { c: '#211922', name: 'Delivery SLAs', count: '22 pins', d: 'M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16M12 8v4l3 2' },
    { c: '#617bff', name: 'Team capacity', count: '30 pins', d: 'M12 5a7 7 0 1 0 0 14a7 7 0 0 0 0-14M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6' }
  ];

  var QUOTES = [
    { text: 'We pinned the whole quarter on one board. Throughput and revenue finally tell the same story.', name: 'Jo Alcantara', role: 'Head of Operations', i: 'JA' },
    { text: 'Northwind replaced four spreadsheets and a weekly reconciliation call. The numbers just stay in sync.', name: 'Mika Navarro', role: 'Revenue Ops Lead', i: 'MN' },
    { text: 'Regional leads open the same board every morning. No one argues about whose dashboard is right anymore.', name: 'Dane Ocampo', role: 'Logistics Manager', i: 'DO' }
  ];

  function pinArt(p) {
    if (p.art === 'metric') {
      return '<div class="pt-pin-art" style="background:' + esc(p.c) + ';min-height:' + p.h + 'px">'
        + '<span class="pt-pin-num">' + esc(p.num) + '</span>'
        + '<span class="pt-pin-lab">' + esc(p.lab) + '</span></div>';
    }
    if (p.art === 'spark') {
      return '<div class="pt-pin-art" style="background:' + esc(p.c) + ';min-height:' + p.h + 'px">'
        + '<svg class="pt-spark" viewBox="0 0 240 56" preserveAspectRatio="none" aria-hidden="true">'
        + '<path d="M0 46 L40 40 L80 44 L120 26 L160 32 L200 16 L240 20"/></svg>'
        + '<span class="pt-pin-lab" style="margin-top:12px">weekly trend</span></div>';
    }
    if (p.art === 'donut') {
      var off = Math.round(p.pct * 1.76);
      return '<div class="pt-pin-art" style="background:' + esc(p.c) + ';min-height:' + p.h + 'px">'
        + '<svg class="pt-donut" viewBox="0 0 80 80" aria-hidden="true">'
        + '<circle cx="40" cy="40" r="28" stroke="rgba(255,255,255,.22)"/>'
        + '<circle cx="40" cy="40" r="28" stroke="#fff" stroke-dasharray="176" stroke-dashoffset="' + (176 - off) + '" transform="rotate(-90 40 40)"/></svg>'
        + '<span class="pt-pin-num" style="font-size:22px;margin-top:8px">' + p.pct + '%</span></div>';
    }
    return '<div class="pt-pin-art" style="background:' + esc(p.c) + ';min-height:' + p.h + 'px">'
      + '<div class="pt-bars2" aria-hidden="true">' + [40, 66, 52, 84, 60, 92, 74].map(function (h) {
        return '<i style="height:' + h + '%"></i>';
      }).join('') + '</div>'
      + '<span class="pt-pin-lab" style="margin-top:12px">by region</span></div>';
  }

  OWN['pinterest'] = {
    init: function (root) {
      var $ = function (s) { return root.querySelector(s); };

      var masonry = $('#ptMasonry');
      if (masonry) {
        masonry.innerHTML = PINS.map(function (p) {
          return '<article class="pt-pin" aria-label="' + esc(p.pill) + ' pin">'
            + pinArt(p)
            + '<span class="pt-overlay-pill">' + esc(p.pill) + '</span></article>';
        }).join('');
      }

      var cats = $('#ptCatGrid');
      if (cats) {
        cats.innerHTML = CATS.map(function (c) {
          return '<a class="pt-cat" href="#" style="--c:' + esc(c.c) + '" aria-label="' + esc(c.name) + '">'
            + '<span class="pt-cat-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="' + c.d + '"/></svg></span>'
            + '<span class="pt-cat-name">' + esc(c.name) + '</span>'
            + '<span class="pt-cat-count">' + esc(c.count) + '</span></a>';
        }).join('');
      }

      var quotes = $('#ptQuotes');
      if (quotes) {
        quotes.innerHTML = QUOTES.map(function (q) {
          return '<figure class="pt-quote">'
            + '<blockquote class="pt-quote-text">“' + esc(q.text) + '”</blockquote>'
            + '<figcaption class="pt-quote-who">'
            + '<span class="pt-quote-av" aria-hidden="true">' + esc(q.i) + '</span>'
            + '<span><span class="pt-quote-name">' + esc(q.name) + '</span><br>'
            + '<span class="pt-quote-role">' + esc(q.role) + '</span></span>'
            + '</figcaption></figure>';
        }).join('');
      }

      return function cleanup() { /* static layout — nothing to tear down */ };
    }
  };
})();
