const fs = require('fs');
const path = require('path');

const file = path.join('..', 'index.html');
let content = fs.readFileSync(file, 'utf8');

// Hero heading
content = content.replace(
  '<span id="hero-rotating-text">Transform Your Life</span>',
  '<span id="hero-rotating-text">Transform Your</span>'
);
content = content.replace(
  '<span class="accent-line">with Guided Purpose</span>',
  '<span class="accent-line">Inner World</span>'
);

// Hero subtitle
content = content.replace(
  '<p class="hero__subtitle">Empowering families, parents, and young leaders across India through evidence-based coaching, live workshops, and transformative programs.</p>',
  '<p class="hero__subtitle">Modern life coaching and transformational learning rooted in timeless wisdom.</p>'
);

fs.writeFileSync(file, content);
console.log('Index text updated');
