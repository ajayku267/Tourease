"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Phone, X, MapPin, User, Headphones, Info, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface EmergencySOSButtonProps {
  className?: string;
  variant?: "button" | "fab";
  emergencyContacts?: { name: string; phone: string }[];
  // Callback when user activates SOS
  onSOSActivated?: (location: Coordinates) => void;
}

export function EmergencySOSButton({
  className = "",
  variant = "button",
  emergencyContacts = [],
  onSOSActivated
}: EmergencySOSButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [localEmergencyNumber, setLocalEmergencyNumber] = useState('112'); // Default international emergency number

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          // Here you would ideally make an API call to determine local emergency numbers
          // based on the user's location - we're simplifying for the example
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Some features may be limited.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <>
      {/* SOS Button */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-red-500 text-white rounded-full shadow-lg p-4 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <AlertTriangle size={24} />
        <span className="sr-only">Emergency SOS</span>
      </motion.button>

      {/* Emergency Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex justify-between items-center">
                <div className="flex items-center text-white">
                  <AlertTriangle className="mr-2" />
                  <h2 className="text-xl font-bold">Emergency SOS</h2>
                </div>
                <button
                  className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Local Emergency Number */}
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                    <h3 className="font-semibold text-lg text-red-700 dark:text-red-300 mb-2 flex items-center">
                      <Phone size={18} className="mr-2" />
                      Local Emergency Number
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{localEmergencyNumber}</p>
                      <a
                        href={`tel:${localEmergencyNumber}`}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                      >
                        <Phone size={16} className="mr-2" />
                        Call Now
                      </a>
                    </div>
                  </div>

                  {/* Your Location */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                      <MapPin size={18} className="mr-2" />
                      Your Location
                    </h3>
                    {locationError ? (
                      <p className="text-red-500 dark:text-red-400">{locationError}</p>
                    ) : !location ? (
                      <p className="text-gray-500 dark:text-gray-400">Retrieving your location...</p>
                    ) : (
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          Latitude: {location.lat.toFixed(6)}<br />
                          Longitude: {location.lng.toFixed(6)}
                        </p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Open in Google Maps
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Emergency Contacts */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center">
                      <User size={18} className="mr-2" />
                      Emergency Contacts
                    </h3>
                    
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Tourist Police</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">English-speaking assistance</p>
                        </div>
                        <a
                          href="tel:+123456789"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Medical Emergency</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Ambulance service</p>
                        </div>
                        <a
                          href="tel:+123456789"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Travel Assistance */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="font-semibold text-lg flex items-center mb-3">
                      <Headphones size={18} className="mr-2" />
                      Travel Assistance
                    </h3>
                    
                    <div className="flex flex-col space-y-2">
                      <a
                        href="#"
                        className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <span className="flex items-center">
                          <Info size={16} className="mr-2 text-gray-600 dark:text-gray-300" />
                          Embassy Contact Information
                        </span>
                        <ExternalLink size={16} className="text-gray-600 dark:text-gray-300" />
                      </a>
                      
                      <a
                        href="#"
                        className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <span className="flex items-center">
                          <Info size={16} className="mr-2 text-gray-600 dark:text-gray-300" />
                          Travel Insurance Support
                        </span>
                        <ExternalLink size={16} className="text-gray-600 dark:text-gray-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 