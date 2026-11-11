/**
 * @file Serverless Framework plugin that lists the entries of the packaged zip archive.
 */
import Serverless from 'serverless';

import Plugin, { Logging } from 'serverless/classes/Plugin';
import AdmZip from 'adm-zip';
import { filesize } from 'filesize';
import { access } from 'node:fs/promises';
import path from 'node:path';

/**
 * Checks whether a file or directory can be accessed at the given path.
 * @param filePath - The absolute path to check.
 * @returns A promise that resolves to true when the path exists and can be accessed.
 * @example
 * const found = await fileExists('/app/.serverless/service.zip');
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Serverless Framework plugin that prints the entries of the packaged archive once packaging finishes.
 * @example
 * // serverless.yml
 * plugins:
 *   - serverless-zipinfo-plugin
 */
class ServerlessZipinfoPlugin implements Plugin {
  public readonly hooks: Plugin.Hooks = {};
  public readonly name: string = 'serverless-zipinfo-plugin';

  /**
   * Creates the plugin and registers its hook for the end of the packaging step.
   * @param serverless - The Serverless instance that holds the service configuration and package.
   * @param _options - The command line options, which this plugin does not use.
   * @param logging - The logger used to report the archive contents.
   * @example
   * const plugin = new ServerlessZipinfoPlugin(serverless, options, logging);
   */
  constructor(
    private readonly serverless: Serverless,
    _options: Serverless.Options,
    private readonly logging: Logging,
  ) {
    this.hooks = {
      'after:package:finalize': this.printArchiveInfo.bind(this),
    };
  }

  /**
   * Locates the packaged archive and logs one line for each entry outside node_modules.
   *
   * When no archive can be found, an error is logged instead.
   * @example
   * await plugin.hooks['after:package:finalize']();
   */
  private async printArchiveInfo(): Promise<void> {
    let artifact = this.serverless.service.package.artifact;
    if (!artifact) {
      const zipPath = path.join(
        this.serverless.config.servicePath,
        '.serverless',
        this.serverless.service.getServiceName() + '.zip',
      );
      if (await fileExists(zipPath)) {
        artifact = zipPath;
      }
    }

    if (artifact) {
      this.logging.log.success(`Introspected archive: ${artifact}`);
      console.log('\n');

      var zip = new AdmZip(artifact);
      zip.getEntries().forEach((zipEntry) => {
        if (zipEntry.entryName.includes('node_modules')) {
          return;
        } else {
          const infoLine = this.formatZipEntry(zipEntry);
          this.logging.log.info(infoLine);
          console.log(infoLine);
        }
      });
    } else {
      this.logging.log.error('No zip file found.');
    }
  }

  /**
   * Formats one archive entry as a zipinfo-style line with its permissions, sizes, method and timestamp.
   * @param entry - The zip entry whose header supplies the size, method, timestamp and permissions.
   * @returns The formatted line that describes the entry.
   * @example
   * const line = plugin.formatZipEntry(new AdmZip(artifact).getEntries()[0]);
   */
  formatZipEntry(entry: AdmZip.IZipEntry): string {
    const mode = entry.header.attr >>> 16;
    const size = filesize(entry.header.size);
    const compressedSize = filesize(entry.header.compressedSize);
    const method = entry.header.method === 0 ? 'stor' : 'defN';
    const dateTime = entry.header.time.toISOString();
    const fileName = entry.entryName;

    const permissions = mode & 0o777;
    const permissionString =
      (permissions & 0o400 ? 'r' : '-') +
      (permissions & 0o200 ? 'w' : '-') +
      (permissions & 0o100 ? 'x' : '-') +
      (permissions & 0o040 ? 'r' : '-') +
      (permissions & 0o020 ? 'w' : '-') +
      (permissions & 0o010 ? 'x' : '-') +
      (permissions & 0o004 ? 'r' : '-') +
      (permissions & 0o002 ? 'w' : '-') +
      (permissions & 0o001 ? 'x' : '-');

    return `• ${permissionString} 4.5 unx ${size.padStart(10, ' ')} bl ${compressedSize.padStart(10, ' ')} ${method} ${dateTime} ${fileName}`;
  }
}

export default ServerlessZipinfoPlugin;
