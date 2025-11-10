import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { DebugLogger } from '../../../utils/debug'

import SolarSystem from '../SolarSystem'
import LoadingScreen from '../../ui/LoadingScreen'

interface SceneProps {
  onPlanetClick: (planetId: string) => void
  onPlanetHover: (planetId: string | null) => void
}

export default function Scene({ onPlanetClick, onPlanetHover }: SceneProps) {
  return (
    <div className="w-full h-screen relative bg-slate-800">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        shadows
        camera={{
          position: [0, 50, 100],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
      >
        <Suspense fallback={null}>
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
            opacity={0.8}
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
        </Suspense>
      </Canvas>

      {/* Loading screen overlay */}
      <LoadingScreen />
    </div>
  )
}