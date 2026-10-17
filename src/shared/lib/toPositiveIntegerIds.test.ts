import { describe, test, expect } from "vitest";
import toPositiveIntegerIds from "./toPositiveIntegerIds";
import fc from "fast-check";

describe("toPositiveIds", () => {
  test("returns an empty array for an empty input array", () => {
    expect(toPositiveIntegerIds([])).toEqual([]);
  });
  test("filters out non-numeric values", () => {
    const input = [1, "a", null, undefined, {}, []];
    expect(toPositiveIntegerIds(input)).toEqual([1]);
  });

  test("filters out NaN, Infinity, and -Infinity", () => {
    const input = [1, NaN, Infinity, -Infinity, 2];
    expect(toPositiveIntegerIds(input)).toEqual([1, 2]);
  });

  test("filters out negative numbers and zero", () => {
    const input = [-1, 0, 1, -2, 3];
    expect(toPositiveIntegerIds(input)).toEqual([1, 3]);
  });

  test("returns an array of positive integer numbers from a mixed array", () => {
    const input = [1, -2, 3, "a", NaN, 0, 4.5];
    expect(toPositiveIntegerIds(input)).toEqual([1, 3]);
  });

  test("all results are positive integers", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (arr) => {
        const res = toPositiveIntegerIds(arr);
        return res.every((n) => Number.isInteger(n) && n > 0);
      }),
    );
  });
});
