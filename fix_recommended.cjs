const fs = require('fs');
let content = fs.readFileSync('src/pages/Recommended.tsx', 'utf-8');

content = content.replace(
  /<div className="flex items-center justify-between mt-auto pt-2">\s*<span className="font-extrabold text-\[15px\] text-\[\#2563EB\]">¥\{product\.price\.toLocaleString\(\)\}<\/span>\s*<\/div>/,
  `<div className="flex flex-col mt-auto pt-2">
                <div className="font-extrabold text-[15px] text-[#2563EB] flex items-baseline gap-1">
                  ¥{Math.floor(product.price * 1.1).toLocaleString()}
                  <span className="text-[9px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                </div>
                <div className="text-[9px] text-gray-400 font-medium mt-0.5">
                  {lang === 'ja' ? \`税抜 ¥\${product.price.toLocaleString()}\` : \`Tax Excl. ¥\${product.price.toLocaleString()}\`}
                </div>
              </div>`
);

fs.writeFileSync('src/pages/Recommended.tsx', content);
