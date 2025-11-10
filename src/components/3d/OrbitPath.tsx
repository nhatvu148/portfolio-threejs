import { useMemo } from 'react'
import * as THREE from 'three'

interface OrbitPathProps {
  radius: number
  inclination: number
  color?: string
  opacity?: number
}

export default function OrbitPath({ radius, inclination: _inclination, color = '#ffffff', opacity = 0.8 }: OrbitPathProps) {
  const points = useMemo(() => {
    const pts = []
    const segments = 128 // More segments for smoother circles

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = 0 // Planets orbit on flat XZ plane (y=0)
      pts.push(new THREE.Vector3(x, y, z))
    }

    return pts
  }, [radius])

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        linewidth={3}
      />
    </line>
  )
}