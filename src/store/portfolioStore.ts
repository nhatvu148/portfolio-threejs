import { create } from 'zustand'
import * as THREE from 'three'
import type { Planet } from '../types/planet'
import type { ShuttleState } from '../types/shuttle'
import type { NavigationState, CameraState } from '../types/navigation'

interface PortfolioState extends NavigationState {
  planets: Planet[]
  shuttle: ShuttleState
  camera: CameraState
  selectedPlanet: string | null
  hoveredPlanet: string | null

  // Actions
  setPlanets: (planets: Planet[]) => void
  setCurrentPlanet: (planetId: string | null) => void
  setModalOpen: (open: boolean) => void
  setActiveContent: (content: string | null) => void
  setSelectedPlanet: (planetId: string | null) => void
  setHoveredPlanet: (planetId: string | null) => void
  moveShuttleToPlanet: (planetId: string, targetPosition: THREE.Vector3, targetRotation: THREE.Euler) => void
  updateShuttlePosition: (position: THREE.Vector3) => void
  updateShuttleRotation: (rotation: THREE.Euler) => void
  addTrailPoint: (position: THREE.Vector3) => void
  updateTrail: () => void
  setCamera: (camera: Partial<CameraState>) => void
  resetShuttle: () => void
}

const initialShuttleState: ShuttleState = {
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  isMoving: false,
  trail: []
}

const initialCameraState: CameraState = {
  position: [0, 5, 20],
  target: [0, 0, 0],
  zoom: 1
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  // Navigation state
  currentPlanet: null,
  isTransitioning: false,
  modalOpen: false,
  activeContent: null,

  // 3D state
  planets: [],
  shuttle: initialShuttleState,
  camera: initialCameraState,
  selectedPlanet: null,
  hoveredPlanet: null,

  // Actions
  setPlanets: (planets) => set({ planets }),

  setCurrentPlanet: (planetId) => set({
    currentPlanet: planetId,
    isTransitioning: !!planetId
  }),

  setModalOpen: (open) => set({ modalOpen: open }),

  setActiveContent: (content) => set({ activeContent: content }),

  setSelectedPlanet: (planetId) => set({ selectedPlanet: planetId }),

  setHoveredPlanet: (planetId) => set({ hoveredPlanet: planetId }),

  moveShuttleToPlanet: (planetId, targetPosition, targetRotation) => set((state) => ({
    shuttle: {
      ...state.shuttle,
      targetPosition,
      targetRotation,
      isMoving: true,
      targetPlanet: planetId
    }
  })),

  updateShuttlePosition: (position) => set((state) => ({
    shuttle: {
      ...state.shuttle,
      position
    }
  })),

  updateShuttleRotation: (rotation) => set((state) => ({
    shuttle: {
      ...state.shuttle,
      rotation
    }
  })),

  addTrailPoint: (position) => set((state) => ({
    shuttle: {
      ...state.shuttle,
      trail: [...state.shuttle.trail, {
        position: position.clone(),
        timestamp: Date.now(),
        opacity: 1.0
      }].slice(-20) // Keep last 20 points
    }
  })),

  updateTrail: () => set((state) => {
    const now = Date.now()
    const updatedTrail = state.shuttle.trail
      .map(point => ({
        ...point,
        opacity: Math.max(0, 1.0 - (now - point.timestamp) / 2000) // Fade over 2 seconds
      }))
      .filter(point => point.opacity > 0)

    return {
      shuttle: {
        ...state.shuttle,
        trail: updatedTrail
      }
    }
  }),

  setCamera: (cameraUpdate) => set((state) => ({
    camera: { ...state.camera, ...cameraUpdate }
  })),

  resetShuttle: () => set({
    shuttle: initialShuttleState,
    currentPlanet: null,
    isTransitioning: false
  })
}))