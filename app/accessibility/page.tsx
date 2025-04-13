"use client";

import { motion } from "framer-motion";
import { Accessibility, CheckCircle2, Eye, Keyboard, Volume2 } from "lucide-react";
import Link from "next/link";

export default function AccessibilityPage() {
  const accessibilityFeatures = [
    {
      icon: <Keyboard className="h-6 w-6" />,
      title: "Keyboard Navigation",
      description: "Full keyboard support for all interactive elements"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Screen Reader Support",
      description: "Compatible with major screen readers and ARIA attributes"
    },
    {
      icon: <Volume2 className="h-6 w-6" />,
      title: "Audio Descriptions",
      description: "Alternative text for all images and media content"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-orange-100 mb-4">
            <Accessibility className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TourEase is committed to ensuring digital accessibility for all users. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {accessibilityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-orange-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-8 rounded-xl shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">WCAG 2.1 Compliance</h3>
                <p className="text-gray-600">We strive to meet WCAG 2.1 Level AA standards for web accessibility.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Continuous Improvement</h3>
                <p className="text-gray-600">Regular accessibility audits and user testing to identify and fix issues.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">User Feedback</h3>
                <p className="text-gray-600">We welcome feedback on accessibility issues and suggestions for improvement.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 