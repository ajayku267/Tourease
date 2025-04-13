"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, MapPin, Users, ArrowRight, Globe, Plane, Beach, Mountains, Building, Utensils, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Trip types with icons
const tripTypes = [
  { id: "beach", name: "Beach", icon: Beach, color: "bg-blue-100" },
  { id: "mountains", name: "Mountains", icon: Mountains, color: "bg-emerald-100" },
  { id: "city", name: "City", icon: Building, color: "bg-amber-100" },
  { id: "food", name: "Culinary", icon: Utensils, color: "bg-red-100" },
  { id: "cultural", name: "Cultural", icon: Globe, color: "bg-purple-100" },
  { id: "adventure", name: "Adventure", icon: Sparkles, color: "bg-indigo-100" },
];

// Popular destinations for quick selection
const popularDestinations = [
  { id: "paris", name: "Paris", country: "France", image: "/images/destinations/paris.jpg" },
  { id: "bali", name: "Bali", country: "Indonesia", image: "/images/destinations/bali.jpg" },
  { id: "tokyo", name: "Tokyo", country: "Japan", image: "/images/destinations/tokyo.jpg" },
  { id: "new-york", name: "New York", country: "USA", image: "/images/destinations/new-york.jpg" },
];

// Travel tips
const travelTips = [
  {
    title: "Pack Smart, Travel Light",
    content: "Roll clothes instead of folding to save space and prevent wrinkles."
  },
  {
    title: "Local Currency",
    content: "Notify your bank before traveling to avoid card blocks and get the best exchange rates."
  },
  {
    title: "Stay Connected",
    content: "Download offline maps and translation apps before your journey."
  },
  {
    title: "Immerse in Culture",
    content: "Learn a few basic phrases in the local language - locals appreciate the effort!"
  },
];

