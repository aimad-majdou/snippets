import { Prisma } from "@prisma/client";
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
 * isPrismaError
 * Checks if the error is a Prisma known request error.
 */
export function isPrismaKnownError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    typeof error.code === "string"
  );
}

export function isPrismaOtherError(
  error: unknown
): error is
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError {
  return (
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientValidationError
  );
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
  console.log(error);

  if (isPrismaKnownError(error)) {
    // Handle Prisma specific errors
    if (error.meta) {
      return Object.entries(error.meta).reduce((acc, [key, value]) => {
        return acc + `${key}: ${value}\n`;
      }, `Prisma Error Code: ${error.code}\n`);
    }
    return `Prisma Error Code: ${error.code}\nNo meta information available.`;
  }

  if (isPrismaOtherError(error)) {
    // Handle Prisma other errors
    if (error.message) {
      return `Prisma Error: ${error.message}`;
    }
  }

  if (isZodError(error)) {
    // Combine all Zod issue messages into a single string
    return error.issues.reduce((acc, issue) => {
      return `${acc}${issue.message}\n`;
    }, "Validtion Failed:\n");
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (typeof error === "string" && error.length > 0) {
    return error;
  }

  return fallbackErrorMessage;
}
