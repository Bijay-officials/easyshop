const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// Dashboard Overview styling
content = content.replace(
  /className="bg-white p-4 rounded-md shadow-sm border border-\[#E5E7EB\] flex items-center gap-4"/g,
  'className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 animate-slide-up"'
);
content = content.replace(
  /className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"/g,
  'className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600"'
);
content = content.replace(
  /className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"/g,
  'className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"'
);
content = content.replace(
  /className="text-\[#6B7280\] text-xs font-medium"/g,
  'className="text-gray-500 text-sm font-semibold"'
);
content = content.replace(
  /className="text-xl font-bold text-\[#111827\]"/g,
  'className="text-3xl font-extrabold text-gray-900"'
);

// Chart area
content = content.replace(
  /className="bg-white p-4 rounded-md shadow-sm border border-\[#E5E7EB\]"/g,
  'className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 animate-slide-up"'
);

// Tables & Lists Containers
content = content.replace(
  /className="bg-white rounded-md shadow-sm border border-\[#E5E7EB\] overflow-hidden overflow-x-auto"/g,
  'className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto animate-slide-up"'
);
content = content.replace(
  /className="bg-\[#F9FAFB\] border-b border-\[#E5E7EB\] text-\[#4B5563\] text-xs uppercase tracking-wider"/g,
  'className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider"'
);

// Buttons
content = content.replace(
  /className="bg-\[#2563EB\] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-\[#1D4ED8\]"/g,
  'className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"'
);
content = content.replace(
  /className="text-\[#2563EB\] hover:text-blue-700"/g,
  'className="text-gray-600 hover:text-green-600 transition-colors"'
);
content = content.replace(
  /className="text-red-500 hover:text-red-700"/g,
  'className="text-gray-600 hover:text-red-600 transition-colors"'
);
content = content.replace(
  /className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"/g,
  'className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm"'
);
content = content.replace(
  /className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"/g,
  'className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors"'
);

// Navigation menu
content = content.replace(
  /className="bg-white rounded-md shadow-sm border border-\[#E5E7EB\] p-4 sticky top-24"/g,
  'className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24"'
);
content = content.replace(
  /className="font-semibold text-\[#111827\] mb-3 text-sm"/g,
  'className="font-extrabold text-gray-900 mb-4 text-base tracking-tight"'
);
content = content.replace(
  /className=\{`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors \$\{location\.pathname === '\/admin' \? 'bg-\[#EFF6FF\] text-\[#1D4ED8\] font-medium' : 'text-\[#4B5563\] hover:bg-\[#F9FAFB\]'\}`\}/g,
  "className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname === '/admin' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}"
);
content = content.replace(
  /className=\{`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors \$\{location\.pathname\.startsWith\('\/admin\/products'\) \? 'bg-\[#EFF6FF\] text-\[#1D4ED8\] font-medium' : 'text-\[#4B5563\] hover:bg-\[#F9FAFB\]'\}`\}/g,
  "className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname.startsWith('/admin/products') ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}"
);
content = content.replace(
  /className=\{`flex items-center justify-between px-3 py-2 rounded text-sm transition-colors \$\{location\.pathname === '\/admin\/orders' \? 'bg-\[#EFF6FF\] text-\[#1D4ED8\] font-medium' : 'text-\[#4B5563\] hover:bg-\[#F9FAFB\]'\}`\}/g,
  "className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname === '/admin/orders' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}"
);

// Order List admin table
content = content.replace(
  /className="px-2 py-1 text-xs rounded-full border outline-none font-medium/g,
  'className="px-3 py-1.5 text-xs rounded-full border outline-none font-bold transition-colors cursor-pointer'
);

// Add product form
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

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
console.log('AdminDashboard updated');
