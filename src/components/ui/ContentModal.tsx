import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Mail, Linkedin } from 'lucide-react'
import { usePortfolioStore } from '@store/portfolioStore'
import type { Skill, Project, TimelineEntry } from '../../types/planet'

interface ContentModalProps {
  planetId: string
  onClose: () => void
}

export default function ContentModal({ planetId, onClose }: ContentModalProps) {
  const { planets } = usePortfolioStore()
  const planet = planets.find(p => p.id === planetId)

  if (!planet) return null

  const renderContentSection = (section: any, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </motion.div>
        )

      case 'skills':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.content.map((skill: Skill, skillIndex: number) => (
                <motion.div
                  key={skillIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 + skillIndex * 0.05 }}
                  className="bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-gray-400 text-sm">{skill.category}</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i < skill.level ? 'bg-tech-cyan' : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 'projects':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.content.map((project: Project, projectIndex: number) => (
                <motion.div
                  key={projectIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 + projectIndex * 0.1 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-tech-cyan/20 text-tech-cyan text-xs rounded-full border border-tech-cyan/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 'timeline':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20" />

              <div className="space-y-6">
                {section.content.map((entry: TimelineEntry, entryIndex: number) => (
                  <motion.div
                    key={entryIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 + entryIndex * 0.1 }}
                    className="relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2 w-4 h-4 bg-tech-cyan rounded-full border-2 border-space-blue" />

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{entry.title}</h4>
                        <span className="text-gray-400 text-sm">{entry.period}</span>
                      </div>
                      <p className="text-tech-cyan text-sm mb-2">{entry.company}</p>
                      <p className="text-gray-300 text-sm">{entry.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 'contact':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${section.content.email}`}
                className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-5 h-5 text-tech-cyan" />
                <span className="text-white">{section.content.email}</span>
              </a>

              <a
                href={section.content.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5 text-tech-cyan" />
                <span className="text-white">GitHub</span>
              </a>

              <a
                href={section.content.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-tech-cyan" />
                <span className="text-white">LinkedIn</span>
              </a>

              {section.content.website && (
                <a
                  href={section.content.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-tech-cyan" />
                  <span className="text-white">Website</span>
                </a>
              )}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400, duration: 0.15 }}
          className="relative max-w-4xl w-full max-h-[80vh] bg-space-blue/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {planet.content.title}
                </h2>
                {planet.content.subtitle && (
                  <p className="text-gray-400">{planet.content.subtitle}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Planet indicator */}
            <div className="absolute -bottom-3 left-6">
              <div
                className="w-6 h-6 rounded-full border-2 border-space-blue"
                style={{ backgroundColor: planet.color }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {planet.content.sections.map((section, index) =>
              renderContentSection(section, index)
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}