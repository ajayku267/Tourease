import React from 'react';
import ImmersiveHero from '@/components/marketing/ImmersiveHero';
import ModernDestinationCard from '@/components/features/destinations/ModernDestinationCard';
import { motion } from 'framer-motion';

const destinations = [
  {
    title: 'Bali, Indonesia',
    description: 'Experience tropical paradise with pristine beaches, ancient temples, and vibrant culture.',
    imageUrl: '/images/destinations/bali.jpg',
    rating: 4.8,
    price: 'From $899',
    tags: ['Beach', 'Culture', 'Adventure'],
  },
  {
    title: 'Kyoto, Japan',
    description: 'Discover traditional Japanese architecture, serene gardens, and historic temples.',
    imageUrl: '/images/destinations/kyoto.jpg',
    rating: 4.9,
    price: 'From $1,299',
    tags: ['Culture', 'History', 'Food'],
  },
  {
    title: 'Santorini, Greece',
    description: 'Explore white-washed buildings, stunning sunsets, and crystal-clear waters.',
    imageUrl: '/images/destinations/santorini.jpg',
    rating: 4.7,
    price: 'From $1,199',
    tags: ['Romance', 'Beach', 'Luxury'],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen">
      <ImmersiveHero />
      
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Popular Destinations</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Discover handpicked destinations curated by our AI-powered recommendation system.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((destination) => (
            <motion.div key={destination.title} variants={item}>
              <ModernDestinationCard {...destination} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}