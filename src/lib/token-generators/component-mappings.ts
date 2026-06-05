/**
 * Component Token Mappings
 * 
 * Maps semantic tokens to component-specific tokens.
 * Each component defines its own tokens that reference semantic tokens.
 * 
 * @module component-mappings
 */

export interface ComponentTokenDefinition {
  token: string;          // Component token name (button-bg)
  semantic: string;       // Semantic token reference (color-primary)
  category: 'color' | 'spacing' | 'typography' | 'effects' | 'layout';
  description: string;
}

export interface ComponentTokens {
  component: string;
  tokens: ComponentTokenDefinition[];
}

/**
 * Button Component Tokens
 * 
 * Tokens for the Button component covering all states and variants.
 */
export const buttonTokens: ComponentTokens = {
  component: 'button',
  tokens: [
    // ================================
    // Colors - Default State
    // ================================
    {
      token: 'button-bg',
      semantic: 'color-interactive',
      category: 'color',
      description: 'Default button background color'
    },
    {
      token: 'button-bg-hover',
      semantic: 'color-interactive-hover',
      category: 'color',
      description: 'Button background on hover'
    },
    {
      token: 'button-bg-active',
      semantic: 'color-interactive-active',
      category: 'color',
      description: 'Button background when pressed/active'
    },
    {
      token: 'button-bg-disabled',
      semantic: 'color-interactive-disabled',
      category: 'color',
      description: 'Button background when disabled'
    },
    {
      token: 'button-text',
      semantic: 'color-text-inverse',
      category: 'color',
      description: 'Button text color'
    },
    {
      token: 'button-text-disabled',
      semantic: 'color-text-disabled',
      category: 'color',
      description: 'Button text color when disabled'
    },
    {
      token: 'button-border',
      semantic: 'color-interactive',
      category: 'color',
      description: 'Button border color (default transparent)'
    },
    {
      token: 'button-border-hover',
      semantic: 'color-interactive-hover',
      category: 'color',
      description: 'Button border color on hover'
    },
    {
      token: 'button-border-focus',
      semantic: 'focus-color',
      category: 'color',
      description: 'Button border color when focused'
    },
    
    // ================================
    // Colors - Secondary Variant
    // ================================
    {
      token: 'button-secondary-bg',
      semantic: 'color-secondary',
      category: 'color',
      description: 'Secondary button background'
    },
    {
      token: 'button-secondary-bg-hover',
      semantic: 'color-secondary',
      category: 'color',
      description: 'Secondary button background on hover'
    },
    
    // ================================
    // Colors - Outline Variant
    // ================================
    {
      token: 'button-outline-bg',
      semantic: 'color-bg',
      category: 'color',
      description: 'Outline button background (transparent)'
    },
    {
      token: 'button-outline-border',
      semantic: 'color-border',
      category: 'color',
      description: 'Outline button border color'
    },
    {
      token: 'button-outline-text',
      semantic: 'color-text',
      category: 'color',
      description: 'Outline button text color'
    },
    
    // ================================
    // Spacing
    // ================================
    {
      token: 'button-padding-y',
      semantic: 'space-padding-sm',
      category: 'spacing',
      description: 'Vertical padding inside button'
    },
    {
      token: 'button-padding-x',
      semantic: 'space-padding-md',
      category: 'spacing',
      description: 'Horizontal padding inside button'
    },
    {
      token: 'button-gap',
      semantic: 'space-gap-sm',
      category: 'spacing',
      description: 'Gap between button icon and text'
    },
    
    // ================================
    // Typography
    // ================================
    {
      token: 'button-font-family',
      semantic: 'font-body',
      category: 'typography',
      description: 'Button font family'
    },
    {
      token: 'button-font-size',
      semantic: 'text-base',
      category: 'typography',
      description: 'Button font size'
    },
    {
      token: 'button-font-weight',
      semantic: 'weight-medium',
      category: 'typography',
      description: 'Button font weight'
    },
    
    // ================================
    // Effects
    // ================================
    {
      token: 'button-border-radius',
      semantic: 'radius-md',
      category: 'effects',
      description: 'Button corner radius'
    },
    {
      token: 'button-shadow-hover',
      semantic: 'shadow-sm',
      category: 'effects',
      description: 'Button shadow on hover'
    },
    {
      token: 'button-transition',
      semantic: 'transition-fast',
      category: 'effects',
      description: 'Button transition speed'
    },
    {
      token: 'button-focus-width',
      semantic: 'focus-width',
      category: 'effects',
      description: 'Button focus ring width'
    }
  ]
};

/**
 * Input Component Tokens
 * 
 * Tokens for text input, textarea, and similar form controls.
 */
