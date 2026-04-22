import { useState } from 'react'
import { motion } from 'framer-motion'
import { useJournal } from '../context/JournalContext'
import { pillars, getSkillById } from '../data/skills'

export default function SkillsPassport() {
  const { earnedSkills, pillarProgress } = useJournal()
  const [selectedPillar, setSelectedPillar] = useState('roam')
  const [selectedSkill, setSelectedSkill] = useState(null)

  const currentPillar = pillars[selectedPillar]

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-2">
            Skills Passport
          </h1>
          <p className="font-sans text-inkl text-lg">
            Your family's outdoor journey, skill by skill.
          </p>
        </motion.header>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-8 border border-inkll/10"
        >
          <h2 className="font-serif text-xl text-ink mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(pillars).map(([id, pillar]) => (
              <div key={id} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2" style={{ backgroundColor: `${pillar.color}20` }}>
                  <span className="text-2xl">{pillar.icon}</span>
                </div>
                <p className="font-sans text-2xl font-medium text-ink">
                  {pillarProgress[id]?.earned || 0}/{pillar.skills.length}
                </p>
                <p className="font-sans text-xs text-inkll">{pillar.name}</p>
                {/* Mini progress bar */}
                <div className="h-1.5 bg-cream rounded-full mt-2 mx-4 overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${pillarProgress[id]?.percentage || 0}%`,
                      backgroundColor: pillar.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pillar Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {Object.entries(pillars).map(([id, pillar]) => (
            <button
              key={id}
              onClick={() => setSelectedPillar(id)}
              className={`flex-shrink-0 px-5 py-3 rounded-full font-sans text-sm font-medium transition-all flex items-center gap-2 ${
                selectedPillar === id
                  ? 'text-white shadow-lg'
                  : 'bg-white text-ink hover:bg-ember/10'
              }`}
              style={selectedPillar === id ? { backgroundColor: pillar.color } : {}}
            >
              <span>{pillar.icon}</span>
              <span>{pillar.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Skill Tree */}
        <motion.div
          key={selectedPillar}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 mb-8 border border-inkll/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${currentPillar.color}20` }}
            >
              <span className="text-2xl">{currentPillar.icon}</span>
            </div>
            <div>
              <h3 className="font-serif text-xl text-ink">{currentPillar.name}</h3>
              <p className="font-sans text-sm text-inkll">{currentPillar.description}</p>
            </div>
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            {currentPillar.skills.map((skill, index) => {
              const isEarned = earnedSkills.includes(skill.id)
              const isLocked = index > 0 && !earnedSkills.includes(currentPillar.skills[index - 1].id)

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => !isLocked && setSelectedSkill(skill)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isEarned 
                      ? 'border-green-500 bg-green-50' 
                      : isLocked 
                        ? 'border-inkll/10 bg-cream/50 opacity-50 cursor-not-allowed'
                        : 'border-inkll/10 hover:border-ember/30 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Badge */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
                      isEarned ? 'bg-green-100' : 'bg-cream'
                    }`}>
                      {isEarned ? skill.badge : isLocked ? '🔒' : '○'}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif text-lg text-ink">{skill.name}</h4>
                        {isEarned && (
                          <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
                            Earned
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-sm text-inkl mb-2">{skill.description}</p>
                      {!isEarned && !isLocked && (
                        <p className="font-sans text-xs text-ember">Tap to learn how to earn →</p>
                      )}
                      {isLocked && (
                        <p className="font-sans text-xs text-inkll">Earn "{currentPillar.skills[index - 1].name}" first</p>
                      )}
                    </div>

                    {/* Level */}
                    <div className="text-right">
                      <span className="font-sans text-xs text-inkll">Level {skill.level}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-cream rounded-3xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg">
                  {selectedSkill.badge}
                </div>
                <h3 className="font-serif text-2xl text-ink mb-1">{selectedSkill.name}</h3>
                <p className="font-sans text-inkl">{selectedSkill.description}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 mb-6">
                <p className="font-sans text-xs text-inkll uppercase tracking-wide mb-2">How to earn</p>
                <ul className="space-y-2">
                  {selectedSkill.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 font-sans text-sm text-ink">
                      <span className="text-ember mt-0.5">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full py-3 rounded-full bg-ember text-white font-sans font-medium hover:bg-terra transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
