export interface BrowserInfo {
  isChrome: boolean
  isFirefox: boolean
  isSafari: boolean
  isBrave: boolean
  isSandboxed: boolean
  willHaveWebGLIssues: boolean
}

export function detectBrowser(): BrowserInfo {
  const userAgent = navigator.userAgent
  const vendor = navigator.vendor || ''

  const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(vendor)
  const isFirefox = /Firefox/.test(userAgent)
  const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(vendor)
  const isBrave = /Brave/.test(userAgent) || ((navigator as any).brave && (navigator as any).brave.isBrave())

  const isSandboxed = window.location.protocol === 'https:' && window.location.hostname !== 'localhost'

  // Chrome with SwiftShader will have issues
  const willHaveWebGLIssues = isChrome && isSandboxed && !isBrave

  return {
    isChrome,
    isFirefox,
    isSafari,
    isBrave,
    isSandboxed,
    willHaveWebGLIssues
  }
}

export function shouldUse3DFallback(): boolean {
  const browserInfo = detectBrowser()

  // Force 3D if hash is present
  if (window.location.hash === '#force-3d') {
    return false
  }

  return browserInfo.willHaveWebGLIssues
}

export function getBrowserRecommendation(): string {
  const browserInfo = detectBrowser()

  if (browserInfo.isBrave) {
    return "Brave - Perfect for 3D graphics!"
  }

  if (browserInfo.isFirefox) {
    return "Firefox - Excellent WebGL support"
  }

  if (browserInfo.isSafari) {
    return "Safari - Good 3D performance"
  }

  if (browserInfo.isChrome && browserInfo.willHaveWebGLIssues) {
    return "Chrome may have issues - try Brave instead"
  }

  if (browserInfo.isChrome) {
    return "Chrome - Ensure hardware acceleration is enabled"
  }

  return "Browser compatibility unknown"
}