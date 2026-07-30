import React from 'react';
import { Link } from 'react-router-dom';
import EdithLogo from '../components/common/EdithLogo';
import { Home, AlertOctagon } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#07070a] flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md p-8 rounded-3xl glass-panel border border-crimson-900/50 shadow-2xl">
        <div className="flex justify-center">
          <EdithLogo className="w-16 h-16" showText={false} />
        </div>

        <div>
          <h1 className="font-display font-black text-6xl text-crimson-500 tracking-widest">404</h1>
          <h2 className="font-display font-bold text-lg text-white mt-2">SECTOR UNCHARTED</h2>
          <p className="text-xs text-slate-400 mt-1">
            The requested neural vector or page route does not exist within the EDITH network.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-crimson-800 to-crimson-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-crimson-glow"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
