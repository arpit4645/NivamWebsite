'use strict';

// Filter bar — smooth fade animation
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    document.querySelectorAll('.program-detail').forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      if (visible) {
        card.style.display = '';
        // Small rAF delay so display:'' is painted before opacity transition starts
        requestAnimationFrame(() => card.classList.remove('program-hidden'));
      } else {
        card.classList.add('program-hidden');
        // Wait for fade-out before hiding from layout
        card.addEventListener('transitionend', function handler() {
          if (card.classList.contains('program-hidden')) card.style.display = 'none';
          card.removeEventListener('transitionend', handler);
        });
      }
    });
  });
});

// Scroll to program from URL hash
const hash = window.location.hash;
if (hash) {
  setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
}
