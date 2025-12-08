import { assertEquals } from "@std/assert/equals";
import { getDistances, makeCircuits, sortDistances } from "./junctionboxes.ts";

const exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

Deno.test(function exampleSmallestDistance() {
  assertEquals(
    sortDistances(getDistances(exampleInput.split("\n")))[0],
    [
      "0-19",
      316.90219311326956,
    ],
  );
});

Deno.test(function exampleMultiplySizes() {
  const result = makeCircuits(
    sortDistances(
      getDistances(exampleInput.split("\n")),
    ).slice(0, 10),
  ).map((circuit) => {
    const set = new Set();
    for (const [fromTo] of circuit) {
      const [from, to] = fromTo.split("-");
      set.add(from);
      set.add(to);
    }
    return set;
  }).sort((a, b) => b.size - a.size);
  assertEquals(
    result[0].size * result[1].size * result[2].size,
    40,
  );
});

Deno.test(async function inputMultiplySizes() {
  const input = await Deno.readTextFile("./2025/8/input.txt");
  const result = makeCircuits(
    sortDistances(
      getDistances(input.split("\n")),
    ).slice(0, 1000),
  ).map((circuit) => {
    const set = new Set();
    for (const [fromTo] of circuit) {
      const [from, to] = fromTo.split("-");
      set.add(from);
      set.add(to);
    }
    return set;
  }).sort((a, b) => b.size - a.size);
  assertEquals(
    result[0].size * result[1].size * result[2].size,
    352584,
  );
});
