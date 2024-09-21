"use client";

import editSnippetAction from "@/actions/editSnippet";
import { CodeEditor } from "@/components/code-editor"; // Assuming CodeEditor is correctly implemented
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  SnippetUpdateSchema,
  SnippetUpdateSchemaType,
} from "@/schemas/snippet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Snippet } from "@prisma/client";
import { redirect } from "next/navigation";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

interface SnippetEditFormProps {
  snippet: Snippet;
}

/**
 * SnippetEditForm
 *
 * This form allows users to edit an existing snippet using `react-hook-form`.
 * - Client-side validation is implemented via `react-hook-form` and Zod schema validation.
 * - The form is validated in real-time (on the client) using the `onChange` mode.
 * - On submission, the form data is sent to a server action (`editSnippetAction`).
 * - After submission, the data is validated again on the server (via Prisma's schema extension, see db/index.ts).
 * - If validation passes, the snippet is updated in the database; otherwise, an error is shown.
 * - The form shows server-side errors through a toast if any occur during snippet updating.
 *
 * This form provides immediate feedback to users by validating inputs as they type.
 * For a comparison, check the `SnippetCreateForm` which only uses server-side validation.
 */
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const { toast } = useToast();
  const [, startTransition] = useTransition();
  const editorRef = useRef<any>(null); // Use Monaco editor ref

  // Initialize react-hook-form with Zod validation and default values
  const form = useForm<SnippetUpdateSchemaType>({
    resolver: zodResolver(SnippetUpdateSchema),
    defaultValues: {
      id: snippet.id,
      title: snippet.title,
      code: snippet.code,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors, isDirty },
    setValue,
  } = form;

  console.log(isValid, errors); // Check if there are any validation errors

  const handleFormSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const response = await editSnippetAction(data); // Perform the update

      if (response?.error) {
        // Show error toast if snippet update fails
        toast({
          title: "An error occurred",
          description: response.error,
          variant: "destructive",
          className: "tw-bg-red-500 tw-text-white",
        });
      } else {
        // Show success toast and redirect to the snippet page on success
        toast({
          title: "Snippet updated",
          description: "Your code snippet has been successfully updated.",
        });
        redirect(`/snippets/${data.id}`); // Redirect on success
      }
    });
  });

  const handleCodeEditorChange = (value: string = "") => {
    setValue("code", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    }); // Update the form value
  };

  const handleCodeEditorLabelClick = () => {
    if (editorRef.current) {
      editorRef.current.focus(); // Focus the Monaco editor when label is clicked
    }
  };

  return (
    <div className="tw-container tw-mx-auto tw-py-8">
      <Card className="tw-w-full tw-max-w-2xl tw-mx-auto">
        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="space-y-8">
            <CardHeader>
              <CardTitle className="tw-text-2xl tw-font-bold">
                Edit Snippet
              </CardTitle>
            </CardHeader>
            <CardContent className="tw-space-y-4">
              <FormField
                control={control}
                name="id"
                render={({ field }) => (
                  <input {...field} type="hidden" /> // Hidden input for the id field
                )}
              />
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel onClick={handleCodeEditorLabelClick}>
                      Code
                    </FormLabel>
                    <FormControl>
                      <CodeEditor
                        {...field}
                        ref={editorRef} // Forward the ref to Monaco editor
                        title={snippet.title}
                        defaultValue={snippet.code}
                        onChange={handleCodeEditorChange}
                        ariaLabel="Code"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="tw-flex tw-justify-between">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !isDirty}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
