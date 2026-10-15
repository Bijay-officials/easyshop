import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../AppContext';

export default function Ranking() {
  const { lang, favorites, toggleFavorite } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // For ranking, we just fetch all and sort by stock ascending (simulating popularity)
      // or we can just fetch recommended if we want
      const res = await fetch('/api/products');
      let data = await res.json();
      
      // Simulate ranking sort (e.g. by lowest stock = highest sales)
      data.sort((a: Product, b: Product) => a.stock - b.stock);
      
      setProducts(data.slice(0, 10)); // Top 10
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-sm font-semibold">{lang === 'ja' ? '読み込み中...' : 'Loading...'}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h1 className="text-[20px] font-extrabold text-gray-900">{lang === 'ja' ? '人気ランキング' : 'Popular Ranking'}</h1>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <div key={product.id} className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-[#E5E7EB] overflow-hidden hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow group relative">
            <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              {index + 1}
            </div>
            <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] bg-[#F9FAFB] overflow-hidden">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <TrendingUp className="w-8 h-8" />
                </div>
              )}
            </Link>
            <div className="p-3">
              <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">{product.category}</div>
              <Link to={`/product/${product.id}`}>
                <h3 className="font-bold text-[13px] text-gray-900 mb-1 leading-tight line-clamp-2 hover:text-[#2563EB] transition-colors">{product.name}</h3>
              </Link>
              <div className="flex flex-col mt-auto pt-2">
                <div className="font-extrabold text-[15px] text-[#2563EB] flex items-baseline gap-1">
                  ¥{Math.floor(product.price * 1.1).toLocaleString()}
                  <span className="text-[9px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                </div>
                <div className="text-[9px] text-gray-400 font-medium mt-0.5">
                  {lang === 'ja' ? `税抜 ¥${product.price.toLocaleString()}` : `Tax Excl. ¥${product.price.toLocaleString()}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
