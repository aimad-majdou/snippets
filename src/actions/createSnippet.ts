"use server";

import { createSnippet } from "@/data/snippet-dto";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

/**
 * createSnippetAction
 *
 * This server action handles form submission for creating a new snippet.
 *
 * Features:
 * - **Server-Side Validation Only**: The form data is validated server-side using Prisma's schema extension (which leverages Zod for validation).
 * - **Error Handling**: If validation fails or the snippet creation encounters an issue, field-specific errors are returned and displayed under the relevant form fields.
 * - **No Client-Side Validation**: The form data is validated only on the server, with no client-side validation involved.
 *
 * On successful snippet creation, the user is redirected to the snippet list page.
 *
 * @param formState - The form state, which holds validation errors or other message data to be returned to the client.
 * @param data - The form data submitted as a `FormData` object.
 * @returns Field-specific error messages if creation fails, or redirects to the snippet list page upon success.
 */
const createSnippetAction = async (
  formState: { message: Record<string, string> },
  data: FormData
) => {
  try {
    // Attempt to create the snippet in the database
    await createSnippet({
      title: "",
      code: data.get("code") as string,
    });
  } catch (error) {
    // Handle and return field-specific error messages
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of error.issues) {
        fieldErrors[issue.path[0]] = issue.message; // Store error message for each field
      }
      return {
        message: fieldErrors,
      };
    }

    return {
      message: {
        general: "An error occurred while creating the snippet.",
      },
    };
  }

  // never put a redirect inside a try/catch block
  // because under the hood it throws an error with NEXT_REDIRECT and it will be caught by the catch block instead of redirecting
  // that error is a special error that tells the server to redirect the user
  redirect("/");
};

export default createSnippetAction;
