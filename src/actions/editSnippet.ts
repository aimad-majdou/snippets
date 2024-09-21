"use server";

import { updateSnippet } from "@/data/snippet-dto";
import { SnippetUpdateSchemaType } from "@/schemas/snippet";
import { buildErrorMessage } from "./helpers";

/**
 * editSnippetAction
 *
 * This server action handles the form submission process for editing an existing snippet.
 *
 * Features:
 * - **Client-Side Validation**: The form data is first validated on the client using `react-hook-form` and Zod.
 * - **Server-Side Validation**: Once the form is submitted, the data is validated again on the server using Prisma's schema extension (which uses Zod for schema validation).
 * - **Error Handling**: If any server-side validation or database operation fails, the error is processed and an appropriate error message is returned using the `buildErrorMessage` helper.
 *
 * If the snippet update is successful, the user is redirected to the updated snippet's detail page.
 *
 * @param data - The snippet data (validated both on the client side and server side).
 * @returns An error message string if the update fails, or redirects to the snippet detail page if the update succeeds.
 */
const editSnippetAction = async (data: SnippetUpdateSchemaType) => {
  try {
    // Attempt to update the snippet in the database
    await updateSnippet(data);
  } catch (error) {
    // Build a readable error message if the update fails
    return {
      error: buildErrorMessage(
        error,
        "An error occurred while updating the snippet."
      ),
    };
  }
};

export default editSnippetAction;
