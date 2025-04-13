from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
import httpx
import os
import json
from datetime import datetime

router = APIRouter(
    prefix="/destinations",
    tags=["Destinations"],
    responses={404: {"description": "Not found"}},
)

# Cache for API responses to avoid rate limiting
cache = {}
cache_timeout = 3600  # 1 hour

# Base data directory path
data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")

# Function to save destinations data
def save_destinations(destinations):
    try:
        file_path = os.path.join(data_dir, "destinations.json")
        with open(file_path, 'w') as f:
            json.dump(destinations, f, indent=2)
        return True
    except Exception as e:
        print(f"Error saving destinations: {str(e)}")
        return False

# Function to load destinations from local file
def load_destinations():
    file_path = os.path.join(data_dir, "destinations.json")
    if not os.path.exists(file_path):
        return []
    
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading destinations: {str(e)}")
        return []

# Helper function to convert weather codes to descriptions
def get_weather_description(code):
    weather_codes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    }
    return weather_codes.get(code, "Unknown")

# Define all the endpoints with exact paths first (no path parameters)

@router.get("/trending", response_model=List[dict])
async def get_trending_destinations(limit: int = Query(5, ge=1, le=20)):
    """
    Get a list of trending travel destinations.
    
    This endpoint returns a curated list of destinations that are currently trending based on 
    real-time data and seasonal travel patterns.
    """
    cache_key = f"trending_{limit}"
    
    # Check cache first
    if cache_key in cache:
        return cache[cache_key]
    
    # Get base destinations data
    destinations = load_destinations()
    
    if not destinations:
        raise HTTPException(status_code=500, detail="Destination data not available")
    
    # In a real application, we would integrate with a travel API like Amadeus or Skyscanner
    # For demonstration, we'll simulate trending by selecting destinations from specific regions 
    # based on current season (northern hemisphere)
    
    # Get current month to determine season (approximate)
    current_month = datetime.now().month
    
    # Determine season and trending regions
    if 3 <= current_month <= 5:  # Spring
        trending_regions = ["Europe", "Asia"]
        trending_subregions = ["Southern Europe", "Eastern Asia", "South-Eastern Asia"]
    elif 6 <= current_month <= 8:  # Summer
        trending_regions = ["Europe", "North America"]
        trending_subregions = ["Mediterranean", "Northern Europe", "Western Europe", "Caribbean"]
    elif 9 <= current_month <= 11:  # Fall
        trending_regions = ["Asia", "Oceania"]
        trending_subregions = ["South-Eastern Asia", "Australia and New Zealand"]
    else:  # Winter
        trending_regions = ["North America", "Asia", "Oceania"]
        trending_subregions = ["Caribbean", "South-Eastern Asia", "Polynesia"]
    
    # Filter destinations by trending regions and subregions
    trending_destinations = [
        d for d in destinations 
        if d.get("region") in trending_regions or d.get("subregion") in trending_subregions
    ]
    
    # If we don't have enough trending destinations, fallback to popular ones
    if len(trending_destinations) < limit:
        trending_destinations = sorted(destinations, key=lambda x: x.get("population", 0), reverse=True)
    
    # Add trending score (calculated based on region, population, and a "seasonal factor")
    for destination in trending_destinations:
        region_score = 2 if destination.get("region") in trending_regions else 1
        subregion_score = 3 if destination.get("subregion") in trending_subregions else 1
        population_factor = min(destination.get("population", 0) / 10000000, 10)  # Cap at 10
        
        # Calculate trending score
        destination["trending_score"] = (region_score * subregion_score * population_factor)
    
    # Sort by trending score
    trending_destinations = sorted(trending_destinations, key=lambda x: x.get("trending_score", 0), reverse=True)
    
    # Cache results
    result = trending_destinations[:limit]
    cache[cache_key] = result
    
    return result

@router.get("/popular", response_model=List[dict])
async def get_popular_destinations(limit: int = Query(5, ge=1, le=20)):
    """
    Get a list of popular travel destinations.
    
    This endpoint returns destinations with high populations as a proxy for popularity.
    """
    destinations = load_destinations()
    
    # Sort by population (higher = more popular for this simple example)
    sorted_destinations = sorted(destinations, key=lambda x: x.get("population", 0), reverse=True)
    
    return sorted_destinations[:limit]

