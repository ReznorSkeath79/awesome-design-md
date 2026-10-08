/* ══ SANITY — own layout behaviour for showcase.html ══════════════════════
   Registers window.OWN_LAYOUTS['sanity'].init(root). Renders the platform
   feature grid from data and reveals cards on scroll. Returns a cleanup fn. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var FEATURES = [
    {
      tag: 'Schema',
      title: 'Model once',
      body: 'Declare your operations entities once. Every dashboard, report, and downstream consumer reads the same structured graph.',
      art: '<svg viewBox="0 0 120 60" fill="none" aria-hidden="true"><rect x="8" y="10" width="30" height="40" rx="3" stroke="#353535"/><rect x="45" y="10" width="30" height="40" rx="3" stroke="#f36458"/><rect x="82" y="10" width="30" height="40" rx="3" stroke="#353535"/><path d="M38 24h7M75 24h7M38 38h7M75 38h7" stroke="#797979"/></svg>'
    },
    {
      tag: 'Realtime',
      title: 'Query live',
      body: 'A CDN-backed query API serves the current state of the floor at sub-40ms p95, with no cache to invalidate by hand.',
      art: '<svg viewBox="0 0 120 60" fill="none" aria-hidden="true"><path d="M6 46 26 30l18 8 20-20 18 12 26-18" stroke="#0052ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="88" cy="12" r="4" fill="#f36458"/></svg>'
    },
    {
      tag: 'Versioned',
      title: 'Roll back safely',
      body: 'Every edit is a revision. Diff a schema change, preview it against live data, and ship it with an audit trail.',
      art: '<svg viewBox="0 0 120 60" fill="none" aria-hidden="true"><circle cx="20" cy="30" r="7" stroke="#353535"/><circle cx="60" cy="30" r="7" stroke="#f36458"/><circle cx="100" cy="30" r="7" stroke="#353535"/><path d="M27 30h26M67 30h26" stroke="#797979"/></svg>'
    }
  ];

  OWN['sanity'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var observers = [];
      var rafs = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      function cardHTML(f) {
        return '<article class="sn-card sn-rv">'
          + '<span class="sn-card-tag sn-mono">' + f.tag + '</span>'
          + '<h3>' + f.title + '</h3>'
          + '<p>' + f.body + '</p>'
          + '<div class="sn-card-art">' + f.art + '</div>'
          + '</article>';
      }
      var grid = $('#snFeatureGrid');
      if (grid) grid.innerHTML = FEATURES.map(cardHTML).join('');

      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('sn-in'); io.unobserve(en.target); }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        observers.push(io);
      }
      $$('.sn-rv').forEach(function (el) { if (io) io.observe(el); else el.classList.add('sn-in'); });

      if (!reduced) {
        raf(function () {
          $$('.sn-chart span').forEach(function (s, i) {
            var h = s.style.getPropertyValue('--h');
            s.style.height = '6%';
            raf(function () { setTimeout(function () { if (!disposed) s.style.height = h; }, 60 + i * 60); });
          });
        });
      }

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
