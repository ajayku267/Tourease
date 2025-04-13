"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design that detects if a media query is matched
 * @param query The media query to check, e.g. "(min-width: 768px)"
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Initialize with the current match state
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    // Create handler function to update state on change
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    
    // Add event listener
    media.addEventListener('change', listener);
    
    // Clean up
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);
  
  return matches;
} 