"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Camera, Compass, Info, MapPin, RotateCcw, X, Filter, Layers, ZoomIn, Smartphone, Award, Building, Coffee, PanelRight, Cloud, Star, Navigation, BookmarkPlus, FileQuestion, Zap, Maximize2, Lightbulb, Hand, Sparkles, Palette, CloudRain, Sun, Snowflake, Sunset, MountainSnow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Script from 'next/script';
import Head from 'next/head';
import Image from 'next/image';
import { Cube3d } from 'lucide-react';
import { SparkleIcon } from 'lucide-react';

// Define types for POIs (Points of Interest)
interface POI {
  id: string;
  name: string;
  description: string;
  position: {
    lat: number;
    lng: number;
    altitude?: number;
  };
  type: 'monument' | 'restaurant' | 'museum' | 'viewpoint' | 'hotel';
  image?: string;
  distance?: number; // in meters
  rating?: number; // 1-5 scale
  facts?: string[];
  openHours?: string;
  price?: string;
}

interface ARTourModeProps {
  initialLocation?: {
    lat: number;
    lng: number;
  };
  pois?: POI[];
  onClose?: () => void;
}

const ARTourMode: React.FC<ARTourModeProps> = ({
  initialLocation = { lat: 48.8584, lng: 2.2945 }, // Default: Eiffel Tower
  pois = [],
  onClose
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [arReady, setARReady] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [arMode, setArMode] = useState<'basic' | 'advanced' | 'photorealistic'>('basic');
  const [filteredPOITypes, setFilteredPOITypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showWeatherEffects, setShowWeatherEffects] = useState(false);
  const [showDistanceCircles, setShowDistanceCircles] = useState(false);
  const [showAdvancedInfo, setShowAdvancedInfo] = useState(false);
  const [showAltitudeIndicator, setShowAltitudeIndicator] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<string[]>([]);
  const [arEffectIntensity, setArEffectIntensity] = useState(0.5);
  const [arModeChanged, setArModeChanged] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [weatherMode, setWeatherMode] = useState<'sunny' | 'rainy' | 'snowy' | 'sunset'>('sunny');
  const [showWeatherMenu, setShowWeatherMenu] = useState(false);
  const [ai3DModelEnabled, setAi3DModelEnabled] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const cameraPermissionGranted = useRef(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const weatherEffectRef = useRef<HTMLDivElement>(null);

  // Sample POIs if none provided
  const defaultPOIs: POI[] = [
    {
      id: '1',
      name: 'Eiffel Tower',
      description: 'Iconic iron lattice tower built in 1889 that has become a global cultural icon of France and one of the most recognizable structures in the world.',
      position: { lat: 48.8584, lng: 2.2945 },
      type: 'monument',
      image: '/images/destinations/paris.jpg',
      distance: 150,
      rating: 4.7,
      facts: [
        'The Eiffel Tower is 330 meters (1,083 ft) tall, about the same height as an 81-story building',
        'The Eiffel Tower was built for the 1889 World Fair',
        'The tower was initially criticized by some of France\'s leading artists and intellectuals',
        'It was the tallest man-made structure in the world for 41 years until the Chrysler Building'
      ],
      openHours: '9:00 AM - 12:45 AM',
      price: '€26.80 for adults to the top'
    },
    {
      id: '2',
      name: 'Louvre Museum',
      description: 'The world\'s most-visited museum and a historic monument housing one of the finest art collections, including the Mona Lisa and Venus de Milo.',
      position: { lat: 48.8606, lng: 2.3376 },
      type: 'museum',
      image: '/images/destinations/louvre.jpg',
      distance: 350,
      rating: 4.8,
      facts: [
        'The Louvre houses over 380,000 objects and displays 35,000 works of art',
        'It was originally built as a fortress in the late 12th century',
        'The glass pyramid designed by I.M. Pei was completed in 1989',
        'It would take about 100 days to see every piece of art in the Louvre'
      ],
      openHours: '9:00 AM - 6:00 PM (Closed Tuesdays)',
      price: '€17 for adults'
    },
    {
      id: '3',
      name: 'Notre-Dame Cathedral',
      description: 'A medieval Catholic cathedral that is widely considered one of the finest examples of French Gothic architecture, currently being restored after the 2019 fire.',
      position: { lat: 48.8530, lng: 2.3499 },
      type: 'monument',
      image: '/images/destinations/notre-dame.jpg',
      distance: 550,
      rating: 4.6,
      facts: [
        'Construction began in 1163 and was largely completed by 1260',
        'The famous gargoyles were added in the 19th century during restoration',
        'The cathedral\'s famous rose windows largely survived the 2019 fire',
        'Notre-Dame has been the site of many important historical events'
      ],
      openHours: 'Currently closed for restoration',
      price: 'Free (when reopened)'
    },
    {
      id: '4',
      name: 'Café de Flore',
      description: 'One of the oldest and most prestigious coffeehouses in Paris, known for famous patrons like Jean-Paul Sartre and Simone de Beauvoir.',
      position: { lat: 48.8539, lng: 2.3336 },
      type: 'restaurant',
      image: '/images/destinations/paris.jpg',
      distance: 420,
      rating: 4.2,
      facts: [
        'Opened in the 1880s during the Third Republic',
        'Famous for being a meeting place for intellectuals',
        'Sartre and de Beauvoir would work at the café daily',
        'Retains much of its original Art Deco interior'
      ],
      openHours: '7:30 AM - 1:30 AM',
      price: '€€€'
    },
    {
      id: '5',
      name: 'Montmartre Viewpoint',
      description: 'A hill in Paris\'s 18th arrondissement offering spectacular panoramic views of the city and home to the Sacré-Cœur Basilica.',
      position: { lat: 48.8867, lng: 2.3431 },
      type: 'viewpoint',
      image: '/images/destinations/paris.jpg',
      distance: 980,
      rating: 4.9,
      facts: [
        'At 130m high, it\'s the highest natural point in Paris',
        'The area was an artists\' haven in the early 20th century',
        'The Sacré-Cœur Basilica was built between 1875 and 1914',
        'The white stone of the basilica keeps white even with pollution'
      ],
      openHours: 'Always open (Basilica: 6:00 AM - 10:30 PM)',
      price: 'Free'
    }
  ];

  const activePOIs = pois.length > 0 ? pois : defaultPOIs;

  // Handle device orientation for AR direction
  useEffect(() => {
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        // Alpha is the compass direction
        if (event.alpha !== null) {
          setCompassHeading(event.alpha);
        }
      };

      try {
        window.addEventListener('deviceorientation', handleOrientation, true);
        
        // Some browsers (iOS) require permission for device orientation
        if ((DeviceOrientationEvent as any).requestPermission) {
          (DeviceOrientationEvent as any).requestPermission()
            .then((permissionState: string) => {
              if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation, true);
              } else {
                setError('Orientation permission denied');
              }
            })
            .catch((error: Error) => {
              console.error('Error requesting orientation permission', error);
            });
        }
      } catch (err) {
        console.error('Device orientation not supported:', err);
      }

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    }
  }, []);

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Could not access your location. Using default location instead.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  // Request camera permission and initialize AR
  useEffect(() => {
    const initializeAR = async () => {
      try {
        setIsLoading(true);
        
        // Check for camera support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera not supported by your browser');
        }
        
        // Request camera permission
        await navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            // Stop the stream immediately, we just needed the permission
            stream.getTracks().forEach(track => track.stop());
            cameraPermissionGranted.current = true;
          })
          .catch(err => {
            throw new Error('Camera permission denied');
          });

        // Once the scripts are loaded and permissions granted, AR is ready
        setTimeout(() => {
          setARReady(true);
          setIsLoading(false);
        }, 2000);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize AR');
        setIsLoading(false);
      }
    };

    initializeAR();
  }, []);

  // Handle window events for AR.js
  useEffect(() => {
    if (arReady && cameraPermissionGranted.current) {
      // Add any AR.js specific initialization here
      console.log('AR ready and camera permission granted');
    }
  }, [arReady]);

  // Calculate distance between two coordinates in meters
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
  };

  // Calculate bearing between two points
  const calculateBearing = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const λ1 = lng1 * Math.PI/180;
    const λ2 = lng2 * Math.PI/180;

    const y = Math.sin(λ2-λ1) * Math.cos(φ2);
    const x = Math.cos(φ1)*Math.sin(φ2) -
              Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
    const θ = Math.atan2(y, x);
    
    // Convert radians to degrees
    return (θ*180/Math.PI + 360) % 360;
  };

  // Enhanced simulateObjectDetection with AI prediction
  const simulateObjectDetection = () => {
    // Artificial delay to simulate processing
    setTimeout(() => {
      // Random objects that might be detected in Paris
      const possibleObjects = [
        'building', 'street sign', 'café', 'sculpture', 'fountain', 
        'street lamp', 'tree', 'bench', 'tourist', 'bicycle',
        'historical landmark', 'museum entrance', 'architectural style', 'art nouveau detail', 'gothic window'
      ];
      
      // Randomly select 2-5 objects to "detect"
      const numObjects = 2 + Math.floor(Math.random() * 4);
      const detected = [];
      
      for (let i = 0; i < numObjects; i++) {
        const randomIndex = Math.floor(Math.random() * possibleObjects.length);
        detected.push(possibleObjects[randomIndex]);
      }
      
      setDetectedObjects(detected);
    }, 1500);
  };

  // Toggle AR visualization mode
  const toggleARMode = () => {
    setArMode(current => {
      if (current === 'basic') return 'advanced';
      if (current === 'advanced') return 'photorealistic';
      return 'basic';
    });
    setArModeChanged(true);
    
    // Reset the notification after a delay
    setTimeout(() => {
      setArModeChanged(false);
    }, 3000);
  };

  // Filter POIs by type
  const filterPOIs = (type: string) => {
    setFilteredPOITypes(current => {
      if (current.includes(type)) {
        return current.filter(t => t !== type);
      } else {
        return [...current, type];
      }
    });
  };

  // Get filtered POIs
  const getFilteredPOIs = () => {
    if (filteredPOITypes.length === 0) return activePOIs;
    return activePOIs.filter(poi => filteredPOITypes.includes(poi.type));
  };

  // Apply visual filter effect
  const applyFilter = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  // Toggle weather visualization effects
  const toggleWeatherEffect = (mode: 'sunny' | 'rainy' | 'snowy' | 'sunset') => {
    setWeatherMode(mode);
    setShowWeatherEffects(true);
    setShowWeatherMenu(false);
  };

  const resetAR = () => {
    // Reload the AR experience
    if (sceneRef.current) {
      setIsLoading(true);
      setTimeout(() => {
        setARReady(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSelectPOI = (poi: POI) => {
    setSelectedPOI(poi);
    setIsInfoOpen(true);
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/90 text-white flex flex-col items-center justify-center z-50">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-xl font-bold mb-4">AR Mode Error</h2>
          <p className="mb-6">{error}</p>
          <Button onClick={onClose} variant="outline">Return to App</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* AR.js and A-Frame dependencies */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      {/* Load AR.js scripts */}
      <Script src="https://aframe.io/releases/1.4.0/aframe.min.js" strategy="beforeInteractive" />
      <Script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js" strategy="beforeInteractive" />

      <div className="fixed inset-0 z-50 bg-black">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium">Initializing AR Experience...</p>
            <p className="text-sm opacity-70 mt-2">Please ensure you've granted camera permissions</p>
          </div>
        ) : (
          <>
            <div ref={sceneRef} className="w-full h-full">
              {/* A-Frame AR Scene */}
              {arReady && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, overflow: 'hidden' }}>
                  {/* This is where the AR.js A-Frame scene would be embedded in production */}
                  {/* For demonstration purposes, we'll show a mock AR view */}
                  <div className="relative w-full h-full bg-black">
                    {/* Mock camera view with semi-transparency */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-75"
                      style={{
                        backgroundImage: "url('/images/destinations/paris.jpg')",
                        filter: `brightness(${0.7 * arEffectIntensity}) contrast(${1.2 * arEffectIntensity}) 
                                 ${activeFilter === 'vintage' ? 'sepia(0.7)' : ''} 
                                 ${activeFilter === 'noir' ? 'grayscale(1)' : ''} 
                                 ${activeFilter === 'vivid' ? 'saturate(1.8)' : ''} 
                                 ${activeFilter === 'dreamy' ? 'brightness(1.2) blur(1px)' : ''}`,
                        transform: `scale(${zoomLevel})`
                      }}
                    />
                    
                    {/* Weather effects overlay */}
                    {showWeatherEffects && (
                      <div
                        ref={weatherEffectRef}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: weatherMode === 'rainy' 
                            ? "url('/images/effects/rain.svg')" 
                            : weatherMode === 'snowy' 
                            ? "url('/images/effects/snow.svg')" 
                            : weatherMode === 'sunset'
                            ? "linear-gradient(to bottom, rgba(255,140,0,0.2), rgba(255,69,0,0.1))"
                            : "",
                          opacity: 0.5,
                          animation: weatherMode === 'rainy' 
                            ? "rainfall 2s linear infinite" 
                            : weatherMode === 'snowy'
                            ? "snowfall 10s linear infinite"
                            : "none"
                        }}
                      ></div>
                    )}
                    
                    {/* Distance circles (radar-like) */}
                    {showDistanceCircles && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[200px] h-[200px] rounded-full border-2 border-white/20 absolute"></div>
                        <div className="w-[400px] h-[400px] rounded-full border-2 border-white/15 absolute"></div>
                        <div className="w-[600px] h-[600px] rounded-full border-2 border-white/10 absolute"></div>
                        {/* Pulse animation for radar effect */}
                        <div className="w-[800px] h-[800px] rounded-full border-2 border-primary/10 absolute animate-ping-slow"></div>
                      </div>
                    )}
                    
                    {/* AR Overlay Elements - POIs with enhanced visualization */}
                    <div className="absolute inset-0">
                      {getFilteredPOIs().map((poi) => (
                        <motion.div
                          key={poi.id}
                          className="absolute"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            // Position would normally be calculated based on AR.js/GPS
                            // This is a simplified mock position
                            left: `${30 + Math.random() * 40}%`,
                            top: `${20 + Math.random() * 40}%`,
                          }}
                          onClick={() => handleSelectPOI(poi)}
                        >
                          <div className="relative flex flex-col items-center">
                            {/* Enhanced POI Marker with 3D effect for photorealistic mode */}
                            <div className={`
                              ${arMode === 'basic' ? 'bg-white/20' : 
                                arMode === 'advanced' ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 
                                'bg-white/50 backdrop-blur-xl shadow-lg'} 
                              p-2 rounded-full transition-all duration-300
                              ${arMode === 'photorealistic' ? 'transform-gpu hover:scale-110 transition-transform' : ''}
                            `}>
                              {poi.type === 'monument' && <Building size={32} className="text-orange-500 drop-shadow-lg" />}
                              {poi.type === 'restaurant' && <Coffee size={32} className="text-pink-500 drop-shadow-lg" />}
                              {poi.type === 'museum' && <Award size={32} className="text-blue-500 drop-shadow-lg" />}
                              {poi.type === 'viewpoint' && <MapPin size={32} className="text-green-500 drop-shadow-lg" />}
                              {poi.type === 'hotel' && <Building size={32} className="text-yellow-500 drop-shadow-lg" />}
                              
                              {/* Add sparkle animation for points of interest in photorealistic mode */}
                              {arMode === 'photorealistic' && (
                                <motion.div 
                                  className="absolute -top-1 -right-1"
                                  animate={{ 
                                    opacity: [0, 1, 0],
                                    scale: [0.8, 1.2, 0.8],
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }}
                                >
                                  <Sparkles size={14} className="text-yellow-300" />
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Enhanced info display based on mode */}
                            <div className={`
                              ${arMode === 'basic' ? 'bg-black/70' : 
                                arMode === 'advanced' ? 'bg-gradient-to-r from-gray-800/80 to-gray-900/80' : 
                                'bg-white/30 backdrop-blur-xl text-black'}
                              backdrop-blur-sm px-3 py-1 rounded-full mt-1 text-sm font-medium transition-all duration-300
                            `}>
                              {poi.name} • {poi.distance}m
                              
                              {/* Show extra details in advanced modes */}
                              {arMode !== 'basic' && (
                                <div className="flex items-center mt-1">
                                  {[...Array(Math.floor(poi.rating || 0))].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            {/* Additional altitude indicator */}
                            {showAltitudeIndicator && (
                              <div className="absolute -right-10 h-20 w-2 bg-gradient-to-t from-blue-500 to-green-500 rounded mt-2">
                                <div className="absolute w-4 h-4 bg-white rounded-full -right-1 shadow-lg"
                                  style={{ bottom: `${Math.random() * 70}%` }}></div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Object detection overlay with enhanced AI information */}
                    {detectedObjects.length > 0 && arMode !== 'basic' && (
                      <div className="absolute bottom-24 left-4 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-primary/30">
                        <div className="text-white text-sm font-medium mb-1 flex items-center">
                          <Sparkles size={14} className="text-primary mr-1" />
                          AI-Detected Objects:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {detectedObjects.map((obj, index) => (
                            <div key={index} className="bg-blue-500/30 px-2 py-1 rounded text-xs text-white flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                              {obj}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* AR Interface Controls - Top controls */}
            <div className="absolute top-6 left-0 w-full flex justify-between items-start px-4 z-20">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12"
                onClick={onClose}
              >
                <X size={24} />
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={`bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12 
                              ${showFilters ? 'border-white border-2' : ''}`}
                  onClick={() => setShowFilters(prev => !prev)}
                >
                  <Filter size={24} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12"
                  onClick={() => setShowInstructions(true)}
                >
                  <Info size={24} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12"
                  onClick={resetAR}
                >
                  <RotateCcw size={24} />
                </Button>
              </div>
            </div>

            {/* Enhanced AR Controls - Side buttons for features */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
              <Button 
                variant="outline" 
                size="icon" 
                className={`bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12
                          ${arMode !== 'basic' ? 'border-white border-2' : ''}`}
                onClick={toggleARMode}
              >
                <Layers size={24} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12
                          ${showWeatherEffects ? 'border-white border-2' : ''}`}
                onClick={() => setShowWeatherMenu(!showWeatherMenu)}
              >
                <Cloud size={24} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12
                          ${showDistanceCircles ? 'border-white border-2' : ''}`}
                onClick={() => setShowDistanceCircles(prev => !prev)}
              >
                <MapPin size={24} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12
                          ${showAdvancedInfo ? 'border-white border-2' : ''}`}
                onClick={() => {
                  setShowAdvancedInfo(prev => !prev);
                  if (!showAdvancedInfo) simulateObjectDetection();
                }}
              >
                <PanelRight size={24} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12`}
                onClick={() => setZoomLevel(prev => prev < 1.5 ? prev + 0.1 : 1)}
              >
                <ZoomIn size={24} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`bg-black/40 backdrop-blur-lg border-white/20 text-white rounded-full h-12 w-12
                          ${showFilterMenu ? 'border-white border-2' : ''}`}
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <Palette size={24} />
              </Button>
            </div>

            {/* Weather effects menu - NEW */}
            <AnimatePresence>
              {showWeatherMenu && (
                <motion.div
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 z-20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex flex-col gap-2">
                    <button
                      className={`p-2 rounded-full ${weatherMode === 'sunny' && showWeatherEffects ? 'bg-yellow-500/30' : 'bg-white/10'}`}
                      onClick={() => toggleWeatherEffect('sunny')}
                    >
                      <Sun size={20} className="text-yellow-400" />
                    </button>
                    <button
                      className={`p-2 rounded-full ${weatherMode === 'rainy' && showWeatherEffects ? 'bg-blue-500/30' : 'bg-white/10'}`}
                      onClick={() => toggleWeatherEffect('rainy')}
                    >
                      <CloudRain size={20} className="text-blue-400" />
                    </button>
                    <button
                      className={`p-2 rounded-full ${weatherMode === 'snowy' && showWeatherEffects ? 'bg-blue-300/30' : 'bg-white/10'}`}
                      onClick={() => toggleWeatherEffect('snowy')}
                    >
                      <Snowflake size={20} className="text-blue-200" />
                    </button>
                    <button
                      className={`p-2 rounded-full ${weatherMode === 'sunset' && showWeatherEffects ? 'bg-orange-500/30' : 'bg-white/10'}`}
                      onClick={() => toggleWeatherEffect('sunset')}
                    >
                      <Sunset size={20} className="text-orange-400" />
                    </button>
                    <button
                      className="p-2 rounded-full bg-white/10 mt-2"
                      onClick={() => setShowWeatherEffects(false)}
                    >
                      <X size={20} className="text-white" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Visual filters menu - NEW */}
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 z-20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h3 className="text-white text-xs font-medium mb-2">Visual Filters</h3>
                  <div className="flex flex-col gap-2">
                    <button
                      className={`px-3 py-1.5 rounded ${activeFilter === 'vintage' ? 'bg-yellow-500/30' : 'bg-white/10'} text-xs text-white`}
                      onClick={() => applyFilter('vintage')}
                    >
                      Vintage
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded ${activeFilter === 'noir' ? 'bg-gray-500/30' : 'bg-white/10'} text-xs text-white`}
                      onClick={() => applyFilter('noir')}
                    >
                      Noir
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded ${activeFilter === 'vivid' ? 'bg-purple-500/30' : 'bg-white/10'} text-xs text-white`}
                      onClick={() => applyFilter('vivid')}
                    >
                      Vivid
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded ${activeFilter === 'dreamy' ? 'bg-blue-500/30' : 'bg-white/10'} text-xs text-white`}
                      onClick={() => applyFilter('dreamy')}
                    >
                      Dreamy
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compass with enhanced styling */}
            <div className="absolute top-24 right-4 z-20">
              <div className="bg-black/40 backdrop-blur-lg rounded-full p-2">
                <div 
                  className={`
                    ${arMode === 'basic' ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 
                     arMode === 'advanced' ? 'bg-gradient-to-tr from-purple-600 to-pink-400' : 
                     'bg-gradient-to-r from-emerald-500 to-teal-400'}
                    h-12 w-12 rounded-full flex items-center justify-center relative transition-all duration-300
                  `}
                  style={{ transform: `rotate(${compassHeading}deg)` }}
                >
                  <Compass className="text-white h-8 w-8" />
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-red-500 rounded"></div>
                </div>
              </div>
            </div>

            {/* Enhanced Filters panel with additional options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  className="absolute top-24 left-4 z-20 bg-black/50 backdrop-blur-md p-4 rounded-lg border border-white/10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white text-sm font-medium mb-3">Filter Points of Interest</h3>
                  <div className="space-y-2">
                    {['monument', 'restaurant', 'museum', 'viewpoint', 'hotel'].map(type => (
                      <button
                        key={type}
                        className={`
                          flex items-center px-3 py-2 rounded-md w-full
                          ${filteredPOITypes.includes(type) ? 'bg-primary text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}
                          transition-colors
                        `}
                        onClick={() => filterPOIs(type)}
                      >
                        {type === 'monument' && <Building size={14} className="mr-2" />}
                        {type === 'restaurant' && <Coffee size={14} className="mr-2" />}
                        {type === 'museum' && <Award size={14} className="mr-2" />}
                        {type === 'viewpoint' && <MountainSnow size={14} className="mr-2" />}
                        {type === 'hotel' && <Building size={14} className="mr-2" />}
                        <span className="capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <label className="flex items-center justify-between text-sm text-white/80">
                      <span>Show tooltips</span>
                      <div 
                        className={`w-10 h-5 relative rounded-full transition-colors duration-200 ease-in-out 
                                  ${showTooltips ? 'bg-primary' : 'bg-gray-700'}`}
                        onClick={() => setShowTooltips(!showTooltips)}
                      >
                        <span 
                          className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out 
                                    ${showTooltips ? 'transform translate-x-5' : ''}`} 
                        />
                      </div>
                    </label>
                    <label className="flex items-center justify-between text-sm text-white/80 mt-3">
                      <span>AI 3D models</span>
                      <div 
                        className={`w-10 h-5 relative rounded-full transition-colors duration-200 ease-in-out 
                                  ${ai3DModelEnabled ? 'bg-primary' : 'bg-gray-700'}`}
                        onClick={() => setAi3DModelEnabled(!ai3DModelEnabled)}
                      >
                        <span 
                          className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out 
                                    ${ai3DModelEnabled ? 'transform translate-x-5' : ''}`} 
                        />
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* POI Info Modal - Enhanced with additional details */}
            <AnimatePresence>
              {isInfoOpen && selectedPOI && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-[60%] z-30 flex flex-col"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                >
                  <div className="rounded-t-xl bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-t border-white/20 h-full flex flex-col max-w-lg mx-auto w-full">
                    {/* Pull handle */}
                    <div className="mx-auto w-12 h-1.5 bg-white/30 rounded-full my-3"></div>
                    
                    {/* Image header */}
                    <div className="relative h-40 w-full">
                      <Image 
                        src={selectedPOI.image || "/images/placeholder.jpg"} 
                        alt={selectedPOI.name} 
                        className="object-cover rounded-t-xl"
                        fill
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                      
                      {/* Floating info box */}
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <div>
                          <Badge className={`
                            ${selectedPOI.type === 'monument' ? 'bg-orange-500/80' : 
                              selectedPOI.type === 'restaurant' ? 'bg-pink-500/80' : 
                              selectedPOI.type === 'museum' ? 'bg-blue-500/80' : 
                              selectedPOI.type === 'viewpoint' ? 'bg-green-500/80' : 'bg-yellow-500/80'}
                            text-white text-xs capitalize`}
                          >
                            {selectedPOI.type}
                          </Badge>
                          <h3 className="text-white font-bold text-xl mt-1">{selectedPOI.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} 
                                  fill={i < Math.floor(selectedPOI.rating || 0) ? "yellow" : "transparent"} 
                                  stroke={i < Math.floor(selectedPOI.rating || 0) ? "yellow" : "white"}
                                  size={14} 
                                  className="mr-0.5" 
                                />
                              ))}
                            </div>
                            <span className="text-white/80 text-sm">{selectedPOI.rating || 4.5}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-medium flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {selectedPOI.distance}m
                          </div>
                          {selectedPOI.price && (
                            <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-medium mt-2">
                              {selectedPOI.price}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content area with tabs */}
                    <div className="px-4 pt-3 pb-6 flex-1 overflow-auto">
                      <Tabs defaultValue="info" className="w-full">
                        <TabsList className="grid grid-cols-3 mb-3">
                          <TabsTrigger value="info">Info</TabsTrigger>
                          <TabsTrigger value="facts">Facts</TabsTrigger>
                          <TabsTrigger value="hours">Hours & Info</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="info" className="space-y-4">
                          <p className="text-white/80 text-sm leading-relaxed">
                            {selectedPOI.description}
                          </p>
                          
                          {/* 3D model view placeholder */}
                          {arMode === 'photorealistic' && (
                            <div className="mt-3 bg-black/50 rounded-lg h-36 flex items-center justify-center border border-white/10">
                              <div className="text-center">
                                <Cube3d size={32} className="text-white/60 mx-auto mb-2" />
                                <p className="text-white/60 text-xs">3D Model View</p>
                                <Button size="sm" variant="outline" className="mt-2 text-xs h-7 bg-white/10">
                                  <Maximize2 size={12} className="mr-1" /> View in 3D
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {/* Interactive buttons */}
                          <div className="flex justify-between mt-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex-1 mr-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <Navigation size={16} className="mr-1" /> Directions
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex-1 ml-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <BookmarkPlus size={16} className="mr-1" /> Save
                            </Button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="facts" className="space-y-2 text-white">
                          {selectedPOI.facts && selectedPOI.facts.map((fact, i) => (
                            <div key={i} className="bg-white/5 p-3 rounded-lg">
                              <div className="flex items-start">
                                <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                                  <SparkleIcon size={14} className="text-primary" />
                                </div>
                                <p className="text-sm text-white/90 flex-1">{fact}</p>
                              </div>
                            </div>
                          ))}
                          {!selectedPOI.facts && (
                            <div className="text-center py-8 text-white/60">
                              <FileQuestion size={32} className="mx-auto mb-2" />
                              <p>No historical facts available</p>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="hours" className="space-y-3">
                          {selectedPOI.openHours && (
                            <div className="space-y-2">
                              <h4 className="text-white/90 font-medium text-sm">Opening Hours</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {Object.entries(selectedPOI.openHours).map(([day, hours]) => (
                                  <div key={day} className="flex justify-between">
                                    <span className="text-white/70 capitalize">{day}</span>
                                    <span className="text-white font-medium">{hours}</span>
                                  </div>
                                ))}
                              </div>
                      </div>
                    )}
                    
                          {selectedPOI.price && (
                            <div className="mt-4">
                              <h4 className="text-white/90 font-medium text-sm mb-2">Pricing</h4>
                              <div className="bg-white/10 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <span className="text-white/70 text-sm">Starting from</span>
                                  <span className="text-white font-bold">{selectedPOI.price}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    {/* Bottom button */}
                    <div className="p-4 pt-0">
                      <Button 
                        className="w-full"
                        onClick={() => setIsInfoOpen(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions Modal */}
            <AnimatePresence>
              {showInstructions && (
                <motion.div 
                  className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="bg-gray-900 rounded-lg border border-white/20 max-w-md w-full p-6"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                  >
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Lightbulb className="mr-2 text-yellow-500" /> 
                      AR Tour Mode Instructions
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="bg-primary/20 rounded-full p-2 mr-3">
                          <Compass className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">Pan Around</h4>
                          <p className="text-white/70 text-sm">Move your phone around to discover nearby points of interest.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary/20 rounded-full p-2 mr-3">
                          <Hand className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">Interact</h4>
                          <p className="text-white/70 text-sm">Tap on any marker to view detailed information about that location.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary/20 rounded-full p-2 mr-3">
                          <Layers className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">AR Modes</h4>
                          <p className="text-white/70 text-sm">Toggle between basic, advanced, and photorealistic AR modes.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary/20 rounded-full p-2 mr-3">
                          <Filter className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">Filter</h4>
                          <p className="text-white/70 text-sm">Use filters to show only specific types of points of interest.</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6" onClick={() => setShowInstructions(false)}>
                      Got It
                      </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification for new features based on mode */}
            <AnimatePresence>
              {arModeChanged && (
                <motion.div 
                  className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="text-white text-sm font-medium flex items-center">
                    <Zap className="mr-1 text-yellow-500" size={16} />
                    {arMode === 'basic' ? 'Basic Mode Activated' : 
                     arMode === 'advanced' ? 'Advanced Mode Activated' : 
                     'Photorealistic Mode Activated'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </>
  );
};

export default ARTourMode; 