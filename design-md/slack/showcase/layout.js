/* ══ SLACK — own layout behaviour for showcase.html ══════════════════════
   Registers window.OWN_LAYOUTS['slack'].init(root). Renders feature cards,
   the channel list and pricing tiers from data. Returns a cleanup fn. */

(function () {
  var OWN = (window.OWN_LAYOUTS = window.OWN_LAYOUTS || {});

  var FEATURES = [
    {
      title: 'Shared dashboards',
      body: 'Every region works from the same live boards. No more screenshotting a report into another thread.',
      art: '<svg viewBox="0 0 220 54" fill="none" aria-hidden="true"><rect x="4" y="8" width="64" height="38" rx="6" stroke="#4a154b"/><rect x="78" y="8" width="64" height="38" rx="6" stroke="#4a154b"/><rect x="152" y="8" width="64" height="38" rx="6" fill="#4a154b"/></svg>'
    },
    {
      title: 'Threaded alerts',
      body: 'Route throughput misses into a channel with context attached, so the fix happens where the work happens.',
      art: '<svg viewBox="0 0 220 54" fill="none" aria-hidden="true"><path d="M8 20h60M8 34h120M84 20h60" stroke="#1264a3" stroke-width="3" stroke-linecap="round"/><circle cx="192" cy="20" r="12" fill="#4a154b"/></svg>'
    },
    {
      title: 'Region channels',
      body: 'A channel per site, wired to the right people, metrics and escalation rules the moment it is created.',
      art: '<svg viewBox="0 0 220 54" fill="none" aria-hidden="true"><circle cx="40" cy="27" r="16" stroke="#4a154b"/><circle cx="110" cy="27" r="16" stroke="#4a154b"/><circle cx="180" cy="27" r="16" fill="#4a154b"/><path d="M56 27h38M126 27h38" stroke="#b9b9bb"/></svg>'
    }
  ];

  var CHANNELS = [
    ['throughput', '12 members', 'daily roll-up 09:00'],
    ['region-luzon', '8 members', 'target 4,200/hr'],
    ['region-visayas', '6 members', 'target 2,100/hr'],
    ['alerts', 'auto-routed', 'on-call rotation'],
    ['forecast', '4 members', 'next quarter model']
  ];

  var TIERS = [
    { name: 'Free', price: '$0', unit: '/mo', feats: ['1 region', 'Shared dashboards', 'Community support'], cta: 'Get started', feat: false },
    { name: 'Pro', price: '$8', unit: '/user/mo', feats: ['10 regions', 'Threaded alerts', '90-day history'], cta: 'Get started', feat: false },
    { name: 'Business+', price: '$15', unit: '/user/mo', feats: ['Unlimited regions', 'Forecast model', 'SSO + audit log'], cta: 'Get started', feat: true },
    { name: 'Enterprise', price: "Let's talk", unit: '', feats: ['Dedicated support', 'On-prem option', 'Custom SLAs'], cta: 'Contact sales', feat: false }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  OWN['slack'] = {
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
      function $(sel) { return root.querySelector(sel); }

      var grid = $('#slFeatureGrid');
      if (grid) grid.innerHTML = FEATURES.map(function (f) {
        return '<article class="sl-card"><div class="sl-card-art">' + f.art + '</div>'
          + '<h3>' + esc(f.title) + '</h3><p>' + esc(f.body) + '</p></article>';
      }).join('');

      var list = $('#slChannelList');
      if (list) list.innerHTML = CHANNELS.map(function (c) {
        return '<div class="sl-channel"><span class="sl-channel-hash">#</span>'
          + '<span class="sl-channel-name">' + esc(c[0]) + '</span>'
          + '<span class="sl-channel-meta">' + esc(c[1]) + ' · ' + esc(c[2]) + '</span></div>';
      }).join('');

      var tiers = $('#slTierGrid');
      if (tiers) tiers.innerHTML = TIERS.map(function (t) {
        return '<div class="sl-tier' + (t.feat ? ' sl-tier-feat' : '') + '">'
          + '<span class="sl-tier-name">' + esc(t.name) + '</span>'
          + '<span class="sl-tier-price">' + esc(t.price) + (t.unit ? ' <small>' + esc(t.unit) + '</small>' : '') + '</span>'
          + '<ul class="sl-tier-list">' + t.feats.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
          + '<a class="sl-pill ' + (t.feat ? 'sl-pill-light' : 'sl-pill-primary') + '" href="#">' + esc(t.cta) + '</a>'
          + '</div>';
      }).join('');

      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('sl-in'); io.unobserve(en.target); }
          });
        }, { threshold: 0.12 });
        observers.push(io);
        Array.prototype.slice.call(root.querySelectorAll('.sl-card, .sl-tier')).forEach(function (el) {
          el.classList.add('sl-rv'); io.observe(el);
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
