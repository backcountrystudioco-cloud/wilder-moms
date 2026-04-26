import { useMemo } from 'react';
import { hikes } from '../wilder-trails/hikes';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns {number} Distance in miles
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get time context based on current hour
 */
function getTimeContext() {
  const hour = new Date().getHours();
  if (hour < 10) return 'early';
  if (hour < 14) return 'midday';
  if (hour < 17) return 'late';
  return 'evening';
}

/**
 * Assess weather conditions for outdoor activities
 */
function assessWeather(weatherCode, tempF, humidity = 50) {
  const clearCodes = [0, 1, 2];
  const cloudyCodes = [3, 45, 48];
  const drizzlyCodes = [51, 53, 55, 56, 57, 61, 80, 81];
  const rainyCodes = [63, 65, 66, 67, 82];
  const snowyCodes = [71, 73, 75, 77, 85, 86];
  const stormCodes = [95, 96, 99];

  // Storm - immediate no-go
  if (stormCodes.includes(weatherCode)) {
    return { level: 'storm', label: 'Storm Warning', icon: 'Storm', score: 0, advice: 'Stay safe indoors - storms in the area.' };
  }
  
  // Snow - limited options
  if (snowyCodes.includes(weatherCode)) {
    if (tempF > 35) {
      return { level: 'snow', label: 'Snowy', icon: 'Snow', score: 25, advice: 'Snow trails available! Dress warm and check trail conditions.' };
    }
    return { level: 'snow-cold', label: 'Icy Conditions', icon: 'Cold', score: 15, advice: 'Trails may be icy. Consider indoor activities.' };
  }
  
  // Heavy rain
  if (rainyCodes.includes(weatherCode)) {
    return { level: 'rain', label: 'Rainy', icon: 'Rain', score: 30, advice: 'Wet trails can be slippery. Look for covered or sheltered options.' };
  }
  
  // Drizzle
  if (drizzlyCodes.includes(weatherCode)) {
    if (tempF < 48) {
      return { level: 'drizzle-cold', label: 'Drizzle & Cold', icon: 'Rain', score: 45, advice: 'Light rain + cold = consider indoor alternatives or bundle up.' };
    }
    if (tempF > 85) {
      return { level: 'drizzle-cool', label: 'Light Rain', icon: 'Light rain', score: 65, advice: 'Rain keeps things cool! Great for activity, just bring layers.' };
    }
    return { level: 'drizzle', label: 'Light Drizzle', icon: 'Light rain', score: 70, advice: 'Light rain won\'t stop real adventurers. Waterproof layers recommended.' };
  }
  
  // Cloudy - great for hiking
  if (cloudyCodes.includes(weatherCode)) {
    if (tempF < 40) {
      return { level: 'cloudy-cold', label: 'Overcast & Cold', icon: 'Cloudy', score: 65, advice: 'Cloudy but cold - layers needed, seek sunny exposed trails.' };
    }
    if (tempF > 85) {
      return { level: 'cloudy-cool', label: 'Overcast & Comfortable', icon: 'Cloudy', score: 95, advice: 'Perfect hiking weather - no sun stress, comfortable temps!' };
    }
    return { level: 'cloudy', label: 'Overcast', icon: 'Cloudy', score: 90, advice: 'Great conditions - clouds keep temps ideal.' };
  }
  
  // Clear sky
  if (clearCodes.includes(weatherCode)) {
    if (tempF < 35) {
      return { level: 'cold', label: 'Freezing', icon: 'Cold', score: 40, advice: 'Very cold - limited trail options, stay bundled.' };
    }
    if (tempF < 50) {
      return { level: 'chilly', label: 'Chilly', icon: 'Mostly sunny', score: 70, advice: 'Cold morning - sunny trails will warm up nicely.' };
    }
    if (tempF > 95) {
      return { level: 'extreme-heat', label: 'Extreme Heat', icon: 'Hot', score: 25, advice: 'Very hot - prioritize shaded trails, go early or evening, drink lots of water.' };
    }
    if (tempF > 85) {
      return { level: 'hot', label: 'Hot Sun', icon: 'Sunny', score: 55, advice: 'Sun is strong - seek shade, bring extra water, take breaks.' };
    }
    if (tempF > 75) {
      return { level: 'warm', label: 'Warm & Sunny', icon: 'Mostly sunny', score: 80, advice: 'Warm but nice - great day for outdoor activity!' };
    }
    return { level: 'perfect', label: 'Perfect', icon: 'Perfect', score: 100, advice: 'Ideal conditions for adventure!' };
  }
  
  // Default unknown
  return { level: 'unknown', label: 'Check Conditions', icon: 'Unknown', score: 50, advice: 'Check trail conditions before heading out.' };
}

