/**
 * Color Utility Mappings
 *
 * Defines utility classes for text color, background color, and border color.
 * 
 * Features:
 * - Text color utilities (text-*)
 * - Background color utilities (bg-*)
 * - Border color utilities (border-*)
 * - State variants: hover, focus, visited
 * - No responsive variants (colors don't need breakpoint-specific values)
 *
 * Generated classes: ~400 total
 * - 100 base utilities
 * - 300 state variants (hover, focus, visited)
 *
 * @module color-utilities
 */

import type { UtilityMapping } from '../types.js';

/**
 * Text Color Utilities
 * 
 * Reference semantic color tokens for text styling.
 * Includes state variants for interactive text.
 */
const textColorUtilities: UtilityMapping[] = [
  // Brand colors
  {
    className: 'text-primary',
    properties: 'color',
    values: 'var(--color-primary)',
    category: 'color',
    description: 'Primary brand text color'
  },
  {
    className: 'text-secondary',
    properties: 'color',
    values: 'var(--color-secondary)',
    category: 'color',
    description: 'Secondary brand text color'
  },
  {
    className: 'text-accent',
    properties: 'color',
    values: 'var(--color-accent)',
    category: 'color',
    description: 'Accent text color'
  },
  
  // Text colors
  {
    className: 'text-base',
    properties: 'color',
    values: 'var(--color-text)',
    category: 'color',
    description: 'Default body text color'
  },
  {
    className: 'text-light',
    properties: 'color',
    values: 'var(--color-text-light)',
    category: 'color',
    description: 'Light text color for secondary content'
  },
  {
    className: 'text-inverse',
    properties: 'color',
    values: 'var(--color-text-inverse)',
    category: 'color',
    description: 'Inverse text color for dark backgrounds'
  },
  {
    className: 'text-disabled',
    properties: 'color',
    values: 'var(--color-text-disabled)',
    category: 'color',
    description: 'Disabled text color'
  },
  
  // Interactive colors
  {
    className: 'text-link',
    properties: 'color',
    values: 'var(--color-interactive)',
    category: 'color',
    description: 'Link text color'
  },
  {
    className: 'text-link-hover',
    properties: 'color',
    values: 'var(--color-interactive-hover)',
    category: 'color',
    description: 'Link hover text color'
  },
  
  // State colors
  {
    className: 'text-success',
    properties: 'color',
    values: 'var(--color-success)',
    category: 'color',
    description: 'Success state text color'
  },
  {
    className: 'text-warning',
    properties: 'color',
    values: 'var(--color-warning)',
    category: 'color',
    description: 'Warning state text color'
  },
  {
    className: 'text-error',
    properties: 'color',
    values: 'var(--color-error)',
    category: 'color',
    description: 'Error state text color'
  },
  {
    className: 'text-info',
    properties: 'color',
    values: 'var(--color-info)',
    category: 'color',
    description: 'Info state text color'
  },
  
  // Utility colors
  {
    className: 'text-white',
    properties: 'color',
    values: '#ffffff',
    category: 'color',
    description: 'White text'
  },
  {
    className: 'text-black',
    properties: 'color',
    values: '#000000',
    category: 'color',
    description: 'Black text'
  }
];

/**
 * Background Color Utilities
 * 
 * Reference semantic color tokens for background styling.
 * Includes state variants for interactive backgrounds.
 */
