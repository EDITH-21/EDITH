import React from 'react';

const EdithLogo = ({ className = 'w-10 h-10', showText = true }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Glowing holographic back-light */}
        <div className="absolute inset-0 rounded-xl bg-crimson-600/40 blur-md animate-pulse"></div>
        {/* Hexagonal Shield Logo matching screenshots */}
        <svg viewBox="0 0 100 100" className="relative w-full h-full drop-shadow-[0_0_12px_rgba(220,38,38,0.7)]">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
          </defs>

          {/* Outer Hexagon frame */}
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="rgba(18,18,24,0.9)" stroke="url(#crimsonGrad)" strokeWidth="4" />
          <polygon points="50,12 83,28 83,72 50,88 17,72 17,28" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />

          {/* Stylized Futuristic Letter 'E' */}
          <path d="M35 30 L65 30 M35 30 L35 70 M35 50 L60 50 M35 70 L65 70" stroke="url(#goldGrad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-display font-extrabold text-xl tracking-wider text-gradient-gold">
            EDITH
          </span>
          <span className="text-[9px] uppercase tracking-widest text-crimson-500 font-semibold">
            Plan. Focus. Achieve.
          </span>
        </div>
      )}
    </div>
  );
};

export default EdithLogo;
