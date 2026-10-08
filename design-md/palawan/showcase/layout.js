/* ══ PALAWAN — behaviour for showcase.html ═════════════════════════════════
   Registers window.OWN_LAYOUTS['palawan'].init(root). Wires the mobile drawer,
   the branch finder filter and in-layout anchor scrolling. init returns a
   cleanup that aborts every listener and clears pending timers. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['palawan'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }
      var timeouts = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timeouts.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }

      /* mobile drawer */
      var burger = $('[data-pl-burger]');
      var drawer = $('[data-pl-drawer]');
      on(burger, 'click', function () {
        if (!drawer) return;
        var open = drawer.hasAttribute('hidden');
        if (open) drawer.removeAttribute('hidden'); else drawer.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', String(open));
      });

      /* branch finder filter */
      var input = $('#plBranchInput');
      var list = $('.pl-branch-list');
      if (input && list) {
        var items = Array.prototype.slice.call(list.querySelectorAll('li'));
        var empty = document.createElement('p');
        empty.className = 'pl-branch-empty';
        empty.hidden = true;
        empty.textContent = 'No branches match yet — try another city or code.';
        list.insertAdjacentElement('afterend', empty);

        on(input, 'input', function () {
          var q = input.value.trim().toLowerCase();
          var shown = 0;
          items.forEach(function (li) {
            var match = !q || li.textContent.toLowerCase().indexOf(q) >= 0;
            li.hidden = !match;
            if (match) shown++;
          });
          empty.hidden = shown > 0;
        });
      }

      /* in-layout anchor scrolling */
      Array.prototype.forEach.call(root.querySelectorAll('a[href^="#"]'), function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          if (drawer && !drawer.hasAttribute('hidden')) {
            drawer.setAttribute('hidden', '');
            if (burger) burger.setAttribute('aria-expanded', 'false');
          }
          try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
        });
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        timeouts.forEach(function (id) { clearTimeout(id); });
      };
    }
  };
})();
