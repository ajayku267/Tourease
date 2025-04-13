export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="space-y-6">
            {/* Destination Input Skeleton */}
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Date Inputs Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Travelers and Departure City Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="h-4 w-36 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-28 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Budget Input Skeleton */}
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 