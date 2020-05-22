import path from 'path';
import fs from 'fs-extra';
import clone from 'git-clone';
import { throwError } from './utils';
import { IConfigFile, IPackage } from './types';
import { CONFIG_FILENAME, TEMP_FOLDER } from './config/constants';

/**
 * Utility functions
 */
const getConfigFile: () => IConfigFile = () => {
  try {
    const configFile: IConfigFile = require(path.resolve(process.cwd(), CONFIG_FILENAME));
    return configFile;
  } catch (error) {
    throwError({
      errorName: `${CONFIG_FILENAME} wasn't found`,
      possibleReasons: ['Make sure that you have a proper local-package.config file in the root of your project.'],
    });
  }
  // Never will reach this point because if configFile is not defined the process will be ended
  return { packages: [] };
};

const cleanTempFolder = async () => {
  return await fs.remove(TEMP_FOLDER);
};

const retrievePackages = async (packages: IPackage[]) => {
  const requestedPackages = packages.map((pkg) => {
    return new Promise((resolve, reject) => {
      clone(pkg.url, `${TEMP_FOLDER}/${pkg.name}`, { clone: true }, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
  return Promise.all(requestedPackages);
};

const moveFilesToFolders = async (packages: IPackage[]) => {
  const copiedPackages = packages.map((pkg) => {
    const pathsToCopy = pkg.files.map((file) => [`${TEMP_FOLDER}/${pkg.name}/${file}`, `${pkg.dest}/${file}`]);
    const copyProcesses = pathsToCopy.map((path) => {
      const [src, dest] = path;
      return fs.copy(src, dest);
    });
    return Promise.all(copyProcesses);
  });
  return Promise.all(copiedPackages);
};

/**
 * Main
 */
const main = () => {
  const { packages }: IConfigFile = getConfigFile();
  // Clean temp folder
  cleanTempFolder()
    .then(() => retrievePackages(packages))
    .then(() => moveFilesToFolders(packages))
    .then(() => cleanTempFolder())
    .then(() => console.log('Done'));
};

main();
