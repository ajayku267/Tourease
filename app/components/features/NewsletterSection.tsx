"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Send, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }
    
    // Simulate API call
    setStatus("loading");
    
    setTimeout(() => {
      // Simulate successful subscription (90% of the time)
      if (Math.random() > 0.1) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage("An error occurred. Please try again.");
      }
    }, 1500);
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full opacity-70 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full opacity-70 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/images/world-map-dots.svg')] bg-no-repeat bg-center opacity-5" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column: Form */}
            <div className="p-8 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-lg mb-6">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Travel Inspiration
                </h2>
                
                <p className="text-lg text-gray-600 mb-8">
                  Subscribe to our newsletter for exclusive travel tips, destination ideas, and special offers.
                </p>
                
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-100 rounded-lg p-6 text-center"
                  >
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you for subscribing!</h3>
                    <p className="text-gray-600 mb-4">You'll now receive our travel updates and exclusive offers.</p>
                    <Button variant="outline" onClick={resetForm}>
                      Subscribe another email
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") resetForm();
                          }}
                          placeholder="Enter your email address"
                          className={`pl-4 pr-12 py-6 text-base w-full ${
                            status === "error" ? "border-red-500 focus-visible:ring-red-500" : ""
                          }`}
                          disabled={status === "loading"}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center"
                        >
                          <X className="h-4 w-4 mr-1" />
                          {errorMessage}
                        </motion.div>
                      )}
                      
                      <div className="pt-2">
                        <Button 
                          type="submit" 
                          className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-indigo-600"
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                              Subscribing...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              Subscribe
                              <Send className="ml-2 h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        We respect your privacy. Unsubscribe at any time.
                      </p>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
            
            {/* Right Column: Image */}
            <div className="relative hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop"
                alt="Travel inspiration"
                className="object-cover"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/40 mix-blend-multiply" />
              
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white max-w-md">
                  <h3 className="text-xl font-bold mb-4">Join our community of travelers</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <p>Exclusive travel deals and discounts up to 40% off</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <p>Personalized travel recommendations based on your interests</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <p>Early access to new features and travel tools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Newsletter Subscribers", value: "30K+" },
            { label: "Countries Covered", value: "120+" },
            { label: "Travel Tips", value: "500+" },
            { label: "Satisfied Travelers", value: "25K+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm"
            >
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 