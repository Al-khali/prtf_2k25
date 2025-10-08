'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onRetry?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="glass-intense rounded-lg p-8 max-w-md text-center">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-text-secondary mb-6">
              {this.state.error?.message || 'Failed to load this section'}
            </p>
            <button
              onClick={this.handleRetry}
              className="px-6 py-3 bg-holo-cyan/20 hover:bg-holo-cyan/30 border border-holo-cyan/50 rounded-lg text-holo-cyan font-semibold transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
