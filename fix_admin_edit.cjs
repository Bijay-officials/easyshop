const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/EditProductAdmin.tsx', 'utf-8');

content = content.replace(
  /<label className="block text-xs font-medium text-\[\#4B5563\] mb-1">\{lang === 'ja' \? '価格' : 'Price'\}<\/label>/g,
  '<label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === \'ja\' ? \'価格 (税抜)\' : \'Price (Tax Excl.)\'}</label>'
);

const priceInputPattern = /<input required type="number" className="w-full h-11 border border-gray-200 bg-gray-50 rounded-xl px-4 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500\/20 transition-all" value=\{price\} onChange=\{e => setPrice\(e\.target\.value\)\} \/>/;

content = content.replace(
  priceInputPattern,
  `<input required type="number" className="w-full h-11 border border-gray-200 bg-gray-50 rounded-xl px-4 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" value={price} onChange={e => setPrice(e.target.value)} />
            {price && !isNaN(Number(price)) && (
              <div className="mt-1.5 text-[11px] font-bold text-green-600 flex items-center gap-1">
                {lang === 'ja' ? '税込:' : 'Tax Incl.:'} ¥{Math.floor(Number(price) * 1.1).toLocaleString()} <span className="text-gray-400 font-normal">(10%)</span>
              </div>
            )}`
);

fs.writeFileSync('src/pages/admin/EditProductAdmin.tsx', content);
