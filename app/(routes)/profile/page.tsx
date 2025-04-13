"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Settings,
  Heart,
  Clock,
  LogOut,
  Edit2,
  Bell,
  Shield,
  Upload,
  CreditCard,
  Globe,
  Camera,
  MessageSquare,
  Share2
} from 'lucide-react';

import AIChatbot from '../../components/features/AIChatbot';
import UserProfile from '@/app/components/features/UserProfile';

// Define mock user data with imageProps for sizing
const mockUserData = {
  id: 'user1',
  name: 'Alex Johnson',
  username: 'travelalex',
  bio: 'Adventure seeker | Photographer | Coffee enthusiast | Exploring the world one country at a time',
  location: 'San Francisco, CA',
  avatar: '/images/profile-avatar.svg',
  avatarProps: { sizes: "128px" },
  coverPhoto: '/images/cover-photo.svg',
  coverPhotoProps: { sizes: "100vw" },
  joinedDate: 'January 2023',
  followers: 482,
  following: 267,
  trips: [
    {
      id: 'trip1',
      destination: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=500&auto=format&fit=crop',
      imageProps: { sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" },
      startDate: 'Mar 10, 2023',
      endDate: 'Mar 20, 2023',
      saved: true
    },
    {
      id: 'trip2',
      destination: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=500&auto=format&fit=crop',
      imageProps: { sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" },
      startDate: 'Jun 15, 2023',
      endDate: 'Jun 25, 2023'
    },
    {
      id: 'trip3',
      destination: 'Santorini',
      country: 'Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=500&auto=format&fit=crop',
      imageProps: { sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" },
      startDate: 'Sep 5, 2023',
      endDate: 'Sep 15, 2023',
      saved: true
    }
  ],
  posts: [
    {
      id: 'post1',
      title: 'Cherry Blossom Season in Tokyo',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=500&auto=format&fit=crop',
      imageProps: { sizes: "(max-width: 640px) 100vw, 50vw" },
      likes: 124,
      comments: 18,
      createdAt: 'Mar 18, 2023'
    },
    {
      id: 'post2',
      title: 'Sunset at Eiffel Tower',
      image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=500&auto=format&fit=crop',
      imageProps: { sizes: "(max-width: 640px) 100vw, 50vw" },
      likes: 89,
      comments: 12,
      createdAt: 'Jun 20, 2023'
    },
    {
      id: 'post3',
      title: 'Island Hopping in Greece',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=500&auto=format&fit=crop',
      imageProps: { sizes: "(max-width: 640px) 100vw, 50vw" },
      likes: 156,
      comments: 24,
      createdAt: 'Sep 12, 2023'
    }
  ]
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#ff5f1f] rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <UserProfile userData={mockUserData} isOwnProfile={true} />
          )}
        </div>
      </main>
    </div>
  );
} 