/* ══ NORTHWIND — in Coinbase's design language, for showcase.html ════════════
   Registers window.OWN_LAYOUTS['coinbase'].init(root). Renders the asset-row
   list from sample data, wires the footer subscription form, and returns a
   cleanup that detaches every listener. Hover/transition only — no idle motion. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var LINES = [
    { name: 'Line 04', region: 'Luzon', price: '98.4%', chg: '+2.4%', up: true },
    { name: 'Line 09', region: 'Busan', price: '94.6%', chg: '\u22121.1%', up: false },
    { name: 'Line 02', region: 'Luzon', price: '99.1%', chg: '+0.6%', up: true },
    { name: 'Line 11', region: 'Jurong', price: '96.2%', chg: '+1.3%', up: true },
    { name: 'Line 07', region: 'Busan', price: '92.8%', chg: '\u22122.7%', up: false }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function initials(s) { return String(s).replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase(); }

  OWN['coinbase'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $(s) { return root.querySelector(s); }

      var list = $('#cbAssetList');
      if (list) {
        list.innerHTML = LINES.map(function (l) {
          return '<div class="cb-asset">'
            + '<span class="cb-asset-ico" aria-hidden="true">' + esc(initials(l.name)) + '</span>'
            + '<span class="cb-asset-name"><b>' + esc(l.name) + '</b><span>' + esc(l.region) + '</span></span>'
            + '<span class="cb-asset-price">' + esc(l.price) + '</span>'
            + '<span class="cb-asset-chg ' + (l.up ? 'cb-chg-up' : 'cb-chg-down') + '">' + esc(l.chg) + '</span>'
            + '</div>';
        }).join('');
      }

      var form = $('#cbFootForm');
      on(form, 'submit', function (e) {
        e.preventDefault();
        var input = $('#cbFootEmail');
        if (input) { input.value = ''; input.placeholder = 'Thanks — sample data only'; }
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
