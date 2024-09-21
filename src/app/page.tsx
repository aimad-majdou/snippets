import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getSnippetList } from "@/data/snippet-dto";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const snippets = await getSnippetList();
  return (
    <div className="tw-container tw-mx-auto tw-py-8">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
        <h1 className="tw-text-3xl tw-font-bold">Snippets</h1>
        <Link href="/new" passHref>
          <Button>
            <PlusIcon className="tw-w-4 tw-h-4 tw-mr-2" />
            New Snippet
          </Button>
        </Link>
      </div>
      <div className="tw-grid tw-grid-cols-1 tw-gap-6">
        {snippets.map((snippet) => (
          <Card key={snippet.id}>
            <CardHeader>
              <div className="tw-flex tw-items-center tw-justify-between">
                <CardTitle className="tw-text-sm tw-font-medium">
                  {snippet.title}
                </CardTitle>
                <div className="tw-ml-auto tw-flex tw-gap-2">
                  {/* Button to open modal */}
                  <Link href={`/snippets/${snippet.id}`} passHref>
                    <Button size="sm" variant="secondary">
                      Preview (In modal)
                    </Button>
                  </Link>
                  {/* Button to redirect to full page */}
                  <Link href={`/${snippet.id}`} passHref>
                    <Button size="sm" variant="success">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
