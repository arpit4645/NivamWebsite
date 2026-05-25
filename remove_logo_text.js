const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Regex to match the navbar__logo-text div and its contents
  const textRegex = /<div class="navbar__logo-text">[\s\S]*?<\/div>/g;
  content = content.replace(textRegex, '');
  
  fs.writeFileSync(f, content);
});

console.log('Logo text removed from HTML files.');
