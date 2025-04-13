import Link from 'next/link';

export default function TripPlannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Trip Planner</h1>
        <p className="text-xl text-gray-600 mb-8">
          Plan your next adventure or create a new trip
        </p>
        
        <div className="grid grid-cols-1 gap-6 mt-8">
          <Link 
            href="/trip-planner/new" 
            className="flex items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <span className="text-primary font-medium">+ Create New Trip</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 