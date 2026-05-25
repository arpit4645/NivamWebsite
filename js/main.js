/**
 * NIVAM — Main JS: Init, scroll behavior, utilities
 */

'use strict';

// ── DOM Ready ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCounters();
  markActiveNavLink();
  initPageTransition();
});

// ── Scroll Animations (lightweight AOS) ───────────────────────
function initScrollAnimations() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  els.forEach(el => observer.observe(el));
}

// ── Counter Animation ─────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target  = parseFloat(el.dataset.counter);
  const suffix  = el.dataset.counterSuffix || '';
  const prefix  = el.dataset.counterPrefix || '';
  const duration = Number(el.dataset.counterDuration) || 2000;
  const decimals = target % 1 !== 0 ? 1 : 0;
  const start  = 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = start + (target - start) * eased;

    el.textContent = prefix + current.toFixed(decimals) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ── Active Nav Link ───────────────────────────────────────────
function markActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Page Transition ───────────────────────────────────────────
function initPageTransition() {
  document.body.classList.add('page-enter');

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only internal page links
    if (!href.startsWith('#') && !href.startsWith('http') &&
        !href.startsWith('mailto') && !href.startsWith('tel') &&
        !href.startsWith('javascript')) {
      link.addEventListener('click', e => {
        // Let browser handle normally (simple fade handled by CSS)
      });
    }
  });
}

// ── Smooth Scroll for Hash Links ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Utility Exports ───────────────────────────────────────────
window.NivamUtils = {
  /**
   * Debounce a function call
   */
  debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * Throttle a function call
   */
  throttle(fn, limit = 100) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= limit) { last = now; fn(...args); }
    };
  },

  /**
   * Format Indian phone numbers
   */
  formatPhone(num) {
    const cleaned = ('' + num).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{5})$/);
    return match ? `${match[1]} ${match[2]}` : num;
  },

  /**
   * Show a toast notification
   */
  showToast(msg, type = 'success', duration = 4000) {
    const existing = document.getElementById('nivam-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'nivam-toast';
    toast.style.cssText = `
      position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(20px);
      background:${type === 'success' ? '#43A047' : type === 'error' ? '#E53935' : '#3D1A5F'};
      color:white;padding:.75rem 1.5rem;border-radius:9999px;font-size:.875rem;
      font-weight:600;box-shadow:0 8px 32px rgba(0,0,0,.25);z-index:9999;
      opacity:0;transition:all .3s cubic-bezier(0.16,1,0.3,1);font-family:var(--font-body);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
