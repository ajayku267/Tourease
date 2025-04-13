from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
import sys
import os
import json

# Remove this to avoid circular import
# Add parent directory to path to import from main
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
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

# Tour models
class TourBase(BaseModel):
    name: str
    description: str
    duration_hours: float = Field(..., gt=0)
    price: float = Field(..., ge=0)
    location: str
    max_participants: int = Field(..., gt=0)
    guide_id: str
    languages: List[str]
    includes: List[str]
    meeting_point: str

class TourCreate(TourBase):
    pass

class Tour(TourBase):
    id: str
    rating: float = Field(..., ge=0, le=5)
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

router = APIRouter(
    prefix="/tours",
    tags=["Tours"],
    responses={404: {"description": "Tour not found"}},
)

# Helper function to load tours data
def get_tours():
    return load_data("tours.json")

# Helper function to load tour guides data
def get_tour_guides():
    return load_data("tour_guides.json")

@router.get("/", response_model=List[Tour])
async def get_all_tours(
    location: Optional[str] = None,
    guide_id: Optional[str] = None,
    language: Optional[str] = None,
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    sort_by: Optional[str] = "rating"
):
    """
    Get all tours with optional filtering.
    """
    tours = get_tours()
    
    # Apply filters
    if location:
        tours = [t for t in tours if location.lower() in t["location"].lower()]
    
    if guide_id:
        tours = [t for t in tours if t["guide_id"] == guide_id]
    
    if language:
        tours = [t for t in tours if language.lower() in [lang.lower() for lang in t["languages"]]]
    
    if min_price is not None:
        tours = [t for t in tours if t["price"] >= min_price]
    
    if max_price is not None:
        tours = [t for t in tours if t["price"] <= max_price]
    
    # Apply sorting
    if sort_by == "rating":
        tours = sorted(tours, key=lambda t: t["rating"], reverse=True)
    elif sort_by == "price_low":
        tours = sorted(tours, key=lambda t: t["price"])
    elif sort_by == "price_high":
        tours = sorted(tours, key=lambda t: t["price"], reverse=True)
    elif sort_by == "duration":
        tours = sorted(tours, key=lambda t: t["duration_hours"])
    
    return tours

@router.get("/{tour_id}", response_model=Tour)
async def get_tour(tour_id: str):
    """
    Get a specific tour by ID.
    """
    tours = get_tours()
    for tour in tours:
        if tour["id"] == tour_id:
            return tour
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Tour with ID {tour_id} not found"
    )

@router.get("/{tour_id}/guide", response_model=dict)
async def get_tour_guide(tour_id: str):
    """
    Get the guide information for a specific tour.
    """
    tours = get_tours()
    tour = None
    for t in tours:
        if t["id"] == tour_id:
            tour = t
            break
    
    if not tour:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tour with ID {tour_id} not found"
        )
    
    guides = get_tour_guides()
    for guide in guides:
        if guide["id"] == tour["guide_id"]:
            return guide
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Guide for tour {tour_id} not found"
    ) 