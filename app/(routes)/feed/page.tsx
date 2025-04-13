'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Menu, 
  Home, 
  Compass, 
  MessageCircle, 
  Bell, 
  User, 
  Plus,
  Calendar,
  Globe,
  Users,
  Map,
  X,
  RefreshCw,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TravelFeed from '@/components/features/social/TravelFeed'
import { TravelPost } from '@/components/features/social/TravelFeed'
import { generateRandomPost } from '@/lib/mock-data'

export default function FeedPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<TravelPost[]>([])
  const [hasError, setHasError] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  // This would be replaced with a real API call in a production app
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      setHasError(false)
      
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Generate 5 initial mock posts
        const initialPosts = Array.from({ length: 5 }, (_, i) => 
          generateRandomPost(`post-${i}`)
        )
        
        setPosts(initialPosts)
      } catch (error) {
        console.error("Error loading posts:", error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPosts()
  }, [])
  
  const handleLoadMore = async () => {
    if (loadingMore || loadedAll) return
    
    setLoadingMore(true)
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Random chance to have loaded all posts for demo purposes
      if (posts.length >= 15 || Math.random() > 0.7) {
        setLoadedAll(true)
        return
      }
      
      // Add 3 more mock posts
      const newPosts = Array.from({ length: 3 }, (_, i) =>
        generateRandomPost(`post-${posts.length + i}`)
      )
      
      setPosts(prev => [...prev, ...newPosts])
    } catch (error) {
      console.error("Error loading more posts:", error)
      // Show toast or error message (would be implemented in a real app)
    } finally {
      setLoadingMore(false)
    }
  }
  
  const handleRefresh = () => {
    // Reset states
    setPosts([])
    setLoadedAll(false)
    setIsLoading(true)
    setHasError(false)
    
    // Simulate network request
    setTimeout(() => {
      const refreshedPosts = Array.from({ length: 5 }, (_, i) => 
        generateRandomPost(`post-refresh-${i}`)
      )
      
      setPosts(refreshedPosts)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile top bar */}
      <div className="lg:hidden bg-white border-b px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-700"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="font-bold text-xl text-blue-600">TourEase</Link>
          <Link href="/profile" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User size={20} className="text-gray-500" />
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - desktop */}
        <div className="hidden lg:flex w-64 flex-col fixed h-full bg-white border-r">
          <div className="p-5 border-b">
            <Link href="/" className="font-bold text-2xl text-blue-600">TourEase</Link>
          </div>
          
          <nav className="flex-1 px-3 py-4 space-y-1">
            <Link href="/" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
              <Home size={20} className="mr-3" />
              <span>Home</span>
            </Link>
            <Link href="/explore" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
              <Compass size={20} className="mr-3" />
              <span>Explore</span>
            </Link>
            <Link href="/feed" className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
              <Globe size={20} className="mr-3" />
              <span>Feed</span>
            </Link>
            <Link href="/messages" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
              <MessageCircle size={20} className="mr-3" />
              <span>Messages</span>
            </Link>
            <Link href="/notifications" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell size={20} className="mr-3" />
              <span>Notifications</span>
            </Link>
            <Link href="/profile" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
              <User size={20} className="mr-3" />
              <span>Profile</span>
            </Link>
          </nav>
          
          <div className="p-4 border-t">
            <Button size="lg" className="w-full">
              <Plus size={18} className="mr-2" />
              New Post
            </Button>
          </div>
        </div>
        
        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {showMobileMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileMenu(false)}
                className="fixed inset-0 bg-black z-30 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl lg:hidden"
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <Link href="/" className="font-bold text-xl text-blue-600">TourEase</Link>
                  <button onClick={() => setShowMobileMenu(false)}>
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
                
                <nav className="flex-1 px-3 py-4 space-y-1">
                  <Link href="/" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                    <Home size={20} className="mr-3" />
                    <span>Home</span>
                  </Link>
                  <Link href="/explore" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                    <Compass size={20} className="mr-3" />
                    <span>Explore</span>
                  </Link>
                  <Link href="/feed" className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
                    <Globe size={20} className="mr-3" />
                    <span>Feed</span>
                  </Link>
                  <Link href="/messages" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                    <MessageCircle size={20} className="mr-3" />
                    <span>Messages</span>
                  </Link>
                  <Link href="/notifications" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                    <Bell size={20} className="mr-3" />
                    <span>Notifications</span>
                  </Link>
                  <Link href="/profile" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
                    <User size={20} className="mr-3" />
                    <span>Profile</span>
                  </Link>
                </nav>
                
                <div className="p-4 border-t">
                  <Button size="lg" className="w-full">
                    <Plus size={18} className="mr-2" />
                    New Post
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <div className="lg:ml-64 flex-1">
          <div className="max-w-4xl mx-auto p-4">
            {/* Header section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Travel Feed</h1>
                  <p className="text-gray-600">Discover amazing travel moments</p>
                </div>
                <button 
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className={`p-2 rounded-full hover:bg-gray-100 text-gray-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                </button>
              </div>
              
              <div className="mt-4 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  type="text"
                  placeholder="Search travel posts..."
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            
            {/* Feed content */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4">
                  <Loader2 size={40} className="text-blue-500 animate-spin" />
                </div>
                <p className="text-gray-600">Loading travel posts...</p>
              </div>
            ) : hasError ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="mb-4 text-red-500">
                  <X size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load feed</h3>
                <p className="text-gray-600 mb-6">We couldn't load the feed. Please try again later.</p>
                <Button onClick={handleRefresh}>
                  <RefreshCw size={16} className="mr-2" />
                  Try Again
                </Button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="mb-4 text-blue-500">
                  <Globe size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-6">Looks like there aren't any travel posts to show right now.</p>
                <Button onClick={handleRefresh}>Refresh Feed</Button>
              </div>
            ) : (
              <TravelFeed 
                initialPosts={posts} 
                onLoadMore={handleLoadMore} 
                isLoading={loadingMore}
                hasMore={!loadedAll}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around p-3 z-20">
        <Link href="/" className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/explore" className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600">
          <Compass size={24} />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        <Link href="/feed" className="flex flex-col items-center justify-center text-blue-600">
          <Globe size={24} />
          <span className="text-xs mt-1">Feed</span>
        </Link>
        <Link href="/messages" className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600">
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  )
} 