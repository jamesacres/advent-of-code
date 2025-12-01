import { assertEquals } from "@std/assert";
import { numberOfZeros, Rotation } from "./dial.ts";

Deno.test(function testInputLandOnZero() {
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
    numberOfZeros(50, 99, rotations),
    3,
  );
});
