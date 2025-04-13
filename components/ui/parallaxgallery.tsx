"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  aspectRatio?: number; // Width/height, default: 1.5 (3:2)
}

interface ParallaxGalleryProps {
  images: GalleryImage[];
  className?: string;
  imageClassName?: string;
  speed?: number; // Parallax speed factor (0-1)
  columns?: 1 | 2 | 3 | 4;
  spacing?: 'tight' | 'normal' | 'wide';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export function ParallaxGallery({
  images,
  className,
  imageClassName,
  speed = 0.5,
  columns = 3,
  spacing = 'normal',
  rounded = 'md',
}: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Update container height on resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.scrollHeight);
      }
    };

    // Initial height calculation
    updateHeight();

    // Add resize event listener
    window.addEventListener('resize', updateHeight);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateHeight);
  }, [images]);

  // Calculate grid template columns
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  // Calculate grid gap
  const gridGap = {
    tight: 'gap-2',
    normal: 'gap-4',
    wide: 'gap-6',
  };

  // Calculate rounded corners
  const roundedSize = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Split images into columns
  const getColumnsArray = () => {
    const result = Array.from({ length: columns }, () => [] as GalleryImage[]);
    
    // Distribute images across columns
    images.forEach((image, i) => {
      result[i % columns].push(image);
    });
    
    return result;
  };

  const columnsArray = getColumnsArray();

  return (
    <div 
      ref={containerRef} 
      className={cn(
        'w-full grid', 
        gridCols[columns], 
        gridGap[spacing],
        className
      )}
    >
      {columnsArray.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {column.map((image, imgIndex) => {
            // Create unique parallax effect for each image
            // Alternate direction and vary speed slightly for each column
            const direction = colIndex % 2 === 0 ? 1 : -1;
            const uniqueSpeed = speed * (1 + (colIndex * 0.1));
            const y = useTransform(
              scrollYProgress, 
              [0, 1], 
              [0, containerHeight * uniqueSpeed * direction * 0.2]
            );
            const springY = useSpring(y, { stiffness: 100, damping: 30 });

            return (
              <ParallaxImage 
                key={`${colIndex}-${imgIndex}`}
                image={image}
                y={springY}
                className={cn(
                  roundedSize[rounded],
                  imageClassName
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

interface ParallaxImageProps {
  image: GalleryImage;
  y: MotionValue<number>;
  className?: string;
}

function ParallaxImage({ image, y, className }: ParallaxImageProps) {
  const aspectRatio = image.aspectRatio || 1.5; // Default 3:2 aspect ratio
  
  return (
    <motion.div
      style={{ y }}
      className={cn(
        'relative overflow-hidden w-full',
        className
      )}
    >
      <div style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }} />
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
    </motion.div>
  );
} 