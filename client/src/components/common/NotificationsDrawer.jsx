import React from 'react';
import { X, Bell, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

const notifications = [
  { id: '1', title: 'Task Deadline Approaching', message: 'Submit project report is due today at 05:00 PM', time: '10m ago', icon: AlertCircle, color: 'text-amber-400' },
  { id: '2', title: 'Budget Limit Alert', message: '83% of May budget used (₹24,850 of ₹30,000)', time: '1h ago', icon: Bell, color: 'text-crimson-500' },
  { id: '3', title: 'Task Completed', message: 'Team Standup marked as finished', time: '3h ago', icon: CheckCircle2, color: 'text-emerald-400' },
];

const NotificationsDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#121218] border-l border-crimson-900/40 p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-crimson-900/20 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-crimson-500" />
              <h3 className="font-display font-bold text-base text-white">Notifications</h3>
            </div>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div key={n.id} className="p-3 rounded-xl bg-surface-card border border-crimson-950/60 flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${n.color}`} />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{n.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDrawer;
