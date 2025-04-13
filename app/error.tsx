'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

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
          <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Something Went Wrong</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        
        {error.message && process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
            <p className="text-sm text-red-600 dark:text-red-400 font-mono">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-red-500 dark:text-red-300 cursor-pointer">View stack trace</summary>
                <pre className="mt-2 text-xs text-red-500 dark:text-red-300 overflow-auto max-h-32 p-2 bg-red-100 dark:bg-red-900/40 rounded">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <RefreshCcw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 