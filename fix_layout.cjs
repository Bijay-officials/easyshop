const fs = require('fs');

let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Replace lines 82 to 122
content = content.replace(
  /<div className="relative h-full flex items-center" ref=\{menuRef\}>[\s\S]*?<\/div>\s*<Link to="\/cart"/m,
  `<div className="h-full flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-gray-500 py-5">
                  <User className="w-4 h-4" />
                  <span>{lang === 'ja' ? \`ようこそ、\${user.name}さん\` : \`Welcome, \${user.name}\`}</span>
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1.5 py-5 border-b-2 border-transparent hover:border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{lang === 'ja' ? 'ログアウト' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1.5 py-5 border-b-2 border-transparent hover:border-green-200"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === 'ja' ? 'ログイン / 登録' : 'Login / Register'}</span>
              </Link>
            )}
          </div>
          
          <Link to="/cart"`
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('Updated Layout');
