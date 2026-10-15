const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf-8');
content = content.replace(
  /export interface Order \{[\s\S]*?\n\}/,
  `export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress?: {
    name: string;
    zip: string;
    address: string;
    phone: string;
  };
  createdAt: string;
  deliveryStatus?: 'Order Received' | 'Preparing Shipment' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDeliveryDate?: string;
}`
);
fs.writeFileSync('src/types.ts', content);
