import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Trash2, ShoppingBag, ShoppingCart, ArrowRight, Package, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, lang } = useAppContext();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      if (res.ok) {
        setCategories(await res.json());
      }
    };
    fetchCategories();
  }, []);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center mt-8 animate-fade-in">
        <ShoppingBag className="w-16 h-16 mx-auto text-[#D1D5DB] mb-4" />
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{lang === 'ja' ? 'カートは空です' : 'Your cart is empty'}</h2>
        <p className="text-sm text-[#6B7280] mb-6">{lang === 'ja' ? 'カートに商品がありません。' : 'Looks like you haven\'t added anything to your cart yet.'}</p>
        <Link to="/" className="inline-flex bg-green-600 text-white px-8 py-3 rounded-xl text-sm font-bold border-none hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {lang === 'ja' ? 'お買い物を始める' : 'Start Shopping'}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full mt-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-green-600 transition-colors bg-gray-50 hover:bg-green-50 px-4 py-2 rounded-full"
      >
        <ArrowLeft className="w-4 h-4" /> {lang === 'ja' ? '戻る' : 'Back'}
      </button>

      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
        <ShoppingCart className="w-6 h-6 text-green-600" /> {lang === 'ja' ? 'ショッピングカート' : 'Shopping Cart'}
      </h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8 animate-slide-up">
        <div className="divide-y divide-[#E5E7EB]">
          {cart.map(item => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 bg-[#F9FAFB] rounded-md flex-shrink-0 flex items-center justify-center border border-[#E5E7EB] overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                   <Package className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <div className="flex-grow text-center sm:text-left">
                <div className="mb-1">
                  <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{categories.find(c => c.id === item.category)?.name || item.category}</span>
                </div>
                <Link to={`/product/${item.id}`} className="font-bold text-base text-gray-900 hover:text-green-600 transition-colors">
                  {item.name}
                </Link>
                <div className="text-gray-900 font-extrabold text-lg mt-1 flex items-baseline gap-1">¥{Math.floor(item.price * 1.1).toLocaleString()}<span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span></div>
              </div>
              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 md:w-20 border border-gray-200 bg-gray-50 rounded-lg p-2 text-sm font-medium text-center focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-[#9CA3AF] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100"
                  title={lang === 'ja' ? '削除' : 'Remove'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 animate-slide-up">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#6B7280]">{lang === 'ja' ? '合計:' : 'Total:'}</span>
          <span className="font-extrabold text-3xl text-gray-900 flex items-baseline gap-2">¥{cartTotal.toLocaleString()}<span className="text-xs font-medium text-gray-500">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span></span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-xl text-base font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none"
        >
          {lang === 'ja' ? 'レジに進む' : 'Proceed to Checkout'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
