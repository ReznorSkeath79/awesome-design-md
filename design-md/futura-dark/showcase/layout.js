/* ══ FUTURA DARK — own-layout behaviour for showcase.html ═══════════════════
   Registers window.OWN_LAYOUTS['futura-dark'].init(root). The dark variant
   shares the light system's structure and live clock + mono ticker; everything
   is scoped to `root` and the returned cleanup clears the interval. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var TICKER =
    'THROUGHPUT IDX 4.21 LIVE \u2715 FILL RATE 96.1 LIVE \u2715 LATENCY 118 LIVE \u2715 ' +
    'YIELD 89.4 LIVE \u2715 DEFECT RATE 0.42 LIVE \u2715 BACKLOG 1,204 LIVE \u2715 ';

  OWN['futura-dark'] = {
    init: function (root) {
      var clock = root.querySelector('[data-owf-clock]');
      var ticker = root.querySelector('[data-owf-ticker]');
      var timer = null;

      if (ticker) ticker.textContent = TICKER + TICKER;

      if (clock) {
        var tick = function () {
          var d = new Date();
          clock.textContent = d.toTimeString().slice(0, 8) + ' UTC';
        };
        tick();
        timer = window.setInterval(tick, 1000);
      }

      return function cleanup() {
        if (timer) { window.clearInterval(timer); timer = null; }
      };
    }
  };
})();
