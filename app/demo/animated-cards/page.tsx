'use client'

import { useState } from 'react'
import { TravelCard, DestinationCard, TourCard, ActivityCard } from '@/components/ui/TravelCard'
import { motion } from 'framer-motion'
import { HeroBackground } from '@/components/ui/AnimatedImageBackground'
import DestinationShowcase from '@/app/components/features/DestinationShowcase'
import FloatingBanner from '@/components/ui/FloatingBanner'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import Link from 'next/link'

// Sample data for featured destinations
const featuredDestinations = [
  {
    id: 1,
    title: 'Santorini Sunset Paradise',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    description: 'Experience the iconic blue domes and whitewashed buildings while enjoying breathtaking views of the Aegean Sea. Perfect for couples and photographers seeking magical sunsets.',
  },
  {
    id: 2,
    title: 'Ancient Temples of Kyoto',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    description: 'Immerse yourself in Japanese culture and history among hundreds of shrines and temples. Visit during cherry blossom season for an unforgettable experience.',
  },
  {
    id: 3,
    title: 'Majestic Machu Picchu',
    location: 'Cusco Region, Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    description: 'Discover the ancient Incan citadel set high in the Andes Mountains. This UNESCO World Heritage site offers stunning architecture and mountain views that will take your breath away.',
  },
  {
    id: 4,
    title: 'Northern Lights Adventure',
    location: 'Reykjavik, Iceland',
    image: 'https://images.unsplash.com/photo-1579033462043-0f11a7862f7d',
    description: 'Witness one of nature\'s most spectacular displays as the aurora borealis lights up the Arctic sky. Best viewed during winter months in Iceland\'s pristine wilderness.',
  },
]

// Sample data for destinations
const destinations = [
  {
    id: 1,
    title: 'Santorini Island',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    rating: 4.9,
    reviewCount: 325,
    price: '$1,299',
    duration: '7 days',
  },
  {
    id: 2,
    title: 'Kyoto Gardens',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    rating: 4.8,
    reviewCount: 218,
    price: '$1,499',
    duration: '8 days',
  },
  {
    id: 3,
    title: 'Machu Picchu',
    location: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    rating: 4.9,
    reviewCount: 412,
    price: '$1,799',
    duration: '10 days',
  },
  {
    id: 4,
    title: 'Northern Lights',
    location: 'Iceland',
    image: 'https://images.unsplash.com/photo-1579033462043-0f11a7862f7d',
    rating: 4.7,
    reviewCount: 187,
    price: '$2,199',
    duration: '5 days',
  },
]

// Sample data for tours
const tours = [
  {
    id: 1,
    title: 'Sahara Desert Safari',
    location: 'Morocco',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    rating: 4.8,
    reviewCount: 156,
    price: '$349',
    duration: '2 days',
  },
  {
    id: 2,
    title: 'Venice Gondola Tour',
    location: 'Italy',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0',
    rating: 4.7,
    reviewCount: 203,
    price: '$89',
    duration: '3 hours',
  },
  {
    id: 3,
    title: 'Great Barrier Reef',
    location: 'Australia',
    image: 'https://images.unsplash.com/photo-1602002418082-dd4a3ec780a5',
    rating: 4.9,
    reviewCount: 312,
    price: '$249',
    duration: '1 day',
  },
  {
    id: 4,
    title: 'Safari Adventure',
    location: 'Kenya',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
    rating: 4.8,
    reviewCount: 275,
    price: '$499',
    duration: '3 days',
  },
]

// Sample data for activities
const activities = [
  {
    id: 1,
    title: 'Bali Swing Experience',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1',
    rating: 4.6,
    reviewCount: 189,
    price: '$45',
    duration: '3 hours',
  },
  {
    id: 2,
    title: 'Scuba Diving Lesson',
    location: 'Thailand',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    rating: 4.8,
    reviewCount: 245,
    price: '$120',
    duration: '5 hours',
  },
  {
    id: 3,
    title: 'Mountain Helicopter Tour',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    rating: 4.9,
    reviewCount: 178,
    price: '$299',
    duration: '1.5 hours',
  },
  {
    id: 4,
    title: 'Hot Air Balloon Ride',
    location: 'Turkey',
    image: 'https://images.unsplash.com/photo-1520003027878-ced190186407',
    rating: 4.7,
    reviewCount: 201,
    price: '$185',
    duration: '2 hours',
  },
]

