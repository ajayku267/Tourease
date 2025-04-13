"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Plane, 
  Info, 
  PieChart, 
  ArrowUpDown, 
  TrendingUp, 
  PlusCircle,
  ChevronRight,
  DollarSign 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CurrencyConverter } from '@/components/features/budget/CurrencyConverter';
import Link from 'next/link';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const BudgetPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Would normally load from an API
  const mockTrips = [
    {
      id: "trip-1",
      name: "Paris Getaway",
      startDate: "2023-08-15",
      endDate: "2023-08-22",
      totalBudget: 2500,
      spent: 1850,
      currency: "USD",
      status: "completed"
    },
    {
      id: "trip-2",
      name: "Tokyo Adventure",
      startDate: "2023-10-05",
      endDate: "2023-10-18",
      totalBudget: 4000,
      spent: 1200,
      currency: "USD",
      status: "active"
    },
    {
      id: "trip-3",
      name: "Bali Relaxation",
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      totalBudget: 3000,
      spent: 800,
      currency: "USD",
      status: "upcoming"
    },
    {
      id: "trip-4",
      name: "Barcelona Weekend",
      startDate: "2024-02-15",
      endDate: "2024-02-18",
      totalBudget: 1500,
      spent: 0,
      currency: "USD",
      status: "upcoming"
    },
    {
      id: "trip-5",
      name: "Greek Islands Cruise",
      startDate: "2024-05-10",
      endDate: "2024-05-20",
      totalBudget: 5000,
      spent: 2000,
      currency: "USD",
      status: "active"
    }
  ];
  
  // Filter trips based on active tab
  const filteredTrips = mockTrips.filter(trip => {
    if (activeTab === "all") return true;
    return trip.status === activeTab;
  });
  
  // Calculate budget statistics
  const totalBudget = mockTrips.reduce((sum, trip) => sum + trip.totalBudget, 0);
  const totalSpent = mockTrips.reduce((sum, trip) => sum + trip.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const averageTripBudget = totalBudget / mockTrips.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center">
              <Wallet className="mr-3 h-8 w-8 text-[#ff5f1f]" />
              Travel Budget Tracker
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Track your expenses, manage your budget, and make the most of your travel funds. 
              Select a trip below to view or manage its budget, or create a new trip budget.
            </p>
          </motion.div>
          
          {/* Budget Statistics Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          >
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-700 flex items-center">
                    <Wallet className="mr-2 h-5 w-5" />
                    Total Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-800">${totalBudget.toLocaleString()}</p>
                  <p className="text-sm text-blue-600">Across {mockTrips.length} trips</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-700 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Remaining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-800">${totalRemaining.toLocaleString()}</p>
                  <p className="text-sm text-green-600">{Math.round((totalRemaining/totalBudget) * 100)}% of total budget</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-orange-700 flex items-center">
                    <ArrowUpDown className="mr-2 h-5 w-5" />
                    Spent so far
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-orange-800">${totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-orange-600">{Math.round((totalSpent/totalBudget) * 100)}% of total budget</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-purple-700 flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    Average Trip
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-800">${Math.round(averageTripBudget).toLocaleString()}</p>
                  <p className="text-sm text-purple-600">Average budget per trip</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          {/* Trip Budget Management */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trip Budgets</CardTitle>
                  <CardDescription>
                    Manage and track your trip expenses
                  </CardDescription>
                  
                  <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="mt-4">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                
                <CardContent>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {filteredTrips.map((trip) => (
                      <motion.div
                        key={trip.id}
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-xl text-gray-800">
                              {trip.name}
                            </h3>
                            <div className="flex items-center">
                              <Plane className="h-5 w-5 text-[#ff5f1f] mr-2" />
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                trip.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                trip.status === 'active' ? 'bg-green-100 text-green-700' : 
                                'bg-orange-100 text-orange-700'
                              }`}>
                                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-4">
                            {trip.startDate} - {trip.endDate}
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600">Budget</span>
                                <span className="text-sm font-medium text-gray-800">
                                  ${trip.totalBudget.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div 
                                  className={`h-full rounded-full ${
                                    trip.spent / trip.totalBudget > 0.9 ? 'bg-red-500' :
                                    trip.spent / trip.totalBudget > 0.7 ? 'bg-orange-500' :
                                    'bg-[#ff5f1f]'
                                  }`}
                                  style={{ width: `${Math.min((trip.spent / trip.totalBudget) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Spent</span>
                              <span className="text-sm font-medium text-orange-500">
                                ${trip.spent.toLocaleString()} 
                                <span className="text-xs text-gray-500">
                                  ({Math.round((trip.spent / trip.totalBudget) * 100)}%)
                                </span>
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Remaining</span>
                              <span className="text-sm font-medium text-green-500">
                                ${(trip.totalBudget - trip.spent).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-5 pt-4 border-t border-gray-100">
                            <Link href={`/budget/${trip.id}`} passHref>
                              <Button 
                                variant="outline"
                                className="flex items-center space-x-1 text-[#ff5f1f] border-[#ff5f1f] hover:bg-[#fff8f5]"
                              >
                                <span>Manage Budget</span>
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Create New Budget Card */}
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      className="bg-gray-50 rounded-lg border border-dashed border-gray-300 overflow-hidden h-full flex flex-col items-center justify-center p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <Wallet className="h-8 w-8 text-[#ff5f1f]" />
                      </div>
                      <h3 className="font-semibold text-xl text-gray-800 mb-2">
                        Create New Budget
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Start tracking expenses for a new trip
                      </p>
                      <Button 
                        variant="default"
                        className="bg-[#ff5f1f] hover:bg-[#e55214]"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Budget
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
            
            {/* Currency Converter */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-[#ff5f1f]" />
                    Currency Converter
                  </CardTitle>
                  <CardDescription>
                    Convert between different currencies for your travel budget
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CurrencyConverter 
                    defaultFromCurrency="USD"
                    defaultToCurrency="EUR"
                    defaultAmount={100}
                  />
                </CardContent>
              </Card>
              
              {/* Budget Tips */}
              <Card className="mt-6 bg-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-blue-800">
                    <Info className="mr-2 h-5 w-5" />
                    Travel Budget Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-blue-700">
                    <li>Set a daily spending limit and stick to it</li>
                    <li>Research local transportation options to save on commuting</li>
                    <li>Look for accommodations with kitchen facilities to reduce dining costs</li>
                    <li>Consider travel insurance to protect against unexpected expenses</li>
                    <li>Take advantage of free attractions and activities at your destination</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetPage; 