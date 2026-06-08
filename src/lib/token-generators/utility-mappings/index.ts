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
import { typesettingUtilities } from './typesetting-utilities.js';

/**
 * All utility mappings aggregated from category files
 * 
 * Current count: 294 base utilities
 * - Color: 52 base (156 with state variants)
 * - Spacing: 183 base (1050 with responsive variants)
 * - Typesetting: 59 base (~265 with responsive/state variants)
 * 
 * Total with variants: ~1471 classes
 */
export const allUtilityMappings: UtilityMapping[] = [
  ...colorUtilities,
  ...spacingUtilities,
  ...typesettingUtilities
  // Add more utility categories here as they are created:
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
