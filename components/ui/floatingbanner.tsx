'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, GripHorizontal } from 'lucide-react'
import Link from 'next/link'

interface FloatingBannerProps {
  title: string
  description?: string
  ctaText: string
  ctaLink: string
  showAfterScroll?: number // Show after scrolling this many pixels
  position?: 'bottom' | 'top'
  image?: string
  theme?: 'primary' | 'dark' | 'gradient'
}

export default function FloatingBanner({
  title,
  description,
  ctaText,
  ctaLink,
  showAfterScroll = 300,
  position = 'bottom',
  image,
  theme = 'primary'
}: FloatingBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Get theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white'
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-blue-600 text-white'
      case 'primary':
      default:
        return 'bg-primary text-white'
    }
  }

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfterScroll && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScroll, isDismissed])

  // Prevent showing the banner again in the same session
  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  // Drag constraints based on position
  const dragConstraints = position === 'bottom' 
    ? { top: 0, bottom: 0, left: 0, right: 0 } 
    : { top: 0, bottom: 0, left: 0, right: 0 }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className={`fixed ${position === 'bottom' ? 'bottom-5' : 'top-5'} left-1/2 transform -translate-x-1/2 z-50 max-w-3xl w-[95%] rounded-xl shadow-xl overflow-hidden`}
        >
          <div className={`relative px-4 py-3 ${getThemeStyles()}`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/pattern.svg')]"></div>
            </div>
            
            {/* Drag handle */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 text-white/50">
              <GripHorizontal size={16} />
            </div>
            
            {/* Content container */}
            <div className="flex items-center justify-between pl-5">
              {/* Left side - text content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {image && (
                    <div className="hidden sm:block w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base">{title}</h3>
                    {description && (
                      <p className="text-white/80 text-xs sm:text-sm mt-0.5 max-w-md">{description}</p>
                    )}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="sm:ml-auto">
                    {!isDragging && (
                      <Link href={ctaLink}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-primary hover:bg-white/90 px-4 py-1.5 rounded-lg text-sm font-medium"
                        >
                          {ctaText}
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Close button */}
              <button 
                onClick={handleDismiss}
                className="ml-4 text-white/80 hover:text-white p-1"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 