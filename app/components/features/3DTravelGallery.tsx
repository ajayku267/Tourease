"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Compass, MapPin, Star, ChevronLeft, ChevronRight, Maximize, Info } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  tags: string[];
}

interface TravelGalleryProps {
  destinations?: Destination[];
  title?: string;
  subtitle?: string;
}

const defaultDestinations: Destination[] = [
  {
    id: "amalfi-coast",
    name: "Amalfi Coast",
    location: "Italy",
    description: "Explore the breathtaking cliffside villages overlooking the Mediterranean Sea.",
    image: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    tags: ["Coastal", "Romantic", "Cultural"]
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Peru",
    description: "Discover the ancient Incan citadel set against a backdrop of stunning mountains.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    tags: ["Historical", "Adventure", "UNESCO"]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    location: "Japan",
    description: "Immerse yourself in Japanese culture with ancient temples and beautiful gardens.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop",
    rating: 4.7,
    tags: ["Cultural", "Temples", "Gardens"]
  },
  {
    id: "santorini",
    name: "Santorini",
    location: "Greece",
    description: "Experience the iconic white-washed buildings and stunning Aegean sunsets.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2874&auto=format&fit=crop",
    rating: 4.9,
    tags: ["Island", "Romantic", "Views"]
  },
  {
    id: "grand-canyon",
    name: "Grand Canyon",
    location: "United States",
    description: "Stand in awe before this vast natural wonder carved by the Colorado River.",
    image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    tags: ["Nature", "Adventure", "Hiking"]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    location: "Morocco",
    description: "Wander through colorful markets and gardens in this vibrant North African city.",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f9c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
    tags: ["Cultural", "Markets", "Historical"]
  }
];

const ThreeDTravelGallery = ({
  destinations = defaultDestinations,
  title = "Explore Amazing Destinations",
  subtitle = "Discover the world's most breathtaking places in stunning 3D"
}: TravelGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentDestination = destinations[currentIndex];
  
  // Mouse movement for parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const nextDestination = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };
  
  const prevDestination = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setIsInfoVisible(false);
  };
  
  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextDestination();
      } else if (e.key === 'ArrowLeft') {
        prevDestination();
      } else if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);
  
  // Variants for image animation
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 30 : -30,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom ease curve for smooth animation
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 30 : -30,
      transition: {
        duration: 0.5,
      }
    })
  };
  
  // Variants for expanded state
  const expandedVariants = {
    normal: {
      height: "600px",
      width: "100%",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    expanded: {
      height: "100vh",
      width: "100vw",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  return (
    <div className={`py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 ${isExpanded ? "fixed inset-0 z-50" : "relative"}`}>
      <div className={`max-w-7xl mx-auto ${isExpanded ? "h-full" : ""}`}>
        {!isExpanded && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        )}
        
        <motion.div
          ref={containerRef}
          className={`relative ${isExpanded ? "h-full flex items-center justify-center" : ""}`}
          variants={expandedVariants}
          animate={isExpanded ? "expanded" : "normal"}
        >
          <div 
            className="relative overflow-hidden rounded-2xl bg-gray-800 shadow-2xl"
            style={{ 
              height: isExpanded ? "90vh" : "600px",
              width: isExpanded ? "90%" : "100%",
              margin: "0 auto"
            }}
          >
            {/* 3D Gallery Container */}
            <motion.div
              className="relative h-full w-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0"
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    rotateX: isExpanded ? 0 : rotateX,
                    rotateY: isExpanded ? 0 : rotateY,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={currentDestination.image}
                      alt={currentDestination.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
                    
                    {/* Floating 3D Card content */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-8"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center mr-3">
                          <MapPin className="h-4 w-4 text-white/80 mr-1" />
                          <span className="text-sm font-medium text-white/90">{currentDestination.location}</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center">
                          <Star className="h-4 w-4 text-amber-400 mr-1" />
                          <span className="text-sm font-medium text-white/90">{currentDestination.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{currentDestination.name}</h3>
                      
                      <p className="text-white/80 max-w-xl mb-4">{currentDestination.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {currentDestination.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-white/10 backdrop-blur-md text-white/90 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        <Link href={`/destinations/${currentDestination.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-medium flex items-center"
                          >
                            <Compass className="h-5 w-5 mr-2" />
                            Explore Destination
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Info Overlay */}
              <AnimatePresence>
                {isInfoVisible && (
                  <motion.div 
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl text-white">
                      <h3 className="text-2xl font-bold mb-4">{currentDestination.name} - Travel Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Best Time to Visit</h4>
                          <p className="text-gray-300">April to October</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Average Cost</h4>
                          <p className="text-gray-300">$100-200 per day</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Local Language</h4>
                          <p className="text-gray-300">Italian</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Currency</h4>
                          <p className="text-gray-300">Euro (€)</p>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-2">Must-See Attractions</h4>
                      <ul className="list-disc pl-5 mb-6 text-gray-300">
                        <li>Positano Village</li>
                        <li>Ravello Gardens</li>
                        <li>Path of the Gods Hike</li>
                        <li>Emerald Grotto</li>
                      </ul>
                      
                      <button 
                        onClick={toggleInfo}
                        className="bg-white text-gray-900 px-6 py-2 rounded-xl font-medium"
                      >
                        Close Information
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Navigation buttons */}
              <button 
                onClick={prevDestination}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md text-white h-12 w-12 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                aria-label="Previous destination"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextDestination}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md text-white h-12 w-12 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                aria-label="Next destination"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Control buttons */}
              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <button 
                  onClick={toggleInfo}
                  className="bg-white/20 backdrop-blur-md text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  aria-label="Show information"
                >
                  <Info className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={toggleExpand}
                  className="bg-white/20 backdrop-blur-md text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  aria-label={isExpanded ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
              
              {/* Indicator dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
                {destinations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    aria-label={`Go to destination ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {isExpanded && (
            <button
              onClick={toggleExpand}
              className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center hover:bg-white/30 transition-all"
            >
              Exit Fullscreen
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeDTravelGallery; 