"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search as SearchIcon, 
  MapPin, 
  Calendar, 
  Users, 
  Compass, 
  Book, 
  PenTool,
  Tag,
  ArrowRight,
  Star,
  Filter,
  Globe
} from 'lucide-react';

import AIChatbot from '../../components/features/AIChatbot';

// Define types for search results
interface SearchResultBase {
  id: number;
  type: 'destination' | 'trip' | 'article' | 'guide';
  title: string;
  image?: string;
}

interface DestinationResult extends SearchResultBase {
  type: 'destination';
  country: string;
  rating: number;
  categories: string[];
}

interface TripResult extends SearchResultBase {
  type: 'trip';
  startDate: string;
  endDate: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'planning';
}

interface ArticleResult extends SearchResultBase {
  type: 'article';
  author: string;
  date: string;
  tags: string[];
  excerpt: string;
}

interface GuideResult extends SearchResultBase {
  type: 'guide';
  destination: string;
  readTime: string;
  topics: string[];
}

type SearchResult = DestinationResult | TripResult | ArticleResult | GuideResult;

// Mock search data
const mockSearchResults: SearchResult[] = [
  {
    id: 1,
    type: 'destination',
    title: 'Bali',
    country: 'Indonesia',
    rating: 4.8,
    categories: ['Beach', 'Cultural', 'Adventure'],
    image: ''
  },
  {
    id: 2,
    type: 'destination',
    title: 'Kyoto',
    country: 'Japan',
    rating: 4.9,
    categories: ['Cultural', 'Historical', 'Spiritual'],
    image: ''
  },
  {
    id: 3,
    type: 'trip',
    title: 'Summer in Paris',
    location: 'France',
    startDate: '2023-07-15',
    endDate: '2023-07-25',
    status: 'completed',
    image: ''
  },
  {
    id: 4,
    type: 'article',
    title: '10 Hidden Gems in Southeast Asia',
    author: 'Jane Smith',
    date: '2023-05-12',
    tags: ['Southeast Asia', 'Off the beaten path', 'Budget travel'],
    excerpt: 'Discover these incredible lesser-known destinations across Southeast Asia that offer authentic experiences away from the tourist crowds.',
    image: ''
  },
  {
    id: 5,
    type: 'guide',
    title: 'Ultimate Tokyo Travel Guide',
    destination: 'Tokyo, Japan',
    readTime: '15 min',
    topics: ['Transportation', 'Accommodation', 'Food', 'Attractions'],
    image: ''
  },
  {
    id: 6,
    type: 'destination',
    title: 'Santorini',
    country: 'Greece',
    rating: 4.7,
    categories: ['Beach', 'Romantic', 'Scenic'],
    image: ''
  },
  {
    id: 7,
    type: 'trip',
    title: 'Winter Escape to Tokyo',
    location: 'Japan',
    startDate: '2023-11-10',
    endDate: '2023-11-20',
    status: 'planning',
    image: ''
  },
  {
    id: 8,
    type: 'article',
    title: 'How to Pack for a Long-Term Trip',
    author: 'Mike Johnson',
    date: '2023-04-05',
    tags: ['Packing tips', 'Long-term travel', 'Minimalism'],
    excerpt: 'Everything you need to know about packing efficiently for trips longer than a month, with tips for staying light and versatile.',
    image: ''
  },
  {
    id: 9,
    type: 'guide',
    title: 'Paris on a Budget',
    destination: 'Paris, France',
    readTime: '12 min',
    topics: ['Budget tips', 'Free attractions', 'Affordable dining'],
    image: ''
  },
  {
    id: 10,
    type: 'destination',
    title: 'Marrakech',
    country: 'Morocco',
    rating: 4.5,
    categories: ['Cultural', 'Shopping', 'Historical'],
    image: ''
  }
];

