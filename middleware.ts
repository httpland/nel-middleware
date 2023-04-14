// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { type Middleware, stringifyJfv, withHeader } from "./deps.ts";
import { assertValidNELPolicy } from "./utils.ts";
import { Header } from "./constants.ts";
import type { NELPolicy } from "./types.ts";

/** Create `NEL` header field middleware.
 *
 * @example
 * ```ts
 * import {
 *   type Handler,
 *   nel,
 * } from "https://deno.land/x/nel_middleware@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * declare const handler: Handler;
 *
 * const middleware = nel({ report_to: "default", max_age: 86400 });
 * const response = await middleware(request, handler);
 *
 * assert(response.headers.has("nel"));
 * ```
 *
 * @throws {Error} If the endpoints include invalid member.
 */
export function nel(policy: NELPolicy): Middleware {
  assertValidNELPolicy(policy);

  const fieldValue = stringifyJfv([policy]);

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(Header.NEL)) return response;

    return withHeader(response, Header.NEL, fieldValue);
  };
}
