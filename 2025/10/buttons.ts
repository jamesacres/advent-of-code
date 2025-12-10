export interface Machine {
  requirement: number;
  buttons: { value: number; positions: number[] }[];
}

export const parseInput = (input: string): Machine[] => {
  return input.split("\n").reduce((result: Machine[], line) => {
    let requirement = 0;
    const buttons: Machine["buttons"] = [];
    line.split(" ").forEach((part) => {
      if (part.startsWith("[")) {
        requirement = parseInt(
          part.replace("[", "").replace("]", "").replaceAll(".", "0")
            .replaceAll("#", "1").split("").reverse().join(""),
          2,
        );
      } else if (part.startsWith("(")) {
        const positions = part.replace("(", "").replace(")", "").matchAll(
          /[0-9]+/g,
        ).toArray()
          .map(([value]) => value).map(Number);
        const value = positions.reduce((total, position) => {
          return total + (Math.pow(2, position));
        }, 0);
        buttons.push(
          { value, positions },
        );
      }
    });
    return [...result, { requirement, buttons }];
  }, []);
};

export const pressButtons = (buttons: Machine["buttons"]): number =>
  buttons.reduce((result, button) => result ^ button.value, 0);

export const requirementToPositions = (requirement: number): number[] =>
  (requirement >>> 0).toString(2).split("").reverse().entries().filter((
    [_i, value],
  ) => value === "1").map(([i]) => i).toArray();

export const fewestPresses = (
  requirement: number,
  buttons: Machine["buttons"],
) => {
  const needPositions = requirementToPositions(requirement);
  // Find buttons which contain those positions
  const candidateButtons = buttons.filter((button) =>
    button.positions.some((position) => needPositions.includes(position))
  );
  console.info(candidateButtons);
};
