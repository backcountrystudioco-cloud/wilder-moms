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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-ember mb-3">Wilder Moms</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            Skills Passport
          </h1>
          <p className="font-sans text-inkl text-base max-w-md mx-auto">
            Your family's outdoor journey, skill by skill.
          </p>
        </motion.header>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 mb-10 border border-inkll/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg text-ink">Journey Progress</h2>
            <p className="font-sans text-xs text-inkll">
              {Object.values(pillarProgress).reduce((sum, p) => sum + (p.earned || 0), 0)} of {Object.values(pillarProgress).reduce((sum, p) => sum + p.total, 0)} skills earned
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {Object.entries(pillars).map(([id, pillar]) => (
              <div key={id} className="text-center">
                <div 
                  className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium"
                  style={{ 
                    backgroundColor: `${pillar.color}15`,
                    color: pillar.color
                  }}
                >
                  {pillar.icon}
                </div>
                <p className="font-sans text-lg font-medium text-ink">
                  {pillarProgress[id]?.earned || 0}/{pillar.skills.length}
                </p>
                <p className="font-sans text-[10px] text-inkll uppercase tracking-wide">{pillar.name}</p>
                {/* Progress bar */}
                <div className="h-0.5 bg-cream rounded-full mt-2 mx-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
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
          className="flex gap-3 mb-8"
        >
          {Object.entries(pillars).map(([id, pillar]) => (
            <button
              key={id}
              onClick={() => setSelectedPillar(id)}
              className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all ${
                selectedPillar === id
                  ? 'text-white shadow-md'
                  : 'bg-white text-ink border border-inkll/20 hover:border-ember/30'
              }`}
              style={selectedPillar === id ? { backgroundColor: pillar.color } : {}}
            >
              {pillar.name}
            </button>
          ))}
        </motion.div>

        {/* Skill Tree */}
        <motion.div
          key={selectedPillar}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 mb-8 border border-inkll/10"
        >
          {/* Pillar Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-inkll/10">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium"
              style={{ backgroundColor: `${currentPillar.color}15`, color: currentPillar.color }}
            >
              {currentPillar.icon}
            </div>
            <div>
              <h3 className="font-serif text-xl text-ink">{currentPillar.name}</h3>
              <p className="font-sans text-sm text-inkll">{currentPillar.description}</p>
            </div>
          </div>

          {/* Skills List - Vertical Path */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-inkll/10" />
            
            <div className="space-y-4">
              {currentPillar.skills.map((skill, index) => {
                const isEarned = earnedSkills.includes(skill.id)
                const isLocked = index > 0 && !earnedSkills.includes(currentPillar.skills[index - 1].id)

                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => !isLocked && setSelectedSkill(skill)}
                    className={`relative p-5 rounded-xl border-2 transition-all duration-200 ${
                      isEarned 
                        ? 'border-green-500/30 bg-green-50/50' 
                        : isLocked 
                          ? 'border-inkll/10 bg-cream/50 cursor-not-allowed'
                          : 'border-inkll/10 hover:border-ember/30 cursor-pointer bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Badge/Level indicator */}
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                          isEarned 
                            ? 'bg-green-500 text-white' 
                            : isLocked
                              ? 'bg-inkll/20 text-inkll'
                              : 'bg-cream text-inkll'
                        }`}
                        style={!isEarned && !isLocked ? { borderColor: currentPillar.color, borderWidth: 2, color: currentPillar.color } : {}}
                      >
                        {skill.badge}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-serif text-base text-ink">{skill.name}</h4>
                          {isEarned && (
                            <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full font-medium uppercase tracking-wide">
                              Earned
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-sm text-inkll">{skill.description}</p>
                        {!isEarned && !isLocked && (
                          <p className="font-sans text-xs text-ember mt-2">Tap to learn how to earn</p>
                        )}
                        {isLocked && (
                          <p className="font-sans text-xs text-inkll mt-2">Complete "{currentPillar.skills[index - 1].name}" first</p>
                        )}
                      </div>

                      {/* Level indicator */}
                      <div className="text-right flex-shrink-0">
                        <span className="font-sans text-[10px] text-inkll uppercase tracking-wide">Level</span>
                        <p className="font-serif text-lg text-ink">{skill.level}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-ink/40 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-cream rounded-3xl p-8 max-w-md w-full shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-medium"
                  style={{ backgroundColor: `${selectedPillar.color}20`, color: selectedPillar.color }}
                >
                  {selectedSkill.badge}
                </div>
                <p className="text-xs text-inkll uppercase tracking-wide mb-1">Level {selectedSkill.level}</p>
                <h3 className="font-serif text-2xl text-ink mb-2">{selectedSkill.name}</h3>
                <p className="font-sans text-sm text-inkll">{selectedSkill.description}</p>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl p-5 mb-6">
                <p className="font-sans text-[10px] text-inkll uppercase tracking-wider mb-3">How to earn this skill</p>
                <ul className="space-y-3">
                  {selectedSkill.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans text-sm text-ink">
                      <span 
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${selectedPillar.color}15`, color: selectedPillar.color }}
                      >
                        {selectedSkill.badge}
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full py-3 rounded-full text-ink font-sans font-medium border border-inkll/20 hover:bg-inkll/5 transition-colors"
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
