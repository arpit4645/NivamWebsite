/**
 * NIVAM — Complete UI Fix Script
 * Fixes all CSS issues across every file in one pass.
 */
const fs = require('fs');
const path = require('path');

let report = [];

function write(file, content) {
  fs.writeFileSync(file, content, 'utf8');
  report.push('✓ ' + file);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. VARIABLES.CSS — clean up the literal \n in main.css + add missing aliases
// ─────────────────────────────────────────────────────────────────────────────
const VARIABLES = `/* ============================================
   NIVAM — Design System Variables
   Brand: Forest Green + Warm Gold
   Philosophy: Darkness to Light
   ============================================ */

:root {

  /* ── BRAND CORE ── */
  --clr-green:          #1A6B3A;
  --clr-green-dark:     #124D2A;
  --clr-green-mid:      #1E8048;
  --clr-green-light:    #E8F5EE;
  --clr-green-glow:     rgba(26, 107, 58, 0.35);

  --clr-gold:           #F2C12E;
  --clr-gold-dark:      #C99B1A;
  --clr-gold-deep:      #A67C00;
  --clr-gold-light:     #FDF6DC;
  --clr-gold-glow:      rgba(242, 193, 46, 0.30);

  /* ── DARK BACKGROUNDS ── */
  --clr-bg-darkest:     #060E09;
  --clr-bg-dark:        #0C1810;
  --clr-bg-mid:         #112016;
  --clr-bg-surface:     #162B1C;
  --clr-bg-glass:       rgba(22, 43, 28, 0.60);

  /* ── LIGHT SECTION BACKGROUNDS ── */
  --clr-bg-light:       #F0F7F3;
  --clr-bg-ivory:       #FAFAF7;
  --clr-bg-gold-tint:   #FEFAEE;
  --clr-white:          #FFFFFF;

  /* ── TEXT ── */
  --clr-text-light:     #F2F7F4;
  --clr-text-muted-light: rgba(242, 247, 244, 0.65);
  --clr-text-dark:      #0F1E13;
  --clr-text-muted-dark: #5A7063;

  /* ── BORDERS ── */
  --clr-border-dark:    rgba(242, 193, 46, 0.15);
  --clr-border-green:   rgba(26, 107, 58, 0.20);
  --clr-border-light:   rgba(26, 107, 58, 0.12);

  /* ── GRADIENTS ── */
  --grad-hero:          linear-gradient(160deg, #060E09 0%, #0C1810 40%, #1A6B3A 100%);
  --grad-hero-radial:   radial-gradient(ellipse at 70% 50%, rgba(26,107,58,0.4) 0%, transparent 70%);
  --grad-gold:          linear-gradient(135deg, #F2C12E 0%, #C99B1A 100%);
  --grad-gold-soft:     linear-gradient(135deg, #F2C12E 0%, #E8B86D 100%);
  --grad-green:         linear-gradient(135deg, #1A6B3A 0%, #124D2A 100%);
  --grad-dark:          linear-gradient(160deg, #060E09 0%, #0C1810 100%);
  --grad-cta:           linear-gradient(135deg, #0C1810 0%, #1A6B3A 60%, #124D2A 100%);
  --grad-card-dark:     linear-gradient(145deg, rgba(22,43,28,0.9) 0%, rgba(12,24,16,0.95) 100%);
  --grad-glass:         linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
  --grad-section-light: linear-gradient(180deg, #FAFAF7 0%, #F0F7F3 100%);

  /* ── GLOW EFFECTS ── */
  --glow-gold:          0 0 40px rgba(242, 193, 46, 0.25), 0 0 80px rgba(242, 193, 46, 0.10);
  --glow-green:         0 0 40px rgba(26, 107, 58, 0.30), 0 0 80px rgba(26, 107, 58, 0.12);
  --glow-card:          0 8px 32px rgba(0, 0, 0, 0.40), 0 2px 8px rgba(242,193,46,0.08);

  /* ── SHADOWS ── */
  --shadow-card-dark:   0 4px 24px rgba(0,0,0,0.40), 0 1px 4px rgba(242,193,46,0.06);
  --shadow-card-light:  0 4px 24px rgba(26,107,58,0.10), 0 1px 4px rgba(26,107,58,0.05);
  --shadow-hover:       0 16px 48px rgba(0,0,0,0.15), 0 4px 16px rgba(26,107,58,0.15);
  --shadow-gold:        0 4px 20px rgba(242,193,46,0.40), 0 1px 6px rgba(242,193,46,0.20);
  --shadow-btn:         0 4px 16px rgba(242,193,46,0.35);
  --shadow-nav:         0 2px 24px rgba(0,0,0,0.30);

  /* ── TYPOGRAPHY ── */
  --ff-display:         'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  --ff-body:            'Poppins', system-ui, sans-serif;

  --fs-xs:   0.75rem;
  --fs-sm:   0.875rem;
  --fs-base: 1rem;
  --fs-md:   1.0625rem;
  --fs-lg:   1.125rem;
  --fs-xl:   1.25rem;
  --fs-2xl:  1.5rem;
  --fs-3xl:  clamp(1.75rem, 3vw, 2.25rem);
  --fs-4xl:  clamp(2rem, 4vw, 2.75rem);
  --fs-5xl:  clamp(2.5rem, 5.5vw, 4rem);
  --fs-hero: clamp(2.8rem, 6vw, 5rem);

  /* ── SPACING ── */
  --sp-1: 0.25rem;  --sp-2: 0.5rem;   --sp-3: 0.75rem;
  --sp-4: 1rem;     --sp-5: 1.25rem;  --sp-6: 1.5rem;
  --sp-7: 1.75rem;  --sp-8: 2rem;     --sp-10: 2.5rem;
  --sp-12: 3rem;    --sp-16: 4rem;    --sp-20: 5rem;
  --sp-24: 6rem;    --sp-32: 8rem;

  /* ── BORDER RADIUS ── */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   18px;
  --radius-xl:   24px;
  --radius-2xl:  36px;
  --radius-pill: 100px;
  --radius-full: 9999px;

  /* ── MOTION ── */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 180ms;
  --duration-mid:  380ms;
  --duration-slow: 650ms;

  /* ── LAYOUT ── */
  --container-max: 1260px;
  --container-pad: clamp(1rem, 4vw, 2.5rem);
  --section-py:    clamp(4rem, 8vw, 8rem);
  --nav-height:    80px;
  --container-wide: 1400px;

  /* ── BACKWARD COMPAT ALIASES ── */
  --clr-primary:        var(--clr-green);
  --clr-primary-dark:   var(--clr-green-dark);
  --clr-primary-light:  var(--clr-green-light);
  --clr-accent:         var(--clr-gold);
  --clr-accent-light:   var(--clr-gold-light);
  --clr-dark:           var(--clr-bg-darkest);
  --clr-charcoal:       var(--clr-bg-dark);
  --clr-text:           var(--clr-text-dark);
  --clr-text-muted:     var(--clr-text-muted-dark);
  --clr-border:         var(--clr-border-light);
  --clr-bg:             var(--clr-bg-ivory);
  --clr-bg-gold:        var(--clr-bg-gold-tint);
  --clr-surface:        var(--clr-white);

  --ff-heading:         var(--ff-display);
  --font-heading:       var(--ff-display);
  --font-body:          var(--ff-body);
  --font-primary:       var(--ff-body);
  --font-accent:        var(--ff-display);
  --font-devanagari:    'Noto Sans Devanagari', sans-serif;

  --fw-light:   300;
  --fw-regular: 400;
  --fw-medium:  500;
  --fw-semi:    600;
  --fw-bold:    700;
  --fw-black:   900;

  --transition-fast: all var(--duration-fast) var(--ease-out);
  --transition-base: all var(--duration-mid) var(--ease-smooth);
  --transition-slow: all var(--duration-slow) var(--ease-out);

  --shadow-sm:   var(--shadow-card-light);
  --shadow-md:   0 8px 28px rgba(26,107,58,0.12);
  --shadow-lg:   0 12px 40px rgba(26,107,58,0.15);
  --shadow-xl:   0 20px 60px rgba(26,107,58,0.18);
  --shadow-glow: var(--shadow-gold);

  --grad-primary: var(--grad-green);
  --grad-accent:  var(--grad-gold);
  --grad-card-hover: linear-gradient(135deg, #E8F5EE 0%, #FFFFFF 100%);

  --space-xs: 4px; --space-sm: 8px; --space-md: 16px;
  --space-lg: 24px; --space-xl: 32px; --space-2xl: 48px;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// 2. MAIN.CSS
// ─────────────────────────────────────────────────────────────────────────────
const MAIN = `/* ================================================
   NIVAM — Main: Base Styles & Typography
   ================================================ */

body {
  font-family: var(--ff-body);
  color: var(--clr-text-dark);
  background: var(--clr-bg-ivory);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-pad);
}

