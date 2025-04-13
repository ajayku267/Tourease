"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Flag, 
  DollarSign, 
  PieChart, 
  Receipt, 
  Upload,
  Download,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BudgetCalculator } from '@/components/features/budget/BudgetCalculator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

// Types
export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
}

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  currency: string;
  travelers: number;
  expenses: Expense[];
  status?: string;
}

// Mock data - would normally come from an API
const mockTrips: Record<string, Trip> = {
  "trip-1": {
    id: "trip-1",
    name: "Paris Getaway",
    destination: "Paris, France",
    startDate: "2023-08-15",
    endDate: "2023-08-22",
    totalBudget: 2500,
    currency: "USD",
    travelers: 2,
    status: "completed",
    expenses: [
      {
        id: "exp1",
        category: "Accommodations",
        description: "Hotel du Louvre",
        amount: 1200,
        date: "2023-08-15",
        currency: "USD"
      },
      {
        id: "exp2",
        category: "Transportation",
        description: "Flight tickets",
        amount: 450,
        date: "2023-08-14",
        currency: "USD"
      },
      {
        id: "exp3",
        category: "Food & Dining",
        description: "Le Petit Bistro",
        amount: 120,
        date: "2023-08-16",
        currency: "USD"
      },
      {
        id: "exp4",
        category: "Activities",
        description: "Louvre Museum tickets",
        amount: 80,
        date: "2023-08-17",
        currency: "USD"
      },
    ]
  },
  "trip-2": {
    id: "trip-2",
    name: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    startDate: "2023-10-05",
    endDate: "2023-10-18",
    totalBudget: 4000,
    currency: "USD",
    travelers: 1,
    status: "active",
    expenses: [
      {
        id: "exp1",
        category: "Accommodations",
        description: "Shinjuku Hotel",
        amount: 850,
        date: "2023-10-05",
        currency: "USD"
      },
      {
        id: "exp2",
        category: "Transportation",
        description: "Flight tickets",
        amount: 750,
        date: "2023-10-04",
        currency: "USD"
      }
    ]
  },
  "trip-3": {
    id: "trip-3",
    name: "Bali Relaxation",
    destination: "Bali, Indonesia",
    startDate: "2024-01-10",
    endDate: "2024-01-20",
    totalBudget: 3000,
    currency: "USD",
    travelers: 2,
    status: "upcoming",
    expenses: [
      {
        id: "exp1",
        category: "Accommodations",
        description: "Beach Villa",
        amount: 800,
        date: "2024-01-10",
        currency: "USD"
      }
    ]
  }
};

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

