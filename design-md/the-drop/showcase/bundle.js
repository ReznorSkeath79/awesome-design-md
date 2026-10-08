window.OWN_BUNDLES=window.OWN_BUNDLES||{};window.OWN_BUNDLES["the-drop"]={html:"<div class=\"drop\">\n  <!-- ── BAR ──────────────────────────────────────────────────────────── -->\n  <header class=\"drop-bar\" id=\"dropBar\">\n    <a class=\"bar-wordmark\" href=\"#drop\" aria-label=\"Marketplace home\">MARKET<span>X</span>PLACE</a>\n    <nav class=\"bar-links bar-nav-links\" aria-label=\"Sections\">\n      <a href=\"#drop\" class=\"on\">The drop</a>\n      <a href=\"#lineup\">Lineup</a>\n      <a href=\"#payday\">Payday</a>\n      <a href=\"#roster\">Who's shipping</a>\n      <a href=\"#scoreboard\">Scoreboard</a>\n    </nav>\n    <span class=\"bar-sep\" aria-hidden=\"true\"></span>\n    <div class=\"bar-links bar-user-links\">\n      <a href=\"#\">My work</a>\n      <a href=\"#\">Earnings</a>\n    </div>\n    <div class=\"bar-right\">\n      <label class=\"bar-search\">\n        <span class=\"sr\">Search jobs</span>\n        <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-4-4\"/></svg>\n        <input id=\"dropQ\" type=\"search\" placeholder=\"Search jobs, skills, people\" autocomplete=\"off\">\n      </label>\n      <button class=\"bar-search-toggle\" type=\"button\" aria-label=\"Search\" data-search-toggle>\n        <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-4-4\"/></svg>\n      </button>\n      <a class=\"bar-hub\" href=\"#\">&larr; Hub</a>\n      <a class=\"bar-avatar\" href=\"#\" title=\"MN\">MN</a>\n    </div>\n  </header>\n\n  <div class=\"drop-clip\">\n  <!-- ── HERO ─────────────────────────────────────────────────────────── -->\n  <section class=\"hero\" aria-labelledby=\"dropHeroH\">\n    <div class=\"hero-stage\" id=\"heroStage\">\n      <img class=\"hero-img\" id=\"heroImg\" src=\"design-md/the-drop/showcase/assets/hero.jpg\" alt=\"\">\n      <canvas class=\"hero-powder\" id=\"heroPowder\" aria-hidden=\"true\"></canvas>\n      <div class=\"hero-shade\" aria-hidden=\"true\"></div>\n      <div class=\"hero-copy\">\n        <p class=\"hero-kicker\">We turn your work into</p>\n        <h1 id=\"dropHeroH\" class=\"hero-title\"><span class=\"grad\">Bold</span><span class=\"grad\">Payouts</span></h1>\n        <p class=\"script hero-note\" aria-hidden=\"true\">Ship it on time\n          <svg viewBox=\"0 0 220 24\" class=\"underline\"><path d=\"M4 16 C 60 6, 120 22, 216 8\"/></svg>\n        </p>\n        <p class=\"hero-sub\" id=\"heroSub\"></p>\n        <div class=\"hero-cta\">\n          <a class=\"btn btn-grad\" href=\"#drop\">See the drop</a>\n          <a class=\"btn btn-round\" href=\"#payday\" aria-label=\"How it pays\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></a>\n        </div>\n      </div>\n      <ul class=\"hero-stats\" id=\"heroStats\" aria-label=\"Program at a glance\"></ul>\n      <a class=\"hero-play\" href=\"#payday\"><span class=\"play\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\"><path d=\"M8 5v14l11-7z\"/></svg></span> How it pays</a>\n    </div>\n  </section>\n\n  <!-- ── TICKER ───────────────────────────────────────────────────────── -->\n  <div class=\"ticker\" aria-hidden=\"true\"><div class=\"ticker-track\" id=\"tickerTrack\"></div></div>\n\n  <!-- ── THE DROP ─────────────────────────────────────────────────────── -->\n  <section id=\"drop\" class=\"drop-sec\" aria-labelledby=\"dropH\">\n    <div class=\"drop-intro rv\" data-rv>\n      <p class=\"eyebrow\">This week</p>\n      <h2 id=\"dropH\" class=\"drop-title\">Jobs that<br>get <span class=\"yellow\">claimed</span><span class=\"magenta\">.</span></h2>\n      <svg viewBox=\"0 0 300 24\" class=\"brush\" aria-hidden=\"true\"><path d=\"M6 14 C 80 4, 170 20, 294 10\"/></svg>\n      <p class=\"drop-sub\">Fresh briefs from the team. Bid, deliver before the deadline, get rated, get paid. Unclaimed always shows first.</p>\n      <a class=\"btn btn-yellow\" href=\"#lineup\">See the full lineup</a>\n    </div>\n    <div class=\"drop-grid\" id=\"dropGrid\"></div>\n  </section>\n\n  <!-- ── LINEUP ───────────────────────────────────────────────────────── -->\n  <section id=\"lineup\" class=\"lineup\" aria-labelledby=\"lineupH\">\n    <div class=\"lineup-head\">\n      <div>\n        <p class=\"eyebrow\">Every job, every status</p>\n        <h2 id=\"lineupH\" class=\"section-title\">The lineup</h2>\n      </div>\n      <div class=\"dock\" id=\"dock\" role=\"group\" aria-label=\"Filter by status\">\n        <span class=\"dock-pill\" aria-hidden=\"true\"></span>\n      </div>\n    </div>\n    <div class=\"rail\" id=\"rail\" tabindex=\"0\" role=\"group\" aria-label=\"Job posters, drag or use arrow keys\">\n      <div class=\"rail-track\" id=\"railTrack\"></div>\n    </div>\n    <div class=\"rail-controls\">\n      <button class=\"btn btn-round\" id=\"railPrev\" type=\"button\" aria-label=\"Previous\"><svg viewBox=\"0 0 24 24\"><path d=\"M19 12H5M11 6l-6 6 6 6\"/></svg></button>\n      <div class=\"rail-bar\"><span id=\"railBar\"></span></div>\n      <button class=\"btn btn-round\" id=\"railNext\" type=\"button\" aria-label=\"Next\"><svg viewBox=\"0 0 24 24\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></button>\n    </div>\n  </section>\n\n  <!-- ── PAYDAY ───────────────────────────────────────────────────────── -->\n  <section id=\"payday\" class=\"payday\" aria-labelledby=\"paydayH\">\n    <div class=\"payday-copy\">\n      <p class=\"eyebrow\">Payday calculator</p>\n      <h2 id=\"paydayH\" class=\"section-title\">What's it <span class=\"grad\">worth?</span></h2>\n      <p class=\"script payday-note\">no guessing, no haggling</p>\n      <ol class=\"rules\">\n        <li><b>01</b><span>Bid on a job. Complexity is locked when the Senior Director approves intake.</span></li>\n        <li><b>02</b><span>Deliver on or before the deadline — late work earns nothing.</span></li>\n        <li><b>03</b><span>Your requester rates it. Three stars or fewer needs a written reason.</span></li>\n        <li><b>04</b><span>Senior Director signs off. It's released with the payroll cycle.</span></li>\n      </ol>\n    </div>\n    <div class=\"calc\" aria-label=\"Payout calculator\">\n      <div class=\"calc-cx\" id=\"calcCx\" role=\"radiogroup\" aria-label=\"Complexity\"></div>\n      <div>\n        <span class=\"calc-label\">Requester rating</span>\n        <div class=\"stars\" id=\"calcStars\" role=\"radiogroup\" aria-label=\"Stars\"></div>\n      </div>\n      <div class=\"calc-toggles\">\n        <label class=\"switch\"><input type=\"checkbox\" id=\"tOnTime\" checked><span class=\"switch-ui\"></span>Delivered on time</label>\n        <label class=\"switch\"><input type=\"checkbox\" id=\"tGrade\" checked><span class=\"switch-ui\"></span>Below grade 8A</label>\n      </div>\n      <div class=\"calc-out\" aria-live=\"polite\">\n        <span class=\"calc-peso\" id=\"calcAmt\">&#8369;8,500</span>\n        <span class=\"calc-why\" id=\"calcWhy\">Medium &middot; 4&#9733; &middot; on time</span>\n      </div>\n      <div class=\"matrix\" id=\"matrix\" aria-label=\"Incentive grid\"></div>\n    </div>\n  </section>\n\n  <!-- ── WHO'S SHIPPING ───────────────────────────────────────────────── -->\n  <section id=\"roster\" class=\"roster\" aria-labelledby=\"rosterH\">\n    <div class=\"roster-head\">\n      <p class=\"eyebrow\">In flight right now</p>\n      <h2 id=\"rosterH\" class=\"section-title\">Who's <span class=\"grad\">shipping</span></h2>\n    </div>\n    <div class=\"roster-grid\" id=\"rosterGrid\"></div>\n  </section>\n\n  <!-- ── THE SCOREBOARD ───────────────────────────────────────────────── -->\n  <section id=\"scoreboard\" class=\"scoreboard\" aria-labelledby=\"scoreboardH\">\n    <div class=\"scoreboard-head\">\n      <h2 id=\"scoreboardH\" class=\"scoreboard-title\">The <span class=\"grad\">score</span>board</h2>\n      <p class=\"script\">this quarter, live</p>\n    </div>\n    <div class=\"scoreboard-grid\">\n      <div class=\"billboard\">\n        <div class=\"billboard-row\" id=\"billboardRow\"></div>\n        <div class=\"pool\">\n          <div class=\"pool-top\">\n            <span class=\"pool-amount\" id=\"poolAmount\"></span>\n            <span class=\"pool-caption\" id=\"poolCaption\"></span>\n          </div>\n          <div class=\"pool-meter\"><span class=\"pool-fill\" id=\"poolFill\"></span></div>\n          <p class=\"pool-note\">Up to — every job in flight at 5&#9733;. The monthly pool pays each on-time, well-rated drop.</p>\n        </div>\n      </div>\n      <div class=\"quarter\">\n        <span class=\"quarter-eyebrow\">Your quarter</span>\n        <h3 class=\"quarter-title\">In your pocket</h3>\n        <div class=\"quarter-row\"><b class=\"quarter-num\" id=\"qEarned\"></b><span class=\"quarter-label\">Earned</span></div>\n        <div class=\"quarter-row\"><b class=\"quarter-num\" id=\"qUnpaid\"></b><span class=\"quarter-label\">Awaiting payout</span></div>\n        <div class=\"quarter-row\"><b class=\"quarter-num\" id=\"qPaid\"></b><span class=\"quarter-label\">Paid</span></div>\n        <p class=\"quarter-jobs\" id=\"qJobs\"></p>\n        <p class=\"quarter-note\">your first drop is waiting — <a href=\"#lineup\">see what's open</a></p>\n      </div>\n    </div>\n    <div class=\"score-stickers\" id=\"scoreStickers\"></div>\n  </section>\n\n  <!-- ── FOOTER ───────────────────────────────────────────────────────── -->\n  <footer class=\"foot\">\n    <p class=\"foot-giant\" aria-hidden=\"true\">MARKETPLACE</p>\n    <div class=\"foot-row\">\n      <span>Sample data — showcase only</span>\n      <a href=\"#\">&larr; Back to the Hub</a>\n    </div>\n  </footer>\n  </div><!-- /.drop-clip -->\n</div>\n",css:"/* ══ THE DROP — the real storefront, ported for showcase.html ══════════════\n   Ported from the production storefront (drop.module.css + MarketplaceShell.module.css,\n   app/src/pages/marketplace/). Everything is scoped under a `.drop` root, camelCase\n   module classes are kebab-cased, production `vw` units become container units (`cqi`)\n   and the two production media queries become `@container frame (max-width: …)` so the\n   Tablet (820) and Phone (390) frames reflow exactly like production at those widths. */\n\n.drop {\n  --stage: #0a0a0f;\n  --panel: #121219;\n  --panel-2: #191922;\n  --well: #0d0d13;\n  --text: #f6f3ee;\n  --text-2: #b6b2c0;\n  --text-3: #7c7889;\n  --line: rgba(255, 255, 255, .08);\n\n  --magenta: #e2248f;\n  --orange: #ff6a1f;\n  --yellow: #ffc21a;\n  --violet: #7b2cf0;\n  --cobalt: #1e5bff;\n  --teal: #0fa58c;\n  --coral: #ff4d5e;\n  --deep: #2443b8;\n  --grad: linear-gradient(95deg, var(--magenta) 0%, #f2386a 45%, var(--orange) 100%);\n\n  --display: 'Anton', 'Barlow', Impact, sans-serif;\n  --ui: 'Barlow', system-ui, sans-serif;\n  --script: 'Caveat Brush', 'Barlow', cursive;\n\n  --r-lg: 28px;\n  --r-md: 18px;\n  --r-sm: 12px;\n  --ease: cubic-bezier(.16, 1, .3, 1);\n  --punch: cubic-bezier(.34, 1.36, .64, 1);\n  --gut: clamp(16px, 4cqi, 56px);\n\n  position: relative;\n  border-radius: 13px;\n  background: var(--stage);\n  color: var(--text);\n  font-family: var(--ui);\n  font-size: 16px;\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n  text-align: left;\n}\n\n.drop *, .drop *::before, .drop *::after { box-sizing: border-box; }\n.drop img { display: block; max-width: 100%; }\n/* Everything after the bar is clipped horizontally (the tilted ticker bleeds to 104%);\n   the wrapper is a sibling of the sticky bar so it never breaks position: sticky. */\n.drop .drop-clip { overflow-x: clip; }\n.drop :focus-visible { outline: 3px solid var(--yellow); outline-offset: 3px; border-radius: 6px; }\n\n.drop .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }\n\n.drop .grad { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }\n.drop .yellow { color: var(--yellow); }\n.drop .magenta { color: var(--magenta); }\n.drop .script { font-family: var(--script); color: var(--text); font-size: clamp(22px, 2.2cqi, 30px); line-height: 1; }\n.drop .eyebrow { font-weight: 700; font-size: 12px; letter-spacing: .22em; text-transform: uppercase; color: var(--text-2); margin-bottom: 14px; }\n.drop .section-title { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(48px, 7cqi, 104px); line-height: .9; letter-spacing: .005em; }\n\n/* ── buttons ─────────────────────────────────────────────────────────────── */\n.drop .btn {\n  display: inline-flex; align-items: center; justify-content: center; gap: 10px;\n  height: 52px; padding: 0 26px; border-radius: 12px;\n  font-weight: 700; font-size: 15px; letter-spacing: .01em;\n  transition: transform .35s var(--punch), filter .3s, background-color .3s;\n  will-change: transform;\n}\n.drop .btn:active { transform: scale(.96); }\n.drop .btn-sm { height: 40px; padding: 0 18px; font-size: 14px; border-radius: 10px; }\n.drop .btn-grad { background: var(--grad); color: #fff; }\n.drop .btn-grad:hover { filter: brightness(1.08) saturate(1.05); }\n.drop .btn-yellow { background: var(--yellow); color: #121212; }\n.drop .btn-white { background: #fff; color: #121212; height: 36px; padding: 0 16px; font-size: 13px; border-radius: 8px; }\n.drop .btn-round { width: 52px; padding: 0; border-radius: 50%; background: #fff; color: #111; }\n.drop .btn-round svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }\n\n/* ── bar (MarketplaceShell: sticky inside the frame, not fixed) ───────────── */\n.drop .drop-bar {\n  position: sticky; top: 68px; z-index: 40; /* clears the 56px showcase toolbar */\n  display: flex; align-items: center; gap: 24px;\n  height: 64px; padding: 0 12px 0 22px;\n  margin: 12px var(--gut) -76px;\n  border-radius: 18px;\n  transition: background-color .4s var(--ease), box-shadow .4s var(--ease);\n}\n.drop .drop-bar.bar-solid {\n  background: rgba(14, 14, 20, .98);\n  box-shadow: 0 10px 30px -20px rgba(0, 0, 0, .9), inset 0 0 0 1px rgba(255, 255, 255, .08);\n}\n.drop .bar-wordmark { font-family: var(--display); font-size: 24px; letter-spacing: .04em; color: var(--text); text-decoration: none; white-space: nowrap; }\n.drop .bar-wordmark span { display: inline-block; color: var(--magenta); transform: translateY(-1px) rotate(-8deg); }\n.drop .bar-links { display: flex; align-items: center; gap: 18px; font-weight: 600; font-size: 14px; }\n.drop .bar-links a { position: relative; padding: 6px 0; color: var(--text-2); transition: color .2s; white-space: nowrap; }\n.drop .bar-links a:hover, .drop .bar-links a.on { color: var(--text); }\n.drop .bar-links a.on::after { content: ''; position: absolute; left: 0; right: 0; bottom: -2px; height: 2px; border-radius: 2px; background: var(--magenta); }\n.drop .bar-sep { width: 1px; height: 18px; background: rgba(255, 255, 255, .14); }\n.drop .bar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }\n.drop .bar-search { display: flex; align-items: center; gap: 8px; width: 260px; height: 40px; padding: 0 14px; border-radius: 10px; background: rgba(255, 255, 255, .07); }\n.drop .bar-search svg { flex: none; width: 16px; height: 16px; fill: none; stroke: var(--text-2); stroke-width: 2; }\n.drop .bar-search input { width: 100%; border: 0; background: none; color: var(--text); font: inherit; font-size: 14px; }\n.drop .bar-search input::placeholder { color: var(--text-3); }\n.drop .bar-search input:focus { outline: none; }\n.drop .bar-search:focus-within { box-shadow: 0 0 0 2px var(--yellow); }\n.drop .bar-hub { display: inline-flex; align-items: center; height: 40px; padding: 0 14px; border-radius: 10px; color: var(--text); font-weight: 700; font-size: 14px; text-decoration: none; background: rgba(255, 255, 255, .07); }\n.drop .bar-hub:hover { background: rgba(255, 255, 255, .12); }\n.drop .bar-avatar { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: #fff; color: #111; font-weight: 800; font-size: 13px; text-decoration: none; }\n.drop .bar-search-toggle { display: none; place-items: center; width: 40px; height: 40px; border: 0; border-radius: 10px; background: rgba(255, 255, 255, .07); cursor: pointer; }\n.drop .bar-search-toggle svg { width: 17px; height: 17px; fill: none; stroke: var(--text); stroke-width: 2; }\n.drop .drop-bar :focus-visible { outline: 3px solid var(--yellow); outline-offset: 3px; border-radius: 6px; }\n\n/* ── hero ────────────────────────────────────────────────────────────────── */\n.drop .hero { padding: 14px var(--gut) 0; }\n.drop .hero-stage {\n  perspective: 1400px;\n  position: relative; overflow: hidden; isolation: isolate;\n  min-height: min(860px, calc(100vh - 28px)); border-radius: var(--r-lg);\n  background: #07060b;\n}\n.drop .hero-img {\n  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 70% 40%;\n  transform: scale(1.06); transform-origin: 70% 40%;\n  will-change: transform;\n}\n.drop .hero-powder { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; mix-blend-mode: screen; }\n.drop .hero-shade { position: absolute; inset: 0; z-index: 2; background: linear-gradient(90deg, rgba(7,6,11,.92) 0%, rgba(7,6,11,.62) 34%, rgba(7,6,11,0) 60%), linear-gradient(0deg, rgba(7,6,11,.7), rgba(7,6,11,0) 30%); }\n.drop .hero-copy { position: relative; z-index: 3; padding: clamp(120px, 16vh, 170px) clamp(24px, 5cqi, 72px) 0; max-width: 760px; }\n.drop .hero-kicker { font-family: var(--display); font-size: clamp(26px, 3cqi, 42px); line-height: 1; text-transform: uppercase; margin-bottom: 6px; }\n.drop .hero-title { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(84px, 12.5cqi, 196px); line-height: .84; letter-spacing: -.005em; }\n.drop .hero-title span { display: block; }\n.drop .hero-note { position: absolute; left: clamp(420px, 40cqi, 560px); top: clamp(108px, 14vh, 150px); transform: rotate(-9deg); color: #fff; }\n.drop .hero-note .underline { display: block; width: 200px; height: 20px; margin-top: 2px; }\n.drop .underline path, .drop .brush path { fill: none; stroke: var(--yellow); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 320; stroke-dashoffset: 320; animation: drop-draw 1s .9s var(--ease) forwards; }\n@keyframes drop-draw { to { stroke-dashoffset: 0; } }\n.drop .hero-sub { margin: 26px 0 30px; max-width: 44ch; font-size: clamp(16px, 1.25cqi, 19px); color: #e4dfe9; }\n.drop .hero-cta { display: flex; gap: 12px; align-items: center; }\n.drop .hero-stats { position: absolute; right: clamp(20px, 3cqi, 48px); top: 50%; transform: translateY(-46%); z-index: 3; list-style: none; display: grid; gap: 26px; text-align: left; }\n.drop .hero-stats li { display: grid; }\n.drop .hero-stats b { font-family: var(--display); font-weight: 400; font-size: clamp(34px, 3.4cqi, 52px); line-height: 1; }\n.drop .hero-stats li > span { font-size: 13px; color: #ddd8e3; font-weight: 600; text-shadow: 0 1px 8px rgba(0, 0, 0, .6); }\n.drop .hero-play { position: absolute; right: clamp(20px, 3cqi, 48px); bottom: 32px; z-index: 3; display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 15px; }\n.drop .play { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 50%; background: #fff; transition: transform .4s var(--punch); }\n.drop .play svg { width: 18px; height: 18px; fill: #111; margin-left: 3px; }\n.drop .hero-play:hover .play { transform: scale(1.12); }\n.drop .hero-copy > * { animation: drop-rise .9s var(--ease) both; }\n.drop .hero-copy > :nth-child(2) { animation-delay: .08s; }\n.drop .hero-copy > :nth-child(3) { animation-delay: .5s; }\n.drop .hero-copy > :nth-child(4) { animation-delay: .22s; }\n.drop .hero-copy > :nth-child(5) { animation-delay: .3s; }\n@keyframes drop-rise { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }\n\n/* ── ticker ──────────────────────────────────────────────────────────────── */\n.drop .ticker { margin: 28px 0 0; overflow: hidden; background: var(--yellow); color: #121212; transform: rotate(-1.4deg); width: 104%; margin-left: -2%; }\n.drop .ticker-track { display: flex; width: max-content; animation: drop-marquee 38s linear infinite; }\n.drop .ticker-item { display: flex; align-items: center; gap: 18px; padding: 14px 18px; font-family: var(--display); font-size: 26px; text-transform: uppercase; white-space: nowrap; }\n.drop .ticker-item i { width: 10px; height: 10px; border-radius: 50%; background: #121212; display: inline-block; font-style: normal; }\n.drop .ticker:hover .ticker-track { animation-play-state: paused; }\n@keyframes drop-marquee { to { transform: translateX(-50%); } }\n\n/* ── the drop ────────────────────────────────────────────────────────────── */\n.drop .drop-sec { margin: 72px var(--gut) 0; display: grid; grid-template-columns: minmax(280px, .78fr) 1.6fr; gap: clamp(20px, 2.4cqi, 32px); padding: clamp(24px, 3cqi, 44px); border-radius: var(--r-lg); background: var(--panel); scroll-margin-top: 90px; }\n.drop .drop-intro { display: flex; flex-direction: column; justify-content: center; padding: 8px 4px; }\n.drop .drop-title { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(54px, 6cqi, 92px); line-height: .9; }\n.drop .brush { width: 220px; height: 22px; margin: 10px 0 18px; }\n.drop .drop-sub { color: var(--text-2); max-width: 36ch; margin-bottom: 28px; }\n.drop .drop-intro .btn { align-self: flex-start; }\n.drop .drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }\n\n/* ── ad tile ─────────────────────────────────────────────────────────────── */\n.drop .tile {\n  position: relative; overflow: hidden; isolation: isolate; border-radius: var(--r-md);\n  min-height: 280px; display: flex; flex-direction: column; justify-content: flex-end;\n  padding: 74px 22px 22px; cursor: pointer; text-align: left; color: #fff;\n  background: var(--c, var(--violet));\n  transform: translateY(0); transition: transform .5s var(--punch);\n}\n.drop .tile::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--img) center right / cover no-repeat; transition: transform 1.2s var(--ease); }\n.drop .tile::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, var(--c) 0%, color-mix(in srgb, var(--c) 70%, transparent) 42%, transparent 64%); }\n.drop .tile:hover { transform: translateY(-6px); }\n.drop .tile:hover::before { transform: scale(1.07); }\n.drop .tile-light { color: #141414; }\n.drop .tile-eyebrow { font-weight: 800; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; margin-bottom: 8px; opacity: .9; }\n.drop .tile-title { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(28px, 2.3cqi, 40px); line-height: .92; max-width: 11ch; text-wrap: balance; }\n.drop .tile-meta { font-size: 13px; font-weight: 600; margin: 10px 0 14px; max-width: 26ch; opacity: .92; }\n.drop .tile-actions { display: flex; align-items: center; gap: 10px; }\n.drop .tile-light .btn-white { background: #141414; color: #fff; }\n.drop .sticker {\n  position: absolute; top: 18px; right: 18px; z-index: 2;\n  display: grid; place-items: center; text-align: center; width: 84px; height: 84px; border-radius: 50%;\n  background: #121212; color: #fff; transform: rotate(-12deg);\n  font-family: var(--display); font-size: 25px; line-height: .9;\n  transition: transform .6s var(--punch);\n}\n.drop .sticker small { display: block; font-family: var(--ui); font-weight: 800; font-size: 9.5px; letter-spacing: .14em; margin-top: 3px; }\n.drop .sticker-yearly { background: #fff; color: #121212; font-size: 17px; }\n.drop .sticker-done { background: #fff; color: #121212; font-size: 17px; }\n.drop .tile:hover .sticker { transform: rotate(6deg) scale(1.06); }\n.drop .tag { position: absolute; top: 18px; left: 18px; z-index: 2; padding: 5px 10px; border-radius: 6px; background: rgba(0, 0, 0, .55); font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }\n.drop .tile-light .tag { background: rgba(255, 255, 255, .7); color: #141414; }\n\n/* ── lineup ──────────────────────────────────────────────────────────────── */\n.drop .lineup { margin-top: 110px; scroll-margin-top: 90px; }\n.drop .lineup-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; padding: 0 var(--gut); margin-bottom: 30px; }\n.drop .dock { position: relative; isolation: isolate; display: flex; gap: 6px; padding: 6px; border-radius: 14px; background: var(--panel); box-shadow: inset 0 0 0 1px var(--line); flex-wrap: wrap; }\n.drop .dock button { position: relative; height: 42px; padding: 0 16px; border-radius: 10px; font-weight: 700; font-size: 14px; color: var(--text-2); display: flex; align-items: center; gap: 8px; transition: color .25s; z-index: 1; }\n.drop .dock button i { font-style: normal; font-size: 12px; min-width: 22px; height: 22px; padding: 0 6px; border-radius: 11px; display: grid; place-items: center; background: rgba(255, 255, 255, .08); color: var(--text); }\n.drop .dock button[aria-pressed='true'] { color: #fff; }\n.drop .dock button[aria-pressed='true'] i { background: rgba(0, 0, 0, .25); }\n.drop .dock-pill { position: absolute; z-index: 0; top: 6px; height: 42px; border-radius: 10px; background: var(--grad); transition: left .45s var(--punch), top .45s var(--punch), width .45s var(--punch), height .45s var(--punch); }\n.drop .rail { overflow: hidden; cursor: grab; padding: 10px 0 18px; touch-action: pan-y; }\n.drop .rail.is-drag { cursor: grabbing; }\n.drop .rail-track { display: flex; gap: 18px; padding: 0 var(--gut); width: max-content; will-change: transform; }\n.drop .poster {\n  position: relative; flex: none; width: clamp(250px, 22cqi, 320px); height: clamp(400px, 34cqi, 480px);\n  border-radius: var(--r-md); overflow: hidden; isolation: isolate; color: #fff;\n  background: var(--c); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px;\n  text-align: left; user-select: none;\n  transition: transform .5s var(--punch), opacity .35s;\n}\n.drop .poster::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--img) 78% center / auto 100% no-repeat; transition: transform 1s var(--ease); }\n.drop .poster::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(0deg, var(--c) 0%, color-mix(in srgb, var(--c) 80%, transparent) 38%, transparent 62%); }\n.drop .poster:hover { transform: translateY(-8px) rotate(-.6deg); }\n.drop .poster:hover::before { transform: scale(1.06); }\n.drop .poster-light { color: #141414; }\n.drop .poster-name { font-family: var(--display); font-size: clamp(30px, 2.4cqi, 38px); line-height: .92; text-transform: uppercase; }\n.drop .poster-title { font-weight: 700; font-size: 15px; line-height: 1.25; margin-top: 8px; }\n.drop .poster-posted { font-size: 12px; font-weight: 600; opacity: .8; margin-top: 6px; }\n.drop .poster-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, .28); font-size: 13px; font-weight: 700; gap: 8px; }\n.drop .poster-light .poster-foot { border-color: rgba(0, 0, 0, .2); }\n.drop .poster .sticker { width: 74px; height: 74px; font-size: 21px; top: 16px; right: 16px; }\n.drop .rail-controls { display: flex; align-items: center; gap: 16px; padding: 0 var(--gut); margin-top: 10px; }\n.drop .rail-bar { flex: 1; height: 4px; border-radius: 4px; background: rgba(255, 255, 255, .1); overflow: hidden; }\n.drop .rail-bar span { display: block; height: 100%; width: 20%; background: var(--grad); border-radius: 4px; transform-origin: left; }\n.drop .rail-empty { padding: 60px var(--gut); font-family: var(--script); font-size: 30px; color: var(--text-2); }\n\n/* ── payday ──────────────────────────────────────────────────────────────── */\n.drop .payday { margin: 130px var(--gut) 0; display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(24px, 4cqi, 64px); align-items: start; scroll-margin-top: 90px; }\n.drop .payday-note { color: var(--yellow); transform: rotate(-4deg); margin: 10px 0 26px; display: inline-block; }\n.drop .rules { list-style: none; display: grid; gap: 18px; counter-reset: r; max-width: 48ch; }\n.drop .rules li { display: grid; grid-template-columns: 46px 1fr; gap: 14px; align-items: start; color: var(--text-2); }\n.drop .rules b { font-family: var(--display); font-weight: 400; font-size: 30px; line-height: 1; color: var(--text); }\n.drop .calc { padding: clamp(20px, 2.6cqi, 34px); border-radius: var(--r-lg); background: var(--panel); display: grid; gap: 22px; }\n.drop .calc-cx { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }\n.drop .cx { position: relative; height: 110px; border-radius: var(--r-sm); overflow: hidden; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; text-align: left; color: #fff; background: color-mix(in srgb, var(--c) 38%, #121219); transition: transform .4s var(--punch), background-color .3s; }\n.drop .cx[aria-checked='true'] { background: var(--c); transform: translateY(-4px); }\n.drop .cx b { font-family: var(--display); font-weight: 400; font-size: 30px; line-height: 1; text-transform: uppercase; }\n.drop .cx span { font-size: 12px; font-weight: 700; }\n.drop .cx-light { color: #141414; }\n.drop .calc-label { display: block; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: var(--text-2); margin-bottom: 10px; }\n.drop .stars { display: flex; gap: 8px; }\n.drop .star { width: 52px; height: 52px; border-radius: 12px; display: grid; place-items: center; background: var(--well); transition: transform .35s var(--punch), background-color .25s; }\n.drop .star svg { width: 26px; height: 26px; fill: rgba(255, 255, 255, .18); transition: fill .25s; }\n.drop .star.on svg { fill: var(--yellow); }\n.drop .star:hover { transform: translateY(-3px) rotate(-6deg); }\n.drop .calc-toggles { display: flex; gap: 22px; flex-wrap: wrap; }\n.drop .switch { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; cursor: pointer; }\n.drop .switch input { position: absolute; opacity: 0; }\n.drop .switch-ui { position: relative; width: 48px; height: 28px; border-radius: 14px; background: #2a2833; transition: background-color .25s; }\n.drop .switch-ui::after { content: ''; position: absolute; top: 3px; left: 3px; width: 22px; height: 22px; border-radius: 50%; background: #fff; transition: transform .35s var(--punch); }\n.drop .switch input:checked + .switch-ui { background: var(--magenta); }\n.drop .switch input:checked + .switch-ui::after { transform: translateX(20px); }\n.drop .switch input:focus-visible + .switch-ui { outline: 3px solid var(--yellow); outline-offset: 3px; }\n.drop .calc-out { padding: 22px 24px; border-radius: var(--r-md); background: var(--well); display: grid; gap: 4px; }\n.drop .calc-peso { font-family: var(--display); font-size: clamp(64px, 8cqi, 116px); line-height: .9; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; font-variant-numeric: tabular-nums; }\n.drop .calc-peso.is-zero { background: none; color: var(--text-3); }\n.drop .calc-why { font-weight: 700; color: var(--text-2); }\n.drop .matrix { display: grid; grid-template-columns: 70px repeat(3, 1fr); gap: 8px; font-size: 13px; }\n.drop .matrix span { display: grid; place-items: center; height: 40px; border-radius: 8px; font-weight: 700; }\n.drop .matrix .h { color: var(--text-2); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; }\n.drop .matrix .v { background: var(--well); color: var(--text-2); transition: background-color .3s, color .3s, transform .35s var(--punch); }\n.drop .matrix .v.hit { background: #fff; color: #121212; transform: scale(1.06); }\n\n/* ── roster ──────────────────────────────────────────────────────────────── */\n.drop .roster { margin: 130px var(--gut) 0; scroll-margin-top: 90px; }\n.drop .roster-head { margin-bottom: 30px; }\n.drop .roster-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }\n.drop .player { position: relative; overflow: hidden; border-radius: var(--r-md); padding: 22px; min-height: 260px; display: flex; flex-direction: column; background: var(--c); color: #fff; isolation: isolate; }\n.drop .player-light { color: #141414; }\n.drop .player-num { position: absolute; right: -6px; top: -18px; z-index: -1; font-family: var(--display); font-size: 190px; line-height: 1; opacity: .18; }\n.drop .player-mono { width: 54px; height: 54px; border-radius: 50%; display: grid; place-items: center; background: #121212; color: #fff; font-weight: 800; margin-bottom: auto; }\n.drop .player-light .player-mono { background: #fff; color: #121212; }\n.drop .player-name { font-family: var(--display); font-size: clamp(34px, 3cqi, 46px); line-height: .9; text-transform: uppercase; margin-top: 30px; }\n.drop .player-count { font-weight: 700; font-size: 13px; margin: 6px 0 12px; opacity: .9; }\n.drop .player-jobs { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }\n.drop .player-jobs li button { padding: 5px 10px; border-radius: 6px; background: rgba(0, 0, 0, .28); font-size: 12px; font-weight: 700; }\n.drop .player-light .player-jobs li button { background: rgba(255, 255, 255, .55); }\n.drop .player-jobs li button:hover { background: #121212; color: #fff; }\n\n/* ── scoreboard ──────────────────────────────────────────────────────────── */\n.drop .scoreboard {\n  position: relative; margin: 130px var(--gut) 0; padding: clamp(40px, 6cqi, 90px) clamp(20px, 3cqi, 40px);\n  border-radius: var(--r-lg); overflow: hidden; scroll-margin-top: 90px;\n  background: radial-gradient(120% 90% at 50% 120%, #2a0f2f 0%, #120c1d 45%, #0b0a10 75%);\n}\n.drop .scoreboard-head { text-align: center; margin-bottom: 50px; }\n.drop .scoreboard-title { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(48px, 6.6cqi, 100px); line-height: .9; }\n.drop .scoreboard-head .script { color: var(--yellow); margin-top: 12px; transform: rotate(-3deg); display: inline-block; }\n.drop .scoreboard-grid { position: relative; z-index: 2; display: grid; grid-template-columns: 1.25fr 1fr; gap: clamp(16px, 2.4cqi, 30px); align-items: stretch; }\n.drop .billboard { border-radius: var(--r-lg); padding: clamp(22px, 3cqi, 38px); background: var(--grad); color: #121212; display: grid; gap: 44px; align-content: center; height: 100%; }\n.drop .billboard-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }\n.drop .billboard-stat { display: grid; gap: 2px; align-content: start; }\n.drop .billboard-num { font-family: var(--display); font-weight: 400; font-size: clamp(48px, 6cqi, 86px); line-height: .9; }\n.drop .billboard-label { font-size: 13px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; opacity: .78; }\n.drop .pool { display: grid; gap: 10px; border-top: 2px solid rgba(18, 18, 18, .28); padding-top: 18px; }\n.drop .pool-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }\n.drop .pool-amount { font-family: var(--display); font-size: clamp(30px, 3.4cqi, 46px); line-height: 1; }\n.drop .pool-caption { font-size: 13px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; opacity: .78; }\n.drop .pool-meter { height: 26px; border-radius: 14px; background: rgba(18, 18, 18, .32); overflow: hidden; box-shadow: inset 0 0 0 2px rgba(18, 18, 18, .25); }\n.drop .pool-fill { display: block; height: 100%; width: 0; border-radius: 14px; background: #fff; transition: width 1.1s var(--ease); }\n.drop .pool-note { font-size: 13px; font-weight: 700; opacity: .82; }\n.drop .quarter { border-radius: var(--r-lg); padding: clamp(22px, 3cqi, 34px); background: var(--yellow); color: #141414; display: grid; gap: 16px; height: 100%; }\n.drop .quarter-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; opacity: .7; }\n.drop .quarter-title { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(34px, 3.6cqi, 52px); line-height: .9; }\n.drop .quarter-row { display: grid; gap: 4px; border-top: 2px solid rgba(20, 20, 20, .22); padding-top: 12px; }\n.drop .quarter-num { font-family: var(--display); font-weight: 400; font-size: clamp(40px, 5cqi, 68px); line-height: .9; font-variant-numeric: tabular-nums; }\n.drop .quarter-label { font-size: 13px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; opacity: .7; }\n.drop .quarter-jobs { font-weight: 800; font-size: 15px; }\n.drop .quarter-note { font-family: var(--script); font-size: clamp(22px, 2.2cqi, 30px); line-height: 1; }\n.drop .quarter-note a { text-decoration: underline; }\n.drop .score-stickers { position: relative; z-index: 2; display: flex; justify-content: center; flex-wrap: wrap; gap: clamp(18px, 4cqi, 60px); margin-top: 46px; }\n.drop .score-sticker {\n  width: 132px; height: 132px; border-radius: 50%; display: grid; place-items: center; align-content: center; text-align: center;\n  background: #fff; color: #121212; box-shadow: 0 24px 40px -26px rgba(0, 0, 0, .9);\n  transition: transform .6s var(--punch);\n}\n.drop .score-sticker:nth-child(1) { transform: rotate(-8deg); }\n.drop .score-sticker:nth-child(2) { transform: rotate(5deg); }\n.drop .score-sticker:nth-child(3) { transform: rotate(-4deg); }\n.drop .score-sticker:hover { transform: rotate(0deg) scale(1.06); }\n.drop .score-sticker-num { font-family: var(--display); font-size: 40px; line-height: .9; }\n.drop .score-sticker-label { font-size: 10.5px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; margin-top: 4px; }\n\n/* ── footer ──────────────────────────────────────────────────────────────── */\n.drop .foot { margin-top: 110px; padding: 0 var(--gut) 40px; overflow: hidden; }\n.drop .foot-giant { font-family: var(--display); font-size: clamp(64px, 17.5cqi, 290px); line-height: .8; letter-spacing: .01em; color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, .22); white-space: nowrap; margin: 0; }\n.drop .foot-row { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 13px; color: var(--text-2); font-weight: 600; }\n.drop .foot-row a { color: var(--text); }\n\n/* ── reveal on scroll ────────────────────────────────────────────────────── */\n.drop .rv { opacity: 0; transform: translateY(46px) scale(.98); transition: opacity .8s var(--ease), transform .9s var(--ease); }\n.drop .rv.in { opacity: 1; transform: none; }\n\n/* the hero layers overscan so parallax never reveals an edge */\n.drop .hero-img { inset: -3%; width: 106%; height: 106%; }\n\n/* Feathered edges: the still fades into the stage on every side, so a tilt or parallax\n   shift never shows a straight border. */\n.drop .hero-img {\n  -webkit-mask-image:\n    linear-gradient(90deg, transparent 0%, #000 7%, #000 88%, transparent 100%),\n    linear-gradient(180deg, transparent 0%, #000 6%, #000 86%, transparent 100%);\n  -webkit-mask-composite: source-in;\n  mask-image:\n    linear-gradient(90deg, transparent 0%, #000 7%, #000 88%, transparent 100%),\n    linear-gradient(180deg, transparent 0%, #000 6%, #000 86%, transparent 100%);\n  mask-composite: intersect;\n}\n\n/* ── responsive (production media queries → container queries) ───────────── */\n@container frame (max-width: 1180px) {\n  .drop .bar-nav-links { display: none; }\n  .drop .bar-sep { display: none; }\n}\n@container frame (max-width: 1100px) {\n  .drop .hero-note { display: none; }\n  .drop .drop-sec, .drop .payday, .drop .scoreboard-grid { grid-template-columns: 1fr; }\n}\n@container frame (max-width: 760px) {\n  .drop .drop-bar { top: 10px; margin: 10px 12px 0; flex-wrap: wrap; gap: 4px 10px; height: auto; padding: 8px 8px 6px 16px; background: rgba(14, 14, 20, .94); }\n  .drop .bar-search { display: none; }\n  .drop .bar-search-toggle { display: grid; }\n  .drop .bar-nav-links { display: flex; }\n  .drop .bar-links { order: 3; width: 100%; overflow-x: auto; gap: 16px; padding: 2px 0 4px; scrollbar-width: none; -webkit-mask-image: linear-gradient(90deg, #000 85%, transparent); mask-image: linear-gradient(90deg, #000 85%, transparent); }\n  .drop .bar-links::-webkit-scrollbar { display: none; }\n  .drop .bar-wordmark { font-size: 20px; }\n  .drop .bar-search.search-open { display: flex; position: absolute; top: calc(100% + 6px); left: 8px; right: 8px; width: auto; z-index: 41; background: #16161d; box-shadow: 0 16px 34px -16px rgba(0, 0, 0, .9); }\n  .drop .hero { padding: 10px 12px 0; }\n  .drop .hero-stage { min-height: 760px; }\n  .drop .hero-img { object-position: 64% 30%; }\n  .drop .hero-shade { background: linear-gradient(0deg, rgba(7,6,11,.96) 0%, rgba(7,6,11,.75) 48%, rgba(7,6,11,.1) 80%); }\n  .drop .hero-copy { position: absolute; bottom: 120px; padding: 0 22px; }\n  .drop .hero-title { font-size: clamp(72px, 23cqi, 110px); }\n  .drop .hero-stats { top: auto; bottom: 22px; left: 22px; right: 22px; transform: none; grid-template-columns: repeat(4, 1fr); gap: 8px; }\n  .drop .hero-stats b { font-size: 24px; }\n  .drop .hero-stats li > span { font-size: 10px; }\n  .drop .hero-play { display: none; }\n  .drop .drop-sec { margin: 48px 12px 0; padding: 18px; }\n  .drop .drop-grid { grid-template-columns: 1fr; }\n  .drop .lineup-head { padding: 0 12px; }\n  .drop .rail-track { padding: 0 12px; }\n  .drop .payday, .drop .roster, .drop .scoreboard { margin-left: 12px; margin-right: 12px; }\n  .drop .billboard-row { grid-template-columns: 1fr; }\n  .drop .stars { gap: 6px; }\n  .drop .star { width: 46px; height: 46px; }\n  .drop .cx { height: 96px; padding: 12px; }\n  .drop .cx b { font-size: 22px; }\n  /* sections land below the two-row phone nav */\n  .drop .drop-sec, .drop .lineup, .drop .payday, .drop .roster, .drop .scoreboard { scroll-margin-top: 128px; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .drop *, .drop *::before, .drop *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }\n  .drop .rv { opacity: 1; transform: none; }\n  .drop .ticker-track { animation: none; }\n}\n"};
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
    'programming-tech': { c: 'var(--cobalt)', img: 'design-md/the-drop/showcase/assets/cat-programming-tech.jpg', name: 'Programming & Tech' },
    'data-analytics': { c: 'var(--yellow)', img: 'design-md/the-drop/showcase/assets/cat-data-analytics.jpg', name: 'Data & Analytics', light: true },
    'power-platform': { c: 'var(--violet)', img: 'design-md/the-drop/showcase/assets/cat-power-platform.jpg', name: 'Power Platform' },
    'ai-agents': { c: 'var(--magenta)', img: 'design-md/the-drop/showcase/assets/cat-ai-agents.jpg', name: 'AI & Agents' },
    'video-animation': { c: 'var(--orange)', img: 'design-md/the-drop/showcase/assets/cat-video-animation.jpg', name: 'Video & Animation' },
    'writing-docs': { c: 'var(--teal)', img: 'design-md/the-drop/showcase/assets/cat-writing-docs.jpg', name: 'Writing & Docs' },
    'graphics-design': { c: 'var(--coral)', img: 'design-md/the-drop/showcase/assets/cat-graphics-design.jpg', name: 'Graphics & Design' },
    'training-enablement': { c: 'var(--deep)', img: 'design-md/the-drop/showcase/assets/cat-training-enablement.jpg', name: 'Training & Enablement' }
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
