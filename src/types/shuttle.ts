import * as THREE from 'three'

export interface ShuttleState {
  position: THREE.Vector3
  targetPosition?: THREE.Vector3
  rotation: THREE.Euler
  targetRotation?: THREE.Euler
  isMoving: boolean
  targetPlanet?: string
  trail: TrailPoint[]
}

export interface TrailPoint {
  position: THREE.Vector3
  timestamp: number
  opacity: number
}

export interface ShuttleProps {
  state: ShuttleState
  onReachTarget: () => void
}