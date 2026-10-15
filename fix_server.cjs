const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf-8');

// Update POST /api/products
content = content.replace(
  /app.post\("\/api\/products", async \(req, res\) => \{[\s\S]*?res.status\(201\).json\(newProduct\);\n\}\);/,
  `app.post("/api/products", async (req, res) => {
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
});`
);

// Update PUT /api/products/:id
content = content.replace(
  /app.put\("\/api\/products\/:id", async \(req, res\) => \{[\s\S]*?res.status\(404\).json\(\{ error: "Product not found" \}\);\n  \}\n\}\);/,
  `app.put("/api/products/:id", async (req, res) => {
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
});`
);

fs.writeFileSync('server.ts', content);
console.log('Fixed server.ts');
