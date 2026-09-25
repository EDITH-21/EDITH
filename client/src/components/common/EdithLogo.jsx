import React from 'react';

const EdithLogo = ({ className = 'w-10 h-10', showText = true }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src="/logo.png"
          alt="EDITH Logo"
          className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-wider text-white">
            EDITH
          </span>
          <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-semibold">
            Todo & Expense Manager
          </span>
        </div>
      )}
    </div>
  );
};

export default EdithLogo;
