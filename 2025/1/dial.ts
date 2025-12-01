export interface Rotation {
  direction: "L" | "R";
  distance: number;
}

export const numberOfZeros = (
  start: number,
  end: number,
  rotations: Rotation[],
): { pointsAtZero: number; landOnZero: number; position: number } =>
  rotations.reduce((result, { direction, distance }) => {
    const fullRotations = Math.floor(distance / (end + 1));
    const leftOver = distance - (fullRotations * (end + 1));
    const difference = direction === "L" ? leftOver * -1 : leftOver;

    let nextPosition = result.position + difference;
    let nextPointsAtZero = result.pointsAtZero + fullRotations;

    if (nextPosition < 0) {
      nextPosition = end + nextPosition + 1;
      if (result.position !== 0 && nextPosition !== 0) {
        nextPointsAtZero = nextPointsAtZero + 1;
      }
    } else if (nextPosition > end) {
      nextPosition = nextPosition - end - 1;
      if (result.position !== 0 && nextPosition !== 0) {
        nextPointsAtZero = nextPointsAtZero + 1;
      }
    }

    let nextLandOnZero = result.landOnZero;
    if (nextPosition === 0) {
      nextLandOnZero = nextLandOnZero + 1;
      nextPointsAtZero = nextPointsAtZero + 1;
    }

    return {
      ...result,
      pointsAtZero: nextPointsAtZero,
      landOnZero: nextLandOnZero,
      position: nextPosition,
    };
  }, { pointsAtZero: 0, landOnZero: 0, position: start });
