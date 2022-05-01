export abstract class CoreException extends Error {
  abstract code: symbol;
  abstract message: string;
}
