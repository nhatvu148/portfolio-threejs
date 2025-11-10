import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Sun matching threejsdemos.com reference
const SUN_SIZE = 5 // Exact match to reference

export default function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Animate sun rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[SUN_SIZE, 16, 16]} />
      <meshBasicMaterial
        color="#ffff00"
        toneMapped={false}
      />
    </mesh>
  )
}