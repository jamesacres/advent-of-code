import { assertEquals } from "@std/assert";
import { numberOfZeros, Rotation } from "./dial.ts";

Deno.test(function exampleInputLandOnZero() {
  const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
  const rotations: Rotation[] = input.split("\n").map((line) => {
    return {
      direction: line.charAt(0) as "L" | "R",
      distance: Number(line.slice(1)),
    };
  });
  assertEquals(
    numberOfZeros(50, 99, rotations).landOnZero,
    3,
  );
});

Deno.test(async function testInputLandOnZero() {
  const input = await Deno.readTextFile("./2025/1/input.txt");
  const rotations: Rotation[] = input.split("\n").map((line) => {
    return {
      direction: line.charAt(0) as "L" | "R",
      distance: Number(line.slice(1)),
    };
  });
  assertEquals(
    numberOfZeros(50, 99, rotations).landOnZero,
    1092,
  );
});

Deno.test(function exampleInputPointsAtZero() {
  const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
  const rotations: Rotation[] = input.split("\n").map((line) => {
    return {
      direction: line.charAt(0) as "L" | "R",
      distance: Number(line.slice(1)),
    };
  });
  assertEquals(
    numberOfZeros(50, 99, rotations).pointsAtZero,
    6,
  );
});

Deno.test(async function testInputLandOnZero() {
  const input = await Deno.readTextFile("./2025/1/input.txt");
  const rotations: Rotation[] = input.split("\n").map((line) => {
    return {
      direction: line.charAt(0) as "L" | "R",
      distance: Number(line.slice(1)),
    };
  });
  assertEquals(
    numberOfZeros(50, 99, rotations).pointsAtZero,
    6616,
  );
});
