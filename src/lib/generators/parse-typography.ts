/**
 * Parse USWDS typography tokens
 * 
 * Note: USWDS doesn't provide complete typography tokens in JSON format.
 * These values are extracted from USWDS documentation and Sass defaults.
 * 
 * Sources:
 * - Font stacks: packages/uswds-core/src/styles/settings/_settings-typography.scss
 * - Font sizes: packages/uswds-core/src/styles/tokens/font/
 * - Documentation: https://designsystem.digital.gov/design-tokens/typesetting/
 * 
 * Last verified: USWDS v3.13.0 (2024-06-04)
 * 
 * Font stacks are intentionally hardcoded as they:
 * 1. Rarely change (stable for years)
 * 2. Match USWDS documentation defaults
 * 3. Are configurable in USWDS (no single source of truth)
 * 4. Avoid complex Sass parsing
 */

import type { TokenValue, TypographyFamilyValue } from './types';

/**
 * Parse USWDS font family tokens
 * 
 * Font stacks match USWDS defaults from:
 * https://designsystem.digital.gov/design-tokens/typesetting/font-family/
 * 
 * Includes both:
 * - Type-based tokens (the 10 available font stacks)
 * - Role-based tokens (semantic assignments: ui, heading, body, code, alt)
 */
export function parseFontFamilies(): Record<string, TypographyFamilyValue> {
  return {
    // Type-based tokens (10 available fonts with full stacks)
    'georgia': {
      value: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
    },
    'helvetica': {
      value: ['Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif']
    },
    'merriweather': {
      value: ['Merriweather Web', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
    },
    'open-sans': {
      value: [
        'Open Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      ]
    },
    'public-sans': {
      value: [
        'Public Sans Web',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      ]
    },
    'roboto-mono': {
      value: [
        'Roboto Mono Web',
        'Bitstream Vera Sans Mono',
        'Consolas',
        'Courier',
        'monospace'
      ]
    },
    'source-sans-pro': {
      value: ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif']
    },
    'system': {
      value: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      ]
    },
    'tahoma': {
      value: [
        'Tahoma',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      ]
    },
    'verdana': {
      value: [
        'Verdana',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      ]
    },
    
    // Role-based tokens (semantic assignments)
    // These reference type-based tokens in actual USWDS usage
    // Defaults: sans='source-sans-pro', serif='merriweather', mono='roboto-mono'
    'sans': {
      value: ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif']
    },
    'serif': {
      value: ['Merriweather Web', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
    },
    'mono': {
      value: [
        'Roboto Mono Web',
        'Bitstream Vera Sans Mono',
        'Consolas',
        'Courier',
        'monospace'
      ]
    },
    'ui': {
      value: ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif']
    },
    'heading': {
      value: ['Merriweather Web', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
    },
    'body': {
      value: ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif']
    },
    'code': {
      value: [
        'Roboto Mono Web',
        'Bitstream Vera Sans Mono',
        'Consolas',
        'Courier',
        'monospace'
      ]
    },
    'alt': {
      value: ['Merriweather Web', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
    }
  };
}

/**
 * Parse USWDS font size tokens
 * 
 * Based on USWDS type scale system documented at:
 * https://designsystem.digital.gov/design-tokens/typesetting/font-size/
 */
export function parseFontSizes(): Record<string, TokenValue> {
  return {
    // Named sizes
    'micro': { value: '0.625rem', px: 10 },
    '3xs': { value: '0.625rem', px: 10 },
    '2xs': { value: '0.6875rem', px: 11 },
    'xs': { value: '0.75rem', px: 12 },
    'sm': { value: '0.8125rem', px: 13 },
    'md': { value: '0.875rem', px: 14 },
    'lg': { value: '0.9375rem', px: 15 },
    'xl': { value: '1rem', px: 16 },
    '2xl': { value: '1.125rem', px: 18 },
    '3xl': { value: '1.25rem', px: 20 },
    
    // Numeric sizes
    '1': { value: '0.625rem', px: 10 },
    '2': { value: '0.6875rem', px: 11 },
    '3': { value: '0.75rem', px: 12 },
    '4': { value: '0.8125rem', px: 13 },
    '5': { value: '0.875rem', px: 14 },
    '6': { value: '0.9375rem', px: 15 },
    '7': { value: '1rem', px: 16 },
    '8': { value: '1.0625rem', px: 17 },
    '9': { value: '1.125rem', px: 18 },
    '10': { value: '1.1875rem', px: 19 },
    '11': { value: '1.25rem', px: 20 },
    '12': { value: '1.375rem', px: 22 },
    '13': { value: '1.5rem', px: 24 },
    '14': { value: '1.75rem', px: 28 },
    '15': { value: '2rem', px: 32 },
    '16': { value: '2.25rem', px: 36 },
    '17': { value: '2.5rem', px: 40 },
    '18': { value: '3rem', px: 48 },
    '19': { value: '3.5rem', px: 56 },
    '20': { value: '4rem', px: 64 }
  };
}

/**
 * Parse USWDS font weight tokens
 * 
 * Standard CSS font-weight values.
 * https://designsystem.digital.gov/design-tokens/typesetting/font-weight/
 */
export function parseFontWeights(): Record<string, TokenValue> {
  return {
    thin: { value: '100' },
    light: { value: '300' },
    normal: { value: '400' },
    medium: { value: '500' },
    semibold: { value: '600' },
    bold: { value: '700' },
    heavy: { value: '900' }
  };
}

/**
 * Parse USWDS line height tokens
 * 
 * Unitless multipliers for consistent vertical rhythm.
 * https://designsystem.digital.gov/design-tokens/typesetting/line-height/
 */
export function parseLineHeights(): Record<string, TokenValue> {
  return {
    '1': { value: '1' },
    '2': { value: '1.15' },
    '3': { value: '1.35' },
    '4': { value: '1.5' },
    '5': { value: '1.62' },
    '6': { value: '1.75' }
  };
}

/**
 * Parse USWDS letter spacing tokens
 * 
 * https://designsystem.digital.gov/design-tokens/typesetting/letterspacing/
 */
export function parseLetterSpacing(): Record<string, TokenValue> {
  return {
    'auto': { value: 'initial' },
    '1': { value: '0.025em' },
    '2': { value: '0.05em' },
    '3': { value: '0.1em' }
  };
}

/**
 * Parse USWDS measure (line length) tokens
 * 
 * Maximum line lengths for optimal readability, measured in 'ex' units.
 * https://designsystem.digital.gov/design-tokens/typesetting/measure/
 */
export function parseMeasure(): Record<string, TokenValue> {
  return {
    '1': { value: '44ex' },
    '2': { value: '60ex' },
    '3': { value: '64ex' },
    '4': { value: '68ex' },
    '5': { value: '72ex' },
    '6': { value: '88ex' },
    'none': { value: 'none' }
  };
}
