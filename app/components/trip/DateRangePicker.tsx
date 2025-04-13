"use client";

import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, differenceInDays, addDays } from 'date-fns';
import { Input } from '../ui/input';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: DateRangePickerProps) => {
  // Calculate trip duration
  const getTripDuration = () => {
    if (!startDate || !endDate) return null;
    
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = differenceInDays(end, start);
      
      if (days < 0) return null;
      if (days === 0) return '1 day';
      return `${days + 1} days`;
    } catch (error) {
      return null;
    }
  };
  
  // Calculate minimum end date based on start date
  const getMinEndDate = () => {
    if (!startDate) return '';
    return startDate;
  };
  
  // Get min date for start date
  const getMinStartDate = () => {
    try {
      return format(new Date(), 'yyyy-MM-dd');
    } catch (error) {
      return '';
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">When are you planning to go?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          icon={CalendarIcon}
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          min={getMinStartDate()}
        />
        <Input
          type="date"
          label="End Date"
          icon={CalendarIcon}
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          min={getMinEndDate()}
          disabled={!startDate}
        />
      </div>
      
      {getTripDuration() && (
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center text-blue-700">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">Trip Duration: {getTripDuration()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker; 