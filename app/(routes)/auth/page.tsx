"use client";

import { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Icons } from "../../../components/ui/icons";
import { cn } from "../../../lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ChevronLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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
          <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center">
                <motion.div
                  className="w-full max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                    {/* Form Header */}
                    <div className="relative h-28 bg-gradient-to-r from-blue-500 to-[#ff5f1f] flex items-center justify-center">
                      <Link 
                        href="/"
                        className="absolute left-4 top-4 flex items-center text-white hover:text-white/80 transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                      </Link>
                      <motion.h1 
                        className="text-2xl font-bold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {isLogin ? "Welcome Back" : "Create Account"}
                      </motion.h1>
                    </div>
                    
                    {/* Form Tabs */}
                    <div className="flex border-b">
                      <button
                        onClick={() => setIsLogin(true)}
                        className={`w-1/2 py-4 text-center font-medium transition-colors ${
                          isLogin ? "text-[#ff5f1f] border-b-2 border-[#ff5f1f]" : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setIsLogin(false)}
                        className={`w-1/2 py-4 text-center font-medium transition-colors ${
                          !isLogin ? "text-[#ff5f1f] border-b-2 border-[#ff5f1f]" : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>
                    
                    {/* Form Content */}
                    <div className="p-8">
                      <motion.form
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={isLogin ? "login" : "signup"}
                      >
                        {!isLogin && (
                          <motion.div variants={itemVariants} className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <User className="h-5 w-5" />
                              </div>
                              <input
                                type="text"
                                id="name"
                                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                                placeholder="John Doe"
                              />
                            </div>
                          </motion.div>
                        )}
                        
                        <motion.div variants={itemVariants} className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <Mail className="h-5 w-5" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                              placeholder="your@email.com"
                            />
                          </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="mb-6">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <Lock className="h-5 w-5" />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                              placeholder={isLogin ? "Enter password" : "Create password"}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {isLogin && (
                            <div className="mt-1 text-right">
                              <a href="#" className="text-sm text-[#ff5f1f] hover:text-[#e55214]">
                                Forgot password?
                              </a>
                            </div>
                          )}
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                          <motion.button
                            type="submit"
                            className="w-full bg-[#ff5f1f] text-white py-2 px-4 rounded-md hover:bg-[#e55214] transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isLogin ? "Login" : "Create Account"}
                          </motion.button>
                        </motion.div>
                      </motion.form>
                      
                      {/* Social Login */}
                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Google
                          </button>
                          <button
                            type="button"
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Facebook
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Form Footer */}
                  <p className="mt-4 text-center text-sm text-gray-600">
                    By {isLogin ? "logging in" : "signing up"}, you agree to our 
                    <a href="#" className="text-[#ff5f1f] hover:text-[#e55214]"> Terms of Service </a>
                    and
                    <a href="#" className="text-[#ff5f1f] hover:text-[#e55214]"> Privacy Policy</a>.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 