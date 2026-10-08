window.OWN_BUNDLES=window.OWN_BUNDLES||{};window.OWN_BUNDLES["vera-hub"]={html:"<div class=\"own-vera-hub\">\n  <div class=\"vh-shell\" id=\"vhShell\">\n    <!-- ── TOP BAR — brand tile, primary links, search, bell, avatar ─────── -->\n    <header class=\"vh-topnav\">\n      <a class=\"vh-logo\" href=\"#\" aria-label=\"AutoAlchemy Hub home\">\n        <span class=\"vh-logo-mark\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\">\n            <rect x=\"4\" y=\"6\" width=\"3.4\" height=\"12\" rx=\"1.4\" fill=\"#7FD4FF\"></rect>\n            <rect x=\"10.3\" y=\"4\" width=\"3.4\" height=\"16\" rx=\"1.4\" fill=\"#7FD4FF\"></rect>\n            <rect x=\"16.6\" y=\"8\" width=\"3.4\" height=\"8\" rx=\"1.4\" fill=\"#E8434A\"></rect>\n          </svg>\n        </span>\n        <span class=\"vh-logo-word\">AutoAlchemy Hub</span>\n        <span class=\"vh-logo-short\">Hub</span>\n      </a>\n\n      <nav class=\"vh-app-links\" aria-label=\"Primary\">\n        <a class=\"vh-app-link on\" href=\"#\" aria-current=\"page\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M3 10.5 12 3l9 7.5\"></path><path d=\"M5 9.5V21h14V9.5\"></path><path d=\"M9 21v-6h6v6\"></path></svg>\n          Home\n        </a>\n        <a class=\"vh-app-link\" href=\"#\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 20V5a1 1 0 0 1 1-1h6l2 2h6a1 1 0 0 1 1 1v13z\"></path></svg>\n          Projects\n        </a>\n        <a class=\"vh-app-link\" href=\"#\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 4l16 8-16 8 3-8z\"></path></svg>\n          Requests\n        </a>\n        <a class=\"vh-app-link\" href=\"#\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle></svg>\n          Review\n        </a>\n        <button class=\"vh-app-link vh-app-link--learn\" type=\"button\" aria-haspopup=\"menu\" aria-expanded=\"false\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 19V6l8-3 8 3v13\"></path><path d=\"M9 19v-4h6v4\"></path></svg>\n          Learn\n          <svg class=\"vh-caret\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m6 9 6 6 6-6\"></path></svg>\n        </button>\n      </nav>\n\n      <div class=\"vh-topnav-right\">\n        <button class=\"vh-searchbar\" type=\"button\" aria-label=\"Search the Hub\">\n          <span class=\"vh-searchbar-ic\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 24 24\"><circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"m20 20-3.5-3.5\"></path></svg>\n          </span>\n          <span class=\"vh-searchbar-place\">Search the Hub</span>\n          <kbd class=\"vh-searchbar-kbd\" aria-hidden=\"true\">⌘K</kbd>\n        </button>\n        <button class=\"vh-icon-btn vh-search-icon-btn\" type=\"button\" aria-label=\"Search the Hub\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"m20 20-3.5-3.5\"></path></svg>\n        </button>\n        <button class=\"vh-icon-btn vh-bell\" type=\"button\" aria-label=\"Notifications, 3 unread\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6\"></path><path d=\"M10 19a2 2 0 0 0 4 0\"></path></svg>\n          <span class=\"vh-badge\">3</span>\n          <span class=\"vh-needdot\" aria-hidden=\"true\"></span>\n        </button>\n        <button class=\"vh-avatar\" type=\"button\" title=\"Mika Navarro\">MN</button>\n      </div>\n    </header>\n\n    <!-- ── LEFT RAIL — grouped sections, active marker, collapse ─────────── -->\n    <nav class=\"vh-rail\" id=\"vhRail\" aria-label=\"Sections\">\n      <div class=\"vh-rail-scroll\">\n        <span class=\"vh-rail-marker\" id=\"vhMarker\" aria-hidden=\"true\"></span>\n        <div id=\"vhRailGroups\"></div>\n      </div>\n      <div class=\"vh-rail-foot\">\n        <div class=\"vh-rail-foot-nav\">\n          <a class=\"vh-rail-item vh-rail-item--foot\" href=\"#\">\n            <span class=\"vh-rail-icon\" aria-hidden=\"true\">\n              <svg viewBox=\"0 0 24 24\"><path d=\"M12 5a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 0 3 3 0 0 0 2-5 3 3 0 0 0-2-5 3 3 0 0 0-3-3z\"></path></svg>\n            </span>\n            <span class=\"vh-rail-label\">Brain</span>\n          </a>\n          <a class=\"vh-rail-item vh-rail-item--foot\" href=\"#\">\n            <span class=\"vh-rail-icon\" aria-hidden=\"true\">\n              <svg viewBox=\"0 0 24 24\"><path d=\"M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12z\"></path></svg>\n            </span>\n            <span class=\"vh-rail-label\">Feedback</span>\n          </a>\n        </div>\n        <button class=\"vh-rail-toggle\" id=\"vhRailToggle\" type=\"button\" aria-expanded=\"true\" aria-controls=\"vhRail\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"></rect><path d=\"M9 4v16\"></path><path d=\"m16 10-2 2 2 2\"></path></svg>\n          <span class=\"vh-rail-toggle-word\">Collapse</span>\n        </button>\n        <span class=\"vh-rail-version\">Hub · 0.5</span>\n      </div>\n    </nav>\n\n    <!-- ── MAIN — the Dashboard page ──────────────────────────────────────── -->\n    <main class=\"vh-main\">\n      <button class=\"vh-sections-btn\" id=\"vhSections\" type=\"button\" aria-controls=\"vhRail\" aria-expanded=\"false\">\n        <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"></rect><path d=\"M9 4v16\"></path></svg>\n        Sections\n      </button>\n\n      <div class=\"vh-page\">\n        <!-- hero well: greeting, clock, actions, header core, KPI rail, ticker -->\n        <header class=\"vh-hero\">\n          <div class=\"vh-hero-top\">\n            <div class=\"vh-hero-left\">\n              <span class=\"vh-eyebrow\">Home · Today</span>\n              <h1 id=\"vhGreeting\">Good afternoon, <span class=\"vh-grad\">Mika</span></h1>\n              <p class=\"vh-hero-date\">2026-10-08 · Manila\n                <span class=\"vh-hero-clock\" id=\"vhClock\">\n                  <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 7v5l3 2\"></path></svg>\n                  17:42 PHT\n                </span>\n              </p>\n              <div class=\"vh-hero-actions\">\n                <a class=\"vh-btn vh-btn--secondary\" href=\"#\">New request</a>\n                <button class=\"vh-btn vh-btn--primary\" type=\"button\">New task</button>\n              </div>\n            </div>\n            <div class=\"vh-hero-right\" id=\"vhCore\"></div>\n          </div>\n\n          <div class=\"vh-kpi-rail\" id=\"vhKpi\"></div>\n\n          <div class=\"vh-fact\" aria-hidden=\"true\"><div class=\"vh-fact-track\" id=\"vhFact\"></div></div>\n        </header>\n\n        <!-- the one 12-column Home grid -->\n        <div class=\"vh-grid\">\n          <section class=\"vh-sec vh-focus\" aria-labelledby=\"vhFocusH\">\n            <div class=\"vh-sh\" data-rv>\n              <span class=\"vh-sh-num\" aria-hidden=\"true\"></span>\n              <div class=\"vh-sh-txt\">\n                <div class=\"vh-sh-eyebrow\">Today</div>\n                <h2 class=\"vh-sh-title\" id=\"vhFocusH\">Your <span class=\"vh-grad\">focus</span></h2>\n              </div>\n              <div class=\"vh-sh-aside\"><a class=\"vh-morelink\" href=\"#\">See all <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\"></path></svg></a></div>\n            </div>\n            <div class=\"vh-card\" id=\"vhFocus\"></div>\n          </section>\n\n          <section class=\"vh-sec vh-needs\" aria-labelledby=\"vhNeedsH\">\n            <div class=\"vh-sh\" data-rv>\n              <span class=\"vh-sh-num\" aria-hidden=\"true\"></span>\n              <div class=\"vh-sh-txt\">\n                <div class=\"vh-sh-eyebrow\">Waiting</div>\n                <h2 class=\"vh-sh-title\" id=\"vhNeedsH\">Needs <span class=\"vh-grad\">you</span></h2>\n              </div>\n              <div class=\"vh-sh-aside\"><a class=\"vh-morelink\" href=\"#\">See all <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\"></path></svg></a></div>\n            </div>\n            <div class=\"vh-card\" id=\"vhNeeds\"></div>\n          </section>\n\n          <section class=\"vh-sec vh-projects\" aria-labelledby=\"vhProjH\">\n            <div class=\"vh-sh\" data-rv>\n              <span class=\"vh-sh-num\" aria-hidden=\"true\"></span>\n              <div class=\"vh-sh-txt\">\n                <div class=\"vh-sh-eyebrow\">In flight</div>\n                <h2 class=\"vh-sh-title\" id=\"vhProjH\">Your <span class=\"vh-grad\">projects</span></h2>\n              </div>\n              <div class=\"vh-sh-aside\"><a class=\"vh-morelink\" href=\"#\">All projects <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\"></path></svg></a></div>\n            </div>\n            <div class=\"vh-card vh-card--flat\" id=\"vhProjects\"></div>\n          </section>\n\n          <section class=\"vh-sec vh-activity\" aria-labelledby=\"vhActH\">\n            <div class=\"vh-sh\" data-rv>\n              <span class=\"vh-sh-num\" aria-hidden=\"true\"></span>\n              <div class=\"vh-sh-txt\">\n                <div class=\"vh-sh-eyebrow\">Latest</div>\n                <h2 class=\"vh-sh-title\" id=\"vhActH\">Recent <span class=\"vh-grad\">activity</span></h2>\n              </div>\n              <div class=\"vh-sh-aside\"><span class=\"vh-note\" id=\"vhActCount\"></span></div>\n            </div>\n            <div class=\"vh-card vh-card--flat\" id=\"vhActivity\"></div>\n          </section>\n        </div>\n      </div>\n    </main>\n  </div>\n</div>\n",css:"/* ══ VERA HUB — the AutoAlchemy Hub shell + Dashboard, ported ══════════════\n   The live look of the Hub app (Corp Dark) from production\n   autoalchmey_tracker-incentive/app/src:\n     · theme-corp.css  (tokens, canvas, shell frame, top bar, rail, KPI well,\n                        table, buttons, chips, motion — the corp layer)\n     · kit.css         (the shell grid + base components)\n     · shell/ShellFrame.tsx · shell/ShellRail.tsx · shell/ShellTopbar.tsx\n     · pages/Dashboard.tsx + Dashboard.module.css\n     · theme-signature.css (the OVCC signature layer, always on: Michroma\n                        gradient title, hollow numerals, spotlight glass,\n                        glowing KPI base bar, fact ticker, ring-gauge core)\n   Everything is scoped under `.own-vera-hub`; production media queries become\n   `@container frame (max-width: …)` and `vw` becomes `cqi`. Corp Dark only. */\n\n@property --vh-angle {\n  syntax: '<angle>';\n  initial-value: 0deg;\n  inherits: false;\n}\n\n.own-vera-hub {\n  /* ── Corp Dark tokens (theme-corp.css [data-theme='corp-dark']) ────────── */\n  --vh-canvas: #010d16;\n  --vh-bar: #04141f;\n  --vh-shell: #03121c;\n  --vh-card: #04141f;\n  --vh-card-hi: #0a2233;\n  --vh-text0: #dceef9;\n  --vh-text1: #b9d2e0;\n  --vh-text2: #9fc2d6;\n  --vh-text3: #7fa3b8;\n\n  --vh-accent: #7fd4ff;\n  --vh-accent2: #a5e2ff;\n  --vh-on-accent: #01141f;\n  --vh-accent-soft: rgba(127, 212, 255, 0.12);\n  --vh-accent-glow: rgba(127, 212, 255, 0.3);\n\n  --vh-border: rgba(255, 255, 255, 0.09);\n  --vh-line2: rgba(255, 255, 255, 0.05);\n  --vh-border-hot: rgba(127, 212, 255, 0.4);\n  --vh-well-line: rgba(0, 0, 0, 0.35);\n  --vh-brand-tile: #0e2230;\n\n  --vh-ok: #7fd4ff;\n  --vh-warn: #e8b54d;\n  --vh-crit: #e8434a;\n  --vh-ok-ink: #7fd4ff;\n  --vh-warn-ink: #e8b54d;\n  --vh-crit-ink: #e8434a;\n\n  /* surface gradients (\"lit surfaces\", brief §Gradients) */\n  --vh-sh-canvas: radial-gradient(1200px 700px at 12% -10%, rgba(127, 212, 255, 0.12), transparent 60%),\n    radial-gradient(900px 600px at 95% 110%, rgba(232, 181, 77, 0.05), transparent 60%),\n    linear-gradient(180deg, #021420 0%, #010a11 100%);\n  --vh-sh-shell: radial-gradient(900px 420px at 0% 0%, rgba(127, 212, 255, 0.06), transparent 70%),\n    linear-gradient(180deg, #05192a 0%, #03111b 100%);\n  --vh-sh-bar: linear-gradient(180deg, #071d2c 0%, #04141f 100%);\n  --vh-sh-card: linear-gradient(180deg, #0a2233 0%, #051826 55%, #04141f 100%);\n  --vh-sh-tile: linear-gradient(180deg, #0c2638 0%, #061a28 100%);\n  --vh-sh-well: linear-gradient(180deg, #00070d 0%, #010d16 40%, #021320 100%);\n  --vh-sh-accent: linear-gradient(180deg, #a5e2ff 0%, #7fd4ff 100%);\n  --vh-sh-sel: linear-gradient(160deg, #b4cddb 0%, #9cb9ca 55%, #8aaabd 100%);\n\n  /* signature gradient (theme-signature.css) */\n  --vh-grad: linear-gradient(120deg, #7fd4ff 0%, #6cdcff 45%, #aaa6ff 100%);\n  --vh-num-stroke: rgba(127, 212, 255, 0.42);\n  --vh-grad1: #7fd4ff;\n  --vh-grad3: #6cdcff;\n\n  /* elevation (brief §Elevation & Depth) */\n  --vh-sh-card: 0 10px 26px rgba(0, 0, 0, 0.45);\n  --vh-sh-tile: 0 6px 16px rgba(0, 0, 0, 0.4);\n  --vh-sh-tile-hi: 0 12px 26px rgba(0, 0, 0, 0.55);\n  --vh-sh-menu: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04);\n  --vh-well-inset: inset 0 2px 6px rgba(0, 0, 0, 0.55), inset 0 -1px 0 rgba(255, 255, 255, 0.03);\n  --vh-sh-shell: 0 40px 100px rgba(0, 0, 0, 0.6);\n\n  /* radius ladder (brief §radius) */\n  --vh-r-ctl: 10px;\n  --vh-r-sub: 12px;\n  --vh-r-card: 14px;\n  --vh-r-hero: 18px;\n  --vh-r-shell: 28px;\n  --vh-r-pill: 999px;\n\n  --vh-grot: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;\n  --vh-mono: 'JetBrains Mono', 'Inter', ui-monospace, Menlo, Consolas, monospace;\n  --vh-display: 'Michroma', 'Inter', system-ui, sans-serif;\n  --vh-ease: cubic-bezier(0.22, 1, 0.36, 1);\n\n  position: relative;\n  border-radius: 13px;\n  background: var(--vh-canvas);\n  color: var(--vh-text0);\n  font-family: var(--vh-grot);\n  font-size: 15px;\n  line-height: 1.6;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-numeric: tabular-nums;\n  text-align: left;\n}\n.own-vera-hub *,\n.own-vera-hub *::before,\n.own-vera-hub *::after { box-sizing: border-box; }\n.own-vera-hub p { margin: 0; }\n.own-vera-hub a { text-decoration: none; color: inherit; }\n.own-vera-hub button { cursor: pointer; }\n.own-vera-hub svg { display: block; }\n.own-vera-hub :focus-visible { outline: 2px solid var(--vh-accent); outline-offset: 2px; border-radius: 4px; }\n\n/* ambient dual radial glow behind the floating shell */\n.own-vera-hub {\n  padding: 0;\n  background: var(--vh-sh-canvas);\n}\n\n/* ── the shell frame: floats on the canvas, pinned to the viewport ───────── */\n.own-vera-hub .vh-shell {\n  position: relative;\n  max-width: 1472px;\n  margin: 20px auto;\n  height: calc(100dvh - 40px);\n  min-height: 600px;\n  display: grid;\n  grid-template-columns: 240px minmax(0, 1fr);\n  grid-template-rows: auto minmax(0, 1fr);\n  grid-template-areas: 'nav nav' 'rail main';\n  background: var(--vh-sh-shell);\n  border: 1px solid var(--vh-border);\n  border-radius: var(--vh-r-shell);\n  box-shadow: var(--vh-sh-shell);\n  overflow: hidden;\n  transition: grid-template-columns var(--vh-ease);\n}\n.own-vera-hub .vh-shell[data-rail='collapsed'] { grid-template-columns: 68px minmax(0, 1fr); }\n\n/* ── top bar (ShellTopbar) ────────────────────────────────────────────────── */\n.own-vera-hub .vh-topnav {\n  grid-area: nav;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  min-height: 64px;\n  padding: 10px 24px;\n  background: var(--vh-sh-bar);\n  border-bottom: 1px solid var(--vh-border);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  z-index: 30;\n}\n.own-vera-hub .vh-logo {\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  flex: none;\n  font-family: var(--vh-display);\n  font-size: 15px;\n  letter-spacing: 0.04em;\n  color: var(--vh-text0);\n}\n.own-vera-hub .vh-logo-mark {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  flex: none;\n  border-radius: var(--vh-r-sub);\n  background: var(--vh-brand-tile);\n  box-shadow: 0 8px 22px -10px rgba(14, 34, 48, 0.6);\n}\n.own-vera-hub .vh-logo-word { font-family: var(--vh-display); font-size: 15px; letter-spacing: 0.04em; }\n.own-vera-hub .vh-logo-short { display: none; font-family: var(--vh-display); font-size: 15px; }\n\n.own-vera-hub .vh-app-links { display: flex; align-items: center; gap: 8px; margin-left: 8px; min-width: 0; }\n.own-vera-hub .vh-app-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 11px;\n  border-radius: var(--vh-r-ctl);\n  border: 1px solid transparent;\n  background: transparent;\n  color: var(--vh-text1);\n  font-family: var(--vh-grot);\n  font-size: 13px;\n  font-weight: 500;\n  white-space: nowrap;\n  transition: background var(--vh-ease), color var(--vh-ease), border-color var(--vh-ease);\n}\n.own-vera-hub .vh-app-link svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-app-link:hover { background: var(--vh-card-hi); color: var(--vh-text0); }\n.own-vera-hub .vh-app-link.on {\n  color: var(--vh-text0);\n  background: var(--vh-sh-card);\n  border-color: var(--vh-border);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), 0 8px 20px -6px rgba(0, 0, 0, 0.7);\n}\n.own-vera-hub .vh-caret { width: 12px; height: 12px; }\n\n.own-vera-hub .vh-topnav-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-left: auto;\n  color: var(--vh-text2);\n}\n.own-vera-hub .vh-searchbar {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  width: 260px;\n  flex: none;\n  height: 34px;\n  padding: 0 10px 0 12px;\n  border: 1px solid var(--vh-border);\n  border-radius: var(--vh-r-pill);\n  background: var(--vh-sh-well);\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);\n  color: var(--vh-text2);\n  transition: border-color var(--vh-ease);\n}\n.own-vera-hub .vh-searchbar:hover { border-color: var(--vh-border-hot); }\n.own-vera-hub .vh-searchbar-ic svg { width: 16px; height: 16px; fill: none; stroke: var(--vh-text2); stroke-width: 1.75; stroke-linecap: round; }\n.own-vera-hub .vh-searchbar-place {\n  flex: 1;\n  min-width: 0;\n  text-align: left;\n  font-size: 13px;\n  color: var(--vh-text3);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.own-vera-hub .vh-searchbar-kbd {\n  display: inline-flex;\n  align-items: center;\n  flex: none;\n  padding: 2px 6px;\n  border: 1px solid var(--vh-border);\n  border-radius: 6px;\n  background: var(--vh-card);\n  color: var(--vh-text2);\n  font-family: var(--vh-mono);\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 1;\n}\n.own-vera-hub .vh-icon-btn {\n  position: relative;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border: 1px solid var(--vh-border);\n  border-radius: var(--vh-r-ctl);\n  background: var(--vh-card);\n  color: var(--vh-text1);\n  transition: background var(--vh-ease), border-color var(--vh-ease);\n}\n.own-vera-hub .vh-icon-btn:hover { background: var(--vh-card-hi); border-color: var(--vh-border-hot); }\n.own-vera-hub .vh-icon-btn svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-bell { display: inline-flex; }\n.own-vera-hub .vh-badge {\n  position: absolute;\n  top: -5px;\n  right: -5px;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--vh-r-pill);\n  border: 2px solid var(--vh-bar);\n  background: var(--vh-crit);\n  color: #fff;\n  font-family: var(--vh-mono);\n  font-size: 9.5px;\n  font-weight: 700;\n  font-variant-numeric: tabular-nums;\n}\n.own-vera-hub .vh-needdot {\n  position: absolute;\n  right: 4px;\n  bottom: 4px;\n  width: 8px;\n  height: 8px;\n  border-radius: var(--vh-r-pill);\n  background: var(--vh-crit);\n  border: 1.5px solid var(--vh-bar);\n  box-shadow: 0 0 6px rgba(232, 67, 74, 0.7);\n  pointer-events: none;\n}\n.own-vera-hub .vh-avatar {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  flex: none;\n  border-radius: var(--vh-r-pill);\n  border: 1px solid var(--vh-border);\n  background: linear-gradient(135deg, var(--vh-card-hi), var(--vh-card));\n  color: var(--vh-text0);\n  font-family: var(--vh-grot);\n  font-size: 12px;\n  font-weight: 600;\n}\n\n/* ── left rail (ShellRail) ────────────────────────────────────────────────── */\n.own-vera-hub .vh-rail {\n  grid-area: rail;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--vh-bar);\n  border-right: 1px solid var(--vh-border);\n  padding: 12px 10px;\n  overflow: hidden;\n}\n.own-vera-hub .vh-rail-scroll {\n  position: relative;\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n}\n.own-vera-hub .vh-rail-marker {\n  position: absolute;\n  left: -10px;\n  top: 0;\n  width: 3px;\n  border-radius: var(--vh-r-pill);\n  background: var(--vh-accent);\n  box-shadow: 0 0 12px var(--vh-accent-glow);\n  pointer-events: none;\n  transition: transform 260ms var(--vh-ease), height 220ms var(--vh-ease), opacity 200ms;\n}\n.own-vera-hub .vh-rail-group { padding: 6px 0; border-bottom: 1px solid var(--vh-line2); }\n.own-vera-hub .vh-rail-group:last-of-type { border-bottom: 0; }\n.own-vera-hub .vh-rail-group-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 8px;\n  padding: 12px 10px 6px;\n  border: 0;\n  background: none;\n  border-radius: var(--vh-r-sub);\n  color: var(--vh-text3);\n  font-family: var(--vh-mono);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  transition: color var(--vh-ease);\n}\n.own-vera-hub .vh-rail-group-head:hover { color: var(--vh-text0); }\n.own-vera-hub .vh-rail-group-head.has-active { color: var(--vh-accent); }\n.own-vera-hub .vh-rail-group-chevron { display: inline-flex; flex: none; transition: transform var(--vh-ease); }\n.own-vera-hub .vh-rail-group-chevron svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-rail-group-chevron.collapsed { transform: rotate(-90deg); }\n.own-vera-hub .vh-rail-group-items { display: flex; flex-direction: column; gap: 2px; overflow: hidden; }\n.own-vera-hub .vh-rail-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  min-height: 40px;\n  padding: 8px 10px;\n  border-radius: var(--vh-r-sub);\n  color: var(--vh-text2);\n  font-family: var(--vh-grot);\n  font-size: 13px;\n  font-weight: 500;\n  text-align: left;\n  transition: background var(--vh-ease), color var(--vh-ease), transform var(--vh-ease);\n}\n.own-vera-hub .vh-rail-item:hover { background: var(--vh-card-hi); color: var(--vh-text0); transform: translateX(4px); }\n.own-vera-hub .vh-rail-icon { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; flex: none; border-radius: 8px; color: var(--vh-text2); }\n.own-vera-hub .vh-rail-icon svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-rail-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.own-vera-hub .vh-rail-count {\n  margin-left: auto;\n  flex: none;\n  min-width: 20px;\n  padding: 1px 7px;\n  border-radius: var(--vh-r-pill);\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--vh-text2);\n  font-family: var(--vh-mono);\n  font-size: 10px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  text-align: center;\n}\n.own-vera-hub .vh-rail-item[aria-current] { background: var(--vh-accent-soft); color: var(--vh-text0); font-weight: 600; }\n.own-vera-hub .vh-rail-item[aria-current] .vh-rail-icon { color: var(--vh-accent); }\n.own-vera-hub .vh-rail-item[aria-current] .vh-rail-count { background: var(--vh-accent-soft); color: var(--vh-accent); }\n.own-vera-hub .vh-rail-foot {\n  flex: none;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 10px 0 2px;\n  border-top: 1px solid var(--vh-line2);\n}\n.own-vera-hub .vh-rail-foot-nav { display: flex; flex-direction: column; gap: 2px; }\n.own-vera-hub .vh-rail-item--foot { min-height: 36px; font-size: 12.5px; color: var(--vh-text3); }\n.own-vera-hub .vh-rail-toggle {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  min-height: 34px;\n  padding: 6px 10px;\n  border: 0;\n  background: none;\n  border-radius: var(--vh-r-sub);\n  color: var(--vh-text3);\n  font-family: var(--vh-mono);\n  font-size: 10px;\n  letter-spacing: 1.4px;\n  text-transform: uppercase;\n  transition: background var(--vh-ease), color var(--vh-ease);\n}\n.own-vera-hub .vh-rail-toggle:hover { background: var(--vh-card-hi); color: var(--vh-text0); }\n.own-vera-hub .vh-rail-toggle svg { width: 16px; height: 16px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-rail-version {\n  padding: 6px 10px 0;\n  font-family: var(--vh-mono);\n  font-size: 10px;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: var(--vh-text3);\n}\n.own-vera-hub .vh-rail-tooltip {\n  position: absolute;\n  z-index: 60;\n  transform: translateY(-50%);\n  padding: 7px 10px;\n  border-radius: var(--vh-r-ctl);\n  background: var(--vh-bar);\n  color: var(--vh-text0);\n  border: 1px solid var(--vh-border);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);\n  font-size: 12px;\n  font-weight: 500;\n  white-space: nowrap;\n  pointer-events: none;\n}\n\n/* collapsed rail — icon only, labels + group heads hidden */\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail { padding: 12px 8px; }\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-marker { left: 0; }\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-item { justify-content: center; padding: 8px; gap: 0; }\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-item:hover { transform: none; }\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-label,\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-count,\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-group-label,\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-group-chevron { display: none; }\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-group-head { display: flex; justify-content: center; padding: 8px 0; }\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-group-head::after { content: ''; width: 26px; height: 1px; background: var(--vh-line2); }\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-toggle { justify-content: center; padding: 6px; }\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-toggle-word,\n.own-vera-hub .vh-shell[data-rail='collapsed'] .vh-rail-version { display: none; }\n\n/* ── main column ─────────────────────────────────────────────────────────── */\n.own-vera-hub .vh-main {\n  grid-area: main;\n  min-width: 0;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  padding: 28px 32px 44px;\n}\n.own-vera-hub .vh-main::-webkit-scrollbar,\n.own-vera-hub .vh-rail-scroll::-webkit-scrollbar { width: 10px; }\n.own-vera-hub .vh-main::-webkit-scrollbar-thumb,\n.own-vera-hub .vh-rail-scroll::-webkit-scrollbar-thumb {\n  background: #486a80;\n  border-radius: 999px;\n  border: 3px solid transparent;\n  background-clip: content-box;\n}\n.own-vera-hub .vh-sections-btn { display: none; }\n\n/* ── hero well (Dashboard home header core + KPI rail + fact ticker) ─────── */\n.own-vera-hub .vh-hero {\n  position: relative;\n  background: var(--vh-sh-well);\n  border: 1px solid var(--vh-well-line);\n  border-radius: 22px;\n  padding: 26px;\n  box-shadow: var(--vh-well-inset), var(--vh-sh-card);\n  overflow: hidden;\n}\n.own-vera-hub .vh-hero::before {\n  content: '';\n  position: absolute;\n  inset: -1.5px;\n  padding: 1.5px;\n  border-radius: inherit;\n  background: conic-gradient(from var(--vh-angle), transparent 0deg, transparent 210deg, var(--vh-accent) 280deg, var(--vh-accent2) 310deg, transparent 360deg);\n  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);\n  -webkit-mask-composite: xor;\n  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);\n  mask-composite: exclude;\n  opacity: 0.55;\n  animation: vh-crawl 7s linear infinite;\n  pointer-events: none;\n}\n@keyframes vh-crawl { to { --vh-angle: 360deg; } }\n\n.own-vera-hub .vh-hero-top { position: relative; z-index: 1; display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; }\n.own-vera-hub .vh-eyebrow { display: inline-block; font-family: var(--vh-mono); font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--vh-text2); }\n.own-vera-hub .vh-hero h1 { margin: 6px 0 4px; font-family: var(--vh-display); font-weight: 400; font-size: clamp(26px, 3.2cqi, 40px); letter-spacing: -0.02em; line-height: 1.1; color: var(--vh-text0); }\n.own-vera-hub .vh-grad { background: var(--vh-grad); -webkit-background-clip: text; background-clip: text; color: transparent; }\n.own-vera-hub .vh-hero-date {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 12px;\n  font-family: var(--vh-mono);\n  font-size: 12px;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--vh-text2);\n}\n.own-vera-hub .vh-hero-clock { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 18px; letter-spacing: 0.04em; color: var(--vh-text1); }\n.own-vera-hub .vh-hero-clock svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }\n\n.own-vera-hub .vh-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  min-height: 38px;\n  padding: 0 14px;\n  border: 1px solid var(--vh-border);\n  border-radius: var(--vh-r-ctl);\n  background: var(--vh-card);\n  color: var(--vh-text0);\n  font-family: var(--vh-grot);\n  font-size: 13px;\n  font-weight: 500;\n  white-space: nowrap;\n  transition: background var(--vh-ease), border-color var(--vh-ease), color var(--vh-ease), transform var(--vh-ease);\n}\n.own-vera-hub .vh-btn:hover { background: var(--vh-card-hi); border-color: var(--vh-border-hot); }\n.own-vera-hub .vh-btn--primary {\n  background: var(--vh-grad);\n  color: var(--vh-on-accent);\n  border-color: var(--vh-border-hot);\n  font-weight: 600;\n  box-shadow: 0 0 24px var(--vh-accent-glow);\n}\n.own-vera-hub .vh-btn--primary:hover { filter: brightness(1.06); }\n.own-vera-hub .vh-btn--sm { min-height: 30px; padding: 0 10px; font-size: 12px; }\n.own-vera-hub .vh-btn:active { transform: translateY(1px); }\n\n/* header core — dashed rings + orbit around nested gauges (HeaderCore) */\n.own-vera-hub .vh-hero-right { flex: none; }\n.own-vera-hub .vh-core { position: relative; width: 168px; height: 168px; flex: none; display: grid; place-items: center; }\n.own-vera-hub .vh-core-ring { position: absolute; inset: 4px; border-radius: 50%; border: 1px dashed var(--vh-border-hot); opacity: 0.55; animation: vh-spin 36s linear infinite; }\n.own-vera-hub .vh-core-orbit { position: absolute; inset: 0; animation: vh-spin 36s linear infinite; }\n.own-vera-hub .vh-core-orbit i { position: absolute; left: 50%; top: 4px; width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%; background: var(--vh-accent); box-shadow: 0 0 10px var(--vh-accent-glow); }\n@keyframes vh-spin { to { transform: rotate(360deg); } }\n.own-vera-hub .vh-core-g { position: absolute; inset: 0; display: grid; place-items: center; }\n.own-vera-hub .vh-core-c { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 1px; text-align: center; }\n.own-vera-hub .vh-core-c b { font-family: var(--vh-mono); font-size: 24px; font-weight: 600; line-height: 1; color: var(--vh-text0); text-shadow: 0 0 22px var(--vh-accent-glow); }\n.own-vera-hub .vh-core-c small { font-family: var(--vh-mono); font-size: 8.5px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: var(--vh-text2); }\n\n/* ring gauge (RingGauge) */\n.own-vera-hub .vh-rg { position: relative; display: block; }\n.own-vera-hub .vh-rg svg { display: block; }\n.own-vera-hub .vh-rg-track { stroke: var(--vh-line2); }\n.own-vera-hub .vh-rg-prog { stroke-linecap: round; stroke-dasharray: var(--circ); stroke-dashoffset: var(--off); transition: stroke-dashoffset 1.2s var(--vh-ease); }\n\n/* KPI rail — raised tiles on a sunken well (Dashboard.module.css .kpiRail) */\n.own-vera-hub .vh-kpi-rail { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-top: 20px; }\n.own-vera-hub .vh-kpi {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 14px 16px;\n  border: 1px solid var(--vh-border);\n  border-radius: var(--vh-r-sub);\n  background-image: radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), var(--spot, transparent), transparent 60%), var(--vh-sh-tile);\n  background-repeat: no-repeat;\n  box-shadow: var(--vh-sh-tile);\n  color: inherit;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s var(--vh-ease), box-shadow 0.2s var(--vh-ease), border-color 0.15s ease;\n}\n.own-vera-hub .vh-kpi::after { content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: linear-gradient(90deg, transparent, var(--vh-accent)); box-shadow: 0 0 12px var(--vh-accent-glow); }\n.own-vera-hub .vh-kpi:hover { transform: translateY(-2px); box-shadow: var(--vh-sh-tile-hi); border-color: var(--vh-border-hot); }\n.own-vera-hub .vh-kpi-label { font-family: var(--vh-mono); font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--vh-text2); }\n.own-vera-hub .vh-kpi-value { font-family: var(--vh-mono); font-weight: 600; font-size: 26px; line-height: 1; letter-spacing: -0.01em; color: var(--vh-text0); text-shadow: 0 0 22px var(--vh-accent-glow); }\n.own-vera-hub .vh-kpi--lead .vh-kpi-value { background: var(--vh-grad); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: none; }\n.own-vera-hub .vh-kpi--lead::after { background: var(--vh-grad); box-shadow: 0 0 14px var(--vh-accent-glow); }\n.own-vera-hub .vh-kpi-sub { font-size: 12px; color: var(--vh-text2); }\n.own-vera-hub .vh-kpi-track { margin-top: 6px; height: 5px; border-radius: var(--vh-r-pill); background: var(--vh-card-hi); overflow: hidden; }\n.own-vera-hub .vh-kpi-fill { display: block; height: 100%; border-radius: var(--vh-r-pill); background: linear-gradient(90deg, var(--vh-accent), var(--vh-accent2)); box-shadow: 0 0 10px var(--vh-accent-glow); }\n\n/* fact ticker */\n.own-vera-hub .vh-fact {\n  position: relative;\n  z-index: 1;\n  overflow: hidden;\n  margin: 18px 0 0;\n  padding: 9px 0;\n  border-top: 1px solid var(--vh-border);\n  border-bottom: 1px solid var(--vh-border);\n  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);\n  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);\n}\n.own-vera-hub .vh-fact-track { display: inline-flex; white-space: nowrap; min-width: max-content; font-family: var(--vh-mono); font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--vh-text2); animation: vh-marquee 72s linear infinite; }\n.own-vera-hub .vh-fact:hover .vh-fact-track { animation-play-state: paused; }\n.own-vera-hub .vh-fact-i { padding-right: 28px; }\n.own-vera-hub .vh-fact-i i { margin-left: 8px; color: var(--vh-border-hot); font-style: normal; }\n@keyframes vh-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }\n\n/* ── the one 12-column home grid ──────────────────────────────────────────── */\n.own-vera-hub .vh-grid {\n  display: grid;\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n  gap: 32px;\n  margin-top: 32px;\n  align-items: start;\n}\n.own-vera-hub .vh-sec { min-width: 0; scroll-margin-top: 84px; }\n.own-vera-hub .vh-focus,\n.own-vera-hub .vh-needs { grid-column: span 6; display: flex; flex-direction: column; }\n.own-vera-hub .vh-projects,\n.own-vera-hub .vh-activity { grid-column: 1 / -1; }\n\n/* section head — hollow numeral, mono eyebrow, gradient title (SectionHead) */\n.own-vera-hub .vh-grid { counter-reset: sh; }\n.own-vera-hub .vh-sh {\n  counter-increment: sh;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 18px;\n  align-items: center;\n  margin: 0 0 14px;\n  scroll-margin-top: 84px;\n}\n.own-vera-hub .vh-sh-num {\n  font-family: var(--vh-display);\n  font-size: 46px;\n  line-height: 0.8;\n  letter-spacing: -0.02em;\n  color: transparent;\n  -webkit-text-stroke: 1px var(--vh-num-stroke);\n  user-select: none;\n  clip-path: inset(0 100% 0 0);\n  transition: clip-path 0.7s var(--vh-ease) 0.1s;\n}\n.own-vera-hub .vh-sh-num::before { content: counter(sh, decimal-leading-zero); }\n.own-vera-hub .vh-sh.in .vh-sh-num { clip-path: inset(0 0 0 0); }\n.own-vera-hub .vh-sh-txt { min-width: 0; }\n.own-vera-hub .vh-sh-eyebrow { font-family: var(--vh-mono); font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--vh-accent); margin-bottom: 6px; }\n.own-vera-hub .vh-sh-title { margin: 0; font-family: var(--vh-grot); font-weight: 600; font-size: clamp(20px, 2cqi, 26px); line-height: 1.15; letter-spacing: -0.01em; color: var(--vh-text0); }\n.own-vera-hub .vh-sh-aside { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }\n.own-vera-hub .vh-morelink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; color: var(--vh-accent); white-space: nowrap; }\n.own-vera-hub .vh-morelink:hover { text-decoration: underline; text-underline-offset: 3px; }\n.own-vera-hub .vh-morelink svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-note { font-family: var(--vh-mono); font-size: 11px; color: var(--vh-text2); }\n\n/* consecutive sections separated by a gradient hairline */\n.own-vera-hub .vh-sec { position: relative; }\n.own-vera-hub .vh-sec + .vh-sec::before {\n  content: '';\n  position: absolute;\n  top: -9px;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background: linear-gradient(90deg, transparent 28%, var(--vh-grad1), var(--vh-grad3), transparent 72%);\n  opacity: 0.5;\n}\n\n/* cards (raised, spotlight glass) */\n.own-vera-hub .vh-card {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 24px;\n  border: 1px solid var(--vh-border);\n  border-radius: var(--vh-r-card);\n  background-image: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), var(--spot, transparent), transparent 62%), var(--vh-sh-card);\n  background-repeat: no-repeat;\n  box-shadow: var(--vh-sh-card);\n  color: var(--vh-text0);\n  flex: 1;\n}\n.own-vera-hub .vh-card--flat { padding: 0; border: 0; background: none; box-shadow: none; }\n\n/* ── your focus: grouped task rows ────────────────────────────────────────── */\n.own-vera-hub .vh-secrow { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 14px 0 6px; }\n.own-vera-hub .vh-secrow:first-child { margin-top: 0; }\n.own-vera-hub .vh-sub { font-family: var(--vh-mono); font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--vh-text2); }\n.own-vera-hub .vh-sub--over { color: var(--vh-crit-ink); }\n.own-vera-hub .vh-list { display: flex; flex-direction: column; }\n.own-vera-hub .vh-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding: 12px 8px;\n  border-top: 1px solid var(--vh-line2);\n  transition: background var(--vh-ease);\n}\n.own-vera-hub .vh-row:first-child { border-top: 0; }\n.own-vera-hub .vh-row:hover { background: var(--vh-accent-soft); }\n.own-vera-hub .vh-glyph { display: inline-flex; flex: none; width: 16px; justify-content: center; color: var(--vh-text2); }\n.own-vera-hub .vh-glyph svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-glyph--doing { color: var(--vh-accent); }\n.own-vera-hub .vh-glyph--review { color: var(--vh-warn-ink); }\n.own-vera-hub .vh-glyph--blocked { color: var(--vh-crit-ink); }\n.own-vera-hub .vh-rowtitle { flex: 1 1 200px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; }\n.own-vera-hub .vh-code {\n  flex: none;\n  padding: 2px 8px;\n  border: 1px solid var(--vh-border);\n  border-radius: 6px;\n  background: var(--vh-card-hi);\n  color: var(--vh-text2);\n  font-family: var(--vh-mono);\n  font-size: 11px;\n  white-space: nowrap;\n}\n.own-vera-hub .vh-code--accent { background: var(--vh-accent-soft); color: var(--vh-accent); border-color: var(--vh-border-hot); }\n.own-vera-hub .vh-due {\n  flex: none;\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  padding: 3px 8px;\n  border: 1px solid var(--vh-line2);\n  border-radius: var(--vh-r-ctl);\n  color: var(--vh-text2);\n  white-space: nowrap;\n}\n.own-vera-hub .vh-due--over { color: var(--vh-crit-ink); border-color: var(--vh-crit); background: rgba(232, 67, 74, 0.45); }\n.own-vera-hub .vh-due--week { color: var(--vh-warn-ink); border-color: var(--vh-warn); background: rgba(232, 181, 77, 0.4); }\n\n/* all-caught-up mark */\n.own-vera-hub .vh-caught { padding: 26px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }\n.own-vera-hub .vh-mark { display: inline-flex; color: var(--vh-accent); }\n.own-vera-hub .vh-mark svg { width: 30px; height: 30px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }\n.own-vera-hub .vh-caught-text { max-width: 52ch; font-size: 15px; line-height: 1.6; color: var(--vh-text2); }\n\n/* ── needs you: final decision cards (ActionsBand) ───────────────────────── */\n.own-vera-hub .vh-finale {\n  position: relative;\n  border: 1px solid var(--vh-border-hot);\n  border-radius: var(--vh-r-hero);\n  padding: 22px;\n  background: rgba(1, 20, 31, 0.45);\n  box-shadow: var(--vh-sh-card), 0 0 60px -20px var(--vh-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n  flex: 1;\n}\n.own-vera-hub .vh-decisions { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; margin-top: 12px; }\n.own-vera-hub .vh-decision {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  gap: 12px;\n  align-items: start;\n  background: rgba(1, 20, 31, 0.4);\n  border: 1px solid var(--vh-border);\n  border-radius: var(--vh-r-sub);\n  padding: 14px;\n  transition: transform 0.2s var(--vh-ease), border-color 0.15s ease;\n}\n.own-vera-hub .vh-decision:hover { transform: translateY(-2px); border-color: var(--vh-border-hot); }\n.own-vera-hub .vh-decision-n { font-family: var(--vh-display); font-size: 26px; line-height: 1; color: transparent; -webkit-text-stroke: 1px var(--vh-num-stroke); }\n.own-vera-hub .vh-decision-t { margin: 0 0 10px; font-size: 13px; font-weight: 500; line-height: 1.45; color: var(--vh-text1); }\n.own-vera-hub .vh-decision-t b { color: var(--vh-text0); font-weight: 600; }\n.own-vera-hub .vh-needs-meta { display: block; margin-top: 2px; font-family: var(--vh-mono); font-size: 11px; color: var(--vh-text2); }\n.own-vera-hub .vh-decision-btn {\n  font-family: var(--vh-mono);\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  padding: 8px 14px;\n  border-radius: var(--vh-r-ctl);\n  border: 1px solid var(--vh-border-hot);\n  background: var(--vh-grad);\n  color: var(--vh-on-accent);\n  box-shadow: 0 0 18px var(--vh-accent-glow);\n  transition: transform 0.15s var(--vh-ease), box-shadow 0.15s var(--vh-ease);\n}\n.own-vera-hub .vh-decision-btn:hover { transform: translateY(-1px); box-shadow: 0 0 24px var(--vh-accent-glow); }\n\n/* ── your projects: grid of identical cards ──────────────────────────────── */\n.own-vera-hub .vh-proj-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }\n.own-vera-hub .vh-proj-card {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 18px;\n  border: 1px solid var(--vh-border);\n  border-radius: var(--vh-r-sub);\n  background: var(--vh-sh-tile);\n  box-shadow: var(--vh-sh-tile);\n  transition: transform 0.2s var(--vh-ease), box-shadow 0.2s var(--vh-ease), border-color 0.15s ease;\n}\n.own-vera-hub .vh-proj-card:hover { border-color: var(--vh-border-hot); transform: translateY(-1px); box-shadow: var(--vh-sh-tile-hi); }\n.own-vera-hub .vh-proj-top { display: flex; align-items: center; gap: 9px; min-width: 0; }\n.own-vera-hub .vh-proj-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; font-weight: 600; color: var(--vh-text0); }\n.own-vera-hub .vh-prog { display: block; height: 6px; border-radius: var(--vh-r-pill); background: var(--vh-card-hi); overflow: hidden; }\n.own-vera-hub .vh-prog-fill { display: block; height: 100%; border-radius: var(--vh-r-pill); background: var(--vh-grad); box-shadow: 0 0 10px var(--vh-accent-glow); transform-origin: left center; }\n.own-vera-hub .vh-proj-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; }\n.own-vera-hub .vh-proj-milestone { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: var(--vh-mono); font-size: 11px; color: var(--vh-text2); }\n.own-vera-hub .vh-status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex: none;\n  font-family: var(--vh-mono);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  white-space: nowrap;\n  color: var(--vh-text2);\n}\n.own-vera-hub .vh-status::before { content: '●'; font-size: 12px; line-height: 1; }\n.own-vera-hub .vh-status--active { color: var(--vh-accent); }\n.own-vera-hub .vh-status--active::before { content: '◐'; }\n.own-vera-hub .vh-status--review { color: var(--vh-warn-ink); }\n.own-vera-hub .vh-status--review::before { content: '⚠'; }\n.own-vera-hub .vh-status--done { color: var(--vh-ok-ink); }\n\n/* ── recent activity: the Vera table (no zebra) ───────────────────────────── */\n.own-vera-hub .vh-tbl-wrap { border: 1px solid var(--vh-border); border-radius: var(--vh-r-card); background: var(--vh-sh-card); box-shadow: var(--vh-sh-card); overflow-x: auto; }\n.own-vera-hub .vh-tbl { width: 100%; border-collapse: collapse; font-size: 13px; }\n.own-vera-hub .vh-tbl thead th {\n  background: var(--vh-card-hi);\n  color: var(--vh-text3);\n  font-family: var(--vh-mono);\n  font-size: 10.5px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  text-align: left;\n  padding: 10px 12px;\n  white-space: nowrap;\n}\n.own-vera-hub .vh-tbl tbody td { padding: 14px 12px; border-bottom: 1px solid var(--vh-line2); color: var(--vh-text1); font-size: 13px; }\n.own-vera-hub .vh-tbl tbody tr:last-child td { border-bottom: 0; }\n.own-vera-hub .vh-tbl tbody tr:hover td { background: var(--vh-card-hi); }\n.own-vera-hub .vh-tbl .vh-num { font-family: var(--vh-mono); font-size: 12px; text-align: right; white-space: nowrap; }\n.own-vera-hub .vh-tbl .vh-when { font-family: var(--vh-mono); font-size: 11px; color: var(--vh-text2); white-space: nowrap; }\n\n/* ── reveal-once motion ────────────────────────────────────────────────────── */\n.own-vera-hub [data-rv] { opacity: 0; transform: translateY(14px); transition: opacity 0.5s var(--vh-ease), transform 0.5s var(--vh-ease); }\n.own-vera-hub [data-rv].in { opacity: 1; transform: none; }\n\n/* ── responsive — production breakpoints as container queries ────────────── */\n@container frame (max-width: 1180px) {\n  .own-vera-hub .vh-app-link { font-size: 12.5px; padding: 8px 9px; }\n  .own-vera-hub .vh-app-link--learn { display: none; }\n}\n@container frame (max-width: 1100px) {\n  .own-vera-hub .vh-kpi-rail { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  .own-vera-hub .vh-hero-right { display: none; }\n  .own-vera-hub .vh-proj-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}\n@container frame (max-width: 1023px) {\n  .own-vera-hub .vh-searchbar { display: none; }\n  .own-vera-hub .vh-search-icon-btn { display: inline-flex; }\n}\n@container frame (max-width: 900px) {\n  .own-vera-hub .vh-shell { grid-template-columns: 68px minmax(0, 1fr); }\n  .own-vera-hub .vh-rail { padding: 12px 8px; }\n  .own-vera-hub .vh-rail-marker { left: 0; }\n  .own-vera-hub .vh-rail-item { justify-content: center; padding: 8px; gap: 0; }\n  .own-vera-hub .vh-rail-item:hover { transform: none; }\n  .own-vera-hub .vh-rail-label,\n  .own-vera-hub .vh-rail-count,\n  .own-vera-hub .vh-rail-group-label,\n  .own-vera-hub .vh-rail-group-chevron { display: none; }\n  .own-vera-hub .vh-rail-group-head { display: flex; justify-content: center; padding: 8px 0; }\n  .own-vera-hub .vh-rail-group-head::after { content: ''; width: 26px; height: 1px; background: var(--vh-line2); }\n  .own-vera-hub .vh-rail-toggle { justify-content: center; padding: 6px; }\n  .own-vera-hub .vh-rail-toggle-word,\n  .own-vera-hub .vh-rail-version { display: none; }\n  .own-vera-hub .vh-focus,\n  .own-vera-hub .vh-needs { grid-column: 1 / -1; }\n}\n@container frame (max-width: 768px) {\n  .own-vera-hub { padding: 0; }\n  .own-vera-hub .vh-shell {\n    max-width: none;\n    margin: 0;\n    height: 100dvh;\n    min-height: 0;\n    border: 0;\n    border-radius: 0;\n    box-shadow: none;\n    grid-template-columns: minmax(0, 1fr);\n    grid-template-areas: 'nav' 'main';\n  }\n  .own-vera-hub .vh-topnav { padding: 8px 12px; gap: 10px; }\n  .own-vera-hub .vh-app-links { display: none; }\n  .own-vera-hub .vh-main { padding: 18px 16px 96px; }\n  .own-vera-hub .vh-logo-word { display: none; }\n  .own-vera-hub .vh-logo-short { display: inline; }\n  .own-vera-hub .vh-sections-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 7px;\n    margin-bottom: 14px;\n    padding: 7px 12px;\n    border-radius: var(--vh-r-ctl);\n    border: 1px solid var(--vh-border);\n    background: var(--vh-card);\n    color: var(--vh-text1);\n    font-family: var(--vh-grot);\n    font-size: 12px;\n    font-weight: 600;\n  }\n  .own-vera-hub .vh-sections-btn svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; }\n  /* the rail becomes a bottom sheet pinned inside the shell */\n  .own-vera-hub .vh-rail {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: auto;\n    z-index: 70;\n    max-height: 74%;\n    padding: 10px 14px 18px;\n    background: var(--vh-bar);\n    border-right: 0;\n    border-top: 1px solid var(--vh-border);\n    border-radius: 18px 18px 0 0;\n    box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.35);\n    transform: translateY(102%);\n    transition: transform 220ms var(--vh-ease);\n    overflow-y: auto;\n  }\n  .own-vera-hub .vh-shell[data-sheet='open'] .vh-rail { transform: none; }\n  .own-vera-hub .vh-rail-item { justify-content: flex-start; padding: 8px 10px; gap: 12px; min-height: 44px; width: 100%; }\n  .own-vera-hub .vh-rail-label,\n  .own-vera-hub .vh-rail-count,\n  .own-vera-hub .vh-rail-group-label,\n  .own-vera-hub .vh-rail-group-chevron { display: revert; }\n  .own-vera-hub .vh-rail-group-head { justify-content: space-between; padding: 12px 10px 6px; }\n  .own-vera-hub .vh-rail-group-head::after { display: none; }\n  .own-vera-hub .vh-rail-toggle,\n  .own-vera-hub .vh-rail-foot { display: none; }\n  .own-vera-hub .vh-sh-num { font-size: 34px; }\n  .own-vera-hub .vh-grid { gap: 22px; margin-top: 22px; }\n  .own-vera-hub .vh-proj-grid { grid-template-columns: minmax(0, 1fr); }\n  .own-vera-hub .vh-hero { padding: 20px; }\n  .own-vera-hub .vh-scrim {\n    position: absolute;\n    inset: 0;\n    z-index: 65;\n    display: block;\n    border: 0;\n    padding: 0;\n    background: rgba(1, 13, 22, 0.55);\n  }\n}\n@container frame (max-width: 600px) {\n  .own-vera-hub .vh-kpi-rail { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }\n  .own-vera-hub .vh-card { padding: 16px; }\n  .own-vera-hub .vh-hero { border-radius: 18px; }\n  .own-vera-hub .vh-tbl thead th,\n  .own-vera-hub .vh-tbl tbody td { padding: 12px 10px; }\n}\n@container frame (max-width: 430px) {\n  .own-vera-hub .vh-hero-date { font-size: 11px; gap: 8px; }\n  .own-vera-hub .vh-hero-clock { font-size: 15px; }\n  .own-vera-hub .vh-kpi-value { font-size: 22px; }\n  .own-vera-hub .vh-sh { grid-template-columns: auto minmax(0, 1fr); gap: 12px; }\n  .own-vera-hub .vh-sh-aside { grid-column: 1 / -1; justify-content: flex-start; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .own-vera-hub *,\n  .own-vera-hub *::before,\n  .own-vera-hub *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }\n  .own-vera-hub [data-rv] { opacity: 1; transform: none; }\n  .own-vera-hub .vh-hero::before,\n  .own-vera-hub .vh-core-ring,\n  .own-vera-hub .vh-core-orbit,\n  .own-vera-hub .vh-fact-track { animation: none !important; }\n  .own-vera-hub .vh-sh-num { clip-path: none !important; }\n  .own-vera-hub .vh-rg-prog { stroke-dashoffset: var(--off) !important; transition: none !important; }\n}\n"};
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
