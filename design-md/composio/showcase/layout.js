/* ══ NORTHWIND — in Composio's design language, for showcase.html ════════════
   Registers window.OWN_LAYOUTS['composio'].init(root). Renders the toolkit grid
   from sample data and wires the code-block copy button. Returns a cleanup that
   detaches every listener and clears any pending timeout. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var TOOLKITS = [
    { ico: 'DV', name: 'Dataverse', tag: 'CRM', desc: 'Query and upsert records on any table.' },
    { ico: 'SF', name: 'Snowflake', tag: 'Warehouse', desc: 'Run governed SQL against the ops warehouse.' },
    { ico: 'SAP', name: 'SAP', tag: 'ERP', desc: 'Read orders, stock, and production confirmations.' },
    { ico: 'GH', name: 'GitHub', tag: 'Devtools', desc: 'Open issues and attach the reconciliation trace.' },
    { ico: 'SL', name: 'Slack', tag: 'Messaging', desc: 'Post the shift digest where the floor already is.' },
    { ico: 'NW', name: 'Northwind', tag: 'Internal', desc: 'Call the reconciliation engine directly.' },
    { ico: 'PG', name: 'Postgres', tag: 'Database', desc: 'Stream rows from operational stores.' },
    { ico: 'S3', name: 'Object store', tag: 'Storage', desc: 'Read and write export bundles.' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  OWN['composio'] = {
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

      var grid = $('#cpToolkitGrid');
      if (grid) {
        grid.innerHTML = TOOLKITS.map(function (t) {
          return '<article class="cp-toolkit">'
            + '<span class="cp-toolkit-ico" aria-hidden="true">' + esc(t.ico) + '</span>'
            + '<span class="cp-toolkit-tag">' + esc(t.tag) + '</span>'
            + '<h3>' + esc(t.name) + '</h3>'
            + '<p>' + esc(t.desc) + '</p>'
            + '</article>';
        }).join('');
      }

      var copy = $('#cpCopy');
      on(copy, 'click', function () {
        var code = $('#cpCode');
        var text = code ? code.textContent : '';
        function done() { if (copy) { copy.textContent = 'Copied'; later(function () { if (copy) copy.textContent = 'Copy'; }, 1400); } }
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, done);
          } else { done(); }
        } catch (e) { done(); }
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        timeouts.forEach(function (id) { clearTimeout(id); });
      };
    }
  };
})();
