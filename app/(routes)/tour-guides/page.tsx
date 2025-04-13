'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllTourGuides, SearchParams, TourGuide } from '@/app/services/tourGuideService';
import TourGuideList from '@/app/components/features/TourGuideList';
import TourGuideHero from '@/app/components/features/TourGuideHero';
import { Loader2 } from 'lucide-react';

export default function TourGuidesPage() {
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  useEffect(() => {
    async function loadGuides() {
      try {
        setLoading(true);
        const data = await getAllTourGuides();
        setGuides(data);
      } catch (err) {
        console.error('Error loading tour guides:', err);
        setError('Failed to load tour guides. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadGuides();
  }, []);

  const handleSearch = (location: string) => {
    setSearchParams(prev => ({ ...prev, location }));
    // Scroll to the guide list section
    document.getElementById('guide-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <TourGuideHero onSearch={handleSearch} />
      
      {/* Main Content */}
      <div id="guide-list" className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-xl text-gray-600">Loading tour guides...</p>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-700 p-8 rounded-xl text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert Local Guides</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Connect with passionate guides who know their cities inside out.
                From history buffs to culinary experts, find your perfect match.
              </p>
            </motion.div>
            
            <TourGuideList initialGuides={guides} initialSearchParams={searchParams} />
          </>
        )}
      </div>
    </div>
  );
} 