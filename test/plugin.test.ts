import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals';
import AdmZip from 'adm-zip';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import ServerlessZipinfoPlugin from '../src/index';

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

    const info = jest.fn();
    const success = jest.fn();
    const error = jest.fn();
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const serverless = {
      service: {
        package: { artifact },
        getServiceName: () => 'simple-service',
      },
      config: { servicePath: dir },
    };
    const plugin = new ServerlessZipinfoPlugin(
      serverless as unknown as ConstructorParameters<
        typeof ServerlessZipinfoPlugin
      >[0],
      {},
      { log: { info, success, error } } as unknown as ConstructorParameters<
        typeof ServerlessZipinfoPlugin
      >[2],
    );

    try {
      await (plugin.hooks['after:package:finalize'] as () => Promise<void>)();
    } finally {
      logSpy.mockRestore();
    }

    expect(success).toHaveBeenCalledWith(`Introspected archive: ${artifact}`);
    expect(error).not.toHaveBeenCalled();
    expect(info).toHaveBeenCalledWith(expect.stringContaining('defN'));
    expect(info).toHaveBeenCalledWith(expect.stringContaining('index.js'));
  });
});
