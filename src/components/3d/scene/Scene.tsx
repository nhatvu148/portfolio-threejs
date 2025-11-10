import { OrbitControls, Stars } from '@react-three/drei'

import SolarSystem from '../SolarSystem'
import LoadingScreen from '../../ui/LoadingScreen'
import WebGLCanvas from './WebGLCanvas'
import StaticFallback from './StaticFallback'
import { shouldUse3DFallback, detectBrowser } from '../../../utils/browserDetection'

interface SceneProps {
  onPlanetClick: (planetId: string) => void
  onPlanetHover: (planetId: string | null) => void
}

export default function Scene({ onPlanetClick, onPlanetHover }: SceneProps) {
  // Pre-flight check to avoid Three.js entirely for problematic browsers
  if (shouldUse3DFallback()) {
    const browserInfo = detectBrowser()
    console.log('Browser detected:', browserInfo, 'Using static fallback instead of Three.js')
    return <StaticFallback />
  }

  return (
    <div className="w-full h-screen relative bg-slate-800">
      <WebGLCanvas onError={(error) => {
        console.error('Scene WebGL error:', error)
      }}>
        {/* Enhanced realistic lighting setup */}
        <ambientLight intensity={0.15} color="#1e293b" />

        {/* Main sun light with realistic properties */}
        <pointLight
          position={[0, 0, 0]}
          intensity={3}
          color="#fff8dc"
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-near={0.1}
          shadow-camera-far={100}
          shadow-bias={-0.0001}
        />

        {/* Primary directional light for main illumination */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Fill light for ambient illumination */}
        <directionalLight
          position={[-5, 2, -5]}
          intensity={0.8}
          color="#87ceeb"
        />

        {/* Rim lighting for atmosphere effects */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.6}
          color="#ffd700"
        />

        {/* Backlight for dramatic atmosphere */}
        <directionalLight
          position={[-10, -5, -10]}
          intensity={0.3}
          color="#4169e1"
        />

        {/* Lighter, more visible starfield background */}
        <Stars
          radius={500}
          depth={100}
          count={8000}
          factor={15}
          saturation={0.2}
          fade
          speed={0.5}
        />

        {/* Main solar system */}
        <SolarSystem
          onPlanetClick={onPlanetClick}
          onPlanetHover={onPlanetHover}
        />

        {/* Camera controls matching threejsdemos.com reference */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={20}
          maxDistance={200}
          maxPolarAngle={Math.PI * 0.9}
          minPolarAngle={Math.PI * 0.1}
          autoRotate={true}
          autoRotateSpeed={0.2}
          zoomSpeed={1}
          panSpeed={1}
          rotateSpeed={1}
        />
      </WebGLCanvas>

      {/* Loading screen overlay */}
      <LoadingScreen />
    </div>
  )
}