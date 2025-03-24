import { Gift } from "./api";

/**
 * Generates a deterministic hash value from a string.
 * @param str The string to hash
 * @returns A 32-bit integer hash value
 */
export function generateHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Generates a deterministic position for a gift based on its id.
 * Uses a simple hash function to create consistent x,y coordinates.
 */
export function getGiftPosition(gift: Gift): { x: number; y: number } {
  const hash = generateHash(gift.id);

  // Use the hash to generate x,y coordinates within the 1500x1500 space
  // Leave some padding from edges for gift size
  // TODO: keep in sync with the actual size of viewport
  const padding = 100;
  const x = Math.abs(hash % (1500 - padding * 2)) + padding;
  const y = Math.abs((hash >> 16) % (1500 - padding * 2)) + padding;

  return { x, y };
}
