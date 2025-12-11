import { assertEquals } from "@std/assert/equals";
import { findPaths, parseInput } from "./path.ts";

const exampleInput = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

Deno.test(function examplePaths() {
  assertEquals(findPaths(parseInput(exampleInput), "you", "out"), [
    [
      "bbb",
      "eee",
      "out",
    ],
    [
      "ccc",
      "eee",
      "out",
    ],
    [
      "ccc",
      "fff",
      "out",
    ],
    [
      "bbb",
      "ddd",
      "ggg",
      "out",
    ],
    [
      "ccc",
      "ddd",
      "ggg",
      "out",
    ],
  ]);
});

Deno.test(async function inputPaths() {
  const input = await Deno.readTextFile("./2025/11/input.txt");
  assertEquals(findPaths(parseInput(input), "you", "out").length, 506);
});
