/* ══ NORTHWIND — own-layout behaviour for showcase.html ══════════════════
   The hero nav-pill-group switches the visible product view label; the
   mock's "confirm" is inert. Query only inside root, clean up on unmount. */
(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  window.OWN_LAYOUTS['cal'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var timer = 0;

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      var views = ['Personal', 'Teams', 'Enterprise'];
      on($('.hero-tabs'), 'click', function (e) {
        var b = e.target.closest('[role="tab"]');
        if (!b) return;
        $$('.hero-tabs .tab').forEach(function (t) { t.setAttribute('aria-selected', String(t === b)); });
        var title = $('.mock-title');
        var label = views[$$('.hero-tabs .tab').indexOf(b)] || 'Teams';
        if (title) title.textContent = 'Northwind · ' + label + ' ops';
      });

      on($('.mock-confirm'), 'click', function () {
        var b = $('.mock-confirm');
        if (!b) return;
        var was = b.textContent;
        b.textContent = 'Confirmed';
        window.clearTimeout(timer);
        timer = window.setTimeout(function () { if (b) b.textContent = was; }, 1200);
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        if (timer) window.clearTimeout(timer);
      };
    }
  };
})();
