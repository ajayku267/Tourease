"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Home, 
  Car,
  Utensils,
  Compass,
  CheckCircle,
  Edit2,
  Share2,
  Download,
  Printer,
  ArrowLeft,
  PlusCircle
} from 'lucide-react';
import WeatherWidget from '../../../components/ui/WeatherWidget';
import AIChatbot from '../../../components/features/AIChatbot';

// Mock data for a trip
const getMockTrip = (id: string) => {
  const trips = [
    {
      id: "1",
      name: "Greek Island Adventure",
      destination: "Santorini",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      startDate: "2023-08-15",
      endDate: "2023-08-22",
      days: 8,
      travelers: 2,
      budget: "$3,500",
      status: "Upcoming",
      accommodation: {
        name: "Blue Dome Luxury Suites",
        address: "Oia, Santorini, Greece",
        checkIn: "2023-08-15",
        checkOut: "2023-08-22",
        price: "$220/night",
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
      },
      transportation: {
        type: "Flight + Rental Car",
        details: "Athens International Airport to Santorini Airport",
        departureDate: "2023-08-15",
        departureTime: "10:30 AM",
        returnDate: "2023-08-22",
        returnTime: "4:45 PM",
        price: "$850"
      },
      itinerary: [
        {
          day: 1,
          date: "2023-08-15",
          activities: [
            {
              time: "12:00 PM",
              title: "Arrival and Check-in",
              description: "Arrive at Santorini Airport, pick up rental car, and check in to accommodation."
            },
            {
              time: "7:00 PM",
              title: "Sunset Dinner in Oia",
              description: "Enjoy dinner with a view of Santorini's famous sunset from Oia."
            }
          ]
        },
        {
          day: 2,
          date: "2023-08-16",
          activities: [
            {
              time: "9:00 AM",
              title: "Explore Fira",
              description: "Walk around the capital of Santorini and enjoy the views."
            },
            {
              time: "2:00 PM",
              title: "Wine Tasting Tour",
              description: "Visit local wineries and taste Santorini's unique wines."
            }
          ]
        },
        {
          day: 3,
          date: "2023-08-17",
          activities: [
            {
              time: "10:00 AM",
              title: "Red Beach Visit",
              description: "Spend the day at the famous Red Beach."
            },
            {
              time: "4:00 PM",
              title: "Ancient Akrotiri Ruins",
              description: "Explore the prehistoric archaeological site of Akrotiri."
            }
          ]
        },
        {
          day: 4,
          date: "2023-08-18",
          activities: [
            {
              time: "9:30 AM",
              title: "Catamaran Cruise",
              description: "Full-day cruise around the island with stops for swimming and snorkeling."
            }
          ]
        },
        {
          day: 5,
          date: "2023-08-19",
          activities: [
            {
              time: "10:00 AM",
              title: "Hike from Fira to Oia",
              description: "Take the scenic coastal path from Fira to Oia."
            },
            {
              time: "7:00 PM",
              title: "Dinner in Amoudi Bay",
              description: "Fresh seafood dinner at a taverna by the water."
            }
          ]
        },
        {
          day: 6,
          date: "2023-08-20",
          activities: [
            {
              time: "11:00 AM",
              title: "Perissa Black Beach",
              description: "Relax at the black sand beach of Perissa."
            },
            {
              time: "5:00 PM",
              title: "Visit Pyrgos Village",
              description: "Explore the well-preserved medieval village of Pyrgos."
            }
          ]
        },
        {
          day: 7,
          date: "2023-08-21",
          activities: [
            {
              time: "10:00 AM",
              title: "Santorini Cooking Class",
              description: "Learn to cook traditional Greek dishes."
            },
            {
              time: "8:00 PM",
              title: "Farewell Dinner in Imerovigli",
              description: "Enjoy your last evening with a special dinner."
            }
          ]
        },
        {
          day: 8,
          date: "2023-08-22",
          activities: [
            {
              time: "10:00 AM",
              title: "Check-out and Departure",
              description: "Check out from accommodation and head to the airport."
            }
          ]
        }
      ],
      notes: "Remember to bring sunscreen, a hat, and comfortable walking shoes. The sun can be intense in August."
    },
    {
      id: "2",
      name: "Tokyo Explorer",
      destination: "Tokyo",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      startDate: "2023-11-10",
      endDate: "2023-11-17",
      days: 8,
      travelers: 1,
      budget: "$2,800",
      status: "Upcoming",
      accommodation: {
        name: "Shinjuku Granbell Hotel",
        address: "Shinjuku, Tokyo, Japan",
        checkIn: "2023-11-10",
        checkOut: "2023-11-17",
        price: "$180/night",
        image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
      },
      transportation: {
        type: "Flight + Public Transport",
        details: "Narita International Airport to Tokyo",
        departureDate: "2023-11-10",
        departureTime: "9:45 AM",
        returnDate: "2023-11-17",
        returnTime: "6:30 PM",
        price: "$1,200"
      },
      itinerary: [
        {
          day: 1,
          date: "2023-11-10",
          activities: [
            {
              time: "3:00 PM",
              title: "Arrival and Check-in",
              description: "Arrive at Narita International Airport, take NEX train to Tokyo, and check in to hotel."
            },
            {
              time: "7:00 PM",
              title: "Dinner in Shinjuku",
              description: "Get acclimated with dinner in the vibrant Shinjuku district."
            }
          ]
        },
        {
          day: 2,
          date: "2023-11-11",
          activities: [
            {
              time: "9:00 AM",
              title: "Meiji Shrine",
              description: "Visit the famous Shinto shrine dedicated to Emperor Meiji."
            },
            {
              time: "1:00 PM",
              title: "Harajuku and Takeshita Street",
              description: "Explore Tokyo's youth fashion center and unique shops."
            },
            {
              time: "5:00 PM",
              title: "Shibuya Crossing",
              description: "Experience the world's busiest pedestrian crossing."
            }
          ]
        }
      ],
      notes: "Purchase a 7-day Japan Rail Pass before arriving in Japan for cost-effective travel. Remember to bring comfortable shoes as there will be a lot of walking."
    }
  ];
  
  return trips.find(trip => trip.id === id) || trips[0];
};

