/* ══ NORTHWIND — Miro own-layout behaviour ═════════════════════════════════
   Registers window.OWN_LAYOUTS['miro'].init(root). Keeps the pricing toggle and
   the mobile menu interactive. Returns a cleanup removing every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['miro'] = {
    init: function (root) {
      var billBtns = Array.prototype.slice.call(root.querySelectorAll('[data-mi-bill]'));
      var prices = Array.prototype.slice.call(root.querySelectorAll('[data-mi-price]'));
      var menu = root.querySelector('[data-mi-menu]');
      var links = root.querySelector('.mi-nav-links');

      function onBill(e) {
        var mode = e.currentTarget.getAttribute('data-mi-bill');
        billBtns.forEach(function (b) {
          var on = b === e.currentTarget;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        prices.forEach(function (p) {
          var v = p.getAttribute('data-' + mode);
          if (v) p.textContent = v;
        });
      }
      function onMenu() {
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
        links.style.borderRadius = '14px';
        links.style.boxShadow = 'rgba(5,0,56,.12) 0px 12px 32px -8px';
        links.style.zIndex = '40';
      }

      billBtns.forEach(function (b) { b.addEventListener('click', onBill); });
      if (menu) menu.addEventListener('click', onMenu);

      return function cleanup() {
        billBtns.forEach(function (b) { b.removeEventListener('click', onBill); });
        if (menu) menu.removeEventListener('click', onMenu);
        if (links) { links.removeAttribute('style'); links.removeAttribute('data-open'); }
      };
    }
  };
})();
