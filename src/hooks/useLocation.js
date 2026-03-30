import { useState, useEffect } from 'react';

export function useLocation() {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    city: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      return;
    }

    const timeoutId = setTimeout(() => {
      setLocation((prev) => ({
        ...prev,
        error: 'Location request timed out',
        loading: false,
      }));
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
              headers: {
                'Accept-Language': 'en',
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to reverse geocode');
          }

          const data = await response.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            'Unknown Location';

          setLocation({
            lat: latitude,
            lon: longitude,
            city,
            error: null,
            loading: false,
          });
        } catch (err) {
          setLocation({
            lat: latitude,
            lon: longitude,
            city: 'Unknown Location',
            error: 'Could not determine city name',
            loading: false,
          });
        }
      },
      (err) => {
        clearTimeout(timeoutId);
        let errorMessage = 'Unable to retrieve your location';
        if (err.code === err.PERMISSION_DENIED) {
          errorMessage = 'Location permission denied';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information unavailable';
        }
        setLocation({
          lat: null,
          lon: null,
          city: null,
          error: errorMessage,
          loading: false,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return location;
}