// Sample gallery images
const galleryImages = [
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
  'https://images.unsplash.com/photo-1576204356751-5a7967149760',
  'https://images.unsplash.com/photo-1554254464-7046778097bf',
  'https://images.unsplash.com/photo-1534865264575-05572f3ba389',
  'https://images.unsplash.com/photo-1577639073870-c68bb3dd05f9',
  'https://images.unsplash.com/photo-1608460143763-6f41269f3270',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
  'https://images.unsplash.com/photo-1576019623848-6881f4b3037f',
  'https://images.unsplash.com/photo-1617880860458-8e5c9ee76543',
];

export default function AnimatedCardsDemo() {
  const [activeTab, setActiveTab] = useState<'destinations' | 'tours' | 'activities'>('destinations')
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating banner */}
      <FloatingBanner 
        title="Limited Time Offer!"
        description="Get 15% off on all international bookings with code EXPLORE15"
        ctaText="Book Now"
        ctaLink="/booking"
        showAfterScroll={600}
        theme="gradient"
        image="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=80&h=80&fit=crop"
      />
      
      {/* Hero Section */}
      <HeroBackground
        src="https://images.unsplash.com/photo-1556575157-75a0d60e4835"
        alt="Travel the world"
      >
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center h-full">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Discover the World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-white/90 max-w-xl mb-8"
          >
            Explore amazing destinations, tours, and activities with our animated cards.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              href="/"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors shadow-lg"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </HeroBackground>
      
      {/* Featured Destinations Showcase */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">Featured Destinations</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover our handpicked selection of breathtaking destinations. 
            Hover to pause the slideshow and explore at your own pace.
          </p>
        </motion.div>
        
        <DestinationShowcase 
          destinations={featuredDestinations} 
          className="shadow-2xl mb-16"
        />
      </div>
      
      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-10 bg-gray-50">
        <div className="flex justify-center mb-12">
          <div className="flex bg-white p-1 rounded-full shadow-md">
            {(
              [
                { id: 'destinations', label: 'Destinations' },
                { id: 'tours', label: 'Tours' },
                { id: 'activities', label: 'Activities' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2 rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-primary rounded-full"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activeTab === 'destinations' && destinations.map((item, index) => (
            <DestinationCard
              key={item.id}
              title={item.title}
              location={item.location}
              image={item.image}
              rating={item.rating}
              reviewCount={item.reviewCount}
              price={item.price}
              duration={item.duration}
              href={`/destinations/${item.id}`}
              index={index}
            />
          ))}
          
          {activeTab === 'tours' && tours.map((item, index) => (
            <TourCard
              key={item.id}
              title={item.title}
              location={item.location}
              image={item.image}
              rating={item.rating}
              reviewCount={item.reviewCount}
              price={item.price}
              duration={item.duration}
              href={`/tours/${item.id}`}
              index={index}
            />
          ))}
          
          {activeTab === 'activities' && activities.map((item, index) => (
            <ActivityCard
              key={item.id}
              title={item.title}
              location={item.location}
              image={item.image}
              rating={item.rating}
              reviewCount={item.reviewCount}
              price={item.price}
              duration={item.duration}
              href={`/activities/${item.id}`}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Travel Gallery Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-3">Travel Moments</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Breathtaking snapshots from travelers around the world.
              Each image tells a unique story of adventure and discovery.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg h-64 md:h-80"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <PlaceholderImage
                  src={src}
                  alt={`Travel moment ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold">Amazing {index % 2 === 0 ? 'Landscape' : 'Destination'}</h3>
                    <p className="text-white/80 text-sm">Captured by a TourEase explorer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 