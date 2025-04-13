"use client";

/**
 * Generates a safe local image path based on the ID and type
 * This allows us to avoid using external image URLs that require domain configuration
 */
export function getLocalImagePath(
  type: 'profile' | 'destination' | 'guide' | 'hero' | 'default',
  id?: string | number
): string {
  if (!id) id = Math.floor(Math.random() * 100);
  
  // Convert string ID to number if needed
  let numericId: number;
  if (typeof id === 'string') {
    // Try to extract numeric part from string
    const numericPart = id.replace(/\D/g, '');
    numericId = numericPart ? parseInt(numericPart) : id.charCodeAt(0);
  } else {
    numericId = id;
  }
  
  // Get index based on ID (1-5)
  const index = (numericId % 5) + 1;
  
  // Return the appropriate path
  return `/placeholders/${type}-${index}.jpg`;
}

/**
 * Get a color based on the ID
 * This is useful for fallback background colors
 */
export function getColorFromId(id?: string | number): string {
  const colors = [
    '#ff5f1f', // primary orange
    '#3B82F6', // blue
    '#10B981', // green
    '#8B5CF6', // purple
    '#F59E0B', // amber
    '#EC4899', // pink
  ];
  
  if (!id) return colors[0];
  
  let numericId: number;
  if (typeof id === 'string') {
    // Try to extract numeric part or use char code
    const numericPart = id.replace(/\D/g, '');
    numericId = numericPart ? parseInt(numericPart) : id.charCodeAt(0);
  } else {
    numericId = id;
  }
  
  return colors[numericId % colors.length];
}

/**
 * Get initials from a name
 * This is useful for fallback text in profile images
 */
export function getInitials(name: string): string {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export function generateRandomColorClass(): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function getFallbackImageUrl(type: 'profile' | 'destination' | 'generic' = 'generic'): string {
  switch (type) {
    case 'profile':
      return '/placeholders/profile-placeholder.jpg';
    case 'destination':
      return '/placeholders/destination-placeholder.jpg';
    case 'generic':
    default:
      return '/placeholders/image-placeholder.jpg';
  }
} 