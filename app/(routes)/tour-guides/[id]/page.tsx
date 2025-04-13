'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, Globe, MapPin, MessageCircle, Phone, Send, Star, ThumbsUp, User, Heart, Share2, BookOpen, Camera, MapPinned, Award, Languages, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTourGuideById, getGuideReviews, addGuideReview, TourGuide, Review } from '@/app/services/tourGuideService';

// Import guide portrait images
import guidePortrait1 from '@/public/images/guides/portraits/guide-1.jpg';
import guidePortrait2 from '@/public/images/guides/portraits/guide-2.jpg';
import guidePortrait3 from '@/public/images/guides/portraits/guide-3.jpg';

// Hero Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export default function TourGuideDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [guide, setGuide] = useState<TourGuide | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // New review form state
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function loadGuideData() {
      try {
        setLoading(true);
        
        // Fetch guide details and reviews in parallel
        const [guideData, reviewsData] = await Promise.all([
          getTourGuideById(id),
          getGuideReviews(id)
        ]);
        
        setGuide(guideData);
        setReviews(reviewsData);
      } catch (err) {
        setError('Failed to load tour guide data. Please try again later.');
        console.error('Error loading tour guide data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadGuideData();
  }, [id]);

  useEffect(() => {
    // Log the image path for debugging
    if (guide) {
      const imagePath = getHeroImagePath(guide.location);
      console.log('Guide location:', guide.location);
      console.log('Image path calculated:', imagePath);
      console.log('Full image path:', imagePath);
    }
  }, [guide]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setSubmitError('Please enter a comment');
      return;
    }
    
    try {
      setSubmitting(true);
      setSubmitError(null);
      
      const newReview = await addGuideReview(id, { rating, comment });
      
      // Add the new review to the list and update the guide's rating
      setReviews((prev) => [newReview, ...prev]);
      if (guide) {
        setGuide({
          ...guide,
          rating: (guide.rating * reviews.length + rating) / (reviews.length + 1)
        });
      }
      
      // Reset form
      setComment('');
      setRating(5);
      setSubmitSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      setSubmitError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getGuidePortrait = (guideId: string) => {
    const portraits = [guidePortrait1, guidePortrait2, guidePortrait3];
    const index = parseInt(guideId) % 3;
    return portraits[index] || portraits[0];
  };

  const getHeroImagePath = (location: string): string => {
    // Extract the first part of the location (city name)
    const city = location.split(',')[0].toLowerCase().trim();
    
    // Map known cities to their image paths
    const cityImageMap: Record<string, string> = {
      'paris': '/images/guides/locations/paris.jpg',
      'tokyo': '/images/guides/locations/tokyo.jpg',
      'barcelona': '/images/guides/locations/barcelona.jpg',
      'madrid': '/images/guides/locations/mountain.jpg',
      'new delhi': '/images/guides/locations/santorini.jpg',
      'rome': '/images/guides/locations/paris.jpg',
      'bali': '/images/guides/locations/bali.jpg',
      'santorini': '/images/guides/locations/santorini.jpg'
    };
    
    // Return the matching image path or a default
    return cityImageMap[city] || '/images/guides/locations/default.jpg';
  };

  const getExpertiseImage = (expertise: string): string => {
    // Map expertise to related images
    const expertiseImageMap: Record<string, string> = {
      'Historical Tours': '/images/guides/locations/paris.jpg',
      'Cultural Experiences': '/images/guides/locations/santorini.jpg', 
      'Food Tours': '/images/guides/locations/tokyo.jpg',
      'Adventure Tours': '/images/guides/locations/bali.jpg',
      'Hiking': '/images/guides/locations/mountain.jpg',
      'Nature Tours': '/images/guides/locations/barcelona.jpg',
      'Cultural Heritage': '/images/guides/locations/paris.jpg',
      'Religious Sites': '/images/guides/locations/paris.jpg',
      'Art Tours': '/images/guides/locations/paris.jpg'
    };
    
    // Default fallback image
    return expertiseImageMap[expertise] || '/placeholders/tour-placeholder.jpg';
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-8 border-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-gray-500 animate-pulse text-lg">Finding your perfect guide...</p>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl border border-red-100">
          <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">
            <User className="h-10 w-10 text-red-500" stroke-width={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-red-700 mb-3">Guide Not Found</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{error || 'We couldn\'t find the tour guide you\'re looking for. They may have moved to a new adventure!'}</p>
          <Link href="/tour-guides">
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Explore All Guides
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getHeroImagePath(guide.location)}
            alt={guide.location}
            fill
            sizes="100vw"
            className="scale-110 transform-gpu object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80 z-10"></div>
        </div>
        
        {/* Guide Profile Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-20">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
              {/* Guide Portrait */}
              <motion.div 
                variants={fadeIn}
                className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
              >
                <Image
                  src={getGuidePortrait(guide.id)}
                  alt={guide.name}
                  fill
                  sizes="(max-width: 768px) 160px, 224px"
                  className="object-cover"
                />
                {guide.verified && (
                  <div className="absolute bottom-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-lg shadow-lg flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                )}
              </motion.div>
              
              {/* Guide Info */}
              <motion.div variants={fadeIn} className="text-white flex-1">
                <div className="flex items-center mb-2">
                  <h1 className="text-3xl md:text-5xl font-bold mr-4">{guide.name}</h1>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full ${isFavorite ? 'bg-red-500' : 'bg-white/20 backdrop-blur-md'} transition-colors duration-300`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'text-white fill-red-500' : 'text-white'}`} />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-md ml-2">
                    <Share2 className="h-5 w-5 text-white" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-bold">{guide.rating.toFixed(1)}</span>
                    <span className="text-white/80 text-sm ml-1">({reviews.length} reviews)</span>
                  </div>
                  
                  <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <MapPin className="h-4 w-4 text-white mr-1" />
                    <span>{guide.location}</span>
                  </div>
                  
                  <div className="hidden sm:flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4 text-white mr-1" />
                    <span>{guide.years_experience} years experience</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {guide.expertise.slice(0, 4).map((exp, index) => (
                    <motion.span
                      key={index}
                      variants={fadeIn}
                      className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium"
                    >
                      {exp}
                    </motion.span>
                  ))}
                  {guide.expertise.length > 4 && (
                    <motion.span
                      variants={fadeIn}
                      className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium"
                    >
                      +{guide.expertise.length - 4} more
                    </motion.span>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl shadow-lg hover:shadow-xl flex items-center"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book a Tour
                  </motion.button>
                  
                  <motion.a
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href={`mailto:${guide.email}`}
                    className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-colors duration-300 flex items-center"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Contact
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Curved bottom edge for hero section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 rounded-t-[50px] z-10"></div>
      </div>
      
      {/* Rest of the content */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - About and Availability */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 border border-gray-100"
              >
                <div className="bg-primary/10 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-2">
                  <Languages className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-gray-500 text-sm">Languages</h3>
                <p className="font-semibold">{guide.languages.length}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 border border-gray-100"
              >
                <div className="bg-orange-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="text-gray-500 text-sm">Experience</h3>
                <p className="font-semibold">{guide.years_experience} years</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 border border-gray-100"
              >
                <div className="bg-green-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-gray-500 text-sm">Hourly Rate</h3>
                <p className="font-semibold">${guide.hourly_rate}/hr</p>
              </motion.div>
            </div>
            
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-8 mb-8 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">About {guide.name}</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="whitespace-pre-line">{guide.bio}</p>
              </div>
            </motion.div>
            
            {/* Expertise Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-8 mb-8 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-2 rounded-full mr-3">
                  <Award className="h-5 w-5 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Expertise</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.expertise.map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-100 transition-all duration-300 hover:shadow-md hover:bg-white relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-5">
                      <Image 
                        src={getExpertiseImage(skill)}
                        alt={skill}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 relative z-10">{skill}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Availability Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-8 mb-8 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Availability</h2>
              </div>
              
              {guide.availability && guide.availability.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                  {guide.availability.map((date, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="bg-white bg-opacity-70 border border-green-200 rounded-lg p-3 text-center hover:bg-green-50 transition-colors cursor-pointer"
                    >
                      <div className="text-xs text-green-700 font-medium">
                        {typeof date === 'object' 
                          ? date.toLocaleDateString('en-US', { month: 'short' })
                          : new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-2xl font-bold text-green-800">
                        {typeof date === 'object'
                          ? date.getDate()
                          : new Date(date).getDate()}
                      </div>
                      <div className="text-xs text-green-600">
                        {typeof date === 'object'
                          ? date.toLocaleDateString('en-US', { weekday: 'short' })
                          : new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-orange-50 text-orange-700 rounded-lg p-4 text-center">
                  <p>No availability information provided at this time.</p>
                  <p className="text-sm mt-1">Please contact the guide directly for scheduling.</p>
                </div>
              )}
            </motion.div>
            
            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Reviews
                  </h2>
                </div>
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold text-yellow-700">{guide.rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm ml-1">({reviews.length})</span>
                </div>
              </div>
              
              {/* Review Form */}
              <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Share Your Experience</h3>
                
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">Your Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transform transition hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-gray-700 mb-2 font-medium">
                      Your Comment
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/80"
                      placeholder="Share your experience with this guide..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100">
                      <div className="flex items-center">
                        <div className="mr-2">⚠️</div>
                        {submitError}
                      </div>
                    </div>
                  )}
                  
                  {submitSuccess && (
                    <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg border border-green-100">
                      <div className="flex items-center">
                        <div className="mr-2">✅</div>
                        Your review has been submitted successfully!
                      </div>
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Review
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
              
              {/* Reviews List */}
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <motion.div 
                      key={review.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="relative bg-gradient-to-br from-orange-100 to-pink-100 rounded-full p-3 mr-3 w-12 h-12 overflow-hidden">
                            <Image 
                              src={getGuidePortrait(review.user_id.replace(/\D/g, ''))}
                              alt="User avatar" 
                              fill
                              sizes="48px"
                              className="rounded-full object-cover"
                            />
                            <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              Traveler {review.user_id.replace('user', '')}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-md shadow-sm">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-sm font-medium text-yellow-700">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <div className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>Helpful</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-100">
                  <div className="w-16 h-16 mx-auto bg-yellow-50 rounded-full flex items-center justify-center mb-4">
                    <Star className="h-8 w-8 text-yellow-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-4">Be the first to share your experience with {guide.name}!</p>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Right Column - Booking Widget */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-100 sticky top-24"
            >
              {/* Beautiful gradient header */}
              <div className="relative h-16 -mt-6 -mx-6 mb-6 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <h2 className="text-xl font-bold text-white">Book a Tour</h2>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary bg-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">Select Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="time"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary bg-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">Tour Duration</label>
                  <div className="relative">
                    <select className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary appearance-none bg-white">
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="6">6 hours</option>
                      <option value="8">Full day (8 hours)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">Number of People</label>
                  <div className="relative">
                    <select className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary appearance-none bg-white">
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6+">6+ people</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600">Guide fee</span>
                    <span className="font-medium text-gray-900">${guide.hourly_rate}/hour</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 mb-5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total (2 hours)</span>
                      <span className="font-bold text-gray-900 text-xl">${(guide.hourly_rate * 2).toFixed(2)}</span>
                    </div>
                    <p className="text-green-600 text-sm mt-1">Free cancellation up to 24 hours before</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Now
                </motion.button>
                
                <p className="text-xs text-gray-500 text-center">
                  No payment required until your tour is confirmed
                </p>
              </div>
              
              {/* Contact info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <span>{guide.phone}</span>
                  </div>
                  <a href={`tel:${guide.phone}`} className="text-primary hover:underline">Call</a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-700 truncate max-w-[80%]">
                    <MessageCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    <span className="truncate">{guide.email}</span>
                  </div>
                  <a href={`mailto:${guide.email}`} className="text-primary hover:underline">Email</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 