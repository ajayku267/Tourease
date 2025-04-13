"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Heart, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  description?: string;
  image: string;
  rating?: number;
  price?: string;
  category?: string;
  featured?: boolean;
  tags?: string[];
  onClick?: () => void;
  className?: string;
}

export function DestinationCard({
  id,
  name,
  country,
  description,
  image,
  rating = 0,
  price,
  category = "",
  featured = false,
  tags = [],
  onClick,
  className,
}: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const destinationUrl = `/destinations/${slugify(name)}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // In a real app, you would save this to user preferences in a database
    console.log(`${name} ${isFavorite ? 'removed from' : 'added to'} favorites`);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Allow custom onClick handler to override default behavior if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={destinationUrl} passHref>
      <motion.div
        className={cn(
          "relative group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer",
          featured ? "ring-2 ring-primary" : "",
          className
        )}
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container with overlay */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={imageError ? "/images/placeholders/destination-placeholder.jpg" : image}
            alt={`${name}, ${country}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100"
            )}
            onError={() => setImageError(true)}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
          
          {/* Category badge */}
          {category && (
            <div className="absolute top-3 left-3 z-10">
              <Badge 
                variant="secondary"
                className="bg-white/80 text-primary backdrop-blur-sm font-medium"
              >
                {category}
              </Badge>
            </div>
          )}
          
          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 right-12 z-10">
              <Badge 
                className="bg-primary text-white font-medium"
              >
                Featured
              </Badge>
            </div>
          )}
          
          {/* Favorite button */}
          <button
            className={cn(
              "absolute top-3 right-3 z-10 p-1.5 rounded-full transition-colors",
              isFavorite ? "bg-red-500/80 text-white" : "bg-white/80 text-gray-700",
              "hover:bg-white hover:shadow-md"
            )}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={cn(
                "h-4 w-4",
                isFavorite ? "fill-white" : ""
              )} 
            />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-900 line-clamp-1 text-lg">{name}</h3>
            {rating > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{country}</span>
          </div>
          
          {description && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
          )}
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Price and CTA */}
          <div className="mt-auto flex items-center justify-between pt-2">
            {price && (
              <div className="font-bold text-primary">
                {price}
              </div>
            )}
            <div className="flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View Details
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 