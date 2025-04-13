"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, Calendar, Lightbulb, Briefcase, Globe, 
  Compass, PlaneTakeoff, Bot, CreditCard, Zap, ArrowRight
} from "lucide-react";
import { CurrencyConverter } from "./components/features/CurrencyConverter";

// Import our new enhanced components
import { HeroSection } from "@/components/marketing/HeroSection";
import { PopularDestinations } from "./components/features/PopularDestinations";
import { TravelExperiences } from "./components/features/TravelExperiences";
import { TestimonialsSection } from "./components/features/TestimonialsSection";
import { TravelTipsSection } from "./components/features/TravelTipsSection";
import { FeaturedTripsCarousel } from "./components/features/FeaturedTripsCarousel";
import { NewsletterSection } from "./components/features/NewsletterSection";

export default function Home() {
  // State for the random quote
  const [randomQuote, setRandomQuote] = useState("");

  const features = [
    {
      title: "AI Itinerary Planner",
      description: "Let our AI craft the perfect personalized itinerary based on your preferences and travel style",
      icon: <Lightbulb className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600",
      href: "/plan"
    },
    {
      title: "Interactive Maps",
      description: "Explore your destinations with interactive maps, local insights, and hidden gems",
      icon: <MapPin className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600",
      href: "/explore"
    },
    {
      title: "AR Tour Mode",
      description: "Experience destinations in augmented reality with our new AR tour mode feature",
      icon: <div className="flex items-center justify-center h-8 w-8 relative">
        <img src="/images/icons/ar-mode-icon.svg" alt="AR" className="h-full w-full" />
      </div>,
      color: "bg-blue-100 text-blue-600",
      href: "/ar-tour"
    },
    {
      title: "Smart Packing Lists",
      description: "Never forget essentials with AI-generated packing lists tailored to your destination",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-amber-100 text-amber-600",
      href: "/packing"
    },
    {
      title: "Trip Timeline",
      description: "Organize your journey with a beautiful visual timeline of activities and reservations",
      icon: <Calendar className="h-8 w-8" />,
      color: "bg-emerald-100 text-emerald-600",
      href: "/trip"
    }
  ];

  const travelQuotes = [
    "The world is a book and those who do not travel read only one page.",
    "Travel is the only thing you buy that makes you richer.",
    "Life is either a daring adventure or nothing at all.",
    "Travel far enough, you meet yourself.",
    "Travel opens your mind to new possibilities you never knew existed."
  ];

  // Use useEffect to set the random quote on the client side only
  useEffect(() => {
    setRandomQuote(travelQuotes[Math.floor(Math.random() * travelQuotes.length)]);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.span 
              className="inline-block text-primary font-semibold tracking-wider uppercase text-sm mb-2"
              variants={fadeInUp}
            >
              Intelligent Travel Planning
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
              variants={fadeInUp}
            >
              Plan Your Perfect Trip with AI
            </motion.h2>
            <motion.p 
              className="mt-2 text-gray-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Our AI-powered platform creates personalized travel experiences based on your preferences,
              budget, and travel style.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              // Special styling and content for AR Tour Mode
              const isARFeature = feature.title === "AR Tour Mode";
              
              return (
                <motion.div
                  key={feature.title}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border ${isARFeature ? "border-blue-400 relative" : "border-gray-100"}`}
                  variants={fadeInUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {isARFeature && (
                    <div className="absolute -right-3 -top-3 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-sm">
                      NEW
                    </div>
                  )}
                  <div className={`p-3 rounded-xl ${feature.color} inline-block mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link
                    href={feature.href}
                    className={`inline-flex items-center font-medium hover:underline ${isARFeature ? "text-blue-600" : "text-primary"}`}
                  >
                    {isARFeature ? "Try AR Tour Mode" : "Learn more"}
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      
      {/* AR Tour Mode Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:flex items-center">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="mb-4 inline-block bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <div className="h-12 w-12 relative">
                    <img 
                      src="/images/icons/ar-mode-icon.svg" 
                      alt="AR Tour Mode" 
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Experience Destinations in Augmented Reality
                </h2>
                <p className="text-blue-100 mb-6">
                  Our new AR Tour Mode lets you explore places through your phone's camera with interactive markers, 
                  navigation guides, and rich information about landmarks and points of interest.
                </p>
                <Link 
                  href="/ar-tour" 
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Try AR Tour Mode
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-700/80 to-transparent md:bg-gradient-to-r md:from-blue-700/80 md:to-transparent z-10"></div>
                <img
                  src="/images/destinations/paris.jpg"
                  alt="AR Tour Experience"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-ping-slow">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Trips Carousel */}
      <FeaturedTripsCarousel />
      
      {/* Popular Destinations */}
      <PopularDestinations />
      
      {/* Travel Tips Section */}
      <TravelTipsSection />
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-primary bg-opacity-5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.span 
              className="inline-block text-primary font-semibold tracking-wider uppercase text-sm mb-2"
              variants={fadeInUp}
            >
              Simple Process
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
              variants={fadeInUp}
            >
              How TourEase Works
            </motion.h2>
            <motion.p 
              className="mt-2 text-gray-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Create your perfect trip in just a few simple steps
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <Globe className="h-10 w-10" />,
                title: "Tell Us Your Preferences",
                description: "Share your travel style, interests, budget, and must-see attractions to help our AI understand your ideal trip.",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: <Bot className="h-10 w-10" />,
                title: "AI Creates Your Itinerary",
                description: "Our AI analyzes thousands of options to build a personalized day-by-day itinerary just for you.",
                color: "bg-purple-100 text-purple-600"
              },
              {
                icon: <PlaneTakeoff className="h-10 w-10" />,
                title: "Enjoy Your Journey",
                description: "Access your itinerary offline, get real-time updates, and explore with confidence using our travel tools.",
                color: "bg-emerald-100 text-emerald-600"
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 2, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-6 relative z-10">
                  <div className={`p-4 rounded-xl ${step.color} inline-block mb-4`}>
                    {step.icon}
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 right-0 w-16 h-8 translate-x-1/2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-0.5 bg-primary absolute top-1/2 left-0 right-0"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary transform rotate-45"
                      />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <span className="inline-block w-7 h-7 bg-primary text-white rounded-full text-center text-sm mr-2">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Decorative background element */}
                <div className="absolute top-4 left-4 w-full h-full bg-gray-200 rounded-xl -z-10" />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href="/plan"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Planning Your Trip
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Travel Experiences */}
      <TravelExperiences />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Newsletter Subscription */}
      <NewsletterSection />
      
      {/* Quote and CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="white" />
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="mb-8">
              <p className="text-xl md:text-3xl font-serif italic leading-relaxed">
                "{randomQuote}"
              </p>
            </blockquote>
            
            <div className="mt-12 md:mt-16 space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold">
                Ready to Discover Your Next Adventure?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                Join thousands of travelers who are exploring the world in a whole new way with
                our AI-powered travel assistant.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Link 
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                >
                  Sign Up Free
                </Link>
                <Link 
                  href="/destinations"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
        {/* Currency converter moved to its own dedicated section below */}
      </div>

      {/* Currency Converter Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4">
              <span className="mr-1">💱</span> Travel Tools
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Currency Converter</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Plan your budget with real-time exchange rates
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <CurrencyConverter />
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Travel Vibe */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="white" />
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mt-12 md:mt-16 space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold">
                Ready to Discover Your Next Adventure?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                Join thousands of travelers who are exploring the world in a whole new way with
                our AI-powered travel assistant.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Link 
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                >
                  Sign Up Free
                </Link>
                <Link 
                  href="/destinations"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mt-6">
        <Link 
          href="/destinations" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
        >
          Explore Real Travel Data
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
} 