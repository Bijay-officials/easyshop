const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

const originalAddProduct = content.match(/function AddProductAdmin\(\) \{[\s\S]*?    <\/div>\n  \);\n\}/)[0];

const newAddProduct = originalAddProduct
  .replace(/const \[description, setDescription\] = useState\(''\);/, `const [description, setDescription] = useState('');\n  const [imageUrls, setImageUrls] = useState('');`)
  .replace(/body: JSON.stringify\(\{ name, price: Number\(price\), stock: Number\(stock\), description, category \}\)/, `body: JSON.stringify({ name, price: Number(price), stock: Number(stock), description, category, imageUrl: imageUrls.split(',')[0]?.trim(), imageUrls: imageUrls.split(',').map(u => u.trim()).filter(Boolean) })`)
  .replace(/<div>\s*<label.*?商品説明.*?<\/div>/, `<div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '商品説明' : 'Description'}</label>
          <textarea required className="w-full border border-[#D1D5DB] rounded p-3 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" rows={4} value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '画像URL（カンマ区切りで複数可）' : 'Image URLs (comma separated)'}</label>
          <input type="text" className="w-full h-8 border border-[#D1D5DB] rounded px-3 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" value={imageUrls} onChange={e => setImageUrls(e.target.value)} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
        </div>`);

content = content.replace(originalAddProduct, newAddProduct);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
