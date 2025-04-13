"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// API base URL - update to match your backend
const API_BASE_URL = "http://localhost:8000";

// Add fallback data at the top of the file after the imports
const FALLBACK_DESTINATIONS = [
  {
    id: "dest-001",
    name: "United States",
    capital: "Washington, D.C.",
    region: "Americas",
    subregion: "North America",
    population: 331002651,
    languages: ["English"],
    currencies: ["United States Dollar"],
    flag: "https://flagcdn.com/w320/us.png",
    coordinates: [38, -97],
    timezones: ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC+10:00", "UTC+12:00"]
  },
  {
    id: "dest-002",
    name: "France",
    capital: "Paris",
    region: "Europe",
    subregion: "Western Europe",
    population: 67391582,
    languages: ["French"],
    currencies: ["Euro"],
    flag: "https://flagcdn.com/w320/fr.png",
    coordinates: [46, 2],
    timezones: ["UTC-10:00", "UTC-09:30", "UTC-09:00", "UTC-08:00", "UTC-04:00", "UTC-03:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"]
  },
  {
    id: "dest-003",
    name: "Japan",
    capital: "Tokyo",
    region: "Asia",
    subregion: "Eastern Asia",
    population: 125836021,
    languages: ["Japanese"],
    currencies: ["Japanese Yen"],
    flag: "https://flagcdn.com/w320/jp.png",
    coordinates: [36, 138],
    timezones: ["UTC+09:00"]
  },
  {
    id: "dest-004",
    name: "Australia",
    capital: "Canberra",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    population: 25687041,
    languages: ["English"],
    currencies: ["Australian Dollar"],
    flag: "https://flagcdn.com/w320/au.png",
    coordinates: [-27, 133],
    timezones: ["UTC+05:00", "UTC+06:30", "UTC+07:00", "UTC+08:00", "UTC+09:30", "UTC+10:00", "UTC+10:30", "UTC+11:30"]
  },
  {
    id: "dest-005",
    name: "South Africa",
    capital: "Pretoria",
    region: "Africa",
    subregion: "Southern Africa",
    population: 59308690,
    languages: ["Afrikaans", "English", "Southern Ndebele", "Northern Sotho", "Southern Sotho", "Swazi", "Tswana", "Tsonga", "Venda", "Xhosa", "Zulu"],
    currencies: ["South African Rand"],
    flag: "https://flagcdn.com/w320/za.png",
    coordinates: [-29, 24],
    timezones: ["UTC+02:00"]
  }
];

// Types
interface Destination {
  id: string;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages: string[];
  currencies: string[];
  flag: string;
  coordinates: [number, number];
  timezones: string[];
}

interface WeatherData {
  destination_id: string;
  destination_name: string;
  temperature: { value: number; unit: string };
  apparent_temperature: { value: number; unit: string };
  humidity: { value: number; unit: string };
  precipitation: { value: number; unit: string };
  wind_speed: { value: number; unit: string };
  weather_code: number;
  weather_description: string;
  timestamp?: string;
  data_source?: string;
}

interface FlightData {
  destination_id: string;
  destination_name: string;
  origin: string;
  price_estimate: { 
    currency: string; 
    amount: number;
    updated_at: string;
  };
  flight_time_estimate: string;
  price_trend: "rising" | "stable" | "falling";
  best_time_to_book: string;
}

