/**
 * Main entry point for parsing all USWDS design tokens
 * 
 * This script extracts all design tokens from the @uswds/uswds package
 * and outputs them to a structured JSON file.
 * 
 * Usage:
 *   npm run generate:tokens
 *   tsx src/lib/token-generators/parse-uswds-tokens.ts
 */

import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ParsedTokens } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { parseUSWDSSystemColors } from './parse-colors';
import { parseUSWDSThemeColors, parseUSWDSStateColors } from './parse-theme-state-colors';
import { parseUSWDSSpacingTokens } from './parse-spacing';
import {
  parseUSWDSFontFamilies,
  parseUSWDSFontSizes,
  parseUSWDSFontWeights,
  parseUSWDSLineHeights,
  parseUSWDSLetterSpacing,
  parseUSWDSMeasure
} from './parse-typography';
import {
  parseUSWDSShadowTokens,
  parseUSWDSOpacityTokens,
  parseUSWDSZIndexTokens,
  parseUSWDSFlexTokens,
  parseUSWDSOrderTokens
} from './parse-other-tokens';

/**
 * Get USWDS version from package.json
 */
function getUSWDSVersion(): string {
  try {
    const packagePath = resolve(
      __dirname,
      '../../../node_modules/@uswds/uswds/package.json'
    );
    const packageData = JSON.parse(readFileSync(packagePath, 'utf-8'));
    return packageData.version;
  } catch (error) {
    console.warn('Could not read USWDS version, using fallback');
    return '3.13.0';
  }
}

/**
 * Parse all USWDS design tokens
 */
export function parseUSWDSTokens(): ParsedTokens {
  console.log('Parsing USWDS design tokens...');
  
  const tokens: ParsedTokens = {
    version: getUSWDSVersion(),
    colors: {
      system: {},
      theme: {},
      state: {}
    },
    spacing: {},
    typography: {
      family: {},
      size: {},
      weight: {},
      lineHeight: {},
      letterSpacing: {},
      measure: {}
    },
    shadow: {},
    opacity: {},
    zIndex: {},
    flex: {},
    order: {}
  };
  
  // Parse color tokens
  console.log('  Parsing system colors...');
  tokens.colors.system = parseUSWDSSystemColors();
  console.log(`    Found ${Object.keys(tokens.colors.system).length} system color tokens`);
  
  console.log('  Parsing theme colors...');
  tokens.colors.theme = parseUSWDSThemeColors();
  console.log(`    Found ${Object.keys(tokens.colors.theme).length} theme color tokens`);
  
  console.log('  Parsing state colors...');
  tokens.colors.state = parseUSWDSStateColors();
  console.log(`    Found ${Object.keys(tokens.colors.state).length} state color tokens`);
  
  // Parse spacing tokens
  console.log('  Parsing spacing tokens...');
  tokens.spacing = parseUSWDSSpacingTokens();
  console.log(`    Found ${Object.keys(tokens.spacing).length} spacing tokens`);
  
  // Parse typography tokens
  console.log('  Parsing typography tokens...');
  tokens.typography.family = parseUSWDSFontFamilies();
  console.log(`    Found ${Object.keys(tokens.typography.family).length} font family tokens`);
  
  tokens.typography.size = parseUSWDSFontSizes();
  console.log(`    Found ${Object.keys(tokens.typography.size).length} font size tokens`);
  
  tokens.typography.weight = parseUSWDSFontWeights();
  console.log(`    Found ${Object.keys(tokens.typography.weight).length} font weight tokens`);
  
  tokens.typography.lineHeight = parseUSWDSLineHeights();
  console.log(`    Found ${Object.keys(tokens.typography.lineHeight).length} line height tokens`);
  
  tokens.typography.letterSpacing = parseUSWDSLetterSpacing();
  console.log(`    Found ${Object.keys(tokens.typography.letterSpacing).length} letter spacing tokens`);
  
  tokens.typography.measure = parseUSWDSMeasure();
  console.log(`    Found ${Object.keys(tokens.typography.measure).length} measure tokens`);
  
  // Parse other tokens
  console.log('  Parsing shadow tokens...');
  tokens.shadow = parseUSWDSShadowTokens();
  console.log(`    Found ${Object.keys(tokens.shadow).length} shadow tokens`);
  
  console.log('  Parsing opacity tokens...');
  tokens.opacity = parseUSWDSOpacityTokens();
  console.log(`    Found ${Object.keys(tokens.opacity).length} opacity tokens`);
  
  console.log('  Parsing z-index tokens...');
  tokens.zIndex = parseUSWDSZIndexTokens();
  console.log(`    Found ${Object.keys(tokens.zIndex).length} z-index tokens`);
  
  console.log('  Parsing flex tokens...');
  tokens.flex = parseUSWDSFlexTokens();
  console.log(`    Found ${Object.keys(tokens.flex).length} flex tokens`);
  
  console.log('  Parsing order tokens...');
  tokens.order = parseUSWDSOrderTokens();
  console.log(`    Found ${Object.keys(tokens.order).length} order tokens`);
  
  // Calculate totals
  const totalTokens =
    Object.keys(tokens.colors.system).length +
    Object.keys(tokens.colors.theme).length +
    Object.keys(tokens.colors.state).length +
    Object.keys(tokens.spacing).length +
    Object.keys(tokens.typography.family).length +
    Object.keys(tokens.typography.size).length +
    Object.keys(tokens.typography.weight).length +
    Object.keys(tokens.typography.lineHeight).length +
    Object.keys(tokens.typography.letterSpacing).length +
    Object.keys(tokens.typography.measure).length +
    Object.keys(tokens.shadow).length +
    Object.keys(tokens.opacity).length +
    Object.keys(tokens.zIndex).length +
    Object.keys(tokens.flex).length +
    Object.keys(tokens.order).length;
  
  console.log(`\nTotal tokens parsed: ${totalTokens}`);
  
  return tokens;
}

/**
 * Main execution
 */
function main() {
  console.log('=== USWDS Token Parser ===\n');
  
  const tokens = parseUSWDSTokens();
  
  const outputPath = resolve(__dirname, 'token-sources/uswds-tokens.json');
  console.log(`\nWriting tokens to: ${outputPath}`);
  
  writeFileSync(outputPath, JSON.stringify(tokens, null, 2), 'utf-8');
  
  console.log('✅ Token parsing complete!');
}

// Run main function
main();
