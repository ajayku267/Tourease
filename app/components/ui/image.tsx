"use client";

import { useState } from 'react';
import NextImage from 'next/image';
import { getLocalImagePath, getColorFromId, getInitials } from '@/app/lib/image-helpers';

export interface ImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  fallbackType?: 'profile' | 'destination' | 'guide' | 'hero' | 'default';
  id?: string | number;
  className?: string;
  priority?: boolean;
  showInitials?: boolean;
  name?: string;
}

export default function Image({
  src,
  alt,
  width = 400,
  height = 400,
  fallbackType = 'default',
  id,
  className = '',
  priority = false,
  showInitials = false,
  name = '',
}: ImageProps) {
  const [error, setError] = useState(false);
  const localPath = getLocalImagePath(fallbackType, id);
  const bgColor = getColorFromId(id);
  const initials = showInitials ? getInitials(name || alt) : '';
  
  if (error || !src) {
    // If we're showing a profile image with initials
    if (fallbackType === 'profile' && showInitials) {
      return (
        <div 
          className={`flex items-center justify-center bg-opacity-90 ${className}`}
          style={{ 
            backgroundColor: bgColor,
            width: width,
            height: height,
            borderRadius: '50%',
          }}
          role="img"
          aria-label={alt}
        >
          <span className="text-white font-semibold text-xl">
            {initials}
          </span>
        </div>
      );
    }
    
    // Otherwise, use a fallback image
    return (
      <NextImage
        src={localPath}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }
  
  // If we have a src, use it
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      className={className}
      priority={priority}
    />
  );
} 