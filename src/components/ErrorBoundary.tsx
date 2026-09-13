import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public props: Props;
  public state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[KisanQ ErrorBoundary] Uncaught runtime error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">किसान क्यू (KisanQ) — रिकवरी मोड</h2>
              <p className="text-sm text-slate-300 mt-1">
                An unexpected application error occurred while loading this view.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-700/80 font-mono text-xs text-red-400 overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                पेज दोबारा लोड करें (Reload Page)
              </button>

              <button
                onClick={this.handleReset}
                className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                डेटा रीसेट करें और पुनः खोलें (Clear Cache & Reset)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
