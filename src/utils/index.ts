import { Validator } from 'jsonschema';
import jsonConfigSchema from '../config/configSchema';
import { IConfigFile } from 'src/types';

interface IErrorMessage {
  errorName: string;
  description?: string;
  possibleReasons?: string[];
}
type IThrowError = (params: IErrorMessage) => void;

export const throwError: IThrowError = ({ errorName, description, possibleReasons }) => {
  let errorMessage = errorName;
  if (description) {
    errorMessage = errorMessage + `\n${description}`;
  }
  if (possibleReasons) {
    errorMessage = errorMessage + `\n\nTips:\n${possibleReasons.map((reason) => `- ${reason}`).join('\n')}`;
  }
  console.error(errorMessage);
  process.exit(1);
};

export const isLocalPackageConfigValid = (config: IConfigFile) => {
  const v = new Validator();
  return v.validate(config, jsonConfigSchema);
};
