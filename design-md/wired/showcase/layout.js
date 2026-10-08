/* ══ WIRED — own layout behaviour for showcase.html ════════════════════════
   Registers window.OWN_LAYOUTS['wired'].init(root). Opens/closes the mobile
   section menu and runs the newsletter form's local, offline validation.
   init returns a cleanup that detaches every listener. Query only in `root`. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['wired'] = {
    init: function (root) {
      var cleanups = [];

      function on(el, ev, fn) { el.addEventListener(ev, fn); cleanups.push(function () { el.removeEventListener(ev, fn); }); }

      var burger = root.querySelector('[data-wr-menu]');
      var nav = root.querySelector('.wr-mast-nav');
      if (burger && nav) {
        on(burger, 'click', function () {
          var open = nav.classList.toggle('wr-open');
          burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      }

      var form = root.querySelector('[data-wr-form]');
      var note = root.querySelector('[data-wr-note]');
      if (form && note) {
        on(form, 'submit', function (e) {
          e.preventDefault();
          var input = form.querySelector('input[type="email"]');
          var val = input ? input.value.trim() : '';
          if (!val) { note.textContent = 'Enter an email address to subscribe.'; return; }
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) { note.textContent = 'That doesn\u2019t look like a valid email.'; return; }
          note.textContent = 'Subscribed. Check your inbox to confirm.';
          form.reset();
        });
      }

      return function cleanup() {
        cleanups.forEach(function (fn) { try { fn(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
