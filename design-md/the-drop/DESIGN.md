---
version: alpha
name: The-drop-design-analysis
description: "The Drop is the AutoAlchemy Hub Marketplace's own space (live 2026-10-08, hub main 7defd96 → 4a91b9e): the bounty marketplace dressed as a bold ad campaign, deliberately broken away from the Hub's Vera Hub navy console. Near-black stage #0A0A0F, warm-white text #F6F3EE, flat saturated colour blocks (magenta #E2248F, orange #FF6A1F, yellow #FFC21A, violet #7B2CF0, cobalt #1E5BFF, teal #0FA58C, coral #FF4D5E, deep #2443B8) and ONE magenta→orange gradient spent on headline words, the primary button, the dock pill and the payout amount. Anton heavy condensed caps for every headline, poster name and number; Barlow 400–800 for UI; Caveat Brush for one handwritten aside per section. Generous rounding (28 stages, 18 tiles/posters, 12 controls), round rotated stickers, a tilted yellow marquee. No shadows, no glass, no grid: depth comes from colour blocks and photography. Hero = Mika Navarro (the AI model developer) as an 81-frame sequence the cursor scrubs, feathered into the stage, with a ring of paint powder around her face. Source of truth: autoalchmey_tracker app/src/pages/marketplace/drop.module.css, drop-skin.css, drop-fonts.css, components/MarketplaceShell.module.css; approved mockup docs/mockups/2026-10-07-marketplace-options/d-campaign/."

colors:
  canvas: "#0a0a0f"
  primary: "#e2248f"
  on-primary: "#ffffff"
  hero-stage: "#07060b"
  panel: "#121219"
  panel-2: "#191922"
  well: "#0d0d13"
  menu: "#16161d"
  text: "#f6f3ee"
  text-1: "#e4dfe9"
  text-muted: "#b6b2c0"
  text-3: "#7c7889"
  ink-dark: "#121212"
  white: "#ffffff"
  line: "rgba(255,255,255,.08)"
  control-fill: "rgba(255,255,255,.07)"
  magenta: "#e2248f"
  gradient-mid: "#f2386a"
  orange: "#ff6a1f"
  yellow: "#ffc21a"
  violet: "#7b2cf0"
  cobalt: "#1e5bff"
  teal: "#0fa58c"
  coral: "#ff4d5e"
  deep: "#2443b8"
  magenta-ink: "#ff4fa8"
  ok: "#3fd9b0"
  switch-off: "#2a2833"

typography:
  hero-title:
    fontFamily: Anton
    fontSize: 196px
    fontWeight: 400
    lineHeight: 0.84
    letterSpacing: -0.005em
  section-title:
    fontFamily: Anton
    fontSize: 104px
    fontWeight: 400
    lineHeight: 0.90
    letterSpacing: 0.005em
  page-title:
    fontFamily: Anton
    fontSize: 76px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: 0.005em
  tile-title:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: 0
  stat-number:
    fontFamily: Anton
    fontSize: 52px
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: 0
  payout-amount:
    fontFamily: Anton
    fontSize: 116px
    fontWeight: 400
    lineHeight: 0.90
    letterSpacing: 0
  wordmark:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: 0.04em
  body:
    fontFamily: Barlow
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  nav:
    fontFamily: Barlow
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: 0
  button:
    fontFamily: Barlow
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.00
    letterSpacing: 0.01em
  eyebrow:
    fontFamily: Barlow
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: 0.22em
  label:
    fontFamily: Barlow
    fontSize: 11px
    fontWeight: 800
    lineHeight: 1.30
    letterSpacing: 0.16em
  script:
    fontFamily: Caveat Brush
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: 0

rounded:
  tag: 6px
  sm-button: 8px
  control: 10px
  sm: 12px
  dock: 14px
  md: 18px
  lg: 28px
  round: 50%

spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  nav-height: 64px
  nav-inset: 14px
  section-gap: 110px
  page-max: 1280px
  page-top: 104px
  control-h: 40px
  button-h: 52px

