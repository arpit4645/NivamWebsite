const fs = require('fs');

const files = fs.readdirSync('..').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync('../' + f, 'utf8');
  content = content.replace(/<div><span class="footer__logo-name">NIVAM ACADEMY<\/span><span class="footer__logo-tagline">\|\| तमसो मा ज्योतिर्गमय \|\|<\/span><\/div>/g, '');
  content = content.replace(/<span class="footer__logo-name">NIVAM ACADEMY<\/span>\s*<span class="footer__logo-tagline">\|\| तमसो मा ज्योतिर्गमय \|\|<\/span>/g, '');
  fs.writeFileSync('../' + f, content);
});

console.log('Footer text removed.');
