/**
 * Parse USWDS spacing tokens
 * 
 * USWDS spacing tokens are based on multiples of 8px, with additional
 * tokens for small sizes, named tokens for large sizes, and negative tokens.
 */

import type { TokenValue } from './types';

/**
 * Parse all USWDS spacing unit tokens
 * 
 * Based on USWDS documentation:
 * https://designsystem.digital.gov/design-tokens/spacing-units/
 */
export function parseUSWDSSpacingTokens(): Record<string, TokenValue> {
  const spacing: Record<string, TokenValue> = {};
  
  // Pixel tokens
  spacing['1px'] = { value: '1px', px: 1 };
  spacing['2px'] = { value: '2px', px: 2 };
  
  // Base unit tokens (multiples of 8px)
  spacing['05'] = { value: '0.25rem', px: 4, rem: '0.25rem' };
  spacing['1'] = { value: '0.5rem', px: 8, rem: '0.5rem' };
  spacing['105'] = { value: '0.75rem', px: 12, rem: '0.75rem' };
  spacing['2'] = { value: '1rem', px: 16, rem: '1rem' };
  spacing['205'] = { value: '1.25rem', px: 20, rem: '1.25rem' };
  spacing['3'] = { value: '1.5rem', px: 24, rem: '1.5rem' };
  spacing['4'] = { value: '2rem', px: 32, rem: '2rem' };
  spacing['5'] = { value: '2.5rem', px: 40, rem: '2.5rem' };
  spacing['6'] = { value: '3rem', px: 48, rem: '3rem' };
  spacing['7'] = { value: '3.5rem', px: 56, rem: '3.5rem' };
  spacing['8'] = { value: '4rem', px: 64, rem: '4rem' };
  spacing['9'] = { value: '4.5rem', px: 72, rem: '4.5rem' };
  spacing['10'] = { value: '5rem', px: 80, rem: '5rem' };
  spacing['15'] = { value: '7.5rem', px: 120, rem: '7.5rem' };
  
  // Named tokens for large sizes
  spacing['card'] = { value: '10rem', px: 160, rem: '10rem' };
  spacing['card-lg'] = { value: '15rem', px: 240, rem: '15rem' };
  spacing['mobile'] = { value: '20rem', px: 320, rem: '20rem' };
  spacing['mobile-lg'] = { value: '30rem', px: 480, rem: '30rem' };
  spacing['tablet'] = { value: '40rem', px: 640, rem: '40rem' };
  spacing['tablet-lg'] = { value: '55rem', px: 880, rem: '55rem' };
  spacing['desktop'] = { value: '64rem', px: 1024, rem: '64rem' };
  spacing['desktop-lg'] = { value: '75rem', px: 1200, rem: '75rem' };
  spacing['widescreen'] = { value: '87.5rem', px: 1400, rem: '87.5rem' };
  
  // Negative tokens
  spacing['neg-1px'] = { value: '-1px', px: -1 };
  spacing['neg-2px'] = { value: '-2px', px: -2 };
  spacing['neg-05'] = { value: '-0.25rem', px: -4, rem: '-0.25rem' };
  spacing['neg-1'] = { value: '-0.5rem', px: -8, rem: '-0.5rem' };
  spacing['neg-105'] = { value: '-0.75rem', px: -12, rem: '-0.75rem' };
  spacing['neg-2'] = { value: '-1rem', px: -16, rem: '-1rem' };
  spacing['neg-205'] = { value: '-1.25rem', px: -20, rem: '-1.25rem' };
  spacing['neg-3'] = { value: '-1.5rem', px: -24, rem: '-1.5rem' };
  spacing['neg-4'] = { value: '-2rem', px: -32, rem: '-2rem' };
  spacing['neg-5'] = { value: '-2.5rem', px: -40, rem: '-2.5rem' };
  spacing['neg-6'] = { value: '-3rem', px: -48, rem: '-3rem' };
  spacing['neg-7'] = { value: '-3.5rem', px: -56, rem: '-3.5rem' };
  spacing['neg-8'] = { value: '-4rem', px: -64, rem: '-4rem' };
  spacing['neg-9'] = { value: '-4.5rem', px: -72, rem: '-4.5rem' };
  spacing['neg-10'] = { value: '-5rem', px: -80, rem: '-5rem' };
  spacing['neg-15'] = { value: '-7.5rem', px: -120, rem: '-7.5rem' };
  
  return spacing;
}
