/* ══ NORTHWIND — Meta own-layout behaviour ═════════════════════════════════
   Registers window.OWN_LAYOUTS['meta'].init(root). Keeps the PDP interactive:
   gallery thumbnails, plan radios and the cart button update a small summary.
   Returns a cleanup removing every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['meta'] = {
    init: function (root) {
      var thumbs = Array.prototype.slice.call(root.querySelectorAll('.mt-thumb'));
      var radios = Array.prototype.slice.call(root.querySelectorAll('input[name="mtPlan"]'));
      var swatches = Array.prototype.slice.call(root.querySelectorAll('.mt-swatch'));
      var cart = root.querySelector('[data-cart]');
      var priceEl = root.querySelector('.mt-price');

      function onThumb(e) {
        thumbs.forEach(function (t) { t.classList.toggle('is-active', t === e.currentTarget); });
      }
      function onSwatch(e) {
        swatches.forEach(function (s) { s.classList.toggle('is-on', s === e.currentTarget); });
      }
      function onRadio() {
        var checked = radios.filter(function (r) { return r.checked; })[0];
        var price = checked && checked.getAttribute('data-price');
        if (!price || !priceEl) return;
        priceEl.textContent = '';
        var amt = document.createElement('b');
        amt.textContent = price;
        var sfx = document.createElement('span');
        sfx.textContent = ' /mo per site';
        priceEl.appendChild(amt);
        priceEl.appendChild(sfx);
      }
      function onCart() {
        if (!cart) return;
        var prev = cart.textContent;
        cart.textContent = 'Added \u2713';
        setTimeout(function () { if (cart) cart.textContent = prev; }, 1400);
      }

      thumbs.forEach(function (t) { t.addEventListener('click', onThumb); });
      swatches.forEach(function (s) { s.addEventListener('click', onSwatch); });
      radios.forEach(function (r) { r.addEventListener('change', onRadio); });
      if (cart) cart.addEventListener('click', onCart);

      return function cleanup() {
        thumbs.forEach(function (t) { t.removeEventListener('click', onThumb); });
        swatches.forEach(function (s) { s.removeEventListener('click', onSwatch); });
        radios.forEach(function (r) { r.removeEventListener('change', onRadio); });
        if (cart) cart.removeEventListener('click', onCart);
      };
    }
  };
})();
