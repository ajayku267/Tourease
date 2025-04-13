'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PostCreator from '@/app/components/features/PostCreator'
import { motion } from "framer-motion";
import { Camera, MapPin, Calendar, Users, X, Plus } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)
  
  const handlePostCreated = (post: any) => {
    console.log('Post created:', post)
    setIsSuccess(true)
    
    // Redirect to feed page after showing success message
    setTimeout(() => {
      router.push('/feed')
    }, 2000)
  }
  
  const handleCancel = () => {
    router.push('/feed')
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {isSuccess ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-2xl mx-auto p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Created Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your travel post has been created and is now visible in the feed.
              </p>
              <p className="text-gray-500 text-sm">
                Redirecting to feed...
              </p>
            </div>
          ) : (
            <PostCreator
              onPostCreated={handlePostCreated}
              onCancel={handleCancel}
            />
          )}
        </div>
      </main>
    </div>
  )
} 