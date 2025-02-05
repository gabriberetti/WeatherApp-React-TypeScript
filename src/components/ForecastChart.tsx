import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { ForecastData } from '../types/weather';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface ForecastChartProps {
  data: ForecastData;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const { isDark } = useTheme();

  const formatData = () => {
    const dailyData = data.list.filter((_item, index) => index % 8 === 0).slice(0, 5);
    const temperatures = dailyData.map(item => Math.round(item.main.temp));
    
    // Calculate min and max temperatures for proper scaling
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);
    const padding = 5; // Add 5°C padding to min and max

    return {
      labels: dailyData.map(item => 
        new Date(item.dt * 1000).toLocaleDateString('en-US', { 
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      ),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.5)',
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#f59e0b',
          pointBorderColor: isDark ? '#333' : '#fff',
          pointBorderWidth: 2,
          borderWidth: 3,
          fill: {
            target: 'origin',
            above: 'rgba(245, 158, 11, 0.1)',
          },
        },
      ],
      minTemp: minTemp - padding,
      maxTemp: maxTemp + padding,
    };
  };

  const chartData = formatData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      title: {
        display: true,
        text: '5-Day Forecast',
        color: isDark ? '#fff' : '#000',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: 20,
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDark ? '#fff' : '#000',
        bodyColor: isDark ? '#fff' : '#000',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) => `Temperature: ${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: chartData.minTemp,
        suggestedMax: chartData.maxTemp,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: isDark ? '#fff' : '#000',
          font: {
            size: 12,
          },
          callback: function(value: number | string) {
            return `${value}°C`;
          },
          padding: 10,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: isDark ? '#fff' : '#000',
          font: {
            size: 12,
          },
          padding: 10,
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      line: {
        borderJoinStyle: 'round' as const,
      },
    },
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: '20px auto',
        backgroundColor: isDark ? '#333' : '#fff',
        padding: '20px',
      }}
    >
      <CardContent>
        <div style={{ height: '400px', position: 'relative' }}>
          <Line options={options} data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
}; 