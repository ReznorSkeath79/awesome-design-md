/* ══ GRANULAR — own layout behaviour for showcase.html ═════════════════════
   window.OWN_LAYOUTS['granular'].init(root) renders the session list, chat
   thread and region cards from sample data, wires the tab pills and the
   composer, and animates the context meters. All queries stay inside `root`.
   Injected strings pass through esc(). init returns a cleanup that removes
   every listener, cancels every timer and frame, and disconnects observers so
   unmounting leaves nothing behind. Sample data — fictional only. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Fictional sessions: status is dot + word; active row uses accent wash. */
  var SESSIONS = [
    { id: 'sess-8841', title: 'Nightly rollup repair', status: 'running', key: '1', active: true },
    { id: 'sess-8836', title: 'EU latency regression', status: 'waiting', key: '2' },
    { id: 'sess-8829', title: 'Session ledger backfill', status: 'done', key: '3' },
    { id: 'sess-8822', title: 'APAC failover drill', status: 'failed', key: '4' },
    { id: 'sess-8810', title: 'Throughput target review', status: 'syncing', key: '5' },
    { id: 'sess-8802', title: 'Deploy window planner', status: 'idle', key: '6' }
  ];

  var STATUS = {
    running: { dot: 'ok', word: 'running' },
    waiting: { dot: 'warn', word: 'waiting' },
    done: { dot: 'ok', word: 'done' },
    failed: { dot: 'err', word: 'failed' },
    syncing: { dot: 'info', word: 'syncing' },
    idle: { dot: 'ok', word: 'idle' }
  };

  var THREAD = [
    { who: 'you', body: 'Pull yesterday\u2019s rollup for eu-west-1 and flag anything under target.' },
    { who: 'agent', body: 'Loaded the session ledger \u2014 18,204 rows. eu-west-1 held 94.2k sessions, <span class="gn-code">+6.1%</span> against a 4.2k/min target. ap-south-1 is 3.2% under; sa-east-1 regressed 8.9%.' },
    { who: 'agent', body: 'I staged a repair session for ap-south-1 and opened a ticket for the sa-east-1 failover drill. Want me to re-run the rollup once those land?' }
  ];

  var REGIONS = [
    { name: 'eu-west-1', value: 94.2, unit: 'k sessions', trend: '+6.1%', dir: 'up', status: 'on target' },
    { name: 'us-east-2', value: 71.8, unit: 'k sessions', trend: '+1.4%', dir: 'up', status: 'on target' },
    { name: 'ap-south-1', value: 48.3, unit: 'k sessions', trend: '-3.2%', dir: 'down', status: 'below target' },
    { name: 'sa-east-1', value: 22.6, unit: 'k sessions', trend: '-8.9%', dir: 'down', status: 'regressed' }
  ];

  OWN['granular'] = {
    init: function (root) {
      if (!root) return function () {};

      var disposed = false;
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var listeners = [];
      var observers = [];
      var timeouts = [];
      var frames = [];
      var seen = null;
      try { seen = new WeakSet(); } catch (e) { seen = null; }

      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
      function on(el, type, fn, opt) {
        if (!el) return;
        el.addEventListener(type, fn, opt || false);
        listeners.push([el, type, fn, opt || false]);
      }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timeouts.push(id); return id; }
      function raf(fn) { var id = requestAnimationFrame(fn); frames.push(id); return id; }

      /* ── session list ─────────────────────────────────────────────────── */
      function sessionHTML(s) {
        var st = STATUS[s.status] || STATUS.idle;
        return '<li>'
          + '<button type="button" class="gn-sess' + (s.active ? ' is-active' : '') + '" data-sess="' + esc(s.id) + '">'
          + '<span class="gn-dot gn-dot-' + st.dot + '" aria-hidden="true"></span>'
          + '<span class="gn-sess-title" title="' + esc(s.title) + '">' + esc(s.title) + '</span>'
          + '<kbd class="gn-kbd" aria-hidden="true">\u2318' + esc(s.key) + '</kbd>'
          + '<span class="gn-sr">' + esc(st.word) + '</span>'
          + '</button></li>';
      }
      var listEl = $('#gnSessionList');
      if (listEl) listEl.innerHTML = SESSIONS.map(sessionHTML).join('');

      /* ── chat thread ──────────────────────────────────────────────────── */
      function messageHTML(m) {
        var isAgent = m.who === 'agent';
        return '<li class="gn-msg is-' + (isAgent ? 'agent' : 'user') + '">'
          + '<span class="gn-msg-who">'
          + (isAgent
            ? '<span class="gn-dot gn-dot-ok" aria-hidden="true"></span>agent <span class="gn-mono-data">northwind-core</span>'
            : 'you <span class="gn-mono-data">' + '09:1' + (isAgent ? '4' : '2') + '</span>')
          + '</span>'
          + '<p class="gn-msg-body">' + m.body + '</p>'
          + '</li>';
      }
      var threadEl = $('#gnThread');
      if (threadEl) {
        threadEl.innerHTML = THREAD.map(messageHTML).join('');
        var typing = document.createElement('li');
        typing.className = 'gn-msg is-agent';
        typing.innerHTML = '<span class="gn-msg-who"><span class="gn-dot gn-dot-ok" aria-hidden="true"></span>agent <span class="gn-mono-data">northwind-core</span></span>'
          + '<span class="gn-typing" aria-label="agent is working"><i></i><i></i><i></i></span>';
        if (!reduced && seen) {
          threadEl.appendChild(typing);
          later(function () { if (!disposed && typing.parentNode) typing.parentNode.removeChild(typing); }, 1600);
        }
      }

      /* ── region cards ─────────────────────────────────────────────────── */
      function regionHTML(r) {
        var dot = r.dir === 'up' ? 'ok' : r.dir === 'down' ? 'err' : 'info';
        return '<article class="gn-card">'
          + '<div class="gn-card-head">'
          + '<span class="gn-card-region">' + esc(r.name) + '</span>'
          + '<span class="gn-state"><span class="gn-dot gn-dot-' + dot + '" aria-hidden="true"></span>' + esc(r.status) + '</span>'
          + '</div>'
          + '<span class="gn-card-value">' + esc(r.value) + '<small> ' + esc(r.unit) + '</small></span>'
          + '<div class="gn-card-foot">'
          + '<span class="gn-trend ' + esc(r.dir) + '">' + esc(r.trend) + ' vs target</span>'
          + '<span class="gn-mono-data">24h</span>'
          + '</div>'
          + '</article>';
      }
      var cardsEl = $('#gnRegionCards');
      if (cardsEl) cardsEl.innerHTML = REGIONS.map(regionHTML).join('');

      /* ── context meters ───────────────────────────────────────────────── */
      $$('.gn-meter-fill').forEach(function (el) {
        var pct = Math.max(0, Math.min(100, Number(el.getAttribute('data-fill')) || 0));
        if (reduced) { el.style.width = pct + '%'; return; }
        raf(function () { el.style.width = pct + '%'; });
      });

      /* ── tab pills (one active thing per region) ──────────────────────── */
      var tabs = $$('.gn-tab');
      var panes = $$('.gn-pane');
      function selectTab(tab) {
        if (!tab) return;
        var name = tab.getAttribute('data-tab');
        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
          t.tabIndex = active ? 0 : -1;
        });
        panes.forEach(function (p) {
          p.classList.toggle('is-hidden', p.getAttribute('data-pane') !== name);
        });
      }
      tabs.forEach(function (tab, i) {
        on(tab, 'click', function () { selectTab(tab); });
        on(tab, 'keydown', function (e) {
          var next = null;
          if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
          else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
          else if (e.key === 'Home') next = tabs[0];
          else if (e.key === 'End') next = tabs[tabs.length - 1];
          if (!next) return;
          e.preventDefault();
          selectTab(next);
          next.focus();
        });
      });

      /* ── session rows: switch active, mirror into the <900 picker ─────── */
      var activeSess = 'sess-8841';
      var pick = $('.gn-sess-pick');
      var pickTitle = $('.gn-sess-pick-title');
      on(listEl, 'click', function (e) {
        var btn = e.target.closest('.gn-sess');
        if (!btn || !listEl.contains(btn)) return;
        activeSess = btn.getAttribute('data-sess');
        $$('.gn-sess').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-sess') === activeSess);
        });
        var match = null;
        SESSIONS.forEach(function (s) { if (s.id === activeSess) match = s; });
        if (match) {
          if (pickTitle) pickTitle.textContent = match.title;
          var dot = pick && pick.querySelector('.gn-dot');
          var st = STATUS[match.status] || STATUS.idle;
          if (dot) dot.className = 'gn-dot gn-dot-' + st.dot;
        }
      });

      /* ── composer: enable Send when there is input ────────────────────── */
      var input = $('#gnInput');
      var send = $('#gnSend');
      function syncSend() {
        if (send) send.disabled = !input || input.value.trim().length === 0;
      }
      on(input, 'input', syncSend);
      on($('#gnComposer'), 'submit', function (e) {
        e.preventDefault();
        if (!input || !input.value.trim()) return;
        if (threadEl) {
          var li = document.createElement('li');
          li.className = 'gn-msg is-user';
          li.innerHTML = '<span class="gn-msg-who">you <span class="gn-mono-data">now</span></span>'
            + '<p class="gn-msg-body">' + esc(input.value.trim()) + '</p>';
          threadEl.appendChild(li);
          threadEl.scrollTop = threadEl.scrollHeight;
        }
        input.value = '';
        syncSend();
      });

      /* ── smooth in-layout anchors (no global history writes) ──────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        });
      });

      /* ── boot counts / meter re-measure ───────────────────────────────── */
      if ('ResizeObserver' in window) {
        var ro = new ResizeObserver(function () {
          if (disposed) return;
          $$('.gn-meter-fill').forEach(function (el) {
            var pct = Math.max(0, Math.min(100, Number(el.getAttribute('data-fill')) || 0));
            el.style.width = pct + '%';
          });
        });
        ro.observe(root);
        observers.push(ro);
      }

      return function cleanup() {
        disposed = true;
        listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
        listeners.length = 0;
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
        observers.length = 0;
        timeouts.forEach(function (id) { clearTimeout(id); });
        timeouts.length = 0;
        frames.forEach(function (id) { cancelAnimationFrame(id); });
        frames.length = 0;
      };
    }
  };
})();
