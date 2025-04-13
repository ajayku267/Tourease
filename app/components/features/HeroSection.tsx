"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate, useSpring } from "framer-motion";
import { Search, MapPin, Calendar, Users, ArrowRight, Globe, Compass, PlaneTakeoff, Heart, Sparkles, TrendingUp, Sun, Cloud, Umbrella } from "lucide-react";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const destinations = [
  {
    name: "Dolomites",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1551649001-7a2482d98d05?q=80&w=1800&auto=format&fit=crop",
    rating: 4.8,
    trending: true,
    weatherStatus: "sunny"
  },
  {
    name: "Great Ocean Road",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1494791368093-85217d68a3ce?q=80&w=1800&auto=format&fit=crop",
    rating: 4.9,
    trending: true,
    weatherStatus: "sunny"
  },
  {
    name: "Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?q=80&w=1800&auto=format&fit=crop",
    rating: 4.7,
    trending: false,
    weatherStatus: "cloud"
  },
  {
    name: "Moraine Lake",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1800&auto=format&fit=crop",
    rating: 4.9,
    trending: true,
    weatherStatus: "sunny"
  },
  {
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1800&auto=format&fit=crop",
    rating: 4.8,
    trending: true,
    weatherStatus: "sunny"
  },
  {
    name: "Ha Long Bay",
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?q=80&w=1800&auto=format&fit=crop",
    rating: 4.7,
    trending: false,
    weatherStatus: "cloud"
  },
  {
    name: "Lençóis Maranhenses",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1554302891-a70fad6c08e7?q=80&w=1800&auto=format&fit=crop",
    rating: 4.6,
    trending: false,
    weatherStatus: "rain"
  }
];

