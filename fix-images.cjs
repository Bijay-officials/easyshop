const fs = require('fs');
const path = require('path');

const dataPath = path.join(process.cwd(), 'data', 'products.json');
let products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

for (let p of products) {
  if (p.id === 'prod_1') {
    p.imageUrl = 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&q=80';
  }
  if (p.id === 'prod_6') {
    p.imageUrl = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';
  }
}

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf-8');
console.log('Images fixed');
