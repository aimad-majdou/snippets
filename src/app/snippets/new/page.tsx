import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SnippetAddForm from "./_components/form";

const SnippetCreatePage = () => {
  return (
    <div className="tw-container tw-mx-auto tw-py-8">
      <Card className="tw-w-full tw-max-w-2xl tw-mx-auto">
        <CardHeader>
          <CardTitle className="tw-text-2xl tw-font-bold">
            Create a New Snippet
          </CardTitle>
        </CardHeader>
        <SnippetAddForm />
      </Card>
    </div>
  );
};

export default SnippetCreatePage;