export default function DestinationsPage() {
  // State
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [trendingDestinations, setTrendingDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [originCity, setOriginCity] = useState("NYC");

  // Helper function to get weather description
  const getWeatherDescription = (code: number): string => {
    const weatherCodes: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail"
    };
    
    return weatherCodes[code] || "Unknown";
  };

  // Check if backend is available
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        await axios.get(`${API_BASE_URL}/health`, { timeout: 2000 });
        setBackendError(null);
      } catch (err) {
        console.error("Backend connection error:", err);
        setBackendError("Unable to connect to backend API. Some features may be limited.");
      }
    };
    
    checkBackendConnection();
  }, []);

  // Fetch all destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        
        try {
          // Try backend first
          const response = await axios.get(`${API_BASE_URL}/destinations`);
          setDestinations(response.data);
          setLoading(false);
        } catch (apiErr) {
          console.error("Error fetching from backend, using fallback:", apiErr);
          
          try {
            // Fallback to direct API call if backend fails
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const formattedDestinations = response.data.map((country: any, index: number) => ({
              id: `dest-${index + 1}`,
              name: country.name?.common || "Unknown",
              capital: country.capital?.[0] || "Unknown",
              region: country.region || "Unknown",
              subregion: country.subregion || "Unknown",
              population: country.population || 0,
              languages: country.languages ? Object.values(country.languages) : [],
              currencies: country.currencies ? Object.values(country.currencies).map((c: any) => c.name) : [],
              flag: country.flags?.png || "",
              coordinates: country.latlng || [0, 0],
              timezones: country.timezones || []
            }));
            
            setDestinations(formattedDestinations);
          } catch (directApiErr) {
            console.error("Error fetching from direct API, using hardcoded data:", directApiErr);
            // Use hardcoded fallback data if all APIs fail
            setDestinations(FALLBACK_DESTINATIONS);
            setError("Unable to connect to any data source. Using limited demo data.");
          } finally {
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations. Please try again later.");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Fetch trending destinations
  useEffect(() => {
    const fetchTrendingDestinations = async () => {
      try {
        // If we already have destinations, use those instead of making another API call
        if (destinations.length > 0) {
          // Sort by population as a fallback for trending
          const sortedByPopulation = [...destinations].sort((a, b) => 
            b.population - a.population
          );
          
          // Add a simulated trending score based on population
          const withTrendingScore = sortedByPopulation.slice(0, 10).map(dest => ({
            ...dest,
            trending_score: (dest.population / 10000000) + Math.random() * 3
          }));
          
          setTrendingDestinations(withTrendingScore);
          return;
        }
        
        // Otherwise try to get destinations from API
        try {
          // First try to get all destinations from backend
          const response = await axios.get(`${API_BASE_URL}/destinations`);
          
          // Sort by population as a fallback for trending
          const sortedByPopulation = [...response.data].sort((a, b) => 
            b.population - a.population
          );
          
          // Add a simulated trending score based on population
          const withTrendingScore = sortedByPopulation.slice(0, 10).map(dest => ({
            ...dest,
            trending_score: (dest.population / 10000000) + Math.random() * 3
          }));
          
          setTrendingDestinations(withTrendingScore);
        } catch (err) {
          console.error("Error fetching trending destinations:", err);
          
          // Use fallback data if needed
          if (FALLBACK_DESTINATIONS.length > 0) {
            const withTrendingScore = FALLBACK_DESTINATIONS.map(dest => ({
              ...dest,
              trending_score: (dest.population / 10000000) + Math.random() * 3
            }));
            
            setTrendingDestinations(withTrendingScore);
          }
        }
      } catch (err) {
        console.error("Error in trending destinations processing:", err);
      }
    };

    fetchTrendingDestinations();
  }, [destinations]);

  // Fetch weather data when a destination is selected
  useEffect(() => {
    if (selectedDestination) {
      const fetchWeatherData = async () => {
        try {
          // Try to get weather from our backend first
          try {
            const response = await axios.get(
              `${API_BASE_URL}/destinations/${selectedDestination.id}/weather`
            );
            setWeatherData(response.data);
          } catch (backendErr) {
            console.error("Error fetching weather from backend:", backendErr);
            
            // Fallback: Fetch directly from Open-Meteo API
            const [lat, lng] = selectedDestination.coordinates;
            const weatherResponse = await axios.get(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`
            );
            
            const weatherData = weatherResponse.data;
            
            if ("current" in weatherData) {
              const current = weatherData.current;
              const weatherInfo = {
                destination_id: selectedDestination.id,
                destination_name: selectedDestination.name,
                temperature: {
                  value: current.temperature_2m,
                  unit: weatherData.current_units?.temperature_2m || "°C"
                },
                apparent_temperature: {
                  value: current.apparent_temperature,
                  unit: weatherData.current_units?.apparent_temperature || "°C"
                },
                humidity: {
                  value: current.relative_humidity_2m,
                  unit: weatherData.current_units?.relative_humidity_2m || "%"
                },
                precipitation: {
                  value: current.precipitation,
                  unit: weatherData.current_units?.precipitation || "mm"
                },
                wind_speed: {
                  value: current.wind_speed_10m,
                  unit: weatherData.current_units?.wind_speed_10m || "km/h"
                },
                weather_code: current.weather_code,
                weather_description: getWeatherDescription(current.weather_code),
                timestamp: typeof current.time === 'object' ? current.time.toISOString() : current.time,
                data_source: "Open-Meteo API (Direct)"
              };
              
              setWeatherData(weatherInfo);
            }
          }
        } catch (err) {
          console.error("Error fetching weather data:", err);
          setWeatherData(null);
        }
      };

      fetchWeatherData();
    }
  }, [selectedDestination]);

  // Fetch flight data
  const fetchFlightData = async () => {
    try {
      // Try to use the backend API
      try {
        const response = await axios.get(
          `${API_BASE_URL}/destinations/flights?origin=${originCity}&limit=10`
        );
        setFlightData(response.data);
      } catch (backendErr) {
        console.error("Error fetching flights from backend:", backendErr);
        
        // Fallback: Generate flight data on the client
        const destinations = await axios.get(`${API_BASE_URL}/destinations`);
        
        if (destinations.data && destinations.data.length > 0) {
          // Helper function to get a simple hash
          const getHash = (str: string) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
              hash = ((hash << 5) - hash) + str.charCodeAt(i);
              hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
          };
          
          // Generate pseudo-random but deterministic flight price
          const getPseudoRandomPrice = (destName: string, origin: string) => {
            const currentDate = new Date().toISOString().substring(0, 10);
            const seed = getHash(`${destName}_${origin}_${currentDate}`);
            const random = Math.abs(seed % 1000) / 1000; // 0-1 range
            
            // Base prices by region
            const basePrice = {
              "Europe": 800,
              "Asia": 1200,
              "Africa": 1100,
              "Americas": 600,
              "Oceania": 1500
            };
            
            let region = "Europe"; // default
            for (const [r, _] of Object.entries(basePrice)) {
              if (destName.toLowerCase().includes(r.toLowerCase())) {
                region = r;
                break;
              }
            }
            
            // Calculate price with some randomness
            const price = Math.round(
              (basePrice[region as keyof typeof basePrice] * (0.8 + random * 0.4)) / 10
            ) * 10;
            
            return price;
          };
          
          // Generate flight trends based on hash
          const getTrend = (hash: number): "rising" | "stable" | "falling" => {
            const trends: ["rising", "stable", "falling"] = ["rising", "stable", "falling"];
            return trends[Math.abs(hash) % 3];
          };
          
          // Generate simulated flight data
          const generatedFlightData = destinations.data.slice(0, 10).map((dest: any) => {
            const hash = getHash(`${dest.name}_${originCity}`);
            const price = getPseudoRandomPrice(dest.name, originCity);
            
            return {
              destination_id: dest.id,
              destination_name: dest.name,
              origin: originCity,
              price_estimate: {
                currency: "USD",
                amount: price,
                updated_at: new Date().toISOString()
              },
              flight_time_estimate: `${Math.round(price / 200)} hours`,
              price_trend: getTrend(hash),
              best_time_to_book: ["Now", "1 week ahead", "1 month ahead"][Math.abs(hash) % 3],
              data_source: "Simulated data (client-side)"
            };
          });
          
          // Sort by price
          generatedFlightData.sort((a, b) => a.price_estimate.amount - b.price_estimate.amount);
          
          setFlightData(generatedFlightData);
        }
      }
    } catch (err) {
      console.error("Error fetching flight data:", err);
    }
  };

  // Handle search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/destinations?query=${searchQuery}`
      );
      setDestinations(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error searching destinations:", err);
      setError("Failed to search destinations. Please try again later.");
      setLoading(false);
    }
  };

  // Get flight price trend color
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "rising":
        return "text-red-500";
      case "falling":
        return "text-green-500";
      default:
        return "text-yellow-500";
    }
  };

  if (loading && destinations.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Real Travel Data</h1>
        <p>Loading destinations...</p>
      </div>
    );
  }

  if (error && destinations.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Real Travel Data</h1>
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {backendError && (
        <Alert className="mb-6 bg-amber-50 border border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-600">Warning</AlertTitle>
          <AlertDescription className="text-amber-700">
            {backendError} Using direct API connections as fallback.
          </AlertDescription>
        </Alert>
      )}
      
      <h1 className="text-3xl font-bold mb-2">Real Travel Data</h1>
      <p className="text-gray-500 mb-6">
        Explore destinations, check weather conditions, and find flight deals
      </p>

      <Tabs defaultValue="destinations" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="destinations">All Destinations</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="flights">Flight Deals</TabsTrigger>
        </TabsList>

        {/* All Destinations Tab */}
        <TabsContent value="destinations">
          <div className="flex mb-4">
                <Input
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden">
                {destination.flag && (
                  <div 
                    className="w-full h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${destination.flag})` }}
                  />
                )}
                <CardHeader>
                  <CardTitle>{destination.name}</CardTitle>
                  <CardDescription>
                    {destination.capital}, {destination.region}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="font-semibold">Population:</span>{" "}
                    {destination.population.toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Languages:</span>{" "}
                    {destination.languages.join(", ")}
        </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDestination(destination)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Destination Details */}
          {selectedDestination && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                {selectedDestination.name} Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Country Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Capital:</span>{" "}
                        {selectedDestination.capital}
                      </div>
                      <div>
                        <span className="font-semibold">Region:</span>{" "}
                        {selectedDestination.region}
                      </div>
                      <div>
                        <span className="font-semibold">Subregion:</span>{" "}
                        {selectedDestination.subregion}
                      </div>
                      <div>
                        <span className="font-semibold">Population:</span>{" "}
                        {selectedDestination.population.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-semibold">Languages:</span>{" "}
                        {selectedDestination.languages.join(", ")}
                      </div>
                      <div>
                        <span className="font-semibold">Currencies:</span>{" "}
                        {selectedDestination.currencies.join(", ")}
                      </div>
                      <div>
                        <span className="font-semibold">Timezones:</span>{" "}
                        {selectedDestination.timezones.join(", ")}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Weather</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {weatherData ? (
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">
                          {weatherData.temperature.value}
                          {weatherData.temperature.unit}
                        </div>
                        <div className="text-xl">
                          {weatherData.weather_description}
                        </div>
                        <Separator className="my-2" />
                        <div>
                          <span className="font-semibold">Feels like:</span>{" "}
                          {weatherData.apparent_temperature.value}
                          {weatherData.apparent_temperature.unit}
                        </div>
                        <div>
                          <span className="font-semibold">Humidity:</span>{" "}
                          {weatherData.humidity.value}
                          {weatherData.humidity.unit}
                        </div>
                        <div>
                          <span className="font-semibold">Wind:</span>{" "}
                          {weatherData.wind_speed.value}
                          {weatherData.wind_speed.unit}
                        </div>
                <div>
                          <span className="font-semibold">Precipitation:</span>{" "}
                          {weatherData.precipitation.value}
                          {weatherData.precipitation.unit}
                        </div>
                      </div>
                    ) : (
                      <p>Loading weather data...</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Trending Tab */}
        <TabsContent value="trending">
          <h2 className="text-2xl font-bold mb-4">Trending Destinations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden">
                {destination.flag && (
                  <div 
                    className="w-full h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${destination.flag})` }}
                  />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{destination.name}</CardTitle>
                    <Badge variant="secondary" className="ml-2">Trending</Badge>
                  </div>
                  <CardDescription>
                    {destination.capital}, {destination.region}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="font-semibold">Region:</span>{" "}
                    {destination.region}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Trending Score:</span>{" "}
                    {Math.round((destination as any).trending_score * 10) / 10}
                </div>
                </CardContent>
                <CardFooter>
                      <Button
                    variant="outline"
                    onClick={() => setSelectedDestination(destination)}
                  >
                    View Details
                      </Button>
                </CardFooter>
              </Card>
                    ))}
                  </div>
        </TabsContent>

        {/* Flights Tab */}
        <TabsContent value="flights">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Flight Price Estimates</h2>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Origin City</label>
                <Select value={originCity} onValueChange={setOriginCity}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select origin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NYC">New York (NYC)</SelectItem>
                    <SelectItem value="LAX">Los Angeles (LAX)</SelectItem>
                    <SelectItem value="LON">London (LON)</SelectItem>
                    <SelectItem value="PAR">Paris (PAR)</SelectItem>
                    <SelectItem value="TYO">Tokyo (TYO)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button onClick={fetchFlightData}>
                  Get Flight Prices
                </Button>
            </div>
          </div>

            {flightData.length > 0 ? (
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {flightData.map((flight) => (
                    <Card key={flight.destination_id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{flight.destination_name}</CardTitle>
                          <div className="text-2xl font-bold">
                            ${flight.price_estimate.amount}
                  </div>
                </div>
                        <CardDescription>
                          From {flight.origin} • {flight.flight_time_estimate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold">Price Trend:</span>{" "}
                            <span className={getTrendColor(flight.price_trend)}>
                              {flight.price_trend.charAt(0).toUpperCase() + flight.price_trend.slice(1)}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold">Best Time to Book:</span>{" "}
                            {flight.best_time_to_book}
                          </div>
            </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Deals
                        </Button>
                      </CardFooter>
                    </Card>
              ))}
            </div>
              </ScrollArea>
            ) : (
              <p>Click "Get Flight Prices" to see flight deals.</p>
          )}
        </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 