import { describe, test, expect } from "vitest";
import fc from "fast-check";
import { isPositiveInteger } from "./isPositiveInteger";

describe("isPositiveInteger", () => {
  test.each([
    { i: 1, e: true },
    { i: 0, e: false },
    { i: -1, e: false },
    { i: 1.2, e: false },
    { i: NaN, e: false },
    { i: Infinity, e: false },
  ])("isPositiveInteger($i) = $e", ({ i, e }) => {
    expect(isPositiveInteger(i)).toBe(e);
  });

  test("result is positive integer", () => {
    fc.assert(
      fc.property(fc.double(), (val) => {
        if (isPositiveInteger(val)) {
          expect(Number.isInteger(val)).toBe(true);
          expect(val).toBeGreaterThan(0);
        }
      }),
    );
  });
});
