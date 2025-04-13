"use client";

import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Snowflake, CloudLightning, Wind, Droplets } from 'lucide-react';

interface WeatherWidgetProps {
  location: string;
  compact?: boolean;
  className?: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast: {
    day: string;
    temperature: number;
    condition: string;
    icon: string;
  }[];
}

const weatherIcons: Record<string, React.ReactNode> = {
  'sunny': <Sun className="h-6 w-6 text-yellow-500" />,
  'partly-cloudy': <Cloud className="h-6 w-6 text-gray-400" />,
  'cloudy': <Cloud className="h-6 w-6 text-gray-400" />,
  'rainy': <CloudRain className="h-6 w-6 text-blue-400" />,
  'stormy': <CloudLightning className="h-6 w-6 text-purple-500" />,
  'snowy': <Snowflake className="h-6 w-6 text-blue-300" />,
  'windy': <Wind className="h-6 w-6 text-gray-500" />
};

// Mock weather data for demo purposes
const mockWeatherData: Record<string, WeatherData> = {
  'default': {
    temperature: 22,
    condition: 'partly-cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: 'partly-cloudy',
    forecast: [
      { day: 'Mon', temperature: 22, condition: 'partly-cloudy', icon: 'partly-cloudy' },
      { day: 'Tue', temperature: 24, condition: 'sunny', icon: 'sunny' },
      { day: 'Wed', temperature: 23, condition: 'partly-cloudy', icon: 'partly-cloudy' },
      { day: 'Thu', temperature: 20, condition: 'rainy', icon: 'rainy' },
      { day: 'Fri', temperature: 19, condition: 'rainy', icon: 'rainy' }
    ]
  },
  'Bali, Indonesia': {
    temperature: 29,
    condition: 'sunny',
    humidity: 78,
    windSpeed: 8,
    icon: 'sunny',
    forecast: [
      { day: 'Mon', temperature: 29, condition: 'sunny', icon: 'sunny' },
      { day: 'Tue', temperature: 28, condition: 'partly-cloudy', icon: 'partly-cloudy' },
      { day: 'Wed', temperature: 28, condition: 'rainy', icon: 'rainy' },
      { day: 'Thu', temperature: 27, condition: 'rainy', icon: 'rainy' },
      { day: 'Fri', temperature: 28, condition: 'partly-cloudy', icon: 'partly-cloudy' }
    ]
  },
  'Paris, France': {
    temperature: 15,
    condition: 'cloudy',
    humidity: 71,
    windSpeed: 14,
    icon: 'cloudy',
    forecast: [
      { day: 'Mon', temperature: 15, condition: 'cloudy', icon: 'cloudy' },
      { day: 'Tue', temperature: 14, condition: 'rainy', icon: 'rainy' },
      { day: 'Wed', temperature: 16, condition: 'partly-cloudy', icon: 'partly-cloudy' },
      { day: 'Thu', temperature: 17, condition: 'partly-cloudy', icon: 'partly-cloudy' },
      { day: 'Fri', temperature: 19, condition: 'sunny', icon: 'sunny' }
    ]
  },
  'Tokyo, Japan': {
    temperature: 21,
    condition: 'partly-cloudy',
    humidity: 60,
    windSpeed: 10,
    icon: 'partly-cloudy',
    forecast: [
      { day: 'Mon', temperature: 21, condition: 'partly-cloudy', icon: 'partly-cloudy' },
      { day: 'Tue', temperature: 22, condition: 'sunny', icon: 'sunny' },
      { day: 'Wed', temperature: 24, condition: 'sunny', icon: 'sunny' },
      { day: 'Thu', temperature: 22, condition: 'cloudy', icon: 'cloudy' },
      { day: 'Fri', temperature: 19, condition: 'rainy', icon: 'rainy' }
    ]
  }
};

const WeatherWidget = ({ location, compact = false, className = '' }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulating API fetch with mock data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const weatherData = mockWeatherData[location] || mockWeatherData.default;
      setWeather(weatherData);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-4 animate-pulse ${className}`}>
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-3"></div>
        {!compact && <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>}
        {!compact && (
          <div className="flex space-x-2 pt-3">
            <div className="h-12 bg-gray-200 rounded w-1/5"></div>
            <div className="h-12 bg-gray-200 rounded w-1/5"></div>
            <div className="h-12 bg-gray-200 rounded w-1/5"></div>
            <div className="h-12 bg-gray-200 rounded w-1/5"></div>
            <div className="h-12 bg-gray-200 rounded w-1/5"></div>
          </div>
        )}
      </div>
    );
  }

  if (!weather) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
        <p className="text-gray-600">Weather data unavailable</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-3 flex items-center ${className}`}>
        <div className="mr-3">
          {weatherIcons[weather.icon] || <Cloud className="h-8 w-8 text-gray-400" />}
        </div>
        <div>
          <div className="font-medium text-gray-800">{location}</div>
          <div className="text-2xl font-semibold">{weather.temperature}°C</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{location}</h3>
          <div className="flex items-center mt-1">
            <div className="text-3xl font-semibold mr-2">{weather.temperature}°C</div>
            <div className="text-sm text-gray-600 flex flex-col">
              <span className="capitalize">{weather.condition.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          {weatherIcons[weather.icon] || <Cloud className="h-12 w-12 text-gray-400" />}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Droplets className="h-4 w-4 mr-1 text-blue-400" />
          <span>{weather.humidity}% Humidity</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Wind className="h-4 w-4 mr-1 text-gray-400" />
          <span>{weather.windSpeed} km/h Wind</span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">5-Day Forecast</h4>
        <div className="flex justify-between">
          {weather.forecast.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs font-medium text-gray-600">{day.day}</div>
              <div className="my-1">
                {weatherIcons[day.icon] || <Cloud className="h-5 w-5 text-gray-400 mx-auto" />}
              </div>
              <div className="text-sm font-medium">{day.temperature}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget; 