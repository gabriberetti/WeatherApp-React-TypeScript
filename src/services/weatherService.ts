import axios, { AxiosError } from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

// Verify API configuration
if (!API_KEY) {
  console.error('OpenWeatherMap API key is missing');
}

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    } else if (axiosError.response?.status === 401) {
      console.error('API Key error:', API_KEY);
      throw new Error('Invalid API key. Please check your configuration.');
    } else if (!axiosError.response) {
      throw new Error('Network error. Please check your internet connection.');
    }
    // Log the full error response for debugging
    console.error('API Error:', axiosError.response?.data);
  }
  throw new Error('An unexpected error occurred. Please try again later.');
};

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getForecastByCoords = async (
  lat: number,
  lon: number
): Promise<ForecastData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}; 