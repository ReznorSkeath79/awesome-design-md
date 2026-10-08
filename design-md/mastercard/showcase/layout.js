/* ══ NORTHWIND — Mastercard own-layout behaviour ═══════════════════════════
   Registers window.OWN_LAYOUTS['mastercard'].init(root). The layout is largely
   static; the one dynamic affordance is the pricing language pill, which cycles
   a couple of sample locales. Returns a cleanup removing the listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['mastercard'] = {
    init: function (root) {
      var lang = root.querySelector('.mc-lang');
      var locales = ['English \u00B7 PH', 'English \u00B7 UK', 'Fran\u00E7ais \u00B7 FR'];
      var i = 0;

      function onClick() {
        i = (i + 1) % locales.length;
        lang.textContent = locales[i];
      }
      if (lang) lang.addEventListener('click', onClick);

      return function cleanup() {
        if (lang) lang.removeEventListener('click', onClick);
      };
    }
  };
})();
