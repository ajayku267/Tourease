"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { DollarSign } from 'lucide-react';
import { Input } from '../ui/input';

const budgetRanges = [
  { id: 'budget', name: 'Budget', icon: <DollarSign className="h-5 w-5" />, description: 'Less than $100/day' },
  { id: 'moderate', name: 'Moderate', icon: <><DollarSign className="h-5 w-5" /><DollarSign className="h-5 w-5" /></>, description: '$100-$300/day' },
  { id: 'luxury', name: 'Luxury', icon: <><DollarSign className="h-5 w-5" /><DollarSign className="h-5 w-5" /><DollarSign className="h-5 w-5" /></>, description: 'Over $300/day' },
];

interface BudgetSelectorProps {
  selectedBudgetType: string;
  customBudget: string;
  onBudgetTypeChange: (type: string) => void;
  onCustomBudgetChange: (budget: string) => void;
}

const BudgetSelector = ({
  selectedBudgetType,
  customBudget,
  onBudgetTypeChange,
  onCustomBudgetChange
}: BudgetSelectorProps) => {
  const [showCustom, setShowCustom] = useState(selectedBudgetType === 'custom');
  
  const handleBudgetTypeChange = (type: string) => {
    onBudgetTypeChange(type);
    setShowCustom(type === 'custom');
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">What's your budget?</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {budgetRanges.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            isSelected={selectedBudgetType === budget.id}
            onSelect={() => handleBudgetTypeChange(budget.id)}
          />
        ))}
      </div>
      
      <div className="mt-4 flex items-center">
        <button
          onClick={() => handleBudgetTypeChange(selectedBudgetType === 'custom' ? 'moderate' : 'custom')}
          className="flex items-center text-sm text-[#ff5f1f] hover:text-[#e55214]"
        >
          {selectedBudgetType === 'custom' ? 'Use preset budget ranges' : 'Specify a custom budget'}
        </button>
      </div>
      
      {showCustom && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <Input
            type="number"
            label="Total Budget (USD)"
            icon={DollarSign}
            placeholder="Enter your total budget"
            value={customBudget}
            onChange={(e) => onCustomBudgetChange(e.target.value)}
            min="1"
            helperText="Enter your estimated total budget for the trip"
          />
        </motion.div>
      )}
    </div>
  );
};

interface BudgetCardProps {
  budget: {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

const BudgetCard = ({ budget, isSelected, onSelect }: BudgetCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        'flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all text-center',
        isSelected 
          ? 'border-[#ff5f1f] bg-orange-50 text-[#ff5f1f]'
          : 'border-gray-200 hover:border-gray-300 text-gray-700'
      )}
    >
      <div className="flex mb-2">{budget.icon}</div>
      <h4 className="font-medium">{budget.name}</h4>
      <p className={`text-xs mt-1 ${isSelected ? 'text-[#ff7f4f]' : 'text-gray-500'}`}>
        {budget.description}
      </p>
    </motion.div>
  );
};

export default BudgetSelector; 