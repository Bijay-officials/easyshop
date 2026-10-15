const fs = require('fs');

let edit = fs.readFileSync('src/pages/admin/EditProductAdmin.tsx', 'utf-8');

edit = edit.replace(
  /const \[imageBase64, setImageBase64\] = useState<string \| null>\(null\);/,
  `const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isRecommended, setIsRecommended] = useState(false);`
);

edit = edit.replace(
  /setDescription\(data\.description\);\n\s*setCategory\(data\.category\);/,
  `setDescription(data.description);
        setCategory(data.category);
        setIsRecommended(!!data.isRecommended);`
);

edit = edit.replace(
  /category,\n\s*imageUrl: imageBase64 \|\| urlsArray\[0\] \|\| '',/,
  `category,
        isRecommended,
        imageUrl: imageBase64 || urlsArray[0] || '',`
);

edit = edit.replace(
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

fs.writeFileSync('src/pages/admin/EditProductAdmin.tsx', edit);
console.log('Fixed edit product for isRecommended');
