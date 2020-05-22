export interface IPackage {
  name: string;
  url: string;
  files: string[];
  dest: string;
}

export interface IConfigFile {
  packages: IPackage[];
}
