import { assertEquals } from "@std/assert/equals";
import { findRectangles, findRectangles2 } from "./rectangles.ts";

const exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

Deno.test(function exampleLargestRectangle() {
  assertEquals(
    findRectangles(exampleInput.split("\n"))[0][2],
    50,
  );
});

Deno.test(async function inputLargestRectangle() {
  const input = await Deno.readTextFile("./2025/9/input.txt");
  assertEquals(
    findRectangles(input.split("\n"))[0][2],
    4743645488,
  );
});

Deno.test(async function inputLargestRectangle2() {
  // guess based on svg
  // assertEquals((Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1), 1525973456);
  const input = await Deno.readTextFile("./2025/9/inputsubset.txt");
  assertEquals(
    findRectangles2("94699,50401", input.split("\n")).slice(0, 10)[0][2],
    1529011204,
  );
});
