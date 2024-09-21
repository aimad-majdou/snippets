import * as z from 'zod';

// Helper function to check if the error is a ZodError
function isZodError(error: unknown): error is z.ZodError {
  return (error as z.ZodError).issues !== undefined;
}


export function buildErrorMessage(error: unknown): string {
  if (!isZodError(error)) {
    return 'An error occurred while creating the snippet.';
  }
  return error.issues.reduce((acc, issue) => {
    return acc + issue.message + '\n';
  }, '');
}