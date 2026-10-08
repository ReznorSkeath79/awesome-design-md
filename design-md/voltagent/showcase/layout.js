/* ══ VOLTAGENT — behaviour for showcase.html ═══════════════════════════════
   Registers window.OWN_LAYOUTS['voltagent'].init(root). Wires the mobile
   drawer, install-command copy, animated monospace counters and in-layout
   anchor scrolling. init returns a cleanup that aborts every listener and
   cancels pending rAF/timeouts. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['voltagent'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }
      var rafs = [], timeouts = [], disposed = false;

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timeouts.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }

      /* mobile drawer */
      var burger = $('[data-vg-burger]');
      var drawer = $('[data-vg-drawer]');
      on(burger, 'click', function () {
        if (!drawer) return;
        var open = drawer.hasAttribute('hidden');
        if (open) drawer.removeAttribute('hidden'); else drawer.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', String(open));
      });

      /* copy install command */
      on($('[data-vg-copy]'), 'click', function (e) {
        var btn = e.currentTarget;
        var text = btn.getAttribute('data-vg-copy');
        var label = btn.querySelector('[data-vg-copy-label]');
        function done() {
          if (!label) return;
          var old = label.textContent;
          label.textContent = 'Copied';
          later(function () { if (label) label.textContent = old; }, 1600);
        }
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, function () { /* ignore */ });
          } else { done(); }
        } catch (err) { done(); }
      });

      /* animated counters */
      function countTo(el) {
        var to = Number(el.getAttribute('data-vg-count'));
        var dec = Number(el.getAttribute('data-vg-dec') || 0);
        var suffix = el.getAttribute('data-vg-suffix') || '';
        function fmt(v) { return v.toFixed(dec) + suffix; }
        if (reduced || !isFinite(to)) { el.textContent = fmt(isFinite(to) ? to : 0); return; }
        var t0 = performance.now(), dur = 1100;
        function step(t) {
          if (disposed) return;
          var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
          el.textContent = fmt(to * e);
          if (k < 1) raf(step); else el.textContent = fmt(to);
        }
        raf(step);
      }

      var counted = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { countTo(en.target); io.unobserve(en.target); }
          });
        }, { threshold: 0.4 });
        Array.prototype.forEach.call(root.querySelectorAll('[data-vg-count]'), function (el) { io.observe(el); });
        counted = io;
      } else {
        Array.prototype.forEach.call(root.querySelectorAll('[data-vg-count]'), function (el) {
          var to = Number(el.getAttribute('data-vg-count'));
          var dec = Number(el.getAttribute('data-vg-dec') || 0);
          var suffix = el.getAttribute('data-vg-suffix') || '';
          el.textContent = (isFinite(to) ? to : 0).toFixed(dec) + suffix;
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
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        timeouts.forEach(function (id) { clearTimeout(id); });
        if (counted) { try { counted.disconnect(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
