import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCraftSuggestions, getSeasonalForageItems } from './craftTrails';
import { trailCrafts } from '../data/craftExtensions';
import { getCurrentSeason } from '../data/seasonalPlants';

const effortColors = {
  quick: 'bg-olive/10 text-olive border-olive/20',
  medium: 'bg-gold/10 text-gold border-gold/20',
  extended: 'bg-ember/10 text-ember border-ember/20',
};

const weatherEmojis = {
  hot: 'Hot',
  extreme_heat: 'Heat',
  drizzle: 'Drizzle',
  'drizzle-cool': 'Rain',
  rain: 'Rain',
  cold: 'Cold',
  snow: 'Snow',
  perfect: 'Great',
  cloudy: 'Cloudy',
  warm: 'Warm',
  default: 'Nature',
};

export default function TrailCraftMoments({ 
  weatherAssessment, 
  timeWindow = 60, 
  hikeCharacter,
  forage = [],
  compact = false 
}) {
  const season = getCurrentSeason();
  const seasonEmoji = { spring: 'Spring', summer: 'Summer', fall: 'Fall', winter: 'Winter' }[season];
  
  const craftSuggestions = useMemo(() => {
    const suggestions = getCraftSuggestions({
      weatherLevel: weatherAssessment?.level || 'default',
      timeWindow,
      hikeCharacter,
      season,
      forage,
    });
    
    return suggestions.map(s => ({
      ...s,
      craft: trailCrafts.find(c => c.id === s.craftId),
    })).filter(s => s.craft);
  }, [weatherAssessment, timeWindow, hikeCharacter, season, forage]);
  
  const seasonalForage = useMemo(() => getSeasonalForageItems(season), [season]);
  
  if (compact) {
    return (
      <div className="space-y-2">
        {craftSuggestions.slice(0, 3).map((suggestion, i) => (
          <Link
            key={suggestion.craftId}
            to={`/basecamp/activities`}
            className="flex items-center gap-3 p-3 bg-cream/60 rounded-xl hover:bg-cream transition-colors"
          >
            <span className="text-lg">C</span>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm text-ink font-medium truncate">
                {suggestion.craft.title}
              </p>
              <p className="font-sans text-xs text-inkl">
                {suggestion.craft.duration}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  
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
            <span className="text-2xl">Craft</span>
            <p className="text-xs font-medium text-ember uppercase tracking-widest">
              Trail Craft Moments
            </p>
          </div>
          <h3 className="font-serif text-2xl text-ink italic">
            Creative breaks for your hike
          </h3>
        </div>
        {weatherAssessment?.level && (
          <div className="text-right">
            <span className="text-3xl">{weatherEmojis[weatherAssessment.level] || weatherEmojis.default}</span>
            <p className="font-sans text-xs text-inkl mt-1">
              Craft-friendly conditions
            </p>
          </div>
        )}
      </div>
      
      {/* Craft Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {craftSuggestions.slice(0, 6).map((suggestion, i) => (
          <motion.div
            key={suggestion.craftId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-cream/60 rounded-xl p-4 border border-inkll/10 hover:border-ember/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-ember font-medium uppercase tracking-wider mb-1">
                  {suggestion.priority === 'primary' && 'Recommended'}
                  {suggestion.priority === 'secondary' && 'Also good'}
                  {suggestion.priority === 'bonus' && 'Trail find'}
                  {suggestion.priority === 'personal' && 'From your collection'}
                </p>
                <h4 className="font-serif text-lg text-ink">{suggestion.craft.title}</h4>
              </div>
            </div>
            
            <p className="text-xs text-inkl mb-3 line-clamp-2">
              {suggestion.craft.instructions.slice(0, 100)}...
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-xs px-2 py-1 rounded-full border ${effortColors[suggestion.craft.effortLevel]}`}>
                {suggestion.craft.effortLabel}
              </span>
              <span className="text-xs text-inkl bg-blush/50 px-2 py-1 rounded-full">
                {suggestion.craft.trailMomentLabel}
              </span>
            </div>
            
            {suggestion.craft.forages.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {suggestion.craft.forages.slice(0, 3).map(f => (
                  <span key={f} className="text-xs bg-olive/10 text-olive px-2 py-0.5 rounded">
                    + {f.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            )}
            
            <Link
              to="/basecamp/activities"
              className="inline-flex items-center gap-1 text-ember text-xs font-medium hover:text-terra transition-colors"
            >
              View full instructions
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* What to Look For (Seasonal Forage) */}
      <div className="border-t border-inkll/20 pt-6">
        <h4 className="font-serif text-lg text-ink mb-4">
          {seasonEmoji} What to look for on your trail right now
        </h4>
        <div className="flex flex-wrap gap-2">
          {seasonalForage.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 px-3 py-2 bg-cream rounded-full text-sm hover:bg-blush/50 transition-colors"
              onClick={() => {
                // Could add to forage collection
              }}
            >
              <span>{item.emoji}</span>
              <span className="font-sans text-ink">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Tips based on weather */}
      {weatherAssessment && (
        <div className="mt-4 pt-4 border-t border-inkll/20">
          <p className="font-sans text-xs text-inkl italic">
            {weatherAssessment.level === 'hot' && "Collect items early, craft in shade during peak heat"}
            {weatherAssessment.level === 'perfect' && "No excuses — this is prime craft time!"}
            {weatherAssessment.level === 'drizzle' && "Find a covered spot for bark rubbings or journaling"}
            {weatherAssessment.level === 'cloudy' && "No sunburn risk — perfect for detailed craft work"}
            {weatherAssessment.level === 'cold' && "Keep hands warm! Craft during rest stops, keep moving between"}
          </p>
        </div>
      )}
    </motion.div>
  );
}
