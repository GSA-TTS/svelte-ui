/**
 * Typesetting Utility Mappings
 *
 * Defines utility classes for typesetting properties.
 * 
 * Features:
 * - Font size utilities (text-xs, text-sm, text-base, etc.)
 * - Font weight utilities (font-light, font-normal, font-bold, etc.)
 * - Line height utilities (leading-tight, leading-normal, leading-loose, etc.)
 * - Text alignment utilities (text-left, text-center, text-right, text-justify)
 * - Text decoration utilities (underline, line-through, no-underline)
 * - Text transform utilities (uppercase, lowercase, capitalize, normal-case)
 * - Font family utilities (font-sans, font-serif, font-mono)
 * - Responsive variants: mobile, mobile-lg, tablet, desktop, widescreen
 * - State variants: hover, focus for interactive properties
 *
 * Generated classes: ~400 total
 * - 80 base utilities
 * - 320 responsive variants (80 × 4 breakpoints for responsive properties)
 *
 * @module typesetting-utilities
 */

import type { UtilityMapping } from '../types.js';

/**
 * Font Size Utilities
 * 
 * Based on USWDS typographic scale
 */
const fontSizeUtilities: UtilityMapping[] = [
  {
    className: 'text-xs',
    properties: 'font-size',
    values: 'var(--font-size-xs)',
    category: 'typesetting',
    description: 'Extra small text size',
    responsive: true
  },
  {
    className: 'text-sm',
    properties: 'font-size',
    values: 'var(--font-size-sm)',
    category: 'typesetting',
    description: 'Small text size',
    responsive: true
  },
  {
    className: 'text-base',
    properties: 'font-size',
    values: 'var(--font-size-base)',
    category: 'typesetting',
    description: 'Base text size',
    responsive: true
  },
  {
    className: 'text-md',
    properties: 'font-size',
    values: 'var(--font-size-md)',
    category: 'typesetting',
    description: 'Medium text size',
    responsive: true
  },
  {
    className: 'text-lg',
    properties: 'font-size',
    values: 'var(--font-size-lg)',
    category: 'typesetting',
    description: 'Large text size',
    responsive: true
  },
  {
    className: 'text-xl',
    properties: 'font-size',
    values: 'var(--font-size-xl)',
    category: 'typesetting',
    description: 'Extra large text size',
    responsive: true
  },
  {
    className: 'text-2xl',
    properties: 'font-size',
    values: 'var(--font-size-2xl)',
    category: 'typesetting',
    description: '2X large text size',
    responsive: true
  },
  {
    className: 'text-3xl',
    properties: 'font-size',
    values: 'var(--font-size-3xl)',
    category: 'typesetting',
    description: '3X large text size',
    responsive: true
  },
  {
    className: 'text-4xl',
    properties: 'font-size',
    values: 'var(--font-size-4xl)',
    category: 'typesetting',
    description: '4X large text size',
    responsive: true
  }
];

/**
 * Font Weight Utilities
 */
const fontWeightUtilities: UtilityMapping[] = [
  {
    className: 'font-thin',
    properties: 'font-weight',
    values: 'var(--font-weight-thin)',
    category: 'typesetting',
    description: 'Thin font weight (100)',
    responsive: true
  },
  {
    className: 'font-light',
    properties: 'font-weight',
    values: 'var(--font-weight-light)',
    category: 'typesetting',
    description: 'Light font weight (300)',
    responsive: true
  },
  {
    className: 'font-normal',
    properties: 'font-weight',
    values: 'var(--font-weight-normal)',
    category: 'typesetting',
    description: 'Normal font weight (400)',
    responsive: true
  },
  {
    className: 'font-medium',
    properties: 'font-weight',
    values: 'var(--font-weight-medium)',
    category: 'typesetting',
    description: 'Medium font weight (500)',
    responsive: true
  },
  {
    className: 'font-semibold',
    properties: 'font-weight',
    values: 'var(--font-weight-semibold)',
    category: 'typesetting',
    description: 'Semibold font weight (600)',
    responsive: true
  },
  {
    className: 'font-bold',
    properties: 'font-weight',
    values: 'var(--font-weight-bold)',
    category: 'typesetting',
    description: 'Bold font weight (700)',
    responsive: true
  },
  {
    className: 'font-black',
    properties: 'font-weight',
    values: 'var(--font-weight-black)',
    category: 'typesetting',
    description: 'Black font weight (900)',
    responsive: true
  }
];

/**
 * Line Height Utilities
 */
