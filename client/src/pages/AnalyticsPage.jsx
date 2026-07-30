import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Zap, Target, TrendingUp, CheckCircle, Flame, Award } from 'lucide-react';

const analyticsWeekly = [
  { day: 'Mon', tasks: 4, focusHours: 3.5, expenses: 1200 },
  { day: 'Tue', tasks: 6, focusHours: 5.0, expenses: 450 },
  { day: 'Wed', tasks: 5, focusHours: 4.2, expenses: 3200 },
  { day: 'Thu', tasks: 8, focusHours: 6.1, expenses: 890 },
  { day: 'Fri', tasks: 7, focusHours: 5.5, expenses: 1500 },
  { day: 'Sat', tasks: 3, focusHours: 2.0, expenses: 4500 },
  { day: 'Sun', tasks: 2, focusHours: 1.5, expenses: 800 },
];

const AnalyticsPage = () => {
  const [period, setPeriod] = useState('Weekly');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
            Analytics & Insights
          </h1>
          <p className="text-xs text-slate-400 mt-1">Productivity metrics, expense trajectories and goal analytics.</p>
        </div>

        <div className="flex items-center p-1 bg-surface-card border border-crimson-950 rounded-xl">
          {['Weekly', 'Monthly', 'Yearly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                period === p ? 'bg-crimson-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top Productivity Score Card Banner */}
      <div className="p-6 rounded-2xl glass-panel-gold flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/40 shadow-gold-glow">
            <Zap className="w-10 h-10 text-gold-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-3xl text-white">88 / 100</h2>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                EXCELLENT
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">Productivity Index based on focus duration & task velocity</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-center border-t md:border-t-0 md:border-l border-gold-500/20 pt-4 md:pt-0 md:pl-6">
          <div>
            <span className="block font-display font-bold text-xl text-white">32.8 hrs</span>
            <span className="text-[10px] text-slate-400 uppercase">Focus Time</span>
          </div>
          <div>
            <span className="block font-display font-bold text-xl text-emerald-400">92%</span>
            <span className="text-[10px] text-slate-400 uppercase">On-Time Rate</span>
          </div>
          <div>
            <span className="block font-display font-bold text-xl text-gold-400">14 Days</span>
            <span className="text-[10px] text-slate-400 uppercase">Current Streak</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Velocity Chart */}
        <div className="p-5 rounded-2xl glass-panel">
          <h3 className="font-display font-bold text-sm text-white tracking-wide mb-4">TASK COMPLETION VELOCITY</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={analyticsWeekly}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#121218', borderColor: '#b91c1c', borderRadius: '12px' }} />
                <Bar dataKey="tasks" fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Focus Duration Trajectory */}
        <div className="p-5 rounded-2xl glass-panel">
          <h3 className="font-display font-bold text-sm text-white tracking-wide mb-4">DAILY FOCUS DURATION (HOURS)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={analyticsWeekly}>
                <defs>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#121218', borderColor: '#f59e0b', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="focusHours" stroke="#f59e0b" fillOpacity={1} fill="url(#focusGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Heatmap Visualizer */}
      <div className="p-5 rounded-2xl glass-panel">
        <h3 className="font-display font-bold text-sm text-white tracking-wide mb-4">ACTIVITY HEATMAP (MAY 2025)</h3>
        <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-31 gap-1.5 text-center">
          {Array.from({ length: 31 }, (_, i) => {
            const intensity = (i * 7) % 100;
            return (
              <div
                key={i}
                title={`Day ${i + 1}: ${intensity}% activity`}
                className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                  intensity > 70
                    ? 'bg-crimson-600 text-white shadow-crimson-glow'
                    : intensity > 40
                    ? 'bg-crimson-900/60 text-crimson-300'
                    : 'bg-surface-card text-slate-500'
                }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