/* ── SECTIONS ── */
.section            { padding: var(--section-py) 0; }
.section--light     { background: var(--grad-section-light); }
.section--dark      { background: var(--clr-bg-dark); }
.section--darkest   { background: var(--clr-bg-darkest); }
.section--gold      { background: var(--clr-bg-gold); border-block: 1px solid rgba(242,193,46,0.15); }

/* ── SECTION HEADER ── */
.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--sp-14, 3.5rem);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--ff-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--clr-gold);
  margin-bottom: var(--sp-3);
}
.section-eyebrow::before,
.section-eyebrow::after {
  content: '';
  display: inline-block;
  width: 1.5rem;
  height: 1px;
  background: var(--clr-gold);
  opacity: 0.55;
}

.section-title {
  font-family: var(--ff-display);
  font-size: var(--fs-4xl);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--clr-text-dark);
  margin-bottom: var(--sp-4);
}
.section-title span { color: var(--clr-gold); font-style: italic; }

.section-subtitle {
  font-size: var(--fs-md);
  color: var(--clr-text-muted-dark);
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto;
}

/* Dark-section overrides */
.section--dark .section-title,
.section--darkest .section-title { color: var(--clr-text-light); }
.section--dark .section-eyebrow,
.section--darkest .section-eyebrow { color: var(--clr-gold); }
.section--dark .section-subtitle,
.section--darkest .section-subtitle { color: var(--clr-text-muted-light); }

/* ── PAGE HEADER (inner pages) ── */
.page-header {
  padding-top: calc(var(--nav-height) + var(--sp-16));
  padding-bottom: var(--sp-16);
  background: var(--grad-hero);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.page-header::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(242,193,46,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.page-header .container { position: relative; z-index: 2; }
.page-header h1 {
  font-family: var(--ff-display);
  font-size: var(--fs-4xl);
  font-weight: 700;
  color: var(--clr-white);
  margin-bottom: var(--sp-4);
}
.page-header p {
  color: rgba(242,247,244,0.80);
  font-size: var(--fs-md);
  max-width: 560px;
  margin-inline: auto;
  line-height: 1.7;
}

/* ── BREADCRUMB ── */
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  font-size: var(--fs-sm);
  color: rgba(242,247,244,0.55);
  margin-bottom: var(--sp-5);
}
.breadcrumb a { color: var(--clr-gold-light); transition: var(--transition-fast); }
.breadcrumb a:hover { color: var(--clr-white); }
.breadcrumb-sep { opacity: 0.35; }

/* ── UTILITY CLASSES ── */
.text-center  { text-align: center; }
.text-gold    { color: var(--clr-gold); }
.text-green   { color: var(--clr-green); }
.text-primary { color: var(--clr-primary); }
.text-accent  { color: var(--clr-accent); }
.text-muted   { color: var(--clr-text-muted); }

.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap;
}

.divider {
  width: 56px; height: 3px;
  background: var(--grad-gold);
  border-radius: var(--radius-full);
  margin: var(--sp-4) auto;
}
.divider--left { margin-left: 0; }

/* ── GRID UTILITIES ── */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-8); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-8); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-6); }

/* ── LUCIDE ICONS ── */
.lucide-icon {
  display: inline-block;
  vertical-align: middle;
  width: 1.2em; height: 1.2em;
  stroke-width: 1.5px;
  stroke: currentColor;
  fill: none;
  flex-shrink: 0;
}
.cta-arrow { transition: transform var(--duration-fast) var(--ease-out); margin-left: 4px; }
.btn:hover .cta-arrow { transform: translateX(5px); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// 3. HERO.CSS
// ─────────────────────────────────────────────────────────────────────────────
const HERO = `/* ─── HERO ─── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--clr-bg-darkest);
}

/* Background layers */
.hero__bg {
  position: absolute; inset: 0;
  background: var(--grad-hero);
  z-index: 0;
}
.hero__bg::before {
  content: '';
  position: absolute;
  top: -20%; right: -10%;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(242,193,46,0.12) 0%, transparent 70%);
}
.hero__bg-img {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(242,193,46,0.055) 1px, transparent 1px);
  background-size: 28px 28px;
  z-index: 1;
}
.hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(6,14,9,0.88) 0%, rgba(6,14,9,0.45) 55%, rgba(6,14,9,0.05) 100%);
  z-index: 2;
}
.hero__particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }

/* Content */
.hero__content {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: var(--sp-32) 0 var(--sp-20);
}
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-12);
  align-items: center;
}

/* ── Hero Text ── */
.hero__text { max-width: 580px; }

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  border: 1px solid rgba(242,193,46,0.40);
  background: rgba(242,193,46,0.07);
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--clr-gold);
  margin-bottom: var(--sp-6);
  backdrop-filter: blur(8px);
}
.hero__eyebrow-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--clr-gold);
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero__heading {
  font-family: var(--ff-display);
  font-size: var(--fs-hero);
  font-weight: 700;
  color: var(--clr-text-light);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: var(--sp-5);
}
.hero__heading .accent-line {
  display: block;
  color: var(--clr-gold);
  font-style: italic;
}

.hero__subtitle {
  font-size: var(--fs-md);
  color: rgba(242,247,244,0.70);
  line-height: 1.8;
  margin-bottom: var(--sp-8);
  max-width: 460px;
}

.hero__actions {
  display: flex;
  gap: var(--sp-4);
  flex-wrap: wrap;
  margin-bottom: var(--sp-10);
}

/* Stats */
.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-5);
  padding-top: var(--sp-8);
  border-top: 1px solid rgba(242,193,46,0.15);
}
.hero__stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
.hero__stat-num {
  font-family: var(--ff-display);
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  color: var(--clr-gold);
  line-height: 1;
}
.hero__stat-label {
  font-size: 0.7rem;
  color: rgba(242,247,244,0.50);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Visual */
.hero__visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero__img-frame {
  position: relative;
  width: 100%;
  max-width: 460px;
}
.hero__img-main {
  width: 100%;
  border-radius: var(--radius-xl);
  position: relative;
  z-index: 2;
  animation: float-hero 5s ease-in-out infinite;
  filter: drop-shadow(0 24px 48px rgba(0,0,0,0.50));
}
.hero__img-ring {
  position: absolute; inset: -12px;
  border-radius: calc(var(--radius-xl) + 12px);
  border: 1px solid rgba(242,193,46,0.22);
  z-index: 1;
  animation: ring-pulse 3s ease-in-out infinite;
}
.hero__img-badge {
  position: absolute;
  bottom: -20px; left: -20px; z-index: 3;
  background: var(--grad-gold);
  color: var(--clr-bg-darkest);
  border-radius: var(--radius-md);
  padding: 0.9rem 1.2rem;
  display: flex; align-items: center; gap: var(--sp-3);
  box-shadow: var(--shadow-gold);
  font-size: var(--fs-sm); font-weight: 600; white-space: nowrap;
}
.hero__img-badge strong { display: block; font-size: var(--fs-base); font-weight: 700; }
.hero__img-badge span  { font-size: var(--fs-xs); opacity: 0.75; }

/* Scroll indicator */
.hero__scroll {
  position: absolute; bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
  z-index: 10;
  color: rgba(242,193,46,0.55);
  font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase;
}
.hero__scroll-mouse {
  width: 22px; height: 34px;
  border: 2px solid rgba(242,193,46,0.35);
  border-radius: 11px;
  display: flex; justify-content: center; padding-top: 5px;
}
.hero__scroll-wheel {
  width: 3px; height: 7px;
  background: var(--clr-gold);
  border-radius: 2px;
  animation: scroll-wheel 1.8s ease-in-out infinite;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// 4. NAVBAR.CSS
// ─────────────────────────────────────────────────────────────────────────────
const NAVBAR = `/* ─── NAVBAR ─── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  transition: background var(--duration-mid) var(--ease-smooth),
              box-shadow var(--duration-mid) var(--ease-smooth),
              height var(--duration-mid) var(--ease-smooth);
}

.navbar--transparent { background: transparent; }

.navbar--solid {
  background: rgba(6, 14, 9, 0.95);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  box-shadow: var(--shadow-nav);
  border-bottom: 1px solid rgba(242,193,46,0.10);
  height: 68px;
}

.navbar.scrolled {
  background: rgba(6, 14, 9, 0.95);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  box-shadow: var(--shadow-nav);
  border-bottom: 1px solid rgba(242,193,46,0.10);
  height: 68px;
}

/* Light navbar for non-hero pages */
.navbar--light {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(26,107,58,0.10);
  box-shadow: 0 2px 20px rgba(26,107,58,0.07);
  height: 68px;
}

.navbar__inner {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-6);
}

