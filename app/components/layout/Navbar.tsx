"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { 
  Menu, X, User, Search, Map, Calendar, LogOut, Bell, Home, 
  Globe, Compass, DollarSign, MessageSquare, BookOpen, 
  PlusSquare, Users, Plane, Camera, Command, Sun, Moon, Wind, 
  Sparkles, Lightbulb, Cloud, Umbrella, Mountain, Landmark, Utensils 
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

// Utility function for combining class names with proper TypeScript typing
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mood, setMood] = useState("neutral"); // neutral, excited, relaxed, adventurous
  const [showAssistant, setShowAssistant] = useState(false);
  const [showGlobeNav, setShowGlobeNav] = useState(false);
  const [weatherMood, setWeatherMood] = useState("sunny");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const navbarRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Mouse position for the glow effect
  const rotateX = useTransform(mouseY, [0, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 800], [-5, 5]);

  // Update last interaction time when user interacts with navbar
  const updateInteraction = () => setLastInteraction(Date.now());

  // Track mouse position for glowing effects
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

  // Change mood based on time of day, weather, and user behavior
  useEffect(() => {
    // Simulate weather changes
    const weatherStates = ["sunny", "rainy", "cloudy", "stormy"];
    const randomWeather = () => {
      const newWeather = weatherStates[Math.floor(Math.random() * weatherStates.length)];
      setWeatherMood(newWeather);
    };

    // Simulate mood changes based on time of day and navigation patterns
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
    setMood(determineMood());
    const weatherInterval = setInterval(randomWeather, 60000);
    const moodInterval = setInterval(() => setMood(determineMood()), 300000);
    
    return () => {
      clearInterval(weatherInterval);
      clearInterval(moodInterval);
    };
  }, []);

  // AI Assistant suggestions based on navigation and time
  const getAssistantSuggestion = () => {
    const suggestions = [
      { text: "Planning a trip soon? Let me help you create an itinerary.", href: "/explore" },
      { text: "The weather is perfect for an adventure. Explore new destinations?", href: "/explore" },
      { text: "How about sharing your recent travel photos?", href: "/posts/new" },
      { text: "Don't forget to check your travel budget before your next trip!", href: "/budget" },
      { text: "Feeling adventurous? Take our travel style quiz!", href: "/quiz" }
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  // Mood-based UI adjustments
  const getMoodStyles = () => {
    switch(mood) {
      case "excited":
        return {
          gradient: "from-yellow-400 via-orange-500 to-pink-500",
          animation: "animate-gradient",
          iconAnimation: "animate-bounce",
          transition: "duration-200"
        };
      case "relaxed":
        return {
          gradient: "from-blue-400 via-teal-500 to-emerald-500",
          animation: "animate-gradient-slow",
          iconAnimation: "animate-pulse-subtle",
          transition: "duration-300"
        };
      case "adventurous":
        return {
          gradient: "from-purple-500 via-pink-500 to-orange-500",
          animation: "animate-gradient",
          iconAnimation: "animate-pulse",
          transition: "duration-150"
        };
      default:
        return {
          gradient: "from-orange-400 via-pink-400 to-purple-500",
          animation: "animate-gradient-slow",
          iconAnimation: "",
          transition: "duration-200"
        };
    }
  };

  // Weather-based UI adjustments
  const getWeatherIcon = () => {
    switch(weatherMood) {
      case "sunny": return <Sun size={16} className="text-yellow-500" />;
      case "rainy": return <Cloud size={16} className="text-blue-400" />;
      case "cloudy": return <Cloud size={16} className="text-gray-400" />;
      case "stormy": return <Wind size={16} className="text-indigo-500" />;
      default: return <Sun size={16} className="text-yellow-500" />;
    }
  };

  const moodStyles = getMoodStyles();
  const assistantSuggestion = getAssistantSuggestion();
  
  // AI Assistant component
  const Assistant = () => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      className="fixed bottom-24 right-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden max-w-xs w-full z-50"
    >
      <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${moodStyles.gradient} ${moodStyles.animation} flex items-center justify-center`}>
            <Sparkles size={18} className="text-white" />
          </div>
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">TourEase Assistant</h3>
        </div>
        <button 
          onClick={() => setShowAssistant(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={18} />
        </button>
      </div>
      <div className="p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3"
        >
          <div className="bg-orange-100 dark:bg-slate-700 rounded-full p-2 mt-1">
            <Lightbulb size={16} className="text-orange-500 dark:text-orange-300" />
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {assistantSuggestion.text}
          </p>
        </motion.div>
        <div className="mt-4 flex justify-end">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link 
              href={assistantSuggestion.href}
              className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
              onClick={() => setShowAssistant(false)}
            >
              Explore Now
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  // 3D Globe Navigation component
  const GlobeNav = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={() => setShowGlobeNav(false)}
    >
      <motion.div 
        ref={globeRef}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[90vw] max-w-4xl h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ rotateX, rotateY, perspective: 1000 }}
      >
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowGlobeNav(false)}
            className="bg-white/20 backdrop-blur-md p-2 rounded-full"
          >
            <X size={20} className="text-white" />
          </motion.button>
        </div>
        <div className="flex h-full">
          <div className="w-1/2 h-full flex items-center justify-center p-8">
            <div className="relative w-full h-full">
              {/* Using our custom travel globe SVG instead of basic shapes */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                <Image 
                  src="/images/travel-globe.svg"
                  alt="Interactive Globe"
                  width={280}
                  height={280}
                  className="opacity-90"
                />
              </motion.div>
              
              {/* Highlight points for popular destinations */}
              <div className="absolute top-1/3 left-1/3 h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 h-2 w-2 bg-yellow-400 rounded-full animate-pulse-subtle"></div>
              <div className="absolute top-1/4 right-1/3 h-2 w-2 bg-green-400 rounded-full animate-pulse-subtle"></div>
              <div className="absolute bottom-1/4 left-1/3 h-2 w-2 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="w-1/2 h-full p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Explore by Region</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Asia", "Europe", "Africa", "North America", "South America", "Oceania", "Antarctica"].map((region) => (
                <motion.div 
                  key={region}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  className="p-4 rounded-xl border border-white/20 cursor-pointer"
                >
                  <p className="text-white font-medium">{region}</p>
                  <p className="text-white/60 text-sm mt-1">Explore destinations</p>
                </motion.div>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white mt-8 mb-6">Popular Experiences</h2>
            <div className="space-y-4">
              {["Beach Getaways", "Mountain Adventures", "Cultural Experiences", "Food Tours"].map((exp) => (
                <motion.div 
                  key={exp}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    {exp.includes("Beach") && <Umbrella size={20} className="text-yellow-400" />}
                    {exp.includes("Mountain") && <Mountain size={20} className="text-blue-400" />}
                    {exp.includes("Cultural") && <Landmark size={20} className="text-purple-400" />}
                    {exp.includes("Food") && <Utensils size={20} className="text-green-400" />}
                  </div>
                  <p className="text-white font-medium">{exp}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const navigationItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Explore", href: "/explore", icon: <Compass size={20} /> },
    { name: "Destinations", href: "/destinations", icon: <Globe size={20} /> },
    { name: "Feed", href: "/feed", icon: <Camera size={20} /> },
    { name: "Tour Guides", href: "/tour-guides", icon: <Users size={20} /> },
    { name: "Travel Quiz", href: "/quiz", icon: <BookOpen size={20} /> },
    { name: "Budget", href: "/budget", icon: <DollarSign size={20} /> },
    { name: "Packing", href: "/packing", icon: <Calendar size={20} /> },
    { name: "AR Tour", href: "/ar-tour", icon: <div className="w-5 h-5 relative"><Image src="/images/icons/ar-mode-icon.svg" alt="AR" width={20} height={20} /></div> },
    { name: "Chat AI", href: "/chatbot", icon: <MessageSquare size={20} /> },
  ];

  const notifications = [
    { id: 1, text: "Your trip to Bali has been confirmed!", isNew: true },
    { id: 2, text: "New travel deals available for your saved destinations", isNew: true },
    { id: 3, text: "Reminder: Your Paris trip starts in 3 days", isNew: false },
    { id: 4, text: "Weather alert for your upcoming trip to Tokyo", isNew: false }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  // NavItems component to display navigation items
  const NavItems = () => {
    return (
      <>
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "px-2 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 mx-0.5 whitespace-nowrap",
              pathname === item.href
                ? `text-white bg-gradient-to-r ${moodStyles.gradient} shadow-md dark:shadow-pink-800/20` 
                : item.name === "AR Tour" 
                  ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md dark:shadow-blue-800/20" 
                  : "text-gray-700 dark:text-gray-200 hover:bg-white/10 hover:shadow-sm dark:hover:bg-slate-800/60"
            )}
          >
            <motion.span 
              className={cn(
                "transition-all duration-200",
                pathname === item.href ? "text-white" : "text-orange-500 dark:text-orange-400"
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {item.icon}
            </motion.span>
            <span>{item.name}</span>
          </Link>
        ))}
      </>
    );
  };

  return (
    <nav 
      ref={navbarRef}
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300 px-2",
        isScrolled 
          ? "bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center transform transition-transform hover:scale-105">
              <div className="h-9 w-9 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-glow-sm">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                TourEase
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto">
            <NavItems />
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => setShowAssistant(prev => !prev)}
              className={`p-2 rounded-full transition-colors ${showAssistant ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
              aria-label="Travel Assistant"
            >
              <Sparkles size={20} />
            </button>
            
            <button
              onClick={() => setShowGlobeNav(prev => !prev)}
              className={`p-2 rounded-full transition-colors ${showGlobeNav ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
              aria-label="Globe Navigation"
            >
              <Globe size={20} />
            </button>
            
            <ThemeToggle />

            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-orange-500 rounded-full"></span>
            </button>

            <button
              onClick={toggleProfileMenu}
              className="flex items-center focus:outline-none"
              aria-label="User Profile"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-r p-0.5 from-orange-500 to-pink-500">
                <img 
                  src="/placeholders/profile-placeholder.jpg" 
                  alt="Profile" 
                  className="rounded-full"
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-orange-100 dark:border-slate-800 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
              variants={menuVariants}
              initial="closed"
              animate="open"
            >
              <motion.div 
                variants={menuItemVariants}
                className="mb-3 pb-3 border-b border-orange-100 dark:border-slate-800"
              >
                <div className="flex items-center justify-center">
                  <div className="h-14 w-14 relative">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${moodStyles.gradient} rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-300 ${moodStyles.animation}`}></div>
                    <div className="relative h-14 w-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-inner">
                      <Image 
                        src="/images/travel-globe.svg"
                        alt="TourEase globe"
                        width={46}
                        height={46}
                        className="transform group-hover:scale-110 transition duration-300"
                      />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500">
                      TourEase
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Explore · Experience · Enjoy
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {navigationItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={menuItemVariants}
                  custom={i}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium flex items-center transition-all duration-200",
                      pathname === item.href
                        ? "text-white bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 shadow-sm" 
                        : item.name === "AR Tour"
                          ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm"
                          : "text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-slate-800"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.span 
                      className={cn(
                        "mr-3 transition-all duration-200",
                        pathname === item.href ? "text-white" : "text-orange-500 dark:text-orange-400"
                      )}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div variants={menuItemVariants}>
                <div className="border-t border-orange-100 dark:border-slate-800 pt-4 pb-3">
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full p-0.5 bg-gradient-to-r from-orange-400 via-rose-400 to-purple-500 animate-gradient-slow">
                        <div className="h-full w-full rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-slate-800">
                          <Image 
                            src="/images/travel-globe.svg"
                            alt="TourEase globe"
                            width={40}
                            height={40}
                            className="transform group-hover:scale-110 transition duration-300"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-gray-200">Alex Johnson</div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                        <Globe size={12} className="mr-1" />
                        26 countries visited
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Link
                      href="/posts/new"
                      className="block px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white hover:from-orange-600 hover:via-rose-600 hover:to-pink-600 flex items-center shadow-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <Camera size={20} className="mr-3" />
                      <span>Share Journey</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Notifications dropdown */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="absolute right-20 top-16 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 z-50 hidden md:block overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-[60vh] overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                  <div className="flex items-start">
                    <div className={cn(
                      "h-2 w-2 rounded-full mt-1.5 mr-3",
                      notification.isNew ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
                    )}></div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-slate-700">
              <Link href="/notifications" className="text-xs font-medium text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 block text-center py-1">
                View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contextual AI Assistant */}
      <AnimatePresence>
        {showAssistant && <Assistant />}
      </AnimatePresence>
      
      {/* 3D Globe Navigation Experience */}
      <AnimatePresence>
        {showGlobeNav && <GlobeNav />}
      </AnimatePresence>
      
      {/* Voice commands recognition indicator (appears when speaking) */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 shadow-lg rounded-full py-3 px-5 flex items-center"
          >
            <div className="flex items-center space-x-1 mr-3">
              {[1,2,3,4].map(i => (
                <motion.div 
                  key={i}
                  className="w-1 h-4 bg-orange-500 rounded-full"
                  animate={{ height: [4, 12, 4] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 0.6,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 