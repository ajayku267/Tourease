"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ChevronRight,
  Globe,
  Compass,
  PlaneTakeoff,
  Sunrise,
  Camera,
  Leaf,
  Map
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about", icon: <Globe className="h-4 w-4" /> },
      { name: "Careers", href: "/careers", icon: <Sunrise className="h-4 w-4" /> },
      { name: "Press", href: "/press", icon: <Camera className="h-4 w-4" /> },
      { name: "Blog", href: "/blog", icon: <Leaf className="h-4 w-4" /> }
    ],
    resources: [
      { name: "Travel Guides", href: "/guides", icon: <Map className="h-4 w-4" /> },
      { name: "Tips & Tricks", href: "/tips", icon: <Compass className="h-4 w-4" /> },
      { name: "FAQs", href: "/faqs", icon: <PlaneTakeoff className="h-4 w-4" /> },
      { name: "Support Center", href: "/support", icon: <Mail className="h-4 w-4" /> }
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com", color: "hover:bg-blue-600" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", color: "hover:bg-blue-400" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", color: "hover:bg-pink-600" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", color: "hover:bg-blue-700" },
    { name: "YouTube", icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com", color: "hover:bg-red-600" }
  ];

  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/world-pattern.svg')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-[#ff5f1f]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
      
      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-r from-[#ff5f1f] to-amber-500 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/world-pattern.svg')] bg-cover opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <div
                className="inline-block mb-4 animate-fade-in"
              >
                <div className="flex items-center text-sm font-semibold border border-white/20 text-white rounded-full pl-1 pr-4 py-1 bg-white/10 backdrop-blur-sm">
                  <div className="bg-white text-[#ff5f1f] p-1 rounded-full mr-2">
                    <PlaneTakeoff className="h-3 w-3" />
                  </div>
                  Travel Updates & Inspiration
                </div>
              </div>
              
              <h3 
                className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in"
                style={{animationDelay: "0.1s"}}
              >
                Join Our Travel Community
              </h3>
              <p 
                className="text-white/90 max-w-md text-lg animate-fade-in"
                style={{animationDelay: "0.2s"}}
              >
                Get exclusive travel tips, destination guides, and early access to special offers.
              </p>
            </div>
            <div 
              className="md:w-1/2 animate-fade-in"
              style={{animationDelay: "0.3s"}}
            >
              <form className="flex flex-col sm:flex-row gap-3" name="newsletter-form" id="newsletter-form">
                <label htmlFor="email-newsletter" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email-newsletter"
                  name="email"
                  placeholder="Your email address"
                  className="flex-grow px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                  required
                />
                <button
                  className="bg-white text-[#ff5f1f] px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
                >
                  Subscribe
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <span className="text-3xl font-bold bg-gradient-to-r from-[#ff5f1f] to-amber-400 bg-clip-text text-transparent">Tour</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">Ease</span>
            </Link>
            <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-6">
              <Image 
                src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop" 
                alt="World Map"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-900/40"></div>
              <div className="absolute bottom-3 left-3 flex items-center">
                <Compass className="h-5 w-5 text-[#ff5f1f] mr-2" />
                <span className="text-sm font-medium text-white">Explore the world with us</span>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Your AI-powered travel companion for planning trips, discovering hidden gems, 
              and creating unforgettable adventures across the globe.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300 group">
                <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3 group-hover:bg-[#ff5f1f] transition-colors">
                  <Mail className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="group-hover:text-white transition-colors">contact@tourease.com</span>
              </div>
              <div className="flex items-center text-gray-300 group">
                <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3 group-hover:bg-[#ff5f1f] transition-colors">
                  <Phone className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="group-hover:text-white transition-colors">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300 group">
                <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3 group-hover:bg-[#ff5f1f] transition-colors">
                  <MapPin className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="group-hover:text-white transition-colors">123 Travel Street, City, Country</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <Globe className="h-5 w-5 mr-2 text-[#ff5f1f]" />
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li 
                  key={index}
                  className="transition-transform hover:translate-x-1"
                >
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <div className="h-6 w-6 rounded-full bg-gray-800 group-hover:bg-[#ff5f1f]/20 flex items-center justify-center mr-3 transition-colors">
                      {link.icon}
                    </div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <Map className="h-5 w-5 mr-2 text-[#ff5f1f]" />
              Resources
            </h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link, index) => (
                <li 
                  key={index}
                  className="transition-transform hover:translate-x-1"
                >
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <div className="h-6 w-6 rounded-full bg-gray-800 group-hover:bg-[#ff5f1f]/20 flex items-center justify-center mr-3 transition-colors">
                      {link.icon}
                    </div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <Sunrise className="h-5 w-5 mr-2 text-[#ff5f1f]" />
              Legal
            </h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link, index) => (
                <li 
                  key={index}
                  className="transition-transform hover:translate-x-1"
                >
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-[#ff5f1f]" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} TourEase. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-2">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white ${link.color} transition-colors`}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 