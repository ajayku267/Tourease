"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export interface TripCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: number;
  groupSize: number;
  startDate: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  featured?: boolean;
  onClick?: () => void;
}

export function TripCard({
  id,
  title,
  description,
  location,
  duration,
  groupSize,
  startDate,
  price,
  image,
  rating,
  category,
  featured = false,
  onClick,
}: TripCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      className={`rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full ${
        featured ? 'border-2 border-primary' : ''
      }`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] w-full">
        <PlaceholderImage
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          fallbackSrc="/placeholders/tour-placeholder.jpg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-primary font-medium">
            {category}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="default" className="bg-primary text-white font-medium">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20" />
      </div>

      <div className="flex-1 p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center bg-gray-50 rounded-md p-2">
            <Calendar className="h-4 w-4 text-primary mb-1" />
            <span className="text-xs text-gray-600">Start</span>
            <span className="text-xs font-medium">{formattedDate}</span>
          </div>
          <div className="flex flex-col items-center bg-gray-50 rounded-md p-2">
            <Clock className="h-4 w-4 text-primary mb-1" />
            <span className="text-xs text-gray-600">Duration</span>
            <span className="text-xs font-medium">{duration} days</span>
          </div>
          <div className="flex flex-col items-center bg-gray-50 rounded-md p-2">
            <Users className="h-4 w-4 text-primary mb-1" />
            <span className="text-xs text-gray-600">Group</span>
            <span className="text-xs font-medium">Max {groupSize}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5 pt-0 mt-auto flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-primary">${price}</span>
          <span className="text-sm text-gray-600">/person</span>
        </div>
        <Link href={`/trips/${id}`} passHref>
          <Button variant="default" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
} 