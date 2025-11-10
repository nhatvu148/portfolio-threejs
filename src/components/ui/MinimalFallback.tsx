import React, { useState, useEffect } from 'react'

export default function MinimalFallback() {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null)

  useEffect(() => {
    // Test WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setWebGLSupported(!!gl)
  }, [])

  if (webGLSupported === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-space-blue">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking browser compatibility...</p>
        </div>
      </div>
    )
  }

  if (!webGLSupported) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-space-blue">
        <div className="text-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            WebGL Not Supported
          </h1>
          <p className="text-gray-300 mb-4">
            Your browser doesn't support WebGL, which is required for the 3D portfolio experience.
          </p>
          <p className="text-gray-400 text-sm">
            Please try using a modern browser like Chrome, Firefox, or Safari.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-space-blue">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Nhat-Vu Nguyen</h1>
        <p className="text-xl text-gray-300 mb-8">Software Engineer Portfolio</p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">About</h3>
            <p className="text-gray-300 text-sm">Background and introduction</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Skills</h3>
            <p className="text-gray-300 text-sm">Technical expertise</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Projects</h3>
            <p className="text-gray-300 text-sm">Featured work</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Contact</h3>
            <p className="text-gray-300 text-sm">Get in touch</p>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-yellow-300 text-sm mb-2">
            ⚠️ 3D features are loading...
          </p>
          <p className="text-gray-400 text-xs">
            If you see this message for more than 10 seconds, please check the browser console for errors.
          </p>
        </div>
      </div>
    </div>
  )
}