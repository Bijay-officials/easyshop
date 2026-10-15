const fs = require('fs');
let content = fs.readFileSync('src/pages/Cart.tsx', 'utf-8');
content = content.replace(
  /<div className="text-gray-900 font-extrabold text-lg mt-1">¥\{item\.price\.toLocaleString\(\)\}<\/div>/,
  '<div className="text-gray-900 font-extrabold text-lg mt-1 flex items-baseline gap-1">¥{Math.floor(item.price * 1.1).toLocaleString()}<span className="text-[10px] text-gray-500 font-medium">{lang === \'ja\' ? \'(税込)\' : \'(Tax Incl.)\'}</span></div>'
);
fs.writeFileSync('src/pages/Cart.tsx', content);
