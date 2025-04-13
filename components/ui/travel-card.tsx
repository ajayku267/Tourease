"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Star, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface TravelCardProps {
  title: string;
  location: string;
  image: string;
  price?: string;
  rating?: number;
  duration?: string;
  category?: string;
  className?: string;
  href?: string;
  featured?: boolean;
}

export function TravelCard({
  title,
  location,
  image,
  price,
  rating = 4.8,
  duration = "3 days",
  category = "Adventure",
  className,
  href = "#",
  featured = false,
}: TravelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle 3D effect calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setMousePosition({ x, y });
  };

  // Reset position when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  // Initialize card
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <Link href={href} passHref>
      <motion.div
        ref={cardRef}
        className={cn(
          "relative overflow-hidden rounded-xl group cursor-pointer will-change-transform backface-hidden",
          featured ? "sm:col-span-2 sm:row-span-2" : "",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -8}deg) rotateY(${(mousePosition.x - 0.5) * 8}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
          transition: "all 0.4s cubic-bezier(0.17, 0.67, 0.3, 0.96)"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dynamic shine overlay */}
        {isMounted && (
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%)`,
            }}
          />
        )}

        {/* Background image with parallax effect */}
        <div className="absolute inset-0 w-full h-full transform transition-transform duration-500 ease-out"
          style={{
            transform: isHovered 
              ? `translateX(${(mousePosition.x - 0.5) * -15}px) translateY(${(mousePosition.y - 0.5) * -15}px)`
              : 'translateX(0) translateY(0)'
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-6">
          {/* Category badge */}
          <div 
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 2px 10px rgba(255, 95, 31, 0.3)",
              transform: `translateZ(20px)`,
            }}
          >
            {category}
          </div>
          
          {/* Like button */}
          <button 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/40"
            style={{
              transform: `translateZ(20px)`,
            }}
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-4 h-4 text-white" />
          </button>
          
          {/* Information */}
          <div
            style={{
              transform: `translateZ(30px)`,
            }}
          >
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 text-white/80 mr-1" />
              <p className="text-white/80 text-sm font-medium">{location}</p>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-white/80 mr-1" />
                <span className="text-white/80 text-sm">{duration}</span>
              </div>
              
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-white text-sm font-medium">{rating}</span>
              </div>
            </div>
            
            {price && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-white text-lg font-bold">{price}</p>
                <motion.div 
                  className="flex items-center text-white text-sm font-medium" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="mr-1">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 