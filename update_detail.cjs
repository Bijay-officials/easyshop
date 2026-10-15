const fs = require('fs');

let content = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf-8');

// Add recommended badge to ProductDetail.tsx product image
content = content.replace(
  /\{selectedImage \? \([\s\S]*?<\/div>\s*\)\}/,
  `{selectedImage ? (
               <img src={selectedImage} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
            ) : (
              <Package className="w-24 h-24 text-gray-300" />
            )}
            {product.isRecommended && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {lang === 'ja' ? 'おすすめ' : 'Recommended'}
                </span>
              </div>
            )}`
);

fs.writeFileSync('src/pages/ProductDetail.tsx', content);
console.log('Updated ProductDetail.tsx');
