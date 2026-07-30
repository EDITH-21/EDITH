import React from 'react';
import EdithLogo from './EdithLogo';
import { AlertOctagon, RotateCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[EDITH ErrorBoundary Captured]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07070a] text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-3xl glass-panel border border-crimson-900/50 shadow-2xl text-center space-y-4">
            <div className="flex justify-center">
              <EdithLogo className="w-16 h-16" showText={false} />
            </div>
            <div className="p-3 rounded-2xl bg-crimson-950/60 border border-crimson-800/60 flex items-center justify-center gap-2 text-crimson-400">
              <AlertOctagon className="w-5 h-5" />
              <h2 className="font-display font-bold text-sm">SYSTEM RECOVERY PROTOCOL</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected component error occurred. EDITH recovery active.
            </p>
            <div className="p-3 bg-surface-card rounded-xl border border-slate-800 text-[10px] font-mono text-crimson-400 text-left overflow-x-auto">
              {this.state.error?.toString() || 'Unknown error'}
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/dashboard';
              }}
              className="w-full py-3 bg-gradient-to-r from-crimson-800 to-crimson-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-crimson-glow flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload System</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
