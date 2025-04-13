'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';

// Static imports for optimized loading
import heroBackground from '@/public/images/guides/locations/default.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

interface TourGuideHeroProps {
  onSearch: (location: string) => void;
}

export default function TourGuideHero({ onSearch }: TourGuideHeroProps) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBackground}
          alt="Tour guides around the world"
          fill
          priority
          className="object-cover scale-110 transform-gpu"
          quality={90}
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10"></div>
      </div>
      
      {/* Content */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center"
      >
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl"
        >
          Find Your Perfect <span className="text-primary">Local Guide</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp} 
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
        >
          Discover local expertise around the world with our verified professional guides
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <form 
            onSubmit={handleSubmit}
            className="relative max-w-2xl"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 backdrop-blur-md border-0 focus:ring-2 focus:ring-primary shadow-lg"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="md:w-auto w-full bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl px-8 py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search className="h-5 w-5" />
                <span>Search Guides</span>
              </button>
            </div>
          </form>
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          className="mt-8 flex flex-wrap gap-3"
        >
          <span className="text-white/70 mr-2">Popular:</span>
          {['Paris', 'Tokyo', 'Bali', 'Barcelona', 'New York'].map((location) => (
            <button
              key={location}
              onClick={() => {
                setSearchValue(location);
                onSearch(location);
              }}
              className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors text-sm"
            >
              {location}
            </button>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background rounded-t-[50px] z-10"></div>
    </div>
  );
} 