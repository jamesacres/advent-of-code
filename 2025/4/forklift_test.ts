import { assertEquals } from "@std/assert/equals";
import { countAccess, setAccessForkLift, toMap } from "./forklift.ts";

const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

Deno.test(function exampleCountAccess() {
  assertEquals(
    countAccess(exampleInput),
    13,
  );
});

Deno.test(async function inputCountAccess() {
  const input = await Deno.readTextFile("./2025/4/input.txt");
  assertEquals(
    countAccess(input),
    1457,
  );
});
