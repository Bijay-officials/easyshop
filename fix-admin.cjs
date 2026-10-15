const fs = require('fs');

let dashboard = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

dashboard = dashboard.replace(
  /const \[imageBase64, setImageBase64\] = useState<string \| null>\(null\);/,
  `const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isRecommended, setIsRecommended] = useState(false);`
);

dashboard = dashboard.replace(
  /body: JSON\.stringify\(\{ name, price: Number\(price\), stock: Number\(stock\), description, category, imageUrl: imageBase64 \|\| \(imageUrls\.split\(\',\/\)\[0\]\?\.trim\(\)\), imageUrls: imageUrls\.split\(\',\/\)\.map\(u => u\.trim\(\)\)\.filter\(Boolean\) \}\)/,
  `body: JSON.stringify({ name, price: Number(price), stock: Number(stock), description, category, isRecommended, imageUrl: imageBase64 || (imageUrls.split(',')[0]?.trim()), imageUrls: imageUrls.split(',').map(u => u.trim()).filter(Boolean) })`
);

dashboard = dashboard.replace(
  /<div>\s*<label className="block text-xs font-medium text-\[#4B5563\] mb-1">\{lang === 'ja' \? 'カテゴリー' : 'Category'\}<\/label>/,
  `<div>
          <label className="flex items-center gap-2 text-sm text-[#4B5563] mb-4">
            <input type="checkbox" checked={isRecommended} onChange={e => setIsRecommended(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            {lang === 'ja' ? 'おすすめ商品に設定する' : 'Set as Recommended'}
          </label>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? 'カテゴリー' : 'Category'}</label>`
);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', dashboard);
console.log('Fixed dashboard for isRecommended');
