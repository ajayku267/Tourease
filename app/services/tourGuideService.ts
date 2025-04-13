import axios from 'axios';

// Changing this to a non-existent URL to prevent connection attempts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface TourGuide {
  id: string;
  name: string;
  email: string;
  phone: string;
  languages: string[];
  expertise: string[];
  location: string;
  bio: string;
  years_experience: number;
  hourly_rate: number;
  rating: number;
  verified: boolean;
  availability: string[];
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  guide_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface SearchParams {
  location?: string;
  language?: string;
  expertise?: string;
  min_rating?: number;
  max_rate?: number;
}

// Mock data to use when the API is unavailable
const MOCK_GUIDES: TourGuide[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1-555-123-4567',
    languages: ['English', 'Spanish', 'French'],
    expertise: ['Historical Tours', 'Cultural Experiences', 'Food Tours'],
    location: 'Barcelona, Spain',
    bio: 'Professional guide with 8 years of experience showing travelers the hidden gems of Barcelona. Specializes in historical tours and authentic local experiences.',
    years_experience: 8,
    hourly_rate: 45,
    rating: 4.9,
    verified: true,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    created_at: '2021-03-15T10:30:00Z',
    updated_at: '2023-01-20T14:15:00Z'
  },
  {
    id: '2',
    name: 'Miguel Torres',
    email: 'miguel.t@example.com',
    phone: '+34-612-345-678',
    languages: ['Spanish', 'English', 'Catalan'],
    expertise: ['Adventure Tours', 'Hiking', 'Nature Tours'],
    location: 'Madrid, Spain',
    bio: 'Adventure guide specializing in hiking and outdoor experiences around Madrid. Former park ranger with deep knowledge of local flora and fauna.',
    years_experience: 12,
    hourly_rate: 55,
    rating: 4.7,
    verified: true,
    availability: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    created_at: '2019-06-22T09:15:00Z',
    updated_at: '2023-02-10T11:20:00Z'
  },
  {
    id: '3',
    name: 'Aisha Patel',
    email: 'aisha.p@example.com',
    phone: '+91-987-654-3210',
    languages: ['English', 'Hindi', 'Gujarati'],
    expertise: ['Cultural Heritage', 'Religious Sites', 'Art Tours'],
    location: 'New Delhi, India',
    bio: 'Cultural expert with a background in art history. Provides immersive tours of historical monuments and religious sites across Delhi.',
    years_experience: 6,
    hourly_rate: 35,
    rating: 4.8,
    verified: true,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    created_at: '2020-11-05T08:45:00Z',
    updated_at: '2023-03-01T09:30:00Z'
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: '101',
    guide_id: '1',
    user_id: 'user1',
    rating: 5,
    comment: `Sarah was an excellent guide! Her knowledge of Barcelona's history made the tour incredibly engaging.`,
    created_at: '2022-07-15T14:30:00Z'
  },
  {
    id: '102',
    guide_id: '1',
    user_id: 'user2',
    rating: 4,
    comment: 'Great food tour experience. Sarah knew all the best local spots.',
    created_at: '2022-08-22T16:45:00Z'
  }
];

// Get all tour guides
export const getAllTourGuides = async (): Promise<TourGuide[]> => {
  try {
    // Only attempt API call if API_URL is provided
    if (API_URL) {
      const response = await axios.get(`${API_URL}/tour-guides/`);
      return response.data;
    }
    // Otherwise use mock data
    return MOCK_GUIDES;
  } catch (error) {
    console.error('Error fetching tour guides:', error);
    // Return mock data if API is unavailable
    return MOCK_GUIDES;
  }
};

// Get a single tour guide by ID
export const getTourGuideById = async (guideId: string): Promise<TourGuide> => {
  try {
    // Only attempt API call if API_URL is provided
    if (API_URL) {
      const response = await axios.get(`${API_URL}/tour-guides/${guideId}`);
      return response.data;
    }
    // Otherwise use mock data
    const guide = MOCK_GUIDES.find(g => g.id === guideId);
    if (guide) return guide;
    throw new Error(`Guide with ID ${guideId} not found`);
  } catch (error) {
    console.error(`Error fetching tour guide with ID ${guideId}:`, error);
    // Return mock guide if API is unavailable
    const guide = MOCK_GUIDES.find(g => g.id === guideId);
    if (guide) return guide;
    throw new Error(`Guide with ID ${guideId} not found`);
  }
};

