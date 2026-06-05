/**
 * Checkbox Component Token Mappings
 * 
 * Maps semantic tokens to checkbox-specific tokens.
 * Tokens for checkbox and radio button controls.
 * 
 * @module checkbox-tokens
 */

import type { ComponentTokens } from '../types.js';

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
