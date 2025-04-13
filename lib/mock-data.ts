import { faker } from '@faker-js/faker';

// Define the TravelPost type 
export interface TravelPost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  location: string;
  country: string;
  images: string[];
  caption: string;
  likes: number;
  comments: number;
  createdAt: Date;
  tags: string[];
}

// Array of popular travel destinations
const destinations = [
  { location: 'Bali', country: 'Indonesia' },
  { location: 'Kyoto', country: 'Japan' },
  { location: 'Santorini', country: 'Greece' },
  { location: 'Paris', country: 'France' },
  { location: 'Marrakech', country: 'Morocco' },
  { location: 'New York', country: 'USA' },
  { location: 'Barcelona', country: 'Spain' },
  { location: 'Cape Town', country: 'South Africa' },
  { location: 'Maldives', country: 'Maldives' },
  { location: 'Rio de Janeiro', country: 'Brazil' },
  { location: 'Bangkok', country: 'Thailand' },
  { location: 'Queenstown', country: 'New Zealand' },
];

// Array of popular travel tags
const travelTags = [
  'adventure', 'wanderlust', 'travel', 'travelgram', 'nature', 
  'explore', 'vacation', 'holiday', 'photography', 'travelblogger',
  'beach', 'mountains', 'cityscape', 'foodie', 'architecture',
  'sunset', 'backpacking', 'luxury', 'roadtrip', 'travelphotography'
];

// Generate a random travel image URL
function getRandomTravelImage(): string {
  // Using picsum for random travel-like images with a random seed to get different images
  const width = 600;
  const height = 800;
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/seed/travel${randomId}/${width}/${height}`;
}

// Generate captivating travel captions
function generateTravelCaption(location: string): string {
  const captions = [
    `Lost in the magic of ${location}. Every corner is a new discovery! ✨`,
    `${location} has my heart. Can't believe the beauty of this place. 🌍`,
    `The journey of a thousand miles begins with a single step. Today's step: ${location}. 🚶‍♂️`,
    `Finding paradise in ${location}. Sometimes you need to get lost to find yourself. 🧭`,
    `${location} diaries: Chapter 1 of many. The adventure continues! 📖`,
    `Travel far, travel wide, travel deep. ${location} has it all. 🌄`,
    `${location} - where the wifi is weak but the connections are strong. 🔌❤️`,
    `Collecting moments, not things, in beautiful ${location}. 📸`,
    `${location} - a place that makes you realize how tiny you are in this world. 🌎`,
    `Not all who wander are lost, but I did get pretty lost in ${location} today! 🗺️`,
  ];
  
  return captions[Math.floor(Math.random() * captions.length)];
}

// Generate mock travel post data
export function generateRandomPost(id: string): TravelPost {
  // Select a random destination
  const destination = destinations[Math.floor(Math.random() * destinations.length)];
  
  // Generate between 1-3 images for the post
  const numImages = Math.floor(Math.random() * 3) + 1;
  const images = Array.from({ length: numImages }, () => getRandomTravelImage());
  
  // Generate 1-4 random tags from the travel tags array
  const numTags = Math.floor(Math.random() * 4) + 1;
  const shuffledTags = [...travelTags].sort(() => 0.5 - Math.random());
  const selectedTags = shuffledTags.slice(0, numTags);
  
  // Create random timestamp within the last 30 days
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
  
  return {
    id,
    author: {
      name: faker.person.fullName(),
      username: faker.internet.username().toLowerCase(),
      avatar: faker.image.avatar(),
    },
    location: destination.location,
    country: destination.country,
    images,
    caption: generateTravelCaption(destination.location),
    likes: Math.floor(Math.random() * 1000) + 10,
    comments: Math.floor(Math.random() * 100),
    createdAt,
    tags: selectedTags,
  };
}

// Currency Converter Mock Data
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

// Currency data for the currency converter
export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" }
];

// Mock exchange rates relative to USD (USD = 1)
export const mockExchangeRates = {
  "USD": 1.0,
  "EUR": 0.93,
  "GBP": 0.79,
  "JPY": 149.58,
  "AUD": 1.51,
  "CAD": 1.36,
  "CHF": 0.91,
  "CNY": 7.24,
  "INR": 83.12,
  "MXN": 16.75,
  "SGD": 1.34,
  "ZAR": 18.62,
  "BRL": 5.07,
  "THB": 35.78,
  "NZD": 1.62
}; 