// Search for tour guides based on criteria
export const searchTourGuides = async (params: SearchParams): Promise<TourGuide[]> => {
  try {
    // Only attempt API call if API_URL is provided
    if (API_URL) {
      const response = await axios.get(`${API_URL}/tour-guides/search/`, { params });
      return response.data;
    }
    
    // Filter mock guides
    let filtered = [...MOCK_GUIDES];
    
    if (params.location) {
      filtered = filtered.filter(g => 
        g.location.toLowerCase().includes(params.location!.toLowerCase())
      );
    }
    
    if (params.language) {
      filtered = filtered.filter(g => 
        g.languages.some(l => l.toLowerCase().includes(params.language!.toLowerCase()))
      );
    }
    
    if (params.expertise) {
      filtered = filtered.filter(g => 
        g.expertise.some(e => e.toLowerCase().includes(params.expertise!.toLowerCase()))
      );
    }
    
    if (params.min_rating) {
      filtered = filtered.filter(g => g.rating >= params.min_rating!);
    }
    
    if (params.max_rate) {
      filtered = filtered.filter(g => g.hourly_rate <= params.max_rate!);
    }
    
    return filtered;
  } catch (error) {
    console.error('Error searching tour guides:', error);
    // Filter mock guides if API is unavailable
    let filtered = [...MOCK_GUIDES];
    
    if (params.location) {
      filtered = filtered.filter(g => 
        g.location.toLowerCase().includes(params.location!.toLowerCase())
      );
    }
    
    if (params.language) {
      filtered = filtered.filter(g => 
        g.languages.some(l => l.toLowerCase().includes(params.language!.toLowerCase()))
      );
    }
    
    if (params.expertise) {
      filtered = filtered.filter(g => 
        g.expertise.some(e => e.toLowerCase().includes(params.expertise!.toLowerCase()))
      );
    }
    
    if (params.min_rating) {
      filtered = filtered.filter(g => g.rating >= params.min_rating!);
    }
    
    if (params.max_rate) {
      filtered = filtered.filter(g => g.hourly_rate <= params.max_rate!);
    }
    
    return filtered;
  }
};

// Get reviews for a specific tour guide
export const getGuideReviews = async (guideId: string): Promise<Review[]> => {
  try {
    // Only attempt API call if API_URL is provided
    if (API_URL) {
      const response = await axios.get(`${API_URL}/tour-guides/${guideId}/reviews`);
      return response.data;
    }
    // Return mock reviews
    return MOCK_REVIEWS.filter(r => r.guide_id === guideId);
  } catch (error) {
    console.error(`Error fetching reviews for guide ${guideId}:`, error);
    // Return mock reviews if API is unavailable
    return MOCK_REVIEWS.filter(r => r.guide_id === guideId);
  }
};

// Add a review for a specific tour guide
export const addGuideReview = async (
  guideId: string,
  review: { rating: number; comment: string }
): Promise<Review> => {
  try {
    // Only attempt API call if API_URL is provided
    if (API_URL) {
      const response = await axios.post(`${API_URL}/tour-guides/${guideId}/reviews`, review);
      return response.data;
    }
    
    // Create a mock review
    const mockReview: Review = {
      id: `mock-${Date.now()}`,
      guide_id: guideId,
      user_id: 'current-user',
      rating: review.rating,
      comment: review.comment,
      created_at: new Date().toISOString()
    };
    console.log('Created mock review:', mockReview);
    return mockReview;
  } catch (error) {
    console.error(`Error adding review for guide ${guideId}:`, error);
    // Create a mock review if API is unavailable
    const mockReview: Review = {
      id: `mock-${Date.now()}`,
      guide_id: guideId,
      user_id: 'current-user',
      rating: review.rating,
      comment: review.comment,
      created_at: new Date().toISOString()
    };
    console.log('Created mock review:', mockReview);
    return mockReview;
  }
};

// Filter tour guides by location
export const getTourGuidesByLocation = async (location: string): Promise<TourGuide[]> => {
  return searchTourGuides({ location });
};

// Filter tour guides by language
export const getTourGuidesByLanguage = async (language: string): Promise<TourGuide[]> => {
  return searchTourGuides({ language });
};

// Filter tour guides by expertise
export const getTourGuidesByExpertise = async (expertise: string): Promise<TourGuide[]> => {
  return searchTourGuides({ expertise });
};

// Get top-rated tour guides (minimum rating of 4.5)
export const getTopRatedGuides = async (): Promise<TourGuide[]> => {
  return searchTourGuides({ min_rating: 4.5 });
}; 