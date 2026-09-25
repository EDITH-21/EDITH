import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter your email and password');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Validate against registered accounts in localStorage
      const users = JSON.parse(localStorage.getItem('edith_users') || '[]');
      const matchedUser = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

      if (matchedUser && matchedUser.password && matchedUser.password !== password) {
        setLoading(false);
        toast.error('Incorrect password. Please try again.');
        return;
      }

      const activeUser = matchedUser || {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email: email.trim().toLowerCase(),
      };

      dispatch(
        loginSuccess({
          user: activeUser,
          token: `jwt_${Date.now()}`,
        })
      );

      setLoading(false);
      toast.success(`Welcome back, ${activeUser.name}!`);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold text-2xl text-white tracking-tight">Welcome Back</h2>
        <p className="text-xs text-slate-400 mt-1">
          Log in to manage your daily todos and personal expenses.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-600 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
            Password *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-600 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <span>Logging in...</span>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
