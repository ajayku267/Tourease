"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Calendar, Users, DollarSign, Heart } from "lucide-react";
import TravelStyleQuiz, { TravelPreferences } from '../../components/features/TravelStyleQuiz';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

const QuizPage = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [travelPreferences, setTravelPreferences] = useState<TravelPreferences | null>(null);
  
  const handleQuizComplete = (preferences: TravelPreferences) => {
    setTravelPreferences(preferences);
    setQuizCompleted(true);
    
    // In a real application, you would save this to the user profile
    console.log('Quiz completed with preferences:', preferences);
  };
  
  const getTravellerTypeIcon = (type: string) => {
    switch (type) {
      case 'The Explorer': return <PlaneTakeoff className="w-6 h-6 text-blue-500" />;
      case 'The Free Spirit': return <CloudLightning className="w-6 h-6 text-purple-500" />;
      case 'The Culinary Traveler': return <Coffee className="w-6 h-6 text-amber-500" />;
      default: return <User className="w-6 h-6 text-green-500" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Your Travel Style
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take our quick quiz to uncover your unique travel personality. We'll use your preferences to 
              recommend destinations and experiences tailored just for you.
            </p>
          </div>
          
          {quizCompleted && travelPreferences ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-[#ff5f1f]" />
                    Your Travel Style Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-gradient-to-r from-orange-100 to-amber-50 p-6 rounded-lg mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          {getTravellerTypeIcon(travelPreferences.travellerType)}
                          <h3 className="text-xl font-semibold">{travelPreferences.travellerType}</h3>
                        </div>
                        <p className="text-gray-700">
                          {travelPreferences.travellerType === 'The Explorer' && 
                            "You're an adventurous traveler who seeks new experiences and off-the-beaten-path destinations. You value authenticity and are willing to step outside your comfort zone."}
                          {travelPreferences.travellerType === 'The Relaxer' && 
                            "You travel to unwind and recharge. You value comfort, relaxation, and taking things at a slower pace. Beaches, spas, and peaceful retreats are your ideal destinations."}
                          {travelPreferences.travellerType === 'The Culture Enthusiast' && 
                            "You're drawn to the history, art, and traditions of the places you visit. Museums, historical sites, and local experiences are top priorities on your itinerary."}
                          {travelPreferences.travellerType === 'The Culinary Traveler' && 
                            "Food is at the center of your travel experiences. You seek out local specialties, markets, cooking classes, and memorable dining experiences wherever you go."}
                          {travelPreferences.travellerType === 'The Organized Traveler' && 
                            "You appreciate structure and planning when you travel. Having a clear itinerary helps you make the most of your time and ensures you don't miss important sites."}
                          {travelPreferences.travellerType === 'The Free Spirit' && 
                            "You prefer spontaneity and flexibility in your travels. Going with the flow and discovering unexpected experiences gives you the most joy when exploring new places."}
                          {travelPreferences.travellerType === 'The Luxury Seeker' && 
                            "You value premium experiences and high-quality accommodations. You're willing to invest in comfort and exceptional service to enhance your travel experiences."}
                          {travelPreferences.travellerType === 'The Budget Traveler' && 
                            "You're skilled at maximizing experiences while minimizing costs. You find value in affordable options and enjoy the challenge of traveling smartly within your means."}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-700 mb-1">Pace Preference</h4>
                          <p className="text-lg capitalize">{travelPreferences.pace}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-700 mb-1">Accommodation</h4>
                          <p className="text-lg capitalize">{travelPreferences.accommodation}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Your Interests</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {travelPreferences.interests.map((interest, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-medium mb-3">Travel Style Breakdown</h3>
                      <div className="space-y-3">
                        {Object.entries(travelPreferences.travelStyle)
                          .sort(([, valueA], [, valueB]) => valueB - valueA)
                          .slice(0, 4)
                          .map(([style, value]) => (
                            <div key={style} className="bg-gray-50 p-3 rounded">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 capitalize">{style}</span>
                                <span className="text-sm font-medium text-gray-500">{value > 0 ? `+${value}` : value}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#ff5f1f] h-2 rounded-full" 
                                  style={{ width: `${Math.max(0, 50 + (value * 10))}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      as={Link}
                      href="/explore"
                      className="flex-1"
                    >
                      Explore Recommended Destinations
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setQuizCompleted(false)}
                      className="flex-1"
                    >
                      Retake Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-6">Destinations You Might Love</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {travelPreferences.travellerType === 'The Explorer' && (
                    <>
                      <RecommendationCard 
                        name="Kyoto, Japan" 
                        description="Ancient temples, traditional gardens, and cultural immersion"
                        match={92}
                      />
                      <RecommendationCard 
                        name="Patagonia, Chile" 
                        description="Stunning natural landscapes and outdoor adventures"
                        match={88}
                      />
                      <RecommendationCard 
                        name="Morocco" 
                        description="Colorful markets, desert adventures, and rich cultural history"
                        match={85}
                      />
                    </>
                  )}
                  
                  {travelPreferences.travellerType === 'The Relaxer' && (
                    <>
                      <RecommendationCard 
                        name="Maldives" 
                        description="Overwater bungalows and pristine beaches"
                        match={95}
                      />
                      <RecommendationCard 
                        name="Bali, Indonesia" 
                        description="Wellness retreats, rice terraces, and peaceful temples"
                        match={91}
                      />
                      <RecommendationCard 
                        name="Santorini, Greece" 
                        description="Stunning views, relaxed atmosphere, and beautiful sunsets"
                        match={89}
                      />
                    </>
                  )}
                  
                  {(travelPreferences.travellerType !== 'The Explorer' && 
                    travelPreferences.travellerType !== 'The Relaxer') && (
                    <>
                      <RecommendationCard 
                        name="Barcelona, Spain" 
                        description="Vibrant culture, amazing food, and stunning architecture"
                        match={90}
                      />
                      <RecommendationCard 
                        name="Tokyo, Japan" 
                        description="Modern technology, traditional culture, and incredible food"
                        match={87}
                      />
                      <RecommendationCard 
                        name="New Zealand" 
                        description="Breathtaking landscapes, outdoor adventures, and friendly locals"
                        match={85}
                      />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <TravelStyleQuiz 
              onComplete={handleQuizComplete} 
              className="shadow-xl"
            />
          )}
        </div>
      </main>
    </div>
  );
};

interface RecommendationCardProps {
  name: string;
  description: string;
  match: number;
}

const RecommendationCard = ({ name, description, match }: RecommendationCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-[#ff5f1f]">
          {match}% Match
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link 
          href={`/explore?destination=${encodeURIComponent(name)}`}
          className="text-[#ff5f1f] hover:text-[#e55214] text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default QuizPage; 