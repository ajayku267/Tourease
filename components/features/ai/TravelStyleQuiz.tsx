"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle,
  Heart,
  AlignLeft,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

// Types
export interface TravelStyle {
  adventurer: number;
  relaxer: number;
  culture: number;
  foodie: number;
  planner: number;
  spontaneous: number;
  luxury: number;
  budget: number;
}

export interface TravelPreferences {
  pace: 'slow' | 'moderate' | 'fast';
  accommodation: 'budget' | 'midrange' | 'luxury';
  interests: string[];
  travelStyle: TravelStyle;
  travellerType: string;
}

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    styles: Partial<TravelStyle>;
  }[];
  allowMultiple?: boolean;
  category: keyof Omit<TravelPreferences, 'travelStyle' | 'travellerType'> | 'style';
}

interface TravelStyleQuizProps {
  onComplete: (preferences: TravelPreferences) => void;
  className?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your ideal pace for a trip?",
    category: 'pace',
    options: [
      { 
        text: "Relaxed with plenty of downtime",
        styles: { relaxer: 2, spontaneous: 1, adventurer: -1 }
      },
      { 
        text: "Balanced mix of activities and relaxation",
        styles: { relaxer: 1, culture: 1 }
      },
      { 
        text: "Action-packed with lots of activities",
        styles: { adventurer: 2, planner: 1, relaxer: -1 }
      }
    ]
  },
  {
    id: 2,
    question: "Which accommodation type do you prefer?",
    category: 'accommodation',
    options: [
      { 
        text: "Budget-friendly hostels or guesthouses",
        styles: { budget: 2, luxury: -2 }
      },
      { 
        text: "Mid-range hotels with good value",
        styles: { budget: 0, luxury: 0 }
      },
      { 
        text: "Luxury hotels or resorts",
        styles: { luxury: 2, budget: -2 }
      }
    ]
  },
  {
    id: 3,
    question: "What activities interest you most while traveling?",
    category: 'interests',
    allowMultiple: true,
    options: [
      { 
        text: "Historical sites and museums",
        styles: { culture: 2, adventurer: 0 }
      },
      { 
        text: "Outdoor adventures and nature",
        styles: { adventurer: 2, relaxer: -1 }
      },
      { 
        text: "Local cuisine and food experiences",
        styles: { foodie: 2, culture: 1 }
      },
      { 
        text: "Beaches and relaxation",
        styles: { relaxer: 2, adventurer: -1 }
      },
      {
        text: "Shopping and markets",
        styles: { culture: 1, luxury: 1 }
      },
      {
        text: "Nightlife and entertainment",
        styles: { spontaneous: 2, planner: -1 }
      }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to plan your itinerary?",
    category: 'style',
    options: [
      { 
        text: "Detailed plan with scheduled activities",
        styles: { planner: 2, spontaneous: -2 }
      },
      { 
        text: "Rough outline with flexibility",
        styles: { planner: 1, spontaneous: 1 }
      },
      { 
        text: "Minimal planning, go with the flow",
        styles: { spontaneous: 2, planner: -2 }
      }
    ]
  },
  {
    id: 5,
    question: "How important is food in your travel experience?",
    category: 'style',
    options: [
      { 
        text: "Very important - I travel to eat!",
        styles: { foodie: 2, culture: 1 }
      },
      { 
        text: "Somewhat important - I enjoy good food",
        styles: { foodie: 1 }
      },
      { 
        text: "Not that important - I eat to live",
        styles: { foodie: -1 }
      }
    ]
  },
  {
    id: 6,
    question: "How do you feel about trying unfamiliar things?",
    category: 'style',
    options: [
      { 
        text: "Love it - the more unfamiliar, the better",
        styles: { adventurer: 2, spontaneous: 1, culture: 1 }
      },
      { 
        text: "Open to it within my comfort zone",
        styles: { adventurer: 1, planner: 1 }
      },
      { 
        text: "Prefer familiar experiences I know I'll enjoy",
        styles: { relaxer: 1, planner: 1, adventurer: -1 }
      }
    ]
  },
  {
    id: 7,
    question: "What's your accommodation preference when traveling?",
    category: 'style',
    options: [
      { 
        text: "Local homestays or unique accommodations",
        styles: { culture: 2, adventurer: 1, luxury: -1 }
      },
      { 
        text: "Comfortable chain hotels",
        styles: { planner: 1, relaxer: 1 }
      },
      { 
        text: "Luxury resorts with amenities",
        styles: { luxury: 2, relaxer: 1, budget: -2 }
      }
    ]
  },
  {
    id: 8,
    question: "How do you prefer to get around when traveling?",
    category: 'style',
    options: [
      { 
        text: "Public transportation like a local",
        styles: { budget: 1, culture: 1, adventurer: 1 }
      },
      { 
        text: "Guided tours or private transport",
        styles: { luxury: 1, planner: 1, relaxer: 1 }
      },
      { 
        text: "Rental car for independence",
        styles: { spontaneous: 1, adventurer: 1 }
      }
    ]
  }
];

