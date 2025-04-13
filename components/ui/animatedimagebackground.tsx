'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PlaceholderImage } from './PlaceholderImage'

interface AnimatedImageBackgroundProps {
  src: string
  alt: string
  children: React.ReactNode
  className?: string
  overlayOpacity?: number
  overlayColor?: string
  hoverEffect?: 'zoom' | 'slide' | 'pulse' | 'none'
  priority?: boolean
  animationDelay?: number
}

export function AnimatedImageBackground({
  src,
  alt,
  children,
  className = '',
  overlayOpacity = 0.4,
  overlayColor = '#000000',
  hoverEffect = 'zoom',
  priority = false,
  animationDelay = 0
}: AnimatedImageBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const getAnimationVariants = () => {
    switch (hoverEffect) {
      case 'zoom':
        return {
          initial: { scale: 1 },
          hover: { scale: 1.1 },
        }
      case 'slide':
        return {
          initial: { x: 0 },
          hover: { x: 10 },
        }
      case 'pulse':
        return {
          initial: { opacity: 1 },
          hover: { 
            opacity: [1, 0.85, 1],
            transition: { 
              repeat: Infinity, 
              duration: 2 
            }
          },
        }
      case 'none':
      default:
        return {
          initial: {},
          hover: {},
        }
    }
  }

  const variants = getAnimationVariants()

  // Optional load animation
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: animationDelay,
        duration: 0.5
      }
    }
  }

  return (
    <motion.div 
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <PlaceholderImage
          src={src}
          alt={alt}
          width={1000}
          height={600}
          priority={priority}
          placeholderText="Loading amazing destination..."
          placeholderBgColor="#6366f1"
          className="w-full h-full"
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent"
        style={{ 
          backgroundColor: `${overlayColor}${Math.round(overlayOpacity * 255).toString(16).padStart(2, '0')}` 
        }}
      />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  )
}

// Specialized background components
export function DestinationCardBackground({ 
  src,
  alt,
  children,
  className = '',
  hoverEffect = 'zoom'
}: Omit<AnimatedImageBackgroundProps, 'overlayOpacity' | 'overlayColor' | 'hoverEffect'> & { 
  hoverEffect?: 'zoom' | 'slide' | 'pulse' | 'none'
}) {
  return (
    <AnimatedImageBackground
      src={src}
      alt={alt}
      className={`rounded-xl ${className}`}
      overlayOpacity={0.3}
      overlayColor="#111111"
      hoverEffect={hoverEffect}
    >
      {children}
    </AnimatedImageBackground>
  )
}

export function HeroBackground({ 
  src,
  alt,
  children,
  className = ''
}: Omit<AnimatedImageBackgroundProps, 'overlayOpacity' | 'overlayColor' | 'hoverEffect'>) {
  return (
    <AnimatedImageBackground
      src={src}
      alt={alt}
      className={`min-h-[60vh] ${className}`}
      overlayOpacity={0.5}
      overlayColor="#000000"
      hoverEffect="none"
      priority={true}
    >
      {children}
    </AnimatedImageBackground>
  )
}

export function TourCardBackground({ 
  src,
  alt,
  children,
  className = '',
  hoverEffect = 'slide'
}: Omit<AnimatedImageBackgroundProps, 'overlayOpacity' | 'overlayColor' | 'hoverEffect'> & { 
  hoverEffect?: 'zoom' | 'slide' | 'pulse' | 'none'
}) {
  return (
    <AnimatedImageBackground
      src={src}
      alt={alt}
      className={`rounded-xl ${className}`}
      overlayOpacity={0.4}
      overlayColor="#1e293b"
      hoverEffect={hoverEffect}
    >
      {children}
    </AnimatedImageBackground>
  )
} 