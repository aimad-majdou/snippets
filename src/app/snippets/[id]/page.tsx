import deleteSnippetAction from "@/actions/deleteSnippet";
import SyntaxHighlight from "@/components/tools/syntax-highlight";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSnippet } from "@/data/snippet-dto";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type SnippetShowPageProps = {
  params: {
    id: string;
  };
};

const SnippetShowPage = async ({ params }: SnippetShowPageProps) => {
  const snippet = await getSnippet(params.id);

  if (!snippet) {
    return notFound();
  }

  // using bind to pass the snippet id to the deleteSnippetAction instead of using a startTransition with a callback to call the deleteSnippetAction with the snippet id
  const handleDeleteSnippet = deleteSnippetAction.bind(null, snippet.id);

  return (
    <div className="tw-container tw-mx-auto tw-py-8">
      <Card className="tw-w-full tw-max-w-4xl tw-mx-auto">
        <CardHeader>
          <div className="tw-flex tw-items-center tw-justify-between">
            <CardTitle className="tw-text-2xl tw-font-bold">
              {snippet.title}
            </CardTitle>
            <div className="tw-space-x-2">
              <Link href={`/snippets/${snippet.id}/edit`} passHref>
                <Button variant="outline" size="sm">
                  <Pencil className="tw-w-4 tw-h-4 tw-mr-2" />
                  Edit
                </Button>
              </Link>
              <form action={handleDeleteSnippet}>
                <Button variant="destructive" size="sm">
                  <Trash2 className="tw-w-4 tw-h-4" />
                  Delete
                </Button>
              </form>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SyntaxHighlight code={snippet.code} title={snippet.title} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SnippetShowPage;
