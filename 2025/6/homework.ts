interface Problems {
  numbers: number[][];
  operators: string[][];
}

export const parseProblems = (
  input: string,
): Problems => {
  return input.split("\n").map((line) => line.trim().split(/\s+/)).reduce(
    (result: Problems, characters) => {
      for (const [i, character] of characters.entries()) {
        if (["*", "+", "-"].includes(character)) {
          if (!result.operators[i]) {
            result.operators[i] = [];
          }
          result.operators[i].push(character);
        } else {
          if (!result.numbers[i]) {
            result.numbers[i] = [];
          }
          result.numbers[i].push(Number(character));
        }
      }
      return result;
    },
    { numbers: [], operators: [] },
  );
};

const calculate = (a: number, operator: string, b: number): number => {
  if (operator === "*") {
    return a * b;
  }
  if (operator === "+") {
    return a + b;
  }
  if (operator === "-") {
    return a - b;
  }
  return 0;
};

export const compute = (problems: Problems): number[] => {
  return problems.numbers.map((problemNumbers, i) => {
    const operator = problems.operators[i][0];
    return problemNumbers.slice(1).reduce((result, number) => {
      return calculate(result, operator, number);
    }, problemNumbers[0]);
  });
};

export const numbersV2 = (input: string): number[][] => {
  const result: number[][] = [[]];
  const lines = input.split("\n");
  for (let column = lines[0].length - 1; column >= 0; column = column - 1) {
    let thisNumber = "";

    let allSpaces = true;
    lines.map((line) => line.split("")[column]).forEach((character) => {
      if (character !== " ") {
        allSpaces = false;
      }
      if (/[0-9]/.test(character)) {
        thisNumber = `${thisNumber}${character}`;
      }
    });
    if (allSpaces) {
      result.push([]);
    }
    if (thisNumber) {
      result[result.length - 1].push(Number(thisNumber));
    }
  }
  return result;
};
