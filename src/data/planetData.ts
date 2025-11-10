import type { Planet } from '../types/planet'

// Scale matching threejsdemos.com solar system
// Planet sizes: Earth (1.3), Mars (1.0), Jupiter (3.5)
// Orbital distances: Earth (25), Mars (32), Jupiter (50)
// Sun: radius 5
// Camera: position (0, 50, 100), FOV 75°

export const planetData: Planet[] = [
  {
    id: 'aerospace',
    name: 'Aerospace Engineering',
    position: [0, 0, 0],
    orbitRadius: 8, // Closest orbit - foundation
    orbitSpeed: 4.15, // Fastest rotation - early career
    size: 0.4, // Smallest - starting point
    color: '#8C7853',
    emissiveColor: '#6B5637',
    materialProps: {
      roughness: 0.7,
      metalness: 0.3,
      emissiveIntensity: 0.1
    },
    content: {
      title: 'About Me',
      subtitle: 'Nhat-Vu Nguyen',
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
          content: `• M.Sc Aeronautics and Astronautics (Bandung Institute of Technology)
          • B.Eng Aerospace Engineering (University of Technology, HCMC)
          • Strong foundation in CAE/FEA (Finite Element Analysis)
          • Full-stack development with modern web technologies
          • Passion for creating interactive and visually impressive applications`
        }
      ]
    }
  },
  {
    id: 'technologies',
    name: 'Core Technologies',
    position: [0, 0, 0],
    orbitRadius: 12, // Second orbit
    orbitSpeed: 1.62, // Second fastest
    size: 0.6, // Growing expertise
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
            { name: 'Python', level: 5, category: 'language' as const },
            { name: 'Rust', level: 4, category: 'language' as const },
            { name: 'C++', level: 4, category: 'language' as const },
            { name: 'React.js', level: 5, category: 'framework' as const },
            { name: 'Angular', level: 4, category: 'framework' as const },
            { name: 'Node.js', level: 5, category: 'framework' as const },
            { name: 'gRPC', level: 4, category: 'framework' as const }
          ]
        },
        {
          type: 'skills',
          title: 'Specializations',
          content: [
            { name: 'Full Stack Development', level: 5, category: 'concept' as const },
            { name: 'AI Engineering', level: 4, category: 'concept' as const },
            { name: 'AI Agents', level: 4, category: 'concept' as const },
            { name: 'RESTful API', level: 5, category: 'concept' as const },
            { name: 'PostgreSQL', level: 4, category: 'tool' as const },
            { name: 'MongoDB', level: 4, category: 'tool' as const },
            { name: 'Docker', level: 4, category: 'tool' as const },
            { name: 'Nginx', level: 4, category: 'tool' as const }
          ]
        }
      ]
    }
  },
  {
    id: 'technostar',
    name: 'TechnoStar CAE',
    position: [0, 0, 0],
    orbitRadius: 18, // Third orbit - foundational career
    orbitSpeed: 1.0, // Standard speed
    size: 0.8, // Growing size
    color: '#4A90E2',
    emissiveColor: '#2E5FCC',
    materialProps: {
      roughness: 0.6,
      metalness: 0.1,
      emissiveIntensity: 0.1
    },
    content: {
      title: 'CAE Software Engineer (2019-2022)',
      subtitle: 'TechnoStar Co., Ltd - Tokyo, Japan',
      sections: [
        {
          type: 'text',
          title: 'Key Achievements',
          content: `• Enhanced CAE/CAD model rendering capabilities by leading web technology adoption
          • Advanced Digital Twin projects in Automotive and Maritime industries
          • Optimized debugging processes with VSCode extensions and Python packages
          • Built automation tools using C# and PowerShell
          • Streamlined source control with GitLab CI/CD
          • Developed GUI Automation testing framework`
        },
        {
          type: 'projects',
          title: 'Major Projects',
          content: [
            {
              title: 'CAE WebViewer',
              description: '3D and 2D engineering data visualization web apps using C3 SDK, WebGL, Socket.io',
              technologies: ['React.js', 'WebGL', 'Socket.io', 'Ceetron C3 SDK'],
              github: 'https://github.com/nhatvu148'
            },
            {
              title: 'Digital Twin Project',
              description: 'Real-time ship structure data visualization and analysis platform',
              technologies: ['Socket.io', 'React.js', 'Chart.js', 'Mapbox'],
              github: 'https://github.com/nhatvu148'
            },
            {
              title: 'Maritime Research Web App',
              description: 'Real-time research analysis interface with gRPC and ParaView integration',
              technologies: ['gRPC', 'React.js', 'Chart.js', 'ParaView'],
              github: 'https://github.com/nhatvu148'
            },
            {
              title: 'Report Maker',
              description: 'Employee daily report submission and visualization system',
              technologies: ['React.js', 'Node.js', 'MySQL'],
              github: 'https://github.com/nhatvu148'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'abbeal',
    name: 'Abbeal & Astraea',
    position: [0, 0, 0],
    orbitRadius: 24, // Fourth orbit
    orbitSpeed: 0.8, // Slightly slower
    size: 0.9, // Growing experience
    color: '#CD5C5C',
    emissiveColor: '#B22222',
    materialProps: {
      roughness: 0.8,
      metalness: 0.15,
      emissiveIntensity: 0.12
    },
    content: {
      title: 'Software Engineer Journey (2022)',
      subtitle: 'Abbeal K.K. & Astraea Software Co., Ltd - Tokyo, Japan',
      sections: [
        {
          type: 'text',
          title: 'Abbeal K.K. (06/2022 - 11/2022)',
          content: `• Enhanced user experience with Angular and React frontend features
          • Designed and implemented RESTful APIs for seamless communication
          • Maintained high code quality through rigorous code reviews
          • Improved customer satisfaction by troubleshooting production issues
          • Developed automated testing suites for reliable software`
        },
        {
          type: 'text',
          title: 'Astraea Software (11/2022 - 02/2023)',
          content: `• Developed virtual testing and simulation software for manufacturers
          • Provided cost-effective CAE technology solutions for SMEs
          • Empowered clients through education and consulting
          • Collaborated on custom software solutions
          • Ensured high-quality delivery through rigorous testing`
        },
        {
          type: 'projects',
          title: 'Sollective Project',
          content: [
            {
              title: 'Sollective Platform',
              description: 'Full-stack development project at Abbeal',
              technologies: ['React.js', 'Node.js', 'PostgreSQL', 'RESTful API'],
              github: 'https://github.com/nhatvu148'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'akselos',
    name: 'Akselos S.A.',
    position: [0, 0, 0],
    orbitRadius: 30, // Fifth orbit
    orbitSpeed: 0.6, // Moderate speed
    size: 1.1, // Larger - significant role
    color: '#DAA520',
    emissiveColor: '#B8860B',
    materialProps: {
      roughness: 0.4,
      metalness: 0.3,
      emissiveIntensity: 0.2
    },
    content: {
      title: 'Software Engineer (01/2023 - 06/2023)',
      subtitle: 'Akselos S.A. - Switzerland (Remote)',
      sections: [
        {
          type: 'text',
          title: 'Key Contributions',
          content: `• Developed time-recorder web app using Next.js and Rust with PostgreSQL
          • Enhanced productivity with intuitive UI components and dashboard
          • Built employee time tracking, task management, and data visualization
          • Ensured seamless integration and compliance with company standards
          • Implemented features for exporting reports in various formats`
        },
        {
          type: 'projects',
          title: 'Akselos Projects',
          content: [
            {
              title: 'Time Recorder Application',
              description: 'Next.js and Rust web app with PostgreSQL for reliable time tracking',
              technologies: ['Next.js', 'Rust', 'PostgreSQL', 'UI Components'],
              github: 'https://github.com/nhatvu148'
            },
            {
              title: 'Service Time Estimate',
              description: 'Service time estimation tool for enhanced project management',
              technologies: ['Next.js', 'Rust', 'PostgreSQL'],
              github: 'https://github.com/nhatvu148'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'simcel',
    name: 'SIMCEL (Current)',
    position: [0, 0, 0],
    orbitRadius: 36, // Sixth orbit - current role
    orbitSpeed: 0.4, // Slower - established
    size: 1.3, // Largest - senior role
    color: '#F4E7D1',
    emissiveColor: '#E6D4A1',
    materialProps: {
      roughness: 0.5,
      metalness: 0.25,
      emissiveIntensity: 0.18
    },
    content: {
      title: 'Senior Full Stack Engineer (02/2023 - Present)',
      subtitle: 'SIMCEL - Singapore (Remote)',
      sections: [
        {
          type: 'text',
          title: 'Senior Responsibilities',
          content: `• Ensuring high-quality standards throughout development process
          • Contributing to design, implementation, and maintenance of core product features
          • Enhancing codebase quality through rigorous code reviews and refactoring
          • Driving value by facilitating cross-departmental collaboration
          • Translating complex Supply Chain knowledge into actionable code specifications
          • Unlocking growth opportunities by integrating data intelligence into products`
        },
        {
          type: 'projects',
          title: 'Current Projects',
          content: [
            {
              title: 'SIMCEL Platform',
              description: 'Core product development with focus on supply chain and data intelligence',
              technologies: ['React.js', 'Node.js', 'Data Intelligence', 'Supply Chain'],
              link: 'https://nhatvu148.dev'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'education',
    name: 'Education Journey',
    position: [0, 0, 0],
    orbitRadius: 42, // Seventh orbit
    orbitSpeed: 0.3, // Slow - foundational
    size: 1.0, // Medium size
    color: '#4FD0E7',
    emissiveColor: '#3CB4CC',
    materialProps: {
      roughness: 0.6,
      metalness: 0.2,
      emissiveIntensity: 0.15
    },
    content: {
      title: 'Academic Background',
      sections: [
        {
          type: 'timeline',
          title: 'Educational Journey',
          content: [
            {
              title: 'M.Sc of Aeronautics and Astronautics',
              company: 'Bandung Institute of Technology',
              period: '08/2015 - 07/2017',
              description: 'GPA: 3.96/4.0. Research on sheet metal forming impact on thin-walled beams using LS-Dyna.',
              type: 'education' as const
            },
            {
              title: 'B.Eng of Aerospace Engineering',
              company: 'University of Technology, HCMC',
              period: '09/2010 - 10/2014',
              description: 'GPA: 8.26/10.0. Research on crushing behaviors of foam-filled cylindrical columns.',
              type: 'education' as const
            },
            {
              title: 'Product Development Engineer',
              company: 'Bosch Automotive R&D Center',
              period: '01/2018 - 07/2018',
              description: 'Worked on Push Belt products for CVT automobiles, simulation models, and Abaqus CAE.',
              type: 'work' as const
            }
          ]
        },
        {
          type: 'text',
          title: 'Research Publications',
          content: `• Co-authored publication on sheet metal forming impact analysis
          • Advanced understanding of bending crush analysis
          • Developed automation scripts with PowerShell and MATLAB
          • Utilized LS-Dyna, MATLAB, Excel/VBA for data analysis`
        }
      ]
    }
  },
  {
    id: 'achievements',
    name: 'Achievements & Recognition',
    position: [0, 0, 0],
    orbitRadius: 48, // Eighth orbit
    orbitSpeed: 0.2, // Very slow - accomplishments
    size: 0.9, // Medium-large
    color: '#4B70DD',
    emissiveColor: '#2E5AA5',
    materialProps: {
      roughness: 0.6,
      metalness: 0.2,
      emissiveIntensity: 0.15
    },
    content: {
      title: 'Professional Recognition',
      sections: [
        {
          type: 'text',
          title: 'Technical Excellence',
          content: `• ORCID: 0000-0000-0000-000X - Research Identity
          • Co-authored research publication on impact analysis
          • GPA: 3.96/4.0 in Master\'s program
          • GPA: 8.26/10.0 in Bachelor\'s program
          • Multiple successful full-stack projects delivered
          • Expertise bridging Aerospace Engineering and Software Development`
        },
        {
          type: 'text',
          title: 'Skills Mastery',
          content: `• Advanced CAE/FEA analysis (LS-Dyna, Abaqus)
          • Full-stack web development (React, Node.js, Rust)
          • AI Engineering and AI Agents development
          • Database design (PostgreSQL, MongoDB)
          • DevOps and containerization (Docker, CI/CD)
          • Cross-functional collaboration and mentoring`
        }
      ]
    }
  },
  {
    id: 'future',
    name: 'Future Vision',
    position: [0, 0, 0],
    orbitRadius: 54, // Ninth and outermost orbit
    orbitSpeed: 0.1, // Slowest - future oriented
    size: 0.7, // Smaller but visible
    color: '#D2B48C',
    emissiveColor: '#A0826D',
    materialProps: {
      roughness: 0.8,
      metalness: 0.2,
      emissiveIntensity: 0.1
    },
    content: {
      title: 'Professional Vision & Goals',
      sections: [
        {
          type: 'text',
          title: 'Career Aspirations',
          content: `• Continue innovating at the intersection of AI Engineering and full-stack development
          • Lead development of cutting-edge software solutions
          • Expand expertise in AI Agents and advanced AI applications
          • Contribute to open-source projects and technical communities
          • Mentor emerging developers and share knowledge`
        },
        {
          type: 'contact',
          title: 'Connect & Collaborate',
          content: {
            email: 'nhatvu148@gmail.com',
            github: 'https://github.com/nhatvu148',
            linkedin: 'https://linkedin.com/in/van-nhat-vu-nguyen',
            website: 'https://nhatvu148.dev'
          }
        }
      ]
    }
  }
]