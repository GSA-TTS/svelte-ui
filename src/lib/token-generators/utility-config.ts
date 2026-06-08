/**
 * Utility Class Generator Configuration
 *
 * Defines breakpoints, state variants, and which categories get which variants.
 *
 * @module utility-config
 */

/**
 * USWDS Breakpoint Configuration
 * 
 * Mobile-first breakpoints using em units for better accessibility
 */
export const BREAKPOINTS = {
  mobile: '30em',      // 480px
  'mobile-lg': '40em', // 640px
  tablet: '48em',      // 768px
  desktop: '64em',     // 1024px
  widescreen: '75em'   // 1200px
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * State Variant Configuration
 * 
 * Maps state names to CSS pseudo-classes
 */
export const STATE_VARIANTS = {
  hover: ':hover',
  focus: ':focus',
  active: ':active',
  disabled: ':disabled',
  visited: ':visited'
} as const;

export type StateVariant = keyof typeof STATE_VARIANTS;

/**
 * Utility Categories
 */
export type UtilityCategory = 
  | 'color'
  | 'spacing'
  | 'typography'
  | 'display'
  | 'flexbox'
  | 'sizing'
  | 'layout'
  | 'border'
  | 'effect'
  | 'z-index';

/**
 * Configuration for which categories get responsive/state variants
 * 
 * This controls the default behavior. Individual utilities can override
 * by setting responsive: false or states: [] in their mapping.
 */
export const VARIANT_CONFIG = {
  /**
   * Which categories get responsive variants at all breakpoints
   */
  responsive: {
    color: false,      // Colors don't need responsive variants
    spacing: true,     // Margin, padding, gap - commonly need different values per breakpoint
    typography: true,  // Font sizes, alignment - commonly responsive
    display: true,     // Show/hide, flex/block - very commonly responsive
    flexbox: true,     // Flex direction, justify, align - responsive layouts
    sizing: true,      // Width, height - commonly need different sizes per breakpoint
    layout: false,     // Position, float, overflow - rarely breakpoint-specific
    border: false,     // Border styles rarely change per breakpoint
    effect: false,     // Shadows, opacity, cursor - usually consistent
    'z-index': false   // Stacking context doesn't change per breakpoint
  },
  
  /**
   * Which state variants each category gets
   */
  states: {
    color: ['hover', 'focus', 'visited'] as StateVariant[],     // Interactive colors
    border: ['hover', 'focus'] as StateVariant[],               // Border color feedback
    effect: ['hover', 'active', 'disabled'] as StateVariant[],  // Shadow/opacity effects
    spacing: [] as StateVariant[],                              // Spacing doesn't use states
    typography: [] as StateVariant[],                           // Typography doesn't use states
    display: [] as StateVariant[],                              // Display doesn't use states
    flexbox: [] as StateVariant[],                              // Flexbox doesn't use states
    sizing: [] as StateVariant[],                               // Sizing doesn't use states
    layout: [] as StateVariant[],                               // Layout doesn't use states
    'z-index': [] as StateVariant[]                             // Z-index doesn't use states
  }
} as const;

/**
 * Get responsive setting for a category
 */
export function isResponsive(category: UtilityCategory): boolean {
  return VARIANT_CONFIG.responsive[category];
}

/**
 * Get state variants for a category
 */
export function getStateVariants(category: UtilityCategory): readonly StateVariant[] {
  return VARIANT_CONFIG.states[category];
}

/**
 * Get all breakpoint names
 */
export function getBreakpoints(): Breakpoint[] {
  return Object.keys(BREAKPOINTS) as Breakpoint[];
}

/**
 * Get all state variant names
 */
export function getStates(): StateVariant[] {
  return Object.keys(STATE_VARIANTS) as StateVariant[];
}
