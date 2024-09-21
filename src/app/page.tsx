import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const snippets = await db.snippet.findMany();
  return (
    <div className="tw-container tw-mx-auto tw-py-8">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
        <h1 className="tw-text-3xl tw-font-bold">Snippets</h1>
        <Link href="/snippets/new" passHref>
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
                <Link href={`/snippets/${snippet.id}`} passHref>
                  <Button size="sm">View</Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
