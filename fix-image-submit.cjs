const fs = require('fs');

let dashboard = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');
dashboard = dashboard.replace(
  /body: JSON\.stringify\(\{ name, price: Number\(price\), stock: Number\(stock\), description, category, imageUrl: imageUrls\.split\(\',\/\)\[0\]\?\.trim\(\), imageUrls: imageUrls\.split\(\',\/\)\.map\(u => u\.trim\(\)\)\.filter\(Boolean\) \}\)/,
  `body: JSON.stringify({ name, price: Number(price), stock: Number(stock), description, category, imageUrl: imageBase64 || (imageUrls.split(',')[0]?.trim()), imageUrls: imageUrls.split(',').map(u => u.trim()).filter(Boolean) })`
);
fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', dashboard);

let edit = fs.readFileSync('src/pages/admin/EditProductAdmin.tsx', 'utf-8');
edit = edit.replace(
  /body: JSON\.stringify\(\{ name, price: Number\(price\), stock: Number\(stock\), description, category, imageUrl: imageUrls\.split\(\',\/\)\[0\]\?\.trim\(\), imageUrls: imageUrls\.split\(\',\/\)\.map\(u => u\.trim\(\)\)\.filter\(Boolean\) \}\)/,
  `body: JSON.stringify({ name, price: Number(price), stock: Number(stock), description, category, imageUrl: imageBase64 || (imageUrls.split(',')[0]?.trim()), imageUrls: imageUrls.split(',').map(u => u.trim()).filter(Boolean) })`
);
fs.writeFileSync('src/pages/admin/EditProductAdmin.tsx', edit);
console.log('Fixed submit');
