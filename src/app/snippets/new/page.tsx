"use client";

import createSnippetAction from "@/actions/createSnippet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

/**
 * SnippetCreatePage
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
 */
const SnippetCreatePage = () => {
  // Use useFormState to manage server-side form state and submission
  const [formState, action] = useFormState(createSnippetAction, {
    message: {},
  });

  // Extract field-specific errors (if any) from the form state
  const fieldErrors = formState.message as Record<string, string>;

  return (
    <>
      <h1 className="tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl tw-mb-10">
        Create a snippet
      </h1>

      {/* The form is submitted via server-side action, validated on the server */}
      <form action={action} className="space-y-8">
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

        {/* General Error Message Section */}
        {fieldErrors.general && (
          <p className="tw-text-red-500 tw-text-sm">{fieldErrors.general}</p>
        )}

        {/* Submit Button */}
        <Button type="submit">Add</Button>
      </form>
    </>
  );
};

export default SnippetCreatePage;
