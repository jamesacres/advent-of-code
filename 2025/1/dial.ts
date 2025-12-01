export interface Rotation {
  direction: "L" | "R";
  distance: number;
}

export const numberOfZeros = (
  start: number,
  end: number,
  rotations: Rotation[],
): number =>
  rotations.reduce((result, { direction, distance }) => {
    const fullRotations = Math.floor(distance / (end + 1));
    const leftOver = distance - (fullRotations * (end + 1));
    const difference = direction === "L" ? leftOver * -1 : leftOver;

    let nextPosition = result.position + difference;
    let nextPassZero = result.passZero + fullRotations;

    if (nextPosition === 0) {
      nextPassZero = nextPassZero + 1;
    } else if (nextPosition < 0) {
      nextPassZero = nextPassZero + 1;
      nextPosition = end + nextPosition + 1;
    } else if (nextPosition > end) {
      nextPassZero = nextPassZero + 1;
      nextPosition = nextPosition - end - 1;
    }

    let nextLandOnZero = result.landOnZero;
    if (nextPosition === 0) {
      nextLandOnZero = nextLandOnZero + 1;
    }

    return {
      ...result,
      passZero: nextPassZero,
      landOnZero: nextLandOnZero,
      position: nextPosition,
    };
  }, { passZero: 0, landOnZero: 0, position: start }).landOnZero;
