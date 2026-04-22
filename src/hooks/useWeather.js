import { useState, useEffect } from 'react';
import { getWeatherDescription, isGoodWeatherForHiking, getWeatherEmoji, getWeatherLevel } from '../utils/weatherUtils';

export function useWeather(lat, lon) {
  const [weather, setWeather] = useState({
    temp: null,
    condition: null,
    description: null,
    emoji: null,
    isGoodForHiking: null,
    level: null,
    error: null,
    loading: true,
    hourly: [],
  });

  useEffect(() => {
    if (lat === null || lon === null) {
      setWeather((prev) => ({
        ...prev,
        loading: false,
        error: lat === null && lon === null ? 'No location provided' : null,
      }));
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    async function fetchWeather() {
      try {
        // Fetch current + hourly forecast (next 12 hours)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code,precipitation_probability&forecast_days=1&timezone=auto`,
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        const current = data.current;
        const hourlyData = data.hourly;

        // Convert Celsius to Fahrenheit
        const tempF = Math.round(current.temperature_2m * 9 / 5 + 32);
        const code = current.weather_code;
        const description = getWeatherDescription(code);
        const emoji = getWeatherEmoji(code);
        const isGoodForHiking = isGoodWeatherForHiking(code, tempF);
        const level = getWeatherLevel(tempF, code);

        // Process hourly data - get next 12 hours
        const currentHour = new Date().getHours();
        const hourly = [];
        
        for (let i = 0; i < 12 && i < hourlyData.time.length; i++) {
          const hourDate = new Date(hourlyData.time[i]);
          const hour = hourDate.getHours();
          const tempC = hourlyData.temperature_2m[i];
          const hourCode = hourlyData.weather_code[i];
          const precip = hourlyData.precipitation_probability[i];
          
          hourly.push({
            hour,
            hourLabel: hourDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            temp: Math.round(tempC * 9 / 5 + 32),
            condition: hourCode,
            description: getWeatherDescription(hourCode),
            emoji: getWeatherEmoji(hourCode),
            precipChance: precip,
            isGoodForHiking: isGoodWeatherForHiking(hourCode, Math.round(tempC * 9 / 5 + 32)),
            level: getWeatherLevel(Math.round(tempC * 9 / 5 + 32), hourCode),
          });
        }

        setWeather({
          temp: tempF,
          condition: code,
          description,
          emoji,
          isGoodForHiking,
          level,
          error: null,
          loading: false,
          hourly,
        });
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          setWeather({
            temp: null,
            condition: null,
            description: null,
            emoji: null,
            isGoodForHiking: null,
            level: null,
            error: 'Weather request timed out',
            loading: false,
            hourly: [],
          });
        } else {
          setWeather({
            temp: null,
            condition: null,
            description: null,
            emoji: null,
            isGoodForHiking: null,
            level: null,
            error: err.message || 'Failed to fetch weather',
            loading: false,
            hourly: [],
          });
        }
      }
    }

    fetchWeather();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [lat, lon]);

  return weather;
}
