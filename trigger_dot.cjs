const fs = require('fs');
const file = 'data/products.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const p = data.find(p => p.id === 'prod_cut_fruit');
if (p) {
  p.recommendedAt = new Date(Date.now() + 1000000).toISOString();
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('updated product', p.recommendedAt);
}