/**
 * Score a hike based on current conditions and preferences
 */
function scoreHike(hike, userLat, userLon, weather, preferences, timeContext) {
  let score = 0;
  const reasons = [];
  const warnings = [];

  // ========== DISTANCE (up to 30 points) ==========
  const distance = haversineDistance(userLat, userLon, hike.lat, hike.lon);
  if (distance <= 3) {
    score += 30;
    reasons.push(`${distance.toFixed(1)} mi away`);
  } else if (distance <= 10) {
    score += 25;
    reasons.push(`${Math.round(distance)} mi away`);
  } else if (distance <= 20) {
    score += 20;
    reasons.push(`${Math.round(distance)} mi away`);
  } else if (distance <= 40) {
    score += 10;
    reasons.push(`${Math.round(distance)} mi away`);
  } else {
    score += 0;
    warnings.push(`${Math.round(distance)} miles - bring snacks for the drive`);
  }

  // ========== WEATHER SUITABILITY (up to 25 points) ==========
  switch (weather.level) {
    case 'perfect':
    case 'cloudy':
    case 'cloudy-cool':
      score += 25;
      reasons.push('Great weather conditions');
      break;
    case 'warm':
      score += 22;
      reasons.push('Comfortable hiking weather');
      break;
    case 'hot':
      if (hike.shadeLevel === 'high') {
        score += 20;
        reasons.push('Heavy shade for hot weather');
      } else if (hike.shadeLevel === 'medium') {
        score += 15;
        reasons.push('Some shade available');
      } else {
        score += 5;
        warnings.push('Full sun trail - will be hot');
      }
      break;
    case 'extreme-heat':
      if (hike.shadeLevel === 'high' && hike.hasWater) {
        score += 20;
        reasons.push('Shade + water = cool combo');
      } else if (hike.shadeLevel === 'high') {
        score += 15;
        reasons.push('Heavy shade essential in heat');
      } else {
        score -= 5;
        warnings.push('Too hot for this trail today');
      }
      break;
    case 'chilly':
    case 'cold':
      if (hike.shadeLevel === 'low') {
        score += 18;
        reasons.push('Sunny exposure to warm up');
      } else if (hike.shadeLevel === 'medium') {
        score += 12;
        reasons.push('Some sun for warmth');
      } else {
        score += 8;
        warnings.push('Shaded trail will be cold');
      }
      break;
    case 'cloudy-cold':
      if (hike.shadeLevel === 'low') {
        score += 20;
        reasons.push('Sunny trail for warmth');
      } else {
        score += 10;
        warnings.push('Cold and shaded - bundle up');
      }
      break;
    case 'drizzle':
    case 'drizzle-cool':
      score += 20;
      if (hike.shadeLevel === 'high') {
        score += 5;
        reasons.push('Shelter from light rain');
      }
      if (hike.hasWater) reasons.push('Water features enhanced by rain');
      break;
    case 'drizzle-cold':
      score += 10;
      warnings.push('Wet and cold - dress very warm');
      if (hike.restrooms) {
        score += 3;
        reasons.push('Restrooms for warming up');
      }
      break;
    case 'rain':
      score -= 10;
      warnings.push('Wet conditions - trails may be muddy');
      if (hike.isPaved) {
        score += 10;
        reasons.push('Paved trail handles rain better');
      }
      if (hike.shadeLevel === 'high') {
        score += 5;
        reasons.push('Covered sections available');
      }
      break;
    case 'snow':
      score += 5;
      warnings.push('Snow conditions - check trail status');
      break;
    case 'snow-cold':
      score -= 5;
      warnings.push('Icy conditions - not recommended');
      break;
    case 'storm':
      score = 0;
      warnings.push('Unsafe conditions today');
      break;
    default:
      score += 15;
  }

  // ========== TIME SUITABILITY (up to 15 points) ==========
  const maxDuration = timeContext === 'early' ? 180 : timeContext === 'midday' ? 150 : timeContext === 'late' ? 90 : 45;
  
  if (hike.duration <= maxDuration) {
    score += 15;
    if (hike.duration <= 45) {
      reasons.push(`Quick ${hike.durationLabel} adventure`);
    } else if (hike.duration <= 90) {
      reasons.push(`${hike.durationLabel} fits perfectly`);
    } else {
      reasons.push(`${hike.durationLabel} - good length`);
    }
  } else if (hike.duration <= maxDuration * 1.5) {
    score += 8;
    reasons.push('A bit long but doable');
  } else {
    score -= 5;
    warnings.push(`Longer than ideal for today`);
  }

  // ========== AGE SUITABILITY (up to 15 points) ==========
  if (preferences.youngestAge !== undefined) {
    if (hike.ageMin <= preferences.youngestAge && hike.ageMax >= preferences.youngestAge) {
      score += 15;
      reasons.push(`Perfect for ages ${hike.ageRange}`);
    } else if (hike.ageMin <= preferences.youngestAge + 2) {
      score += 8;
      reasons.push(`Works for age ${preferences.youngestAge}+`);
    } else if (hike.ageMin > preferences.youngestAge + 3) {
      score -= 5;
      warnings.push(`Trail may be too challenging`);
    }
  }

  // ========== STROLLER CHECK (10 points) ==========
  if (preferences.hasStroller) {
    if (hike.strollerFriendly) {
      score += 10;
      reasons.push('Stroller-friendly path');
    } else {
      score -= 5;
      warnings.push('Not stroller-friendly');
    }
  }

  // ========== FEATURE PREFERENCES (up to 10 points) ==========
  if (preferences.wantsWater && hike.hasWater) {
    score += 5;
    reasons.push('Has water features');
  }
  if (preferences.wantsViews && hike.hasViews) {
    score += 5;
    reasons.push('Scenic views');
  }

  // ========== DOG CHECK (5 points) ==========
  if (preferences.wantsDogs && hike.dogsAllowed) {
    score += 5;
    reasons.push('Dogs welcome');
  }

  // ========== PARKING (5 points) ==========
  if (preferences.prefersFreeParking) {
    if (hike.parking === 'free') {
      score += 5;
      reasons.push('Free parking');
    } else if (hike.parking === 'free_limited') {
      score += 2;
    }
  }

  // ========== RESTROOMS (bonus) ==========
  if (hike.restrooms && (weather.level === 'drizzle' || weather.level === 'drizzle-cold')) {
    score += 3;
    reasons.push('Restrooms nearby for warming up');
  }

  // Filter out low-scoring hikes
  if (score < 20) {
    return { ...hike, distance: Math.round(distance * 10) / 10, score: 0, reasons: [], warnings };
  }

  return { 
    ...hike, 
    distance: Math.round(distance * 10) / 10, 
    score, 
    reasons: reasons.slice(0, 4),
    warnings: warnings.slice(0, 2)
  };
}

