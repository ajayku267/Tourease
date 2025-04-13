"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Plane, 
  Camera, 
  ShieldCheck, 
  Languages, 
  Wallet,
  ArrowRight,
  ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const travelTips = [
  {
    id: 1,
    title: "Pack Smart & Light",
    description: "Roll clothes instead of folding to save space and reduce wrinkles. Pack versatile items that can be mixed and matched.",
    icon: <Plane className="h-5 w-5" />,
    category: "Packing",
    image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Capture Moments",
    description: "When taking photos, focus on capturing experiences rather than just landmarks. Include local people (with permission) and details.",
    icon: <Camera className="h-5 w-5" />,
    category: "Photography",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Stay Safe",
    description: "Register with your embassy when visiting foreign countries. Keep digital copies of all important documents in cloud storage.",
    icon: <ShieldCheck className="h-5 w-5" />,
    category: "Safety",
    image: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?q=80&w=800&auto=format&fit=crop",
    color: "from-green-500 to-emerald-400"
  },
  {
    id: 4,
    title: "Learn Basic Phrases",
    description: "Memorize 8-10 basic phrases in the local language. Locals appreciate the effort, and it enhances your cultural experience.",
    icon: <Languages className="h-5 w-5" />,
    category: "Culture",
    image: "https://images.unsplash.com/photo-1544473244-f6895e69ad8b?q=80&w=800&auto=format&fit=crop",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 5,
    title: "Budget Tricks",
    description: "Use apps like Trail Wallet to track expenses. Always have a contingency fund of at least 15% of your total budget.",
    icon: <Wallet className="h-5 w-5" />,
    category: "Finances",
    image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=800&auto=format&fit=crop",
    color: "from-red-500 to-rose-400"
  },
];

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

export function TravelTipsSection() {
  const [hoveredTip, setHoveredTip] = useState<number | null>(null);
  const [likedTips, setLikedTips] = useState<number[]>([]);

  const handleLike = (id: number) => {
    setLikedTips(prev => {
      if (prev.includes(id)) {
        return prev.filter(tipId => tipId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-blue-100 opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-purple-100 opacity-20 blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold tracking-wider uppercase text-sm mb-2">
            Travel Smarter
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Expert Travel Tips & Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make the most of your adventures with insider knowledge and practical advice 
            that will elevate your travel experience.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {travelTips.map((tip) => (
            <motion.div 
              key={tip.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredTip(tip.id)}
              onMouseLeave={() => setHoveredTip(null)}
              className="h-full"
            >
              <Card className="h-full overflow-hidden group border-none shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${tip.color} opacity-80 z-10`} />
                  <Image
                    src={tip.image}
                    alt={tip.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <Badge className="bg-white/80 text-gray-800 hover:bg-white/70">
                      {tip.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 z-20">
                    <button
                      onClick={() => handleLike(tip.id)}
                      className={`p-2 rounded-full ${
                        likedTips.includes(tip.id) 
                          ? "bg-red-500 text-white" 
                          : "bg-white/80 text-gray-700 hover:bg-white"
                      } transition-colors`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <CardHeader className="pt-5 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{tip.title}</CardTitle>
                    <div className="p-2 rounded-full bg-gray-100">{tip.icon}</div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <motion.div 
                    className="flex items-center text-sm font-medium text-blue-600"
                    animate={{ x: hoveredTip === tip.id ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/tips">
            <Button variant="outline" size="lg" className="group">
              View All Travel Tips
              <Sparkles className="ml-2 h-4 w-4 group-hover:animate-pulse" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 