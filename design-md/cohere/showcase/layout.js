/* ══ NORTHWIND — in Cohere's design language, for showcase.html ═════════════
   Registers window.OWN_LAYOUTS['cohere'].init(root). Renders the research table
   and topic chips, wires the announcement dismiss and the newsletter note, and
   returns a cleanup that detaches every listener. Motion is limited to what the
   design language calls for (none beyond focus/hover), so this is mostly static. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var NOTES = [
    { title: 'Reconciling 14 production lines without a nightly batch', topic: 'Engineering', date: 'Oct 2026' },
    { title: 'Why operations teams should own their metric definitions', topic: 'Governance', date: 'Sep 2026' },
    { title: 'Anomaly scouts: catching the drift before the shift does', topic: 'Research', date: 'Sep 2026' },
    { title: 'A semantic layer that operators actually read', topic: 'Product', date: 'Aug 2026' },
    { title: 'Lineage as a trust signal in regulated manufacturing', topic: 'Governance', date: 'Aug 2026' }
  ];
  var TOPICS = ['All', 'Engineering', 'Governance', 'Research', 'Product'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  OWN['cohere'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function $(s) { return root.querySelector(s); }

      /* ── announcement dismiss ──────────────────────────────────────────── */
      var announce = $('#coAnnounce');
      on($('#coAnnounceX'), 'click', function () { if (announce) announce.setAttribute('hidden', ''); });

      /* ── research table + topic chips ───────────────────────────────────── */
      var table = $('#coTable');
      var chips = $('#coChips');
      var active = 'All';

      function rowHTML(n) {
        return '<li class="co-row">'
          + '<span class="co-row-title"><a href="#">' + esc(n.title) + '</a></span>'
          + '<span class="co-row-topic">' + esc(n.topic) + '</span>'
          + '<span class="co-row-date">' + esc(n.date) + '</span>'
          + '</li>';
      }
      function render() {
        if (!table) return;
        var list = NOTES.filter(function (n) { return active === 'All' || n.topic === active; });
        table.innerHTML = list.length ? list.map(rowHTML).join('')
          : '<li class="co-row"><span class="co-row-title">No notes in this topic yet.</span></li>';
      }
      if (chips) {
        chips.innerHTML = TOPICS.map(function (t) {
          return '<button type="button" role="button" class="co-chip-topic" data-topic="' + esc(t) + '" aria-pressed="' + (t === active) + '">' + esc(t) + '</button>';
        }).join('');
      }
      on(chips, 'click', function (e) {
        var b = e.target.closest('[data-topic]');
        if (!b) return;
        active = b.dataset.topic;
        Array.prototype.forEach.call(chips.children, function (c) {
          c.setAttribute('aria-pressed', String(c.dataset.topic === active));
        });
        render();
      });
      render();

      /* ── newsletter (sample form) ───────────────────────────────────────── */
      var news = $('#coNews');
      var note = $('#coNewsNote');
      on(news, 'submit', function (e) {
        e.preventDefault();
        if (note) note.textContent = 'Thanks — this is sample data, nothing was sent.';
      });

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
      };
    }
  };
})();
