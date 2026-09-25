import React from 'react';
import { Outlet } from 'react-router-dom';
import { CheckSquare, CreditCard, ShieldCheck, PiggyBank } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Hero Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="EDITH Logo"
                className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
              />
              <div>
                <h1 className="font-bold text-3xl text-white tracking-tight">EDITH</h1>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Personal Todo & Expense Manager
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Keep track of what needs to get done, manage your personal spending, and build your savings in one clean, simple interface.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckSquare className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-slate-200">Organize Todos & Reminders</h4>
                <p className="text-[10px] text-slate-400">Task priorities, due dates & Chrome notifications</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CreditCard className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-slate-200">Track Monthly Expenses</h4>
                <p className="text-[10px] text-slate-400">Record daily spending & month-by-month totals</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <PiggyBank className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-slate-200">Build Your Savings</h4>
                <p className="text-[10px] text-slate-400">Monitor monthly savings & available balance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
