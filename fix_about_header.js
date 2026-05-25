const fs = require('fs');

let content = fs.readFileSync('about.html', 'utf8');

const oldHeader = /<h1>Nivam Life Consulting — Transforming Lives from Within<\/h1>\s*<p>A holistic human transformation organization dedicated to helping individuals and families build emotionally strong, meaningful, and successful lives\.<\/p>/s;
const newHeader = '<h1>The Vision Behind NIVAM</h1>\n    <p>A transformational academy designed to help individuals create meaningful growth in every area of life.</p>';

content = content.replace(oldHeader, newHeader);

fs.writeFileSync('about.html', content);
console.log('About header fixed.');
