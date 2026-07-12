---
version: alpha
name: Palawan-Pawnshop-design-analysis
description: "A bright, warm, high-trust Filipino consumer-finance design language extracted from palawanpawnshop.com — the visual system of Palawan Pawnshop / Palawan Express Pera Padala / PalawanPay (PFSC). Built on a clean white canvas with two loud, optimistic brand blocks: Palawan Green (#39A14A, deeper #007235) and the signature Palawan Yellow/Gold (#FFCB01). Green carries structure and trust (wordmark, primary buttons, section anchors); yellow carries invitation and action (CTA bands, highlight ribbons, 'find a branch' buttons); a hot Palawan Red (#FF020D) is used sparingly as the 'PAWNSHOP' accent for a single most-important word or active state. The mood is friendly, rounded, and approachable rather than corporate-austere — generous rounded corners, bold uppercase display type, soft drop shadows on floating cards, and full-bleed curved/wave section dividers. Ink is near-black (#101010 / #212121) on white for maximum readability. Body copy is a humanist sans (site uses Myriad Pro / Lato); for web-safe rendering map display to Poppins (rounded, friendly, high-weight) and body to Lato. This is the opposite of a dark cinematic dashboard — it is sunlit, trustworthy, and built for mass-market Filipino audiences."

colors:
  # Brand core
  green: "#39A14A"          # primary Palawan green (buttons, anchors, wordmark leaf)
  green-deep: "#007235"     # deeper green for wordmark / headings on light
  green-ink: "#02591F"      # darkest green for text on yellow
  green-soft: "rgba(57,161,74,0.12)"
  green-tint: "rgba(57,161,74,0.07)"
  yellow: "#FFCB01"         # signature Palawan gold — CTA bands, ribbons
  yellow-2: "#F4C203"       # slightly deeper gold (button hover / gradient end)
  yellow-soft: "rgba(255,203,1,0.16)"
  yellow-tint: "rgba(255,203,1,0.09)"
  red: "#FF020D"            # 'PAWNSHOP' red — single-word emphasis / active nav
  red-ink: "#C40009"
  # Neutrals
  canvas: "#FFFFFF"
  paper-1: "#F7F8F5"        # faint off-white section fill
  paper-2: "#F0F2ED"
  ink: "#101010"
  ink-2: "#212121"
  ink-3: "#414141"
  ink-muted: "#767b73"
  line: "#E3E6DF"
  line-2: "#EDEFEA"
  # Status (harmonized to brand)
  status-ok: "#39A14A"
  status-warn: "#E0A200"
  status-crit: "#C40009"
  status-info: "#007235"

typography:
  # Display maps to Poppins (rounded, friendly, heavy) to echo the brand's bold uppercase hero
  hero-title:
    fontFamily: Poppins
    fontSize: 46px
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: -0.01em
    textTransform: uppercase
  page-head:
    fontFamily: Poppins
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: -0.01em
  section-title:
    fontFamily: Poppins
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  eyebrow:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.2em
    textTransform: uppercase
  label:
    fontFamily: Poppins
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.16em
    textTransform: uppercase
  body:
    fontFamily: Lato
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: Lato
    fontSize: 12.5px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button:
    fontFamily: Poppins
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
  kpi-value:
    fontFamily: Poppins
    fontSize: 34px
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: -0.01em
  kpi-hero-value:
    fontFamily: Poppins
    fontSize: 56px
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: -0.02em

rounded:
  sm: 8px
  md: 12px
  lg: 18px
  pill: 999px

spacing:
  pad-card: 22px
  gap-tight: 10px
  gap-default: 14px
  gap-section: 44px
  content-max-width: 1180px

effects:
  card-shadow: "0 8px 24px rgba(16,16,16,0.10)"
  card-shadow-soft: "0 4px 14px rgba(16,16,16,0.07)"
  band-wave: "full-bleed curved SVG divider between white and yellow/green sections"

components:
  button-primary:      # green — trust / navigate
    backgroundColor: "{colors.green}"
    textColor: "#FFFFFF"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
    shadow: "{effects.card-shadow-soft}"
  button-gold:         # yellow — invite / act (the 'Find a Branch' style)
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.green-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
    shadow: "{effects.card-shadow-soft}"
  card:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.pad-card}"
    border: "1px solid {colors.line}"
    shadow: "{effects.card-shadow}"
  card-green:          # green feature block (reversed)
    backgroundColor: "{colors.green}"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: "{spacing.pad-card}"
  cta-band:            # signature full-width yellow action band
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.green-ink}"
    typography: "{typography.section-title}"
    padding: 26px 40px
  pill:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 5px 14px
  pill-gold:
    backgroundColor: "{colors.yellow-soft}"
    textColor: "{colors.green-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 5px 14px
  step-badge:          # numbered step chip (01, 02, ...)
    backgroundColor: "{colors.green}"
    textColor: "#FFFFFF"
    typography: "{typography.kpi-value}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  eyebrow-rule:        # green underline accent under the hero word
    backgroundColor: "{colors.yellow}"
    height: 6px
    rounded: "{rounded.pill}"

usage-notes:
  - "Green = structure & trust; Yellow = action & highlight; Red = ONE emphasized word only. Never let red carry body text or large areas."
  - "White is the dominant canvas. Color arrives in confident blocks (a yellow CTA band, a green feature card), not diffuse gradients."
  - "Display type is uppercase and heavy; friendliness comes from rounded corners + rounded font (Poppins), not from lowering the weight."
  - "Curved / wave SVG dividers separate colored sections from white — a Palawan signature. Use sparingly, one per section boundary."
  - "For editable-PPTX pipelines (leadership-slides): keep all decoration in explicit hex (green/yellow/ink), never currentColor; text stays as live HTML type."
---
