const fs = require('fs');
let history = fs.readFileSync('src/pages/OrderHistory.tsx', 'utf-8');

const idElement = `<div className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB] shadow-sm">ID: {order.id}</div>`;
const updatedElement = `<div className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB] shadow-sm">ID: {order.id}</div>
                  <div className={\`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider \${
                    order.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }\`}>
                    {order.status === 'completed' 
                      ? (lang === 'ja' ? '完了' : 'Completed')
                      : order.status === 'pending'
                      ? (lang === 'ja' ? '未確認' : 'Pending')
                      : order.status}
                  </div>`;

history = history.replace(idElement, updatedElement);

fs.writeFileSync('src/pages/OrderHistory.tsx', history);
console.log('OrderHistory updated');
