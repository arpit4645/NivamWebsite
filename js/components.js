'use strict';

(function () {
  const NAV_LINKS = [
    { href: 'index.html',     label: 'Home',      key: 'home' },
    { href: 'about.html',     label: 'About',     key: 'about' },
    { href: 'programs.html',  label: 'Programs',  key: 'programs' },
    { href: 'workshops.html', label: 'Workshops', key: 'workshops' },
    { href: 'contact.html',   label: 'Contact',   key: 'contact' },
  ];

  class SiteNavbar extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';
      const page        = this.getAttribute('page') || '';
      const transparent = this.hasAttribute('transparent');

      const desktopLinks = NAV_LINKS.map(({ href, label, key }) =>
        `<a href="${href}" class="navbar__link${page === key ? ' active' : ''}">${label}</a>`
      ).join('');

      const mobileLinks = NAV_LINKS.map(({ href, label, key }) =>
        `<a href="${href}" class="navbar__mobile-link${page === key ? ' active' : ''}">${label}</a>`
      ).join('');

      this.innerHTML = `
        <header id="navbar" class="navbar ${transparent ? 'navbar--transparent' : 'navbar--solid'}" role="banner">
          <div class="navbar__inner">
            <a href="index.html" class="navbar__logo" aria-label="Nivam Home">
              <img src="assets/images/logo.png" alt="Nivam Logo" class="navbar__logo-img">
            </a>
            <nav class="navbar__nav" aria-label="Primary navigation">
              ${desktopLinks}
            </nav>
            <div class="navbar__cta">
              <a href="book.html" class="btn btn--primary btn--sm">Book a Call</a>
            </div>
            <button id="navbar-hamburger" class="navbar__hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="navbar-mobile-menu">
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
            </button>
          </div>
        </header>
        <div id="navbar-mobile-menu" class="navbar__mobile-menu" role="navigation" aria-label="Mobile navigation">
          ${mobileLinks}
          <div class="navbar__mobile-cta">
            <a href="book.html" class="btn btn--primary btn--full">Book a Free Call</a>
          </div>
        </div>
      `;
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';
      this.innerHTML = `
        <footer class="footer" role="contentinfo">
          <div class="container">
            <div class="footer__main">
              <div class="footer__brand">
                <a href="index.html" class="footer__logo">
                  <img src="assets/images/logo.png" alt="Nivam" class="footer__logo-img">
                </a>
                <p class="footer__desc" style="margin-bottom:0.5rem;font-weight:600;">NIVAM Life Consultant &mdash; Guiding Lives Towards Light</p>
                <p class="footer__desc">Empowering transformation through wisdom, awareness, and conscious growth.</p>
                <div class="footer__socials">
                  <a href="https://www.instagram.com/nivamlifeconsultant" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Follow Nivam on Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a href="https://www.facebook.com/nivamlifeconsultant" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Follow Nivam on Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://www.youtube.com/@nivamlifeconsultant" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Nivam on YouTube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/company/nivam-life-consultant" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Nivam on LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>
              <div class="footer__col">
                <h3 class="footer__col-title">Programs</h3>
                <ul class="footer__links">
                  <li><a href="programs.html#being-your-best" class="footer__link">Being Your Best</a></li>
                  <li><a href="programs.html#rising-leaders" class="footer__link">Rising Leaders</a></li>
                  <li><a href="programs.html#parvarish" class="footer__link">Parvarish</a></li>
                  <li><a href="programs.html#sambandh-hi-sukh" class="footer__link">Sambandh Hi Sukh</a></li>
                  <li><a href="programs.html#super-mom" class="footer__link">Super Mom</a></li>
                  <li><a href="programs.html#academic-excellence" class="footer__link">Academic Excellence</a></li>
                </ul>
              </div>
              <div class="footer__col">
                <h3 class="footer__col-title">Company</h3>
                <ul class="footer__links">
                  <li><a href="about.html" class="footer__link">About Us</a></li>
                  <li><a href="workshops.html" class="footer__link">Live Workshops</a></li>
                  <li><a href="book.html" class="footer__link">Book a Call</a></li>
                  <li><a href="contact.html" class="footer__link">Contact</a></li>
                  <li><a href="privacy.html" class="footer__link">Privacy Policy</a></li>
                  <li><a href="terms.html" class="footer__link">Terms of Service</a></li>
                </ul>
              </div>
              <div class="footer__col">
                <h3 class="footer__col-title">Get in Touch</h3>
                <div class="footer__contact-item">
                  <span class="footer__contact-icon"><i data-lucide="mail" class="lucide-icon"></i></span>
                  <a href="mailto:nivamlifeconsultant@gmail.com" class="footer__contact-link">nivamlifeconsultant@gmail.com</a>
                </div>
                <div class="footer__contact-item">
                  <span class="footer__contact-icon"><i data-lucide="phone" class="lucide-icon"></i></span>
                  <a href="tel:+918866067671" class="footer__contact-link">+91 8866067671</a>
                </div>
                <div class="footer__contact-item">
                  <span class="footer__contact-icon"><i data-lucide="map-pin" class="lucide-icon"></i></span>
                  <span>811, IFC, VIP Road, Vesu, Surat – 395007 &middot; Online Worldwide</span>
                </div>
              </div>
            </div>
            <div class="footer__bottom">
              <p class="footer__copy">&copy; 2026 Nivam Life Consultant. All rights reserved.</p>
              <div class="footer__legal-links">
                <a href="privacy.html" class="footer__legal-link">Privacy</a>
                <a href="terms.html" class="footer__legal-link">Terms</a>
              </div>
            </div>
          </div>
        </footer>
        <button id="whatsapp-float" class="whatsapp-float" aria-label="Chat on WhatsApp">
          <span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:30px;height:30px;fill:currentColor;">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
          </span>
          <span class="whatsapp-float__tooltip">Chat with us!</span>
        </button>
      `;
    }
  }

  customElements.define('site-navbar', SiteNavbar);
  customElements.define('site-footer', SiteFooter);
})();
