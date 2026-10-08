/* ══ NORTHWIND — Airtable-language editorial boards for showcase.html ═══════
   Registers window.OWN_LAYOUTS['airtable'].init(root). The layout is
   presentational; init wires the pricing-tier picker and returns a cleanup. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['airtable'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }

      /* the featured tier follows the choice, so the sub-system reads as live */
      var tiers = Array.prototype.slice.call(root.querySelectorAll('.at-tier'));
      on(root.querySelector('.at-tiers'), 'click', function (e) {
        var tier = e.target.closest('.at-tier');
        if (!tier) return;
        tiers.forEach(function (t) { t.classList.toggle('at-tier-featured', t === tier); });
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
