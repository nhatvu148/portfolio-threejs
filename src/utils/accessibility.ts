// Accessibility utilities for 3D portfolio

export const A11Y = {
  // Keyboard navigation helpers
  keys: {
    TAB: 'Tab',
    ENTER: 'Enter',
    SPACE: 'Space',
    ESCAPE: 'Escape',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
  },

  // Screen reader announcements
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },

  // Focus management
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    ) as NodeListOf<HTMLElement>

    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    element.addEventListener('keydown', handleKeyDown)
    firstFocusableElement?.focus()

    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  },

  // Reduced motion detection
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  // High contrast mode detection
  prefersHighContrast: () => {
    return window.matchMedia('(prefers-contrast: high)').matches
  },

  // Screen reader detection
  hasScreenReader: () => {
    return navigator.userAgent.includes('JAWS') ||
           navigator.userAgent.includes('NVDA') ||
           navigator.userAgent.includes('VOICEOVER')
  }
}

// 3D specific accessibility utilities
export const A11Y3D = {
  // Convert 3D positions to screen reader friendly descriptions
  describePlanet: (planetName: string, description: string, position: { x: number, y: number, z: number }) => {
    const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2)
    const direction = getDirection(position)

    return `${planetName}: ${description}. Located ${direction} at approximately ${Math.round(distance)} units from center.`
  },

  // Describe current scene state
  describeScene: (currentPlanet: string | null, isTransitioning: boolean) => {
    if (isTransitioning) {
      return `Traveling to ${currentPlanet}. Please wait.`
    } else if (currentPlanet) {
      return `Currently viewing ${currentPlanet}. Use arrow keys to navigate to other planets.`
    } else {
      return `Solar system overview. Use arrow keys to select a planet to visit.`
    }
  },

  // Create alternative text for 3D objects
  createAltText: (objectType: string, name: string, description: string) => {
    return `${objectType}: ${name}. ${description}`
  }
}

// Helper function to get direction from 3D position
function getDirection(position: { x: number, z: number }): string {
  const angle = Math.atan2(position.z, position.x) * (180 / Math.PI)

  if (angle >= -22.5 && angle < 22.5) return 'to the right'
  if (angle >= 22.5 && angle < 67.5) return 'to the front-right'
  if (angle >= 67.5 && angle < 112.5) return 'in front'
  if (angle >= 112.5 && angle < 157.5) return 'to the front-left'
  if (angle >= 157.5 || angle < -157.5) return 'to the left'
  if (angle >= -157.5 && angle < -112.5) return 'to the back-left'
  if (angle >= -112.5 && angle < -67.5) return 'in the back'
  if (angle >= -67.5 && angle < -22.5) return 'to the back-right'

  return 'nearby'
}

// Custom React hook for accessibility
export const useAccessibility = () => {
  const announce = A11Y.announce
  const prefersReducedMotion = A11Y.prefersReducedMotion()
  const prefersHighContrast = A11Y.prefersHighContrast()

  return {
    announce,
    prefersReducedMotion,
    prefersHighContrast,
    trapFocus: A11Y.trapFocus,
    describePlanet: A11Y3D.describePlanet,
    describeScene: A11Y3D.describeScene
  }
}