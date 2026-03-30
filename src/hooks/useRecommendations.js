import { useMemo } from 'react';
import { hikes } from '../data/hikes';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude 1
 * @param {number} lon1 - Longitude 1
 * @param {number} lat2 - Latitude 2
 * @param {number} lon2 - Longitude 2
 * @returns {number} Distance in miles
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get time of day context
 * @returns {string} 'morning', 'afternoon', or 'evening'
 */
function getTimeContext() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

/**
 * Check if weather is good for outdoor activities
 * @param {number} weatherCode - WMO weather code
 * @param {number} tempF - Temperature in Fahrenheit
 * @returns {object} Weather assessment
 */
function assessWeather(weatherCode, tempF) {
  const clearCodes = [0, 1, 2];
  const cloudyCodes = [3, 45, 48];
  const drizzlyCodes = [51, 53, 55, 56, 57, 61, 80, 81];
  const rainyCodes = [63, 65, 66, 67, 82];
  const snowyCodes = [71, 73, 75, 77, 85, 86];
  const stormCodes = [95, 96, 99];

  if (stormCodes.includes(weatherCode)) {
    return { level: 'storm', label: 'Stormy', icon: '⛈️', score: 0, advice: 'Stay safe indoors today' };
  }
  if (snowyCodes.includes(weatherCode)) {
    return { level: 'snow', label: 'Snowy', icon: '❄️', score: 20, advice: 'Perfect for a Base Camp day inside' };
  }
  if (rainyCodes.includes(weatherCode)) {
    return { level: 'rain', label: 'Rainy', icon: '🌧️', score: 30, advice: 'Look for covered trails or save for another day' };
  }
  if (drizzlyCodes.includes(weatherCode)) {
    if (tempF < 50) {
      return { level: 'drizzle-cold', label: 'Drizzly & Cold', icon: '🌧️', score: 40, advice: 'Not ideal for little ones today' };
    }
    return { level: 'drizzle', label: 'Light Drizzle', icon: '🌦️', score: 60, advice: 'Pack rain gear or find shaded trails' };
  }
  if (cloudyCodes.includes(weatherCode)) {
    return { level: 'cloudy', label: 'Cloudy', icon: '☁️', score: 85, advice: 'Great hiking weather - no sun stress!' };
  }
  if (clearCodes.includes(weatherCode)) {
    if (tempF < 40) {
      return { level: 'cold', label: 'Clear but Cold', icon: '🥶', score: 70, advice: 'Bundle up - layers are your friend!' };
    }
    if (tempF > 90) {
      return { level: 'hot', label: 'Hot & Sunny', icon: '🔥', score: 65, advice: 'Seek shade and bring extra water' };
    }
    return { level: 'perfect', label: 'Perfect', icon: '✨', score: 100, advice: 'Ideal conditions for adventure!' };
  }
  return { level: 'unknown', label: 'Unknown', icon: '❓', score: 50, advice: 'Check conditions before heading out' };
}

/**
 * Score a hike based on current conditions and preferences
 */
