import { assertEquals } from "@std/assert/equals";
import { compute, numbersV2, parseProblems } from "./homework.ts";

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

Deno.test(function parseExampleInputV2() {
  const operators = parseProblems(exampleInput).operators.reverse();
  const numbers = numbersV2(exampleInput);
  assertEquals({ numbers, operators }, {
    numbers: [
      [4, 431, 623],
      [175, 581, 32],
      [8, 248, 369],
      [356, 24, 1],
    ],
    operators: [
      ["+"],
      ["*"],
      ["+"],
      ["*"],
    ],
  });
});

Deno.test(function sumExampleInputV2() {
  const operators = parseProblems(exampleInput).operators.reverse();
  const numbers = numbersV2(exampleInput);
  assertEquals(
    compute({ numbers, operators }).reduce(
      (total, number) => total + number,
      0,
    ),
    3263827,
  );
});

Deno.test(async function sumInputV2() {
  const input = await Deno.readTextFile("./2025/6/input.txt");
  const operators = parseProblems(input).operators.reverse();
  const numbers = numbersV2(input);
  assertEquals(
    compute({ numbers, operators }).reduce(
      (total, number) => total + number,
      0,
    ),
    9581313737063,
  );
});
