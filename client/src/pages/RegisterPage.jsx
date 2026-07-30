import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(
        loginSuccess({
          user: {
            id: `user_${Date.now()}`,
            name,
            email,
            role: 'user',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          },
          token: 'demo_jwt_token_new_user',
        })
      );
      toast.success('Account created successfully! Welcome to EDITH.');
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
          Create Account
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Join <span className="text-crimson-500 font-semibold">EDITH</span> and unlock ultimate productivity
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Shivam Sharma"
              className="w-full pl-10 pr-4 py-3 bg-surface-card border border-crimson-950 focus:border-crimson-600 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>

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

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full pl-10 pr-4 py-3 bg-surface-card border border-crimson-950 focus:border-crimson-600 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-crimson-800 via-crimson-600 to-crimson-900 hover:from-crimson-700 hover:to-crimson-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-crimson-glow flex items-center justify-center gap-2 transition-all duration-300"
        >
          {loading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-crimson-400 hover:text-crimson-300 font-semibold">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
