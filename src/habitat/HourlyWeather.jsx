import { useMemo } from 'react';
import { motion } from 'framer-motion';

const weatherIcons = {
  'sunny': 'Sun',
  'mostly_sunny': 'Sun',
  'partly_cloudy': 'Cloud',
  'cloudy': 'Overcast',
  'foggy': 'Fog',
  'rain': 'Rain',
  'light_rain': 'Rain',
  'snow': 'Snow',
  'storm': 'Storm',
  'unknown': '?',
};

function getOutdoorRating(hourData, currentHour) {
  const { temp, precipChance, level, isGoodForHiking } = hourData;
  
  // Don't recommend hours that have passed
  if (hourData.hour < currentHour) return null;
  
  // Storm = avoid
  if (level === 'storm') return { rating: 'avoid', label: 'Storm', color: 'bg-terra/20 border-terra/40', textColor: 'text-terra' };
  
  // Heavy rain = avoid
  if (level === 'rain' && precipChance > 60) return { rating: 'avoid', label: 'Rain likely', color: 'bg-terra/20 border-terra/40', textColor: 'text-terra' };
  
  // Hot = caution
  if (level === 'hot' || level === 'extreme-heat') {
    if (hourData.hour < 10) return { rating: 'good', label: 'Best now', color: 'bg-olive/20 border-olive/40', textColor: 'text-olive' };
    return { rating: 'later', label: 'Too hot', color: 'bg-terra/10 border-terra/30', textColor: 'text-terra' };
  }
  
  // Cold = caution
  if (level === 'cold' || level === 'extreme-cold') {
    if (temp < 35) return { rating: 'avoid', label: 'Too cold', color: 'bg-terra/20 border-terra/40', textColor: 'text-terra' };
    return { rating: 'okay', label: 'Bundle up', color: 'bg-gold/20 border-gold/40', textColor: 'text-gold' };
  }
  
  // Rain chance
  if (precipChance > 70) return { rating: 'later', label: `${precipChance}% rain`, color: 'bg-terra/10 border-terra/30', textColor: 'text-terra' };
  if (precipChance > 40) return { rating: 'okay', label: `${precipChance}% precip`, color: 'bg-gold/20 border-gold/40', textColor: 'text-gold' };
  
  // Good conditions
  if (isGoodForHiking && temp >= 55 && temp <= 80) {
    return { rating: 'best', label: 'Perfect!', color: 'bg-olive/20 border-olive/40', textColor: 'text-olive' };
  }
  
  if (isGoodForHiking) {
    return { rating: 'good', label: 'Good', color: 'bg-olive/10 border-olive/30', textColor: 'text-olive' };
  }
  
  return { rating: 'okay', label: 'Okay', color: 'bg-slate/10 border-slate/20', textColor: 'text-slate' };
}

