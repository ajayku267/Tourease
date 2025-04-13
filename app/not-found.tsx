'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 mx-auto bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6"
        >
          <MapPin className="h-12 w-12 text-red-500 dark:text-red-400" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Page Not Found</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Oops! It seems like you've wandered off the beaten path. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
} 