const TripPage = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchTrip = async () => {
      setIsLoading(true);
      // In a real app, you would make an API call here
      setTimeout(() => {
        const data = getMockTrip(params.tripId);
        setTrip(data);
        setIsLoading(false);
      }, 800);
    };

    fetchTrip();
  }, [params.tripId]);

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
      <div className="min-h-screen flex flex-col">
        <div className="pt-20 pb-20 min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-xl text-gray-600">Loading trip details...</div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="pt-20 pb-20 min-h-screen">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Trip not found</h2>
              <p className="mt-4">Sorry, we couldn't find the trip you're looking for.</p>
              <Link href="/dashboard" className="mt-6 inline-block text-[#ff5f1f] hover:underline">
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center mb-6 text-gray-600 hover:text-[#ff5f1f] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>

          {/* Trip Header */}
          <motion.div 
            className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-20 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    trip.status === 'Completed' ? 'bg-green-500' : 
                    trip.status === 'Upcoming' ? 'bg-blue-500' : 
                    'bg-yellow-500'
                  }`}>
                    {trip.status}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold mt-2">{trip.name}</h1>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{trip.destination}, {trip.country}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            {trip.image && (
              <Image
                src={trip.image}
                alt={trip.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trip Summary */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Trip Details */}
              <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Dates</h3>
                      <p className="text-gray-600">
                        {trip.startDate} - {trip.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Duration</h3>
                      <p className="text-gray-600">{trip.days} days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Travelers</h3>
                      <p className="text-gray-600">{trip.travelers} {trip.travelers === 1 ? 'person' : 'people'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-[#ff5f1f] mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v1M12 21v1M4.2 4.2l.8.8M19 19l.8.8M2 12h1M21 12h1M4.2 19.8l.8-.8M19 5l.8-.8" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Weather</h3>
                      <div className="mt-1">
                        <WeatherWidget location={trip.destination} compact />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Accommodation */}
              <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Accommodation</h2>
                <div className="relative h-36 rounded-lg overflow-hidden mb-4">
                  {trip.accommodation.image && (
                    <Image
                      src={trip.accommodation.image}
                      alt={trip.accommodation.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{trip.accommodation.name}</h3>
                <div className="flex items-start mt-3">
                  <Home className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-gray-600">{trip.accommodation.address}</p>
                  </div>
                </div>
                <div className="flex items-start mt-3">
                  <Calendar className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Check-in / Check-out</h4>
                    <p className="text-gray-600">
                      {trip.accommodation.checkIn} - {trip.accommodation.checkOut}
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-right">
                  <p className="font-semibold text-gray-900">{trip.accommodation.price}</p>
                </div>
              </motion.div>

              {/* Transportation */}
              <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Transportation</h2>
                <div className="flex items-start">
                  <Car className="h-5 w-5 text-[#ff5f1f] mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Type</h3>
                    <p className="text-gray-600">{trip.transportation.type}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="font-medium">
                        {trip.transportation.departureDate}, {trip.transportation.departureTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Return</p>
                      <p className="font-medium">
                        {trip.transportation.returnDate}, {trip.transportation.returnTime}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{trip.transportation.details}</p>
                </div>
                <div className="mt-3 text-right">
                  <p className="font-semibold text-gray-900">{trip.transportation.price}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-[#ff5f1f] transition-colors">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-[#ff5f1f] transition-colors">
                      <Printer className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Day tabs */}
                <div className="flex overflow-x-auto pb-2 mb-4">
                  {trip.itinerary.map((day: any) => (
                    <button
                      key={day.day}
                      onClick={() => setActiveDay(day.day)}
                      className={`flex-shrink-0 px-4 py-2 mr-2 rounded-lg transition-colors ${
                        activeDay === day.day 
                          ? 'bg-[#ff5f1f] text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Day {day.day}
                    </button>
                  ))}
                </div>

                {/* Active day schedule */}
                {trip.itinerary.map((day: any) => (
                  <div key={day.day} className={activeDay === day.day ? 'block' : 'hidden'}>
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-[#ff5f1f] mr-2" />
                      <h3 className="font-medium text-gray-900">
                        {day.date}
                      </h3>
                    </div>

                    <div className="relative pl-8 border-l-2 border-gray-200">
                      {day.activities.map((activity: any, index: number) => (
                        <div 
                          key={index} 
                          className="mb-6 relative"
                        >
                          <div className="absolute -left-[2.8rem] mt-1 w-6 h-6 rounded-full bg-[#ff5f1f] text-white flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-white" />
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-sm font-medium text-[#ff5f1f] mb-1">{activity.time}</p>
                            <h4 className="font-medium text-gray-900 mb-1">{activity.title}</h4>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                      <button className="absolute -left-4 bottom-0 text-[#ff5f1f] hover:text-[#e55214] transition-colors">
                        <PlusCircle className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Notes and Tips */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md mt-6"
                variants={itemVariants}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notes and Tips</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-gray-700">{trip.notes}</p>
                </div>
              </motion.div>

              {/* Travel Checklist */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md mt-6"
                variants={itemVariants}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Travel Checklist</h2>
                <div className="space-y-2">
                  {['Passport/ID', 'Flight Tickets', 'Hotel Reservation', 'Travel Insurance', 'Currency Exchange', 'Phone Charger', 'Adapters'].map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="h-5 w-5 rounded flex items-center justify-center mr-3 border border-gray-300">
                        <CheckCircle className="h-4 w-4 text-[#ff5f1f]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  );
};

export default TripPage; 