/**
 * Parse USWDS "other" tokens (shadow, opacity, z-index, flex, order)
 * 
 * These tokens are hardcoded based on USWDS documentation because they are not
 * available in JSON format in the USWDS package.
 * 
 * Sources:
 *   - Shadow: https://designsystem.digital.gov/design-tokens/shadow/
 *   - Opacity: https://designsystem.digital.gov/design-tokens/opacity/
 *   - Z-index: https://designsystem.digital.gov/design-tokens/z-index/
 *   - Flex: https://designsystem.digital.gov/design-tokens/flex/
 *   - Order: https://designsystem.digital.gov/design-tokens/order/
 */

import type { TokenValue } from '../../types.js';

/**
 * Parse USWDS shadow tokens
 */
export function parseUSWDSShadowTokens(): Record<string, TokenValue> {
  return {
    'none': { value: 'none' },
    '1': { value: '0 1px 4px 0 rgba(0, 0, 0, 0.1)' },
    '2': { value: '0 4px 8px 0 rgba(0, 0, 0, 0.1)' },
    '3': { value: '0 8px 16px 0 rgba(0, 0, 0, 0.1)' },
    '4': { value: '0 12px 24px 0 rgba(0, 0, 0, 0.1)' },
    '5': { value: '0 16px 32px 0 rgba(0, 0, 0, 0.1)' }
  };
}

/**
 * Parse USWDS opacity tokens
 */
export function parseUSWDSOpacityTokens(): Record<string, TokenValue> {
  return {
    '0': { value: '0' },
    '10': { value: '0.1' },
    '20': { value: '0.2' },
    '30': { value: '0.3' },
    '40': { value: '0.4' },
    '50': { value: '0.5' },
    '60': { value: '0.6' },
    '70': { value: '0.7' },
    '80': { value: '0.8' },
    '90': { value: '0.9' },
    '100': { value: '1' }
  };
}

/**
 * Parse USWDS z-index tokens
 */
export function parseUSWDSZIndexTokens(): Record<string, TokenValue> {
  return {
    'auto': { value: 'auto' },
    'bottom': { value: '-100' },
    '100': { value: '100' },
    '200': { value: '200' },
    '300': { value: '300' },
    '400': { value: '400' },
    '500': { value: '500' },
    'top': { value: '99999' }
  };
}

/**
 * Parse USWDS flex tokens
 * 
 * Flex shorthand values for flex-grow, flex-shrink, and flex-basis.
 * https://designsystem.digital.gov/design-tokens/flex/
 */
export function parseUSWDSFlexTokens(): Record<string, TokenValue> {
  return {
    '1': { value: '1 0 0' },
    '2': { value: '2 0 0' },
    '3': { value: '3 0 0' },
    '4': { value: '4 0 0' },
    '5': { value: '5 0 0' },
    '6': { value: '6 0 0' },
    '7': { value: '7 0 0' },
    '8': { value: '8 0 0' },
    '9': { value: '9 0 0' },
    '10': { value: '10 0 0' },
    '11': { value: '11 0 0' },
    '12': { value: '12 0 0' },
    'auto': { value: 'auto' },
    'fill': { value: '1 0 0' }
  };
}

/**
 * Parse USWDS order tokens
 */
export function parseUSWDSOrderTokens(): Record<string, TokenValue> {
  return {
    'first': { value: 'first' },
    'last': { value: 'last' },
    'initial': { value: 'initial' },
    '0': { value: '0' },
    '1': { value: '1' },
    '2': { value: '2' },
    '3': { value: '3' },
    '4': { value: '4' },
    '5': { value: '5' },
    '6': { value: '6' },
    '7': { value: '7' },
    '8': { value: '8' },
    '9': { value: '9' },
    '10': { value: '10' },
    '11': { value: '11' }
  };
}
