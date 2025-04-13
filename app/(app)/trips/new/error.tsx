"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-8">
            We encountered an error while creating your trip. Please try again.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={reset}
              className="px-6 py-2 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/trips"
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              Back to Trips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 