/* ══ TESLA — behaviour for showcase.html ════════════════════════════════════
   Registers window.OWN_LAYOUTS['tesla'].init(root). Tesla's interactions are
   colour-only (no scale/translate), so the script stays minimal: the hero
   carousel dots cycle on a slow interval and the "Ask a Question" bar submits
   to nothing (sample). The interval and listeners are cleared in cleanup. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  OWN['tesla'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var timer = null;

      var dots = root.querySelectorAll('.ts-dot');
      var active = 0;

      function paint() {
        dots.forEach(function (d, i) { d.classList.toggle('on', i === active); });
      }

      if (!reduced && dots.length > 1) {
        timer = setInterval(function () {
          active = (active + 1) % dots.length;
          paint();
        }, 3800);
      }

      var input = root.querySelector('.ts-ask-input');
      var send = root.querySelector('.ts-ask-send');
      function submit() {
        if (!input) return;
        input.value = '';
        input.placeholder = 'Thanks — a specialist will follow up.';
      }
      if (send) send.addEventListener('click', submit, signal ? { signal: signal } : undefined);
      if (input) input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); submit(); }
      }, signal ? { signal: signal } : undefined);

      return function cleanup() {
        if (timer) clearInterval(timer);
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
