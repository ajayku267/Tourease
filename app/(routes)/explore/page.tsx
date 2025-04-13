"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Star, 
  Filter, 
  Globe, 
  ArrowRight, 
  Heart,
  ChevronDown,
  X,
  SlidersHorizontal,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { DestinationCard } from "@/components/ui/destinationcard";
import AIChatbot from "../../components/features/AIChatbot";
import ARModeToggle from "../../components/features/ARModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

// Types
interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  continent: string;
  categories: string[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | undefined>(undefined);
  
  // Responsive design using the useMediaQuery hook
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Get user's current location for AR mode
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);
  
  // Mock data for destinations
  const destinations: Destination[] = [
    {
      id: 1,
      name: "Bali",
      country: "Indonesia",
      description: "A beautiful island known for its beaches, temples, and vibrant culture.",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
      rating: 4.8,
      continent: "Asia",
      categories: ["Beach", "Cultural", "Adventure"]
    },
    {
      id: 2,
      name: "Rome",
      country: "Italy",
      description: "A historic city with ancient ruins, art, and delicious cuisine.",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop",
      rating: 4.7,
      continent: "Europe",
      categories: ["Cultural", "Historical", "Food"]
    },
    {
      id: 3,
      name: "Tokyo",
      country: "Japan",
      description: "A vibrant metropolis blending ultramodern and traditional.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
      rating: 4.9,
      continent: "Asia",
      categories: ["Urban", "Cultural", "Food"]
    },
    {
      id: 4,
      name: "Paris",
      country: "France",
      description: "The city of love, known for its art, fashion, and landmarks.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
      rating: 4.6,
      continent: "Europe",
      categories: ["Cultural", "Urban", "Romantic"]
    },
    {
      id: 5,
      name: "Machu Picchu",
      country: "Peru",
      description: "An ancient Incan citadel set high in the Andes Mountains.",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800&auto=format&fit=crop",
      rating: 4.9,
      continent: "South America",
      categories: ["Historical", "Adventure", "Nature"]
    },
    {
      id: 6,
      name: "Sydney",
      country: "Australia",
      description: "A vibrant harbor city known for its landmarks and beaches.",
      image: "https://images.unsplash.com/photo-1562742937-93098e950173?q=80&w=800&auto=format&fit=crop",
      rating: 4.7,
      continent: "Oceania",
      categories: ["Urban", "Beach", "Nature"]
    },
    {
      id: 7,
      name: "Santorini",
      country: "Greece",
      description: "Iconic island with whitewashed buildings and stunning sunsets.",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
      rating: 4.8,
      continent: "Europe",
      categories: ["Beach", "Romantic", "Cultural"]
    },
    {
      id: 8,
      name: "Marrakech",
      country: "Morocco",
      description: "Vibrant markets, gardens, and palaces in this historic city.",
      image: "https://images.unsplash.com/photo-1597212720291-817f60538680?q=80&w=800&auto=format&fit=crop",
      rating: 4.5,
      continent: "Africa",
      categories: ["Cultural", "Historical", "Food"]
    },
    {
      id: 9,
      name: "Queenstown",
      country: "New Zealand",
      description: "Adventure capital with stunning mountain and lake scenery.",
      image: "https://images.unsplash.com/photo-1580311752481-c3f66ab72ae8?q=80&w=800&auto=format&fit=crop",
      rating: 4.9,
      continent: "Oceania",
      categories: ["Adventure", "Nature", "Scenic"]
    }
  ];

  const continents = ["Asia", "Europe", "North America", "South America", "Africa", "Oceania", "Antarctica"];
  
  const categories = ["Beach", "Cultural", "Urban", "Adventure", "Historical", "Food", "Nature", "Romantic", "Scenic"];

  // Filter destinations based on search, continent, category, and active tab
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = 
      searchQuery === "" || 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesContinent = 
      selectedContinent === null || 
      destination.continent === selectedContinent;
    
    const matchesCategory = 
      selectedCategory === null || 
      destination.categories.includes(selectedCategory);
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "favorites" && favorites.includes(destination.id));
    
    return matchesSearch && matchesContinent && matchesCategory && matchesTab;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic already handled by the filteredDestinations
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favId => favId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const resetFilters = () => {
    setSelectedContinent(null);
    setSelectedCategory(null);
    setSearchQuery("");
  };

  // Skeleton loader for destination cards
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <Skeleton className="h-48 w-full rounded-md mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Add the AR Mode Toggle button with prominent styling */}
      <ARModeToggle currentLocation={currentLocation} className="animate-pulse-slow" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* AR Mode Banner */}
          <div className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-4 text-white flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">New! AR Tour Mode</h3>
                <p className="text-sm text-white/80">Explore destinations in augmented reality</p>
              </div>
            </div>
            <Link href="/ar-tour" className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
              Try Now
            </Link>
          </div>
          
          {/* Hero Section */}
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-[#ff5f1f] rounded-lg overflow-hidden shadow-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-6 py-12 sm:px-12 sm:py-16 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -right-24 -top-24 w-64 h-64 bg-white/10 rounded-full blur-md"></div>
              <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-blue-500/20 rounded-full blur-md"></div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-sm relative z-10">
                Explore Amazing Destinations
              </h1>
              <p className="mt-2 text-lg sm:text-xl text-white/90 max-w-3xl relative z-10">
                Discover new places, cultures, and experiences around the world
              </p>
              
              <form onSubmit={handleSearch} className="mt-6 flex relative z-10">
                <div className="flex-1 min-w-0 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-l-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#ff5f1f] focus:ring-white focus:border-white"
                    placeholder="Where would you like to go?"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                <Button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-r-md text-white bg-[#ff5f1f] hover:bg-[#e55214] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5f1f]"
                >
                  Search
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Tabs and Filters */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="all" className="flex-1 md:flex-initial">All Destinations</TabsTrigger>
                  <TabsTrigger value="favorites" className="flex-1 md:flex-initial">
                    Favorites ({favorites.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                {(selectedContinent || selectedCategory) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-gray-600"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
            
            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white shadow rounded-lg mb-6 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Continent</label>
                        <div className="flex flex-wrap gap-2">
                          {continents.map((continent) => (
                            <Badge
                              key={continent}
                              variant={selectedContinent === continent ? "default" : "outline"}
                              className={`cursor-pointer ${
                                selectedContinent === continent 
                                ? 'bg-blue-600 hover:bg-blue-700' 
                                : 'hover:bg-gray-100'
                              }`}
                              onClick={() => setSelectedContinent(
                                selectedContinent === continent ? null : continent
                              )}
                            >
                              {continent}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <Badge
                              key={category}
                              variant={selectedCategory === category ? "default" : "outline"}
                              className={`cursor-pointer ${
                                selectedCategory === category 
                                ? 'bg-[#ff5f1f] hover:bg-[#e55214]' 
                                : 'hover:bg-gray-100'
                              }`}
                              onClick={() => setSelectedCategory(
                                selectedCategory === category ? null : category
                              )}
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Applied Filters */}
            {(selectedContinent || selectedCategory) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">Active filters:</span>
                {selectedContinent && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedContinent}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedContinent(null)}
                    />
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCategory}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedCategory(null)}
                    />
                  </Badge>
                )}
              </div>
            )}
          </motion.div>

          {/* Destinations Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredDestinations.map((destination) => (
                <motion.div key={destination.id} variants={itemVariants}>
                  <DestinationCard
                    id={destination.id.toString()}
                    name={destination.name}
                    country={destination.country}
                    description={destination.description}
                    image={destination.image}
                    rating={destination.rating}
                    price={`$${Math.floor(Math.random() * 1000 + 800)}`}
                    category={destination.categories[0]}
                    tags={destination.categories}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredDestinations.length === 0 && (
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-600 mb-6">No destinations match your current search criteria or filters.</p>
              <Button onClick={resetFilters}>Clear All Filters</Button>
            </motion.div>
          )}
          
          {/* "Show More" Button */}
          {!loading && filteredDestinations.length >= 6 && (
            <motion.div 
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="outline" className="group">
                Show More Destinations
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
} 