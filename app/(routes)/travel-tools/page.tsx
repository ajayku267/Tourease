"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CloudSun, 
  Coins, 
  PackageCheck, 
  AlertOctagon,
  Compass,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherWidget } from "@/components/features/weather/WeatherWidget";
import { CurrencyConverter } from "@/app/components/features/CurrencyConverter";
import { PackingChecklist } from "@/components/features/packing/PackingChecklist";
import { EmergencySOSButton } from "@/app/components/features/EmergencySOSButton";

// Emergency contacts sample data
const sampleEmergencyContacts = [
  { name: "John Smith (Family)", phone: "+1-555-123-4567" },
  { name: "Travel Insurance Hotline", phone: "+1-800-555-9876" }
];

export default function TravelToolsPage() {
  const [activeTab, setActiveTab] = useState("weather");
  
  // For demo purposes only
  const handleSOSActivated = (location: any) => {
    console.log("SOS activated with location:", location);
  };

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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Travel Tools</h1>
        <p className="text-gray-600 mt-1">Essential utilities for your journey</p>
      </motion.div>

      <Tabs 
        defaultValue="weather" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid sm:grid-cols-5 grid-cols-3 gap-1">
            <TabsTrigger value="weather" className="flex gap-1 items-center">
              <CloudSun className="h-4 w-4" />
              <span className="hidden sm:inline">Weather</span>
            </TabsTrigger>
            <TabsTrigger value="currency" className="flex gap-1 items-center">
              <Coins className="h-4 w-4" />
              <span className="hidden sm:inline">Currency</span>
            </TabsTrigger>
            <TabsTrigger value="packing" className="flex gap-1 items-center">
              <PackageCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Packing</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex gap-1 items-center">
              <AlertOctagon className="h-4 w-4" />
              <span className="hidden sm:inline">Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-1 items-center">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <EmergencySOSButton
            variant="button"
            className="hidden md:flex"
            emergencyContacts={sampleEmergencyContacts}
            onSOSActivated={handleSOSActivated}
          />
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TabsContent value="weather" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Current Weather</CardTitle>
                    <CardDescription>Check the forecast for your destination</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <WeatherWidget defaultLocation="Paris" />
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Overview</CardTitle>
                    <CardDescription>Popular travel destinations weather</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <WeatherWidget defaultLocation="Tokyo" compact />
                      <WeatherWidget defaultLocation="New York" compact />
                      <WeatherWidget defaultLocation="London" compact />
                      <WeatherWidget defaultLocation="Sydney" compact />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Weather Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                      <li>Check the forecast before packing</li>
                      <li>Pack layers for unpredictable weather</li>
                      <li>Consider the local climate patterns</li>
                      <li>Remember seasonal variations by hemisphere</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="currency" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Currency Converter</CardTitle>
                    <CardDescription>Convert between different currencies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CurrencyConverter defaultFromCurrency="USD" defaultToCurrency="EUR" />
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Currency Tips</CardTitle>
                    <CardDescription>Get the most from your money abroad</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                      <li>Check exchange rates before traveling</li>
                      <li>Inform your bank about travel plans to avoid card freezes</li>
                      <li>Carry multiple payment methods (cash, cards)</li>
                      <li>Use bank ATMs for better exchange rates than currency exchanges</li>
                      <li>Keep a small amount of local currency for immediate expenses</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Exchange Rate Alerts</CardTitle>
                    <CardDescription>Get notified of favorable rate changes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <p className="text-sm text-gray-600">Set up alerts for when currency rates improve significantly.</p>
                      <Button className="w-full">Set Up Rate Alerts</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="packing" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <PackingChecklist 
                  tripDestination="Paris, France" 
                  tripDuration={7}
                  tripType="leisure"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Packing Tips</CardTitle>
                    <CardDescription>Pack smarter, not harder</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                      <li>Roll clothes instead of folding to save space</li>
                      <li>Pack versatile clothing that can be layered</li>
                      <li>Use packing cubes to organize your suitcase</li>
                      <li>Wear your bulkiest items during travel</li>
                      <li>Pack a small first-aid kit with essentials</li>
                      <li>Keep important documents in your carry-on</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Destination Guidelines</CardTitle>
                    <CardDescription>Location-specific considerations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm">Beach Destinations</h4>
                        <p className="text-sm text-gray-600">Sunscreen, swimwear, beach towel, sandals, hat</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Urban Exploring</h4>
                        <p className="text-sm text-gray-600">Comfortable walking shoes, day bag, metro/bus pass</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Cold Climate</h4>
                        <p className="text-sm text-gray-600">Layers, thermals, waterproof boots, gloves, scarf</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="emergency" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency SOS</CardTitle>
                    <CardDescription>Quick access to emergency services</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center p-8">
                    <EmergencySOSButton 
                      variant="button" 
                      className="w-full mb-4"
                      emergencyContacts={sampleEmergencyContacts}
                      onSOSActivated={handleSOSActivated}
                    />
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Only use in actual emergencies. This will share your location and contact emergency services.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                    <CardDescription>Important numbers to have on hand</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sampleEmergencyContacts.map((contact, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Call
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full mt-4">
                        Add Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Safety Tips</CardTitle>
                    <CardDescription>Stay safe while traveling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                      <li>Research local emergency numbers before traveling</li>
                      <li>Share your itinerary with family or friends</li>
                      <li>Keep digital and physical copies of important documents</li>
                      <li>Register with your country's embassy when visiting foreign countries</li>
                      <li>Purchase travel insurance with emergency medical coverage</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your travel tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Default Weather Location</label>
                        <input 
                          type="text" 
                          placeholder="Enter city name" 
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                          defaultValue="Paris"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Measurement Units</label>
                        <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                          <option>Metric (°C, km)</option>
                          <option>Imperial (°F, miles)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Base Currency</label>
                        <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                          <option>USD - US Dollar</option>
                          <option>EUR - Euro</option>
                          <option>GBP - British Pound</option>
                          <option>JPY - Japanese Yen</option>
                        </select>
                      </div>
                      <Button className="w-full">Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                    <CardDescription>Manage your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Location Services</p>
                          <p className="text-sm text-gray-600">Allow access to your location</p>
                        </div>
                        <div className="h-6 w-12 bg-primary rounded-full relative px-1 flex items-center">
                          <div className="h-4 w-4 bg-white rounded-full absolute right-1"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Save Search History</p>
                          <p className="text-sm text-gray-600">Remember your past searches</p>
                        </div>
                        <div className="h-6 w-12 bg-primary rounded-full relative px-1 flex items-center">
                          <div className="h-4 w-4 bg-white rounded-full absolute right-1"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Offline Mode</p>
                          <p className="text-sm text-gray-600">Save data for offline access</p>
                        </div>
                        <div className="h-6 w-12 bg-gray-300 rounded-full relative px-1 flex items-center">
                          <div className="h-4 w-4 bg-white rounded-full absolute left-1"></div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">Clear All Data</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>About Travel Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Version 1.0.0</p>
                      <p className="text-sm text-gray-600">
                        TourEase Travel Tools provides essential utilities for travelers, including weather forecasts, currency conversion, packing assistance, and emergency services.
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">Terms of Service</Button>
                        <Button variant="outline" size="sm">Privacy Policy</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>
      
      {/* Mobile SOS Button */}
      <div className="md:hidden">
        <EmergencySOSButton 
          variant="fab"
          emergencyContacts={sampleEmergencyContacts}
          onSOSActivated={handleSOSActivated}
        />
      </div>
    </div>
  );
} 