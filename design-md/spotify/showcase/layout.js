/* ══ SPOTIFY — own layout behaviour for showcase.html ═════════════════════
   Registers window.OWN_LAYOUTS['spotify'].init(root). Renders the jump-back
   tiles, region cards, alerts and wires the now-playing bar, rotating through
   regions. Returns a cleanup fn (clears timers, listeners, rAF). */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var TILES = [
    { name: 'Luzon throughput', meta: 'Regional dashboard', c1: '#1ed760', c2: '#0a5c2c' },
    { name: 'Visayas yield', meta: 'Site roll-up', c1: '#539df5', c2: '#123a63' },
    { name: 'Mindanao cost', meta: 'Cost per case', c1: '#ffa42b', c2: '#6b3f00' },
    { name: 'Forecast Q4', meta: 'Projection model', c1: '#f3727f', c2: '#6b1f28' }
  ];

  var REGIONS = [
    { name: 'Luzon', meta: 'Manufacturing · 8 sites', stat: '3,987/hr', c1: '#1ed760', c2: '#0a5c2c' },
    { name: 'Visayas', meta: 'Logistics · 5 sites', stat: '2,244/hr', c1: '#539df5', c2: '#123a63' },
    { name: 'Mindanao', meta: 'Agri ops · 6 sites', stat: '1,602/hr', c1: '#ffa42b', c2: '#6b3f00' },
    { name: 'Singapore', meta: 'Distribution · 3 sites', stat: '3,020/hr', c1: '#f3727f', c2: '#6b1f28' },
    { name: 'Sydney', meta: 'Fulfilment · 4 sites', stat: '2,870/hr', c1: '#1db954', c2: '#0b3d20' }
  ];

  var ALERTS = [
    { title: 'Luzon under target by 5.1%', meta: 'Throughput · 12 minutes ago', tag: 'warning', c: '#ffa42b', ic: '!' },
    { title: 'Visayas above target by 6.9%', meta: 'Throughput · 40 minutes ago', tag: 'good', c: '#1ed760', ic: '\u2191' },
    { title: 'Mindanao cost per case +3%', meta: 'Cost · 2 hours ago', tag: 'info', c: '#539df5', ic: 'i' },
    { title: 'Singapore pipeline degraded', meta: 'Latency · 3 hours ago', tag: 'critical', c: '#f3727f', ic: '\u2715' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(root, sel) { return root.querySelector(sel); }

  OWN['spotify'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var timers = [];
      var rafs = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timers.push(id); return id; }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }

      var tiles = $('#spTileGrid', root);
      if (tiles) tiles.innerHTML = TILES.map(function (t) {
        return '<a class="sp-tile" href="#" style="--c1:' + t.c1 + ';--c2:' + t.c2 + '">'
          + '<span class="sp-tile-art" aria-hidden="true"></span>'
          + '<span class="sp-tile-text"><span class="sp-tile-name">' + esc(t.name) + '</span>'
          + '<span class="sp-tile-meta">' + esc(t.meta) + '</span></span>'
          + '<span class="sp-tile-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></a>';
      }).join('');

      var cards = $('#spRegionGrid', root);
      if (cards) cards.innerHTML = REGIONS.map(function (r) {
        return '<a class="sp-card" href="#" style="--c1:' + r.c1 + ';--c2:' + r.c2 + '">'
          + '<span class="sp-card-art" aria-hidden="true"></span>'
          + '<span class="sp-card-name">' + esc(r.name) + '</span>'
          + '<span class="sp-card-meta">' + esc(r.meta) + '</span>'
          + '<span class="sp-card-stat">' + esc(r.stat) + '</span></a>';
      }).join('');

      var alerts = $('#spAlertList', root);
      if (alerts) alerts.innerHTML = ALERTS.map(function (a) {
        return '<div class="sp-alert"><span class="sp-alert-ic" style="--c:' + a.c + '" aria-hidden="true">' + a.ic + '</span>'
          + '<span><span class="sp-alert-title">' + esc(a.title) + '</span>'
          + '<span class="sp-alert-meta">' + esc(a.meta) + '</span></span>'
          + '<span class="sp-alert-tag" style="--c:' + a.c + '">' + esc(a.tag) + '</span></div>';
      }).join('');

      /* now-playing bar cycles through regions */
      var nameEl = $('#spNowName', root);
      var subEl = $('#spNowSub', root);
      var valEl = $('#spNowVal', root);
      var progEl = $('#spNowProgress', root);
      var idx = 0;
      function show(i) {
        var r = REGIONS[i % REGIONS.length];
        if (nameEl) nameEl.textContent = r.name;
        if (subEl) subEl.textContent = 'throughput · live';
        if (valEl) valEl.textContent = r.stat;
        if (progEl) progEl.style.width = (30 + ((i * 37) % 55)) + '%';
      }
      if (!reduced && nameEl) {
        later(function tick() {
          if (disposed) return;
          idx = (idx + 1) % REGIONS.length;
          show(idx);
          later(tick, 3200);
        }, 3200);
      }

      Array.prototype.slice.call(root.querySelectorAll('a[href^="#"]')).forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        });
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        timers.forEach(function (id) { clearTimeout(id); });
      };
    }
  };
})();
