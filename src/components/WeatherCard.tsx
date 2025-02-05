import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { WeatherData } from '../types/weather';
import { useTheme } from '../context/ThemeContext';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { isDark } = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: '20px auto',
        backgroundColor: isDark ? '#333' : '#fff',
        color: isDark ? '#fff' : '#000',
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {data.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            style={{ width: '100px', height: '100px' }}
          />
          <Typography variant="h2" component="div">
            {Math.round(data.main.temp)}°C
          </Typography>
        </Box>

        <Typography variant="h6" color="text.secondary" gutterBottom sx={{ color: isDark ? '#ccc' : 'inherit' }}>
          {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WiHumidity size={24} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {data.main.humidity}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WiStrongWind size={24} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {data.wind.speed} m/s
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Feels like: {Math.round(data.main.feels_like)}°C
        </Typography>
      </CardContent>
    </Card>
  );
}; 