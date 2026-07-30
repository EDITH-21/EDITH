import React, { useState } from 'react';
import { Search, X, CheckSquare, CreditCard, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'To-Do Kanban Board', path: '/todo', icon: CheckSquare },
    { title: 'Expenses & Budget Tracker', path: '/expenses', icon: CreditCard },
    { title: 'Notes & Documentation', path: '/notes', icon: FileText },
  ];

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#121218] border border-crimson-900/50 rounded-2xl shadow-2xl p-4 overflow-hidden">
        <div className="flex items-center gap-3 px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl mb-4">
          <Search className="w-5 h-5 text-crimson-500" />
          <input
            type="text"
            placeholder="Search tasks, expenses, notes, or tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Quick Navigation</p>
          <div className="space-y-1">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => handleSelect(link.path)}
                  className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-crimson-950/40 text-xs text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-crimson-500" />
                    <span>{link.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-crimson-500 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
