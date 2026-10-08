/* ══ NORTHWIND — in ElevenLabs' design language, for showcase.html ══════════
   Registers window.OWN_LAYOUTS['elevenlabs'].init(root). Renders the waveform
   bars, the gradient-orb feature cards, the board library rows and testimonials.
   The only motion is the waveform pulse, which respects prefers-reduced-motion.
   Returns a cleanup that cancels the interval, rAF, and every listener. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var ORBS = ['var(--gradient-mint)', 'var(--gradient-peach)', 'var(--gradient-lavender)', 'var(--gradient-sky)', 'var(--gradient-rose)'];
  var CARDS = [
    { orb: ORBS[0], h: 'Live operations boards', p: 'Throughput, yield, and cost on one calm, reconciled surface.' },
    { orb: ORBS[1], h: 'A semantic layer, plainly written', p: 'Definitions held once and read the same by every desk and every shift.' },
    { orb: ORBS[2], h: 'Digests with editorial polish', p: 'The night shift gets the reconciled board in their own inbox, on their own clock.' }
  ];
  var BOARDS = [
    { ico: 'TP', name: 'Throughput', sub: '6 lines · Luzon', tag: 'Live' },
    { ico: 'YL', name: 'Line yield', sub: '14 lines · all regions', tag: '94.6%' },
    { ico: 'PO', name: 'Port operations', sub: '3 berths · Busan', tag: '98.1%' },
    { ico: 'CU', name: 'Cost per unit', sub: '12 regions', tag: '$2.41' },
    { ico: 'AR', name: 'Anomaly review', sub: 'Across the floor', tag: '3 open' }
  ];
  var QUOTES = [
    { q: '\u201CIt reads like the FT and reconciles like a ledger. The night shift finally trusts the number.\u201D', who: 'Rhea Mercado', role: 'Head of Operations, Caldera', ini: 'RM' },
    { q: '\u201CWe retired three spreadsheets and a nightly batch. The board is the single source now.\u201D', who: 'Dane Ocampo', role: 'Ops Analyst, Portway', ini: 'DO' },
    { q: '\u201CThe digests land before the shift meeting, already reconciled. It changed the cadence of the floor.\u201D', who: 'Mika Navarro', role: 'Plant Lead, Nordvik', ini: 'MN' }
  ];
  var HEIGHTS = [30, 55, 42, 70, 38, 62, 48, 78, 44, 58, 34, 66, 50, 72, 40, 60, 36, 54, 46, 68, 32, 52, 44, 74];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  OWN['elevenlabs'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }
      var intervals = [];
      function on(el, type, fn, opt) { if (!el) return; opt = Object.assign({}, opt || {}); if (signal) opt.signal = signal; el.addEventListener(type, fn, opt); }
      function every(fn, ms) { var id = window.setInterval(fn, ms); intervals.push(id); return id; }
      function $(s) { return root.querySelector(s); }

      /* ── waveform bars ──────────────────────────────────────────────────── */
      var bars = $('#elBars');
      if (bars) {
        bars.innerHTML = HEIGHTS.map(function (h) { return '<i style="--h:' + h + '%"></i>'; }).join('');
      }

      var playing = false;
      var barEls = bars ? bars.querySelectorAll('i') : [];
      function paintBars(mult) {
        Array.prototype.forEach.call(barEls, function (b, i) {
          var base = HEIGHTS[i % HEIGHTS.length];
          var h = Math.max(12, Math.min(100, base * mult));
          b.style.height = h + '%';
        });
      }
      on($('#elPlay'), 'click', function () {
        playing = !playing;
        if (bars) bars.classList.toggle('playing', playing);
        var play = $('#elPlay');
        if (play) play.setAttribute('aria-label', playing ? 'Pause shift digest' : 'Play shift digest');
        if (!playing) { paintBars(1); }
      });
      if (!reduced && barEls.length) {
        var phase = 0;
        every(function () {
          if (!playing) return;
          phase += 0.6;
          Array.prototype.forEach.call(barEls, function (b, i) {
            var base = HEIGHTS[i % HEIGHTS.length] / 100;
            var h = 20 + Math.abs(Math.sin(phase + i * 0.5)) * 80 * base + 10;
            b.style.height = Math.min(100, h) + '%';
          });
        }, 120);
      }

      /* ── orb feature cards ─────────────────────────────────────────────── */
      var orbGrid = $('#elOrbGrid');
      if (orbGrid) {
        orbGrid.innerHTML = CARDS.map(function (c) {
          return '<article class="el-orb-card">'
            + '<span class="el-card-orb" style="background:radial-gradient(circle,' + c.orb + ',transparent 70%)" aria-hidden="true"></span>'
            + '<h3>' + esc(c.h) + '</h3>'
            + '<p>' + esc(c.p) + '</p>'
            + '</article>';
        }).join('');
      }

      /* ── board library rows ─────────────────────────────────────────────── */
      var list = $('#elVoiceList');
      if (list) {
        list.innerHTML = BOARDS.map(function (b) {
          return '<li class="el-voice">'
            + '<span class="el-voice-ico" aria-hidden="true">' + esc(b.ico) + '</span>'
            + '<span class="el-voice-name"><b>' + esc(b.name) + '</b><span>' + esc(b.sub) + '</span></span>'
            + '<span class="el-voice-tag">' + esc(b.tag) + '</span>'
            + '</li>';
        }).join('');
      }

      /* ── testimonials ───────────────────────────────────────────────────── */
      var qGrid = $('#elQuoteGrid');
      if (qGrid) {
        qGrid.innerHTML = QUOTES.map(function (t) {
          return '<figure class="el-quote">'
            + '<p>' + t.q + '</p>'
            + '<figcaption class="el-quote-by"><span class="el-quote-av" aria-hidden="true">' + esc(t.ini) + '</span><span><b>' + esc(t.who) + '</b><br>' + esc(t.role) + '</span></figcaption>'
            + '</figure>';
        }).join('');
      }

      return function cleanup() {
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        intervals.forEach(function (id) { clearInterval(id); });
      };
    }
  };
})();
