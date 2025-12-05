import { assertEquals } from "@std/assert/equals";
import { countIdsInRanges, isFresh } from "./ingredients.ts";

// fresh ingredient ID ranges, a blank line, and a list of available ingredient IDs
const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const parseInput = (input: string) => {
  let finishedRanges = false;
  return input.split("\n").reduce(
    (result: { freshRanges: number[][]; ingredientIds: number[] }, line) => {
      if (!line) {
        finishedRanges = true;
        return result;
      }
      if (finishedRanges) {
        result.ingredientIds.push(Number(line));
      } else {
        result.freshRanges.push(line.split("-").map(Number));
      }
      return result;
    },
    { freshRanges: [], ingredientIds: [] },
  );
};

Deno.test(function exampleFreshCount() {
  const { freshRanges, ingredientIds } = parseInput(exampleInput);
  const count = ingredientIds.map((ingredientId) =>
    isFresh(ingredientId, freshRanges)
  ).reduce((result, isTrue) => result + (isTrue ? 1 : 0), 0);
  assertEquals(
    count,
    3,
  );
});

Deno.test(async function inputFreshCount() {
  const input = await Deno.readTextFile("./2025/5/input.txt");
  const { freshRanges, ingredientIds } = parseInput(input);
  const count = ingredientIds.map((ingredientId) =>
    isFresh(ingredientId, freshRanges)
  ).reduce((result, isTrue) => result + (isTrue ? 1 : 0), 0);
  assertEquals(
    count,
    789,
  );
});

Deno.test(function exampleFreshRangeCount() {
  const { freshRanges } = parseInput(exampleInput);
  assertEquals(
    countIdsInRanges(freshRanges),
    14,
  );
});

Deno.test(async function inputFreshRangeCount() {
  const input = await Deno.readTextFile("./2025/5/input.txt");
  const { freshRanges } = parseInput(input);
  assertEquals(
    countIdsInRanges(freshRanges),
    343329651880509,
  );
});
