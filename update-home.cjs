const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

content = content.replace(
  "import { Search, Package, Heart, TrendingUp } from 'lucide-react';",
  "import { Search, Package, Heart, TrendingUp, Leaf } from 'lucide-react';"
);

const oldRecommended = `          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
            {recommendedProducts.map(product => (
              <Link key={product.id} to={\`/product/\${product.id}\`} className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform">
                <div className="h-[120px] bg-gray-50 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                  ) : (
                    <Package className="w-8 h-8 text-gray-300" />
                  )}
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <div className="text-xs font-bold mb-1 truncate text-gray-900">{product.name}</div>
                  <div className="text-sm font-extrabold text-[#2563EB] mt-auto">¥{product.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>`;

const newRecommended = `          <div className="flex flex-col md:flex-row gap-4 px-2">
            <div className="w-full md:w-auto">
              <div className="grid grid-cols-2 gap-4" style={{ gridAutoColumns: 'minmax(140px, 1fr)', minWidth: 'min-content' }}>
                {recommendedProducts.map(product => (
                  <Link key={product.id} to={\`/product/\${product.id}\`} className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform w-full sm:w-[160px]">
                    <div className="h-[120px] bg-gray-50 flex items-center justify-center overflow-hidden">
                      {product.imageUrl ? (
                         <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                      ) : (
                        <Package className="w-8 h-8 text-gray-300" />
                      )}
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <div className="text-xs font-bold mb-1 truncate text-gray-900">{product.name}</div>
                      <div className="text-sm font-extrabold text-[#2563EB] mt-auto">¥{product.price.toLocaleString()}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex-1 hidden sm:flex items-center justify-center p-6 bg-gradient-to-r from-[#F0FDF4] to-[#EFF6FF] rounded-xl border border-[#DCFCE7] shadow-sm relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12">
                <Leaf className="w-40 h-40 text-[#16A34A]" />
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 leading-snug relative z-10 text-center tracking-tight">
                {lang === 'ja' ? '農家から届く新鮮で安心な食材を、' : 'Fresh and safe ingredients from farmers, '}<br className="hidden lg:block"/>
                <span className="text-[#16A34A]">{lang === 'ja' ? 'いつでも簡単にお買い物' : 'easy shopping anytime'}</span>
              </p>
            </div>
          </div>`;

content = content.replace(oldRecommended, newRecommended);

fs.writeFileSync('src/pages/Home.tsx', content);
console.log('Home.tsx updated with slogan');
