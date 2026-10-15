const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

content = content.replace(
  /<div className="flex items-end justify-between mt-auto pt-2">\s*<div className="text-xl font-extrabold text-gray-900">¥\{product\.price\.toLocaleString\(\)\}<\/div>\s*<\/div>/,
  `<div className="flex flex-col mt-auto pt-2">
                      <div className="text-xl font-extrabold text-gray-900 flex items-baseline gap-1">
                        ¥{Math.floor(product.price * 1.1).toLocaleString()}
                        <span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {lang === 'ja' ? \`税抜 ¥\${product.price.toLocaleString()}\` : \`Tax Excl. ¥\${product.price.toLocaleString()}\`}
                      </div>
                    </div>`
);

fs.writeFileSync('src/pages/Home.tsx', content);
