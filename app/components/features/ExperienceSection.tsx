"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle, Star, Calendar, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample experiences data
const experiences = [
  {
    id: "cooking-class-tuscany",
    title: "Italian Cooking Masterclass",
    location: "Tuscany, Italy",
    image: "/images/experiences/cooking-italy.jpg",
    price: "$89",
    rating: 4.9,
    reviews: 243,
    duration: "3 hours",
    groupSize: "Small group",
    category: "Culinary",
    description: "Learn to make authentic pasta and traditional dishes from a local chef in a historic Tuscan villa.",
    featured: true,
    video: "/videos/cooking-class.mp4"
  },
  {
    id: "northern-lights-tour",
    title: "Northern Lights Adventure",
    location: "Tromsø, Norway",
    image: "/images/experiences/northern-lights.jpg",
    price: "$149",
    rating: 4.8,
    reviews: 178,
    duration: "4 hours",
    groupSize: "Small group",
    category: "Nature",
    description: "Chase the aurora borealis with expert guides who know the best viewing locations away from light pollution.",
    featured: false
  },
  {
    id: "tokyo-food-tour",
    title: "Tokyo Street Food Tour",
    location: "Tokyo, Japan",
    image: "/images/experiences/tokyo-food.jpg",
    price: "$75",
    rating: 4.9,
    reviews: 312,
    duration: "3 hours",
    groupSize: "Small group",
    category: "Culinary",
    description: "Explore Tokyo's vibrant street food scene and taste authentic local delicacies with a knowledgeable guide.",
    featured: true
  },
  {
    id: "morocco-desert-camp",
    title: "Sahara Desert Camp",
    location: "Merzouga, Morocco",
    image: "/images/experiences/morocco-desert.jpg",
    price: "$199",
    rating: 4.9,
    reviews: 156,
    duration: "2 days",
    groupSize: "Small group",
    category: "Adventure",
    description: "Ride camels into the Sahara dunes, enjoy traditional music around a campfire, and sleep under the stars.",
    featured: false
  },
  {
    id: "bali-temple-tour",
    title: "Sacred Temple Journey",
    location: "Bali, Indonesia",
    image: "/images/experiences/bali-temples.jpg",
    price: "$65",
    rating: 4.7,
    reviews: 189,
    duration: "Full day",
    groupSize: "Small group",
    category: "Cultural",
    description: "Visit Bali's most beautiful and significant temples with a local spiritual guide who explains their history and practices.",
    featured: false
  },
  {
    id: "barcelona-tapas",
    title: "Barcelona Tapas Tour",
    location: "Barcelona, Spain",
    image: "/images/experiences/barcelona-tapas.jpg",
    price: "$85",
    rating: 4.8,
    reviews: 267,
    duration: "3 hours",
    groupSize: "Small group",
    category: "Culinary",
    description: "Sample the best tapas in Barcelona's historic neighborhoods while learning about Spanish cuisine and culture.",
    featured: false
  }
];

// Categories
const categories = [
  { id: "all", name: "All Experiences" },
  { id: "Culinary", name: "Food & Cooking" },
  { id: "Adventure", name: "Adventure" },
  { id: "Cultural", name: "Cultural" },
  { id: "Nature", name: "Nature & Wildlife" }
];

export function ExperienceSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Filter experiences based on category
  const filteredExperiences = experiences.filter(
    experience => activeCategory === "all" || experience.category === activeCategory
  );

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  // Play video preview
  const handlePlayVideo = (id: string) => {
    setActiveExperience(id);
    setIsVideoPlaying(true);
    
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  
  // Close video preview
  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    setActiveExperience(null);
    
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  
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

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text font-semibold tracking-wider uppercase text-sm mb-2 inline-block">
            Unforgettable Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Go Beyond the Usual
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover unique activities and authentic local experiences that transform 
            your journey from typical tourism to immersive adventure.
          </p>
        </motion.div>
        
        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        {/* Featured experience - highlighted at the top */}
        {filteredExperiences.some(exp => exp.featured) && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredExperiences.filter(exp => exp.featured).slice(0, 1).map((featured) => (
              <div 
                key={featured.id}
                className="group relative rounded-2xl overflow-hidden shadow-xl bg-white"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full min-h-[300px]">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {featured.video && (
                      <button
                        onClick={() => handlePlayVideo(featured.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <PlayCircle className="w-16 h-16 text-white" />
                      </button>
                    )}
                    
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full py-1 px-3 shadow-md">
                      <span className="font-medium text-primary">{featured.category}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{featured.title}</h3>
                      <button 
                        onClick={() => toggleFavorite(featured.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Heart 
                          className={`w-6 h-6 ${favorites.includes(featured.id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-gray-900 font-medium">{featured.rating}</span>
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{featured.reviews} reviews</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{featured.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{featured.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{featured.groupSize}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">Available now</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900">{featured.price}</span>
                        <span className="text-gray-600 text-sm ml-1">per person</span>
                      </div>
                      
                      <Link href={`/experiences/${featured.id}`}>
                        <Button className="rounded-full px-5">
                          Book Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        
        {/* Experience grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredExperiences
            .filter(exp => !exp.featured || activeCategory !== "all")
            .map((experience) => (
              <motion.div
                key={experience.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-medium py-1 px-2 rounded-full shadow-sm">
                      {experience.category}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => toggleFavorite(experience.id)}
                    className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(experience.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </button>
                  
                  {experience.video && (
                    <button
                      onClick={() => handlePlayVideo(experience.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <PlayCircle className="w-12 h-12 text-white" />
                    </button>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {experience.duration}
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Star className="w-3.5 h-3.5 mr-1 text-yellow-400 fill-yellow-400" />
                      {experience.rating} ({experience.reviews})
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {experience.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {experience.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <span className="font-bold text-gray-900">{experience.price}</span>
                      <span className="text-gray-600 text-xs ml-1">per person</span>
                    </div>
                    
                    <Link 
                      href={`/experiences/${experience.id}`}
                      className="text-primary font-medium text-sm hover:underline flex items-center"
                    >
                      View Details
                      <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
        
        {/* Video preview modal */}
        <AnimatePresence>
          {isVideoPlaying && activeExperience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-4xl rounded-xl overflow-hidden bg-black shadow-2xl"
              >
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <video
                  ref={videoRef}
                  src={experiences.find(exp => exp.id === activeExperience)?.video}
                  className="w-full"
                  controls
                  autoPlay
                ></video>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* View all link */}
        <div className="text-center mt-12">
          <Link 
            href="/experiences" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            <span>View All Experiences</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
} 