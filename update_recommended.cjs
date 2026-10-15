const fs = require('fs');

let content = fs.readFileSync('src/pages/Recommended.tsx', 'utf-8');

// Add recommended badge to Recommended.tsx product cards
content = content.replace(
  /\{product\.imageUrl \? \([\s\S]*?<\/div>\s*\)\}/,
  `{product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Package className="w-8 h-8" />
                </div>
              )}
              {product.isRecommended && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                    {lang === 'ja' ? 'おすすめ' : 'Recommended'}
                  </span>
                </div>
              )}`
);

fs.writeFileSync('src/pages/Recommended.tsx', content);
console.log('Updated Recommended.tsx');