/* Logo */
.navbar__logo {
  display: flex; align-items: center;
  flex-shrink: 0; text-decoration: none;
  transition: transform var(--duration-fast) var(--ease-out);
}
.navbar__logo:hover { transform: translateY(-1px); }
.navbar__logo-img,
.navbar__logo img {
  height: 46px; width: auto;
  border-radius: var(--radius-sm);
  object-fit: contain;
}

/* Nav links */
.navbar__nav {
  display: flex; align-items: center;
  gap: var(--sp-5); list-style: none;
}
.navbar__link {
  font-size: var(--fs-sm); font-weight: 600;
  color: rgba(242,247,244,0.78);
  text-decoration: none;
  position: relative; padding-bottom: 3px;
  transition: color var(--duration-fast);
  letter-spacing: 0.02em; white-space: nowrap;
}
.navbar__link::after {
  content: '';
  position: absolute; bottom: 0; left: 0;
  width: 0; height: 2px;
  background: var(--clr-gold);
  transition: width var(--duration-mid) var(--ease-out);
  border-radius: 1px;
}
.navbar__link:hover,
.navbar__link.active { color: var(--clr-gold); }
.navbar__link:hover::after,
.navbar__link.active::after { width: 100%; }

.navbar--light .navbar__link { color: var(--clr-text-dark); }
.navbar--light .navbar__link:hover,
.navbar--light .navbar__link.active { color: var(--clr-green); }
.navbar--light .navbar__link::after { background: var(--clr-green); }

/* CTA button */
.navbar__cta { flex-shrink: 0; }

/* Hamburger */
.navbar__hamburger {
  display: none;
  flex-direction: column; justify-content: center; align-items: center; gap: 5px;
  width: 40px; height: 40px; border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  transition: background var(--duration-fast) var(--ease-out); cursor: pointer;
}
.navbar--light .navbar__hamburger {
  background: rgba(26,107,58,0.07); border-color: rgba(26,107,58,0.12);
}
.navbar__hamburger:hover { background: rgba(255,255,255,0.16); }
.navbar--light .navbar__hamburger:hover { background: rgba(26,107,58,0.12); }

.hamburger-bar {
  display: block; width: 22px; height: 2px;
  background: var(--clr-gold); border-radius: 2px;
  transition: transform var(--duration-mid) var(--ease-smooth),
              opacity var(--duration-fast);
  transform-origin: center;
}
.navbar--light .hamburger-bar { background: var(--clr-green); }

.navbar__hamburger.open .hamburger-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__hamburger.open .hamburger-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
.navbar__hamburger.open .hamburger-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.navbar__mobile-menu {
  position: fixed; top: 68px; left: 0; right: 0;
  background: rgba(6, 14, 9, 0.97);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  padding: var(--sp-6) var(--sp-5); display: flex; flex-direction: column; gap: var(--sp-2);
  transform: translateY(-10px); opacity: 0; pointer-events: none;
  transition: transform var(--duration-mid) var(--ease-out), opacity var(--duration-fast) ease;
  border-bottom: 1px solid rgba(242,193,46,0.12);
  z-index: 999;
  box-shadow: 0 20px 40px rgba(6,14,9,0.5);
}
.navbar--light ~ .navbar__mobile-menu,
.navbar__mobile-menu--light {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 20px 40px rgba(26,107,58,0.10);
  border-bottom-color: rgba(26,107,58,0.10);
}
.navbar__mobile-menu.open {
  transform: translateY(0); opacity: 1; pointer-events: auto;
}
.navbar__mobile-link {
  display: block; padding: 11px 16px;
  font-size: var(--fs-base); font-weight: 600;
  color: rgba(242,247,244,0.78); text-decoration: none;
  border-radius: var(--radius-md); border-left: 3px solid transparent;
  transition: all var(--duration-fast) var(--ease-out);
  opacity: 0; transform: translateY(-8px);
}
.navbar__mobile-menu.open .navbar__mobile-link { opacity: 1; transform: translateY(0); }
.navbar__mobile-menu.open .navbar__mobile-link:nth-child(1) { transition-delay: .04s; }
.navbar__mobile-menu.open .navbar__mobile-link:nth-child(2) { transition-delay: .08s; }
.navbar__mobile-menu.open .navbar__mobile-link:nth-child(3) { transition-delay: .12s; }
.navbar__mobile-menu.open .navbar__mobile-link:nth-child(4) { transition-delay: .16s; }
.navbar__mobile-menu.open .navbar__mobile-link:nth-child(5) { transition-delay: .20s; }

