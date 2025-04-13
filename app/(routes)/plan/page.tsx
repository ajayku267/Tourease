"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, DollarSign, Plus, X } from "lucide-react";
import TripPlanner from '../../components/features/TripPlanner';

// Mock destinations data
const mockDestinations = [
  {
    id: "1",
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "2",
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "3",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
  }
];

const PlanPage = () => {
  const [tripCreated, setTripCreated] = useState(false);

  const handleTripCreated = (tripData: any) => {
    console.log('Trip created:', tripData);
    setTripCreated(true);
    // Here you would typically save the trip data to your backend
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Trip</h1>
            <p className="text-xl text-gray-600">
              Let's create a personalized travel plan that matches your preferences and budget
            </p>
          </div>

          {tripCreated ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trip Plan Created!</h2>
              <p className="text-gray-600 mb-6">
                Your trip plan has been created successfully. You can view and manage it in your profile.
              </p>
                            <button
                onClick={() => setTripCreated(false)}
                className="px-6 py-3 bg-[#ff5f1f] text-white rounded-lg hover:bg-[#e55214] transition-colors"
              >
                Create Another Trip
                            </button>
                </motion.div>
          ) : (
            <TripPlanner
              destinations={mockDestinations}
              onTripCreated={handleTripCreated}
            />
          )}
        </div>
      </main>
      </div>
  );
};

export default PlanPage; 