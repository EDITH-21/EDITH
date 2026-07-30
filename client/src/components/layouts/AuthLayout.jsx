import React from 'react';
import { Outlet } from 'react-router-dom';
import EdithLogo from '../common/EdithLogo';
import { CheckSquare, PieChart, Target, TrendingUp, ShieldCheck } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#07070a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background holographic grid lines & light flares */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none animate-hologram" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Split Container matching screenshot 4 */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-[#0e0e14]/90 border border-crimson-900/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden relative z-10">
        {/* Left Branding Hero Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-crimson-900/30 relative">
          {/* Top System Status */}
          <div className="space-y-1 text-[10px] uppercase font-mono tracking-widest text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-emerald-400 font-bold">SYSTEM STATUS: ONLINE</span>
            </div>
            <p>SECURE • ENCRYPTED • PROTECTED</p>
          </div>

          {/* Center Logo Core */}
          <div className="my-10 flex flex-col items-center text-center">
            <EdithLogo className="w-24 h-24 mb-6" showText={false} />
            <h1 className="font-display font-extrabold text-4xl text-gradient-gold tracking-widest mb-2">
              EDITH
            </h1>
            <p className="text-xs uppercase tracking-widest font-semibold text-crimson-500">
              YOUR COMMAND. YOUR TIME. YOUR SUCCESS.
            </p>
          </div>

          {/* Quick Feature Hexagons */}
          <div>
            <div className="grid grid-cols-4 gap-2 text-center mb-6">
              {[
                { label: 'TASKS', icon: CheckSquare },
                { label: 'EXPENSES', icon: PieChart },
                { label: 'FOCUS', icon: Target },
                { label: 'GROWTH', icon: TrendingUp },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-2.5 rounded-xl bg-surface-card border border-crimson-950 flex flex-col items-center gap-1 hover:border-crimson-700/50 transition-all">
                    <Icon className="w-4 h-4 text-gold-400" />
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Your data is 100% secure with end-to-end encryption</span>
            </div>
          </div>
        </div>

        {/* Right Auth Form Section */}
        <div className="p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
