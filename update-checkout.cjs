const fs = require('fs');

let content = fs.readFileSync('src/pages/Checkout.tsx', 'utf-8');

// Add paymentMethod state
content = content.replace(
  /const \[couponError, setCouponError\] = useState\(''\);/,
  `const [couponError, setCouponError] = useState('');\n  const [paymentMethod, setPaymentMethod] = useState('credit-card');`
);

// Add paymentMethod to the API request
content = content.replace(
  /couponCode: appliedCoupon \? appliedCoupon\.code : null,/,
  `couponCode: appliedCoupon ? appliedCoupon.code : null,\n          paymentMethod,`
);

// Add UI for payment methods
const paymentUI = `
      <div className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-[#E5E7EB] overflow-hidden mb-4">
        <div className="p-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <h2 className="font-bold text-[14px]">{lang === 'ja' ? 'お支払い方法' : 'Payment Method'}</h2>
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
            <span className="text-sm font-medium text-gray-700">{lang === 'ja' ? 'クレジットカード (デモ)' : 'Credit Card (demo)'}</span>
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
            <span className="text-sm font-medium text-gray-700">{lang === 'ja' ? 'PayPay (デモ)' : 'PayPay (demo)'}</span>
          </label>
        </div>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-600 rounded-md mb-4 text-xs font-bold border border-red-100">{error}</div>}
`;

content = content.replace(
  /\{error && <div className="p-3 bg-red-50 text-red-600 rounded-md mb-4 text-xs font-bold border border-red-100">\{error\}<\/div>\}/,
  paymentUI
);

fs.writeFileSync('src/pages/Checkout.tsx', content);
