interface MapEntry {
  value: string;
  forklift?: boolean;
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

export const setAccessForkLift = (map: Map) => {
  for (const [x, row] of Object.entries(map)) {
    for (const [y, entry] of Object.entries(row)) {
      if (
        entry.value === ROLL &&
        perimeterValues(map, Number(x), Number(y)).filter((neighbour) =>
            neighbour.value === ROLL
          ).length < 4
      ) {
        map[x][y].forklift = true;
      }
    }
  }
};

export const countAccess = (input: string) => {
  const map = toMap(input);
  setAccessForkLift(map);
  return Object.values(map).reduce((result, row) => {
    return result + Object.values(row).reduce((rowTotal, entry) => {
      return entry.forklift ? rowTotal + 1 : rowTotal;
    }, 0);
  }, 0);
};
