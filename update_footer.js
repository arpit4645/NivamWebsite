const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Replace the old footer description with the new premium one
  const oldDesc = /<p class="footer__desc">.*?<\/p>/s;
  const newDesc = `<p class="footer__desc" style="margin-bottom: 0.5rem; font-weight: 600;">NIVAM — Guiding Lives Towards Light</p>\n        <p class="footer__desc">Empowering transformation through wisdom, awareness, and conscious growth.</p>`;
  content = content.replace(oldDesc, newDesc);
  
  // Replace the youtube emoji
  content = content.replace(/▶️/g, '<i data-lucide="youtube" class="lucide-icon"></i>');
  
  // Clean up empty <div> from remove_footer_text.js in index.html
  content = content.replace(/<div>\s*<\/div>/g, '');
  
  fs.writeFileSync(f, content);
});

console.log('Footer descriptions updated.');
