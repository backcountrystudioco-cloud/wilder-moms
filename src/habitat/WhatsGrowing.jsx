import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getCurrentSeason, getSeasonalPlants, estimateZone } from '../data/seasonalPlants';

const seasonEmojis = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

const seasonLabels = {
  spring: 'Spring Planting',
  summer: 'Summer Growing',
  fall: 'Fall Garden',
  winter: 'Winter Rest',
};

const typeColors = {
  vegetable: 'bg-olive/10 text-olive',
  herb: 'bg-terra/10 text-terra',
  flower: 'bg-ember/10 text-ember',
  other: 'bg-slate/10 text-slate',
};

export default function WhatsGrowing({ lat, lon }) {
  const zone = useMemo(() => estimateZone(lat), [lat]);
  const seasonal = useMemo(() => getSeasonalPlants(zone), [zone]);
  const season = getCurrentSeason();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-inkll/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{seasonEmojis[season]}</span>
            <p className="text-xs font-medium text-ember uppercase tracking-widest">
              Your USDA Zone: {zone}
            </p>
          </div>
          <h3 className="font-serif text-2xl text-ink italic">
            What's Growing {seasonLabels[season]}
          </h3>
        </div>
      </div>

      {/* Seasonal Description */}
      <p className="text-inkl mb-6 text-sm leading-relaxed">
        {seasonal.description}
      </p>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {seasonal.plants.slice(0, 6).map((plant, i) => (
          <motion.div
            key={plant.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-cream/60 rounded-xl p-4 border border-inkll/10 hover:border-ember/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{plant.emoji}</span>
                <div>
                  <h4 className="font-serif text-ink font-medium">{plant.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[plant.type] || typeColors.other}`}>
                    {plant.type}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-inkl mb-2">
              <span className="font-medium">Plant:</span> {plant.plant}
            </p>
            <p className="text-xs text-inkl mb-2">
              <span className="font-medium">Harvest:</span> {plant.harvest}
            </p>
            <p className="text-xs text-ember/80 italic">{plant.tip}</p>
          </motion.div>
        ))}
      </div>

      {/* Garden Activities */}
      <div className="border-t border-inkll/20 pt-6 mb-6">
        <h4 className="font-serif text-lg text-ink mb-4">Garden Activities Right Now</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {seasonal.activities.map((activity, i) => (
            <div key={activity.name} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blush flex items-center justify-center flex-shrink-0">
                <span className="text-ember text-sm">✓</span>
              </div>
              <div>
                <p className="font-sans text-sm text-ink font-medium">{activity.name}</p>
                <p className="font-sans text-xs text-inkl">{activity.description}</p>
                <p className="font-sans text-xs text-ember mt-1">Ages {activity.ages}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link to Wild Room */}
      <div className="bg-parchment rounded-xl p-4 text-center">
        <p className="text-sm text-inkl mb-2">Want to plan your outdoor space?</p>
        <a
          href="/basecamp#grow"
          className="inline-flex items-center gap-2 text-ember font-medium text-sm hover:text-terra transition-colors"
        >
          Visit the Grow Room for more
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
