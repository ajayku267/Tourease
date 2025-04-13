'use client';

import React from 'react';
import Image from 'next/image';

export default function TestImageLoader() {
  return (
    <div className="min-h-screen p-10 space-y-10">
      <h1 className="text-3xl font-bold">Image Loading Test</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Direct Path Loading</h2>
        <div className="relative h-64 w-full">
          <Image
            src="/images/guides/locations/paris.jpg"
            alt="Paris"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Images in guides/locations directory:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'paris.jpg',
            'tokyo.jpg',
            'bali.jpg',
            'santorini.jpg',
            'mountain.jpg',
            'barcelona.jpg',
            'default.jpg'
          ].map((img) => (
            <div key={img} className="relative h-64 rounded-lg overflow-hidden border-2 border-gray-200">
              <div className="absolute inset-0">
                <Image
                  src={`/images/guides/locations/${img}`}
                  alt={img}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-center">
                {img}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 