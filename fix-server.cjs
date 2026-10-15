const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf-8');

// The messed up lines are:
//   const { userId,
//     paymentMethod: req.body.paymentMethod || "credit-card", productId } = req.body;
// and
// const newFav = { id: 'fav_' + Date.now(), userId,
//     paymentMethod: req.body.paymentMethod || "credit-card", productId };

content = content.replace(
  /const \{ userId,\s*paymentMethod: req\.body\.paymentMethod \|\| "credit-card", productId \} = req\.body;/,
  `const { userId, productId } = req.body;`
);

content = content.replace(
  /const newFav = \{ id: 'fav_' \+ Date\.now\(\), userId,\s*paymentMethod: req\.body\.paymentMethod \|\| "credit-card", productId \};/,
  `const newFav = { id: 'fav_' + Date.now(), userId, productId };`
);

fs.writeFileSync('server.ts', content);
