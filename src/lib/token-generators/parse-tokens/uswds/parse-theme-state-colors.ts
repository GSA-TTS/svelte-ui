/**
 * Parse USWDS theme and state color tokens
 * 
 * These tokens are hardcoded based on USWDS documentation because they are not
 * available in JSON format in the USWDS package.
 * 
 * Sources:
 *   - Theme: https://designsystem.digital.gov/design-tokens/color/theme-tokens/
 *   - State: https://designsystem.digital.gov/design-tokens/color/state-tokens/
 */

import type { ColorTokenValue } from '../../types.js';

/**
 * Parse USWDS theme color tokens
 * 
 * These are references to system colors and represent semantic meaning.
 * Source: https://designsystem.digital.gov/design-tokens/color/theme-tokens/
 */
export function parseUSWDSThemeColors(): Record<string, ColorTokenValue> {
  return {
    // Base (neutrals)
    'base-lightest': { value: 'gray-5', reference: true },
    'base-lighter': { value: 'gray-cool-10', reference: true },
    'base-light': { value: 'gray-cool-30', reference: true },
    'base': { value: 'gray-cool-50', reference: true },
    'base-dark': { value: 'gray-cool-60', reference: true },
    'base-darker': { value: 'gray-cool-70', reference: true },
    'base-darkest': { value: 'gray-90', reference: true },
    'ink': { value: 'gray-90', reference: true },
    
    // Primary colors
    'primary-lighter': { value: 'blue-10', reference: true },
    'primary-light': { value: 'blue-30', reference: true },
    'primary': { value: 'blue-60v', reference: true },
    'primary-vivid': { value: 'blue-warm-60v', reference: true },
    'primary-dark': { value: 'blue-warm-70v', reference: true },
    'primary-darker': { value: 'blue-warm-80v', reference: true },
    
    // Secondary colors
    'secondary-lighter': { value: 'red-cool-10', reference: true },
    'secondary-light': { value: 'red-30', reference: true },
    'secondary': { value: 'red-50', reference: true },
    'secondary-vivid': { value: 'red-cool-50v', reference: true },
    'secondary-dark': { value: 'red-60v', reference: true },
    'secondary-darker': { value: 'red-70v', reference: true },
    
    // Accent cool
    'accent-cool-lighter': { value: 'blue-cool-5v', reference: true },
    'accent-cool-light': { value: 'blue-cool-20v', reference: true },
    'accent-cool': { value: 'cyan-30v', reference: true },
    'accent-cool-dark': { value: 'blue-cool-40v', reference: true },
    'accent-cool-darker': { value: 'blue-cool-60v', reference: true },
    
    // Accent warm
    'accent-warm-lighter': { value: 'orange-10', reference: true },
    'accent-warm-light': { value: 'orange-20v', reference: true },
    'accent-warm': { value: 'orange-30v', reference: true },
    'accent-warm-dark': { value: 'orange-50v', reference: true },
    'accent-warm-darker': { value: 'orange-60', reference: true },
    
    // Special
    'white': { value: '#ffffff', reference: false }
  };
}

/**
 * Parse USWDS state color tokens
 * 
 * These represent UI state feedback (errors, warnings, success, etc.)
 * Source: https://designsystem.digital.gov/design-tokens/color/state-tokens/
 */
export function parseUSWDSStateColors(): Record<string, ColorTokenValue> {
  return {
    // Info states
    'info-lighter': { value: 'cyan-5', reference: true },
    'info-light': { value: 'cyan-20', reference: true },
    'info': { value: 'cyan-30v', reference: true },
    'info-dark': { value: 'cyan-40v', reference: true },
    'info-darker': { value: 'blue-cool-60', reference: true },
    
    // Error states
    'error-lighter': { value: 'red-warm-10', reference: true },
    'error-light': { value: 'red-warm-30v', reference: true },
    'error': { value: 'red-warm-50v', reference: true },
    'error-dark': { value: 'red-60v', reference: true },
    'error-darker': { value: 'red-70', reference: true },
    
    // Warning states
    'warning-lighter': { value: 'yellow-5', reference: true },
    'warning-light': { value: 'yellow-10v', reference: true },
    'warning': { value: 'gold-20v', reference: true },
    'warning-dark': { value: 'gold-30v', reference: true },
    'warning-darker': { value: 'gold-50v', reference: true },
    
    // Success states
    'success-lighter': { value: 'green-cool-5', reference: true },
    'success-light': { value: 'green-cool-20v', reference: true },
    'success': { value: 'green-cool-40v', reference: true },
    'success-dark': { value: 'green-cool-50v', reference: true },
    'success-darker': { value: 'green-cool-60v', reference: true },
    
    // Disabled states
    'disabled-lighter': { value: 'gray-20', reference: true },
    'disabled-light': { value: 'gray-40', reference: true },
    'disabled': { value: 'gray-50', reference: true },
    'disabled-dark': { value: 'gray-70', reference: true },
    'disabled-darker': { value: 'gray-90', reference: true },
    
    // Emergency states
    'emergency': { value: 'red-warm-60v', reference: true },
    'emergency-dark': { value: 'red-warm-80', reference: true }
  };
}
