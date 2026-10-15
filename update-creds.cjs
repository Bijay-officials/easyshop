const fs = require('fs');
let serverContent = fs.readFileSync('server.ts', 'utf-8');
serverContent = serverContent.replace(/admin@agrishop\.com/g, 'officialsbijay@gmial.com');
serverContent = serverContent.replace(/password === 'admin'/g, "password === 'admin11'");
fs.writeFileSync('server.ts', serverContent);
console.log('server.ts updated');

let loginContent = fs.readFileSync('src/pages/Login.tsx', 'utf-8');
loginContent = loginContent.replace(/<div className="mt-6 p-3 bg-\[#F9FAFB\] rounded-md border border-\[#E5E7EB\] text-\[11px\] text-\[#6B7280\]">([\s\S]*?)<\/div>/, '');
fs.writeFileSync('src/pages/Login.tsx', loginContent);
console.log('Login.tsx updated');
