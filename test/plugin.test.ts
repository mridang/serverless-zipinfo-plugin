/**
 * @file Unit tests for the zipinfo plugin, run against a real zip archive written to a temporary directory.
 */
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import AdmZip from 'adm-zip';
import ServerlessZipinfoPlugin from '../src/index.js';
import type Plugin from 'serverless/classes/Plugin';

type Ctor = ConstructorParameters<typeof ServerlessZipinfoPlugin>;

describe('plugin tests', () => {
  const originalLog = console.log;
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(tmpdir(), 'zipinfo-plugin-'));
  });

  afterEach(async () => {
    console.log = originalLog;
    await rm(dir, { recursive: true, force: true });
  });

  it('should list the entries of the packaged archive', async () => {
    const artifact = path.join(dir, 'simple-service.zip');
    const zip = new AdmZip();
    zip.addFile('index.js', Buffer.from('exports.main = () => 1;\n'));
    zip.writeZip(artifact);

    const infoLines: string[] = [];
    const successLines: string[] = [];
    const errorLines: string[] = [];
    const consoleLines: string[] = [];
    console.log = (...args: unknown[]) => {
      consoleLines.push(args.join(' '));
    };

    const serverless = {
      service: {
        package: { artifact },
        getServiceName: () => 'simple-service',
      },
      config: { servicePath: dir },
    };
    const noop = () => undefined;
    const progress: Plugin.Progress = {
      namespace: 'test',
      name: 'test',
      update: noop,
      info: noop,
      notice: noop,
      remove: noop,
    };
    const logging: Plugin.Logging = {
      log: {
        error: (line: unknown) => errorLines.push(String(line)),
        warning: noop,
        notice: noop,
        info: (line: unknown) => infoLines.push(String(line)),
        debug: noop,
        verbose: noop,
        success: (line: unknown) => successLines.push(String(line)),
      },
      writeText: noop,
      progress: { get: () => progress, create: () => progress },
    };
    const plugin = new ServerlessZipinfoPlugin(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- a full Serverless instance needs a real service load; the plugin reads only the package artifact, service name and servicePath
      serverless as unknown as Ctor[0],
      {},
      logging,
    );

    await plugin.hooks['after:package:finalize']();

    expect(successLines).toEqual([`Introspected archive: ${artifact}`]);
    expect(errorLines).toEqual([]);
    expect(infoLines.some((line) => line.includes('defN'))).toBe(true);
    expect(infoLines.some((line) => line.includes('index.js'))).toBe(true);
    expect(consoleLines.some((line) => line.includes('index.js'))).toBe(true);
  });
});
