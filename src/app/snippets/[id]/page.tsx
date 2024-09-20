import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSnippet } from '@/data/snippet-dto';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

  return (
    <div className='tw-container tw-mx-auto tw-py-8'>
      <Card className='tw-w-full tw-max-w-4xl tw-mx-auto'>
        <CardHeader>
          <div className='tw-flex tw-items-center tw-justify-between'>
            <CardTitle className='tw-text-2xl tw-font-bold'>
              {snippet.title}
            </CardTitle>
            <div className='tw-space-x-2'>
              <Link href={`/snippets/${snippet.id}/edit`} passHref>
                <Button variant='outline' size='sm'>
                  <Pencil className='tw-w-4 tw-h-4 tw-mr-2' />
                  Edit
                </Button>
              </Link>
              <Button variant='destructive' size='sm'>
                <Trash2 className='tw-w-4 tw-h-4' />
                {/* {isDeleting ? 'Deleting...' : 'Delete'} */}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className='tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto'>
            <code className='tw-text-sm tw-font-mono'>{snippet.code}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default SnippetShowPage;