.navbar__mobile-link:hover,
.navbar__mobile-link.active {
  color: var(--clr-gold); background: rgba(242,193,46,0.06);
  border-left-color: var(--clr-gold); padding-left: 20px;
}
.navbar__mobile-cta {
  margin-top: var(--sp-4);
  opacity: 0; transform: translateY(-8px);
  transition: all var(--duration-mid) var(--ease-out) .24s;
}
.navbar__mobile-menu.open .navbar__mobile-cta { opacity: 1; transform: translateY(0); }
.navbar__mobile-cta .btn { width: 100%; justify-content: center; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// 5. BUTTONS.CSS
// ─────────────────────────────────────────────────────────────────────────────
const BUTTONS = `/* ─── BUTTONS ─── */
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--ff-body); font-weight: 600; font-size: var(--fs-sm);
  letter-spacing: 0.03em; text-decoration: none; cursor: pointer;
  border: none; outline: none; border-radius: var(--radius-pill);
  transition: all var(--duration-mid) var(--ease-out);
  position: relative; overflow: hidden; white-space: nowrap;
}
/* Sizes */
.btn--lg { padding: 0.875rem 2.2rem; font-size: var(--fs-base); }
.btn--md { padding: 0.7rem 1.75rem; }
.btn--sm { padding: 0.45rem 1.3rem; font-size: var(--fs-xs); }
.btn--full { width: 100%; justify-content: center; }

/* PRIMARY — Gold CTA */
.btn--primary {
  background: var(--grad-gold); color: var(--clr-bg-darkest); font-weight: 700;
  box-shadow: var(--shadow-btn);
}
.btn--primary::after {
  content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
  transition: left 0.55s var(--ease-out);
}
.btn--primary:hover { box-shadow: 0 8px 28px rgba(242,193,46,0.50); transform: translateY(-2px) scale(1.02); }
.btn--primary:hover::after { left: 200%; }
.btn--primary:active { transform: translateY(0) scale(0.98); }

/* SECONDARY — Ghost on dark */
.btn--secondary {
  background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.28);
  color: var(--clr-text-light); backdrop-filter: blur(8px);
}
.btn--secondary:hover { background: rgba(255,255,255,0.13); border-color: rgba(255,255,255,0.50); transform: translateY(-2px); }

/* OUTLINE — Green on light bg */
.btn--outline {
  background: transparent; border: 2px solid var(--clr-green); color: var(--clr-green);
}
.btn--outline:hover { background: var(--clr-green); color: var(--clr-white); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(26,107,58,0.25); }

/* OUTLINE GOLD */
.btn--outline-gold {
  background: transparent; border: 1.5px solid rgba(242,193,46,0.48); color: var(--clr-gold);
}
.btn--outline-gold:hover { background: rgba(242,193,46,0.10); border-color: var(--clr-gold); transform: translateY(-2px); }

/* DARK — Green solid on light */
.btn--dark {
  background: var(--grad-green); color: var(--clr-white); box-shadow: 0 4px 16px rgba(26,107,58,0.30);
}
.btn--dark:hover { box-shadow: 0 8px 32px rgba(26,107,58,0.40); transform: translateY(-2px); }

/* Icons */
.btn .lucide-icon { width: 1em; height: 1em; flex-shrink: 0; }
.cta-arrow { transition: transform var(--duration-fast) var(--ease-out); margin-left: 3px; }
.btn:hover .cta-arrow { transform: translateX(5px); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// 6. CARDS.CSS
// ─────────────────────────────────────────────────────────────────────────────
const CARDS = `/* ─── BASE CARD ─── */
.card {
  background: var(--clr-white);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(26,107,58,0.09);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-mid) var(--ease-out);
  overflow: hidden;
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  border-color: rgba(242,193,46,0.30);
}

/* Dark card */
.card--dark {
  background: var(--grad-card-dark);
  border: 1px solid var(--clr-border-dark);
  box-shadow: var(--shadow-card-dark);
  color: var(--clr-text-light);
}
.card--dark:hover { border-color: rgba(242,193,46,0.38); box-shadow: var(--shadow-card-dark), var(--glow-gold); }

/* Glass card */
.card--glass {
  background: var(--clr-bg-glass);
  backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(242,193,46,0.15);
  box-shadow: var(--glow-card);
}
.card--glass:hover { border-color: rgba(242,193,46,0.38); background: rgba(22,43,28,0.75); }

/* ─── PROGRAM CARDS ─── */
.program-card {
  background: var(--clr-white);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(26,107,58,0.09);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  display: flex; flex-direction: column;
  transition: all var(--duration-mid) var(--ease-out);
  position: relative;
}
.program-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--grad-gold);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0; z-index: 1;
}
.program-card:hover { box-shadow: var(--shadow-md); transform: translateY(-5px); border-color: rgba(242,193,46,0.28); }
.program-card__img-wrap {
  position: relative; overflow: hidden;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  aspect-ratio: 16/9;
}
.program-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s var(--ease-out); }
.program-card:hover .program-card__img { transform: scale(1.05); }
.program-card__tag {
  position: absolute; top: 0.85rem; left: 0.85rem;
  background: var(--grad-green); color: var(--clr-white);
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase;
  padding: 0.25rem 0.8rem; border-radius: var(--radius-pill);
}
.program-card__body {
  padding: var(--sp-6); flex: 1; display: flex; flex-direction: column; gap: var(--sp-3);
}
.program-card__icon { color: var(--clr-gold); }
.program-card__icon .lucide-icon { width: 28px; height: 28px; }
.program-card__title { font-family: var(--ff-display); font-size: var(--fs-xl); font-weight: 700; color: var(--clr-text-dark); line-height: 1.2; }
.program-card__desc { color: var(--clr-text-muted-dark); font-size: var(--fs-sm); line-height: 1.7; flex: 1; }
.program-card__meta { display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-top: auto; }
.program-card__meta-item {
  display: flex; align-items: center; gap: 0.3rem;
  font-size: var(--fs-xs); color: var(--clr-text-muted-dark);
  background: var(--clr-bg-light); padding: 0.25rem 0.7rem;
  border-radius: var(--radius-pill); border: 1px solid var(--clr-border-light);
}

/* ─── TESTIMONIAL CARDS ─── */
.testimonial-card {
  background: var(--clr-white);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(26,107,58,0.10);
  padding: var(--sp-7);
  position: relative; overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-mid) var(--ease-out);
}
.testimonial-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.testimonial-card::before {
  content: '\\201C';
  font-family: var(--ff-display); font-size: 6rem;
  color: var(--clr-gold); opacity: 0.10;
  position: absolute; top: -1rem; left: 0.5rem;
  line-height: 1; pointer-events: none;
}
.testimonial-card__quote-mark { display: none; }
.testimonial-card__stars {
  color: var(--clr-gold); display: flex; gap: 2px; margin-bottom: var(--sp-3);
}
.testimonial-card__stars .lucide-icon { width: 16px; height: 16px; fill: var(--clr-gold); stroke: var(--clr-gold); }
.testimonial-card__text {
  color: var(--clr-text-dark); font-size: var(--fs-sm); line-height: 1.75; margin-bottom: var(--sp-5);
}
.testimonial-card__author { display: flex; align-items: center; gap: var(--sp-3); }
.testimonial-card__avatar-placeholder {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--grad-green); color: var(--clr-white);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1rem; flex-shrink: 0;
}
.testimonial-card__name { font-weight: 600; color: var(--clr-text-dark); font-size: var(--fs-sm); }
.testimonial-card__role { font-size: var(--fs-xs); color: var(--clr-text-muted-dark); margin-top: 2px; }

