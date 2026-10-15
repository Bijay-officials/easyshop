import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function OrderComplete() {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const { lang } = useAppContext();

  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center mt-8 animate-fade-in">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6 border border-green-100">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">{lang === 'ja' ? '注文が完了しました！' : 'Order Completed!'}</h1>
      <p className="text-base text-gray-600 mb-4">{lang === 'ja' ? 'ご購入ありがとうございます。' : 'Thank you for your purchase.'}</p>
      <p className="text-sm text-gray-500 mb-8 flex items-center justify-center gap-2">{lang === 'ja' ? '注文ID:' : 'Order ID:'} <span className="font-mono font-bold text-gray-900 bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg">{orderId}</span></p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/orders" className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto text-center">
          {lang === 'ja' ? '注文履歴を見る' : 'View Orders'}
        </Link>
        <Link to="/" className="bg-green-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none w-full sm:w-auto text-center">
          {lang === 'ja' ? '買い物を続ける' : 'Continue Shopping'}
        </Link>
      </div>
    </div>
  );
}
