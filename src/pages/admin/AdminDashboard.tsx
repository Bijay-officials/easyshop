import React, { useState, useEffect, useMemo } from 'react';
import { Navigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { LayoutDashboard, Package, ShoppingCart, Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { Product, Order } from '../../types';
import EditProductAdmin from './EditProductAdmin';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function DashboardOverview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const { lang } = useAppContext();

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
    fetch('/api/orders').then(res => res.json()).then(setOrders);
  }, []);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  
  // Calculate sales by date for graph
  const salesByDate = useMemo(() => {
    const data: Record<string, number> = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString();
      data[date] = (data[date] || 0) + order.total;
    });
    return Object.entries(data).map(([date, total]) => ({ date, total })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [orders]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#111827] mb-4">{lang === 'ja' ? 'ダッシュボード概要' : 'Dashboard Overview'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 animate-slide-up">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{lang === 'ja' ? '総商品数' : 'Total Products'}</div>
            <div className="text-3xl font-extrabold text-gray-900">{totalProducts}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 animate-slide-up">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{lang === 'ja' ? '総注文数' : 'Total Orders'}</div>
            <div className="text-3xl font-extrabold text-gray-900">{totalOrders}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 animate-slide-up">
          <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{lang === 'ja' ? '総売上' : 'Total Sales'}</div>
            <div className="text-3xl font-extrabold text-gray-900">¥{totalSales.toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-md shadow-sm border border-[#E5E7EB] mb-6">
        <h3 className="text-md font-semibold text-[#111827] mb-4">{lang === 'ja' ? '売上推移' : 'Sales Trend'}</h3>
        <div className="h-64 w-full">
          {salesByDate.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesByDate}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{fontSize: 12, fill: '#6B7280'}} tickLine={false} axisLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#6B7280'}} tickLine={false} axisLine={false} tickFormatter={(value) => '¥' + value} />
                <Tooltip 
                  formatter={(value) => ['¥' + value, lang === 'ja' ? '売上' : 'Sales']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Line type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={3} dot={{r: 4, fill: '#2563EB', strokeWidth: 0}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">{lang === 'ja' ? 'データがありません' : 'No data available'}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const { lang } = useAppContext();
  
  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  
  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
    setConfirmDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#111827]">{lang === 'ja' ? '商品一覧' : 'Products'}</h2>
        <Link to="new" className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm">{lang === 'ja' ? '商品を追加' : 'Add Product'}</Link>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto animate-slide-up">
        <table className="w-full text-left whitespace-nowrap min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '画像' : 'Image'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '商品名' : 'Name'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '価格' : 'Price'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '在庫' : 'Stock'}</th>
              <th className="px-4 py-3 font-medium">{lang === 'ja' ? '操作' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] text-sm">
            {products.map(p => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-[#111827]">{p.name}</td>
                <td className="px-4 py-3 text-[#4B5563]">
                  <div className="flex flex-col">
                    <span className="font-bold">¥{Math.floor(p.price * 1.1).toLocaleString()} <span className="text-[10px] text-gray-400 font-normal">{lang === 'ja' ? '(税込)' : '(Tax Incl.)'}</span></span>
                    <span className="text-[10px] text-gray-400">{lang === 'ja' ? `税抜 ¥${p.price.toLocaleString()}` : `Tax Excl. ¥${p.price.toLocaleString()}`}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#4B5563]">{p.stock}</td>
                <td className="px-4 py-3 flex gap-2">
                  <Link to={`edit/${p.id}`} className="inline-flex items-center justify-center text-[#2563EB] hover:bg-blue-50 p-1.5 rounded"><Edit className="w-4 h-4"/></Link>
                  {confirmDeleteId === p.id ? (
    <div className="flex items-center gap-2">
      <span className="text-xs text-red-600 font-bold">{lang === 'ja' ? '確認' : 'Confirm'}</span>
      <button onClick={() => handleDelete(p.id)} className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs">Yes</button>
      <button onClick={() => setConfirmDeleteId(null)} className="text-gray-600 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs">No</button>
    </div>
  ) : (
    <button onClick={() => setConfirmDeleteId(p.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><Trash2 className="w-4 h-4"/></button>
  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddProductAdmin() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isRecommended, setIsRecommended] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [category, setCategory] = useState('cat_1');
  const [categories, setCategories] = useState<any[]>([]);
  const { lang } = useAppContext();

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(setCategories);
  }, []);

  const handleSubmit = async (e: import('react').FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price), stock: Number(stock), description, category, isRecommended, imageUrl: imageBase64 || (imageUrls.split(',')[0]?.trim()), imageUrls: imageUrls.split(',').map(u => u.trim()).filter(Boolean) })
    });
    window.location.href = '/admin/products'; // basic redirect
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 animate-slide-up">
      <h2 className="text-lg font-semibold text-[#111827] mb-6">{lang === 'ja' ? '新規商品追加' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '商品名' : 'Name'}</label>
          <input required type="text" className="w-full h-11 border border-gray-200 bg-gray-50 rounded-xl px-4 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '価格 (税抜)' : 'Price (Tax Excl.)'}</label>
            <input required type="number" className="w-full h-11 border border-gray-200 bg-gray-50 rounded-xl px-4 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" value={price} onChange={e => setPrice(e.target.value)} />
            {price && !isNaN(Number(price)) && (
              <div className="mt-1.5 text-[11px] font-bold text-green-600 flex items-center gap-1">
                {lang === 'ja' ? '税込:' : 'Tax Incl.:'} ¥{Math.floor(Number(price) * 1.1).toLocaleString()} <span className="text-gray-400 font-normal">(10%)</span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '在庫' : 'Stock'}</label>
            <input required type="number" className="w-full h-11 border border-gray-200 bg-gray-50 rounded-xl px-4 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" value={stock} onChange={e => setStock(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm text-[#4B5563] mb-4">
            <input type="checkbox" checked={isRecommended} onChange={e => setIsRecommended(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            {lang === 'ja' ? 'おすすめ商品に設定する' : 'Set as Recommended'}
          </label>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? 'カテゴリー' : 'Category'}</label>
          <select className="w-full h-11 border border-gray-200 bg-gray-50 rounded-xl px-4 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '商品画像 (アップロード)' : 'Product Image (Upload)'}</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          {imageBase64 && <img src={imageBase64} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded shadow-sm border border-gray-200" />}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '商品説明' : 'Description'}</label>
          <textarea required className="w-full border border-[#D1D5DB] rounded p-3 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" rows={4} value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" className="bg-[#2563EB] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#1D4ED8] h-8 mt-2">{lang === 'ja' ? '商品を保存' : 'Save Product'}</button>
      </form>
    </div>
  );
}

function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { lang } = useAppContext();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetch('/api/orders').then(res => res.json()).then(data => {
       data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
       setOrders(data);
       
       // Mark orders as viewed
       fetch('/api/orders/mark-viewed', { method: 'POST' }).then(() => {
         window.dispatchEvent(new Event('orderStatusChanged'));
       }).catch(() => {});
    });
  }, []);

  
  
  const updateDelivery = async (orderId: string, deliveryStatus: string, estimatedDeliveryDate?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/delivery`, {
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
const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        window.dispatchEvent(new Event('orderStatusChanged'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter(o => {

    if (!dateFilter) return true;
    const d = new Date(o.createdAt);
    const yyyy = d.getFullYear();
    const m = d.getMonth() + 1;
    const mm = m.toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    
    const searchTargets = [
      `${yyyy}/${m}`,
      `${yyyy}/${mm}`,
      `${yyyy}/${m}/${d.getDate()}`,
      `${yyyy}/${mm}/${dd}`,
      `${yyyy}-${mm}`,
      `${yyyy}-${mm}-${dd}`,
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
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto animate-slide-up">
        <table className="w-full text-left whitespace-nowrap min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
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
            ) : filteredOrders.map(o => (
              <React.Fragment key={o.id}>
                <tr className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setExpandedOrderId(expandedOrderId === o.id ? null : o.id)}>
                  <td className="px-4 py-3 font-mono text-xs text-[#6B7280] relative">
                    {o.status === 'pending' && (
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    )}
                    <span className={o.status === 'pending' ? 'pl-2' : ''}>{o.id}</span>
                  </td>
                  <td className="px-4 py-3 text-[#4B5563]">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-[#4B5563]">
                    {o.items && o.items.length > 0 ? o.items.map(i => i.name).join(', ') : '-'}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#111827]">¥{o.total.toLocaleString()}</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full border outline-none font-medium ${
                        o.status === 'completed' 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : o.status === 'pending'
                          ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <option value="pending">{lang === 'ja' ? '未確認' : 'Pending'}</option>
                      <option value="completed">{lang === 'ja' ? '完了' : 'Completed'}</option>
                    </select>
                  </td>
                </tr>
                {expandedOrderId === o.id && (
                  <tr className="bg-gray-50/50">
                    <td colSpan={5} className="px-4 py-4 border-t border-gray-100">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-700 mb-2">{lang === 'ja' ? '注文詳細' : 'Order Details'}</div>
                        
                        
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

                        
                        <ul className="space-y-2 mb-6">
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
                        )}
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

export default function AdminDashboard() {
  const { user, lang } = useAppContext();
  const location = useLocation();
  const [hasPendingOrders, setHasPendingOrders] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      const checkPending = () => {
        fetch('/api/orders').then(res => res.json()).then(data => {
          setHasPendingOrders(data.some((o: any) => !o.isViewedByAdmin));
        }).catch(() => {});
      };
      checkPending();
      window.addEventListener('orderStatusChanged', checkPending);
      return () => window.removeEventListener('orderStatusChanged', checkPending);
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login?redirect=/admin" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-56 flex-shrink-0">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <h2 className="font-extrabold text-gray-900 mb-4 text-base tracking-tight">{lang === 'ja' ? '管理メニュー' : 'Admin Menu'}</h2>
          <nav className="space-y-1">
            <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname === '/admin' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
              <LayoutDashboard className="w-4 h-4" /> {lang === 'ja' ? 'ダッシュボード' : 'Dashboard'}
            </Link>
            <Link to="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname.startsWith('/admin/products') ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
              <Package className="w-4 h-4" /> {lang === 'ja' ? '商品管理' : 'Products'}
            </Link>
            <Link to="/admin/orders" className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname === '/admin/orders' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" /> {lang === 'ja' ? '注文管理' : 'Orders'}
              </div>
              {hasPendingOrders && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-grow">
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="products/new" element={<AddProductAdmin />} />
          <Route path="products/edit/:id" element={<EditProductAdmin />} />
          <Route path="orders" element={<OrdersAdmin />} />
        </Routes>
      </div>
    </div>
  );
}
