import Serverless from 'serverless';
import Plugin, { Logging } from 'serverless/classes/Plugin';
import AdmZip from 'adm-zip';
// @ts-expect-error since the types are missing
import filesize from 'filesize';

class ServerlessCheckovPlugin implements Plugin {
  public readonly hooks: Plugin.Hooks = {};
  public readonly name: string = 'serverless-checkov-plugin';

  constructor(
    private readonly serverless: Serverless,
    _options: Serverless.Options,
    private readonly logging: Logging,
  ) {
    this.hooks = {
      'after:package:finalize': this.printArchiveInfo.bind(this),
    };
  }

  private async printArchiveInfo(): Promise<void> {
    const artifact = this.serverless.service.package.artifact;
    if (artifact) {
      console.log(`The zip file is located at: ${artifact}`);

      var zip = new AdmZip(artifact);
      zip.getEntries().forEach((zipEntry) => {
        const infoLine = this.formatZipEntry(zipEntry);
        this.logging.log.info(infoLine);
        console.log(infoLine);
      });
    } else {
      this.logging.log.error('No zip file found.');
    }
  }

  formatZipEntry(entry: AdmZip.IZipEntry): string {
    const mode = entry.header.attr >>> 16;
    const size = filesize.filesize(entry.header.size);
    const compressedSize = filesize.filesize(entry.header.compressedSize);
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

    return `${permissionString} 4.5 unx ${size.padStart(10, ' ')} bl ${compressedSize.padStart(10, ' ')} ${method} ${dateTime} ${fileName}`;
  }
}

export = ServerlessCheckovPlugin;
