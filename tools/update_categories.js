const fs = require('fs');
const path = require('path');

// Update programs.html filter bar
let programs = fs.readFileSync(path.join('..', 'programs.html'), 'utf8');
const filterBarRegex = /<div class="filter-bar" role="group" aria-label="Filter programs">.*?<\/div>/s;
const newFilterBar = `<div class="filter-bar" role="group" aria-label="Filter programs">
      <button class="filter-btn active" data-filter="all" id="filter-all">All Programs</button>
      <button class="filter-btn" data-filter="personal" id="filter-personal">Personal Evolution</button>
      <button class="filter-btn" data-filter="parenting" id="filter-parenting">Conscious Parenting</button>
      <button class="filter-btn" data-filter="youth" id="filter-youth">Youth Mastery</button>
      <button class="filter-btn" data-filter="relationships" id="filter-relationships">Relationship Growth</button>
    </div>`;
programs = programs.replace(filterBarRegex, newFilterBar);
fs.writeFileSync(path.join('..', 'programs.html'), programs);

console.log('Categories and filters updated.');
