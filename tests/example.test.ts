import { describe, it, expect } from 'vitest';

describe('Example Test Suite', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const text = 'Shop Management';
    expect(text).toContain('Shop');
    expect(text.toLowerCase()).toBe('shop management');
  });
});