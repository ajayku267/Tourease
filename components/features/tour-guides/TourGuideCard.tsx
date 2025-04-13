"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MapPin, Globe, Calendar, User, Star, Languages, 
  MessageCircle, BadgeCheck, ArrowRight 
} from "lucide-react";
import { TourGuide } from "@/app/services/tourGuideService";

interface TourGuideCardProps {
  guide: TourGuide;
  variant?: "grid" | "list";
  priority?: boolean;
  index?: number;
}

export function TourGuideCard({ 
  guide, 
  variant = "grid", 
  priority = false,
  index = 0
}: TourGuideCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format languages for display
  const languageDisplay = guide.languages.length > 2 
    ? `${guide.languages.slice(0, 2).join(", ")} +${guide.languages.length - 2}`
    : guide.languages.join(", ");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 ${
        variant === "grid" ? "" : "flex"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div 
        className={`relative overflow-hidden ${
          variant === "grid" 
            ? "h-64 w-full" 
            : "w-40 sm:w-48 md:w-56 shrink-0"
        }`}
      >
        <Image
          src={guide.email.includes("example.com") 
            ? `https://source.unsplash.com/random/600x400/?portrait,${guide.id}` 
            : `https://api.dicebear.com/7.x/personas/jpg?seed=${guide.name}&backgroundColor=b6e3f4`
          }
          alt={guide.name}
          fill
          sizes={variant === "grid" ? "(max-width: 768px) 100vw, 33vw" : "150px"}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          priority={priority}
        />
        
        {/* Verification badge */}
        {guide.verified && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-white p-1.5 rounded-full shadow-md">
              <BadgeCheck className="h-4 w-4 text-primary" />
            </div>
          </div>
        )}
        
        {/* Experience level badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-800 flex items-center">
            <User className="h-3 w-3 mr-1 text-primary" />
            {guide.years_experience}+ years
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className={`p-4 sm:p-5 ${variant === "list" ? "flex-1" : ""}`}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              {guide.name}
            </h3>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {guide.location}
            </p>
          </div>
          
          <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-0.5" />
            <span className="text-sm font-semibold">{guide.rating.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Expertise/Specialization */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-1.5">
            {guide.expertise.slice(0, 3).map(expertise => (
              <span 
                key={expertise} 
                className="inline-flex text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-1"
              >
                {expertise}
              </span>
            ))}
            {guide.expertise.length > 3 && (
              <span className="inline-flex text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-1">
                +{guide.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Additional info */}
        <div className="mt-3 flex flex-wrap gap-y-1 gap-x-4 text-xs text-gray-600">
          <div className="flex items-center">
            <Languages className="h-3.5 w-3.5 mr-1" />
            {languageDisplay}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {guide.availability.length} days available
          </div>
        </div>
        
        {/* Rate and CTA */}
        <div className={`mt-4 flex items-center justify-between ${variant === "list" ? "pt-2 border-t border-gray-100" : ""}`}>
          <div>
            <span className="text-primary font-bold text-lg">${guide.hourly_rate}</span>
            <span className="text-gray-500 text-xs">/hour</span>
          </div>
          
          <motion.div
            animate={{
              opacity: variant === "grid" ? (isHovered ? 1 : 0) : 1,
              y: variant === "grid" ? (isHovered ? 0 : 5) : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              href={`/tour-guides/${guide.id}`}
              className="inline-flex items-center text-primary font-medium hover:underline text-sm"
            >
              View Profile
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Border gradient on hover */}
      {variant === "grid" && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: isHovered 
              ? "linear-gradient(to bottom, transparent 0%, transparent 95%, rgba(79, 70, 229, 0.2) 100%)" 
              : "transparent",
            zIndex: -1
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
} 