/* ─── STAT CARDS (on dark bg) ─── */
.stat-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--clr-border-dark);
  border-radius: var(--radius-lg);
  padding: var(--sp-8) var(--sp-7);
  text-align: center;
  transition: all var(--duration-mid) var(--ease-out);
}
.stat-card:hover {
  background: rgba(242,193,46,0.07);
  border-color: rgba(242,193,46,0.35);
  transform: translateY(-3px);
  box-shadow: var(--glow-gold);
}
.stat-card__num {
  font-family: var(--ff-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700; color: var(--clr-gold);
  line-height: 1; margin-bottom: var(--sp-2); display: block;
}
.stat-card__label {
  color: rgba(242,247,244,0.55);
  font-size: var(--fs-xs); letter-spacing: 0.06em; text-transform: uppercase;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// 7. FOOTER.CSS
// ─────────────────────────────────────────────────────────────────────────────
const FOOTER = `/* ─── FOOTER ─── */
.footer {
  background: var(--clr-bg-darkest);
  border-top: 1px solid rgba(242,193,46,0.12);
  color: rgba(242,247,244,0.60);
  font-size: var(--fs-sm);
  padding: var(--sp-20) 0 0;
}

.footer__main {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: var(--sp-10);
  padding-bottom: var(--sp-16);
}

/* Brand col */
.footer__brand {}
.footer__logo { display: inline-block; margin-bottom: var(--sp-5); }
.footer__logo-img,
.footer__logo img { height: 48px; width: auto; }

.footer__desc { color: rgba(242,247,244,0.55); line-height: 1.75; margin-bottom: var(--sp-5); }

.footer__socials {
  display: flex; gap: var(--sp-3); margin-top: var(--sp-4);
}
.footer__social-link {
  width: 38px; height: 38px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(242,193,46,0.12);
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  color: rgba(242,247,244,0.55);
  transition: all var(--duration-fast) var(--ease-out);
}
.footer__social-link:hover {
  background: rgba(242,193,46,0.12); border-color: rgba(242,193,46,0.35);
  color: var(--clr-gold); transform: translateY(-2px);
}
.footer__social-link .lucide-icon { width: 18px; height: 18px; }

/* Link cols */
.footer__col {}
.footer__col-title {
  font-family: var(--ff-display);
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--clr-gold);
  margin-bottom: var(--sp-5);
  letter-spacing: 0.02em;
}
.footer__links { display: flex; flex-direction: column; gap: var(--sp-3); }
.footer__link {
  color: rgba(242,247,244,0.55);
  text-decoration: none; font-size: var(--fs-sm);
  transition: color var(--duration-fast), padding-left var(--duration-fast);
  display: inline-flex; align-items: center; gap: var(--sp-2);
}
.footer__link:hover { color: var(--clr-gold); padding-left: 4px; }

/* Contact items */
.footer__contact-item {
  display: flex; align-items: flex-start; gap: var(--sp-3);
  color: rgba(242,247,244,0.55); margin-bottom: var(--sp-4); font-size: var(--fs-sm);
}
.footer__contact-icon { color: var(--clr-gold); flex-shrink: 0; }
.footer__contact-icon .lucide-icon { width: 18px; height: 18px; }
.footer__contact-link { color: rgba(242,247,244,0.55); transition: color var(--duration-fast); }
.footer__contact-link:hover { color: var(--clr-gold); }

/* Bottom bar */
.footer__bottom {
  border-top: 1px solid rgba(242,193,46,0.08);
  padding: var(--sp-5) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--sp-4);
}
.footer__copy { font-size: var(--fs-xs); color: rgba(242,247,244,0.35); }
.footer__legal-links { display: flex; gap: var(--sp-5); }
.footer__legal-link {
  font-size: var(--fs-xs); color: rgba(242,247,244,0.35);
  transition: color var(--duration-fast);
}
.footer__legal-link:hover { color: var(--clr-gold); }

/* WhatsApp float */
.whatsapp-float {
  position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 500;
  width: 56px; height: 56px; border-radius: 50%;
  background: #25D366; color: var(--clr-white);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(37,211,102,0.40);
  transition: all var(--duration-fast) var(--ease-out); border: none; cursor: pointer;
}
.whatsapp-float:hover { transform: scale(1.10); box-shadow: 0 8px 28px rgba(37,211,102,0.50); }
.whatsapp-float .lucide-icon { width: 28px; height: 28px; stroke: currentColor; }
.whatsapp-float__tooltip {
  position: absolute; right: calc(100% + 0.75rem); top: 50%;
  transform: translateY(-50%);
  background: var(--clr-bg-dark); color: var(--clr-text-light);
  font-size: var(--fs-xs); font-weight: 600; white-space: nowrap;
  padding: 0.35rem 0.85rem; border-radius: var(--radius-sm);
  opacity: 0; pointer-events: none;
  transition: opacity var(--duration-fast);
  border: 1px solid rgba(242,193,46,0.10);
}
.whatsapp-float:hover .whatsapp-float__tooltip { opacity: 1; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// 8. SECTIONS.CSS — full clean rewrite
// ─────────────────────────────────────────────────────────────────────────────
const SECTIONS = `/* ================================================
   NIVAM — Sections
   ================================================ */

/* ── TRUST BAR ── */
.trust-bar {
  background: var(--clr-bg-ivory);
  border-top: 1px solid rgba(26,107,58,0.10);
  border-bottom: 1px solid rgba(26,107,58,0.10);
  padding: var(--sp-4) 0;
  box-shadow: 0 2px 12px rgba(26,107,58,0.04);
}
.trust-bar__inner {
  display: flex; align-items: center; justify-content: center;
  gap: var(--sp-5); flex-wrap: wrap;
}
.trust-bar__item {
  display: flex; align-items: center; gap: var(--sp-3);
  font-size: var(--fs-sm); font-weight: 500;
  color: var(--clr-text-dark); white-space: nowrap;
}
.trust-bar__icon { color: var(--clr-gold); }
.trust-bar__icon .lucide-icon { width: 16px; height: 16px; }
.trust-bar__sep { width: 1px; height: 1.2rem; background: rgba(26,107,58,0.18); flex-shrink: 0; }

/* ── ABOUT SPLIT ── */
.about-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-16); align-items: center;
}
.about-split__visual { position: relative; }
.about-split__img-main {
  width: 100%; height: 520px; object-fit: cover;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  display: block;
}
.about-split__img-accent {
  position: absolute; width: 180px; height: 180px;
  object-fit: cover; border-radius: var(--radius-lg);
  border: 5px solid var(--clr-white); box-shadow: var(--shadow-md);
  bottom: -24px; right: -24px;
}
.about-split__experience-badge {
  position: absolute; top: 24px; left: -20px;
  background: var(--grad-gold);
  border-radius: var(--radius-lg); padding: var(--sp-5) var(--sp-6);
  text-align: center; box-shadow: var(--shadow-gold);
  animation: float-hero 4s ease-in-out infinite;
}
.about-split__experience-badge .years {
  display: block; font-family: var(--ff-display);
  font-size: var(--fs-4xl); font-weight: 700;
  color: var(--clr-bg-darkest); line-height: 1;
}
.about-split__experience-badge .label {
  font-size: var(--fs-xs); font-weight: 600;
  color: rgba(6,14,9,0.70); letter-spacing: 0.06em; text-transform: uppercase;
}

.about-split__content {}
.about-split__quote {
  font-family: var(--ff-display); font-style: italic;
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  color: var(--clr-green);
  border-left: 3px solid var(--clr-gold);
  padding: var(--sp-4) var(--sp-6);
  background: var(--clr-green-light);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin: var(--sp-6) 0; line-height: 1.4;
}
.about-split__values { display: flex; flex-direction: column; gap: var(--sp-3); margin-top: var(--sp-6); }
.about-split__value {
  display: flex; align-items: center; gap: var(--sp-3);
  font-size: var(--fs-sm); color: var(--clr-text-muted-dark);
}
.about-split__value-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--grad-gold); flex-shrink: 0;
}

/* ── PROGRAMS GRID ── */
.programs-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-7);
}

/* ── TESTIMONIALS ── */
.testimonials-section { position: relative; overflow: hidden; }
.testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-6); }
.testimonials-cta { text-align: center; margin-top: var(--sp-12); }

/* ── STATS SECTION (dark) ── */
.stats-section {
  background: var(--grad-dark);
  position: relative; overflow: hidden;
  padding: var(--section-py) 0;
}
.stats-section::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(242,193,46,0.05) 1px, transparent 1px);
  background-size: 28px 28px;
}
.stats-section::after {
  content: ''; position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 600px; height: 400px;
  background: radial-gradient(ellipse, rgba(26,107,58,0.22) 0%, transparent 70%);
  pointer-events: none;
}
.stats-grid {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-6);
}

