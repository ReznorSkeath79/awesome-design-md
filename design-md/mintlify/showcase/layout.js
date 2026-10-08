/* ══ NORTHWIND — Mintlify own-layout behaviour ═════════════════════════════
   Registers window.OWN_LAYOUTS['mintlify'].init(root). Handles the pricing
   monthly/annual toggle, the copy-code button and the mobile menu. Returns a
   cleanup removing every listener and timer. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['mintlify'] = {
    init: function (root) {
      var billBtns = Array.prototype.slice.call(root.querySelectorAll('[data-ml-bill]'));
      var prices = Array.prototype.slice.call(root.querySelectorAll('[data-ml-price]'));
      var copy = root.querySelector('[data-ml-copy]');
      var code = root.querySelector('.ml-code-body');
      var menu = root.querySelector('[data-ml-menu]');
      var links = root.querySelector('.ml-nav-links');
      var timers = [];

      function onBill(e) {
        var mode = e.currentTarget.getAttribute('data-ml-bill');
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
      function onCopy() {
        if (!copy || !code) return;
        try { navigator.clipboard && navigator.clipboard.writeText(code.textContent); } catch (err) { /* ignore */ }
        var prev = copy.textContent;
        copy.textContent = 'Copied';
        timers.push(setTimeout(function () { if (copy) copy.textContent = prev; }, 1400));
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
        links.style.borderRadius = '12px';
        links.style.boxShadow = 'rgba(0,0,0,.08) 0px 4px 12px 0px';
        links.style.zIndex = '40';
      }

      billBtns.forEach(function (b) { b.addEventListener('click', onBill); });
      if (copy) copy.addEventListener('click', onCopy);
      if (menu) menu.addEventListener('click', onMenu);

      return function cleanup() {
        billBtns.forEach(function (b) { b.removeEventListener('click', onBill); });
        if (copy) copy.removeEventListener('click', onCopy);
        if (menu) menu.removeEventListener('click', onMenu);
        timers.forEach(clearTimeout);
        if (links) { links.removeAttribute('style'); links.removeAttribute('data-open'); }
      };
    }
  };
})();
