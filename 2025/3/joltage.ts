export const maxJoltage = (bank: string): number => {
  const batteries = bank.split("").map(Number);
  const combinations: number[] = [];
  for (const [i, battery] of batteries.entries()) {
    for (let j = i + 1; j < batteries.length; j = j + 1) {
      combinations.push(parseInt(`${battery}${batteries[j]}`));
    }
  }
  return combinations.sort()[combinations.length - 1];
};
