export const isFresh = (ingredientId: number, freshRanges: number[][]) => {
  return freshRanges.some(([a, b]) => ingredientId >= a && ingredientId <= b);
};
