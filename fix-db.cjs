const fs = require('fs');

const dataPath = 'data/products.json';
let products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
products = products.map(p => {
  if (p.id === 'prod_cut_fruit') {
    return { ...p, isRecommended: true };
  }
  return p;
});

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
console.log('Fixed DB');
