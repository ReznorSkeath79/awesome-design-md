/* ══ NORTHWIND — Binance-language trading-desk boards for showcase.html ═════
   Registers window.OWN_LAYOUTS['binance'].init(root). Renders the markets
   snapshot, region table, throughput bars, and FAQ accordion, and returns a
   cleanup that detaches every listener and cancels any running rAF. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var MARKETS = [
    { sym: 'LUZ', name: 'Luzon', price: '412,908', pct: 2.1, pop: true, gain: true, fresh: false },
    { sym: 'BUS', name: 'Busan', price: '287,441', pct: 1.4, pop: true, gain: false, fresh: false },
    { sym: 'SIN', name: 'Singapore', price: '344,120', pct: -0.8, pop: true, gain: false, fresh: false },
    { sym: 'CEB', name: 'Cebu', price: '176,309', pct: 3.6, pop: false, gain: true, fresh: false },
    { sym: 'SYD', name: 'Sydney', price: '221,058', pct: -1.2, pop: false, gain: false, fresh: false },
    { sym: 'DVO', name: 'Davao', price: '133,776', pct: 4.9, pop: false, gain: true, fresh: false },
    { sym: 'RTM', name: 'Rotterdam', price: '198,204', pct: 0.6, pop: false, gain: false, fresh: true },
    { sym: 'MNL', name: 'Manila', price: '512,330', pct: 1.1, pop: false, gain: false, fresh: true }
  ];
  var BAR = [42, 58, 46, 71, 63, 80, 68, 88, 76, 94, 84, 61];
  var FAQ = [
    { q: 'Where does Northwind get its numbers?', a: 'One governed operations model resolves every region, line, and shift. Boards read from that model directly — there is no export step and no per-team mirror to reconcile.' },
    { q: 'How often do the boards refresh?', a: 'The model refreshes every fifteen minutes across all regions, so the number the night shift sees is the number the morning shift opens.' },
    { q: 'Can I run it on a single site?', a: 'Yes. The Team plan covers three boards and two regions with no card required for the first thirty days.' },
    { q: 'What are guardrails?', a: 'Guardrails compare each line against its named goal and flag drift in the same hour it appears — so a line is corrected before it reaches a customer.' }
  ];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function arrow(p) { return '<span class="' + (p >= 0 ? 'bn-up-t' : 'bn-down-t') + '">' + (p >= 0 ? '▲ ' : '▼ ') + Math.abs(p).toFixed(1) + '%</span>'; }

  function marketRow(m) {
    return '<div class="bn-mrow">'
      + '<span class="bn-mcoin"><i>' + esc(m.sym) + '</i>' + esc(m.name) + '</span>'
      + '<span class="bn-mprice">' + esc(m.price) + '</span>'
      + '<span class="bn-mchg ' + (m.pct >= 0 ? 'bn-up-t' : 'bn-down-t') + '">' + (m.pct >= 0 ? '+' : '') + m.pct.toFixed(1) + '%</span>'
      + '<span class="bn-mgo">›</span>'
      + '</div>';
  }

  OWN['binance'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var rafs = [];
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }
      function $(s) { return root.querySelector(s); }

      var markets = $('#bnMarkets');
      function renderMarkets(filter) {
        var list = MARKETS.filter(function (m) { return filter === 'popular' ? m.pop : filter === 'gainers' ? m.gain : m.fresh; });
        markets.innerHTML = (list.length ? list : MARKETS.slice(0, 4)).map(marketRow).join('');
      }
      renderMarkets('popular');
      on($('#bnMarketTabs'), 'click', function (e) {
        var b = e.target.closest('[data-m]'); if (!b) return;
        Array.prototype.forEach.call(root.querySelectorAll('#bnMarketTabs .bn-mtab'), function (t) {
          var on = t === b; t.classList.toggle('on', on); t.setAttribute('aria-selected', String(on));
        });
        renderMarkets(b.dataset.m);
      });

      var bars = $('#bnBars');
      if (bars) bars.innerHTML = BAR.map(function (h, i) {
        return '<span class="' + (i === 3 || i === 9 ? 'dn' : '') + '" style="height:' + h + '%"></span>';
      }).join('');

      var body = $('#bnTableBody');
      if (body) body.innerHTML = MARKETS.slice(0, 6).map(function (m) {
        var volume = (Number(String(m.price).replace(/,/g, '')) * 12.7 / 1000).toFixed(1);
        return '<div class="bn-tr bn-trow">'
          + '<span class="bn-td-name"><i>' + esc(m.sym) + '</i>' + esc(m.name) + '</span>'
          + '<span class="bn-td">' + esc(m.price) + '</span>'
          + '<span class="bn-td">' + arrow(m.pct) + '</span>'
          + '<span class="bn-td">' + volume + 'k</span>'
          + '<button class="bn-sub" type="button">Open</button>'
          + '</div>';
      }).join('');

      var faq = $('#bnFaq');
      if (faq) {
        faq.innerHTML = FAQ.map(function (f) {
          return '<div class="bn-faq-row">'
            + '<button class="bn-faq-q" type="button" aria-expanded="false">' + esc(f.q)
            + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
            + '<div class="bn-faq-a"><p>' + esc(f.a) + '</p></div>'
            + '</div>';
        }).join('');
      }
      on(faq, 'click', function (e) {
        var q = e.target.closest('.bn-faq-q'); if (!q) return;
        var row = q.parentNode;
        var open = row.classList.toggle('open');
        q.setAttribute('aria-expanded', String(open));
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
      };
    }
  };
})();
