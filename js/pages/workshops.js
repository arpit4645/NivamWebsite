'use strict';

// FAQ accordion — with keyboard and ARIA support
document.querySelectorAll('.faq-item').forEach((item, idx) => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');

  // Accessibility attributes
  const qId = 'faq-q-' + idx;
  const aId = 'faq-a-' + idx;
  q.setAttribute('id', qId);
  q.setAttribute('role', 'button');
  q.setAttribute('tabindex', '0');
  q.setAttribute('aria-expanded', 'false');
  q.setAttribute('aria-controls', aId);
  if (a) {
    a.setAttribute('id', aId);
    a.setAttribute('role', 'region');
    a.setAttribute('aria-labelledby', qId);
  }

  function toggle() {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const iq = i.querySelector('.faq-q');
      if (iq) iq.setAttribute('aria-expanded', 'false');
    });
    // Open this one if it was closed
    if (!isOpen) {
      item.classList.add('open');
      q.setAttribute('aria-expanded', 'true');
    }
  }

  q.addEventListener('click', toggle);
  q.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});
