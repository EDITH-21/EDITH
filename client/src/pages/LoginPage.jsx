import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');

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

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser = {
        id: `google_${Date.now()}`,
        name: 'Google User',
        email: 'user@gmail.com',
      };

      dispatch(
        loginSuccess({
          user: googleUser,
          token: `google_token_${Date.now()}`,
        })
      );

      setLoading(false);
      toast.success('Signed in with Google!');
      navigate('/dashboard');
    }, 400);
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmResetPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('edith_users') || '[]');
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === resetEmail.trim().toLowerCase());

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('edith_users', JSON.stringify(users));
      toast.success('Password updated successfully! You can now log in.');
    } else {
      toast.success('Password reset instructions processed! Please log in.');
    }

    setIsForgotModalOpen(false);
    setEmail(resetEmail);
    setPassword('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold text-2xl text-white tracking-tight">Welcome Back</h2>
        <p className="text-xs text-slate-400 mt-1">
          Log in to manage your daily todos and personal expenses.
        </p>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2.5 transition-all shadow-sm"
      >
        <FaGoogle className="w-4 h-4 text-red-500" />
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-800 w-full" />
        <span className="bg-slate-900 px-3 text-[10px] uppercase tracking-wider text-slate-500 absolute">
          OR LOGIN WITH EMAIL
        </span>
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
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Password *
            </label>
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setNewPassword('');
                setConfirmResetPassword('');
                setIsForgotModalOpen(true);
              }}
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Forgot Password?
            </button>
          </div>
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

      {/* Forgot Password Modal */}
      <Modal isOpen={isForgotModalOpen} onClose={() => setIsForgotModalOpen(false)} title="Reset Password">
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Account Email Address *
            </label>
            <input
              type="email"
              required
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="youremail@example.com"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              New Password *
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={confirmResetPassword}
              onChange={(e) => setConfirmResetPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Reset Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LoginPage;
