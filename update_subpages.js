const fs = require('fs');

// Update Programs
let programs = fs.readFileSync('programs.html', 'utf8');
programs = programs.replace(
  /<h1>Our Signature Programs<\/h1>\s*<p>.*?<\/p>/s,
  '<h1>Our Transformational Programs</h1>\n    <p>Structured learning experiences designed for personal evolution and conscious growth.</p>'
);
fs.writeFileSync('programs.html', programs);

// Update Workshops
let workshops = fs.readFileSync('workshops.html', 'utf8');
workshops = workshops.replace(
  /<h1>Live Zoom Workshops<\/h1>\s*<p>.*?<\/p>/s,
  '<h1>Live Transformational Workshops</h1>\n    <p>Interactive learning experiences designed to inspire clarity, growth, awareness, and real-life transformation.</p>'
);
fs.writeFileSync('workshops.html', workshops);

// Update About page
let about = fs.readFileSync('about.html', 'utf8');
about = about.replace(
  /<h1>About Nivam<\/h1>\s*<p>.*?<\/p>/s,
  '<h1>The Vision Behind NIVAM</h1>\n    <p>A transformational academy designed to help individuals create meaningful growth in every area of life.</p>'
);
fs.writeFileSync('about.html', about);

console.log('Subpage headers updated.');
