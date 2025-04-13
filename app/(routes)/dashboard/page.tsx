"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { 
  CalendarDays, 
  Map, 
  PlusCircle, 
  Compass, 
  BarChart3, 
  Plane, 
  DollarSign,
  Bell,
  MessageSquare,
  Settings,
  ChevronRight,
  TrendingUp,
  Heart,
  Star,
  Users,
  Clock,
  Wind,
  Cloud,
  Sun,
  Moon,
  Globe,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  MoreVertical,
  Share2,
  Download,
  Bookmark,
  Eye,
  ThumbsUp,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  RefreshCw,
  MoreHorizontal,
  Sliders,
  Grid,
  List,
  Layout,
  Settings2,
  User,
  LogOut,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeatherWidget } from "@/components/features/weather/WeatherWidget";
import { AIChatbot } from "@/components/features/AIChatbot";
import { TripCard } from "@/components/shared/TripCard";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock data for the dashboard
const upcomingTrips = [
  {
    id: 1,
    title: "Bali Adventure",
    destination: "Bali",
    location: "Indonesia",
    startDate: "2025-07-15",
    endDate: "2025-07-25",
    travelers: 2,
    status: 'upcoming',
    image: "/placeholders/bali.jpg",
    rating: 4.8,
    price: 1200,
    category: "Adventure"
  },
  {
    id: 2,
    title: "Roman Holiday",
    destination: "Rome",
    location: "Italy",
    startDate: "2025-08-10",
    endDate: "2025-08-17",
    travelers: 3,
    status: 'planning',
    image: "/placeholders/rome.jpg",
    rating: 4.9,
    price: 1500,
    category: "Cultural"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "trip",
    action: "created",
    destination: "Paris, France",
    date: "2 days ago",
    icon: <Compass className="h-5 w-5 text-blue-500" />
  },
  {
    id: 2,
    type: "itinerary",
    action: "updated",
    destination: "Bali, Indonesia",
    date: "3 days ago",
    icon: <CalendarDays className="h-5 w-5 text-green-500" />
  },
  {
    id: 3,
    type: "review",
    action: "posted",
    destination: "Tokyo, Japan",
    date: "5 days ago",
    icon: <Star className="h-5 w-5 text-yellow-500" />
  }
];

const travelStats = {
  upcomingTrips: 2,
  placesVisited: 8,
  savedPlaces: 24,
  budgetUtilized: 1200,
  totalSpent: 5000,
  budgetLimit: 10000
};

const MotionCard = motion(Card);
const MotionButton = motion(Button);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -50]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"
          style={{
            x: useTransform(mouseX, [-100, 100], [-10, 10]),
            y: useTransform(mouseY, [-100, 100], [-10, 10]),
          }}
        />
      </div>

      {/* Parallax Header with 3D Effect */}
      <motion.div 
        style={{ y: springY }}
        className="relative h-[50vh] w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff5f1f] via-[#ff8c42] to-[#ffa66b] opacity-90" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold text-white mb-4"
            >
              Welcome Back!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-white/90"
            >
              Your next adventure awaits
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Floating Action Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="fixed top-6 right-6 z-50 flex gap-2"
        >
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </MotionButton>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-2"
              >
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
                >
                  <Settings2 className="h-5 w-5" />
                </MotionButton>
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
                >
                  <User className="h-5 w-5" />
                </MotionButton>
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
                >
                  <HelpCircle className="h-5 w-5" />
                </MotionButton>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search and Actions with Modern Design */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#ff5f1f] transition-colors" />
            <Input
              placeholder="Search trips, destinations, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg focus:ring-2 focus:ring-[#ff5f1f] transition-all"
            />
          </div>
          <div className="flex gap-2">
            <MotionButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variant="outline"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#ff5f1f] hover:bg-[#e55214] text-white shadow-lg"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Trip
            </MotionButton>
          </div>
        </motion.div>

        {/* Stats Overview with 3D Effect and Hover Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: CalendarDays, color: "blue", ...travelStats.upcomingTrips },
            { icon: Map, color: "green", ...travelStats.placesVisited },
            { icon: Heart, color: "yellow", ...travelStats.savedPlaces },
            { icon: DollarSign, color: "purple", ...travelStats.budgetUtilized }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform" />
              <MotionCard 
                className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Trips</p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {stat.value}
                      </h3>
                    </div>
                    <div className={`h-12 w-12 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.div>
          ))}
        </div>

        {/* Main Content with Modern Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#ff5f1f] data-[state=active]:text-white transition-all"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="trips" 
              className="data-[state=active]:bg-[#ff5f1f] data-[state=active]:text-white transition-all"
            >
              Trips
            </TabsTrigger>
            <TabsTrigger 
              value="activities" 
              className="data-[state=active]:bg-[#ff5f1f] data-[state=active]:text-white transition-all"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger 
              value="weather" 
              className="data-[state=active]:bg-[#ff5f1f] data-[state=active]:text-white transition-all"
            >
              Weather
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* View Mode Toggle */}
            <div className="flex justify-end gap-2 mb-4">
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                className="rounded-full"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                className="rounded-full"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </MotionButton>
            </div>

            {/* Upcoming Trips with Interactive Cards */}
            <MotionCard 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Upcoming Trips</CardTitle>
                <div className="flex gap-2">
                  <MotionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                  </MotionButton>
                  <MotionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Download className="h-4 w-4" />
                  </MotionButton>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className={cn(
                    "gap-6",
                    viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"
                  )}>
                    {upcomingTrips.map((trip) => (
                      <motion.div
                        key={trip.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <TripCard {...trip} viewMode={viewMode} />
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </MotionCard>

            {/* Recent Activity with Social Features */}
            <MotionCard 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {activity.icon}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            You {activity.action} a {activity.type} for{" "}
                            <span className="font-medium">{activity.destination}</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.date}
                          </p>
                          <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MotionButton
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              variant="ghost"
                              size="sm"
                              className="h-8"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Like
                            </MotionButton>
                            <MotionButton
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              variant="ghost"
                              size="sm"
                              className="h-8"
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Comment
                            </MotionButton>
                            <MotionButton
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              variant="ghost"
                              size="sm"
                              className="h-8"
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </MotionButton>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </MotionCard>
          </TabsContent>

          <TabsContent value="weather">
            <MotionCard 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Weather at Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <WeatherWidget location="Bali, Indonesia" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <WeatherWidget location="Rome, Italy" />
                  </motion.div>
                </div>
              </CardContent>
            </MotionCard>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating AI Assistant with Enhanced Animations */}
      <AnimatePresence>
        {showAIChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <AIChatbot onClose={() => setShowAIChatbot(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions Menu with Modern Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <MotionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAIChatbot(true)}
          className="bg-[#ff5f1f] hover:bg-[#e55214] text-white rounded-full h-14 w-14 shadow-xl"
        >
          <Sparkles className="h-6 w-6" />
        </MotionButton>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-8 w-8 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 