components:
  nav-bar:
    backgroundColor: "rgba(14,14,20,.98)"
    textColor: "{colors.text-muted}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    padding: 0 12px 0 22px
    shadow: "0 10px 30px -20px rgba(0,0,0,.9), inset 0 0 0 1px rgba(255,255,255,.08)"
  button-gradient:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 0 26px
  button-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 0 26px
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.sm-button}"
    padding: 0 16px
  button-round:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.round}"
    padding: 0
  ad-tile:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
    typography: "{typography.tile-title}"
    rounded: "{rounded.md}"
    padding: 74px 22px 22px
  poster:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    typography: "{typography.tile-title}"
    rounded: "{rounded.md}"
    padding: 20px
  sticker:
    backgroundColor: "{colors.ink-dark}"
    textColor: "{colors.white}"
    typography: "{typography.stat-number}"
    rounded: "{rounded.round}"
  dock:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text-muted}"
    typography: "{typography.nav}"
    rounded: "{rounded.dock}"
    padding: 6px
    shadow: "inset 0 0 0 1px rgba(255,255,255,.08)"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 44px
  well:
    backgroundColor: "{colors.well}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: 22px 24px
  kpi-poster:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.white}"
    typography: "{typography.stat-number}"
    rounded: "{rounded.md}"
    padding: 20px 20px 18px
  input:
    backgroundColor: "{colors.well}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    border: "1px solid rgba(255,255,255,.10)"
  ticker:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.tile-title}"
---

## Overview

