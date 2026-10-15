import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, Heart, TrendingUp, Leaf } from 'lucide-react';
import { Product, Category } from '../types';
import { useAppContext } from '../AppContext';

export default function Home() {
  const { lang, favorites, toggleFavorite } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory]);

  const fetchProducts = async () => {
    let url = '/api/products?';
    if (search) url += `search=${search}&`;
    if (selectedCategory) url += `category=${selectedCategory}&`;
    
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  return (
    <div className="flex flex-col h-full gap-8 pb-8">
      {/* Hero Section */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-green-50 border border-green-100 shadow-sm animate-fade-in">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.15] mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="relative z-10 p-4 sm:p-8 md:p-16 lg:p-20 flex flex-col items-center text-center">
          <h1 className="text-[0.9rem] min-[375px]:text-[1rem] min-[400px]:text-[1.1rem] sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-green-950 mb-3 md:mb-6 tracking-tight leading-tight whitespace-nowrap">
            <span className="text-green-600 mr-1 md:mr-2">🌱</span>
            {lang === 'ja' ? '農場から食卓へ新鮮をお届け' : 'Fresh from Farm to Your Table'}
          </h1>
          <p className="text-[0.65rem] min-[375px]:text-[0.75rem] min-[400px]:text-[0.85rem] sm:text-sm md:text-xl text-green-800 mb-6 md:mb-8 max-w-2xl mx-auto font-medium leading-relaxed opacity-90 whitespace-nowrap sm:whitespace-normal">
            {lang === 'ja' ? '品質、鮮度、そして真心とともに新鮮な野菜と果物をお届けします。' : 'Fresh vegetables and fruits delivered with quality, freshness, and care.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => {
                const element = document.getElementById('products-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Leaf className="w-5 h-5" />
              {lang === 'ja' ? '今すぐ購入' : 'Shop Now'}
            </button>
            <Link 
              to="/recommended" 
              className="bg-white hover:bg-green-50 text-green-700 px-8 py-3.5 rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-sm border border-green-200 hover:border-green-300 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              {lang === 'ja' ? 'おすすめを見る' : 'Explore Products'}
            </Link>
          </div>
        </div>
      </div>

      <div id="products-section" className="flex flex-col gap-6 animate-slide-up">
        {/* Search and Headers */}
        <div className="flex flex-col md:flex-row justify-between items-center px-1 gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <h2 className="m-0 text-2xl font-extrabold text-gray-900 tracking-tight">{lang === 'ja' ? '商品一覧' : 'Products'} <span className="font-semibold text-gray-400 text-sm ml-1">({lang === 'ja' ? '全' : 'Total '}{products.length}{lang === 'ja' ? '件' : ''})</span></h2>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-[320px] group">
              <input
                type="text"
                placeholder={lang === 'ja' ? '商品を検索...' : 'Search products...'}
                className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-2xl text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all shadow-sm group-hover:shadow-md font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-green-500" />
            </div>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 px-1 hide-scrollbar -mx-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all duration-300 shadow-sm ${!selectedCategory ? 'bg-green-600 text-white shadow-green-600/20 shadow-lg -translate-y-0.5' : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200 hover:shadow-md'}`}
          >
            {lang === 'ja' ? 'すべてのカテゴリー' : 'All Categories'}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all duration-300 shadow-sm ${selectedCategory === cat.id ? 'bg-green-600 text-white shadow-green-600/20 shadow-lg -translate-y-0.5' : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200 hover:shadow-md'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-4">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-500 text-base font-medium">
              {lang === 'ja' ? '条件に一致する商品が見つかりませんでした。' : 'No products found matching your criteria.'}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 p-1">
            {products.map((product, index) => (
              <div key={product.id} className="relative group animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <Link to={`/product/${product.id}`} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 h-full block group-hover:-translate-y-1.5">
                  <div className="h-[180px] sm:h-[200px] bg-gray-50 flex items-center justify-center overflow-hidden relative group-hover:bg-gray-100 transition-colors">
                    {product.imageUrl ? (
                       <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Package className="w-12 h-12 text-gray-300" />
                    )}
                    {product.stock === 0 && (
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
                    )}
                  </div>
                  <div className="p-4 sm:p-5 flex flex-1 flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-green-100 text-green-800 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">{categories.find(c => c.id === product.category)?.name || product.category}</span>
                    </div>
                    <div className="text-base font-bold mb-2 h-[48px] overflow-hidden text-gray-900 leading-snug group-hover:text-green-600 transition-colors">{product.name}</div>
                    
                    <div className="flex flex-col mt-auto pt-2">
                      <div className="text-xl font-extrabold text-gray-900 flex items-baseline gap-1">
                        ¥{Math.floor(product.price * 1.1).toLocaleString()}
                        <span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {lang === 'ja' ? `税抜 ¥${product.price.toLocaleString()}` : `Tax Excl. ¥${product.price.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(product.id);
                  }}
                  className={`absolute top-3 right-3 p-2.5 bg-white backdrop-blur-md rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10 ${favorites.includes(product.id) ? 'hover:bg-red-50' : 'hover:bg-gray-50 hover:scale-110'}`}
                >
                  <Heart className={`w-4 h-4 transition-colors ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
