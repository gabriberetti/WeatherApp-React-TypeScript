import { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Alert } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastChart } from './components/ForecastChart';
import { ThemeToggle } from './components/ThemeToggle';
import { useGeolocation } from './hooks/useGeolocation';
import { useTheme } from './context/ThemeContext';
import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords,
} from './services/weatherService';
import { WeatherData, ForecastData } from './types/weather';

function AppContent() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { latitude, longitude, error: geoError } = useGeolocation();
  const { isDark } = useTheme();

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecastByCity(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = () => {
    if (latitude && longitude) {
      fetchWeatherByLocation(latitude, longitude);
    } else if (geoError) {
      setError('Unable to get your location. Please allow location access or search manually.');
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherByLocation(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
        bgcolor: isDark ? '#1a1a1a' : '#f5f5f5',
      }}
    >
      <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        <ThemeToggle />
        <SearchBar 
          onSearch={fetchWeatherData} 
          onUseCurrentLocation={handleLocationSearch} 
          loading={loading}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {weather && <WeatherCard data={weather} />}
            {forecast && <ForecastChart data={forecast} />}
          </>
        )}
      </Container>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
