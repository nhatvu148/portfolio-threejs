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
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-space-blue/95 via-space-purple/90 to-space-blue/95 backdrop-blur-md rounded-2xl border border-tech-cyan/20 shadow-2xl">
            <div className="flex items-center justify-between p-4">
              {/* Logo/Title */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-4"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border-2 border-tech-cyan/30">
                    <img
                      src="https://github.com/nhatvu148.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-tech-cyan via-tech-blue to-tech-purple flex items-center justify-center">
                            <span class="text-white font-bold text-lg">NV</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-orange rounded-full animate-pulse border-2 border-space-blue"></div>
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg bg-gradient-to-r from-tech-cyan to-tech-purple bg-clip-text text-transparent">
                    Nhat-Vu Nguyen
                  </h1>
                  <p className="text-gray-400 text-xs">Senior Full Stack Engineer</p>
                </div>
              </motion.div>

              {/* Desktop Navigation menu */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="hidden lg:flex items-center space-x-2"
              >
                {planets.filter(planet =>
                  ['aerospace', 'education', 'achievements', 'future'].includes(planet.id)
                ).map((planet) => (
                  <button
                    key={planet.id}
                    onClick={() => handleNavClick(planet.id)}
                    className={`group relative px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                      currentPlanet === planet.id
                        ? 'bg-gradient-to-r from-tech-cyan/20 to-tech-purple/20 text-white border border-tech-cyan/40 shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/10 hover:border-tech-cyan/20'
                    } border border-transparent`}
                  >
                    <span className="relative z-10">{planet.name}</span>
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundColor: planet.color }}
                    ></div>
                  </button>
                ))}
                <div className="h-6 w-px bg-gray-600 mx-2"></div>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="px-3 py-2 rounded-xl bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                >
                  More ▼
                </button>
              </motion.div>

              {/* Mobile menu toggle */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                onClick={() => setExpanded(!expanded)}
                className="lg:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>

            {/* Expanded menu */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-tech-cyan/20 overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {planets.map((planet) => (
                      <button
                        key={planet.id}
                        onClick={() => {
                          handleNavClick(planet.id)
                          setExpanded(false)
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                          currentPlanet === planet.id
                            ? 'bg-gradient-to-r from-tech-cyan/20 to-tech-purple/20 text-white border border-tech-cyan/40'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: planet.color }}
                        />
                        <span className="truncate">{planet.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Current location indicator */}
      <AnimatePresence>
        {currentPlanet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-32 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="px-6 py-3 bg-gradient-to-r from-space-blue/95 via-space-purple/90 to-space-blue/95 backdrop-blur-md rounded-2xl border border-tech-cyan/30 shadow-2xl">
              <p className="text-white text-sm font-medium flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span>Currently visiting:</span>
                <span className="text-tech-cyan font-bold">{planets.find(p => p.id === currentPlanet)?.name || currentPlanet}</span>
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
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block"
      >
        <div className="bg-gradient-to-b from-space-blue/80 via-space-purple/70 to-space-blue/80 backdrop-blur-lg rounded-2xl border border-tech-cyan/20 shadow-2xl p-4 space-y-3 max-w-xs">
          <div className="text-center mb-4">
            <h3 className="text-white font-bold text-sm mb-1">Quick Navigation</h3>
            <div className="h-px bg-gradient-to-r from-transparent via-tech-cyan/50 to-transparent"></div>
          </div>
          {planets.map((planet, index) => {
            const isActive = currentPlanet === planet.id
            const isHovered = hoveredPlanet === planet.id
            return (
              <motion.button
                key={planet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.05 }}
                onClick={() => handleNavClick(planet.id)}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 w-full ${
                  isActive
                    ? 'bg-gradient-to-r from-tech-cyan/25 to-tech-purple/25 text-white border border-tech-cyan/40 shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10 hover:border-tech-cyan/20'
                } border border-transparent`}
              >
                <div className="relative">
                  <div
                    className="w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: planet.color }}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activePlanet"
                      className="absolute inset-0 rounded-full border-2 border-white"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
                <span className="text-sm font-medium text-left flex-1">{planet.name}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-accent-orange rounded-full"
                  />
                )}
              </motion.button>
            )
          })}
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