const fs = require('fs');
let content = fs.readFileSync('src/pages/Checkout.tsx', 'utf-8');

// Title
content = content.replace(
  /<h1 className="text-\[20px\] font-extrabold text-gray-900 mb-4">/g,
  '<h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">'
);

// Container blocks
content = content.replace(
  /className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] overflow-hidden mb-4"/g,
  'className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6 animate-slide-up"'
);
content = content.replace(
  /className="p-4 border-b border-\[#E5E7EB\] bg-\[#F9FAFB\]"/g,
  'className="p-6 border-b border-gray-100 bg-gray-50/50"'
);
content = content.replace(
  /className="font-bold text-\[14px\]"/g,
  'className="font-extrabold text-lg text-gray-900"'
);

// Order Summary lines
content = content.replace(
  /className="p-4 space-y-3 border-b border-gray-200"/g,
  'className="p-6 space-y-4 border-b border-gray-100"'
);
content = content.replace(
  /className="flex justify-between items-center pb-3 border-b border-\[#E5E7EB\] last:border-0 last:pb-0"/g,
  'className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0"'
);
content = content.replace(
  /className="font-bold text-\[13px\] text-gray-900"/g,
  'className="font-bold text-sm text-gray-900"'
);
content = content.replace(
  /className="font-extrabold text-\[13px\] text-gray-900"/g,
  'className="font-extrabold text-base text-gray-900"'
);
content = content.replace(
  /className="text-\[11px\] font-semibold text-\[#6B7280\]"/g,
  'className="text-xs font-semibold text-gray-500"'
);

// Coupon input
content = content.replace(
  /className="p-4 border-b border-gray-200"/g,
  'className="p-6 border-b border-gray-100"'
);
content = content.replace(
  /className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500 pl-8"/g,
  'className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 pl-10 transition-all bg-gray-50"'
);
content = content.replace(
  /<Tag className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" \/>/g,
  '<Tag className="w-5 h-5 text-gray-400 absolute left-3.5 top-2.5" />'
);
content = content.replace(
  /className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm font-semibold hover:bg-gray-200"/g,
  'className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"'
);
content = content.replace(
  /className="bg-red-50 text-red-600 px-3 py-1.5 rounded text-sm font-semibold hover:bg-red-100"/g,
  'className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"'
);
content = content.replace(
  /className="text-green-600 text-xs font-semibold mt-2"/g,
  'className="text-green-600 text-sm font-bold mt-3"'
);

// Summary totals
content = content.replace(
  /className="p-4 bg-\[#F9FAFB\] space-y-2"/g,
  'className="p-6 bg-gray-50/50 space-y-3"'
);
content = content.replace(
  /className="text-\[12px\] font-semibold text-gray-500"/g,
  'className="text-sm font-bold text-gray-500"'
);
content = content.replace(
  /className="text-\[13px\] font-extrabold"/g,
  'className="text-base font-extrabold"'
);
content = content.replace(
  /className="flex justify-between items-center text-\[16px\] font-extrabold text-gray-900 pt-2 border-t border-\[#E5E7EB\] mt-2"/g,
  'className="flex justify-between items-center text-xl font-extrabold text-green-600 pt-4 border-t border-gray-200 mt-2"'
);

// Form inputs
content = content.replace(
  /className="p-4 space-y-3"/g,
  'className="p-6 space-y-4"'
);
content = content.replace(
  /className="block text-\[11px\] font-bold text-\[#4B5563\] uppercase tracking-wider mb-1"/g,
  'className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"'
);
content = content.replace(
  /className="w-full border border-\[#D1D5DB\] rounded-md px-3 py-2 text-sm focus:border-\[#2563EB\] outline-none"/g,
  'className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"'
);

// Payment method
content = content.replace(
  /className=\{`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors \$\{paymentMethod === 'credit-card' \? 'border-\[#2563EB\] bg-\[#EFF6FF\]' : 'border-\[#E5E7EB\] hover:border-gray-300'\}`\}/g,
  "className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === 'credit-card' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'}`}"
);
content = content.replace(
  /className=\{`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors \$\{paymentMethod === 'bank-transfer' \? 'border-\[#2563EB\] bg-\[#EFF6FF\]' : 'border-\[#E5E7EB\] hover:border-gray-300'\}`\}/g,
  "className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === 'bank-transfer' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'}`}"
);
content = content.replace(
  /className="text-\[13px\] font-bold text-gray-900"/g,
  'className="text-sm font-bold text-gray-900"'
);

// Buttons
content = content.replace(
  /className="w-full py-3 bg-\[#2563EB\] text-white rounded-md text-xs font-bold flex justify-center items-center gap-2 hover:bg-blue-700 transition-colors border-none disabled:opacity-50 disabled:cursor-not-allowed mb-2"/g,
  'className="w-full py-4 bg-green-600 text-white rounded-xl text-base font-bold flex justify-center items-center gap-2 hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg border-none disabled:opacity-50 disabled:cursor-not-allowed mb-4"'
);
content = content.replace(
  /className="w-full py-2 bg-gray-100 text-gray-600 rounded-md text-xs font-bold hover:bg-gray-200 transition-colors border-none"/g,
  'className="w-full py-3.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all border-none"'
);
content = content.replace(
  /className="w-full py-3 bg-\[#2563EB\] text-white rounded-md text-xs font-bold hover:bg-blue-700 transition-colors border-none flex justify-center items-center disabled:opacity-50"/g,
  'className="w-full py-4 bg-gray-900 text-white rounded-xl text-base font-bold hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg border-none flex justify-center items-center disabled:opacity-50"'
);
content = content.replace(
  /className="w-full py-2 text-gray-500 text-xs font-bold hover:text-gray-700 transition-colors"/g,
  'className="w-full py-3 text-gray-500 text-sm font-bold hover:text-gray-700 transition-colors mt-2"'
);

// Error and Success
content = content.replace(
  /className="bg-red-50 text-red-500 p-3 rounded-md text-xs font-semibold mb-4 border border-red-100"/g,
  'className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100"'
);

fs.writeFileSync('src/pages/Checkout.tsx', content);
console.log('Checkout updated');
