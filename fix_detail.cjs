const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf-8');

content = content.replace(
  /\{\s*product\.isRecommended && \([\s\S]*?<\/div>\s*\)\s*\}\s*<\/div>\s*<div className="md:w-1\/2/m,
  `{product.isRecommended && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {lang === 'ja' ? 'おすすめ' : 'Recommended'}
                </span>
              </div>
            )}
          </div>
          {uniqueImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
              {uniqueImages.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(img)} className={\`flex-shrink-0 w-16 h-16 border rounded-md overflow-hidden \${selectedImage === img ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}\`}>
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2`
);
fs.writeFileSync('src/pages/ProductDetail.tsx', content);