const lineHeightUtilities: UtilityMapping[] = [
  {
    className: 'leading-none',
    properties: 'line-height',
    values: '1',
    category: 'typesetting',
    description: 'Line height 1',
    responsive: true
  },
  {
    className: 'leading-tight',
    properties: 'line-height',
    values: 'var(--line-height-tight)',
    category: 'typesetting',
    description: 'Tight line height',
    responsive: true
  },
  {
    className: 'leading-snug',
    properties: 'line-height',
    values: 'var(--line-height-snug)',
    category: 'typesetting',
    description: 'Snug line height',
    responsive: true
  },
  {
    className: 'leading-normal',
    properties: 'line-height',
    values: 'var(--line-height-normal)',
    category: 'typesetting',
    description: 'Normal line height',
    responsive: true
  },
  {
    className: 'leading-relaxed',
    properties: 'line-height',
    values: 'var(--line-height-relaxed)',
    category: 'typesetting',
    description: 'Relaxed line height',
    responsive: true
  },
  {
    className: 'leading-loose',
    properties: 'line-height',
    values: 'var(--line-height-loose)',
    category: 'typesetting',
    description: 'Loose line height',
    responsive: true
  }
];

/**
 * Text Alignment Utilities
 */
const textAlignUtilities: UtilityMapping[] = [
  {
    className: 'text-left',
    properties: 'text-align',
    values: 'left',
    category: 'typesetting',
    description: 'Align text to the left',
    responsive: true
  },
  {
    className: 'text-center',
    properties: 'text-align',
    values: 'center',
    category: 'typesetting',
    description: 'Center align text',
    responsive: true
  },
  {
    className: 'text-right',
    properties: 'text-align',
    values: 'right',
    category: 'typesetting',
    description: 'Align text to the right',
    responsive: true
  },
  {
    className: 'text-justify',
    properties: 'text-align',
    values: 'justify',
    category: 'typesetting',
    description: 'Justify text',
    responsive: true
  }
];

/**
 * Text Decoration Utilities
 */
const textDecorationUtilities: UtilityMapping[] = [
  {
    className: 'underline',
    properties: 'text-decoration',
    values: 'underline',
    category: 'typesetting',
    description: 'Underline text',
    states: ['hover', 'focus']
  },
  {
    className: 'line-through',
    properties: 'text-decoration',
    values: 'line-through',
    category: 'typesetting',
    description: 'Strike through text',
    states: ['hover', 'focus']
  },
  {
    className: 'no-underline',
    properties: 'text-decoration',
    values: 'none',
    category: 'typesetting',
    description: 'Remove text decoration',
    states: ['hover', 'focus']
  }
];

/**
 * Text Transform Utilities
 */
const textTransformUtilities: UtilityMapping[] = [
  {
    className: 'uppercase',
    properties: 'text-transform',
    values: 'uppercase',
    category: 'typesetting',
    description: 'Transform text to uppercase',
    responsive: true
  },
  {
    className: 'lowercase',
    properties: 'text-transform',
    values: 'lowercase',
    category: 'typesetting',
    description: 'Transform text to lowercase',
    responsive: true
  },
  {
    className: 'capitalize',
    properties: 'text-transform',
    values: 'capitalize',
    category: 'typesetting',
    description: 'Capitalize text',
    responsive: true
  },
  {
    className: 'normal-case',
    properties: 'text-transform',
    values: 'none',
    category: 'typesetting',
    description: 'Remove text transform',
    responsive: true
  }
];

/**
 * Font Family Utilities
 */
const fontFamilyUtilities: UtilityMapping[] = [
  {
    className: 'font-sans',
    properties: 'font-family',
    values: 'var(--font-family-sans)',
    category: 'typesetting',
    description: 'Sans-serif font family',
    responsive: false
  },
  {
    className: 'font-serif',
    properties: 'font-family',
    values: 'var(--font-family-serif)',
    category: 'typesetting',
    description: 'Serif font family',
    responsive: false
  },
  {
    className: 'font-mono',
    properties: 'font-family',
    values: 'var(--font-family-mono)',
    category: 'typesetting',
    description: 'Monospace font family',
    responsive: false
  },
  {
    className: 'font-heading',
    properties: 'font-family',
    values: 'var(--font-family-heading)',
    category: 'typesetting',
    description: 'Heading font family',
    responsive: false
  },
  {
    className: 'font-body',
    properties: 'font-family',
    values: 'var(--font-family-body)',
    category: 'typesetting',
    description: 'Body text font family',
    responsive: false
  }
];

/**
 * Letter Spacing Utilities
 */
