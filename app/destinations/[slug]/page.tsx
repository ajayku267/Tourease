"use client";

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Sun, 
  Clock, 
  Tag, 
  Star, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ArrowRight, 
  Map 
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DestinationCard } from '@/components/ui/destinationcard';
import { WeatherWidget } from '@/components/features/weather/WeatherWidget';

// Mock data for destination details
const destinationsData = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise with stunning beaches, vibrant culture, and ancient temples.",
    fullDescription: "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a stretch of fine white sand, or commune with the tropical creatures as you dive along coral ridges or the colorful wreck of a WWII war ship. On shore, the lush jungle shelters stone temples and mischievous monkeys. The island's many resorts offer decadent spa treatments and activities for families. The spiritual side of Bali can be found in the many temples, shrines, and ceremonies that take place daily.",
    image: "/images/destinations/bali.jpg",
    gallery: [
      "/images/destinations/bali.jpg",
      "/images/destinations/kyoto.jpg",
      "/images/destinations/santorini.jpg",
    ],
    rating: 4.8,
    price: "$1,200",
    duration: "7-10 days",
    bestTimeToVisit: "April to October",
    activities: ["Surfing", "Temple visits", "Rice terrace trekking", "Snorkeling", "Spa treatments"],
    popular: true,
    featured: true,
    latitude: -8.409518,
    longitude: 115.188919,
    tags: ["Beach", "Culture", "Adventure"]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    description: "Ancient city filled with traditional temples, serene gardens, and historic sites.",
    fullDescription: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It's also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.",
    image: "/images/destinations/kyoto.jpg",
    gallery: [
      "/images/destinations/kyoto.jpg",
      "/images/destinations/bali.jpg",
      "/images/destinations/santorini.jpg",
    ],
    rating: 4.9,
    price: "$1,750",
    duration: "5-7 days",
    bestTimeToVisit: "March to May and October to November",
    activities: ["Temple visits", "Geisha district tours", "Tea ceremonies", "Garden walks", "Traditional crafts"],
    popular: true,
    featured: false,
    latitude: 35.011665,
    longitude: 135.768326,
    tags: ["History", "Culture", "Temples"]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    description: "Stunning island with white-washed buildings, blue domes, and breathtaking sunsets.",
    fullDescription: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    image: "/images/destinations/santorini.jpg", 
    gallery: [
      "/images/destinations/santorini.jpg",
      "/images/destinations/bali.jpg",
      "/images/destinations/kyoto.jpg",
    ],
    rating: 4.9,
    price: "$1,850",
    duration: "5-7 days",
    bestTimeToVisit: "April to November",
    activities: ["Sunset watching", "Wine tasting", "Beach relaxation", "Sailing", "Volcanic exploration"],
    popular: true,
    featured: true,
    latitude: 36.393154,
    longitude: 25.461510,
    tags: ["Island", "Romantic", "Views"]
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    description: "Vibrant city with unique architecture, Mediterranean beaches, and lively culture.",
    fullDescription: "Barcelona, the cosmopolitan capital of Spain's Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city. Museu Picasso and Fundació Joan Miró feature modern art by their namesakes. City history museum includes excavated Roman ruins.",
    image: "/images/destinations/barcelona.jpg",
    gallery: [
      "/images/destinations/barcelona.jpg",
      "/images/destinations/santorini.jpg", 
      "/images/destinations/marrakech.jpg",
    ],
    rating: 4.7,
    price: "$1,300",
    duration: "4-6 days",
    bestTimeToVisit: "May to June and September to October",
    activities: ["Gaudi architecture tours", "La Rambla walking", "Tapas tasting", "Beach time", "Gothic Quarter exploration"],
    popular: true,
    featured: false,
    latitude: 41.385064,
    longitude: 2.173404,
    tags: ["City", "Architecture", "Food"]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    description: "Exotic destination with colorful markets, historic palaces, and desert adventures.",
    fullDescription: "Marrakech, a former imperial city in western Morocco, is a major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city dating to the Berber Empire, with mazelike alleys where thriving souks (marketplaces) sell traditional textiles, pottery and jewelry. A symbol of the city, and visible for miles, is the Moorish minaret of 12th-century Koutoubia Mosque.",
    image: "/images/destinations/marrakech.jpg",
    gallery: [
      "/images/destinations/marrakech.jpg",
      "/images/destinations/barcelona.jpg",
      "/images/destinations/queenstown.jpg",
    ],
    rating: 4.6,
    price: "$950",
    duration: "4-5 days",
    bestTimeToVisit: "March to May and September to November",
    activities: ["Medina exploration", "Souk shopping", "Palace visits", "Desert excursions", "Hammam spa"],
    popular: true,
    featured: false,
    latitude: 31.631794,
    longitude: -7.989261,
    tags: ["Culture", "Markets", "History"]
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    description: "Adventure capital with stunning alpine scenery, outdoor activities, and pristine lakes.",
    fullDescription: "Queenstown, New Zealand, sits on the shores of the South Island's Lake Wakatipu, set against the dramatic Southern Alps. Renowned for adventure sports, it's also a base for exploring the region's vineyards and historic mining towns. There's bungee jumping off Kawarau Gorge Suspension Bridge and jet-boating on the Shotover and Dart rivers. In winter, there's skiing on the slopes of The Remarkables and Coronet Peak.",
    image: "/images/destinations/queenstown.jpg",
    gallery: [
      "/images/destinations/queenstown.jpg",
      "/images/destinations/marrakech.jpg",
      "/images/destinations/barcelona.jpg",
    ],
    rating: 4.8,
    price: "$2,100",
    duration: "7-10 days",
    bestTimeToVisit: "December to February and June to August",
    activities: ["Bungee jumping", "Skiing", "Hiking", "Wine tours", "Lake cruises"],
    popular: true,
    featured: false,
    latitude: -45.031162,
    longitude: 168.662643,
    tags: ["Adventure", "Nature", "Mountains"]
  },
];

