/**
 * Input Component Token Mappings
 * 
 * Maps semantic tokens to input-specific tokens.
 * Tokens for text input, textarea, and similar form controls.
 * 
 * @module input-tokens
 */

import type { ComponentTokens } from '../types.js';

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
