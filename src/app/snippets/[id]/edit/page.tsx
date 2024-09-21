import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
        <SnippetEditForm snippet={snippet} />
      </Card>
    </div>
  );
}
