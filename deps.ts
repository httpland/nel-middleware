// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export {
  type Handler,
  type Middleware,
} from "https://deno.land/x/http_middleware@1.0.0/mod.ts";
export { withHeader } from "https://deno.land/x/http_utils@1.0.0/message.ts";
export { isNumber } from "https://deno.land/x/isx@1.2.0/is_number.ts";
export { isNonNegativeInteger } from "https://deno.land/x/isx@1.2.0/number/is_non_negative_integer.ts";
export { stringifyJfv } from "https://deno.land/x/jfv_parser@1.0.0/mod.ts";

/** Whether the input is unit interval or not. */
export function isUnitInterval(input: number): boolean {
  return 0 <= input && input <= 1;
}

export type DeepReadonly<T> = {
  readonly [k in keyof T]: DeepReadonly<T[k]>;
};
