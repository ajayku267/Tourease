from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime, date
import uuid

# Router
router = APIRouter(prefix="/guides", tags=["Tour Guides"])

# Models
class TourGuideBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    languages: List[str]
    expertise: List[str]
    location: str
    bio: str
    years_experience: int
    hourly_rate: float
    
class TourGuideCreate(TourGuideBase):
    pass
    
class TourGuide(TourGuideBase):
    id: str
    rating: float = 0.0
    verified: bool = False
    availability: List[date] = []
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class ReviewBase(BaseModel):
    rating: float = Field(..., ge=1, le=5)
    comment: str
    
class ReviewCreate(ReviewBase):
    pass
    
class Review(ReviewBase):
    id: str
    guide_id: str
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Mock database
guides_db = []
reviews_db = []

# Helper functions
def get_guide(guide_id: str):
    for guide in guides_db:
        if guide["id"] == guide_id:
            return guide
    return None

# Routes
@router.get("/", response_model=List[TourGuide])
async def get_all_guides():
    """
    Retrieve all tour guides.
    """
    return guides_db

@router.get("/{guide_id}", response_model=TourGuide)
async def get_guide_by_id(guide_id: str):
    """
    Retrieve a specific tour guide by ID.
    """
    guide = get_guide(guide_id)
    if not guide:
        raise HTTPException(status_code=404, detail="Tour guide not found")
    return guide

@router.post("/", response_model=TourGuide, status_code=status.HTTP_201_CREATED)
async def create_tour_guide(guide: TourGuideCreate):
    """
    Create a new tour guide.
    """
    guide_dict = guide.dict()
    guide_dict.update({
        "id": str(uuid.uuid4()),
        "rating": 0.0,
        "verified": False,
        "availability": [],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    })
    guides_db.append(guide_dict)
    return guide_dict

@router.put("/{guide_id}", response_model=TourGuide)
async def update_tour_guide(guide_id: str, guide: TourGuideBase):
    """
    Update an existing tour guide.
    """
    existing_guide = get_guide(guide_id)
    if not existing_guide:
        raise HTTPException(status_code=404, detail="Tour guide not found")
    
    guide_dict = guide.dict()
    existing_guide.update(guide_dict)
    existing_guide["updated_at"] = datetime.now()
    
    return existing_guide

@router.delete("/{guide_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tour_guide(guide_id: str):
    """
    Delete a tour guide.
    """
    guide = get_guide(guide_id)
    if not guide:
        raise HTTPException(status_code=404, detail="Tour guide not found")
    
    guides_db.remove(guide)
    return None

@router.get("/{guide_id}/reviews", response_model=List[Review])
async def get_guide_reviews(guide_id: str):
    """
    Retrieve all reviews for a specific tour guide.
    """
    guide = get_guide(guide_id)
    if not guide:
        raise HTTPException(status_code=404, detail="Tour guide not found")
    
    return [review for review in reviews_db if review["guide_id"] == guide_id]

@router.post("/{guide_id}/reviews", response_model=Review, status_code=status.HTTP_201_CREATED)
async def add_guide_review(guide_id: str, review: ReviewCreate, user_id: str = "mock_user_id"):
    """
    Add a review for a specific tour guide.
    """
    guide = get_guide(guide_id)
    if not guide:
        raise HTTPException(status_code=404, detail="Tour guide not found")
    
    review_dict = review.dict()
    review_dict.update({
        "id": str(uuid.uuid4()),
        "guide_id": guide_id,
        "user_id": user_id,
        "created_at": datetime.now()
    })
    
    reviews_db.append(review_dict)
    
    # Update guide rating
    guide_reviews = [r for r in reviews_db if r["guide_id"] == guide_id]
    if guide_reviews:
        total_rating = sum(r["rating"] for r in guide_reviews)
        guide["rating"] = total_rating / len(guide_reviews)
    
    return review_dict

@router.get("/search/", response_model=List[TourGuide])
async def search_guides(
    location: Optional[str] = None,
    language: Optional[str] = None,
    expertise: Optional[str] = None,
    min_rating: Optional[float] = None,
    max_rate: Optional[float] = None
):
    """
    Search for tour guides based on various criteria.
    """
    results = guides_db.copy()
    
    if location:
        results = [g for g in results if location.lower() in g["location"].lower()]
    
    if language:
        results = [g for g in results if language.lower() in [l.lower() for l in g["languages"]]]
    
    if expertise:
        results = [g for g in results if expertise.lower() in [e.lower() for e in g["expertise"]]]
    
    if min_rating is not None:
        results = [g for g in results if g["rating"] >= min_rating]
    
    if max_rate is not None:
        results = [g for g in results if g["hourly_rate"] <= max_rate]
    
    return results