export function TripPlanningSection() {
  const [planningStep, setPlanningStep] = useState(1);
  const [selectedTripType, setSelectedTripType] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "2",
    budget: "mid",
    interests: [] as string[],
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setTripDetails(prev => ({ ...prev, [name]: value }));
  };
  
  // Quick select a popular destination
  const selectPopularDestination = (id: string, name: string) => {
    setSelectedDestination(id);
    setTripDetails(prev => ({ ...prev, destination: name }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlanningStep(prev => prev + 1);
  };
  
  // Reset form to start over
  const resetForm = () => {
    setPlanningStep(1);
    setSelectedTripType(null);
    setSelectedDestination(null);
    setTripDetails({
      destination: "",
      startDate: "",
      endDate: "",
      travelers: "2",
      budget: "mid",
      interests: [],
    });
    
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  
  // Show next travel tip
  const showNextTip = () => {
    setCurrentTip(prev => (prev + 1) % travelTips.length);
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
  
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        <Image 
          src="/images/world-map-outline.svg" 
          alt="World Map" 
          fill 
          className="object-contain opacity-10" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text font-semibold tracking-wider uppercase text-sm mb-2 inline-block">
            Your Journey Starts Here
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create your personalized travel itinerary with our interactive planning tool. 
            We'll help you craft a memorable journey tailored to your preferences.
          </p>
        </motion.div>
        
        {/* Trip planning wizard */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative z-10 max-w-4xl mx-auto">
          {/* Progress indicators */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    planningStep === step 
                      ? "bg-primary text-white" 
                      : planningStep > step
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-100 text-gray-400"
                  )}
                >
                  {planningStep > step ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div 
                    className={cn(
                      "h-1 w-16 mx-1",
                      planningStep > step ? "bg-primary/60" : "bg-gray-200"
                    )}
                  ></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Planning steps */}
          <AnimatePresence mode="wait">
            {planningStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-5 text-center">
                  What type of trip are you planning?
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {tripTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      onClick={() => setSelectedTripType(type.id)}
                      className={cn(
                        "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                        selectedTripType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      )}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={cn("p-3 rounded-full mb-2", type.color)}>
                        <type.icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="font-medium">{type.name}</span>
                    </motion.button>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={() => setPlanningStep(2)} 
                    className="px-8"
                    disabled={!selectedTripType}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}
            
            {planningStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-5 text-center">
                  Tell us about your trip
                </h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Destination input */}
                    <div>
                      <Label htmlFor="destination">Where would you like to go?</Label>
                      <div className="mt-1.5 relative">
                        <Input
                          id="destination"
                          name="destination"
                          value={tripDetails.destination}
                          onChange={handleInputChange}
                          placeholder="Enter city or country"
                          className="pl-9"
                          required
                        />
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    
                    {/* Popular destinations */}
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Quick select popular destinations:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {popularDestinations.map((dest) => (
                          <motion.button
                            key={dest.id}
                            type="button"
                            onClick={() => selectPopularDestination(dest.id, dest.name)}
                            className={cn(
                              "relative h-24 rounded-lg overflow-hidden group",
                              selectedDestination === dest.id ? "ring-2 ring-primary" : ""
                            )}
                            whileHover={{ y: -4 }}
                          >
                            <Image
                              src={dest.image}
                              alt={dest.name}
                              fill
                              className="object-cover brightness-75 group-hover:brightness-90 transition-all"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <span className="font-medium">{dest.name}</span>
                              <span className="text-xs opacity-90">{dest.country}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Date selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start date</Label>
                        <div className="mt-1.5 relative">
                          <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={tripDetails.startDate}
                            onChange={handleInputChange}
                            className="pl-9"
                            required
                          />
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="endDate">End date</Label>
                        <div className="mt-1.5 relative">
                          <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={tripDetails.endDate}
                            onChange={handleInputChange}
                            className="pl-9"
                            required
                          />
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Travelers and budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="travelers">Number of travelers</Label>
                        <div className="mt-1.5 relative">
                          <Select 
                            value={tripDetails.travelers} 
                            onValueChange={(value) => handleSelectChange("travelers", value)}
                          >
                            <SelectTrigger className="pl-9">
                              <SelectValue placeholder="Select number of travelers" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 traveler</SelectItem>
                              <SelectItem value="2">2 travelers</SelectItem>
                              <SelectItem value="3">3 travelers</SelectItem>
                              <SelectItem value="4">4 travelers</SelectItem>
                              <SelectItem value="5+">5+ travelers</SelectItem>
                            </SelectContent>
                          </Select>
                          <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Budget range</Label>
                        <RadioGroup 
                          value={tripDetails.budget}
                          onValueChange={(value) => handleSelectChange("budget", value)}
                          className="flex mt-1.5 space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="budget" id="budget" />
                            <Label htmlFor="budget" className="cursor-pointer">Budget</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mid" id="mid" />
                            <Label htmlFor="mid" className="cursor-pointer">Mid-range</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="luxury" id="luxury" />
                            <Label htmlFor="luxury" className="cursor-pointer">Luxury</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setPlanningStep(1)}
                    >
                      Back
                    </Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
                
                {/* Travel tips popover */}
                <Popover open={showTips} onOpenChange={setShowTips}>
                  <PopoverTrigger asChild>
                    <button 
                      className="absolute bottom-4 right-4 text-xs text-primary hover:text-primary/80 font-medium flex items-center"
                      onClick={() => setShowTips(true)}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Travel Tips
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                      <h4 className="font-medium mb-1">{travelTips[currentTip].title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{travelTips[currentTip].content}</p>
                      <button 
                        onClick={showNextTip}
                        className="text-xs text-primary hover:text-primary/80 font-medium"
                      >
                        Next Tip →
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </motion.div>
            )}
            
            {planningStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center"
              >
                <div className="mb-5">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your trip plan is ready!
                  </h3>
                  <p className="text-gray-600">
                    We've created a personalized itinerary based on your preferences.
                  </p>
                </div>
                
                {/* Trip summary */}
                <div className="bg-gray-50 rounded-lg p-5 mb-6 text-left">
                  <h4 className="font-medium text-gray-900 mb-3">Trip Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Destination:</span>
                      <span className="font-medium">{tripDetails.destination || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Trip type:</span>
                      <span className="font-medium">
                        {tripTypes.find(t => t.id === selectedTripType)?.name || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dates:</span>
                      <span className="font-medium">
                        {tripDetails.startDate && tripDetails.endDate 
                          ? `${tripDetails.startDate} to ${tripDetails.endDate}` 
                          : "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Travelers:</span>
                      <span className="font-medium">{tripDetails.travelers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Budget:</span>
                      <span className="font-medium capitalize">{tripDetails.budget}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Link href="/itinerary">
                    <Button className="w-full">
                      View Detailed Itinerary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={resetForm}
                  >
                    Create Another Trip
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Additional features */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            variants={itemVariants}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Flight Tracking</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get real-time updates on your flights, including delays, gate changes, and more.
            </p>
            <Link href="/flights" className="text-primary hover:text-primary/80 text-sm font-medium">
              Track Flights →
            </Link>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            variants={itemVariants}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Local Guides</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect with knowledgeable local guides who can show you hidden gems and local favorites.
            </p>
            <Link href="/guides" className="text-primary hover:text-primary/80 text-sm font-medium">
              Find Guides →
            </Link>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            variants={itemVariants}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Travel Calendar</h3>
            <p className="text-gray-600 text-sm mb-4">
              Organize your trip with our interactive calendar. Add events, bookings, and reservations.
            </p>
            <Link href="/calendar" className="text-primary hover:text-primary/80 text-sm font-medium">
              Open Calendar →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 