import React from 'react'

export default function BrowserFallback() {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  const isSandboxed = window.location.protocol === 'https:' && window.location.hostname !== 'localhost'

  return (
    <div className="w-full h-screen flex items-center justify-center space-gradient">
      <div className="text-center max-w-lg px-6">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Portfolio Loading
        </h1>
        <p className="text-gray-300 mb-6 text-lg">
          {isChrome && isSandboxed
            ? "Chrome detected in secure environment - checking 3D compatibility..."
            : "Initializing portfolio..."
          }
        </p>

        {isChrome && isSandboxed && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-yellow-300 mb-3">Chrome Compatibility Check</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-yellow-200">Hardware Acceleration:</span>
                <span className="text-yellow-400 font-mono text-sm">Checking...</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-200">WebGL Support:</span>
                <span className="text-yellow-400 font-mono text-sm">Detecting...</span>
              </div>
            </div>
          </div>
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
            Try in Brave (Recommended)
          </a>
          <button
            onClick={() => {
              // Try to load the 3D version anyway
              window.location.hash = '#force-3d'
              window.location.reload()
            }}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold"
          >
            Try 3D Anyway
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p>Works perfectly in: <span className="text-green-400 font-semibold">Brave, Firefox, Safari</span></p>
          <p>Chrome may need: <span className="text-yellow-400">Hardware acceleration enabled</span></p>
        </div>
      </div>
    </div>
  )
}