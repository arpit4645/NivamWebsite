/**
 * NIVAM — Navbar: sticky + hamburger + scroll transparency
 */

'use strict';

(function () {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('navbar-hamburger');
  const mobileMenu = document.getElementById('navbar-mobile-menu');

  if (!navbar) return;

  // ── Scroll State ──────────────────────────────────────────
  const SCROLL_THRESHOLD = 40;
  let lastScrollY = 0;
  let ticking = false;

  function updateNavbarState() {
    const scrollY = window.scrollY;

    if (scrollY > SCROLL_THRESHOLD) {
      navbar.classList.remove('navbar--transparent');
      navbar.classList.add('navbar--solid');
    } else {
      navbar.classList.remove('navbar--solid');
      navbar.classList.add('navbar--transparent');
    }

    // Hide on scroll down (only when menu is closed)
    if (!mobileMenu?.classList.contains('open')) {
      if (scrollY > lastScrollY && scrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbarState);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load
  updateNavbarState();

  // ── Hamburger Toggle ────────────────────────────────────
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);

      // Prevent body scroll when menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';

      // Always show navbar when menu is open
      if (isOpen) {
        navbar.classList.add('navbar--solid');
        navbar.style.transform = 'translateY(0)';
      }
    });

    // ── Close on mobile link click ───────────────────────
    mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // ── Close on outside click ───────────────────────────
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) closeMobileMenu();
    });

    // ── Close on Escape ──────────────────────────────────
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Re-evaluate navbar state
    updateNavbarState();
  }

})();
