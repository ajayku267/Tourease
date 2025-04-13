"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Globe, Sparkles, Orbit } from "lucide-react";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { Button } from "@/components/ui/button";

// Mock data for related destinations
const MOCK_DESTINATIONS = [
  {
    id: "1",
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    rating: 4.8,
    price: "699",
    description: "Experience the breathtaking views of the Aegean Sea from the iconic white-washed buildings perched on cliffs.",
    duration: "5 days",
    travelers: 2,
    isTrending: true,
    tags: ["Romantic", "Beach", "Sightseeing"],
    activities: ["Sunset Viewing", "Wine Tasting", "Sailing"],
    slug: "santorini-greece"
  },
  {
    id: "2",
    name: "Kyoto",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.7,
    price: "849",
    description: "Discover ancient temples, beautiful gardens, and traditional tea houses in Japan's cultural capital.",
    duration: "7 days",
    travelers: 1,
    isPopular: true,
    tags: ["Cultural", "Historic", "Temples"],
    activities: ["Temple Visits", "Tea Ceremony", "Geisha District"],
    slug: "kyoto-japan"
  },
  {
    id: "3",
    name: "Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80",
    rating: 4.6,
    price: "599",
    description: "Relax on pristine beaches, explore lush rice terraces, and immerse yourself in Balinese culture.",
    duration: "8 days",
    travelers: 2,
    hasPromotion: true,
    discountPercentage: 15,
    tags: ["Beach", "Adventure", "Spiritual"],
    activities: ["Surfing", "Temple Hopping", "Rice Field Tours"],
    slug: "bali-indonesia"
  },
  {
    id: "4",
    name: "Machu Picchu",
    location: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.9,
    price: "999",
    description: "Explore the ancient Incan citadel nestled high in the Andes mountains, a UNESCO World Heritage site.",
    duration: "6 days",
    travelers: 4,
    isTrending: true,
    tags: ["Historic", "Adventure", "UNESCO"],
    activities: ["Inca Trail", "Guided Tours", "Mountain Hiking"],
    slug: "machu-picchu-peru"
  },
  {
    id: "5",
    name: "Amalfi Coast",
    location: "Italy",
    image: "https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.7,
    price: "799",
    description: "Drive along the stunning Mediterranean coastline, visiting charming cliffside villages and beaches.",
    duration: "5 days",
    travelers: 2,
    isPopular: true,
    tags: ["Scenic", "Coastal", "Romantic"],
    activities: ["Boat Tours", "Limoncello Tasting", "Beach Time"],
    slug: "amalfi-coast-italy"
  },
  {
    id: "6",
    name: "Safari Adventure",
    location: "Tanzania",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80",
    rating: 4.8,
    price: "1499",
    description: "Witness the majestic wildlife of the Serengeti and Ngorongoro Crater on an unforgettable safari experience.",
    duration: "10 days",
    travelers: 6,
    hasPromotion: true,
    discountPercentage: 10,
    tags: ["Wildlife", "Nature", "Photography"],
    activities: ["Game Drives", "Hot Air Balloon", "Cultural Visits"],
    slug: "safari-adventure-tanzania"
  }
];

interface RelatedDestinationsProps {
  destinationId?: string;
  location?: string;
  limit?: number;
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact" | "featured" | "horizontal" | "minimal";
}

