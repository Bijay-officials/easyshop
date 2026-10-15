const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/EditProductAdmin.tsx', 'utf-8');

content = content.replace(
  /const \[imageUrls, setImageUrls\] = useState\(''\);/,
  `const [imageUrls, setImageUrls] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };`
);

content = content.replace(
  /body: JSON\.stringify\(\{ name, price: Number\(price\), stock: Number\(stock\), description, category, imageUrl: imageUrls\.split\(\',\/\)\[0\]\?\.trim\(\), imageUrls: imageUrls\.split\(\',\/\)\.map\(u => u\.trim\(\)\)\.filter\(Boolean\) \}\)/,
  `body: JSON.stringify({ name, price: Number(price), stock: Number(stock), description, category, imageUrl: imageBase64 || (imageUrls.split(',')[0]?.trim()), imageUrls: imageUrls.split(',').map(u => u.trim()).filter(Boolean) })`
);

content = content.replace(
  /<div>\s*<label className="block text-xs font-medium text-\[#4B5563\] mb-1">\{lang === 'ja' \? '商品説明' : 'Description'\}<\/label>/,
  `<div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '商品画像 (アップロード)' : 'Product Image (Upload)'}</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          {imageBase64 && <img src={imageBase64} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded shadow-sm border border-gray-200" />}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '商品説明' : 'Description'}</label>`
);

fs.writeFileSync('src/pages/admin/EditProductAdmin.tsx', content);
console.log('EditProductAdmin updated');
