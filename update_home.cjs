const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

// Add recommended badge to Home.tsx product cards
content = content.replace(
  /\{product\.stock === 0 && \([\s\S]*?<\/div>\s*\)\}/,
  `{product.stock === 0 && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                        <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">{lang === 'ja' ? '完売' : 'Sold Out'}</span>
                      </div>
                    )}
                    {product.isRecommended && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                          {lang === 'ja' ? 'おすすめ' : 'Recommended'}
                        </span>
                      </div>
                    )}`
);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log('Updated Home.tsx');
