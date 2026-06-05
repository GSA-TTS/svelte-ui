/**
 * Component Token Mappings Index
 * 
 * Re-exports all component token definitions from individual files.
 * 
 * @module component-mappings
 */

export { buttonTokens } from './button-tokens.js';
export { inputTokens } from './input-tokens.js';
export { checkboxTokens } from './checkbox-tokens.js';

import { buttonTokens } from './button-tokens.js';
import { inputTokens } from './input-tokens.js';
import { checkboxTokens } from './checkbox-tokens.js';
import type { ComponentTokens } from '../types.js';

/**
 * All component token definitions
 */
export const allComponentTokens: ComponentTokens[] = [
  buttonTokens,
  inputTokens,
  checkboxTokens
];
