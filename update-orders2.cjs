const fs = require('fs');

let dashboard = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

const lines = dashboard.split('\n');
const startIndex = lines.findIndex(l => l.includes('function OrdersAdmin() {'));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes('export default function AdminDashboard() {'));

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { lang } = useAppContext();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/orders').then(res => res.json()).then(data => {
       data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
       setOrders(data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#111827] mb-4">{lang === 'ja' ? '最近の注文' : 'Recent Orders'}</h2>
      <div className="bg-white rounded-md shadow-sm border border-[#E5E7EB] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '注文ID' : 'Order ID'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '日付' : 'Date'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '商品' : 'Products'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '合計' : 'Total'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? 'ステータス' : 'Status'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] text-sm">
            {orders.map(o => (
              <React.Fragment key={o.id}>
                <tr className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setExpandedOrderId(expandedOrderId === o.id ? null : o.id)}>
                  <td className="px-4 py-3 font-mono text-xs text-[#6B7280]">{o.id}</td>
                  <td className="px-4 py-3 text-[#4B5563]">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-[#4B5563]">
                    {o.items && o.items.length > 0 ? o.items.map(i => i.name).join(', ') : '-'}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#111827]">¥{o.total.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-xs rounded-full capitalize">{o.status}</span></td>
                </tr>
                {expandedOrderId === o.id && (
                  <tr className="bg-gray-50/50">
                    <td colSpan={5} className="px-4 py-4 border-t border-gray-100">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-700 mb-2">{lang === 'ja' ? '注文詳細' : 'Order Details'}</div>
                        <ul className="space-y-2">
                          {o.items && o.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center bg-white p-2 border border-gray-200 rounded">
                              <span className="font-medium text-gray-800">{item.name}</span>
                              <span className="text-gray-500 text-xs">¥{item.price.toLocaleString()} × {item.quantity} = <span className="font-medium text-gray-800">¥{(item.price * item.quantity).toLocaleString()}</span></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;
  
  lines.splice(startIndex, endIndex - startIndex, replacement);
  fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', lines.join('\n'));
  console.log('OrdersAdmin replaced successfully');
} else {
  console.log('Failed to find start/end bounds');
}
