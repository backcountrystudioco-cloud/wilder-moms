import { useState, useEffect } from 'react';
import { getWeatherDescription, isGoodWeatherForHiking, getWeatherEmoji } from '../utils/weatherUtils';

export function useWeather(lat, lon) {
  const [weather, setWeather] = useState({
    temp: null,
    condition: null,
    description: null,
    emoji: null,
    isGoodForHiking: null,
    error: null,
    loading: true,
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
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`,
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        const current = data.current;

        // Convert Celsius to Fahrenheit
        const tempF = Math.round(current.temperature_2m * 9 / 5 + 32);
        const code = current.weather_code;
        const description = getWeatherDescription(code);
        const emoji = getWeatherEmoji(code);
        const isGoodForHiking = isGoodWeatherForHiking(code, tempF);

        setWeather({
          temp: tempF,
          condition: code,
          description,
          emoji,
          isGoodForHiking,
          error: null,
          loading: false,
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
            error: 'Weather request timed out',
            loading: false,
          });
        } else {
          setWeather({
            temp: null,
            condition: null,
            description: null,
            emoji: null,
            isGoodForHiking: null,
            error: err.message || 'Failed to fetch weather',
            loading: false,
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
