/**
 * Parse USWDS color tokens from JSON files
 */

import { readFileSync, readdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { USWDSColorJSON, ColorTokenValue } from '../../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const USWDS_COLORS_PATH = resolve(
  __dirname,
  '../../../../../node_modules/@uswds/uswds/packages/uswds-tokens/colors'
);

/**
 * Parse a single USWDS color family JSON file
 */
function parseUSWDSColorFamily(
  filePath: string
): Record<string, ColorTokenValue> {
  const content = readFileSync(filePath, 'utf-8');
  const data: USWDSColorJSON = JSON.parse(content);
  
  const tokens: Record<string, ColorTokenValue> = {};
  
  // Extract color family name from file
  const familyName = data.props[0]?.name;
  if (!familyName) return tokens;
  
  const values = data.props[0].value;
  
  for (const item of values) {
    if (typeof item.value === 'string') {
      // Standard grade (e.g., red-5, red-10)
      const tokenName = `${familyName}-${item.name}`;
      tokens[tokenName] = {
        value: item.value,
        grade: parseInt(item.name, 10)
      };
    } else if (Array.isArray(item.value)) {
      // Vivid variant (e.g., red-5v, red-10v)
      for (const vividItem of item.value) {
        if (vividItem.value && typeof vividItem.value === 'string') {
          const tokenName = `${familyName}-${vividItem.name}v`;
          tokens[tokenName] = {
            value: vividItem.value,
            grade: parseInt(vividItem.name, 10)
          };
        }
      }
    }
  }
  
  return tokens;
}

/**
 * Parse all USWDS system color tokens
 */
export function parseUSWDSSystemColors(): Record<string, ColorTokenValue> {
  const colorFiles = readdirSync(USWDS_COLORS_PATH).filter(
    (file) => file.endsWith('.json')
  );
  
  let allColors: Record<string, ColorTokenValue> = {};
  
  for (const file of colorFiles) {
    const filePath = join(USWDS_COLORS_PATH, file);
    const familyColors = parseUSWDSColorFamily(filePath);
    allColors = { ...allColors, ...familyColors };
  }
  
  // Add white and black
  allColors['white'] = { value: '#ffffff', grade: 0 };
  allColors['black'] = { value: '#000000', grade: 100 };
  
  return allColors;
}
