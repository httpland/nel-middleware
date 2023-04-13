import { nel } from "./middleware.ts";
import {
  assert,
  assertIsError,
  assertThrows,
  describe,
  equalsResponse,
  Header,
  it,
} from "./_dev_deps.ts";
import { NELPolicy } from "./mod.ts";

describe("nel", () => {
  it("should return same response if the response include header", async () => {
    const middleware = nel({ max_age: 0 });
    const initResponse = new Response(null, {
      headers: {
        [Header.NEL]: "",
      },
    });

    const response = await middleware(new Request("test:"), () => initResponse);

    assert(response === initResponse);
  });

  it("should return response what include NEL header", async () => {
    const middleware = nel({ max_age: 0 });

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            [Header.NEL]: `{"max_age":0}`,
          },
        }),
        true,
      ),
    );
  });

  it("should throw error if the endpoints include invalid value", () => {
    const table: NELPolicy[] = [
      { max_age: NaN },
      { max_age: 0, success_fraction: 1.1 },
      { max_age: 0, failure_fraction: -1.1 },
    ];

    table.forEach((input) => {
      assertThrows(() => nel(input));
    });
  });

  it("should be error message if the value is not URI-reference", () => {
    let err;

    try {
      nel({ max_age: NaN });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, Error, `max_age must be non-negative integer. NaN`);
    }
  });

  it("should be error message if the key is invalid", () => {
    let err;

    try {
      nel({ max_age: 0, failure_fraction: NaN });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, Error, `failure_fraction must be unit interval. NaN`);
    }
  });
});
