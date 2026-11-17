/**
 * @file Ambient module declaration for the Serverless test harness runner used by the specs.
 */
declare module '@serverless/test/run-serverless' {
  interface RunServerlessOptions {
    [key: string]: unknown;
  }

  export default function runServerless(
    serverlessPath: string,
    options: RunServerlessOptions,
  ): Promise<void>;
}
