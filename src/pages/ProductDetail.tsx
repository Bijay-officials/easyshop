import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package, Heart, Star } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { Product, Review } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, user, lang, favorites, toggleFavorite } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [guestName, setGuestName] = useState('');
  
  // Recommendations
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const p = await res.json();
        setProduct(p);
        setSelectedImage(p.imageUrl || (p.imageUrls && p.imageUrls[0]) || null);
        
        // Fetch recommendations (same category)
        const recsRes = await fetch(`/api/products?category=${p.category}`);
        if (recsRes.ok) {
          const allRecs = await recsRes.json();
          setRecommendations(allRecs.filter((r: Product) => r.id !== p.id).slice(0, 4));
        }
      } else {
        navigate('/');
      }
    };
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      if (res.ok) {
        setCategories(await res.json());
      }
    };
    
    const fetchReviews = async () => {
      const res = await fetch(`/api/reviews?productId=${id}`);
      if (res.ok) {
        setReviews(await res.json());
      }
    };
    
    fetchProduct();
    fetchCategories();
    fetchReviews();
  }, [id, navigate]);

  if (!product) return <div className="text-center py-20 text-sm">{lang === 'ja' ? '読み込み中...' : 'Loading...'}</div>;

  const handleAddToCart = () => {
    if (!user) {
      navigate(`/login?redirect=/product/${id}`);
      return;
    }
    addToCart(product, quantity);
    navigate('/cart');
  };
  
  const submitReview = async (e: import('react').FormEvent) => {
    e.preventDefault();
    
    const reviewerName = user ? user.name : (guestName || 'Guest');
    const reviewerId = user ? user.id : 'guest_' + Date.now();

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        userId: reviewerId,
        userName: reviewerName,
        rating,
        comment
      })
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviews([...reviews, newReview]);
      setComment('');
      setGuestName('');
      setRating(5);
    }
  };

  const allImages = [];
  if (product.imageUrl) allImages.push(product.imageUrl);
  if (product.imageUrls) allImages.push(...product.imageUrls);
  const uniqueImages = Array.from(new Set(allImages));

  return (
    <div className="max-w-4xl mx-auto w-full mt-4 space-y-8 pb-8">
      {/* Product Detail */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row animate-fade-in">
        <div className="md:w-1/2 p-6 flex flex-col border-b md:border-b-0 md:border-r border-[#E5E7EB]">
          <div className="bg-[#F9FAFB] flex items-center justify-center rounded-lg border border-gray-200 overflow-hidden relative aspect-square mb-4">
            {selectedImage ? (
               <img src={selectedImage} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
            ) : (
              <Package className="w-24 h-24 text-gray-300" />
            )}
            {product.isRecommended && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {lang === 'ja' ? 'おすすめ' : 'Recommended'}
                </span>
              </div>
            )}
          </div>
          {uniqueImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
              {uniqueImages.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(img)} className={`flex-shrink-0 w-16 h-16 border rounded-md overflow-hidden ${selectedImage === img ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}>
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2 p-6 flex flex-col relative">
          <button onClick={() => navigate(-1)} className="self-start text-sm font-bold text-gray-500 hover:text-green-600 flex items-center gap-1.5 mb-6 transition-colors bg-gray-50 hover:bg-green-50 px-4 py-2 rounded-full">
            <ArrowLeft className="w-3 h-3" /> {lang === 'ja' ? '商品一覧へ戻る' : 'Back to Products'}
          </button>
          
          <button 
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
          
          <div className="mb-2">
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">{categories.find(c => c.id === product.category)?.name || product.category}</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight pr-12">{product.name}</h1>
          
          <div className="mb-6 flex flex-col">
            <div className="text-3xl font-extrabold text-gray-900 flex items-baseline gap-2">
              ¥{Math.floor(product.price * 1.1).toLocaleString()}
              <span className="text-sm font-medium text-gray-500">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
            </div>
            <div className="text-sm font-medium text-gray-400 mt-1">
              {lang === 'ja' ? `税抜 ¥${product.price.toLocaleString()}` : `Tax Excl. ¥${product.price.toLocaleString()}`}
            </div>
          </div>
          
          <p className="text-[#4B5563] text-sm leading-relaxed mb-6 flex-grow whitespace-pre-wrap">{product.description}</p>
          
          <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="quantity" className="text-xs font-bold text-[#4B5563]">{lang === 'ja' ? '数量' : 'Quantity'}</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 border border-gray-200 bg-gray-50 rounded-lg p-2 text-base font-medium text-center focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
              />
              <span className={`text-[11px] font-semibold ${product.stock > 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                {lang === 'ja' ? `残り${product.stock}点` : `${product.stock} available`}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3.5 rounded-xl text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 border-none ${product.stock > 0 ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stock > 0 ? (lang === 'ja' ? 'カートに追加' : 'Add to Cart') : (lang === 'ja' ? '在庫なし' : 'Out of Stock')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 animate-slide-up">
        <h2 className="text-lg font-bold text-gray-900 mb-6">{lang === 'ja' ? 'カスタマーレビュー' : 'Customer Reviews'}</h2>
        
        {user ? (
          <form onSubmit={submitReview} className="mb-8 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-sm font-semibold mb-3">{lang === 'ja' ? 'レビューを書く' : 'Write a Review'}</h3>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">{lang === 'ja' ? '評価' : 'Rating'}</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button type="button" key={star} onClick={() => setRating(star)}>
                    <Star className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">{lang === 'ja' ? 'コメント' : 'Comment'}</label>
              <textarea 
                required 
                className="w-full border border-[#D1D5DB] rounded p-2 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" 
                rows={3} 
                value={comment} 
                onChange={e => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="bg-[#2563EB] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#1D4ED8]">{lang === 'ja' ? '投稿する' : 'Submit'}</button>
          </form>
        ) : (
          <div className="mb-8 text-sm text-gray-500">
            <Link to={`/login?redirect=/product/${id}`} className="text-blue-600 hover:underline">{lang === 'ja' ? 'ログイン' : 'Log in'}</Link> {lang === 'ja' ? 'してレビューを書く' : 'to write a review.'}
          </div>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-500">{lang === 'ja' ? 'レビューはまだありません。' : 'No reviews yet.'}</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-sm">{review.userName}</div>
                  <div className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">{lang === 'ja' ? 'おすすめの商品' : 'Recommended Products'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendations.map(rec => (
              <Link key={rec.id} to={`/product/${rec.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform">
                <div className="h-[120px] bg-gray-50 flex items-center justify-center overflow-hidden p-2">
                  {rec.imageUrl ? (
                     <img src={rec.imageUrl} alt={rec.name} className="w-full h-full object-contain mix-blend-multiply" />
                  ) : (
                    <Package className="w-8 h-8 text-gray-300" />
                  )}
                </div>
                <div className="p-2 flex flex-col flex-1">
                  <div className="text-xs font-bold mb-1 truncate">{rec.name}</div>
                  <div className="mt-auto">
                    <div className="text-sm font-extrabold text-[#2563EB] flex items-baseline gap-1">
                      ¥{Math.floor(rec.price * 1.1).toLocaleString()}
                      <span className="text-[9px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
