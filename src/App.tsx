import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from '@store/portfolioStore'
import { planetData } from './data/planetData'
import Scene from './components/3d/scene/Scene'
import NavigationUI from './components/ui/NavigationUI'
import ContentModal from './components/ui/ContentModal'

function App() {
  const [loading, setLoading] = useState(true)
  const {
    modalOpen,
    selectedPlanet,
    setCurrentPlanet,
    setModalOpen,
    planets,
    hoveredPlanet,
    setSelectedPlanet,
    setPlanets
  } = usePortfolioStore()

  // Initialize app and load planet data
  useEffect(() => {
    // Load planet data
    setPlanets(planetData)
  }, [setPlanets])

  // Remove the temporary fallback and use the full 3D experience

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Handle planet click
  const handlePlanetClick = (planetId: string) => {
    const planet = planets.find(p => p.id === planetId)
    if (!planet) return

    // Direct modal opening
    setSelectedPlanet(planetId)
    setCurrentPlanet(planetId)
    setModalOpen(true)
  }

  // Handle planet hover
  const handlePlanetHover = (planetId: string | null) => {
    // This will be used for UI feedback
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center space-gradient">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto border-4 border-tech-cyan/30 border-t-tech-cyan rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-transparent border-b-tech-purple/50 rounded-full animate-spin" style={{animationDelay: '150ms'}}></div>
            <div className="absolute inset-2 w-20 h-20 mx-auto border-4 border-transparent border-l-accent-orange/30 rounded-full animate-spin" style={{animationDelay: '300ms'}}></div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-tech-cyan to-tech-purple bg-clip-text text-transparent">
            Initializing Professional Portfolio...
          </h1>
          <p className="text-gray-300 text-sm mb-4">
            Loading your interactive career journey
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-tech-cyan rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-tech-purple rounded-full animate-pulse" style={{animationDelay: '200ms'}}></div>
            <div className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" style={{animationDelay: '400ms'}}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden space-gradient">
      {/* 3D Scene - Re-enabled with working data */}
      <Scene
        onPlanetClick={handlePlanetClick}
        onPlanetHover={handlePlanetHover}
      />

      
      {/* Navigation UI Overlay */}
      <NavigationUI />

      {/* Content Modal */}
      <AnimatePresence>
        {modalOpen && selectedPlanet && (
          <ContentModal
            planetId={selectedPlanet}
            onClose={() => {
              setModalOpen(false)
              setCurrentPlanet(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Hover indicator */}
      <AnimatePresence>
        {hoveredPlanet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-space-blue/90 border border-tech-cyan/30 rounded-lg backdrop-blur-sm"
          >
            <p className="text-white text-sm">
              Click to visit <span className="text-tech-cyan font-semibold">{hoveredPlanet}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute top-4 left-4 text-white/70 text-sm max-w-xs"
      >
        <p className="mb-1">🚀 Click planets to explore</p>
        <p className="mb-1">🌍 Drag to rotate view</p>
        <p>🔍 Scroll to zoom</p>
      </motion.div>
    </div>
  )
}

export default App