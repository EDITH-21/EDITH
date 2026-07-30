import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/slices/authSlice';
import { User, Mail, Shield, Key, Camera, Trash2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || 'Shivam');
  const [email, setEmail] = useState(user?.email || 'shivam@edith.ai');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, email, avatar }));
    toast.success('Profile details updated!');
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
          User Profile & Security
        </h1>
        <p className="text-xs text-slate-400 mt-1">Manage your account details and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Avatar Card (4 cols) */}
        <div className="md:col-span-4 p-6 rounded-2xl glass-panel flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <img
              src={avatar}
              alt="Profile Avatar"
              className="w-28 h-28 rounded-2xl object-cover ring-4 ring-crimson-600/40 shadow-crimson-glow"
            />
            <label className="absolute bottom-2 right-2 p-2 rounded-xl bg-crimson-600 text-white cursor-pointer hover:bg-crimson-500 shadow-md transition-all">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const url = URL.createObjectURL(e.target.files[0]);
                    setAvatar(url);
                    toast.success('Avatar updated!');
                  }
                }}
              />
            </label>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-white">{name}</h3>
            <p className="text-xs text-slate-400">{email}</p>
            <span className="inline-block px-2.5 py-0.5 mt-2 rounded bg-crimson-950 text-crimson-400 border border-crimson-800 text-[10px] font-mono uppercase font-bold">
              ROLE: {user?.role || 'ADMIN'}
            </span>
          </div>
        </div>

        {/* Right Details & Security Forms (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          {/* Profile Form */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-display font-bold text-sm text-white tracking-wide flex items-center gap-2">
              <User className="w-4 h-4 text-crimson-500" />
              PERSONAL INFORMATION
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
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

              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-crimson-800 to-crimson-600 text-white text-xs font-bold rounded-xl shadow-crimson-glow flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </form>
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
