const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// 1. Update updateOrderStatus
const oldUpdate = `      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }`;
const newUpdate = `      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        window.dispatchEvent(new Event('orderStatusChanged'));
      }`;
content = content.replace(oldUpdate, newUpdate);

// 2. Update AdminDashboard component definition
const oldAdminDef = `export default function AdminDashboard() {
  const { user, lang } = useAppContext();
  const location = useLocation();

  if (!user || user.role !== 'admin') {`;

const newAdminDef = `export default function AdminDashboard() {
  const { user, lang } = useAppContext();
  const location = useLocation();
  const [hasPendingOrders, setHasPendingOrders] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      const checkPending = () => {
        fetch('/api/orders').then(res => res.json()).then(data => {
          setHasPendingOrders(data.some((o: any) => o.status === 'pending'));
        }).catch(() => {});
      };
      checkPending();
      window.addEventListener('orderStatusChanged', checkPending);
      return () => window.removeEventListener('orderStatusChanged', checkPending);
    }
  }, [user]);

  if (!user || user.role !== 'admin') {`;

content = content.replace(oldAdminDef, newAdminDef);

// 3. Update Link for orders
const oldLink = `<Link to="/admin/orders" className={\`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors \${location.pathname === '/admin/orders' ? 'bg-[#EFF6FF] text-[#1D4ED8] font-medium' : 'text-[#4B5563] hover:bg-[#F9FAFB]'}\`}>
              <ShoppingCart className="w-4 h-4" /> {lang === 'ja' ? '注文管理' : 'Orders'}
            </Link>`;

const newLink = `<Link to="/admin/orders" className={\`flex items-center justify-between px-3 py-2 rounded text-sm transition-colors \${location.pathname === '/admin/orders' ? 'bg-[#EFF6FF] text-[#1D4ED8] font-medium' : 'text-[#4B5563] hover:bg-[#F9FAFB]'}\`}>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" /> {lang === 'ja' ? '注文管理' : 'Orders'}
              </div>
              {hasPendingOrders && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
            </Link>`;
content = content.replace(oldLink, newLink);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
console.log('AdminDashboard orders link updated');
