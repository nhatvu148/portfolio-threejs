import * as THREE from 'three'

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private frameCount = 0
  private lastTime = 0
  private fps = 60
  private callbacks: ((fps: number) => void)[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  update(currentTime: number) {
    this.frameCount++

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
      this.frameCount = 0
      this.lastTime = currentTime

      // Notify all callbacks
      this.callbacks.forEach(callback => callback(this.fps))
    }
  }

  onFPSUpdate(callback: (fps: number) => void) {
    this.callbacks.push(callback)
  }

  getFPS(): number {
    return this.fps
  }
}

// LOD (Level of Detail) manager
export class LODManager {
  private lodObjects: Map<THREE.Object3D, THREE.Object3D[]> = new Map()
  private camera: THREE.Camera
  private distanceThresholds = [10, 30, 60, 100]

  constructor(camera: THREE.Camera) {
    this.camera = camera
  }

  addLODObject(highDetail: THREE.Object3D, lowDetail: THREE.Object3D[], mediumDetail?: THREE.Object3D) {
    const lods = [highDetail]
    if (mediumDetail) lods.push(mediumDetail)
    lods.push(...lowDetail)

    this.lodObjects.set(highDetail, lods)

    // Initially show only high detail
    lods.forEach((obj, index) => {
      obj.visible = index === 0
    })
  }

  update() {
    this.lodObjects.forEach((lods, highDetail) => {
      const distance = this.camera.position.distanceTo(highDetail.position)
      let lodIndex = 0

      if (distance > this.distanceThresholds[0]) lodIndex = 1
      if (distance > this.distanceThresholds[1]) lodIndex = 2
      if (distance > this.distanceThresholds[2]) lodIndex = 3

      lods.forEach((obj, index) => {
        obj.visible = index === lodIndex
      })
    })
  }
}

// Texture cache and manager
export class TextureManager {
  private static cache = new Map<string, THREE.Texture>()
  private static loadingPromises = new Map<string, Promise<THREE.Texture>>()

  static async loadTexture(url: string): Promise<THREE.Texture> {
    // Return from cache if already loaded
    if (this.cache.has(url)) {
      return this.cache.get(url)!
    }

    // Return existing promise if currently loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!
    }

    // Create new loading promise
    const promise = new Promise<THREE.Texture>((resolve, reject) => {
      const loader = new THREE.TextureLoader()
      loader.load(
        url,
        (texture) => {
          this.cache.set(url, texture)
          this.loadingPromises.delete(url)
          resolve(texture)
        },
        undefined,
        (error) => {
          this.loadingPromises.delete(url)
          reject(error)
        }
      )
    })

    this.loadingPromises.set(url, promise)
    return promise
  }

  static preloadTextures(urls: string[]): Promise<THREE.Texture[]> {
    return Promise.all(urls.map(url => this.loadTexture(url)))
  }

  static disposeTexture(url: string) {
    const texture = this.cache.get(url)
    if (texture) {
      texture.dispose()
      this.cache.delete(url)
    }
  }

  static disposeAll() {
    this.cache.forEach(texture => texture.dispose())
    this.cache.clear()
  }
}

// Memory management utilities
export class MemoryManager {
  private static disposables: (() => void)[] = []

  static addDisposable(dispose: () => void) {
    this.disposables.push(dispose)
  }

  static disposeAll() {
    this.disposables.forEach(dispose => dispose())
    this.disposables = []
  }

  static getMemoryUsage() {
    if ('memory' in performance) {
      return (performance as any).memory
    }
    return null
  }
}

// Geometry factory for reusing geometries
export class GeometryFactory {
  private static geometries = new Map<string, THREE.BufferGeometry>()

  static getSphere(radius: number, widthSegments: number, heightSegments: number): THREE.SphereGeometry {
    const key = `sphere_${radius}_${widthSegments}_${heightSegments}`

    if (!this.geometries.has(key)) {
      this.geometries.set(key, new THREE.SphereGeometry(radius, widthSegments, heightSegments))
    }

    return this.geometries.get(key) as THREE.SphereGeometry
  }

  static getBox(width: number, height: number, depth: number): THREE.BoxGeometry {
    const key = `box_${width}_${height}_${depth}`

    if (!this.geometries.has(key)) {
      this.geometries.set(key, new THREE.BoxGeometry(width, height, depth))
    }

    return this.geometries.get(key) as THREE.BoxGeometry
  }

  static getCone(radius: number, height: number, radialSegments: number): THREE.ConeGeometry {
    const key = `cone_${radius}_${height}_${radialSegments}`

    if (!this.geometries.has(key)) {
      this.geometries.set(key, new THREE.ConeGeometry(radius, height, radialSegments))
    }

    return this.geometries.get(key) as THREE.ConeGeometry
  }

  static disposeAll() {
    this.geometries.forEach(geometry => geometry.dispose())
    this.geometries.clear()
  }
}