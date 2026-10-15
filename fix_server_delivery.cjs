const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf-8');

// Inject the new PUT route after PUT /api/orders/:id/status
const injection = `
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
`;

content = content.replace(
  /app\.put\("\/api\/orders\/:id\/status", async \(req, res\) => \{[\s\S]*?res\.json\(orders\[orderIndex\]\);\n\}\);/,
  match => match + injection
);

fs.writeFileSync('server.ts', content);
console.log('Added delivery status PUT route to server.ts');
