import React, { Component, ErrorInfo, ReactNode } from 'react'
import { DebugLogger } from '../../utils/debug'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    DebugLogger.error('ErrorBoundary caught an error:', error, errorInfo)
    console.error('3D Portfolio Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-space-blue">
          <div className="text-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg max-w-md">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-300 mb-4">
              The 3D portfolio encountered an error. Please check the browser console for details.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left">
                <summary className="text-red-300 cursor-pointer mb-2">
                  Error Details (Dev Mode)
                </summary>
                <pre className="text-xs text-gray-400 bg-black/30 p-2 rounded overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}