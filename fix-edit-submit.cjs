const fs = require('fs');

let edit = fs.readFileSync('src/pages/admin/EditProductAdmin.tsx', 'utf-8');
edit = edit.replace(
  /imageUrl: urlsArray\[0\] \|\| '',\s*imageUrls: urlsArray/,
  "imageUrl: imageBase64 || urlsArray[0] || '',\n        imageUrls: urlsArray"
);
fs.writeFileSync('src/pages/admin/EditProductAdmin.tsx', edit);
console.log('Fixed edit');
