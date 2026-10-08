/* ══ NORTHWIND — own-layout behaviour for showcase.html ══════════════════
   Claude's marketing surface is a static editorial page; the layout registers
   and returns a no-op cleanup so unmounting is clean. */
(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  window.OWN_LAYOUTS['claude'] = {
    init: function (root) {
      return function cleanup() {
        void root;
      };
    }
  };
})();
