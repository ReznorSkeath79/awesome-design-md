/* ══ OPENCODE.AI — own layout behaviour for showcase.html ═══════════════════
   Registers window.OWN_LAYOUTS['opencode.ai'].init(root). Wires the mobile
   drawer, the install-method tab strip, and the snippet copy button. init
   returns a cleanup so unmounting removes every listener and timer. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var CMDS = {
    curl: 'curl -fsSL https://get.northwind.dev/install | bash',
    npm: 'npm install -g @northwind/cli',
    brew: 'brew install northwind'
  };

  OWN['opencode.ai'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var timers = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $sel(s) { return root.querySelector(s); }
      function $all(s) { return Array.prototype.slice.call(root.querySelectorAll(s)); }

      var burger = $sel('[data-oc-burger]');
      var drawer = $sel('[data-oc-drawer]');
      if (burger && drawer) {
        on(burger, 'click', function () {
          var open = drawer.hasAttribute('hidden');
          if (open) drawer.removeAttribute('hidden');
          else drawer.setAttribute('hidden', '');
          burger.setAttribute('aria-expanded', String(open));
        });
        on(drawer, 'click', function (e) {
          if (e.target.closest('a')) { drawer.setAttribute('hidden', ''); burger.setAttribute('aria-expanded', 'false'); }
        });
      }

      var cmdEl = $sel('[data-oc-cmd]');
      var tabs = $all('[data-oc-tab]');
      tabs.forEach(function (tab) {
        on(tab, 'click', function () {
          var key = tab.getAttribute('data-oc-tab');
          tabs.forEach(function (t) {
            var active = t === tab;
            t.classList.toggle('on', active);
            t.setAttribute('aria-selected', String(active));
          });
          if (cmdEl && CMDS[key]) cmdEl.textContent = CMDS[key];
        });
      });

      var copy = $sel('[data-oc-copy]');
      if (copy && cmdEl) {
        on(copy, 'click', function () {
          function done() {
            if (disposed) return;
            copy.classList.add('done');
            timers.push(window.setTimeout(function () {
              if (!disposed) copy.classList.remove('done');
            }, 1400));
          }
          var text = cmdEl.textContent || '';
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, done);
          } else {
            done();
          }
        });
      }

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        timers.forEach(function (id) { clearTimeout(id); });
      };
    }
  };
})();
