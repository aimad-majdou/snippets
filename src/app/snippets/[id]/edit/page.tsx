import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getSnippet } from "@/data/snippet-dto";
import { notFound } from "next/navigation";
import SnippetEditForm from "./_components/form";

interface SnippetEditProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage({ params }: SnippetEditProps) {
  const snippet = await getSnippet(params.id);

  if (!snippet) {
    return notFound();
  }
  return (
    <div className="tw-container tw-mx-auto tw-py-8">
      <Card className="tw-w-full tw-max-w-2xl tw-mx-auto">
        <CardHeader>
          <CardTitle className="tw-text-2xl tw-font-bold">
            Edit Snippet
          </CardTitle>
        </CardHeader>
        <CardContent className="tw-space-y-4">
          {/* Collapsible explanation section */}
          <Collapsible>
            <CollapsibleTrigger className="tw-cursor-pointer tw-py-2 tw-flex tw-justify-between tw-items-center">
              <h2 className="tw-font-semibold">About this form</h2>
              <span>+</span>
            </CollapsibleTrigger>
            <p className="tw-text-xs tw-text-red-500 tw-italic">
              Click to expand
            </p>
            <CollapsibleContent className="tw-space-y-2 tw-mt-2 tw-text-sm">
              <p className="tw-text-gray-700">
                This form allows users to edit an existing snippet using{" "}
                <strong>react-hook-form</strong>. Client-side validation is
                implemented using <strong>Zod</strong> for schema validation.
                Here’s how it works:
              </p>
              <ul className="tw-list-disc tw-list-inside tw-text-gray-700">
                <li>
                  <strong>Client-Side Validation:</strong> The form is validated
                  in real-time as you type using client-side validation. If
                  validation errors occur, they will be shown under the
                  respective form fields immediately.
                </li>
                <li>
                  <strong>Server-Side Validation:</strong> When the form is
                  submitted, the data is re-validated on the server before
                  updating the snippet.
                </li>
                <li>
                  <strong>Form Feedback:</strong> Any server-side validation
                  errors or issues will be displayed as toast messages if they
                  occur.
                </li>
              </ul>

              <h3 className="tw-font-semibold">Advantages</h3>
              <ul className="tw-list-disc tw-list-inside tw-text-gray-700">
                <li>
                  <strong>Immediate feedback:</strong> The form provides
                  immediate client-side feedback, allowing users to see
                  validation errors as they type.
                </li>
                <li>
                  <strong>Consistent validation:</strong> Validation is
                  performed both on the client and the server to ensure data
                  integrity.
                </li>
              </ul>

              <h3 className="tw-font-semibold">Drawbacks</h3>
              <ul className="tw-list-disc tw-list-inside tw-text-gray-700">
                <li>
                  <strong>Requires JavaScript:</strong> Client-side validation
                  means the form relies on JavaScript. If JavaScript is
                  disabled, the form cannot provide instant feedback.
                </li>
              </ul>

              <h3 className="tw-font-semibold">
                Comparison to SnippetCreateForm
              </h3>
              <p className="tw-text-gray-700 tw-italic">
                Unlike the create form, which uses only server-side validation,
                this form uses client-side validation for a more interactive
                experience. You can read more about the differences between
                client-side and server-side validation in the{" "}
                <strong>SnippetCreateForm</strong> section.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <SnippetEditForm snippet={snippet} />
      </Card>
    </div>
  );
}
