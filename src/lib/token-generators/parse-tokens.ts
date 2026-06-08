/**
 * Universal Token Parser
 *
 * Main entry point for parsing design tokens from any supported design system.
 * Delegates to design-system-specific parsers.
 *
 * Supported Design Systems:
 *   - uswds (U.S. Web Design System) - default
 *   - material (Material Design) - future
 *   - bootstrap (Bootstrap) - future
 *
 * Usage:
 *   npm run generate:tokens
 *   tsx src/lib/token-generators/parse-tokens.ts
 *
 * @module parse-tokens
 */

import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ParsedTokens } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Supported design systems
 */
export type DesignSystem = 'uswds' | 'material' | 'bootstrap';

/**
 * Parse tokens for the specified design system
 *
 * @param designSystem - Design system to parse tokens from
 * @returns Parsed tokens in standardized format
 */
export async function parseTokens(designSystem: DesignSystem = 'uswds'): Promise<ParsedTokens> {
  console.log(`=== ${designSystem.toUpperCase()} Token Parser ===\n`);

  switch (designSystem) {
    case 'uswds': {
      const { parseUSWDSTokens } = await import('./parse-tokens/uswds/index.js');
      return parseUSWDSTokens();
    }

    case 'material':
      throw new Error('Material Design token parser not yet implemented');

    case 'bootstrap':
      throw new Error('Bootstrap token parser not yet implemented');

    default:
      throw new Error(`Unsupported design system: ${designSystem}`);
  }
}

/**
 * Main execution function
 *
 * @param designSystem - Design system to parse (default: 'uswds')
 */
async function main(designSystem: DesignSystem = 'uswds') {
  try {
    // Parse tokens
    const tokens = await parseTokens(designSystem);

    // Ensure output directory exists
    const outputDir = resolve(__dirname, 'token-sources');
    mkdirSync(outputDir, { recursive: true });

    // Write tokens to JSON file
    const outputPath = resolve(outputDir, `${designSystem}-tokens.json`);
    console.log(`\nWriting tokens to: ${outputPath}`);

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2), 'utf-8');

    console.log('✅ Token parsing complete!');
  } catch (error) {
    console.error('❌ Token parsing failed:', error);
    process.exit(1);
  }
}

// Run main function with command-line argument or default to 'uswds'
const designSystemArg = process.argv[2] as DesignSystem | undefined;
const designSystem = designSystemArg || 'uswds';

// Validate design system argument
if (designSystemArg && !['uswds', 'material', 'bootstrap'].includes(designSystemArg)) {
  console.error(`❌ Invalid design system: ${designSystemArg}`);
  console.error('   Supported: uswds, material, bootstrap');
  process.exit(1);
}

main(designSystem);
