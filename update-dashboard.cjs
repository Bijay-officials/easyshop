const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// 1. Fix delete product by replacing window.confirm with an inline check state
content = content.replace(
  /const handleDelete = async \(id: string\) => {[\s\S]*?};\n/,
  `const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  
  const handleDelete = async (id: string) => {
    await fetch(\`/api/products/\${id}\`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
    setConfirmDeleteId(null);
  };
`
);

content = content.replace(
  /<button onClick=\{\(\) => handleDelete\(p\.id\)\} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><Trash2 className="w-4 h-4"\/><\/button>/g,
  `{confirmDeleteId === p.id ? (
    <div className="flex items-center gap-2">
      <span className="text-xs text-red-600 font-bold">{lang === 'ja' ? '確認' : 'Confirm'}</span>
      <button onClick={() => handleDelete(p.id)} className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs">Yes</button>
      <button onClick={() => setConfirmDeleteId(null)} className="text-gray-600 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs">No</button>
    </div>
  ) : (
    <button onClick={() => setConfirmDeleteId(p.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><Trash2 className="w-4 h-4"/></button>
  )}`
);


// 2. Add image upload support to AddProductAdmin
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

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);

console.log("Updated AdminDashboard.tsx successfully!");
