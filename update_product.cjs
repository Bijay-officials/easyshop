const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf-8');

// Container
content = content.replace(
  /className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] overflow-hidden flex flex-col md:flex-row"/g,
  'className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row animate-fade-in"'
);

// Back button
content = content.replace(
  /className="self-start text-xs font-semibold text-gray-500 hover:text-\[#2563EB\] flex items-center gap-1 mb-4 transition-colors"/g,
  'className="self-start text-sm font-bold text-gray-500 hover:text-green-600 flex items-center gap-1.5 mb-6 transition-colors bg-gray-50 hover:bg-green-50 px-4 py-2 rounded-full"'
);

// Category badge
content = content.replace(
  /className="bg-\[#DBEAFE\] text-\[#1E40AF\] text-\[10px\] px-2 py-0.5 rounded-full font-bold uppercase"/g,
  'className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"'
);

// Title
content = content.replace(
  /className="text-\[20px\] font-extrabold text-gray-900 mb-2 leading-tight pr-10"/g,
  'className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight pr-12"'
);

// Price
content = content.replace(
  /className="text-\[24px\] font-extrabold text-\[#2563EB\] mb-4"/g,
  'className="text-3xl font-extrabold text-gray-900 mb-6"'
);

// Add to Cart Button
content = content.replace(
  /className=\{`w-full py-2.5 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-colors border-none \$\{product.stock > 0 \? 'bg-\[#2563EB\] text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'\}`\}/g,
  "className={`w-full py-3.5 rounded-xl text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 border-none ${product.stock > 0 ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}"
);

// Reviews & Recommendations containers
content = content.replace(
  /className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] p-6"/g,
  'className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 animate-slide-up"'
);

// Related Products grid items
content = content.replace(
  /className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform h-full block"/g,
  'className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 h-full block group"'
);
content = content.replace(
  /className="h-\[140px\] bg-\[#EBF5FF\] flex items-center justify-center overflow-hidden relative"/g,
  'className="h-[140px] sm:h-[180px] bg-gray-50 flex items-center justify-center overflow-hidden relative group-hover:bg-gray-100 transition-colors"'
);
content = content.replace(
  /className="text-\[14px\] font-bold mb-1 h-\[40px\] overflow-hidden text-gray-900 leading-tight"/g,
  'className="text-base font-bold mb-2 h-[48px] overflow-hidden text-gray-900 leading-snug group-hover:text-green-600 transition-colors"'
);
content = content.replace(
  /className="bg-\[#2563EB\] text-white px-4 py-2 rounded-md text-\[12px\] font-semibold w-full flex items-center justify-center"/g,
  'className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold w-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors"'
);

// Quantity Input
content = content.replace(
  /className="w-16 border border-\[#D1D5DB\] bg-\[#F9FAFB\] rounded-md p-1.5 text-sm text-center focus:border-\[#2563EB\] outline-none"/g,
  'className="w-20 border border-gray-200 bg-gray-50 rounded-lg p-2 text-base font-medium text-center focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"'
);

fs.writeFileSync('src/pages/ProductDetail.tsx', content);
console.log('ProductDetail updated');
