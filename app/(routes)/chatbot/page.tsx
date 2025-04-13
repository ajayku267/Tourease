"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Brain, Sparkles, Send, Mic, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn, safeDateString } from '../../lib/utils';

// Types
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Add initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: generateId(),
          content: "Hi! I'm your AI travel assistant. How can I help plan your trip today?",
          role: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
    
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages.length]);
  
  // Generate a unique ID for messages
  const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
  };
  
  // Handle sending a message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: input,
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // In a real app, this would call your AI service
      // For now, we'll simulate a response
      setTimeout(() => {
        const aiResponse = mockAIResponse(input);
        
        const assistantMessage: Message = {
          id: generateId(),
          content: aiResponse,
          role: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsProcessing(false);
    }
  };
  
  // Mock AI response based on user input
  const mockAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Basic pattern matching
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello! I'm your AI travel assistant. How can I help you today?";
    }
    
    if (lowerCaseMessage.includes('recommendation') || lowerCaseMessage.includes('suggest')) {
      return "Based on current trends, I recommend visiting Portugal. It offers excellent value, beautiful coastlines, historic cities, and amazing food. Would you like specific city recommendations or activities in Portugal?";
    }
    
    if (lowerCaseMessage.includes('budget') || lowerCaseMessage.includes('cost')) {
      return "When planning a budget, consider these categories: 1) Transportation (flights, local transit), 2) Accommodation, 3) Food & drinks, 4) Activities & sightseeing, 5) Shopping, and 6) Emergency fund. For a mid-range trip to Europe, budget around $150-$250 per day. Would you like a more detailed breakdown for a specific destination?";
    }
    
    if (lowerCaseMessage.includes('weather') || lowerCaseMessage.includes('climate')) {
      return "The best time to visit depends on your destination. Southeast Asia is best during dry season (November-April), Europe shines in late spring and early fall (May-June, September), while the Caribbean is perfect during winter (December-April). Would you like weather information for a specific location?";
    }
    
    if (lowerCaseMessage.includes('itinerary') || lowerCaseMessage.includes('plan')) {
      return "I'd be happy to help plan your itinerary! To get started, please tell me: 1) Where you'd like to go, 2) How many days you'll be traveling, 3) Your main interests (history, nature, food, etc.), and 4) Any specific must-see attractions.";
    }
    
    // Default response
    return "That's an interesting question about travel! Could you provide more details so I can give you a more specific answer? I can help with destination recommendations, itinerary planning, budgeting, or travel tips.";
  };
  
  // Format timestamp
  const formatTime = (date: string): string => {
    return date;
  };
  
  // Handle a suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="pt-20 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-[#ff5f1f]/10 p-3">
              <Brain className="h-10 w-10 text-[#ff5f1f]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Travel Assistant
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your personal AI travel companion. Ask questions about destinations, get itinerary suggestions, 
            or get help with any travel planning needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Features sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How I Can Help</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MessageSquare className="h-5 w-5 text-[#ff5f1f]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Destination Information</h3>
                    <p className="mt-1 text-sm text-gray-500">Get details about attractions, local customs, and travel tips for any location.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Sparkles className="h-5 w-5 text-[#ff5f1f]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Itinerary Planning</h3>
                    <p className="mt-1 text-sm text-gray-500">Get suggested itineraries based on your preferences and travel style.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Bot className="h-5 w-5 text-[#ff5f1f]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">24/7 Assistant</h3>
                    <p className="mt-1 text-sm text-gray-500">Ask questions anytime before or during your trip for instant guidance.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Suggested Questions</h3>
                <ul className="space-y-2 text-sm text-[#ff5f1f]">
                  <li 
                    className="cursor-pointer hover:text-[#e55214]"
                    onClick={() => handleSuggestedQuestion("What are the best attractions in Tokyo?")}
                  >
                    • What are the best attractions in Tokyo?
                  </li>
                  <li 
                    className="cursor-pointer hover:text-[#e55214]"
                    onClick={() => handleSuggestedQuestion("Create a 5-day itinerary for Paris")}
                  >
                    • Create a 5-day itinerary for Paris
                  </li>
                  <li 
                    className="cursor-pointer hover:text-[#e55214]"
                    onClick={() => handleSuggestedQuestion("What should I pack for a winter trip to Norway?")}
                  >
                    • What should I pack for a winter trip to Norway?
                  </li>
                  <li 
                    className="cursor-pointer hover:text-[#e55214]"
                    onClick={() => handleSuggestedQuestion("Best time to visit Bali")}
                  >
                    • Best time to visit Bali
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Chatbot container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md h-[600px] overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#ff5f1f] flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">TourEase AI</h3>
                    <p className="text-xs text-gray-500">Online • Ready to assist</p>
                  </div>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start",
                      message.role === "user" ? "justify-end" : ""
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-[#ff5f1f] flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2 max-w-[80%]",
                        message.role === "user"
                          ? "bg-[#ff5f1f] text-white"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    
                    {message.role === "user" && (
                      <div className="flex-shrink-0 ml-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-[#ff5f1f] flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={endOfMessagesRef} />
              </div>
              
              {/* Chat input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                  />
                  <Button
                    type="submit"
                    className="rounded-full p-2 bg-[#ff5f1f] text-white"
                    disabled={isProcessing || !input.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    className="rounded-full p-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 