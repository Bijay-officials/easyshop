import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser, lang } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {    if (user) {      let redirect = searchParams.get('redirect');      if (user.role !== 'admin' && redirect?.startsWith('/admin')) {        redirect = '/';      }      if (!redirect || redirect === '/login' || redirect === '/register') {        redirect = user.role === 'admin' ? '/admin' : '/';      }      navigate(redirect, { replace: true });    }  }, [user, navigate, searchParams]);

  const handleRegister = async (e: import('react').FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(lang === 'ja' ? 'パスワードが一致しません' : 'Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-sm border border-[#E5E7EB] mt-10">
      <div className="text-center mb-6">
        <h1 className="text-lg font-semibold text-[#111827]">{lang === 'ja' ? 'アカウント作成' : 'Create Account'}</h1>
        <p className="text-sm text-[#4B5563] mt-1">{lang === 'ja' ? 'AgriShopに登録しましょう' : 'Join AgriShop today'}</p>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-md mb-6 text-sm">{error}</div>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? '氏名' : 'Full Name'}</label>
          <input
            type="text"
            required
            className="w-full h-8 border border-[#D1D5DB] rounded px-3 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? 'メールアドレス' : 'Email'}</label>
          <input
            type="email"
            required
            className="w-full h-8 border border-[#D1D5DB] rounded px-3 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? 'パスワード' : 'Password'}</label>
          <input
            type="password"
            required
            className="w-full h-8 border border-[#D1D5DB] rounded px-3 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#4B5563] mb-1">{lang === 'ja' ? 'パスワード(確認)' : 'Confirm Password'}</label>
          <input
            type="password"
            required
            className="w-full h-8 border border-[#D1D5DB] rounded px-3 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-8 bg-[#2563EB] text-white text-sm font-medium rounded hover:bg-[#1D4ED8] transition-colors disabled:opacity-70 mt-2"
        >
          {loading ? (lang === 'ja' ? 'アカウント作成中...' : 'Creating account...') : (lang === 'ja' ? '登録する' : 'Sign Up')}
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-[#4B5563]">
        {lang === 'ja' ? 'すでにアカウントをお持ちですか？' : 'Already have an account?'} <Link to="/login" className="text-[#2563EB] hover:underline font-medium">{lang === 'ja' ? 'サインイン' : 'Sign in'}</Link>
      </div>
    </div>
  );
}
