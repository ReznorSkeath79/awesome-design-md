/* ══ NORTHWIND — Aurora-language performance wall for showcase.html ═════════
   Registers window.OWN_LAYOUTS['aurora'].init(root). Renders the KPI wall,
   leaderboard, and city table from one data set, wires the folder tabs, and
   returns a cleanup that detaches every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  /* 14-day heat states: 'down' | 'mid' | 'up' | 'none'. Deterministic sample. */
  var METRICS = [
    { name: 'Throughput', sub: 'Units / day', seed: 1, today: 98.1, goal: 96 },
    { name: 'Line yield', sub: 'Passing grade', seed: 2, today: 94.6, goal: 95 },
    { name: 'On-time', sub: 'Shipments', seed: 3, today: 97.2, goal: 96 },
    { name: 'Cost / unit', sub: 'Indexed', seed: 4, today: 91.8, goal: 94 },
    { name: 'Fulfilment', sub: 'First touch', seed: 5, today: 99.1, goal: 97 },
    { name: 'Utilisation', sub: 'Line hours', seed: 6, today: 88.4, goal: 90 }
  ];
  var REGIONS = [
    { name: 'Luzon', ptg: 102.4, q: 1 },
    { name: 'Busan', ptg: 100.8, q: 1 },
    { name: 'Singapore', ptg: 99.3, q: 2 },
    { name: 'Sydney', ptg: 97.1, q: 2 },
    { name: 'Visayas', ptg: 95.6, q: 3 },
    { name: 'Rotterdam', ptg: 93.2, q: 3 },
    { name: 'Mindanao', ptg: 89.4, q: 4 },
    { name: 'Jakarta', ptg: 86.1, q: 4 }
  ];
  var CITIES = [
    { name: 'Manila', ptg: 101.9, n: 412 },
    { name: 'Busan', ptg: 100.2, n: 288 },
    { name: 'Singapore', ptg: 98.7, n: 344 },
    { name: 'Cebu', ptg: 96.8, n: 176 },
    { name: 'Sydney', ptg: 94.1, n: 221 },
    { name: 'Davao', ptg: 91.3, n: 133 }
  ];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function heatStates(seed) {
    var out = [], x = seed * 7 + 3;
    for (var i = 0; i < 14; i++) {
      x = (x * 31 + 17) % 100;
      out.push(x < 22 ? 'down' : x < 55 ? 'mid' : x < 90 ? 'up' : 'none');
    }
    return out;
  }
  function inkFor(ptg, goal) { return ptg >= goal ? 'var(--mint-ink)' : ptg >= goal - 3 ? 'var(--amber-ink)' : 'var(--coral-ink)'; }

  OWN['aurora'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }
      function $(s) { return root.querySelector(s); }

      var wall = $('#auWall');
      if (wall) {
        wall.innerHTML = METRICS.map(function (m) {
          var states = heatStates(m.seed).map(function (s) {
            var bg = s === 'down' ? 'rgba(224,113,74,.62)' : s === 'mid' ? 'rgba(255,226,74,.7)' : s === 'up' ? 'rgba(155,241,180,.9)' : 'var(--line-2)';
            return '<span class="au-cell" style="background:' + bg + '"></span>';
          }).join('');
          var pct = Math.min(100, Math.max(6, (m.today / 140) * 100));
          var color = m.today >= m.goal ? 'var(--bar-fill-green)' : m.today >= m.goal - 3 ? 'var(--amber-bar-fill)' : 'var(--coral)';
          return '<div class="au-wall-row">'
            + '<span class="au-wall-name">' + esc(m.name) + '<em>' + esc(m.sub) + '</em></span>'
            + '<span class="au-heat">' + states + '</span>'
            + '<span class="au-cur" style="color:' + inkFor(m.today, m.goal) + '">' + m.today.toFixed(1) + '%</span>'
            + '<span class="au-bar-wrap"><span class="au-bar" style="width:' + pct + '%;background:' + color + '"></span><span class="au-tick"></span></span>'
            + '</div>';
        }).join('');
      }

      var board = $('#auBoard');
      if (board) {
        board.innerHTML = REGIONS.map(function (r, i) {
          var pct = Math.min(100, Math.max(6, (r.ptg / 140) * 100));
          var qc = r.q === 1 ? 'au-q1' : r.q === 4 ? 'au-q4' : 'au-q23';
          return '<div class="au-board-row">'
            + '<span class="au-rank">' + (i + 1) + '</span>'
            + '<span class="au-row-name">' + esc(r.name) + '</span>'
            + '<span class="au-bar-wrap"><span class="au-bar" style="width:' + pct + '%;background:' + (r.ptg >= 100 ? 'var(--bar-fill-green)' : r.ptg >= 95 ? 'var(--amber-bar-fill)' : 'var(--coral)') + '"></span><span class="au-tick"></span></span>'
            + '<span class="au-row-val" style="color:' + inkFor(r.ptg, 100) + '">' + r.ptg.toFixed(1) + '</span>'
            + '<span class="au-q ' + qc + '">Q' + r.q + '</span>'
            + '</div>';
        }).join('');
      }

      var city = $('#auCity');
      if (city) {
        city.innerHTML = CITIES.map(function (c) {
          var pct = Math.min(100, Math.max(6, (c.ptg / 140) * 100));
          return '<div class="au-city-row">'
            + '<span class="au-row-name">' + esc(c.name) + '</span>'
            + '<span class="au-bar-wrap"><span class="au-bar" style="width:' + pct + '%;background:' + (c.ptg >= 100 ? 'var(--bar-fill-green)' : c.ptg >= 95 ? 'var(--amber-bar-fill)' : 'var(--coral)') + '"></span><span class="au-tick"></span></span>'
            + '<span class="au-row-val" style="color:' + inkFor(c.ptg, 100) + '">' + c.ptg.toFixed(1) + '</span>'
            + '<span class="au-q au-q23">' + c.n + '</span>'
            + '</div>';
        }).join('');
      }

      var regions = $('#auRegions');
      if (regions) {
        regions.innerHTML = REGIONS.slice(0, 8).map(function (r) {
          var good = r.ptg >= 100;
          var cls = good ? 'var(--mint-ink)' : r.ptg >= 95 ? 'var(--amber-ink)' : 'var(--coral-ink)';
          var pill = r.ptg >= 100
            ? '<span class="au-region-pill">At goal</span>'
            : '<span class="au-region-pill" style="background:rgba(224,113,74,.16);color:var(--coral-ink)">Below</span>';
          return '<article class="au-region">'
            + '<div class="au-region-top"><span class="au-region-name">' + esc(r.name) + '</span>' + pill + '</div>'
            + '<span class="au-region-num" style="color:' + cls + '">' + r.ptg.toFixed(1) + '</span>'
            + '<span class="au-region-sub">PTG vs goal 100</span>'
            + '</article>';
        }).join('');
      }

      var row = $('#auTabrow');
      on(row, 'click', function (e) {
        var tab = e.target.closest('.au-tab'); if (!tab) return;
        Array.prototype.forEach.call(row.querySelectorAll('.au-tab'), function (t) {
          var on = t === tab;
          t.classList.toggle('on', on);
          t.setAttribute('aria-pressed', String(on));
        });
        Array.prototype.forEach.call(root.querySelectorAll('.au-view'), function (v) {
          v.hidden = v.dataset.view !== tab.dataset.tab;
        });
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
