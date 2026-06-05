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
