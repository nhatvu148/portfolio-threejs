import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Planet } from '../../../types/planet'

interface TechPlanetProps {
  planet: Planet
  onClick: () => void
  onHover: (hovered: boolean) => void
}

export default function TechPlanet({ planet, onClick, onHover }: TechPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)

  // Use solid colors instead of generated textures to avoid uniform errors
  const materialColor = useMemo(() => {
    switch (planet.id) {
      case 'skills': // Earth-like
        return new THREE.Color('#4169e1')
      case 'projects': // Mars-like
        return new THREE.Color('#cd5c5c')
      case 'tools': // Venus-like
        return new THREE.Color('#ffd700')
      case 'experience': // Jupiter-like
        return new THREE.Color('#daa520')
      case 'about': // Neptune-like
        return new THREE.Color('#4169e1')
      case 'contact': // Saturn-like
        return new THREE.Color('#f4a460')
      default:
        return new THREE.Color(planet.color)
    }
  }, [planet.id, planet.color])

  // Planet orbital animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      const speed = planet.orbitSpeed
      const radius = planet.orbitRadius

      // Circular orbit on flat XZ plane to match orbit paths
      groupRef.current.position.x = Math.cos(time * speed) * radius
      groupRef.current.position.z = Math.sin(time * speed) * radius
      groupRef.current.position.y = 0 // Keep planets on flat plane to match orbit lines
    }

    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += delta * 0.5

      // Hover effect
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = (event: any) => {
    event.stopPropagation()
    onClick()
  }

  const handlePointerOver = () => {
    setHovered(true)
    onHover(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    onHover(false)
    document.body.style.cursor = 'auto'
  }

  return (
    <group ref={groupRef}>
      {/* Planet mesh with basic materials */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[planet.size, 16, 16]} />
        <meshBasicMaterial
          color={materialColor}
        />
      </mesh>

      {/* Saturn's rings - only for experience planet */}
      {planet.id === 'experience' && (
        <mesh rotation={[Math.PI * 0.1, 0, 0]}>
          <ringGeometry args={[planet.size * 1.8, planet.size * 2.8, 32]} />
          <meshBasicMaterial
            color={0xd4a574}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Simple atmosphere glow */}
      <mesh scale={planet.size * 1.1}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={materialColor}
          transparent
          opacity={hovered ? 0.3 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planet label */}
      {hovered && (
        <Html
          position={[0, planet.size + 1.5, 0]}
          center
          occlude
          style={{
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          <div className="px-4 py-2 bg-space-blue/95 border border-tech-cyan/40 rounded-lg backdrop-blur-md shadow-xl">
            <p className="text-white text-sm font-bold glow-text">{planet.name}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

// Pattern drawing functions
function drawCircuitPattern(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2

  // Draw circuit-like lines
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const length = Math.random() * 50 + 20

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + length, y)
    ctx.lineTo(x + length, y + (Math.random() - 0.5) * 30)
    ctx.stroke()
  }

  // Add nodes
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512

    ctx.fillStyle = '#60a5fa'
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawGridPattern(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#ffffff20'
  ctx.lineWidth = 1

  // Draw grid
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 512)
    ctx.stroke()
  }

  for (let y = 0; y < 512; y += 32) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(512, y)
    ctx.stroke()
  }
}

function drawMetallicPattern(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, 512, 512)
  gradient.addColorStop(0, '#ffffff20')
  gradient.addColorStop(0.5, '#ffffff10')
  gradient.addColorStop(1, '#ffffff20')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 512)
}

function drawTimelinePattern(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#ffffff40'
  ctx.lineWidth = 3

  // Draw spiral timeline
  ctx.beginPath()
  let angle = 0
  let radius = 10

  for (let i = 0; i < 200; i++) {
    const x = 256 + Math.cos(angle) * radius
    const y = 256 + Math.sin(angle) * radius

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }

    angle += 0.2
    radius += 1.5
  }

  ctx.stroke()
}

