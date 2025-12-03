export const maxJoltage = (bank: string, count: number): number => {
  const batteryEntries = bank.split("").map((value, i) => [i, Number(value)]);
  const orderedEntries = batteryEntries.sort(([_a, a], [_b, b]) => b - a);

  const getNextHighestWithRemainder = (minIndex: number, maxIndex: number) =>
    orderedEntries.find(([j]) => j > minIndex && j < maxIndex);

  let currentIndex = -1;
  let currentValue = "";
  for (let n = 0; n < count; n++) {
    const [nextIndex, nextValue] = getNextHighestWithRemainder(
      currentIndex,
      batteryEntries.length - count + n + 1,
    )!;
    currentValue = `${currentValue}${nextValue}`;
    currentIndex = nextIndex;
  }
  return Number(currentValue);
};
