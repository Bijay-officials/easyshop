const fs = require('fs');

const pagesToUpdate = [
  'src/pages/Ranking.tsx',
  'src/pages/Recommended.tsx'
];

for (const file of pagesToUpdate) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Headers
  content = content.replace(
    /className="text-\[20px\] font-extrabold text-gray-900 mb-4 flex items-center gap-2"/g,
    'className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3"'
  );
  content = content.replace(
    /className="w-5 h-5 text-\[#2563EB\]"/g,
    'className="w-6 h-6 text-green-600"'
  );
  
  // Grid layout
  content = content.replace(
    /className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"/g,
    'className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"'
  );
  
  // Product cards
  content = content.replace(
    /className="bg-white rounded-lg shadow-\[0_1px_3px_rgba\(0,0,0,0.1\)\] border border-\[#E5E7EB\] overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform relative block"/g,
    'className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 relative block group animate-fade-in"'
  );
  content = content.replace(
    /className="h-\[140px\] bg-\[#EBF5FF\] flex items-center justify-center overflow-hidden relative"/g,
    'className="h-[160px] sm:h-[180px] bg-gray-50 flex items-center justify-center overflow-hidden relative group-hover:bg-gray-100 transition-colors"'
  );
  
  // Badges
  content = content.replace(
    /className="absolute top-2 left-2 bg-\[#DBEAFE\] text-\[#1E40AF\] text-\[10px\] px-2 py-0.5 rounded-full font-bold uppercase z-10"/g,
    'className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider z-10 shadow-sm"'
  );
  content = content.replace(
    /className="absolute top-2 right-2 w-6 h-6 bg-\[#F59E0B\] text-white rounded-full flex items-center justify-center text-xs font-bold z-10 shadow-sm"/g,
    'className="absolute top-3 right-3 w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center text-sm font-extrabold z-10 shadow-md"'
  );
  content = content.replace(
    /className="absolute top-2 right-2 bg-red-500 text-white text-\[10px\] px-2 py-0.5 rounded-full font-bold z-10"/g,
    'className="absolute top-3 right-3 bg-red-500 text-white text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider z-10 shadow-sm"'
  );
  
  // Card text & buttons
  content = content.replace(
    /className="text-\[14px\] font-bold mb-1 h-\[40px\] overflow-hidden text-gray-900 leading-tight"/g,
    'className="text-base font-bold mb-2 h-[48px] overflow-hidden text-gray-900 leading-snug group-hover:text-green-600 transition-colors"'
  );
  content = content.replace(
    /className="text-\[18px\] font-extrabold text-\[#2563EB\]"/g,
    'className="text-xl font-extrabold text-gray-900"'
  );
  content = content.replace(
    /className="bg-\[#2563EB\] text-white px-4 py-2 rounded-md text-\[12px\] font-semibold w-full flex items-center justify-center gap-1.5"/g,
    'className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold w-full flex items-center justify-center gap-1.5 group-hover:bg-green-600 group-hover:text-white transition-colors"'
  );
  
  fs.writeFileSync(file, content);
}
console.log('Ranking and Recommended updated');
