"use client";
import createSnippetAction from "@/actions/createSnippet";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

/**
 * SnippetCreateForm
 *
 * This form allows users to create a new snippet using server-side validation.
 *
 * Features:
 * - **Server-Side Validation Only**: This form uses server-side validation (via `useFormState` from `react-dom`), meaning no client-side validation is performed.
 *   - Validation occurs on the server after form submission.
 *   - This approach ensures the form works even if JavaScript is disabled in the user's browser.
 * - **Error Handling**: Validation errors are returned from the server and displayed under the relevant form fields.
 * - **Form State Handling**: The form is submitted via the server action (`createSnippetAction`) and feedback is provided based on the server response.
 *
 * This form is different from the snippet edit form, which uses client-side validation with `react-hook-form`.
 * Note: The form is used without noValidate, so the browser will run some sort of client-side validation.
 */
export default function SnippetAddForm() {
  // Use useFormState to manage server-side form state and submission
  const [formState, action] = useFormState(createSnippetAction, {
    message: {},
  });

  // Extract field-specific errors (if any) from the form state
  const fieldErrors = formState.message as Record<string, string>;

  return (
    <>
      {/* The form is submitted via server-side action, validated on the server */}
      {/* We don't add noValidate so we let the browser run some kind of client side validation */}
      <form action={action} className="space-y-8">
        <CardContent className="tw-space-y-4">
          {/* Title Input Field */}
          <div className="tw-space-y-2">
            <label className="tw-block tw-text-sm tw-font-medium">Title</label>
            <Input name="title" required minLength={5} />
            {/* Display error message for the title field */}
            {fieldErrors.title && (
              <p className="tw-text-red-500 tw-text-sm">{fieldErrors.title}</p>
            )}
          </div>
          {/* Code Input Field */}
          <div className="tw-space-y-2">
            <label className="tw-block tw-text-sm tw-font-medium">Code</label>
            <Input name="code" required />
            {/* Display error message for the code field */}
            {fieldErrors.code && (
              <p className="tw-text-red-500 tw-text-sm">{fieldErrors.code}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="tw-flex tw-flex-col tw-gap-2">
          {/* General Error Message Section */}
          {fieldErrors.general && (
            <p className="tw-text-red-500 tw-text-sm">{fieldErrors.general}</p>
          )}
          {/* Submit Button */}
          <Button type="submit" className="tw-ml-auto">
            Add
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
