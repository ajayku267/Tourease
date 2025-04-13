"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Compass, Palmtree, Camera, Heart, Luggage, Users, ChevronRight } from "lucide-react";

// Sample travel styles/experiences
const experiences = [
  {
    id: "adventure",
    title: "Adventure",
    description: "Thrilling outdoor activities and challenging experiences",
    icon: <Compass className="h-8 w-8" />,
    image: "https://source.unsplash.com/random/800x1000/?hiking,adventure",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "relaxation",
    title: "Relaxation",
    description: "Peaceful retreats and tranquil settings for rejuvenation",
    icon: <Palmtree className="h-8 w-8" />,
    image: "https://source.unsplash.com/random/800x1000/?beach,relaxation",
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "photography",
    title: "Photography",
    description: "Picturesque landscapes and stunning vistas to capture",
    icon: <Camera className="h-8 w-8" />,
    image: "https://source.unsplash.com/random/800x1000/?landscape,photography",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: "romantic",
    title: "Romantic",
    description: "Intimate settings and special moments for couples",
    icon: <Heart className="h-8 w-8" />,
    image: "https://source.unsplash.com/random/800x1000/?romantic,couple",
    color: "from-pink-500 to-rose-600"
  },
  {
    id: "cultural",
    title: "Cultural",
    description: "Deep dives into local traditions, history, and customs",
    icon: <Luggage className="h-8 w-8" />,
    image: "https://source.unsplash.com/random/800x1000/?culture,history",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "group",
    title: "Group Tours",
    description: "Social adventures with like-minded travelers",
    icon: <Users className="h-8 w-8" />,
    image: "https://source.unsplash.com/random/800x1000/?group,tour",
    color: "from-blue-500 to-violet-600"
  }
];

export function TravelExperiences() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  // Calculate mouse position for the 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (index !== activeIndex) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (index !== activeIndex) return;
    
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
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
            Travel your way
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover Your Travel Style
          </motion.h2>
          <motion.p 
            className="mt-2 text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our AI matches your preferences with experiences that resonate with your 
            ideal travel style, creating journeys that feel uniquely yours.
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left side - active experience card with 3D effect */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div 
              className="relative w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
              onMouseMove={(e) => handleMouseMove(e, activeIndex)}
              onMouseLeave={(e) => handleMouseLeave(e, activeIndex)}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease' }}
            >
              <Image
                src={experiences[activeIndex].image}
                alt={experiences[activeIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${experiences[activeIndex].color} opacity-60`} />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 text-white">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                    {experiences[activeIndex].icon}
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-2">
                  {experiences[activeIndex].title}
                </h3>
                <p className="text-white/90 text-lg max-w-md">
                  {experiences[activeIndex].description}
                </p>
                <motion.a
                  href={`/experiences/${experiences[activeIndex].id}`}
                  className="mt-6 inline-flex items-center font-medium text-white group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-100 group-hover:after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out">
                    Explore {experiences[activeIndex].title} Trips
                  </span>
                  <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-30 blur-2xl" />
            <div className="absolute -bottom-10 -right-8 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl" />
          </motion.div>
          
          {/* Right side - experience options */}
          <motion.div 
            className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 lg:gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                onClick={() => setActiveIndex(index)}
                className={`relative p-4 sm:p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeIndex === index 
                    ? `bg-gradient-to-br ${experience.color} text-white shadow-lg` 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
              >
                <div className={`p-3 rounded-lg inline-block mb-3 ${
                  activeIndex === index 
                    ? 'bg-white/20' 
                    : `bg-gradient-to-br ${experience.color} bg-opacity-10`
                }`}>
                  {experience.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  {experience.title}
                </h3>
                <p className={`text-sm ${activeIndex === index ? 'text-white/80' : 'text-gray-600'}`}>
                  {experience.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 