// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** NEL policy API. */
export interface NELPolicy {
  /** NEL policy lifetime. */
  readonly max_age: number;

  /** Endpoint group to which the report will be sent. */
  readonly report_to?: string;

  /** Whether to enable origin subdomains. */
  readonly include_subdomains?: boolean;

  /** Sampling rate for successful network requests. */
  readonly success_fraction?: number;

  /** Sampling rate for failed network requests. */
  readonly failure_fraction?: number;

  /** Request header field to be included in the report. */
  readonly request_headers?: readonly string[];

  /** Response header field to be included in the report. */
  readonly response_headers?: readonly string[];
}
