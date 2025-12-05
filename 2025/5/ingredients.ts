export const isFresh = (ingredientId: number, freshRanges: number[][]) => {
  return freshRanges.some(([a, b]) => ingredientId >= a && ingredientId <= b);
};

const condenseRanges = (freshRanges: number[][]): number[][] => {
  const newFreshRanges: number[][] = [];
  for (const [a, b] of [...freshRanges].sort((a, b) => a[0] - b[0])) {
    let shouldAdd: boolean = true;
    const indexOfRangeIncludingStart = newFreshRanges.findIndex((
      [newA, newB],
    ) => newA <= a && newB >= a);
    if (indexOfRangeIncludingStart > -1) {
      const [newA, newB] = newFreshRanges[indexOfRangeIncludingStart];
      if (newB > b) {
        console.warn(`skipping as ${a}-${b} covered by ${newA}-${newB}`);
        shouldAdd = false;
      } else {
        console.warn(`extending ${newA}-${newB} to cover end ${a}-${b}`);
        newFreshRanges[indexOfRangeIncludingStart][1] = b;
        shouldAdd = false;
      }
    }
    const indexOfRangeIncludingEnd = newFreshRanges.findIndex((
      [newA, newB],
    ) => newB >= b && newA <= b);
    if (indexOfRangeIncludingEnd > -1) {
      const [newA, newB] = newFreshRanges[indexOfRangeIncludingEnd];
      if (newA < a) {
        console.warn(`skipping as ${a}-${b} covered by ${newA}-${newB}`);
        shouldAdd = false;
      } else {
        console.warn(`extending ${newA}-${newB} to cover start ${a}-${b}`);
        newFreshRanges[indexOfRangeIncludingEnd][0] = a;
        shouldAdd = false;
      }
    }
    if (shouldAdd) {
      newFreshRanges.push([a, b]);
    }
  }
  return newFreshRanges;
};

export const countIdsInRanges = (freshRanges: number[][]): number => {
  const newFreshRanges = condenseRanges(freshRanges);
  return newFreshRanges.reduce((result, [a, b]) => result + (b - a + 1), 0);
};
