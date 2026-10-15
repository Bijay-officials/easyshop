import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Package } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../AppContext';

export default function Recommended() {
  const { lang, favorites, toggleFavorite } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?recommended=true');
      let data = await res.json();
      setProducts(data);
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
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        <h1 className="text-[20px] font-extrabold text-gray-900">{lang === 'ja' ? 'おすすめの商品' : 'Recommended Products'}</h1>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-[#E5E7EB] overflow-hidden hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow group relative flex flex-col">
            <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] bg-[#F9FAFB] overflow-hidden">
              {product.imageUrl ? (
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
              )}
            </Link>
            <div className="p-3 flex flex-col flex-1">
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
