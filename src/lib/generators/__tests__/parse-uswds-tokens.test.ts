/**
 * Tests for USWDS token parser
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import type { ParsedTokens } from '../types';
import { parseUSWDSTokens } from '../parse-uswds-tokens';

describe('USWDS Token Parser', () => {
  let tokens: ParsedTokens;
  
  beforeAll(() => {
    tokens = parseUSWDSTokens();
  });
  
  describe('Metadata', () => {
    it('should include USWDS version', () => {
      expect(tokens.version).toBeDefined();
      expect(tokens.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });
  
  describe('System Color Tokens', () => {
    it('should parse all color families', () => {
      const families = [
        'red', 'red-warm', 'red-cool',
        'orange', 'orange-warm',
        'gold',
        'yellow',
        'green', 'green-warm', 'green-cool',
        'mint', 'mint-cool',
        'cyan',
        'blue', 'blue-warm', 'blue-cool',
        'indigo', 'indigo-warm', 'indigo-cool',
        'violet', 'violet-warm',
        'magenta',
        'gray', 'gray-warm', 'gray-cool'
      ];
      
      families.forEach(family => {
        const familyTokens = Object.keys(tokens.colors.system).filter(
          key => key.startsWith(`${family}-`)
        );
        expect(familyTokens.length).toBeGreaterThan(0);
      });
    });
    
    it('should parse all standard grades (5-90)', () => {
      const grades = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90];
      grades.forEach(grade => {
        expect(tokens.colors.system).toHaveProperty(`red-${grade}`);
      });
    });
    
    it('should parse vivid variants', () => {
      expect(tokens.colors.system).toHaveProperty('red-5v');
      expect(tokens.colors.system).toHaveProperty('blue-60v');
    });
    
    it('should include white and black', () => {
      expect(tokens.colors.system).toHaveProperty('white');
      expect(tokens.colors.system).toHaveProperty('black');
      expect(tokens.colors.system.white.value).toBe('#ffffff');
      expect(tokens.colors.system.black.value).toBe('#000000');
    });
    
    it('should have valid hex color values', () => {
      Object.entries(tokens.colors.system).forEach(([name, token]) => {
        expect(token.value).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
    
    it('should have grade property for graded colors', () => {
      expect(tokens.colors.system['red-5'].grade).toBe(5);
      expect(tokens.colors.system['red-50'].grade).toBe(50);
      expect(tokens.colors.system['blue-60v'].grade).toBe(60);
    });
    
    it('should parse approximately 463 system colors', () => {
      const count = Object.keys(tokens.colors.system).length;
      expect(count).toBeGreaterThan(450);
      expect(count).toBeLessThan(480);
    });
  });
  
  describe('Theme Color Tokens', () => {
    it('should include primary color variants', () => {
      expect(tokens.colors.theme).toHaveProperty('primary');
      expect(tokens.colors.theme).toHaveProperty('primary-vivid');
      expect(tokens.colors.theme).toHaveProperty('primary-dark');
      expect(tokens.colors.theme).toHaveProperty('primary-darker');
      expect(tokens.colors.theme).toHaveProperty('primary-light');
      expect(tokens.colors.theme).toHaveProperty('primary-lighter');
    });
    
    it('should include secondary color variants', () => {
      expect(tokens.colors.theme).toHaveProperty('secondary');
      expect(tokens.colors.theme).toHaveProperty('secondary-vivid');
    });
    
    it('should include accent colors', () => {
      expect(tokens.colors.theme).toHaveProperty('accent-warm');
      expect(tokens.colors.theme).toHaveProperty('accent-cool');
    });
    
    it('should include base neutrals', () => {
      expect(tokens.colors.theme).toHaveProperty('base-lightest');
      expect(tokens.colors.theme).toHaveProperty('base-lighter');
      expect(tokens.colors.theme).toHaveProperty('base-light');
      expect(tokens.colors.theme).toHaveProperty('base');
      expect(tokens.colors.theme).toHaveProperty('base-dark');
      expect(tokens.colors.theme).toHaveProperty('base-darker');
      expect(tokens.colors.theme).toHaveProperty('base-darkest');
    });
    
    it('should mark tokens as references to system colors', () => {
      expect(tokens.colors.theme.primary.reference).toBe(true);
      expect(tokens.colors.theme.secondary.reference).toBe(true);
    });
    
    it('should parse approximately 31 theme colors', () => {
      const count = Object.keys(tokens.colors.theme).length;
      expect(count).toBeGreaterThanOrEqual(30);
      expect(count).toBeLessThanOrEqual(35);
    });
  });
  
  describe('State Color Tokens', () => {
    it('should include error state variants', () => {
      expect(tokens.colors.state).toHaveProperty('error');
      expect(tokens.colors.state).toHaveProperty('error-dark');
      expect(tokens.colors.state).toHaveProperty('error-darker');
      expect(tokens.colors.state).toHaveProperty('error-light');
      expect(tokens.colors.state).toHaveProperty('error-lighter');
    });
    
    it('should include warning state variants', () => {
      expect(tokens.colors.state).toHaveProperty('warning');
      expect(tokens.colors.state).toHaveProperty('warning-dark');
    });
    
    it('should include success state variants', () => {
      expect(tokens.colors.state).toHaveProperty('success');
      expect(tokens.colors.state).toHaveProperty('success-dark');
    });
    
    it('should include info state variants', () => {
      expect(tokens.colors.state).toHaveProperty('info');
      expect(tokens.colors.state).toHaveProperty('info-dark');
    });
    
    it('should include disabled states', () => {
      expect(tokens.colors.state).toHaveProperty('disabled');
      expect(tokens.colors.state).toHaveProperty('disabled-light');
    });
    
    it('should parse approximately 22 state colors', () => {
      const count = Object.keys(tokens.colors.state).length;
      expect(count).toBeGreaterThanOrEqual(20);
      expect(count).toBeLessThanOrEqual(25);
    });
  });
  
  describe('Spacing Tokens', () => {
    it('should include pixel units', () => {
      expect(tokens.spacing).toHaveProperty('1px');
      expect(tokens.spacing).toHaveProperty('2px');
      expect(tokens.spacing['1px'].value).toBe('1px');
      expect(tokens.spacing['2px'].value).toBe('2px');
    });
    
    it('should include numeric tokens', () => {
      const numericTokens = ['05', '1', '105', '2', '205', '3', '4', '5', '6', '7', '8', '9', '10', '15'];
      numericTokens.forEach(token => {
        expect(tokens.spacing).toHaveProperty(token);
      });
    });
    
    it('should include named tokens', () => {
      const namedTokens = ['card', 'card-lg', 'mobile', 'mobile-lg', 'tablet', 'tablet-lg', 'desktop', 'desktop-lg', 'widescreen'];
      namedTokens.forEach(token => {
        expect(tokens.spacing).toHaveProperty(token);
      });
    });
    
    it('should include negative tokens', () => {
      expect(tokens.spacing).toHaveProperty('neg-1px');
      expect(tokens.spacing).toHaveProperty('neg-05');
      expect(tokens.spacing).toHaveProperty('neg-1');
    });
    
    it('should have valid rem values for non-pixel tokens', () => {
      Object.entries(tokens.spacing).forEach(([key, value]) => {
        if (!key.includes('px')) {
          expect(value.value).toMatch(/^-?\d+(\.\d+)?rem$/);
        }
      });
    });
    
    it('should parse approximately 41 spacing tokens', () => {
      const count = Object.keys(tokens.spacing).length;
      expect(count).toBeGreaterThanOrEqual(40);
      expect(count).toBeLessThanOrEqual(45);
    });
  });
  
  describe('Typography - Font Families', () => {
    it('should include standard font families', () => {
      expect(tokens.typography.family).toHaveProperty('sans');
      expect(tokens.typography.family).toHaveProperty('serif');
      expect(tokens.typography.family).toHaveProperty('mono');
    });
    
    it('should include role-based families', () => {
      expect(tokens.typography.family).toHaveProperty('ui');
      expect(tokens.typography.family).toHaveProperty('heading');
      expect(tokens.typography.family).toHaveProperty('body');
      expect(tokens.typography.family).toHaveProperty('code');
    });
    
    it('should have font stacks as arrays', () => {
      expect(Array.isArray(tokens.typography.family.sans.value)).toBe(true);
      expect(tokens.typography.family.sans.value).toContain('sans-serif');
      expect(tokens.typography.family.serif.value).toContain('serif');
      expect(tokens.typography.family.mono.value).toContain('monospace');
    });
  });
  
  describe('Typography - Font Sizes', () => {
    it('should include named sizes', () => {
      const namedSizes = ['micro', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
      namedSizes.forEach(size => {
        expect(tokens.typography.size).toHaveProperty(size);
      });
    });
    
    it('should include numeric sizes', () => {
      for (let i = 1; i <= 20; i++) {
        expect(tokens.typography.size).toHaveProperty(i.toString());
      }
    });
    
    it('should have rem values', () => {
      Object.values(tokens.typography.size).forEach(token => {
        expect(token.value).toMatch(/^\d+(\.\d+)?rem$/);
      });
    });
  });
  
  describe('Typography - Font Weights', () => {
    it('should include standard weights', () => {
      const weights = ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'heavy'];
      weights.forEach(weight => {
        expect(tokens.typography.weight).toHaveProperty(weight);
      });
    });
    
    it('should have numeric values', () => {
      expect(tokens.typography.weight.thin.value).toBe('100');
      expect(tokens.typography.weight.normal.value).toBe('400');
      expect(tokens.typography.weight.bold.value).toBe('700');
    });
  });
  
  describe('Typography - Line Heights', () => {
    it('should include line height tokens 1-6', () => {
      for (let i = 1; i <= 6; i++) {
        expect(tokens.typography.lineHeight).toHaveProperty(i.toString());
      }
    });
    
    it('should have unitless numeric values', () => {
      Object.values(tokens.typography.lineHeight).forEach(token => {
        expect(token.value).toMatch(/^\d+(\.\d+)?$/);
      });
    });
  });
  
  describe('Shadow Tokens', () => {
    it('should include shadow levels 1-5', () => {
      for (let i = 1; i <= 5; i++) {
        expect(tokens.shadow).toHaveProperty(i.toString());
      }
    });
    
    it('should include none', () => {
      expect(tokens.shadow).toHaveProperty('none');
      expect(tokens.shadow.none.value).toBe('none');
    });
  });
  
  describe('Opacity Tokens', () => {
    it('should include opacity values 0-100', () => {
      const opacities = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      opacities.forEach(opacity => {
        expect(tokens.opacity).toHaveProperty(opacity.toString());
      });
    });
    
    it('should have decimal values', () => {
      expect(tokens.opacity['0'].value).toBe('0');
      expect(tokens.opacity['50'].value).toBe('0.5');
      expect(tokens.opacity['100'].value).toBe('1');
    });
  });
  
  describe('Z-Index Tokens', () => {
    it('should include numeric z-indexes', () => {
      const indexes = [100, 200, 300, 400, 500];
      indexes.forEach(index => {
        expect(tokens.zIndex).toHaveProperty(index.toString());
      });
    });
    
    it('should include special values', () => {
      expect(tokens.zIndex).toHaveProperty('top');
      expect(tokens.zIndex).toHaveProperty('bottom');
    });
  });
  
  describe('Flex Tokens', () => {
    it('should include flex values 1-12', () => {
      for (let i = 1; i <= 12; i++) {
        expect(tokens.flex).toHaveProperty(i.toString());
      }
    });
    
    it('should include special flex values', () => {
      expect(tokens.flex).toHaveProperty('auto');
      expect(tokens.flex).toHaveProperty('fill');
    });
  });
  
  describe('Order Tokens', () => {
    it('should include order values 0-11', () => {
      for (let i = 0; i <= 11; i++) {
        expect(tokens.order).toHaveProperty(i.toString());
      }
    });
    
    it('should include special order values', () => {
      expect(tokens.order).toHaveProperty('first');
      expect(tokens.order).toHaveProperty('last');
      expect(tokens.order).toHaveProperty('initial');
    });
  });
  
  describe('JSON Output', () => {
    it('should write tokens to file', () => {
      const outputPath = resolve(__dirname, '../token-sources/uswds-tokens.json');
      expect(existsSync(outputPath)).toBe(true);
    });
    
    it('should be valid JSON', () => {
      const outputPath = resolve(__dirname, '../token-sources/uswds-tokens.json');
      const content = readFileSync(outputPath, 'utf-8');
      expect(() => JSON.parse(content)).not.toThrow();
    });
    
    it('should match parsed tokens', () => {
      const outputPath = resolve(__dirname, '../token-sources/uswds-tokens.json');
      const content = readFileSync(outputPath, 'utf-8');
      const fileTokens = JSON.parse(content);
      expect(fileTokens).toEqual(tokens);
    });
  });
  
  describe('Total Token Count', () => {
    it('should parse at least 650 tokens total', () => {
      const totalCount =
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
      
      expect(totalCount).toBeGreaterThanOrEqual(650);
      console.log(`Total tokens parsed: ${totalCount}`);
    });
  });
});
