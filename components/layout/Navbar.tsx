"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  Camera, 
  Compass, 
  DollarSign, 
  Globe,
  Home, 
  Menu, 
  MessageSquare, 
  Moon, 
  Search, 
  Sun, 
  User, 
  Users, 
  X,
  Plane,
  MapPin,
  Sparkles,
  Map,
  Zap,
  Lightbulb,
  Cloud,
  ArrowRight,
  Umbrella,
  Wind,
  Mountain,
  TrendingUp,
  Heart,
  Settings,
  ChevronDown,
  LogOut,
  Gift,
  BellRing,
  Star,
  Layers,
  Award,
  Send,
  Landmark,
  Utensils
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

// Utility function for combining class names with proper TypeScript typing
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showWeatherWidget, setShowWeatherWidget] = useState(false);
  const [weatherData, setWeatherData] = useState({ temp: 28, condition: "clear", location: "Paris" });
  const [showMagicSearch, setShowMagicSearch] = useState(false);
  const [activeMagicItem, setActiveMagicItem] = useState(null);
  const [showTravelReminders, setShowTravelReminders] = useState(false);
  const [upcoming, setUpcoming] = useState({ days: 7, destination: "Bali" });
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [showGlobeNav, setShowGlobeNav] = useState(false);
  const [mood, setMood] = useState("neutral"); // neutral, excited, relaxed, adventurous
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const navbarRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Enhanced spring animations
  const springConfig = { damping: 20, stiffness: 200 };
  const logoScale = useSpring(1, springConfig);
  const searchScale = useSpring(1, springConfig);
  const navOpacity = useSpring(1, springConfig);
  
  // Mouse position for the glow effect
  const rotateX = useTransform(mouseY, [0, 400], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1000], [-5, 5]);

  // Advanced parallax for background elements
  const scrollY = useMotionValue(0);
  const navBackground = useTransform(scrollY, [0, 300], ["rgba(255,255,255,0.5)", "rgba(255,255,255,0.95)"]);
  const darkNavBackground = useTransform(scrollY, [0, 300], ["rgba(15,23,42,0.5)", "rgba(15,23,42,0.95)"]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      scrollY.set(scrollPosition);
      
      if (scrollPosition > 10) {
        setIsScrolled(true);
        logoScale.set(0.95);
      } else {
        setIsScrolled(false);
        logoScale.set(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [logoScale, scrollY]);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isSearchOpen && searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // Change modes based on time of day and user behavior
  useEffect(() => {
    // Simulate weather changes
    const fetchWeatherData = async () => {
      // In a real app, this would call a weather API
      const mockWeatherConditions = ["clear", "cloudy", "rainy", "stormy"];
      const mockLocations = ["Paris", "Tokyo", "New York", "London"];
      
      setWeatherData({
        temp: Math.floor(Math.random() * 30) + 10,
        condition: mockWeatherConditions[Math.floor(Math.random() * mockWeatherConditions.length)],
        location: mockLocations[Math.floor(Math.random() * mockLocations.length)]
      });
    };

    // Simulate mood changes based on time and navigation
    const determineMood = () => {
      const hour = new Date().getHours();
      
      // Morning: Energetic
      if (hour >= 5 && hour < 12) {
        return Math.random() > 0.7 ? "excited" : "neutral";
      }
      // Afternoon: Balanced
      else if (hour >= 12 && hour < 18) {
        return Math.random() > 0.7 ? "relaxed" : "neutral";
      }
      // Evening: Adventurous
      else {
        return Math.random() > 0.7 ? "adventurous" : "neutral";
      }
    };

    // Update on mount and periodically
    fetchWeatherData();
    setMood(determineMood());
    
    const weatherInterval = setInterval(fetchWeatherData, 60000);
    const moodInterval = setInterval(() => setMood(determineMood()), 300000);
    
    return () => {
      clearInterval(weatherInterval);
      clearInterval(moodInterval);
    };
  }, []);

  // Simulate search functionality with debouncing
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    
    const debounceSearch = setTimeout(() => {
      // Mock search results based on the search term
      const mockResults = [
        { id: 1, type: 'destination', name: 'Paris, France', image: '/images/destinations/paris.jpg' },
        { id: 2, type: 'destination', name: 'Tokyo, Japan', image: '/images/destinations/tokyo.jpg' },
        { id: 3, type: 'destination', name: 'New York, USA', image: '/images/destinations/nyc.jpg' },
        { id: 4, type: 'tour', name: 'Paris City Tour', duration: '3 hours', rating: 4.8 },
        { id: 5, type: 'hotel', name: 'Grand Hotel Paris', price: '$120/night', rating: 4.5 },
      ].filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(mockResults);
    }, 300);
    
    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  // Generate AI Assistant message
  useEffect(() => {
    if (isAIAssistantOpen) {
      const assistantMessages = [
        "Looking for inspiration? Try exploring trending destinations in Southeast Asia!",
        "The weather is perfect for an adventure in the mountains this weekend.",
        "Based on your browsing, you might enjoy our new 'Hidden Gems' collection.",
        `Only ${upcoming.days} days until your ${upcoming.destination} trip! Need help with final planning?`,
        "Have you considered our new AR guided tour feature for your next adventure?"
      ];
      
      setAiMessage(assistantMessages[Math.floor(Math.random() * assistantMessages.length)]);
    }
  }, [isAIAssistantOpen, upcoming]);

  // Handle scroll behavior changes
  useEffect(() => {
    let prevScrollPos = window.scrollY;
    
    const handleDynamicScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      
      // Only modify when we've scrolled enough to notice
      if (Math.abs(prevScrollPos - currentScrollPos) > 10) {
        navOpacity.set(isScrollingUp ? 1 : 0.97);
      }
      
      prevScrollPos = currentScrollPos;
    };
    
    window.addEventListener("scroll", handleDynamicScroll);
    return () => window.removeEventListener("scroll", handleDynamicScroll);
  }, [navOpacity]);

  // Mood-based UI adjustments
  const getMoodStyles = () => {
    switch(mood) {
      case "excited":
        return {
          gradient: "from-yellow-400 via-orange-500 to-pink-500",
          animation: "animate-gradient-fast",
          iconAnimation: "animate-bounce-subtle",
          transition: "duration-200",
          blur: "blur-xl"
        };
      case "relaxed":
        return {
          gradient: "from-blue-400 via-teal-500 to-emerald-500",
          animation: "animate-gradient-slow",
          iconAnimation: "animate-pulse-subtle",
          transition: "duration-300",
          blur: "blur-lg"
        };
      case "adventurous":
        return {
          gradient: "from-purple-500 via-pink-500 to-orange-500",
          animation: "animate-gradient-medium",
          iconAnimation: "animate-pulse",
          transition: "duration-150",
          blur: "blur-xl"
        };
      default:
        return {
          gradient: "from-orange-400 via-pink-400 to-purple-500",
          animation: "animate-gradient-slow",
          iconAnimation: "",
          transition: "duration-200",
          blur: "blur-md"
        };
    }
  };

  // Weather-based UI adjustments
  const getWeatherIcon = () => {
    switch(weatherData.condition) {
      case "clear": return <Sun size={18} className="text-yellow-500" />;
      case "rainy": return <Umbrella size={18} className="text-blue-400" />;
      case "cloudy": return <Cloud size={18} className="text-gray-400" />;
      case "stormy": return <Wind size={18} className="text-indigo-500" />;
      default: return <Sun size={18} className="text-yellow-500" />;
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    // Animate scale for tactile feedback
    if (!isOpen) {
      logoScale.set(1.05);
      setTimeout(() => logoScale.set(1), 200);
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
    
    // Animation effect
    if (!isSearchOpen) {
      searchScale.set(1.05);
      setTimeout(() => {
        searchScale.set(1);
        if (searchInputRef.current) searchInputRef.current.focus();
      }, 200);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchTerm);
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    setIsSearchOpen(false);
  };
  
  const toggleGlobeNav = useCallback(() => {
    setShowGlobeNav(!showGlobeNav);
    if (showGlobeNav) {
      // Exit animation
      document.body.style.overflow = 'auto';
    } else {
      // Enter animation
      document.body.style.overflow = 'hidden';
    }
  }, [showGlobeNav]);
  
  const toggleAIAssistant = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen);
  };
  
  const showWeatherPopup = () => {
    setShowWeatherWidget(!showWeatherWidget);
  };
  
  const handleMagicItemHover = (item: any) => {
    setActiveMagicItem(item);
  };
  
  const handleMagicItemLeave = () => {
    setActiveMagicItem(null);
  };

  const moodStyles = getMoodStyles();

  const navigationItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Explore", href: "/explore", icon: <Compass size={20} /> },
    { name: "Destinations", href: "/destinations", icon: <Globe size={20} /> },
    { name: "AR Tour", href: "/ar-tour", icon: <Camera size={20} /> },
    { name: "Tour Guides", href: "/tour-guides", icon: <Users size={20} /> },
    { name: "Travel Quiz", href: "/quiz", icon: <BookOpen size={20} /> },
    { name: "Budget", href: "/budget", icon: <DollarSign size={20} /> },
    { name: "Packing", href: "/packing", icon: <Calendar size={20} /> },
    { name: "Chat AI", href: "/chatbot", icon: <MessageSquare size={20} /> },
  ];

  const notifications = [
    { id: 1, text: "Your trip to Bali has been confirmed!", isNew: true, time: "5m ago", icon: <Zap size={14} className="text-green-500" /> },
    { id: 2, text: "New travel deals available for your saved destinations", isNew: true, time: "1h ago", icon: <Gift size={14} className="text-orange-500" /> },
    { id: 3, text: "Weather alert for your upcoming trip to Tokyo", isNew: true, time: "3h ago", icon: <Cloud size={14} className="text-blue-500" /> },
    { id: 4, text: "Reminder: Your Paris trip starts in 3 days", isNew: false, time: "1d ago", icon: <BellRing size={14} className="text-gray-500" /> },
    { id: 5, text: "New message from your Paris tour guide", isNew: false, time: "2d ago", icon: <MessageSquare size={14} className="text-purple-500" /> },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.05,
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 300 
      }
    }
  };

  return (
    <motion.nav 
      ref={navbarRef}
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "border-b border-gray-200 dark:border-gray-800" 
          : ""
      )}
      style={{ 
        backgroundColor: typeof window !== 'undefined' && document.documentElement.classList.contains('dark') 
          ? darkNavBackground : navBackground,
        opacity: navOpacity
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          {/* Logo section with animated elements */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group" onClick={() => logoScale.set(1.1)}>
              <div className="flex items-center">
                <motion.div 
                  className="relative h-9 w-9"
                  style={{ scale: logoScale }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${moodStyles.gradient} rounded-full ${moodStyles.blur} opacity-75 group-hover:opacity-100 transition duration-300 ${moodStyles.animation}`}></div>
                  <div className="relative h-9 w-9 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                    <Plane className={`h-5 w-5 text-[#ff5f1f] dark:text-orange-400 rotate-45 transform group-hover:scale-110 transition duration-300 ${moodStyles.iconAnimation}`} />
                  </div>
                </motion.div>
                <div className="ml-3 flex flex-col">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-500 dark:to-pink-500">TourEase</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-none">Explore · Experience · Enjoy</span>
                </div>
              </div>
            </Link>
            
            {/* Integrated search button in logo section for smaller screens */}
            {!isTablet && (
              <div className="ml-6 flex items-center">
                <motion.button
                  onClick={toggleSearch}
                  style={{ scale: searchScale }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <Search size={20} />
                </motion.button>
              </div>
            )}
          </div>

          {/* Search overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-50 bg-black/20 dark:bg-black/60 backdrop-blur-sm flex items-start justify-center p-4"
              >
                <motion.div 
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl mt-16 overflow-hidden border border-gray-200 dark:border-gray-800"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <form onSubmit={handleSearch} className="flex items-center p-2">
                      <Search className="absolute left-5 text-gray-400" size={20} />
                      <Input
                        ref={searchInputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search destinations, hotels, tours..."
                        className="pl-12 pr-10 py-6 w-full border-none focus:ring-0 text-lg bg-white dark:bg-gray-900"
                      />
                      <button 
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X size={20} />
                      </button>
                    </form>
                    
                    {/* Search results display */}
                    {searchResults.length > 0 && (
                      <div className="p-2 max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                        {searchResults.map((result: any) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                            onClick={() => {
                              // Navigate to result page in real app
                              setIsSearchOpen(false);
                            }}
                          >
                            {result.image ? (
                              <div className="h-12 w-12 rounded-md overflow-hidden">
                                <Image 
                                  src={result.image} 
                                  alt={result.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-12 w-12 rounded-md bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                {result.type === 'destination' && <MapPin size={18} className="text-orange-600 dark:text-orange-500" />}
                                {result.type === 'tour' && <Map size={18} className="text-orange-600 dark:text-orange-500" />}
                                {result.type === 'hotel' && <Home size={18} className="text-orange-600 dark:text-orange-500" />}
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-800 dark:text-gray-200">{result.name}</p>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="text-xs capitalize">{result.type}</Badge>
                                {result.rating && (
                                  <span className="ml-2 flex items-center text-xs text-amber-500">
                                    <Star size={12} className="mr-0.5 fill-amber-500" />
                                    {result.rating}
                                  </span>
                                )}
                                {result.price && (
                                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{result.price}</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        
                        <div className="pt-3 pb-2 px-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="w-full text-orange-600 dark:text-orange-500 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30"
                            onClick={() => {
                              router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
                              setIsSearchOpen(false);
                            }}
                          >
                            See all results
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* Search magic suggestions */}
                    {searchTerm === '' && (
                      <div className="p-3 pb-4">
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Popular Searches</h3>
                          <div className="flex flex-wrap gap-2 px-2">
                            {['Paris', 'Tokyo', 'Beach Resorts', 'New York', 'Bali', 'Mountain Retreats'].map((term) => (
                              <Badge 
                                key={term}
                                variant="secondary"
                                className="cursor-pointer py-1 px-3 hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={() => setSearchTerm(term)}
                              >
                                {term}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Trending Destinations</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: 'Paris', image: '/images/destinations/paris.jpg' },
                            { name: 'Kyoto', image: '/images/destinations/tokyo.jpg' },
                            { name: 'New York', image: '/images/destinations/nyc.jpg' }
                          ].map((dest) => (
                            <motion.div
                              key={dest.name}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                              className="relative rounded-lg overflow-hidden aspect-video cursor-pointer"
                              onClick={() => {
                                setSearchTerm(dest.name);
                                setIsSearchOpen(false);
                                router.push(`/destinations/${dest.name.toLowerCase().replace(' ', '-')}`);
                              }}
                            >
                              <Image
                                src={dest.image}
                                alt={dest.name}
                                width={120}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                              <p className="absolute bottom-1 left-2 text-xs font-medium text-white">{dest.name}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigationItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={item.href}
                className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 relative group",
                  pathname === item.href
                      ? "text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-md" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <span className={cn(
                  "transition-all duration-200",
                    pathname === item.href ? "text-white" : "text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300"
                )}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
                  
                  {/* New badge for fresh features */}
                  {item.new && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 text-[9px] text-white justify-center items-center">new</span>
                    </span>
                  )}
                  
                  {/* Tooltip with description - desktop only */}
                  <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 w-48">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 mt-1 text-xs text-gray-600 dark:text-gray-300">
                      {item.description}
                    </div>
                  </div>
              </Link>
              </motion.div>
            ))}
          </div>

          {/* Tablet navigation - simplified */}
          <div className="hidden md:flex lg:hidden md:items-center md:space-x-1">
            {navigationItems.slice(0, 5).map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.href}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200 flex items-center justify-center",
                    pathname === item.href
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 shadow-md" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  title={item.name}
                >
                  <span className={cn(
                    "transition-all duration-200",
                    pathname === item.href ? "text-white" : "text-orange-500 dark:text-orange-400"
                  )}>
                    {item.icon}
                  </span>
                  
                  {/* New badge - simplified for tablet */}
                  {item.new && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* More menu for tablet */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>More Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navigationItems.slice(5).map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="flex items-center cursor-pointer">
                      <span className="mr-2 text-orange-500 dark:text-orange-400">{item.icon}</span>
                      <span>{item.name}</span>
                      {item.new && (
                        <Badge variant="outline" className="ml-auto text-xs bg-orange-500 text-white border-0">New</Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {/* Globe quick access */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleGlobeNav}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <Globe className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            </motion.button>
            
            {/* Weather button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={showWeatherPopup}
              className="relative p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {getWeatherIcon()}
              
              {/* Weather popup */}
              {showWeatherWidget && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-50"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mr-3">
                      {getWeatherIcon()}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{weatherData.location}</h3>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{weatherData.temp}°C</p>
                        <p className="ml-2 text-sm text-gray-500 dark:text-gray-400 capitalize">{weatherData.condition}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Perfect weather for exploring!</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Weather affects your destination choices. Check our climate guides for the best time to visit.</p>
                  </div>
                </motion.div>
              )}
            </motion.button>
            
            {/* AI Assistant button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAIAssistant}
              className={`p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ${isAIAssistantOpen ? 'bg-orange-100 dark:bg-orange-900/30' : ''}`}
            >
              <Sparkles className={`h-5 w-5 ${isAIAssistantOpen ? 'text-orange-500' : 'text-orange-500 dark:text-orange-400'}`} />
            </motion.button>
            
            {/* AI Assistant popup */}
            <AnimatePresence>
              {isAIAssistantOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute right-0 top-16 mt-1 w-72 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${moodStyles.gradient} flex items-center justify-center`}>
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200">Travel Assistant</h3>
                    </div>
                    <button 
                      onClick={() => setIsAIAssistantOpen(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <Lightbulb className="h-4 w-4 text-orange-500" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {aiMessage}
                      </p>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center">
                        <Input
                          type="text"
                          placeholder="Ask me anything..."
                          className="text-sm"
                        />
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notifications button */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNotifications}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                {notifications.some(n => n.isNew) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </motion.button>
              
              {/* Notifications dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                      <Badge variant="outline" className="text-xs">
                        {notifications.filter(n => n.isNew).length} new
                      </Badge>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${notification.isNew ? 'bg-orange-50 dark:bg-orange-900/10' : ''}`}
                        >
                          <div className="shrink-0 mr-3 mt-0.5">
                            <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                              {notification.icon}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {notification.isNew && (
                            <div className="ml-2 h-2 w-2 bg-orange-500 rounded-full"></div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                      <Button variant="ghost" size="sm" className="w-full text-sm">
                        View all notifications
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
            
            <ThemeToggle />
            
            {/* Share Journey button */}
            <Link href="/posts/new">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all duration-200 flex items-center whitespace-nowrap"
              >
                <Camera size={16} className="mr-1" />
                <span>Share Journey</span>
              </motion.div>
            </Link>
            
            {/* Profile section */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleProfileMenu}
              className="group relative"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500">
                  <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-900 p-0.5 transition transform group-hover:scale-105 duration-200">
                  <Image 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop" 
                    alt="Profile"
                      width={32}
                      height={32}
                    className="rounded-full"
                  />
                </div>
              </div>
              </motion.button>
              
              {/* Profile dropdown */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <Image 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop" 
                            alt="Profile"
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Sophie Anderson</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">sophie@example.com</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-1">
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200 transition-colors cursor-pointer">
                          <MapPin size={10} className="mr-1" />
                          5 Countries
                        </Badge>
                        <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 hover:bg-pink-200 transition-colors cursor-pointer">
                          <Award size={10} className="mr-1" />
                          Explorer
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <User size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                        My Profile
                      </Link>
                      <Link href="/trips" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Compass size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                        My Trips
                      </Link>
                      <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Settings size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                        Settings
            </Link>
                    </div>
                    
                    <div className="py-1 border-t border-gray-100 dark:border-gray-800">
                      <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        <LogOut size={16} className="mr-3" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu - advanced with animations */}
      <AnimatePresence>
      {isOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden"
          >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
                <motion.div key={item.name} variants={menuItemVariants}>
              <Link
                href={item.href}
                className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium flex items-center transition-all duration-200",
                  pathname === item.href
                        ? "text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-md" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                )}
                onClick={() => setIsOpen(false)}
              >
                <span className={cn(
                  "mr-3 transition-all duration-200",
                      pathname === item.href ? "text-white" : "text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300"
                )}>
                  {item.icon}
                </span>
                    <div className="flex-1">
                <span>{item.name}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* New badge */}
                    {item.new && (
                      <Badge className="ml-auto bg-orange-500 text-white text-xs h-5 px-1.5">New</Badge>
                    )}
              </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive 3D Globe Navigation */}
      <AnimatePresence>
        {showGlobeNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={toggleGlobeNav}
          >
            <motion.div 
              className="relative bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl w-[90vw] max-w-4xl h-[80vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{ 
                rotateX,
                rotateY,
                perspective: 1000 
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleGlobeNav}
                  className="bg-white/20 backdrop-blur-md p-2 rounded-full"
                >
                  <X size={20} className="text-white" />
                </motion.button>
              </div>
              
              <div className="flex h-full flex-col md:flex-row">
                {/* Left globe visualization */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center p-8 relative">
                  {/* 3D spinning globe visualization */}
                  <motion.div 
                    className="relative w-64 h-64 md:w-80 md:h-80"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/images/world-map.svg"
                        alt="World Map"
                        width={400}
                        height={400}
                        className="absolute opacity-70 dark:opacity-40"
                      />
                    </div>
                    
                    {/* Animated markers */}
                    {['Paris', 'Tokyo', 'New York', 'Sydney', 'Cairo'].map((city, index) => (
                      <motion.div
                        key={city}
                        className="absolute w-3 h-3"
                        style={{
                          left: `${30 + Math.random() * 40}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <motion.div 
                          className="w-3 h-3 bg-orange-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Foreground planet label */}
                  <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                      Global Destinations
                    </h2>
                    <p className="text-white/70 text-sm mt-1">
                      Discover your next adventure
                    </p>
                  </motion.div>
                </div>
                
                {/* Right content area */}
                <div className="w-full md:w-1/2 h-[60vh] md:h-full flex flex-col bg-white/10 backdrop-blur-md overflow-y-auto">
                  <div className="p-6 md:p-8">
                    <h2 className="text-white text-2xl font-bold mb-6">
                      Popular Regions
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { name: 'Europe', image: '/images/destinations/paris.jpg', count: 42 },
                        { name: 'Asia', image: '/images/destinations/tokyo.jpg', count: 37 },
                        { name: 'North America', image: '/images/destinations/nyc.jpg', count: 28 },
                        { name: 'Africa', image: '/images/destinations/cairo.jpg', count: 23 },
                      ].map((region) => (
                        <motion.div
                          key={region.name}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex items-center cursor-pointer"
                          onClick={() => {
                            router.push(`/destinations/regions/${region.name.toLowerCase().replace(' ', '-')}`);
                            toggleGlobeNav();
                          }}
                        >
                          <div className="h-16 w-16 relative">
                            <Image
                              src={region.image}
                              alt={region.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-3 flex-1">
                            <h3 className="text-white font-medium">{region.name}</h3>
                            <p className="text-xs text-white/70">{region.count} destinations</p>
                          </div>
                          <div className="pr-4">
                            <ArrowRight size={18} className="text-white/60" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-8 border-t border-white/10 pt-4">
                      <h3 className="text-white font-medium mb-2">Top Experiences</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: 'Beach Getaways', icon: <Umbrella size={20} className="text-blue-300" /> },
                          { name: 'Mountain Hiking', icon: <Mountain size={20} className="text-green-300" /> },
                          { name: 'City Tours', icon: <Landmark size={20} className="text-yellow-300" /> },
                          { name: 'Culinary Journeys', icon: <Utensils size={20} className="text-orange-300" /> },
                        ].map((exp) => (
                          <motion.div
                            key={exp.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-3 flex flex-col items-center cursor-pointer"
                            onClick={() => {
                              router.push(`/experiences/${exp.name.toLowerCase().replace(' ', '-')}`);
                              toggleGlobeNav();
                            }}
                          >
                            <div className="p-2 bg-white/10 rounded-full mb-2">
                              {exp.icon}
                            </div>
                            <p className="text-white text-xs text-center">{exp.name}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 