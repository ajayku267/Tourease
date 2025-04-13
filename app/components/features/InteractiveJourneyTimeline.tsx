"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Calendar, Clock, Mountain, Sunrise, Sunset, 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
  Wind, Thermometer, TrendingUp, Map, Info, ChevronDown, ChevronUp
} from "lucide-react";
import Image from "next/image";

interface Location {
  id: string;
  name: string;
  dayNumber: number;
  date: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  elevation: number; // in meters
  terrain: "urban" | "coastal" | "mountain" | "forest" | "desert" | "plains";
  climate: {
    avgTemp: number; // in Celsius
    humidity: number; // percentage
    precipitation: number; // probability percentage
    weather: "sunny" | "cloudy" | "rainy" | "stormy" | "snowy";
  };
  activities: {
    name: string;
    time: string; // 24hr format
    duration: number; // in hours
    indoor: boolean;
  }[];
  description: string;
  image: string;
}

interface JourneyTimelineProps {
  tripId: string;
  startDate: string;
  endDate: string;
  destinations: Location[];
  className?: string;
}

export function InteractiveJourneyTimeline({
  tripId,
  startDate,
  endDate,
  destinations,
  className = "",
}: JourneyTimelineProps) {
  const [activeLocation, setActiveLocation] = useState<string | null>(destinations.length > 0 ? destinations[0].id : null);
  const [elevationView, setElevationView] = useState<boolean>(true);
  const [climateView, setClimateView] = useState<boolean>(true);
  const [timeOfDayView, setTimeOfDayView] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [historicalWeather, setHistoricalWeather] = useState<Record<string, any>>({});
  const timelineRef = useRef<HTMLDivElement>(null);

  // Fetch historical weather data (mock)
  useEffect(() => {
    const mockHistoricalData = destinations.reduce((acc, location) => {
      acc[location.id] = {
        avgTemp: location.climate.avgTemp - (Math.random() * 2) + (Math.random() * 2),
        precipitation: location.climate.precipitation * (0.7 + Math.random() * 0.6),
        weather: ["sunny", "cloudy", "rainy", "stormy", "snowy"][Math.floor(Math.random() * 5)]
      };
      return acc;
    }, {} as Record<string, any>);
    
    // Simulate API delay
    setTimeout(() => {
      setHistoricalWeather(mockHistoricalData);
    }, 1000);
  }, [destinations]);

  // Helper function to calculate timeline percentage
  const getTimelinePercentage = (dayNumber: number) => {
    const totalDays = parseInt(endDate.split('-')[2]) - parseInt(startDate.split('-')[2]) + 1;
    return (dayNumber / totalDays) * 100;
  };

  // Scroll to active location
  useEffect(() => {
    if (activeLocation && timelineRef.current) {
      const activeElement = document.getElementById(`location-${activeLocation}`);
      if (activeElement) {
        timelineRef.current.scrollTo({
          left: activeElement.offsetLeft - 100,
          behavior: 'smooth'
        });
      }
    }
  }, [activeLocation]);

  const getTerrainColor = (terrain: Location['terrain']) => {
    switch(terrain) {
      case 'urban': return 'bg-gray-400';
      case 'coastal': return 'bg-blue-400';
      case 'mountain': return 'bg-purple-400';
      case 'forest': return 'bg-green-500';
      case 'desert': return 'bg-amber-300';
      case 'plains': return 'bg-lime-300';
      default: return 'bg-gray-300';
    }
  };

  const getTerrainIcon = (terrain: Location['terrain']) => {
    switch(terrain) {
      case 'urban': return <Map className="h-5 w-5" />;
      case 'coastal': return <img src="/icons/beach.svg" className="h-5 w-5" alt="Coastal" />;
      case 'mountain': return <Mountain className="h-5 w-5" />;
      case 'forest': return <img src="/icons/forest.svg" className="h-5 w-5" alt="Forest" />;
      case 'desert': return <img src="/icons/desert.svg" className="h-5 w-5" alt="Desert" />;
      case 'plains': return <img src="/icons/plains.svg" className="h-5 w-5" alt="Plains" />;
      default: return <Map className="h-5 w-5" />;
    }
  };

  const getWeatherIcon = (weather: Location['climate']['weather']) => {
    switch(weather) {
      case 'sunny': return <Sun className="h-5 w-5 text-amber-500" />;
      case 'cloudy': return <Cloud className="h-5 w-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'stormy': return <CloudLightning className="h-5 w-5 text-purple-500" />;
      case 'snowy': return <CloudSnow className="h-5 w-5 text-blue-300" />;
      default: return <Sun className="h-5 w-5" />;
    }
  };

  const getSunPosition = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    
    // Dawn: 5-7, Day: 7-17, Dusk: 17-19, Night: 19-5
    if (hour >= 5 && hour < 7) return 'dawn';
    if (hour >= 7 && hour < 17) return 'day';
    if (hour >= 17 && hour < 19) return 'dusk';
    return 'night';
  };

  const getTimeIcon = (time: string) => {
    const position = getSunPosition(time);
    switch(position) {
      case 'dawn': return <Sunrise className="h-5 w-5 text-orange-400" />;
      case 'day': return <Sun className="h-5 w-5 text-amber-500" />;
      case 'dusk': return <Sunset className="h-5 w-5 text-orange-600" />;
      case 'night': return <img src="/icons/moon.svg" className="h-5 w-5" alt="Night" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  // Find active location details
  const activeLocationData = destinations.find(loc => loc.id === activeLocation) || null;

  return (
    <div className={`w-full bg-white rounded-xl overflow-hidden border shadow-sm ${className}`}>
      {/* Header with controls */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Interactive Journey Timeline
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setElevationView(!elevationView)}
              className={`p-1.5 rounded-md ${elevationView ? 'bg-white/20' : 'bg-white/5'}`}
              title="Toggle Elevation View"
            >
              <TrendingUp className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setClimateView(!climateView)}
              className={`p-1.5 rounded-md ${climateView ? 'bg-white/20' : 'bg-white/5'}`}
              title="Toggle Climate View"
            >
              <Cloud className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setTimeOfDayView(!timeOfDayView)}
              className={`p-1.5 rounded-md ${timeOfDayView ? 'bg-white/20' : 'bg-white/5'}`}
              title="Toggle Time of Day View"
            >
              <Sun className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <p className="text-sm text-blue-100 mt-1.5">
          {startDate} to {endDate} • {destinations.length} destinations
        </p>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 3D Timeline Visualization */}
            <div className="relative h-[180px] bg-gradient-to-b from-sky-100 to-blue-50 overflow-hidden border-b">
              {/* Elevation profile */}
              {elevationView && (
                <div className="absolute bottom-0 left-0 right-0 h-[120px]">
                  <svg width="100%" height="100%" viewBox={`0 0 ${destinations.length * 100} 120`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="elevationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Profile path */}
                    <path
                      d={`M0,120 ${destinations.map((loc, index) => {
                        // Normalize elevation to a 0-100 scale for visualization
                        const elevationScale = loc.elevation / 30;
                        const elevationHeight = Math.min(100, Math.max(10, elevationScale));
                        return `L${index * 100 + 50},${120 - elevationHeight}`;
                      }).join(' ')} L${destinations.length * 100},120 Z`}
                      fill="url(#elevationGradient)"
                      stroke="#a855f7"
                      strokeWidth="2"
                    />
                    
                    {/* Location dots */}
                    {destinations.map((loc, index) => {
                      const elevationScale = loc.elevation / 30;
                      const elevationHeight = Math.min(100, Math.max(10, elevationScale));
                      return (
                        <circle
                          key={loc.id}
                          cx={index * 100 + 50}
                          cy={120 - elevationHeight}
                          r={loc.id === activeLocation ? 6 : 4}
                          fill={loc.id === activeLocation ? "#a855f7" : "#d8b4fe"}
                          stroke="white"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                </div>
              )}
              
              {/* Climate visualization */}
              {climateView && (
                <div className="absolute top-4 left-0 right-0 h-8 px-4">
                  <div className="relative h-full w-full">
                    {destinations.map((loc, index) => {
                      const xPos = `${(index / (destinations.length - 1)) * 100}%`;
                      return (
                        <div 
                          key={`climate-${loc.id}`}
                          className="absolute top-0 transform -translate-x-1/2"
                          style={{ left: xPos }}
                        >
                          <div className="flex flex-col items-center">
                            {getWeatherIcon(loc.climate.weather)}
                            <span className="text-xs font-medium mt-1">{loc.climate.avgTemp}°C</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Terrain visualization */}
              <div className="absolute bottom-0 left-0 right-0 h-4">
                {destinations.map((loc, index, arr) => {
                  const width = `${100 / arr.length}%`;
                  return (
                    <div
                      key={`terrain-${loc.id}`}
                      className={`absolute bottom-0 h-4 ${getTerrainColor(loc.terrain)}`}
                      style={{
                        left: `${(index / arr.length) * 100}%`,
                        width: width
                      }}
                      title={`${loc.terrain} terrain`}
                    />
                  );
                })}
              </div>
              
              {/* Time of day visualization */}
              {timeOfDayView && activeLocationData && (
                <div className="absolute top-12 left-0 right-0 h-16 px-4">
                  <div className="relative h-full w-full">
                    {activeLocationData.activities.map((activity, index) => {
                      // Position based on time of day (24h format)
                      const [hours] = activity.time.split(':').map(Number);
                      const xPos = `${(hours / 24) * 100}%`;
                      const timePosition = getSunPosition(activity.time);
                      
                      let bgColor = "bg-amber-100";
                      if (timePosition === 'dawn') bgColor = "bg-orange-100";
                      if (timePosition === 'dusk') bgColor = "bg-orange-200";
                      if (timePosition === 'night') bgColor = "bg-indigo-100";
                      
                      return (
                        <div 
                          key={`activity-${index}`}
                          className="absolute top-0 transform -translate-x-1/2"
                          style={{ left: xPos }}
                        >
                          <div className={`flex flex-col items-center p-1 rounded-md ${bgColor}`}>
                            {getTimeIcon(activity.time)}
                            <span className="text-[10px] font-medium mt-0.5">{activity.time}</span>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Background gradient for time of day */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-full bg-gradient-to-r from-indigo-100 via-amber-50 to-orange-100 opacity-20" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Interactive Timeline */}
            <div 
              ref={timelineRef}
              className="relative px-4 py-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              <div className="flex items-center space-x-8 min-w-max">
                {destinations.map((location, index, arr) => (
                  <div 
                    id={`location-${location.id}`}
                    key={location.id}
                    className={`relative flex flex-col items-center min-w-[150px] cursor-pointer transition-all ${
                      location.id === activeLocation ? 'scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setActiveLocation(location.id)}
                  >
                    {/* Timeline connector */}
                    {index < arr.length - 1 && (
                      <div className="absolute top-[40px] left-[75px] w-[100px] h-[2px] bg-gray-300">
                        <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Location node */}
                    <div className="flex flex-col items-center">
                      <div 
                        className={`relative h-20 w-20 rounded-full overflow-hidden border-4 ${
                          location.id === activeLocation ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                        }`}
                      >
                        <Image
                          src={location.image || `/placeholders/destination-${index % 5 + 1}.jpg`}
                          alt={location.name}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/2" />
                        <div className="absolute bottom-1 left-0 right-0 text-center text-white text-xs font-medium">
                          Day {location.dayNumber}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-center">
                        <p className="font-medium text-gray-900">{location.name}</p>
                        <p className="text-xs text-gray-500">{location.date}</p>
                      </div>
                      
                      <div className="mt-1 flex space-x-1">
                        {getTerrainIcon(location.terrain)}
                        {getWeatherIcon(location.climate.weather)}
                        <span className="text-xs font-medium">{location.elevation}m</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Selected Location Details */}
            {activeLocationData && (
              <div className="px-4 py-4 bg-gray-50 border-t">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLocationData.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 flex items-center">
                        {activeLocationData.name}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          Day {activeLocationData.dayNumber} • {activeLocationData.date}
                        </span>
                      </h4>
                      
                      <p className="mt-2 text-gray-600 text-sm">{activeLocationData.description}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-white shadow-sm border">
                          <h5 className="text-sm font-medium text-gray-900 flex items-center">
                            <Mountain className="mr-1.5 h-4 w-4 text-purple-500" />
                            Terrain & Elevation
                          </h5>
                          <div className="mt-1.5">
                            <div className="flex items-center text-sm">
                              <span className="capitalize">{activeLocationData.terrain}</span>
                              <span className="mx-1.5">•</span>
                              <span>{activeLocationData.elevation}m</span>
                            </div>
                            <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500"
                                style={{ width: `${Math.min(100, activeLocationData.elevation / 30)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-white shadow-sm border">
                          <h5 className="text-sm font-medium text-gray-900 flex items-center">
                            <Cloud className="mr-1.5 h-4 w-4 text-blue-500" />
                            Climate & Weather
                          </h5>
                          <div className="mt-1.5 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Temperature:</span>
                              <span className="font-medium">{activeLocationData.climate.avgTemp}°C</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Humidity:</span>
                              <span className="font-medium">{activeLocationData.climate.humidity}%</span>
                            </div>
                            {historicalWeather[activeLocationData.id] && (
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Historical Avg:</span>
                                <span>{historicalWeather[activeLocationData.id].avgTemp.toFixed(1)}°C</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 flex items-center mb-3">
                        <Clock className="mr-1.5 h-4 w-4 text-blue-500" />
                        Daily Activities
                      </h5>
                      
                      <div className="space-y-2.5">
                        {activeLocationData.activities.map((activity, index) => {
                          const timePosition = getSunPosition(activity.time);
                          let bgColor = "bg-amber-50 border-amber-100";
                          if (timePosition === 'dawn') bgColor = "bg-orange-50 border-orange-100";
                          if (timePosition === 'dusk') bgColor = "bg-orange-50 border-orange-200";
                          if (timePosition === 'night') bgColor = "bg-indigo-50 border-indigo-100";
                          
                          return (
                            <div 
                              key={`timeline-activity-${index}`} 
                              className={`p-2.5 rounded-md ${bgColor} border`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  {getTimeIcon(activity.time)}
                                  <span className="ml-2 font-medium">{activity.name}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {activity.time} • {activity.duration}h
                                </div>
                              </div>
                              
                              {/* Weather impact for outdoor activities */}
                              {!activity.indoor && (
                                <div className="mt-1.5 flex items-center text-xs text-gray-600">
                                  <Info className="h-3.5 w-3.5 mr-1 text-blue-500" />
                                  {activeLocationData.climate.weather === 'sunny' && "Perfect weather for this outdoor activity!"}
                                  {activeLocationData.climate.weather === 'cloudy' && "Good conditions, though slightly overcast."}
                                  {activeLocationData.climate.weather === 'rainy' && "Consider bringing rain gear for this outdoor activity."}
                                  {activeLocationData.climate.weather === 'stormy' && "Weather may disrupt this outdoor activity. Have a backup plan!"}
                                  {activeLocationData.climate.weather === 'snowy' && "Snow gear needed for this outdoor activity."}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 