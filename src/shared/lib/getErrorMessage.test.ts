import { AxiosError } from "axios";
import { describe, expect, test } from "vitest";
import getErrorMessage from "./getErrorMessage";

describe("getErrorMessage", () => {
  test.each([
    {
      input: new Error("Total organ failure"),
      expected: "Total organ failure",
    },
    {
      input: new AxiosError("The taxi service is not responding"),
      expected: "The taxi service is not responding",
    },
  ])("getErrorMessage($input) -> $expected", ({ input, expected }) => {
    expect(getErrorMessage(input)).toEqual(expected);
  });
});
