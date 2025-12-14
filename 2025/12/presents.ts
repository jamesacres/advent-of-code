interface Present {
  spaces: number;
}

interface Region {
  width: number;
  height: number;
  includePresents: { [id: number]: number };
}

export const parseInput = (
  input: string,
): { presents: Present[]; regions: Region[] } => {
  const presents: Present[] = [];
  const regions: Region[] = [];
  let thisPresent: Present | undefined = undefined;
  for (const line of input.split("\n")) {
    if (/^[0-9]+:$/.test(line)) {
      thisPresent = { spaces: 0 };
    }
    if (thisPresent) {
      if (!line) {
        presents.push(thisPresent);
        thisPresent = undefined;
      } else if (line.includes("#")) {
        thisPresent.spaces = thisPresent.spaces +
          line.split("").filter((char) => char === "#").length;
      }
    }
    if (line.includes("x")) {
      const [area, presentCounts] = line.split(": ");
      const [width, height] = area.split("x").map(Number);
      const includePresents: Region["includePresents"] = {};
      for (const [id, count] of presentCounts.split(" ").entries()) {
        includePresents[id] = Number(count);
      }
      regions.push({ width, height, includePresents });
    }
  }
  return {
    presents,
    regions,
  };
};

export const fitsAll = (region: Region, presents: Present[]) => {
  const regionSpaces = region.width * region.height;
  const minSpaces = Object.entries(region.includePresents).reduce(
    (result, [id, count]) => {
      return result + presents[Number(id)].spaces * count;
    },
    0,
  );
  return minSpaces < regionSpaces;
};
