'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Map, Calendar, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import TripCard from '@/components/ui/TripCard'
import NewTripModal from '@/app/components/features/NewTripModal'

// Sample trip data
const trips = [
  {
    id: 'trip1',
    title: 'Summer in Greece',
    destination: 'Santorini, Athens, Mykonos',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop',
    startDate: '2023-06-15',
    endDate: '2023-06-28',
    status: 'upcoming' as const,
    progress: 65,
  },
  {
    id: 'trip2',
    title: 'Japan Cherry Blossom Tour',
    destination: 'Tokyo, Kyoto, Osaka',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    startDate: '2023-04-05',
    endDate: '2023-04-18',
    status: 'completed' as const,
    progress: 100,
  },
  {
    id: 'trip3',
    title: 'Peru Adventure',
    destination: 'Lima, Cusco, Machu Picchu',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    startDate: '2023-09-10',
    endDate: '2023-09-20',
    status: 'planning' as const,
    progress: 30,
  },
  {
    id: 'trip4',
    title: 'Northern Lights Expedition',
    destination: 'Reykjavik, Iceland',
    image: 'https://images.unsplash.com/photo-1579033462043-0f11a7862f7d',
    startDate: '2023-11-25',
    endDate: '2023-12-05',
    status: 'planning' as const,
    progress: 15,
  },
  {
    id: 'trip5',
    title: 'Moroccan Desert Tour',
    destination: 'Marrakech, Sahara Desert',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3',
    startDate: '2023-10-12',
    endDate: '2023-10-22',
    status: 'upcoming' as const,
    progress: 50,
  },
  {
    id: 'trip6',
    title: 'Thailand Island Hopping',
    destination: 'Bangkok, Phuket, Phi Phi Islands',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
    startDate: '2023-07-18',
    endDate: '2023-08-01',
    status: 'completed' as const,
    progress: 100,
  }
];

type TripStatus = 'all' | 'planning' | 'upcoming' | 'completed'
type SortOption = 'date' | 'name' | 'progress'
type ViewMode = 'grid' | 'map'

export default function TripsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<TripStatus>('all')
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false)
  
  // Filter trips based on search query and status filter
  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  // Sort trips based on selected sort option
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title)
      case 'progress':
        return b.progress - a.progress
      case 'date':
      default:
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    }
  })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 md:mb-0"
          >
            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            <p className="text-gray-600 mt-1">Plan, manage, and relive your adventures</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <button
              onClick={() => setIsNewTripModalOpen(true)}
              className="flex items-center bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Trip
            </button>
          </motion.div>
        </div>
        
        {/* Filters and Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search trips by name or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            
            {/* Status Filter */}
            <div className="md:col-span-3">
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                {(['all', 'planning', 'upcoming', 'completed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`flex-1 py-1.5 px-2 text-sm rounded-md font-medium capitalize transition-colors ${
                      statusFilter === status
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort By */}
            <div className="md:col-span-3">
              <div className="relative inline-block w-full">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500 mr-2" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none bg-transparent w-full outline-none text-gray-700"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="progress">Sort by Progress</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="md:col-span-2">
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 flex justify-center items-center py-2 ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex-1 flex justify-center items-center py-2 ${
                    viewMode === 'map' ? 'bg-primary text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Trips Grid */}
        {viewMode === 'grid' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedTrips.length > 0 ? (
              sortedTrips.map((trip, index) => (
                <motion.div key={trip.id} variants={itemVariants}>
                  <Link href={`/trips/${trip.id}`}>
                    <TripCard
                      title={trip.title}
                      destination={trip.destination}
                      image={trip.image}
                      startDate={trip.startDate}
                      endDate={trip.endDate}
                      status={trip.status}
                      progress={trip.progress}
                    />
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                variants={itemVariants}
                className="col-span-full text-center py-16"
              >
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No trips found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery || statusFilter !== 'all'
                      ? "We couldn't find any trips matching your filters"
                      : "You haven't created any trips yet"}
                  </p>
                  <button
                    onClick={() => setIsNewTripModalOpen(true)}
                    className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create your first trip
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* Map View (placeholder) */}
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-4 min-h-[500px] flex items-center justify-center"
          >
            <div className="text-center">
              <Map className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Map View Coming Soon</h3>
              <p className="text-gray-600 max-w-md">
                We're working on an interactive map to visualize all your trips around the world.
                Stay tuned for this exciting feature!
              </p>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* New Trip Modal */}
      <NewTripModal 
        isOpen={isNewTripModalOpen} 
        onClose={() => setIsNewTripModalOpen(false)} 
      />
    </div>
  )
} 
