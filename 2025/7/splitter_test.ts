import { assertEquals } from "@std/assert/equals";
import { MapEntry, process, render, toMap } from "./splitter.ts";

const exampleInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

Deno.test(function processExampleInput() {
  const map = toMap(exampleInput);
  process(map);
  console.info(render(map));
  assertEquals(
    Object.values(map).reduce((result: MapEntry[], line) => {
      result.push(...Object.values(line));
      return result;
    }, []).reduce(
      (result, { isSplitterActivated }) =>
        result + (isSplitterActivated ? 1 : 0),
      0,
    ),
    21,
  );
});

Deno.test(async function processInput() {
  const input = await Deno.readTextFile("./2025/7/input.txt");
  const map = toMap(input);
  process(map);
  console.info(render(map));
  assertEquals(
    Object.values(map).reduce((result: MapEntry[], line) => {
      result.push(...Object.values(line));
      return result;
    }, []).reduce(
      (result, { isSplitterActivated }) =>
        result + (isSplitterActivated ? 1 : 0),
      0,
    ),
    1592,
  );
});
