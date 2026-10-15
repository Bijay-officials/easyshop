const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

content = content.replace(
  /<td className="px-4 py-3 text-\[\#4B5563\]">¥\{p\.price\.toLocaleString\(\)\}<\/td>/,
  `<td className="px-4 py-3 text-[#4B5563]">
                  <div className="flex flex-col">
                    <span className="font-bold">¥{Math.floor(p.price * 1.1).toLocaleString()} <span className="text-[10px] text-gray-400 font-normal">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span></span>
                    <span className="text-[10px] text-gray-400">{lang === 'ja' ? \`税抜 ¥\${p.price.toLocaleString()}\` : \`Tax Excl. ¥\${p.price.toLocaleString()}\`}</span>
                  </div>
                </td>`
);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
