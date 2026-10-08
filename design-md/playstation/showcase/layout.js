/* ══ PLAYSTATION — Northwind operations analytics ═════════════════════════════════
   Registers window.OWN_LAYOUTS['playstation'].init(root). Renders the module rail,
   hardware strip, Plus tiers and news grid; drives the rail carousel with paddles,
   drag and dots. Returns a cleanup that removes every listener and rAF. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var MODULES = [
    { name: 'Throughput Benchmarks', plat: 'Regions · desktop', tag: 'New', c: '#0070d1' },
    { name: 'Forecasting Module', plat: 'Planning · all consoles', tag: 'Coming soon', c: '#7928ca' },
    { name: 'Warehouse Terminal', plat: 'Field · beta', tag: 'Beta', c: '#d53b00' },
    { name: 'Support Health', plat: 'Service · desktop', tag: 'Live', c: '#0fa58c' },
    { name: 'Revenue Pulse', plat: 'Finance · all consoles', tag: 'Live', c: '#0070d1' },
    { name: 'Capacity Planner', plat: 'Teams · desktop', tag: 'New', c: '#2c8c66' }
  ];

  var HW = [
    { name: 'Dashboard Console', meta: 'Ops desk · 27"', d: 'M4 5h16v10H4zM8 19h8M12 15v4' },
    { name: 'Field Tablet', meta: 'Warehouse · 11"', d: 'M7 3h10v18H7zM11 18h2' },
    { name: 'Terminal Hub', meta: 'Floor · wall mount', d: 'M4 4h16v12H4zM9 20h6M12 16v4' }
  ];

  var TIERS = [
    { name: 'Essential', price: '$29', per: '/seat / mo', feats: ['6 regions', 'Weekly dashboards', 'Email alerts'] },
    { name: 'Performance', price: '$59', per: '/seat / mo', feats: ['Unlimited regions', 'Forecasting module', 'Priority support'] },
    { name: 'Enterprise', price: 'Custom', per: '', feats: ['SSO & audit log', 'Dedicated onboarding', 'SLA 99.95%'] }
  ];

  var NEWS = [
    { cat: 'Analytics', title: 'Regional throughput benchmarks are live for all tiers', date: 'Mar 12, 2026', c: '#0070d1' },
    { cat: 'Product', title: 'The forecasting module enters open beta this quarter', date: 'Mar 04, 2026', c: '#7928ca' },
    { cat: 'Engineering', title: 'How Northwind keeps six regions on one ledger', date: 'Feb 26, 2026', c: '#0fa58c' }
  ];

  OWN['playstation'] = {
    init: function (root) {
      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var rafs = [];
      var $ = function (s) { return root.querySelector(s); };
      var $$ = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };
      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }

      /* ── static content ─────────────────────────────────────────────── */
      var track = $('[data-ps-track]');
      if (track) {
        track.innerHTML = MODULES.map(function (m) {
          return '<article class="ps-tile" style="--c:' + esc(m.c) + '">'
            + '<span class="ps-tile-tag">' + esc(m.tag) + '</span>'
            + '<span class="ps-tile-name">' + esc(m.name) + '</span>'
            + '<span class="ps-tile-plat">' + esc(m.plat) + '</span></article>';
        }).join('');
      }

      var hw = $('#psHardwareStrip');
      if (hw) {
        hw.innerHTML = HW.map(function (h) {
          return '<div class="ps-hw">'
            + '<div class="ps-hw-visual"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + esc(h.d) + '"/></svg></div>'
            + '<span class="ps-hw-name">' + esc(h.name) + '</span>'
            + '<span class="ps-hw-meta">' + esc(h.meta) + '</span></div>';
        }).join('');
      }

      var tiers = $('#psTiers');
      if (tiers) {
        tiers.innerHTML = TIERS.map(function (t) {
          return '<div class="ps-tier">'
            + '<span class="ps-tier-name">' + esc(t.name) + '</span>'
            + '<span class="ps-tier-price">' + esc(t.price) + ' <small>' + esc(t.per) + '</small></span>'
            + '<ul>' + t.feats.map(function (f) {
              return '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>' + esc(f) + '</li>';
            }).join('') + '</ul>'
            + '<a class="ps-btn ps-btn-primary" href="#psStore">Choose ' + esc(t.name) + '</a></div>';
        }).join('');
      }

      var news = $('#psNewsGrid');
      if (news) {
        news.innerHTML = NEWS.map(function (n) {
          return '<a class="ps-news-card" href="#" style="--c:' + esc(n.c) + '">'
            + '<span class="ps-news-thumb" aria-hidden="true"></span>'
            + '<span class="ps-news-cat">' + esc(n.cat) + '</span>'
            + '<span class="ps-news-title">' + esc(n.title) + '</span>'
            + '<span class="ps-news-date">' + esc(n.date) + '</span></a>';
        }).join('');
      }

      /* ── rail carousel ──────────────────────────────────────────────── */
      var rail = $('[data-ps-rail]');
      var dotsEl = $('[data-ps-dots]');
      var pos = 0, max = 0, dragging = false, startX = 0, startPos = 0, moved = 0, vx = 0, lastX = 0, lastT = 0;
      var glideRaf = 0;

      function measure() { if (rail && track) max = Math.max(0, track.scrollWidth - rail.clientWidth); }
      function apply() {
        if (!track || !rail) return;
        pos = Math.max(-max, Math.min(0, pos));
        track.style.transform = 'translate3d(' + pos + 'px,0,0)';
        var card = track.firstElementChild;
        var w = card ? card.offsetWidth + 24 : 300;
        var per = Math.max(1, Math.round(rail.clientWidth / w));
        var pages = Math.max(1, Math.ceil(track.children.length / per));
        var idx = max ? Math.min(pages - 1, Math.round((-pos / max) * (pages - 1))) : 0;
        $$('.ps-dot-btn').forEach(function (d, i) { d.classList.toggle('on', i === idx); });
      }
      function stepBy(dir) {
        if (!track) return;
        var card = track.firstElementChild;
        var w = card ? card.offsetWidth + 24 : 300;
        pos += dir * -w * 2;
        track.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
        apply();
        window.setTimeout(function () { if (track) track.style.transition = ''; }, 520);
      }
      function glide() {
        if (Math.abs(vx) < 0.3 || dragging) return;
        pos += vx; vx *= 0.94; apply();
        glideRaf = raf(glide);
      }

      if (rail && dotsEl) {
        var card0 = track ? track.children.length : 0;
        dotsEl.innerHTML = '';
        var per0 = 4;
        var pages0 = Math.max(1, Math.ceil(card0 / per0));
        for (var i = 0; i < pages0; i++) {
          (function (n) {
            var b = document.createElement('button');
            b.type = 'button'; b.className = 'ps-dot-btn' + (n === 0 ? ' on' : '');
            b.setAttribute('aria-label', 'Go to slide ' + (n + 1));
            on(b, 'click', function () {
              measure();
              var card = track.firstElementChild;
              var w = card ? card.offsetWidth + 24 : 300;
              pos = -n * w * per0;
              track.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
              apply();
              window.setTimeout(function () { if (track) track.style.transition = ''; }, 520);
            });
            dotsEl.appendChild(b);
          })(i);
        }

        on(rail, 'pointerdown', function (e) {
          dragging = true; moved = 0; startX = e.clientX; startPos = pos; lastX = e.clientX; lastT = performance.now(); vx = 0;
          rail.classList.add('is-drag');
        });
        on(window, 'pointermove', function (e) {
          if (!dragging) return;
          pos = startPos + (e.clientX - startX);
          moved = Math.max(moved, Math.abs(e.clientX - startX));
          var t = performance.now();
          vx = ((e.clientX - lastX) / Math.max(1, t - lastT)) * 16;
          lastX = e.clientX; lastT = t;
          apply();
        });
        on(window, 'pointerup', function () {
          if (!dragging) return;
          dragging = false; rail.classList.remove('is-drag'); glide();
        });
        on(rail, 'click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
        on(rail, 'keydown', function (e) {
          if (e.key === 'ArrowRight') { e.preventDefault(); stepBy(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); stepBy(-1); }
        });
        on($('[data-ps-next]'), 'click', function () { stepBy(1); });
        on($('[data-ps-prev]'), 'click', function () { stepBy(-1); });
        if ('ResizeObserver' in window) {
          var ro = new ResizeObserver(function () { measure(); apply(); });
          ro.observe(rail);
          var ro2 = new ResizeObserver(function () { measure(); apply(); });
          ro2.observe(root);
          var dis = function () { try { ro.disconnect(); ro2.disconnect(); } catch (err) {} };
        }
        raf(function () { measure(); apply(); });
      }

      /* ── mobile menu ────────────────────────────────────────────────── */
      var burger = $('[data-ps-menu]');
      var drawer = $('[data-ps-drawer]');
      on(burger, 'click', function () {
        if (!drawer) return;
        var open = drawer.hidden;
        drawer.hidden = !open;
        burger.setAttribute('aria-expanded', String(open));
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) {} }
        if (glideRaf) cancelAnimationFrame(glideRaf);
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        if (typeof dis === 'function') dis();
      };
    }
  };
})();
