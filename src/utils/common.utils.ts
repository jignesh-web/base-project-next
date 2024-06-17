export class CustomError extends Error {
  // Error code associated with the error.
  code?: string | undefined;

  constructor(message: string, code?: string) {
    super(message);
    this.name = this.constructor.name; // Set the error name to the class name
    this.code = code;

    // Maintain proper stack trace for where our error was thrown (only available on V8)
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
