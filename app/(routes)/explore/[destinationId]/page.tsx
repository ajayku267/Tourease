"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  Heart, 
  Share2, 
  Globe, 
  Tag, 
  Info,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import WeatherWidget from '../../../components/ui/WeatherWidget';
import AIChatbot from '../../../components/features/AIChatbot';
import ReviewsList from '../../../components/ui/ReviewsList';
import ActivityBookingCard from '../../../components/ui/ActivityBookingCard';

// Mock data - In a real app, fetch this based on the destinationId
const getMockDestination = (id: string) => {
  const destinations = [
    {
      id: "1",
      name: "Santorini",
      country: "Greece",
      description: "Santorini is one of the most beautiful destinations in the world. Known for its stunning sunsets, white-washed buildings, and blue domes, this Greek island offers breathtaking views of the Aegean Sea. The beaches feature unique black, red, and white volcanic sand, and the island's rich history dates back thousands of years with ancient ruins to explore.",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      rating: 4.8,
      continent: "Europe",
      categories: ["beach", "culture", "romantic"],
      weather: {
        temp: 26,
        condition: "Sunny"
      },
      activities: [
        { name: "Sunset at Oia", price: "Free", duration: "2 hours" },
        { name: "Wine Tasting Tour", price: "$50", duration: "4 hours" },
        { name: "Ancient Akrotiri Ruins", price: "$20", duration: "3 hours" },
        { name: "Red Beach Visit", price: "Free", duration: "Half day" },
        { name: "Catamaran Cruise", price: "$120", duration: "Full day" }
      ],
      bestTimeToVisit: "April to October",
      averageCost: "$150/day",
      images: [
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1557668364-d8be323b0ad3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
      ],
      reviews: [
        {
          id: "r1",
          user: {
            name: "Emily Johnson",
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
            trips: 15
          },
          rating: 5,
          date: "2023-06-15",
          title: "A paradise on Earth!",
          text: "Santorini exceeded all my expectations. The views from Oia are absolutely breathtaking, especially during sunset. We stayed in a cave hotel with a private pool overlooking the caldera - worth every penny! The food was amazing everywhere we went. Don't miss the wine tasting tours, the volcanic soil gives the wine a unique flavor. Also highly recommend taking a catamaran tour around the island to see the red and white beaches. The only downside is that it gets very crowded during peak season, but waking up early helps avoid the crowds.",
          helpful: 24,
          images: [
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          ]
        },
        {
          id: "r2",
          user: {
            name: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            trips: 8
          },
          rating: 4,
          date: "2023-05-22",
          title: "Beautiful but expensive",
          text: "The scenery in Santorini is simply magical. The white buildings against the blue sea create a picture-perfect setting. However, be prepared to spend a lot. Everything from accommodations to food is quite expensive compared to other Greek islands. The beaches were interesting with their volcanic sand, but not the best for swimming. I'd recommend spending 3-4 days here max and combining it with visits to other islands for a complete Greek experience.",
          helpful: 18
        },
        {
          id: "r3",
          user: {
            name: "Sophie Miller",
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
            trips: 20
          },
          rating: 5,
          date: "2023-04-10",
          title: "Honeymoon dream destination",
          text: "We visited Santorini for our honeymoon and it was perfect! Watching the sunset from Oia is a magical experience that will stay with us forever. The local cuisine is fantastic - try the tomato keftedes and fresh seafood. We did a wine tour that included 3 different wineries and it was one of the highlights of our trip. Make sure to book accommodations with a caldera view - it's absolutely worth it!",
          helpful: 15
        },
        {
          id: "r4",
          user: {
            name: "James Wilson",
            avatar: "https://randomuser.me/api/portraits/men/52.jpg",
            trips: 6
          },
          rating: 3,
          date: "2023-07-05",
          title: "Mixed feelings",
          text: "While Santorini has stunning views and photo opportunities, it felt too touristy and overcrowded in July. The narrow streets of Oia were packed with people trying to take the same Instagram photos. Prices are extremely high for what you get. That said, the sunset views are genuinely spectacular and the island's unique geology is interesting. If you do visit, consider going in shoulder season to avoid crowds.",
          helpful: 30
        }
      ],
      tours: [
        {
          id: "tour1",
          name: "Santorini Sunset Catamaran Cruise",
          duration: "5 hours",
          description: "Experience the magic of Santorini from the water on this catamaran cruise. Sail along the caldera, stop for swimming and snorkeling, and enjoy a delicious BBQ dinner on board while watching the famous Santorini sunset.",
          price: 149,
          rating: 4.9,
          reviewCount: 412,
          availableDates: [
            "2023-07-15", "2023-07-16", "2023-07-17", "2023-07-18", 
            "2023-07-19", "2023-07-20", "2023-07-21"
          ],
          timeSlots: ["10:00 AM", "3:00 PM"],
          features: [
            "Hotel pickup/drop-off", 
            "BBQ meal", 
            "Unlimited drinks", 
            "Snorkeling equipment",
            "Sunset views"
          ]
        },
        {
          id: "tour2",
          name: "Akrotiri Archaeological Site & Red Beach Tour",
          duration: "4 hours",
          description: "Discover the ancient city of Akrotiri, often called the 'Prehistoric Pompeii', with a knowledgeable guide. Then visit the famous Red Beach to swim in the crystal clear waters and enjoy the unique volcanic landscape.",
          price: 89,
          rating: 4.7,
          reviewCount: 245,
          availableDates: [
            "2023-07-15", "2023-07-16", "2023-07-17", "2023-07-18", 
            "2023-07-19", "2023-07-20", "2023-07-21"
          ],
          timeSlots: ["9:00 AM", "1:00 PM"],
          features: [
            "Professional guide", 
            "Entrance fees", 
            "Transport by air-conditioned minivan", 
            "Hotel pickup/drop-off"
          ]
        },
        {
          id: "tour3",
          name: "Wine Tasting Tour with Sunset in Oia",
          duration: "6 hours",
          description: "Sample the island's exceptional wines at three traditional wineries, learning about Santorini's unique viticulture. Finish the day in Oia to experience the world-famous sunset over the caldera.",
          price: 119,
          rating: 4.8,
          reviewCount: 189,
          availableDates: [
            "2023-07-15", "2023-07-16", "2023-07-17", "2023-07-18", 
            "2023-07-19", "2023-07-20", "2023-07-21"
          ],
          timeSlots: ["3:00 PM"],
          features: [
            "Visit to 3 wineries", 
            "Wine tasting (12 different wines)", 
            "Local snacks", 
            "Hotel pickup/drop-off",
            "Sunset viewpoint in Oia"
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Kyoto",
      country: "Japan",
      description: "Kyoto, once the capital of Japan, is a city of incredible temples, shrines, gardens, and palaces. With more than 1,600 Buddhist temples and 400 Shinto shrines, it's a beautiful showcase of Japanese history and culture. Walk through the famous Arashiyama Bamboo Grove, visit the golden Kinkaku-ji Temple, and experience traditional geisha culture in the Gion district.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      rating: 4.7,
      continent: "Asia",
      categories: ["culture", "historical", "food"],
      weather: {
        temp: 22,
        condition: "Partly Cloudy"
      },
      activities: [
        { name: "Fushimi Inari Shrine", price: "Free", duration: "2-3 hours" },
        { name: "Kinkaku-ji (Golden Pavilion)", price: "$5", duration: "1 hour" },
        { name: "Arashiyama Bamboo Grove", price: "Free", duration: "1-2 hours" },
        { name: "Gion District Tour", price: "$30", duration: "3 hours" },
        { name: "Tea Ceremony Experience", price: "$45", duration: "1 hour" }
      ],
      bestTimeToVisit: "March-April (cherry blossoms) or November (autumn colors)",
      averageCost: "$120/day",
      images: [
        "https://images.unsplash.com/photo-1537153725174-cfd2f17f673a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1575862978747-c4c5407ccfb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1597106776019-b4ecc878c202?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: "3",
      name: "Bali",
      country: "Indonesia",
      description: "Bali is known as the Island of the Gods, offering diverse landscapes from rugged coastlines to sandy beaches, lush rice terraces, and volcanic hillsides. The island features world-class surfing, diving, and a range of wellness retreats alongside ancient temples and vibrant cultural traditions. Ubud, the cultural heart of Bali, showcases traditional crafts and dances.",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      rating: 4.6,
      continent: "Asia",
      categories: ["beach", "adventure", "wellness"],
      weather: {
        temp: 29,
        condition: "Sunny"
      },
      activities: [
        { name: "Ubud Monkey Forest", price: "$5", duration: "2 hours" },
        { name: "Tegallalang Rice Terraces", price: "$2", duration: "2 hours" },
        { name: "Uluwatu Temple", price: "$3", duration: "2 hours" },
        { name: "Surf Lesson in Kuta", price: "$35", duration: "2 hours" },
        { name: "Balinese Cooking Class", price: "$30", duration: "4 hours" }
      ],
      bestTimeToVisit: "April to October (dry season)",
      averageCost: "$80/day",
      images: [
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1558005530-a7958896ec60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
      ]
    }
  ];
  
  return destinations.find(dest => dest.id === id) || destinations[0];
};

const DestinationPage = ({ params }: { params: { destinationId: string } }) => {
  const [destination, setDestination] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchDestination = async () => {
      setIsLoading(true);
      // In a real app, you would make an API call here
      setTimeout(() => {
        const data = getMockDestination(params.destinationId);
        setDestination(data);
        setIsLoading(false);
      }, 800);
    };

    fetchDestination();
  }, [params.destinationId]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 pb-20 min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-xl text-gray-600">Loading destination details...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!destination) {
    return (
      <>
        <Navbar />
        <div className="pt-20 pb-20 min-h-screen">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Destination not found</h2>
              <p className="mt-4">Sorry, we couldn't find the destination you're looking for.</p>
              <Link href="/explore" className="mt-6 inline-block text-[#ff5f1f] hover:underline">
                Return to Explore page
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div 
        className="pt-20 pb-20 min-h-screen bg-slate-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/explore" 
            className="inline-flex items-center mb-5 text-gray-600 hover:text-[#ff5f1f] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Explore
          </Link>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Column - Images */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 aspect-[16/9]">
                <Image
                  src={destination.images[activeImageIndex] || destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {destination.images.map((img: string, index: number) => (
                  <div 
                    key={index}
                    className={`relative rounded-lg overflow-hidden cursor-pointer aspect-video shadow hover:shadow-md transform transition hover:scale-105 ${index === activeImageIndex ? 'ring-2 ring-[#ff5f1f]' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={img}
                      alt={`${destination.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Info */}
            <motion.div variants={itemVariants}>
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{destination.name}</h1>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-gray-600">{destination.country}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium">{destination.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  {destination.categories.map((category: string) => (
                    <span 
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3 mb-6">
                  <button 
                    className={`flex-1 flex justify-center items-center py-2 px-4 rounded-lg ${
                      isFavorite 
                        ? 'bg-pink-100 text-pink-700 border border-pink-300' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-pink-700 text-pink-700' : ''}`} />
                    {isFavorite ? 'Saved' : 'Save'}
                  </button>
                  <button className="flex-1 flex justify-center items-center py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Best Time to Visit</h3>
                      <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Suggested Duration</h3>
                      <p className="text-gray-600">5-7 days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Languages</h3>
                      <p className="text-gray-600">English, {destination.country === "Japan" ? "Japanese" : destination.country === "Greece" ? "Greek" : "Indonesian"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Tag className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Average Cost</h3>
                      <p className="text-gray-600">{destination.averageCost}</p>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/plan?destination=${encodeURIComponent(destination.name)}`}
                  className="w-full py-3 bg-[#ff5f1f] text-white font-medium rounded-lg flex justify-center items-center hover:bg-[#e55214] transition-colors"
                >
                  Plan a Trip to {destination.name}
                </Link>
              </div>
              
              {/* Add Activity Booking Card */}
              <ActivityBookingCard 
                destination={destination.name}
                activities={destination.tours || []}
              />
            </motion.div>
          </motion.div>

          {/* Description Section */}
          <motion.div 
            className="mt-8 bg-white p-6 rounded-xl shadow-lg"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{destination.description}</p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Weather</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <WeatherWidget location={destination.name} />
              </div>
            </div>
          </motion.div>

          {/* Activities Section */}
          <motion.div 
            className="mt-8 bg-white p-6 rounded-xl shadow-lg"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.activities.map((activity: any, index: number) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {activity.duration}
                    </span>
                    <span className={`font-medium ${activity.price === "Free" ? "text-green-600" : "text-gray-800"}`}>
                      {activity.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Travel Tips Section */}
          <motion.div 
            className="mt-8 bg-white p-6 rounded-xl shadow-lg"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel Tips</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div className="flex">
                <Info className="h-6 w-6 text-yellow-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Know Before You Go</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {destination.country === "Japan" ? "Tipping is not common in Japan" : destination.country === "Greece" ? "Many shops and restaurants close during afternoon siesta hours" : "Dress modestly when visiting temples"}</li>
                    <li>• {destination.country === "Japan" ? "Learn basic Japanese phrases" : destination.country === "Greece" ? "The peak tourist season is from June to September" : "Bargaining is common in markets"}</li>
                    <li>• {destination.country === "Japan" ? "Carry cash as many places don't accept credit cards" : destination.country === "Greece" ? "Tap water is safe to drink in most areas" : "Be careful of monkeys - they may steal your belongings"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <motion.div 
            className="mt-8"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <ReviewsList 
              destinationName={destination.name}
              reviews={destination.reviews || []}
            />
          </motion.div>
        </div>
      </motion.div>
      <Footer />
      <AIChatbot />
    </>
  );
};

export default DestinationPage; 