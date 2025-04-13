"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface LocalOnlyImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

/**
 * LocalOnlyImage component for displaying images with fallback and error handling
 * Designed specifically for local development environments
 */
export function LocalOnlyImage({
  src,
  alt,
  fallbackSrc = '/placeholders/image-placeholder.jpg',
  width,
  height,
  className,
  style,
  loadingComponent,
  errorComponent,
  ...props
}: LocalOnlyImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(src);

  // Reset states when src changes
  useEffect(() => {
    setLoading(true);
    setError(false);
    setImgSrc(src);
  }, [src]);

  // Handle image load success
  const handleImageLoad = () => {
    setLoading(false);
  };

  // Handle image load error
  const handleImageError = () => {
    setError(true);
    setLoading(false);
    if (fallbackSrc && fallbackSrc !== src) {
      setImgSrc(fallbackSrc);
    }
  };

  // Custom loading component or default loading state
  const renderLoading = () => {
    if (loadingComponent) {
      return loadingComponent;
    }
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse",
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style
        }}
      >
        <svg 
          className="w-8 h-8 text-gray-300 dark:text-gray-600" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true" 
          fill="currentColor" 
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
    );
  };

  // Custom error component or use fallback image
  const renderError = () => {
    if (errorComponent) {
      return errorComponent;
    }
    return null; // Will render fallback image instead
  };

  return (
    <>
      {loading && renderLoading()}
      
      {error && renderError()}
      
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          className,
          (loading || (error && !fallbackSrc)) && 'hidden'
        )}
        style={style}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    </>
  );
} 