/**
 * Button Component Token Mappings
 * 
 * Maps semantic tokens to button-specific tokens.
 * 
 * @module button-tokens
 */

import type { ComponentTokens } from '../types.js';

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
