"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { MapPinned, Utensils, ShoppingBag, Landmark, Camera, Waves } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const activities: Activity[] = [
  { id: 'adventure', name: 'Adventure', icon: <MapPinned className="h-5 w-5" /> },
  { id: 'food', name: 'Food & Dining', icon: <Utensils className="h-5 w-5" /> },
  { id: 'shopping', name: 'Shopping', icon: <ShoppingBag className="h-5 w-5" /> },
  { id: 'culture', name: 'Culture', icon: <Landmark className="h-5 w-5" /> },
  { id: 'sightseeing', name: 'Sightseeing', icon: <Camera className="h-5 w-5" /> },
  { id: 'relaxation', name: 'Relaxation', icon: <Waves className="h-5 w-5" /> },
];

interface ActivitySelectorProps {
  selectedActivities: string[];
  onToggleActivity: (activityId: string) => void;
}

const ActivitySelector = ({
  selectedActivities,
  onToggleActivity
}: ActivitySelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">What activities interest you?</h3>
      <p className="text-sm text-gray-600">Select all that interest you</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {activities.map((activity) => (
          <ActivityButton
            key={activity.id}
            activity={activity}
            isSelected={selectedActivities.includes(activity.id)}
            onToggle={() => onToggleActivity(activity.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface ActivityButtonProps {
  activity: Activity;
  isSelected: boolean;
  onToggle: () => void;
}

const ActivityButton = ({ activity, isSelected, onToggle }: ActivityButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={cn(
        'flex items-center p-4 border rounded-lg transition-all',
        isSelected 
          ? 'border-[#ff5f1f] bg-orange-50 text-[#ff5f1f]'
          : 'border-gray-200 hover:border-gray-300 text-gray-700'
      )}
    >
      <div className="mr-3">{activity.icon}</div>
      <span className="font-medium">{activity.name}</span>
    </motion.button>
  );
};

export default ActivitySelector; 