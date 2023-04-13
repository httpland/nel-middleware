// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import {
  type DeepReadonly,
  isNonNegativeInteger,
  isNumber,
  isUnitInterval,
} from "./deps.ts";
import type { NELPolicy } from "./types.ts";

/** Assert the {@link NELPolicy} is valid.
 * @throws {Error} If the policy include invalid field.
 */
export function assertValidNELPolicy(
  policy: DeepReadonly<NELPolicy>,
): asserts policy {
  const { max_age, success_fraction, failure_fraction } = policy;

  assertNonNegativeInteger(
    max_age,
    `max_age must be non-negative integer. ${max_age}`,
  );

  isNumber(success_fraction) &&
    assertUnitInterval(
      success_fraction,
      `success_fraction must be unit interval. ${success_fraction}`,
    );

  isNumber(failure_fraction) &&
    assertUnitInterval(
      failure_fraction,
      `failure_fraction must be unit interval. ${failure_fraction}`,
    );
}

/** Assert the input is non-negative integer. */
export function assertNonNegativeInteger(
  input: number,
  msg?: string,
): asserts input {
  if (!isNonNegativeInteger(input)) throw Error(msg);
}

/** Assert the input is unit interval. */
export function assertUnitInterval(input: number, msg?: string): asserts input {
  if (!isUnitInterval(input)) throw Error(msg);
}
