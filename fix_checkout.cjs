const fs = require('fs');
let content = fs.readFileSync('src/pages/Checkout.tsx', 'utf-8');

// Update item.price -> Math.floor(item.price * 1.1) in POST request
content = content.replace(
  /price: item\.price,/,
  'price: Math.floor(item.price * 1.1),'
);

// Update item summary display
content = content.replace(
  /<div className="font-extrabold text-base text-gray-900">\s*¥\{\(item\.price \* item\.quantity\)\.toLocaleString\(\)\}\s*<\/div>/,
  `<div className="font-extrabold text-base text-gray-900 flex items-baseline gap-1">
                ¥{(Math.floor(item.price * 1.1) * item.quantity).toLocaleString()}
                <span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
              </div>`
);

// Update total display
content = content.replace(
  /<div className="text-xl font-extrabold text-gray-900">\s*¥\{cartTotal\.toLocaleString\(\)\}\s*<\/div>/,
  `<div className="text-xl font-extrabold text-gray-900 flex items-baseline gap-1">
                ¥{cartTotal.toLocaleString()}
                <span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
              </div>`
);

// Find discount logic and fix if necessary. Wait, total calculation is based on `cartTotal`.
// And `cartTotal` is from AppContext which is already tax-included.

fs.writeFileSync('src/pages/Checkout.tsx', content);
