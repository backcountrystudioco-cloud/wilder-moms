/**
 * Get human-readable weather description from WMO weather code
 * @param {number} code - WMO weather code
 * @returns {string} Human-readable description
 */
export function getWeatherDescription(code) {
  const descriptions = {
    0: 'Clear',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Slight Snowfall',
    73: 'Moderate Snowfall',
    75: 'Heavy Snowfall',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Slight Hail',
    99: 'Thunderstorm with Heavy Hail',
  };

  return descriptions[code] || 'Unknown';
}

/**
 * Determine if weather is good for hiking
 * Good conditions: clear, partly cloudy, fog AND temp between 40-95°F
 * @param {number} code - WMO weather code
 * @param {number} tempF - Temperature in Fahrenheit
 * @returns {boolean}
 */
export function isGoodWeatherForHiking(code, tempF) {
  // Good weather codes: clear (0), mainly clear (1), partly cloudy (2), fog (45, 48)
  const goodCodes = [0, 1, 2, 45, 48];
  const isGoodCondition = goodCodes.includes(code);
  const isGoodTemp = tempF >= 40 && tempF <= 95;

  return isGoodCondition && isGoodTemp;
}

/**
 * Get appropriate emoji for weather condition
 * @param {number} code - WMO weather code
 * @returns {string} Emoji
 */
export function getWeatherEmoji(code) {
  const emojis = {
    0: 'sunny',  // Clear
    1: 'mostly_sunny', // Mainly Clear
    2: 'partly_cloudy',  // Partly Cloudy
    3: 'cloudy',  // Overcast
    45: 'foggy', // Foggy
    48: 'foggy', // Rime Fog
    51: 'rain', // Light Drizzle
    53: 'rain', // Moderate Drizzle
    55: 'rain', // Dense Drizzle
    56: 'rain', // Freezing Drizzle
    57: 'rain', // Dense Freezing Drizzle
    61: 'rain', // Slight Rain
    63: 'rain', // Moderate Rain
    65: 'rain', // Heavy Rain
    66: 'rain', // Freezing Rain
    67: 'rain', // Heavy Freezing Rain
    71: 'snow', // Slight Snowfall
    73: 'snow', // Moderate Snowfall
    75: 'snow',  // Heavy Snowfall
    77: 'snow', // Snow Grains
    80: 'light_rain', // Slight Rain Showers
    81: 'light_rain', // Moderate Rain Showers
    82: 'storm',  // Violent Rain Showers
    85: 'snow', // Slight Snow Showers
    86: 'snow',  // Heavy Snow Showers
    95: 'storm',  // Thunderstorm
    96: 'storm',  // Thunderstorm with Slight Hail
    99: 'storm',  // Thunderstorm with Heavy Hail
  };

  return emojis[code] || 'unknown';
}

/**
 * Get weather level for recommendations (used in HabitatPage)
 * @param {number} tempF - Temperature in Fahrenheit
 * @param {number} code - WMO weather code
 * @returns {string} Weather level
 */
export function getWeatherLevel(tempF, code) {
  // Storm conditions
  if ([95, 96, 99].includes(code)) return 'storm';
  if ([65, 67, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  
  // Precipitation
  if ([51, 53, 55, 56, 57, 61, 66, 80, 81].includes(code)) {
    if (tempF < 50) return 'drizzle-cold';
    if (tempF < 65) return 'drizzle-cool';
    return 'drizzle';
  }
  
  // Temperature-based levels
  if (tempF >= 95) return 'extreme-heat';
  if (tempF >= 85) return 'hot';
  if (tempF >= 65) return 'perfect';
  if (tempF >= 55) return 'warm';
  if (tempF >= 45) return 'chilly';
  if (tempF >= 35) return 'cold';
  
  return 'cold';
}
