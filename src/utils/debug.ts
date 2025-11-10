// Debug utilities for troubleshooting

export class DebugLogger {
  private static enabled = import.meta.env.DEV

  static log(message: string, ...args: any[]) {
    if (this.enabled) {
      console.log(`[3D Portfolio] ${message}`, ...args)
    }
  }

  static error(message: string, ...args: any[]) {
    console.error(`[3D Portfolio ERROR] ${message}`, ...args)
  }

  static warn(message: string, ...args: any[]) {
    if (this.enabled) {
      console.warn(`[3D Portfolio WARN] ${message}`, ...args)
    }
  }

  static group(label: string) {
    if (this.enabled) {
      console.group(`[3D Portfolio] ${label}`)
    }
  }

  static groupEnd() {
    if (this.enabled) {
      console.groupEnd()
    }
  }
}

import * as THREE from 'three'

// WebGPU/Three.js compatibility check
export class CompatibilityChecker {
  static checkWebGLSupport() {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null

    if (!gl) {
      DebugLogger.error('WebGL not supported')
      return false
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      DebugLogger.log('WebGL Renderer:', renderer, 'Vendor:', vendor)
    }

    return true
  }

  static checkThreeJSSupport() {
    try {
      // Check if Three.js can be loaded
      const testRenderer = new THREE.WebGLRenderer()
      testRenderer.dispose()
      DebugLogger.log('Three.js support: OK')
      return true
    } catch (error) {
      DebugLogger.error('Three.js support failed:', error)
      return false
    }
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static startTime = performance.now()
  private static frameCount = 0

  static init() {
    DebugLogger.log('Initializing performance monitor...')

    // Check initial load time
    window.addEventListener('load', () => {
      const loadTime = performance.now() - this.startTime
      DebugLogger.log(`Page load time: ${loadTime.toFixed(2)}ms`)
    })

    // Monitor frame rate
    let lastTime = performance.now()
    const checkFPS = () => {
      this.frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((this.frameCount * 1000) / (currentTime - lastTime))
        DebugLogger.log(`FPS: ${fps}`)
        this.frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(checkFPS)
    }

    checkFPS()
  }
}

// Error boundary for React components
export class ErrorBoundary {
  static init() {
    window.addEventListener('error', (event) => {
      DebugLogger.error('Global error:', event.error)
    })

    window.addEventListener('unhandledrejection', (event) => {
      DebugLogger.error('Unhandled promise rejection:', event.reason)
    })
  }
}

// Resource loading monitor
export class ResourceMonitor {
  static monitorResources() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

      resources.forEach(resource => {
        if (resource.duration > 1000) {
          DebugLogger.warn(`Slow resource: ${resource.name} took ${resource.duration.toFixed(2)}ms`)
        }
      })
    }
  }
}