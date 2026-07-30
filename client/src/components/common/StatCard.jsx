import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, trend, progress, accentColor = 'crimson' }) => {
  const isGold = accentColor === 'gold';

  return (
    <div
      className={`relative overflow-hidden p-4 rounded-xl glass-panel transition-all duration-300 hover:translate-y-[-2px] ${
        isGold ? 'hover:border-gold-500/50' : 'hover:border-crimson-600/50 hover:shadow-crimson-glow'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="font-display text-2xl font-extrabold text-white tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div
            className={`p-2.5 rounded-xl border ${
              isGold
                ? 'bg-gold-500/10 border-gold-500/30 text-gold-400'
                : 'bg-crimson-600/10 border-crimson-600/30 text-crimson-500'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isGold
                  ? 'bg-gradient-to-r from-gold-600 to-gold-400'
                  : 'bg-gradient-to-r from-crimson-800 to-crimson-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      {(subtitle || trend) && (
        <div className="mt-2.5 flex items-center justify-between text-[11px]">
          {subtitle && <span className="text-slate-400">{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold ${
                trend.startsWith('+') ? 'text-emerald-400' : trend.startsWith('-') ? 'text-crimson-400' : 'text-slate-400'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
