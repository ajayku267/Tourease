"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight, Heart } from "lucide-react";

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    location: string;
    image: string;
    price?: number;
    rating?: number;
    ratingCount?: number;
    description?: string;
    duration?: string;
    bestSeason?: string;
    activities?: string[];
  };
  variant?: "large" | "medium" | "small";
  index?: number;
}

export function DestinationCard({ 
  destination, 
  variant = "medium",
  index = 0 
}: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const cardSizeClasses = {
    large: "col-span-2 md:row-span-2 aspect-[4/5]",
    medium: "aspect-[3/4]",
    small: "aspect-square"
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl ${cardSizeClasses[variant]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
      </div>

      {/* Favorite Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
      >
        <Heart 
          className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
        />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6">
        <div className="flex flex-col space-y-1">
          <motion.h3 
            className="text-white text-xl md:text-2xl font-bold tracking-tight"
            animate={{ y: isHovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {destination.name}
          </motion.h3>
          
          <motion.p 
            className="text-white/90 text-sm flex items-center"
            animate={{ y: isHovered ? -4 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <MapPin className="h-4 w-4 mr-1" />
            {destination.location}
          </motion.p>
          
          {destination.bestSeason && (
            <motion.p 
              className="text-white/80 text-xs flex items-center"
              animate={{ y: isHovered ? -4 : 0, opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Best time: {destination.bestSeason}
            </motion.p>
          )}
        </div>

        {/* Price Tag */}
        {destination.price && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-gray-800">
              ${destination.price} <span className="text-gray-500 text-xs">/person</span>
            </span>
          </div>
        )}

        {/* Rating */}
        {destination.rating && (
          <div className="absolute top-4 left-4 bg-amber-400 px-2 py-1 rounded-md flex items-center">
            <svg className="w-4 h-4 text-white mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-bold text-white">{destination.rating}</span>
            {destination.ratingCount && (
              <span className="text-white/80 text-xs ml-1">({destination.ratingCount})</span>
            )}
          </div>
        )}

        {/* Call to action */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 10,
            transition: { duration: 0.3, delay: 0.1 }
          }}
        >
          <Link 
            href={`/destinations/${destination.id}`}
            className="inline-flex items-center font-medium text-white group/button"
          >
            <span className="relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-left after:scale-x-100 group-hover/button:after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out">
              Explore Destination
            </span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 