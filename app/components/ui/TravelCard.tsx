'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock, ChevronRight } from 'lucide-react'
import { DestinationCardBackground } from './AnimatedImageBackground'
import Link from 'next/link'

interface TravelCardProps {
  title: string
  location: string
  image: string
  rating?: number
  reviewCount?: number
  price?: string
  duration?: string
  tag?: string
  tagColor?: string
  href?: string
  className?: string
  index?: number
}

export function TravelCard({
  title,
  location,
  image,
  rating,
  reviewCount,
  price,
  duration,
  tag,
  tagColor = '#FF5F1F',
  href = '#',
  className = '',
  index = 0
}: TravelCardProps) {
  const staggerDelay = 0.1 * index

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: staggerDelay, 
        duration: 0.4,
        ease: 'easeOut'
      }}
      whileHover={{ y: -5 }}
      className={`group ${className}`}
    >
      <Link href={href}>
        <DestinationCardBackground
          src={image}
          alt={title}
          className="h-[300px]"
        >
          <div className="p-5 h-full flex flex-col justify-between">
            {/* Top content */}
            <div className="flex justify-between">
              {tag && (
                <span 
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: tagColor }}
                >
                  {tag}
                </span>
              )}
              
              {rating && (
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium">{rating.toFixed(1)}</span>
                  {reviewCount && (
                    <span className="text-xs text-gray-500">({reviewCount})</span>
                  )}
                </div>
              )}
            </div>
            
            {/* Bottom content */}
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
              
              <div className="flex items-center text-white/80 text-sm mb-2">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{location}</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  {price && (
                    <div className="text-white font-bold">{price}</div>
                  )}
                  
                  {duration && (
                    <div className="flex items-center text-white/75 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {duration}
                    </div>
                  )}
                </div>
                
                <motion.div 
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </DestinationCardBackground>
      </Link>
    </motion.div>
  )
}

// Preset variants
export function DestinationCard(props: Omit<TravelCardProps, 'tag'>) {
  return (
    <TravelCard
      {...props}
      tag="Popular Destination"
    />
  )
}

export function TourCard(props: Omit<TravelCardProps, 'tag' | 'tagColor'>) {
  return (
    <TravelCard
      {...props}
      tag="Guided Tour"
      tagColor="#10B981"
    />
  )
}

export function ActivityCard(props: Omit<TravelCardProps, 'tag' | 'tagColor'>) {
  return (
    <TravelCard
      {...props}
      tag="Activity"
      tagColor="#3B82F6"
    />
  )
} 