import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/slices/authSlice';
import {
  User,
  Mail,
  Shield,
  Key,
  Camera,
  Trash2,
  Save,
  MessageSquare,
  Send,
  Bell,
  CheckCircle2,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import toast from 'react-hot-toast';

const avatarPresets = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
];

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: tasks } = useSelector((state) => state.tasks);
  const { summary } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || 'User');
  const [email, setEmail] = useState(user?.email || 'user@edith.ai');
  const [avatar, setAvatar] = useState(
    user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  );

  // WhatsApp Settings state
  const [whatsappNumber, setWhatsappNumber] = useState(user?.whatsappNumber || '+91 9876543210');
  const [whatsappEnabled, setWhatsappEnabled] = useState(user?.whatsappEnabled ?? true);
  const [whatsappTaskAlerts, setWhatsappTaskAlerts] = useState(user?.whatsappTaskAlerts ?? true);
  const [whatsappExpenseAlerts, setWhatsappExpenseAlerts] = useState(user?.whatsappExpenseAlerts ?? true);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Handle Photo / DP File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      dispatch(updateUserProfile({ avatar: reader.result }));
      toast.success('Display Picture updated successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        name,
        email,
        avatar,
        whatsappNumber,
        whatsappEnabled,
        whatsappTaskAlerts,
        whatsappExpenseAlerts,
      })
    );
    toast.success('Profile details & WhatsApp settings saved!');
  };

  const handleSendTestWhatsappUpdate = () => {
    if (!whatsappNumber) {
      toast.error('Please enter a valid WhatsApp phone number!');
      return;
    }

    const cleanNum = whatsappNumber.replace(/[^0-9]/g, '');
    const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;
    const msg = `🤖 *EDITH AI Productivity Update*\n\nHello ${name}!\n\n📋 *Tasks Pending:* ${pendingTasks}\n💰 *Expenses Logged:* ₹${(summary.totalExpenses || 0).toLocaleString()}\n📊 *Budget Left:* ₹${Math.max(0, (summary.budget || 0) - (summary.totalExpenses || 0)).toLocaleString()}\n\n_Sent from your EDITH AI Hub._`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanNum}&text=${encodedMsg}`;

    window.open(waUrl, '_blank');
    toast.success('Opening WhatsApp to send your live update!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    toast.success('Security settings updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
          User Profile, DP & WhatsApp Integration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize your photo (DP), contact details, and WhatsApp instant updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left DP Photo & Presets Card (4 cols) */}
        <div className="md:col-span-4 p-6 rounded-2xl glass-panel flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <img
              src={avatar}
              alt="Profile Display Picture"
              className="w-28 h-28 rounded-2xl object-cover ring-4 ring-crimson-600/40 shadow-crimson-glow"
            />
            <label className="absolute bottom-2 right-2 p-2 rounded-xl bg-crimson-600 text-white cursor-pointer hover:bg-crimson-500 shadow-md transition-all">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-white">{name}</h3>
            <p className="text-xs text-slate-400">{email}</p>
            <span className="inline-block px-2.5 py-0.5 mt-2 rounded bg-crimson-950 text-crimson-400 border border-crimson-800 text-[10px] font-mono uppercase font-bold">
              ROLE: {user?.role || 'USER'}
            </span>
          </div>

          {/* Quick Avatar Presets Selector */}
          <div className="w-full pt-3 border-t border-crimson-950">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Choose Avatar Preset
            </span>
            <div className="flex items-center justify-center gap-2">
              {avatarPresets.map((preset, idx) => (
                <img
                  key={idx}
                  src={preset}
                  alt={`Avatar Preset ${idx + 1}`}
                  onClick={() => {
                    setAvatar(preset);
                    dispatch(updateUserProfile({ avatar: preset }));
                    toast.success('Avatar selected!');
                  }}
                  className={`w-8 h-8 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform ${
                    avatar === preset ? 'ring-2 ring-crimson-500' : 'opacity-70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Details, WhatsApp Integration & Security (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          {/* Profile Details Form */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-display font-bold text-sm text-white tracking-wide flex items-center gap-2">
              <User className="w-4 h-4 text-crimson-500" />
              PERSONAL INFORMATION
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-crimson-800 to-crimson-600 text-white text-xs font-bold rounded-xl shadow-crimson-glow flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Info</span>
              </button>
            </form>
          </div>

          {/* WhatsApp Updates & Notifications Section */}
          <div className="p-6 rounded-2xl glass-panel-gold space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-emerald-400 tracking-wide flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-emerald-400" />
                WHATSAPP UPDATES & NOTIFICATIONS
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Receive daily task reminders, over-budget warnings, and productivity summaries directly on WhatsApp!
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">WhatsApp Phone Number</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full pl-9 pr-3 py-2 bg-surface-card border border-emerald-950 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>

                  <button
                    onClick={handleSendTestWhatsappUpdate}
                    className="px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test Update</span>
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-surface-card border border-emerald-950/60 cursor-pointer">
                  <span className="text-xs font-semibold text-slate-200">Daily Task & Schedule Reminders</span>
                  <input
                    type="checkbox"
                    checked={whatsappTaskAlerts}
                    onChange={(e) => setWhatsappTaskAlerts(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-surface-card border border-emerald-950/60 cursor-pointer">
                  <span className="text-xs font-semibold text-slate-200">Expense & Over-Budget Alerts</span>
                  <input
                    type="checkbox"
                    checked={whatsappExpenseAlerts}
                    onChange={(e) => setWhatsappExpenseAlerts(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Security & Password */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-display font-bold text-sm text-white tracking-wide flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold-400" />
              SECURITY & PASSWORD
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-surface-card border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 text-xs font-bold rounded-xl"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
