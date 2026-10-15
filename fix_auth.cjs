const fs = require('fs');

// Fix Login
let loginContent = fs.readFileSync('src/pages/Login.tsx', 'utf-8');
loginContent = loginContent.replace(
  /if \(!redirect \|\| redirect === '\/login'\) \{/,
  "if (user.role !== 'admin' && redirect?.startsWith('/admin')) { redirect = '/'; } if (!redirect || redirect === '/login' || redirect === '/register') {"
);
fs.writeFileSync('src/pages/Login.tsx', loginContent);

// Fix Register
let registerContent = fs.readFileSync('src/pages/Register.tsx', 'utf-8');
if (!registerContent.includes('useEffect')) {
  registerContent = registerContent.replace(/import \{ useState \} from 'react';/, "import { useState, useEffect } from 'react';");
  registerContent = registerContent.replace(
    /const { setUser, lang } = useAppContext\(\);/,
    "const { user, setUser, lang } = useAppContext();"
  );
  registerContent = registerContent.replace(
    /const \[searchParams\] = useSearchParams\(\);/,
    `const [searchParams] = useSearchParams();\n\n  useEffect(() => {    if (user) {      let redirect = searchParams.get('redirect');      if (user.role !== 'admin' && redirect?.startsWith('/admin')) {        redirect = '/';      }      if (!redirect || redirect === '/login' || redirect === '/register') {        redirect = user.role === 'admin' ? '/admin' : '/';      }      navigate(redirect, { replace: true });    }  }, [user, navigate, searchParams]);`
  );
  registerContent = registerContent.replace(
    /setUser\(data\);\s+let redirect = searchParams\.get\('redirect'\);\s+if \(!redirect\) \{\s+redirect = data\.role === 'admin' \? '\/admin' : '\/';\s+\}\s+navigate\(redirect\);/,
    "setUser(data);"
  );
  fs.writeFileSync('src/pages/Register.tsx', registerContent);
}

console.log('Fixed Auth loops');