const TravelStyleQuiz = ({ onComplete, className }: TravelStyleQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number[] }>({});
  const [travelStyle, setTravelStyle] = useState<TravelStyle>({
    adventurer: 0,
    relaxer: 0,
    culture: 0,
    foodie: 0,
    planner: 0,
    spontaneous: 0,
    luxury: 0,
    budget: 0
  });
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  
  const handleOptionSelect = (optionIndex: number) => {
    if (currentQuestion.allowMultiple) {
      // For multi-select questions
      const currentAnswers = answers[currentQuestion.id] || [];
      const newAnswers = currentAnswers.includes(optionIndex)
        ? currentAnswers.filter(i => i !== optionIndex)
        : [...currentAnswers, optionIndex];
      
      setAnswers({
        ...answers,
        [currentQuestion.id]: newAnswers
      });
    } else {
      // For single-select questions
      setAnswers({
        ...answers,
        [currentQuestion.id]: [optionIndex]
      });
      
      // Apply style updates
      updateTravelStyles(optionIndex);
      
      // Auto-advance after selection
      if (!isLastQuestion) {
        setTimeout(() => {
          nextQuestion();
        }, 700);
      }
    }
  };
  
  const updateTravelStyles = (optionIndex: number) => {
    const option = currentQuestion.options[optionIndex];
    const newStyle = { ...travelStyle };
    
    // Update travel style based on selected option
    Object.entries(option.styles).forEach(([style, value]) => {
      const styleKey = style as keyof TravelStyle;
      newStyle[styleKey] = (newStyle[styleKey] || 0) + value;
    });
    
    setTravelStyle(newStyle);
  };
  
  const nextQuestion = () => {
    if (currentQuestion.allowMultiple) {
      // For multi-select, update travel styles from all selected options
      const selectedOptions = answers[currentQuestion.id] || [];
      selectedOptions.forEach(optionIndex => {
        updateTravelStyles(optionIndex);
      });
    }
    
    if (isLastQuestion) {
      completeQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const prevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };
  
  const isNextDisabled = () => {
    return !answers[currentQuestion.id] || 
           (answers[currentQuestion.id] && answers[currentQuestion.id].length === 0);
  };
  
  const completeQuiz = () => {
    // Determine primary traveler type
    const travelStyleEntries = Object.entries(travelStyle) as [keyof TravelStyle, number][];
    
    // Sort styles by value (descending)
    const sortedStyles = travelStyleEntries.sort((a, b) => b[1] - a[1]);
    const primaryStyle = sortedStyles[0][0];
    
    // Map traveler type from primary style
    const travelerTypeMap: Record<keyof TravelStyle, string> = {
      adventurer: 'The Explorer',
      relaxer: 'The Relaxer',
      culture: 'The Culture Enthusiast',
      foodie: 'The Culinary Traveler',
      planner: 'The Organized Traveler',
      spontaneous: 'The Free Spirit',
      luxury: 'The Luxury Seeker',
      budget: 'The Budget Traveler'
    };
    
    // Determine accommodation preference
    const accommodationQ = questions.find(q => q.category === 'accommodation');
    const accommodationOptions = ['budget', 'midrange', 'luxury'] as const;
    let accommodation: TravelPreferences['accommodation'] = 'midrange';
    
    if (accommodationQ && answers[accommodationQ.id]) {
      const accommodationIndex = answers[accommodationQ.id][0];
      accommodation = accommodationOptions[accommodationIndex] || 'midrange';
    }
    
    // Determine pace preference
    const paceQ = questions.find(q => q.category === 'pace');
    const paceOptions = ['slow', 'moderate', 'fast'] as const;
    let pace: TravelPreferences['pace'] = 'moderate';
    
    if (paceQ && answers[paceQ.id]) {
      const paceIndex = answers[paceQ.id][0];
      pace = paceOptions[paceIndex] || 'moderate';
    }
    
    // Determine interests
    const interestsQ = questions.find(q => q.category === 'interests');
    let interests: string[] = [];
    
    if (interestsQ && answers[interestsQ.id]) {
      interests = answers[interestsQ.id].map(
        index => interestsQ.options[index].text
      );
    }
    
    // Build final travel preferences
    const travelPreferences: TravelPreferences = {
      pace,
      accommodation,
      interests,
      travelStyle,
      travellerType: travelerTypeMap[primaryStyle]
    };
    
    onComplete(travelPreferences);
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <Card 
      variant="elevated"
      className={cn("overflow-hidden", className)}
    >
      <CardContent className="p-0">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <motion.div
            className="h-full bg-[#ff5f1f]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="p-6">
          {/* Question Number */}
          <div className="flex justify-between mb-6">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            
            <button 
              className="text-sm text-[#ff5f1f] hover:text-[#e55214] flex items-center"
              title="Learn more about this question"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              <span>Help</span>
            </button>
          </div>
          
          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {currentQuestion.question}
              </h3>
              
              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, optionIndex) => {
                  const isSelected = answers[currentQuestion.id]?.includes(optionIndex);
                  
                  return (
                    <motion.div
                      key={optionIndex}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        'p-4 border rounded-lg cursor-pointer transition-colors',
                        isSelected
                          ? 'border-[#ff5f1f] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                      onClick={() => handleOptionSelect(optionIndex)}
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            'w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0',
                            isSelected
                              ? 'bg-[#ff5f1f] border-[#ff5f1f] text-white'
                              : 'border-gray-300'
                          )}
                        >
                          {isSelected && (
                            currentQuestion.allowMultiple 
                              ? <Check className="h-3 w-3" />
                              : <Heart className="h-3 w-3" />
                          )}
                        </div>
                        <span className={cn(
                          'ml-3 text-base',
                          isSelected ? 'text-[#ff5f1f] font-medium' : 'text-gray-700'
                        )}>
                          {option.text}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Multi-select note */}
              {currentQuestion.allowMultiple && (
                <p className="text-sm text-gray-500 mb-6 flex items-center">
                  <AlignLeft className="h-4 w-4 mr-1" />
                  You can select multiple options for this question
                </p>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={isFirstQuestion}
                  iconLeft={ArrowLeft}
                >
                  Back
                </Button>
                
                <Button
                  onClick={nextQuestion}
                  disabled={isNextDisabled()}
                  iconRight={isLastQuestion ? CheckCircle2 : ArrowRight}
                >
                  {isLastQuestion ? 'Complete' : 'Next'}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelStyleQuiz; 