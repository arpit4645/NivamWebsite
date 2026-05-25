/**
 * NIVAM — Scroll Animations (Extended AOS behaviors)
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initStickySection();
  initProgressBars();
});

// ── Parallax Effect ───────────────────────────────────────────
function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        parallaxEls.forEach(el => {
          const speed  = parseFloat(el.dataset.parallax) || 0.3;
          const rect   = el.getBoundingClientRect();
          const offset = (rect.top + scrollY) * speed * -1;
          el.style.transform = `translateY(${offset * 0.1}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ── Sticky Section Header ─────────────────────────────────────
function initStickySection() {
  const stickies = document.querySelectorAll('[data-sticky-section]');
  stickies.forEach(el => {
    el.style.position = 'sticky';
    el.style.top = 'calc(var(--nav-height) + 1.5rem)';
    el.style.alignSelf = 'flex-start';
  });
}

// ── Progress Bars ─────────────────────────────────────────────
function initProgressBars() {
  const bars = document.querySelectorAll('[data-progress]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar     = entry.target;
        const value   = bar.dataset.progress || '0';
        const fill    = bar.querySelector('.progress-fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = `${value}%`;
          }, 200);
        }
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}
