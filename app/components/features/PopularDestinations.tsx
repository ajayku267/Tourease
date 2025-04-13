"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Star, 
  Globe, 
  Filter, 
  Grid, 
  List,
  Map as MapIcon
} from "lucide-react";
import { TravelCard } from "@/components/ui/travel-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

// Featured destinations data with images and details
const destinations = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise with stunning beaches, vibrant culture, and ancient temples.",
    image: "/images/destinations/bali.jpg",
    rating: 4.8,
    price: "$1,200",
    popular: true,
    featured: true,
    tags: ["Beach", "Culture", "Adventure"],
    coordinates: { lat: -8.4095, lng: 115.1889 }
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    description: "Ancient city filled with traditional temples, serene gardens, and historic sites.",
    image: "/images/destinations/kyoto.jpg",
    rating: 4.9,
    price: "$1,750",
    popular: true,
    featured: false,
    tags: ["History", "Culture", "Temples"],
    coordinates: { lat: 35.0116, lng: 135.7681 }
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    description: "Stunning island with white-washed buildings, blue domes, and breathtaking sunsets.",
    image: "/images/destinations/santorini.jpg",
    rating: 4.9,
    price: "$1,850",
    popular: true,
    featured: true,
    tags: ["Island", "Romantic", "Views"],
    coordinates: { lat: 36.3932, lng: 25.4615 }
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    description: "Vibrant city with unique architecture, Mediterranean beaches, and lively culture.",
    image: "/images/destinations/barcelona.jpg",
    rating: 4.7,
    price: "$1,300",
    popular: true,
    featured: false,
    tags: ["City", "Architecture", "Food"],
    coordinates: { lat: 41.3851, lng: 2.1734 }
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    description: "Exotic destination with colorful markets, historic palaces, and desert adventures.",
    image: "/images/destinations/marrakech.jpg",
    rating: 4.6,
    price: "$950",
    popular: true,
    featured: false,
    tags: ["Culture", "Markets", "History"],
    coordinates: { lat: 31.6295, lng: -7.9811 }
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    description: "Adventure capital with stunning alpine scenery, outdoor activities, and pristine lakes.",
    image: "/images/destinations/queenstown.jpg",
    rating: 4.8,
    price: "$2,100",
    popular: true,
    featured: false,
    tags: ["Adventure", "Nature", "Mountains"],
    coordinates: { lat: -45.0312, lng: 168.6626 }
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    country: "Brazil",
    description: "Vibrant city known for its stunning beaches, iconic landmarks, and lively culture.",
    image: "/images/destinations/rio.jpg",
    rating: 4.7,
    price: "$1,500",
    popular: true,
    featured: false,
    tags: ["Beach", "City", "Culture"],
    coordinates: { lat: -22.9068, lng: -43.1729 }
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description: "Romantic city filled with iconic landmarks, world-class museums, and charming cafes.",
    image: "/images/destinations/paris.jpg",
    rating: 4.8,
    price: "$1,400",
    popular: true,
    featured: true,
    tags: ["City", "Culture", "Romantic"],
    coordinates: { lat: 48.8566, lng: 2.3522 }
  }
];

// Categories for filtering
const categories = [
  { id: "all", label: "All Destinations", icon: <Globe className="w-4 h-4" /> },
  { id: "popular", label: "Popular", icon: <Star className="w-4 h-4" /> },
  { id: "beach", label: "Beaches", icon: <MapPin className="w-4 h-4" /> },
  { id: "city", label: "Cities", icon: <MapIcon className="w-4 h-4" /> },
  { id: "adventure", label: "Adventure", icon: <ChevronRight className="w-4 h-4" /> },
  { id: "culture", label: "Culture", icon: <Globe className="w-4 h-4" /> },
];

