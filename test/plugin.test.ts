import AdmZip from 'adm-zip';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import ServerlessZipinfoPlugin from '../src/index';

type Logger = (...args: unknown[]) => void;

describe('plugin tests', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'zipinfo-plugin-'));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('should list the entries of the packaged archive', async () => {
    const artifact = join(dir, 'simple-service.zip');
    const zip = new AdmZip();
    zip.addFile('index.js', Buffer.from('exports.main = () => 1;\n'));
    zip.writeZip(artifact);

    const infoLines: string[] = [];
    const successLines: string[] = [];
    const errorLines: string[] = [];
    const consoleLines: string[] = [];
    const originalLog = console.log;
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
    const logging = {
      log: {
        info: ((line: string) => infoLines.push(line)) as Logger,
        success: ((line: string) => successLines.push(line)) as Logger,
        error: ((line: string) => errorLines.push(line)) as Logger,
      },
    };
    const plugin = new ServerlessZipinfoPlugin(
      serverless as unknown as ConstructorParameters<
        typeof ServerlessZipinfoPlugin
      >[0],
      {},
      logging as unknown as ConstructorParameters<
        typeof ServerlessZipinfoPlugin
      >[2],
    );

    try {
      await (plugin.hooks['after:package:finalize'] as () => Promise<void>)();
    } finally {
      console.log = originalLog;
    }

    expect(successLines).toEqual([`Introspected archive: ${artifact}`]);
    expect(errorLines).toEqual([]);
    expect(infoLines.some((line) => line.includes('defN'))).toBe(true);
    expect(infoLines.some((line) => line.includes('index.js'))).toBe(true);
  });
});
