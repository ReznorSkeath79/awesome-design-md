/* ══ THE DROP — real storefront behaviour for showcase.html ════════════════
   Registers window.OWN_LAYOUTS['the-drop'].init(root). Renders the sample board
   (every count/total computed from LISTINGS), the hero powder + pointer tilt, the
   dock/rail, the payday calculator, the roster and the scoreboard. init returns a
   cleanup function so unmounting leaves no rAF loop, listener, observer or timer. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var STATUS_RANK = { unclaimed: 0, claimed: 1, review: 2, delivered: 3 };
  var STATUS_LABEL = { unclaimed: 'Open for bids', claimed: 'Claimed', review: 'In review', delivered: 'Delivered' };
  var CX = { low: 'Low', medium: 'Medium', high: 'High' };
  var GRID = {
    high: { 3: 10000, 4: 12500, 5: 15000 },
    medium: { 3: 7000, 4: 8500, 5: 10000 },
    low: { 3: 5000, 4: 6000, 5: 7000 }
  };
  var CAT = {
    'programming-tech': { c: 'var(--cobalt)', img: './assets/cat-programming-tech.jpg', name: 'Programming & Tech' },
    'data-analytics': { c: 'var(--yellow)', img: './assets/cat-data-analytics.jpg', name: 'Data & Analytics', light: true },
    'power-platform': { c: 'var(--violet)', img: './assets/cat-power-platform.jpg', name: 'Power Platform' },
    'ai-agents': { c: 'var(--magenta)', img: './assets/cat-ai-agents.jpg', name: 'AI & Agents' },
    'video-animation': { c: 'var(--orange)', img: './assets/cat-video-animation.jpg', name: 'Video & Animation' },
    'writing-docs': { c: 'var(--teal)', img: './assets/cat-writing-docs.jpg', name: 'Writing & Docs' },
    'graphics-design': { c: 'var(--coral)', img: './assets/cat-graphics-design.jpg', name: 'Graphics & Design' },
    'training-enablement': { c: 'var(--deep)', img: './assets/cat-training-enablement.jpg', name: 'Training & Enablement' }
  };
  var PALETTE = [
    { c: 'var(--magenta)' }, { c: 'var(--yellow)', light: true }, { c: 'var(--cobalt)' },
    { c: 'var(--orange)' }, { c: 'var(--violet)' }, { c: 'var(--teal)' }
  ];

  /* Sample data — fictional people only. 2 open · 5 claimed (2 yearly) · 1 in review · 2 delivered. */
  var LISTINGS = [
    { code: 'MX-2041', title: 'Warehouse sync pipeline', category: 'programming-tech', tier: 'high', status: 'unclaimed', requester: 'Jo Alcantara', bids: 3, due: '2026-10-24' },
    { code: 'MX-2036', title: 'Campaign key art', category: 'graphics-design', tier: 'medium', status: 'unclaimed', requester: 'Liza Mercado', bids: 0, due: '2026-10-29' },
    { code: 'MX-2030', title: 'Quarterly exec deck', category: 'writing-docs', tier: 'low', status: 'claimed', developer: 'Dane Ocampo', requester: 'Ben Castillo' },
    { code: 'MX-2033', title: 'AI intake assistant', category: 'ai-agents', tier: 'high', status: 'claimed', developer: 'Mika Navarro', requester: 'Jo Alcantara' },
    { code: 'MX-2024', title: 'Data model audit', category: 'data-analytics', tier: 'medium', status: 'claimed', developer: 'Rhea Santos', requester: 'Liza Mercado', yearly: true },
    { code: 'MX-2028', title: 'Onboarding video edit', category: 'video-animation', tier: 'medium', status: 'claimed', developer: 'Paolo Reyes', requester: 'Ben Castillo' },
    { code: 'MX-2019', title: 'Power Apps forms', category: 'power-platform', tier: 'low', status: 'claimed', developer: 'Tess Villanueva', requester: 'Jo Alcantara', yearly: true },
    { code: 'MX-2038', title: 'Training curriculum', category: 'training-enablement', tier: 'high', status: 'review', developer: 'Dane Ocampo', requester: 'Liza Mercado' },
    { code: 'MX-2012', title: 'Landing page build', category: 'programming-tech', tier: 'medium', status: 'delivered', developer: 'Rhea Santos', requester: 'Ben Castillo', csat: 5, onTime: true, paid: 10000 },
    { code: 'MX-2015', title: 'Brand illustration set', category: 'graphics-design', tier: 'high', status: 'delivered', developer: 'Mika Navarro', requester: 'Jo Alcantara', csat: 4, onTime: true, paid: 12500 }
  ];
  var PROGRAM = { pool: 150000, ends: '31 Dec' };
  var YOU = 'Mika Navarro';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function peso(n) { return '\u20B1' + Number(n).toLocaleString('en-PH'); }
  function kPeso(n) { return n >= 1000 ? '\u20B1' + (n / 1000).toString().replace(/\.0$/, '') + 'K' : peso(n); }
  function initialsOf(name) { return String(name || '').split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase(); }
  function shortLabel(t) { return t.length > 22 ? t.slice(0, 21) + '\u2026' : t; }
  function rangeOf(tier) { return [GRID[tier][3], GRID[tier][5]]; }
  function gmax(item) { return GRID[item.tier][5]; }
  function catFor(slug) { return CAT[slug] || CAT['programming-tech']; }
  function dueText(iso) {
    var m = iso ? /^(\d{4})-(\d{2})-(\d{2})/.exec(iso) : null;
    if (!m) return '';
    return 'Due ' + Number(m[3]) + '\u00A0' + (MONTHS[Number(m[2]) - 1] || '?');
  }

  OWN['the-drop'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var rafs = [];
      var timeouts = [];
      var observers = [];
      var seen = [];
      try { seen = new WeakSet(); } catch (e) { seen = null; }

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function later(fn, ms) { var id = window.setTimeout(fn, ms); timeouts.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* ── derived board (unclaimed first, then by max incentive) ─────────── */
      var entries = LISTINGS.map(function (item) { return { item: item, bucket: item.status }; })
        .sort(function (a, b) { return STATUS_RANK[a.bucket] - STATUS_RANK[b.bucket] || gmax(b.item) - gmax(a.item); });

      var openCount = entries.filter(function (e) { return e.bucket === 'unclaimed'; }).length;
      var inFlight = entries.filter(function (e) { return e.bucket === 'claimed' || e.bucket === 'review'; }).length;
      var delivered = entries.filter(function (e) { return e.bucket === 'delivered'; }).length;
      var spokenFor = entries.filter(function (e) { return (e.bucket === 'claimed' || e.bucket === 'review') && !e.item.yearly; })
        .reduce(function (s, e) { return s + gmax(e.item); }, 0);

      /* ── templates ──────────────────────────────────────────────────────── */
      function stickerHTML(item, bucket) {
        if (bucket === 'delivered') return '<span class="sticker sticker-done">\u2605<small>PAID</small></span>';
        if (item.yearly) return '<span class="sticker sticker-yearly">YEARLY<small>INCENTIVE</small></span>';
        return '<span class="sticker">' + kPeso(gmax(item)) + '<small>UP TO</small></span>';
      }
      function tileHTML(item, bucket, index) {
        var art = catFor(item.category);
        var eyebrow = bucket === 'unclaimed'
          ? (item.bids ? 'Open for bids \u00B7 ' + item.bids + ' in' : 'Fresh drop \u00B7 be first')
          : STATUS_LABEL[bucket];
        var who = bucket === 'unclaimed'
          ? 'Posted by ' + esc(item.requester) + (item.due ? ' \u00B7 ' + esc(dueText(item.due)) : '')
          : esc(item.developer) + ' \u00B7 posted by ' + esc(item.requester);
        var action = bucket === 'unclaimed' ? 'Bid now' : 'View';
        return '<button type="button" class="tile rv' + (art.light ? ' tile-light' : '') + '" data-rv'
          + ' style="--c:' + art.c + ';--img:url(\'' + art.img + '\');transition-delay:' + ((index % 4) * 70) + 'ms"'
          + ' aria-label="' + esc(item.title) + '">'
          + '<span class="tag">Sample</span>'
          + stickerHTML(item, bucket)
          + '<span class="tile-eyebrow">' + esc(eyebrow) + '</span>'
          + '<span class="tile-title">' + esc(item.title) + '</span>'
          + '<span class="tile-meta">' + who + '</span>'
          + '<span class="tile-actions"><span class="btn btn-white">' + action + '</span></span>'
          + '</button>';
      }
      function posterHTML(item, bucket, index) {
        var art = catFor(item.category);
        var big = bucket === 'unclaimed' ? 'Open for bids' : item.developer;
        var foot = item.yearly ? 'Yearly incentive'
          : bucket === 'delivered' ? ('\u2605'.repeat(item.csat || 5) + ' \u00B7 paid')
            : kPeso(rangeOf(item.tier)[0]) + ' \u2013 ' + kPeso(rangeOf(item.tier)[1]);
        return '<button type="button" class="poster rv' + (art.light ? ' poster-light' : '') + '" data-rv data-poster'
          + ' style="--c:' + art.c + ';--img:url(\'' + art.img + '\');transition-delay:' + ((index % 5) * 55) + 'ms"'
          + ' aria-label="' + esc(item.title) + '">'
          + '<span class="tag">Sample</span>'
          + stickerHTML(item, bucket)
          + '<span class="poster-name">' + esc(big) + '</span>'
          + '<span class="poster-title">' + esc(item.title) + '</span>'
          + '<span class="poster-posted">Posted by ' + esc(item.requester) + '</span>'
          + '<span class="poster-foot"><span>' + CX[item.tier] + ' \u00B7 ' + STATUS_LABEL[bucket] + '</span><span>' + esc(foot) + '</span></span>'
          + '</button>';
      }

      /* ── hero ───────────────────────────────────────────────────────────── */
      $('#heroSub').textContent = peso(rangeOf('low')[0]) + '\u2013' + peso(rangeOf('high')[1])
        + ' per deliverable. Scored by complexity and your requester\u2019s stars. Paid when it lands on time.';
      $('#heroStats').innerHTML =
        '<li><b data-count="' + entries.length + '">0</b><span>jobs live</span></li>'
        + '<li><b data-count="' + openCount + '">0</b><span>open for bids</span></li>'
        + '<li><b>' + kPeso(PROGRAM.pool) + '</b><span>monthly pool</span></li>'
        + '<li><b>' + PROGRAM.ends + '</b><span>program ends</span></li>';

      /* ── ticker ─────────────────────────────────────────────────────────── */
      var tickerItems = entries.slice(0, 10).map(function (e) {
        var item = e.item;
        var who = e.bucket === 'unclaimed' ? 'Open now' : (item.developer || '');
        var money = item.yearly ? 'Yearly incentive'
          : e.bucket === 'delivered' ? ('Paid ' + peso(item.paid || 0))
            : ('Up to ' + kPeso(gmax(item)));
        return '<span class="ticker-item">' + esc(shortLabel(item.title)) + ' <i></i> ' + esc(who)
          + ' <i></i> ' + esc(money) + ' <i></i></span>';
      }).join('');
      $('#tickerTrack').innerHTML = tickerItems + tickerItems;

      /* ── the drop (first four) ──────────────────────────────────────────── */
      $('#dropGrid').innerHTML = entries.slice(0, 4).map(function (e, i) { return tileHTML(e.item, e.bucket, i); }).join('');

      /* ── lineup: dock + rail ────────────────────────────────────────────── */
      var FILTERS = [['unclaimed', 'Unclaimed'], ['claimed', 'Claimed'], ['review', 'In review'], ['delivered', 'Delivered'], ['all', 'All']];
      var filter = 'all';
      var query = '';
      var dockEl = $('#dock');
      var railEl = $('#rail');
      var railTrack = $('#railTrack');
      var railBar = $('#railBar');
      var pos = 0, max = 0, railRaf = 0;
      var drag = { active: false, startX: 0, startPos: 0, lastX: 0, lastT: 0, vx: 0, moved: 0 };

      dockEl.innerHTML = '<span class="dock-pill" aria-hidden="true"></span>' + FILTERS.map(function (f) {
        var k = f[0], label = f[1];
        var n = k === 'all' ? entries.length : entries.filter(function (e) { return e.bucket === k; }).length;
        return '<button type="button" data-f="' + k + '" aria-pressed="' + (k === filter) + '">' + label + '<i>' + n + '</i></button>';
      }).join('');

      function placePill() {
        if (disposed) return;
        var pill = $('.dock-pill');
        var b = dockEl.querySelector('[data-f="' + filter + '"]');
        if (!pill || !b) return;
        pill.style.left = b.offsetLeft + 'px';
        pill.style.top = b.offsetTop + 'px';
        pill.style.width = b.offsetWidth + 'px';
        pill.style.height = b.offsetHeight + 'px';
      }
      function visible() {
        var q = query.toLowerCase();
        return entries.filter(function (e) {
          if (filter !== 'all' && e.bucket !== filter) return false;
          if (!q) return true;
          var item = e.item;
          return [item.title, item.code, item.developer, item.requester, catFor(item.category).name]
            .join(' ').toLowerCase().indexOf(q) >= 0;
        });
      }
      function measure() { max = Math.max(0, railTrack.scrollWidth - railEl.clientWidth); }
      function apply() {
        pos = Math.max(-max, Math.min(0, pos));
        railTrack.style.transform = 'translate3d(' + pos + 'px,0,0)';
        var frac = max ? -pos / max : 0;
        var w = max ? railEl.clientWidth / railTrack.scrollWidth : 1;
        railBar.style.width = Math.max(12, w * 100) + '%';
        railBar.style.transform = 'translateX(' + (frac * (1 / Math.max(w, 0.12) - 1) * 100) + '%)';
      }
      function glide() {
        if (Math.abs(drag.vx) < 0.3 || drag.active) return;
        pos += drag.vx; drag.vx *= 0.94; apply();
        railRaf = raf(glide);
      }
      function stepBy(dir) {
        var card = railTrack.querySelector('[data-poster]');
        var w = card ? card.offsetWidth + 18 : 300;
        pos += dir * -w * 2;
        railTrack.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
        apply();
        later(function () { if (railTrack) railTrack.style.transition = ''; }, 620);
      }
      function renderRail(animate) {
        var list = visible();
        railTrack.innerHTML = list.length
          ? list.map(function (e, i) { return posterHTML(e.item, e.bucket, i); }).join('')
          : '<p class="rail-empty">Nothing here yet — try another filter.</p>';
        pos = 0; measure(); apply(); observeReveal();
        if (animate && !reduced && railTrack.animate) {
          var cards = railTrack.querySelectorAll('[data-poster]');
          Array.prototype.forEach.call(cards, function (el, i) {
            el.animate(
              [{ opacity: 0, transform: 'translateY(36px) scale(.94)' }, { opacity: 1, transform: 'none' }],
              { duration: 560, delay: Math.min(i, 8) * 50, easing: 'cubic-bezier(.34,1.36,.64,1)', fill: 'backwards' }
            );
          });
        }
      }

      /* ── roster ─────────────────────────────────────────────────────────── */
      var groups = {};
      entries.forEach(function (e) {
        if ((e.bucket === 'claimed' || e.bucket === 'review') && e.item.developer) {
          (groups[e.item.developer] = groups[e.item.developer] || []).push(e.item);
        }
      });
      var players = Object.keys(groups).map(function (k) { return [k, groups[k]]; })
        .sort(function (a, b) { return b[1].length - a[1].length; });
      $('#rosterGrid').innerHTML = players.length ? players.map(function (p, i) {
        var name = p[0], jobs = p[1], pal = PALETTE[i % PALETTE.length];
        return '<article class="player rv' + (pal.light ? ' player-light' : '') + '" data-rv style="--c:' + pal.c + '">'
          + '<span class="player-num" aria-hidden="true">' + String(i + 1).padStart(2, '0') + '</span>'
          + '<span class="player-mono">' + esc(initialsOf(name)) + '</span>'
          + '<h3 class="player-name">' + esc(name) + '</h3>'
          + '<p class="player-count">' + jobs.length + ' job' + (jobs.length > 1 ? 's' : '') + ' in flight</p>'
          + '<ul class="player-jobs">' + jobs.map(function (j) {
            return '<li><button type="button" title="' + esc(j.title) + '">' + esc(shortLabel(j.title)) + '</button></li>';
          }).join('') + '</ul></article>';
      }).join('') : '<p class="rail-empty">No one is shipping yet — the first claim starts the board.</p>';

      /* ── scoreboard ─────────────────────────────────────────────────────── */
      $('#billboardRow').innerHTML = [[openCount, 'Open now'], [inFlight, 'In flight'], [delivered, 'Delivered']]
        .map(function (s) { return '<div class="billboard-stat"><b class="billboard-num" data-count="' + s[0] + '">0</b><span class="billboard-label">' + s[1] + '</span></div>'; }).join('');
      $('#poolAmount').textContent = peso(spokenFor);
      $('#poolCaption').textContent = 'spoken for of ' + peso(PROGRAM.pool);
      var poolPct = PROGRAM.pool > 0 ? Math.min(100, (spokenFor / PROGRAM.pool) * 100) : 0;
      raf(function () { var f = $('#poolFill'); if (f) f.style.width = poolPct + '%'; });

      var mine = entries.filter(function (e) { return e.item.developer === YOU; });
      var myPaid = mine.filter(function (e) { return e.bucket === 'delivered'; }).reduce(function (s, e) { return s + (e.item.paid || 0); }, 0);
      var myOpen = mine.filter(function (e) { return e.bucket === 'claimed' || e.bucket === 'review'; }).reduce(function (s, e) { return s + gmax(e.item); }, 0);
      var myInFlight = mine.filter(function (e) { return e.bucket === 'claimed' || e.bucket === 'review'; }).length;
      $('#qEarned').textContent = peso(myPaid + myOpen);
      $('#qUnpaid').textContent = peso(myOpen);
      $('#qPaid').textContent = peso(myPaid);
      $('#qJobs').textContent = 'Your jobs in flight: ' + myInFlight;

      var scorecards = entries.filter(function (e) { return e.bucket === 'delivered' && e.item.csat; }).map(function (e) { return e.item; });
      var avg = scorecards.length ? scorecards.reduce(function (s, c) { return s + c.csat; }, 0) / scorecards.length : null;
      var onTimePct = scorecards.length ? Math.round(scorecards.filter(function (c) { return c.onTime; }).length / scorecards.length * 100) : null;
      var highest = Math.max.apply(null, entries.filter(function (e) { return e.bucket === 'unclaimed'; })
        .map(function (e) { return gmax(e.item); }).concat([0]));
      $('#scoreStickers').innerHTML =
        '<div class="score-sticker"><span class="score-sticker-num">' + (avg == null ? '\u2014' : avg.toFixed(1) + '\u2605') + '</span><span class="score-sticker-label">Avg rating</span></div>'
        + '<div class="score-sticker"><span class="score-sticker-num">' + (onTimePct == null ? '\u2014' : onTimePct + '%') + '</span><span class="score-sticker-label">On time</span></div>'
        + '<div class="score-sticker"><span class="score-sticker-num">' + (highest > 0 ? kPeso(highest) : '\u2014') + '</span><span class="score-sticker-label">Highest drop</span></div>';

      /* ── calculator ─────────────────────────────────────────────────────── */
      var calc = { cx: 'medium', stars: 4, onTime: true, grade: true };
      var TIER_C = { low: 'var(--teal)', medium: 'var(--violet)', high: 'var(--magenta)' };
      $('#calcCx').innerHTML = ['low', 'medium', 'high'].map(function (k) {
        var lo = rangeOf(k)[0], hi = rangeOf(k)[1];
        return '<button type="button" role="radio" class="cx" style="--c:' + TIER_C[k] + '" data-cx="' + k
          + '" aria-checked="' + (k === calc.cx) + '"><b>' + CX[k] + '</b><span>' + peso(lo) + ' \u2013 ' + peso(hi) + '</span></button>';
      }).join('');
      var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.3 6.1 20.5l1.3-6.5L2.5 9.4l6.6-.8z"/></svg>';
      $('#calcStars').innerHTML = [1, 2, 3, 4, 5].map(function (n) {
        return '<button type="button" role="radio" class="star" data-s="' + n + '" aria-label="' + n + ' star' + (n > 1 ? 's' : '')
          + '" aria-checked="' + (calc.stars === n) + '" tabindex="' + (calc.stars === n ? 0 : -1) + '">' + STAR + '</button>';
      }).join('');
      $('#matrix').innerHTML = '<span class="h"></span><span class="h">5\u2605</span><span class="h">4\u2605</span><span class="h">3\u2605</span>'
        + ['high', 'medium', 'low'].map(function (k) {
          return '<span class="h">' + CX[k] + '</span>' + ['5', '4', '3'].map(function (s) {
            return '<span class="v" data-cell="' + k + '-' + s + '">' + kPeso(GRID[k][Number(s)]) + '</span>';
          }).join('');
        }).join('');

      function payout() {
        if (!calc.onTime) return [0, 'Delivered late — earns nothing'];
        if (!calc.grade) return [0, 'Grade 8A and above — yearly incentive instead'];
        if (calc.stars <= 2) return [0, calc.stars + '\u2605 — earns nothing at 2\u2605 or below'];
        return [GRID[calc.cx][calc.stars], CX[calc.cx] + ' \u00B7 ' + calc.stars + '\u2605 \u00B7 on time'];
      }
      function countTo(el, to, ms, fmt) {
        fmt = fmt || function (v) { return String(Math.round(v)); };
        if (reduced || !el) { if (el) el.textContent = fmt(to); return; }
        var from = Number(el.dataset.v || 0), t0 = performance.now();
        function step(t) {
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 4);
          el.textContent = fmt(from + (to - from) * e);
          if (k < 1) raf(step); else el.dataset.v = to;
        }
        raf(step);
      }
      function renderCalc() {
        $$('[data-cx]').forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.cx === calc.cx)); });
        $$('[data-s]').forEach(function (b) {
          var n = Number(b.dataset.s);
          b.classList.toggle('on', n <= calc.stars);
          b.setAttribute('aria-checked', String(n === calc.stars));
          b.tabIndex = n === calc.stars ? 0 : -1;
        });
        var out = payout();
        var amtEl = $('#calcAmt');
        countTo(amtEl, out[0], 500, function (v) { return peso(Math.round(v / 50) * 50); });
        amtEl.classList.toggle('is-zero', out[0] === 0);
        $('#calcWhy').textContent = out[1];
        $$('.matrix .v').forEach(function (c) {
          c.classList.toggle('hit', out[0] > 0 && c.dataset.cell === (calc.cx + '-' + calc.stars));
        });
      }

      /* ── reveal on scroll ───────────────────────────────────────────────── */
      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
        observers.push(io);
      }
      function observeReveal() {
        $$('[data-rv]').forEach(function (el) {
          if (seen && seen.has(el)) return;
          if (seen) seen.add(el);
          if (io) io.observe(el); else el.classList.add('in');
        });
      }

      /* ── rail interactions ──────────────────────────────────────────────── */
      on(railEl, 'pointerdown', function (e) {
        drag.active = true; drag.moved = 0; drag.startX = e.clientX; drag.startPos = pos;
        drag.lastX = e.clientX; drag.lastT = performance.now(); drag.vx = 0;
        railEl.classList.add('is-drag');
      });
      on(window, 'pointermove', function (e) {
        if (!drag.active) return;
        pos = drag.startPos + (e.clientX - drag.startX);
        drag.moved = Math.max(drag.moved, Math.abs(e.clientX - drag.startX));
        var t = performance.now();
        drag.vx = ((e.clientX - drag.lastX) / Math.max(1, t - drag.lastT)) * 16;
        drag.lastX = e.clientX; drag.lastT = t;
        apply();
      });
      on(window, 'pointerup', function () {
        if (!drag.active) return;
        drag.active = false; railEl.classList.remove('is-drag');
        if (!reduced) glide();
      });
      on(railEl, 'click', function (e) { if (drag.moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);
      on(railEl, 'wheel', function (e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); pos -= e.deltaX; apply(); }
      }, { passive: false });
      on(railEl, 'keydown', function (e) {
        if (e.key === 'ArrowRight') stepBy(1);
        if (e.key === 'ArrowLeft') stepBy(-1);
      });
      on($('#railPrev'), 'click', function () { stepBy(-1); });
      on($('#railNext'), 'click', function () { stepBy(1); });
      on(dockEl, 'click', function (e) {
        var b = e.target.closest('[data-f]'); if (!b) return;
        filter = b.dataset.f;
        $$('[data-f]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        placePill(); renderRail(true);
      });

      /* ── search ─────────────────────────────────────────────────────────── */
      on($('#dropQ'), 'input', function (e) {
        query = e.target.value.trim();
        if (query) filter = 'all';
        $$('[data-f]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === filter)); });
        placePill(); renderRail(false);
      });
      on($('#dropQ'), 'keydown', function (e) {
        if (e.key === 'Enter' && $('#lineup')) $('#lineup').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      });
      on($('[data-search-toggle]'), 'click', function () {
        var s = $('.bar-search'); if (s) s.classList.toggle('search-open');
      });

      /* ── calculator interactions ────────────────────────────────────────── */
      on($('#calcCx'), 'click', function (e) {
        var b = e.target.closest('[data-cx]'); if (!b) return; calc.cx = b.dataset.cx; renderCalc();
      });
      on($('#calcStars'), 'click', function (e) {
        var b = e.target.closest('[data-s]'); if (!b) return; calc.stars = Number(b.dataset.s); renderCalc();
      });
      on($('#calcStars'), 'keydown', function (e) {
        var b = e.target.closest('[data-s]'); if (!b) return;
        var n = Number(b.dataset.s);
        var next = (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? Math.min(5, n + 1)
          : (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? Math.max(1, n - 1) : null;
        if (next === null) return;
        e.preventDefault(); calc.stars = next; renderCalc();
        var sib = $('#calcStars').children[next - 1]; if (sib) sib.focus();
      });
      on($('#tOnTime'), 'change', function (e) { calc.onTime = e.target.checked; renderCalc(); });
      on($('#tGrade'), 'change', function (e) { calc.grade = e.target.checked; renderCalc(); });

      /* ── bar: solid-on-scroll, active link, smooth in-layout scroll ─────── */
      var bar = $('#dropBar');
      var sectionIds = ['drop', 'lineup', 'payday', 'roster', 'scoreboard'];
      function onScroll() {
        if (disposed) return;
        bar.classList.toggle('bar-solid', root.getBoundingClientRect().top < -40);
        var best = null, bestD = Infinity;
        sectionIds.forEach(function (id) {
          var el = root.querySelector('#' + id); if (!el) return;
          var top = el.getBoundingClientRect().top;
          if (top < window.innerHeight * 0.6) {
            var d = Math.abs(top - 140);
            if (d < bestD) { bestD = d; best = id; }
          }
        });
        if (best) $$('.bar-nav-links a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + best); });
      }
      on(window, 'scroll', onScroll, { passive: true });
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
        });
      });

      /* ── hero powder + pointer tilt (no idle image motion) ──────────────── */
      var stage = $('#heroStage'), img = $('#heroImg'), cv = $('#heroPowder');
      if (!reduced && stage && img && cv) {
        var ctx = null;
        try { ctx = cv.getContext('2d'); } catch (e) { ctx = null; }
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var COLS = ['226,36,143', '255,106,31', '123,44,240', '255,194,26'];
        var W = 0, H = 0, parts = [], px = 0, py = 0, mx = 0, my = 0, on2 = true, running = false;

        function spawn(fresh) {
          var cx = W * 0.68, cy = H * 0.36;
          var a = Math.random() * Math.PI * 2;
          var r = W * (fresh ? 0.12 + Math.random() * 0.2 : 0.12 + Math.random() * 0.04);
          return {
            x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.8,
            vx: Math.cos(a) * (0.15 + Math.random() * 0.55), vy: Math.sin(a) * (0.1 + Math.random() * 0.4) - 0.12,
            s: 0.6 + Math.random() * 2.4, life: fresh ? Math.random() : 0, ttl: 0.0018 + Math.random() * 0.003,
            c: COLS[(Math.random() * COLS.length) | 0]
          };
        }
        function size() {
          var r = stage.getBoundingClientRect();
          W = r.width; H = r.height;
          cv.width = W * dpr; cv.height = H * dpr;
          if (ctx) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            parts = [];
            var n = Math.max(24, Math.round(W / 4.2));
            for (var i = 0; i < n; i++) parts.push(spawn(true));
          }
        }
        function loop() {
          if (running) return;
          running = true;
          function tick() {
            if (!on2 || disposed) { running = false; return; }
            px += (mx - px) * 0.05; py += (my - py) * 0.05;
            img.style.transform = 'translate(' + (px * -18) + 'px,' + (py * -12) + 'px) rotateY(' + (px * 1.5)
              + 'deg) rotateX(' + (-py * 1) + 'deg) scale(1.06)';
            if (ctx) {
              ctx.clearRect(0, 0, W, H);
              for (var i = 0; i < parts.length; i++) {
                var p = parts[i];
                p.x += p.vx + px * 0.6; p.y += p.vy + py * 0.4; p.life += p.ttl;
                if (p.life >= 1) { parts[i] = spawn(false); continue; }
                var a = Math.sin(p.life * Math.PI) * 0.75;
                ctx.fillStyle = 'rgba(' + p.c + ',' + a + ')';
                ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 7); ctx.fill();
              }
            }
            powderRaf = requestAnimationFrame(tick);
          }
          powderRaf = requestAnimationFrame(tick);
        }
        var powderRaf = 0;
        size();
        if ('ResizeObserver' in window) {
          var ro = new ResizeObserver(function () { size(); });
          ro.observe(stage); observers.push(ro);
        } else {
          on(window, 'resize', size);
        }
        if (typeof IntersectionObserver !== 'undefined') {
          var io2 = new IntersectionObserver(function (ents) { on2 = !!(ents[0] && ents[0].isIntersecting); if (on2) loop(); });
          io2.observe(stage); observers.push(io2);
          on(document, 'visibilitychange', function () { on2 = !document.hidden; if (on2) loop(); });
        }
        on(stage, 'pointermove', function (e) {
          var r = stage.getBoundingClientRect();
          mx = (e.clientX - r.left) / r.width - 0.5;
          my = (e.clientY - r.top) / r.height - 0.5;
        });
        on(stage, 'pointerleave', function () { mx = 0; my = 0; });
        loop();
      }

      /* ── boot the dynamic bits ──────────────────────────────────────────── */
      if ('ResizeObserver' in window) {
        var roRoot = new ResizeObserver(function () { measure(); apply(); placePill(); });
        roRoot.observe(root); observers.push(roRoot);
      }
      renderRail(false);
      renderCalc();
      observeReveal();
      $$('[data-count]').forEach(function (el) { countTo(el, Number(el.dataset.count), 1100); });
      raf(placePill);
      later(placePill, 200);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!disposed) placePill(); });
      onScroll();

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        if (powderRaf) cancelAnimationFrame(powderRaf);
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        timeouts.forEach(function (id) { clearTimeout(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
        if (img) img.style.transform = '';
        if (railTrack) railTrack.style.transform = '';
      };
    }
  };
})();
