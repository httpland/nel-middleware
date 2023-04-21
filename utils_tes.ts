import { assertValidNELPolicy } from "./utils.ts";
import {
  assertFalse,
  assertThrows,
  describe,
  it,
  NELPolicy,
} from "./_dev_deps.ts";

describe("assertValidNELPolicy", () => {
  it("should return void", () => {
    const table: NELPolicy[] = [
      { max_age: 0 },
      { max_age: 100000 },
      { max_age: 0, success_fraction: 0, failure_fraction: 0 },
    ];

    table.forEach((input) => {
      assertFalse(assertValidNELPolicy(input));
    });
  });
  it("should throw error", () => {
    const table: NELPolicy[] = [
      { max_age: NaN },
      { max_age: -1 },
      { max_age: 0, success_fraction: NaN },
      { max_age: 0, failure_fraction: NaN },
    ];

    table.forEach((input) => {
      assertThrows(() => assertValidNELPolicy(input));
    });
  });
});
