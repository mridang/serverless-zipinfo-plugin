/**
 * @file Jest global setup, which runs once before the test suite starts.
 */

/**
 * Prepares the environment for the test run, which needs no external services.
 * @example
 * // Referenced from jest.config.mjs as the globalSetup entry.
 * await setup();
 */
export default async function setup(): Promise<void> {
  // No external services are required for the test suite.
}
