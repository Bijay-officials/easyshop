const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

content = content.replace(
  /\{hasNewRecommended && \([\s\S]*?<\/span>\s*\)\}/,
  `{hasNewRecommended && (
                  <span className="inline-block ml-1.5 mb-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}`
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('Fixed red dot position');
