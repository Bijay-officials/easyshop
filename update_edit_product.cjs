const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/EditProductAdmin.tsx', 'utf-8');

content = content.replace(
  /className="max-w-xl bg-white p-6 rounded-md shadow-sm border border-\[#E5E7EB\]"/g,
  'className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 animate-slide-up"'
);
content = content.replace(
  /className="w-full h-8 border border-\[#D1D5DB\] rounded px-3 text-sm outline-none focus:border-\[#2563EB\] focus:ring-1 focus:ring-\[#2563EB\]"/g,
  'className="w-full h-11 border border-gray-200 bg-gray-50 rounded-xl px-4 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"'
);
content = content.replace(
  /className="w-full border border-\[#D1D5DB\] rounded px-3 py-2 text-sm outline-none focus:border-\[#2563EB\] focus:ring-1 focus:ring-\[#2563EB\]"/g,
  'className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"'
);
content = content.replace(
  /className="px-4 py-2 bg-\[#2563EB\] text-white rounded text-sm font-medium hover:bg-blue-700"/g,
  'className="px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all duration-300 shadow-md border-none"'
);
content = content.replace(
  /className="w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/g,
  'className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-colors"'
);
content = content.replace(
  /className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"/g,
  'className="rounded text-green-600 focus:ring-green-500"'
);

fs.writeFileSync('src/pages/admin/EditProductAdmin.tsx', content);
console.log('EditProductAdmin updated');
