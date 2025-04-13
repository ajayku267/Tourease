"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ARTourMode from '@/app/components/features/ARTourMode';
import { Button } from '@/components/ui/button';
import { Camera, Map, Info } from 'lucide-react';
import Link from 'next/link';

export default function ARTourPage() {
  const [arModeActive, setArModeActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceSupported, setDeviceSupported] = useState(true);
  const [initialLocation, setInitialLocation] = useState<{lat: number; lng: number}>({ lat: 48.8584, lng: 2.2945 });
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get location from URL query parameters if available
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    if (lat && lng) {
      setInitialLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
    }

    // Check if the device supports AR capabilities
    const checkDeviceSupport = () => {
      // Basic checks for AR support - in a real app this would be more comprehensive
      const hasOrientation = 'DeviceOrientationEvent' in window;
      const hasGeolocation = 'geolocation' in navigator;
      const hasCamera = 'mediaDevices' in navigator;
      
      setDeviceSupported(hasOrientation && hasGeolocation && hasCamera);
      setIsLoading(false);
    };

    // Short delay to simulate checking
    setTimeout(checkDeviceSupport, 1000);
  }, [searchParams]);

  const startARMode = () => {
    setArModeActive(true);
  };

  const exitARMode = () => {
    setArModeActive(false);
  };

  if (arModeActive) {
    return <ARTourMode initialLocation={initialLocation} onClose={exitARMode} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Checking device compatibility...</p>
          </div>
        ) : !deviceSupported ? (
          <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mt-10">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                  <Info size={32} className="text-red-500 dark:text-red-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
                Device Not Supported
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Your device doesn't support all the features needed for AR Tour Mode. 
                You need a device with camera, GPS, and orientation sensors.
              </p>
              <div className="flex justify-center">
                <Link href="/">
                  <Button variant="default">Return to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                Immersive AR Tour Experience
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Explore real-world destinations in augmented reality. Point your phone at your surroundings 
                to see information about nearby points of interest.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">How It Works</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    AR Tour Mode uses your camera and location to display relevant information about 
                    points of interest in your surroundings. Simply point your phone and explore!
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600 dark:text-gray-300">See information about landmarks, restaurants, and attractions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600 dark:text-gray-300">Get distances and directions to points of interest</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600 dark:text-gray-300">Learn historical facts and practical information</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Button onClick={startARMode} className="w-full">
                      Launch AR Tour Mode
                    </Button>
                  </div>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-lg h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                <img
                  src="/images/destinations/paris.jpg"
                  alt="AR Tour Experience"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                    <h3 className="text-white text-xl font-bold mb-2">
                      Explore Paris in AR
                    </h3>
                    <p className="text-white/90 mb-4">
                      Discover the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral with interactive AR markers.
                    </p>
                    <Button onClick={startARMode} variant="outline" className="bg-white/10 text-white border-white/30">
                      Start AR Experience
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mt-8 max-w-5xl mx-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Before You Start</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">1. Grant Permissions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Allow camera and location access when prompted to enable the AR experience.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">2. Good Lighting</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Use in well-lit areas for the best AR marker detection and experience.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">3. Move Slowly</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Pan your camera slowly to allow the AR system to track your surroundings properly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 