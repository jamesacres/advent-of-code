//import { python } from "https://deno.land/x/python@0.4.3/mod.ts";

export interface Machine {
  requirement: number;
  buttons: { value: number; positions: number[] }[];
  joltage: number[];
}

export const parseInput = (input: string): Machine[] => {
  return input.split("\n").reduce((result: Machine[], line) => {
    let requirement = 0;
    const buttons: Machine["buttons"] = [];
    let joltage: number[] = [];
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
      } else if (part.startsWith("{")) {
        joltage = part.replace("{", "").replace("}", "").matchAll(
          /[0-9]+/g,
        ).toArray()
          .map(([value]) => value).map(Number);
      }
    });
    return [...result, { requirement, buttons, joltage }];
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
  // BFS to find minimum button presses
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

/*
// Solve using Z3 constraint solver via Python
export const fewestPressesJoltage = (
  joltage: number[],
  buttons: Machine["buttons"],
): number[] => {
  const z3 = python.import("z3");

  // Create integer variables for each button
  const buttonVars = buttons.map((_, i) => z3.Int(`b${i}`));

  // Create optimizer (for minimization)
  const opt = z3.Optimize();

  // Each button must be pressed >= 0 times
  for (const v of buttonVars) {
    opt.add(v.__ge__(0));
  }

  // For each position, sum of button presses affecting it must equal joltage
  for (let pos = 0; pos < joltage.length; pos++) {
    const terms = [];
    for (let btn = 0; btn < buttons.length; btn++) {
      if (buttons[btn].positions.includes(pos)) {
        terms.push(buttonVars[btn]);
      }
    }

    if (terms.length > 0) {
      const sum = z3.Sum(...terms);
      opt.add(sum.__eq__(joltage[pos]));
    }
  }

  // Minimize total button presses
  const totalPresses = z3.Sum(...buttonVars);
  opt.minimize(totalPresses);

  // Solve
  const result = opt.check();

  if (result.toString() !== "sat") {
    return [];
  }

  const model = opt.model();

  // Convert counts to button indices
  const solution: number[] = [];
  for (let i = 0; i < buttons.length; i++) {
    const count = Number(model.eval(buttonVars[i]).as_long());
    for (let j = 0; j < count; j++) {
      solution.push(i);
    }
  }

  return solution;
};
*/
