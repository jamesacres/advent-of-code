import { assertEquals } from "@std/assert/equals";
import { fitsAll, parseInput } from "./presents.ts";

const exampleInput = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

Deno.test(function examplePresents() {
  const { presents, regions } = parseInput(exampleInput);
  const results = regions.map((region) => fitsAll(region, presents));
  assertEquals(results.filter((result) => result).length, 3);
});

Deno.test(async function inputPresents() {
  const input = await Deno.readTextFile("./2025/12/input.txt");
  const { presents, regions } = parseInput(input);
  const results = regions.map((region) => fitsAll(region, presents));
  assertEquals(results.filter((result) => result).length, 567);
});
