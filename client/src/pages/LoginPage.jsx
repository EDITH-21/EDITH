import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('shivam@edith.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(
        loginSuccess({
          user: {
            id: 'user_123',
            name: 'Shivam',
            email,
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          },
          token: 'demo_jwt_token_edith',
        })
      );
      toast.success('Access Granted. Welcome back to EDITH!');
      navigate('/dashboard');
    }, 600);
  };

  const handleSocialLogin = (provider) => {
    toast.success(`${provider} Auth initialized (Demo Mode)`);
    dispatch(
      loginSuccess({
        user: {
          id: 'user_123',
          name: 'Shivam',
          email: `shivam@${provider.toLowerCase()}.com`,
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        token: 'demo_jwt_token_social',
      })
    );
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Log in to continue your journey with <span className="text-crimson-500 font-semibold">EDITH</span>
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
              className="w-full pl-10 pr-4 py-3 bg-surface-card border border-crimson-950 focus:border-crimson-600 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-3 bg-surface-card border border-crimson-950 focus:border-crimson-600 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-crimson-600 focus:ring-crimson-600"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => toast.success('Password reset link dispatched to your email!')}
            className="text-crimson-400 hover:text-crimson-300 text-[11px]"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button matching screenshot 4 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-crimson-800 via-crimson-600 to-crimson-900 hover:from-crimson-700 hover:to-crimson-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-crimson-glow flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? (
            <span>Authenticating...</span>
          ) : (
            <>
              <span>LOG IN</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Social Logins */}
      <div className="space-y-3 pt-2">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-[#0e0e14] px-3 text-[10px] uppercase font-mono tracking-widest text-slate-500 absolute">
            OR CONTINUE WITH
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-card hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition-all"
          >
            <FaGoogle className="w-3.5 h-3.5 text-red-500" />
            <span>Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin('GitHub')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-card hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition-all"
          >
            <FaGithub className="w-3.5 h-3.5 text-white" />
            <span>GitHub</span>
          </button>
        </div>
      </div>

      {/* Register Link */}
      <p className="text-center text-xs text-slate-400 pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-crimson-400 hover:text-crimson-300 font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
