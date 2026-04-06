import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong</h1>
            <p className="text-primary-foreground/60 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <details className="text-left bg-primary-foreground/10 p-4 rounded border border-red-500/20 max-h-60 overflow-auto">
              <summary className="cursor-pointer text-primary-foreground/80 mb-2">Error Details</summary>
              <pre className="text-xs text-primary-foreground/60 whitespace-pre-wrap">
                {this.state.error?.stack || 'No stack trace available'}
              </pre>
            </details>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-6 px-4 py-2 bg-gold text-accent-foreground rounded hover:bg-gold-light transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
