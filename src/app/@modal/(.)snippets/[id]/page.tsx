import { getSnippet } from '@/data/snippet-dto';
import { Modal } from './modal';

type SnippetShowModelProps = {
  params: {
    id: string;
  };
};

const SnippetShowModel = async ({ params }: SnippetShowModelProps) => {
  const snippet = await getSnippet(params.id);
  return <Modal>{snippet?.title}</Modal>;
};

export default SnippetShowModel;
