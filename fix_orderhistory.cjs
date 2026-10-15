const fs = require('fs');
let content = fs.readFileSync('src/pages/OrderHistory.tsx', 'utf-8');

content = content.replace(
  /<div className="font-extrabold text-lg text-gray-900">\s*¥\{order\.total\.toLocaleString\(\)\}\s*<\/div>/,
  `<div className="font-extrabold text-lg text-gray-900 flex items-baseline gap-1">
                    ¥{order.total.toLocaleString()}
                    <span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                  </div>`
);

content = content.replace(
  /<div className="text-\[\#6B7280\] text-\[11px\] font-semibold">\{lang === 'ja' \? '数量:' : 'Qty:'\} \{item\.quantity\} × ¥\{item\.price\.toLocaleString\(\)\}<\/div>/,
  `<div className="text-[#6B7280] text-[11px] font-semibold flex items-center gap-1">
                          {lang === 'ja' ? '数量:' : 'Qty:'} {item.quantity} × ¥{item.price.toLocaleString()}
                          <span className="text-[9px]">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                        </div>`
);

fs.writeFileSync('src/pages/OrderHistory.tsx', content);