export function PopularDestinations() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredDestination, setHoveredDestination] = useState(null);
  const [visibleItems, setVisibleItems] = useState(6);
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeMap, setActiveMap] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  
  // Scroll handling for horizontal view
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      
      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  // Filter destinations based on active category and favorites
  const filteredDestinations = destinations.filter(destination => {
    if (activeCategory === "favorites") return favorites.includes(destination.id);
    if (activeCategory === "all") return true;
    if (activeCategory === "popular") return destination.popular;
    return destination.tags && destination.tags.some(tag => 
      tag.toLowerCase() === activeCategory.toLowerCase()
    );
  });
  
  // Reset visible items when category changes
  useEffect(() => {
    setVisibleItems(6);
  }, [activeCategory]);
  
  // Load more destinations
  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, filteredDestinations.length));
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  // Map preview component
  const MapPreview = ({ destination }) => {
    return (
      <div className="absolute inset-0 bg-white z-20 rounded-lg overflow-hidden flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-semibold flex items-center">
            <MapIcon className="h-4 w-4 mr-2 text-blue-600" />
            {destination.name}, {destination.country}
          </h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setActiveMap(null)}
          >
            Close
          </Button>
        </div>
        <div className="flex-1 relative">
          <Image
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${destination.coordinates.lat},${destination.coordinates.lng}&zoom=10&size=600x400&markers=color:red%7C${destination.coordinates.lat},${destination.coordinates.lng}&key=YOUR_API_KEY`}
            alt={`Map of ${destination.name}`}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4">
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-3 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-blue-50 transition-colors"
            >
              View on Google Maps
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section 
      id="popular-destinations" 
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold tracking-wider uppercase text-sm mb-2 inline-block">
            Popular Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Dream Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the world's most breathtaking places. 
            From tropical paradises to historic cities, find your next adventure.
          </p>
        </motion.div>
        
        {/* Filter UI */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronRight className="h-4 w-4 rotate-90 transition-transform" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform" />
              )}
            </Button>

            {/* Only show on desktop or when expanded on mobile */}
            <div className={`w-full md:w-auto flex-wrap ${isTablet || showFilters ? 'flex' : 'hidden'} justify-center gap-2 md:gap-3`}>
              {[...categories, { id: "favorites", label: "Favorites", icon: <Heart className="w-4 h-4" /> }].map((category) => (
                <motion.button
                  key={category.id}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  } ${category.id === "favorites" && favorites.length === 0 ? "opacity-50" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={category.id === "favorites" && favorites.length === 0}
                >
                  {category.icon}
                  {category.label}
                  {category.id === "favorites" && favorites.length > 0 && (
                    <Badge className="ml-1 bg-white text-blue-600 h-5 min-w-5 flex items-center justify-center rounded-full p-0">
                      {favorites.length}
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>

            {/* View mode toggle */}
            <div className="flex items-center space-x-2 ml-auto md:ml-0">
              <button 
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button 
                className={`p-2 rounded-md transition-colors ${viewMode === 'carousel' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setViewMode('carousel')}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>Showing <span className="font-medium text-gray-900">{Math.min(visibleItems, filteredDestinations.length)}</span> of <span className="font-medium text-gray-900">{filteredDestinations.length}</span> destinations</span>
            {activeCategory !== "all" && (
              <Button variant="link" size="sm" onClick={() => setActiveCategory("all")} className="ml-2">
                Clear filter
              </Button>
            )}
          </div>
        </div>
        
        {/* Grid view */}
        {viewMode === 'grid' && (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {filteredDestinations.slice(0, visibleItems).map((destination) => (
                <motion.div 
                  key={destination.id} 
                  variants={cardVariants}
                  className="relative group"
                >
                  <div className="relative h-full rounded-lg overflow-hidden bg-white shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                    {/* Map preview overlay */}
                    {activeMap === destination.id && (
                      <MapPreview destination={destination} />
                    )}
                    
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                      
                      {/* Buttons */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button
                          onClick={(e) => toggleFavorite(destination.id, e)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(destination.id) 
                            ? "bg-red-500 text-white" 
                            : "bg-white/80 text-gray-700 hover:bg-white"
                          }`}
                          aria-label={favorites.includes(destination.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart className={`h-5 w-5 ${favorites.includes(destination.id) ? "fill-white" : ""}`} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveMap(activeMap === destination.id ? null : destination.id);
                          }}
                          className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white transition-colors"
                          aria-label="View on map"
                        >
                          <MapIcon className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {/* Destination name and location */}
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="text-xl font-bold">{destination.name}</h3>
                        <div className="flex items-center text-white/90">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{destination.country}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      {/* Rating and tags */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-1">
                          {destination.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-xs font-medium">{destination.rating}</span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {destination.description}
                      </p>
                      
                      {/* Price and CTA */}
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">{destination.price}</span>
                        <Link
                          href={`/destinations/${destination.id}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium transition-colors hover:bg-blue-700"
                        >
                          Explore
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Load more button */}
            {visibleItems < filteredDestinations.length && (
              <motion.div 
                className="mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="px-6"
                >
                  Load More Destinations
                </Button>
              </motion.div>
            )}
          </>
        )}
        
        {/* Carousel view */}
        {viewMode === 'carousel' && (
          <div className="relative">
            <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
              <Button
                onClick={() => scroll("left")}
                variant="outline"
                size="icon"
                className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-10 w-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
              <Button
                onClick={() => scroll("right")}
                variant="outline"
                size="icon"
                className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-10 w-10"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div 
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredDestinations.map((destination) => (
                <motion.div 
                  key={destination.id}
                  className="min-w-[270px] sm:min-w-[300px] md:min-w-[350px] flex-shrink-0 snap-start"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-full rounded-xl overflow-hidden group">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={(e) => toggleFavorite(destination.id, e)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(destination.id) 
                            ? "bg-red-500 text-white" 
                            : "bg-white/80 text-gray-700 hover:bg-white"
                          }`}
                        >
                          <Heart className={`h-5 w-5 ${favorites.includes(destination.id) ? "fill-white" : ""}`} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                      <div className="flex items-center mb-3">
                        <MapPin className="h-4 w-4 mr-1 text-white/90" />
                        <span className="text-white/90">{destination.country}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span>{destination.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4 flex flex-wrap gap-1">
                        {destination.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} className="bg-white/20 hover:bg-white/30 text-white border-none">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold">{destination.price}</span>
                        <Link
                          href={`/destinations/${destination.id}`}
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-blue-600 text-sm font-medium transition-colors hover:bg-blue-50"
                        >
                          Explore
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/destinations">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              View All Destinations
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 