**The Drop** is the AutoAlchemy Hub **Marketplace** as its own space: the internal bounty board (Q4 2026 incentive
program — ₱5k–15k per deliverable, scored by complexity and requester stars) presented like a high-energy ad
campaign. Ferdz asked for the space to "break away from the hub" — fun, creative, artistic, cinematic, still a
premium commercial marketplace, and **no AI slop**. Two rounds of options were rejected (a dark-amber "shatter" hero
looked cheap; three visual languages missed); Option D, built from his ad reference, was approved ("this is
fantastic, build this") with one change — the phone-mockup row became **the Scoreboard**.

It reads as a campaign, not a console: a near-black stage, one cinematic hero, then flat, saturated colour blocks
stacked like billboards — ad tiles, tall posters, player cards, a gradient billboard and a yellow score card — with
heavy condensed caps, round rotated stickers and one handwritten aside per section. Depth comes from colour and
photography, never from shadows or glass.

Scoped by `html[data-space='market']` (set by `MarketplaceShell` while the space is open, removed on the way out), so
it never leaks into the Hub. Built 2026-10-07/08; independent Opus rubric (`docs/design/DROP-RUBRIC.md`) 62 → **86
PASS** before deploy.

**Source of truth** (repo `autoalchmey_tracker`, worktree `autoalchmey_tracker-incentive`):
- `app/src/pages/marketplace/drop.module.css` — storefront tokens and components (all under `.root`)
- `app/src/pages/marketplace/Browse.tsx` — storefront structure, hero scrub, powder, dock, rail, calculator
- `app/src/components/MarketplaceShell.module.css` / `.tsx` — the floating MARKETXPLACE bar and page stage
- `app/src/pages/marketplace/drop-skin.css` — the skin that dresses every inner page (My work, Earnings, Decisions,
  Payouts, Settings, job page) in the Drop look
- `app/src/pages/marketplace/drop-fonts.css` + `app/public/fonts/drop/` — self-hosted woff2
- Approved mockup: `docs/mockups/2026-10-07-marketplace-options/d-campaign/` (`BRIEF.md`, `src/`, `assets/`)
- Model character: `d-campaign/assets/character/CHARACTER.md` (Mika Navarro)

**Key characteristics**
- Stage `#0A0A0F`, panels `#121219` / `#191922`, wells `#0D0D13`; warm text `#F6F3EE / #B6B2C0 / #7C7889`.
- Eight block colours, each a whole surface, never a stripe or a tint: magenta, orange, yellow, violet, cobalt,
  teal, coral, deep blue.
- **One gradient**, `linear-gradient(95deg, #E2248F 0%, #F2386A 45%, #FF6A1F 100%)`, used only on headline words,
  the primary button, the dock's active pill, the payout amount, the rail progress and the Scoreboard billboard.
- **Type:** Anton (uppercase) for everything that shouts — headlines, poster names, every big number; Barlow for
  UI; Caveat Brush for one note per section ("Ship it on time", "no guessing, no haggling", "this quarter, live").
- **Rounding:** 28 stages and big panels · 18 tiles, posters, cards, the nav bar · 12 buttons · 10 controls · 50 %
  stickers, round buttons and avatars.
- **Flat:** no drop shadows on content (only the nav, menus and the score stickers carry one), no glassmorphism,
  no grid background.

## Colors

| Role | Value | Use |
|---|---|---|
| `--stage` | `#0A0A0F` | page background, html/body inside the space |
| hero stage | `#07060B` | behind the hero image, so the feathered edges fall to black |
| `--panel` | `#121219` | drop section, calculator, dock, inner-page cards and panels |
| `--panel-2` | `#191922` | raised panel, hover card |
| `--well` | `#0D0D13` | calculator output, stars, matrix cells, inputs |
| menu | `#16161D` | Manage dropdown, phone search row |
| `--text` | `#F6F3EE` | headings, values (warm white, never pure `#FFF` for text on the stage) |
| text-1 | `#E4DFE9` | hero sub-line, body on images |
| `--text-2` | `#B6B2C0` | nav links, eyebrows, secondary copy |
| `--text-3` | `#7C7889` | faint: placeholders, table heads, a ₱0 amount (4.6:1 on the stage, 4.35:1 on panels — large or non-essential text only) |
| `--line` | `rgba(255,255,255,.08)` | the only hairline (dock outline, footer rule, nav inset) |
| control fill | `rgba(255,255,255,.07)` (hover `.12`) | search box, ← Hub button, search toggle |
| ink | `#121212` | text on yellow / white surfaces, sticker fill, ticker dots |
| magenta `#E2248F` · orange `#FF6A1F` · yellow `#FFC21A` | | the campaign trio; magenta also = active-link underline, wordmark X, switch on |
| violet `#7B2CF0` · cobalt `#1E5BFF` · teal `#0FA58C` · coral `#FF4D5E` · deep `#2443B8` | | tile / poster / player block colours |
| magenta ink `#FF4FA8` (+ `#FF8FC6`) | | magenta as **text or link** (inner-page accent): 6.5:1 on the stage, 6.2:1 on panels — `#E2248F` is 4.59:1 on the stage but 4.34:1 on `#121219` |
| ok `#3FD9B0` | | status OK on inner pages |
| switch off `#2A2833` | | toggle track |

**Category → block colour** (posters, tiles): Programming & Tech cobalt · Data & Analytics yellow (light text
variant) · Power Platform violet · AI & Agents magenta · Video & Animation orange · Writing & Docs teal ·
Graphics & Design coral · Training & Enablement deep. Roster cards cycle magenta → yellow → cobalt → orange →
violet → teal. Complexity tiers: Low teal · Medium violet · High magenta.

**Light-block rule:** yellow (and white) surfaces switch every child to ink `#121212`/`#141414` — tags become
`rgba(255,255,255,.7)` on ink text, small buttons invert to ink, hairlines to `rgba(0,0,0,.2)`.

## Typography

Self-hosted woff2 (latin + latin-ext subsets), `font-display: swap`, loaded only inside the space.

| Role | Spec |
|---|---|
| Hero title | Anton 400, `clamp(84px, 12.5vw, 196px)` / .84, `-0.005em`, uppercase, two stacked lines in the gradient ("BOLD / PAYOUTS") |
| Hero kicker | Anton `clamp(26px, 3vw, 42px)` / 1, uppercase ("WE TURN YOUR WORK INTO") |
| Section title | Anton `clamp(48px, 7vw, 104px)` / .9, uppercase; one word may be yellow or gradient ("JOBS THAT GET **CLAIMED.**", "THE **SCORE**BOARD") |
| Inner page title | Anton `clamp(44px, 5.4vw, 76px)` / .92, uppercase (via `drop-skin.css` on `.ft-pagehead h1`) |
| Tile title | Anton `clamp(28px, 2.3vw, 40px)` / .92, max 11ch, `text-wrap: balance` |
| Poster / player name | Anton `clamp(30px, 2.4vw, 38px)` (posters), `clamp(34px, 3vw, 46px)` (players) / .9–.92 |
| Big numbers | Anton: hero stats `clamp(34px, 3.4vw, 52px)`, billboard `clamp(48px, 6vw, 86px)`, KPI poster `clamp(40px, 4vw, 58px)`, payout `clamp(64px, 8vw, 116px)` in the gradient, `tabular-nums` |
| Wordmark | Anton 24, `0.04em` — `MARKET`**`X`**`PLACE`, the X magenta and rotated `-8deg` |
| Body | Barlow 400, 16 / 1.5; hero sub `clamp(16px, 1.25vw, 19px)`, max 44ch |
| Nav / links | Barlow 600, 14 |
| Button | Barlow 700, 15 (small 14, white chip 13) |
| Eyebrow | Barlow 700, 12, `0.22em`, uppercase, `--text-2` |
| Label / tag / table head | Barlow 800, 11–12, `0.14–0.2em`, uppercase |
| Script aside | Caveat Brush `clamp(22px, 2.2vw, 30px)` / 1, rotated `-3` to `-9deg`, often yellow, often over a hand-drawn SVG underline |

Anton is always uppercase. Never set body copy in Anton or a headline in Barlow.

## Layout

- **Space shell:** no Hub rail or top bar. A fixed floating bar, `inset: 14px var(--gut) auto`, height 64, radius
  18, transparent over the hero and solid `rgba(14,14,20,.98)` once scrolled (or always on inner pages). A
  stage-coloured band (14px → 32px when solid) sits behind it so content never shows through.
- **Bar contents:** wordmark · section links (The drop, Lineup, Payday, Who's shipping, Scoreboard) · divider ·
  My work · Earnings · Manage ▾ (admins) · search (260×40, radius 10) · `← Hub` · white avatar circle (40).
  Active link: warm white + a 2px magenta underline.
- **Storefront** runs full-bleed under the bar; gutter `clamp(16px, 4vw, 56px)`; sections 100–130px apart.
- **Inner pages:** a 1280px column, `padding: 104px var(--gut) 64px`.
- **Storefront order:** Hero → tilted ticker → *The drop* (2×2 ad tiles beside the intro) → *The lineup* (status dock
  + draggable poster rail) → *Payday* (rules + calculator) → *Who's shipping* (roster) → *The Scoreboard* → giant
  outlined footer wordmark.

## Elevation & Depth

Flat by design. Depth comes from:
1. **Block colour against the stage:** a saturated surface on `#0A0A0F` is the elevation.
2. **Photography inside blocks:** the tile/poster image covers the right side; a gradient from the block colour
   (`--c → color-mix(--c 70–80 %, transparent) → transparent`) melts it into the colour field.
3. **The hero's perspective:** `perspective: 1400px` stage, the frames tilt with the cursor.

Shadows exist only on floating chrome: nav `0 10px 30px -20px rgba(0,0,0,.9)` + inset hairline; menu
`0 18px 40px -16px rgba(0,0,0,.9)`; score stickers `0 24px 40px -26px rgba(0,0,0,.9)`. Nothing on cards.

## Components

- **Hero:** rounded (28) stage, `min-height: min(860px, 100vh - 28px)`.
  - **Layers:** frames canvas → powder canvas (`mix-blend-mode: screen`) → shade (left 92 % → 0 at 60 %, bottom
    70 % → 0 at 30 %) → copy.
  - **Copy:** left — kicker, gradient title, sub-line, gradient CTA "See the drop" + white round arrow button.
  - **Asides:** a Caveat note ("Ship it on time", rotated `-9deg`) with a yellow brush underline that draws in.
  - **Stats:** a right-hand column of four (jobs live · open for bids · monthly pool · program ends), every value
    from data.
  - **Link:** "▶ How it pays", bottom right.
- **Mika frame scrub:** 81 JPEG frames of an H3 orbit clip, painted to a canvas, cover-fit anchored at 70 % / 40 %.
  - **Scrub:** the cursor's x across the stage picks the frame (lerp .1).
  - **Tilt and parallax:** `rotateY(px·1.5deg) rotateX(−py·1deg)`, plus a `translate(px·−18px, py·−12px)` parallax
    (lerp .05).
  - **No playback on its own.** Mika moves only while the pointer moves and holds still otherwise (Ferdz
    2026-10-08).
  - **Loading:** frames load 600ms after mount; the still image `hero.jpg` shows until the first frame paints.
  - **Fine pointers only;** touch and reduced-motion keep the still.
- **Feathered edges:** the frames and the still overscan (`inset: -3%`, 106 %) and fade out on all four sides
  with an intersected mask (x 0→7 % / 88→100 %, y 0→6 % / 86→100 %), so a tilt never shows a straight edge.
- **Paint powder:** canvas particles (count `W / 4.2`, size .6–3px) in magenta / orange / violet / yellow
  (`226,36,143` · `255,106,31` · `123,44,240` · `255,194,26`). They are born on a ring around Mika's head (68 % /
  36 %) and drift outward, framing her face and never crossing it. A slight parallax follows the pointer, and the
  canvas pauses when off-screen or the tab is hidden.
- **Ticker:** a full-bleed yellow band rotated `-1.4deg` (104 % wide), Anton 26 uppercase ink with 10px ink dots.
  Items come from listings (title · developer · "UP TO ₱15K" · "OPEN NOW"). Marquee 38s linear, pauses on hover.
- **Ad tile (The drop):** an 18-radius block, `min-height: 280`.
  - **Surface:** `background: var(--c)` with the category image anchored right and the colour-field gradient
    left.
  - **Text:** an eyebrow ("FRESH DROP · BE FIRST"), the Anton title, a meta line ("{Developer} · posted by
    {Requester}"), a small white button.
  - **Badges:** a tag top-left; a round sticker top-right.
  - **Hover:** lift `-6px`, image scales 1.07, sticker spins from `-12deg` to `6deg`.
- **Sticker:** an 84px circle (74 on posters), ink fill, Anton 25, rotated `-12deg`.
  - **Text:** "₱10K / UP TO", or "YEARLY / INCENTIVE" (white fill, ink text, 17px), or a delivered star/paid
    stamp.
- **Poster (lineup rail):** `clamp(250px, 22vw, 320px)` × `clamp(400px, 34vw, 480px)`, radius 18. The image sits
  on top, with a colour field rising from the bottom.
  - **Main line:** the **developer** in Anton (or "OPEN FOR BIDS" when unclaimed).
  - **Below:** the job title (Barlow 700 15), "Posted by {requester}" (12 / 600 / .8), and a foot rule with
    "{Tier} · {Status}" on the left and the range or "Yearly incentive" on the right.
  - **Hover:** `-8px` and `rotate(-.6deg)`.
- **Rail:** drag with momentum glide, arrow keys, and round prev/next buttons. A 4px progress bar shows the
  gradient thumb.
- **Status dock:** a panel pill group (radius 14, inset hairline) of Unclaimed · Claimed · In review · Delivered
  · All, each with a count chip.
  - **Active state:** a gradient pill that **slides** between buttons (left/top/width/height .45s punch);
    `aria-pressed` on each button.
  - **Re-flow:** switching re-flows the posters (fade + rise 36px + scale .94, 560ms, 50ms stagger, max 8).
- **Payday calculator:** a panel (radius 28) holding these controls:
  - Three complexity cards (110px, radius 12, `color-mix(--c 38 %, #121219)`; selected = full colour, lifted 4px).
  - Five 52px star buttons on wells (yellow when on).
  - Two toggles (48×28, magenta when on).
  - The **payout amount** in gradient Anton (falls to `--text-3` at ₱0, with the reason line).
  - The 3×3 grid matrix (well cells; the hit cell turns white and scales 1.06).
- **Rules list:** numbered `01–04` in Anton 30 beside Barlow copy.
- **Player card (Who's shipping):**
  - **Surface:** a block colour, `min-height: 260`, radius 18, with a giant 190px rank number at 18 % opacity
    bleeding off the top-right.
  - **Content:** an initials disc, the Anton name, "{n} jobs in flight", then job chips (6-radius,
    `rgba(0,0,0,.28)`, ink on hover) that open the job.
- **Scoreboard:** a panel with `radial-gradient(120% 90% at 50% 120%, #2A0F2F, #120C1D 45%, #0B0A10 75%)`.
  - **Gradient billboard (ink text):** three Anton stats, plus a pool meter (a 26px ink track with a white fill
    that grows to "spoken for / ₱150,000").
  - **Yellow "Your quarter" card:** Anton numbers and a Caveat note.
  - **Below:** three white 132px round stat stickers, rotated −8 / 5 / −4deg.
- **Footer:** a giant outlined `MARKETXPLACE` (Anton `clamp(64px, 17.5vw, 290px)`, transparent fill,
  `1.5px rgba(255,255,255,.22)` stroke), then a hairline row of links.
- **Buttons:**
  - **Gradient primary:** 52h, radius 12, Barlow 700 15, hover `brightness(1.08)`.
  - **Yellow and white variants:** the white chip is 36h, radius 8.
  - **Round:** white, 52, radius 50 %.
  - **All:** `:active scale(.96)` on the punch curve.
- **Focus:** `outline: 3px solid #FFC21A; outline-offset: 3px` everywhere (yellow reads on every block colour
  except yellow, where the offset clears it). Search gets a 2px yellow ring.
- **Inner pages (`drop-skin.css`):**
  - **KPI tiles:** solid poster blocks — magenta, yellow (ink text), cobalt and orange in rotation, radius 18,
    Anton numbers, Barlow 800 uppercase labels.
  - **Cards and panels:** `#121219`, no border, radius 18.
  - **Primary buttons:** gradient; secondary buttons are white with ink text.
  - **Inputs:** on wells, radius 10, yellow focus outline.
  - **Tables:** heads in Barlow 800 11 uppercase; rows transparent, hover `rgba(255,255,255,.03)`.
  - **Empty states:** a panel with an Anton title.
  - **Section heads:** an Anton title, the hollow numeral hidden, and the count in a yellow 34px pill.
- **Loading / error:** pulse skeletons on panels (.5 ↔ .9 opacity, 1.4s); the error state is a panel with an
  Anton heading.

## Motion

| Token | Value |
|---|---|
| `--ease` | `cubic-bezier(.16, 1, .3, 1)`: settle (reveals, image scale, meters) |
| `--punch` | `cubic-bezier(.34, 1.36, .64, 1)`: overshoot (buttons, stickers, tiles, dock pill, stars) |

| Motion | Spec |
|---|---|
| Hero entrance | image `scale(1.18) brightness(.2) saturate(.4) → scale(1.06)`, 1.6s ease; copy rises 40px, .9s, staggered .08–.5s; underline stroke draws (dashoffset 320 → 0, 1s, .9s delay) |
| Hero scrub | cursor-driven only (see the frame scrub component); no idle playback |
| Powder | continuous while visible; pauses off-screen and on hidden tabs |
| Ticker | 38s linear marquee, pause on hover (continuous, decorative) |
| Scroll reveal | `.rv`: opacity 0, `translateY(46px) scale(.98)` → none; .8s/.9s ease, once |
| Hover | tiles `-6px`, posters `-8px rotate(-.6deg)`, images scale 1.06–1.07 (1–1.2s ease), stickers spin to `6deg` scale 1.06, stars `-3px rotate(-6deg)`, play button scale 1.12 |
| Dock | pill slides .45s punch; poster re-flow 560ms punch, 50ms stagger |
| Calculator | complexity card lift .4s punch, matrix hit scale 1.06, amount counts up |
| Pool meter | width grows 1.1s ease on reveal |
| Count-up | hero stats and KPI tiles count from 0 on mount (rAF, so frozen in hidden tabs until visible) |

`prefers-reduced-motion: reduce` → every animation and transition collapses to ~0, reveals show in their final
state, the ticker stops, the frame canvas stays hidden (the still image shows).

## Imagery

- **Hero model: Mika Navarro**, an AI-generated character (first seen in the Vera AI Assist launch visuals), the
  Marketplace's "model developer". She is not a real person or colleague.
  - **Look:** 27, Manila; a shoulder-length dark-brown bob; an oversized charcoal knit sweater over a white tee;
    black over-ear headphones around her neck; a laptop; no logos.
  - **Lighting:** a near-black stage, a magenta / orange / violet paint-powder burst, magenta + orange rim light.
  - **Identity references:** `reference.jpg` for stills; bind ONE single-view still (`hero-mika.png`) for video
    (MiniMax H3), never the multi-view sheet. Full profile: `CHARACTER.md`.
- **Category posters (`cat-<slug>.jpg`):** the left ~55 % is a flat colour field (the block colour) for text; a
  product object sits on the right in a burst of the same colour's paint powder (a laptop with code, a 3D bar
  chart, a robot head, etc.).
- Photography and canvas only — no stock icons, no isometric illustrations, no emoji.

## Do's and Don'ts

**Do**
- Make every block a whole colour surface; put the image inside the block and melt it with the colour field.
- Keep Anton uppercase for every headline, name and number; Barlow for everything you read.
- Spend the gradient only on its five uses (headline words, primary button, dock pill, payout, billboard/progress).
- Show **unclaimed first** everywhere; claimed listings show the **developer as the big line** and **"Posted by
  {requester}"** small; visibility-only listings say "Yearly incentive" instead of a ₱ amount.
- Take every number from the API (counts, pool, amounts, dates) and scope quarter totals to the program window.
- Use `:where()` for element resets inside CSS-module roots so component classes win.
- Set the space's tokens at `html[data-space='market']`, not on a nested element, so portals and inner pages
  inherit them.

**Don't**
- No Hub chrome or look inside the space: no navy/ice-blue, no Michroma, no blueprint grid, no `data-skin`.
- No shattering / breaking-apart / particle-explosion hero effects ("looks cheap"), and no phone-mockup row.
- No idle autoplay of the hero video: it moves only with the pointer.
- No glassmorphism, no accent stripes or gradient edges, no soft drop shadows on cards, no generic marketing copy.
- No gradient on body text, labels or small UI.
- No pure-white body text on the stage (use `#F6F3EE`); no `#E2248F` magenta as small text on panels (use `#FF4FA8`).

## Responsive Behavior

| Width | Change |
|---|---|
| ≤ 1180 | the bar drops the storefront section links and the divider |
| ≤ 1100 | hero note hidden; drop, payday and scoreboard grids go to one column |
| ≤ 760 | the bar wraps: links become a swipeable strip under it; search collapses to an icon that opens a row below; wordmark 20px; inner pages pad 120px top |
| ≤ 760 hero | stage `min-height: 760`; copy pinned to the bottom (`bottom: 120px`); shade turns vertical; title `clamp(72px, 23vw, 110px)`; stats become a 4-up row along the bottom (24px numbers, 10px labels); play link hidden |
| ≤ 760 sections | 12px side margins; ad tiles one column; billboard stats one column; stars 46px; complexity cards 96px with 22px titles; section anchors `scroll-margin-top: 128px` |

No horizontal overflow at 1440 or 390.

## Agent Prompt Guide

"Build it like the Marketplace / The Drop" means:
- A near-black `#0A0A0F` stage, a floating rounded bar, and one cinematic hero.
- Then flat saturated colour blocks (magenta, yellow, cobalt, orange, violet, teal, coral, deep), each holding a
  photo that melts into its colour field.
- Anton uppercase headlines with one magenta→orange gradient word, Barlow UI, and one Caveat Brush aside per
  section.
- Round rotated stickers for prices and states, and a tilted yellow marquee.
- Punchy overshoot hovers; no shadows, no glass, no grid.
- Start from `drop.module.css` (component CSS) and `drop-skin.css` (theming existing pages); for a stand-alone page,
  start from the mockup `d-campaign/src/`.

## Relationship to other entries

- [`vera-hub`](../vera-hub/DESIGN.md): the Hub's own console system (Corp Dark / Corp Light). The Drop deliberately
  replaces it inside the Marketplace space — the shell sets `data-theme="corp-dark"` underneath only so existing
  page markup resolves, and the Drop tokens override it at higher specificity. Do not mix the two on one screen.
- [`vera-transmutation`](../vera-transmutation/DESIGN.md): leadership plan pages; unrelated language.
- [`autoalchemy`](../autoalchemy/DESIGN.md): warm paper review pages; unrelated language.
