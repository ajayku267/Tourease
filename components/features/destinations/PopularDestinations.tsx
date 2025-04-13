"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DestinationCard } from "./DestinationCard";
import { MapPin, TrendingUp, Calendar, Globe, ChevronRight, ChevronLeft } from "lucide-react";

// Sample data - replace with actual data from your API
const destinations = [
  {
    id: "santorini",
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    price: 1299,
    rating: 4.9,
    ratingCount: 1428,
    description: "Iconic white buildings with blue domes overlooking the Aegean Sea",
    duration: "7 days",
    bestSeason: "Apr-Oct",
    activities: ["Island tours", "Sunset views", "Beach relaxation"]
  },
  {
    id: "bali",
    name: "Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop",
    price: 899,
    rating: 4.8,
    ratingCount: 2103,
    description: "Tropical paradise with lush landscapes, beaches and vibrant culture",
    duration: "10 days",
    bestSeason: "May-Sep",
    activities: ["Temple visits", "Surfing", "Rice terraces"]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    price: 1599,
    rating: 4.9,
    ratingCount: 1872,
    description: "Ancient temples, traditional tea houses and beautiful gardens",
    duration: "8 days",
    bestSeason: "Mar-May, Oct-Nov",
    activities: ["Temple visits", "Tea ceremonies", "Cherry blossoms"]
  },
  {
    id: "paris",
    name: "Paris",
    location: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    price: 1099,
    rating: 4.7,
    ratingCount: 3241,
    description: "City of lights offering iconic landmarks and romantic atmosphere",
    duration: "5 days",
    bestSeason: "Year-round",
    activities: ["Art museums", "Café culture", "Historical tours"]
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Peru",
    image: "https://source.unsplash.com/random/600x400/?machu-picchu",
    price: 1499,
    rating: 4.9,
    ratingCount: 1267,
    description: "Ancient Incan citadel set high in the Andes Mountains",
    duration: "9 days",
    bestSeason: "May-Sep",
    activities: ["Hiking", "Archaeological tours", "Mountain views"]
  },
  {
    id: "maldives",
    name: "Maldives",
    location: "Maldives",
    image: "https://source.unsplash.com/random/600x400/?maldives",
    price: 2199,
    rating: 4.9,
    ratingCount: 1583,
    description: "Tropical paradise with overwater bungalows and crystal-clear waters",
    duration: "7 days",
    bestSeason: "Nov-Apr",
    activities: ["Snorkeling", "Diving", "Beach relaxation"]
  }
];

// Available filters
const filters = [
  { name: "All", icon: <Globe className="h-4 w-4" />, value: "all" },
  { name: "Trending", icon: <TrendingUp className="h-4 w-4" />, value: "trending" },
  { name: "Best Season", icon: <Calendar className="h-4 w-4" />, value: "season" },
  { name: "Asia", icon: <MapPin className="h-4 w-4" />, value: "asia" },
  { name: "Europe", icon: <MapPin className="h-4 w-4" />, value: "europe" },
];

export function PopularDestinations() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Filter destinations based on the active filter
  const filteredDestinations = destinations.filter(dest => {
    if (activeFilter === "all") return true;
    if (activeFilter === "trending") return dest.rating >= 4.8;
    if (activeFilter === "season") return dest.bestSeason.includes("Year-round");
    if (activeFilter === "asia") return ["Japan", "Indonesia", "Maldives"].includes(dest.location);
    if (activeFilter === "europe") return ["Greece", "France"].includes(dest.location);
    return true;
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <motion.span 
              className="inline-block text-primary font-semibold tracking-wider uppercase text-sm mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Explore the world
            </motion.span>
            <motion.h2 
              ref={ref}
              className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Popular Destinations
            </motion.h2>
            <motion.p 
              className="mt-2 text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover breathtaking locations loved by travelers worldwide, from pristine 
              beaches to historic landmarks.
            </motion.p>
          </div>
          
          {/* Control buttons for mobile scrolling */}
          <div className="flex space-x-2">
            <button className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-3 rounded-full bg-primary text-white shadow-md hover:shadow-lg transition-shadow">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Filter tabs */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full flex items-center transition-all ${
                activeFilter === filter.value
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter.icon}
              <span className="ml-2">{filter.name}</span>
            </button>
          ))}
        </motion.div>
        
        {/* Destinations grid with different sizes */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredDestinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              variant={index === 0 ? "large" : index % 5 === 3 ? "large" : "medium"}
              index={index}
            />
          ))}
        </motion.div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <motion.a
            href="/destinations"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Destinations
            <ChevronRight className="ml-2 h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
} 