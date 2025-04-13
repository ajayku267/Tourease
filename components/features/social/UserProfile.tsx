'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  User, 
  MapPin, 
  Calendar, 
  Globe, 
  Heart, 
  Users, 
  Bookmark,
  Settings,
  PenSquare,
  Image as ImageIcon,
  Camera,
  MessageCircle
} from 'lucide-react'

interface Trip {
  id: string
  destination: string
  country: string
  image: string
  imageProps?: { sizes: string }
  startDate: string
  endDate: string
  saved?: boolean
}

interface Post {
  id: string
  title: string
  image: string
  imageProps?: { sizes: string }
  likes: number
  comments: number
  createdAt: string
}

interface UserData {
  id: string
  name: string
  username: string
  bio: string
  location: string
  avatar: string
  avatarProps?: { sizes: string }
  coverPhoto: string
  coverPhotoProps?: { sizes: string }
  joinedDate: string
  followers: number
  following: number
  trips: Trip[]
  posts: Post[]
}

interface UserProfileProps {
  userData: UserData
  isOwnProfile?: boolean
}

export default function UserProfile({ userData, isOwnProfile = false }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'trips' | 'posts' | 'saved'>('trips')
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Cover Photo Area */}
      <div className="relative w-full h-56 sm:h-64 md:h-80 rounded-b-lg overflow-hidden">
        <Image 
          src={userData.coverPhoto} 
          alt="Cover photo"
          fill
          priority
          sizes={userData.coverPhotoProps?.sizes || "100vw"}
          className="object-cover"
        />
        
        {isOwnProfile && (
          <button className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition">
            <Camera size={20} />
          </button>
        )}
      </div>
      
      {/* Profile Header */}
      <div className="px-4 sm:px-6 relative -mt-16 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden bg-white relative">
              <Image 
                src={userData.avatar} 
                alt={userData.name}
                fill
                sizes={userData.avatarProps?.sizes || "(max-width: 640px) 96px, 128px"}
                className="object-cover"
              />
            </div>
            {isOwnProfile && (
              <button className="absolute bottom-1 right-1 bg-white/80 backdrop-blur-sm text-gray-800 p-1.5 rounded-full hover:bg-white transition">
                <Camera size={16} />
              </button>
            )}
          </div>
          
          {/* User Info & Stats */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                <p className="text-gray-600">@{userData.username}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  {userData.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {userData.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Joined {userData.joinedDate}
                  </span>
                </div>
              </div>
              
              {isOwnProfile ? (
                <Link href="/settings" className="shrink-0">
                  <button className="flex items-center gap-1.5 py-2 px-4 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition">
                    <Settings size={16} />
                    Edit Profile
                  </button>
                </Link>
              ) : (
                <button className="shrink-0 bg-[#ff5f1f] text-white flex items-center gap-1.5 py-2 px-6 rounded-full text-sm font-medium hover:bg-[#e55416] transition">
                  <Users size={16} />
                  Follow
                </button>
              )}
            </div>
            
            {/* Bio */}
            {userData.bio && (
              <p className="mt-4 text-gray-700">{userData.bio}</p>
            )}
            
            {/* Stats */}
            <div className="flex gap-4 mt-4">
              <div className="text-center">
                <p className="font-semibold text-gray-900">{userData.trips.length}</p>
                <p className="text-xs text-gray-500">Trips</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{userData.followers}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{userData.following}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('trips')} 
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'trips' 
                ? 'border-[#ff5f1f] text-[#ff5f1f]' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Globe size={16} />
              Trips
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('posts')} 
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'posts' 
                ? 'border-[#ff5f1f] text-[#ff5f1f]' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ImageIcon size={16} />
              Posts
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('saved')} 
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'saved' 
                ? 'border-[#ff5f1f] text-[#ff5f1f]' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Bookmark size={16} />
              Saved
            </span>
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="px-4 sm:px-0">
        {activeTab === 'trips' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.trips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
            
            {isOwnProfile && (
              <CreateNewCard
                href="/trips/new"
                icon={<Globe size={24} />}
                title="Plan a new trip"
              />
            )}
          </div>
        )}
        
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userData.posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            
            {isOwnProfile && (
              <CreateNewCard
                href="/posts/new"
                icon={<PenSquare size={24} />}
                title="Create a new post"
              />
            )}
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.trips
              .filter(trip => trip.saved)
              .map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
              
            {userData.trips.filter(trip => trip.saved).length === 0 && (
              <div className="col-span-3 py-12 text-center">
                <Bookmark size={40} className="mx-auto mb-3 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-700">No saved trips yet</h3>
                <p className="text-gray-500 mt-1">Trips you save will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface TripCardProps {
  trip: Trip
}

function TripCard({ trip }: TripCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/trips/${trip.id}`} className="block rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="relative h-40 rounded-lg overflow-hidden">
          <Image 
            src={trip.image} 
            alt={trip.destination}
            fill
            sizes={trip.imageProps?.sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            className="object-cover transition-transform group-hover:scale-110"
          />
          {trip.saved && (
            <div className="absolute top-2 right-2 bg-white p-1.5 rounded-full">
              <Heart 
                size={16} 
                className="text-[#ff5f1f]" 
                fill="#ff5f1f" 
              />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900">{trip.destination}</h3>
          <p className="text-sm text-gray-500">{trip.country}</p>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{trip.startDate} - {trip.endDate}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface PostCardProps {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/posts/${post.id}`} className="block rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="relative h-48 rounded-lg overflow-hidden">
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            sizes={post.imageProps?.sizes || "(max-width: 640px) 100vw, 50vw"}
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900">{post.title}</h3>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>{post.createdAt}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart size={14} />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={14} />
                {post.comments}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface CreateNewCardProps {
  href: string
  icon: React.ReactNode
  title: string
}

function CreateNewCard({ href, icon, title }: CreateNewCardProps) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center justify-center h-full min-h-40 p-6 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-center"
      >
        <div className="w-12 h-12 mb-3 rounded-full bg-white flex items-center justify-center text-[#ff5f1f]">
          {icon}
        </div>
        <h3 className="font-medium text-gray-900">{title}</h3>
      </motion.div>
    </Link>
  )
} 