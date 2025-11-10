import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from '@store/portfolioStore'
import { useState } from 'react'

export default function NavigationUI() {
  const {
    currentPlanet,
    planets,
    hoveredPlanet,
    setCurrentPlanet,
    setModalOpen,
    setSelectedPlanet
  } = usePortfolioStore()
  const [expanded, setExpanded] = useState(false)

  const handleNavClick = (planetId: string) => {
    const planet = planets.find(p => p.id === planetId)
    if (!planet) return

    // Direct modal opening without shuttle movement
    setSelectedPlanet(planetId)
    setCurrentPlanet(planetId)
    setModalOpen(true)
  }

  return (
    <>
      {/* Top navigation bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-40 p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-tech-cyan to-tech-purple rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">NV</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Nhật Vũ Nguyễn</h1>
              <p className="text-gray-400 text-xs">Software Engineer</p>
            </div>
          </motion.div>

          {/* Navigation menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="hidden md:flex items-center space-x-6"
          >
            {planets.map((planet) => (
              <button
                key={planet.id}
                onClick={() => handleNavClick(planet.id)}
                className={`px-3 py-1 rounded-lg transition-all duration-300 text-sm font-medium ${
                  currentPlanet === planet.id
                    ? 'bg-tech-cyan/20 text-tech-cyan border border-tech-cyan/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                } ${hoveredPlanet === planet.id ? 'text-tech-cyan' : ''}`}
              >
                {planet.name}
              </button>
            ))}
          </motion.div>

          {/* Mobile menu toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            onClick={() => setExpanded(!expanded)}
            className="md:hidden p-2 rounded-lg bg-white/10 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile menu */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 p-4 bg-space-blue/90 backdrop-blur-sm rounded-lg border border-white/10"
          >
            <div className="grid grid-cols-2 gap-2">
              {planets.map((planet) => (
                <button
                  key={planet.id}
                  onClick={() => {
                    handleNavClick(planet.id)
                    setExpanded(false)
                  }}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    currentPlanet === planet.id
                      ? 'bg-tech-cyan/20 text-tech-cyan border border-tech-cyan/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {planet.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Current location indicator */}
      <AnimatePresence>
        {currentPlanet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="px-4 py-2 bg-space-blue/90 backdrop-blur-sm rounded-full border border-tech-cyan/30">
              <p className="text-white text-sm font-medium">
                📍 Currently visiting: <span className="text-tech-cyan">{currentPlanet}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side planet quick navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
      >
        <div className="space-y-3">
          {planets.map((planet, index) => (
            <motion.button
              key={planet.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              onClick={() => handleNavClick(planet.id)}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 w-48 ${
                currentPlanet === planet.id
                  ? 'bg-tech-cyan/20 text-tech-cyan border border-tech-cyan/50'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              } ${hoveredPlanet === planet.id ? 'text-tech-cyan' : ''}`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <span className="text-sm font-medium">{planet.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Performance metrics (development only) */}
      {import.meta.env.DEV && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 right-4 z-30 text-xs text-gray-500 font-mono"
        >
          <div>FPS: 60</div>
          <div>Objects: {planets.length + 1}</div>
        </motion.div>
      )}
    </>
  )
}