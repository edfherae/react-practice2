import { describe, expect, test } from "vitest";
import { favouritesSlice } from "./favouritesSlice";
import fc from "fast-check";

const favouritesReducer = favouritesSlice.reducer;
const { add, remove } = favouritesSlice.actions;

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

  test("not adding duplicates", () => {
    let state = favouritesReducer(undefined, add({ characterId: 5 }));
    state = favouritesReducer(state, add({ characterId: 5 }));
    expect(state.ids).toEqual([5]);
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

  describe("remove", () => {
    test("removes existing id", () => {
      const stateWithIds = favouritesReducer(
        undefined,
        add({ characterId: 5 }),
      );
      const nextState = favouritesReducer(
        stateWithIds,
        remove({ characterId: 5 }),
      );

      expect(nextState.ids).toEqual([]);
    });

    test("keeps other ids untouched", () => {
      let state = favouritesReducer(undefined, add({ characterId: 1 }));
      state = favouritesReducer(state, add({ characterId: 2 }));
      state = favouritesReducer(state, add({ characterId: 3 }));

      const nextState = favouritesReducer(state, remove({ characterId: 2 }));

      expect(nextState.ids).toEqual([1, 3]);
    });

    test("does nothing when id is not in the list", () => {
      const stateWithIds = favouritesReducer(
        undefined,
        add({ characterId: 5 }),
      );
      const nextState = favouritesReducer(
        stateWithIds,
        remove({ characterId: 99 }),
      );

      expect(nextState.ids).toEqual([5]);
    });

    test("does nothing when list is empty", () => {
      const nextState = favouritesReducer(
        undefined,
        remove({ characterId: 1 }),
      );

      expect(nextState.ids).toEqual([]);
    });

    test("removing all ids one by one results in empty list", () => {
      let state = favouritesReducer(undefined, add({ characterId: 1 }));
      state = favouritesReducer(state, add({ characterId: 2 }));

      state = favouritesReducer(state, remove({ characterId: 1 }));
      state = favouritesReducer(state, remove({ characterId: 2 }));

      expect(state.ids).toEqual([]);
    });

    test("removing the same id twice is safe", () => {
      const stateWithId = favouritesReducer(undefined, add({ characterId: 5 }));
      const afterFirstRemove = favouritesReducer(
        stateWithId,
        remove({ characterId: 5 }),
      );
      const afterSecondRemove = favouritesReducer(
        afterFirstRemove,
        remove({ characterId: 5 }),
      );

      expect(afterSecondRemove.ids).toEqual([]);
    });
  });
});
