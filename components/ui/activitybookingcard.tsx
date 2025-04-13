"use client";

import { useState } from 'react';
import { Calendar, Clock, Users, Tag, Star, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface TourOption {
  id: string;
  name: string;
  duration: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  availableDates: string[];
  timeSlots: string[];
  features: string[];
}

interface ActivityBookingCardProps {
  destination: string;
  activities: TourOption[];
}

const ActivityBookingCard = ({ destination, activities }: ActivityBookingCardProps) => {
  const [selectedActivity, setSelectedActivity] = useState<string>(activities[0]?.id || '');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [participants, setParticipants] = useState<number>(2);
  const [expandedDetails, setExpandedDetails] = useState(false);
  
  const selectedTour = activities.find(activity => activity.id === selectedActivity);
  
  // Get the next 7 available dates
  const getAvailableDates = () => {
    if (!selectedTour) return [];
    
    return selectedTour.availableDates.map(dateStr => {
      const date = new Date(dateStr);
      return {
        value: dateStr,
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      };
    });
  };
  
  const handleBookNow = () => {
    if (!date || !timeSlot) {
      alert('Please select a date and time');
      return;
    }
    
    // In a real app, this would submit to a booking API
    console.log('Booking:', {
      activityId: selectedActivity,
      date,
      timeSlot,
      participants
    });
    
    // Show confirmation message (in a real app, you'd navigate to checkout)
    alert(`Your booking for ${selectedTour?.name} has been confirmed!`);
  };
  
  if (!selectedTour) {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
        <p>No activities available for booking.</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Book Activities in {destination}</h3>
        
        {/* Activity Selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select an activity
          </label>
          <select
            value={selectedActivity}
            onChange={e => {
              setSelectedActivity(e.target.value);
              setDate('');
              setTimeSlot('');
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#ff5f1f] focus:border-[#ff5f1f]"
          >
            {activities.map(activity => (
              <option key={activity.id} value={activity.id}>
                {activity.name} - ${activity.price} - {activity.duration}
              </option>
            ))}
          </select>
        </div>
        
        {/* Selected Activity Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">{selectedTour.name}</h4>
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-medium">{selectedTour.rating}</span>
              <span className="text-gray-500 ml-1">({selectedTour.reviewCount} reviews)</span>
            </div>
          </div>
          
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{selectedTour.duration}</span>
            <Tag className="h-4 w-4 ml-3 mr-1" />
            <span>${selectedTour.price} per person</span>
          </div>
          
          <div className={`mt-2 ${!expandedDetails && 'line-clamp-2'}`}>
            <p className="text-sm text-gray-600">{selectedTour.description}</p>
          </div>
          
          <button
            onClick={() => setExpandedDetails(!expandedDetails)}
            className="mt-2 text-[#ff5f1f] hover:text-[#e55214] text-sm font-medium flex items-center"
          >
            {expandedDetails ? 'Show less' : 'Show more'}
            {expandedDetails ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </button>
          
          {expandedDetails && (
            <div className="mt-3 border-t border-gray-200 pt-3">
              <h5 className="font-medium text-gray-900 text-sm mb-2">What's included:</h5>
              <ul className="grid grid-cols-2 gap-2">
                {selectedTour.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              Select a date
            </label>
            <select
              value={date}
              onChange={e => {
                setDate(e.target.value);
                setTimeSlot('');
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#ff5f1f] focus:border-[#ff5f1f]"
            >
              <option value="">Choose a date</option>
              {getAvailableDates().map(date => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Time Slot Selection */}
          {date && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Select a time
              </label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#ff5f1f] focus:border-[#ff5f1f]"
              >
                <option value="">Choose a time</option>
                {selectedTour.timeSlots.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Number of Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4 inline mr-1" />
              Number of participants
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setParticipants(Math.max(1, participants - 1))}
                className="p-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={participants}
                onChange={e => setParticipants(Math.max(1, parseInt(e.target.value) || 1))}
                className="p-2 w-16 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
              />
              <button
                onClick={() => setParticipants(participants + 1)}
                className="p-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        {/* Price Calculation */}
        {date && timeSlot && (
          <div className="mt-5 p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-700">{selectedTour.name}</span>
              <span className="text-gray-700">${selectedTour.price} × {participants}</span>
            </div>
            
            <div className="border-t border-blue-100 my-2 pt-2 flex justify-between items-center font-medium">
              <span>Total</span>
              <span className="text-lg">${selectedTour.price * participants}</span>
            </div>
            
            <div className="flex items-start mt-2 text-xs text-gray-600">
              <Info className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
              <p>Free cancellation up to 24 hours before the activity starts.</p>
            </div>
          </div>
        )}
        
        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          disabled={!date || !timeSlot}
          className={`mt-5 w-full py-3 rounded-md font-medium ${
            date && timeSlot
              ? 'bg-[#ff5f1f] text-white hover:bg-[#e55214]'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default ActivityBookingCard; 