"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Globe, Users, Clock, Briefcase, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { MapPin, Plus, X } from "lucide-react";

// Interfaces
interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  tripStyle: string;
  budget: string;
  interests: string[];
}

export default function NewTripPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TripFormData>({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 2,
    tripStyle: "balanced",
    budget: "medium",
    interests: []
  });

  const interestOptions = [
    "Sightseeing",
    "History & Culture",
    "Food & Dining",
    "Beaches",
    "Nature & Outdoors",
    "Shopping",
    "Adventure",
    "Nightlife",
    "Museums",
    "Local Experiences"
  ];

  const budgetOptions = [
    { value: "budget", label: "Budget", description: "Economical choices, hostels, street food" },
    { value: "medium", label: "Mid-range", description: "Comfortable hotels, casual restaurants" },
    { value: "luxury", label: "Luxury", description: "Premium accommodations and dining" }
  ];

  const tripStyleOptions = [
    { value: "relaxed", label: "Relaxed", description: "Take it slow, enjoy each location" },
    { value: "balanced", label: "Balanced", description: "Mix of activities and downtime" },
    { value: "active", label: "Active", description: "Packed schedule, see as much as possible" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (interest: string) => {
    setFormData(prev => {
      const interests = [...prev.interests];
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission, like saving to Firebase
    console.log("Trip data:", formData);
    // Redirect to dashboard or trip details page
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Plan a New Trip</h1>
            <p className="text-gray-600 mt-2">Let's create your perfect travel itinerary</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="w-full flex items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${step >= 1 ? 'bg-[#ff5f1f] text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div 
                    className="h-full bg-[#ff5f1f]" 
                    style={{ width: step > 1 ? '100%' : '0%' }}
                  ></div>
                </div>
              </div>
              <div className="w-full flex items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${step >= 2 ? 'bg-[#ff5f1f] text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div 
                    className="h-full bg-[#ff5f1f]" 
                    style={{ width: step > 2 ? '100%' : '0%' }}
                  ></div>
                </div>
              </div>
              <div className="w-full flex items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${step >= 3 ? 'bg-[#ff5f1f] text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-[#ff5f1f]' : 'text-gray-500'}>Destination</span>
              <span className={step >= 2 ? 'text-[#ff5f1f]' : 'text-gray-500'}>Preferences</span>
              <span className={step >= 3 ? 'text-[#ff5f1f]' : 'text-gray-500'}>Interests</span>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Destination & Dates */}
              {step === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Where and when?</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                        Destination
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="destination"
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff5f1f] focus:border-[#ff5f1f]"
                          placeholder="City, Country or Region"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                          Start Date
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff5f1f] focus:border-[#ff5f1f]"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                          End Date
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff5f1f] focus:border-[#ff5f1f]"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
                        Number of Travelers
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="travelers"
                          name="travelers"
                          min="1"
                          max="20"
                          value={formData.travelers}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff5f1f] focus:border-[#ff5f1f]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#ff5f1f] hover:bg-[#e55214] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5f1f]"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Trip Style & Budget */}
              {step === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Trip preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trip Style
                      </label>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {tripStyleOptions.map((option) => (
                          <div 
                            key={option.value}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.tripStyle === option.value 
                                ? 'border-[#ff5f1f] bg-orange-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, tripStyle: option.value }))}
                          >
                            <div className="flex items-center">
                              <Clock className={`h-5 w-5 ${formData.tripStyle === option.value ? 'text-[#ff5f1f]' : 'text-gray-400'}`} />
                              <span className="ml-2 font-medium">{option.label}</span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{option.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Level
                      </label>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {budgetOptions.map((option) => (
                          <div 
                            key={option.value}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.budget === option.value 
                                ? 'border-[#ff5f1f] bg-orange-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, budget: option.value }))}
                          >
                            <div className="flex items-center">
                              <DollarSign className={`h-5 w-5 ${formData.budget === option.value ? 'text-[#ff5f1f]' : 'text-gray-400'}`} />
                              <span className="ml-2 font-medium">{option.label}</span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{option.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5f1f]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#ff5f1f] hover:bg-[#e55214] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5f1f]"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Interests */}
              {step === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">What are you interested in?</h2>
                  <p className="text-gray-600 mb-4">Select all that apply. This helps us tailor your itinerary.</p>
                  
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {interestOptions.map((interest) => (
                      <div 
                        key={interest}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.interests.includes(interest) 
                            ? 'border-[#ff5f1f] bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInterestsChange(interest)}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestsChange(interest)}
                            className="h-4 w-4 text-[#ff5f1f] focus:ring-[#ff5f1f] border-gray-300 rounded"
                          />
                          <span className="ml-2">{interest}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5f1f]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#ff5f1f] hover:bg-[#e55214] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5f1f]"
                    >
                      Create Trip
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 