"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, ArrowRight, Globe } from "lucide-react";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";

const destinations = [
  {
    name: "Dolomites",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1551649001-7a2482d98d05?q=80&w=1800&auto=format&fit=crop",
  },
  {
    name: "Great Ocean Road",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1494791368093-85217d68a3ce?q=80&w=1800&auto=format&fit=crop",
  },
  {
    name: "Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?q=80&w=1800&auto=format&fit=crop",
  },
  {
    name: "Moraine Lake",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1800&auto=format&fit=crop",
  },
  {
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1800&auto=format&fit=crop",
  },
  {
    name: "Ha Long Bay",
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?q=80&w=1800&auto=format&fit=crop",
  },
  {
    name: "Lençóis Maranhenses",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1554302891-a70fad6c08e7?q=80&w=1800&auto=format&fit=crop",
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Responsive check
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Parallax values
  const y1 = useParallax(scrollYProgress, 100);
  const y2 = useParallax(scrollYProgress, 150);
  const y3 = useParallax(scrollYProgress, 50);
  const textY = useParallax(scrollYProgress, -60);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Rotating background images with hilly vibes
  const backgroundImages = [
    "https://images.unsplash.com/photo-1566392922382-58124fe26e01?q=80&w=1800&auto=format&fit=crop", // Rolling green hills
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1800&auto=format&fit=crop", // Hilly road
    "https://images.unsplash.com/photo-1505732159444-8dfe934c3ffe?q=80&w=1800&auto=format&fit=crop", // Tuscany hills
    "https://images.unsplash.com/photo-1455156218388-5e61b526818b?q=80&w=1800&auto=format&fit=crop", // Carpathian mountains
  ];

  // Image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Tabs for search
  const tabs = [
    { id: "destinations", label: "Destinations", icon: <MapPin className="w-4 h-4" /> },
    { id: "experiences", label: "Experiences", icon: <Globe className="w-4 h-4" /> },
    { id: "packages", label: "Packages", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[650px] overflow-hidden">
      {/* Rotating background images with crossfade effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={backgroundImages[currentImageIndex]}
            alt="Travel destination"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Parallax floating elements */}
      {isDesktop && (
        <>
          <motion.div
            style={{ y: y1, opacity, x: "10%" }}
            className="absolute top-40 right-[20%] w-32 h-32 rounded-full bg-primary/30 backdrop-blur-md hidden lg:block z-10"
          />
          <motion.div
            style={{ y: y2, opacity, x: "-10%" }}
            className="absolute top-60 left-[15%] w-20 h-20 rounded-full bg-teal/30 backdrop-blur-md hidden lg:block z-10"
          />
          <motion.div
            style={{ y: y3, opacity, x: "5%" }}
            className="absolute top-80 right-[35%] w-16 h-16 rounded-full bg-purple/30 backdrop-blur-md hidden lg:block z-10"
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the World with AI-Powered Travel
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Plan your perfect trip with our intelligent travel assistant. Personalized itineraries, local insights, and seamless experiences.
          </motion.p>

          {/* Animated search box */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg p-2 rounded-xl max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Tabs */}
            <div className="flex mb-4 border-b border-white/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center py-2 px-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-white border-b-2 border-primary"
                      : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search form */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2 p-2">
              <div className="md:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-white/70" />
                </div>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full py-3 pl-10 pr-4 bg-white/10 text-white placeholder-white/70 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                />
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-white/70" />
                </div>
                <select
                  className="w-full py-3 pl-10 pr-4 bg-white/10 text-white placeholder-white/70 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all appearance-none"
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(e.target.value)}
                >
                  <option value="1 Traveler">1 Traveler</option>
                  <option value="2 Travelers">2 Travelers</option>
                  <option value="3 Travelers">3 Travelers</option>
                  <option value="4+ Travelers">4+ Travelers</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center justify-center">
                  <Search className="h-5 w-5 mr-2" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Explore Destinations CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-8"
          >
            <Link 
              href="/destinations" 
              className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg"
            >
              Explore Destinations <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>

          {/* Highlighted destinations */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {destinations.slice(0, 5).map((destination, index) => (
              <Link 
                href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={index}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white transition-colors"
              >
                {destination.name}
              </Link>
            ))}
            <Link
              href="/destinations"
              className="bg-white/5 hover:bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/90 transition-colors flex items-center"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 