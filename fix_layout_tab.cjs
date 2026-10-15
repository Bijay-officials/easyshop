const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

content = content.replace(
  /\{lang === 'ja' \? '注文履歴' : 'Orders'\}/,
  "{lang === 'ja' ? '注文履歴 / 配送状況確認' : 'Orders / Tracking'}"
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('Fixed Layout tab text');
