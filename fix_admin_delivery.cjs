const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// 1. Add updateDelivery API call function
const updateDeliveryStr = `
  const updateDelivery = async (orderId: string, deliveryStatus: string, estimatedDeliveryDate?: string) => {
    try {
      const res = await fetch(\`/api/orders/\${orderId}/delivery\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus, estimatedDeliveryDate })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, deliveryStatus, estimatedDeliveryDate: estimatedDeliveryDate !== undefined ? estimatedDeliveryDate : o.estimatedDeliveryDate } : o));
      }
    } catch (err) {
      console.error(err);
    }
  };
`;

content = content.replace(
  /const updateOrderStatus = async \(orderId: string, newStatus: string\) => \{/,
  match => updateDeliveryStr + match
);

// 2. Add UI inside the expanded order details in Admin Dashboard
const expandedUIStr = `
                        {o.shippingAddress && (
                          <div className="bg-white p-3 border border-gray-200 rounded mb-4">
                            <div className="font-medium text-gray-800 mb-1">{lang === 'ja' ? '配送先情報' : 'Shipping Information'}</div>
                            <div className="text-gray-600 text-xs space-y-1">
                              <div>{lang === 'ja' ? '名前' : 'Name'}: {o.shippingAddress.name}</div>
                              <div>{lang === 'ja' ? '郵便番号' : 'Zip'}: {o.shippingAddress.zip}</div>
                              <div>{lang === 'ja' ? '住所' : 'Address'}: {o.shippingAddress.address}</div>
                              <div>{lang === 'ja' ? '電話番号' : 'Phone'}: {o.shippingAddress.phone}</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-white p-3 border border-gray-200 rounded mb-4">
                          <div className="font-medium text-gray-800 mb-2">{lang === 'ja' ? '配送状況更新' : 'Update Delivery Status'}</div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <select 
                              value={o.deliveryStatus || 'Order Received'}
                              onChange={(e) => updateDelivery(o.id, e.target.value)}
                              className="px-2 py-1.5 text-xs rounded border border-gray-300 outline-none"
                            >
                              <option value="Order Received">{lang === 'ja' ? '注文受付' : 'Order Received'}</option>
                              <option value="Preparing Shipment">{lang === 'ja' ? '出荷準備中' : 'Preparing Shipment'}</option>
                              <option value="Shipped">{lang === 'ja' ? '発送済み' : 'Shipped'}</option>
                              <option value="Out for Delivery">{lang === 'ja' ? '配達中' : 'Out for Delivery'}</option>
                              <option value="Delivered">{lang === 'ja' ? '配達完了' : 'Delivered'}</option>
                            </select>
                            <input 
                              type="date"
                              value={o.estimatedDeliveryDate || ''}
                              onChange={(e) => updateDelivery(o.id, o.deliveryStatus || 'Order Received', e.target.value)}
                              className="px-2 py-1.5 text-xs rounded border border-gray-300 outline-none"
                            />
                          </div>
                        </div>
`;

content = content.replace(
  /\{o\.shippingAddress && \([\s\S]*?<\/div>\s*\)\s*\}/,
  expandedUIStr
);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
console.log('Added UI to Admin Dashboard');
