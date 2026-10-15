const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');
content = content.replace(
  /setRecommendedProducts\(data\.slice\(0, 4\)\);/,
  "setRecommendedProducts(data.filter((p: Product) => p.id === 'prod_cut_fruit'));"
);
fs.writeFileSync('src/pages/Home.tsx', content);
