const fs = require('fs');
let content = fs.readFileSync('src/pages/Checkout.tsx', 'utf-8');

content = content.replace(
  /<span className="text-sm font-bold text-gray-900">¥\{cartTotal\.toLocaleString\(\)\}<\/span>/,
  `<span className="text-sm font-bold text-gray-900 flex items-baseline gap-1">¥{cartTotal.toLocaleString()}<span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span></span>`
);

content = content.replace(
  /<span className="text-\[18px\] font-extrabold text-\[\#2563EB\]">¥\{finalTotal\.toLocaleString\(\)\}<\/span>/,
  `<span className="text-[18px] font-extrabold text-[#2563EB] flex items-baseline gap-1">¥{finalTotal.toLocaleString()}<span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span></span>`
);

fs.writeFileSync('src/pages/Checkout.tsx', content);
