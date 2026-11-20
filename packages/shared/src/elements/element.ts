import { z } from 'zod';

/** The six elemental shards (see Bible « Les éléments et leur langue »). */
export const BASE_ELEMENTS = ['fire', 'water', 'lightning', 'earth', 'ice', 'wind'] as const;

/** All elements, including the Seventh Shard (Light), carried only by the hero. */
export const ELEMENTS = [...BASE_ELEMENTS, 'light'] as const;

export const ElementSchema = z.enum(ELEMENTS);
export type Element = z.infer<typeof ElementSchema>;

export const BaseElementSchema = z.enum(BASE_ELEMENTS);
export type BaseElement = z.infer<typeof BaseElementSchema>;

/** Returns true if the element is one of the six base elements (not Light). */
export function isBaseElement(element: Element): element is BaseElement {
  return BaseElementSchema.safeParse(element).success;
}
