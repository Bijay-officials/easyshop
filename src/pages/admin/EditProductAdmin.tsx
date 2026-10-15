import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

export default function EditProductAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
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
  const [categories, setCategories] = useState<any[]>([]);
  const { lang } = useAppContext();

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(setCategories);
    if (id) {
      fetch(`/api/products/${id}`).then(res => res.json()).then(data => {
        setName(data.name);
        setPrice(data.price.toString());
        setStock(data.stock.toString());
        setDescription(data.description);
        setCategory(data.category);
        setIsRecommended(!!data.isRecommended);
        
        let urls = [];
        if (data.imageUrl) urls.push(data.imageUrl);
        if (data.imageUrls) urls.push(...data.imageUrls);
        setImageUrls(Array.from(new Set(urls)).join(', '));
      });
    }
  }, [id]);

  const handleSubmit = async (e: import('react').FormEvent) => {
    e.preventDefault();
    
    const urlsArray = imageUrls.split(',').map(u => u.trim()).filter(Boolean);
    
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name, 
        price: Number(price), 
        stock: Number(stock), 
        description, 
        category,
        isRecommended,
        imageUrl: imageBase64 || urlsArray[0] || '',
        imageUrls: urlsArray
      })
    });
    navigate('/admin/products');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 animate-slide-up">
      <h2 className="text-lg font-semibold text-[#111827] mb-6">{lang === 'ja' ? '商品情報を編集' : 'Edit Product'}</h2>
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
            <input type="checkbox" checked={isRecommended} onChange={e => setIsRecommended(e.target.checked)} className="rounded text-green-600 focus:ring-green-500" />
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
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '画像URL（カンマ区切りで複数可）' : 'Image URLs (comma separated)'}</label>
          <input type="text" className="w-full h-11 border border-gray-200 bg-gray-50 rounded-xl px-4 text-sm font-medium outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" value={imageUrls} onChange={e => setImageUrls(e.target.value)} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '商品画像 (アップロード)' : 'Product Image (Upload)'}</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-colors" />
          {imageBase64 && <img src={imageBase64} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded shadow-sm border border-gray-200" />}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '商品説明' : 'Description'}</label>
          <textarea required className="w-full border border-[#D1D5DB] rounded p-3 text-sm outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" rows={4} value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" className="bg-[#2563EB] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#1D4ED8] h-8 mt-2">{lang === 'ja' ? '更新を保存' : 'Save Changes'}</button>
      </form>
    </div>
  );
}
