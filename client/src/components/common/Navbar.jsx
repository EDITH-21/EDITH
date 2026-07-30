import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { Search, Bell, Calendar as CalendarIcon, Menu, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = ({ onOpenMobileSidebar, onOpenSearchModal, onOpenNotifications }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 bg-[#0a0a0d]/90 backdrop-blur-md border-b border-crimson-900/20">
      {/* Mobile Toggle & Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-400 hover:text-white lg:hidden rounded-lg bg-surface-card border border-crimson-900/30"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <button
          onClick={onOpenSearchModal}
          className="hidden md:flex items-center gap-3 px-4 py-2 text-xs text-slate-400 bg-surface-card hover:bg-surface-card/80 border border-crimson-950 hover:border-crimson-800/60 rounded-xl w-64 lg:w-80 transition-all shadow-inner"
        >
          <Search className="w-4 h-4 text-crimson-500" />
          <span className="flex-1 text-left">Search anything...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 rounded border border-slate-700">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Header Indicators & Actions */}
      <div className="flex items-center gap-3 lg:gap-5">
        {/* Futuristic Date & Clock Display matching screenshot */}
        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-surface-card border border-crimson-950/80 shadow-inner">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CalendarIcon className="w-3.5 h-3.5 text-crimson-500" />
            <span>{currentDate || 'Wednesday, 28 May 2025'}</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-xs font-mono font-bold text-crimson-500 tracking-wider">
            {currentTime || '07:45 PM'}
          </span>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-300 hover:text-white bg-surface-card hover:bg-crimson-950/40 border border-crimson-900/30 rounded-xl transition-all"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-crimson-600 text-[9px] font-bold text-white shadow-[0_0_8px_rgba(220,38,38,0.8)]">
            3
          </span>
        </button>

        {/* Profile Avatar Badge */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 pl-2.5 bg-surface-card border border-crimson-900/40 hover:border-crimson-600 rounded-xl transition-all"
          >
            <span className="hidden md:inline text-xs font-semibold text-slate-200">
              {user?.name || 'Shivam'}
            </span>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt="User Avatar"
              className="w-7 h-7 rounded-lg object-cover ring-2 ring-crimson-600/50"
            />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#121218] border border-crimson-900/50 rounded-xl shadow-glass-card py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-crimson-900/20">
                <p className="text-xs font-bold text-white">{user?.name || 'Shivam'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email || 'shivam@edith.ai'}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/profile');
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-crimson-950/40"
              >
                <UserIcon className="w-3.5 h-3.5 text-crimson-400" />
                Profile Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-xs text-crimson-400 hover:bg-crimson-950/60"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
