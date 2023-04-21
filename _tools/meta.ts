import { BuildOptions } from "https://deno.land/x/dnt@0.34.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},

  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/nel-middleware",
    version,
    description: "HTTP network error logging(NEL) middleware",
    keywords: [
      "http",
      "middleware",
      "nel",
      "network-error-logging",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/nel-middleware",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/nel-middleware.git",
    },
    bugs: {
      url: "https://github.com/httpland/nel-middleware/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/http_middleware@1.0.0/mod.ts": {
      name: "@httpland/http-middleware",
      version: "1.0.0",
    },
    "https://deno.land/x/http_utils@1.0.0/message.ts": {
      name: "@httpland/http-utils",
      version: "1.0.0",
      subPath: "message.js",
    },
    "https://deno.land/x/isx@1.3.0/is_number.ts": {
      name: "@miyauci/isx",
      version: "1.3.0",
      subPath: "is_number.js",
    },
    "https://deno.land/x/assertion@1.0.0/number/assert_non_negative_integer.ts":
      {
        name: "@miyauci/assertion",
        version: "1.0.0",
        subPath: "number/assert_non_negative_integer.js",
      },
    "https://deno.land/x/assertion@1.0.0/number/assert_unit_interval.ts": {
      name: "@miyauci/assertion",
      version: "1.0.0",
      subPath: "number/assert_unit_interval.js",
    },
    "https://deno.land/x/jfv_parser@1.0.0/mod.ts": {
      name: "@httpland/jfv-parser",
      version: "1.0.0",
    },
  },
});