/* ── CTA BANNER ── */
.cta-banner {
  background: var(--grad-cta);
  border-radius: var(--radius-xl);
  padding: clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 5rem);
  position: relative; overflow: hidden; text-align: center;
}
.cta-banner::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(242,193,46,0.05) 1px, transparent 1px);
  background-size: 26px 26px; border-radius: inherit; pointer-events: none;
}
.cta-banner::after {
  content: ''; position: absolute; bottom: -30%; right: -10%;
  width: 500px; height: 500px;
  background: radial-gradient(ellipse, rgba(242,193,46,0.12) 0%, transparent 65%);
  pointer-events: none;
}
.cta-banner__title {
  font-family: var(--ff-display);
  font-size: clamp(1.8rem, 4vw, 2.75rem); font-weight: 700;
  color: var(--clr-white); margin-bottom: var(--sp-4);
  position: relative; z-index: 2;
}
.cta-banner__text {
  font-size: var(--fs-md); color: rgba(255,255,255,0.80);
  margin-bottom: var(--sp-2); max-width: 520px; margin-inline: auto;
  line-height: 1.7; position: relative; z-index: 2;
}
.cta-banner__actions {
  display: flex; gap: var(--sp-4); justify-content: center;
  flex-wrap: wrap; margin-top: var(--sp-8);
  position: relative; z-index: 2;
}

/* ── STEP CIRCLES ── */
.step-circle {
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--grad-gold); color: var(--clr-bg-darkest);
  font-family: var(--ff-display); font-size: 1.3rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto var(--sp-4); box-shadow: var(--shadow-gold);
}

/* ── FOUNDER STRIP ── */
.founder-strip {
  display: grid; grid-template-columns: auto 1fr;
  gap: var(--sp-10); align-items: center;
  background: var(--clr-white); border-radius: var(--radius-xl);
  overflow: hidden; box-shadow: var(--shadow-md);
  border: 1px solid rgba(26,107,58,0.09);
}
.founder-strip__img { width: 280px; height: 320px; object-fit: cover; object-position: top; display: block; }
.founder-strip__content { padding: var(--sp-10) var(--sp-8) var(--sp-10) 0; }
.founder-strip__name {
  font-size: var(--fs-2xl); font-weight: 700;
  color: var(--clr-green); margin-bottom: var(--sp-1);
}
.founder-strip__role {
  font-size: var(--fs-xs); color: var(--clr-gold);
  font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: var(--sp-4);
}
.founder-strip__bio {
  font-size: var(--fs-md); color: var(--clr-text-muted-dark);
  line-height: 1.75; margin-bottom: var(--sp-5);
}
.founder-strip__credentials { display: flex; flex-wrap: wrap; gap: var(--sp-3); }
.credential-tag {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  background: var(--clr-green-light); border: 1px solid rgba(26,107,58,0.14);
  border-radius: var(--radius-full); padding: var(--sp-2) var(--sp-4);
  font-size: var(--fs-xs); font-weight: 600; color: var(--clr-green);
}
.credential-tag .lucide-icon { width: 12px; height: 12px; }

/* ── CONTACT LAYOUT ── */
.contact-layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: var(--sp-12); align-items: start; }
.contact-methods { display: flex; flex-direction: column; gap: var(--sp-4); margin-bottom: var(--sp-8); }
.contact-method {
  display: flex; align-items: center; gap: var(--sp-4);
  padding: var(--sp-5); background: var(--clr-bg-light);
  border: 1px solid var(--clr-border-green); border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm); transition: var(--transition-base);
}
.contact-method:hover { box-shadow: var(--shadow-md); transform: translateX(4px); border-color: rgba(242,193,46,0.28); }
.contact-method__icon {
  width: 48px; height: 48px; border-radius: var(--radius-md);
  background: var(--grad-green); color: var(--clr-white);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.contact-method__icon .lucide-icon { width: 20px; height: 20px; }
.contact-method__label { font-size: var(--fs-xs); font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--clr-gold); margin-bottom: 2px; }
.contact-method__value { font-size: var(--fs-base); font-weight: 600; color: var(--clr-text-dark); }
.contact-method__sub { font-size: var(--fs-xs); color: var(--clr-text-muted-dark); margin-top: 2px; }

.contact-hours {
  background: var(--clr-bg-light); border: 1px solid var(--clr-border-green);
  border-radius: var(--radius-lg); padding: var(--sp-6);
}
.contact-hours__title { font-weight: 700; color: var(--clr-green); margin-bottom: var(--sp-4); font-size: var(--fs-base); }
.hours-row {
  display: flex; justify-content: space-between;
  font-size: var(--fs-sm); color: var(--clr-text-muted-dark);
  padding-block: var(--sp-2); border-bottom: 1px solid var(--clr-border-light);
}
.hours-row:last-child { border-bottom: none; }
.hours-row strong { color: var(--clr-text-dark); font-weight: 600; }