@router.get("/flights", response_model=List[dict])
async def get_flight_estimates(
    origin: str = Query(..., description="Origin city code (e.g., 'NYC', 'LON')"),
    limit: int = Query(10, ge=1, le=50)
):
    """
    Get estimated flight prices to various destinations.
    
    This endpoint returns simulated flight price data that mimics real-world pricing patterns.
    In a production app, this would integrate with a flight API like Skyscanner or Amadeus.
    """
    cache_key = f"flights_{origin}_{limit}_{datetime.now().strftime('%Y-%m-%d')}"
    
    # Check cache
    if cache_key in cache:
        return cache[cache_key]
    
    # Load destinations
    destinations = load_destinations()
    if not destinations:
        raise HTTPException(status_code=500, detail="Destination data not available")
    
    # Create a deterministic but seemingly random price generator
    import hashlib
    import random
    
    # Seed the random generator with today's date + origin to ensure consistent results per day
    seed_str = f"{origin}_{datetime.now().strftime('%Y-%m-%d')}"
    seed = int(hashlib.md5(seed_str.encode()).hexdigest(), 16) % (10**8)
    random.seed(seed)
    
    # List to store flight estimates
    flight_estimates = []
    
    # Generate flight prices for destinations
    for destination in destinations[:limit]:
        # Base price factors
        distance_factor = 1.0
        popularity_factor = 1.0
        seasonal_factor = 1.0
        
        # Calculate distance factor based on region
        dest_region = destination.get("region", "")
        if dest_region == "Europe":
            distance_factor = 1.5 if origin in ["NYC", "BOS", "MIA"] else 2.5
        elif dest_region == "Asia":
            distance_factor = 2.5 if origin in ["LAX", "SFO"] else 3.0
        elif dest_region == "Africa":
            distance_factor = 2.8
        elif dest_region == "Oceania":
            distance_factor = 3.2
        elif dest_region == "South America":
            distance_factor = 1.8 if origin in ["MIA", "ATL"] else 2.2
        else:  # North America, Caribbean, etc.
            distance_factor = 1.0
        
        # Popularity affects price (more popular = higher price)
        population = destination.get("population", 0)
        popularity_factor = min(1.0 + (population / 50000000), 1.5)
        
        # Seasonal variations
        current_month = datetime.now().month
        if 6 <= current_month <= 8:  # Summer
            if dest_region in ["Europe", "North America"]:
                seasonal_factor = 1.3  # Summer premium for popular destinations
        elif 11 <= current_month <= 1:  # Winter holiday season
            seasonal_factor = 1.25  # Holiday premium
        
        # Base price calculation (in USD)
        base_price = 250 * distance_factor
        
        # Add "randomness" to make prices look realistic
        random_factor = 0.8 + (random.random() * 0.4)  # 0.8 to 1.2
        
        # Calculate final price
        flight_price = round(base_price * popularity_factor * seasonal_factor * random_factor, -1)  # Round to nearest 10
        
        # Create flight estimate object
        flight_info = {
            "destination_id": destination["id"],
            "destination_name": destination["name"],
            "origin": origin,
            "price_estimate": {
                "currency": "USD",
                "amount": flight_price,
                "updated_at": datetime.now().isoformat()
            },
            "flight_time_estimate": f"{round(distance_factor * 3)} hours",
            "price_trend": random.choice(["rising", "stable", "falling"]),
            "best_time_to_book": random.choice(["Now", "1 week ahead", "1 month ahead"]),
            "data_source": "Simulated data"
        }
        
        flight_estimates.append(flight_info)
    
    # Sort by price (lowest first)
    flight_estimates.sort(key=lambda x: x["price_estimate"]["amount"])
    
    # Cache the results
    cache[cache_key] = flight_estimates
    
    return flight_estimates

