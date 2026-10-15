const fs = require('fs');

let dashboard = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

const targetRegex = /<ul className="space-y-2">\s*\{o\.items && o\.items\.map\(\(item, idx\) => \(\s*<li key=\{idx\} className="flex justify-between items-center bg-white p-2 border border-gray-200 rounded">\s*<span className="font-medium text-gray-800">\{item\.name\}<\/span>\s*<span className="text-gray-500 text-xs">¥\{item\.price\.toLocaleString\(\)\} × \{item\.quantity\} = <span className="font-medium text-gray-800">¥\{\(item\.price \* item\.quantity\)\.toLocaleString\(\)\}<\/span><\/span>\s*<\/li>\s*\)\)\}\s*<\/ul>/;

const replacement = `<ul className="space-y-2 mb-6">
                          {o.items && o.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center bg-white p-2 border border-gray-200 rounded">
                              <span className="font-medium text-gray-800">{item.name}</span>
                              <span className="text-gray-500 text-xs">¥{item.price.toLocaleString()} × {item.quantity} = <span className="font-medium text-gray-800">¥{(item.price * item.quantity).toLocaleString()}</span></span>
                            </li>
                          ))}
                        </ul>
                        
                        {orders.filter(order => order.userId === o.userId && order.id !== o.id).length > 0 && (
                          <>
                            <div className="font-semibold text-gray-700 mb-2 mt-4">{lang === 'ja' ? 'このユーザーの過去の購入履歴' : 'User Past Purchase History'}</div>
                            <ul className="space-y-2">
                              {orders.filter(order => order.userId === o.userId && order.id !== o.id).map((pastOrder, idx) => (
                                <li key={idx} className="flex flex-col bg-white p-2 border border-gray-200 rounded">
                                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>{new Date(pastOrder.createdAt).toLocaleDateString()}</span>
                                    <span>ID: {pastOrder.id}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-800">{pastOrder.items?.map(i => i.name).join(', ') || '-'}</span>
                                    <span className="font-medium text-gray-800 text-sm">¥{pastOrder.total.toLocaleString()}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}`;

dashboard = dashboard.replace(targetRegex, replacement);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', dashboard);
console.log('Added order history');
