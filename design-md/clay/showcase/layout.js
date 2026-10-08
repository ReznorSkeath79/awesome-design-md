/* ══ NORTHWIND — own-layout behaviour for showcase.html ══════════════════
   Clay's marketing surface is static; the layout registers and returns a
   no-op cleanup. Query only inside root. */
(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  window.OWN_LAYOUTS['clay'] = {
    init: function (root) {
      return function cleanup() {
        void root;
      };
    }
  };
})();
