import * as z from "zod";

/**
 * isZodError
 *
 * This helper function checks whether the given error is a Zod validation error.
 * Zod errors contain an `issues` array, which provides details about the validation issues.
 *
 * @param error - The error object to be checked.
 * @returns A boolean indicating whether the error is a Zod validation error (true) or not (false).
 */
export function isZodError(error: unknown): error is z.ZodError {
  return (error as z.ZodError).issues !== undefined;
}

/**
 * buildErrorMessage
 *
 * This helper function constructs a human-readable error message string from a Zod validation error.
 * - If the error is a Zod validation error, it extracts the individual issue messages and combines them.
 * - If the error is not a Zod validation error, it returns a fallback error message.
 *
 * @param error - The error object to be handled. It could be a ZodError or any other error type.
 * @param fallbackErrorMessage - The default error message to be returned if the error is not a ZodError.
 * @returns A string containing either the concatenated Zod error messages or the fallback error message.
 */
export function buildErrorMessage(
  error: unknown,
  fallbackErrorMessage: string
): string {
  if (!isZodError(error)) {
    return fallbackErrorMessage;
  }

  // Combine all Zod issue messages into a single string
  return error.issues.reduce((acc, issue) => {
    return acc + issue.message + "\n";
  }, "");
}
