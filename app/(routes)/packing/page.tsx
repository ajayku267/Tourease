"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import { PackingChecklist } from '@/components/features/packing/PackingChecklist';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Briefcase, Share2 } from 'lucide-react';
import { Sun, Cloud, CloudRain, Snowflake, Umbrella, Wind } from "lucide-react";

// Create a proper select component wrapper
const SelectField = ({ label, options, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default function PackingPage() {
  const [tripType, setTripType] = useState('beach');
  const [climate, setClimate] = useState('warm');
  const [duration, setDuration] = useState(7);
  const [showSettings, setShowSettings] = useState(true);
  
  const tripTypeOptions = [
    { value: 'beach', label: 'Beach Vacation' },
    { value: 'city', label: 'City Break' },
    { value: 'hiking', label: 'Hiking/Outdoor' },
    { value: 'business', label: 'Business Trip' },
    { value: 'winter', label: 'Winter Sports' },
  ];
  
  const climateOptions = [
    { value: 'warm', label: 'Warm/Hot' },
    { value: 'mild', label: 'Mild/Temperate' },
    { value: 'cold', label: 'Cold' },
    { value: 'rainy', label: 'Rainy/Humid' },
    { value: 'mixed', label: 'Mixed Climate' },
  ];
  
  const regenerateList = () => {
    // Force a re-render of the component
    setShowSettings(false);
    setTimeout(() => setShowSettings(true), 10);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Smart Packing List
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Never forget essential items again. Our AI-powered packing checklist customizes to your trip type, 
            destination climate, and duration to ensure you pack exactly what you need.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-[#ff5f1f]" />
                  <span>Trip Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <SelectField
                    label="Trip Type"
                    options={tripTypeOptions}
                    value={tripType}
                    onChange={setTripType}
                  />
                  
                  <SelectField
                    label="Climate"
                    options={climateOptions}
                    value={climate}
                    onChange={setClimate}
                  />
                  
                  <div className="space-y-2">
                    <label htmlFor="duration" className="text-sm font-medium text-gray-700">
                      Trip Duration (days)
                    </label>
                    <Input
                      id="duration"
                      type="number"
                      value={duration.toString()}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 7)}
                      min="1"
                      max="30"
                    />
                  </div>
                  
                  <Button
                    onClick={regenerateList}
                    className="w-full"
                  >
                    Generate Packing List
                  </Button>
                </div>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Packing Tips</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Roll clothes instead of folding to save space</li>
                    <li>• Pack heavier items at the bottom of your suitcase</li>
                    <li>• Use packing cubes to stay organized</li>
                    <li>• Place toiletries in a clear, waterproof bag</li>
                    <li>• Wear your bulkiest items during travel</li>
                  </ul>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center text-sm"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Packing List
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Packing List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {showSettings && (
              <PackingChecklist
                tripType={tripType}
                climate={climate}
                duration={duration}
              />
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 