const fs = require('fs');
let content = fs.readFileSync('src/AppContext.tsx', 'utf-8');
content = content.replace(
  /const cartTotal = cart\.reduce\(\(total, item\) => total \+ item\.price \* item\.quantity, 0\);/,
  "const cartTotal = cart.reduce((total, item) => total + Math.floor(item.price * 1.1) * item.quantity, 0);"
);
fs.writeFileSync('src/AppContext.tsx', content);
