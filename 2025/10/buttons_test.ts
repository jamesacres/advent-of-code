import { assertEquals } from "@std/assert/equals";
import {
  fewestPresses,
  parseInput,
  pressButtons,
  requirementToPositions,
} from "./buttons.ts";

const exampleInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

Deno.test(function exampleParse() {
  assertEquals(parseInput(exampleInput), [{
    buttons: [
      {
        positions: [
          3,
        ],
        value: 8,
      },
      {
        positions: [
          1,
          3,
        ],
        value: 10,
      },
      {
        positions: [
          2,
        ],
        value: 4,
      },
      {
        positions: [
          2,
          3,
        ],
        value: 12,
      },
      {
        positions: [
          0,
          2,
        ],
        value: 5,
      },
      {
        positions: [
          0,
          1,
        ],
        value: 3,
      },
    ],
    requirement: 6,
  }, {
    buttons: [
      {
        positions: [
          0,
          2,
          3,
          4,
        ],
        value: 29,
      },
      {
        positions: [
          2,
          3,
        ],
        value: 12,
      },
      {
        positions: [
          0,
          4,
        ],
        value: 17,
      },
      {
        positions: [
          0,
          1,
          2,
        ],
        value: 7,
      },
      {
        positions: [
          1,
          2,
          3,
          4,
        ],
        value: 30,
      },
    ],
    requirement: 8,
  }, {
    buttons: [
      {
        positions: [
          0,
          1,
          2,
          3,
          4,
        ],
        value: 31,
      },
      {
        positions: [
          0,
          3,
          4,
        ],
        value: 25,
      },
      {
        positions: [
          0,
          1,
          2,
          4,
          5,
        ],
        value: 55,
      },
      {
        positions: [
          1,
          2,
        ],
        value: 6,
      },
    ],
    requirement: 46,
  }]);
});

Deno.test(function examplePressButtons() {
  const { requirement, buttons } = parseInput(exampleInput)[0];
  assertEquals(pressButtons([buttons[4], buttons[5]]), requirement);
});

Deno.test(function exampleRequirementToPositions() {
  const { requirement } = parseInput(exampleInput)[0];
  assertEquals(requirementToPositions(requirement), [1, 2]);
});

Deno.test(function exampleFewestPresses() {
  const { requirement, buttons } = parseInput(exampleInput)[0];
  assertEquals(fewestPresses(requirement, buttons), []);
});
