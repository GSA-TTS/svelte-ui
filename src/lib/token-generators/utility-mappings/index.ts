/**
 * Utility Mappings Index
 *
 * Aggregates all utility mappings from individual category files.
 * 
 * To add a new utility category:
 * 1. Create a new file: {category}-utilities.ts
 * 2. Export utilities as: export const {category}Utilities: UtilityMapping[]
 * 3. Import and add to allUtilityMappings array below
 *
 * @module utility-mappings
 */

import type { UtilityMapping } from '../types.js';
import { colorUtilities } from './color-utilities.js';
import { spacingUtilities } from './spacing-utilities.js';

/**
 * All utility mappings aggregated from category files
 * 
 * Current count: 220 base utilities
 * - Color: 52 base (156 with state variants)
 * - Spacing: 168 base (1008 with responsive variants)
 * 
 * Total with variants: ~1164 classes
 */
export const allUtilityMappings: UtilityMapping[] = [
  ...colorUtilities,
  ...spacingUtilities
  // Add more utility categories here as they are created:
  // ...typographyUtilities,
  // ...displayUtilities,
  // ...flexboxUtilities,
  // ...sizingUtilities,
  // ...layoutUtilities,
  // ...borderUtilities,
  // ...effectUtilities,
  // ...zIndexUtilities
];

/**
 * Get utilities for a specific category
 */
export function getUtilitiesByCategory(category: string): UtilityMapping[] {
  return allUtilityMappings.filter(u => u.category === category);
}

/**
 * Get count of utilities by category
 */
export function getUtilityCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  allUtilityMappings.forEach(utility => {
    counts[utility.category] = (counts[utility.category] || 0) + 1;
  });
  return counts;
}