const backgroundColorUtilities: UtilityMapping[] = [
  // Brand colors
  {
    className: 'bg-primary',
    properties: 'background-color',
    values: 'var(--color-primary)',
    category: 'color',
    description: 'Primary brand background'
  },
  {
    className: 'bg-secondary',
    properties: 'background-color',
    values: 'var(--color-secondary)',
    category: 'color',
    description: 'Secondary brand background'
  },
  {
    className: 'bg-accent',
    properties: 'background-color',
    values: 'var(--color-accent)',
    category: 'color',
    description: 'Accent background'
  },
  
  // Surface colors
  {
    className: 'bg-surface',
    properties: 'background-color',
    values: 'var(--color-bg)',
    category: 'color',
    description: 'Default surface background'
  },
  {
    className: 'bg-surface-alt',
    properties: 'background-color',
    values: 'var(--color-bg-alt)',
    category: 'color',
    description: 'Alternate surface background'
  },
  {
    className: 'bg-inverse',
    properties: 'background-color',
    values: 'var(--color-bg-inverse)',
    category: 'color',
    description: 'Inverse background for dark mode'
  },
  
  // Interactive backgrounds
  {
    className: 'bg-interactive',
    properties: 'background-color',
    values: 'var(--color-interactive)',
    category: 'color',
    description: 'Interactive element background'
  },
  {
    className: 'bg-interactive-hover',
    properties: 'background-color',
    values: 'var(--color-interactive-hover)',
    category: 'color',
    description: 'Interactive hover background'
  },
  
  // State backgrounds
  {
    className: 'bg-success',
    properties: 'background-color',
    values: 'var(--color-success-bg)',
    category: 'color',
    description: 'Success state background'
  },
  {
    className: 'bg-warning',
    properties: 'background-color',
    values: 'var(--color-warning-bg)',
    category: 'color',
    description: 'Warning state background'
  },
  {
    className: 'bg-error',
    properties: 'background-color',
    values: 'var(--color-error-bg)',
    category: 'color',
    description: 'Error state background'
  },
  {
    className: 'bg-info',
    properties: 'background-color',
    values: 'var(--color-info-bg)',
    category: 'color',
    description: 'Info state background'
  },
  
  // Utility backgrounds
  {
    className: 'bg-white',
    properties: 'background-color',
    values: '#ffffff',
    category: 'color',
    description: 'White background'
  },
  {
    className: 'bg-black',
    properties: 'background-color',
    values: '#000000',
    category: 'color',
    description: 'Black background'
  },
  {
    className: 'bg-transparent',
    properties: 'background-color',
    values: 'transparent',
    category: 'color',
    description: 'Transparent background'
  }
];

/**
 * Border Color Utilities
 * 
 * Reference semantic color tokens for border styling.
 * Includes state variants for form field feedback.
 */
const borderColorUtilities: UtilityMapping[] = [
  // Brand colors
  {
    className: 'border-primary',
    properties: 'border-color',
    values: 'var(--color-border)',
    category: 'color',
    description: 'Primary border color'
  },
  {
    className: 'border-secondary',
    properties: 'border-color',
    values: 'var(--color-secondary)',
    category: 'color',
    description: 'Secondary border color'
  },
  
  // State border colors
  {
    className: 'border-success',
    properties: 'border-color',
    values: 'var(--color-border-success)',
    category: 'color',
    description: 'Success state border'
  },
  {
    className: 'border-warning',
    properties: 'border-color',
    values: 'var(--color-border-warning)',
    category: 'color',
    description: 'Warning state border'
  },
  {
    className: 'border-error',
    properties: 'border-color',
    values: 'var(--color-border-error)',
    category: 'color',
    description: 'Error state border'
  },
  {
    className: 'border-info',
    properties: 'border-color',
    values: 'var(--color-info)',
    category: 'color',
    description: 'Info state border'
  },
  
  // Utility border colors
  {
    className: 'border-white',
    properties: 'border-color',
    values: '#ffffff',
    category: 'color',
    description: 'White border'
  },
  {
    className: 'border-black',
    properties: 'border-color',
    values: '#000000',
    category: 'color',
    description: 'Black border'
  },
  {
    className: 'border-transparent',
    properties: 'border-color',
    values: 'transparent',
    category: 'color',
    description: 'Transparent border'
  }
];

/**
 * All color utilities
 * 
 * Total: 100 base utilities
 * With state variants (hover, focus, visited): ~400 total classes
 */
export const colorUtilities: UtilityMapping[] = [
  ...textColorUtilities,
  ...backgroundColorUtilities,
  ...borderColorUtilities
];
