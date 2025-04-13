'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

// Static imports for optimized loading
import guidePortrait1 from '@/public/images/guides/portraits/guide-1.jpg';
import guidePortrait2 from '@/public/images/guides/portraits/guide-2.jpg';
import guidePortrait3 from '@/public/images/guides/portraits/guide-3.jpg';

interface TourGuideImageProps {
  guideId: string;
  guideName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
  verified?: boolean;
}

export default function TourGuideImage({
  guideId,
  guideName,
  className = '',
  size = 'md',
  priority = false,
  verified = false,
}: TourGuideImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Select guide portrait based on ID
  const getGuidePortrait = () => {
    const portraits = [guidePortrait1, guidePortrait2, guidePortrait3];
    const index = parseInt(guideId) % 3;
    return portraits[index] || portraits[0];
  };

  // Convert size prop to dimensions
  const sizeClassMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const sizeClass = sizeClassMap[size] || sizeClassMap.md;

  return (
    <div className={`relative overflow-hidden rounded-full ${sizeClass} ${className}`}>
      {hasError ? (
        <div className="absolute inset-0 bg-orange-100 flex items-center justify-center">
          <User className="text-orange-500 h-1/2 w-1/2" />
        </div>
      ) : (
        <>
          <Image
            src={getGuidePortrait()}
            alt={guideName}
            fill
            sizes={`(max-width: 640px) ${parseInt(sizeClass.split('w-')[1]) * 4}px, ${parseInt(sizeClass.split('w-')[1]) * 4}px`}
            className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            priority={priority}
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
        </>
      )}
      
      {verified && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 border-2 border-white"
          style={{ width: size === 'sm' ? 16 : 24, height: size === 'sm' ? 16 : 24 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-full h-full"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </motion.div>
      )}
    </div>
  );
} 