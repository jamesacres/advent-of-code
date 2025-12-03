import { assertEquals } from "@std/assert";
import { maxJoltage } from "./joltage.ts";

const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

for (const [i, expected] of [98, 89, 78, 92].entries()) {
  Deno.test(function maxJoltagePerBank() {
    assertEquals(
      maxJoltage(exampleInput.split("\n")[i]),
      expected,
    );
  });
}

Deno.test(function exampleSumMaxJoltage() {
  assertEquals(
    exampleInput.split("\n").map(maxJoltage).reduce((a, b) => a + b),
    357,
  );
});

Deno.test(async function inputSumMaxJoltage() {
  const input = await Deno.readTextFile("./2025/3/input.txt");
  assertEquals(
    input.split("\n").map(maxJoltage).reduce((a, b) => a + b),
    17432,
  );
});