@router.get("/", response_model=List[dict])
async def get_destinations(
    query: Optional[str] = None,
    country: Optional[str] = None,
    limit: int = Query(10, ge=1, le=50)
):
    """
    Get a list of destinations with real travel data.
    
    Uses CountryAPI to get real country data.
    """
    cache_key = f"destinations_{query}_{country}_{limit}"
    
    # Check if we have cached data
    if cache_key in cache:
        return cache[cache_key][:limit]
    
    # Check if we have local data
    local_data = load_destinations()
    if local_data:
        destinations = local_data
    else:
        # Fetch real data from API
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get("https://restcountries.com/v3.1/all")
                response.raise_for_status()
                countries_data = response.json()
                
                destinations = []
                for country in countries_data:
                    try:
                        destination = {
                            "id": f"dest-{len(destinations) + 1:03d}",
                            "name": country.get("name", {}).get("common", "Unknown"),
                            "capital": country.get("capital", ["Unknown"])[0] if country.get("capital") else "Unknown",
                            "region": country.get("region", "Unknown"),
                            "subregion": country.get("subregion", "Unknown"),
                            "population": country.get("population", 0),
                            "languages": list(country.get("languages", {}).values()) if country.get("languages") else [],
                            "currencies": [curr["name"] for curr in country.get("currencies", {}).values()] if country.get("currencies") else [],
                            "flag": country.get("flags", {}).get("png", ""),
                            "coordinates": country.get("latlng", [0, 0]),
                            "timezones": country.get("timezones", []),
                            "created_at": datetime.now().isoformat(),
                            "updated_at": datetime.now().isoformat()
                        }
                        destinations.append(destination)
                    except Exception as e:
                        print(f"Error processing country data: {str(e)}")
                
                # Save data to file for future use
                save_destinations(destinations)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch destinations: {str(e)}")
    
    # Filter by query
    if query:
        query = query.lower()
        destinations = [
            d for d in destinations 
            if query in d["name"].lower() or 
               query in d.get("capital", "").lower() or
               query in d.get("region", "").lower()
        ]
    
    # Filter by country
    if country:
        country = country.lower()
        destinations = [
            d for d in destinations 
            if country in d["name"].lower()
        ]
    
    # Cache the results
    cache[cache_key] = destinations
    
    return destinations[:limit]

# These endpoints have path parameters, so they should be defined after the fixed-path endpoints

@router.get("/{destination_id}/weather", response_model=dict)
async def get_destination_weather(destination_id: str):
    """
    Get current weather information for a specific destination.
    
    This endpoint returns real weather data for the destination.
    """
    destinations = load_destinations()
    
    # Find the destination
    destination = None
    for d in destinations:
        if d["id"] == destination_id:
            destination = d
            break
    
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    cache_key = f"weather_{destination_id}_{datetime.now().strftime('%Y-%m-%d')}"
    
    # Check cache
    if cache_key in cache:
        return cache[cache_key]
    
    # Get coordinates for the destination
    coords = destination.get("coordinates", [0, 0])
    if not coords or len(coords) < 2:
        raise HTTPException(status_code=404, detail="Destination coordinates not available")
    
    # Use Open-Meteo API for weather data (doesn't require API key)
    try:
        lat, lng = coords
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                "https://api.open-meteo.com/v1/forecast",
                params={
                    "latitude": lat,
                    "longitude": lng,
                    "current": "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m",
                    "timezone": "auto"
                }
            )
            response.raise_for_status()
            weather_data = response.json()
            
            # Format the weather data
            if "current" in weather_data:
                current = weather_data["current"]
                weather_info = {
                    "destination_id": destination_id,
                    "destination_name": destination["name"],
                    "temperature": {
                        "value": current.get("temperature_2m", 0),
                        "unit": weather_data.get("current_units", {}).get("temperature_2m", "°C")
                    },
                    "apparent_temperature": {
                        "value": current.get("apparent_temperature", 0),
                        "unit": weather_data.get("current_units", {}).get("apparent_temperature", "°C")
                    },
                    "humidity": {
                        "value": current.get("relative_humidity_2m", 0),
                        "unit": weather_data.get("current_units", {}).get("relative_humidity_2m", "%")
                    },
                    "precipitation": {
                        "value": current.get("precipitation", 0),
                        "unit": weather_data.get("current_units", {}).get("precipitation", "mm")
                    },
                    "wind_speed": {
                        "value": current.get("wind_speed_10m", 0),
                        "unit": weather_data.get("current_units", {}).get("wind_speed_10m", "km/h")
                    },
                    "weather_code": current.get("weather_code", 0),
                    "weather_description": get_weather_description(current.get("weather_code", 0)),
                    "timestamp": current.get("time", datetime.now().isoformat()),
                    "data_source": "Open-Meteo API"
                }
                
                # Cache the result
                cache[cache_key] = weather_info
                
                return weather_info
            else:
                raise HTTPException(status_code=500, detail="Weather data format not as expected")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather data: {str(e)}")

@router.get("/{destination_id}", response_model=dict)
async def get_destination(destination_id: str):
    """
    Get detailed information about a specific destination.
    """
    destinations = load_destinations()
    
    for destination in destinations:
        if destination["id"] == destination_id:
            return destination
    
    raise HTTPException(status_code=404, detail="Destination not found") 