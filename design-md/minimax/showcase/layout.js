/* ══ NORTHWIND — MiniMax own-layout behaviour ══════════════════════════════
   Registers window.OWN_LAYOUTS['minimax'].init(root). Handles the pricing tab
   pills, the copy-code button and the mobile menu toggle. Returns a cleanup
   that removes every listener and timer. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['minimax'] = {
    init: function (root) {
      var pills = Array.prototype.slice.call(root.querySelectorAll('[data-mm-tab]'));
      var copy = root.querySelector('.mm-copy');
      var code = root.querySelector('.mm-code-body');
      var burger = root.querySelector('[data-mm-menu]');
      var links = root.querySelector('.mm-nav-links');
      var timers = [];

      function onPill(e) {
        pills.forEach(function (p) {
          var on = p === e.currentTarget;
          p.classList.toggle('is-active', on);
          p.setAttribute('aria-selected', on ? 'true' : 'false');
        });
      }
      function onCopy() {
        if (!copy || !code) return;
        try { navigator.clipboard && navigator.clipboard.writeText(code.textContent); } catch (err) { /* ignore */ }
        var prev = copy.textContent;
        copy.textContent = 'Copied';
        timers.push(setTimeout(function () { if (copy) copy.textContent = prev; }, 1400));
      }
      function onBurger() {
        if (!links) return;
        var open = links.getAttribute('data-open') === '1';
        links.setAttribute('data-open', open ? '0' : '1');
        links.style.display = open ? '' : 'grid';
        links.style.position = 'absolute';
        links.style.top = '64px';
        links.style.left = '12px';
        links.style.right = '12px';
        links.style.margin = '0';
        links.style.padding = '14px';
        links.style.gap = '4px';
        links.style.background = '#fff';
        links.style.border = '1px solid var(--hairline)';
        links.style.borderRadius = '12px';
        links.style.boxShadow = 'rgba(0,0,0,.08) 0px 4px 6px 0px';
        links.style.zIndex = '40';
      }

      pills.forEach(function (p) { p.addEventListener('click', onPill); });
      if (copy) copy.addEventListener('click', onCopy);
      if (burger) burger.addEventListener('click', onBurger);

      return function cleanup() {
        pills.forEach(function (p) { p.removeEventListener('click', onPill); });
        if (copy) copy.removeEventListener('click', onCopy);
        if (burger) burger.removeEventListener('click', onBurger);
        timers.forEach(clearTimeout);
        if (links) { links.removeAttribute('style'); links.removeAttribute('data-open'); }
      };
    }
  };
})();
