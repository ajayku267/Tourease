"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const StepIndicator = ({ steps, currentStep, className }: StepIndicatorProps) => {
  return (
    <div className={cn('mb-8', className)}>
      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="flex justify-between">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                    isActive
                      ? 'bg-[#ff5f1f] text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isActive
                      ? 'text-[#ff5f1f]'
                      : isCompleted
                      ? 'text-green-600'
                      : 'text-gray-500'
                  )}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="relative mt-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#ff5f1f] -translate-y-1/2 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
            }}
          />
        </div>
      </div>
      
      {/* Mobile View */}
      <div className="sm:hidden flex items-center justify-between">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <React.Fragment key={step.id}>
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                    isActive
                      ? 'bg-[#ff5f1f] text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <StepIcon className="h-4 w-4" />
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      'h-0.5 w-4',
                      index < currentStep - 1 ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        <div className="ml-3">
          <span className="text-sm font-medium text-gray-900">
            Step {currentStep} of {steps.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator; 