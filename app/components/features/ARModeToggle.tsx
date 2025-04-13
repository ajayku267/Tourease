"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewIcon, Compass, MapPin, Phone, Smartphone, PanelRight, Eye, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface ARModeToggleProps {
  className?: string;
}

export default function ARModeToggle({ className }: ARModeToggleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const router = useRouter();

  return (
    <div className={`relative ${className}`}>
      {/* AR Mode Button with enhanced visual effects */}
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsInfoVisible(true)}
      >
        <Button 
          variant="outline" 
          size="lg"
          className="relative bg-transparent border border-white/20 hover:border-white/40 text-white backdrop-blur-sm rounded-full py-6 overflow-hidden group"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20" 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Animated ripple effect on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full border-2 border-orange-500/30" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <span className="relative z-10 flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="bg-orange-500/20 p-1.5 rounded-full"
            >
              <Compass className="h-5 w-5 text-orange-500" />
            </motion.div>
            <span className="font-medium">AR Tour Mode</span>
            
            {/* New badge indicator */}
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 border-0 text-[10px] font-semibold">
              NEW
            </Badge>
          </span>
        </Button>
      </motion.div>

      {/* Enhanced Info Modal */}
      <AnimatePresence>
        {isInfoVisible && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInfoVisible(false)}
          >
            <motion.div 
              className="bg-gradient-to-b from-gray-900 to-black/90 rounded-2xl overflow-hidden max-w-md w-full shadow-2xl border border-white/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with animation */}
              <div className="relative h-32 bg-gray-800 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Animated waveform background */}
                  <svg className="absolute w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      fill="rgba(249, 115, 22, 0.4)" 
                      d="M0,192L48,170.7C96,149,192,107,288,117.3C384,128,480,192,576,202.7C672,213,768,171,864,154.7C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      animate={{ 
                        d: [
                          "M0,192L48,170.7C96,149,192,107,288,117.3C384,128,480,192,576,202.7C672,213,768,171,864,154.7C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                          "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,165.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ] 
                      }}
                      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                  </svg>

                  {/* Animated particles */}
                  <div className="absolute inset-0">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-orange-400/50"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <motion.div
                    className="p-3 bg-orange-500/20 rounded-full mb-2"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Camera className="h-8 w-8 text-orange-500" />
                  </motion.div>
                  <h2 className="text-white text-xl font-bold">AR Tour Experience</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-white/80 text-sm mb-6">
                  Experience destinations in augmented reality. Point your camera at the world around you to discover nearby points of interest, get real-time information, and explore interactive 3D models.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-orange-500/20 p-2 rounded-full mr-3">
                      <Smartphone className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">Immersive Experience</h3>
                      <p className="text-white/70 text-xs">Visualize destinations in AR directly through your camera.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-500/20 p-2 rounded-full mr-3">
                      <MapPin className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">Discover POIs</h3>
                      <p className="text-white/70 text-xs">Automatically identify points of interest around you.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-500/20 p-2 rounded-full mr-3">
                      <PanelRight className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">Advanced Filters</h3>
                      <p className="text-white/70 text-xs">Customize your view with weather effects and visual modes.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 hover:from-orange-600 hover:to-pink-600"
                    onClick={() => {
                      setIsInfoVisible(false);
                      router.push("/ar-tour");
                    }}
                  >
                    Launch AR Mode
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                    onClick={() => setIsInfoVisible(false)}
                  >
                    Maybe Later
                  </Button>
                </div>

                <div className="mt-4 text-center text-xs text-white/50">
                  <p>Requires camera permissions • Best used outdoors</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 