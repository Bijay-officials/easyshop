import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser, lang } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      let redirect = searchParams.get('redirect');
      if (user.role !== 'admin' && redirect?.startsWith('/admin')) {
        redirect = '/';
      }
      if (!redirect || redirect === '/login' || redirect === '/register') {
        redirect = user.role === 'admin' ? '/admin' : '/';
      }
      navigate(redirect, { replace: true });
    }
  }, [user, navigate, searchParams]);

  const handleLogin = async (e: import('react').FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      setUser(data);
      // Let the useEffect handle the redirect to avoid race conditions
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
          <LogIn className="w-6 h-6 text-[#2563EB]" />
        </div>
        <h1 className="text-[18px] font-extrabold text-gray-900">{lang === 'ja' ? 'おかえりなさい' : 'Welcome Back'}</h1>
        <p className="text-[12px] text-[#6B7280] mt-1">{lang === 'ja' ? 'アカウントにサインインしてください' : 'Please sign in to your account'}</p>
      </div>

      {error && <div className="p-2.5 bg-red-50 text-red-600 rounded-md mb-4 text-xs font-bold border border-red-100">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-3">
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
        <div>
          <label className="block text-[11px] font-bold text-[#4B5563] uppercase tracking-wider mb-1">{lang === 'ja' ? 'パスワード' : 'Password'}</label>
          <input
            type="password"
            required
            className="w-full border border-[#D1D5DB] bg-[#F9FAFB] rounded-md px-3 py-2 text-sm focus:border-[#2563EB] outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="text-right">
          <Link to="/forgot-password" className="text-[11px] text-[#2563EB] font-bold hover:underline">
            {lang === 'ja' ? 'パスワードをお忘れですか？' : 'Forgot password?'}
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2563EB] text-white py-2.5 rounded-md text-xs font-bold mt-2 hover:bg-blue-700 transition-colors disabled:opacity-70 border-none"
        >
          {loading ? (lang === 'ja' ? 'サインイン中...' : 'Signing in...') : (lang === 'ja' ? 'サインイン' : 'Sign In')}
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-[#6B7280] font-semibold">
        {lang === 'ja' ? 'アカウントをお持ちでないですか？' : 'Don\'t have an account?'} <Link to={`/register${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`} className="text-green-600 hover:text-green-700 font-bold transition-colors">{lang === 'ja' ? 'こちらから登録' : 'Register here'}</Link>
      </div>
      
      
    </div>
  );
}
