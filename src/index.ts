/**
 * @file Serverless Framework plugin that lists the entries of the packaged zip archive.
 */
import { access } from 'node:fs/promises';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { filesize } from 'filesize';
import type Serverless from 'serverless';

import type Plugin from 'serverless/classes/Plugin';

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
    private readonly logging: Plugin.Logging,
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
    // The Serverless typings leave the package block untyped, so the artifact path is typed once here.
    const declared = (this.serverless.service.package as { artifact?: string })
      .artifact;
    const artifact = declared || (await this.findDefaultArchive());

    if (artifact) {
      this.logging.log.success(`Introspected archive: ${artifact}`);
      console.log('\n');

      const zip = new AdmZip(artifact);
      // eslint-disable-next-line functional/no-loop-statements -- the loop only logs each entry in archive order
      for (const zipEntry of zip.getEntries()) {
        if (zipEntry.entryName.includes('node_modules')) {
          continue;
        }
        const infoLine = this.formatZipEntry(zipEntry);
        this.logging.log.info(infoLine);
        console.log(infoLine);
      }
    } else {
      this.logging.log.error('No zip file found.');
    }
  }

  /**
   * Finds the default archive that Serverless writes for the service, when it exists.
   * @returns The path of the archive, or undefined when no archive was written.
   */
  private async findDefaultArchive(): Promise<string | undefined> {
    const zipPath = path.join(
      this.serverless.config.servicePath,
      '.serverless',
      `${this.serverless.service.getServiceName()}.zip`,
    );
    return (await fileExists(zipPath)) ? zipPath : undefined;
  }

  /**
   * Formats one archive entry as a zipinfo-style line with its permissions, sizes, method and timestamp.
   * @param entry - The zip entry whose header supplies the size, method, timestamp and permissions.
   * @returns The formatted line that describes the entry.
   * @example
   * const line = plugin.formatZipEntry(new AdmZip(artifact).getEntries()[0]);
   */
  formatZipEntry(entry: AdmZip.IZipEntry): string {
    const mode = Math.trunc(entry.header.attr / 2 ** 16);
    const size = filesize(entry.header.size);
    const compressedSize = filesize(entry.header.compressedSize);
    const method = entry.header.method === 0 ? 'stor' : 'defN';
    const dateTime = entry.header.time.toISOString();
    const fileName = entry.entryName;

    const permissions = mode % 0o1000;
    const permissionString = Array.from({ length: 9 }, (_, index) =>
      Math.trunc(permissions / 2 ** (8 - index)) % 2 === 1
        ? 'rwx'[index % 3]
        : '-',
    ).join('');

    return `• ${permissionString} 4.5 unx ${size.padStart(10, ' ')} bl ${compressedSize.padStart(10, ' ')} ${method} ${dateTime} ${fileName}`;
  }
}

export default ServerlessZipinfoPlugin;
