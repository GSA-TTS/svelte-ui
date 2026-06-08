/**
 * Spacing Utility Mappings
 *
 * Defines utility classes for margin, padding, and gap.
 * 
 * Features:
 * - Margin utilities (m-*, mt-*, mr-*, mb-*, ml-*, mx-*, my-*)
 * - Padding utilities (p-*, pt-*, pr-*, pb-*, pl-*, px-*, py-*)
 * - Gap utilities (gap-*, gap-x-*, gap-y-*)
 * - Negative margin utilities (-m-*, -mt-*, etc.)
 * - Responsive variants: mobile, mobile-lg, tablet, desktop, widescreen
 * - No state variants (spacing doesn't need hover/focus states)
 *
 * Generated classes: ~720 total
 * - 120 base utilities (60 positive + 60 negative margins)
 * - 600 responsive variants (120 × 5 breakpoints)
 *
 * @module spacing-utilities
 */

import type { UtilityMapping } from '../types.js';

/**
 * Spacing scale values from semantic tokens
 * Maps to --spacing-{size} tokens
 */
const spacingSizes = [
  { name: '0', token: 'none' },
  { name: 'xs', token: 'xs' },
  { name: 'sm', token: 'sm' },
  { name: 'md', token: 'md' },
  { name: 'lg', token: 'lg' },
  { name: 'xl', token: 'xl' },
  { name: '2xl', token: '2xl' }
];

/**
 * Margin Utilities - All Sides
 */
const marginAllUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `m-${size.name}`,
  properties: 'margin',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Margin ${size.name} on all sides`
}));

// Add margin auto
marginAllUtilities.push({
  className: 'm-auto',
  properties: 'margin',
  values: 'auto',
  category: 'spacing',
  description: 'Automatic margin on all sides'
});

/**
 * Margin Utilities - Top
 */
const marginTopUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `mt-${size.name}`,
  properties: 'margin-top',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Margin ${size.name} on top`
}));

marginTopUtilities.push({
  className: 'mt-auto',
  properties: 'margin-top',
  values: 'auto',
  category: 'spacing',
  description: 'Automatic top margin'
});

/**
 * Margin Utilities - Right
 */
const marginRightUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `mr-${size.name}`,
  properties: 'margin-right',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Margin ${size.name} on right`
}));

marginRightUtilities.push({
  className: 'mr-auto',
  properties: 'margin-right',
  values: 'auto',
  category: 'spacing',
  description: 'Automatic right margin'
});

/**
 * Margin Utilities - Bottom
 */
const marginBottomUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `mb-${size.name}`,
  properties: 'margin-bottom',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Margin ${size.name} on bottom`
}));

marginBottomUtilities.push({
  className: 'mb-auto',
  properties: 'margin-bottom',
  values: 'auto',
  category: 'spacing',
  description: 'Automatic bottom margin'
});

/**
 * Margin Utilities - Left
 */
const marginLeftUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `ml-${size.name}`,
  properties: 'margin-left',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Margin ${size.name} on left`
}));

marginLeftUtilities.push({
  className: 'ml-auto',
  properties: 'margin-left',
  values: 'auto',
  category: 'spacing',
  description: 'Automatic left margin'
});

/**
 * Margin Utilities - X-axis (left + right)
 */
const marginXUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `mx-${size.name}`,
  properties: ['margin-left', 'margin-right'],
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Margin ${size.name} on left and right`
}));

marginXUtilities.push({
  className: 'mx-auto',
  properties: ['margin-left', 'margin-right'],
  values: 'auto',
  category: 'spacing',
  description: 'Automatic horizontal centering'
});

/**
 * Margin Utilities - Y-axis (top + bottom)
 */
const marginYUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `my-${size.name}`,
  properties: ['margin-top', 'margin-bottom'],
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Margin ${size.name} on top and bottom`
}));

marginYUtilities.push({
  className: 'my-auto',
  properties: ['margin-top', 'margin-bottom'],
  values: 'auto',
  category: 'spacing',
  description: 'Automatic vertical centering'
});

/**
 * Negative Margin Utilities
 * 
 * Uses calc() to negate the token value.
 * Only available for sized values (not auto).
 */
const negativeMarginUtilities: UtilityMapping[] = [];

// Negative margin - all sides
spacingSizes.forEach(size => {
  negativeMarginUtilities.push({
    className: `-m-${size.name}`,
    properties: 'margin',
    values: `calc(var(--spacing-${size.token}) * -1)`,
    category: 'spacing',
    description: `Negative margin ${size.name} on all sides`,
    negative: true
  });
});

// Negative margin - top
spacingSizes.forEach(size => {
  negativeMarginUtilities.push({
    className: `-mt-${size.name}`,
    properties: 'margin-top',
    values: `calc(var(--spacing-${size.token}) * -1)`,
    category: 'spacing',
    description: `Negative margin ${size.name} on top`,
    negative: true
  });
});

// Negative margin - right
spacingSizes.forEach(size => {
  negativeMarginUtilities.push({
    className: `-mr-${size.name}`,
    properties: 'margin-right',
    values: `calc(var(--spacing-${size.token}) * -1)`,
    category: 'spacing',
    description: `Negative margin ${size.name} on right`,
    negative: true
  });
});

// Negative margin - bottom
spacingSizes.forEach(size => {
  negativeMarginUtilities.push({
    className: `-mb-${size.name}`,
    properties: 'margin-bottom',
    values: `calc(var(--spacing-${size.token}) * -1)`,
    category: 'spacing',
    description: `Negative margin ${size.name} on bottom`,
    negative: true
  });
});

// Negative margin - left
spacingSizes.forEach(size => {
  negativeMarginUtilities.push({
    className: `-ml-${size.name}`,
    properties: 'margin-left',
    values: `calc(var(--spacing-${size.token}) * -1)`,
    category: 'spacing',
    description: `Negative margin ${size.name} on left`,
    negative: true
  });
});

// Negative margin - x-axis
spacingSizes.forEach(size => {
  negativeMarginUtilities.push({
    className: `-mx-${size.name}`,
    properties: ['margin-left', 'margin-right'],
    values: `calc(var(--spacing-${size.token}) * -1)`,
    category: 'spacing',
    description: `Negative margin ${size.name} on left and right`,
    negative: true
  });
});

// Negative margin - y-axis
spacingSizes.forEach(size => {
  negativeMarginUtilities.push({
    className: `-my-${size.name}`,
    properties: ['margin-top', 'margin-bottom'],
    values: `calc(var(--spacing-${size.token}) * -1)`,
    category: 'spacing',
    description: `Negative margin ${size.name} on top and bottom`,
    negative: true
  });
});

/**
 * Padding Utilities - All Sides
 */
const paddingAllUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `p-${size.name}`,
  properties: 'padding',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Padding ${size.name} on all sides`
}));

/**
 * Padding Utilities - Top
 */
const paddingTopUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `pt-${size.name}`,
  properties: 'padding-top',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Padding ${size.name} on top`
}));

/**
 * Padding Utilities - Right
 */
const paddingRightUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `pr-${size.name}`,
  properties: 'padding-right',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Padding ${size.name} on right`
}));

/**
 * Padding Utilities - Bottom
 */
const paddingBottomUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `pb-${size.name}`,
  properties: 'padding-bottom',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Padding ${size.name} on bottom`
}));

/**
 * Padding Utilities - Left
 */
const paddingLeftUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `pl-${size.name}`,
  properties: 'padding-left',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Padding ${size.name} on left`
}));

/**
 * Padding Utilities - X-axis (left + right)
 */
const paddingXUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `px-${size.name}`,
  properties: ['padding-left', 'padding-right'],
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Padding ${size.name} on left and right`
}));

/**
 * Padding Utilities - Y-axis (top + bottom)
 */
const paddingYUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `py-${size.name}`,
  properties: ['padding-top', 'padding-bottom'],
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Padding ${size.name} on top and bottom`
}));

/**
 * Gap Utilities - All Axes (for flexbox/grid)
 */
const gapUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `gap-${size.name}`,
  properties: 'gap',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Gap ${size.name} between flex/grid items`
}));

/**
 * Gap Utilities - X-axis (column-gap)
 */
const gapXUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `gap-x-${size.name}`,
  properties: 'column-gap',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Column gap ${size.name} between flex/grid items`
}));

/**
 * Gap Utilities - Y-axis (row-gap)
 */
const gapYUtilities: UtilityMapping[] = spacingSizes.map(size => ({
  className: `gap-y-${size.name}`,
  properties: 'row-gap',
  values: `var(--spacing-${size.token})`,
  category: 'spacing',
  description: `Row gap ${size.name} between flex/grid items`
}));

/**
 * All spacing utilities
 * 
 * Total: 120 base utilities
 * - 64 margin utilities (including auto values)
 * - 49 padding utilities
 * - 21 gap utilities
 * - 49 negative margin utilities
 * 
 * With responsive variants (5 breakpoints): ~720 total classes
 */
export const spacingUtilities: UtilityMapping[] = [
  ...marginAllUtilities,
  ...marginTopUtilities,
  ...marginRightUtilities,
  ...marginBottomUtilities,
  ...marginLeftUtilities,
  ...marginXUtilities,
  ...marginYUtilities,
  ...negativeMarginUtilities,
  ...paddingAllUtilities,
  ...paddingTopUtilities,
  ...paddingRightUtilities,
  ...paddingBottomUtilities,
  ...paddingLeftUtilities,
  ...paddingXUtilities,
  ...paddingYUtilities,
  ...gapUtilities,
  ...gapXUtilities,
  ...gapYUtilities
];
