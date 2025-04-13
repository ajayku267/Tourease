'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Clock, Tag, Globe, Plus, Check, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

// Popular destinations for quick selection
const popularDestinations = [
  { id: 'paris', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8' },
  { id: 'nyc', name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620' },
  { id: 'rome', name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9' },
]

interface NewTripModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewTripModal({ isOpen, onClose }: NewTripModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    tripType: 'leisure',
    notes: '',
    image: ''
  })
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestination(destinationId)
    const selected = popularDestinations.find(d => d.id === destinationId)
    if (selected) {
      setFormData(prev => ({ 
        ...prev, 
        destination: `${selected.name}, ${selected.country}`,
        image: selected.image
      }))
    }
  }
  
  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Please enter a trip title'
      }
      if (!formData.destination.trim()) {
        newErrors.destination = 'Please enter a destination'
      }
    }
    
    if (step === 2) {
      if (!formData.startDate) {
        newErrors.startDate = 'Please select a start date'
      }
      if (!formData.endDate) {
        newErrors.endDate = 'Please select an end date'
      } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after the start date'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1)
    }
  }
  
  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      // Here is where you would typically send the data to your backend
      console.log('New trip created:', formData)
      
      // For this demo, just close the modal
      onClose()
      
      // Reset form state
      setStep(1)
      setFormData({
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        travelers: 1,
        tripType: 'leisure',
        notes: '',
        image: ''
      })
      setSelectedDestination(null)
      setErrors({})
    }
  }
  
  // Calculate how many days the trip will last
  const calculateTripDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 0
  }
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }
  }
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }
  
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 my-8 max-h-[90vh] overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-bold text-gray-900">Create New Trip</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Step Progress */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div 
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step >= stepNumber 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div 
                        className={`w-20 h-1 mx-2 ${
                          step > stepNumber ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                <span>Trip Details</span>
                <span className="ml-10">Dates</span>
                <span>Review</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <AnimatePresence mode="wait">
                  {/* Step 1: Trip Details */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={stepVariants}
                    >
                      <div className="space-y-5">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Trip Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Summer Vacation, Business Trip to Tokyo"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                              errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.title && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.title}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                            Destination
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="text"
                              id="destination"
                              name="destination"
                              value={formData.destination}
                              onChange={handleInputChange}
                              placeholder="Where are you going?"
                              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                                errors.destination ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          {errors.destination && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.destination}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Popular Destinations
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {popularDestinations.map((destination) => (
                              <div 
                                key={destination.id}
                                onClick={() => handleDestinationSelect(destination.id)}
                                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                                  selectedDestination === destination.id
                                    ? 'border-primary shadow-md scale-[1.02]'
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                              >
                                <div className="relative h-24">
                                  <PlaceholderImage
                                    src={destination.image}
                                    alt={destination.name}
                                    width={150}
                                    height={100}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                                    <p className="text-sm font-semibold leading-tight">{destination.name}</p>
                                    <p className="text-xs opacity-80">{destination.country}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="tripType" className="block text-sm font-medium text-gray-700 mb-1">
                            Trip Type
                          </label>
                          <select
                            id="tripType"
                            name="tripType"
                            value={formData.tripType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          >
                            <option value="leisure">Leisure</option>
                            <option value="business">Business</option>
                            <option value="family">Family</option>
                            <option value="adventure">Adventure</option>
                            <option value="honeymoon">Honeymoon</option>
                            <option value="educational">Educational</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Travelers
                          </label>
                          <input
                            type="number"
                            id="travelers"
                            name="travelers"
                            min="1"
                            max="20"
                            value={formData.travelers}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 2: Dates */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={stepVariants}
                    >
                      <div className="space-y-5">
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="date"
                              id="startDate"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleInputChange}
                              min={new Date().toISOString().split('T')[0]}
                              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                                errors.startDate ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          {errors.startDate && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.startDate}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="date"
                              id="endDate"
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleInputChange}
                              min={formData.startDate || new Date().toISOString().split('T')[0]}
                              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                                errors.endDate ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          {errors.endDate && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.endDate}
                            </p>
                          )}
                        </div>
                        
                        {formData.startDate && formData.endDate && !errors.endDate && (
                          <div className="bg-blue-50 rounded-lg p-4 flex items-start">
                            <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-blue-800 font-medium">Trip Duration</p>
                              <p className="text-blue-600 text-sm">
                                Your trip will last for <strong>{calculateTripDuration()}</strong> days
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                            Notes (Optional)
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Any additional details or notes about this trip..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          ></textarea>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 3: Review */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={stepVariants}
                    >
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Trip Summary</h3>
                        
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                          {formData.image ? (
                            <div className="h-48 relative">
                              <PlaceholderImage
                                src={formData.image}
                                alt={formData.destination}
                                width={600}
                                height={300}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h2 className="text-xl font-bold">{formData.title}</h2>
                                <p className="flex items-center text-white/90">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {formData.destination}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="h-48 bg-gray-100 flex items-center justify-center">
                              <Globe className="h-12 w-12 text-gray-300" />
                            </div>
                          )}
                          
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm text-gray-500">Trip Type</p>
                                <p className="font-medium capitalize">{formData.tripType}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Travelers</p>
                                <p className="font-medium">{formData.travelers} {formData.travelers === 1 ? 'Person' : 'People'}</p>
                              </div>
                            </div>
                            
                            <div className="border-t pt-3">
                              <div className="flex items-center mb-2">
                                <Calendar className="h-4 w-4 text-primary mr-2" />
                                <p className="font-medium text-gray-900">Dates</p>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm text-gray-500">Departure</p>
                                  <p className="font-medium">
                                    {formData.startDate 
                                      ? new Date(formData.startDate).toLocaleDateString('en-US', { 
                                          month: 'short', day: 'numeric', year: 'numeric' 
                                        }) 
                                      : '-'}
                                  </p>
                                </div>
                                <div className="border-b border-dashed border-gray-300 w-12 h-0"></div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-500">Return</p>
                                  <p className="font-medium">
                                    {formData.endDate 
                                      ? new Date(formData.endDate).toLocaleDateString('en-US', { 
                                          month: 'short', day: 'numeric', year: 'numeric' 
                                        }) 
                                      : '-'}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 text-center">
                                <p className="text-sm bg-primary/10 text-primary rounded-full px-3 py-1 inline-block">
                                  {calculateTripDuration()} days
                                </p>
                              </div>
                            </div>
                            
                            {formData.notes && (
                              <div className="border-t pt-3">
                                <p className="text-sm text-gray-500 mb-1">Notes</p>
                                <p className="text-sm">{formData.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 rounded-lg p-4 text-sm">
                          <p className="text-yellow-800 font-medium mb-1">Ready to create your trip?</p>
                          <p className="text-yellow-700">
                            You'll be able to customize your itinerary, add activities, and manage your travel budget after creating this trip.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Footer actions */}
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Create Trip
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 