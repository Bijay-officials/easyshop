const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Replace the admin link with empty string
content = content.replace(
  /<Link\s*to="\/admin"\s*onClick=\{[^\}]+\}\s*className="[^"]+"\s*>\s*<Shield[^>]+>\s*\{\s*lang === 'ja' \? '管理者' : 'Admin'\s*\}\s*<\/Link>/,
  ''
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('Removed admin link');
