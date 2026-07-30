import React from 'react';
import { NavLink } from 'react-router-dom';
import EdithLogo from './EdithLogo';
import {
  LayoutDashboard,
  CheckSquare,
  CreditCard,
  Calendar as CalendarIcon,
  Target,
  BarChart3,
  FileText,
  Bot,
  Settings,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
  { path: '/todo', label: 'TO-DO', icon: CheckSquare },
  { path: '/expenses', label: 'EXPENSES', icon: CreditCard },
  { path: '/calendar', label: 'CALENDAR', icon: CalendarIcon },
  { path: '/analytics', label: 'ANALYTICS', icon: BarChart3 },
  { path: '/notes', label: 'NOTES', icon: FileText },
  { path: '/ai-assistant', label: 'AI ASSISTANT', icon: Bot },
  { path: '/settings', label: 'SETTINGS', icon: Settings },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#0d0d12]/95 border-r border-crimson-900/30 backdrop-blur-xl transition-transform duration-300 flex flex-col justify-between p-4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Branding Header */}
        <div>
          <div className="py-3 px-2 mb-6 border-b border-crimson-900/20">
            <EdithLogo className="w-9 h-9" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-crimson-900/80 via-crimson-800/40 to-transparent text-white border-l-4 border-crimson-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-crimson-950/30'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-crimson-500' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-crimson-500 animate-pulse" />}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom EDITH AI Widget matching screenshots */}
        <div className="p-3 rounded-xl bg-gradient-to-b from-surface-card to-[#12080a] border border-crimson-900/40 shadow-glass-card relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-crimson-600/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-2">
            <div className="relative p-2 rounded-lg bg-crimson-950/60 border border-crimson-700/50">
              <Sparkles className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 tracking-wide">EDITH AI</h4>
              <p className="text-[10px] text-slate-400">Your AI Assistant</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 mb-3">Always ready to optimize your workflow.</p>

          <NavLink
            to="/ai-assistant"
            className="flex items-center justify-between w-full px-3 py-1.5 text-[11px] font-medium text-crimson-400 bg-crimson-950/40 hover:bg-crimson-900/50 border border-crimson-800/40 rounded-lg transition-all"
          >
            <span>Talk to EDITH</span>
            <ChevronRight className="w-3 h-3" />
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
