# TourEase Backend

## Overview
This is the backend API for the TourEase travel platform. It provides endpoints for managing tour guides, tours, and related functionality.

## Directory Structure
- `/data`: JSON files for storing sample data
- `/routers`: API route definitions for different resources
- `main.py`: Main FastAPI application entry point
- `initialize_data.py`: Script to generate sample data

## Getting Started

### Prerequisites
- Python 3.8+
- FastAPI
- Uvicorn

### Installation
1. Install dependencies:
```
pip install -r requirements.txt
```

2. Initialize sample data:
```
python initialize_data.py
```

3. Start the server:
```
python main.py
```
or
```
uvicorn main:app --reload
```

## API Documentation
Once the server is running, you can access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Available Endpoints

### Tour Guides
- `GET /tour-guides`: List all tour guides
  - Query parameters: specialization, language, min_rating, sort_by
- `GET /tour-guides/{guide_id}`: Get a specific tour guide

### Tours
- `GET /tours`: List all tours
  - Query parameters: location, guide_id, language, min_price, max_price, sort_by
- `GET /tours/{tour_id}`: Get a specific tour
- `GET /tours/{tour_id}/guide`: Get the guide for a specific tour

## Data Format

### Tour Guide
```json
{
  "id": "tg-001",
  "name": "Emma Rodriguez",
  "age": 32,
  "languages": ["English", "Spanish", "French"],
  "specialization": "Historical Tours",
  "experience_years": 8,
  "rating": 4.9,
  "bio": "Passionate historian with extensive knowledge...",
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
  "tours_conducted": 245
}
```

### Tour
```json
{
  "id": "tour-001",
  "name": "Historical Rome Walking Tour",
  "description": "Explore ancient Rome's most significant sites...",
  "duration_hours": 3,
  "price": 49.99,
  "location": "Rome, Italy",
  "max_participants": 12,
  "guide_id": "tg-001",
  "rating": 4.8,
  "languages": ["English", "Spanish"],
  "includes": ["Professional guide", "Small group experience", "Entry tickets"],
  "meeting_point": "Spanish Steps, Rome"
}
```

## Development
To add new features or modify existing ones:
1. Define models in the appropriate router files
2. Add routes to handle the new functionality
3. Update the main.py file to include any new routers

## Testing
Manual testing can be done through the Swagger UI interface at http://localhost:8000/docs. 