export default function HourlyWeather({ hourly, currentHour }) {
  const currentHourNum = currentHour || new Date().getHours();
  
  const hourlyWithRatings = useMemo(() => {
    return hourly.map(h => ({
      ...h,
      rating: getOutdoorRating(h, currentHourNum),
    }));
  }, [hourly, currentHourNum]);
  
  // Find best windows
  const bestWindows = useMemo(() => {
    const windows = [];
    let currentWindow = null;
    
    hourlyWithRatings.forEach((hour, i) => {
      if (!hour.rating) return;
      
      if (hour.rating.rating === 'best' || hour.rating.rating === 'good') {
        if (!currentWindow) {
          currentWindow = { start: hour.hour, startLabel: hour.hourLabel, rating: hour.rating.rating };
        }
        currentWindow.end = hour.hour;
        currentWindow.endLabel = hour.hourLabel;
      } else if (currentWindow) {
        windows.push(currentWindow);
        currentWindow = null;
      }
    });
    
    if (currentWindow) {
      windows.push(currentWindow);
    }
    
    return windows;
  }, [hourlyWithRatings]);
  
  // Get recommendation
  const recommendation = useMemo(() => {
    if (hourlyWithRatings.length === 0) return null;
    
    // Find next good hour
    const nextGood = hourlyWithRatings.find(h => 
      h.rating && (h.rating.rating === 'best' || h.rating.rating === 'good') && h.hour >= currentHourNum
    );
    
    // Find next best window
    const nextBest = bestWindows.find(w => {
      const windowStart = hourlyWithRatings.find(h => h.hourLabel === w.startLabel);
      return windowStart && windowStart.hour >= currentHourNum;
    });
    
    if (nextBest) {
      return {
        type: 'window',
        message: nextBest.startLabel === nextBest.endLabel 
          ? `Go at ${nextBest.startLabel}`
          : `Best window: ${nextBest.startLabel} – ${nextBest.endLabel}`,
        icon: '⏰',
      };
    }
    
    if (nextGood) {
      return {
        type: 'hour',
        message: `Next good time: ${nextGood.hourLabel} (${nextGood.temp}°F, ${nextGood.rating.label})`,
        icon: 'Sun',
      };
    }
    
    // Check for rain
    const nextRain = hourlyWithRatings.find(h => 
      h.rating && h.rating.rating === 'avoid' && h.hour >= currentHourNum
    );
    
    if (nextRain) {
      return {
        type: 'wait',
        message: `Weather changes around ${nextRain.hourLabel} - go before then`,
        icon: 'Clock',
      };
    }
    
    return null;
  }, [hourlyWithRatings, bestWindows, currentHourNum]);
  
  if (hourly.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-inkll/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium text-ember uppercase tracking-widest mb-1">
            Today's Outdoor Timing
          </p>
          <h3 className="font-serif text-2xl text-ink italic">
            When to head outside
          </h3>
        </div>
        {recommendation && (
          <div className="bg-olive/10 rounded-2xl px-4 py-3 text-center">
            <span className="text-2xl">{recommendation.icon}</span>
            <p className="font-sans text-sm text-olive font-medium mt-1">
              {recommendation.message}
            </p>
          </div>
        )}
      </div>
      
      {/* Hourly Grid */}
      <div className="overflow-x-auto pb-2 mb-6">
        <div className="flex gap-2 min-w-max">
          {hourlyWithRatings.filter(h => h.hour >= currentHourNum).slice(0, 8).map((hour, i) => (
            <motion.div
              key={hour.hour}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`
                w-20 rounded-xl p-3 text-center border
                ${hour.rating?.color || 'bg-cream border-inkll/20'}
                ${i === 0 ? 'ring-2 ring-ember ring-offset-2' : ''}
              `}
            >
              <p className={`font-sans text-xs ${hour.rating?.textColor || 'text-inkl'}`}>
                {hour.hourLabel}
              </p>
              <p className="text-2xl my-1">
                {weatherIcons[hour.emoji] || '❓'}
              </p>
              <p className="font-sans text-sm font-medium text-ink">
                {hour.temp}°F
              </p>
              <p className="font-sans text-xs text-inkl mt-1">
                {hour.precipChance}%
              </p>
              {hour.rating && (
                <p className={`font-sans text-xs font-medium mt-2 ${hour.rating.textColor}`}>
                  {hour.rating.label}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Best Windows Summary */}
      {bestWindows.length > 0 && (
        <div className="bg-cream/60 rounded-xl p-4">
          <p className="font-sans text-sm text-inkl mb-3">Best windows for your family:</p>
          <div className="flex flex-wrap gap-2">
            {bestWindows.slice(0, 3).map((window, i) => (
              <div key={i} className="bg-olive/10 border border-olive/30 rounded-full px-4 py-2">
                <p className="font-sans text-sm text-olive font-medium">
                  {window.startLabel === window.endLabel 
                    ? window.startLabel 
                    : `${window.startLabel} – ${window.endLabel}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Tips based on weather */}
      {hourlyWithRatings[0] && (
        <div className="mt-4 pt-4 border-t border-inkll/20">
          <p className="font-sans text-xs text-inkl">
            {hourlyWithRatings[0].level === 'hot' && "💡 Pro tip: Early morning is coolest - pack extra water!"}
            {hourlyWithRatings[0].level === 'drizzle' && "💡 Light rain won't stop the fun - waterproof layers work!"}
            {hourlyWithRatings[0].level === 'perfect' && "💡 Perfect conditions - get out there and enjoy!"}
            {hourlyWithRatings[0].level === 'cloudy' && "Overcast = no sunburn risk and comfortable temps"}
            {hourlyWithRatings[0].precipChance > 50 && hourlyWithRatings[0].level !== 'rain' && "💡 Rain possible later - timing matters today"}
          </p>
        </div>
      )}
    </motion.div>
  );
}
