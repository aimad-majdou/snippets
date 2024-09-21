import { getSnippet } from '@/data/snippet-dto';
import { notFound } from 'next/navigation';
import SnippetEditForm from './form';

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

  return <SnippetEditForm snippet={snippet} />;
}
