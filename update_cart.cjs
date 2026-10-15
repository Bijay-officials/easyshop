const fs = require('fs');
let content = fs.readFileSync('src/pages/Cart.tsx', 'utf-8');

// Empty cart
content = content.replace(
  /<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] p-10 text-center mt-4">/,
  '<div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center mt-8 animate-fade-in">'
);
content = content.replace(
  /<Link to="\/" className="inline-flex bg-\[#2563EB\] text-white px-6 py-2 rounded-md text-xs font-bold border-none transition-colors">/,
  '<Link to="/" className="inline-flex bg-green-600 text-white px-8 py-3 rounded-xl text-sm font-bold border-none hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">'
);
content = content.replace(
  /<h2 className="text-\[18px\] font-bold text-gray-900 mb-2">/g,
  '<h2 className="text-2xl font-extrabold text-gray-900 mb-2">'
);

// Cart main
content = content.replace(
  /<button \n        onClick=\{\(\) => navigate\(-1\)\} \n        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-\[#4B5563\] hover:text-\[#111827\] transition-colors"\n      >/g,
  `<button 
        onClick={() => navigate(-1)} 
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-green-600 transition-colors bg-gray-50 hover:bg-green-50 px-4 py-2 rounded-full"
      >`
);

// Heading
content = content.replace(
  /<h1 className="text-\[20px\] font-extrabold text-gray-900 mb-4 flex items-center gap-2">/,
  '<h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">'
);
content = content.replace(
  /<ShoppingCart className="w-5 h-5 text-\[#2563EB\]" \/>/g,
  '<ShoppingCart className="w-6 h-6 text-green-600" />'
);

// Container
content = content.replace(
  /<div className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] overflow-hidden mb-4">/,
  '<div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8 animate-slide-up">'
);
content = content.replace(
  /<div className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] p-6 flex flex-col md:flex-row justify-between items-center gap-4">/g,
  '<div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 animate-slide-up">'
);


// Category badge
content = content.replace(
  /className="bg-\[#DBEAFE\] text-\[#1E40AF\] text-\[9px\] px-1.5 py-0.5 rounded-full font-bold uppercase"/g,
  'className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"'
);

// Price / Link
content = content.replace(
  /className="font-bold text-\[14px\] text-gray-900 hover:text-\[#2563EB\] transition-colors"/g,
  'className="font-bold text-base text-gray-900 hover:text-green-600 transition-colors"'
);
content = content.replace(
  /className="text-\[#2563EB\] font-extrabold text-\[14px\] mt-0.5"/g,
  'className="text-gray-900 font-extrabold text-lg mt-1"'
);

// Input
content = content.replace(
  /className="w-16 border border-\[#D1D5DB\] bg-\[#F9FAFB\] rounded-md p-1.5 text-sm text-center focus:border-\[#2563EB\] outline-none"/g,
  'className="w-16 md:w-20 border border-gray-200 bg-gray-50 rounded-lg p-2 text-sm font-medium text-center focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"'
);

// Delete button
content = content.replace(
  /className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"/g,
  'className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors ml-2"'
);

// Total price
content = content.replace(
  /className="text-gray-500 font-bold text-sm"/g,
  'className="text-gray-500 font-bold text-base"'
);
content = content.replace(
  /className="text-\[24px\] font-extrabold text-\[#2563EB\] leading-none"/g,
  'className="text-3xl font-extrabold text-green-600 leading-none"'
);

// Checkout link
content = content.replace(
  /<Link to="\/checkout" className="w-full md:w-auto bg-\[#2563EB\] text-white px-8 py-3 rounded-md text-sm font-bold border-none transition-colors hover:bg-blue-700 text-center flex items-center justify-center gap-2">/g,
  '<Link to="/checkout" className="w-full md:w-auto bg-green-600 text-white px-10 py-3.5 rounded-xl text-base font-bold border-none transition-all duration-300 hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">'
);

fs.writeFileSync('src/pages/Cart.tsx', content);
console.log('Cart updated');
