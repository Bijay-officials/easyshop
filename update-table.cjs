const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// Add image column header
content = content.replace(
  /<th className="px-4 py-3 font-medium">\{lang === 'ja' \? '商品名' : 'Name'\}<\/th>/,
  `<th className="px-4 py-3 font-medium">{lang === 'ja' ? '画像' : 'Image'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '商品名' : 'Name'}</th>`
);

// Add image cell
content = content.replace(
  /<td className="px-4 py-3 font-medium text-\[#111827\]">\{p\.name\}<\/td>/,
  `<td className="px-4 py-3">
                  <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-[#111827]">{p.name}</td>`
);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
console.log('Table updated');