// Search page component
const SearchPage = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search effects
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  // Search function
  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockSearchResults.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = !activeFilter || item.type === activeFilter;
        return matchesQuery && matchesFilter;
      });
      
      setResults(filtered);
      setIsLoading(false);
    }, 500);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // Filter results by type
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter === activeFilter ? null : filter);
    handleSearch(searchQuery);
  };

  // Count results by type
  const resultCounts = {
    destination: results.filter(r => r.type === 'destination').length,
    trip: results.filter(r => r.type === 'trip').length,
    article: results.filter(r => r.type === 'article').length,
    guide: results.filter(r => r.type === 'guide').length,
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Search Form */}
            <motion.div variants={itemVariants} className="mb-8">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for destinations, trips, travel guides..."
                    className="pl-10 block w-full rounded-lg border border-gray-300 bg-white py-3 text-gray-900 focus:border-[#ff5f1f] focus:outline-none focus:ring-1 focus:ring-[#ff5f1f] sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-[#ff5f1f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e55214] focus:outline-none"
                >
                  Search
                </button>
              </form>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px space-x-8">
                  {[
                    { key: 'destination', label: 'Destinations', icon: <Compass className="h-4 w-4 mr-2" />, count: resultCounts.destination },
                    { key: 'trip', label: 'Trips', icon: <Calendar className="h-4 w-4 mr-2" />, count: resultCounts.trip },
                    { key: 'article', label: 'Articles', icon: <PenTool className="h-4 w-4 mr-2" />, count: resultCounts.article },
                    { key: 'guide', label: 'Guides', icon: <Book className="h-4 w-4 mr-2" />, count: resultCounts.guide },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => handleFilterChange(filter.key)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeFilter === filter.key 
                          ? 'border-[#ff5f1f] text-[#ff5f1f]' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {filter.icon}
                      {filter.label}
                      <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Search Results */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <p className="text-lg text-gray-600">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.p variants={itemVariants} className="text-gray-600">
                  Found {results.length} results for "{searchQuery}"
                </motion.p>
                
                {results.map((result) => (
                  <motion.div
                    key={`${result.type}-${result.id}`}
                    variants={itemVariants}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex"
                  >
                    {/* Left: Image placeholder */}
                    <div className="w-32 h-32 flex-shrink-0 mr-6 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-[#ff5f1f]/70 flex items-center justify-center">
                      <div className="text-white text-center p-2 font-medium">
                        {result.title}
                      </div>
                    </div>
                    
                    {/* Right: Content */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link 
                            href={`/${result.type}/${result.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-[#ff5f1f]"
                          >
                            {result.title}
                          </Link>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            {result.type === 'destination' && (
                              <>
                                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                <span>{result.country}</span>
                                <div className="ml-4 flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                  <span>{result.rating.toFixed(1)}</span>
                                </div>
                              </>
                            )}
                            
                            {result.type === 'trip' && (
                              <>
                                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                <span>{result.location}</span>
                                <div className="mx-3 text-gray-300">|</div>
                                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                <span>
                                  {formatDate(result.startDate)} - {formatDate(result.endDate)}
                                </span>
                              </>
                            )}
                            
                            {result.type === 'article' && (
                              <>
                                <PenTool className="h-4 w-4 text-gray-400 mr-1" />
                                <span>By {result.author}</span>
                                <div className="mx-3 text-gray-300">|</div>
                                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                <span>{result.date}</span>
                              </>
                            )}
                            
                            {result.type === 'guide' && (
                              <>
                                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                <span>{result.destination}</span>
                                <div className="mx-3 text-gray-300">|</div>
                                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                <span>{result.readTime} read</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Type badge */}
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${result.type === 'destination' ? 'bg-blue-100 text-blue-800' : ''}
                          ${result.type === 'trip' ? 'bg-green-100 text-green-800' : ''}
                          ${result.type === 'article' ? 'bg-purple-100 text-purple-800' : ''}
                          ${result.type === 'guide' ? 'bg-yellow-100 text-yellow-800' : ''}
                        `}>
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </span>
                      </div>
                      
                      {/* Additional details based on type */}
                      {result.type === 'destination' && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {result.categories.map((category, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {result.type === 'trip' && (
                        <div className="mt-3">
                          <span className={`
                            inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                            ${result.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : ''}
                            ${result.status === 'ongoing' ? 'bg-green-100 text-green-800' : ''}
                            ${result.status === 'completed' ? 'bg-gray-100 text-gray-800' : ''}
                            ${result.status === 'planning' ? 'bg-purple-100 text-purple-800' : ''}
                            capitalize
                          `}>
                            {result.status}
                          </span>
                        </div>
                      )}
                      
                      {result.type === 'article' && (
                        <div className="mt-2">
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {result.excerpt}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {result.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {result.type === 'guide' && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {result.topics.map((topic, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-50 text-yellow-700"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* View details link */}
                      <div className="mt-4 flex justify-end">
                        <Link
                          href={`/${result.type}/${result.id}`}
                          className="inline-flex items-center text-sm font-medium text-[#ff5f1f] hover:text-[#e55214]"
                        >
                          View details
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : searchQuery ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-12 bg-white rounded-lg shadow-sm"
              >
                <p className="text-gray-600 mb-2">No results found for "{searchQuery}"</p>
                <p className="text-gray-500 text-sm">Try adjusting your search terms or explore our suggested destinations.</p>
                <div className="mt-6">
                  <Link
                    href="/explore"
                    className="inline-flex items-center text-[#ff5f1f] hover:text-[#e55214] font-medium"
                  >
                    Explore destinations
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center py-12 bg-white rounded-lg shadow-sm"
              >
                <p className="text-gray-600 mb-2">Enter a search term to get started</p>
                <p className="text-gray-500 text-sm">Search for destinations, trips, articles, or travel guides</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default SearchPage; 