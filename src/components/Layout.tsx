import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Shield, ChevronDown, Leaf } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function Layout() {
  const { user, setUser, cart, lang, setLang } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

      const [hasNewRecommended, setHasNewRecommended] = useState(false);

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
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/recommended') {
      setHasNewRecommended(false);
      localStorage.setItem('lastViewedRecommendedAt', Date.now().toString());
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col overflow-x-hidden font-sans">
      <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 flex-shrink-0 sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="flex items-center flex-1 min-w-0">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="flex items-center justify-center bg-green-600 text-white p-2 md:p-2.5 rounded-xl shadow-md">
              <Leaf className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight hidden sm:inline leading-none text-gray-900">AgriShop</span>
              <span className="text-[10px] text-green-600 font-bold hidden sm:inline tracking-wider mt-0.5 uppercase">{lang === 'ja' ? '産地直送で笑顔をお届け' : 'Farm Fresh Joy'}</span>
            </div>
          </Link>
          
          {/* Main Navigation Tabs */}
          <div className="flex-1 min-w-0 overflow-x-auto hide-scrollbar ml-4 md:ml-6">
            <nav className="flex items-center gap-4 lg:gap-6 h-full w-max">
              <Link 
                to="/" 
                className={`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap ${isActive('/') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}
              >
                {lang === 'ja' ? 'トップ' : 'Top Page'}
              </Link>
              <Link 
                to="/ranking" 
                className={`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap ${isActive('/ranking') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}
              >
                {lang === 'ja' ? 'ランキング' : 'Ranking'}
              </Link>
              <Link 
                to="/recommended" 
                className={`relative text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap ${isActive('/recommended') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}
              >
                {lang === 'ja' ? 'おすすめの商品' : 'Recommended'}
                {hasNewRecommended && (
                  <span className="inline-block ml-1.5 mb-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </Link>
              {user && user.role !== 'admin' && (
                <Link 
                  to="/orders" 
                  className={`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap ${isActive('/orders') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}
                >
                  {lang === 'ja' ? '注文履歴 / 配送状況確認' : 'Orders / Tracking'}
                </Link>
              )}
            </nav>
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0 ml-4">
          <div className="relative h-full flex items-center" ref={menuRef}>
            {user ? (
              <>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`text-sm font-bold transition-all duration-300 flex items-center gap-1.5 py-5 border-b-2 ${isMenuOpen ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}
                >
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {user.role === 'admin' 
                        ? (lang === 'ja' ? '管理者' : 'Admin') 
                        : (lang === 'ja' ? `ようこそ、${user.name}さん` : `Welcome, ${user.name}`)}
                    </span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform hidden sm:block ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMenuOpen && (
                  <div className="absolute top-[64px] right-0 sm:left-0 sm:right-auto w-48 bg-white border border-[#E5E7EB] shadow-2xl rounded-b-md overflow-hidden z-50">
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-3 text-[13px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> {lang === 'ja' ? 'ログアウト' : 'Logout'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link 
                to="/login"
                className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1.5 py-5 border-b-2 border-transparent hover:border-green-200"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === 'ja' ? 'ログイン / 登録' : 'Login / Register'}</span>
              </Link>
            )}
          </div>
          
          <Link to="/cart" className="relative text-gray-600 hover:text-green-600 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <div className="flex items-center">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as 'en' | 'ja')}
              className="bg-transparent border-none text-xs font-semibold text-gray-600 focus:outline-none cursor-pointer hover:text-green-600 transition-colors"
            >
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </header>
      <main className="flex-grow w-full max-w-[1200px] mx-auto p-4 sm:p-6 flex flex-col relative z-0">
        <Outlet />
      </main>
      <footer className="py-6 md:py-8 bg-white border-t border-gray-200 text-gray-500 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 text-sm flex-shrink-0 mt-auto">
        <div>&copy; {new Date().getFullYear()} AgriShop. All rights reserved.</div>
        <div className="flex gap-6 mt-4 sm:mt-0 font-medium">
          <span className="flex items-center gap-2"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span> {lang === 'ja' ? 'システム正常' : 'System Normal'}</span>
        </div>
      </footer>
    </div>
  );
}
