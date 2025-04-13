"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

interface TripCardProps {
  id: number;
  destination: string;
  location: string;
  startDate: string;
  endDate: string;
  image?: string;
  travelers: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'planning';
}

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  planning: 'bg-purple-100 text-purple-800',
};

const statusLabels = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
  planning: 'Planning',
};

const TripCard = ({ 
  id, 
  destination, 
  location, 
  startDate, 
  endDate, 
  image, 
  travelers,
  status 
}: TripCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {/* Placeholder gradient if no image is provided */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-[#ff5f1f]/70" />
        
        {/* Image overlay with destination name */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h3 className="text-2xl font-bold text-white text-center drop-shadow-md">
            {destination}
          </h3>
        </div>
        
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              {location}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            {startDate} - {endDate}
          </p>
          
          <p className="text-sm flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1 text-gray-400" />
            {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}
          </p>
        </div>
        
        <div className={`mt-4 flex justify-end transform transition-transform duration-300 ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
          <Link
            href={`/trip/${id}`}
            className="inline-flex items-center text-sm font-medium text-[#ff5f1f] hover:text-[#e55214]"
          >
            View details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCard; 