interface MapEntry {
  value: string;
  forklift?: number;
}

interface Map {
  [x: string]: { [y: string]: MapEntry };
}

export const toMap = (input: string): Map =>
  input.split("\n").reduce(
    (result: Map, line, y) => {
      for (const [x, value] of Object.entries(line.split(""))) {
        result[x] ??= {};
        result[x][y] = { value };
      }
      return result;
    },
    {},
  );

export const perimeterValues = (map: Map, x: number, y: number) => {
  return [
    (map[x - 1] || [])[y - 1],
    (map[x] || [])[y - 1],
    (map[x + 1] || [])[y - 1],
    (map[x - 1] || [])[y],
    (map[x + 1] || [])[y],
    (map[x - 1] || [])[y + 1],
    (map[x] || [])[y + 1],
    (map[x + 1] || [])[y + 1],
  ].filter((value) => !!value);
};

const ROLL = "@";

export const setAccessForkLift = (map: Map, iteration: number): number => {
  let newForkLifts = 0;
  for (const [x, row] of Object.entries(map)) {
    for (const [y, entry] of Object.entries(row)) {
      if (
        entry.value === ROLL && !entry.forklift &&
        perimeterValues(map, Number(x), Number(y)).filter((neighbour) =>
            neighbour.value === ROLL &&
            (!neighbour.forklift || neighbour.forklift === iteration)
          ).length < 4
      ) {
        map[x][y].forklift = iteration;
        newForkLifts = newForkLifts + 1;
      }
    }
  }
  return newForkLifts;
};

export const countAccess = (input: string, repeat: boolean = false) => {
  const map = toMap(input);
  let iteration = 1;
  if (repeat) {
    while (setAccessForkLift(map, iteration) > 0) {
      iteration = iteration + 1;
    }
  } else {
    setAccessForkLift(map, iteration);
  }
  return Object.values(map).reduce((result, row) => {
    return result + Object.values(row).reduce((rowTotal, entry) => {
      return entry.forklift ? rowTotal + 1 : rowTotal;
    }, 0);
  }, 0);
};
