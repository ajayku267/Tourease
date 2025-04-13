'use client';

import React from 'react';
import Image from 'next/image';

// Static import images - this gives Next.js full control over optimization
import parisImage from '@/public/images/guides/locations/paris.jpg';
import tokyoImage from '@/public/images/guides/locations/tokyo.jpg';
import baliImage from '@/public/images/guides/locations/bali.jpg';

export default function ImageTestPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Image Loading Tests</h1>
      
      <div className="space-y-12">
        {/* Test 1: Direct static imports */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test 1: Static Imports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={parisImage}
                  alt="Paris (Static Import)"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-medium">Paris (Static Import)</p>
            </div>
            
            <div className="space-y-2">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={tokyoImage}
                  alt="Tokyo (Static Import)"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-medium">Tokyo (Static Import)</p>
            </div>
            
            <div className="space-y-2">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={baliImage}
                  alt="Bali (Static Import)"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-medium">Bali (Static Import)</p>
            </div>
          </div>
        </div>
        
        {/* Test 2: Direct path strings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test 2: Path Strings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/guides/locations/paris.jpg"
                  alt="Paris (Path String)"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-medium">Paris (Path String)</p>
            </div>
            
            <div className="space-y-2">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/guides/locations/tokyo.jpg"
                  alt="Tokyo (Path String)"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-medium">Tokyo (Path String)</p>
            </div>
            
            <div className="space-y-2">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/guides/locations/bali.jpg"
                  alt="Bali (Path String)"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-medium">Bali (Path String)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 