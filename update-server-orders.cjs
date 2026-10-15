const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf-8');

// Replace status: 'completed' with 'pending'
server = server.replace(/status: 'completed',/, "status: 'pending',");

const putEndpoint = `
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
`;

if (!server.includes('app.put("/api/orders/:id/status"')) {
  server = server.replace('// Reviews', putEndpoint + '\n// Reviews');
}

fs.writeFileSync('server.ts', server);
console.log('Server orders updated');
