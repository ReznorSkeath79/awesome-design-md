/* ══ NORTHWIND — in Cursor's design language, for showcase.html ══════════════
   Registers window.OWN_LAYOUTS['cursor'].init(root). Renders the AI-timeline
   steps (pastel pills) and the feature grid, wires the SQL copy button, and
   returns a cleanup that detaches every listener and clears pending timeouts. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  /* stage, label class, copy, elapsed */
  var STEPS = [
    { cls: 'cu-step-think', label: 'Thinking', text: 'Reading the request and planning the reconciliation.', t: '0.0s', pct: 12 },
    { cls: 'cu-step-grep', label: 'Grepping', text: 'Searching the ops model for week 41 line shifts.', t: '0.3s', pct: 34 },
    { cls: 'cu-step-read', label: 'Reading', text: 'Loading shift rows for all 14 lines.', t: '0.6s', pct: 58 },
    { cls: 'cu-step-edit', label: 'Editing', text: 'Writing the flagged-lines table and digest draft.', t: '1.1s', pct: 84 },
    { cls: 'cu-step-done', label: 'Done', text: 'Reconciled in 1.8s — 3 anomalies flagged.', t: '1.8s', pct: 100 }
  ];
  var FEATURES = [
    { ico: '<path d="M4 7h16M4 12h16M4 17h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>', h: 'Governed ops model', p: 'SQL and the agent read the same definitions. No team-specific drift.' },
    { ico: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>', h: 'Replayable agent runs', p: 'Every step is named and time-stamped. Rerun it and get the same answer.' },
    { ico: '<path d="M5 12l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>', h: 'Digests that land', p: 'The night shift gets the reconciled board on their own clock.' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  OWN['cursor'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var timeouts = [];
      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timeouts.push(id); return id; }
      function $(s) { return root.querySelector(s); }

      var steps = $('#cuSteps');
      if (steps) {
        steps.innerHTML = STEPS.map(function (s) {
          return '<li class="cu-step">'
            + '<span class="cu-step-pill ' + s.cls + '">' + esc(s.label) + '</span>'
            + '<p>' + esc(s.text) + '</p>'
            + '<div class="cu-step-bar"><span style="width:' + s.pct + '%"></span></div>'
            + '<time>' + esc(s.t) + '</time>'
            + '</li>';
        }).join('');
      }

      var grid = $('#cuFeatureGrid');
      if (grid) {
        grid.innerHTML = FEATURES.map(function (f) {
          return '<article class="cu-feature">'
            + '<span class="cu-feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24">' + f.ico + '</svg></span>'
            + '<h3>' + esc(f.h) + '</h3>'
            + '<p>' + esc(f.p) + '</p>'
            + '</article>';
        }).join('');
      }

      var copy = $('#cuCopy');
      on(copy, 'click', function () {
        var code = $('#cuCode');
        var text = code ? code.textContent : '';
        function done() { if (copy) { copy.textContent = 'Copied'; later(function () { if (copy) copy.textContent = 'Copy'; }, 1400); } }
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, done); }
          else { done(); }
        } catch (e) { done(); }
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        timeouts.forEach(function (id) { clearTimeout(id); });
      };
    }
  };
})();
