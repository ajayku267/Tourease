"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Globe, MapPin, Star, Calendar, CloudSun, Users, Camera } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  bestTime: string;
  weather: string;
  tags: string[];
  coordinates: {
    x: number;
    y: number;
  };
}

interface ImmersiveExplorerProps {
  destinations?: Destination[];
  title?: string;
  subtitle?: string;
}

const defaultDestinations: Destination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    description: "Experience the perfect blend of pristine beaches, lush rice terraces, and spiritual temples in this tropical paradise.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop",
    rating: 4.8,
    bestTime: "April - October",
    weather: "28°C / Sunny",
    tags: ["Beaches", "Cultural", "Nature"],
    coordinates: { x: 35, y: 60 }
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description: "Discover the magic of the City of Lights with its iconic landmarks, world-class cuisine, and charming street life.",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2940&auto=format&fit=crop",
    rating: 4.7,
    bestTime: "April - June",
    weather: "18°C / Partly Cloudy",
    tags: ["City", "Cultural", "Romantic"],
    coordinates: { x: 55, y: 30 }
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    description: "Step back in time in this ancient city filled with serene temples, traditional tea houses, and stunning cherry blossoms.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop",
    rating: 4.9,
    bestTime: "March - May",
    weather: "21°C / Clear",
    tags: ["Historical", "Cultural", "Nature"],
    coordinates: { x: 75, y: 40 }
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    description: "Explore the breathtaking white-washed villages perched on cliffs overlooking the azure Aegean Sea.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2874&auto=format&fit=crop",
    rating: 4.9,
    bestTime: "May - September",
    weather: "25°C / Sunny",
    tags: ["Islands", "Romantic", "Views"],
    coordinates: { x: 25, y: 35 }
  },
  {
    id: "newyork",
    name: "New York",
    country: "United States",
    description: "Experience the energy of the city that never sleeps with its iconic skyline, diverse neighborhoods, and vibrant culture.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
    bestTime: "September - November",
    weather: "15°C / Variable",
    tags: ["City", "Urban", "Culture"],
    coordinates: { x: 15, y: 20 }
  }
];

const ImmersiveExplorer = ({ 
  destinations = defaultDestinations,
  title = "Explore Destinations in 3D", 
  subtitle = "Interact with the map to discover amazing places around the world" 
}: ImmersiveExplorerProps) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  // Handle destination selection
  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowInfo(true);
  };
  
  const closeInfo = () => {
    setShowInfo(false);
    setTimeout(() => setSelectedDestination(null), 300);
  };
  
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>
        
        <div 
          ref={containerRef}
          className="relative h-[600px] rounded-3xl overflow-hidden bg-blue-50 shadow-xl border border-blue-100"
        >
          {/* Background world map with parallax effect */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              x: useTransform(springX, [0, 1], [20, -20]),
              y: useTransform(springY, [0, 1], [20, -20]),
            }}
          >
            <Image
              src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/earth-americas.svg"
              alt="World Map"
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/90"></div>
          </motion.div>
          
          {/* Dynamic background elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200/20 blur-3xl z-0"
            style={{
              x: useTransform(springX, [0, 1], [-30, 30]),
              y: useTransform(springY, [0, 1], [-30, 30]),
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-amber-200/20 blur-3xl z-0"
            style={{
              x: useTransform(springX, [0, 1], [40, -40]),
              y: useTransform(springY, [0, 1], [40, -40]),
            }}
          />
          
          {/* Destination markers */}
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              className="absolute z-10 cursor-pointer"
              style={{
                left: `${destination.coordinates.x}%`,
                top: `${destination.coordinates.y}%`,
                x: useTransform(springX, [0, 1], [10, -10]),
                y: useTransform(springY, [0, 1], [10, -10]),
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleDestinationClick(destination)}
            >
              <motion.div 
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full bg-white/20 animate-ping"></div>
                <div className="bg-white backdrop-blur-md shadow-lg rounded-full p-2 flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white mr-2">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{destination.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {destination.country}
                    </div>
                  </div>
                  <div className="ml-3 bg-blue-50 rounded-full px-2 py-1 flex items-center">
                    <Star className="h-3 w-3 text-amber-500 mr-1" />
                    <span className="text-xs font-medium">{destination.rating}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
          
          {/* Floating globe icon */}
          <motion.div
            className="absolute bottom-8 right-8 z-10"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div className="bg-white/80 backdrop-blur-md rounded-full p-4 shadow-lg">
              <Globe className="h-10 w-10 text-blue-500" />
            </div>
          </motion.div>
          
          {/* Destination info modal */}
          <motion.div
            className={`absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm ${!showInfo && 'pointer-events-none'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: showInfo ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedDestination && (
              <motion.div
                className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showInfo ? 1 : 0, y: showInfo ? 0 : 50 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={closeInfo}
                  className="absolute top-4 right-4 z-30 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src={selectedDestination.image}
                      alt={selectedDestination.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                      <h3 className="text-2xl font-bold">{selectedDestination.name}</h3>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{selectedDestination.country}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-1/2">
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-amber-500 mr-1" />
                      <span className="font-medium">{selectedDestination.rating}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedDestination.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{selectedDestination.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-500 mb-1 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Best Time to Visit
                        </div>
                        <div className="font-medium">{selectedDestination.bestTime}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-500 mb-1 text-sm">
                          <CloudSun className="h-4 w-4 mr-2" />
                          Weather
                        </div>
                        <div className="font-medium">{selectedDestination.weather}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-500 mb-1 text-sm">
                          <Users className="h-4 w-4 mr-2" />
                          Travel Type
                        </div>
                        <div className="font-medium">Family-friendly</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-500 mb-1 text-sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Photography
                        </div>
                        <div className="font-medium">Excellent</div>
                      </div>
                    </div>
                    
                    <Link href={`/destinations/${selectedDestination.id}`}>
                      <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-300">
                        Explore {selectedDestination.name}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Hover over destinations and click to discover more details</p>
          <Link href="/destinations">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
              View All Destinations
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveExplorer; 