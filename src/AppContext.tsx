import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Product } from './types';

interface CartItem extends Product {
  quantity: number;
}

export type Language = 'en' | 'ja';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  lang: Language;
  setLang: (lang: Language) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('AgriShop_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('AgriShop_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('AgriShop_lang') as Language;
    return (stored === 'en' || stored === 'ja') ? stored : 'ja';
  });
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Empty, initializations moved to useState
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`/api/favorites?userId=${user.id}`)
        .then(res => res.json())
        .then(data => setFavorites(data.map((f: any) => f.productId)))
        .catch(() => {});
    } else {
      setFavorites([]);
    }
  }, [user]);

  const toggleFavorite = async (productId: string) => {
    if (!user) return;
    const isFav = favorites.includes(productId);
    if (isFav) {
      await fetch(`/api/favorites?userId=${user.id}&productId=${productId}`, { method: 'DELETE' });
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId })
      });
      setFavorites([...favorites, productId]);
    }
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('AgriShop_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('AgriShop_user');
    }
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('AgriShop_lang', newLang);
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('AgriShop_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number) => {
    const newCart = [...cart];
    const existing = newCart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }
    saveCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart(cart.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + Math.floor(item.price * 1.1) * item.quantity, 0);

  return (
    <AppContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, lang, setLang, favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