export function RelatedDestinations({
  destinationId,
  location,
  limit = 4,
  className = "",
  title = "Explore Similar Destinations",
  subtitle = "Discover more incredible places that match your interests",
  variant = "default",
}: RelatedDestinationsProps) {
  const [visibleDestinations, setVisibleDestinations] = useState(MOCK_DESTINATIONS.slice(0, limit));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Filter out current destination by ID if provided
  useEffect(() => {
    // In a real app, you would fetch related destinations based on the destinationId or location
    // For now, we'll just filter out the current destination from our mock data
    let filteredDestinations = [...MOCK_DESTINATIONS];
    if (destinationId) {
      filteredDestinations = filteredDestinations.filter(d => d.id !== destinationId);
    }
    
    setVisibleDestinations(filteredDestinations.slice(0, limit));
  }, [destinationId, location, limit]);
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      if (!isHoveringControls && !isDragging) {
        next();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, isHoveringControls, currentIndex, isDragging]);
  
  // Number of cards to show based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  
  // Update cards per view on window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = Math.max(0, visibleDestinations.length - cardsPerView);
  
  const next = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };
  
  const prev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    const diffX = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diffX) > 50) { // Minimum swipe distance
      if (diffX > 0) {
        next();
      } else {
        prev();
      }
    }
  };
  
  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    setIsDragging(true);
    
    // Prevent text selection during drag
    if (carouselRef.current) {
      carouselRef.current.style.userSelect = 'none';
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    touchEndX.current = e.clientX;
  };
  
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Re-enable text selection
    if (carouselRef.current) {
      carouselRef.current.style.userSelect = '';
    }
    
    const diffX = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diffX) > 50) { // Minimum drag distance
      if (diffX > 0) {
        next();
      } else {
        prev();
      }
    }
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Animation variants
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };
  
  // Progress bar animation
  const progressVariants = {
    initial: { width: "0%" },
    animate: { width: "100%", transition: { duration: 5, ease: "linear" } },
    paused: { width: "var(--progress-width)", transition: { duration: 0 } }
  };

  return (
    <section className={`py-8 ${className}`}>
      <div className="container px-4 md:px-6">
        {/* Header with title and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="max-w-lg">
            <div className="flex items-center mb-2">
              <Orbit className="h-5 w-5 text-orange-500 mr-2" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-gray-200 dark:border-gray-800"
                onClick={prev}
                onMouseEnter={() => setIsHoveringControls(true)}
                onMouseLeave={() => setIsHoveringControls(false)}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-gray-200 dark:border-gray-800 ml-2"
                onClick={next}
                onMouseEnter={() => setIsHoveringControls(true)}
                onMouseLeave={() => setIsHoveringControls(false)}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next slide</span>
              </Button>
            </motion.div>
            
            <div className="hidden md:flex items-center ml-4">
              <div className="relative h-1 w-24 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-orange-500 rounded-full"
                  variants={progressVariants}
                  initial="initial"
                  animate={autoplay && !isHoveringControls && !isDragging ? "animate" : "paused"}
                  key={currentIndex}
                  style={{ 
                    "--progress-width": `${(currentIndex / maxIndex) * 100}%` 
                  } as any}
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                {currentIndex + 1}/{Math.min(visibleDestinations.length, maxIndex + 1)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="relative"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-all duration-300 overflow-hidden"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              width: `${(visibleDestinations.length / cardsPerView) * 100}%`
            }}
          >
            {visibleDestinations.map((destination, index) => (
              <div 
                key={destination.id}
                className="px-2"
                style={{ width: `${100 / visibleDestinations.length}%` }}
              >
                <DestinationCard
                  destination={destination}
                  variant={variant}
                  withAnimation={true}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          
          {/* Mobile indicators */}
          <div className="flex justify-center mt-6 md:hidden">
            {Array.from({ length: Math.min(visibleDestinations.length, maxIndex + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? "w-6 bg-orange-500" 
                    : "w-2 bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Drag indicator */}
          {isDragging && (
            <motion.div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/30 dark:bg-white/30 backdrop-blur-sm rounded-full p-4 z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="sr-only">Dragging carousel</span>
              <Sparkles className="h-6 w-6 text-white dark:text-black" />
            </motion.div>
          )}
        </div>
        
        {/* View all link */}
        <div className="flex justify-center mt-8">
          <Button
            variant="ghost"
            className="group text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
          >
            <span>View all destinations</span>
            <Globe className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
          </Button>
        </div>
      </div>
    </section>
  );
} 