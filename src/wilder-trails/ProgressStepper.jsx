import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TRAIL_STEPS } from './WilderTrailsContext'

export default function ProgressStepper({ currentStep = 1 }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Connection line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-inkll/20 -z-10" />
        <div 
          className="absolute top-6 left-0 h-0.5 bg-ember -z-10 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />
        
        {TRAIL_STEPS.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id
          
          return (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* Step circle */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-sans font-bold text-sm
                  transition-all duration-300 border-2
                  ${isCompleted 
                    ? 'bg-ember border-ember text-white' 
                    : isCurrent 
                      ? 'bg-cream border-ember text-ember shadow-lg' 
                      : 'bg-cream border-inkll/30 text-inkll'
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.id
                )}
              </motion.div>
              
              {/* Step label */}
              <span className={`
                mt-2 font-sans text-xs text-center max-w-[80px]
                ${isCurrent ? 'text-ember font-medium' : isCompleted ? 'text-ink' : 'text-inkll'}
              `}>
                {step.label}
              </span>
              
              {/* Clickable if completed */}
              {isCompleted && (
                <Link
                  to={step.path}
                  className="absolute inset-0 z-10"
                  aria-label={`Go to ${step.label}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
