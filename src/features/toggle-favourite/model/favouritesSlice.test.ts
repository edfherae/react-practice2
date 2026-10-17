import { describe, expect, test } from "vitest";
import { favouritesSlice } from "./favouritesSlice";
import fc from "fast-check";

const favouritesReducer = favouritesSlice.reducer;
const { add } = favouritesSlice.actions;

describe("favouritesReducer", () => {
  test.each([
    { input: 1, expected: [1] },
    { input: -1, expected: [] },
    { input: 4.5, expected: [] },
    { input: 0, expected: [] },
    { input: NaN, expected: [] },
    { input: Infinity, expected: [] },
    { input: -Infinity, expected: [] },
  ])("add($input) = ($expected)", ({ input, expected }) => {
    const nextState = favouritesReducer(undefined, add({ characterId: input }));
    expect(nextState.ids).toEqual(expected);
  });

  test("add to favourites only positive integers", () => {
    fc.assert(
      fc.property(fc.double(), (val) => {
        const nextState = favouritesReducer(
          undefined,
          add({ characterId: val }),
        );
        const result = Number.isInteger(val) && val > 0 ? [val] : [];
        expect(nextState.ids).toEqual(result);
      }),
    );
  });
});
