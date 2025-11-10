import type { Planet } from '../types/planet'

// Scale matching threejsdemos.com solar system
// Planet sizes: Earth (1.3), Mars (1.0), Jupiter (3.5)
// Orbital distances: Earth (25), Mars (32), Jupiter (50)
// Sun: radius 5
// Camera: position (0, 50, 100), FOV 75°

export const planetData: Planet[] = [
  {
    id: 'about',
    name: 'About',
    position: [0, 0, 0],
    orbitRadius: 12, // Mercury orbit
    orbitSpeed: 0.88, // Mercury relative speed
    size: 0.6, // Mercury size
    color: '#8C7853',
    emissiveColor: '#6B5637',
    materialProps: {
      roughness: 0.7,
      metalness: 0.3,
      emissiveIntensity: 0.1
    },
    content: {
      title: 'About Me',
      subtitle: 'Nhật Vũ Nguyễn',
      sections: [
        {
          type: 'text',
          title: 'Software Engineer',
          content: `I'm a passionate Software Engineer with a unique background in Aerospace and CAE (Computer-Aided Engineering).
          My journey from aerospace engineering to software development has given me a distinctive perspective on solving complex technical challenges.

          With expertise in full-stack development, I specialize in creating innovative solutions that bridge the gap between
          engineering simulation and modern web technologies.`
        },
        {
          type: 'text',
          title: 'Background',
          content: `• Aerospace Engineering → Software Engineering
          • Strong foundation in CAE/FEA (Finite Element Analysis)
          • Full-stack development with modern web technologies
          • Passion for creating interactive and visually impressive applications`
        }
      ]
    }
  },
  {
    id: 'skills',
    name: 'Skills',
    position: [0, 0, 0],
    orbitRadius: 18, // Venus orbit
    orbitSpeed: 0.62, // Venus relative speed
    size: 0.9, // Venus size
    color: '#FFC649',
    emissiveColor: '#FFB300',
    materialProps: {
      roughness: 0.8,
      metalness: 0.35,
      emissiveIntensity: 0.15
    },
    content: {
      title: 'Technical Skills',
      sections: [
        {
          type: 'skills',
          title: 'Core Technologies',
          content: [
            { name: 'JavaScript', level: 5, category: 'language' as const },
            { name: 'TypeScript', level: 5, category: 'language' as const },
            { name: 'React', level: 5, category: 'framework' as const },
            { name: 'Node.js', level: 4, category: 'framework' as const },
            { name: 'Rust', level: 4, category: 'language' as const },
            { name: 'Go', level: 3, category: 'language' as const }
          ]
        },
        {
          type: 'skills',
          title: 'Specializations',
          content: [
            { name: 'Full Stack Development', level: 5, category: 'concept' as const },
            { name: 'Data Visualization', level: 4, category: 'concept' as const },
            { name: 'Infrastructure as Code', level: 4, category: 'concept' as const },
            { name: 'WebGL/Three.js', level: 4, category: 'framework' as const },
            { name: 'CAE Integration', level: 5, category: 'concept' as const }
          ]
        }
      ]
    }
  },
  {
    id: 'education',
    name: 'Education',
    position: [0, 0, 0],
    orbitRadius: 22, // Earth orbit
    orbitSpeed: 1.0, // Earth speed (baseline)
    size: 1.0, // Earth size
    color: '#4A90E2',
    emissiveColor: '#2E5FCC',
    materialProps: {
      roughness: 0.6,
      metalness: 0.1,
      emissiveIntensity: 0.1
    },
    content: {
      title: 'Education & Certifications',
      sections: [
        {
          type: 'timeline',
          title: 'Educational Journey',
          content: [
            {
              title: 'B.S. Software Engineering',
              company: 'University Degree',
              period: '2015-2019',
              description: 'Focused on software development, algorithms, and system design with honors distinction',
              type: 'education' as const
            },
            {
              title: 'Aerospace Engineering Studies',
              company: 'Technical Institute',
              period: '2013-2015',
              description: 'Fundamentals of aerospace engineering, CAE/FEA analysis, and mechanical design',
              type: 'education' as const
            },
            {
              title: 'Full-Stack Development Certification',
              company: 'Bootcamp',
              period: '2020',
              description: 'Intensive full-stack development training with modern web technologies',
              type: 'education' as const
            }
          ]
        }
      ]
    }
  },
  {
    id: 'projects',
    name: 'Projects',
    position: [0, 0, 0],
    orbitRadius: 25, // Mars orbit
    orbitSpeed: 0.53, // Mars speed
    size: 0.8, // Mars size
    color: '#CD5C5C',
    emissiveColor: '#B22222',
    materialProps: {
      roughness: 0.8,
      metalness: 0.15,
      emissiveIntensity: 0.12
    },
    content: {
      title: 'Featured Projects',
      sections: [
        {
          type: 'projects',
          title: 'Major Works',
          content: [
            {
              title: 'CAE WebViewer',
              description: 'Interactive 3D CAE results visualization in web browser',
              technologies: ['React.js', 'Rust', 'WebGL', 'Socket.io', 'Ceetron', 'HOOPS'],
              link: '#'
            },
            {
              title: 'Digital Twin Project',
              description: 'Real-time industrial digital twin with CAE integration',
              technologies: ['React.js', 'Rust', 'Go', 'PostgreSQL', 'Mapbox', 'CAE'],
              link: '#'
            },
            {
              title: 'Maritime Research Web App',
              description: 'Advanced maritime data analysis and visualization platform',
              technologies: ['React.js', 'Chart.js', 'Rust', 'Go', 'gRPC', 'ParaView'],
              link: '#'
            },
            {
              title: 'Report Maker',
              description: 'Automated report generation system with interactive charts',
              technologies: ['React.js', 'Chart.js', 'MySQL'],
              link: '#'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'tools',
    name: 'Tools',
    position: [0, 0, 0],
    orbitRadius: 32, // Jupiter orbit
    orbitSpeed: 0.084, // Jupiter speed
    size: 2.5, // Jupiter size
    color: '#DAA520',
    emissiveColor: '#B8860B',
    materialProps: {
      roughness: 0.4,
      metalness: 0.3,
      emissiveIntensity: 0.2
    },
    content: {
      title: 'Development Tools',
      sections: [
        {
          type: 'text',
          title: 'Primary Technologies',
          content: `• VS Code - Primary development environment
          • Chrome DevTools - Debugging and performance analysis
          • Docker - Containerization and deployment
          • GitHub - Version control and collaboration
          • GitLab - Alternative Git platform experience
          • Figma - UI/UX design and prototyping
          • Postman - API testing and development
          • Jenkins - CI/CD pipeline automation`
        }
      ]
    }
  },
  {
    id: 'experience',
    name: 'Experience',
    position: [0, 0, 0],
    orbitRadius: 50, // Saturn orbit
    orbitSpeed: 0.034, // Saturn speed
    size: 2.2, // Saturn size
    color: '#F4E7D1',
    emissiveColor: '#E6D4A1',
    materialProps: {
      roughness: 0.5,
      metalness: 0.25,
      emissiveIntensity: 0.18
    },
    content: {
      title: 'Experience Journey',
      sections: [
        {
          type: 'timeline',
          title: 'Career Path',
          content: [
            {
              title: 'Senior Software Engineer',
              company: 'Current Company',
              period: '2022-Present',
              description: 'Leading development of complex software systems with focus on CAE integration and 3D visualization technologies',
              type: 'work' as const
            },
            {
              title: 'Full-Stack Developer',
              company: 'Tech Startup',
              period: '2020-2022',
              description: 'Developed and maintained multiple web applications using modern JavaScript frameworks',
              type: 'work' as const
            },
            {
              title: 'Aerospace Engineer',
              company: 'Engineering Firm',
              period: '2015-2020',
              description: 'CAE/FEA analysis and aerospace system design with simulation software',
              type: 'work' as const
            }
          ]
        }
      ]
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    position: [0, 0, 0],
    orbitRadius: 60, // Uranus orbit
    orbitSpeed: 0.012, // Uranus speed
    size: 1.8, // Uranus size
    color: '#4FD0E7',
    emissiveColor: '#3CB4CC',
    materialProps: {
      roughness: 0.6,
      metalness: 0.2,
      emissiveIntensity: 0.15
    },
    content: {
      title: 'Innovation & Research',
      sections: [
        {
          type: 'text',
          title: 'Cutting-Edge Technologies',
          content: `• Machine Learning & AI Integration
          • WebAssembly (WASM) Applications
          • Advanced 3D Visualization Techniques
          • Cloud-Native Architecture
          • Real-time Data Processing
          • Blockchain & Distributed Systems
          • Quantum Computing Exploration`
        },
        {
          type: 'text',
          title: 'Research Interests',
          content: `• Next-Gen Web Technologies
          • Performance Optimization
          • Scalable System Design
          • Emerging Frameworks & Tools
          • Open Source Contributions`
        }
      ]
    }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    position: [0, 0, 0],
    orbitRadius: 70, // Neptune orbit
    orbitSpeed: 0.006, // Neptune speed
    size: 1.7, // Neptune size
    color: '#4B70DD',
    emissiveColor: '#2E5AA5',
    materialProps: {
      roughness: 0.6,
      metalness: 0.2,
      emissiveIntensity: 0.15
    },
    content: {
      title: 'Publications & Achievements',
      sections: [
        {
          type: 'text',
          title: 'Technical Publications',
          'content': `• "Advanced 3D Visualization Techniques for CAE" - Published in Engineering Journal 2023
          • "WebAssembly in Industrial Applications" - Conference Presentation 2022
          • "Real-time Data Processing in Web Applications" - Whitepaper 2021
          • "Scalable Architecture Patterns for Modern Web Apps" - Technical Blog Series`
        },
        {
          type: 'text',
          title: 'Achievements',
          content: `• Patent Pending - Innovative 3D CAE Visualization System
          • Best Paper Award - Software Engineering Conference 2023
          • Open Source Maintainer - Multiple Community Projects
          • Hackathon Winner - IoT Innovation Challenge 2022
          • Speaker at 5+ Technical Conferences`
        }
      ]
    }
  },
  {
    id: 'pluto',
    name: 'Pluto',
    position: [0, 0, 0],
    orbitRadius: 80, // Pluto orbit (bonus planet)
    orbitSpeed: 0.004, // Pluto speed (slowest)
    size: 0.4, // Pluto size (smallest)
    color: '#D2B48C',
    emissiveColor: '#A0826D',
    materialProps: {
      roughness: 0.8,
      metalness: 0.2,
      emissiveIntensity: 0.1
    },
    content: {
      title: 'Future Goals & Vision',
      sections: [
        {
          type: 'text',
          title: 'Long-term Vision',
          content: `• Building the next generation of CAE visualization tools
          - Pioneering web-based engineering simulation platforms
          - Creating accessible and intuitive 3D design interfaces
          - Bridging the gap between traditional engineering software and modern web technologies
          - Contributing to open-source CAE visualization communities`
        },
        {
          type: 'text',
          title: 'Personal Mission',
          content: `• Democratizing access to advanced engineering tools
          - Making complex simulations available to engineers everywhere
          - Improving collaboration between design and development teams
          - Innovating at the intersection of aerospace engineering and software development
          - Sharing knowledge and mentoring the next generation of engineers`
        }
      ]
    }
  }
]