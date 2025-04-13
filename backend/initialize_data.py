import os
import json
from datetime import datetime

# Ensure data directory exists
data_dir = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(data_dir, exist_ok=True)

# Sample tour guide data
tour_guides = [
    {
        "id": "tg-001",
        "name": "Emma Rodriguez",
        "age": 32,
        "languages": ["English", "Spanish", "French"],
        "specialization": "Historical Tours",
        "experience_years": 8,
        "rating": 4.9,
        "bio": "Passionate historian with extensive knowledge of European architecture and cultural heritage.",
        "contact": {
            "email": "emma.r@tourease.com",
            "phone": "+1-555-123-4567"
        },
        "availability": {
            "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "hours": "9:00 AM - 6:00 PM"
        },
        "certifications": ["Licensed Tour Guide", "First Aid Certified", "History Major"],
        "profile_image": "/placeholders/profile-placeholder.jpg",
        "tours_conducted": 245,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    },
    {
        "id": "tg-002",
        "name": "David Chen",
        "age": 29,
        "languages": ["English", "Mandarin", "Japanese"],
        "specialization": "Adventure Tours",
        "experience_years": 5,
        "rating": 4.7,
        "bio": "Adventure enthusiast specialized in hiking, mountain climbing, and outdoor survival.",
        "contact": {
            "email": "david.c@tourease.com",
            "phone": "+1-555-987-6543"
        },
        "availability": {
            "days": ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "hours": "8:00 AM - 5:00 PM"
        },
        "certifications": ["Wilderness First Responder", "Rock Climbing Instructor", "Survival Training"],
        "profile_image": "/placeholders/profile-placeholder.jpg",
        "tours_conducted": 132,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    },
    {
        "id": "tg-003",
        "name": "Sophie Martin",
        "age": 35,
        "languages": ["English", "French", "German"],
        "specialization": "Culinary Tours",
        "experience_years": 10,
        "rating": 4.8,
        "bio": "Former chef turned tour guide with expertise in local cuisines and food markets across Europe.",
        "contact": {
            "email": "sophie.m@tourease.com",
            "phone": "+1-555-456-7890"
        },
        "availability": {
            "days": ["Monday", "Tuesday", "Friday", "Saturday", "Sunday"],
            "hours": "10:00 AM - 7:00 PM"
        },
        "certifications": ["Culinary Arts Degree", "Food Safety Certificate", "Wine Sommelier"],
        "profile_image": "/placeholders/profile-placeholder.jpg",
        "tours_conducted": 189,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
]

# Sample tour data
tours = [
    {
        "id": "tour-001",
        "name": "Historical Rome Walking Tour",
        "description": "Explore ancient Rome's most significant sites with expert historical commentary.",
        "duration_hours": 3,
        "price": 49.99,
        "location": "Rome, Italy",
        "max_participants": 12,
        "guide_id": "tg-001",
        "rating": 4.8,
        "languages": ["English", "Spanish"],
        "includes": ["Professional guide", "Small group experience", "Entry tickets"],
        "meeting_point": "Spanish Steps, Rome",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    },
    {
        "id": "tour-002",
        "name": "Mount Fuji Hiking Adventure",
        "description": "A challenging day hike on Japan's iconic mountain with stunning views.",
        "duration_hours": 8,
        "price": 89.99,
        "location": "Mount Fuji, Japan",
        "max_participants": 8,
        "guide_id": "tg-002",
        "rating": 4.7,
        "languages": ["English", "Japanese"],
        "includes": ["Expert guide", "Safety equipment", "Lunch box", "Transportation"],
        "meeting_point": "Fujinomiya 5th Station",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    },
    {
        "id": "tour-003",
        "name": "Paris Gourmet Food Tour",
        "description": "Taste your way through Parisian markets, bakeries, and specialty food shops.",
        "duration_hours": 4,
        "price": 69.99,
        "location": "Paris, France",
        "max_participants": 10,
        "guide_id": "tg-003",
        "rating": 4.9,
        "languages": ["English", "French"],
        "includes": ["Food tastings", "Wine samples", "Market tour", "Recipe booklet"],
        "meeting_point": "Le Marais district, Paris",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
]

# Sample destinations data
destinations = [
    {
        "id": "dest-001",
        "name": "United States",
        "capital": "Washington, D.C.",
        "region": "Americas",
        "subregion": "North America",
        "population": 331002651,
        "languages": ["English"],
        "currencies": ["United States Dollar"],
        "flag": "https://flagcdn.com/w320/us.png",
        "coordinates": [38, -97],
        "timezones": ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC+10:00", "UTC+12:00"]
    },
    {
        "id": "dest-002",
        "name": "France",
        "capital": "Paris",
        "region": "Europe",
        "subregion": "Western Europe",
        "population": 67391582,
        "languages": ["French"],
        "currencies": ["Euro"],
        "flag": "https://flagcdn.com/w320/fr.png",
        "coordinates": [46, 2],
        "timezones": ["UTC-10:00", "UTC-09:30", "UTC-09:00", "UTC-08:00", "UTC-04:00", "UTC-03:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"]
    },
    {
        "id": "dest-003",
        "name": "Japan",
        "capital": "Tokyo",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "population": 125836021,
        "languages": ["Japanese"],
        "currencies": ["Japanese Yen"],
        "flag": "https://flagcdn.com/w320/jp.png",
        "coordinates": [36, 138],
        "timezones": ["UTC+09:00"]
    },
    {
        "id": "dest-004",
        "name": "Australia",
        "capital": "Canberra",
        "region": "Oceania",
        "subregion": "Australia and New Zealand",
        "population": 25687041,
        "languages": ["English"],
        "currencies": ["Australian Dollar"],
        "flag": "https://flagcdn.com/w320/au.png",
        "coordinates": [-27, 133],
        "timezones": ["UTC+05:00", "UTC+06:30", "UTC+07:00", "UTC+08:00", "UTC+09:30", "UTC+10:00", "UTC+10:30", "UTC+11:30"]
    },
    {
        "id": "dest-005",
        "name": "South Africa",
        "capital": "Pretoria",
        "region": "Africa",
        "subregion": "Southern Africa",
        "population": 59308690,
        "languages": ["Afrikaans", "English", "Southern Ndebele", "Northern Sotho", "Southern Sotho", "Swazi", "Tswana", "Tsonga", "Venda", "Xhosa", "Zulu"],
        "currencies": ["South African Rand"],
        "flag": "https://flagcdn.com/w320/za.png",
        "coordinates": [-29, 24],
        "timezones": ["UTC+02:00"]
    },
    {
        "id": "dest-006",
        "name": "Italy",
        "capital": "Rome",
        "region": "Europe",
        "subregion": "Southern Europe",
        "population": 59554023,
        "languages": ["Italian"],
        "currencies": ["Euro"],
        "flag": "https://flagcdn.com/w320/it.png",
        "coordinates": [42.83333333, 12.83333333],
        "timezones": ["UTC+01:00"]
    },
    {
        "id": "dest-007",
        "name": "Thailand",
        "capital": "Bangkok",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "population": 69625582,
        "languages": ["Thai"],
        "currencies": ["Thai baht"],
        "flag": "https://flagcdn.com/w320/th.png",
        "coordinates": [15, 100],
        "timezones": ["UTC+07:00"]
    },
    {
        "id": "dest-008",
        "name": "Brazil",
        "capital": "Brasília",
        "region": "Americas",
        "subregion": "South America",
        "population": 212559409,
        "languages": ["Portuguese"],
        "currencies": ["Brazilian real"],
        "flag": "https://flagcdn.com/w320/br.png",
        "coordinates": [-10, -55],
        "timezones": ["UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00"]
    },
    {
        "id": "dest-009",
        "name": "Egypt",
        "capital": "Cairo",
        "region": "Africa",
        "subregion": "Northern Africa",
        "population": 102334403,
        "languages": ["Arabic"],
        "currencies": ["Egyptian pound"],
        "flag": "https://flagcdn.com/w320/eg.png",
        "coordinates": [27, 30],
        "timezones": ["UTC+02:00"]
    },
    {
        "id": "dest-010",
        "name": "Mexico",
        "capital": "Mexico City",
        "region": "Americas",
        "subregion": "North America",
        "population": 128932753,
        "languages": ["Spanish"],
        "currencies": ["Mexican peso"],
        "flag": "https://flagcdn.com/w320/mx.png",
        "coordinates": [23, -102],
        "timezones": ["UTC-08:00", "UTC-07:00", "UTC-06:00"]
    }
]

# Write data to JSON files
def save_data():
    try:
        # Convert datetime objects to strings for JSON serialization
        tour_guides_json = json.dumps(tour_guides, default=str, indent=2)
        tours_json = json.dumps(tours, default=str, indent=2)
        destinations_json = json.dumps(destinations, default=str, indent=2)
        
        with open(os.path.join(data_dir, "tour_guides.json"), "w") as f:
            f.write(tour_guides_json)
        
        with open(os.path.join(data_dir, "tours.json"), "w") as f:
            f.write(tours_json)
            
        with open(os.path.join(data_dir, "destinations.json"), "w") as f:
            f.write(destinations_json)
        
        print(f"Data files created in {data_dir}")
        print(f"- tour_guides.json: {len(tour_guides)} records")
        print(f"- tours.json: {len(tours)} records")
        print(f"- destinations.json: {len(destinations)} records")
        return True
    except Exception as e:
        print(f"Error saving data: {str(e)}")
        return False

if __name__ == "__main__":
    print("Initializing TourEase sample data...")
    if save_data():
        print("Data initialization complete. Sample data generated successfully.")
    else:
        print("Failed to initialize data. Please check permissions and try again.") 