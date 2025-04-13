"use client";

import React from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { MapPin, Calendar, Activity, DollarSign, Info } from 'lucide-react';
import { Destination } from './DestinationSelector';
import Image from 'next/image';

interface TripData {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string[];
  budgetType?: string;
  customBudget?: string;
  notes?: string;
}

interface TripSummaryProps {
  tripData: TripData;
  destinations: Destination[];
}

const TripSummary = ({ tripData, destinations }: TripSummaryProps) => {
  const selectedDestination = destinations.find(d => d.id === tripData.destination);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return dateString;
  };
  
  const getActivityNames = (activityIds: string[]) => {
    if (!activityIds.length) return 'None selected';
    
    const activityMap: Record<string, string> = {
      'adventure': 'Adventure',
      'food': 'Food & Dining',
      'shopping': 'Shopping',
      'culture': 'Culture',
      'sightseeing': 'Sightseeing',
      'relaxation': 'Relaxation'
    };
    
    return activityIds.map(id => activityMap[id] || id).join(', ');
  };
  
  const getBudgetDisplay = () => {
    if (tripData.budgetType === 'custom' && tripData.customBudget) {
      return `$${tripData.customBudget} (total)`;
    }
    
    const budgetMap: Record<string, string> = {
      'budget': 'Budget (< $100/day)',
      'moderate': 'Moderate ($100-$300/day)',
      'luxury': 'Luxury (> $300/day)'
    };
    
    return budgetMap[tripData.budgetType || 'moderate'] || 'Not specified';
  };
  
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Trip Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          {selectedDestination && (
            <div className="w-full md:w-1/3 relative rounded-lg overflow-hidden h-48">
              <Image
                src={selectedDestination.image}
                alt={selectedDestination.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          )}
          
          <div className="w-full md:w-2/3 space-y-4">
            <SummaryItem 
              icon={<MapPin className="h-5 w-5 text-[#ff5f1f]" />}
              label="Destination"
              value={selectedDestination ? `${selectedDestination.name}, ${selectedDestination.country}` : 'Not selected'}
            />
            
            <SummaryItem 
              icon={<Calendar className="h-5 w-5 text-[#ff5f1f]" />}
              label="Dates"
              value={`${formatDate(tripData.startDate)} - ${formatDate(tripData.endDate)}`}
            />
            
            <SummaryItem 
              icon={<Activity className="h-5 w-5 text-[#ff5f1f]" />}
              label="Activities"
              value={getActivityNames(tripData.activities)}
            />
            
            <SummaryItem 
              icon={<DollarSign className="h-5 w-5 text-[#ff5f1f]" />}
              label="Budget"
              value={getBudgetDisplay()}
            />
            
            {tripData.notes && (
              <SummaryItem 
                icon={<Info className="h-5 w-5 text-[#ff5f1f]" />}
                label="Notes"
                value={tripData.notes}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface SummaryItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SummaryItem = ({ icon, label, value }: SummaryItemProps) => (
  <div className="flex items-start">
    <div className="mt-0.5 mr-3">{icon}</div>
    <div>
      <h4 className="font-medium text-gray-700">{label}</h4>
      <p className="text-gray-900">{value}</p>
    </div>
  </div>
);

export default TripSummary; 