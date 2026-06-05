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
 */

export interface SemanticTokenMapping {
  semantic: string;      // Universal semantic token name
  foundation: string;    // Foundation token it maps to
  category: 'color' | 'spacing' | 'typography' | 'effects' | 'layout';
  description: string;   // What this token is used for
}

/**
 * USWDS to Semantic token mappings (MVP - 62 tokens)
 * 
 * These mappings define how USWDS foundation tokens map to universal semantic tokens.
 * When adding a new design system (e.g., Material), create a similar mapping file.
 */
export const uswdsSemanticMappings: SemanticTokenMapping[] = [
  // ===================================
  // COLORS (25 tokens)
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
    description: 'Interactive element color (buttons, links)'
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
    description: 'Error state background color'
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
    description: 'Success state background color'
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
    description: 'Warning state background color'
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
    description: 'Info state background color'
  },
  
  // ===================================
  // SPACING (12 tokens)
  // ===================================
  
  // Spacing Scale (7 tokens)
  {
    semantic: 'space-xs',
    foundation: '05',
    category: 'spacing',
    description: 'Extra small spacing (4px)'
  },
  {
    semantic: 'space-sm',
    foundation: '1',
    category: 'spacing',
    description: 'Small spacing (8px)'
  },
  {
    semantic: 'space-md',
    foundation: '2',
    category: 'spacing',
    description: 'Medium spacing (16px)'
  },
  {
    semantic: 'space-lg',
    foundation: '3',
    category: 'spacing',
    description: 'Large spacing (24px)'
  },
  {
    semantic: 'space-xl',
    foundation: '4',
    category: 'spacing',
    description: 'Extra large spacing (32px)'
  },
  {
    semantic: 'space-2xl',
    foundation: '6',
    category: 'spacing',
    description: '2X large spacing (48px)'
  },
  {
    semantic: 'space-3xl',
    foundation: '8',
    category: 'spacing',
    description: '3X large spacing (64px)'
  },
  
  // Component Spacing (5 tokens)
  {
    semantic: 'space-padding-sm',
    foundation: '1',
    category: 'spacing',
    description: 'Small component padding (8px)'
  },
  {
    semantic: 'space-padding-md',
    foundation: '2',
    category: 'spacing',
    description: 'Medium component padding (16px)'
  },
  {
    semantic: 'space-padding-lg',
    foundation: '3',
    category: 'spacing',
    description: 'Large component padding (24px)'
  },
  {
    semantic: 'space-gap-sm',
    foundation: '1',
    category: 'spacing',
    description: 'Small gap between elements (8px)'
  },
  {
    semantic: 'space-gap-md',
    foundation: '2',
    category: 'spacing',
    description: 'Medium gap between elements (16px)'
  },
  
  // ===================================
  // TYPOGRAPHY (12 tokens)
  // ===================================
  
  // Font Families (3 tokens)
  {
    semantic: 'font-body',
    foundation: 'sans',
    category: 'typography',
    description: 'Body text font family'
  },
  {
    semantic: 'font-heading',
    foundation: 'sans',
    category: 'typography',
    description: 'Heading font family'
  },
  {
    semantic: 'font-mono',
    foundation: 'mono',
    category: 'typography',
    description: 'Monospace font family for code'
  },
  
  // Font Sizes (6 tokens)
  {
    semantic: 'text-xs',
    foundation: 'xs',
    category: 'typography',
    description: 'Extra small text size (12px)'
  },
  {
    semantic: 'text-sm',
    foundation: 'sm',
    category: 'typography',
    description: 'Small text size (13px)'
  },
  {
    semantic: 'text-base',
    foundation: 'md',
    category: 'typography',
    description: 'Base text size (14px)'
  },
  {
    semantic: 'text-lg',
    foundation: 'lg',
    category: 'typography',
    description: 'Large text size (15px)'
  },
  {
    semantic: 'text-xl',
    foundation: 'xl',
    category: 'typography',
    description: 'Extra large text size (16px)'
  },
  {
    semantic: 'text-2xl',
    foundation: '2xl',
    category: 'typography',
    description: '2X large text size (18px)'
  },
  
  // Font Weights (3 tokens)
  {
    semantic: 'weight-normal',
    foundation: 'normal',
    category: 'typography',
    description: 'Normal font weight (400)'
  },
  {
    semantic: 'weight-medium',
    foundation: 'semibold',
    category: 'typography',
    description: 'Medium font weight (600)'
  },
  {
    semantic: 'weight-bold',
    foundation: 'bold',
    category: 'typography',
    description: 'Bold font weight (700)'
  },
  
  // ===================================
  // EFFECTS (8 tokens)
  // ===================================
  
  // Border Radius (3 tokens)
  {
    semantic: 'radius-sm',
    foundation: '05',
    category: 'effects',
    description: 'Small border radius (4px)'
  },
  {
    semantic: 'radius-md',
    foundation: '05',
    category: 'effects',
    description: 'Medium border radius (4px)'
  },
  {
    semantic: 'radius-lg',
    foundation: '1',
    category: 'effects',
    description: 'Large border radius (8px)'
  },
  
  // Shadows (3 tokens)
  {
    semantic: 'shadow-sm',
    foundation: '1',
    category: 'effects',
    description: 'Small shadow'
  },
  {
    semantic: 'shadow-md',
    foundation: '2',
    category: 'effects',
    description: 'Medium shadow'
  },
  {
    semantic: 'shadow-lg',
    foundation: '3',
    category: 'effects',
    description: 'Large shadow'
  },
  
  // Focus (2 tokens) - Note: These are literals, not foundation references
  {
    semantic: 'focus-color',
    foundation: 'primary',
    category: 'effects',
    description: 'Focus outline color'
  },
  {
    semantic: 'focus-width',
    foundation: '2px',
    category: 'effects',
    description: 'Focus outline width'
  },
  
  // ===================================
  // LAYOUT (5 tokens)
  // ===================================
  
  // Z-Index (3 tokens)
  {
    semantic: 'z-dropdown',
    foundation: '300',
    category: 'layout',
    description: 'Z-index for dropdown menus'
  },
  {
    semantic: 'z-modal',
    foundation: '400',
    category: 'layout',
    description: 'Z-index for modal dialogs'
  },
  {
    semantic: 'z-tooltip',
    foundation: '500',
    category: 'layout',
    description: 'Z-index for tooltips'
  },
  
  // Transitions (2 tokens) - Note: These are literal values
  {
    semantic: 'transition-fast',
    foundation: '150ms ease-in-out',
    category: 'layout',
    description: 'Fast transition timing'
  },
  {
    semantic: 'transition-base',
    foundation: '200ms ease-in-out',
    category: 'layout',
    description: 'Base transition timing'
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
  return uswdsSemanticMappings.find(m => m.semantic === semanticToken)?.foundation;
}
