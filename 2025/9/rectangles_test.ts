import { assertEquals } from "@std/assert/equals";
import { findRectangles } from "./rectangles.ts";

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
