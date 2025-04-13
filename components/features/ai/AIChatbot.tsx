"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  X, 
  ChevronDown, 
  Bot,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Safely converts a Date object to a string representation
const safeDateString = (date: Date | string | number | null | undefined): string => {
  if (date === null || date === undefined) return '';
  
  try {
    // Convert to Date object if string or timestamp
    const dateObj = typeof date === 'string' || typeof date === 'number' 
      ? new Date(date) 
      : date;
    
    // Handle invalid dates
    if (isNaN(dateObj.getTime())) return '';
    
    // Convert to ISO string
    return dateObj.toISOString();
  } catch (error) {
    console.error('Error converting date to string:', error);
    return '';
  }
};

// Types
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

interface AIChatbotProps {
  initialPrompt?: string;
  className?: string;
}

const AIChatbot = ({ initialPrompt, className }: AIChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
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
  }, [messages.length]);
  
  // Process initial prompt if provided
  useEffect(() => {
    if (initialPrompt && messages.length === 1) {
      handleSendMessage(initialPrompt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt, messages.length]);
  
  // Generate a unique ID for messages
  const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
  };
  
  // Handle sending a message
  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: text,
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
        const aiResponse = mockAIResponse(text);
        
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
  
  // Mock AI response based on user input - in a real app this would call a real AI service
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
  
  // Handle voice input
  const toggleVoiceRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        // In a real app, you'd send the audio to a speech-to-text service
        // For this demo, we'll simulate text after a delay
        setTimeout(() => {
          const simulatedText = "Tell me about popular destinations in Europe";
          setInput(simulatedText);
        }, 1000);
        
        // Clean up media stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  // Format timestamp
  const formatTime = (date: string): string => {
    return date;
  };
  
  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className={cn(
          'fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#ff5f1f] text-white shadow-lg flex items-center justify-center z-50',
          isOpen && 'hidden'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              'fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col',
              className
            )}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#ff5f1f] text-white rounded-t-lg">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Travel Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[#e55214] rounded-full transition-colors"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[#e55214] rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg p-3 break-words',
                      message.role === 'user'
                        ? 'bg-[#ff5f1f] text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    )}
                  >
                    <div className="flex items-start mb-1">
                      <span className={cn(
                        'text-xs font-medium',
                        message.role === 'user' ? 'text-orange-100' : 'text-gray-500'
                      )}>
                        {message.role === 'user' ? 'You' : 'Travel Assistant'}
                      </span>
                      <span className={cn(
                        'text-xs ml-auto',
                        message.role === 'user' ? 'text-orange-100' : 'text-gray-500'
                      )}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={endOfMessagesRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleVoiceRecording}
                  className={cn(
                    'p-2 rounded-full',
                    isRecording 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                
                <label htmlFor="chatbot-input" className="sr-only">Chat message</label>
                <input
                  type="text"
                  id="chatbot-input"
                  name="chatbot-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about travel..."
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                />
                
                <Button
                  size="sm"
                  disabled={!input.trim() || isProcessing}
                  onClick={() => handleSendMessage()}
                  iconRight={Send}
                >
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot; 