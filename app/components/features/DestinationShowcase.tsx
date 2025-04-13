'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DestinationCardBackground } from '../ui/AnimatedImageBackground'

interface Destination {
  id: number
  title: string
  location: string
  image: string
  description: string
}

interface DestinationShowcaseProps {
  destinations: Destination[]
  interval?: number
  autoPlay?: boolean
  className?: string
}

export default function DestinationShowcase({
  destinations,
  interval = 5000,
  autoPlay = true,
  className = ''
}: DestinationShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const [isPaused, setIsPaused] = useState(false)

  const nextDestination = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length)
  }

  const prevDestination = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    )
  }

  useEffect(() => {
    if (!autoPlay || isPaused) return

    const timer = setInterval(() => {
      nextDestination()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, isPaused, interval])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      }
    }),
  }

  const currentDestination = destinations[currentIndex]

  return (
    <div 
      className={`relative h-[500px] overflow-hidden rounded-xl ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <button 
        onClick={prevDestination}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
        aria-label="Previous destination"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button 
        onClick={nextDestination}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
        aria-label="Next destination"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {destinations.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1)
              setCurrentIndex(i)
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentIndex 
              ? 'bg-white scale-125' 
              : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to destination ${i + 1}`}
          />
        ))}
      </div>
      
      {/* Main Carousel */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <DestinationCardBackground
            src={currentDestination.image}
            alt={currentDestination.title}
            className="h-full"
          >
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentDestination.title}</h3>
                <p className="text-white/80 text-sm md:text-base mb-3">{currentDestination.location}</p>
                <p className="text-white/90 max-w-xl hidden md:block">{currentDestination.description}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-5 py-2 bg-white text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Explore Destination
                </motion.button>
              </motion.div>
            </div>
          </DestinationCardBackground>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 