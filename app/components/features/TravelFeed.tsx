'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  MapPin,
  Calendar,
  User,
  ChevronRight,
  ChevronLeft,
  Smile,
  Send
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Author {
  id: string
  name: string
  username: string
  avatar: string
  avatarProps?: { sizes: string }
}

interface Comment {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string
  authorAvatarProps?: { sizes: string }
  content: string
  createdAt: string
}

interface TravelPost {
  id: string
  author: Author
  location: string
  country: string
  images: string[]
  imagesProps?: { sizes: string }[]
  caption: string
  likes: number
  isLiked: boolean
  isSaved: boolean
  comments: Comment[]
  tags: string[]
  createdAt: string
}

interface TravelFeedProps {
  initialPosts?: TravelPost[]
  onLoadMore?: () => void
  isLoading?: boolean
  hasMore?: boolean
}

export default function TravelFeed({
  initialPosts = [],
  onLoadMore,
  isLoading = false,
  hasMore = true
}: TravelFeedProps) {
  const [posts, setPosts] = useState<TravelPost[]>(initialPosts)
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({})
  const [showReactions, setShowReactions] = useState<Record<string, boolean>>({})
  const commentInputRef = useRef<HTMLInputElement>(null)

  // This would fetch data from your backend in a real app
  useEffect(() => {
    setPosts(initialPosts)
    
    // Initialize active image index for each post
    const initialActiveImages: Record<string, number> = {}
    initialPosts.forEach(post => {
      initialActiveImages[post.id] = 0
    })
    setActiveImageIndex(initialActiveImages)
  }, [initialPosts])

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        }
      }
      return post
    }))
  }

  const toggleComments = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId)
    
    // Focus the comment input when opening comments section
    if (expandedPostId !== postId) {
      setTimeout(() => {
        commentInputRef.current?.focus()
      }, 300)
    }
  }

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorId: 'current-user',
      authorName: 'You',
      authorAvatar: '/placeholder-avatar.jpg',
      content: commentText,
      createdAt: 'Just now'
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        }
      }
      return post
    }))

    setCommentText('')
  }
  
  const toggleReactions = (postId: string) => {
    setShowReactions(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }
  
  const handleImageNext = (postId: string, imagesLength: number) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [postId]: (prev[postId] + 1) % imagesLength
    }))
  }
  
  const handleImagePrev = (postId: string, imagesLength: number) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [postId]: (prev[postId] - 1 + imagesLength) % imagesLength
    }))
  }
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, postId: string) => {
    if (e.key === 'Enter') {
      handleAddComment(postId)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 px-4 sm:px-0">Travel Feed</h1>
      
      <div className="space-y-6">
        {posts.map(post => (
          <motion.div 
            key={post.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <Link href={`/profile/${post.author.username}`} className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  {post.author.avatar ? (
                    <Image 
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin size={12} className="mr-1" />
                    {post.location}, {post.country}
                  </div>
                </div>
              </Link>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            {/* Post Image Carousel */}
            <div className="relative aspect-square bg-gray-100">
              {post.images.length > 1 && (
                <>
                  {/* Navigation arrows */}
                  <button 
                    onClick={() => handleImagePrev(post.id, post.images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-1.5 shadow-md text-gray-700 hover:bg-white/90"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => handleImageNext(post.id, post.images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-1.5 shadow-md text-gray-700 hover:bg-white/90"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Dots indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                    {post.images.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-1.5 rounded-full ${
                          activeImageIndex[post.id] === index ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Images */}
              <div className="relative h-full w-full overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`${post.id}-${activeImageIndex[post.id]}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={post.images[activeImageIndex[post.id] || 0]}
                      alt={`Travel post from ${post.author.name}`}
                      fill
                      sizes={post.imagesProps?.[0]?.sizes || "(max-width: 768px) 100vw, 600px"}
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Double tap to like */}
              <div 
                className="absolute inset-0 z-5"
                onDoubleClick={() => {
                  if (!post.isLiked) handleLike(post.id)
                  
                  // Show heart animation
                  const heartAnimation = document.createElement('div')
                  heartAnimation.innerHTML = `<svg class="w-24 h-24 text-white filter drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>`
                  heartAnimation.className = 'absolute inset-0 flex items-center justify-center animate-heart-beat'
                  const postEl = document.getElementById(`post-${post.id}`)
                  postEl?.appendChild(heartAnimation)
                  
                  setTimeout(() => {
                    postEl?.removeChild(heartAnimation)
                  }, 1000)
                }}
              />
            </div>
            
            {/* Post Actions */}
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <div className="flex gap-4">
                  <div className="relative">
                    <button 
                      onClick={() => handleLike(post.id)}
                      onDoubleClick={() => toggleReactions(post.id)}
                      className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : 'text-gray-700'}`}
                    >
                      <Heart size={20} className={post.isLiked ? 'fill-red-500' : ''} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    
                    {/* Reactions popup */}
                    <AnimatePresence>
                      {showReactions[post.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg border flex p-1 z-20"
                        >
                          {['❤️', '👍', '😍', '🔥', '👏'].map(emoji => (
                            <button 
                              key={emoji}
                              className="p-1.5 hover:bg-gray-100 rounded-full"
                              onClick={() => {
                                if (!post.isLiked) handleLike(post.id)
                                setShowReactions(prev => ({...prev, [post.id]: false}))
                              }}
                            >
                              <span className="text-lg">{emoji}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <button 
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1 text-gray-700"
                  >
                    <MessageCircle size={20} />
                    <span className="text-sm">{post.comments.length}</span>
                  </button>
                  <button className="text-gray-700 relative group">
                    <Share2 size={20} />
                    
                    {/* Share tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none">
                      <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        Share post
                      </div>
                      <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                    </div>
                  </button>
                </div>
                <button 
                  onClick={() => handleSave(post.id)}
                  className={`relative group ${post.isSaved ? 'text-blue-500' : 'text-gray-700'}`}
                >
                  <Bookmark size={20} className={post.isSaved ? 'fill-blue-500' : ''} />
                  
                  {/* Save tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full right-0 mb-2 pointer-events-none">
                    <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {post.isSaved ? 'Remove from saved' : 'Save post'}
                    </div>
                    <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute -bottom-1 right-2"></div>
                  </div>
                </button>
              </div>
              
              {/* Caption */}
              <div className="mb-2">
                <p className="text-gray-900">
                  <span className="font-medium">{post.author.name}</span>{' '}
                  {post.caption}
                </p>
              </div>
              
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {post.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="text-xs font-normal bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <Link href={`/tag/${tag}`}>#{tag}</Link>
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Date */}
              <p className="text-xs text-gray-500 mb-2">
                <Calendar size={12} className="inline-block mr-1" />
                {post.createdAt}
              </p>
              
              {/* View Comments Toggle */}
              {post.comments.length > 0 && expandedPostId !== post.id && (
                <button 
                  onClick={() => toggleComments(post.id)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  View all {post.comments.length} comments
                </button>
              )}
              
              {/* Comments Section */}
              <AnimatePresence>
                {expandedPostId === post.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="border-t pt-3 space-y-3">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex gap-2">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                            {comment.authorAvatar ? (
                              <Image 
                                src={comment.authorAvatar}
                                alt={comment.authorName}
                                fill
                                sizes={comment.authorAvatarProps?.sizes || "32px"}
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{comment.authorName}</span>{' '}
                              {comment.content}
                            </p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <p className="text-xs text-gray-500">{comment.createdAt}</p>
                              <button className="text-xs text-gray-500 hover:text-gray-700">Like</button>
                              <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Comment */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        <div className="flex-1 flex gap-2 relative">
                          <label htmlFor={`comment-${post.id}`} className="sr-only">Add a comment</label>
                          <input
                            type="text"
                            id={`comment-${post.id}`}
                            name={`comment-${post.id}`}
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, post.id)}
                            ref={commentInputRef}
                            className="flex-1 text-sm border border-gray-300 rounded-full px-3 py-1.5 pr-16 focus:outline-none focus:border-blue-400"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Smile size={18} />
                            </button>
                            <button
                              onClick={() => handleAddComment(post.id)}
                              disabled={!commentText.trim()}
                              className="text-blue-500 disabled:text-gray-300"
                            >
                              <Send size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Load More */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : 'Load More Posts'}
          </button>
        </div>
      )}
      
      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes heart-beat {
          0% { transform: scale(0); opacity: 0; }
          15% { transform: scale(1.2); opacity: 1; }
          30% { transform: scale(1); opacity: 1; }
          45% { transform: scale(1.1); opacity: 1; }
          60% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        
        .animate-heart-beat {
          animation: heart-beat 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
} 