import { describe, expect, it } from 'vitest';

import { BASE_ELEMENTS, ELEMENTS, ElementSchema, isBaseElement } from './element';

describe('ElementSchema', () => {
  it('accepts the six base elements and Light', () => {
    for (const element of ELEMENTS) {
      expect(ElementSchema.parse(element)).toBe(element);
    }
    expect(ELEMENTS).toHaveLength(7);
  });

  it('rejects an unknown element', () => {
    expect(ElementSchema.safeParse('metal').success).toBe(false);
    expect(ElementSchema.safeParse(42).success).toBe(false);
  });
});

describe('isBaseElement', () => {
  it('returns true for the six base elements', () => {
    for (const element of BASE_ELEMENTS) {
      expect(isBaseElement(element)).toBe(true);
    }
  });

  it('returns false for Light', () => {
    expect(isBaseElement('light')).toBe(false);
  });
});
