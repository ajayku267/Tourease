"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { 
  StarIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartIcon,
  TagIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Featured trips data
const featuredTrips = [
  {
    id: 1,
    title: "Japanese Cherry Blossom Tour",
    location: "Tokyo, Kyoto, Osaka",
    country: "Japan",
    duration: "10 days",
    season: "Spring",
    price: 2499,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    tags: ["Culture", "Nature", "Photography"],
    discount: 15
  },
  {
    id: 2,
    title: "Northern Lights Adventure",
    location: "Tromsø, Alta, Kirkenes",
    country: "Norway",
    duration: "7 days",
    season: "Winter",
    price: 1899,
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1520769945061-0a448c463865?q=80&w=800&auto=format&fit=crop",
    tags: ["Adventure", "Photography", "Nature"]
  },
  {
    id: 3,
    title: "Greek Island Hopping",
    location: "Athens, Mykonos, Santorini",
    country: "Greece",
    duration: "12 days",
    season: "Summer",
    price: 2199,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    tags: ["Beach", "Relaxation", "Culture"]
  },
  {
    id: 4,
    title: "Machu Picchu & Sacred Valley",
    location: "Lima, Cusco, Aguas Calientes",
    country: "Peru",
    duration: "9 days",
    season: "Fall",
    price: 1799,
    rating: 4.9,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800&auto=format&fit=crop",
    tags: ["Adventure", "History", "Hiking"],
    discount: 10
  },
  {
    id: 5,
    title: "Safari & Beach Vacation",
    location: "Nairobi, Maasai Mara, Diani Beach",
    country: "Kenya",
    duration: "14 days",
    season: "Summer",
    price: 3299,
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800&auto=format&fit=crop",
    tags: ["Wildlife", "Beach", "Nature"]
  },
  {
    id: 6,
    title: "Bali Paradise Retreat",
    location: "Ubud, Seminyak, Nusa Penida",
    country: "Indonesia",
    duration: "11 days",
    season: "Spring",
    price: 1699,
    rating: 4.6,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    tags: ["Wellness", "Culture", "Beach"],
    discount: 20
  },
];

export function FeaturedTripsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const itemsPerScreen = isDesktop ? 3 : isTablet ? 2 : 1;
  const totalScreens = Math.ceil(featuredTrips.length / itemsPerScreen);

  const handleNext = () => {
    if (activeIndex < totalScreens - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0); // Loop back to start
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(totalScreens - 1); // Loop to end
    }
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) {
        handleNext();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Scroll to active index
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = activeIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, itemsPerScreen]);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text font-semibold tracking-wider uppercase text-sm mb-2 inline-block">
              Curated Experiences
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Trip Packages
            </h2>
            <p className="text-gray-600">
              Handpicked journeys designed by travel experts to provide unforgettable experiences
            </p>
          </motion.div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Previous trips"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Next trips"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex" style={{ width: `${100 * totalScreens}%` }}>
              {featuredTrips.map((trip) => (
                <motion.div
                  key={trip.id}
                  className="px-3 snap-start"
                  style={{ width: `${100 / featuredTrips.length}%` }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/trips/${trip.id}`} className="block h-full">
                    <div className="bg-white rounded-2xl shadow-lg h-full overflow-hidden">
                      {/* Image container */}
                      <div className="relative h-56 lg:h-64 overflow-hidden">
                        <Image
                          src={trip.image}
                          alt={trip.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                        
                        {/* Overlay elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                        
                        {/* Country badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-gray-800 hover:bg-white/80">
                            {trip.country}
                          </Badge>
                        </div>
                        
                        {/* Favorite button */}
                        <button
                          onClick={(e) => toggleFavorite(trip.id, e)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                          aria-label={favorites.includes(trip.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <HeartIcon 
                            className={`h-5 w-5 ${favorites.includes(trip.id) ? "fill-red-500 text-red-500" : "text-gray-700"}`}
                          />
                        </button>
                        
                        {/* Price tag */}
                        <div className="absolute bottom-3 right-3">
                          <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg flex items-center">
                            {trip.discount && (
                              <span className="line-through text-white/70 text-sm mr-2">
                                ${Math.round(trip.price * (100 + trip.discount) / 100)}
                              </span>
                            )}
                            ${trip.price}
                          </div>
                        </div>
                        
                        {/* Discount badge */}
                        {trip.discount && (
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 transform rotate-0">
                            <Badge className="bg-red-500 text-white">
                              {trip.discount}% OFF
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center text-yellow-500 mb-2">
                          <StarIcon className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm font-medium">{trip.rating}</span>
                          <span className="mx-1.5 text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{trip.reviews} reviews</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                          {trip.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPinIcon className="h-4 w-4 flex-shrink-0 mr-1" />
                          <span className="text-sm truncate">{trip.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {trip.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="border-t pt-4 flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">{trip.season}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">{trip.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalScreens }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`mx-1 h-2 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'w-8 bg-blue-600' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* View all link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/trips">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              View All Trip Packages
              <TagIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 