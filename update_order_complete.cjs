const fs = require('fs');

let content = fs.readFileSync('src/pages/OrderComplete.tsx', 'utf-8');

// Update main container
content = content.replace(
  /className="max-w-\[500px\] mx-auto bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0\.1\)\] border border-\[#E5E7EB\] p-10 text-center mt-10"/,
  'className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center mt-8 animate-fade-in"'
);

// Update icon container
content = content.replace(
  /className="inline-flex items-center justify-center w-16 h-16 bg-\[#ECFDF5\] rounded-full mb-4 border border-\[#D1FAE5\]"/,
  'className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6 border border-green-100"'
);

// Update icon
content = content.replace(
  /className="w-8 h-8 text-\[#10B981\]"/,
  'className="w-10 h-10 text-green-500"'
);

// Update heading
content = content.replace(
  /className="text-\[20px\] font-extrabold text-gray-900 mb-2"/,
  'className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3"'
);

// Update description
content = content.replace(
  /className="text-\[13px\] text-\[#4B5563\] mb-2"/,
  'className="text-base text-gray-600 mb-4"'
);

// Update order ID text
content = content.replace(
  /className="text-\[12px\] text-\[#6B7280\] mb-6"/,
  'className="text-sm text-gray-500 mb-8 flex items-center justify-center gap-2"'
);

// Update order ID span
content = content.replace(
  /className="font-mono font-bold text-gray-800 bg-\[#F9FAFB\] border border-\[#E5E7EB\] px-2 py-0\.5 rounded"/,
  'className="font-mono font-bold text-gray-900 bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg"'
);

// Update buttons container
content = content.replace(
  /className="flex justify-center gap-3"/,
  'className="flex flex-col sm:flex-row justify-center gap-4"'
);

// Update secondary button
content = content.replace(
  /className="bg-white text-\[#4B5563\] border border-\[#D1D5DB\] px-4 py-2 rounded-md text-xs font-bold hover:bg-gray-50 transition-colors"/,
  'className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto text-center"'
);

// Update primary button
content = content.replace(
  /className="bg-\[#2563EB\] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-blue-700 transition-colors border-none"/,
  'className="bg-green-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none w-full sm:w-auto text-center"'
);

fs.writeFileSync('src/pages/OrderComplete.tsx', content);
console.log('OrderComplete styled');
