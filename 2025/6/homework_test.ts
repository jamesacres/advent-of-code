import { assertEquals } from "@std/assert/equals";
import { compute, parseProblems } from "./homework.ts";

const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

Deno.test(function parseExampleInput() {
  assertEquals(parseProblems(exampleInput), {
    numbers: [
      [123, 45, 6],
      [328, 64, 98],
      [51, 387, 215],
      [64, 23, 314],
    ],
    operators: [
      ["*"],
      ["+"],
      ["*"],
      ["+"],
    ],
  });
});

Deno.test(function computeExampleInput() {
  assertEquals(compute(parseProblems(exampleInput)), [
    33210,
    490,
    4243455,
    401,
  ]);
});

Deno.test(function sumExampleInput() {
  assertEquals(
    compute(parseProblems(exampleInput)).reduce(
      (total, number) => total + number,
      0,
    ),
    4277556,
  );
});

Deno.test(async function sumInput() {
  const input = await Deno.readTextFile("./2025/6/input.txt");
  assertEquals(
    compute(parseProblems(input)).reduce((total, number) => total + number, 0),
    4722948564882,
  );
});
