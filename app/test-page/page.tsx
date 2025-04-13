"use client";

import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">This is a simple test page to check rendering</p>
      
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="mb-2">Counter: {count}</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  );
} 