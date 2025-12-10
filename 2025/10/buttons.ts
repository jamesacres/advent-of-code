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
): number[] => {
  const queue: { state: number; pressed: number[] }[] = [
    { state: 0, pressed: [] },
  ];
  const visited = new Set<number>([0]);

  while (queue.length > 0) {
    const { state, pressed } = queue.shift()!;

    if (state === requirement) {
      return pressed;
    }

    for (let i = 0; i < buttons.length; i++) {
      const newState = state ^ buttons[i].value;
      if (!visited.has(newState)) {
        visited.add(newState);
        queue.push({ state: newState, pressed: [...pressed, i] });
      }
    }
  }

  return [];
};
