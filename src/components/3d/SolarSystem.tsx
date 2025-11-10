import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePortfolioStore } from '@store/portfolioStore'

import Sun from './Sun'
import Planet from './planets/Planet'
import OrbitPath from './OrbitPath'

interface SolarSystemProps {
  onPlanetClick: (planetId: string) => void
  onPlanetHover: (planetId: string | null) => void
}

export default function SolarSystem({ onPlanetClick, onPlanetHover }: SolarSystemProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { planets } = usePortfolioStore()

  // Planet data is now loaded in App component, no need to load here

  // Gentle rotation of the entire solar system
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02 // Very slow rotation
    }
  })

  if (planets.length === 0) {
    return null
  }

  return (
    <group ref={groupRef}>
      {/* Central sun */}
      <Sun />

      {/* Orbit paths and planets */}
      {planets.map((planet) => (
        <group key={planet.id}>
          {/* Orbit path visualization */}
          <OrbitPath
            radius={planet.orbitRadius}
            inclination={0}
          />

          {/* Planet */}
          <Planet
            planet={planet}
            onClick={() => onPlanetClick(planet.id)}
            onHover={(hovered) => onPlanetHover(hovered ? planet.id : null)}
          />
        </group>
      ))}
    </group>
  )
}