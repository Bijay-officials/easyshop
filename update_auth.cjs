const fs = require('fs');

const pagesToUpdate = [
  'src/pages/Login.tsx',
  'src/pages/Register.tsx',
  'src/pages/ForgotPassword.tsx'
];

for (const file of pagesToUpdate) {
  let content = fs.readFileSync(file, 'utf-8');
  
  content = content.replace(
    /className="max-w-md mx-auto w-full mt-10 bg-white p-8 rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\]"/g,
    'className="max-w-md mx-auto w-full mt-10 md:mt-20 bg-white p-8 md:p-10 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 animate-slide-up"'
  );
  
  content = content.replace(
    /className="text-center mb-8"/g,
    'className="text-center mb-10"'
  );
  
  content = content.replace(
    /className="w-12 h-12 mx-auto text-\[#2563EB\] mb-2"/g,
    'className="w-16 h-16 mx-auto text-green-600 mb-4"'
  );
  
  content = content.replace(
    /className="text-\[24px\] font-extrabold text-gray-900"/g,
    'className="text-2xl md:text-3xl font-extrabold text-gray-900"'
  );
  
  content = content.replace(
    /className="block text-xs font-bold text-\[#4B5563\] uppercase tracking-wider mb-1.5"/g,
    'className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"'
  );
  
  content = content.replace(
    /className="w-full border border-\[#D1D5DB\] rounded-md px-3 py-2 text-sm focus:border-\[#2563EB\] outline-none"/g,
    'className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"'
  );
  
  content = content.replace(
    /className="w-full bg-\[#2563EB\] text-white py-2.5 rounded-md text-sm font-bold hover:bg-blue-700 transition-colors border-none disabled:opacity-50"/g,
    'className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-base font-bold hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg border-none disabled:opacity-50 mt-4"'
  );
  
  content = content.replace(
    /className="text-\[#2563EB\] hover:underline"/g,
    'className="text-green-600 hover:text-green-700 font-bold transition-colors"'
  );
  
  content = content.replace(
    /className="bg-red-50 text-red-500 p-3 rounded-md text-xs font-semibold mb-4 border border-red-100 text-center"/g,
    'className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 text-center"'
  );
  content = content.replace(
    /className="bg-green-50 text-green-600 p-3 rounded-md text-xs font-semibold mb-4 border border-green-100 text-center"/g,
    'className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-bold mb-6 border border-green-100 text-center"'
  );
  
  fs.writeFileSync(file, content);
}
console.log('Auth pages updated');
