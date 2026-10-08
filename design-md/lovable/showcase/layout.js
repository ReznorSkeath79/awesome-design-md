/* ══ NORTHWIND — Lovable own-layout behaviour ══════════════════════════════
   Registers window.OWN_LAYOUTS['lovable'].init(root). The only dynamic bit is
   the prompt composer: suggestion pills fill the textarea and the textarea
   auto-grows. Returns a cleanup that removes every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['lovable'] = {
    init: function (root) {
      var ta = root.querySelector('#lvPrompt');
      var chat = root.querySelector('[data-chat]');
      var suggestions = Array.prototype.slice.call(root.querySelectorAll('[data-suggest]'));
      var menu = root.querySelector('[data-menu]');
      var nav = root.querySelector('.lv-links');

      function grow() {
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = Math.min(140, ta.scrollHeight) + 'px';
      }
      function onSuggest(e) {
        if (!ta) return;
        ta.value = e.currentTarget.textContent.trim();
        grow();
        ta.focus();
      }
      function onSubmit(e) {
        e.preventDefault();
        if (ta) grow();
      }
      function onMenu() {
        if (!nav) return;
        var open = nav.getAttribute('data-open') === '1';
        nav.setAttribute('data-open', open ? '0' : '1');
        nav.style.display = open ? '' : 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '64px';
        nav.style.left = '12px';
        nav.style.right = '12px';
        nav.style.margin = '0';
        nav.style.flexDirection = 'column';
        nav.style.alignItems = 'flex-start';
        nav.style.gap = '4px';
        nav.style.padding = '12px';
        nav.style.background = 'var(--cream)';
        nav.style.border = '1px solid var(--border)';
        nav.style.borderRadius = '12px';
        nav.style.zIndex = '40';
      }

      if (ta) ta.addEventListener('input', grow);
      suggestions.forEach(function (b) { b.addEventListener('click', onSuggest); });
      if (chat) chat.addEventListener('submit', onSubmit);
      if (menu) menu.addEventListener('click', onMenu);
      grow();

      return function cleanup() {
        if (ta) ta.removeEventListener('input', grow);
        suggestions.forEach(function (b) { b.removeEventListener('click', onSuggest); });
        if (chat) chat.removeEventListener('submit', onSubmit);
        if (menu) menu.removeEventListener('click', onMenu);
        if (nav) { nav.removeAttribute('style'); nav.removeAttribute('data-open'); }
        if (ta) ta.style.height = '';
      };
    }
  };
})();
