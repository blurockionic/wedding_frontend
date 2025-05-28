// TagUtils.js - Utility functions for tags

/**
 * Generates a consistent color for a tag based on its name
 * Each tag will always get the same color for visual recognition
 * @param {string} tagName - The name of the tag
 * @returns {string} - CSS color class
 */
export const getTagColorClass = (tagName) => {
  // Simple hash function to get a consistent number from the tag name
  const hash = Array.from(tagName).reduce(
    (hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0
  );
  
  // Color families - tailwind color classes with brand colors prioritized
  const colorOptions = [
    'pink', 'purple', 'indigo', 'blue', 'sky', 
    'teal', 'emerald', 'green', 'lime', 'amber', 
    'orange', 'red', 'rose', 'fuchsia', 'violet'
  ];
  
  // Select a color based on the hash
  const colorFamily = colorOptions[Math.abs(hash) % colorOptions.length];
  
  // Give preference to pink for brand color consistency when possible
  if (tagName.toLowerCase().includes('wedding') || 
      tagName.toLowerCase().includes('bride') || 
      tagName.toLowerCase().includes('love') || 
      tagName.length < 4) {
    return {
      bg: `bg-pink-100`,
      text: `text-pink-800`,
      border: `border-pink-200`,
      hoverBg: `hover:bg-pink-200`
    };
  }
  
  return {
    bg: `bg-${colorFamily}-100`,
    text: `text-${colorFamily}-800`,
    border: `border-${colorFamily}-200`,
    hoverBg: `hover:bg-${colorFamily}-200`
  };
};

/**
 * Calculate font size for tag cloud based on usage count
 * @param {number} count - Number of posts with this tag
 * @param {number} maxCount - Maximum usage count across all tags
 * @returns {Object} - Style object with font size and opacity
 */
export const getTagCloudStyle = (count, maxCount) => {
  // Calculate size between 0.8 and 1.6rem
  const size = 0.8 + (count / Math.max(maxCount, 1)) * 0.8;
  
  // Calculate opacity between 0.6 and 1
  const opacity = 0.6 + (count / Math.max(maxCount, 1)) * 0.4;
  
  return {
    fontSize: `${size}rem`,
    opacity
  };
};

/**
 * Group tags by usage for analytics
 * @param {Array} tags - Array of tag objects with usage counts
 * @returns {Object} - Grouped tags by usage level
 */
export const groupTagsByUsage = (tags) => {
  return {
    highUsage: tags.filter(tag => tag.blogCount >= 5),
    mediumUsage: tags.filter(tag => tag.blogCount >= 2 && tag.blogCount < 5),
    lowUsage: tags.filter(tag => tag.blogCount < 2)
  };
};

/**
 * Format tag for display (capitalize first letter, handle special cases)
 * @param {string} tagName - Raw tag name
 * @returns {string} - Formatted tag name for display
 */
export const formatTagForDisplay = (tagName) => {
  if (!tagName) return '';
  
  // Handle special cases for abbreviations and proper nouns
  const specialCases = {
    'diy': 'DIY',
    'lgbt': 'LGBTQ+',
    'lgbtq': 'LGBTQ+',
    'usa': 'USA',
    'uk': 'UK',
    'nyc': 'NYC',
    'la': 'LA',
  };
  
  // Check if tag is in special cases (case insensitive)
  const lowerTag = tagName.toLowerCase();
  if (specialCases[lowerTag]) {
    return specialCases[lowerTag];
  }
  
  // Handle multi-word tags (capitalize each word)
  if (tagName.includes(' ') || tagName.includes('-')) {
    return tagName
      .split(/[ -]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  // Default: capitalize first letter
  return tagName.charAt(0).toUpperCase() + tagName.slice(1).toLowerCase();
};
