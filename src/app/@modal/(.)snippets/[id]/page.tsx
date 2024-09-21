import { CodeViewer } from "@/components/code-editor/code-viewer";
import { getSnippet } from "@/data/snippet-dto";
import { Modal } from "./modal";

type SnippetShowModelProps = {
  params: {
    id: string;
  };
};

const SnippetShowModel = async ({ params }: SnippetShowModelProps) => {
  const snippet = await getSnippet(params.id);
  return (
    <Modal title={snippet?.title}>
      <CodeViewer title={snippet?.title} code={snippet?.code} />
    </Modal>
  );
};

export default SnippetShowModel;