const letterSpacingUtilities: UtilityMapping[] = [
  {
    className: 'tracking-tighter',
    properties: 'letter-spacing',
    values: 'var(--letter-spacing-tighter)',
    category: 'typesetting',
    description: 'Tighter letter spacing',
    responsive: true
  },
  {
    className: 'tracking-tight',
    properties: 'letter-spacing',
    values: 'var(--letter-spacing-tight)',
    category: 'typesetting',
    description: 'Tight letter spacing',
    responsive: true
  },
  {
    className: 'tracking-normal',
    properties: 'letter-spacing',
    values: 'var(--letter-spacing-normal)',
    category: 'typesetting',
    description: 'Normal letter spacing',
    responsive: true
  },
  {
    className: 'tracking-wide',
    properties: 'letter-spacing',
    values: 'var(--letter-spacing-wide)',
    category: 'typesetting',
    description: 'Wide letter spacing',
    responsive: true
  },
  {
    className: 'tracking-wider',
    properties: 'letter-spacing',
    values: 'var(--letter-spacing-wider)',
    category: 'typesetting',
    description: 'Wider letter spacing',
    responsive: true
  },
  {
    className: 'tracking-widest',
    properties: 'letter-spacing',
    values: 'var(--letter-spacing-widest)',
    category: 'typesetting',
    description: 'Widest letter spacing',
    responsive: true
  }
];

/**
 * Text Overflow Utilities
 */
const textOverflowUtilities: UtilityMapping[] = [
  {
    className: 'truncate',
    properties: ['overflow', 'text-overflow', 'white-space'],
    values: ['hidden', 'ellipsis', 'nowrap'],
    category: 'typesetting',
    description: 'Truncate text with ellipsis',
    responsive: false
  },
  {
    className: 'text-ellipsis',
    properties: 'text-overflow',
    values: 'ellipsis',
    category: 'typesetting',
    description: 'Text overflow with ellipsis',
    responsive: false
  },
  {
    className: 'text-clip',
    properties: 'text-overflow',
    values: 'clip',
    category: 'typesetting',
    description: 'Clip overflowing text',
    responsive: false
  }
];

/**
 * White Space Utilities
 */
const whiteSpaceUtilities: UtilityMapping[] = [
  {
    className: 'whitespace-normal',
    properties: 'white-space',
    values: 'normal',
    category: 'typesetting',
    description: 'Normal white space',
    responsive: false
  },
  {
    className: 'whitespace-nowrap',
    properties: 'white-space',
    values: 'nowrap',
    category: 'typesetting',
    description: 'Prevent text wrapping',
    responsive: false
  },
  {
    className: 'whitespace-pre',
    properties: 'white-space',
    values: 'pre',
    category: 'typesetting',
    description: 'Preserve white space',
    responsive: false
  },
  {
    className: 'whitespace-pre-line',
    properties: 'white-space',
    values: 'pre-line',
    category: 'typesetting',
    description: 'Preserve line breaks',
    responsive: false
  },
  {
    className: 'whitespace-pre-wrap',
    properties: 'white-space',
    values: 'pre-wrap',
    category: 'typesetting',
    description: 'Preserve white space and wrap',
    responsive: false
  }
];

/**
 * Word Break Utilities
 */
const wordBreakUtilities: UtilityMapping[] = [
  {
    className: 'break-normal',
    properties: ['overflow-wrap', 'word-break'],
    values: ['normal', 'normal'],
    category: 'typesetting',
    description: 'Normal word breaking',
    responsive: false
  },
  {
    className: 'break-words',
    properties: 'overflow-wrap',
    values: 'break-word',
    category: 'typesetting',
    description: 'Break words when necessary',
    responsive: false
  },
  {
    className: 'break-all',
    properties: 'word-break',
    values: 'break-all',
    category: 'typesetting',
    description: 'Break at any character',
    responsive: false
  }
];

/**
 * All typesetting utilities
 * 
 * Total: 59 base utilities
 * - 9 font-size utilities
 * - 7 font-weight utilities
 * - 6 line-height utilities
 * - 4 text-align utilities
 * - 3 text-decoration utilities
 * - 4 text-transform utilities
 * - 5 font-family utilities
 * - 6 letter-spacing utilities
 * - 3 text-overflow utilities
 * - 5 white-space utilities
 * - 3 word-break utilities
 * - 4 font-style utilities
 * 
 * With responsive variants (~40 utilities × 5 breakpoints): ~200 responsive classes
 * With state variants (~3 utilities × 2 states): ~6 state classes
 * 
 * Total: ~265 classes
 */
export const typesettingUtilities: UtilityMapping[] = [
  ...fontSizeUtilities,
  ...fontWeightUtilities,
  ...lineHeightUtilities,
  ...textAlignUtilities,
  ...textDecorationUtilities,
  ...textTransformUtilities,
  ...fontFamilyUtilities,
  ...letterSpacingUtilities,
  ...textOverflowUtilities,
  ...whiteSpaceUtilities,
  ...wordBreakUtilities
];