function scoreHike(hike, userLat, userLon, weather, preferences) {
  let score = 0;
  const reasons = [];

  // Distance score (closer = better, max 50 miles)
  const distance = haversineDistance(userLat, userLon, hike.lat, hike.lon);
  if (distance <= 5) {
    score += 40;
    reasons.push(`${Math.round(distance)} miles away`);
  } else if (distance <= 15) {
    score += 30;
    reasons.push(`${Math.round(distance)} miles away`);
  } else if (distance <= 30) {
    score += 20;
    reasons.push(`${Math.round(distance)} miles away`);
  } else if (distance <= 50) {
    score += 10;
    reasons.push(`${Math.round(distance)} miles away`);
  } else {
    score += 0;
    reasons.push(`${Math.round(distance)} miles away`);
  }

  // Weather suitability
  if (weather.level === 'perfect') {
    score += 20;
    reasons.push('Great weather for any trail');
  } else if (weather.level === 'cloudy') {
    score += 20;
    reasons.push('Overcast skies = perfect hiking');
  } else if (weather.level === 'drizzle') {
    if (hike.shadeLevel === 'high') {
      score += 15;
      reasons.push('Shaded trail handles drizzle well');
    }
    if (hike.hasViews) score += 5;
  } else if (weather.level === 'drizzle-cold') {
    score -= 10;
  } else if (weather.level === 'hot') {
    if (hike.shadeLevel === 'high') {
      score += 15;
      reasons.push('Heavy shade = cool and comfortable');
    }
    if (hike.hasWater) {
      score += 10;
      reasons.push('Water features help everyone cool down');
    }
  } else if (weather.level === 'cold') {
    if (hike.shadeLevel === 'low') {
      score += 10;
      reasons.push('Sunny trail keeps you warm');
    }
    if (hike.hasWater) {
      score -= 5;
    }
  } else if (weather.level === 'rain' || weather.level === 'snow') {
    score -= 20;
    reasons.push('Consider indoor activities today');
  } else if (weather.level === 'storm') {
    score = 0;
    reasons.push('Not safe for outdoor hiking today');
  }

  // Duration suitability based on time of day
  const timeContext = getTimeContext();
  const maxDuration = timeContext === 'morning' ? 180 : timeContext === 'afternoon' ? 120 : 60;
  
  if (hike.duration <= maxDuration) {
    score += 15;
    if (hike.duration <= 60) {
      reasons.push(`Quick ${hike.durationLabel} - perfect for today`);
    } else {
      reasons.push(`${hike.durationLabel} fits your schedule`);
    }
  } else {
    score -= 10;
    reasons.push(`Longer than your available time`);
  }

  // Age suitability
  if (preferences.youngestAge !== undefined) {
    if (hike.ageMin <= preferences.youngestAge && hike.ageMax >= preferences.youngestAge) {
      score += 15;
      reasons.push(`Great for ages ${hike.ageRange}`);
    } else if (hike.ageMin <= preferences.youngestAge + 2) {
      score += 5;
    }
  }

  // Stroller requirement
  if (preferences.hasStroller && hike.strollerFriendly) {
    score += 15;
    reasons.push('Stroller-friendly path');
  } else if (preferences.hasStroller) {
    score -= 10;
  }

  // Feature preferences
  if (preferences.wantsWater && hike.hasWater) {
    score += 10;
    reasons.push('Has water features');
  }
  if (preferences.wantsViews && hike.hasViews) {
    score += 10;
    reasons.push('Amazing views');
  }
  if (preferences.wantsDogs && hike.dogsAllowed) {
    score += 10;
    reasons.push('Dogs welcome');
  }

  // Parking preference
  if (preferences.prefersFreeParking) {
    if (hike.parking === 'free') {
      score += 10;
      reasons.push('Free parking');
    } else if (hike.parking === 'free_limited') {
      score += 5;
    }
  }

  return { ...hike, distance: Math.round(distance), score, reasons: reasons.slice(0, 3) };
}

/**
 * Hook to get personalized hike recommendations
 */
export function useRecommendations(location, weather, preferences = {}) {
  const defaults = {
    youngestAge: 5,
    hasStroller: false,
    wantsWater: false,
    wantsViews: true,
    wantsDogs: false,
    prefersFreeParking: true,
    maxDistance: 50,
    maxResults: 6,
    ...preferences,
  };

  const recommendations = useMemo(() => {
    if (!location.lat || !location.lon) {
      return { hikes: [], weatherAssessment: null, isReady: false };
    }

    // Assess current weather
    const weatherAssessment = weather.temp !== null
      ? assessWeather(weather.condition, weather.temp)
      : null;

    // Score all hikes
    const scoredHikes = hikes.map(hike =>
      scoreHike(hike, location.lat, location.lon, weatherAssessment || { level: 'unknown' }, defaults)
    );

    // Filter and sort
    let filtered = scoredHikes.filter(h => h.score > 0 && h.distance <= defaults.maxDistance);
    
    // Sort by score, then by distance
    filtered.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.distance - b.distance;
    });

    // Get top recommendations
    const topHikes = filtered.slice(0, defaults.maxResults);

    // Generate personalized message
    let message = '';
    if (weatherAssessment) {
      if (weatherAssessment.level === 'perfect') {
        message = "Today's weather is absolutely perfect for getting outside. Here's where to go.";
      } else if (weatherAssessment.level === 'cloudy') {
        message = "Overcast skies mean comfortable hiking all day. These trails are ready for you.";
      } else if (weatherAssessment.level === 'hot') {
        message = "It's warm out there! These shaded trails will keep everyone happy.";
      } else if (weatherAssessment.level === 'cold') {
        message = "Bundle up! These sunny trails will warm you up as you hike.";
      } else if (weatherAssessment.level === 'drizzle') {
        message = "A little damp doesn't stop real adventurers. These trails handle drizzle beautifully.";
      } else if (weatherAssessment.level === 'drizzle-cold') {
        message = "Not quite hiking weather today. Save these trails for another day?";
      } else if (weatherAssessment.level === 'rain') {
        message = "Rain is in the forecast. Consider a Base Camp day, or save these for a clearer day.";
      } else if (weatherAssessment.level === 'snow') {
        message = "Snow day! Perfect for building snow castles or checking out these winter trails.";
      } else if (weatherAssessment.level === 'storm') {
        message = "Storms rolling through - let's keep everyone safe indoors today.";
      } else {
        message = "Here's what's waiting for you, based on where you are.";
      }
    }

    return {
      hikes: topHikes,
      weatherAssessment,
      message,
      isReady: true,
    };
  }, [location.lat, location.lon, weather.temp, weather.condition, defaults]);

  return recommendations;
}
