import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, updatePreferences } from '../redux/slices/settingsSlice';
import { clearAllTasks } from '../redux/slices/taskSlice';
import { clearAllExpenses } from '../redux/slices/expenseSlice';
import { exportExpensesToCSV } from '../utils/helpers';
import { User, DollarSign, Download, Trash2, Save, Moon, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { user, currency, theme } = useSelector((state) => state.settings);
  const { items: tasks } = useSelector((state) => state.tasks);
  const { items: expenses } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || 'Alex');
  const [email, setEmail] = useState(user?.email || 'alex@example.com');
  const [selectedCurrency, setSelectedCurrency] = useState(currency || 'INR');
  const [selectedTheme, setSelectedTheme] = useState(theme || 'dark');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email }));
    toast.success('Profile updated successfully!');
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    dispatch(updatePreferences({ currency: selectedCurrency, theme: selectedTheme }));
    toast.success('Preferences saved!');
  };

  const handleExportData = () => {
    const backupData = {
      user: { name, email },
      preferences: { currency: selectedCurrency, theme: selectedTheme },
      tasks,
      expenses,
      exportDate: new Date().toISOString(),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `EDITH_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    toast.success('Data exported as JSON!');
  };

  const handleClearAllData = () => {
    if (
      window.confirm(
        'Are you sure you want to clear all tasks and expenses? This action cannot be undone.'
      )
    ) {
      dispatch(clearAllTasks());
      dispatch(clearAllExpenses());
      localStorage.removeItem('edith_tasks');
      localStorage.removeItem('edith_expenses');
      toast.success('All application data cleared!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-bold text-2xl lg:text-3xl text-white tracking-tight">Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your account profile, preferences, and data.</p>
      </div>

      {/* 1. Profile Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-indigo-400" />
          <h2 className="font-bold text-sm text-white">Profile Information</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Preferences Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <DollarSign className="w-4 h-4 text-indigo-400" />
          <h2 className="font-bold text-sm text-white">App Preferences</h2>
        </div>

        <form onSubmit={handleSavePreferences} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Currency
              </label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              >
                <option value="INR">Indian Rupee (₹ INR)</option>
                <option value="USD">US Dollar ($ USD)</option>
                <option value="EUR">Euro (€ EUR)</option>
                <option value="GBP">British Pound (£ GBP)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Theme
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              >
                <option value="dark">Dark Theme (Default)</option>
                <option value="light">Light Theme</option>
                <option value="system">System Preference</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Data Management Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Download className="w-4 h-4 text-indigo-400" />
          <h2 className="font-bold text-sm text-white">Data Management</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <h3 className="font-semibold text-xs text-slate-200">Export Backup Data</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Download a complete JSON backup file of your tasks and expenses.
              </p>
            </div>
            <button
              onClick={handleExportData}
              className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <h3 className="font-semibold text-xs text-rose-400">Clear Application Data</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Permanently delete all stored todos and expenses to start completely fresh.
              </p>
            </div>
            <button
              onClick={handleClearAllData}
              className="flex items-center justify-center gap-2 w-full py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-800 text-xs font-semibold rounded-xl transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
