/**
 * @file Ambient module declaration for the Serverless test harness runner used by the specs.
 */
declare module '@serverless/test/run-serverless' {
  export default function runServerless(
    serverlessPath: string,
    options: object,
  ): Promise<void>;
}
