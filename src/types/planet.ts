export interface Planet {
  id: string
  name: string
  position: [number, number, number]
  orbitRadius: number
  orbitSpeed: number
  size: number
  color: string
  emissiveColor?: string
  content: PlanetContent
  texture?: string
  materialProps?: {
    roughness?: number
    metalness?: number
    emissiveIntensity?: number
  }
}

export interface PlanetContent {
  title: string
  subtitle?: string
  sections: ContentSection[]
}

export interface ContentSection {
  type: 'text' | 'skills' | 'projects' | 'timeline' | 'contact'
  title: string
  content: any // Will be typed more specifically per section type
}

export interface Skill {
  name: string
  level: number // 1-5
  category: 'language' | 'framework' | 'tool' | 'concept'
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  image?: string
}

export interface TimelineEntry {
  title: string
  company: string
  period: string
  description: string
  type: 'work' | 'education' | 'achievement'
}

export interface ContactInfo {
  email: string
  github: string
  linkedin: string
  website?: string
}