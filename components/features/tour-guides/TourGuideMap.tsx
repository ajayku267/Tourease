'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Star, User, Search, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { TourGuide } from '@/app/services/tourGuideService';
import ExternalImage from '../ui/ExternalImage';

interface TourGuideMapProps {
  guides: TourGuide[];
  initialCenter?: [number, number];
  initialZoom?: number;
}

// This component simulates a map - in a real app you'd use a library like Leaflet or Google Maps
const TourGuideMap: React.FC<TourGuideMapProps> = ({
  guides,
  initialCenter = [0, 0],
  initialZoom = 2,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<TourGuide | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredGuides, setFilteredGuides] = useState<TourGuide[]>(guides);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Fake coordinates for the guides since our mock data doesn't have real coordinates
  const getRandomCoordinate = (index: number, isLat = true): number => {
    const seed = index * (isLat ? 1 : 2) + (isLat ? 15 : 30);
    return isLat 
      ? Math.sin(seed) * 50 
      : Math.cos(seed) * 100;
  };

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchValue) {
      const filtered = guides.filter(guide => 
        guide.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        guide.location.toLowerCase().includes(searchValue.toLowerCase()) ||
        guide.expertise.some(exp => exp.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFilteredGuides(filtered);
    } else {
      setFilteredGuides(guides);
    }
  }, [searchValue, guides]);

  const handleGuideClick = (guide: TourGuide) => {
    setSelectedGuide(guide);
  };

  const closeInfoPopup = () => {
    setSelectedGuide(null);
  };

  return (
    <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-2 w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides by name, location, or expertise..."
              className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none focus:ring-0"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        
        <button
          onClick={() => setIsInfoOpen(!isInfoOpen)}
          className="ml-2 bg-white/90 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-gray-700 hover:bg-white transition-colors"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>
      
      {/* Info Panel */}
      <AnimatePresence>
        {isInfoOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-16 right-4 z-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 max-w-xs"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">Map Guide</h3>
              <button
                onClick={() => setIsInfoOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Explore our global network of tour guides and find the perfect match for your next adventure.
            </p>
            <div className="text-xs text-gray-500">
              <div className="flex items-center mb-1">
                <div className="bg-primary w-4 h-4 rounded-full mr-2"></div>
                <span>Premium guides (4.5+ rating)</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-500 w-4 h-4 rounded-full mr-2"></div>
                <span>Standard guides</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Map Area */}
      <div
        ref={mapRef}
        className="relative w-full h-full bg-[#F8F9FA] overflow-hidden"
      >
        {!mapLoaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 animate-pulse">Loading map...</p>
          </div>
        ) : (
          <>
            {/* Simulated Map Visualization */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/world-map-light.jpg" 
                alt="World Map"
                fill
                className="object-cover"
                quality={90}
                onError={(e) => {
                  // If image fails to load, apply a background color
                  const target = e.target as HTMLImageElement;
                  target.style.backgroundColor = '#f2f5f9';
                  target.style.display = 'none';
                  target.onerror = null; // Prevent infinite error loop
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent"></div>
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30"></div>
            </div>
            
            {/* Guide Markers */}
            <div className="absolute inset-0 z-10">
              {filteredGuides.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.05, 
                    type: 'spring',
                    stiffness: 260,
                    damping: 20
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  style={{ 
                    left: `${(getRandomCoordinate(index, false) + 100) / 2}%`, 
                    top: `${(getRandomCoordinate(index, true) + 50) / 2}%`
                  }}
                  onClick={() => handleGuideClick(guide)}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center group`}
                  >
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                        guide.rating >= 4.5 ? 'bg-primary' : 'bg-blue-500'
                      }`}
                    >
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {guide.name}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Selected Guide Popup */}
            <AnimatePresence>
              {selectedGuide && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md"
                >
                  <div className="mx-4 bg-white/95 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl border border-gray-100">
                    <div className="relative">
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          onClick={closeInfoPopup}
                          className="bg-white/80 backdrop-blur-sm p-1 rounded-full hover:bg-white transition-colors shadow-md"
                        >
                          <X className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                      <div className="h-24 bg-gradient-to-r from-primary/90 to-orange-500/90 relative">
                        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
                      </div>
                      <div className="absolute -bottom-10 left-4 w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                        <ExternalImage
                          src={`https://source.unsplash.com/random/80x80/?portrait,professional&sig=${selectedGuide.id}`}
                          alt={selectedGuide.name}
                          width={80}
                          height={80}
                          className="object-cover"
                          onError={(e) => {
                            // If image fails to load, use a fallback image
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/80x80?text=Guide';
                            target.onerror = null; // Prevent infinite error loop
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-12 pb-4 px-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900">{selectedGuide.name}</h3>
                        <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-md">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-xs font-medium">{selectedGuide.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mt-1 mb-3">
                        <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                        {selectedGuide.location}
                      </div>
                      
                      <p className="text-sm text-gray-700 line-clamp-2 mb-4">{selectedGuide.bio}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-primary font-medium">${selectedGuide.hourly_rate}/hr</div>
                        <Link href={`/tour-guides/${selectedGuide.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
                          >
                            View Profile
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      
      {/* Guide Count Badge */}
      <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg text-sm font-medium text-gray-700 flex items-center">
        <User className="h-4 w-4 text-primary mr-1.5" />
        {filteredGuides.length} guides available
      </div>
    </div>
  );
};

export default TourGuideMap; 