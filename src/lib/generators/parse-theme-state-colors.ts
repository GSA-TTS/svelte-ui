/**
 * Parse USWDS theme and state color tokens
 * 
 * Theme colors are semantic tokens (primary, secondary, etc.)
 * State colors are for UI states (error, warning, success, info, disabled)
 */

import type { ColorTokenValue } from './types';

/**
 * Parse USWDS theme color tokens
 * 
 * These are references to system colors and represent semantic meaning
 */
export function parseThemeColors(): Record<string, ColorTokenValue> {
  return {
    // Primary colors
    'primary': { value: 'blue-60v', reference: true },
    'primary-vivid': { value: 'blue-warm-60v', reference: true },
    'primary-dark': { value: 'blue-warm-70v', reference: true },
    'primary-darker': { value: 'blue-warm-80v', reference: true },
    'primary-light': { value: 'blue-60', reference: true },
    'primary-lighter': { value: 'blue-50', reference: true },
    
    // Secondary colors
    'secondary': { value: 'red-50', reference: true },
    'secondary-vivid': { value: 'red-cool-50v', reference: true },
    'secondary-dark': { value: 'red-60v', reference: true },
    'secondary-darker': { value: 'red-70', reference: true },
    'secondary-light': { value: 'red-30', reference: true },
    'secondary-lighter': { value: 'red-20', reference: true },
    
    // Accent warm
    'accent-warm': { value: 'orange-40v', reference: true },
    'accent-warm-dark': { value: 'orange-50v', reference: true },
    'accent-warm-darker': { value: 'orange-60', reference: true },
    'accent-warm-light': { value: 'orange-20v', reference: true },
    'accent-warm-lighter': { value: 'orange-10', reference: true },
    
    // Accent cool
    'accent-cool': { value: 'blue-cool-40v', reference: true },
    'accent-cool-dark': { value: 'blue-cool-50v', reference: true },
    'accent-cool-darker': { value: 'blue-cool-60v', reference: true },
    'accent-cool-light': { value: 'cyan-30', reference: true },
    'accent-cool-lighter': { value: 'cyan-20', reference: true },
    
    // Base (neutrals)
    'base-lightest': { value: 'gray-5', reference: true },
    'base-lighter': { value: 'gray-cool-10', reference: true },
    'base-light': { value: 'gray-cool-30', reference: true },
    'base': { value: 'gray-cool-50', reference: true },
    'base-dark': { value: 'gray-cool-60', reference: true },
    'base-darker': { value: 'gray-cool-70', reference: true },
    'base-darkest': { value: 'gray-90', reference: true },
    
    // Text and ink
    'ink': { value: 'gray-90', reference: true },
    
    // Special
    'white': { value: '#ffffff', reference: false }
  };
}

/**
 * Parse USWDS state color tokens
 * 
 * These represent UI state feedback (errors, warnings, success, etc.)
 */
export function parseStateColors(): Record<string, ColorTokenValue> {
  return {
    // Error states
    'error': { value: 'red-60v', reference: true },
    'error-dark': { value: 'red-70', reference: true },
    'error-darker': { value: 'red-80', reference: true },
    'error-light': { value: 'red-30', reference: true },
    'error-lighter': { value: 'red-10', reference: true },
    
    // Warning states
    'warning': { value: 'gold-20v', reference: true },
    'warning-dark': { value: 'gold-30v', reference: true },
    'warning-darker': { value: 'gold-50v', reference: true },
    'warning-light': { value: 'yellow-10', reference: true },
    'warning-lighter': { value: 'yellow-5', reference: true },
    
    // Success states
    'success': { value: 'green-cool-40v', reference: true },
    'success-dark': { value: 'green-cool-50v', reference: true },
    'success-darker': { value: 'green-cool-60v', reference: true },
    'success-light': { value: 'green-cool-20v', reference: true },
    'success-lighter': { value: 'green-cool-5', reference: true },
    
    // Info states
    'info': { value: 'cyan-30v', reference: true },
    'info-dark': { value: 'cyan-40v', reference: true },
    'info-darker': { value: 'cyan-50v', reference: true },
    'info-light': { value: 'cyan-20', reference: true },
    'info-lighter': { value: 'cyan-5', reference: true },
    
    // Disabled states
    'disabled': { value: 'gray-20', reference: true },
    'disabled-light': { value: 'gray-10', reference: true }
  };
}
