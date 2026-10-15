import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { lang } = useAppContext();
  const navigate = useNavigate();

  const handleVerifyEmail = async (e: import('react').FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: import('react').FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }
      setMessage(data.message || (lang === 'ja' ? 'パスワードをリセットしました。' : 'Password reset successfully.'));
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] mx-auto bg-white p-6 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-[#E5E7EB] mt-10">
      <div className="text-center mb-6">
        <div className="inline-flex bg-[#EBF5FF] p-2.5 rounded-full mb-3 border border-[#DBEAFE]">
          <KeyRound className="w-6 h-6 text-[#2563EB]" />
        </div>
        <h1 className="text-[18px] font-extrabold text-gray-900">{lang === 'ja' ? 'パスワードの再設定' : 'Reset Password'}</h1>
        <p className="text-[12px] text-[#6B7280] mt-1">
          {step === 1 
            ? (lang === 'ja' ? '登録したメールアドレスを入力してください。' : 'Enter your registered email address.')
            : (lang === 'ja' ? '新しいパスワードを入力してください。' : 'Enter your new password.')}
        </p>
      </div>

      {error && <div className="p-2.5 bg-red-50 text-red-600 rounded-md mb-4 text-xs font-bold border border-red-100">{error}</div>}
      {message && <div className="p-2.5 bg-green-50 text-green-700 rounded-md mb-4 text-xs font-bold border border-green-100 whitespace-pre-wrap">{message}</div>}

      {step === 1 ? (
        <form onSubmit={handleVerifyEmail} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-[#4B5563] uppercase tracking-wider mb-1">{lang === 'ja' ? 'メールアドレス' : 'Email'}</label>
            <input
              type="email"
              required
              className="w-full border border-[#D1D5DB] bg-[#F9FAFB] rounded-md px-3 py-2 text-sm focus:border-[#2563EB] outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-2.5 rounded-md text-xs font-bold mt-2 hover:bg-blue-700 transition-colors disabled:opacity-70 border-none"
          >
            {loading ? (lang === 'ja' ? '確認中...' : 'Verifying...') : (lang === 'ja' ? '次へ' : 'Next')}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-[#4B5563] uppercase tracking-wider mb-1">{lang === 'ja' ? '新しいパスワード' : 'New Password'}</label>
            <input
              type="password"
              required
              minLength={5}
              className="w-full border border-[#D1D5DB] bg-[#F9FAFB] rounded-md px-3 py-2 text-sm focus:border-[#2563EB] outline-none transition-colors"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-2.5 rounded-md text-xs font-bold mt-2 hover:bg-blue-700 transition-colors disabled:opacity-70 border-none"
          >
            {loading ? (lang === 'ja' ? '再設定中...' : 'Resetting...') : (lang === 'ja' ? 'パスワードを再設定する' : 'Reset Password')}
          </button>
        </form>
      )}

      <div className="mt-4 text-center text-xs text-[#6B7280] font-semibold">
        <Link to="/login" className="text-green-600 hover:text-green-700 font-bold transition-colors">{lang === 'ja' ? 'ログインに戻る' : 'Back to Login'}</Link>
      </div>
    </div>
  );
}
