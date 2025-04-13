'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Image as ImageIcon, 
  MapPin, 
  X, 
  Camera, 
  Upload, 
  Tag,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

interface PostCreatorProps {
  onPostCreated?: (post: any) => void
  onCancel?: () => void
}

export default function PostCreator({ onPostCreated, onCancel }: PostCreatorProps) {
  const [images, setImages] = useState<string[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [country, setCountry] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<'upload' | 'details'>('upload')
  
  // For file upload
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Mock countries for dropdown
  const countries = [
    'United States', 'Japan', 'France', 'Italy', 'Spain', 
    'Greece', 'Thailand', 'Indonesia', 'Australia', 'Mexico',
    'Peru', 'Brazil', 'United Kingdom', 'Germany', 'Netherlands',
    'Canada', 'South Africa', 'Egypt', 'China', 'India'
  ]
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    
    if (!files) return
    
    setIsUploading(true)
    
    // Create preview URLs for selected images
    const newPreviewUrls: string[] = []
    
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviewUrls.push(e.target.result as string)
          
          if (newPreviewUrls.length === files.length) {
            setPreviewUrls([...previewUrls, ...newPreviewUrls])
            // In a real app, you'd upload to a server and get back URLs
            // For now, we'll use the preview URLs as our "uploaded" images
            setImages([...images, ...newPreviewUrls])
            setIsUploading(false)
          }
        }
      }
      
      reader.readAsDataURL(file)
    })
  }
  
  const removeImage = (index: number) => {
    const newImages = [...images]
    const newPreviewUrls = [...previewUrls]
    
    newImages.splice(index, 1)
    newPreviewUrls.splice(index, 1)
    
    setImages(newImages)
    setPreviewUrls(newPreviewUrls)
  }
  
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }
  
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }
  
  const handleSubmit = () => {
    if (images.length === 0 || !caption || !location || !country) return
    
    setIsSubmitting(true)
    
    // Create a post object
    const post = {
      id: `post-${Date.now()}`,
      images,
      caption,
      location,
      country,
      tags,
      createdAt: new Date().toISOString()
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false)
      if (onPostCreated) onPostCreated(post)
      
      // Reset form
      setImages([])
      setPreviewUrls([])
      setCaption('')
      setLocation('')
      setCountry('')
      setTags([])
      setStep('upload')
    }, 1500)
  }
  
  const nextStep = () => {
    if (images.length > 0) {
      setStep('details')
    }
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-2xl mx-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a Travel Post</h1>
        
        <AnimatePresence mode="wait">
          {step === 'upload' ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {previewUrls.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                          <Image 
                            src={url}
                            alt={`Preview ${index + 1}`}
                            fill
                            sizes="(max-width: 640px) 50vw, 33vw"
                            className="object-cover"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg aspect-square hover:bg-gray-50 transition-colors"
                      >
                        <Camera size={24} className="text-gray-500 mb-2" />
                        <span className="text-sm text-gray-600">Add More</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
                    <h2 className="text-xl font-medium text-gray-900 mb-2">Upload Travel Photos</h2>
                    <p className="text-gray-600 mb-6">Share your travel experiences with the world</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-[#ff5f1f] text-white rounded-lg hover:bg-[#e55416] transition-colors flex items-center justify-center mx-auto"
                    >
                      <Upload size={20} className="mr-2" />
                      Select Photos
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                />
              </div>
              
              {isUploading && (
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#ff5f1f] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-gray-600">Uploading images...</p>
                </div>
              )}
              
              <div className="flex justify-between">
                <button
                  onClick={onCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={nextStep}
                  disabled={images.length === 0 || isUploading}
                  className="px-6 py-2 bg-[#ff5f1f] text-white rounded-lg hover:bg-[#e55416] transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  Next
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Image Preview (first image only) */}
              <div className="rounded-lg overflow-hidden aspect-video relative">
                <Image 
                  src={previewUrls[0]}
                  alt="Post preview"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              
              {/* Post Details Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
                    Caption
                  </label>
                  <textarea
                    id="caption"
                    rows={3}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Share your travel experience..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City or Place"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                      >
                        <option value="">Select a country</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <span 
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        #{tag}
                        <button onClick={() => removeTag(tag)} className="text-blue-500 hover:text-blue-700">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="tags"
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                        placeholder="Add tags (press Enter to add)"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={addTag}
                      disabled={!currentTag.trim()}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Add relevant tags to help others discover your post
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setStep('upload')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!caption || !location || !country || isSubmitting}
                  className="px-6 py-2 bg-[#ff5f1f] text-white rounded-lg hover:bg-[#e55416] transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                >
                  {isSubmitting && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                  )}
                  {isSubmitting ? 'Creating Post...' : 'Create Post'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 