/* ── CHECK ICON ── */
.check-icon { color: var(--clr-gold); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// 9. ANIMATIONS.CSS
// ─────────────────────────────────────────────────────────────────────────────
const ANIMATIONS = `/* ─── KEYFRAMES ─── */
@keyframes float-hero {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.5); }
}
@keyframes ring-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.9; transform: scale(1.03); }
}
@keyframes scroll-wheel {
  0%   { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(7px); opacity: 0; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* ─── AOS TUNING ─── */
[data-aos] {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1) !important;
  transition-duration: 600ms !important;
}

/* ─── SCROLL REVEAL ─── */
.reveal {
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.65s var(--ease-out), transform 0.65s var(--ease-out);
}
.reveal.revealed { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }

/* ─── WILL-CHANGE ─── */
.card, .btn, .program-card, .stat-card, .testimonial-card { will-change: transform; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// 10. RESPONSIVE.CSS
// ─────────────────────────────────────────────────────────────────────────────
const RESPONSIVE = `/* ─── TABLET ≤ 1024px ─── */
@media (max-width: 1024px) {
  .hero__inner { grid-template-columns: 1fr; text-align: center; gap: var(--sp-10); }
  .hero__visual { display: none; }
  .hero__stats { justify-items: center; }
  .hero__actions { justify-content: center; }
  .hero__subtitle { margin-inline: auto; }
  .about-split { grid-template-columns: 1fr; }
  .about-split__visual { display: none; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .programs-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
  .contact-layout { grid-template-columns: 1fr; }
  .footer__main { grid-template-columns: 1fr 1fr; }
}

/* ─── MOBILE ≤ 768px ─── */
@media (max-width: 768px) {
  :root {
    --section-py: clamp(3rem, 8vw, 5rem);
    --container-pad: 1.1rem;
  }

  .hero__heading { font-size: clamp(2.2rem, 8vw, 3rem); }
  .section-title  { font-size: clamp(1.7rem, 6vw, 2.2rem); }

  /* Hamburger show/hide */
  .navbar__nav   { display: none !important; }
  .navbar__cta   { display: none !important; }
  .navbar__hamburger { display: flex !important; }

  /* Grids to single column */
  .programs-grid      { grid-template-columns: 1fr; }
  .testimonials-grid  { grid-template-columns: 1fr; }
  .stats-grid         { grid-template-columns: repeat(2, 1fr); gap: var(--sp-4); }
  .footer__main       { grid-template-columns: 1fr; gap: var(--sp-8); }

  /* Inline style grid overrides */
  [style*="grid-template-columns:1fr 1fr"],
  [style*="grid-template-columns: 1fr 1fr"],
  [style*="grid-template-columns:repeat(2"],
  [style*="grid-template-columns: repeat(2"],
  [style*="grid-template-columns:repeat(3"],
  [style*="grid-template-columns: repeat(3"],
  [style*="grid-template-columns:repeat(4"],
  [style*="grid-template-columns: repeat(4"] {
    grid-template-columns: 1fr !important;
  }

  .cta-banner { padding: 2.5rem 1.5rem; border-radius: var(--radius-lg); }
  .cta-banner__actions { flex-direction: column; align-items: center; }

  .form-grid--2       { grid-template-columns: 1fr !important; }
  .program-selector   { grid-template-columns: 1fr !important; }
  .form-container     { padding: var(--sp-5) var(--sp-4) !important; }

  .founder-strip { grid-template-columns: 1fr; }
  .founder-strip__img { width: 100%; height: 200px; }
  .founder-strip__content { padding: var(--sp-6); }

  .btn--lg { padding: 0.8rem 1.8rem; font-size: var(--fs-sm); }

  .trust-bar__sep { display: none; }
  .trust-bar__inner { justify-content: flex-start; gap: var(--sp-4); }
}

/* ─── SMALL MOBILE ≤ 480px ─── */
@media (max-width: 480px) {
  .hero__heading  { font-size: clamp(1.9rem, 9vw, 2.5rem); }
  .section-title  { font-size: clamp(1.5rem, 7vw, 1.9rem); }
  .hero__stats    { grid-template-columns: 1fr 1fr 1fr; gap: var(--sp-3); }
  .stat-card      { padding: var(--sp-5) var(--sp-4); }
  .stats-grid     { grid-template-columns: 1fr 1fr; }
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// PAGE CSS — fix undefined vars & missing rules
// ─────────────────────────────────────────────────────────────────────────────
const ABOUT_CSS = `/* ─── ABOUT PAGE ─── */
.values-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-6); margin-top: var(--sp-10);
}
.value-item {
  background: var(--clr-white); border-radius: var(--radius-lg);
  padding: var(--sp-7); border: 1px solid rgba(26,107,58,0.09);
  box-shadow: var(--shadow-sm); text-align: center;
  transition: var(--transition-base);
}
.value-item:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: rgba(242,193,46,0.25); }
.value-item__icon { font-size: 2rem; margin-bottom: var(--sp-4); color: var(--clr-gold); }
.value-item__icon .lucide-icon { width: 36px; height: 36px; }
.value-item__title { font-size: var(--fs-base); font-weight: 700; color: var(--clr-green); margin-bottom: var(--sp-2); }
.value-item__text  { font-size: var(--fs-sm); color: var(--clr-text-muted-dark); line-height: 1.65; }

/* Timeline */
.timeline {
  display: flex; flex-direction: column; gap: 0;
  position: relative; max-width: 680px; margin-inline: auto;
}
.timeline::before {
  content: ''; position: absolute; left: 24px; top: 0; bottom: 0;
  width: 2px; background: var(--grad-gold); opacity: 0.30;
}
.timeline-item { display: grid; grid-template-columns: 52px 1fr; gap: var(--sp-5); padding-bottom: var(--sp-8); }
.timeline-dot {
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--grad-gold); color: var(--clr-bg-darkest);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; z-index: 1; box-shadow: var(--shadow-gold);
}
.timeline-dot .lucide-icon { width: 22px; height: 22px; }
.timeline-year {
  font-size: var(--fs-xs); font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--clr-gold); margin-bottom: var(--sp-1);
}
.timeline-title { font-size: var(--fs-lg); font-weight: 700; color: var(--clr-green); margin-bottom: var(--sp-2); }
.timeline-text  { font-size: var(--fs-sm); color: var(--clr-text-muted-dark); line-height: 1.65; }

@media (max-width: 768px) { .values-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .values-grid { grid-template-columns: 1fr; } }
`;

const BOOK_CSS = `/* ─── BOOK PAGE ─── */
.book-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: var(--sp-12); align-items: start; }
.book-info__title { font-family: var(--ff-display); font-size: clamp(1.75rem, 3vw, 2.4rem); color: var(--clr-green); margin-bottom: var(--sp-4); }
.book-info__subtitle { font-size: var(--fs-md); color: var(--clr-text-muted-dark); line-height: 1.7; margin-bottom: var(--sp-8); }
.book-perks { display: flex; flex-direction: column; gap: var(--sp-3); margin-bottom: var(--sp-8); }
.book-perk {
  display: flex; align-items: flex-start; gap: var(--sp-4);
  background: var(--clr-bg-light); border: 1px solid var(--clr-border-light);
  border-radius: var(--radius-md); padding: var(--sp-4) var(--sp-5);
  box-shadow: var(--shadow-sm);
}
.book-perk__icon { font-size: 1.4rem; flex-shrink: 0; color: var(--clr-gold); }
.book-perk__icon .lucide-icon { width: 22px; height: 22px; }
.book-perk__title { font-weight: 600; color: var(--clr-green); font-size: var(--fs-sm); margin-bottom: 2px; }
.book-perk__text { font-size: var(--fs-xs); color: var(--clr-text-muted-dark); line-height: 1.55; }
.book-testimonial {
  background: var(--grad-green);
  border-radius: var(--radius-lg); padding: var(--sp-7); color: var(--clr-white);
}
.book-testimonial__text { font-family: var(--ff-display); font-style: italic; font-size: var(--fs-xl); line-height: 1.6; margin-bottom: var(--sp-4); color: rgba(242,247,244,0.90); }
.book-testimonial__name { font-size: var(--fs-sm); font-weight: 600; color: var(--clr-gold); }

@media (max-width: 900px) { .book-layout { grid-template-columns: 1fr; } }
`;

const CONTACT_CSS = `/* ─── CONTACT PAGE ─── */
.contact-layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: var(--sp-12); align-items: start; }
.contact-methods { display: flex; flex-direction: column; gap: var(--sp-4); margin-bottom: var(--sp-8); }
.contact-method {
  display: flex; align-items: center; gap: var(--sp-4);
  padding: var(--sp-5); background: var(--clr-bg-light);
  border: 1px solid var(--clr-border-green); border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm); transition: var(--transition-base);
}
.contact-method:hover { box-shadow: var(--shadow-md); transform: translateX(4px); border-color: rgba(242,193,46,0.28); }
.contact-method__icon {
  width: 48px; height: 48px; border-radius: var(--radius-md);
  background: var(--grad-green); color: var(--clr-white);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.contact-method__icon .lucide-icon { width: 20px; height: 20px; }
.contact-method__label { font-size: var(--fs-xs); font-weight: 700; letter-spacing: .10em; text-transform: uppercase; color: var(--clr-gold); margin-bottom: 2px; }
.contact-method__value { font-size: var(--fs-base); font-weight: 600; color: var(--clr-text-dark); }
.contact-method__sub { font-size: var(--fs-xs); color: var(--clr-text-muted-dark); margin-top: 2px; }
.contact-hours {
  background: var(--clr-bg-light); border: 1px solid var(--clr-border-green);
  border-radius: var(--radius-lg); padding: var(--sp-6);
}
.contact-hours__title { font-weight: 700; color: var(--clr-green); margin-bottom: var(--sp-4); font-size: var(--fs-base); }
.hours-row { display: flex; justify-content: space-between; font-size: var(--fs-sm); color: var(--clr-text-muted-dark); padding-block: var(--sp-2); border-bottom: 1px solid var(--clr-border-light); }
.hours-row:last-child { border-bottom: none; }
.hours-row strong { color: var(--clr-text-dark); font-weight: 600; }
@media (max-width: 900px) { .contact-layout { grid-template-columns: 1fr; } }
`;

const PROGRAMS_CSS = `/* ─── PROGRAMS PAGE ─── */
.program-detail {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: var(--sp-14); align-items: center;
  padding-block: var(--sp-16);
  border-bottom: 1px solid var(--clr-border-light);
}
.program-detail:last-child { border-bottom: none; }
.program-detail--reverse .program-detail__visual { order: -1; }
.program-detail__visual img {
  width: 100%; height: 400px; object-fit: cover;
  border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);
}
.program-detail__tag {
  display: inline-block; background: var(--clr-green-light);
  color: var(--clr-green); font-size: var(--fs-xs); font-weight: 600;
  padding: 4px var(--sp-4); border-radius: var(--radius-full);
  letter-spacing: .08em; text-transform: uppercase; margin-bottom: var(--sp-4);
  border: 1px solid rgba(26,107,58,0.15);
}
.program-detail__title { font-family: var(--ff-display); font-size: clamp(1.75rem, 3vw, 2.4rem); color: var(--clr-green); margin-bottom: var(--sp-2); }
.program-detail__subtitle { font-family: var(--ff-display); font-style: italic; font-size: var(--fs-xl); color: var(--clr-gold); margin-bottom: var(--sp-5); }
.program-detail__desc { font-size: var(--fs-md); color: var(--clr-text-muted-dark); line-height: 1.75; margin-bottom: var(--sp-6); }
.program-detail__outcomes { display: flex; flex-direction: column; gap: var(--sp-3); margin-bottom: var(--sp-8); }
.program-outcome { display: flex; align-items: flex-start; gap: var(--sp-3); font-size: var(--fs-sm); color: var(--clr-text-muted-dark); }
.program-outcome .lucide-icon { color: var(--clr-gold); flex-shrink: 0; width: 16px; height: 16px; margin-top: 2px; }
.program-meta-row { display: flex; flex-wrap: wrap; gap: var(--sp-3); margin-bottom: var(--sp-8); }
.program-meta-pill {
  display: flex; align-items: center; gap: var(--sp-2);
  background: var(--clr-bg-light); border: 1px solid var(--clr-border-light);
  border-radius: var(--radius-pill); padding: var(--sp-2) var(--sp-4);
  font-size: var(--fs-xs); font-weight: 600; color: var(--clr-text-muted-dark);
}
.program-detail__actions { display: flex; flex-wrap: wrap; gap: var(--sp-3); }

.filter-bar { display: flex; flex-wrap: wrap; gap: var(--sp-3); justify-content: center; margin-bottom: var(--sp-10); }
.filter-btn {
  padding: var(--sp-2) var(--sp-5); border-radius: var(--radius-full);
  border: 1.5px solid var(--clr-border-green); background: var(--clr-white);
  font-size: var(--fs-sm); font-weight: 500; color: var(--clr-text-muted-dark);
  cursor: pointer; transition: var(--transition-fast);
}
.filter-btn:hover,
.filter-btn.active { background: var(--clr-green); border-color: var(--clr-green); color: var(--clr-white); }

@media (max-width: 768px) {
  .program-detail { grid-template-columns: 1fr; gap: var(--sp-8); padding-block: var(--sp-10); }
  .program-detail--reverse .program-detail__visual { order: 0; }
  .program-detail__visual img { height: 260px; }
}
`;

const WORKSHOPS_CSS = `/* ─── WORKSHOPS PAGE ─── */
.zoom-badge {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  background: var(--clr-green); color: var(--clr-white);
  font-size: var(--fs-xs); font-weight: 600;
  padding: 4px var(--sp-3); border-radius: var(--radius-full); letter-spacing: .06em;
}
.workshops-header-info {
  display: flex; flex-wrap: wrap; gap: var(--sp-6);
  justify-content: center; margin-top: var(--sp-8);
}
.workshops-header-stat { text-align: center; }
.workshops-header-stat strong { display: block; font-family: var(--ff-display); font-size: var(--fs-3xl); font-weight: 700; color: var(--clr-white); }
.workshops-header-stat span { font-size: var(--fs-xs); color: rgba(242,247,244,0.55); text-transform: uppercase; letter-spacing: .08em; }

.past-workshops-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-6); }
.past-card {
  background: var(--clr-white); border-radius: var(--radius-lg); padding: var(--sp-6);
  border: 1px solid rgba(26,107,58,0.09); box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
}
.past-card:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); border-color: rgba(242,193,46,0.25); }
.past-card__emoji { font-size: 2rem; margin-bottom: var(--sp-3); }
.past-card__title { font-size: var(--fs-base); font-weight: 700; color: var(--clr-green); margin-bottom: var(--sp-2); }
.past-card__meta { font-size: var(--fs-xs); color: var(--clr-text-muted-dark); margin-bottom: var(--sp-3); }
.past-card__attendees { font-size: var(--fs-sm); color: var(--clr-text-muted-dark); }

.faq-list { display: flex; flex-direction: column; gap: var(--sp-3); max-width: 700px; margin-inline: auto; }
.faq-item {
  background: var(--clr-white); border-radius: var(--radius-md);
  border: 1px solid rgba(26,107,58,0.09); overflow: hidden; box-shadow: var(--shadow-sm);
}
.faq-q {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-5) var(--sp-6); cursor: pointer;
  font-weight: 600; color: var(--clr-green); gap: var(--sp-4);
  font-size: var(--fs-sm);
}
.faq-q::after { content: '＋'; font-size: 1.25rem; color: var(--clr-gold); flex-shrink: 0; transition: transform .3s; }
.faq-item.open .faq-q::after { transform: rotate(45deg); }
.faq-a { display: none; padding: 0 var(--sp-6) var(--sp-5); font-size: var(--fs-sm); color: var(--clr-text-muted-dark); line-height: 1.7; }
.faq-item.open .faq-a { display: block; }

@media (max-width: 768px) { .past-workshops-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .past-workshops-grid { grid-template-columns: 1fr; } }
`;

const LEGAL_CSS = `/* ─── LEGAL PAGES ─── */
.legal-body { max-width: 740px; margin-inline: auto; }
.legal-body h2 {
  font-family: var(--ff-display); font-size: var(--fs-xl); color: var(--clr-green);
  margin: var(--sp-10) 0 var(--sp-4); padding-top: var(--sp-4);
  border-top: 1px solid var(--clr-border-light);
}
.legal-body h2:first-of-type { margin-top: 0; border-top: none; padding-top: 0; }
.legal-body p,
.legal-body li { font-size: var(--fs-md); color: var(--clr-text-muted-dark); line-height: 1.8; margin-bottom: var(--sp-4); }
.legal-body ul { list-style: disc; padding-left: var(--sp-6); }
.legal-body li { margin-bottom: var(--sp-2); }
.legal-body a { color: var(--clr-green); text-decoration: underline; }
.legal-meta {
  font-size: var(--fs-sm); color: var(--clr-text-muted-dark);
  margin-bottom: var(--sp-8); padding-bottom: var(--sp-6);
  border-bottom: 1px solid var(--clr-border-light);
}
`;

// ─── WRITE ALL FILES ───
write('css/variables.css',        VARIABLES);
write('css/main.css',             MAIN);
write('css/hero.css',             HERO);
write('css/navbar.css',           NAVBAR);
write('css/buttons.css',          BUTTONS);
write('css/cards.css',            CARDS);
write('css/footer.css',           FOOTER);
write('css/sections.css',         SECTIONS);
write('css/animations.css',       ANIMATIONS);
write('css/responsive.css',       RESPONSIVE);
write('css/pages/about.css',      ABOUT_CSS);
write('css/pages/book.css',       BOOK_CSS);
write('css/pages/contact.css',    CONTACT_CSS);
write('css/pages/programs.css',   PROGRAMS_CSS);
write('css/pages/workshops.css',  WORKSHOPS_CSS);
write('css/pages/legal.css',      LEGAL_CSS);

console.log('\n✅ All CSS files rewritten successfully:\n');
report.forEach(r => console.log('  ' + r));
