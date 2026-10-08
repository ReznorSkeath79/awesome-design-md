/* ══ INTERCOM — behaviour for the Northwind own layout ═════════════════════
   Renders the inbox list, channels, logo strip and FAQ, wires the billing
   tabs, the accordion, count-up, sticky nav, drawer and reveals. */

(function () {
  window.OWN_LAYOUTS = window.OWN_LAYOUTS || {};

  var INBOX = [
    { who: 'Mira Kessler', msg: 'Shipment 4412 is stuck at customs — can we re-route?', time: '9m', c: '#65b5ff', av: 'MK' },
    { who: 'Daniel Okafor', msg: 'Monthly revenue board looks off in APAC column.', time: '24m', c: '#0bdf50', av: 'DO' },
    { who: 'Lena Sørensen', msg: 'Need the vendor scorecard before the 2pm review.', time: '1h', c: '#ff2067', av: 'LS' },
    { who: 'Amir Haddad', msg: 'Fin answered my question — escalating for the refund.', time: '2h', c: '#b3e01c', av: 'AH' }
  ];
  var CHANNELS = [
    { name: 'Email', w: 74, c: '#65b5ff' },
    { name: 'Live chat', w: 52, c: '#ff5600' },
    { name: 'Phone', w: 30, c: '#03b2cb' },
    { name: 'Fin agent', w: 62, c: '#0bdf50' }
  ];
  var LOGOS = ['Aperture Foods', 'Vector Freight', 'Kestrel Bank', 'Halden Retail', 'Northgate Health', 'Miro Labs'];
  var FAQ = [
    { q: 'Can Northwind replace our current help desk?', a: 'Yes. Import your queues, macros, and tags, then run both side by side for as long as you like before switching over.' },
    { q: 'How does the Fin AI agent decide what to escalate?', a: 'You set the rules and confidence thresholds. Fin resolves the repeat questions and hands the rest to a human with the full conversation attached.' },
    { q: 'Where is our data stored?', a: 'Your choice of region — US, EU, or APAC — with residency guarantees on the Expert plan and an immutable audit log.' },
    { q: 'Is there an API?', a: 'Everything in the UI is available over a REST and webhook API, including tickets, contacts, and reporting events.' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.OWN_LAYOUTS['intercom'] = {
    init: function (root) {
      var reduced = false;
      try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }

      var AC = window.AbortController ? new AbortController() : null;
      var signal = AC ? AC.signal : undefined;
      var disposed = false;
      var rafs = [];
      var observers = [];

      function on(el, type, fn, opt) {
        if (!el) return;
        opt = Object.assign({}, opt || {});
        if (signal) opt.signal = signal;
        el.addEventListener(type, fn, opt);
      }
      function raf(fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; }
      function $(sel) { return root.querySelector(sel); }
      function $$(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

      /* ── inbox list ────────────────────────────────────────────────── */
      var list = $('#intercomList');
      if (list) {
        list.innerHTML = INBOX.map(function (m) {
          return '<li class="mi">'
            + '<span class="mi-av" style="background:' + m.c + '">' + esc(m.av) + '</span>'
            + '<span class="mi-body"><b>' + esc(m.who) + '</b><span>' + esc(m.msg) + '</span></span>'
            + '<span class="mi-time">' + esc(m.time) + '</span>'
            + '</li>';
        }).join('');
      }

      /* ── channels ──────────────────────────────────────────────────── */
      var ch = $('#intercomChannels');
      if (ch) {
        ch.innerHTML = CHANNELS.map(function (c) {
          return '<li><span class="mr-top"><span>' + esc(c.name) + '</span><b>' + c.w + '%</b></span>'
            + '<span class="mr-bar"><i style="--w:' + c.w + '%;--c:' + c.c + '"></i></span></li>';
        }).join('');
      }

      /* ── logos ─────────────────────────────────────────────────────── */
      var logos = $('#intercomLogos');
      if (logos) {
        logos.innerHTML = '<span class="logos-cap">Trusted by support and operations teams at</span>'
          + LOGOS.map(function (n) { return '<span class="lg">' + esc(n) + '</span>'; }).join('');
      }

      /* ── FAQ accordion ─────────────────────────────────────────────── */
      var faq = $('#intercomFaqList');
      if (faq) {
        faq.innerHTML = FAQ.map(function (f, i) {
          return '<div class="faq-item' + (i === 0 ? ' open' : '') + '">'
            + '<button class="faq-q" type="button" aria-expanded="' + (i === 0) + '">' + esc(f.q)
            + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>'
            + '<div class="faq-a"><div><p>' + esc(f.a) + '</p></div></div>'
            + '</div>';
        }).join('');
      }

      /* ── billing tabs ──────────────────────────────────────────────── */
      var MONTH = { '29': 29, '85': 85, '132': 132 };
      var ANNUAL = { '29': 24, '85': 71, '132': 110 };
      $$('[data-cycle]').forEach(function (tab) {
        on(tab, 'click', function () {
          var cycle = tab.dataset.cycle;
          $$('[data-cycle]').forEach(function (t) {
            var isOn = t === tab;
            t.classList.toggle('on', isOn);
            t.setAttribute('aria-selected', String(isOn));
          });
          $$('[data-price]').forEach(function (el) {
            el.textContent = '$' + (cycle === 'annual' ? ANNUAL : MONTH)[el.dataset.price];
          });
        });
      });

      /* ── count-up ──────────────────────────────────────────────────── */
      function countTo(el, to, ms, suffix) {
        if (reduced) { el.textContent = Math.round(to).toLocaleString('en-US') + suffix; return; }
        var from = 0, t0 = null;
        function step(t) {
          if (disposed) return;
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 4);
          el.textContent = Math.round(from + (to - from) * e).toLocaleString('en-US') + suffix;
          if (k < 1) raf(step);
        }
        raf(step);
      }

      /* ── reveals ───────────────────────────────────────────────────── */
      var io = null;
      if (!reduced && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              if (en.target.dataset.count) countTo(en.target, Number(en.target.dataset.count), 1100, en.target.dataset.suffix || '');
              io.unobserve(en.target);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
        observers.push(io);
      }
      $$('[data-reveal]').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });
      $$('[data-count]').forEach(function (el) {
        if (io) io.observe(el);
        else el.textContent = Number(el.dataset.count).toLocaleString('en-US') + (el.dataset.suffix || '');
      });

      /* ── sticky nav + drawer ───────────────────────────────────────── */
      var nav = $('#intercomNav');
      function onScroll() {
        if (disposed || !nav) return;
        nav.classList.toggle('is-stuck', root.getBoundingClientRect().top < -8);
      }
      on(window, 'scroll', onScroll, { passive: true });
      onScroll();

      var toggle = $('[data-nav-toggle]');
      var drawer = $('[data-nav-drawer]');
      on(toggle, 'click', function () {
        if (!drawer) return;
        var next = drawer.hidden;
        drawer.hidden = !next;
        toggle.setAttribute('aria-expanded', String(next));
      });

      /* ── faq clicks ────────────────────────────────────────────────── */
      on(faq, 'click', function (e) {
        var btn = e.target.closest('.faq-q');
        if (!btn) return;
        var item = btn.closest('.faq-item');
        var isOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });

      /* ── smooth scroll ─────────────────────────────────────────────── */
      $$('a[href^="#"]').forEach(function (a) {
        on(a, 'click', function (e) {
          var href = a.getAttribute('href');
          if (!href || href.length < 2) return;
          var target = root.querySelector(href);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          if (drawer && !drawer.hidden) { drawer.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
        });
      });

      return function cleanup() {
        disposed = true;
        if (AC) { try { AC.abort(); } catch (e) { /* ignore */ } }
        rafs.forEach(function (id) { cancelAnimationFrame(id); });
        observers.forEach(function (o) { try { o.disconnect(); } catch (e) { /* ignore */ } });
      };
    }
  };
})();
