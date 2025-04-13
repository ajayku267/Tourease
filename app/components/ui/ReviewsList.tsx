"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ThumbsUp, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface ReviewProps {
  id: string;
  user: {
    name: string;
    avatar: string;
    trips: number;
  };
  rating: number;
  date: string;
  title: string;
  text: string;
  helpful: number;
  images?: string[];
}

interface ReviewsListProps {
  destinationName: string;
  reviews: ReviewProps[];
}

const ReviewCard = ({ review }: { review: ReviewProps }) => {
  const [expanded, setExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [isHelpful, setIsHelpful] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount(helpfulCount + 1);
      setIsHelpful(true);
    } else {
      setHelpfulCount(helpfulCount - 1);
      setIsHelpful(false);
    }
  };

  // Truncate text if it's too long
  const isLongReview = review.text.length > 300;
  const displayText = !expanded && isLongReview
    ? `${review.text.substring(0, 300)}...`
    : review.text;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-5 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
          <Image
            src={review.user.avatar}
            alt={review.user.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-semibold text-gray-900">{review.user.name}</h3>
            <span className="text-sm text-gray-500 mt-1 sm:mt-0">{review.date}</span>
          </div>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">{review.user.trips} trips</span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h4 className="font-medium text-gray-900">{review.title}</h4>
        <p className="mt-2 text-gray-700">{displayText}</p>
        
        {isLongReview && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-[#ff5f1f] hover:text-[#e55214] text-sm font-medium flex items-center"
          >
            {expanded ? 'Show less' : 'Read more'}
            {expanded ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </button>
        )}
      </div>

      {review.images && review.images.length > 0 && (
        <div className="mt-3">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {(showAllImages ? review.images : review.images.slice(0, 3)).map((image, index) => (
              <div key={index} className="relative h-20 w-28 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            
            {!showAllImages && review.images.length > 3 && (
              <button
                onClick={() => setShowAllImages(true)}
                className="flex items-center justify-center h-20 w-28 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
              >
                +{review.images.length - 3} more
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center text-sm">
        <button
          onClick={handleHelpful}
          className={`flex items-center mr-4 ${
            isHelpful ? 'text-[#ff5f1f]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          Helpful ({helpfulCount})
        </button>
        <button className="flex items-center text-gray-500 hover:text-gray-700">
          <Flag className="h-4 w-4 mr-1" />
          Report
        </button>
      </div>
    </motion.div>
  );
};

const ReviewsList = ({ destinationName, reviews }: ReviewsListProps) => {
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');
  
  // Sort reviews based on selected criteria
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  // Count ratings by star
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Reviews for {destinationName}
          </h2>
          <div className="flex items-center mt-2">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-900 font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="flex items-center">
            <label htmlFor="sort-reviews" className="block text-sm font-medium text-gray-700 mr-2">
              Sort by:
            </label>
            <select
              id="sort-reviews"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#ff5f1f] focus:border-[#ff5f1f] text-sm"
            >
              <option value="newest">Newest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="md:grid md:grid-cols-4 gap-6 mb-8">
        <div className="hidden md:block md:col-span-1">
          <h3 className="font-medium text-gray-900 mb-3">Rating breakdown</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCounts[rating] || 0;
              const percentage = Math.round((count / reviews.length) * 100) || 0;
              
              return (
                <div key={rating} className="flex items-center">
                  <div className="flex items-center w-16">
                    <span className="text-sm text-gray-700 mr-1">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2 mr-2">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-12">{count}</span>
                </div>
              );
            })}
          </div>

          <button className="mt-6 px-4 py-2 border border-[#ff5f1f] text-[#ff5f1f] font-medium rounded-md hover:bg-[#ff5f1f] hover:text-white transition-colors w-full flex items-center justify-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Write a review
          </button>
        </div>

        <div className="md:col-span-3 space-y-4">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <div className="md:hidden mt-6">
        <button className="px-4 py-2 bg-[#ff5f1f] text-white font-medium rounded-md hover:bg-[#e55214] transition-colors w-full flex items-center justify-center">
          <MessageSquare className="h-4 w-4 mr-2" />
          Write a review
        </button>
      </div>
    </div>
  );
};

export default ReviewsList; 