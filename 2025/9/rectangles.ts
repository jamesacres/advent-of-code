export const findRectangles = (corners: string[]) => {
  const rectangles: [string, string, number][] = [];
  for (const corner1 of corners) {
    const [x1, y1] = corner1.split(",").map(Number);
    for (const corner2 of corners) {
      const [x2, y2] = corner2.split(",").map(Number);
      if (x1 === x2 || y1 === y2) {
        continue;
      }
      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
      rectangles.push([corner1, corner2, area]);
    }
  }
  return rectangles.sort(([_a1, _a2, aArea], [_b1, _b2, bArea]) =>
    bArea - aArea
  );
};
