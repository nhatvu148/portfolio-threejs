export interface NavigationState {
  currentPlanet: string | null
  isTransitioning: boolean
  modalOpen: boolean
  activeContent: string | null
}

export interface CameraState {
  position: [number, number, number]
  target: [number, number, number]
  zoom: number
}