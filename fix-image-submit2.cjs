const fs = require('fs');

let dashboard = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');
dashboard = dashboard.replace(
  /imageUrl: imageUrls\.split\(\',\/\)\[0\]\?\.trim\(\), imageUrls: imageUrls\.split\(\',\/\)\.map\(u => u\.trim\(\)\)\.filter\(Boolean\)/,
  "imageUrl: imageBase64 || (imageUrls.split(',')[0]?.trim()), imageUrls: imageUrls.split(',').map(u => u.trim()).filter(Boolean)"
);
fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', dashboard);

console.log('Fixed dashboard');
