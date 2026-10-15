const fs = require('fs');

let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Add the state and effects
const hookCode = `  const [hasNewRecommended, setHasNewRecommended] = useState(false);

  useEffect(() => {
    const checkNewRecommended = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const products = await res.json();
          const recommended = products.filter((p) => p.isRecommended);
          
          if (recommended.length > 0) {
            let latestTime = 0;
            recommended.forEach((p) => {
              const time = new Date(p.recommendedAt || p.createdAt || 0).getTime();
              if (time > latestTime) latestTime = time;
            });
            
            const lastViewedStr = localStorage.getItem('lastViewedRecommendedAt');
            const lastViewedTime = lastViewedStr ? parseInt(lastViewedStr, 10) : 0;
            
            if (latestTime > lastViewedTime && location.pathname !== '/recommended') {
              setHasNewRecommended(true);
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    checkNewRecommended();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/recommended') {
      setHasNewRecommended(false);
      localStorage.setItem('lastViewedRecommendedAt', Date.now().toString());
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;`;

content = content.replace(
  /const isActive = \(path: string\) => location\.pathname === path;/,
  hookCode
);

// Add the red dot to the Recommended Link
content = content.replace(
  /<Link \s*to="\/recommended"[\s\S]*?className=\{`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap \$\{isActive\('\/recommended'\) \? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'\}`\}>\s*\{lang === 'ja' \? 'おすすめの商品' : 'Recommended'\}\s*<\/Link>/m,
  `<Link 
                to="/recommended" 
                className={\`relative text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap \${isActive('/recommended') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}\`}
              >
                {lang === 'ja' ? 'おすすめの商品' : 'Recommended'}
                {hasNewRecommended && (
                  <span className="absolute top-4 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </Link>`
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('Updated Layout with red dot');
