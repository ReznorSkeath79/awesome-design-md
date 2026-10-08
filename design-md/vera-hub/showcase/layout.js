/* ══ VERA HUB — the AutoAlchemy Hub shell + Dashboard, ported for showcase ══
   Registers window.OWN_LAYOUTS['vera-hub'].init(root). Renders the left rail
   (grouped sections, sliding active marker, collapse), the Dashboard hero
   (header core ring gauges, KPI well, fact ticker), Your focus, Needs you,
   Your projects and the Recent activity table. Every number shown is computed
   from the sample data below. init returns a cleanup that removes every
   listener, observer, rAF and timer it created. Corp Dark only. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  /* ── inline SVG marks (Vera defaults: 18px, 1.75 stroke, round caps) ─────── */
  function svg(paths) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + paths + '</svg>';
  }
  var ICON = {
    home: svg('<path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9 21v-6h6v6"></path>'),
    projects: svg('<path d="M4 20V5a1 1 0 0 1 1-1h6l2 2h6a1 1 0 0 1 1 1v13z"></path>'),
    requests: svg('<path d="M4 4l16 8-16 8 3-8z"></path>'),
    review: svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"></path><circle cx="12" cy="12" r="3"></circle>'),
    inbox: svg('<path d="M3 12h5l1.5 2.5h5L16 12h5"></path><path d="M3 12 5 5h14l2 7v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path>'),
    signals: svg('<path d="M4 18V9"></path><path d="M9 18V5"></path><path d="M14 18v-6"></path><path d="M19 18v-9"></path>'),
    briefcase: svg('<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>'),
    flag: svg('<path d="M5 21V4"></path><path d="M5 4h11l-2 4 2 4H5z"></path>'),
    star: svg('<path d="M12 3.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8L12 16.8 6.7 19.5l1.1-5.8L3.5 9.6l5.9-.7z"></path>'),
    library: svg('<rect x="3" y="4" width="5" height="16" rx="1"></rect><rect x="10" y="4" width="5" height="16" rx="1"></rect><path d="m17 5 3 15"></path>'),
    brain: svg('<path d="M12 5a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 0 3 3 0 0 0 2-5 3 3 0 0 0-2-5 3 3 0 0 0-3-3z"></path>'),
    feedback: svg('<path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12z"></path>'),
    chevron: svg('<path d="m6 9 6 6 6-6"></path>'),
    arrowRight: svg('<path d="M5 12h14M13 6l6 6-6 6"></path>'),
    check: svg('<circle cx="12" cy="12" r="9"></circle><path d="m8 12 3 3 5-6"></path>'),
    todo: svg('<circle cx="12" cy="12" r="8"></circle>'),
    doing: svg('<circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path>'),
    blocked: svg('<circle cx="12" cy="12" r="8"></circle><path d="m8.5 8.5 7 7m0-7-7 7"></path>')
  };
  var STATUS_ICON = { todo: ICON.todo, doing: ICON.doing, blocked: ICON.blocked, review: ICON.doing };

  /* ── sample Hub data — fictional people, projects, tasks only ───────────── */
  var USER = { name: 'Mika Navarro', first: 'Mika' };

  var KPIS = [
    { label: 'Open tasks', value: 9, sub: 'assigned to you', ratio: 1 },
    { label: 'Unread', value: 3, sub: 'in your inbox', ratio: 3 / 9 },
    { label: 'Active projects', value: 5, sub: 'you are on', ratio: 5 / 9 },
    { label: 'Needs review', value: 2, sub: 'waiting on you', ratio: 2 / 9 }
  ];

  var FOCUS = [
    { group: 'Overdue', over: true, rows: [
      { title: 'Wire the Dataverse rollup for Q4 metrics', key: 'OPS-118', status: 'blocked', due: '2d ago', tone: 'over' },
      { title: 'Fix the security model on the intake app', key: 'OPS-121', status: 'doing', due: '1d ago', tone: 'over' }
    ] },
    { group: 'This week', rows: [
      { title: 'Draft the operations dashboard copy', key: 'OPS-126', status: 'doing', due: 'Thu', tone: 'week' },
      { title: 'Review the throughput pipeline spec', key: 'OPS-127', status: 'review', due: 'Fri', tone: '' }
    ] },
    { group: 'Later', rows: [
      { title: 'Consolidate the region refresh job', key: 'OPS-130', status: 'todo', due: 'Oct 21', tone: '' },
      { title: 'Write the weekly ops digest template', key: 'OPS-133', status: 'todo', due: 'Oct 24', tone: '' }
    ] }
  ];

  var NEEDS = [
    { title: 'Triage the new intake request', meta: 'Needs triage · waiting 2d', icon: ICON.requests },
    { title: '4 approval requests', meta: 'OPS-118, OPS-121 +2', icon: ICON.review },
    { title: '2 review assignments', meta: 'throughput spec, rollup sheet', icon: ICON.briefcase }
  ];

  var PROJECTS = [
    { code: 'OPS-104', name: 'Operations dashboard', pct: 72, milestone: 'Phase: Region rollup · Oct 20', status: 'active', label: 'Active' },
    { code: 'OPS-109', name: 'Throughput pipeline', pct: 45, milestone: 'Milestone: Data model signed off', status: 'active', label: 'Active' },
    { code: 'OPS-112', name: 'Intake automation', pct: 88, milestone: 'Milestone: Pilot on 2 regions', status: 'review', label: 'In review' },
    { code: 'OPS-099', name: 'Region refresh jobs', pct: 100, milestone: 'Milestone: Shipped to prod', status: 'done', label: 'Done' },
    { code: 'OPS-116', name: 'Ops digest', pct: 30, milestone: 'No next milestone or phase', status: 'active', label: 'Active' },
    { code: 'OPS-120', name: 'Forecast model v2', pct: 12, milestone: 'Phase: Scoping · Oct 28', status: 'active', label: 'Active' }
  ];

  var ACTIVITY = [
    { who: 'Mika Navarro', verb: 'closed', n: 3, noun: 'tasks', code: 'OPS-104' },
    { who: 'Rhea Santos', verb: 'commented on', n: 2, noun: 'items', code: 'OPS-109' },
    { who: 'Dane Ocampo', verb: 'shipped', n: 1, noun: 'milestone', code: 'OPS-112' },
    { who: 'Tess Villanueva', verb: 'opened', n: 4, noun: 'tasks', code: 'OPS-116' },
    { who: 'Paolo Reyes', verb: 'attached', n: 1, noun: 'file', code: 'OPS-104' },
    { who: 'Jo Alcantara', verb: 'moved', n: 5, noun: 'tasks', code: 'OPS-109' },
    { who: 'Liza Mercado', verb: 'approved', n: 2, noun: 'requests', code: 'OPS-112' },
    { who: 'Ben Castillo', verb: 'created', n: 1, noun: 'project', code: 'OPS-120' }
  ];

  var RAIL_GROUPS = [
    { id: 'pinned', label: 'Pinned projects', items: [
      { label: 'Operations dashboard', icon: ICON.projects, code: 'OPS-104', active: true },
      { label: 'Throughput pipeline', icon: ICON.projects, code: 'OPS-109' }
    ] },
    { id: 'recent', label: 'Recent', items: [
      { label: 'Intake automation', icon: ICON.projects, code: 'OPS-112' },
      { label: 'Region refresh jobs', icon: ICON.projects, code: 'OPS-099' },
      { label: 'Ops digest', icon: ICON.projects, code: 'OPS-116' }
    ] },
    { id: 'places', label: 'Places', items: [
      { label: 'Inbox', icon: ICON.inbox, count: '3' },
      { label: 'Signals', icon: ICON.signals },
      { label: 'Review queue', icon: ICON.review, count: '2' }
    ] }
  ];

  var PRIMARY = [
    { label: 'Home', icon: ICON.home, active: true },
    { label: 'Projects', icon: ICON.projects },
    { label: 'Requests', icon: ICON.requests },
    { label: 'Review', icon: ICON.review }
  ];

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function manilaClock(d) {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d);
    var hh = (parts.find(function (p) { return p.type === 'hour'; }) || {}).value || '00';
    var mm = (parts.find(function (p) { return p.type === 'minute'; }) || {}).value || '00';
    return hh + ':' + mm + ' PHT';
  }
  function greeting(d) {
    var h = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Manila', hour: '2-digit', hour12: false }).format(d));
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }
  function manilaDate(d) {
    var parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d);
    var y = (parts.find(function (p) { return p.type === 'year'; }) || {}).value || '';
    var m = (parts.find(function (p) { return p.type === 'month'; }) || {}).value || '';
    var dd = (parts.find(function (p) { return p.type === 'day'; }) || {}).value || '';
    return y + '-' + m + '-' + dd + ' · Manila';
  }
  function ringGauge(value, size, stroke) {
    var r = (size - stroke) / 2;
    var c = 2 * Math.PI * r;
    var off = c * (1 - Math.max(0, Math.min(100, value)) / 100);
    var cx = size / 2;
    return '<div class="vh-rg" style="--circ:' + c.toFixed(2) + ';--off:' + off.toFixed(2) + '">'
      + '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true">'
      + '<defs><linearGradient id="vhg' + size + '" x1="0" y1="0" x2="1" y2="1">'
      + '<stop offset="0" stop-color="#7fd4ff"></stop><stop offset=".45" stop-color="#6cdcff"></stop><stop offset="1" stop-color="#aaa6ff"></stop>'
      + '</linearGradient></defs>'
      + '<circle class="vh-rg-track" cx="' + cx + '" cy="' + cx + '" r="' + r + '" stroke-width="' + stroke + '" fill="none"></circle>'
      + '<circle class="vh-rg-prog" cx="' + cx + '" cy="' + cx + '" r="' + r + '" stroke-width="' + stroke + '" fill="none" stroke="url(#vhg' + size + ')" transform="rotate(-90 ' + cx + ' ' + cx + ')"></circle>'
      + '</svg></div>';
  }

  OWN['vera-hub'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var rafs = [];
      var timeouts = [];
      var observers = [];
      var intervals = [];
      var seen = null;
      try { seen = new WeakSet(); } catch (e) { seen = null; }

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timeouts.push(id); return id; }
      function every(fn, ms) { var id = window.setInterval(fn, ms); intervals.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      var shell = $('#vhShell');
      var rail = $('#vhRail');
      var railScroll = root.querySelector('.vh-rail-scroll');
      var marker = $('#vhMarker');

      /* ── primary nav (already in HTML; ensure the Learn caret is decorative) */
      void PRIMARY;

      /* ── greeting / date / live clock ────────────────────────────────────── */
      var now = new Date();
      var greetEl = $('#vhGreeting');
      if (greetEl) greetEl.innerHTML = esc(greeting(now)) + ', <span class="vh-grad">' + esc(USER.first) + '</span>';
      var dateEl = root.querySelector('.vh-hero-date');
      var clockEl = $('#vhClock');
      if (dateEl && clockEl) {
        dateEl.childNodes[0].nodeValue = manilaDate(now) + ' ';
      }
      function tickClock() { if (clockEl) clockEl.childNodes[clockEl.childNodes.length - 1].nodeValue = manilaClock(new Date()); }
      tickClock();
      every(tickClock, 30000);

      /* ── left rail ───────────────────────────────────────────────────────── */
      $('#vhRailGroups').innerHTML = RAIL_GROUPS.map(function (g) {
        return '<div class="vh-rail-group">'
          + '<button type="button" class="vh-rail-group-head" aria-expanded="true"><span class="vh-rail-group-label">' + esc(g.label) + '</span>'
          + '<span class="vh-rail-group-chevron">' + ICON.chevron + '</span></button>'
          + '<div class="vh-rail-group-items">' + g.items.map(function (it) {
            return '<a class="vh-rail-item"' + (it.active ? ' aria-current="page"' : '') + ' href="#"' + (it.active ? ' data-active="1"' : '') + '>'
              + '<span class="vh-rail-icon">' + it.icon + '</span>'
              + '<span class="vh-rail-label">' + esc(it.label) + '</span>'
              + (it.count !== undefined ? '<span class="vh-rail-count">' + esc(it.count) + '</span>' : '')
              + (it.code ? '<span class="vh-rail-count">' + esc(it.code) + '</span>' : '')
              + '</a>';
          }).join('') + '</div></div>';
      }).join('');

      /* mark the group that holds the active item */
      $$('.vh-rail-group').forEach(function (grp) {
        if (grp.querySelector('[aria-current]')) {
          var head = grp.querySelector('.vh-rail-group-head');
          if (head) head.classList.add('has-active');
        }
      });

      /* sliding active marker */
      function placeMarker() {
        if (disposed || !marker || !railScroll) return;
        var active = railScroll.querySelector('.vh-rail-item[aria-current]');
        if (!active) { marker.style.opacity = '0'; return; }
        marker.style.opacity = '';
        marker.style.transform = 'translateY(' + (active.offsetTop + 'px') + ')';
        marker.style.height = active.offsetHeight + 'px';
      }
      if ('ResizeObserver' in window && railScroll) {
        var roRail = new ResizeObserver(function () { placeMarker(); });
        roRail.observe(railScroll);
        observers.push(roRail);
      }
      raf(placeMarker);
      later(placeMarker, 200);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!disposed) placeMarker(); });

      /* group collapse */
      on(root.querySelector('#vhRailGroups'), 'click', function (e) {
        var head = e.target.closest('.vh-rail-group-head');
        if (!head) return;
        var items = head.nextElementSibling;
        var collapsed = items.style.maxHeight === '0px' || head.getAttribute('aria-expanded') === 'false';
        var next = !collapsed;
        head.setAttribute('aria-expanded', String(!next));
        head.querySelector('.vh-rail-group-chevron').classList.toggle('collapsed', next);
        items.style.maxHeight = next ? '0px' : '600px';
        items.style.opacity = next ? '0' : '1';
        later(placeMarker, 260);
      });
      $$('.vh-rail-group-items').forEach(function (it) { it.style.maxHeight = '600px'; it.style.opacity = '1'; it.style.transition = 'max-height 240ms var(--vh-ease), opacity 180ms var(--vh-ease)'; });

      /* rail collapse (desktop) */
      on($('#vhRailToggle'), 'click', function () {
        var collapsed = shell.getAttribute('data-rail') === 'collapsed';
        if (collapsed) { shell.removeAttribute('data-rail'); } else { shell.setAttribute('data-rail', 'collapsed'); }
        this.setAttribute('aria-expanded', String(collapsed));
        var word = this.querySelector('.vh-rail-toggle-word');
        if (word) word.textContent = collapsed ? 'Collapse' : 'Expand';
        later(placeMarker, 60);
      });

      /* phone sections sheet */
      var scrim = null;
      function openSheet(open) {
        if (!shell) return;
        shell.setAttribute('data-sheet', open ? 'open' : 'closed');
        var btn = $('#vhSections');
        if (btn) btn.setAttribute('aria-expanded', String(open));
        if (open && !scrim) {
          scrim = document.createElement('button');
          scrim.type = 'button';
          scrim.className = 'vh-scrim';
          scrim.setAttribute('aria-label', 'Dismiss sections');
          scrim.addEventListener('click', function () { openSheet(false); }, signal ? { signal: signal } : undefined);
          shell.appendChild(scrim);
        } else if (!open && scrim) {
          scrim.remove(); scrim = null;
        }
      }
      on($('#vhSections'), 'click', function () { openSheet(true); });

      /* ── header core: nested ring gauges + orbit ─────────────────────────── */
      var core = $('#vhCore');
      if (core) {
        core.innerHTML = '<div class="vh-core" role="img" aria-label="Open tasks: 9 · 100% on track">'
          + '<span class="vh-core-ring" aria-hidden="true"></span>'
          + '<span class="vh-core-orbit" aria-hidden="true"><i></i></span>'
          + '<div class="vh-core-g" aria-hidden="true">' + ringGauge(100, 168, 6) + '</div>'
          + '<div class="vh-core-g" aria-hidden="true">' + ringGauge(60, 118, 5) + '</div>'
          + '<div class="vh-core-c" aria-hidden="true"><b>9</b><small>open tasks</small></div>'
          + '</div>';
      }

      /* ── KPI well ────────────────────────────────────────────────────────── */
      $('#vhKpi').innerHTML = KPIS.map(function (k, i) {
        return '<a class="vh-kpi' + (i === 0 ? ' vh-kpi--lead' : '') + '" href="#" aria-label="' + esc(k.label + ': ' + k.value) + '">'
          + '<span class="vh-kpi-label">' + esc(k.label) + '</span>'
          + '<span class="vh-kpi-value" data-count="' + k.value + '">0</span>'
          + '<span class="vh-kpi-sub">' + esc(k.sub) + '</span>'
          + '<span class="vh-kpi-track"><span class="vh-kpi-fill" style="width:' + Math.round(k.ratio * 100) + '%"></span></span>'
          + '</a>';
      }).join('');

      /* count-up (skipped under reduced motion) */
      function countTo(el, to) {
        if (reduced) { el.textContent = String(to); return; }
        var t0 = performance.now();
        function step(t) {
          if (disposed) return;
          var k = Math.min(1, (t - t0) / 700), e = 1 - Math.pow(1 - k, 3);
          el.textContent = String(Math.round(to * e));
          if (k < 1) raf(step);
        }
        raf(step);
      }
      if (!reduced) $$('[data-count]').forEach(function (el) { countTo(el, Number(el.dataset.count)); });
      else $$('[data-count]').forEach(function (el) { el.textContent = el.dataset.count; });

      /* ── fact ticker — repeats the page's own headline figures ───────────── */
      var facts = [
        '9 open tasks', '3 unread', '5 active projects', '2 awaiting review',
        '2 overdue', '8 recent events'
      ];
      var track = $('#vhFact');
      if (track) {
        var cell = facts.map(function (s) { return '<span class="vh-fact-i">' + esc(s) + '<i aria-hidden="true">·</i></span>'; }).join('');
        track.innerHTML = cell + cell;
      }

      /* ── Your focus ──────────────────────────────────────────────────────── */
      $('#vhFocus').innerHTML = FOCUS.map(function (sec) {
        return '<div class="vh-secrow"><span class="vh-sub' + (sec.over ? ' vh-sub--over' : '') + '">' + esc(sec.group) + '</span></div>'
          + '<div class="vh-list">' + sec.rows.map(function (r) {
            return '<a class="vh-row" href="#">'
              + '<span class="vh-glyph vh-glyph--' + esc(r.status) + '">' + (STATUS_ICON[r.status] || ICON.todo) + '</span>'
              + '<span class="vh-rowtitle">' + esc(r.title) + '</span>'
              + '<span class="vh-code">' + esc(r.key) + '</span>'
              + (r.due ? '<span class="vh-due' + (r.tone ? ' vh-due--' + r.tone : '') + '">' + esc(r.due) + '</span>' : '')
              + '</a>';
          }).join('') + '</div>';
      }).join('');

      /* ── Needs you: finale decision cards ────────────────────────────────── */
      $('#vhNeeds').innerHTML = '<div class="vh-finale">'
        + '<div class="vh-decisions">' + NEEDS.map(function (n, i) {
          return '<div class="vh-decision">'
            + '<span class="vh-decision-n" aria-hidden="true">' + String(i + 1).padStart(2, '0') + '</span>'
            + '<div><p class="vh-decision-t"><b>' + esc(n.title) + '</b><span class="vh-needs-meta">' + esc(n.meta) + '</span></p>'
            + '<a class="vh-decision-btn" href="#" aria-label="' + esc(n.title) + '">Open</a></div>'
            + '</div>';
        }).join('') + '</div></div>';

      /* ── Your projects ───────────────────────────────────────────────────── */
      $('#vhProjects').innerHTML = '<div class="vh-proj-grid">' + PROJECTS.map(function (p) {
        return '<a class="vh-proj-card" href="#" title="Open ' + esc(p.code) + '">'
          + '<span class="vh-proj-top"><span class="vh-code vh-code--accent">' + esc(p.code) + '</span>'
          + '<span class="vh-proj-name">' + esc(p.name) + '</span></span>'
          + '<span class="vh-prog" aria-label="' + p.pct + '% complete"><span class="vh-prog-fill" style="width:' + p.pct + '%"></span></span>'
          + '<span class="vh-proj-foot"><span class="vh-proj-milestone">' + esc(p.milestone) + '</span>'
          + '<span class="vh-status vh-status--' + esc(p.status) + '">' + esc(p.label) + '</span></span>'
          + '</a>';
      }).join('') + '</div>';

      /* ── Recent activity: the Vera table ─────────────────────────────────── */
      var actCount = $('#vhActCount');
      if (actCount) actCount.textContent = ACTIVITY.length + ' events';
      var when = ['just now', '12m', '34m', '1h', '2h', '3h', '5h', 'yesterday'];
      $('#vhActivity').innerHTML = '<div class="vh-tbl-wrap"><table class="vh-tbl">'
        + '<thead><tr><th scope="col">Who</th><th scope="col">Action</th><th scope="col">Project</th><th scope="col" class="vh-num">Items</th><th scope="col" class="vh-num">When</th></tr></thead>'
        + '<tbody>' + ACTIVITY.map(function (a, i) {
          return '<tr><td>' + esc(a.who) + '</td>'
            + '<td>' + esc(a.verb) + ' ' + esc(a.noun) + '</td>'
            + '<td><span class="vh-code">' + esc(a.code) + '</span></td>'
            + '<td class="vh-num">' + a.n + '</td>'
            + '<td class="vh-num vh-when">' + esc(when[i] || 'earlier') + '</td></tr>';
        }).join('') + '</tbody></table></div>';

      /* ── reveal-once + spotlight (pointer only) ──────────────────────────── */
      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
        observers.push(io);
      }
      $$('[data-rv]').forEach(function (el) {
        if (seen && seen.has(el)) return;
        if (seen) seen.add(el);
        if (io) io.observe(el); else el.classList.add('in');
      });

      var fine = false;
      try { fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches; } catch (e) { /* ignore */ }
      if (!reduced && fine) {
        on(root, 'pointermove', function (e) {
          var card = e.target.closest('.vh-kpi, .vh-card');
          if (!card) return;
          var r = card.getBoundingClientRect();
          card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
          card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
          card.style.setProperty('--spot', 'var(--vh-accent-soft)');
        });
        on(root, 'pointerleave', function () {
          $$('.vh-kpi, .vh-card').forEach(function (c) { c.style.removeProperty('--spot'); });
        });
      }

      /* in-layout anchor scroll + keep the marker honest */
      on(window, 'scroll', function () { placeMarker(); }, { passive: true });
      on(root, 'click', function (e) {
        var a = e.target.closest('a[href="#"]');
        if (!a) return;
        e.preventDefault();
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        timeouts.forEach(function (id) { clearTimeout(id); });
        intervals.forEach(function (id) { clearInterval(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
        if (scrim && scrim.parentNode) scrim.remove();
      };
    }
  };
})();
