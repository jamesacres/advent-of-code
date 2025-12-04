import { assertEquals } from "@std/assert/equals";
import { countAccess } from "./forklift.ts";

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

Deno.test(function exampleRepeatCountAccess() {
  assertEquals(
    countAccess(exampleInput, true),
    43,
  );
});

Deno.test(async function inputCountAccess() {
  const input = await Deno.readTextFile("./2025/4/input.txt");
  assertEquals(
    countAccess(input, true),
    1457,
  );
});
