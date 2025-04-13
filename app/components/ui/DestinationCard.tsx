"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Star, MapPin, Calendar, Users, ArrowRight, TrendingUp, CloudSun, Globe, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    location: string;
    image: string;
    rating?: number;
    price?: string;
    currency?: string;
    description?: string;
    distance?: string;
    duration?: string;
    travelers?: number;
    startDate?: string;
    endDate?: string;
    weather?: {
      temp: number;
      condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
    };
    activities?: string[];
    isTrending?: boolean;
    isPopular?: boolean;
    hasPromotion?: boolean;
    discountPercentage?: number;
    tags?: string[];
    slug?: string;
  };
  variant?: "default" | "compact" | "featured" | "horizontal" | "minimal";
  withAnimation?: boolean;
  priority?: boolean;
  hideActions?: boolean;
  className?: string;
}

export function DestinationCard({
  destination,
  variant = "default",
  withAnimation = true,
  priority = false,
  hideActions = false,
  className = "",
}: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Interactive 3D effect setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configuration for smooth animations
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  
  // Badge animations
  const badgeScale = useSpring(1, { damping: 10, stiffness: 100 });
  const badgeOpacity = useTransform(badgeScale, [0.95, 1], [0.7, 1]);
  
  // Weather icon mapping
  const weatherIcons = {
    sunny: <CloudSun className="text-yellow-400 h-4 w-4" />,
    cloudy: <CloudSun className="text-gray-400 h-4 w-4" />,
    rainy: <CloudSun className="text-blue-400 h-4 w-4" />,
    snowy: <CloudSun className="text-blue-200 h-4 w-4" />,
  };
  
  // Format price with correct currency
  const formatPrice = (price: string, currency: string = "$") => {
    return `${currency}${price}`;
  };

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!withAnimation || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Set rotation values
    rotateX.set(-mouseY / 20); // Negative for natural rotation
    rotateY.set(mouseX / 20);
  };
  
  // Reset rotation on mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };
  
  // Intersection Observer for entrance animation
  useEffect(() => {
    if (!cardRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCardVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Variants for different card layouts
  const cardVariants = {
    default: "rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-xs w-full",
    compact: "rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300 max-w-[260px] w-full",
    featured: "rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl hover:shadow-2xl transition-all duration-300 max-w-md w-full border border-orange-200 dark:border-gray-800",
    horizontal: "rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 w-full flex",
    minimal: "rounded-lg overflow-hidden bg-transparent hover:bg-white/5 dark:hover:bg-gray-900/30 transition-all duration-300 max-w-xs w-full",
  };
  
  // Animation variants for entrance
  const entranceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  
  // Prepare href for the card
  const href = destination.slug 
    ? `/destinations/${destination.slug}` 
    : `/destinations/${destination.id || destination.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.div
      ref={cardRef}
      className={`${cardVariants[variant]} ${className}`}
      style={{ 
        x,
        y,
        rotateX: withAnimation ? rotateX : 0,
        rotateY: withAnimation ? rotateY : 0,
        perspective: 1000,
        transformStyle: "preserve-3d",
        cursor: "pointer",
      }}
      initial={withAnimation ? "hidden" : undefined}
      animate={withAnimation && isCardVisible ? "visible" : undefined}
      variants={entranceVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={withAnimation ? { scale: 1.02, zIndex: 10 } : undefined}
    >
      <Link href={href} className="block h-full">
        <div className={variant === "horizontal" ? "flex h-full" : "h-full"}>
          {/* Image section */}
          <div 
            className={`relative ${
              variant === "horizontal" ? "w-1/3 h-full" : 
              variant === "minimal" ? "h-48" : 
              "h-52"
            }`}
          >
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              sizes={
                variant === "featured" ? "100vw" :
                variant === "horizontal" ? "33vw" :
                "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Image overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
            
            {/* Ribbons and badges */}
            {destination.isTrending && (
              <motion.div 
                className="absolute top-3 left-3 z-10"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                style={{ opacity: badgeOpacity }}
              >
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 py-1">
                  <TrendingUp size={12} className="mr-1" /> Trending
                </Badge>
              </motion.div>
            )}
            
            {destination.isPopular && !destination.isTrending && (
              <motion.div 
                className="absolute top-3 left-3 z-10"
                animate={{ scale: isHovered ? 1.05 : 1 }}
              >
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 py-1">
                  Popular Choice
                </Badge>
              </motion.div>
            )}
            
            {destination.hasPromotion && (
              <motion.div 
                className="absolute top-3 right-3 z-10 origin-top-right"
                animate={{ rotate: isHovered ? [0, -5, 0, 5, 0] : 0 }}
                transition={{ duration: 0.5, repeat: isHovered ? 1 : 0 }}
              >
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 py-1 px-2">
                  {destination.discountPercentage}% OFF
                </Badge>
              </motion.div>
            )}
            
            {/* Location badge */}
            {variant !== "minimal" && (
              <div className="absolute bottom-3 left-3 z-10 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                <MapPin size={12} className="text-white mr-1" />
                <span className="text-white text-xs font-medium">{destination.location}</span>
              </div>
            )}
            
            {/* Weather badge - Only show for featured */}
            {variant === "featured" && destination.weather && (
              <div className="absolute bottom-3 right-3 z-10 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                {weatherIcons[destination.weather.condition]}
                <span className="text-white text-xs font-medium ml-1">{destination.weather.temp}°C</span>
              </div>
            )}
            
            {/* Save button */}
            {!hideActions && (
              <motion.button
                className="absolute top-3 right-3 z-10 bg-black/30 backdrop-blur-sm p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsSaved(!isSaved);
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)" 
                }}
              >
                <Heart
                  size={16}
                  className={isSaved ? "fill-red-500 text-red-500" : "text-white"}
                />
              </motion.button>
            )}
          </div>
          
          {/* Content section */}
          <div 
            className={`${
              variant === "horizontal" ? "w-2/3 p-4" :
              variant === "minimal" ? "p-2" :
              variant === "compact" ? "p-3" :
              "p-4"
            }`}
          >
            {/* Rating */}
            {destination.rating && variant !== "minimal" && (
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`${
                        i < Math.floor(destination.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {destination.rating}
                </span>
              </div>
            )}
            
            {/* Title and location */}
            <h3 
              className={`font-bold ${
                variant === "featured" ? "text-xl" :
                variant === "minimal" || variant === "compact" ? "text-base" :
                "text-lg"
              } text-gray-900 dark:text-white mb-1`}
            >
              {destination.name}
            </h3>
            
            {variant !== "minimal" && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Globe size={14} className="mr-1" />
                <span>{destination.location}</span>
              </div>
            )}
            
            {/* Description */}
            {destination.description && variant !== "compact" && variant !== "minimal" && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                {destination.description}
              </p>
            )}
            
            {/* Trip details row */}
            {(destination.duration || destination.travelers) && variant !== "minimal" && (
              <div className="flex items-center gap-3 mb-3 text-gray-600 dark:text-gray-400 text-xs">
                {destination.duration && (
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{destination.duration}</span>
                  </div>
                )}
                
                {destination.travelers && (
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    <span>{destination.travelers} travelers</span>
                  </div>
                )}
                
                {destination.distance && (
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{destination.distance}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Tags */}
            {destination.tags && destination.tags.length > 0 && variant === "featured" && (
              <div className="flex flex-wrap gap-1 mb-3">
                {destination.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Activities */}
            {destination.activities && destination.activities.length > 0 && variant === "featured" && (
              <div className="mb-3">
                <div className="flex items-center gap-1 mb-1">
                  <Camera size={14} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Popular Activities
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {destination.activities.slice(0, 3).map((activity, index) => (
                    <Badge key={index} variant="outline" className="text-[10px]">
                      {activity}
                    </Badge>
                  ))}
                  {destination.activities.length > 3 && (
                    <Badge variant="outline" className="text-[10px]">
                      +{destination.activities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Price and CTA */}
            <div className={`flex items-center justify-between mt-auto ${variant === "minimal" ? "mt-1" : "mt-2"}`}>
              {destination.price ? (
                <div>
                  <span className={`font-bold ${variant === "featured" ? "text-lg" : "text-base"} text-gray-900 dark:text-white`}>
                    {formatPrice(destination.price, destination.currency)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                    {variant !== "minimal" && variant !== "compact" ? "per person" : ""}
                  </span>
                </div>
              ) : (
                <div /> // Empty div to maintain the flex layout
              )}
              
              {!hideActions && variant !== "minimal" && (
                <motion.div 
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
                >
                  <Button size="sm" className="px-2.5 py-1.5 h-auto" variant={variant === "featured" ? "gradient" : "default"}>
                    <span className="text-xs">View</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 