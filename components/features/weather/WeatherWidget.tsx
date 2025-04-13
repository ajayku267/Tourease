"use client";

import { useState, useEffect } from "react";
import { Search, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Weather condition types
type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'windy';

// Define interfaces
interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: WeatherCondition;
    humidity: number;
    windSpeed: number;
    description: string;
  };
  forecast: DayForecast[];
}

interface DayForecast {
  date: string;
  dayOfWeek: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  chanceOfRain: number;
  description: string;
}

// Function to fetch weather data
const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  // Simulate a delay for API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes, we'll generate mock data based on the location
  // In a real app, this would call the OpenWeatherMap API
  
  // Generate random but realistic temperatures based on location patterns
  const isTropical = location.toLowerCase().includes('bali') || 
                    location.toLowerCase().includes('caribbean') || 
                    location.toLowerCase().includes('hawaii');
  const isCold = location.toLowerCase().includes('alaska') || 
                 location.toLowerCase().includes('iceland') || 
                 location.toLowerCase().includes('norway');
  
  const baseTemp = isTropical ? 30 : (isCold ? 5 : 18);
  const variance = 5; // Temperature variance
  
  // Generate conditions based on location keywords
  let likelyConditions: WeatherCondition[] = ['sunny', 'cloudy'];
  
  if (location.toLowerCase().includes('rain') || 
      location.toLowerCase().includes('london') || 
      location.toLowerCase().includes('seattle')) {
    likelyConditions = ['rainy', 'cloudy'];
  } else if (isTropical) {
    likelyConditions = ['sunny', 'rainy', 'cloudy']; // Tropical places can have surprise rain
  } else if (isCold) {
    likelyConditions = ['snowy', 'cloudy', 'windy'];
  }
  
  // Generate current weather
  const currentCondition = likelyConditions[Math.floor(Math.random() * likelyConditions.length)];
  
  // Generate descriptions based on condition
  const getDescription = (condition: WeatherCondition) => {
    switch(condition) {
      case 'sunny': return 'Clear skies';
      case 'cloudy': return 'Partly cloudy';
      case 'rainy': return 'Light to moderate rain';
      case 'stormy': return 'Thunderstorms';
      case 'snowy': return 'Light snowfall';
      case 'windy': return 'Strong winds';
      default: return 'Moderate conditions';
    }
  };
  
  // Generate 5-day forecast
  const forecast: DayForecast[] = [];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const forecastDate = new Date();
    forecastDate.setDate(today.getDate() + i);
    
    const dayCondition = likelyConditions[Math.floor(Math.random() * likelyConditions.length)];
    const dailyVariance = Math.random() * variance;
    
    forecast.push({
      date: forecastDate.toLocaleDateString(),
      dayOfWeek: days[forecastDate.getDay()],
      high: Math.round(baseTemp + dailyVariance),
      low: Math.round(baseTemp - dailyVariance - 2),
      condition: dayCondition,
      chanceOfRain: dayCondition === 'rainy' ? 70 + Math.floor(Math.random() * 30) : 
                    dayCondition === 'cloudy' ? 20 + Math.floor(Math.random() * 30) : 
                    Math.floor(Math.random() * 20),
      description: getDescription(dayCondition)
    });
  }
  
  return {
    location,
    current: {
      temp: Math.round(baseTemp + (Math.random() * variance - variance/2)),
      condition: currentCondition,
      humidity: 40 + Math.floor(Math.random() * 50),
      windSpeed: 5 + Math.floor(Math.random() * 20),
      description: getDescription(currentCondition)
    },
    forecast
  };
};

// Weather icon component
const WeatherIcon = ({ condition, className = "h-6 w-6" }: { condition: WeatherCondition, className?: string }) => {
  switch(condition) {
    case 'sunny':
      return <Sun className={className} />;
    case 'cloudy':
      return <Cloud className={className} />;
    case 'rainy':
      return <CloudRain className={className} />;
    case 'stormy':
      return <CloudLightning className={className} />;
    case 'snowy':
      return <CloudSnow className={className} />;
    case 'windy':
      return <Wind className={className} />;
    default:
      return <Sun className={className} />;
  }
};

