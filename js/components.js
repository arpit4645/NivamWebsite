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
                <p class="footer__desc" style="margin-bottom:0.5rem;font-weight:600;">NIVAM — Guiding Lives Towards Light</p>
                <p class="footer__desc">Empowering transformation through wisdom, awareness, and conscious growth.</p>
                <div class="footer__socials">
                  <a href="#" class="footer__social-link" aria-label="Instagram"><i data-lucide="instagram" class="lucide-icon"></i></a>
                  <a href="#" class="footer__social-link" aria-label="Facebook"><i data-lucide="facebook" class="lucide-icon"></i></a>
                  <a href="#" class="footer__social-link" aria-label="YouTube"><i data-lucide="youtube" class="lucide-icon"></i></a>
                  <a href="#" class="footer__social-link" aria-label="LinkedIn"><i data-lucide="linkedin" class="lucide-icon"></i></a>
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
                  <span>Mumbai, India · Online Worldwide</span>
                </div>
              </div>
            </div>
            <div class="footer__bottom">
              <p class="footer__copy">© 2025 Nivam. All rights reserved.</p>
              <div class="footer__legal-links">
                <a href="privacy.html" class="footer__legal-link">Privacy</a>
                <a href="terms.html" class="footer__legal-link">Terms</a>
              </div>
            </div>
          </div>
        </footer>
        <button id="whatsapp-float" class="whatsapp-float" aria-label="Chat on WhatsApp">
          <span style="font-size:1.75rem"><i data-lucide="message-circle" class="lucide-icon"></i></span>
          <span class="whatsapp-float__tooltip">Chat with us!</span>
        </button>
      `;
    }
  }

  customElements.define('site-navbar', SiteNavbar);
  customElements.define('site-footer', SiteFooter);
})();
