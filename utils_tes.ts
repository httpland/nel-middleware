import {
  assertNonNegativeInteger,
  assertUnitInterval,
  assertValidNELPolicy,
} from "./utils.ts";
import {
  assertFalse,
  assertThrows,
  describe,
  it,
  NELPolicy,
} from "./_dev_deps.ts";

describe("assertUnitInterval", () => {
  it("should return void", () => {
    const table: number[] = [
      1,
      0,
      0.5,
      0.0001,
      1.0,
    ];

    table.forEach((input) => {
      assertFalse(assertUnitInterval(input));
    });
  });
  it("should throw error", () => {
    const table: number[] = [
      NaN,
      Infinity,
      -Infinity,
      1.01,
      1.00001,
      -0.1,
    ];

    table.forEach((input) => {
      assertThrows(() => assertUnitInterval(input));
    });
  });
});

describe("assertNonNegativeInteger", () => {
  it("should return void", () => {
    const table: number[] = [
      1,
      0,
      1.0,
      10000,
    ];

    table.forEach((input) => {
      assertFalse(assertNonNegativeInteger(input));
    });
  });
  it("should throw error", () => {
    const table: number[] = [
      NaN,
      Infinity,
      -Infinity,
      1.01,
      1.00001,
      -0.1,
    ];

    table.forEach((input) => {
      assertThrows(() => assertNonNegativeInteger(input));
    });
  });
});

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