export const inputTokens: ComponentTokens = {
  component: 'input',
  tokens: [
    // ================================
    // Colors
    // ================================
    {
      token: 'input-bg',
      semantic: 'color-bg',
      category: 'color',
      description: 'Input background color'
    },
    {
      token: 'input-bg-disabled',
      semantic: 'color-bg-disabled',
      category: 'color',
      description: 'Input background when disabled'
    },
    {
      token: 'input-text',
      semantic: 'color-text',
      category: 'color',
      description: 'Input text color'
    },
    {
      token: 'input-text-disabled',
      semantic: 'color-text-disabled',
      category: 'color',
      description: 'Input text when disabled'
    },
    {
      token: 'input-text-placeholder',
      semantic: 'color-text-light',
      category: 'color',
      description: 'Input placeholder text color'
    },
    {
      token: 'input-border',
      semantic: 'color-border',
      category: 'color',
      description: 'Input border color'
    },
    {
      token: 'input-border-hover',
      semantic: 'color-border-dark',
      category: 'color',
      description: 'Input border on hover'
    },
    {
      token: 'input-border-focus',
      semantic: 'focus-color',
      category: 'color',
      description: 'Input border when focused'
    },
    {
      token: 'input-border-error',
      semantic: 'color-error',
      category: 'color',
      description: 'Input border when invalid'
    },
    
    // ================================
    // Spacing
    // ================================
    {
      token: 'input-padding-y',
      semantic: 'space-padding-sm',
      category: 'spacing',
      description: 'Vertical padding inside input'
    },
    {
      token: 'input-padding-x',
      semantic: 'space-padding-md',
      category: 'spacing',
      description: 'Horizontal padding inside input'
    },
    
    // ================================
    // Typography
    // ================================
    {
      token: 'input-font-family',
      semantic: 'font-body',
      category: 'typography',
      description: 'Input font family'
    },
    {
      token: 'input-font-size',
      semantic: 'text-base',
      category: 'typography',
      description: 'Input font size'
    },
    {
      token: 'input-font-weight',
      semantic: 'weight-normal',
      category: 'typography',
      description: 'Input font weight'
    },
    
    // ================================
    // Effects
    // ================================
    {
      token: 'input-border-radius',
      semantic: 'radius-sm',
      category: 'effects',
      description: 'Input corner radius'
    },
    {
      token: 'input-transition',
      semantic: 'transition-fast',
      category: 'effects',
      description: 'Input transition speed'
    },
    {
      token: 'input-focus-width',
      semantic: 'focus-width',
      category: 'effects',
      description: 'Input focus ring width'
    }
  ]
};

/**
 * Checkbox Component Tokens
 * 
 * Tokens for checkbox and radio button controls.
 */
export const checkboxTokens: ComponentTokens = {
  component: 'checkbox',
  tokens: [
    // ================================
    // Colors - Box
    // ================================
    {
      token: 'checkbox-bg',
      semantic: 'color-bg',
      category: 'color',
      description: 'Checkbox background (unchecked)'
    },
    {
      token: 'checkbox-bg-checked',
      semantic: 'color-interactive',
      category: 'color',
      description: 'Checkbox background when checked'
    },
    {
      token: 'checkbox-bg-disabled',
      semantic: 'color-bg-disabled',
      category: 'color',
      description: 'Checkbox background when disabled'
    },
    {
      token: 'checkbox-border',
      semantic: 'color-border',
      category: 'color',
      description: 'Checkbox border color'
    },
    {
      token: 'checkbox-border-checked',
      semantic: 'color-interactive',
      category: 'color',
      description: 'Checkbox border when checked'
    },
    {
      token: 'checkbox-border-focus',
      semantic: 'focus-color',
      category: 'color',
      description: 'Checkbox border when focused'
    },
    {
      token: 'checkbox-checkmark',
      semantic: 'color-text-inverse',
      category: 'color',
      description: 'Checkbox checkmark color'
    },
    
    // ================================
    // Colors - Label
    // ================================
    {
      token: 'checkbox-label-text',
      semantic: 'color-text',
      category: 'color',
      description: 'Checkbox label text color'
    },
    {
      token: 'checkbox-label-text-disabled',
      semantic: 'color-text-disabled',
      category: 'color',
      description: 'Checkbox label text when disabled'
    },
    
    // ================================
    // Spacing
    // ================================
    {
      token: 'checkbox-gap',
      semantic: 'space-gap-sm',
      category: 'spacing',
      description: 'Gap between checkbox and label'
    },
    
    // ================================
    // Typography
    // ================================
    {
      token: 'checkbox-label-font-family',
      semantic: 'font-body',
      category: 'typography',
      description: 'Checkbox label font family'
    },
    {
      token: 'checkbox-label-font-size',
      semantic: 'text-base',
      category: 'typography',
      description: 'Checkbox label font size'
    },
    {
      token: 'checkbox-label-font-weight',
      semantic: 'weight-normal',
      category: 'typography',
      description: 'Checkbox label font weight'
    },
    
    // ================================
    // Effects
    // ================================
    {
      token: 'checkbox-border-radius',
      semantic: 'radius-sm',
      category: 'effects',
      description: 'Checkbox corner radius'
    },
    {
      token: 'checkbox-transition',
      semantic: 'transition-fast',
      category: 'effects',
      description: 'Checkbox transition speed'
    },
    {
      token: 'checkbox-focus-width',
      semantic: 'focus-width',
      category: 'effects',
      description: 'Checkbox focus ring width'
    }
  ]
};

/**
 * All component token definitions
 */
export const allComponentTokens: ComponentTokens[] = [
  buttonTokens,
  inputTokens,
  checkboxTokens
];
