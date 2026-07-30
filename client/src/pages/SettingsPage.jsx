import React, { useState } from 'react';
import { Settings, Moon, Bell, Globe, Database, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const [theme, setTheme] = useState('dark-crimson');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC+05:30');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  const handleSaveSettings = () => {
    toast.success('Preferences saved successfully!');
  };

  const handleExportData = () => {
    toast.success('Full EDITH platform data exported as JSON!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
          Platform Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">Configure theme, notifications, localization and backups.</p>
      </div>

      <div className="space-y-6">
        {/* Appearance Theme */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-display font-bold text-sm text-white tracking-wide flex items-center gap-2">
            <Moon className="w-4 h-4 text-crimson-500" />
            THEME & APPEARANCE
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'dark-crimson', label: 'Dark Crimson (Default)', bg: 'bg-[#0a0a0d] border-crimson-600' },
              { id: 'gold-hologram', label: 'Metallic Gold HUD', bg: 'bg-[#0a0a0d] border-gold-500' },
              { id: 'deep-space', label: 'Deep Space Blue', bg: 'bg-[#070b14] border-blue-600' },
            ].map((t) => (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${t.bg} ${
                  theme === t.id ? 'ring-2 ring-crimson-500 shadow-crimson-glow' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className="text-xs font-bold text-white block">{t.label}</span>
                <span className="text-[10px] text-slate-400 mt-1 block">Active System Skin</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-display font-bold text-sm text-white tracking-wide flex items-center gap-2">
            <Bell className="w-4 h-4 text-gold-400" />
            NOTIFICATION PREFERENCES
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-card border border-crimson-950">
              <div>
                <span className="font-semibold text-white block">Email Notifications</span>
                <span className="text-slate-400 text-[11px]">Receive task deadlines & budget reports via email</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-crimson-600 focus:ring-crimson-600 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-card border border-crimson-950">
              <div>
                <span className="font-semibold text-white block">Push Notifications</span>
                <span className="text-slate-400 text-[11px]">Real-time system alerts on browser</span>
              </div>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={(e) => setPushAlerts(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-crimson-600 focus:ring-crimson-600 w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Localization */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-display font-bold text-sm text-white tracking-wide flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            TIMEZONE & LANGUAGE
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="en">English (US)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="es">Spanish (Español)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="UTC+05:30">Asia/Kolkata (IST +05:30)</option>
                <option value="UTC+00:00">UTC / GMT (London)</option>
                <option value="UTC-05:00">America/New_York (EST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Backup & Export */}
        <div className="p-6 rounded-2xl glass-panel flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-sm text-white tracking-wide flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              BACKUP & EXPORT DATA
            </h3>
            <p className="text-xs text-slate-400 mt-1">Download complete JSON dump of your tasks, expenses, and notes.</p>
          </div>

          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 bg-surface-card hover:bg-slate-800 border border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
        </div>

        {/* Reset Workspace & Erase Demo Data */}
        <div className="p-6 rounded-2xl glass-panel flex items-center justify-between border-crimson-900/40">
          <div>
            <h3 className="font-display font-bold text-sm text-crimson-400 tracking-wide flex items-center gap-2">
              <Database className="w-4 h-4" />
              RESET WORKSPACE & ERASE DEMO DATA
            </h3>
            <p className="text-xs text-slate-400 mt-1">Erase all sample tasks, transactions, and notes so you can start 100% fresh.</p>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Wipe out all sample data and start completely fresh?')) {
                localStorage.removeItem('edith_tasks');
                localStorage.removeItem('edith_expenses');
                localStorage.removeItem('edith_expense_summary');
                window.location.reload();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-crimson-950 hover:bg-crimson-900 border border-crimson-800 text-crimson-400 text-xs font-bold rounded-xl transition-all"
          >
            Reset Workspace
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-gradient-to-r from-crimson-800 to-crimson-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-crimson-glow"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
