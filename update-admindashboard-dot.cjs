const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

const oldTr = `<tr className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setExpandedOrderId(expandedOrderId === o.id ? null : o.id)}>
                  <td className="px-4 py-3 font-mono text-xs text-[#6B7280]">{o.id}</td>`;

const newTr = `<tr className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setExpandedOrderId(expandedOrderId === o.id ? null : o.id)}>
                  <td className="px-4 py-3 font-mono text-xs text-[#6B7280] relative">
                    {o.status === 'pending' && (
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    )}
                    <span className={o.status === 'pending' ? 'pl-2' : ''}>{o.id}</span>
                  </td>`;

content = content.replace(oldTr, newTr);
fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
console.log('AdminDashboard updated');
