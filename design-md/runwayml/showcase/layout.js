/* ══ NORTHWIND — Runway-language chrome for showcase.html ═══════════════════
   Registers window.OWN_LAYOUTS['runwayml'].init(root). The editorial layout is
   static (CSS + SVG only), so init returns a no-op cleanup; the guard keeps an
   inert anchor from navigating away from the showcase frame. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['runwayml'] = {
    init: function () {
      return function cleanup() { /* static layout — nothing to tear down */ };
    }
  };
})();
