const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\1531a7cc-7a0f-4a83-b1e0-3ef3c3b1b6a4';
const destDir = '.';

const mappings = [
  { src: 'logo_1779706739908.png', dest: 'assets/images/logo.png' },
  { src: 'hero_graphic_1779706759951.png', dest: 'assets/images/hero-graphic.png' },
  { src: 'hero_bg_1779706778453.png', dest: 'assets/images/hero-bg.png' },
  { src: 'about_graphic_1779706793342.png', dest: 'assets/images/about-graphic.png' },
  { src: 'founder_1779706815377.png', dest: 'assets/images/founder.png' },
  { src: 'about_team_1779706815868.png', dest: 'assets/images/about-team.png' },
  { src: 'og_image_1779706830613.png', dest: 'assets/images/og-image.png' },
  { src: 'being_your_best_1779706852206.png', dest: 'assets/images/programs/being-your-best.png' },
  { src: 'rising_leaders_1779706878855.png', dest: 'assets/images/programs/rising-leaders.png' },
  { src: 'parvarish_1779706894198.png', dest: 'assets/images/programs/parvarish.png' },
  { src: 'sambandh_hi_sukh_1779706916457.png', dest: 'assets/images/programs/sambandh-hi-sukh.png' },
  { src: 'super_mom_1779706932780.png', dest: 'assets/images/programs/super-mom.png' },
  { src: 'academic_excellence_1779706949946.png', dest: 'assets/images/programs/academic-excellence.png' }
];

console.log('Copying images...');
mappings.forEach(m => {
  const srcPath = path.join(srcDir, m.src);
  const destPath = path.join(destDir, m.dest);
  
  if (fs.existsSync(srcPath)) {
    // Ensure destination directory exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${m.src} -> ${m.dest}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});

const filesToUpdate = [
  'index.html',
  'about.html',
  'programs.html',
  'book.html',
  'contact.html',
  'workshops.html',
  'privacy.html',
  'terms.html',
  'js/components.js',
  'js/main.js'
];

const replacers = [
  { from: /assets\/images\/about-team\.webp/g, to: 'assets/images/about-team.png' },
  { from: /assets\/images\/founder\.webp/g, to: 'assets/images/founder.png' },
  { from: /assets\/images\/og-image\.jpg/g, to: 'assets/images/og-image.png' },
  { from: /assets\/images\/programs\/being-your-best\.webp/g, to: 'assets/images/programs/being-your-best.png' },
  { from: /assets\/images\/programs\/rising-leaders\.webp/g, to: 'assets/images/programs/rising-leaders.png' },
  { from: /assets\/images\/programs\/parvarish\.webp/g, to: 'assets/images/programs/parvarish.png' },
  { from: /assets\/images\/programs\/sambandh-hi-sukh\.webp/g, to: 'assets/images/programs/sambandh-hi-sukh.png' },
  { from: /assets\/images\/programs\/super-mom\.webp/g, to: 'assets/images/programs/super-mom.png' },
  { from: /assets\/images\/programs\/academic-excellence\.webp/g, to: 'assets/images/programs/academic-excellence.png' }
];

console.log('\nUpdating references in files...');
filesToUpdate.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    let updated = content;
    
    replacers.forEach(r => {
      updated = updated.replace(r.from, r.to);
    });
    
    if (content !== updated) {
      fs.writeFileSync(f, updated, 'utf8');
      console.log(`Updated references in ${f}`);
    }
  }
});

const filesToDelete = [
  'assets/images/about-team.webp',
  'assets/images/founder.webp',
  'assets/images/og-image.jpg',
  'assets/images/programs/being-your-best.webp',
  'assets/images/programs/rising-leaders.webp',
  'assets/images/programs/parvarish.webp',
  'assets/images/programs/sambandh-hi-sukh.webp',
  'assets/images/programs/super-mom.webp',
  'assets/images/programs/academic-excellence.webp'
];

console.log('\nDeleting old files...');
filesToDelete.forEach(f => {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log(`Deleted ${f}`);
  }
});

console.log('\nImage replacement process complete!');
