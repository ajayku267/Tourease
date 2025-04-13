"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, Sun, Cloud, Plane, Palmtree, Snowflake, Mountain, 
         Building, Users, Waves, Coffee, Utensils, Camera, Heart, ArrowRight } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  matchScore: number;
  climate: string;
  budget: string;
  activities: string[];
  tags: string[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
  }[];
  allowMultiple?: boolean;
}

const AIDestinationRecommender = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [recommendedDestinations, setRecommendedDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  
  const questions: QuizQuestion[] = [
    {
      id: "climate",
      question: "What climate do you prefer for your trip?",
      options: [
        { value: "tropical", label: "Warm & Tropical", icon: <Sun className="h-5 w-5" /> },
        { value: "mild", label: "Mild & Temperate", icon: <Cloud className="h-5 w-5" /> },
        { value: "cold", label: "Cold & Snowy", icon: <Snowflake className="h-5 w-5" /> },
        { value: "diverse", label: "I enjoy variety", icon: <Globe className="h-5 w-5" /> }
      ]
    },
    {
      id: "landscape",
      question: "What type of landscape are you looking for?",
      options: [
        { value: "beach", label: "Beaches & Islands", icon: <Palmtree className="h-5 w-5" /> },
        { value: "mountains", label: "Mountains & Hiking", icon: <Mountain className="h-5 w-5" /> },
        { value: "urban", label: "City & Urban", icon: <Building className="h-5 w-5" /> },
        { value: "mixed", label: "Mix of Everything", icon: <Plane className="h-5 w-5" /> }
      ]
    },
    {
      id: "activities",
      question: "What activities interest you most?",
      options: [
        { value: "adventure", label: "Adventure & Sports", icon: <Waves className="h-5 w-5" /> },
        { value: "culture", label: "Culture & History", icon: <Coffee className="h-5 w-5" /> },
        { value: "food", label: "Food & Cuisine", icon: <Utensils className="h-5 w-5" /> },
        { value: "photography", label: "Sightseeing & Photos", icon: <Camera className="h-5 w-5" /> }
      ],
      allowMultiple: true
    },
    {
      id: "companions",
      question: "Who will you be traveling with?",
      options: [
        { value: "solo", label: "Solo Travel", icon: <Users className="h-5 w-5" /> },
        { value: "couple", label: "Romantic Trip", icon: <Heart className="h-5 w-5" /> },
        { value: "family", label: "Family with Kids", icon: <Users className="h-5 w-5" /> },
        { value: "friends", label: "Friends Group", icon: <Users className="h-5 w-5" /> }
      ]
    },
    {
      id: "budget",
      question: "What's your budget range?",
      options: [
        { value: "budget", label: "Budget-friendly", icon: <span className="font-semibold">$</span> },
        { value: "moderate", label: "Moderate", icon: <span className="font-semibold">$$</span> },
        { value: "luxury", label: "Luxury", icon: <span className="font-semibold">$$$</span> },
        { value: "any", label: "Any Budget", icon: <span className="font-semibold">$-$$$</span> }
      ]
    }
  ];
  
  const destinationsDatabase: Destination[] = [
    {
      id: "bali",
      name: "Bali",
      country: "Indonesia",
      description: "A tropical paradise with beautiful beaches, lush rice terraces, and vibrant cultural experiences.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop",
      matchScore: 0,
      climate: "tropical",
      budget: "moderate",
      activities: ["adventure", "culture", "food"],
      tags: ["Beaches", "Cultural", "Yoga", "Nature"]
    },
    {
      id: "kyoto",
      name: "Kyoto",
      country: "Japan",
      description: "Ancient temples, traditional tea houses, and beautiful gardens in Japan's cultural heart.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop",
      matchScore: 0,
      climate: "mild",
      budget: "moderate",
      activities: ["culture", "food", "photography"],
      tags: ["Historical", "Cultural", "Food", "Temples"]
    },
    {
      id: "santorini",
      name: "Santorini",
      country: "Greece",
      description: "Stunning white-washed villages overlooking the deep blue Aegean Sea with incredible sunsets.",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2874&auto=format&fit=crop",
      matchScore: 0,
      climate: "mild",
      budget: "luxury",
      activities: ["photography", "culture", "food"],
      tags: ["Romantic", "Views", "Islands", "Luxury"]
    },
    {
      id: "swiss-alps",
      name: "Swiss Alps",
      country: "Switzerland",
      description: "Breathtaking mountain scenery with world-class skiing, hiking, and picturesque villages.",
      image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2940&auto=format&fit=crop",
      matchScore: 0,
      climate: "cold",
      budget: "luxury",
      activities: ["adventure", "photography"],
      tags: ["Mountains", "Skiing", "Scenic", "Nature"]
    },
    {
      id: "new-york",
      name: "New York",
      country: "United States",
      description: "The iconic city that never sleeps, offering world-class dining, shopping, and cultural experiences.",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
      matchScore: 0,
      climate: "diverse",
      budget: "luxury",
      activities: ["culture", "food", "photography"],
      tags: ["Urban", "Museums", "Shopping", "Nightlife"]
    },
    {
      id: "costa-rica",
      name: "Costa Rica",
      country: "Costa Rica",
      description: "Lush rainforests, pristine beaches, and incredible wildlife in this eco-friendly paradise.",
      image: "https://images.unsplash.com/photo-1518259102261-b40117eabbc9?q=80&w=2073&auto=format&fit=crop",
      matchScore: 0,
      climate: "tropical",
      budget: "moderate",
      activities: ["adventure", "photography"],
      tags: ["Nature", "Wildlife", "Beaches", "Eco-tourism"]
    },
    {
      id: "barcelona",
      name: "Barcelona",
      country: "Spain",
      description: "A vibrant city with unique architecture, beautiful beaches, and amazing culinary experiences.",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop",
      matchScore: 0,
      climate: "mild",
      budget: "moderate",
      activities: ["culture", "food", "photography"],
      tags: ["Architecture", "Beach", "Nightlife", "Food"]
    },
    {
      id: "thailand",
      name: "Thailand",
      country: "Thailand",
      description: "From bustling Bangkok to serene islands, offering rich culture, delicious food, and beautiful beaches.",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
      matchScore: 0,
      climate: "tropical",
      budget: "budget",
      activities: ["adventure", "culture", "food"],
      tags: ["Budget", "Islands", "Food", "Culture"]
    }
  ];
  
  // Start the quiz
  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  // Handle option selection
  const handleOptionSelect = (optionValue: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (currentQuestion.allowMultiple) {
      // For multiple selection questions
      setSelectedOptions(prev => {
        if (prev.includes(optionValue)) {
          return prev.filter(item => item !== optionValue);
        } else {
          return [...prev, optionValue];
        }
      });
    } else {
      // For single selection questions
      setSelectedOptions([optionValue]);
      
      // Auto-advance to next question after a short delay
      setTimeout(() => {
        handleNextQuestion();
      }, 500);
    }
  };

  // Move to the next question
  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Save the answers
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: currentQuestion.allowMultiple ? selectedOptions : selectedOptions[0]
    }));
    
    // Clear selected options for the next question
    setSelectedOptions([]);
    
    // Check if there are more questions
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // This was the last question, calculate results
      calculateResults();
    }
  };

  // Calculate destination recommendations based on answers
  const calculateResults = () => {
    setIsLoading(true);
    
    // Simulate API processing time
    setTimeout(() => {
      const currentAnswers = {
        ...answers,
        [questions[currentQuestionIndex].id]: questions[currentQuestionIndex].allowMultiple 
          ? selectedOptions 
          : selectedOptions[0]
      };
      
      const scoredDestinations = destinationsDatabase.map(destination => {
        let score = 0;
        
        // Climate preference
        if (currentAnswers.climate === destination.climate || currentAnswers.climate === 'diverse') {
          score += 20;
        }
        
        // Landscape preference
        const landscapeMap: Record<string, string[]> = {
          'beach': ['Beaches', 'Islands'],
          'mountains': ['Mountains', 'Nature', 'Scenic'],
          'urban': ['Urban', 'City', 'Architecture'],
          'mixed': ['Varied', 'Diverse']
        };
        
        const preferredLandscape = currentAnswers.landscape as string;
        const landscapeTags = landscapeMap[preferredLandscape] || [];
        
        if (preferredLandscape === 'mixed' || 
            destination.tags.some(tag => landscapeTags.includes(tag))) {
          score += 20;
        }
        
        // Activities
        const activities = currentAnswers.activities as string[];
        if (Array.isArray(activities)) {
          const matchingActivities = activities.filter(activity => 
            destination.activities.includes(activity)
          );
          score += (matchingActivities.length / activities.length) * 20;
        }
        
        // Travel companions
        const companions = currentAnswers.companions as string;
        const companionScoreMap: Record<string, string[]> = {
          'solo': ['Budget', 'Adventure', 'Cultural'],
          'couple': ['Romantic', 'Luxury', 'Views'],
          'family': ['Nature', 'Beach', 'Wildlife', 'Family-friendly'],
          'friends': ['Adventure', 'Nightlife', 'Urban']
        };
        
        const companionTags = companionScoreMap[companions] || [];
        const hasMatchingTags = destination.tags.some(tag => 
          companionTags.includes(tag)
        );
        
        if (hasMatchingTags) {
          score += 20;
        }
        
        // Budget
        const budget = currentAnswers.budget as string;
        if (budget === destination.budget || budget === 'any') {
          score += 20;
        } else if (
          (budget === 'moderate' && destination.budget === 'budget') ||
          (budget === 'luxury' && destination.budget === 'moderate')
        ) {
          score += 10;
        }
        
        return {
          ...destination,
          matchScore: score
        };
      });
      
      // Sort by match score
      const sortedDestinations = scoredDestinations
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5); // Top 5 matches
      
      setRecommendedDestinations(sortedDestinations);
      setIsLoading(false);
      setResultsReady(true);
    }, 2000);
  };

  // Reset the quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOptions([]);
    setRecommendedDestinations([]);
    setResultsReady(false);
    setIsQuizStarted(false);
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/world-pattern.svg')] bg-cover opacity-5 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200/20 blur-3xl z-0"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-indigo-200/20 blur-3xl z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {!isQuizStarted && !resultsReady && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-6">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover Your Perfect Destination</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Answer a few questions and our AI will recommend destinations tailored to your preferences.
            </p>
            <motion.button
              onClick={startQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Find My Destination
            </motion.button>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="bg-blue-50 rounded-full p-3 mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Personalized</h3>
                <p className="text-gray-600 text-sm text-center">
                  Recommendations based on your travel style and preferences
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-50 rounded-full p-3 mb-3">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Diverse Options</h3>
                <p className="text-gray-600 text-sm text-center">
                  Discover hidden gems and popular destinations worldwide
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-50 rounded-full p-3 mb-3">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
                <p className="text-gray-600 text-sm text-center">
                  Get travel inspiration in seconds to start planning your trip
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        {isQuizStarted && !resultsReady && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Travel Preference Quiz</h2>
                <div className="text-white font-medium">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {currentQuestion.options.map((option) => (
                      <motion.button
                        key={option.value}
                        onClick={() => handleOptionSelect(option.value)}
                        className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedOptions.includes(option.value)
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`p-3 rounded-full mr-4 ${
                          selectedOptions.includes(option.value)
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {option.icon}
                        </div>
                        <span className={`font-medium ${
                          selectedOptions.includes(option.value)
                            ? 'text-blue-600'
                            : 'text-gray-700'
                        }`}>
                          {option.label}
                        </span>
                        
                        {selectedOptions.includes(option.value) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto bg-blue-600 text-white rounded-full p-1"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Only show Next button for multi-select questions or the last question */}
                  {(currentQuestion.allowMultiple || currentQuestionIndex === questions.length - 1) && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        disabled={selectedOptions.length === 0}
                        className={`px-8 py-3 rounded-lg font-medium ${
                          selectedOptions.length > 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        } transition-colors duration-300`}
                      >
                        {currentQuestionIndex === questions.length - 1 ? 'Get Results' : 'Next'}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
        
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding Your Perfect Destinations</h3>
              <p className="text-gray-600">Our AI is analyzing your preferences to match you with ideal destinations...</p>
            </div>
          </div>
        )}
        
        {resultsReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-8 text-center">
              <h2 className="text-2xl font-bold text-white">Your Personalized Recommendations</h2>
              <p className="text-white/80">Based on your preferences, here are destinations you'll love</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {recommendedDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative">
                      <div className="relative h-48">
                        <Image
                          src={destination.image}
                          alt={destination.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-md">
                        <div className="text-xs font-bold text-blue-600 mr-1">Match</div>
                        <div className="text-sm font-bold">{destination.matchScore}%</div>
                      </div>
                      
                      <div className="absolute bottom-3 left-3">
                        <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                        <div className="flex items-center text-white/90 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {destination.country}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {destination.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link href={`/destinations/${destination.id}`}>
                        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 flex items-center justify-center">
                          Explore {destination.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-300"
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIDestinationRecommender; 