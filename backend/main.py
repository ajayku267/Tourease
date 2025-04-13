from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import os
import json
import uvicorn

# Import routers
from routers import tour_guides, tours, destinations

app = FastAPI(
    title="TourEase API",
    description="Backend API for the TourEase travel platform",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3005", "http://localhost:3000", "http://localhost:3008", "http://localhost:8000", "https://tourease.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check model
class HealthCheck(BaseModel):
    status: str
    timestamp: datetime

# Data loading function
def load_data(file_name):
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    file_path = os.path.join(data_dir, file_name)
    
    if not os.path.exists(file_path):
        return []
    
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_name}: {str(e)}")
        return []

# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to the TourEase API",
        "documentation": "/docs",
        "redoc": "/redoc"
    }

# Health check endpoint
@app.get("/health", response_model=HealthCheck, tags=["Health"])
async def health_check():
    return HealthCheck(
        status="OK",
        timestamp=datetime.now()
    )

# Include routers
app.include_router(tour_guides.router)
app.include_router(tours.router)
app.include_router(destinations.router)
# app.include_router(bookings.router)

if __name__ == "__main__":
    # Ensure data directory exists
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    os.makedirs(data_dir, exist_ok=True)
    
    # Check if data initialization script exists and run it if needed
    if not os.path.exists(os.path.join(data_dir, "tour_guides.json")) or not os.path.exists(os.path.join(data_dir, "tours.json")):
        print("Data files not found. Running initialization script...")
        try:
            import initialize_data
            initialize_data.save_data()
        except ImportError:
            print("Warning: initialize_data.py not found or failed to run.")
    
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 