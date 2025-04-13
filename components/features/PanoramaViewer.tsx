"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, 
  Navigation, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Compass, 
  X, 
  Plus, 
  Minus,
  Camera
} from 'lucide-react';

// Dynamically import Pannellum to avoid SSR issues
import dynamic from 'next/dynamic';
const Pannellum = dynamic(() => import('pannellum-react').then((mod) => mod.Pannellum), {
  ssr: false,
  loading: () => <div className="w-full h-[70vh] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
    <p className="text-gray-500 dark:text-gray-400">Loading panorama viewer...</p>
  </div>
});

interface PanoramaViewerProps {
  initialLocation?: string;
  locations?: Location[];
  onClose?: () => void;
  isFullscreen?: boolean;
}

interface Location {
  id: string;
  name: string;
  image: string; 
  latitude: number;
  longitude: number;
  description?: string;
  hotspots?: Hotspot[];
}

interface Hotspot {
  id: string;
  pitch: number;
  yaw: number;
  type: 'info' | 'link';
  text?: string;
  linkTo?: string;
  cssClass?: string;
}

export default function PanoramaViewer({ 
  initialLocation = '1', 
  locations = defaultLocations,
  onClose,
  isFullscreen = false
}: PanoramaViewerProps) {
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const [showInfo, setShowInfo] = useState(false);
  const [infoContent, setInfoContent] = useState<{ title: string; text: string } | null>(null);
  const [isCompassVisible, setIsCompassVisible] = useState(true);
  const [viewerInstance, setViewerInstance] = useState<any>(null);
  const [currentHeading, setCurrentHeading] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Get the current location data
  const location = locations.find(loc => loc.id === currentLocation) || locations[0];
  
  // Set info content when location changes
  useEffect(() => {
    if (location) {
      setInfoContent({
        title: location.name,
        text: location.description || 'No description available.'
      });
    }
  }, [location]);
  
  // Update heading when the viewer rotates
  useEffect(() => {
    if (viewerInstance) {
      const interval = setInterval(() => {
        const yaw = viewerInstance.getYaw();
        setCurrentHeading(yaw < 0 ? yaw + 360 : yaw);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [viewerInstance]);
  
  // Helper to navigate between locations
  const navigateToLocation = (locationId: string) => {
    setIsLoading(true);
    setCurrentLocation(locationId);
  };
  
  // Find previous and next locations for navigation
  const locationIndex = locations.findIndex(loc => loc.id === currentLocation);
  const prevLocation = locations[(locationIndex - 1 + locations.length) % locations.length];
  const nextLocation = locations[(locationIndex + 1) % locations.length];
  
  // Handle hotspot clicks
  const handleHotspotClick = (evt: any, args: any) => {
    const hotspotData = location.hotspots?.find(h => h.id === args);
    
    if (hotspotData) {
      if (hotspotData.type === 'info') {
        setInfoContent({
          title: hotspotData.text || 'Information',
          text: hotspotData.text || 'No additional information available.'
        });
        setShowInfo(true);
      } else if (hotspotData.type === 'link' && hotspotData.linkTo) {
        navigateToLocation(hotspotData.linkTo);
      }
    }
  };
  
  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-full h-[70vh] rounded-xl overflow-hidden'}`}>
      {/* Close button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
        >
          <X size={20} />
        </button>
      )}
      
      {/* Panorama viewer */}
      <Pannellum
        width="100%"
        height="100%"
        image={location.image}
        pitch={0}
        yaw={0}
        hfov={120}
        autoLoad
        showZoomCtrl={false}
        showFullscreenCtrl={false}
        showControls={false}
        compass={isCompassVisible}
        hotspotDebug={false}
        onLoad={() => {
          setIsLoading(false);
        }}
        onRender={(instance: any) => {
          if (!viewerInstance) {
            setViewerInstance(instance);
          }
        }}
      >
        {location.hotspots?.map((hotspot) => (
          <Pannellum.Hotspot
            key={hotspot.id}
            type={hotspot.type}
            pitch={hotspot.pitch}
            yaw={hotspot.yaw}
            text={hotspot.text}
            handleClick={(evt: any) => handleHotspotClick(evt, hotspot.id)}
            cssClass={`pannellum-hotspot-${hotspot.type}`}
          />
        ))}
      </Pannellum>
      
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/70 z-10"
          >
            <div className="text-white text-center">
              <div className="w-16 h-16 border-4 border-t-orange-500 border-b-orange-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg">Loading panorama...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Location name */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm p-2 px-4 rounded-full text-white">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-orange-500" />
          <h3 className="font-medium">{location.name}</h3>
        </div>
      </div>
      
      {/* Controls bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white flex items-center gap-3">
        {/* Previous location */}
        <button 
          onClick={() => navigateToLocation(prevLocation.id)}
          className="p-2 hover:bg-white/20 rounded-full"
          title={`Go to ${prevLocation.name}`}
        >
          <ChevronLeft size={20} />
        </button>
        
        {/* Zoom controls */}
        <button 
          onClick={() => viewerInstance?.zoomIn()}
          className="p-2 hover:bg-white/20 rounded-full"
          title="Zoom in"
        >
          <Plus size={20} />
        </button>
        
        <button 
          onClick={() => viewerInstance?.zoomOut()}
          className="p-2 hover:bg-white/20 rounded-full"
          title="Zoom out"
        >
          <Minus size={20} />
        </button>
        
        {/* Toggle compass */}
        <button 
          onClick={() => setIsCompassVisible(!isCompassVisible)}
          className={`p-2 rounded-full ${isCompassVisible ? 'bg-white/30' : 'hover:bg-white/20'}`}
          title={isCompassVisible ? "Hide compass" : "Show compass"}
        >
          <Compass size={20} />
        </button>
        
        {/* Show info */}
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className={`p-2 rounded-full ${showInfo ? 'bg-white/30' : 'hover:bg-white/20'}`}
          title="Location information"
        >
          <Info size={20} />
        </button>
        
        {/* Take screenshot */}
        <button 
          onClick={() => {
            if (viewerInstance) {
              const dataUrl = viewerInstance.getRenderer().render.canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.href = dataUrl;
              link.download = `tourease-${location.name.toLowerCase().replace(/\s+/g, '-')}.png`;
              link.click();
            }
          }}
          className="p-2 hover:bg-white/20 rounded-full"
          title="Take screenshot"
        >
          <Camera size={20} />
        </button>
        
        {/* Next location */}
        <button 
          onClick={() => navigateToLocation(nextLocation.id)}
          className="p-2 hover:bg-white/20 rounded-full"
          title={`Go to ${nextLocation.name}`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Heading indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
        {getHeadingLabel(currentHeading)}
      </div>
      
      {/* Location information panel */}
      <AnimatePresence>
        {showInfo && infoContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-4 bottom-20 z-10 bg-black/60 backdrop-blur-md rounded-lg p-4 max-w-md"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-bold text-lg">{infoContent.title}</h3>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-white/90 text-sm">{infoContent.text}</p>
            
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <MapPin size={14} className="text-orange-500" />
                <span>{location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
              </div>
              
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`,
                      '_blank'
                    );
                  }
                }}
                className="text-orange-400 hover:text-orange-300 text-sm flex items-center gap-1"
              >
                <Navigation size={14} />
                <span>View on Map</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Location thumbnails for navigation */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 space-y-2">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => navigateToLocation(loc.id)}
            className={`block w-12 h-12 overflow-hidden rounded-lg border-2 transition-all 
              ${currentLocation === loc.id ? 'border-orange-500 shadow-lg' : 'border-white/50 opacity-70 hover:opacity-100'}`}
            title={loc.name}
          >
            <img 
              src={loc.image} 
              alt={loc.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Helper function to convert degrees to compass direction
function getHeadingLabel(degrees: number): string {
  const val = Math.floor((degrees / 22.5) + 0.5);
  const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
  ];
  return `${directions[val % 16]} (${Math.round(degrees)}°)`;
}

// Default sample locations with 360° panorama images
const defaultLocations: Location[] = [
  {
    id: '1',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1601240377088-833d91003ae9?q=80&w=2500&auto=format&fit=crop',
    latitude: 36.3932,
    longitude: 25.4615,
    description: 'Experience the breathtaking views of Santorini with its iconic white buildings and blue domes overlooking the Aegean Sea.',
    hotspots: [
      {
        id: 'santorini-1',
        pitch: -3,
        yaw: 120,
        type: 'info',
        text: 'The blue domes of Santorini are a famous landmark, representing the classic Greek Cycladic architecture.'
      },
      {
        id: 'santorini-2',
        pitch: -5,
        yaw: -60,
        type: 'link',
        linkTo: '2',
        text: 'Travel to Venice'
      }
    ]
  },
  {
    id: '2',
    name: 'Venice, Italy',
    image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2670&auto=format&fit=crop',
    latitude: 45.4408,
    longitude: 12.3155,
    description: 'Explore the romantic canals and historic architecture of Venice, one of the most unique cities in the world.',
    hotspots: [
      {
        id: 'venice-1',
        pitch: 0,
        yaw: 35,
        type: 'info',
        text: 'The Grand Canal is the main waterway through Venice, lined with beautiful historic buildings.'
      },
      {
        id: 'venice-2',
        pitch: -8,
        yaw: 180,
        type: 'link',
        linkTo: '3',
        text: 'Travel to Kyoto'
      }
    ]
  },
  {
    id: '3',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop',
    latitude: 35.0116,
    longitude: 135.7681,
    description: 'Discover the serene beauty of Kyoto with its ancient temples, traditional gardens, and vibrant cherry blossoms.',
    hotspots: [
      {
        id: 'kyoto-1',
        pitch: 5,
        yaw: -30,
        type: 'info',
        text: 'Fushimi Inari Shrine is famous for its thousands of vermilion torii gates.'
      },
      {
        id: 'kyoto-2',
        pitch: -10,
        yaw: 90,
        type: 'link',
        linkTo: '1',
        text: 'Travel to Santorini'
      }
    ]
  }
]; 