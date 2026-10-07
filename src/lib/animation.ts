/** Shared, GPU-friendly motion tokens for the interactive sections to come. */
export const cinematicEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export const motionTokens = {
  duration: {
    fast: 0.2,
    base: 0.45,
    slow: 0.8,
  },
  distance: {
    reveal: 24,
  },
} as const;
