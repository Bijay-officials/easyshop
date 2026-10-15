const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf-8');

content = content.replace(
  /<div className="text-3xl font-extrabold text-gray-900 mb-6">¥\{product\.price\.toLocaleString\(\)\}<\/div>/,
  `<div className="mb-6 flex flex-col">
            <div className="text-3xl font-extrabold text-gray-900 flex items-baseline gap-2">
              ¥{Math.floor(product.price * 1.1).toLocaleString()}
              <span className="text-sm font-medium text-gray-500">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
            </div>
            <div className="text-sm font-medium text-gray-400 mt-1">
              {lang === 'ja' ? \`税抜 ¥\${product.price.toLocaleString()}\` : \`Tax Excl. ¥\${product.price.toLocaleString()}\`}
            </div>
          </div>`
);

content = content.replace(
  /<div className="text-sm font-extrabold text-\[\#2563EB\] mt-auto">¥\{rec\.price\.toLocaleString\(\)\}<\/div>/g,
  `<div className="mt-auto">
                    <div className="text-sm font-extrabold text-[#2563EB] flex items-baseline gap-1">
                      ¥{Math.floor(rec.price * 1.1).toLocaleString()}
                      <span className="text-[9px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                    </div>
                  </div>`
);

fs.writeFileSync('src/pages/ProductDetail.tsx', content);
