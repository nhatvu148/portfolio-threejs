import { Component, ErrorInfo, ReactNode } from 'react'
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
      const isWebGLError = this.state.error?.message.includes('WebGL') ||
                         this.state.error?.message.includes('SwiftShader') ||
                         this.state.error?.message.includes('gl ')

      const isChromeSwiftShader = this.state.error?.message?.includes('SwiftShader')

      if (isWebGLError) {
        return (
          <div className="w-full h-screen flex items-center justify-center space-gradient">
            <div className="text-center max-w-lg px-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                3D Graphics Not Available
              </h1>
              <p className="text-gray-300 mb-6 text-lg">
                {isChromeSwiftShader
                  ? 'Chrome is using software rendering that can\'t handle 3D graphics in this environment.'
                  : 'Your browser cannot create a WebGL context for 3D rendering.'}
              </p>

              {isChromeSwiftShader && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <h2 className="text-lg font-semibold text-yellow-300 mb-3">Chrome-Specific Solution</h2>
                  <div className="text-left space-y-2">
                    <p className="text-yellow-200">
                      <strong>🎯 Best option:</strong> Use <span className="text-green-400 font-bold">Brave Browser</span> (works perfectly!)
                    </p>
                    <p className="text-yellow-200 text-sm">
                      You confirmed Brave works, so it's the easiest solution.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-white mb-3">Quick Solutions:</h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300"><strong>Use Brave Browser</strong> - You confirmed this works perfectly</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span className="text-gray-300"><strong>Firefox</strong> - Also should work well</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400">⚙</span>
                    <span className="text-gray-300"><strong>Chrome fix:</strong> chrome://flags → "Override software rendering list"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400">⚙</span>
                    <span className="text-gray-300"><strong>Chrome settings:</strong> Enable hardware acceleration</span>
                  </div>
                </div>
              </div>

              {import.meta.env.DEV && this.state.error && (
                <details className="text-left bg-white/10 rounded-lg p-3 mb-6">
                  <summary className="cursor-pointer text-sm font-semibold text-white mb-2">
                    🔍 Technical Error Details
                  </summary>
                  <pre className="text-xs text-red-400 bg-black/30 p-2 rounded overflow-auto max-h-40">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="https://brave.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Download Brave
                </a>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => {
                    if (isChromeSwiftShader) {
                      window.open('chrome://flags/#override-software-rendering-list', '_blank')
                    }
                  }}
                  className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors font-semibold"
                >
                  Chrome Flags
                </button>
              </div>
            </div>
          </div>
        )
      }

      // Non-WebGL errors
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