/**
 * Type definitions for token generation and USWDS token parser
 */

export interface TokenValue {
  value: string;
  px?: number;
  rem?: string;
}

export interface ColorTokenValue extends TokenValue {
  grade?: number;
  reference?: boolean;
}

export interface TypographyFamilyValue {
  value: string[];
}

export interface ParsedTokens {
  version: string;
  colors: {
    system: Record<string, ColorTokenValue>;
    theme: Record<string, ColorTokenValue>;
    state: Record<string, ColorTokenValue>;
  };
  spacing: Record<string, TokenValue>;
  typography: {
    family: Record<string, TypographyFamilyValue>;
    size: Record<string, TokenValue>;
    weight: Record<string, TokenValue>;
    lineHeight: Record<string, TokenValue>;
    letterSpacing: Record<string, TokenValue>;
    measure: Record<string, TokenValue>;
  };
  shadow: Record<string, TokenValue>;
  opacity: Record<string, TokenValue>;
  zIndex: Record<string, TokenValue>;
  flex: Record<string, TokenValue>;
  order: Record<string, TokenValue>;
}

// USWDS JSON file structure (based on investigation)
export interface USWDSColorJSON {
  global: {
    category: string;
  };
  props: Array<{
    name: string;
    value: Array<{
      name: string;
      value: string | false | Array<{ name: string; value: string | false }>;
    }>;
  }>;
  options?: {
    file: string;
  };
}

/**
 * Component Token Types
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
 * Semantic Token Types
 */

export interface SemanticTokenMapping {
  semantic: string;      // Universal semantic token name
  foundation: string;    // Foundation token it maps to
  category: 'color' | 'spacing' | 'typesetting' | 'shadow' | 'opacity' | 'z-index' | 'flex' | 'order';
  description: string;   // What this token is used for
}

/**
 * Utility Class Generator Types
 */

import type { Breakpoint, StateVariant, UtilityCategory } from './utility-config.js';

export interface UtilityMapping {
  /** CSS class name (without leading dot) */
  className: string;
  
  /** CSS property or properties to set */
  properties: string | string[];
  
  /** Value(s) - can reference tokens or be static */
  values: string | string[];
  
  /** Category for grouping */
  category: UtilityCategory;
  
  /** Optional description */
  description?: string;
  
  /** Enable responsive variants? Reads from VARIANT_CONFIG if undefined */
  responsive?: boolean;
  
  /** Which state variants to generate? Reads from VARIANT_CONFIG if undefined */
  states?: StateVariant[];
  
  /** Is this a negative spacing utility? */
  negative?: boolean;
  
  /** Important flag - adds !important to CSS rule */
  important?: boolean;
}

export interface UtilityGroup {
  category: UtilityCategory;
  utilities: UtilityMapping[];
}

export interface GeneratedUtility {
  className: string;
  css: string;
  variant?: 'base' | 'responsive' | 'state';
  breakpoint?: Breakpoint;
  state?: StateVariant;
}
