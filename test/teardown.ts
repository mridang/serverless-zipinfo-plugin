/**
 * @file Jest global teardown, which runs once after the test suite finishes.
 */

/**
 * Releases resources held for the test run, of which there are none.
 * @example
 * // Referenced from jest.config.mjs as the globalTeardown entry.
 * await teardown();
 */
export default async function teardown(): Promise<void> {
  // No external services to tear down.
}
