const fs = require('fs');
let content = fs.readFileSync('src/pages/Cart.tsx', 'utf-8');
content = content.replace(
  /<span className="font-extrabold text-3xl text-gray-900">¥\{cartTotal\.toLocaleString\(\)\}<\/span>/,
  '<span className="font-extrabold text-3xl text-gray-900 flex items-baseline gap-2">¥{cartTotal.toLocaleString()}<span className="text-xs font-medium text-gray-500">{lang === \'ja\' ? \'(税込)\' : \'(Tax Incl.)\'}</span></span>'
);
fs.writeFileSync('src/pages/Cart.tsx', content);
