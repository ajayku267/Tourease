"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook that monitors if a media query matches the current viewport
 * @param query The media query to check (e.g. "(min-width: 768px)")
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with a default value (false for SSR)
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a media query list
    const media = window.matchMedia(query);
    
    // Set the initial value
    setMatches(media.matches);
    
    // Define callback for media query change
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    media.addEventListener("change", listener);
    
    // Clean up
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]); // Re-run if the query changes

  return matches;
} 