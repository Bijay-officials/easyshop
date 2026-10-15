const fs = require('fs');

// 1. Add Banana to products
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf-8'));
const banana = {
  id: "prod_banana",
  name: "フィリピン産 完熟バナナ (特売)",
  description: "甘くて美味しい完熟バナナ。期間限定の特売価格でお届けします。毎日の朝食にぴったり！",
  price: 98,
  stock: 200,
  category: "cat_1",
  imageUrl: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=500&q=80",
  createdAt: new Date().toISOString()
};
products.unshift(banana);
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));

// 2. Add fake order to boost ranking
const orders = JSON.parse(fs.readFileSync('data/orders.json', 'utf-8'));
orders.push({
  id: "ord_fake_banana",
  userId: "admin",
  paymentMethod: "credit-card",
  items: [
    {
      productId: "prod_banana",
      name: "フィリピン産 完熟バナナ (特売)",
      price: 98,
      quantity: 1000 // Ensure it's #1 in ranking
    }
  ],
  total: 98000,
  status: "completed",
  createdAt: new Date().toISOString()
});
fs.writeFileSync('data/orders.json', JSON.stringify(orders, null, 2));

console.log('Banana added and boosted!');
