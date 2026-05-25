/**
 * NIVAM — Stats Counter Animation
 * Triggered when counters scroll into view
 */

'use strict';

// Counter logic is handled in main.js via initCounters()
// This file provides extended configuration and pre-defined counter targets

document.addEventListener('DOMContentLoaded', () => {
  // Hero stat counters
  setupHeroCounters();
});

function setupHeroCounters() {
  const statNums = document.querySelectorAll('.hero__stat-num[data-target]');

  statNums.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    el.dataset.counter = target;
    el.dataset.counterSuffix = suffix;
    el.dataset.counterDuration = '2000';
  });
}
