import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names or class name functions into a single string
 * and handles Tailwind conflicts by merging them correctly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency with locale and currency symbol
 */
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Generate a random ID string
 */
export function generateId(length = 8) {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Truncate a string to a specified length with ellipsis
 */
export function truncateString(str: string, length = 50) {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

/**
 * Get a random color from a predefined list
 */
export function getRandomColor() {
  const colors = ['#FF5F1F', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Get a safe image URL that works with Next.js Image component
 * This function provides local placeholder URLs instead of external URLs that may not be configured
 */
export function getSafeImageUrl(type: 'profile' | 'destination' | 'guide' | 'hero', id?: string | number) {
  // Use local placeholder images instead of external URLs
  const seed = id ? String(id) : Math.random().toString(36).substring(2, 8);
  
  switch (type) {
    case 'profile':
      return `/placeholders/profile-${seed.charAt(0)}.jpg`;
    case 'destination':
      return `/placeholders/destination-${Math.floor(Math.random() * 5) + 1}.jpg`;
    case 'guide':
      return `/placeholders/guide-${Math.floor(Math.random() * 3) + 1}.jpg`;
    case 'hero':
      return `/placeholders/hero-${Math.floor(Math.random() * 4) + 1}.jpg`;
    default:
      return `/placeholders/image-placeholder.jpg`;
  }
}

/**
 * Handles image loading errors by providing fallbacks
 * @param event The error event from the image
 * @param fallbackSrc Optional fallback image source
 * @param fallbackBgColor Optional background color if no fallback image
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc?: string,
  fallbackBgColor?: string
) {
  const target = event.target as HTMLImageElement;
  
  if (fallbackSrc) {
    // Use fallback image
    target.src = fallbackSrc;
  } else {
    // Hide the image and apply background color
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent && fallbackBgColor) {
      parent.style.backgroundColor = fallbackBgColor;
    }
  }
  
  // Prevent infinite error loop
  target.onerror = null;
}

/**
 * Formats a date to a human-readable string
 */
export function formatDate(date: Date | string): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(d);
}

/**
 * Formats a price with currency symbol
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Safely access deep nested properties without errors
 */
export function deepGet<T>(obj: any, path: string, defaultValue: T): T {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

/**
 * Debounce function to limit how often a function is called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get random item from array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Format duration in days
 */
export function formatDuration(days: number): string {
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  
  if (weeks === 1 && remainingDays === 0) return '1 week';
  if (remainingDays === 0) return `${weeks} weeks`;
  if (weeks === 1) return `1 week, ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
  return `${weeks} weeks, ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
}

/**
 * Get initial from name (for avatar fallbacks)
 */
export function getInitials(name: string): string {
  if (!name) return '';
  
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Advanced date/time formatting with multiple format options
 * @param date Date object or date string to format
 * @param format Predefined format or custom format options
 * @param locale Locale for formatting (defaults to 'en-US')
 * @returns Formatted date/time string
 */
export function formatDateTime(
  date: Date | string | number,
  format: 'short' | 'medium' | 'long' | 'full' | 'relative' | 'time' | Intl.DateTimeFormatOptions = 'medium',
  locale = 'en-US'
): string {
  if (!date) return '';
  
  // Convert to Date object if string or timestamp
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  // Handle invalid dates
  if (isNaN(dateObj.getTime())) return 'Invalid date';
  
  // For relative time formatting
  if (format === 'relative') {
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
    
    // Fall back to standard format for older dates
    return new Intl.DateTimeFormat(locale, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(dateObj);
  }
  
  // Predefined formats
  let options: Intl.DateTimeFormatOptions;
  
  switch (format) {
    case 'short':
      options = { month: 'numeric', day: 'numeric', year: '2-digit' };
      break;
    case 'medium':
      options = { month: 'short', day: 'numeric', year: 'numeric' };
      break;
    case 'long':
      options = { 
        weekday: 'short', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      };
      break;
    case 'full':
      options = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      };
      break;
    case 'time':
      options = { hour: 'numeric', minute: '2-digit' };
      break;
    default:
      // If format is an object, use it as options
      options = typeof format === 'object' ? format : { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      };
  }
  
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Safely converts a Date object to a string representation
 * Use this to avoid React hydration errors when passing Date objects to components
 * @param date The date to convert to string
 * @returns A string representation of the date
 */
export function safeDateString(date: Date | string | number | null | undefined): string {
  if (date === null || date === undefined) return '';
  
  try {
    // Convert to Date object if string or timestamp
    const dateObj = typeof date === 'string' || typeof date === 'number' 
      ? new Date(date) 
      : date;
    
    // Handle invalid dates
    if (isNaN(dateObj.getTime())) return '';
    
    // Convert to ISO string
    return dateObj.toISOString();
  } catch (error) {
    console.error('Error converting date to string:', error);
    return '';
  }
} 