export default function DestinationDetail() {
  const { slug } = useParams();
  const [destination, setDestination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    setIsLoading(true);
    
    setTimeout(() => {
      const foundDestination = destinationsData.find(
        d => d.name.toLowerCase().replace(/\s+/g, '-') === slug
      );
      
      if (foundDestination) {
        setDestination(foundDestination);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        // If not found, this will trigger the notFound() response
      }
    }, 500);
  }, [slug]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show 404 if destination not found
  if (!destination) {
    notFound();
  }

  // Get similar destinations (excluding current one)
  const similarDestinations = destinationsData
    .filter(d => d.id !== destination.id)
    .filter(d => d.tags.some(tag => destination.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with image gallery */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Main image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={destination.gallery[activeImage]}
            alt={destination.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </motion.div>
        
        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/destinations">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-6 right-6 z-10 flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Thumbnails */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            {destination.gallery.map((img, index) => (
              <button
                key={index}
                className={`h-16 w-24 rounded-md overflow-hidden border-2 transition-all ${
                  activeImage === index ? 'border-primary' : 'border-white/50'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={img}
                    alt={`${destination.name} gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Destination info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center text-white/90 mb-4">
              <div className="flex items-center mr-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{destination.country}</span>
              </div>
              <div className="flex items-center mr-4">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{destination.rating} rating</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {destination.tags.map((tag, index) => (
                  <span key={index} className="mr-1">
                    {tag}{index < destination.tags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-white/90 max-w-2xl text-sm md:text-base">
              {destination.description}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                <p className="text-gray-700 mb-6">
                  {destination.fullDescription}
                </p>
                
                {/* Key information */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary mb-2" />
                    <h3 className="text-sm font-medium text-gray-700">Best Time</h3>
                    <p className="text-sm text-gray-600 text-center">{destination.bestTimeToVisit}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 text-primary mb-2" />
                    <h3 className="text-sm font-medium text-gray-700">Duration</h3>
                    <p className="text-sm text-gray-600 text-center">{destination.duration}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 text-primary mb-2" />
                    <h3 className="text-sm font-medium text-gray-700">Ideal for</h3>
                    <p className="text-sm text-gray-600 text-center">
                      {destination.tags.slice(0, 2).join(', ')}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Sun className="h-6 w-6 text-primary mb-2" />
                    <h3 className="text-sm font-medium text-gray-700">Weather</h3>
                    <p className="text-sm text-gray-600 text-center">
                      {destination.tags.includes('Beach') ? 'Warm & Sunny' : 
                       destination.tags.includes('Mountains') ? 'Alpine Climate' : 
                       'Varies by Season'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Activities */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Activities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.activities.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 mr-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{activity}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Interactive map */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Location</h2>
                  <Button variant="outline" size="sm">
                    <Map className="h-4 w-4 mr-1" />
                    View Full Map
                  </Button>
                </div>
                
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-600">Interactive map would be displayed here</p>
                    <p className="absolute bottom-4 left-4 text-sm bg-white/80 px-2 py-1 rounded">
                      Lat: {destination.latitude}, Long: {destination.longitude}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - sidebar */}
            <div className="space-y-6">
              {/* Price card */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Starting from</p>
                    <p className="text-3xl font-bold text-primary">{destination.price}</p>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                  <Badge>Flexible booking</Badge>
                </div>
                
                <Button className="w-full mb-3">Book Now</Button>
                <Button variant="outline" className="w-full">Customize Trip</Button>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-700 flex items-center mb-2">
                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                    <span>Private tours available</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span>Free cancellation 7 days before</span>
                  </p>
                </div>
              </div>
              
              {/* Weather */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Weather Forecast</h3>
                </div>
                <div className="p-2">
                  <WeatherWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Similar destinations */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar Destinations</h2>
            <Link href="/destinations" className="text-primary flex items-center text-sm font-medium">
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarDestinations.map(dest => (
              <DestinationCard
                key={dest.id}
                id={dest.id}
                name={dest.name}
                country={dest.country}
                description={dest.description}
                image={dest.image}
                rating={dest.rating}
                price={dest.price}
                category={dest.tags[0]}
                featured={dest.featured}
                tags={dest.tags}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 