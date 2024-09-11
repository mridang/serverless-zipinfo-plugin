import runServerless from '@serverless/test/run-serverless';
import path from 'path';
// @ts-expect-error since the types are missing
import logEmitter from 'log/lib/emitter.js';

const logsBuffer: string[] = [];
logEmitter.on(
  'log',
  (event: { logger: { namespace: string }; messageTokens: string[] }) => {
    if (
      !event.logger.namespace.startsWith('serverless:lifecycle') &&
      event.logger.namespace !== 'serverless'
    ) {
      logsBuffer.push(event.messageTokens[0]);
    }
  },
);

describe('plugin tests', () => {
  it('should run checkov on package', async () => {
    await runServerless(path.join(require.resolve('serverless'), '..', '..'), {
      cwd: path.resolve(__dirname, 'fixtures', 'simple-service'),
      command: 'package',
    });

    expect(logsBuffer.join('\n')).toContain(
      'rw-r--r-- 4.5 unx       20 B bl       22 B defN 1979-12-31T17:00:00.000Z index.js',
    );
  });
});
