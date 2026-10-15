const fs = require('fs');
let content = fs.readFileSync('src/pages/Cart.tsx', 'utf-8');

content = content.replace(
  /<div className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] p-5 flex flex-col sm:flex-row justify-between items-center gap-4">/,
  '<div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 animate-slide-up">'
);

content = content.replace(
  /<span className="font-extrabold text-\[22px\] text-gray-900">/,
  '<span className="font-extrabold text-3xl text-gray-900">'
);

content = content.replace(
  /className="w-full sm:w-auto bg-\[#2563EB\] text-white px-6 py-2.5 rounded-md text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors border-none"/g,
  'className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-xl text-base font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none"'
);

fs.writeFileSync('src/pages/Cart.tsx', content);
console.log('Cart bottom updated');
