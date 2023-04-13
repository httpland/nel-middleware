# nel-middleware

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/nel_middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/nel_middleware/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/nel-middleware)](https://github.com/httpland/nel-middleware/releases)
[![codecov](https://codecov.io/github/httpland/nel-middleware/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/nel-middleware)
[![GitHub](https://img.shields.io/github/license/httpland/nel-middleware)](https://github.com/httpland/nel-middleware/blob/main/LICENSE)

[![test](https://github.com/httpland/nel-middleware/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/nel-middleware/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/nel-middleware.png?mini=true)](https://nodei.co/npm/@httpland/nel-middleware/)

HTTP network error logging(NEL) middleware.

Compliant with
[Network Error Logging](https://w3c.github.io/network-error-logging/#dfn-nel-policies).

## Middleware

For a definition of Universal HTTP middleware, see the
[http-middleware](https://github.com/httpland/http-middleware) project.

## Usage

Middleware adds the `NEL` header to the response.

```ts
import {
  type Handler,
  nel,
} from "https://deno.land/x/nel_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: Handler;

const middleware = nel({ report_to: "default", max_age: 86400 });
const response = await middleware(request, handler);

assert(response.headers.has("nel"));
```

yield:

```http
NEL: {"report_to":"default","max_age":86400}
```

## Policy

Specifying NEL policy is mandatory.

| Name               | Type       | Required | Description                                         |
| ------------------ | ---------- | :------: | --------------------------------------------------- |
| max_age            | `number`   |    ✅    | NEL policy lifetime.                                |
| report_to          | `string`   |    -     | Endpoint group to which the report will be sent.    |
| include_subdomains | `boolean`  |    -     | Whether to enable origin subdomains.                |
| success_fraction   | `number`   |    -     | Sampling rate for successful network requests.      |
| failure_fraction   | `number`   |    -     | Sampling rate for failed network requests.          |
| request_headers    | `string[]` |    -     | Request header field to be included in the report.  |
| response_headers   | `string[]` |    -     | Response header field to be included in the report. |

## Serialization error

If serialization fails, an error may be thrown.

Cases that throw an error are as follows:

- `max_age` is not non-negative integer
- `success_fraction` and `failure_fraction` is not unit interval

```ts
import { nel } from "https://deno.land/x/nel_middleware@$VERSION/middleware.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => nel({ max_age: NaN }));
assertThrows(() => nel({ max_age: 0, success_fraction: 1.1 }));
assertThrows(() => nel({ max_age: 0, failure_fraction: -1 }));
```

## Conditions

Middleware will execute if all of the following conditions are met:

- `NEL` header does not exist in response

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - NEL

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/nel_middleware/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
