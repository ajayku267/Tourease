"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Activity,
  DollarSign, 
  ClipboardCheck,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import StepIndicator, { Step } from '../trip/StepIndicator';
import DestinationSelector, { Destination } from '../trip/DestinationSelector';
import DateRangePicker from '../trip/DateRangePicker';
import ActivitySelector from '../trip/ActivitySelector';
import BudgetSelector from '../trip/BudgetSelector';
import TripSummary from '../trip/TripSummary';

interface TripPlannerProps {
  destinations: Destination[];
  onTripCreated?: (trip: any) => void;
}

const TripPlanner = ({ destinations, onTripCreated }: TripPlannerProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: [] as string[],
    budgetType: 'moderate',
    customBudget: '',
    notes: ''
  });

  const steps: Step[] = [
    { id: 1, title: 'Destination', icon: MapPin },
    { id: 2, title: 'Dates', icon: Calendar },
    { id: 3, title: 'Activities', icon: Activity },
    { id: 4, title: 'Budget', icon: DollarSign },
    { id: 5, title: 'Review', icon: ClipboardCheck }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDestinationSelect = (destinationId: string) => {
    setTripData({ ...tripData, destination: destinationId });
  };

  const handleStartDateChange = (date: string) => {
    setTripData({ ...tripData, startDate: date });
    
    // If end date is before start date, reset it
    if (tripData.endDate && new Date(tripData.endDate) < new Date(date)) {
      setTripData(prev => ({ ...prev, endDate: date }));
    }
  };

  const handleEndDateChange = (date: string) => {
    setTripData({ ...tripData, endDate: date });
  };

  const handleToggleActivity = (activityId: string) => {
    setTripData(prev => {
      const activities = prev.activities.includes(activityId)
        ? prev.activities.filter(id => id !== activityId)
        : [...prev.activities, activityId];
      
      return { ...prev, activities };
    });
  };

  const handleBudgetTypeChange = (type: string) => {
    setTripData({ ...tripData, budgetType: type });
  };

  const handleCustomBudgetChange = (budget: string) => {
    setTripData({ ...tripData, customBudget: budget });
  };

  const handleSubmit = () => {
    if (onTripCreated) {
      onTripCreated(tripData);
    }
  };

  // Check if the current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!tripData.destination;
      case 2:
        return !!tripData.startDate && !!tripData.endDate;
      case 3:
        return tripData.activities.length > 0;
      case 4:
        return tripData.budgetType === 'custom' ? !!tripData.customBudget : true;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DestinationSelector
            destinations={destinations}
            selectedDestinationId={tripData.destination}
            onSelect={handleDestinationSelect}
          />
        );
      case 2:
        return (
          <DateRangePicker
            startDate={tripData.startDate}
            endDate={tripData.endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
        );
      case 3:
        return (
          <ActivitySelector
            selectedActivities={tripData.activities}
            onToggleActivity={handleToggleActivity}
          />
        );
      case 4:
        return (
          <BudgetSelector
            selectedBudgetType={tripData.budgetType}
            customBudget={tripData.customBudget}
            onBudgetTypeChange={handleBudgetTypeChange}
            onCustomBudgetChange={handleCustomBudgetChange}
          />
        );
      case 5:
        return (
          <TripSummary 
            tripData={tripData}
            destinations={destinations}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardContent className="p-6">
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            iconLeft={ArrowLeft}
          >
            Back
          </Button>
          
          {currentStep === steps.length ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
            >
              Create Trip Plan
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              iconRight={ArrowRight}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripPlanner; 