const TripBudgetPage = () => {
  const params = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // In a real app, this would be an API call
    const tripId = params.tripId as string;
    
    if (mockTrips[tripId]) {
      setTrip(mockTrips[tripId]);
    }
    
    setLoading(false);
  }, [params.tripId]);
  
  const handleBudgetUpdate = (budget: number, categories: any[]) => {
    // In a real app, this would save to an API or database
    console.log('Budget updated:', budget);
    console.log('Categories updated:', categories);
    
    if (!trip) return;
    
    // Update the local trip data
    setTrip({
      ...trip,
      totalBudget: budget
    });
  };
  
  // Calculate budget statistics
  const calculateStats = (trip: Trip) => {
    const totalExpenses = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remaining = trip.totalBudget - totalExpenses;
    const percentSpent = (totalExpenses / trip.totalBudget) * 100;
    
    return {
      totalExpenses,
      remaining,
      percentSpent
    };
  };
  
  // Group expenses by category for the BudgetCalculator
  const getCategoriesFromExpenses = (expenses: Expense[]) => {
    const categoryMap = new Map();
    
    expenses.forEach(expense => {
      if (categoryMap.has(expense.category)) {
        categoryMap.set(
          expense.category, 
          categoryMap.get(expense.category) + expense.amount
        );
      } else {
        categoryMap.set(expense.category, expense.amount);
      }
    });
    
    // Generate colors for categories
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
      '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
    ];
    
    let colorIndex = 0;
    const result = Array.from(categoryMap.entries()).map(([name, amount]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      amount,
      color: colors[colorIndex++ % colors.length],
      editable: true
    }));
    
    return result;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5f1f] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading trip budget...</p>
          </div>
        </main>
      </div>
    );
  }
  
  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Trip Not Found</CardTitle>
              <CardDescription>
                We couldn't find the trip you're looking for
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <AlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">
                The trip may have been deleted or you entered an incorrect URL.
              </p>
              <Button asChild>
                <Link href="/budget">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Budget Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  
  const stats = calculateStats(trip);
  const categories = getCategoriesFromExpenses(trip.expenses);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <div className="mb-6">
            <Button
              asChild
              variant="ghost"
              className="pl-0 text-gray-600 hover:text-gray-900"
            >
              <Link href="/budget">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Budget Dashboard
              </Link>
            </Button>
          </div>
          
          {/* Trip Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mr-3">
                    {trip.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    trip.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    trip.status === 'active' ? 'bg-green-100 text-green-700' : 
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {trip.status?.charAt(0).toUpperCase() + trip.status?.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {trip.destination}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {trip.startDate} - {trip.endDate}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {trip.travelers} {trip.travelers === 1 ? 'Traveler' : 'Travelers'}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Budget: ${trip.totalBudget.toLocaleString()} {trip.currency}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex gap-2">
                <Button 
                  variant="outline"
                  className="text-xs md:text-sm"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button 
                  asChild
                  variant="default"
                  className="bg-[#ff5f1f] hover:bg-[#e55214] text-xs md:text-sm"
                  size="sm"
                >
                  <Link href={`/trips/${trip.id}`}>
                    <Flag className="h-4 w-4 mr-1" />
                    Trip Details
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Budget summary */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-blue-700 font-medium">Total Budget</div>
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    ${trip.totalBudget.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-orange-700 font-medium">Spent</div>
                    <Receipt className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-800">
                    ${stats.totalExpenses.toLocaleString()}
                    <span className="text-sm font-normal ml-2">
                      ({Math.round(stats.percentSpent)}%)
                    </span>
                  </div>
                </div>
                
                <div className={`${
                  stats.remaining >= 0 ? 'bg-green-50' : 'bg-red-50'
                } rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`${
                      stats.remaining >= 0 ? 'text-green-700' : 'text-red-700'
                    } font-medium`}>
                      {stats.remaining >= 0 ? 'Remaining' : 'Over Budget'}
                    </div>
                    <PieChart className={`h-5 w-5 ${
                      stats.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div className={`text-2xl font-bold ${
                    stats.remaining >= 0 ? 'text-green-800' : 'text-red-800'
                  }`}>
                    ${Math.abs(stats.remaining).toLocaleString()}
                    <span className="text-sm font-normal ml-2">
                      ({Math.round(100 - stats.percentSpent)}%)
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Budget Progress</span>
                  <span className="font-medium">{Math.round(stats.percentSpent)}% Used</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      stats.percentSpent > 100 ? 'bg-red-500' :
                      stats.percentSpent > 90 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(stats.percentSpent, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Budget Management Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Budget Overview</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Breakdown</CardTitle>
                    <CardDescription>Visualize your spending by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BudgetCalculator
                      initialBudget={trip.totalBudget}
                      initialCategories={categories}
                      currency="$"
                      title="Expense Categories"
                      description="Analyze your trip expenses by category"
                      onBudgetChange={handleBudgetUpdate}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Tips</CardTitle>
                    <CardDescription>Make the most of your travel budget</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.percentSpent > 90 && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Budget Warning</AlertTitle>
                        <AlertDescription>
                          You've used {Math.round(stats.percentSpent)}% of your budget. Consider reviewing your upcoming expenses.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-medium text-blue-800 mb-2">Destination-specific Tips</h3>
                        <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                          {trip.destination.includes("Paris") ? (
                            <>
                              <li>Paris Museum Pass can save money if you plan to visit multiple attractions</li>
                              <li>Consider public transportation instead of taxis (Metro is efficient)</li>
                              <li>Look for "prix fixe" menus for more affordable dining options</li>
                            </>
                          ) : trip.destination.includes("Tokyo") ? (
                            <>
                              <li>Get a Suica or Pasmo card for easy public transportation</li>
                              <li>Consider eating at local "izakaya" for affordable authentic meals</li>
                              <li>Look for accommodation outside central Tokyo for better rates</li>
                            </>
                          ) : trip.destination.includes("Bali") ? (
                            <>
                              <li>Negotiate prices at local markets (start at 50% of asking price)</li>
                              <li>Rent a scooter for affordable transportation (if comfortable)</li>
                              <li>Eat at "warungs" (local eateries) for authentic, affordable food</li>
                            </>
                          ) : (
                            <>
                              <li>Research free activities and attractions at your destination</li>
                              <li>Check if local transportation passes could save you money</li>
                              <li>Consider eating where locals eat for authentic experiences at better prices</li>
                            </>
                          )}
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="font-medium text-green-800 mb-2">General Saving Tips</h3>
                        <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                          <li>Track daily expenses with a travel budget app</li>
                          <li>Set a daily spending allowance and try to stick to it</li>
                          <li>Consider accommodation with kitchen access to save on meals</li>
                          <li>Research free days at museums and attractions</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="expenses" className="pt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Expense Management</CardTitle>
                      <CardDescription>Track and manage your travel expenses</CardDescription>
                    </div>
                    <Button>Add Expense</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">Amount</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trip.expenses.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-500">
                            No expenses recorded yet
                          </td>
                        </tr>
                      ) : (
                        trip.expenses.map((expense) => (
                          <tr key={expense.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-800">
                              {expense.date}
                            </td>
                            <td className="py-3 px-4 text-gray-800">
                              {expense.category}
                            </td>
                            <td className="py-3 px-4 text-gray-800">
                              {expense.description}
                            </td>
                            <td className="py-3 px-4 text-right font-medium text-gray-800">
                              ${expense.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Edit</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                  <path d="m15 5 4 4" />
                                </svg>
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TripBudgetPage; 