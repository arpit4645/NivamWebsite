const fs = require('fs');

const map = {
  '🏆': 'award',
  '✦': 'sparkles',
  '💜': 'heart',
  '🔬': 'microscope',
  '🌍': 'globe',
  '🎯': 'target',
  '🔒': 'lock',
  '♾': 'infinity',
  '✔': 'check-circle',
  '✓': 'check-circle',
  '👉': 'arrow-right',
  '🎓': 'graduation-cap',
  '🌱': 'leaf',
  '🚀': 'rocket',
  '💻': 'laptop',
  '✨': 'sparkles',
  '🌟': 'sparkles',
  '📸': 'instagram',
  '📘': 'facebook',
  '💼': 'linkedin',
  '📧': 'mail',
  '📞': 'phone',
  '📍': 'map-pin',
  '💬': 'message-circle',
  '🗺': 'map',
  '🤝': 'users',
  '⚡': 'zap',
  '🇮🇳': 'map-pin',
  '💫': 'star',
  '👑': 'crown',
  '📚': 'book-open',
  '👨‍👩‍👧‍👦': 'users',
  '👨‍👩‍👧': 'users',
  '👨‍👩': 'users',
  '👨': 'user',
  '👩': 'user',
  '👧': 'user',
  '👦': 'user',
  '💞': 'heart',
  '📅': 'calendar',
  '🗓': 'calendar',
  '👥': 'users',
  '✗': 'x',
  '★': 'star',
  '🕕': 'clock',
  '🕗': 'clock',
  '🕔': 'clock',
  '🕦': 'clock',
  '🆓': 'gift',
  '🧠': 'brain',
  '💑': 'heart',
  '📱': 'smartphone',
  '💪': 'activity',
  '🌸': 'flower',
  '🤍': 'heart',
  '💛': 'heart'
};

const files = fs.readdirSync('..').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync('../' + f, 'utf8');

  for (const [emoji, icon] of Object.entries(map)) {
    content = content.split(emoji).join(`<i data-lucide="${icon}" class="lucide-icon"></i>`);
  }

  content = content.replace(/🇮\s*🇳/g, `<i data-lucide="map-pin" class="lucide-icon"></i>`);
  content = content.replace(/👨\s*👩\s*👧/g, `<i data-lucide="users" class="lucide-icon"></i>`);

  if (!content.includes('unpkg.com/lucide')) {
    content = content.replace('</body>', `  <script src="https://unpkg.com/lucide@latest"></script>\n  <script>lucide.createIcons();</script>\n</body>`);
  }

  fs.writeFileSync('../' + f, content);
});

console.log('Icons replaced successfully.');