// Custom hook for parallax effects
function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export function HeroSection() {
  const [searchDestination, setSearchDestination] = useState("");
  const [searchDates, setSearchDates] = useState("");
  const [searchTravelers, setSearchTravelers] = useState("2 Travelers");
  const [activeTab, setActiveTab] = useState("destinations");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [suggestedDestinations, setSuggestedDestinations] = useState<typeof destinations>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isWeatherVisible, setIsWeatherVisible] = useState(false);
  const [activeTrendingIndex, setActiveTrendingIndex] = useState(0);
  
  const ref = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Responsive check
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Enhanced spring animations
  const springConfig = { damping: 15, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Advanced 3D Parallax values
  const y1 = useParallax(scrollYProgress, 100);
  const y2 = useParallax(scrollYProgress, 150);
  const y3 = useParallax(scrollYProgress, 50);
  const rotateX = useTransform(mouseY, [0, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 500], [-5, 5]);
  const textY = useParallax(scrollYProgress, -60);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // 3D search box transform
  const searchBoxRotateX = useTransform(mouseY, [0, 500], [2, -2]);
  const searchBoxRotateY = useTransform(mouseX, [0, 500], [-2, 2]);

  // Gradient animations for UI elements
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.3], [0.9, 0.3]);
  const gradientPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const gradientBackground = useMotionTemplate`linear-gradient(to right, rgba(249, 115, 22, ${gradientOpacity}), rgba(239, 68, 68, ${gradientOpacity}))`;

  // Rotating background images with dynamic transitions
  const backgroundImages = [
    "https://images.unsplash.com/photo-1566392922382-58124fe26e01?q=80&w=1800&auto=format&fit=crop", // Rolling green hills
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1800&auto=format&fit=crop", // Hilly road
    "https://images.unsplash.com/photo-1505732159444-8dfe934c3ffe?q=80&w=1800&auto=format&fit=crop", // Tuscany hills
    "https://images.unsplash.com/photo-1455156218388-5e61b526818b?q=80&w=1800&auto=format&fit=crop", // Carpathian mountains
  ];

  // Track mouse movement for 3D parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Animated image rotation with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Suggestion search functionality
  useEffect(() => {
    if (searchDestination.trim().length > 0) {
      const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchDestination.toLowerCase()) || 
        dest.country.toLowerCase().includes(searchDestination.toLowerCase())
      );
      setSuggestedDestinations(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestedDestinations([]);
      setShowSuggestions(false);
    }
  }, [searchDestination]);

  // Cycle through trending destinations
  useEffect(() => {
    const trendingDestinations = destinations.filter(dest => dest.trending);
    const interval = setInterval(() => {
      setActiveTrendingIndex(prev => 
        prev === trendingDestinations.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Enhanced tabs for search
  const tabs = [
    { id: "destinations", label: "Destinations", icon: <MapPin className="w-4 h-4" /> },
    { id: "experiences", label: "Experiences", icon: <Globe className="w-4 h-4" /> },
    { id: "flights", label: "Flights", icon: <PlaneTakeoff className="w-4 h-4" /> },
    { id: "packages", label: "Packages", icon: <Users className="w-4 h-4" /> },
  ];

  // Weather icon based on status
  const getWeatherIcon = (status: string) => {
    switch(status) {
      case "sunny": return <Sun className="h-4 w-4 text-yellow-400" />;
      case "cloud": return <Cloud className="h-4 w-4 text-slate-300" />;
      case "rain": return <Umbrella className="h-4 w-4 text-blue-400" />;
      default: return <Sun className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[650px] overflow-hidden">
      {/* Enhanced rotating background images with dynamic parallax effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{
            x: isDesktop ? useTransform(mouseX, [0, window.innerWidth], [20, -20]) : 0,
            y: isDesktop ? useTransform(mouseY, [0, window.innerHeight], [10, -10]) : 0
          }}
        >
          <Image
            src={backgroundImages[currentImageIndex]}
            alt="Travel destination"
            fill
            priority
            className="object-cover"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"
            style={{ opacity: gradientOpacity }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced parallax floating elements */}
      {isDesktop && (
        <>
          <motion.div
            style={{ 
              y: y1, 
              opacity, 
              x: useTransform(mouseX, [0, window.innerWidth], [50, -30]),
              rotateX: useTransform(mouseY, [0, window.innerHeight], [10, -10]),
              rotateY: useTransform(mouseX, [0, window.innerWidth], [-10, 10])
            }}
            className="absolute top-40 right-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-yellow-500/30 backdrop-blur-md hidden lg:block z-10"
          />
          <motion.div
            style={{ 
              y: y2, 
              opacity, 
              x: useTransform(mouseX, [0, window.innerWidth], [-50, 30]),
              rotateX: useTransform(mouseY, [0, window.innerHeight], [-15, 15]),
              rotateY: useTransform(mouseX, [0, window.innerWidth], [15, -15])
            }}
            className="absolute top-60 left-[15%] w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500/30 to-teal-500/30 backdrop-blur-md hidden lg:block z-10"
          />
          <motion.div
            style={{ 
              y: y3, 
              opacity, 
              x: useTransform(mouseX, [0, window.innerWidth], [20, -40]),
              rotateX: useTransform(mouseY, [0, window.innerHeight], [-5, 5]),
              rotateY: useTransform(mouseX, [0, window.innerWidth], [5, -5])
            }}
            className="absolute top-80 right-[35%] w-16 h-16 rounded-full bg-gradient-to-bl from-purple-500/30 to-pink-500/30 backdrop-blur-md hidden lg:block z-10"
          />
        </>
      )}

      {/* Content container */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          style={{ y: textY }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="relative inline-block">
              <span className="relative z-10">Discover</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </span>{" "}
            the World with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
              AI-Powered Travel
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Plan your perfect trip with our intelligent travel assistant. Personalized itineraries, 
            <span className="relative mx-1 px-1">
              <span className="relative z-10">local insights</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-full bg-primary/20 rounded" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
            </span>, 
            and seamless experiences.
          </motion.p>

          {/* Advanced 3D search box */}
          <motion.div
            className="bg-black/30 backdrop-blur-xl p-3 rounded-xl max-w-3xl mx-auto mb-6 border border-white/10 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ 
              rotateX: searchBoxRotateX,
              rotateY: searchBoxRotateY,
              perspective: 1000,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Tabs */}
            <div className="flex mb-4 border-b border-white/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center py-2 px-4 text-sm font-medium transition-all relative ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"
                      layoutId="activeTabIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search form with enhanced interactive elements */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2 p-2">
              <div className="md:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-white/70" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full py-3 pl-10 pr-4 bg-white/10 text-white placeholder-white/70 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsSearchFocused(false);
                    }, 200);
                  }}
                />
                
                {/* Destination suggestions dropdown */}
                <AnimatePresence>
                  {isSearchFocused && showSuggestions && (
                    <motion.div 
                      className="absolute z-20 top-full left-0 right-0 mt-1 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {suggestedDestinations.length > 0 ? (
                        <div className="max-h-60 overflow-auto p-1">
                          {suggestedDestinations.map((dest, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-center p-2 hover:bg-white/10 rounded-md cursor-pointer transition-all"
                              whileHover={{ scale: 1.02 }}
                              onClick={() => {
                                setSearchDestination(dest.name + ", " + dest.country);
                                setShowSuggestions(false);
                              }}
                            >
                              <div className="w-10 h-10 relative rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={dest.image}
                                  alt={dest.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-white text-sm font-medium">{dest.name}, {dest.country}</p>
                                  <div className="flex items-center">
                                    {getWeatherIcon(dest.weatherStatus)}
                                    <span className="ml-1 text-xs text-white/70">24°C</span>
                                  </div>
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <svg 
                                        key={i} 
                                        className={`w-3 h-3 ${i < Math.floor(dest.rating) ? "text-yellow-400" : "text-gray-500"}`} 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                      </svg>
                                    ))}
                                    <span className="text-white/70 text-xs ml-1">{dest.rating}</span>
                                  </div>
                                  {dest.trending && (
                                    <Badge className="ml-2 bg-gradient-to-r from-orange-500 to-pink-500 text-[10px] text-white py-0 px-1.5">
                                      <TrendingUp className="w-2 h-2 mr-0.5" /> Trending
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-white/70 text-sm">
                          No destinations found. Try a different search term.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="md:col-span-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-white/70" />
                </div>
                <input
                  type="text"
                  placeholder="When?"
                  className="w-full py-3 pl-10 pr-4 bg-white/10 text-white placeholder-white/70 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  value={searchDates}
                  onChange={(e) => setSearchDates(e.target.value)}
                />
              </div>
              
              <div className="md:col-span-1 relative">
                <select
                  className="w-full py-3 px-3 bg-white/10 text-white rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(e.target.value)}
                >
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3 Travelers</option>
                  <option>4+ Travelers</option>
                </select>
              </div>
              
              <motion.div 
                className="md:col-span-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium py-3 px-4 rounded-lg"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Enhanced popular searches with animation */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="text-white/70">Popular:</span>
            {["Bali", "Paris", "Tokyo", "New York", "Santorini"].map((place, index) => (
              <motion.button
                key={place}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all text-xs"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                onClick={() => {
                  setSearchDestination(place);
                  if (searchInputRef.current) {
                    searchInputRef.current.focus();
                  }
                }}
              >
                {place}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Animated trending destination display */}
          <motion.div
            className="mt-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <AnimatePresence mode="wait">
              {destinations.filter(d => d.trending)[activeTrendingIndex] && (
                <motion.div 
                  key={activeTrendingIndex}
                  className="relative bg-black/30 backdrop-blur-md rounded-xl overflow-hidden flex h-20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 relative flex-shrink-0">
                    <Image 
                      src={destinations.filter(d => d.trending)[activeTrendingIndex].image}
                      alt={destinations.filter(d => d.trending)[activeTrendingIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <div className="flex items-center">
                      <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs">
                        <Sparkles className="w-3 h-3 mr-1" /> Trending Now
                      </Badge>
                      <div className="ml-2 flex items-center text-xs text-white/70">
                        <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                        <span>+43% searches</span>
                      </div>
                    </div>
                    <h3 className="text-white font-medium mt-1">
                      {destinations.filter(d => d.trending)[activeTrendingIndex].name}, {destinations.filter(d => d.trending)[activeTrendingIndex].country}
                    </h3>
                  </div>
                  <div className="p-3 flex items-center">
                    <Button size="sm" variant="outline" className="h-8 border-white/20 hover:bg-white/10 text-white text-xs flex items-center">
                      <Heart className="w-3 h-3 mr-1" /> Save
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 