"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Globe } from 'lucide-react';

interface AnimatedHeroProps {
  heading: string;
  coloredHeading?: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const AnimatedHero = ({
  heading,
  coloredHeading,
  subheading,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink
}: AnimatedHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add a small delay to ensure animations run after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (parallaxRef.current) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        parallaxRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  const secondaryButtonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };
  
  const destinations = [
    { name: 'Bali', position: 'top-1/4 left-[15%]', delay: 0.7 },
    { name: 'Paris', position: 'top-1/3 right-[20%]', delay: 0.9 },
    { name: 'Tokyo', position: 'bottom-1/4 left-[25%]', delay: 1.1 },
    { name: 'New York', position: 'bottom-1/3 right-[15%]', delay: 1.3 },
  ];

  return (
    <section className="relative min-h-[85vh] overflow-hidden flex items-center">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10"></div>
        <motion.div
          ref={parallaxRef}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop"
            alt="Travel Adventure"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
        </motion.div>
      </div>
      
      {/* Floating destination markers */}
      {destinations.map((destination, index) => (
        <motion.div
          key={index}
          className={`absolute ${destination.position} z-20`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: destination.delay, duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-white/20 animate-ping"></div>
            <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-full py-1 px-3 shadow-lg">
              <div className="h-2 w-2 bg-[#ff5f1f] rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-800">{destination.name}</span>
            </div>
          </div>
        </motion.div>
      ))}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20">
              <Globe className="h-4 w-4 mr-2" />
              Your AI-Powered Travel Companion
            </span>
          </motion.div>
            
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            variants={itemVariants}
          >
            {heading}{' '}
            {coloredHeading && (
              <span className="text-[#ff5f1f] relative">
                {coloredHeading}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-amber-400 to-[#ff5f1f]"
                ></motion.span>
              </span>
            )}
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-xl md:text-2xl text-white/90 max-w-3xl"
            variants={itemVariants}
          >
            {subheading}
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-5"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={ctaLink}
                className="flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#ff5f1f] to-amber-500 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            
            {secondaryCtaText && secondaryCtaLink && (
              <motion.div
                variants={secondaryButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href={secondaryCtaLink}
                  className="flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Compass className="mr-2 h-5 w-5" />
                  {secondaryCtaText}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <motion.div 
              animate={{ height: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 bg-white/70 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedHero; 