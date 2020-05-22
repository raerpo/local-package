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
    errorMessage = errorMessage + `\n\nTips:\n${possibleReasons.map((reason) => `-${reason}\n`)}`;
  }
  console.error(errorMessage);
  process.exit(1);
};
