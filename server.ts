import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

const dataPath = path.join(process.cwd(), 'data');

// Helpers for reading/writing JSON files
async function readData(file: string) {
  try {
    const data = await fs.readFile(path.join(dataPath, file), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeData(file: string, data: any) {
  await fs.writeFile(path.join(dataPath, file), JSON.stringify(data, null, 2), 'utf-8');
}

// Ensure data files exist with initial content if missing
async function initializeDataFiles() {
  const files = ['products.json', 'users.json', 'orders.json', 'categories.json', 'reviews.json', 'coupons.json', 'favorites.json'];
  try {
    await fs.mkdir(dataPath, { recursive: true });
    for (const file of files) {
      try {
        await fs.access(path.join(dataPath, file));
      } catch (e) {
        let initialData: any[] = [];
        if (file === 'categories.json') {
          initialData = [
            { id: 'cat_1', name: '果物' },
            { id: 'cat_2', name: '野菜' }
          ];
        }
        if (file === 'coupons.json') {
          initialData = [
            { id: 'coup_1', code: 'WELCOME10', discountPercent: 10, validUntil: '2099-12-31T23:59:59Z' }
          ];
        }
        await fs.writeFile(path.join(dataPath, file), JSON.stringify(initialData, null, 2), 'utf-8');
      }
    }
  } catch (err) {
    console.error("Error initializing data files:", err);
  }
}

// API Routes

// Products
app.get("/api/products", async (req, res) => {
  const products = await readData("products.json");
  const search = req.query.search as string;
  const category = req.query.category as string;
  const sort = req.query.sort as string;

  let filtered = products;

  if (search) {
    filtered = filtered.filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
  }

  if (category) {
    filtered = filtered.filter((p: any) => p.category === category);
  }

  if (req.query.recommended === 'true') {
    filtered = filtered.filter((p: any) => p.isRecommended);
  }

  if (sort === 'ranking') {
    // We could calculate from orders, but let's just use salesCount (or mock it based on id for now if no real sales)
    const orders = await readData("orders.json");
    const salesMap: Record<string, number> = {};
    orders.forEach((o: any) => {
      o.items.forEach((item: any) => {
        salesMap[item.productId] = (salesMap[item.productId] || 0) + item.quantity;
      });
    });
    filtered.sort((a: any, b: any) => (salesMap[b.id] || 0) - (salesMap[a.id] || 0));
  }

  res.json(filtered);
});

app.get("/api/products/:id", async (req, res) => {
  const products = await readData("products.json");
  const product = products.find((p: any) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/api/products", async (req, res) => {
  const products = await readData("products.json");
  const newProduct = {
    ...req.body,
    id: 'prod_' + Date.now(),
    createdAt: new Date().toISOString()
  };
  if (req.body.isRecommended) {
    newProduct.recommendedAt = new Date().toISOString();
  }
  products.push(newProduct);
  await writeData("products.json", products);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", async (req, res) => {
  const products = await readData("products.json");
  const index = products.findIndex((p: any) => p.id === req.params.id);
  if (index !== -1) {
    const oldProduct = products[index];
    const newProduct = { ...oldProduct, ...req.body };
    if (req.body.isRecommended && !oldProduct.isRecommended) {
      newProduct.recommendedAt = new Date().toISOString();
    }
    products[index] = newProduct;
    await writeData("products.json", products);
    res.json(products[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  let products = await readData("products.json");
  products = products.filter((p: any) => p.id !== req.params.id);
  await writeData("products.json", products);
  res.json({ success: true });
});

// Categories
app.get("/api/categories", async (req, res) => {
  const categories = await readData("categories.json");
  res.json(categories);
});

// Users
app.post("/api/register", async (req, res) => {
  const users = await readData("users.json");
  const { name, email, password } = req.body;
  if (users.find((u: any) => u.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const newUser = {
    id: 'usr_' + Date.now(),
    name,
    email,
    password, // In a real app, hash this!
    role: email === 'officialsbijay@gmail.com' ? 'admin' : 'user', // simple role management
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  await writeData("users.json", users);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

app.post("/api/login", async (req, res) => {
  const users = await readData("users.json");
  const email = (req.body.email || "").trim().toLowerCase();
  const password = req.body.password;

  if (email === 'officialsbijay@gmail.com' && password === 'admin11') {
     return res.json({ id: 'admin', name: 'Admin', email: 'officialsbijay@gmail.com', role: 'admin' });
  }

  const user = users.find((u: any) => u.email.toLowerCase() === email && u.password === password);
  if (user) {
    if (user.email.toLowerCase() === 'officialsbijay@gmail.com') {
      user.role = 'admin';
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/api/verify-email", async (req, res) => {
  const users = await readData("users.json");
  const email = (req.body.email || "").trim().toLowerCase();
  
  const user = users.find((u: any) => u.email.toLowerCase() === email);
  if (user) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "アカウントが見つかりません。" });
  }
});

app.post("/api/reset-password", async (req, res) => {
  const users = await readData("users.json");
  const email = (req.body.email || "").trim().toLowerCase();
  const { newPassword } = req.body;
  
  const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === email);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    await writeData("users.json", users);
    res.json({ message: "パスワードをリセットしました。" });
  } else {
    res.status(404).json({ error: "アカウントが見つかりません。" });
  }
});

// Orders
app.get("/api/orders", async (req, res) => {
  const orders = await readData("orders.json");
  const userId = req.query.userId as string;
  if (userId) {
    res.json(orders.filter((o: any) => o.userId === userId));
  } else {
    res.json(orders);
  }
});

app.post("/api/orders", async (req, res) => {
  const orders = await readData("orders.json");
  const products = await readData("products.json");
  const orderItems = req.body.items;
  const userId = req.body.userId;
  const couponCode = req.body.couponCode;

  // Reduce inventory
  let inventoryError = null;
  const updatedProducts = products.map((p: any) => {
    const item = orderItems.find((i: any) => i.productId === p.id);
    if (item) {
      if (p.stock < item.quantity) {
        inventoryError = `Not enough stock for ${p.name}`;
      }
      return { ...p, stock: p.stock - item.quantity };
    }
    return p;
  });

  if (inventoryError) {
    return res.status(400).json({ error: inventoryError });
  }

  let total = orderItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  
  if (couponCode) {
    const coupons = await readData("coupons.json");
    const coupon = coupons.find((c: any) => c.code === couponCode);
    if (coupon) {
      total = Math.floor(total * (1 - coupon.discountPercent / 100));
    }
  }
  
  const users = await readData("users.json");
  const orderUser = users.find((u: any) => u.id === userId);
  // Default to 'pending' for all new orders
  const status = 'pending';
  
  const newOrder = {
    id: 'ord_' + Date.now(),
    userId,
    paymentMethod: req.body.paymentMethod || "credit-card",
    shippingAddress: req.body.shippingAddress,
    items: orderItems,
    total,
    status,
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  await writeData("orders.json", orders);
  await writeData("products.json", updatedProducts);
  
  res.status(201).json(newOrder);
});

app.post("/api/orders/mark-viewed", async (req, res) => {
  const orders = await readData("orders.json");
  let updated = false;
  orders.forEach((o: any) => {
    if (!o.isViewedByAdmin) {
      o.isViewedByAdmin = true;
      updated = true;
    }
  });
  if (updated) {
    await writeData("orders.json", orders);
  }
  res.json({ success: true });
});

app.put("/api/orders/:id/status", async (req, res) => {
  const orders = await readData("orders.json");
  const orderIndex = orders.findIndex((o: any) => o.id === req.params.id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found" });
  }
  orders[orderIndex].status = req.body.status;
  await writeData("orders.json", orders);
  res.json(orders[orderIndex]);
});
app.put("/api/orders/:id/delivery", async (req, res) => {
  const orders = await readData("orders.json");
  const orderIndex = orders.findIndex((o: any) => o.id === req.params.id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found" });
  }
  orders[orderIndex].deliveryStatus = req.body.deliveryStatus;
  if (req.body.estimatedDeliveryDate !== undefined) {
    orders[orderIndex].estimatedDeliveryDate = req.body.estimatedDeliveryDate;
  }
  await writeData("orders.json", orders);
  res.json(orders[orderIndex]);
});


// Reviews
app.get("/api/reviews", async (req, res) => {
  const reviews = await readData("reviews.json");
  const productId = req.query.productId as string;
  if (productId) {
    res.json(reviews.filter((r: any) => r.productId === productId));
  } else {
    res.json(reviews);
  }
});

app.post("/api/reviews", async (req, res) => {
  const reviews = await readData("reviews.json");
  const newReview = {
    ...req.body,
    id: 'rev_' + Date.now(),
    createdAt: new Date().toISOString()
  };
  reviews.push(newReview);
  await writeData("reviews.json", reviews);
  res.status(201).json(newReview);
});

// Coupons
app.get("/api/coupons/:code", async (req, res) => {
  const coupons = await readData("coupons.json");
  const coupon = coupons.find((c: any) => c.code === req.params.code);
  if (coupon) {
    res.json(coupon);
  } else {
    res.status(404).json({ error: "Coupon not found or invalid" });
  }
});

// Favorites
app.get("/api/favorites", async (req, res) => {
  const favorites = await readData("favorites.json");
  const userId = req.query.userId as string;
  if (userId) {
    res.json(favorites.filter((f: any) => f.userId === userId));
  } else {
    res.status(400).json({ error: "userId required" });
  }
});

app.post("/api/favorites", async (req, res) => {
  const favorites = await readData("favorites.json");
  const { userId, productId } = req.body;
  const existing = favorites.find((f: any) => f.userId === userId && f.productId === productId);
  if (!existing) {
    const newFav = { id: 'fav_' + Date.now(), userId, productId };
    favorites.push(newFav);
    await writeData("favorites.json", favorites);
    res.status(201).json(newFav);
  } else {
    res.json(existing);
  }
});

app.delete("/api/favorites", async (req, res) => {
  let favorites = await readData("favorites.json");
  const userId = req.query.userId as string;
  const productId = req.query.productId as string;
  favorites = favorites.filter((f: any) => !(f.userId === userId && f.productId === productId));
  await writeData("favorites.json", favorites);
  res.json({ success: true });
});

async function startServer() {
  await initializeDataFiles();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
