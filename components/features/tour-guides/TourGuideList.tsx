'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Globe, Award, Clock, DollarSign, Search, Filter, X, ChevronDown, ChevronUp, Languages } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTourGuidesByLocation, getTourGuidesByLanguage, getTourGuidesByExpertise, getAllTourGuides, TourGuide } from '@/app/services/tourGuideService';
import { TourGuideCard } from "@/app/components/features/TourGuideCard";

interface TourGuideListProps {
  initialGuides?: TourGuide[];
  initialSearchParams?: SearchParams;
}

export default function TourGuideList({ initialGuides = [], initialSearchParams = {} }: TourGuideListProps) {
  // If guides were passed in, use them, otherwise start with an empty array
  const [guides, setGuides] = useState<TourGuide[]>(initialGuides);
  const [filteredGuides, setFilteredGuides] = useState<TourGuide[]>([]);
  const [loading, setLoading] = useState(!initialGuides.length);
  const [error, setError] = useState<string | null>(null);

  // Set initial search params from props
  const [location, setLocation] = useState<string>(initialSearchParams.location || '');
  const [language, setLanguage] = useState<string>(initialSearchParams.language || '');
  const [expertise, setExpertise] = useState<string>(initialSearchParams.expertise || '');
  const [minRating, setMinRating] = useState<number>(initialSearchParams.min_rating || 0);
  const [maxRate, setMaxRate] = useState<number>(initialSearchParams.max_rate || 200);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'hourly_rate' | 'years_experience'>('rating');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Available filter options (unique values from data)
  const [locations, setLocations] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [expertiseOptions, setExpertiseOptions] = useState<string[]>([]);

  const filterGuides = (guidesToFilter: TourGuide[]): TourGuide[] => {
    let result = [...guidesToFilter];

    // Apply location filter
    if (location) {
      result = result.filter((guide) => 
        guide.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Apply language filter
    if (language) {
      result = result.filter((guide) =>
        guide.languages.some((lang) => 
          lang.toLowerCase().includes(language.toLowerCase())
        )
      );
    }

    // Apply expertise filter
    if (expertise) {
      result = result.filter((guide) =>
        guide.expertise.some((exp) => 
          exp.toLowerCase().includes(expertise.toLowerCase())
        )
      );
    }

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter((guide) => guide.rating >= minRating);
    }

    // Apply price filter
    if (maxRate < 200) {
      result = result.filter((guide) => guide.hourly_rate <= maxRate);
    }

    // Apply search term filter (search in name and bio)
    if (searchTerm) {
      result = result.filter((guide) =>
        guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    return [...result].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
  };

  useEffect(() => {
    // Only load guides if no initial guides were provided
    if (initialGuides.length === 0) {
      loadGuides();
    } else {
      // If we have initial guides, just update filtered guides based on filters
      setFilteredGuides(filterGuides(initialGuides));
    }
  }, [guides, location, language, expertise, minRating, maxRate, searchTerm, sortBy, sortDirection]);

  useEffect(() => {
    const loadTourGuides = async () => {
      try {
        setLoading(true);
        let data: TourGuide[] = [];

        if (location) {
          data = await getTourGuidesByLocation(location);
        } else if (language) {
          data = await getTourGuidesByLanguage(language);
        } else if (expertise) {
          data = await getTourGuidesByExpertise(expertise);
        } else {
          data = await getAllTourGuides();
        }

        setGuides(data);
        setFilteredGuides(data);

        // Extract unique filter options
        const uniqueLocations = Array.from(new Set(data.map((guide) => guide.location)));
        const uniqueLanguages = Array.from(
          new Set(data.flatMap((guide) => guide.languages))
        );
        const uniqueExpertise = Array.from(
          new Set(data.flatMap((guide) => guide.expertise))
        );

        setLocations(uniqueLocations);
        setLanguages(uniqueLanguages);
        setExpertiseOptions(uniqueExpertise);
      } catch (err) {
        setError('Failed to load tour guides. Please try again later.');
        console.error('Error loading tour guides:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTourGuides();
  }, [location, language, expertise]);

  const resetFilters = () => {
    setLocation('');
    setLanguage('');
    setExpertise('');
    setSearchTerm('');
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const getSortIcon = () => {
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-8 border-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 animate-pulse">Finding perfect guides for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <X className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h3>
          <p className="text-red-600 mb-6 text-center">{error}</p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white/20 rounded-2xl opacity-50 -z-10"></div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-orange-600 text-transparent bg-clip-text">Find Your Perfect Tour Guide</h2>
          <p className="text-gray-600">Discover local experts who will make your travel experience unforgettable</p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full md:w-2/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary bg-white/70 backdrop-blur-sm"
              placeholder="Search by name, bio, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 p-3 rounded-xl border border-gray-200 bg-white/70 hover:bg-white text-gray-700 transition-all duration-200 hidden md:flex items-center"
          >
            <Filter size={18} className="mr-2" />
            <span>Filters</span>
          </button>
          
          <div className="ml-2 hidden md:flex items-center">
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-3 rounded-xl border border-gray-200 bg-white/70 hover:bg-white focus:ring-primary focus:border-primary text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="rating">Rating</option>
                <option value="hourly_rate">Price</option>
                <option value="years_experience">Experience</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <button onClick={toggleSortDirection} className="text-gray-500">
                  {getSortIcon()}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border-t border-b border-gray-100 py-4">
                {/* Location filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white/70 focus:ring-primary focus:border-primary"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Language filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white/70 focus:ring-primary focus:border-primary"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">All Languages</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Expertise filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                  <select
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white/70 focus:ring-primary focus:border-primary"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                  >
                    <option value="">All Expertise</option>
                    {expertiseOptions.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-gray-600 mb-2 md:mb-0">
            {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} found
          </p>
          
          <div className="flex md:items-center flex-col md:flex-row">
            <div className="flex md:hidden items-center mb-2 md:mb-0">
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              <select
                className="appearance-none p-1 rounded border border-gray-200 bg-white/70 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="rating">Rating</option>
                <option value="hourly_rate">Price</option>
                <option value="years_experience">Experience</option>
              </select>
              <button onClick={toggleSortDirection} className="ml-1 text-gray-500">
                {getSortIcon()}
              </button>
            </div>
            
            {(location || language || expertise || searchTerm) && (
              <button
                className="text-sm text-primary hover:text-primary-dark transition flex items-center"
                onClick={resetFilters}
              >
                <X size={16} className="mr-1" />
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {filteredGuides.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-10 text-center shadow-lg border border-gray-100"
        >
          <div className="inline-block p-4 bg-orange-50 rounded-full mb-4">
            <Search className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No tour guides found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find any guides matching your criteria. Try adjusting your filters to see more results.
          </p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={resetFilters}
          >
            Clear All Filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide, index) => (
            <TourGuideCard key={guide.id} guide={guide} index={index} />
          ))}
        </div>
      )}
    </div>
  );
} 