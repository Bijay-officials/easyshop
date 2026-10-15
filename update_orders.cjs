const fs = require('fs');
let content = fs.readFileSync('src/pages/OrderHistory.tsx', 'utf-8');

// Title
content = content.replace(
  /<h1 className="text-\[20px\] font-extrabold text-gray-900 mb-4">/g,
  '<h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">'
);

// Empty state
content = content.replace(
  /<div className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] p-10 text-center">/g,
  '<div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center animate-fade-in">'
);
content = content.replace(
  /<h2 className="text-\[16px\] font-bold text-gray-900 mb-1">/g,
  '<h2 className="text-xl font-bold text-gray-900 mb-2">'
);
content = content.replace(
  /<Package className="w-12 h-12 mx-auto text-\[#D1D5DB\] mb-3" \/>/g,
  '<Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />'
);

// Orders List Container
content = content.replace(
  /<div className="space-y-4">/g,
  '<div className="space-y-6 animate-slide-up">'
);

// Order Item
content = content.replace(
  /className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] overflow-hidden"/g,
  'className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"'
);

// Order Header
content = content.replace(
  /className="p-4 bg-\[#F9FAFB\] border-b border-\[#E5E7EB\] flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 transition-colors"/g,
  'className="p-5 md:p-6 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"'
);
content = content.replace(
  /className="flex items-center gap-4 text-xs font-semibold text-\[#6B7280\]"/g,
  'className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold text-gray-500"'
);
content = content.replace(
  /className="font-mono bg-white px-1.5 py-0.5 rounded border border-\[#E5E7EB\] shadow-sm"/g,
  'className="font-mono bg-white px-2 py-1 rounded-md border border-gray-200 shadow-sm"'
);
content = content.replace(
  /className="font-extrabold text-\[16px\] text-gray-900"/g,
  'className="font-extrabold text-lg text-gray-900"'
);
content = content.replace(
  /className="px-2 py-0.5 rounded-full text-\[10px\] font-bold uppercase tracking-wider bg-green-100 text-green-700"/g,
  'className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-800"'
);


// Order Body
content = content.replace(
  /className="p-4 divide-y divide-\[#E5E7EB\]"/g,
  'className="p-5 md:p-6 divide-y divide-gray-100"'
);
content = content.replace(
  /className="py-3 flex justify-between items-center first:pt-0 last:pb-0"/g,
  'className="py-4 flex justify-between items-center first:pt-0 last:pb-0"'
);
content = content.replace(
  /className="font-bold text-\[13px\] text-gray-900 hover:text-\[#2563EB\] transition-colors"/g,
  'className="font-bold text-sm md:text-base text-gray-900 hover:text-green-600 transition-colors"'
);
content = content.replace(
  /className="text-\[11px\] font-semibold text-\[#6B7280\] mt-0.5"/g,
  'className="text-xs md:text-sm font-semibold text-gray-500 mt-1"'
);
content = content.replace(
  /className="font-extrabold text-\[13px\] text-gray-900 text-right"/g,
  'className="font-extrabold text-sm md:text-base text-gray-900 text-right"'
);

// Order Footer (Shipping & Billing)
content = content.replace(
  /className="p-4 bg-\[#F9FAFB\] border-t border-\[#E5E7EB\] flex flex-col md:flex-row gap-6 md:gap-12"/g,
  'className="p-5 md:p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row gap-6 sm:gap-12"'
);
content = content.replace(
  /className="text-\[11px\] font-bold text-\[#4B5563\] uppercase tracking-wider mb-2 flex items-center gap-1.5"/g,
  'className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2"'
);
content = content.replace(
  /className="text-xs text-gray-900 space-y-1 font-medium"/g,
  'className="text-sm text-gray-700 space-y-1.5 font-medium"'
);

fs.writeFileSync('src/pages/OrderHistory.tsx', content);
console.log('OrderHistory updated');
