// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** NEL policy API. */
export interface NELPolicy {
  /** NEL policy lifetime. */
  max_age: number;

  /** Endpoint group to which the report will be sent. */
  report_to?: string;

  /** Whether to enable origin subdomains. */
  include_subdomains?: boolean;

  /** Sampling rate for successful network requests. */
  success_fraction?: number;

  /** Sampling rate for failed network requests. */
  failure_fraction?: number;

  /** Request header field to be included in the report. */
  request_headers?: string[];

  /** Response header field to be included in the report. */
  response_headers?: string[];
}
