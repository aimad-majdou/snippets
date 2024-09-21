import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SnippetAddForm from "./_components/form";

const SnippetCreatePage = () => {
  return (
    <div className="tw-container tw-mx-auto tw-py-8">
      <Card className="tw-w-full tw-max-w-4xl tw-mx-auto">
        <CardHeader>
          <CardTitle className="tw-text-2xl tw-font-bold">
            Create a New Snippet
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
                This form uses <strong>server-side validation</strong> to handle
                the creation of new snippets. Here's how it works:
              </p>
              <ul className="tw-list-disc tw-list-inside tw-text-gray-700">
                <li>
                  <strong>Server-Side Validation:</strong> When you submit the
                  form, the data is sent to the server where it is validated. No
                  client-side validation is done (except for basic browser
                  checks like required fields).
                </li>
                <li>
                  <strong>JavaScript Optional:</strong> The form works even if
                  JavaScript is disabled in your browser, ensuring compatibility
                  for all users.
                </li>
                <li>
                  <strong>Error Handling:</strong> If there are validation
                  errors, the server will return messages specific to each field
                  (e.g., "Title is too short"). These messages will appear
                  underneath the relevant input field.
                </li>
                <li>
                  <strong>Form Feedback:</strong> The form provides feedback
                  through error messages if the submission fails, ensuring you
                  know what's wrong if something goes wrong.
                </li>
              </ul>

              <h3 className="tw-font-semibold">Advantages</h3>
              <ul className="tw-list-disc tw-list-inside tw-text-gray-700">
                <li>
                  <strong>Works without JavaScript:</strong> Because the form
                  relies on server-side validation, it works even if the user's
                  browser has JavaScript disabled. This can be helpful for users
                  with security restrictions or slower devices.
                </li>
                <li>
                  <strong>Consistency:</strong> The validation occurs on the
                  server, so all users will experience the same validation,
                  ensuring consistency across different environments.
                </li>
              </ul>

              <h3 className="tw-font-semibold">Drawbacks</h3>
              <ul className="tw-list-disc tw-list-inside tw-text-gray-700">
                <li>
                  <strong>No immediate feedback:</strong> Unlike client-side
                  validation, which provides instant feedback as users type,
                  this form only validates after submission, which may result in
                  a slower user experience.
                </li>
                <li>
                  <strong>Requires full page load:</strong> Because the
                  validation happens on the server, users will need to wait for
                  the server response, potentially causing a delay depending on
                  network speed.
                </li>
              </ul>

              <h3 className="tw-font-semibold">Test This Form</h3>
              <p className="tw-text-gray-700 tw-italic">
                You can test how this form behaves when JavaScript is disabled
                by following the official documentation on disabling JavaScript
                in Chrome Developer Tools.
                <br />
                <a
                  href="https://developer.chrome.com/docs/devtools/javascript/disable"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-text-blue-600 hover:tw-underline"
                >
                  Learn how to disable JavaScript in Chrome
                </a>
                .
              </p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        {/* Form Component */}
        <SnippetAddForm />
      </Card>
    </div>
  );
};

export default SnippetCreatePage;
