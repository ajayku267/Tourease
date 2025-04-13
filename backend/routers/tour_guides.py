import os
import json
from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
import sys

# Add parent directory to path to import from main
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

router = APIRouter(
    prefix="/tour-guides",
    tags=["Tour Guides"],
    responses={404: {"description": "Tour guide not found"}},
)

# Replace import from main to avoid circular import
# from main import load_data

# Copy of the load_data function from main.py
def load_data(file_name):
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
    file_path = os.path.join(data_dir, file_name)
    
    if not os.path.exists(file_path):
        return []
    
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_name}: {str(e)}")
        return []

# Tour Guide models
class TourGuideContact(BaseModel):
    email: str
    phone: str

class TourGuideAvailability(BaseModel):
    days: List[str]
    hours: str

class TourGuideBase(BaseModel):
    name: str
    age: int = Field(..., ge=18, le=99)
    languages: List[str]
    specialization: str
    experience_years: int = Field(..., ge=0)
    bio: str
    contact: TourGuideContact
    availability: TourGuideAvailability
    certifications: List[str]
    profile_image: str
    rating: float = Field(..., ge=0, le=5)

class TourGuideCreate(TourGuideBase):
    pass

class TourGuide(TourGuideBase):
    id: str
    tours_conducted: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Helper function to load tour guides data
def get_tour_guides():
    return load_data("tour_guides.json")

@router.get("/", response_model=List[TourGuide])
async def get_all_tour_guides(
    specialization: Optional[str] = None,
    language: Optional[str] = None,
    min_rating: Optional[float] = Query(None, ge=0, le=5),
    sort_by: Optional[str] = "rating"
):
    """
    Get all tour guides with optional filtering.
    """
    tour_guides = get_tour_guides()
    
    # Apply filters
    if specialization:
        tour_guides = [tg for tg in tour_guides if specialization.lower() in tg["specialization"].lower()]
    
    if language:
        tour_guides = [tg for tg in tour_guides if language.lower() in [lang.lower() for lang in tg["languages"]]]
    
    if min_rating is not None:
        tour_guides = [tg for tg in tour_guides if tg["rating"] >= min_rating]
    
    # Apply sorting
    if sort_by == "rating":
        tour_guides = sorted(tour_guides, key=lambda tg: tg["rating"], reverse=True)
    elif sort_by == "experience":
        tour_guides = sorted(tour_guides, key=lambda tg: tg["experience_years"], reverse=True)
    elif sort_by == "name":
        tour_guides = sorted(tour_guides, key=lambda tg: tg["name"])
    
    return tour_guides

@router.get("/{guide_id}", response_model=TourGuide)
async def get_tour_guide(guide_id: str):
    """
    Get a specific tour guide by ID.
    """
    tour_guides = get_tour_guides()
    for guide in tour_guides:
        if guide["id"] == guide_id:
            return guide
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Tour guide with ID {guide_id} not found"
    ) 