/**
 * Hook to get personalized hike recommendations
 */
export function useRecommendations(location, weather, preferences = {}) {
  const defaults = {
    youngestAge: 5,
    hasStroller: false,
    wantsWater: true,
    wantsViews: true,
    wantsDogs: false,
    prefersFreeParking: true,
    maxDistance: 60,
    maxResults: 6,
    ...preferences,
  };

  const recommendations = useMemo(() => {
    if (!location?.lat || !location?.lon) {
      return { hikes: [], weatherAssessment: null, isReady: false };
    }

    const timeContext = getTimeContext();
    
    // Assess current weather
    const weatherAssessment = weather?.temp !== null && weather?.temp !== undefined
      ? assessWeather(weather.condition || 0, weather.temp, weather.humidity)
      : null;

    // Score all hikes
    const scoredHikes = hikes.map(hike =>
      scoreHike(hike, location.lat, location.lon, weatherAssessment || { level: 'unknown' }, defaults, timeContext)
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
      switch (weatherAssessment.level) {
        case 'perfect':
        case 'cloudy':
        case 'cloudy-cool':
          message = "Perfect conditions for getting outside. These trails are waiting for you.";
          break;
        case 'warm':
          message = "Beautiful weather - a great day for outdoor adventure!";
          break;
        case 'hot':
          message = "It's warm out there! We've prioritized shaded trails to keep everyone comfortable.";
          break;
        case 'extreme-heat':
          message = "Heat advisory today - these shaded trails are your best bet.";
          break;
        case 'chilly':
        case 'cold':
          message = "Bundle up! Sunny trails selected to help you warm up as you go.";
          break;
        case 'cloudy-cold':
          message = "Cold and cloudy - layered clothing and sunny trails recommended.";
          break;
        case 'drizzle':
        case 'drizzle-cool':
          message = "A little damp won't stop the adventure! Waterproof layers and shaded trails.";
          break;
        case 'drizzle-cold':
          message = "Not ideal hiking weather - maybe a Base Camp day with warm crafts?";
          break;
        case 'rain':
          message = "Wet trails today. We found paved or covered options for safer hiking.";
          break;
        case 'snow':
          message = "Snow day! Check trail conditions and dress very warm.";
          break;
        case 'snow-cold':
        case 'storm':
          message = "Not safe for outdoor hiking today. Base Camp awaits!";
          break;
        default:
          message = "Here's what's waiting for you based on current conditions.";
      }
    }

    return {
      hikes: topHikes,
      weatherAssessment,
      message,
      isReady: true,
    };
  }, [location?.lat, location?.lon, weather?.temp, weather?.condition, defaults]);

  return recommendations;
}
