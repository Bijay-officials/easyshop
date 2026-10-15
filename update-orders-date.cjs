const fs = require('fs');
let dashboard = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

const replacement = `function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { lang } = useAppContext();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetch('/api/orders').then(res => res.json()).then(data => {
       data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
       setOrders(data);
    });
  }, []);

  const filteredOrders = orders.filter(o => {
    if (!dateFilter) return true;
    const d = new Date(o.createdAt);
    const yyyy = d.getFullYear();
    const m = d.getMonth() + 1;
    const mm = m.toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    
    const searchTargets = [
      \`\${yyyy}/\${m}\`,
      \`\${yyyy}/\${mm}\`,
      \`\${yyyy}/\${m}/\${d.getDate()}\`,
      \`\${yyyy}/\${mm}/\${dd}\`,
      \`\${yyyy}-\${mm}\`,
      \`\${yyyy}-\${mm}-\${dd}\`,
      d.toLocaleDateString()
    ];
    
    return searchTargets.some(target => target.includes(dateFilter));
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold text-[#111827]">{lang === 'ja' ? '最近の注文' : 'Recent Orders'}</h2>
        <div>
          <input 
            type="text" 
            placeholder={lang === 'ja' ? '日付で検索 (例: 2026/6)' : 'Filter by date (e.g. 2026/6)'} 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </div>
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
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#6B7280]">
                  {lang === 'ja' ? '注文が見つかりません' : 'No orders found'}
                </td>
              </tr>
            ) : filteredOrders.map(o => (`;

dashboard = dashboard.replace(
  /function OrdersAdmin\(\) \{[\s\S]*?\{orders\.map\(o => \(/,
  replacement
);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', dashboard);
console.log('OrdersAdmin replaced');
