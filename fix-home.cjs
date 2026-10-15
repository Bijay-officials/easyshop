const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.tsx', 'utf-8');
home = home.replace(
  /const fetchRecommended = async \(\) => \{[\s\S]*?\};\n/,
  `const fetchRecommended = async () => {
    const res = await fetch('/api/products?recommended=true');
    const data = await res.json();
    setRecommendedProducts(data);
  };
`
);

fs.writeFileSync('src/pages/Home.tsx', home);
console.log('Fixed Home');
