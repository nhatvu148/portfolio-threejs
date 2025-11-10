// SEO utilities for the 3D portfolio

interface MetaTags {
  title: string
  description: string
  keywords?: string
  author?: string
  image?: string
  url?: string
  type?: string
}

export class SEOManager {
  private static defaultMeta: MetaTags = {
    title: 'Nhật Vũ Nguyễn - 3D Portfolio',
    description: 'Interactive 3D solar system portfolio showcasing software engineering skills, full-stack development, and CAE expertise',
    keywords: '3D portfolio, React, Three.js, Software Engineer, Full Stack, CAE, FEA, TypeScript, Rust, Go',
    author: 'Nhật Vũ Nguyễn',
    type: 'website'
  }

  static updateMetaTags(meta: Partial<MetaTags>) {
    const finalMeta = { ...this.defaultMeta, ...meta }

    // Update title
    document.title = finalMeta.title

    // Update or create meta tags
    this.setMetaTag('description', finalMeta.description)
    this.setMetaTag('keywords', finalMeta.keywords)
    this.setMetaTag('author', finalMeta.author)

    // Open Graph tags
    this.setMetaProperty('og:title', finalMeta.title)
    this.setMetaProperty('og:description', finalMeta.description)
    this.setMetaProperty('og:type', finalMeta.type)
    this.setMetaProperty('og:image', finalMeta.image)
    this.setMetaProperty('og:url', finalMeta.url || window.location.href)

    // Twitter Card tags
    this.setMetaName('twitter:card', 'summary_large_image')
    this.setMetaName('twitter:title', finalMeta.title)
    this.setMetaName('twitter:description', finalMeta.description)
    this.setMetaName('twitter:image', finalMeta.image)

    // Canonical URL
    this.setLinkTag('canonical', finalMeta.url || window.location.href)
  }

  private static setMetaTag(name: string, content?: string) {
    if (!content) return

    let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = name
      document.head.appendChild(tag)
    }
    tag.content = content
  }

  private static setMetaProperty(property: string, content?: string) {
    if (!content) return

    let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('property', property)
      document.head.appendChild(tag)
    }
    tag.content = content
  }

  private static setMetaName(name: string, content?: string) {
    if (!content) return

    let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = name
      document.head.appendChild(tag)
    }
    tag.content = content
  }

  private static setLinkTag(rel: string, href: string) {
    let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement
    if (!tag) {
      tag = document.createElement('link')
      tag.rel = rel
      document.head.appendChild(tag)
    }
    tag.href = href
  }

  // Structured data for SEO
  static setStructuredData(data: any) {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data, null, 2)
    document.head.appendChild(script)
  }

  // Generate person structured data
  static generatePersonStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Nhật Vũ Nguyễn',
      jobTitle: 'Software Engineer',
      description: 'Software Engineer with expertise in full-stack development, CAE integration, and 3D visualization',
      url: window.location.href,
      sameAs: [
        'https://github.com/nhatvu148',
        'https://linkedin.com/in/nhatvu-nguyen'
      ],
      knowsAbout: [
        'Software Engineering',
        'Full Stack Development',
        'React',
        'TypeScript',
        'Three.js',
        'CAE',
        'FEA',
        'Rust',
        'Go'
      ],
      worksOn: [
        {
          '@type': 'SoftwareApplication',
          name: 'CAE WebViewer',
          description: 'Interactive 3D CAE results visualization'
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Digital Twin Project',
          description: 'Real-time industrial digital twin'
        }
      ]
    }
  }

  // Generate website structured data
  static generateWebsiteStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Nhật Vũ Nguyễn - 3D Portfolio',
      description: 'Interactive 3D solar system portfolio showcasing software engineering skills',
      url: window.location.href,
      author: {
        '@type': 'Person',
        name: 'Nhật Vũ Nguyễn'
      },
      about: [
        'Software Engineering',
        'Web Development',
        '3D Visualization',
        'CAE',
        'Full Stack Development'
      ]
    }
  }
}

// Page view tracking
export class Analytics {
  static trackPageView(page: string, title?: string) {
    // Google Analytics 4 page view (if available)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: page,
        page_title: title || document.title
      })
    }

    // Simple console logging for development
    console.log(`Page view: ${page}`)
  }

  static trackEvent(action: string, category: string, label?: string, value?: number) {
    // Google Analytics 4 event (if available)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      })
    }

    // Simple console logging for development
    console.log(`Event: ${action} (${category})`, { label, value })
  }

  static trackPlanetVisit(planetName: string) {
    this.trackEvent('planet_visit', 'navigation', planetName)
  }

  static trackProjectView(projectTitle: string) {
    this.trackEvent('project_view', 'content', projectTitle)
  }

  static trackSkillView(skillName: string) {
    this.trackEvent('skill_view', 'content', skillName)
  }
}