/**
 * Semantic Token Mappings - Index
 * 
 * Re-exports semantic token mappings for all design systems.
 * Each design system has its own mapping file that defines how its foundation
 * tokens map to universal semantic tokens.
 * 
 * Available Design Systems:
 *   - USWDS (U.S. Web Design System)
 *   - Material Design (future)
 *   - Bootstrap (future)
 * 
 * @module semantic-mappings
 */

export { uswdsSemanticMappings } from './uswds-semantic-mappings.js';

import { uswdsSemanticMappings } from './uswds-semantic-mappings.js';
import type { SemanticTokenMapping } from '../types.js';

/**
 * Get semantic mappings by category
 * 
 * @param category - Token category to filter by
 * @param designSystem - Design system to use (default: 'uswds')
 */
export function getSemanticMappingsByCategory(
  category: SemanticTokenMapping['category'],
  designSystem: 'uswds' | 'material' | 'bootstrap' = 'uswds'
): SemanticTokenMapping[] {
  // Currently only USWDS is implemented
  const mappings = designSystem === 'uswds' ? uswdsSemanticMappings : uswdsSemanticMappings;
  return mappings.filter(mapping => mapping.category === category);
}

/**
 * Get all semantic token names
 * 
 * @param designSystem - Design system to use (default: 'uswds')
 */
export function getSemanticTokenNames(
  designSystem: 'uswds' | 'material' | 'bootstrap' = 'uswds'
): string[] {
  // Currently only USWDS is implemented
  const mappings = designSystem === 'uswds' ? uswdsSemanticMappings : uswdsSemanticMappings;
  return mappings.map(mapping => mapping.semantic);
}

/**
 * Get foundation token for a semantic token
 * 
 * @param semanticToken - Semantic token name
 * @param designSystem - Design system to use (default: 'uswds')
 */
export function getFoundationToken(
  semanticToken: string,
  designSystem: 'uswds' | 'material' | 'bootstrap' = 'uswds'
): string | undefined {
  // Currently only USWDS is implemented
  const mappings = designSystem === 'uswds' ? uswdsSemanticMappings : uswdsSemanticMappings;
  const mapping = mappings.find(m => m.semantic === semanticToken);
  return mapping?.foundation;
}
