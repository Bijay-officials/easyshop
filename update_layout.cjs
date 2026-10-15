const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Replace imports to add Leaf
content = content.replace("import { ShoppingCart, User, LogOut, Shield, ChevronDown } from 'lucide-react';", "import { ShoppingCart, User, LogOut, Shield, ChevronDown, Leaf } from 'lucide-react';");

// Replace header classes
content = content.replace(
  '<header className="h-[64px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 sm:px-6 flex-shrink-0 sticky top-0 z-50 shadow-sm">',
  '<header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 flex-shrink-0 sticky top-0 z-50 shadow-sm transition-all duration-300">'
);

// Replace logo SVG with modern Leaf + Text
const oldLogo = `<svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Bag Handle */}
              <path d="M45 40 V 30 C 45 20, 75 20, 75 30 V 40" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" fill="none" />
              
              {/* Shopping Bag Body */}
              <path d="M30 40 H 90 L 95 95 C 95 100, 90 105, 85 105 H 35 C 30 105, 25 100, 25 95 L 30 40 Z" fill="url(#bagGrad)" />
              
              {/* White cutout for the swoosh to give 3D effect */}
              <path d="M15 75 Q 60 95 95 45" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" fill="none" />
              
              {/* Swoosh */}
              <path d="M20 75 Q 60 95 95 45" stroke="url(#swooshGrad)" strokeWidth="10" strokeLinecap="round" fill="none" />
              
              {/* Orange Arrow (part of swoosh) */}
              <polygon points="85,45 105,35 100,55" fill="#F97316" />
              <polygon points="93,47 105,35 100,55" fill="#F97316" />
              
              <defs>
                <linearGradient id="bagGrad" x1="60" y1="40" x2="60" y2="105" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id="swooshGrad" x1="20" y1="75" x2="95" y2="45" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex flex-col">
              <span className="text-[20px] font-extrabold tracking-tight hidden sm:inline leading-none">AgriShop</span>
              <span className="text-[9px] text-[#2563EB] font-bold hidden sm:inline tracking-wider mt-0.5">{lang === 'ja' ? '産地直送で笑顔をお届け' : 'Farm Fresh Joy'}</span>
            </div>`;

const newLogo = `<div className="flex items-center justify-center bg-green-600 text-white p-2 md:p-2.5 rounded-xl shadow-md">
              <Leaf className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight hidden sm:inline leading-none text-gray-900">AgriShop</span>
              <span className="text-[10px] text-green-600 font-bold hidden sm:inline tracking-wider mt-0.5 uppercase">{lang === 'ja' ? '産地直送で笑顔をお届け' : 'Farm Fresh Joy'}</span>
            </div>`;

content = content.replace(oldLogo, newLogo);

// Replace nav links to make them more elegant (using flex, padding, hover styles)
content = content.replace(
  /className={`text-\[13px\] font-bold transition-colors py-5 border-b-2 whitespace-nowrap \${isActive\('\/'\) \? 'text-\[#2563EB\] border-\[#2563EB\]' : 'text-gray-600 border-transparent hover:text-\[#2563EB\]'}`}/g,
  "className={`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap ${isActive('/') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}"
);

content = content.replace(
  /className={`text-\[13px\] font-bold transition-colors py-5 border-b-2 whitespace-nowrap \${isActive\('\/ranking'\) \? 'text-\[#2563EB\] border-\[#2563EB\]' : 'text-gray-600 border-transparent hover:text-\[#2563EB\]'}`}/g,
  "className={`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap ${isActive('/ranking') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}"
);

content = content.replace(
  /className={`text-\[13px\] font-bold transition-colors py-5 border-b-2 whitespace-nowrap \${isActive\('\/recommended'\) \? 'text-\[#2563EB\] border-\[#2563EB\]' : 'text-gray-600 border-transparent hover:text-\[#2563EB\]'}`}/g,
  "className={`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap ${isActive('/recommended') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}"
);

content = content.replace(
  /className={`text-\[13px\] font-bold transition-colors py-5 border-b-2 whitespace-nowrap \${isActive\('\/orders'\) \? 'text-\[#2563EB\] border-\[#2563EB\]' : 'text-gray-600 border-transparent hover:text-\[#2563EB\]'}`}/g,
  "className={`text-sm font-bold transition-all duration-300 py-5 border-b-2 whitespace-nowrap ${isActive('/orders') ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}"
);

// Menu buttons
content = content.replace(
  /className={`text-\[13px\] font-bold transition-colors flex items-center gap-1 py-5 border-b-2 \${isMenuOpen \? 'text-\[#2563EB\] border-\[#2563EB\]' : 'text-gray-600 border-transparent hover:text-\[#2563EB\]'}`}/g,
  "className={`text-sm font-bold transition-all duration-300 flex items-center gap-1.5 py-5 border-b-2 ${isMenuOpen ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent hover:text-green-600 hover:border-green-200'}`}"
);

// Hover states inside menu
content = content.replace(/hover:bg-blue-50 hover:text-\[#2563EB\]/g, "hover:bg-green-50 hover:text-green-700");

// Cart icon hover
content = content.replace(/hover:text-\[#2563EB\]/g, "hover:text-green-600");

// Main section background
content = content.replace(
  /<div className="min-h-screen bg-\[#F3F4F6\] text-\[#1F2937\] flex flex-col overflow-x-hidden font-sans">/,
  '<div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col overflow-x-hidden font-sans">'
);

// Footer styling
content = content.replace(
  /<footer className="h-\[48px\] bg-\[#1F2937\] text-white flex items-center justify-between px-6 text-xs flex-shrink-0 mt-auto">/g,
  '<footer className="py-6 md:py-8 bg-white border-t border-gray-200 text-gray-500 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 text-sm flex-shrink-0 mt-auto">'
);

content = content.replace(
  /<div className="flex gap-6 text-gray-300">/,
  '<div className="flex gap-6 mt-4 sm:mt-0 font-medium">'
);

content = content.replace(
  /<span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-\[#10B981\]"><\/span> \{lang === 'ja' \? 'システム正常' : 'System Normal'\}<\/span>/,
  "<span className=\"flex items-center gap-2\"><span className=\"relative flex h-2.5 w-2.5\"><span className=\"animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75\"></span><span className=\"relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500\"></span></span> {lang === 'ja' ? 'システム正常' : 'System Normal'}</span>"
);

// Update select language input
content = content.replace(
  /className="bg-transparent border-none text-xs font-semibold text-gray-600 focus:outline-none cursor-pointer hover:text-\[#2563EB\] transition-colors"/g,
  'className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-gray-600 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 cursor-pointer hover:bg-gray-100 transition-all"'
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('Layout updated successfully.');
