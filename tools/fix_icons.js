const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join('..', 'programs.html'), 'utf8');

// Fix CSS
content = content.replace(
  /\.program-outcome::before\{content:'.*?';/,
  '.program-outcome::before{content:"";'
);

// Add icon to each program-outcome
content = content.replace(
  /<div class="program-outcome">(.*?)<\/div>/g,
  '<div class="program-outcome"><i data-lucide="check-circle" class="lucide-icon"></i> $1</div>'
);

fs.writeFileSync(path.join('..', 'programs.html'), content);
console.log('Fixed programs.html icons.');
