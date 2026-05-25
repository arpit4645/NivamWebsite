const fs = require('fs');

let content = fs.readFileSync('programs.html', 'utf8');

// 1. Fix CSS
content = content.replace(
    /\.program-outcome::before\{content:'.*?';/,
    '.program-outcome::before{content:"";'
);

// 2. Fix HTML - add icon to each program-outcome
// We'll search for <div class="program-outcome"> and add the icon inside
content = content.replace(
    /<div class="program-outcome">(.*?)<\/div>/g,
    '<div class="program-outcome"><i data-lucide="check-circle" class="lucide-icon"></i> $1</div>'
);

fs.writeFileSync('programs.html', content);
console.log('Fixed programs.html icons.');
