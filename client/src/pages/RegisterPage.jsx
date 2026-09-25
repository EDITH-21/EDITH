import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { clearAllTasks } from '../redux/slices/taskSlice';
import { clearAllExpenses } from '../redux/slices/expenseSlice';
import { clearAllSavings } from '../redux/slices/savingSlice';
import toast from 'react-hot-toast';
import { User, Mail, Lock, ArrowRight, Check, X } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Password validation criteria
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password && password === confirmPassword;

  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isPasswordValid) {
      toast.error('Password does not meet security requirements');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('edith_users') || '[]');
      if (existingUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        setLoading(false);
        toast.error('An account with this email already exists. Please log in.');
        return;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      };

      existingUsers.push(newUser);
      localStorage.setItem('edith_users', JSON.stringify(existingUsers));

      // Clear all prefilled sample data so new user starts with a completely clean slate
      dispatch(clearAllTasks());
      dispatch(clearAllExpenses());
      dispatch(clearAllSavings());
      localStorage.removeItem('edith_tasks');
      localStorage.removeItem('edith_expenses');
      localStorage.removeItem('edith_savings');

      dispatch(
        loginSuccess({
          user: newUser,
          token: `jwt_${Date.now()}`,
        })
      );

      setLoading(false);
      toast.success('Account created! Welcome to EDITH.');
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

      // Clear all dummy data for new user login
      dispatch(clearAllTasks());
      dispatch(clearAllExpenses());
      dispatch(clearAllSavings());
      localStorage.removeItem('edith_tasks');
      localStorage.removeItem('edith_expenses');
      localStorage.removeItem('edith_savings');

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold text-2xl text-white tracking-tight">Create Account</h2>
        <p className="text-xs text-slate-400 mt-1">
          Sign up to get started with your personal Todo & Expense Manager.
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
          OR REGISTER WITH EMAIL
        </span>
      </div>

      <form onSubmit={handleRegister} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Smith"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-600 transition-all"
            />
          </div>
        </div>

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
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-600 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                confirmPassword
                  ? passwordsMatch
                    ? 'border-emerald-600'
                    : 'border-rose-600'
                  : 'border-slate-800 focus:border-indigo-600'
              }`}
            />
          </div>
        </div>

        {/* Password Strength Requirements Checklist */}
        {password && (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-[11px]">
            <p className="font-semibold text-slate-400">Password requirements:</p>
            <div className="grid grid-cols-2 gap-1 text-slate-400">
              <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-400 font-semibold' : ''}`}>
                {hasMinLength ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-600" />}
                8+ characters
              </span>
              <span className={`flex items-center gap-1 ${hasUpper ? 'text-emerald-400 font-semibold' : ''}`}>
                {hasUpper ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-600" />}
                1 Uppercase (A-Z)
              </span>
              <span className={`flex items-center gap-1 ${hasLower ? 'text-emerald-400 font-semibold' : ''}`}>
                {hasLower ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-600" />}
                1 Lowercase (a-z)
              </span>
              <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-400 font-semibold' : ''}`}>
                {hasNumber ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-600" />}
                1 Number (0-9)
              </span>
              <span className={`flex items-center gap-1 ${hasSpecial ? 'text-emerald-400 font-semibold' : ''}`}>
                {hasSpecial ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-600" />}
                1 Special (!@#$)
              </span>
              <span className={`flex items-center gap-1 ${passwordsMatch ? 'text-emerald-400 font-semibold' : ''}`}>
                {passwordsMatch ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-600" />}
                Passwords match
              </span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
