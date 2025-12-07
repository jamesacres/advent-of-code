export interface MapEntry {
  isStart?: boolean;
  isSplitter?: boolean;
  isSplitterActivated?: boolean;
  isBeam?: boolean;
}

export interface Map {
  [x: string]: { [y: string]: MapEntry };
}

export const toMap = (input: string): Map =>
  input.split("\n").reduce(
    (result: Map, line, y) => {
      for (const [x, value] of Object.entries(line.split(""))) {
        result[x] ??= {};
        result[x][y] = {
          isStart: value === "S",
          isSplitter: value === "^",
        };
      }
      return result;
    },
    {},
  );

export const render = (map: Map) => {
  let result = "";

  const maxx = Object.keys(map).length;
  const maxy = Object.keys(map[0]).length;
  [...new Array(maxy)].map((_, y) => {
    result = result ? `${result}\n` : result;
    [...new Array(maxx)].map((_, x) => {
      const entry = map[x][y];
      let character = "";
      if (entry.isBeam) {
        character = `|`;
      } else if (entry.isSplitter) {
        character = `^`;
      } else if (entry.isStart) {
        character = `S`;
      } else {
        character = `.`;
      }
      result = `${result}${character}`;
    });
  });
  return result;
};

export const process = (map: Map) => {
  const width = Object.values(map).length;
  const height = Object.values(map[0]).length;

  const processBelowSplitter = (x: number, y: number) => {
    if (
      y < height - 1 &&
      map[x][y + 1].isSplitter
    ) {
      map[x][y + 1].isSplitterActivated = true;
      if (
        x > 0 &&
        !map[x - 1][y + 1].isSplitter
      ) {
        map[x - 1][y + 1].isBeam = true;
        processBelowSplitter(x - 1, y + 1);
      }
      if (
        x < width - 1 &&
        !map[x + 1][y + 1].isSplitter
      ) {
        map[x + 1][y + 1].isBeam = true;
        processBelowSplitter(x + 1, y + 1);
      }
    }
  };

  const maxx = Object.keys(map).length;
  const maxy = Object.keys(map[0]).length;
  [...new Array(maxy)].map((_, y) => {
    [...new Array(maxx)].map((_, x) => {
      const entry = map[x][y];
      if (
        Number(y) > 0 &&
        !entry.isSplitter &&
        (map[x][Number(y) - 1].isStart ||
          map[x][Number(y) - 1].isBeam)
      ) {
        entry.isBeam = true;
        processBelowSplitter(Number(x), Number(y));
      }
    });
  });
};
