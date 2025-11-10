import { Canvas } from '@react-three/fiber'
import { Suspense, useState, ReactNode, useEffect } from 'react'

interface WebGLCanvasProps {
  children: ReactNode
  className?: string
  onError?: (error: Error) => void
}

export default function WebGLCanvas({ children, className = "", onError }: WebGLCanvasProps) {
  const [webglError, setWebglError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isInitializing, setIsInitializing] = useState(true)

  const handleCanvasError = (error: Error) => {
    console.error('WebGL Canvas error:', error)
    setWebglError(error)
    setIsInitializing(false)
    onError?.(error)
  }

  // Try different configurations in order of compatibility
  const getWebGLConfigs = () => [
    // Most compatible - everything disabled
    {
      antialias: false,
      alpha: false,
      powerPreference: 'default',
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
      precision: 'lowp',
      stencil: false,
      depth: true,
      logarithmicDepthBuffer: false,
    },
    // Medium compatibility
    {
      antialias: false,
      alpha: false,
      powerPreference: 'default',
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
      precision: 'mediump',
      stencil: false,
      depth: true,
      logarithmicDepthBuffer: false,
    },
    // High compatibility
    {
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
      precision: 'highp',
      stencil: false,
      depth: true,
      logarithmicDepthBuffer: false,
    }
  ]

  const getCameraConfig = () => ({
    position: [0, 50, 100],
    fov: 75,
    near: 0.1,
    far: 1000
  })

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    setWebglError(null)
    setIsInitializing(true)
  }

  useEffect(() => {
    // Set a timeout to show initializing state
    const timer = setTimeout(() => {
      if (isInitializing) {
        setIsInitializing(false)
      }
    }, 3000) // 3 second timeout

    return () => clearTimeout(timer)
  }, [isInitializing])

  if (isInitializing && retryCount === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center space-gradient ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Initializing 3D environment...</p>
        </div>
      </div>
    )
  }

  if (webglError) {
    const isChromeSwiftShader = webglError.message.includes('SwiftShader')
    const attemptIndex = retryCount % 3

    return (
      <div className={`w-full h-full flex items-center justify-center space-gradient ${className}`}>
        <div className="text-center max-w-md px-4">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              3D Graphics Failed to Load
            </h2>
            <p className="text-gray-300 mb-2">
              {isChromeSwiftShader
                ? 'Chrome is having issues with 3D rendering in this environment.'
                : 'WebGL context could not be created.'
              }
            </p>
            <details className="text-left bg-white/10 rounded-lg p-3 mb-4">
              <summary className="cursor-pointer text-sm font-semibold text-white mb-2">Error Details</summary>
              <code className="text-xs text-red-400 break-all">
                {webglError.message}
              </code>
              <div className="text-xs text-gray-400 mt-2">
                Attempt: {attemptIndex + 1} of 3 configurations
              </div>
            </details>
          </div>

          <div className="text-left bg-white/10 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-white mb-2">Quick Solutions:</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Use Brave Browser</strong> - Works perfectly (you confirmed this)</li>
              <li>• <strong>Firefox</strong> - Also should work well</li>
              <li>• <strong>Chrome flags</strong>: chrome://flags → "Override software rendering list"</li>
              <li>• <strong>Hardware acceleration</strong>: Chrome settings → Advanced → System</li>
              <li>• <strong>Incognito mode</strong>: Sometimes bypasses restrictions</li>
            </ul>
          </div>

          <div className="flex gap-2 justify-center flex-wrap">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Different Config ({attemptIndex + 1}/3)
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Reload Page
            </button>
            <a
              href="https://brave.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors inline-flex items-center"
            >
              Download Brave
            </a>
          </div>
        </div>
      </div>
    )
  }

  const configs = getWebGLConfigs()
  const configIndex = retryCount % 3
  const webglConfig = configs[configIndex]
  const cameraConfig = getCameraConfig()

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        key={retryCount} // Force re-render with new config
        gl={webglConfig}
        shadows={configIndex >= 2} // Only enable shadows on highest quality setting
        camera={cameraConfig}
        onError={handleCanvasError}
        onCreated={() => {
          setIsInitializing(false)
        }}
        dpr={1} // Always use 1 for compatibility
        performance={{ min: 0.1, max: 1 }} // Very flexible performance
        frameloop="demand" // Only render when needed for better performance
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}