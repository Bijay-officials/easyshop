import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Tag } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function Checkout() {
  const { cart, cartTotal, user, clearCart, lang } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discountPercent: number} | null>(null);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [step, setStep] = useState(1);

  // Shipping Address state
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    zip: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    if (loading) return;
    if (cart.length === 0) {
      navigate('/cart');
    }
    if (!user) {
      navigate('/login?redirect=checkout');
    }
  }, [cart, user, navigate, loading]);

  const applyCoupon = async () => {
    if (!couponCode) return;
    setCouponError('');
    try {
      const res = await fetch(`/api/coupons/${couponCode}`);
      if (res.ok) {
        const data = await res.json();
        setAppliedCoupon(data);
      } else {
        setCouponError(lang === 'ja' ? '無効なクーポンコードです' : 'Invalid coupon code');
      }
    } catch (err) {
      setCouponError(lang === 'ja' ? 'エラーが発生しました' : 'Error applying coupon');
    }
  };

  const handleCheckout = async () => {
    if (!user) return;
    
    if (!shippingAddress.name || !shippingAddress.zip || !shippingAddress.address || !shippingAddress.phone) {
      setError(lang === 'ja' ? '配送先情報をすべて入力してください。' : 'Please fill in all shipping address fields.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          couponCode: appliedCoupon ? appliedCoupon.code : null,
          paymentMethod,
          shippingAddress,
          items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: Math.floor(item.price * 1.1),
            quantity: item.quantity
          }))
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Checkout failed');
      }
      
      clearCart();
      // Simulate email notification
      console.log(`[EMAIL NOTIFICATION] Email sent to ${user.email} for order ${data.id}. Total: ¥${data.total.toLocaleString()}`);
      
      navigate('/orders');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!user || cart.length === 0) return null;

  const discountAmount = appliedCoupon ? Math.floor(cartTotal * (appliedCoupon.discountPercent / 100)) : 0;
  const finalTotal = cartTotal - discountAmount;

  return (
    <div className="max-w-2xl mx-auto mt-4 w-full">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">{lang === 'ja' ? 'ご注文の確認' : 'Checkout'}</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6 animate-slide-up">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-extrabold text-lg text-gray-900">{lang === 'ja' ? '注文内容' : 'Order Summary'}</h2>
        </div>
        <div className="p-6 space-y-4 border-b border-gray-100">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div>
                <div className="font-bold text-sm text-gray-900">{item.name}</div>
                <div className="text-xs font-semibold text-gray-500">{lang === 'ja' ? '数量:' : 'Qty:'} {item.quantity}</div>
              </div>
              <div className="font-extrabold text-base text-gray-900 flex items-baseline gap-1">
                ¥{(Math.floor(item.price * 1.1) * item.quantity).toLocaleString()}
                <span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder={lang === 'ja' ? 'クーポンコード (WELCOME10)' : 'Coupon Code (WELCOME10)'} 
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 pl-10 transition-all bg-gray-50"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                disabled={!!appliedCoupon}
              />
              <Tag className="w-5 h-5 text-gray-400 absolute left-3.5 top-2.5" />
            </div>
            {!appliedCoupon ? (
              <button 
                onClick={applyCoupon}
                className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
              >
                {lang === 'ja' ? '適用' : 'Apply'}
              </button>
            ) : (
              <button 
                onClick={() => {setAppliedCoupon(null); setCouponCode('');}}
                className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
              >
                {lang === 'ja' ? '解除' : 'Remove'}
              </button>
            )}
          </div>
          {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
          {appliedCoupon && <p className="text-green-600 text-xs mt-1">{lang === 'ja' ? `${appliedCoupon.discountPercent}%割引が適用されました` : `${appliedCoupon.discountPercent}% discount applied`}</p>}
        </div>

        <div className="p-4 bg-[#F9FAFB] flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-[#6B7280]">{lang === 'ja' ? '小計' : 'Subtotal'}</span>
            <span className="text-sm font-bold text-gray-900 flex items-baseline gap-1">¥{cartTotal.toLocaleString()}<span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span></span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between items-center text-green-600">
              <span className="text-sm font-semibold">{lang === 'ja' ? '割引' : 'Discount'}</span>
              <span className="text-sm font-bold">-¥{discountAmount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between items-center border-t border-[#E5E7EB] pt-2 mt-1">
            <span className="text-sm font-bold text-gray-900">{lang === 'ja' ? '合計' : 'Total'}</span>
            <span className="text-[18px] font-extrabold text-[#2563EB] flex items-baseline gap-1">¥{finalTotal.toLocaleString()}<span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span></span>
          </div>
        </div>
      </div>
      
      {step === 1 ? (
        <>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6 animate-slide-up">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-extrabold text-lg text-gray-900">{lang === 'ja' ? 'お届け先住所' : 'Shipping Address'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{lang === 'ja' ? 'お名前' : 'Name'}</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  value={shippingAddress.name}
                  onChange={e => setShippingAddress({...shippingAddress, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{lang === 'ja' ? '郵便番号' : 'Zip Code'}</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  value={shippingAddress.zip}
                  onChange={e => setShippingAddress({...shippingAddress, zip: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{lang === 'ja' ? '住所' : 'Address'}</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  value={shippingAddress.address}
                  onChange={e => setShippingAddress({...shippingAddress, address: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{lang === 'ja' ? '電話番号' : 'Phone Number'}</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  value={shippingAddress.phone}
                  onChange={e => setShippingAddress({...shippingAddress, phone: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
          
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-md mb-4 text-xs font-bold border border-red-100">{error}</div>}

          <button
            onClick={() => {
              if (!shippingAddress.name || !shippingAddress.zip || !shippingAddress.address || !shippingAddress.phone) {
                setError(lang === 'ja' ? '配送先情報をすべて入力してください。' : 'Please fill in all shipping address fields.');
                return;
              }
              setError('');
              setStep(2);
            }}
            className="w-full bg-[#2563EB] text-white py-2.5 rounded-md text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors border-none"
          >
            {lang === 'ja' ? 'お支払いへ進む' : 'Continue to Payment'}
          </button>
        </>
      ) : (
        <>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6 animate-slide-up">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-extrabold text-lg text-gray-900">{lang === 'ja' ? 'お支払い方法' : 'Payment Method'}</h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="credit-card" 
                  checked={paymentMethod === 'credit-card'} 
                  onChange={() => setPaymentMethod('credit-card')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{lang === 'ja' ? 'クレジットカード' : 'Credit Card'}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="paypay" 
                  checked={paymentMethod === 'paypay'} 
                  onChange={() => setPaymentMethod('paypay')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{lang === 'ja' ? 'PayPay' : 'PayPay'}</span>
              </label>
            </div>
          </div>

          {error && <div className="p-3 bg-red-50 text-red-600 rounded-md mb-4 text-xs font-bold border border-red-100">{error}</div>}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              disabled={loading}
              className="flex-1 bg-white text-gray-700 border border-gray-300 py-2.5 rounded-md text-xs font-bold flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-70"
            >
              {lang === 'ja' ? '戻る' : 'Back'}
            </button>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex-[2] bg-[#2563EB] text-white py-2.5 rounded-md text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70 border-none"
            >
              <ShieldCheck className="w-4 h-4" />
              {loading ? (lang === 'ja' ? '処理中...' : 'Processing...') : (lang === 'ja' ? '注文を確定する' : 'Confirm Order')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
