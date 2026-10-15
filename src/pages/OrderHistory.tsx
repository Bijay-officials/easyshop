import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { Package, Calendar, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';




const stages = [
  { id: 'Order Received', labelEn: 'Order Received', labelJa: '注文受付' },
  { id: 'Preparing Shipment', labelEn: 'Preparing Shipment', labelJa: '出荷準備中' },
  { id: 'Shipped', labelEn: 'Shipped', labelJa: '発送済み' },
  { id: 'Out for Delivery', labelEn: 'Out for Delivery', labelJa: '配達中' },
  { id: 'Delivered', labelEn: 'Delivered', labelJa: '配達完了' }
];

function DeliveryProgress({ status, lang, estimatedDate }: { status: string, lang: string, estimatedDate?: string }) {
  const currentIndex = stages.findIndex(s => s.id === (status || 'Order Received'));
  
  return (
    <div className="p-5 md:p-6 bg-white border-t border-[#E5E7EB]">
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-bold text-gray-900">{lang === 'ja' ? '配送状況' : 'Delivery Status'}</h3>
        {estimatedDate && (
          <div className="text-sm font-semibold text-gray-600">
            {lang === 'ja' ? 'お届け予定日: ' : 'Estimated Delivery: '}
            <span className="text-green-600">{new Date(estimatedDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      
      <div className="relative flex justify-between items-center w-full mt-8 mb-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full z-0 transition-all duration-500"
          style={{ width: `${(Math.max(0, currentIndex) / (stages.length - 1)) * 100}%` }}
        ></div>
        
        {stages.map((stage, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>}
              </div>
              <div 
                className={`absolute top-10 text-[10px] sm:text-xs font-bold whitespace-nowrap text-center ${
                  isCurrent ? 'text-green-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                }`}
              >
                {lang === 'ja' ? stage.labelJa : stage.labelEn}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrderHistory() {
  const { user, lang } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${user.id}`);
        const data = await res.json();
        // Sort descending by date
        data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) return <div className="text-center py-20 text-sm">{lang === 'ja' ? '注文履歴を読み込み中...' : 'Loading orders...'}</div>;

  return (
    <div className="max-w-3xl mx-auto w-full mt-4">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">{lang === 'ja' ? '注文履歴' : 'Order History'}</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center animate-fade-in">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{lang === 'ja' ? 'まだ注文がありません' : 'No orders yet'}</h2>
          <p className="text-sm text-[#6B7280]">{lang === 'ja' ? '注文をすると、ここに表示されます。' : 'When you place orders, they will appear here.'}</p>
        </div>
      ) : (
        <div className="space-y-6 animate-slide-up">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
              <div 
                className="p-5 md:p-6 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
              >
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="font-mono bg-white px-2 py-1 rounded-md border border-gray-200 shadow-sm">ID: {order.id}</div>
                  <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-800">
                    {lang === 'ja' ? '完了' : 'Completed'}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-extrabold text-lg text-gray-900 flex items-baseline gap-1">
                    ¥{order.total.toLocaleString()}
                    <span className="text-[10px] text-gray-500 font-medium">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                  </div>
                  <div className="text-gray-400">
                    {expandedOrderId === order.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>
              
              {expandedOrderId === order.id && (
                <>
                  <div className="p-5 md:p-6 divide-y divide-gray-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center">
                        <div className="font-bold text-[13px] text-gray-900">{item.name}</div>
                        <div className="text-[#6B7280] text-[11px] font-semibold flex items-center gap-1">
                          {lang === 'ja' ? '数量:' : 'Qty:'} {item.quantity} × ¥{item.price.toLocaleString()}
                          <span className="text-[9px]">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <DeliveryProgress 
                    status={order.deliveryStatus || 'Order Received'} 
                    lang={lang} 
                    estimatedDate={order.estimatedDeliveryDate} 
                  />
                  {order.shippingAddress && (

                    <div className="p-4 bg-[#F9FAFB] border-t border-[#E5E7EB] text-xs">
                      <div className="font-bold text-[#4B5563] mb-1">{lang === 'ja' ? 'お届け先住所:' : 'Shipping Address:'}</div>
                      <div className="text-gray-700">
                        <div>{order.shippingAddress.name}</div>
                        <div>〒{order.shippingAddress.zip}</div>
                        <div>{order.shippingAddress.address}</div>
                        <div>{order.shippingAddress.phone}</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