export function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  const [searchedLocation, setSearchedLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async () => {
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }
    
    setError(null);
    setLoading(true);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setSearchedLocation(location);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Get weather advice based on conditions
  const getWeatherAdvice = (data: WeatherData) => {
    const { condition } = data.current;
    const { high } = data.forecast[0];
    
    switch(condition) {
      case 'sunny':
        return high > 28 ? 
          "Don't forget sunscreen and stay hydrated!" : 
          "Perfect weather for sightseeing!";
      case 'rainy':
        return "Pack an umbrella and waterproof jacket.";
      case 'cloudy':
        return "Good day for outdoor activities without too much sun.";
      case 'stormy':
        return "Consider indoor activities or check for weather warnings.";
      case 'snowy':
        return "Bring warm clothing and check for road conditions.";
      case 'windy':
        return "Secure loose items and consider windproof clothing.";
      default:
        return "Check local forecast for updates.";
    }
  };
  
  // Format temperature with degree symbol
  const formatTemp = (temp: number) => `${temp}°C`;
  
  // Format date to shorter version
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Travel Weather Forecast</CardTitle>
        <CardDescription>5-day weather forecast for your destination</CardDescription>
        
        <div className="flex mt-4">
          <Input 
            placeholder="Enter destination (e.g., Bali, London)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mr-2"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Loading..." : <Search className="h-4 w-4" />}
          </Button>
        </div>
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardHeader>
      
      {weatherData && (
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">{weatherData.location}</h3>
            
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center">
                <WeatherIcon condition={weatherData.current.condition} className="h-10 w-10 mr-3 text-primary" />
                <div>
                  <p className="text-3xl font-bold">{formatTemp(weatherData.current.temp)}</p>
                  <p className="text-sm text-muted-foreground">{weatherData.current.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 text-sm">
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                  <span>{weatherData.current.humidity}%</span>
                </div>
                <div className="flex items-center">
                  <Wind className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{weatherData.current.windSpeed} km/h</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm mt-2 text-muted-foreground">{getWeatherAdvice(weatherData)}</p>
          </div>
          
          <h4 className="font-medium mb-2">5-Day Forecast</h4>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table">Detailed</TabsTrigger>
              <TabsTrigger value="compact">Compact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table" className="mt-2">
              <div className="grid gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b last:border-0">
                    <div className="flex items-center">
                      <div className="w-20">
                        <p className="font-medium">{index === 0 ? 'Today' : day.dayOfWeek.substring(0, 3)}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(day.date)}</p>
                      </div>
                      <WeatherIcon condition={day.condition} className="h-6 w-6 mx-2" />
                    </div>
                    
                    <div className="text-right">
                      <p className="flex items-center">
                        <span className="text-sm font-medium mr-1">{formatTemp(day.high)}</span>
                        <span className="text-xs text-muted-foreground">{formatTemp(day.low)}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Rain: {day.chanceOfRain}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="compact" className="mt-2">
              <div className="grid grid-cols-5 gap-1 text-center">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="p-2 rounded-md bg-muted/30">
                    <p className="text-xs font-medium">{index === 0 ? 'Today' : day.dayOfWeek.substring(0, 3)}</p>
                    <WeatherIcon condition={day.condition} className="h-8 w-8 mx-auto my-1" />
                    <p className="text-xs font-medium">{formatTemp(day.high)}</p>
                    <p className="text-xs text-muted-foreground">{formatTemp(day.low)}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
      
      <CardFooter className="text-xs text-muted-foreground">
        {weatherData ? 
          "Data updated for demonstration purposes. In production, this would use real-time data from OpenWeatherMap API." : 
          "Enter a destination to see the weather forecast."}
      </CardFooter>
    </Card>
  );
} 