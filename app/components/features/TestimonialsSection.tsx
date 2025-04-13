"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Emma & James",
    location: "Honeymooners",
    quote: "TourEase transformed our honeymoon planning from stressful to magical. The AI-generated itinerary felt like it was crafted by someone who knew us personally. Every restaurant, viewpoint, and hidden gem was exactly what we would have chosen ourselves.",
    rating: 5,
    image: "/images/avatars/couple.svg",
    destination: "Bali, Indonesia",
    tripType: "Honeymoon"
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Solo Explorer",
    quote: "As a solo traveler who's seen 30+ countries, I'm not easily impressed. TourEase surprised me with recommendations for places even locals didn't know about. The safety features and real-time translations were lifesavers in remote areas.",
    rating: 5,
    image: "/images/avatars/solo.svg",
    destination: "Peru & Chile",
    tripType: "Adventure"
  },
  {
    id: 3,
    name: "The Wilson Family",
    location: "Family Travelers",
    quote: "Planning a trip with three kids under 10 used to be our nightmare. TourEase suggested family-friendly activities that kept everyone happy. The packing list feature alone saved us from at least three meltdowns!",
    rating: 5,
    image: "/images/avatars/family.svg",
    destination: "Tokyo, Japan",
    tripType: "Family"
  },
  {
    id: 4,
    name: "Sarah J.",
    location: "Budget Backpacker",
    quote: "I was skeptical about using an AI travel planner for my budget trip across Southeast Asia. But TourEase found affordable gems and authentic experiences that didn't break the bank. The budget tracker kept me on target too!",
    rating: 4,
    image: "https://source.unsplash.com/random/100x100/?portrait&sig=4",
    destination: "Thailand & Vietnam",
    tripType: "Backpacking"
  },
  {
    id: 5,
    name: "David & Friends",
    location: "Group Travel",
    quote: "Coordinating trips with six people with different interests seemed impossible until we found TourEase. The group planning features let everyone contribute ideas, and the final itinerary somehow made everyone happy!",
    rating: 5,
    image: "https://source.unsplash.com/random/100x100/?friends&sig=5",
    destination: "Barcelona, Spain",
    tripType: "Group"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  // Start animation when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  // Handle navigation
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setAutoplay(false);
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Render star ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
      />
    ));
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-block text-primary font-semibold tracking-wider uppercase text-sm mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Traveler Stories
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            What Our Travelers Say
          </motion.h2>
          <motion.p 
            className="mt-2 text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Real experiences from travelers who explored the world with our AI-powered platform
          </motion.p>
        </motion.div>
        
        {/* Testimonial cards */}
        <div className="relative">
          {/* Large quote decorative element */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-5">
            <Quote className="w-40 h-40" />
          </div>
          
          {/* Main testimonial card */}
          <div className="relative max-w-4xl mx-auto">
            <motion.div 
              key={`testimonial-${currentIndex}`}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Testimonial image side */}
                <div className="md:w-2/5 relative">
                  <div className="h-64 md:h-full relative">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-sm font-medium">{testimonials[currentIndex].destination}</p>
                    <p className="text-xs opacity-80">{testimonials[currentIndex].tripType}</p>
                  </div>
                </div>
                
                {/* Testimonial content side */}
                <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    
                    <blockquote>
                      <p className="text-gray-700 text-lg italic leading-relaxed">
                        "{testimonials[currentIndex].quote}"
                      </p>
                    </blockquote>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                        <p className="text-gray-500 text-sm">{testimonials[currentIndex].location}</p>
                      </div>
                      
                      {/* Navigation controls */}
                      <div className="flex space-x-2">
                        <button 
                          onClick={goToPrevious}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={goToNext}
                          className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                          aria-label="Next testimonial"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setAutoplay(false);
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-primary w-4" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Small card previews */}
          <div className="hidden md:block">
            {testimonials.map((testimonial, index) => {
              // Only show the adjacent cards
              if (index !== currentIndex && 
                  index !== (currentIndex + 1) % testimonials.length && 
                  index !== (currentIndex - 1 + testimonials.length) % testimonials.length) {
                return null;
              }
              
              // Position calculation
              let position: 'left' | 'right' = 'left';
              let translateX = '-120%';
              let rotate = '-6deg';
              let opacity = '0.7';
              let scale = '0.85';
              
              if (index === (currentIndex + 1) % testimonials.length) {
                position = 'right';
                translateX = '120%';
                rotate = '6deg';
              }
              
              return (
                <motion.div
                  key={testimonial.id}
                  className="absolute top-1/2 transform -translate-y-1/2 max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 0.7,
                    x: position === 'left' ? '-120%' : '120%',
                    rotate: position === 'left' ? '-6deg' : '6deg',
                    scale: 0.85,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    left: position === 'left' ? '0' : 'auto',
                    right: position === 'right' ? '0' : 'auto',
                    zIndex: -1,
                  }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-4 pointer-events-none">
                    <p className="text-gray-700 text-sm line-clamp-3">
                      "{testimonial.quote.substring(0, 100)}..."
                    </p>
                    <div className="mt-3 flex items-center">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-xs font-semibold">{testimonial.name}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 