const fs = require('fs');
let dashboard = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

const updateStatusFunc = `
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(\`/api/orders/\${orderId}/status\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter(o => {
`;

dashboard = dashboard.replace("const filteredOrders = orders.filter(o => {", updateStatusFunc);

const statusColumn = `<td className="px-4 py-3"><span className="px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-xs rounded-full capitalize">{o.status}</span></td>`;
const newStatusColumn = `<td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className={\`px-2 py-1 text-xs rounded-full border outline-none font-medium \${
                        o.status === 'completed' 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : o.status === 'pending'
                          ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }\`}
                    >
                      <option value="pending">{lang === 'ja' ? '未確認' : 'Pending'}</option>
                      <option value="completed">{lang === 'ja' ? '完了' : 'Completed'}</option>
                    </select>
                  </td>`;

dashboard = dashboard.replace(statusColumn, newStatusColumn);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', dashboard);
console.log('OrdersAdmin status update added');
