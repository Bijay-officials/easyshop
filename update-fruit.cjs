const fs = require('fs');

// 1. Update product
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf-8'));
const bananaIndex = products.findIndex(p => p.id === 'prod_banana');
if (bananaIndex !== -1) {
  products[bananaIndex] = {
    ...products[bananaIndex],
    id: "prod_cut_fruit",
    name: "新鮮カットフルーツ盛り合わせ",
    description: "旬のフルーツを贅沢にカットして盛り合わせました。そのまま食べられるのでデザートに最適です。（通常2000円のところ1500円）",
    price: 1500,
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&q=80"
  };
} else {
  products.unshift({
    id: "prod_cut_fruit",
    name: "新鮮カットフルーツ盛り合わせ",
    description: "旬のフルーツを贅沢にカットして盛り合わせました。そのまま食べられるのでデザートに最適です。（通常2000円のところ1500円）",
    price: 1500,
    stock: 200,
    category: "cat_1",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&q=80",
    createdAt: new Date().toISOString()
  });
}
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));

// 2. Update fake order
const orders = JSON.parse(fs.readFileSync('data/orders.json', 'utf-8'));
const fakeOrderIndex = orders.findIndex(o => o.id === 'ord_fake_banana');
if (fakeOrderIndex !== -1) {
  orders[fakeOrderIndex].items[0] = {
    productId: "prod_cut_fruit",
    name: "新鮮カットフルーツ盛り合わせ",
    price: 1500,
    quantity: 1000
  };
} else {
  orders.push({
    id: "ord_fake_fruit",
    userId: "admin",
    paymentMethod: "credit-card",
    items: [
      {
        productId: "prod_cut_fruit",
        name: "新鮮カットフルーツ盛り合わせ",
        price: 1500,
        quantity: 1000
      }
    ],
    total: 1500000,
    status: "completed",
    createdAt: new Date().toISOString()
  });
}
fs.writeFileSync('data/orders.json', JSON.stringify(orders, null, 2));

console.log('Fruit updated!');
