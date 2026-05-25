'use strict';

// Pre-select program radio from URL query param (?program=parvarish)
const params = new URLSearchParams(window.location.search);
const prog   = params.get('program');
if (prog) {
  document.querySelectorAll('input[name="program"]').forEach(radio => {
    if (radio.value.toLowerCase().replace(/\s+/g, '-') === prog) radio.checked = true;
  });
}
