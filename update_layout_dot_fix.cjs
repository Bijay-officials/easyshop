const fs = require('fs');

let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Add the red dot to the Recommended Link
content = content.replace(
  /<Link\s*to="\/recommended"\s*className=\{`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap \$\{isActive\('\/recommended'\) \? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'\}`\}>\s*\{lang === 'ja' \? 'おすすめの商品' : 'Recommended'\}\s*<\/Link>/m,
  `<Link 
                to="/recommended" 
                className={\`relative text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap \${isActive('/recommended') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}\`}
              >
                {lang === 'ja' ? 'おすすめの商品' : 'Recommended'}
                {hasNewRecommended && (
                  <span className="absolute top-4 -right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </Link>`
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('Fixed red dot in Layout');
