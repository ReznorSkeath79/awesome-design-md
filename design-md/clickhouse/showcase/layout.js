/* ══ NORTHWIND — own-layout behaviour for showcase.html ══════════════════
   ClickHouse's marketing surface is a static dark page; the layout registers
   and returns a no-op cleanup. Query only inside root. */
(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  window.OWN_LAYOUTS['clickhouse'] = {
    init: function (root) {
      return function cleanup() {
        void root;
      };
    }
  };
})();
