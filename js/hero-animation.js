/**
 * NIVAM — Hero Animation: Particles + Typing effect
 */

'use strict';

(function () {
  initParticles();
  initTypingEffect();
})();

// ── Floating Particles ────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const COUNT = 18;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size    = Math.random() * 6 + 2;           // 2–8px
    const left    = Math.random() * 100;              // 0–100%
    const delay   = Math.random() * 8;               // 0–8s
    const dur     = Math.random() * 12 + 10;         // 10–22s
    const opacity = Math.random() * 0.4 + 0.1;       // 0.1–0.5

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      opacity: ${opacity};
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
      background: rgba(${Math.random() > 0.5 ? '201,147,58' : '232,184,109'}, 0.4);
    `;

    container.appendChild(p);
  }
}

// ── Typing / Rotating Text ────────────────────────────────────
function initTypingEffect() {
  const el = document.getElementById('hero-rotating-text');
  if (!el) return;

  const phrases = [
    'Transform Your Life',
    'Nurture Your Family',
    'Grow as a Leader',
    'Build Real Relationships',
    'Be Your Best Self',
  ];

  let currentIndex = 0;
  let charIndex    = 0;
  let isDeleting   = false;
  let pauseTime    = 0;

  const TYPE_SPEED   = 65;
  const DELETE_SPEED = 35;
  const PAUSE_AFTER  = 2200;

  function tick() {
    const phrase  = phrases[currentIndex];
    const visible = phrase.substring(0, charIndex);
    el.textContent = visible;

    if (!isDeleting && charIndex === phrase.length) {
      pauseTime = PAUSE_AFTER;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % phrases.length;
      pauseTime = 400;
    }

    charIndex += isDeleting ? -1 : 1;

    const delay = pauseTime > 0
      ? pauseTime
      : isDeleting ? DELETE_SPEED : TYPE_SPEED;

    pauseTime = 0;
    setTimeout(tick, delay);
  }

  tick();
}
