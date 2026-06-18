/**
 * NIVAM — UI Enhancements JS
 * Handles all 7 interactive UI improvements.
 * Safe to add to every page without side-effects.
 */
'use strict';

(function () {

  /* ──────────────────────────────────────────────────────────
     UTIL: Run after DOM is ready
  ────────────────────────────────────────────────────────── */
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ──────────────────────────────────────────────────────────
     1. SCROLL PROGRESS BAR
  ────────────────────────────────────────────────────────── */
  function initScrollProgressBar() {
    // Inject the bar element once
    if (document.getElementById('scroll-progress-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    document.body.prepend(bar);

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop    = window.scrollY;
          const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
          const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          bar.style.width    = pct + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────────────────────
     2. NAVBAR BLUR ON SCROLL (extends existing navbar logic)
  ────────────────────────────────────────────────────────── */
  function initNavbarScrollBlur() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const THRESHOLD = 80;
    function update() {
      if (window.scrollY > THRESHOLD) {
        navbar.classList.add('enh-scrolled');
      } else {
        navbar.classList.remove('enh-scrolled');
      }
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ──────────────────────────────────────────────────────────
     4. ANIMATED VERTICAL TIMELINE (about.html)
  ────────────────────────────────────────────────────────── */
  function initTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger based on item index
          const idx   = Array.from(items).indexOf(entry.target);
          const delay = idx * 120;
          setTimeout(() => {
            entry.target.classList.add('timeline-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(item => observer.observe(item));
  }

  /* ──────────────────────────────────────────────────────────
     5. TESTIMONIALS AUTO-SLIDING CAROUSEL
  ────────────────────────────────────────────────────────── */
  function initTestimonialsCarousel() {
    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.testimonial-card'));
    if (cards.length < 2) return;

    // Build carousel wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'testimonials-carousel-wrapper';

    const track = document.createElement('div');
    track.className = 'testimonials-track';

    cards.forEach(card => {
      grid.removeChild(card);
      track.appendChild(card);
    });

    wrapper.appendChild(track);

    // Prev / Next buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-btn--prev';
    prevBtn.setAttribute('aria-label', 'Previous testimonial');
    prevBtn.innerHTML = '&#8592;';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-btn--next';
    nextBtn.setAttribute('aria-label', 'Next testimonial');
    nextBtn.innerHTML = '&#8594;';

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(nextBtn);

    // Dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';

    // Replace grid content
    grid.parentNode.insertBefore(wrapper, grid);
    grid.style.display = 'none';

    // State
    let current       = 0;
    const TRANSITION  = 500;

    // Determine visible count based on viewport
    function getVisibleCount() {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640)  return 2;
      return 1;
    }

    function getTotalSlides() {
      const vis = getVisibleCount();
      return Math.max(1, cards.length - vis + 1);
    }

    function goTo(idx) {
      const vis   = getVisibleCount();
      const total = getTotalSlides();
      current     = ((idx % total) + total) % total;

      const pct   = (100 / vis) * current;
      track.style.transform = `translateX(-${pct}%)`;

      // Update dots
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      const total = getTotalSlides();
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Rebuild on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildDots();
        goTo(0);
      }, 200);
    });

    // Insert dots after wrapper
    wrapper.parentNode.insertBefore(dotsContainer, wrapper.nextSibling);

    // Init
    buildDots();
    goTo(0);
  }

  /* ──────────────────────────────────────────────────────────
     6. SECTION REVEAL — ENHANCED FADE-UP
     (Works alongside existing AOS mechanism)
  ────────────────────────────────────────────────────────── */
  function initSectionRevealEnhanced() {
    // Target major sections that aren't already handled
    const selectors = [
      '.section-header',
      '.programs-grid',
      '.testimonials-section',
      '.stats-grid',
      '.about-split',
      '.values-grid',
      '.cta-banner',
      '.contact-layout',
      '.book-layout',
      '.filter-bar',
      '.program-detail',
      '.founder-strip',
      '.timeline',
      '.past-workshops-grid',
      '.faq-list',
      '#delivery-formats .container > *'
    ];

    // Add .enh-reveal to unprocessed section children
    document.querySelectorAll(selectors.join(',')).forEach(el => {
      if (!el.hasAttribute('data-aos') && !el.classList.contains('enh-reveal')) {
        el.classList.add('enh-reveal');
      }
    });

    // Add stagger to grids
    const staggerSelectors = [
      '.values-grid',
      '.programs-grid',
      '.stats-grid',
      '.past-workshops-grid',
      '.workshops-list',
      '.contact-methods',
    ];
    document.querySelectorAll(staggerSelectors.join(',')).forEach(el => {
      el.classList.add('enh-stagger');
    });

    // Observe .enh-reveal elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('enh-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.enh-reveal').forEach(el => observer.observe(el));

    // Observe stagger containers
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('enh-visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.enh-stagger').forEach(el => staggerObserver.observe(el));
  }

  /* ──────────────────────────────────────────────────────────
     7. HERO COUNTER ANIMATION
     (Enhances existing counter — fires immediately on load
      or when stats enter viewport)
  ────────────────────────────────────────────────────────── */
  function initHeroCounters() {
    const counters = document.querySelectorAll('.hero__stat-num[data-counter]');
    if (!counters.length) return;

    // Already handled by main.js initCounters() via IntersectionObserver
    // This ensures they also animate if already in viewport on load
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el       = entry.target;
          const target   = parseFloat(el.dataset.counter)  || 0;
          const suffix   = el.dataset.counterSuffix || '';
          const duration = 2000;
          const start    = performance.now();

          function tick(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out expo
            const eased    = 1 - Math.pow(2, -10 * progress);
            const value    = Math.floor(eased * target);
            el.textContent = value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  /* ──────────────────────────────────────────────────────────
     BOOTSTRAP ALL
  ────────────────────────────────────────────────────────── */
  onReady(() => {
    initScrollProgressBar();
    initNavbarScrollBlur();
    initTimeline();
    initTestimonialsCarousel();
    initSectionRevealEnhanced();
    initHeroCounters();
  });

})();
