const fs = require('fs');

// Update about.html categories
let about = fs.readFileSync('about.html', 'utf8');
const aboutCategoriesStart = about.indexOf('<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--sp-4);margin-top:var(--sp-10);">');
const aboutCategoriesEnd = about.indexOf('</div>', aboutCategoriesStart + 100) + 7;

if (aboutCategoriesStart !== -1) {
    const newAboutCategories = `    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:var(--sp-4);margin-top:var(--sp-10);">
      <div style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-5);background:var(--clr-surface);border-radius:var(--radius-xl);border:1px solid var(--clr-border-light);" data-aos="fade-up" data-aos-delay="0"><span style="color:var(--color-gold);font-size:1.2rem;"><i data-lucide="brain" class="lucide-icon"></i></span><span>Emotional Intelligence</span></div>
      <div style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-5);background:var(--clr-surface);border-radius:var(--radius-xl);border:1px solid var(--clr-border-light);" data-aos="fade-up" data-aos-delay="50"><span style="color:var(--color-gold);font-size:1.2rem;"><i data-lucide="heart" class="lucide-icon"></i></span><span>Family & Relationship Growth</span></div>
      <div style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-5);background:var(--clr-surface);border-radius:var(--radius-xl);border:1px solid var(--clr-border-light);" data-aos="fade-up" data-aos-delay="100"><span style="color:var(--color-gold);font-size:1.2rem;"><i data-lucide="shield-check" class="lucide-icon"></i></span><span>Confidence Building</span></div>
      <div style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-5);background:var(--clr-surface);border-radius:var(--radius-xl);border:1px solid var(--clr-border-light);" data-aos="fade-up" data-aos-delay="150"><span style="color:var(--color-gold);font-size:1.2rem;"><i data-lucide="crown" class="lucide-icon"></i></span><span>Conscious Leadership</span></div>
      <div style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-5);background:var(--clr-surface);border-radius:var(--radius-xl);border:1px solid var(--clr-border-light);" data-aos="fade-up" data-aos-delay="200"><span style="color:var(--color-gold);font-size:1.2rem;"><i data-lucide="zap" class="lucide-icon"></i></span><span>Mindset Transformation</span></div>
      <div style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-5);background:var(--clr-surface);border-radius:var(--radius-xl);border:1px solid var(--clr-border-light);" data-aos="fade-up" data-aos-delay="250"><span style="color:var(--color-gold);font-size:1.2rem;"><i data-lucide="sparkles" class="lucide-icon"></i></span><span>Spiritual Awareness</span></div>
      <div style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-5);background:var(--clr-surface);border-radius:var(--radius-xl);border:1px solid var(--clr-border-light);" data-aos="fade-up" data-aos-delay="300"><span style="color:var(--color-gold);font-size:1.2rem;"><i data-lucide="target" class="lucide-icon"></i></span><span>Purpose Alignment</span></div>
      <div style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-5);background:var(--clr-surface);border-radius:var(--radius-xl);border:1px solid var(--clr-border-light);" data-aos="fade-up" data-aos-delay="350"><span style="color:var(--color-gold);font-size:1.2rem;"><i data-lucide="settings" class="lucide-icon"></i></span><span>Personal Growth Systems</span></div>
    </div>`;
    // Find the end of the grid more accurately
    let endIdx = about.indexOf('</div>', aboutCategoriesStart);
    for(let i=0; i<8; i++) { // We expect 8 items, but let's just find the closing div of the grid
        endIdx = about.indexOf('</div>', endIdx + 1);
    }
    // Actually it's better to just regex it if possible or use a more specific marker
    about = about.replace(/<div style="display:grid;grid-template-columns:repeat\(2,1fr\);gap:var\(--sp-4\);margin-top:var\(--sp-10\);">(.*?)<\/div>/s, newAboutCategories);
}
fs.writeFileSync('about.html', about);

// Update programs.html filters
let programs = fs.readFileSync('programs.html', 'utf8');
const filterBarRegex = /<div class="filter-bar" role="group" aria-label="Filter programs">.*?<\/div>/s;
const newFilterBar = `<div class="filter-bar" role="group" aria-label="Filter programs">
      <button class="filter-btn active" data-filter="all" id="filter-all">All Programs</button>
      <button class="filter-btn" data-filter="personal" id="filter-personal">Personal Evolution</button>
      <button class="filter-btn" data-filter="parenting" id="filter-parenting">Conscious Parenting</button>
      <button class="filter-btn" data-filter="youth" id="filter-youth">Youth Mastery</button>
      <button class="filter-btn" data-filter="relationships" id="filter-relationships">Relationship Growth</button>
    </div>`;
programs = programs.replace(filterBarRegex, newFilterBar);
fs.writeFileSync('programs.html', programs);

console.log('Categories and filters updated.');
