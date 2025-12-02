import { assertEquals } from "@std/assert";
import { isValid } from "./products.ts";

for (const testCase of ["55", "6464", "123123"]) {
  Deno.test(function isInvalidMirrorInput() {
    assertEquals(
      isValid(testCase),
      false,
    );
  });
}

for (const testCase of ["0123", "01234", "012345"]) {
  Deno.test(function isInvalidZeroInput() {
    assertEquals(
      isValid(testCase),
      false,
    );
  });
}

for (const testCase of ["123", "1234", "12345"]) {
  Deno.test(function isValidInput() {
    assertEquals(
      isValid(testCase),
      true,
    );
  });
}

const exampleInput =
  `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

Deno.test(function exampleSumInvalid() {
  const result = exampleInput.split(",").map((range) =>
    range.split("-").map(Number)
  )
    .reduce((result: { invalidIds: number[] }, [start, end]) => {
      for (let id = start; id <= end; id = id + 1) {
        if (!isValid(`${id}`)) {
          result.invalidIds.push(id);
        }
      }
      return result;
    }, { invalidIds: [] });
  assertEquals(
    result.invalidIds.reduce((result, id) => result + Number(id), 0),
    1227775554,
  );
});

Deno.test(async function inputSumInvalid() {
  const input = await Deno.readTextFile("./2025/2/input.txt");
  const result = input.split(",").map((range) => range.split("-").map(Number))
    .reduce((result: { invalidIds: number[] }, [start, end]) => {
      for (let id = start; id <= end; id = id + 1) {
        if (!isValid(`${id}`)) {
          result.invalidIds.push(id);
        }
      }
      return result;
    }, { invalidIds: [] });
  assertEquals(
    result.invalidIds.reduce((result, id) => result + Number(id), 0),
    28844599675,
  );
});
