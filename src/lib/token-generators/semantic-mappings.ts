/**
 * Semantic token mappings for design system abstraction
 * 
 * This file defines the universal semantic layer that maps to foundation tokens.
 * Components use semantic tokens for design system independence.
 * 
 * Architecture:
 *   Foundation Layer (USWDS) → Semantic Layer (Universal) → Components
 * 
 * Example:
 *   --primary (USWDS) → --color-primary (Semantic) → background-color in Button
 * 
 * Categories match USWDS design token structure:
 *   - color
 *   - spacing
 *   - typesetting
 *   - shadow
 *   - opacity
 *   - z-index
 *   - flex
 *   - order
 */

export interface SemanticTokenMapping {
  semantic: string;      // Universal semantic token name
  foundation: string;    // Foundation token it maps to
  category: 'color' | 'spacing' | 'typesetting' | 'shadow' | 'opacity' | 'z-index' | 'flex' | 'order';
  description: string;   // What this token is used for
}

/**
 * USWDS to Semantic token mappings (MVP)
 * 
 * These mappings define how USWDS foundation tokens map to universal semantic tokens.
 * When adding a new design system (e.g., Material), create a similar mapping file.
 */
export const uswdsSemanticMappings: SemanticTokenMapping[] = [
  // ===================================
  // COLOR (25 tokens)
  // ===================================
  
  // Brand Colors (3 tokens)
  {
    semantic: 'color-primary',
    foundation: 'primary',
    category: 'color',
    description: 'Primary brand color for buttons, links, and key UI elements'
  },
  {
    semantic: 'color-secondary',
    foundation: 'secondary',
    category: 'color',
    description: 'Secondary brand color for alternate actions and emphasis'
  },
  {
    semantic: 'color-accent',
    foundation: 'accent-warm',
    category: 'color',
    description: 'Accent color for highlights and special elements'
  },
  
  // Text Colors (4 tokens)
  {
    semantic: 'color-text',
    foundation: 'base-darkest',
    category: 'color',
    description: 'Default text color for body content'
  },
  {
    semantic: 'color-text-light',
    foundation: 'base-dark',
    category: 'color',
    description: 'Lighter text color for secondary content'
  },
  {
    semantic: 'color-text-inverse',
    foundation: 'white',
    category: 'color',
    description: 'Text color for dark backgrounds'
  },
  {
    semantic: 'color-text-disabled',
    foundation: 'disabled',
    category: 'color',
    description: 'Text color for disabled elements'
  },
  
  // Background Colors (4 tokens)
  {
    semantic: 'color-bg',
    foundation: 'white',
    category: 'color',
    description: 'Default background color'
  },
  {
    semantic: 'color-bg-alt',
    foundation: 'base-lightest',
    category: 'color',
    description: 'Alternate background color for sections'
  },
  {
    semantic: 'color-bg-inverse',
    foundation: 'base-darkest',
    category: 'color',
    description: 'Dark background color'
  },
  {
    semantic: 'color-bg-disabled',
    foundation: 'disabled-light',
    category: 'color',
    description: 'Background color for disabled elements'
  },
  
  // Border Colors (2 tokens)
  {
    semantic: 'color-border',
    foundation: 'base-light',
    category: 'color',
    description: 'Default border color'
  },
  {
    semantic: 'color-border-dark',
    foundation: 'base',
    category: 'color',
    description: 'Darker border color for emphasis'
  },
  
  // Interactive Colors (4 tokens)
  {
    semantic: 'color-interactive',
    foundation: 'primary',
    category: 'color',
    description: 'Interactive element color (links, buttons)'
  },
  {
    semantic: 'color-interactive-hover',
    foundation: 'primary-dark',
    category: 'color',
    description: 'Interactive element hover state'
  },
  {
    semantic: 'color-interactive-active',
    foundation: 'primary-darker',
    category: 'color',
    description: 'Interactive element active/pressed state'
  },
  {
    semantic: 'color-interactive-disabled',
    foundation: 'disabled',
    category: 'color',
    description: 'Interactive element disabled state'
  },
  
  // Feedback Colors (8 tokens)
  {
    semantic: 'color-error',
    foundation: 'error',
    category: 'color',
    description: 'Error state color'
  },
  {
    semantic: 'color-error-bg',
    foundation: 'error-lighter',
    category: 'color',
    description: 'Error state background'
  },
  {
    semantic: 'color-success',
    foundation: 'success',
    category: 'color',
    description: 'Success state color'
  },
  {
    semantic: 'color-success-bg',
    foundation: 'success-lighter',
    category: 'color',
    description: 'Success state background'
  },
  {
    semantic: 'color-warning',
    foundation: 'warning',
    category: 'color',
    description: 'Warning state color'
  },
  {
    semantic: 'color-warning-bg',
    foundation: 'warning-lighter',
    category: 'color',
    description: 'Warning state background'
  },
  {
    semantic: 'color-info',
    foundation: 'info',
    category: 'color',
    description: 'Info state color'
  },
  {
    semantic: 'color-info-bg',
    foundation: 'info-lighter',
    category: 'color',
    description: 'Info state background'
  },
  
  // Focus Color (1 token)
  {
    semantic: 'color-focus',
    foundation: 'primary',
    category: 'color',
    description: 'Focus outline color'
  },
  
  // ===================================
  // SPACING (12 tokens)
  // ===================================
  
  // Scale (7 tokens)
  {
    semantic: 'space-xs',
    foundation: '1',
    category: 'spacing',
    description: 'Extra small spacing (8px)'
  },
  {
    semantic: 'space-sm',
    foundation: '2',
    category: 'spacing',
    description: 'Small spacing (16px)'
  },
  {
    semantic: 'space-md',
    foundation: '3',
    category: 'spacing',
    description: 'Medium spacing (24px)'
  },
  {
    semantic: 'space-lg',
    foundation: '4',
    category: 'spacing',
    description: 'Large spacing (32px)'
  },
  {
    semantic: 'space-xl',
    foundation: '5',
    category: 'spacing',
    description: 'Extra large spacing (40px)'
  },
  {
    semantic: 'space-2xl',
    foundation: '6',
    category: 'spacing',
    description: 'Extra extra large spacing (48px)'
  },
  {
    semantic: 'space-3xl',
    foundation: '8',
    category: 'spacing',
    description: 'Extra extra extra large spacing (64px)'
  },
  
  // Component Spacing (5 tokens)
  {
    semantic: 'space-padding-sm',
    foundation: '105',
    category: 'spacing',
    description: 'Small padding for components'
  },
  {
    semantic: 'space-padding-md',
    foundation: '2',
    category: 'spacing',
    description: 'Medium padding for components'
  },
  {
    semantic: 'space-padding-lg',
    foundation: '205',
    category: 'spacing',
    description: 'Large padding for components'
  },
  {
    semantic: 'space-gap-sm',
    foundation: '1',
    category: 'spacing',
    description: 'Small gap between elements'
  },
  {
    semantic: 'space-gap-md',
    foundation: '2',
    category: 'spacing',
    description: 'Medium gap between elements'
  },
  
  // ===================================
  // TYPESETTING (15 tokens)
  // ===================================
  
  // Font Families (3 tokens)
  {
    semantic: 'font-body',
    foundation: 'body',
    category: 'typesetting',
    description: 'Font family for body text'
  },
  {
    semantic: 'font-heading',
    foundation: 'heading',
    category: 'typesetting',
    description: 'Font family for headings'
  },
  {
    semantic: 'font-mono',
    foundation: 'mono',
    category: 'typesetting',
    description: 'Monospace font family for code'
  },
  
  // Font Sizes (6 tokens)
  {
    semantic: 'text-xs',
    foundation: 'xs',
    category: 'typesetting',
    description: 'Extra small text (12px)'
  },
  {
    semantic: 'text-sm',
    foundation: 'sm',
    category: 'typesetting',
    description: 'Small text (14px)'
  },
  {
    semantic: 'text-base',
    foundation: 'md',
    category: 'typesetting',
    description: 'Base text size (16px)'
  },
  {
    semantic: 'text-lg',
    foundation: 'lg',
    category: 'typesetting',
    description: 'Large text (18px)'
  },
  {
    semantic: 'text-xl',
    foundation: 'xl',
    category: 'typesetting',
    description: 'Extra large text (20px)'
  },
  {
    semantic: 'text-2xl',
    foundation: '2xl',
    category: 'typesetting',
    description: 'Extra extra large text (24px)'
  },
  
  // Font Weights (3 tokens)
  {
    semantic: 'weight-normal',
    foundation: 'normal',
    category: 'typesetting',
    description: 'Normal font weight (400)'
  },
  {
    semantic: 'weight-medium',
    foundation: 'medium',
    category: 'typesetting',
    description: 'Medium font weight (500)'
  },
  {
    semantic: 'weight-bold',
    foundation: 'bold',
    category: 'typesetting',
    description: 'Bold font weight (700)'
  },
  
  // Line Heights (3 tokens)
  {
    semantic: 'leading-tight',
    foundation: '2',
    category: 'typesetting',
    description: 'Tight line height (1.2)'
  },
  {
    semantic: 'leading-normal',
    foundation: '3',
    category: 'typesetting',
    description: 'Normal line height (1.5)'
  },
  {
    semantic: 'leading-loose',
    foundation: '6',
    category: 'typesetting',
    description: 'Loose line height (1.8)'
  },
  
  // ===================================
  // SHADOW (3 tokens)
  // ===================================
  
  {
    semantic: 'shadow-sm',
    foundation: '1',
    category: 'shadow',
    description: 'Small shadow'
  },
  {
    semantic: 'shadow-md',
    foundation: '2',
    category: 'shadow',
    description: 'Medium shadow'
  },
  {
    semantic: 'shadow-lg',
    foundation: '3',
    category: 'shadow',
    description: 'Large shadow'
  },
  
  // ===================================
  // OPACITY (3 tokens)
  // ===================================
  
  {
    semantic: 'opacity-disabled',
    foundation: '50',
    category: 'opacity',
    description: 'Opacity for disabled elements (0.5)'
  },
  {
    semantic: 'opacity-hover',
    foundation: '80',
    category: 'opacity',
    description: 'Opacity for hover effects (0.8)'
  },
  {
    semantic: 'opacity-overlay',
    foundation: '70',
    category: 'opacity',
    description: 'Opacity for overlays (0.7)'
  },
  
  // ===================================
  // Z-INDEX (3 tokens)
  // ===================================
  
  {
    semantic: 'z-dropdown',
    foundation: '300',
    category: 'z-index',
    description: 'Z-index for dropdown menus'
  },
  {
    semantic: 'z-modal',
    foundation: '400',
    category: 'z-index',
    description: 'Z-index for modal dialogs'
  },
  {
    semantic: 'z-tooltip',
    foundation: '500',
    category: 'z-index',
    description: 'Z-index for tooltips'
  },
  
  // ===================================
  // FLEX (2 tokens)
  // ===================================
  
  {
    semantic: 'flex-auto',
    foundation: 'auto',
    category: 'flex',
    description: 'Flex auto (1 1 auto)'
  },
  {
    semantic: 'flex-fill',
    foundation: 'fill',
    category: 'flex',
    description: 'Flex fill (1 0 0)'
  },
  
  // ===================================
  // ORDER (2 tokens)
  // ===================================
  
  {
    semantic: 'order-first',
    foundation: 'first',
    category: 'order',
    description: 'Order first (-1)'
  },
  {
    semantic: 'order-last',
    foundation: 'last',
    category: 'order',
    description: 'Order last (999)'
  }
];

/**
 * Get semantic mappings by category
 */
export function getSemanticMappingsByCategory(category: SemanticTokenMapping['category']) {
  return uswdsSemanticMappings.filter(mapping => mapping.category === category);
}

/**
 * Get all semantic token names
 */
export function getSemanticTokenNames(): string[] {
  return uswdsSemanticMappings.map(mapping => mapping.semantic);
}

/**
 * Get foundation token for a semantic token
 */
export function getFoundationToken(semanticToken: string): string | undefined {
  const mapping = uswdsSemanticMappings.find(m => m.semantic === semanticToken);
  return mapping?.foundation;
}
