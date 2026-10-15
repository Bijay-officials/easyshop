const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf-8');

server = server.replace(
  /if \(sort === 'ranking'\) \{/,
  `if (req.query.recommended === 'true') {
    filtered = filtered.filter((p: any) => p.isRecommended);
  }

  if (sort === 'ranking') {`
);

fs.writeFileSync('server.ts', server);
console.log('Server updated');