function drawDataPattern(ctx: CanvasRenderingContext2D) {
  // Draw data points
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const size = Math.random() * 4 + 1

    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawNetworkPattern(ctx: CanvasRenderingContext2D) {
  const nodes: { x: number; y: number }[] = []

  // Generate random nodes
  for (let i = 0; i < 20; i++) {
    nodes.push({
      x: Math.random() * 512,
      y: Math.random() * 512
    })
  }

  // Draw connections
  ctx.strokeStyle = '#ffffff20'
  ctx.lineWidth = 1

  nodes.forEach((node1, i) => {
    nodes.forEach((node2, j) => {
      if (i < j) {
        const distance = Math.sqrt(
          Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
        )

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(node1.x, node1.y)
          ctx.lineTo(node2.x, node2.y)
          ctx.stroke()
        }
      }
    })
  })

  // Draw nodes
  nodes.forEach(node => {
    ctx.fillStyle = '#06b6d4'
    ctx.beginPath()
    ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
    ctx.fill()
  })
}

function drawDefaultPattern(ctx: CanvasRenderingContext2D) {
  // Simple noise pattern
  for (let x = 0; x < 512; x += 4) {
    for (let y = 0; y < 512; y += 4) {
      if (Math.random() > 0.7) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`
        ctx.fillRect(x, y, 2, 2)
      }
    }
  }
}

// Simplified planet texture creation functions
function createSimpleEarth(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Blue ocean base
  const oceanGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  oceanGradient.addColorStop(0, '#1e40af')
  oceanGradient.addColorStop(0.7, '#1e3a8a')
  oceanGradient.addColorStop(1, '#172554')
  ctx.fillStyle = oceanGradient
  ctx.fillRect(0, 0, 512, 512)

  // Green continents
  ctx.fillStyle = '#16a34a'
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const radius = Math.random() * 60 + 30
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // White clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const radius = Math.random() * 40 + 20
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function createMarsLikePlanet(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Base Mars surface
  const marsGradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024)
  marsGradient.addColorStop(0, '#dc2626')
  marsGradient.addColorStop(0.5, '#b91c1c')
  marsGradient.addColorStop(1, '#7f1d1d')
  ctx.fillStyle = marsGradient
  ctx.fillRect(0, 0, 2048, 2048)

  // Dust storms and surface features
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 2048
    const radius = Math.random() * 80 + 20

    const dustGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    const colorChoice = Math.random()
    if (colorChoice < 0.5) {
      dustGradient.addColorStop(0, 'rgba(217, 119, 6, 0.3)')
      dustGradient.addColorStop(1, 'rgba(217, 119, 6, 0)')
    } else {
      dustGradient.addColorStop(0, 'rgba(185, 28, 28, 0.4)')
      dustGradient.addColorStop(1, 'rgba(185, 28, 28, 0)')
    }

    ctx.fillStyle = dustGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Polar ice caps
  const northPole = ctx.createRadialGradient(1024, 200, 0, 1024, 200, 150)
  northPole.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
  northPole.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = northPole
  ctx.beginPath()
  ctx.arc(1024, 200, 150, 0, Math.PI * 2)
  ctx.fill()

  const southPole = ctx.createRadialGradient(1024, 1848, 0, 1024, 1848, 150)
  southPole.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
  southPole.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = southPole
  ctx.beginPath()
  ctx.arc(1024, 1848, 150, 0, Math.PI * 2)
  ctx.fill()
}

function createJupiterLikePlanet(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Base Jupiter bands
  const jupiterGradient = ctx.createLinearGradient(0, 0, 0, 2048)
  jupiterGradient.addColorStop(0, '#92400e')
  jupiterGradient.addColorStop(0.2, '#b45309')
  jupiterGradient.addColorStop(0.3, '#d97706')
  jupiterGradient.addColorStop(0.4, '#92400e')
  jupiterGradient.addColorStop(0.5, '#78350f')
  jupiterGradient.addColorStop(0.6, '#b45309')
  jupiterGradient.addColorStop(0.7, '#d97706')
  jupiterGradient.addColorStop(0.8, '#92400e')
  jupiterGradient.addColorStop(1, '#78350f')
  ctx.fillStyle = jupiterGradient
  ctx.fillRect(0, 0, 2048, 2048)

  // Great Red Spot
  const redSpot = ctx.createRadialGradient(1400, 1024, 0, 1400, 1024, 200)
  redSpot.addColorStop(0, '#dc2626')
  redSpot.addColorStop(0.5, '#b91c1c')
  redSpot.addColorStop(1, '#991b1b')
  ctx.fillStyle = redSpot
  ctx.beginPath()
  ctx.ellipse(1400, 1024, 200, 150, 0, 0, Math.PI * 2)
  ctx.fill()

  // Storm bands and details
  for (let i = 0; i < 20; i++) {
    const y = Math.random() * 2048
    const width = Math.random() * 600 + 200
    const height = Math.random() * 40 + 10
    const x = Math.random() * 2048

    const stormGradient = ctx.createRadialGradient(x, y, 0, x, y, width)
    stormGradient.addColorStop(0, 'rgba(217, 119, 6, 0.3)')
    stormGradient.addColorStop(1, 'rgba(217, 119, 6, 0)')

    ctx.fillStyle = stormGradient
    ctx.fillRect(x - width/2, y - height/2, width, height)
  }
}

function createSaturnLikePlanet(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Base Saturn body
  const saturnGradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024)
  saturnGradient.addColorStop(0, '#f59e0b')
  saturnGradient.addColorStop(0.5, '#d97706')
  saturnGradient.addColorStop(1, '#b45309')
  ctx.fillStyle = saturnGradient
  ctx.fillRect(0, 0, 2048, 2048)

  // Atmospheric bands
  for (let i = 0; i < 15; i++) {
    const y = (2048 / 15) * i
    const height = 2048 / 15
    const opacity = Math.random() * 0.3 + 0.1

    const bandGradient = ctx.createLinearGradient(0, y, 0, y + height)
    bandGradient.addColorStop(0, `rgba(217, 119, 6, ${opacity})`)
    bandGradient.addColorStop(0.5, `rgba(245, 158, 11, ${opacity + 0.1})`)
    bandGradient.addColorStop(1, `rgba(217, 119, 6, ${opacity})`)

    ctx.fillStyle = bandGradient
    ctx.fillRect(0, y, 2048, height)
  }

  // Ring shadow on planet
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  ctx.fillRect(0, 980, 2048, 88)
}

function createNeptuneLikePlanet(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Base Neptune
  const neptuneGradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024)
  neptuneGradient.addColorStop(0, '#1e40af')
  neptuneGradient.addColorStop(0.5, '#1e3a8a')
  neptuneGradient.addColorStop(1, '#172554')
  ctx.fillStyle = neptuneGradient
  ctx.fillRect(0, 0, 2048, 2048)

  // Great Dark Spot (similar to Jupiter's Red Spot)
  const darkSpot = ctx.createRadialGradient(600, 1024, 0, 600, 1024, 150)
  darkSpot.addColorStop(0, '#1e3a8a')
  darkSpot.addColorStop(0.5, '#172554')
  darkSpot.addColorStop(1, '#1e3a8a')
  ctx.fillStyle = darkSpot
  ctx.beginPath()
  ctx.ellipse(600, 1024, 150, 100, 0, 0, Math.PI * 2)
  ctx.fill()

  // Methane cloud bands
  for (let i = 0; i < 10; i++) {
    const y = Math.random() * 2048
    const width = Math.random() * 400 + 100

    const cloudGradient = ctx.createRadialGradient(1024, y, 0, 1024, y, width)
    cloudGradient.addColorStop(0, 'rgba(96, 165, 250, 0.3)')
    cloudGradient.addColorStop(1, 'rgba(96, 165, 250, 0)')

    ctx.fillStyle = cloudGradient
    ctx.fillRect(1024 - width, y - 20, width * 2, 40)
  }
}

function createVenusLikePlanet(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Base Venus surface
  const venusGradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024)
  venusGradient.addColorStop(0, '#eab308')
  venusGradient.addColorStop(0.5, '#ca8a04')
  venusGradient.addColorStop(1, '#a16207')
  ctx.fillStyle = venusGradient
  ctx.fillRect(0, 0, 2048, 2048)

  // Thick sulfuric acid clouds
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 2048
    const radius = Math.random() * 120 + 60

    const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    cloudGradient.addColorStop(0, 'rgba(250, 204, 21, 0.4)')
    cloudGradient.addColorStop(0.5, 'rgba(217, 119, 6, 0.2)')
    cloudGradient.addColorStop(1, 'rgba(217, 119, 6, 0)')

    ctx.fillStyle = cloudGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Atmospheric swirl patterns
  for (let i = 0; i < 15; i++) {
    const centerX = Math.random() * 2048
    const centerY = Math.random() * 2048
    const maxRadius = Math.random() * 100 + 50

    ctx.strokeStyle = 'rgba(250, 204, 21, 0.2)'
    ctx.lineWidth = 3
    ctx.beginPath()

    for (let r = 20; r < maxRadius; r += 20) {
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
    }
    ctx.stroke()
  }
}

function createDefaultPlanet(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Generic rocky planet
  const gradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024)
  gradient.addColorStop(0, baseColor)
  gradient.addColorStop(0.7, adjustBrightness(baseColor, -40))
  gradient.addColorStop(1, adjustBrightness(baseColor, -80))
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 2048, 2048)

  // Crater details
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 2048
    const radius = Math.random() * 40 + 10

    const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    craterGradient.addColorStop(0, adjustBrightness(baseColor, -60))
    craterGradient.addColorStop(1, adjustBrightness(baseColor, -20))

    ctx.fillStyle = craterGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function adjustBrightness(color: string, amount: number): string {
  const hex = color.replace('#', '')
  const num = parseInt(hex, 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

function getAtmosphereColor(planetId: string): THREE.Color {
  switch (planetId) {
    case 'skills': // Earth-like
      return new THREE.Color(0x87ceeb) // Sky blue
    case 'projects': // Mars-like
      return new THREE.Color(0xff6b47) // Mars atmosphere
    case 'tools': // Jupiter-like
      return new THREE.Color(0xd4a373) // Jupiter atmosphere
    case 'experience': // Saturn-like
      return new THREE.Color(0xfad5a5) // Saturn atmosphere
    case 'about': // Neptune-like
      return new THREE.Color(0x4b70dd) // Neptune atmosphere
    case 'contact': // Venus-like
      return new THREE.Color(0xffc649) // Venus atmosphere
    default:
      return new THREE.Color(0xffffff)
  }
}

function createSimpleMars(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Red Mars base
  const marsGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  marsGradient.addColorStop(0, '#dc2626')
  marsGradient.addColorStop(0.5, '#b91c1c')
  marsGradient.addColorStop(1, '#7f1d1d')
  ctx.fillStyle = marsGradient
  ctx.fillRect(0, 0, 512, 512)

  // Dust storms
  ctx.fillStyle = 'rgba(217, 119, 6, 0.4)'
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const radius = Math.random() * 40 + 10
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Polar ice caps
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.beginPath()
  ctx.arc(256, 50, 40, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(256, 462, 40, 0, Math.PI * 2)
  ctx.fill()
}

function createSimpleJupiter(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Jupiter bands
  const jupiterGradient = ctx.createLinearGradient(0, 0, 0, 512)
  jupiterGradient.addColorStop(0, '#8b4513')
  jupiterGradient.addColorStop(0.2, '#cd853f')
  jupiterGradient.addColorStop(0.4, '#daa520')
  jupiterGradient.addColorStop(0.6, '#b8860b')
  jupiterGradient.addColorStop(0.8, '#cd853f')
  jupiterGradient.addColorStop(1, '#8b4513')
  ctx.fillStyle = jupiterGradient
  ctx.fillRect(0, 0, 512, 512)

  // Great Red Spot
  ctx.fillStyle = '#dc2626'
  ctx.beginPath()
  ctx.ellipse(350, 256, 50, 35, 0, 0, Math.PI * 2)
  ctx.fill()
}

function createSimpleSaturn(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Saturn golden atmosphere
  const saturnGradient = ctx.createLinearGradient(0, 0, 0, 512)
  saturnGradient.addColorStop(0, '#daa520')
  saturnGradient.addColorStop(0.2, '#f4a460')
  saturnGradient.addColorStop(0.4, '#ffd700')
  saturnGradient.addColorStop(0.6, '#daa520')
  saturnGradient.addColorStop(0.8, '#f4a460')
  saturnGradient.addColorStop(1, '#cd853f')
  ctx.fillStyle = saturnGradient
  ctx.fillRect(0, 0, 512, 512)

  // Atmospheric bands
  ctx.strokeStyle = 'rgba(218, 165, 32, 0.3)'
  ctx.lineWidth = 2
  for (let i = 0; i < 8; i++) {
    const y = (512 / 8) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(512, y)
    ctx.stroke()
  }
}

function createSimpleNeptune(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Neptune blue
  const neptuneGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  neptuneGradient.addColorStop(0, '#4169e1')
  neptuneGradient.addColorStop(0.5, '#1e3a8a')
  neptuneGradient.addColorStop(1, '#172554')
  ctx.fillStyle = neptuneGradient
  ctx.fillRect(0, 0, 512, 512)

  // Great Dark Spot
  ctx.fillStyle = '#0f172a'
  ctx.beginPath()
  ctx.ellipse(150, 256, 40, 30, 0, 0, Math.PI * 2)
  ctx.fill()

  // Methane clouds
  ctx.fillStyle = 'rgba(135, 206, 235, 0.4)'
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const radius = Math.random() * 30 + 15
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function createSimpleVenus(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Venus thick atmosphere
  const venusGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  venusGradient.addColorStop(0, '#ffd700')
  venusGradient.addColorStop(0.5, '#daa520')
  venusGradient.addColorStop(1, '#b8860b')
  ctx.fillStyle = venusGradient
  ctx.fillRect(0, 0, 512, 512)

  // Sulfuric acid clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const radius = Math.random() * 35 + 20
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function createSimplePlanet(ctx: CanvasRenderingContext2D, baseColor: string) {
  // Generic rocky planet
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  gradient.addColorStop(0, baseColor)
  gradient.addColorStop(0.7, adjustBrightness(baseColor, -40))
  gradient.addColorStop(1, adjustBrightness(baseColor, -80))
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 512)

  // Crater details
  ctx.fillStyle = adjustBrightness(baseColor, -60)
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const radius = Math.random() * 20 + 5
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function addNoiseToTexture(ctx: CanvasRenderingContext2D, normalCtx: CanvasRenderingContext2D, roughnessCtx: CanvasRenderingContext2D) {
  const imageData = ctx.createImageData(4096, 2048)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 20 - 10
    data[i] = Math.max(0, Math.min(255, data[i] + noise))
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
    data[i + 3] = 255
  }

  ctx.putImageData(imageData, 0, 0)

  // Add noise to normal map
  const normalData = normalCtx.createImageData(4096, 2048)
  for (let i = 0; i < normalData.data.length; i += 4) {
    const noise = Math.random() * 10 - 5
    normalData.data[i] = 128 + noise
    normalData.data[i + 1] = 128 + noise
    normalData.data[i + 2] = 255
    normalData.data[i + 3] = 255
  }
  normalCtx.putImageData(normalData, 0, 0)

  // Add noise to roughness map
  const roughnessData = roughnessCtx.createImageData(4096, 2048)
  for (let i = 0; i < roughnessData.data.length; i += 4) {
    const noise = Math.random() * 20
    roughnessData.data[i] = noise
    roughnessData.data[i + 1] = noise
    roughnessData.data[i + 2] = noise
    roughnessData.data[i + 3] = 255
  }
  roughnessCtx.putImageData(roughnessData, 0, 0)
}

function createRealisticMars(ctx: CanvasRenderingContext2D, normalCtx: CanvasRenderingContext2D, roughnessCtx: CanvasRenderingContext2D, baseColor: string) {
  // Mars surface with iron oxide
  const marsGradient = ctx.createLinearGradient(0, 0, 4096, 2048)
  marsGradient.addColorStop(0, '#dc2626')
  marsGradient.addColorStop(0.3, '#b91c1c')
  marsGradient.addColorStop(0.6, '#991b1b')
  marsGradient.addColorStop(1, '#7f1d1d')
  ctx.fillStyle = marsGradient
  ctx.fillRect(0, 0, 4096, 2048)

  // Dust and craters
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 4096
    const y = Math.random() * 2048
    const radius = Math.random() * 60 + 10

    const dustGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    dustGradient.addColorStop(0, 'rgba(217, 119, 6, 0.6)')
    dustGradient.addColorStop(0.7, 'rgba(217, 119, 6, 0.2)')
    dustGradient.addColorStop(1, 'rgba(217, 119, 6, 0)')

    ctx.fillStyle = dustGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Polar ice caps
  const northPole = ctx.createRadialGradient(2048, 200, 0, 2048, 200, 250)
  northPole.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
  northPole.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
  northPole.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = northPole
  ctx.beginPath()
  ctx.arc(2048, 200, 250, 0, Math.PI * 2)
  ctx.fill()

  // Olympus Mons style volcano
  ctx.fillStyle = '#8b4513'
  ctx.beginPath()
  ctx.ellipse(3000, 1000, 300, 200, 0, 0, Math.PI * 2)
  ctx.fill()

  addNoiseToTexture(ctx, normalCtx, roughnessCtx)
}

function createRealisticJupiter(ctx: CanvasRenderingContext2D, normalCtx: CanvasRenderingContext2D, roughnessCtx: CanvasRenderingContext2D, baseColor: string) {
  // Jupiter's distinctive bands
  const bands = [
    { y: 0, h: 200, color: '#8b4513' },
    { y: 200, h: 150, color: '#cd853f' },
    { y: 350, h: 100, color: '#daa520' },
    { y: 450, h: 200, color: '#b8860b' },
    { y: 650, h: 150, color: '#cd853f' },
    { y: 800, h: 100, color: '#f4a460' },
    { y: 900, h: 200, color: '#8b4513' },
    { y: 1100, h: 150, color: '#daa520' },
    { y: 1250, h: 100, color: '#cd853f' },
    { y: 1350, h: 200, color: '#b8860b' },
    { y: 1550, h: 150, color: '#8b4513' },
    { y: 1700, h: 100, color: '#f4a460' },
    { y: 1800, h: 248, color: '#8b4513' }
  ]

  bands.forEach(band => {
    const bandGradient = ctx.createLinearGradient(0, band.y, 0, band.y + band.h)
    bandGradient.addColorStop(0, band.color)
    bandGradient.addColorStop(0.5, adjustBrightness(band.color, 20))
    bandGradient.addColorStop(1, band.color)
    ctx.fillStyle = bandGradient
    ctx.fillRect(0, band.y, 4096, band.h)
  })

  // Great Red Spot
  const redSpot = ctx.createRadialGradient(2800, 1024, 0, 2800, 1024, 300)
  redSpot.addColorStop(0, '#dc2626')
  redSpot.addColorStop(0.3, '#b91c1c')
  redSpot.addColorStop(0.7, '#991b1b')
  redSpot.addColorStop(1, '#7f1d1d')
  ctx.fillStyle = redSpot
  ctx.beginPath()
  ctx.ellipse(2800, 1024, 300, 200, 0, 0, Math.PI * 2)
  ctx.fill()

  // Storm systems
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 4096
    const y = Math.random() * 2048
    const radius = Math.random() * 100 + 30

    const stormGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    stormGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
    stormGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)')
    stormGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = stormGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  addNoiseToTexture(ctx, normalCtx, roughnessCtx)
}

function createRealisticSaturn(ctx: CanvasRenderingContext2D, normalCtx: CanvasRenderingContext2D, roughnessCtx: CanvasRenderingContext2D, baseColor: string) {
  // Saturn's golden atmosphere
  const saturnGradient = ctx.createLinearGradient(0, 0, 0, 2048)
  saturnGradient.addColorStop(0, '#daa520')
  saturnGradient.addColorStop(0.2, '#f4a460')
  saturnGradient.addColorStop(0.4, '#ffd700')
  saturnGradient.addColorStop(0.6, '#daa520')
  saturnGradient.addColorStop(0.8, '#f4a460')
  saturnGradient.addColorStop(1, '#cd853f')
  ctx.fillStyle = saturnGradient
  ctx.fillRect(0, 0, 4096, 2048)

  // Atmospheric bands
  for (let i = 0; i < 12; i++) {
    const y = (2048 / 12) * i
    const height = 2048 / 12

    const bandGradient = ctx.createLinearGradient(0, y, 0, y + height)
    bandGradient.addColorStop(0, 'rgba(218, 165, 32, 0.3)')
    bandGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.5)')
    bandGradient.addColorStop(1, 'rgba(218, 165, 32, 0.3)')

    ctx.fillStyle = bandGradient
    ctx.fillRect(0, y, 4096, height)
  }

  // Storm at North Pole (hexagonal)
  ctx.strokeStyle = '#8b4513'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(2048, 200, 100, 0, Math.PI * 2)
  ctx.stroke()

  addNoiseToTexture(ctx, normalCtx, roughnessCtx)
}

function createRealisticNeptune(ctx: CanvasRenderingContext2D, normalCtx: CanvasRenderingContext2D, roughnessCtx: CanvasRenderingContext2D, baseColor: string) {
  // Neptune's deep blue
  const neptuneGradient = ctx.createRadialGradient(2048, 1024, 0, 2048, 1024, 1500)
  neptuneGradient.addColorStop(0, '#4169e1')
  neptuneGradient.addColorStop(0.5, '#1e3a8a')
  neptuneGradient.addColorStop(1, '#172554')
  ctx.fillStyle = neptuneGradient
  ctx.fillRect(0, 0, 4096, 2048)

  // Great Dark Spot
  const darkSpot = ctx.createRadialGradient(1200, 1024, 0, 1200, 1024, 250)
  darkSpot.addColorStop(0, '#0f172a')
  darkSpot.addColorStop(0.5, '#1e293b')
  darkSpot.addColorStop(1, '#1e3a8a')
  ctx.fillStyle = darkSpot
  ctx.beginPath()
  ctx.ellipse(1200, 1024, 250, 180, 0, 0, Math.PI * 2)
  ctx.fill()

  // Methane clouds
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 4096
    const y = Math.random() * 2048
    const radius = Math.random() * 120 + 60

    const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    cloudGradient.addColorStop(0, 'rgba(135, 206, 235, 0.6)')
    cloudGradient.addColorStop(0.5, 'rgba(135, 206, 235, 0.3)')
    cloudGradient.addColorStop(1, 'rgba(135, 206, 235, 0)')

    ctx.fillStyle = cloudGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  addNoiseToTexture(ctx, normalCtx, roughnessCtx)
}

function createRealisticVenus(ctx: CanvasRenderingContext2D, normalCtx: CanvasRenderingContext2D, roughnessCtx: CanvasRenderingContext2D, baseColor: string) {
  // Venus's thick atmosphere
  const venusGradient = ctx.createRadialGradient(2048, 1024, 0, 2048, 1024, 1500)
  venusGradient.addColorStop(0, '#ffd700')
  venusGradient.addColorStop(0.5, '#daa520')
  venusGradient.addColorStop(1, '#b8860b')
  ctx.fillStyle = venusGradient
  ctx.fillRect(0, 0, 4096, 2048)

  // Sulfuric acid clouds
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * 4096
    const y = Math.random() * 2048
    const radius = Math.random() * 180 + 90

    const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    cloudGradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.6)')
    cloudGradient.addColorStop(0.7, 'rgba(218, 165, 32, 0.3)')
    cloudGradient.addColorStop(1, 'rgba(218, 165, 32, 0)')

    ctx.fillStyle = cloudGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Atmospheric swirl patterns
  for (let i = 0; i < 20; i++) {
    const centerX = Math.random() * 4096
    const centerY = Math.random() * 2048
    const maxRadius = Math.random() * 150 + 75

    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)'
    ctx.lineWidth = 4
    ctx.beginPath()

    for (let r = 30; r < maxRadius; r += 30) {
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
    }
    ctx.stroke()
  }

  addNoiseToTexture(ctx, normalCtx, roughnessCtx)
}

function createRealisticRocky(ctx: CanvasRenderingContext2D, normalCtx: CanvasRenderingContext2D, roughnessCtx: CanvasRenderingContext2D, baseColor: string) {
  // Rocky planet base
  const gradient = ctx.createRadialGradient(2048, 1024, 0, 2048, 1024, 1500)
  gradient.addColorStop(0, baseColor)
  gradient.addColorStop(0.7, adjustBrightness(baseColor, -40))
  gradient.addColorStop(1, adjustBrightness(baseColor, -80))
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 4096, 2048)

  // Crater details
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 4096
    const y = Math.random() * 2048
    const radius = Math.random() * 80 + 20

    const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    craterGradient.addColorStop(0, adjustBrightness(baseColor, -80))
    craterGradient.addColorStop(0.7, adjustBrightness(baseColor, -40))
    craterGradient.addColorStop(1, adjustBrightness(baseColor, -20))

    ctx.fillStyle = craterGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  addNoiseToTexture(ctx, normalCtx, roughnessCtx)
}