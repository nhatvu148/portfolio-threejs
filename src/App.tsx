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
      <div className="w-full h-screen flex items-center justify-center loading-screen">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 border-4 border-tech-cyan border-t-transparent rounded-full animate-spin" />
          <h1 className="text-2xl font-bold text-white mb-2 glow-text">
            Initializing Solar System...
          </h1>
          <p className="text-gray-400 text-sm">
            Loading 3D assets and preparing your journey
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-space-blue">
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