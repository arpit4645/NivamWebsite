'use strict';
/**
 * NIVAM — Modern UI Module
 * Handles: loading screen, Lenis smooth scroll,
 * magnetic buttons, text scramble, SVG stat rings.
 */

/* ─── LOADING SCREEN ─── */
(function () {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  function dismiss() {
    screen.classList.add('loaded');
    // Re-enable scroll after dismiss
    document.body.style.overflow = '';
  }

  // Prevent scroll while loading
  document.body.style.overflow = 'hidden';

  // Dismiss after 2 seconds OR on window load — whichever is later (max 3s)
  let loadFired = false;
  let timerFired = false;

  function tryDismiss() {
    if (loadFired && timerFired) dismiss();
  }

  window.addEventListener('load', () => {
    loadFired = true;
    tryDismiss();
  });

  setTimeout(() => {
    timerFired = true;
    tryDismiss();
  }, 2000);

  // Fallback: force dismiss at 3.5s regardless
  setTimeout(dismiss, 3500);
})();

/* ─── LENIS SMOOTH SCROLL ─── */
(function () {
  function tryInitLenis() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
      duration: 1.25,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose for other scripts
    window._lenis = lenis;
  }

  // Try after DOM, then again after full load
  document.addEventListener('DOMContentLoaded', tryInitLenis);
  window.addEventListener('load', tryInitLenis);
})();

/* ─── MAGNETIC BUTTONS ─── */
(function () {
  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const buttons = document.querySelectorAll('.btn--primary, .btn--dark');

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height) * 0.85;

        if (dist < maxDist) {
          const factor = 0.18; // subtle pull
          btn.style.transform = 'translate(' + (dx * factor) + 'px, ' + (dy * factor) + 'px)';
        }
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/* ─── TEXT SCRAMBLE ─── */
(function () {
  var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function scramble(el) {
    var original = el.getAttribute('data-scramble-text') || el.textContent;
    el.setAttribute('data-scramble-text', original);
    var frame = 0;
    var total = 18;

    var id = setInterval(function () {
      el.textContent = original.split('').map(function (ch, i) {
        if (ch === ' ' || ch === '.' || ch === ',' || ch === '!' || ch === '&') return ch;
        if (frame / total > i / original.length) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      frame++;
      if (frame > total) {
        clearInterval(id);
        el.textContent = original;
      }
    }, 38);
  }

  function init() {
    var targets = document.querySelectorAll('[data-scramble]');
    if (!targets.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(function () { scramble(entry.target); }, 120);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    targets.forEach(function (el) { obs.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/* ─── SVG STAT RINGS ANIMATION ─── */
(function () {
  var CIRCUMFERENCE = 2 * Math.PI * 54; // r = 54

  function animateCounter(el, target, suffix) {
    var duration = 2200;
    var start = performance.now();
    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(2, -10 * progress);
      var val = Math.floor(eased * target);
      el.textContent = val.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function init() {
    var rings = document.querySelectorAll('.stat-ring__fill[data-pct]');
    if (!rings.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var ring = entry.target;
        var pct = parseFloat(ring.dataset.pct) || 0;
        var filled = (pct / 100) * CIRCUMFERENCE;

        // Animate the ring stroke
        ring.style.strokeDasharray = filled + ' ' + CIRCUMFERENCE;

        // Animate the counter number
        var numEl = ring.closest('.stat-ring').querySelector('.stat-ring__num');
        if (numEl) {
          var target = parseFloat(numEl.dataset.target) || 0;
          var suffix = numEl.dataset.suffix || '';
          animateCounter(numEl, target, suffix);
        }

        obs.unobserve(ring);
      });
    }, { threshold: 0.25 });

    rings.forEach(function (r) {
      r.style.strokeDasharray = '0 ' + CIRCUMFERENCE;
      obs.observe(r);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
