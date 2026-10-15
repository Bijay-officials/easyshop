const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

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
    
    // Poll every 10 seconds
    const interval = setInterval(checkNewRecommended, 10000);
    return () => clearInterval(interval);
  }, [location.pathname]);`;

content = content.replace(
  /const \[hasNewRecommended, setHasNewRecommended\] = useState\(false\);[\s\S]*?\}, \[location\.pathname\]\);/,
  hookCode
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('Fixed polling');
